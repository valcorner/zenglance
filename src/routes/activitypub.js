/**
 * ActivityPub routes for Video federation.
 *
 * Endpoints:
 *   GET  /.well-known/webfinger          — Account discovery
 *   GET  /.well-known/nodeinfo           — NodeInfo discovery
 *   GET  /nodeinfo/2.1                   — NodeInfo document
 *   GET  /ap/users/:id                   — Actor document
 *   POST /ap/users/:id/inbox             — Receive federated activities
 *   GET  /ap/users/:id/inbox             — Read inbox (C2S, auth)
 *   GET  /ap/users/:id/outbox            — Read outbox
 *   POST /ap/users/:id/outbox            — Submit activity (C2S, auth)
 *   GET  /ap/users/:id/followers         — Followers collection
 *   GET  /ap/users/:id/following         — Following collection
 *   GET  /ap/objects/:id                 — Object URI resolver
 *   POST /ap/inbox                       — Shared inbox
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { eq, and, desc, sql } from 'drizzle-orm';
import { createDb } from '../db/index.js';
import { createAuthMiddleware } from '../middleware/auth.js';
import {
  users, contents, follows, apActorKeys, apActivities,
  remoteActors, apDeliveryQueue, likes
} from '../db/schema.js';
import {
  generateKeyPair, signRequest, verifyRequest, extractKeyId
} from '../utils/http-signatures.js';

const ACTIVITY_JSON = 'application/activity+json; charset=utf-8';
const PUBLIC = 'https://www.w3.org/ns/activitystreams#Public';

export function createActivityPubRoutes() {
  const ap = new Hono();
  ap.use('/*', cors());
  const auth = createAuthMiddleware();

  // ── Helper: get base URL from request ──────────────────────────────────
  function baseUrl(c) {
    const url = new URL(c.req.url);
    const proto = c.req.header('x-forwarded-proto') || url.protocol.replace(':', '');
    return `${proto}://${url.host}`;
  }

  // ── Helper: ensure user has an AP key pair ─────────────────────────────
  async function ensureKeyPair(db, userId, base) {
    let keyRow = await db.query.apActorKeys.findFirst({
      where: eq(apActorKeys.userId, userId)
    });
    if (keyRow) return keyRow;

    const { publicKeyPem, privateKeyPem } = await generateKeyPair();
    const keyId = `${base}/ap/users/${userId}#main-key`;
    await db.insert(apActorKeys).values({
      userId, publicKeyPem, privateKeyPem, keyId,
      createdAt: Date.now()
    }).onConflictDoNothing();
    // Re-query to get the actual key (in case of conflict)
    keyRow = await db.query.apActorKeys.findFirst({ where: eq(apActorKeys.userId, userId) });
    return keyRow;
  }

  // ── Helper: build Actor document ───────────────────────────────────────
  async function buildActor(c, user) {
    const base = baseUrl(c);
    const db = createDb(c.env, c.req.raw, c.res);
    const keyRow = await ensureKeyPair(db, user.id, base);

    return {
      '@context': [
        'https://www.w3.org/ns/activitystreams',
        'https://w3id.org/security/v1'
      ],
      type: 'Person',
      id: `${base}/ap/users/${user.id}`,
      preferredUsername: user.name || user.id,
      name: user.name || user.id,
      summary: user.bio || '',
      url: `${base}/profile.html?id=${user.id}`,
      inbox: `${base}/ap/users/${user.id}/inbox`,
      outbox: `${base}/ap/users/${user.id}/outbox`,
      followers: `${base}/ap/users/${user.id}/followers`,
      following: `${base}/ap/users/${user.id}/following`,
      liked: `${base}/ap/users/${user.id}/liked`,
      icon: user.avatar ? { type: 'Image', url: user.avatar } : undefined,
      publicKey: {
        id: keyRow.keyId,
        owner: `${base}/ap/users/${user.id}`,
        publicKeyPem: keyRow.publicKeyPem
      },
      manuallyApprovesFollowers: false,
      published: new Date(user.createdAt).toISOString()
    };
  }

  // ── Helper: build Video object ─────────────────────────────────────────
  function buildVideoObject(c, content) {
    const base = baseUrl(c);
    return {
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'Video',
      id: `${base}/ap/objects/${content.id}`,
      name: content.title,
      content: content.description || '',
      duration: content.duration ? `PT${content.duration}S` : undefined,
      url: `${base}/watch.html?id=${content.id}`,
      attributedTo: `${base}/ap/users/${content.uploaderId}`,
      published: new Date(content.createdAt).toISOString(),
      updated: new Date(content.updatedAt || content.createdAt).toISOString()
    };
  }

  // ── Helper: fetch remote actor (with D1 cache) ─────────────────────────
  async function fetchRemoteActor(db, actorUri) {
    // Check cache first
    let cached = await db.query.remoteActors.findFirst({
      where: eq(remoteActors.id, actorUri)
    });
    // Cache valid for 24h
    if (cached && (Date.now() - cached.fetchedAt) < 86400000) {
      return cached;
    }

    // Fetch from remote
    const res = await fetch(actorUri, {
      headers: { 'Accept': 'application/activity+json' },
      signal: AbortSignal.timeout(10000)
    });
    if (!res.ok) return null;

    const actor = await res.json();
    const urlObj = new URL(actorUri);
    const domain = urlObj.host;

    const data = {
      id: actorUri,
      type: actor.type || 'Person',
      preferredUsername: actor.preferredUsername || '',
      domain,
      inboxUrl: actor.inbox || '',
      sharedInboxUrl: actor.endpoints?.sharedInbox || actor.sharedInbox || null,
      followersUrl: actor.followers || null,
      followingUrl: actor.following || null,
      publicKeyId: actor.publicKey?.id || null,
      publicKeyPem: actor.publicKey?.publicKeyPem || null,
      iconUrl: actor.icon?.url || null,
      name: actor.name || '',
      summary: actor.summary || '',
      rawJson: JSON.stringify(actor),
      fetchedAt: Date.now()
    };

    // Upsert into cache
    await db.insert(remoteActors).values(data)
      .onConflictDoUpdate({ target: remoteActors.id, set: data });

    return { ...data, rawJson: data.rawJson };
  }

  // ── Helper: deliver activity to remote inboxes ──────────────────────────
  async function deliverActivity(c, db, activity, actor, recipientInboxes) {
    const base = baseUrl(c);
    const body = JSON.stringify(activity);
    const keyRow = await ensureKeyPair(db, actor.id, base);

    // Deduplicate by shared inbox
    const seen = new Set();
    const uniqueInboxes = [];
    for (const inbox of recipientInboxes) {
      if (!seen.has(inbox)) {
        seen.add(inbox);
        uniqueInboxes.push(inbox);
      }
    }

    // Queue deliveries (async via waitUntil)
    const deliveries = uniqueInboxes.map(async (inboxUrl) => {
      const domain = new URL(inboxUrl).host;
      try {
        const signedHeaders = await signRequest({
          method: 'POST',
          url: inboxUrl,
          headers: { 'Content-Type': ACTIVITY_JSON },
          body,
          privateKeyPem: keyRow.privateKeyPem,
          keyId: keyRow.keyId
        });

        const res = await fetch(inboxUrl, {
          method: 'POST',
          headers: signedHeaders,
          body,
          signal: AbortSignal.timeout(15000)
        });

        return { inbox: inboxUrl, domain, ok: res.ok, status: res.status };
      } catch (err) {
        console.error(`Delivery to ${inboxUrl} failed:`, err.message);
        return { inbox: inboxUrl, domain, ok: false, status: 0, error: err.message };
      }
    });

    return Promise.all(deliveries);
  }

  // ── Helper: get followers' inbox URLs ──────────────────────────────────
  async function getFollowerInboxes(db, userId, base) {
    const inboxes = [];

    // Local followers: construct inbox URLs directly
    const localFollowers = await db.query.follows.findMany({
      where: eq(follows.followingId, userId)
    });
    for (const f of localFollowers) {
      inboxes.push(`${base}/ap/users/${f.followerId}/inbox`);
    }

    // Remote followers: look up via ap_activities (incoming Follows targeting this actor)
    const remoteFollows = await db.query.apActivities.findMany({
      where: and(
        eq(apActivities.type, 'Follow'),
        eq(apActivities.objectId, `${base}/ap/users/${userId}`),
        eq(apActivities.direction, 'incoming')
      )
    });
    for (const a of remoteFollows) {
      const remoteActor = await db.query.remoteActors.findFirst({
        where: eq(remoteActors.id, a.actorId)
      }).catch(() => null);
      if (remoteActor) {
        inboxes.push(remoteActor.sharedInboxUrl || remoteActor.inboxUrl);
      }
    }

    return inboxes;
  }

  // ════════════════════════════════════════════════════════════════════════
  // WebFinger (RFC 7033)
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/.well-known/webfinger', async (c) => {
    const resource = c.req.query('resource');
    if (!resource || !resource.startsWith('acct:')) {
      return c.json({ error: 'Invalid resource' }, 400);
    }

    const acct = resource.slice(5); // remove 'acct:'
    const [username, domain] = acct.split('@');
    const base = baseUrl(c);
    const urlObj = new URL(c.req.url);
    const localDomain = urlObj.host;

    if (domain !== localDomain) {
      return c.json({ error: 'User not found' }, 404);
    }

    const db = createDb(c.env, c.req.raw, c.res);
    // Try to find user by name or id
    const user = await db.query.users.findFirst({
      where: eq(users.name, username)
    }) || await db.query.users.findFirst({
      where: eq(users.id, username)
    });

    if (!user) return c.json({ error: 'User not found' }, 404);

    return c.json({
      subject: resource,
      aliases: [`${base}/ap/users/${user.id}`, `${base}/profile.html?id=${user.id}`],
      links: [
        {
          rel: 'self',
          type: 'application/activity+json',
          href: `${base}/ap/users/${user.id}`
        },
        {
          rel: 'http://webfinger.net/rel/profile-page',
          type: 'text/html',
          href: `${base}/profile.html?id=${user.id}`
        }
      ]
    }, 200, { 'Content-Type': 'application/jrd+json' });
  });

  // ════════════════════════════════════════════════════════════════════════
  // NodeInfo discovery
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/.well-known/nodeinfo', (c) => {
    const base = baseUrl(c);
    return c.json({
      links: [{
        rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
        href: `${base}/nodeinfo/2.1`
      }]
    });
  });

  ap.get('/nodeinfo/2.1', async (c) => {
    const db = createDb(c.env, c.req.raw, c.res);
    const userCount = await db.select({ count: sql`count(*)` }).from(users);
    const contentCount = await db.select({ count: sql`count(*)` }).from(contents);

    return c.json({
      version: '2.1',
      software: { name: 'video', version: '0.1.0' },
      protocols: ['activitypub'],
      services: { inbound: [], outbound: [] },
      openRegistrations: false,
      usage: {
        users: { total: userCount[0]?.count || 0 },
        localPosts: contentCount[0]?.count || 0
      },
      metadata: { nodeName: 'Video' }
    }, 200, { 'Content-Type': 'application/json; profile="http://nodeinfo.diaspora.software/ns/schema/2.1#"' });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Actor document
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/users/:id', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });
    if (!user) return c.json({ error: 'Actor not found' }, 404);

    const actor = await buildActor(c, user);
    return c.json(actor, 200, { 'Content-Type': ACTIVITY_JSON });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Inbox (S2S + C2S)
  // ════════════════════════════════════════════════════════════════════════
  ap.post('/users/:id/inbox', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);

    // Verify target user exists
    const targetUser = await db.query.users.findFirst({ where: eq(users.id, id) });
    if (!targetUser) return c.json({ error: 'User not found' }, 404);

    const body = await c.req.text();
    let activity;
    try {
      activity = JSON.parse(body);
    } catch {
      return c.json({ error: 'Invalid JSON' }, 400);
    }

    // ── Verify HTTP Signature ──────────────────────────────────────────
    const keyId = extractKeyId(c.req.raw.headers);
    if (!keyId) return c.json({ error: 'Missing signature' }, 401);

    // Resolve signer's public key
    const signerActorUri = keyId.split('#')[0];
    const remoteActor = await fetchRemoteActor(db, signerActorUri);
    if (!remoteActor || !remoteActor.publicKeyPem) {
      return c.json({ error: 'Cannot verify signature: unknown actor' }, 401);
    }

    const path = new URL(c.req.url).pathname;
    const headers = {};
    for (const [k, v] of c.req.raw.headers.entries()) headers[k.toLowerCase()] = v;

    const valid = await verifyRequest({
      method: c.req.method,
      path,
      headers,
      body,
      publicKeyPem: remoteActor.publicKeyPem
    });
    if (!valid) return c.json({ error: 'Invalid signature' }, 401);

    // ── Process activity ───────────────────────────────────────────────
    const now = Date.now();
    const activityId = activity.id || `urn:uuid:${crypto.randomUUID()}`;

    // Log the activity
    await db.insert(apActivities).values({
      id: activityId,
      type: activity.type || 'Unknown',
      actorId: activity.actor || signerActorUri,
      objectId: typeof activity.object === 'string' ? activity.object
        : activity.object?.id || null,
      rawJson: body,
      direction: 'incoming',
      to: JSON.stringify(activity.to || []),
      cc: JSON.stringify(activity.cc || []),
      createdAt: now
    }).catch(() => { /* ignore duplicate id */ });

    switch (activity.type) {
      case 'Follow': {
        // Auto-accept follows
        const followerUri = typeof activity.actor === 'string' ? activity.actor : null;
        if (!followerUri) break;

        // Store follow relationship (using remote actor URI as followerId)
        // Note: follows table references users.id, so we store remote follows in ap_activities
        // and count from there for follower collections

        // Send Accept activity back
        const acceptActivity = {
          '@context': 'https://www.w3.org/ns/activitystreams',
          id: `urn:uuid:${crypto.randomUUID()}`,
          type: 'Accept',
          actor: `${baseUrl(c)}/ap/users/${id}`,
          object: activity,
          to: [followerUri]
        };

        const targetInbox = remoteActor.inboxUrl;
        if (targetInbox) {
          c.executionCtx.waitUntil(
            deliverActivity(c, db, acceptActivity, targetUser, [targetInbox])
          );
        }
        break;
      }

      case 'Undo': {
        // Undo previous activity (Undo Follow, Undo Like, etc.)
        // Handle both string (id) and object forms
        const undoneId = typeof activity.object === 'string'
          ? activity.object
          : activity.object?.id;
        if (!undoneId) break;

        // Look up the original activity to know its type
        const original = await db.query.apActivities.findFirst({
          where: eq(apActivities.id, undoneId)
        }).catch(() => null);

        if (original) {
          // Undo Follow: also remove from follows table if local
          if (original.type === 'Follow') {
            const followerId = original.actorId.split('/ap/users/')[1];
            const followingId = original.objectId?.split('/ap/users/')[1];
            if (followerId && followingId) {
              await db.delete(follows).where(and(
                eq(follows.followerId, followerId),
                eq(follows.followingId, followingId)
              )).catch(() => {});
            }
          }
          // Undo Like: also remove from likes table if local
          if (original.type === 'Like') {
            const contentId = original.objectId?.split('/ap/objects/')[1];
            if (contentId) {
              await db.delete(likes).where(and(
                eq(likes.userId, original.actorId),
                eq(likes.contentId, contentId)
              )).catch(() => {});
            }
          }
        }

        // Delete the original activity
        await db.delete(apActivities)
          .where(eq(apActivities.id, undoneId))
          .catch(() => {});
        break;
      }

      case 'Like': {
        // Remote user likes a local object
        // Remote Like is already recorded in ap_activities above.
        // The likes table is skipped because likes.userId has an FK to
        // users.id and cannot hold remote actor URIs.
        break;
      }

      case 'Announce': {
        // Remote user boosts/shares a local object
        // Already logged in ap_activities, no extra action needed
        break;
      }

      case 'Create':
      case 'Update':
      case 'Delete': {
        // Activity already logged, objects can be fetched on demand
        break;
      }

      case 'Accept': {
        // Our Follow was accepted by remote actor
        break;
      }

      default:
        // Unknown activity type — logged but no action
        break;
    }

    return c.json({ ok: true }, 202);
  });

  // Shared inbox
  ap.post('/inbox', async (c) => {
    // Same processing as user inbox but without target user
    const body = await c.req.text();
    let activity;
    try {
      activity = JSON.parse(body);
    } catch {
      return c.json({ error: 'Invalid JSON' }, 400);
    }

    const keyId = extractKeyId(c.req.raw.headers);
    if (!keyId) return c.json({ error: 'Missing signature' }, 401);

    const db = createDb(c.env, c.req.raw, c.res);
    const signerActorUri = keyId.split('#')[0];
    const remoteActor = await fetchRemoteActor(db, signerActorUri);
    if (!remoteActor) return c.json({ error: 'Unknown actor' }, 401);

    const path = new URL(c.req.url).pathname;
    const headers = {};
    for (const [k, v] of c.req.raw.headers.entries()) headers[k.toLowerCase()] = v;

    const valid = await verifyRequest({
      method: c.req.method,
      path,
      headers,
      body,
      publicKeyPem: remoteActor.publicKeyPem
    });
    if (!valid) return c.json({ error: 'Invalid signature' }, 401);

    const activityId = activity.id || `urn:uuid:${crypto.randomUUID()}`;
    await db.insert(apActivities).values({
      id: activityId,
      type: activity.type || 'Unknown',
      actorId: activity.actor || signerActorUri,
      objectId: typeof activity.object === 'string' ? activity.object : activity.object?.id || null,
      rawJson: body,
      direction: 'incoming',
      to: JSON.stringify(activity.to || []),
      cc: JSON.stringify(activity.cc || []),
      createdAt: Date.now()
    }).catch(() => {});

    return c.json({ ok: true }, 202);
  });

  // ════════════════════════════════════════════════════════════════════════
  // Outbox
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/users/:id/outbox', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);
    const base = baseUrl(c);
    const page = c.req.query('page');

    // Verify user exists
    const user = await db.query.users.findFirst({ where: eq(users.id, id) });
    if (!user) return c.json({ error: 'User not found' }, 404);

    // Get total count of outgoing activities
    const countResult = await db.select({ count: sql`count(*)` }).from(apActivities)
      .where(and(
        eq(apActivities.actorId, `${base}/ap/users/${id}`),
        eq(apActivities.direction, 'outgoing')
      ));
    const totalItems = countResult[0]?.count || 0;

    if (page) {
      const pageNum = parseInt(page, 10) || 1;
      const offset = (pageNum - 1) * 20;
      // Return OrderedCollectionPage with items
      const activities = await db.query.apActivities.findMany({
        where: and(
          eq(apActivities.actorId, `${base}/ap/users/${id}`),
          eq(apActivities.direction, 'outgoing')
        ),
        orderBy: desc(apActivities.createdAt),
        limit: 20,
        offset
      });

      const response = {
        '@context': 'https://www.w3.org/ns/activitystreams',
        type: 'OrderedCollectionPage',
        partOf: `${base}/ap/users/${id}/outbox`,
        orderedItems: activities.map(a => JSON.parse(a.rawJson))
      };
      // Add next link if there are more items
      if (offset + 20 < totalItems) {
        response.next = `${base}/ap/users/${id}/outbox?page=${pageNum + 1}`;
      }
      return c.json(response, 200, { 'Content-Type': ACTIVITY_JSON });
    }

    // Return collection root
    return c.json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'OrderedCollection',
      totalItems,
      first: `${base}/ap/users/${id}/outbox?page=1`
    }, 200, { 'Content-Type': ACTIVITY_JSON });
  });

  // C2S: Post to outbox (authenticated)
  ap.post('/users/:id/outbox', auth, async (c) => {
    const { id } = c.req.param();
    const user = c.get('user');
    if (user.id !== id) return c.json({ error: 'Forbidden' }, 403);

    const db = createDb(c.env, c.req.raw, c.res);
    const base = baseUrl(c);
    const body = await c.req.text();
    let activity;
    try {
      activity = JSON.parse(body);
    } catch {
      return c.json({ error: 'Invalid JSON' }, 400);
    }

    // Basic validation: activity must have a type
    if (!activity || !activity.type) {
      return c.json({ error: 'Activity must have a type' }, 400);
    }

    const activityId = activity.id || `${base}/ap/activities/${crypto.randomUUID()}`;
    activity.id = activityId;
    activity.actor = `${base}/ap/users/${id}`;

    // Log activity
    await db.insert(apActivities).values({
      id: activityId,
      type: activity.type || 'Create',
      actorId: activity.actor,
      objectId: typeof activity.object === 'string' ? activity.object : activity.object?.id || null,
      rawJson: JSON.stringify(activity),
      direction: 'outgoing',
      to: JSON.stringify(activity.to || []),
      cc: JSON.stringify(activity.cc || []),
      createdAt: Date.now()
    });

    // Deliver to followers if public
    if ((activity.to || []).includes(PUBLIC) || (activity.cc || []).includes(PUBLIC)) {
      const inboxes = await getFollowerInboxes(db, id, base);
      if (inboxes.length > 0) {
        c.executionCtx.waitUntil(
          deliverActivity(c, db, activity, user, inboxes)
        );
      }
    }

    return c.json(activity, 201, { 'Content-Type': ACTIVITY_JSON });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Followers / Following collections
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/users/:id/followers', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);
    const base = baseUrl(c);
    const page = c.req.query('page');

    // Count local follows + remote follows (from ap_activities where type=Follow and object=this actor)
    const localFollowers = await db.query.follows.findMany({
      where: eq(follows.followingId, id)
    });

    // Count remote follows from activities
    const remoteFollows = await db.query.apActivities.findMany({
      where: and(
        eq(apActivities.type, 'Follow'),
        eq(apActivities.objectId, `${base}/ap/users/${id}`),
        eq(apActivities.direction, 'incoming')
      )
    });

    const total = localFollowers.length + remoteFollows.length;
    const items = [
      ...localFollowers.map(f => `${base}/ap/users/${f.followerId}`),
      ...remoteFollows.map(a => a.actorId)
    ];

    if (page) {
      // Return OrderedCollectionPage with items
      return c.json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        type: 'OrderedCollectionPage',
        partOf: `${base}/ap/users/${id}/followers`,
        orderedItems: items
      }, 200, { 'Content-Type': ACTIVITY_JSON });
    }

    // Return collection root (no items, just metadata)
    return c.json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'OrderedCollection',
      totalItems: total,
      first: `${base}/ap/users/${id}/followers?page=1`
    }, 200, { 'Content-Type': ACTIVITY_JSON });
  });

  ap.get('/users/:id/following', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);
    const base = baseUrl(c);
    const page = c.req.query('page');

    const localFollowing = await db.query.follows.findMany({
      where: eq(follows.followerId, id)
    });

    // Count remote follows we sent (from ap_activities where type=Follow, direction=outgoing)
    const remoteFollowing = await db.query.apActivities.findMany({
      where: and(
        eq(apActivities.type, 'Follow'),
        eq(apActivities.actorId, `${base}/ap/users/${id}`),
        eq(apActivities.direction, 'outgoing')
      )
    });

    const total = localFollowing.length + remoteFollowing.length;
    const items = [
      ...localFollowing.map(f => `${base}/ap/users/${f.followingId}`),
      ...remoteFollowing.map(a => a.objectId)
    ];

    if (page) {
      // Return OrderedCollectionPage with items
      return c.json({
        '@context': 'https://www.w3.org/ns/activitystreams',
        type: 'OrderedCollectionPage',
        partOf: `${base}/ap/users/${id}/following`,
        orderedItems: items
      }, 200, { 'Content-Type': ACTIVITY_JSON });
    }

    // Return collection root (no items, just metadata)
    return c.json({
      '@context': 'https://www.w3.org/ns/activitystreams',
      type: 'OrderedCollection',
      totalItems: total,
      first: `${base}/ap/users/${id}/following?page=1`
    }, 200, { 'Content-Type': ACTIVITY_JSON });
  });

  // ════════════════════════════════════════════════════════════════════════
  // Object endpoint (resolve ActivityStreams objects by URI)
  // ════════════════════════════════════════════════════════════════════════
  ap.get('/objects/:id', async (c) => {
    const { id } = c.req.param();
    const db = createDb(c.env, c.req.raw, c.res);

    // Try to find local content
    const content = await db.query.contents.findFirst({ where: eq(contents.id, id) });
    if (content) {
      const obj = buildVideoObject(c, content);
      return c.json(obj, 200, { 'Content-Type': ACTIVITY_JSON });
    }

    // Try to find an activity
    const activity = await db.query.apActivities.findFirst({ where: eq(apActivities.id, id) });
    if (activity) {
      return c.json(JSON.parse(activity.rawJson), 200, { 'Content-Type': ACTIVITY_JSON });
    }

    return c.json({ error: 'Object not found' }, 404);
  });

  return ap;
}
