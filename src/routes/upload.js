import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { secureHeaders } from 'hono/secure-headers';
import { createDb } from '../db/index.js';
import { B2Service } from '../services/b2.js';
import { ValcornerCDNService } from '../services/valcorner.js';
import {
  uploadPermissions,
  getCdnType,
  createContentSchema,
  uploadSessionResponseSchema
} from '../utils/validators.js';
import { createAuthMiddleware } from '../middleware/auth.js';
import { eq, and, desc } from 'drizzle-orm';
import { contents, uploadSessions, shortDramas, tvSeries, movies, ugcLongVideos, shortVideos, viewCounts } from '../db/schema.js';

export function checkUploadPermission() {
  return async (c, next) => {
    const user = c.get('user');
    const body = await c.req.json().catch(() => ({}));
    const contentType = body.contentType;

    if (!contentType) {
      return c.json({ error: 'Content type required', code: 'MISSING_CONTENT_TYPE' }, 400);
    }

    const allowedTypes = uploadPermissions[user.role];

    if (!allowedTypes.includes(contentType)) {
      return c.json({
        error: 'Insufficient permissions for this content type',
        code: 'PERMISSION_DENIED',
        details: { role: user.role, contentType }
      }, 403);
    }

    await next();
  };
}

export function createUploadRoutes() {
  const upload = new Hono();
  
  upload.use('/*', cors());
  upload.use('/*', secureHeaders());
  
  const auth = createAuthMiddleware();
  
  /**
   * POST /upload/request
   * Request a presigned URL for direct B2 upload
   */
  upload.post('/request', auth, checkUploadPermission(), async (c) => {
    const user = c.get('user');

    try {
      const body = await c.req.json();
      const parsed = createContentSchema.safeParse(body);
      
      if (!parsed.success) {
        return c.json({ 
          error: 'Validation failed', 
          code: 'VALIDATION_ERROR',
          details: parsed.error.flatten()
        }, 400);
      }
      
      const { title, description, contentType, slug, fileSize, duration, mimeType } = parsed.data;

      const db = createDb(c.env, c.req.raw, c.res);
      const b2 = new B2Service(
        c.env.B2_APPLICATION_KEY_ID,
        c.env.B2_APPLICATION_KEY,
        c.env.B2_API_URL,
        c.env.B2_BUCKET_NAME
      );

      // Generate content ID (UUID)
      const contentId = crypto.randomUUID();
      const filename = mimeType?.split('/')[1] || 'file';
      const b2Key = B2Service.generateObjectKey(contentType, contentId, filename);

      // Create content record
      const cdnType = getCdnType(contentType);
      const now = Date.now();

      await db.insert(contents).values({
        id: contentId,
        slug,
        title,
        description,
        contentType,
        uploaderId: user.id,
        b2Bucket: c.env.B2_BUCKET_NAME,
        b2Key,
        cdnType,
        fileSize,
        duration,
        mimeType,
        status: 'pending',
        createdAt: now,
        updatedAt: now
      });

      // Insert into type-specific table
      const typeData = {
        short_drama: () => db.insert(shortDramas).values({ contentsId: contentId }),
        tv_series:  () => db.insert(tvSeries).values({ contentsId: contentId }),
        movie:      () => db.insert(movies).values({ contentsId: contentId }),
        ugc_long_video: () => db.insert(ugcLongVideos).values({ contentsId: contentId }),
        short_video:    () => db.insert(shortVideos).values({ contentsId: contentId }),
      }[contentType];
      if (typeData) await typeData();
      
      // Get native B2 upload URL and auth token
      const { uploadUrl, uploadAuth } = await b2.getUploadUrl(mimeType || 'application/octet-stream');

      // Create upload session
      const sessionId = crypto.randomUUID();
      const expiresAt = now + 3600 * 1000;

      await db.insert(uploadSessions).values({
        id: sessionId,
        userId: user.id,
        contentType,
        b2UploadUrl: uploadUrl,
        b2UploadAuth: uploadAuth,
        b2Key,
        expiresAt,
        contentId,
        status: 'pending',
        createdAt: now
      });

      const response = uploadSessionResponseSchema.parse({
        sessionId,
        uploadUrl,
        uploadAuth,
        b2Key,
        expiresAt,
        contentId
      });
      
      return c.json(response);
    } catch (error) {
      console.error('Upload request failed:', error);
      return c.json({ 
        error: 'Failed to create upload session', 
        code: 'UPLOAD_SESSION_ERROR',
        details: error.message 
      }, 500);
    }
  });
  
  /**
   * POST /upload/complete/:sessionId
   * Mark upload as complete after client finishes direct upload
   */
  upload.post('/complete/:sessionId', auth, async (c) => {
    const { sessionId } = c.req.param();
    const user = c.get('user');
    
    try {
      const db = createDb(c.env, c.req.raw, c.res);

      // Find upload session
      const session = await db.query.uploadSessions.findFirst({
        where: and(
          eq(uploadSessions.id, sessionId),
          eq(uploadSessions.userId, user.id)
        )
      });
      
      if (!session) {
        return c.json({ error: 'Session not found', code: 'SESSION_NOT_FOUND' }, 404);
      }
      
      if (session.status !== 'pending') {
        return c.json({ error: 'Invalid session status', code: 'INVALID_STATUS' }, 400);
      }
      
      if (Date.now() > session.expiresAt) {
        await db.update(uploadSessions)
          .set({ status: 'expired' })
          .where(eq(uploadSessions.id, sessionId));
        return c.json({ error: 'Session expired', code: 'SESSION_EXPIRED' }, 400);
      }
      
      // Update content status to ready
      if (session.contentId) {
        await db.update(contents)
          .set({ 
            status: 'ready',
            updatedAt: Date.now()
          })
          .where(eq(contents.id, session.contentId));
      }
      
      // Mark session as completed
      await db.update(uploadSessions)
        .set({ status: 'completed' })
        .where(eq(uploadSessions.id, sessionId));
      
      return c.json({ success: true, contentId: session.contentId });
    } catch (error) {
      console.error('Upload completion failed:', error);
      return c.json({ 
        error: 'Failed to complete upload', 
        code: 'UPLOAD_COMPLETE_ERROR',
        details: error.message 
      }, 500);
    }
  });
  
  return upload;
}

