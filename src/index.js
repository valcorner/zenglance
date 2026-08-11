/**
 * ZenGlance - Self-hosted Multi-modal Content Platform
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
import interactions from './routes/interactions.js';
import { createAuthMiddleware, requireRole } from './middleware/auth.js';
import { users, roles, collections, collectionItems, contents } from './db/schema.js';
import { eq } from 'drizzle-orm';
import { roleSchema } from './utils/validators.js';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('/api/*', prettyJSON());

// Auth middleware (must be defined before routes that use it)
const auth = createAuthMiddleware();

// Health check
app.get('/health', (c) => {
  return c.json({
    name: 'ZenGlance API',
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
