/**
 * ZenGlance - Self-hosted Multi-modal Content Platform
 * 
 * Architecture:
 * - Write: Client → Backblaze B2 (S3 Presigned URL direct upload)
 * - Read: Client → Valcorner CDN (direct with Token API)
 * - Workers: Metadata management, auth, presigned URL generation
 */

import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { createDb } from './db/index.js';
import { createAuthRoutes } from './routes/auth.js';
import { createUploadRoutes, createContentRoutes } from './routes/upload.js';
import { users } from './db/schema.js';
import { eq } from 'drizzle-orm';

const app = new Hono();

// Middleware
app.use('*', logger());
app.use('/api/*', prettyJSON());

// Health check
app.get('/', (c) => {
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

// User management routes
app.get('/api/users/:id', async (c) => {
  const { id } = c.req.param();
  
  try {
    const db = createDb(c.env);
    const user = await db.query.users.findFirst({
      where: eq(users.id, id)
    });
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404);
    }
    
    // Remove sensitive data
    const { ...publicUser } = user;
    
    return c.json(publicUser);
  } catch (error) {
    return c.json({ error: error.message }, 500);
  }
});

// Admin: Upgrade user role
app.post('/api/admin/users/:id/role', async (c) => {
  // TODO: Add admin auth check
  const { id } = c.req.param();
  const { role } = await c.req.json();
  
  if (!['free', 'premium', 'official'].includes(role)) {
    return c.json({ error: 'Invalid role' }, 400);
  }
  
  try {
    const db = createDb(c.env);
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

export default app;
