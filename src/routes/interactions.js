import { Hono } from 'hono';
import { eq, desc, count, inArray, and, gt } from 'drizzle-orm';
import { users, contents, likes, favorites, comments, follows, collections, collectionItems, watchHistory } from '../db/schema.js';
import { createDb } from '../db/index.js';
import { createAuthMiddleware } from '../middleware/auth.js';
import { auditContent } from '../services/audit.js';

const interaction = new Hono();
const auth = createAuthMiddleware();

function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

function db(c) {
  return createDb(c.env, c.req.raw, c.res);
}

// ─── Likes ──────────────────────────────────────────────────────────────────

interaction.get('/content/:id/likes', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');
  const d = db(c);

  try {
    const countResult = await d.select({ count: count() }).from(likes).where(eq(likes.contentId, contentId));
    const likeCount = countResult[0]?.count ?? 0;

    const liked = await d.select().from(likes)
      .where(eq(likes.contentId, contentId))
      .and(eq(likes.userId, user.id));

    return c.json({ likeCount, isLiked: liked.length > 0 });
  } catch (e) {
    return c.json({ likeCount: 0, isLiked: false });
  }
});

interaction.post('/content/:id/like', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');
  const d = db(c);

  const existing = await d.select().from(likes)
    .where(eq(likes.contentId, contentId))
    .and(eq(likes.userId, user.id));

  if (existing.length > 0) {
    await d.delete(likes).where(eq(likes.userId, user.id)).and(eq(likes.contentId, contentId));
    return c.json({ liked: false });
  } else {
    await d.insert(likes).values({
      userId: user.id,
      contentId,
      createdAt: Date.now()
    });
    return c.json({ liked: true });
  }
});

// ─── Favorites / Save ───────────────────────────────────────────────────────

interaction.get('/content/:id/favorite', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');
  const d = db(c);

  try {
    const countResult = await d.select({ count: count() }).from(favorites).where(eq(favorites.contentId, contentId));
    const favoriteCount = countResult[0]?.count ?? 0;

    const favorited = await d.select().from(favorites)
      .where(eq(favorites.contentId, contentId))
      .and(eq(favorites.userId, user.id));

    return c.json({ favoriteCount, isFavorite: favorited.length > 0 });
  } catch (e) {
    return c.json({ favoriteCount: 0, isFavorite: false });
  }
});

interaction.post('/content/:id/favorite', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');
  const d = db(c);

  const existing = await d.select().from(favorites)
    .where(eq(favorites.contentId, contentId))
    .and(eq(favorites.userId, user.id));

  if (existing.length > 0) {
    await d.delete(favorites).where(eq(favorites.userId, user.id)).and(eq(favorites.contentId, contentId));
    return c.json({ favorited: false });
  } else {
    await d.insert(favorites).values({
      userId: user.id,
      contentId,
      createdAt: Date.now()
    });
    return c.json({ favorited: true });
  }
});

// ─── Comments ───────────────────────────────────────────────────────────────

interaction.get('/content/:id/comments', async (c) => {
  const contentId = c.req.param('id');
  const cursor = c.req.query('cursor');
  const limit = Math.min(parseInt(c.req.query('limit') || '20', 10), 50);
  const d = db(c);

  try {
    const rows = await d
      .select({
        id: comments.id,
        userId: comments.userId,
        body: comments.body,
        parentId: comments.parentId,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt,
        userName: users.name
      })
      .from(comments)
      .leftJoin(users, eq(comments.userId, users.id))
      .where(eq(comments.contentId, contentId))
      .orderBy(desc(comments.createdAt))
      .limit(limit + 1);

    let nextCursor = null;
    if (rows.length > limit) {
      nextCursor = rows[limit].id;
      rows.pop();
    }

    const withUsernames = rows.map((row) => ({
      id: row.id,
      userId: row.userId,
      body: row.body,
      parentId: row.parentId,
      createdAt: row.createdAt,
      updatedAt: row.updatedAt,
      user: row.userName || 'Unknown'
    }));

    return c.json({ comments: withUsernames, nextCursor });
  } catch (e) {
    console.error('Failed to load comments:', e);
    return c.json({ comments: [], nextCursor: null });
  }
});

