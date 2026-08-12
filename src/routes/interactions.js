import { Hono } from 'hono';
import { eq, desc, count, inArray } from 'drizzle-orm';
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

// ─── Watch History ───────────────────────────────────────────────────────────

interaction.post('/history', auth, async (c) => {
  const user = c.get('user');
  const { contentId } = await c.req.json();
  const d = db(c);

  if (!contentId) return c.json({ error: 'contentId is required' }, 400);

  const existing = await d.select().from(watchHistory)
    .where(eq(watchHistory.userId, user.id)).and(eq(watchHistory.contentId, contentId));

  if (existing.length > 0) {
    await d.update(watchHistory)
      .set({ watchedAt: Date.now() })
      .where(eq(watchHistory.userId, user.id)).and(eq(watchHistory.contentId, contentId));
  } else {
    await d.insert(watchHistory).values({
      userId: user.id,
      contentId,
      watchedAt: Date.now()
    });
  }

  return c.json({ ok: true });
});

interaction.get('/history', auth, async (c) => {
  const user = c.get('user');
  const limit = Math.min(parseInt(c.req.query('limit') || '20', 10), 50);
  const d = db(c);

  try {
    const rows = await d
      .select()
      .from(watchHistory)
      .where(eq(watchHistory.userId, user.id))
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

    return c.json({ history: contentsList, nextCursor });
  } catch (e) {
    console.error('Failed to load history:', e);
    return c.json({ history: [], nextCursor: null });
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
