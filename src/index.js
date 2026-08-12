/**
 * Video - Self-hosted Multi-modal Content Platform
 * 
 * Architecture:
 * - Write: Client → Backblaze B2 (native REST API presigned upload URL)
 * - Read: Client → Valcorner CDN (direct with Token API)
 * - Workers: Metadata management, auth, presigned URL generation
 */

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { createDb } from './db/index.js';
import { createAuthRoutes } from './routes/auth.js';
import { createUploadRoutes, createContentRoutes } from './routes/upload.js';
import { createAdsRoutes } from './routes/ads.js';
import { createActivityPubRoutes } from './routes/activitypub.js';
import { createAuditRoutes } from './routes/audit.js';
import interactions from './routes/interactions.js';
import { createAuthMiddleware, requireRole } from './middleware/auth.js';
import { users, roles, collections, collectionItems, contents, shortDramas, tvSeries, movies, ugcLongVideos, shortVideos } from './db/schema.js';
import { eq, count, desc, and, inArray, or, like } from 'drizzle-orm';
import { roleSchema, getCdnType, adminCreateContentSchema, adminUpdateContentSchema } from './utils/validators.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('/api/*', prettyJSON());

// Auth middleware (must be defined before routes that use it)
const auth = createAuthMiddleware();

// Health check
app.get('/health', (c) => {
  return c.json({
    name: 'Video API',
    version: '0.1.0',
    status: 'healthy'
  });
});

// Auth routes
app.route('/auth', createAuthRoutes());

// Upload routes (presigned URLs for B2 direct upload)
app.route('/api/upload', createUploadRoutes());

// Content routes (metadata + CDN access info)
app.route('/api/content', createContentRoutes());

// Interaction routes
app.route('/api/interaction', interactions);

// Ads routes
app.route('/api/ads', createAdsRoutes());

// Content audit routes (Llama Guard 3 8B safety classification)
app.route('/api/audit', createAuditRoutes());

// ActivityPub routes (federation: WebFinger, NodeInfo, Actor, Inbox, Outbox, etc.)
app.route('/', createActivityPubRoutes());

// Playlists (collections mapped to playlist format)
app.get('/api/playlists', auth, async (c) => {
  const user = c.get('user');
  const db = createDb(c.env, c.req.raw, c.res);

  try {
    const cols = await db.select().from(collections)
      .where(eq(collections.userId, user.id))
      .orderBy(collections.updatedAt);

    const result = await Promise.all(cols.map(async (col) => {
      const items = await db.select().from(collectionItems)
        .where(eq(collectionItems.collectionId, col.id));

      const contentIds = items.map(i => i.contentId);
      const videoList = contentIds.length
        ? await db.select().from(contents)
            .where(inArray(contents.id, contentIds))
            .orderBy(contents.createdAt)
        : [];

      return {
        id: col.id,
        name: col.name,
        description: null,
        createdAt: col.createdAt,
        updatedAt: col.updatedAt,
        videos: videoList.map(v => ({
          id: v.id,
          title: v.title,
          contentType: v.contentType,
          duration: v.duration,
          views: 0,
          thumbnail: null,
          creator: null
        }))
      };
    }));

    return c.json({ data: result });
  } catch (e) {
    return c.json({ data: [] });
  }
});

// User management routes
app.get('/api/users/:id', async (c) => {
  const { id } = c.req.param();

  try {
    const db = createDb(c.env, c.req.raw, c.res);
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });

    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }

    // Public profile fields only
    return c.json({
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      role: user.role,
      createdAt: user.createdAt
    });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Admin: List all users (requires admin role)
app.get('/api/admin/users', auth, requireRole('admin'), async (c) => {
  const page = Math.max(1, parseInt(c.req.query('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20')));
  const offset = (page - 1) * limit;

  try {
    const db = createDb(c.env, c.req.raw, c.res);
    const [items, totalResult] = await Promise.all([
        db.select({ id: users.id, email: users.email, name: users.name, avatar: users.avatar, role: users.role, createdAt: users.createdAt, updatedAt: users.updatedAt })
          .from(users)
          .limit(limit)
          .offset(offset)
          .orderBy(users.createdAt),
        db.select({ total: count() }).from(users)
      ]);
    return c.json({ data: items, page, limit, total: totalResult[0]?.total ?? 0 });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Admin: Upgrade user role (requires admin role)
app.post('/api/admin/users/:id/role', auth, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  const body = await c.req.json().catch(() => ({}));
  const role = body.role;

  if (!roleSchema.safeParse(role).success) {
    return c.json({
      error: 'Invalid role',
      code: 'VALIDATION_ERROR',
      details: { allowed: roles }
    }, 400);
  }

  try {
    const db = createDb(c.env, c.req.raw, c.res);
    await db.update(users)
      .set({ role, updatedAt: Date.now() })
      .where(eq(users.id, id));

    return c.json({ success: true });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// ---------------------------------------------------------------------------
// Admin: Content Management (requires admin role)
// ---------------------------------------------------------------------------

// Admin: List all content with filters & pagination
app.get('/api/admin/content', auth, requireRole('admin'), async (c) => {
  const page = Math.max(1, parseInt(c.req.query('page') || '1'));
  const limit = Math.min(100, Math.max(1, parseInt(c.req.query('limit') || '20')));
  const offset = (page - 1) * limit;
  const type = c.req.query('type');
  const status = c.req.query('status');
  const uploader = c.req.query('uploader');
  const search = c.req.query('search');

  try {
    const db = createDb(c.env, c.req.raw, c.res);
    const conditions = [];
    if (type) conditions.push(eq(contents.contentType, type));
    if (status) conditions.push(eq(contents.status, status));
    if (uploader) conditions.push(eq(contents.uploaderId, uploader));
    if (search) {
      conditions.push(or(
        like(contents.title, `%${search}%`),
        like(contents.slug, `%${search}%`),
        like(contents.description, `%${search}%`)
      ));
    }

    const whereClause = conditions.length ? and(...conditions) : undefined;
    const [items, totalResult] = await Promise.all([
      db.select()
        .from(contents)
        .where(whereClause)
        .leftJoin(users, eq(contents.uploaderId, users.id))
        .orderBy(desc(contents.createdAt))
        .limit(limit)
        .offset(offset),
      db.select({ total: count() }).from(contents).where(whereClause)
    ]);

    const data = items.map(row => {
      const c = row.contents;
      const u = row.users;
      return {
        id: c.id,
        slug: c.slug,
        title: c.title,
        description: c.description,
        contentType: c.contentType,
        status: c.status,
        uploaderId: c.uploaderId,
        uploaderName: u?.name || null,
        uploaderEmail: u?.email || null,
        fileSize: c.fileSize,
        duration: c.duration,
        mimeType: c.mimeType,
        manifestIndex: c.manifestIndex,
        cdnType: c.cdnType,
        b2Key: c.b2Key,
        createdAt: c.createdAt,
        updatedAt: c.updatedAt
      };
    });

    return c.json({ data, page, limit, total: totalResult[0]?.total ?? 0 });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Admin: Get content detail with all type-specific metadata
app.get('/api/admin/content/:id', auth, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  try {
    const db = createDb(c.env, c.req.raw, c.res);
    const item = await db.query.contents.findFirst({
      where: eq(contents.id, id),
      with: {
        uploader: true,
        shortDrama: true,
        tvSeries: true,
        movie: true,
        ugcLongVideo: true,
        shortVideo: true
      }
    });

    if (!item) {
      return c.json({ error: 'Content not found' }, 404);
    }

    return c.json({
      data: {
        id: item.id,
        slug: item.slug,
        title: item.title,
        description: item.description,
        contentType: item.contentType,
        status: item.status,
        uploaderId: item.uploaderId,
        uploader: item.uploader ? {
          id: item.uploader.id,
          name: item.uploader.name,
          email: item.uploader.email,
          avatar: item.uploader.avatar
        } : null,
        b2Bucket: item.b2Bucket,
        b2Key: item.b2Key,
        cdnType: item.cdnType,
        fileSize: item.fileSize,
        duration: item.duration,
        mimeType: item.mimeType,
        manifestIndex: item.manifestIndex,
        errorCode: item.errorCode,
        errorMessage: item.errorMessage,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        // Type-specific
        shortDrama: item.shortDrama,
        tvSeries: item.tvSeries ? { ...item.tvSeries, seriesStatus: item.tvSeries.status } : null,
        movie: item.movie,
        ugcLongVideo: item.ugcLongVideo,
        shortVideo: item.shortVideo
      }
    });
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

function buildTypeSpecificData(body, contentType) {
  const data = {};
  if (contentType === 'short_drama') {
    if (body.season !== undefined) data.season = body.season;
    if (body.totalEpisodes !== undefined) data.totalEpisodes = body.totalEpisodes;
    if (body.episodeLength !== undefined) data.episodeLength = body.episodeLength;
    if (body.studio !== undefined) data.studio = body.studio;
    if (body.genre !== undefined) data.genre = body.genre;
  } else if (contentType === 'tv_series') {
    if (body.totalSeasons !== undefined) data.totalSeasons = body.totalSeasons;
    if (body.totalEpisodes !== undefined) data.totalEpisodes = body.totalEpisodes;
    if (body.seriesStatus !== undefined) data.status = body.seriesStatus;
    if (body.genre !== undefined) data.genre = body.genre;
    if (body.network !== undefined) data.network = body.network;
    if (body.firstAired !== undefined) data.firstAired = body.firstAired;
  } else if (contentType === 'movie') {
    if (body.director !== undefined) data.director = body.director;
    if (body.genre !== undefined) data.genre = body.genre;
    if (body.rating !== undefined) data.rating = body.rating;
    if (body.releaseYear !== undefined) data.releaseYear = body.releaseYear;
    if (body.budget !== undefined) data.budget = body.budget;
    if (body.boxOffice !== undefined) data.boxOffice = body.boxOffice;
  } else if (contentType === 'ugc_long_video') {
    if (body.category !== undefined) data.category = body.category;
    if (body.tags !== undefined) data.tags = body.tags;
    if (body.viewsTarget !== undefined) data.viewsTarget = body.viewsTarget;
    if (body.license !== undefined) data.license = body.license;
  } else if (contentType === 'short_video') {
    if (body.platform !== undefined) data.platform = body.platform;
    if (body.hashtags !== undefined) data.hashtags = body.hashtags;
    if (body.challenge !== undefined) data.challenge = body.challenge;
    if (body.trendingScore !== undefined) data.trendingScore = body.trendingScore;
  }
  return Object.keys(data).length ? data : null;
}

// Admin: Create content directly (no upload session needed)
app.post('/api/admin/content', auth, requireRole('admin'), async (c) => {
  const user = c.get('user');
  try {
    const rawBody = await c.req.json().catch(() => ({}));
    const parsed = adminCreateContentSchema.safeParse(rawBody);
    if (!parsed.success) {
      return c.json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      }, 400);
    }
    const body = parsed.data;

    const db = createDb(c.env, c.req.raw, c.res);
    const contentId = crypto.randomUUID();
    const now = Date.now();
    const cdnType = getCdnType(body.contentType);
    const bucket = body.b2Bucket || 'video-media';
    const b2Key = body.b2Key || `${body.contentType}/${contentId}/source`;

    await db.insert(contents).values({
      id: contentId,
      slug: body.slug,
      title: body.title,
      description: body.description || null,
      contentType: body.contentType,
      uploaderId: user.id,
      b2Bucket: bucket,
      b2Key: b2Key,
      cdnType: cdnType,
      fileSize: body.fileSize || null,
      duration: body.duration || null,
      mimeType: body.mimeType || null,
      manifestIndex: body.manifestIndex || null,
      status: body.status,
      createdAt: now,
      updatedAt: now
    });

    const typeData = buildTypeSpecificData(body, body.contentType);
    const typeInserts = {
      short_drama: () => db.insert(shortDramas).values({ contentsId: contentId, ...(typeData || {}) }),
      tv_series:  () => db.insert(tvSeries).values({ contentsId: contentId, ...(typeData || {}) }),
      movie:      () => db.insert(movies).values({ contentsId: contentId, ...(typeData || {}) }),
      ugc_long_video: () => db.insert(ugcLongVideos).values({ contentsId: contentId, ...(typeData || {}) }),
      short_video:    () => db.insert(shortVideos).values({ contentsId: contentId, ...(typeData || {}) }),
    };
    const ins = typeInserts[body.contentType];
    if (ins) await ins();

    return c.json({ success: true, data: { id: contentId } }, 201);
  } catch (error) {
    console.error('Admin create content failed:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Admin: Update content
app.put('/api/admin/content/:id', auth, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  try {
    const rawBody = await c.req.json().catch(() => ({}));
    const parsed = adminUpdateContentSchema.safeParse(rawBody);
    if (!parsed.success) {
      return c.json({
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: parsed.error.flatten()
      }, 400);
    }
    const body = parsed.data;
    const db = createDb(c.env, c.req.raw, c.res);

    const existing = await db.query.contents.findFirst({ where: eq(contents.id, id) });
    if (!existing) {
      return c.json({ error: 'Content not found' }, 404);
    }

    const contentUpdates = {};
    if (body.title !== undefined) contentUpdates.title = body.title;
    if (body.description !== undefined) contentUpdates.description = body.description;
    if (body.slug !== undefined) contentUpdates.slug = body.slug;
    if (body.status !== undefined) contentUpdates.status = body.status;
    if (body.fileSize !== undefined) contentUpdates.fileSize = body.fileSize;
    if (body.duration !== undefined) contentUpdates.duration = body.duration;
    if (body.mimeType !== undefined) contentUpdates.mimeType = body.mimeType;
    if (body.manifestIndex !== undefined) contentUpdates.manifestIndex = body.manifestIndex;
    if (body.contentType !== undefined && body.contentType !== existing.contentType) {
      contentUpdates.contentType = body.contentType;
      contentUpdates.cdnType = getCdnType(body.contentType);
    }
    contentUpdates.updatedAt = Date.now();

    if (Object.keys(contentUpdates).length) {
      await db.update(contents).set(contentUpdates).where(eq(contents.id, id));
    }

    const effectiveType = body.contentType || existing.contentType;
    const typeData = buildTypeSpecificData(body, effectiveType);
    if (typeData) {
      if (effectiveType === 'short_drama') {
        await db.insert(shortDramas).values({ contentsId: id, ...typeData })
          .onConflictDoUpdate({ target: shortDramas.contentsId, set: typeData });
      } else if (effectiveType === 'tv_series') {
        await db.insert(tvSeries).values({ contentsId: id, ...typeData })
          .onConflictDoUpdate({ target: tvSeries.contentsId, set: typeData });
      } else if (effectiveType === 'movie') {
        await db.insert(movies).values({ contentsId: id, ...typeData })
          .onConflictDoUpdate({ target: movies.contentsId, set: typeData });
      } else if (effectiveType === 'ugc_long_video') {
        await db.insert(ugcLongVideos).values({ contentsId: id, ...typeData })
          .onConflictDoUpdate({ target: ugcLongVideos.contentsId, set: typeData });
      } else if (effectiveType === 'short_video') {
        await db.insert(shortVideos).values({ contentsId: id, ...typeData })
          .onConflictDoUpdate({ target: shortVideos.contentsId, set: typeData });
      }
    }

    return c.json({ success: true });
  } catch (error) {
    console.error('Admin update content failed:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Admin: Delete content
app.delete('/api/admin/content/:id', auth, requireRole('admin'), async (c) => {
  const { id } = c.req.param();
  try {
    const db = createDb(c.env, c.req.raw, c.res);
    const existing = await db.query.contents.findFirst({ where: eq(contents.id, id) });
    if (!existing) {
      return c.json({ error: 'Content not found' }, 404);
    }
    await db.delete(contents).where(eq(contents.id, id));
    return c.json({ success: true });
  } catch (error) {
    console.error('Admin delete content failed:', error);
    return c.json({ error: error.message }, 500);
  }
});

// Error handling
app.onError((err, c) => {
  console.error('Unhandled error:', err);
  return c.json({
    error: 'Internal server error',
    code: 'INTERNAL_ERROR'
  }, 500);
});

// 404 handler
app.notFound((c) => {
  return c.json({
    error: 'Not found',
    code: 'NOT_FOUND'
  }, 404);
});

// Serve static frontend assets (must be last, catches all non-API routes)
app.all('*', async (c) => {
  return c.env.ASSETS?.fetch(c.req.raw) ?? c.notFound();
});

export default app;