interaction.post('/content/:id/comments', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');
  const now = Date.now();
  const d = db(c);

  const { body, parentId } = await c.req.json();

  if (!body || typeof body !== 'string' || body.trim().length === 0) {
    return c.json({ error: 'body is required' }, 400);
  }

  // Content audit: reject unsafe content before publishing
  try {
    const auditResult = await auditContent(body.trim(), `comment-${contentId}-${now}`, c.env);
    if (!auditResult.isSafe) {
      return c.json({ error: 'Content rejected by safety audit', code: 'UNSAFE_CONTENT' }, 422);
    }
  } catch (e) {
    // Fail-open on audit service errors (don't block comments if AI is down)
    console.error('Comment audit failed (fail-open):', e);
  }

  if (parentId) {
    const parent = await d.select().from(comments).where(eq(comments.id, parentId)).limit(1);
    if (parent.length === 0 || parent[0].contentId !== contentId) {
      return c.json({ error: 'Invalid parent comment' }, 400);
    }
  }

  const id = generateId();
  await d.insert(comments).values({
    id,
    contentId,
    userId: user.id,
    body: body.trim(),
    parentId: parentId || null,
    createdAt: now,
    updatedAt: now
  });

  const u = await d.select({ name: users.name }).from(users).where(eq(users.id, user.id));
  return c.json({
    id,
    userId: user.id,
    body: body.trim(),
    parentId: parentId || null,
    createdAt: now,
    updatedAt: now,
    user: u[0]?.name || 'Unknown'
  });
});

interaction.delete('/comments/:id', auth, async (c) => {
  const user = c.get('user');
  const commentId = c.req.param('id');
  const d = db(c);

  const comment = await d.select().from(comments).where(eq(comments.id, commentId)).limit(1);
  if (comment.length === 0) return c.json({ error: 'Not found' }, 404);

  if (comment[0].userId !== user.id) return c.json({ error: 'Forbidden' }, 403);

  await d.delete(comments).where(eq(comments.id, commentId));
  return c.json({ ok: true });
});

// ─── Follow ─────────────────────────────────────────────────────────────────

interaction.get('/users/:id/followers', auth, async (c) => {
  const user = c.get('user');
  const targetId = c.req.param('id');
  const d = db(c);

  const countResult = await d.select({ count: count() }).from(follows).where(eq(follows.followingId, targetId));
  const followerCount = countResult[0]?.count ?? 0;

  const existing = await d.select().from(follows)
    .where(eq(follows.followerId, user.id))
    .and(eq(follows.followingId, targetId));

  return c.json({ following: existing.length > 0, followerCount });
});

interaction.get('/users/:id/following', auth, async (c) => {
  const user = c.get('user');
  const targetId = c.req.param('id');
  const d = db(c);

  const countResult = await d.select({ count: count() }).from(follows).where(eq(follows.followerId, targetId));
  const followingCount = countResult[0]?.count ?? 0;

  const existing = await d.select().from(follows)
    .where(eq(follows.followerId, user.id))
    .and(eq(follows.followingId, targetId));

  return c.json({ following: existing.length > 0, followingCount });
});

interaction.post('/users/:id/follow', auth, async (c) => {
  const user = c.get('user');
  const targetId = c.req.param('id');
  const d = db(c);

  if (user.id === targetId) return c.json({ following: false });

  const existing = await d.select().from(follows)
    .where(eq(follows.followerId, user.id))
    .and(eq(follows.followingId, targetId));

  if (existing.length > 0) {
    await d.delete(follows).where(eq(follows.followerId, user.id)).and(eq(follows.followingId, targetId));
    return c.json({ following: false });
  } else {
    await d.insert(follows).values({
      followerId: user.id,
      followingId: targetId,
      createdAt: Date.now()
    });
    return c.json({ following: true });
  }
});

// ─── User Profile ───────────────────────────────────────────────────────────

interaction.get('/users/:id', async (c) => {
  const targetId = c.req.param('id');
  const d = db(c);

  const target = await d.select().from(users).where(eq(users.id, targetId)).limit(1);
  if (target.length === 0) return c.json({ error: 'User not found' }, 404);

  const u = target[0];

  const countResult = await d.select({ count: count() }).from(follows).where(eq(follows.followingId, u.id));
  const followerCount = countResult[0]?.count ?? 0;

  const followingCountResult = await d.select({ count: count() }).from(follows).where(eq(follows.followerId, u.id));
  const followingCount = followingCountResult[0]?.count ?? 0;

  return c.json({
    id: u.id,
    name: u.name,
    avatar: u.avatar,
    bio: u.bio,
    role: u.role,
    followerCount,
    followingCount,
    createdAt: u.createdAt
  });
});