export function createContentRoutes() {
  const content = new Hono();

  content.use('/*', cors());
  content.use('/*', secureHeaders());

  /**
   * GET /content
   * List ready contents, optionally filtered by ?type=
   */
  content.get('/', async (c) => {
    const type = c.req.query('type') || c.req.query('category');
    const page = Math.max(parseInt(c.req.query('page') || '1', 10), 1);
    const limit = Math.min(Math.max(parseInt(c.req.query('limit') || '20', 10) || 20, 1), 50);

    try {
      const db = createDb(c.env, c.req.raw, c.res);

      const conditions = [eq(contents.status, 'ready')];
      if (type) {
        conditions.push(eq(contents.contentType, type));
      }
      const uploaderId = c.req.query('uploader');
      if (uploaderId) {
        conditions.push(eq(contents.uploaderId, uploaderId));
      }

      const items = await db.query.contents.findMany({
        where: and(...conditions),
        with: {
          uploader: true,
          viewCount: true,
          shortDrama: true,
          tvSeries: true,
          movie: true,
          ugcLongVideo: true,
          shortVideo: true
        },
        orderBy: desc(contents.createdAt),
        limit,
        offset: (page - 1) * limit
      });

      const result = items.map((item) => {
        const typeMeta = item.contentType === 'short_drama' ? item.shortDrama
          : item.contentType === 'tv_series' ? item.tvSeries
          : item.contentType === 'movie' ? item.movie
          : item.contentType === 'ugc_long_video' ? item.ugcLongVideo
          : item.contentType === 'short_video' ? item.shortVideo
          : null;
        return {
          id: item.id,
          slug: item.slug,
          title: item.title,
          contentType: item.contentType,
          duration: item.duration,
          mimeType: item.mimeType,
          createdAt: item.createdAt,
          views: item.viewCount?.count || 0,
          uploader: {
            id: item.uploader?.id,
            name: item.uploader?.name,
            avatar: item.uploader?.avatar
          },
          genre: typeMeta?.genre,
          director: typeMeta?.director,
          season: typeMeta?.season,
          totalEpisodes: typeMeta?.totalEpisodes,
          seriesStatus: typeMeta?.status,
          rating: typeMeta?.rating,
          platform: typeMeta?.platform,
          hashtags: typeMeta?.hashtags
        };
      });

      return c.json(result);
    } catch (error) {
      console.error('Content list failed:', error);
      return c.json({
        error: 'Failed to list content',
        code: 'LIST_ERROR',
        details: error.message
      }, 500);
    }
  });

  /**
   * GET /content/:id
   * Get content metadata and CDN access info
   */
  content.get('/:id', async (c) => {
    const { id } = c.req.param();

    try {
      const db = createDb(c.env, c.req.raw, c.res);
      const valcorner = new ValcornerCDNService();

      const contentItem = await db.query.contents.findFirst({
        where: eq(contents.id, id),
        with: {
          uploader: true,
          viewCount: true,
          shortDrama: true,
          tvSeries: true,
          movie: true,
          ugcLongVideo: true,
          shortVideo: true
        }
      });

      if (!contentItem) {
        return c.json({ error: 'Content not found', code: 'NOT_FOUND' }, 404);
      }

      if (contentItem.status !== 'ready') {
        return c.json({ error: 'Content not ready', code: 'NOT_READY' }, 400);
      }

      // Generate CDN access info
      const cdnAccess = valcorner.generateCdnAccessInfo(
        contentItem.contentType,
        contentItem.id,
        contentItem.manifestIndex,
        contentItem.manifestIndex ? null : 'file'
      );

      // Increment view count (async, don't wait)
      c.executionCtx.waitUntil(
        incrementViewCount(db, id)
      );

      const typeMeta = contentItem.contentType === 'short_drama' ? contentItem.shortDrama
        : contentItem.contentType === 'tv_series' ? contentItem.tvSeries
        : contentItem.contentType === 'movie' ? contentItem.movie
        : contentItem.contentType === 'ugc_long_video' ? contentItem.ugcLongVideo
        : contentItem.contentType === 'short_video' ? contentItem.shortVideo
        : null;

      return c.json({
        id: contentItem.id,
        slug: contentItem.slug,
        title: contentItem.title,
        description: contentItem.description,
        contentType: contentItem.contentType,
        duration: contentItem.duration,
        mimeType: contentItem.mimeType,
        createdAt: contentItem.createdAt,
        views: contentItem.viewCount?.count || 0,
        creator: {
          id: contentItem.uploader?.id,
          name: contentItem.uploader?.name,
          avatar: contentItem.uploader?.avatar
        },
        cdn: cdnAccess,
        genre: typeMeta?.genre,
        director: typeMeta?.director,
        season: typeMeta?.season,
        totalEpisodes: typeMeta?.totalEpisodes,
        seriesStatus: typeMeta?.status,
        rating: typeMeta?.rating,
        platform: typeMeta?.platform,
        hashtags: typeMeta?.hashtags
      });
    } catch (error) {
      console.error('Content fetch failed:', error);
      return c.json({
        error: 'Failed to fetch content',
        code: 'FETCH_ERROR',
        details: error.message
      }, 500);
    }
  });

  return content;
}

async function incrementViewCount(db, contentId) {
  try {
    // Upsert view count
    await db.run(`
      INSERT INTO view_counts (content_id, count, last_synced_at)
      VALUES (?, 1, ?)
      ON CONFLICT(content_id) DO UPDATE SET 
        count = count + 1,
        last_synced_at = ?
    `, [contentId, Date.now(), Date.now()]);
  } catch (error) {
    console.error('Failed to increment view count:', error);
  }
}