// ─── Watch History (encrypted per-device, multi-device sync) ─────────────────

// ── Server-side key wrapping helpers ─────────────────────────────────────────
const HISTORY_KEY_WRAP_SALT = 'zenglance-history-key-wrap-v1';

async function deriveWrapKey(masterKeyB64, userId) {
  const masterKeyBuf = Uint8Array.from(atob(masterKeyB64), c => c.charCodeAt(0)).buffer;
  const masterKey = await crypto.subtle.importKey('raw', masterKeyBuf, 'AES-GCM', false, ['deriveKey']);
  const enc = new TextEncoder();
  return crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: enc.encode(HISTORY_KEY_WRAP_SALT + ':' + userId), iterations: 100000, hash: 'SHA-256' },
    masterKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
}

async function wrapHistoryKey(masterKeyB64, userId, userKey) {
  const aesKey = await deriveWrapKey(masterKeyB64, userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, aesKey, userKey);
  const ctBytes = new Uint8Array(ct);
  return {
    encryptedKey: btoa(String.fromCharCode(...ctBytes.slice(0, ctBytes.length - 16))),
    iv: btoa(String.fromCharCode(...iv)),
    authTag: btoa(String.fromCharCode(...ctBytes.slice(-16)))
  };
}

async function unwrapHistoryKey(masterKeyB64, userId, encryptedKey, iv, authTag) {
  const aesKey = await deriveWrapKey(masterKeyB64, userId);
  const ivBuf = Uint8Array.from(atob(iv), c => c.charCodeAt(0)).buffer;
  const tagBuf = Uint8Array.from(atob(authTag), c => c.charCodeAt(0)).buffer;
  const ctBuf = Uint8Array.from(atob(encryptedKey), c => c.charCodeAt(0)).buffer;
  const ct = new Uint8Array([...new Uint8Array(ctBuf), ...new Uint8Array(tagBuf)]);
  const pt = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, aesKey, ct);
  return new Uint8Array(pt);
}

interaction.post('/history', auth, async (c) => {
  const user = c.get('user');
  const { contentId, deviceId, encryptedHistory, iv, authTag, ctOnly, encryptedProgress, progressIv, progressAuthTag, historyVersion } = await c.req.json();

  if (!contentId || !deviceId || !encryptedHistory) return c.json({ error: 'contentId, deviceId, encryptedHistory required' }, 400);

  const now = Date.now();
  const d = db(c);

  const existing = await d.select().from(watchHistory)
    .where(eq(watchHistory.userId, user.id))
    .and(eq(watchHistory.deviceId, deviceId))
    .and(eq(watchHistory.contentId, contentId));

  if (existing.length > 0) {
    await d.update(watchHistory)
      .set({
        encryptedHistory, iv, authTag, ctOnly,
        encryptedProgress: encryptedProgress || existing[0].encryptedProgress,
        progressIv: progressIv || existing[0].progressIv,
        progressAuthTag: progressAuthTag || existing[0].progressAuthTag,
        historyVersion: historyVersion || existing[0].historyVersion,
        lastSyncedAt: now,
        watchedAt: now
      })
      .where(eq(watchHistory.userId, user.id))
      .and(eq(watchHistory.deviceId, deviceId))
      .and(eq(watchHistory.contentId, contentId));
  } else {
    await d.insert(watchHistory).values({
      userId: user.id,
      deviceId,
      contentId,
      encryptedHistory, iv, authTag, ctOnly,
      encryptedProgress: encryptedProgress || '',
      progressIv: progressIv || '',
      progressAuthTag: progressAuthTag || '',
      historyVersion: historyVersion || 1,
      watchedAt: now,
      lastSyncedAt: now
    });
  }

  return c.json({ ok: true });
});

interaction.get('/history', auth, async (c) => {
  const user = c.get('user');
  const deviceId = c.req.query('device_id') || null;
  const limit = Math.min(parseInt(c.req.query('limit') || '20', 10), 50);
  const d = db(c);

  try {
    const conditions = [eq(watchHistory.userId, user.id)];
    if (deviceId) conditions.push(eq(watchHistory.deviceId, deviceId));

    const rows = await d
      .select()
      .from(watchHistory)
      .where(and(...conditions))
      .orderBy(desc(watchHistory.watchedAt))
      .limit(limit + 1);

    let nextCursor = null;
    if (rows.length > limit) {
      nextCursor = rows[limit].contentId;
      rows.pop();
    }

    const contentIds = rows.map(r => r.contentId);
    const contentsList = contentIds.length
      ? await d.select().from(contents).where(inArray(contents.id, contentIds))
      : [];

    return c.json({ history: contentsList, nextCursor, encrypted: true });
  } catch (e) {
    console.error('Failed to load history:', e);
    return c.json({ history: [], nextCursor: null, encrypted: true });
  }
});

interaction.post('/history/record', auth, async (c) => {
  const user = c.get('user');
  const { contentId, deviceId, watchedAt, encryptedProgress, progressIv, progressAuthTag } = await c.req.json();

  if (!contentId || !deviceId) return c.json({ error: 'contentId and deviceId required' }, 400);

  const now = watchedAt || Date.now();
  const d = db(c);

  const existing = await d.select().from(watchHistory)
    .where(eq(watchHistory.userId, user.id))
    .and(eq(watchHistory.deviceId, deviceId))
    .and(eq(watchHistory.contentId, contentId));

  if (existing.length > 0) {
    await d.update(watchHistory)
      .set({ watchedAt: now, lastSyncedAt: now })
      .where(eq(watchHistory.userId, user.id))
      .and(eq(watchHistory.deviceId, deviceId))
      .and(eq(watchHistory.contentId, contentId));
    if (encryptedProgress) {
      await d.update(watchHistory)
        .set({
          encryptedProgress, progressIv, progressAuthTag, lastSyncedAt: now
        })
        .where(eq(watchHistory.userId, user.id))
        .and(eq(watchHistory.deviceId, deviceId))
        .and(eq(watchHistory.contentId, contentId));
    }
  } else {
    await d.insert(watchHistory).values({
      userId: user.id, deviceId, contentId,
      encryptedHistory: '', iv: '', authTag: '', ctOnly: '',
      encryptedProgress: encryptedProgress || '',
      progressIv: progressIv || '',
      progressAuthTag: progressAuthTag || '',
      watchedAt: now,
      lastSyncedAt: now
    });
  }

  return c.json({ ok: true });
});

interaction.get('/history/encrypted', auth, async (c) => {
  const user = c.get('user');
  const since = c.req.query('since');
  const limit = Math.min(parseInt(c.req.query('limit') || '200', 10), 500);
  const d = db(c);

  try {
    const conditions = [eq(watchHistory.userId, user.id)];
    if (since) conditions.push(gt(watchHistory.lastSyncedAt, parseInt(since, 10)));

    const rows = await d
      .select()
      .from(watchHistory)
      .where(and(...conditions))
      .orderBy(desc(watchHistory.lastSyncedAt))
      .limit(limit);

    return c.json({
      records: rows.map(r => ({
        deviceId: r.deviceId,
        contentId: r.contentId,
        encryptedHistory: r.encryptedHistory,
        iv: r.iv,
        authTag: r.authTag,
        ctOnly: r.ctOnly,
        encryptedProgress: r.encryptedProgress,
        progressIv: r.progressIv,
        progressAuthTag: r.progressAuthTag,
        watchedAt: r.watchedAt,
        lastSyncedAt: r.lastSyncedAt
      }))
    });
  } catch (e) {
    console.error('Failed to get encrypted history:', e);
    return c.json({ records: [] });
  }
});

interaction.delete('/history', auth, async (c) => {
  const user = c.get('user');
  const { contentId, deviceId } = await c.req.json();
  const d = db(c);

  if (contentId && deviceId) {
    await d.delete(watchHistory)
      .where(and(eq(watchHistory.userId, user.id), eq(watchHistory.contentId, contentId), eq(watchHistory.deviceId, deviceId)));
  } else if (deviceId) {
    await d.delete(watchHistory)
      .where(and(eq(watchHistory.userId, user.id), eq(watchHistory.deviceId, deviceId)));
  } else {
    await d.delete(watchHistory).where(eq(watchHistory.userId, user.id));
  }

  return c.json({ ok: true });
});

// ── GET /history/key ── decrypt user's per-user AES key with the master key
// Returns the plaintext 256-bit key as base64 so the client can decrypt history
interaction.get('/history/key', auth, async (c) => {
  const user = c.get('user');
  const masterKeyB64 = c.env.HISTORY_MASTER_KEY;
  if (!masterKeyB64) {
    return c.json({ error: 'History master key not configured' }, 500);
  }
  const d = db(c);

  try {
    const userRow = await d.select().from(users).where(eq(users.id, user.id)).limit(1);
    if (!userRow.length || !userRow[0].encryptedKey) {
      return c.json({ error: 'No history key found', needsSetup: true }, 404);
    }

    const keyBytes = await unwrapHistoryKey(masterKeyB64, user.id,
      userRow[0].encryptedKey, userRow[0].encryptedKeyIv, userRow[0].encryptedKeyAuthTag);
    return c.json({ key: btoa(String.fromCharCode(...keyBytes)) });
  } catch (e) {
    console.error('Failed to unwrap history key:', e);
    return c.json({ error: 'Failed to decrypt history key' }, 500);
  }
});

// ─── Collections ────────────────────────────────────────────────────────────

interaction.get('/collections', auth, async (c) => {
  const user = c.get('user');
  const d = db(c);

  try {
    const list = await d.select()
      .from(collections)
      .where(eq(collections.userId, user.id))
      .orderBy(desc(collections.updatedAt));
    return c.json({ collections: list });
  } catch (e) {
    return c.json({ collections: [] });
  }
});

interaction.post('/collections', auth, async (c) => {
  const user = c.get('user');
  const { name } = await c.req.json();
  const d = db(c);

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return c.json({ error: 'name is required' }, 400);
  }

  const id = generateId();
  const now = Date.now();
  await d.insert(collections).values({ id, userId: user.id, name: name.trim(), createdAt: now, updatedAt: now });
  return c.json({ id, userId: user.id, name: name.trim(), createdAt: now, updatedAt: now });
});

interaction.put('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const { name } = await c.req.json();
  const d = db(c);

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return c.json({ error: 'name is required' }, 400);
  }

  const col = await d.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await d.update(collections).set({ name: name.trim(), updatedAt: Date.now() }).where(eq(collections.id, id));
  return c.json({ id, userId: user.id, name: name.trim(), updatedAt: Date.now() });
});

interaction.delete('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const d = db(c);

  const col = await d.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await d.delete(collectionItems).where(eq(collectionItems.collectionId, id));
  await d.delete(collections).where(eq(collections.id, id));
  return c.json({ ok: true });
});

// Get collection with contents
interaction.get('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const d = db(c);

  const col = await d.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  const items = await d
    .select({ contentId: collectionItems.contentId, addedAt: collectionItems.addedAt })
    .from(collectionItems)
    .where(eq(collectionItems.collectionId, id));

  const contentIds = items.map((i) => i.contentId);
  const contentRows = contentIds.length
    ? await d.select().from(contents).where(inArray(contents.id, contentIds))
    : [];

  const contentMap = {};
  for (const row of contentRows) {
    contentMap[row.id] = row;
  }

  const contentsList = items
    .map((item) => {
      const row = contentMap[item.contentId];
      return row ? { ...row, addedAt: item.addedAt } : null;
    })
    .filter(Boolean);

  return c.json({
    id: col[0].id,
    userId: col[0].userId,
    name: col[0].name,
    createdAt: col[0].createdAt,
    updatedAt: col[0].updatedAt,
    contents: contentsList
  });
});

// Add content to collection
interaction.post('/collections/:id/items', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const { contentId } = await c.req.json();
  const d = db(c);

  if (!contentId) return c.json({ error: 'contentId is required' }, 400);

  const col = await d.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  const existing = await d.select().from(collectionItems)
    .where(eq(collectionItems.collectionId, id)).and(eq(collectionItems.contentId, contentId));

  if (existing.length > 0) return c.json({ added: false });

  await d.insert(collectionItems).values({ collectionId: id, contentId, addedAt: Date.now() });
  await d.update(collections).set({ updatedAt: Date.now() }).where(eq(collections.id, id));
  return c.json({ added: true });
});

// Remove content from collection
interaction.delete('/collections/:id/items/:contentId', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const contentId = c.req.param('contentId');
  const d = db(c);

  const col = await d.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await d.delete(collectionItems).where(eq(collectionItems.collectionId, id)).and(eq(collectionItems.contentId, contentId));
  await d.update(collections).set({ updatedAt: Date.now() }).where(eq(collections.id, id));
  return c.json({ ok: true });
});

export default interaction;
