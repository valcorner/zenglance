import { Hono } from 'hono';
import { eq, desc, asc, count } from 'drizzle-orm';
import { db, users, contents, likes, favorites, comments, follows, collections, collectionItems } from '../db/schema.js';

const interaction = new Hono();
const auth = createAuthMiddleware();

// Helper
function generateId() {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Likes ──────────────────────────────────────────────────────────────────

interaction.get('/content/:id/likes', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');

  try {
    const countResult = await db.select({ count: count() }).from(likes).where(eq(likes.contentId, contentId));
    const likeCount = countResult[0]?.count ?? 0;

    const liked = await db.select().from(likes)
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

  const existing = await db.select().from(likes)
    .where(eq(likes.contentId, contentId))
    .and(eq(likes.userId, user.id));

  if (existing.length > 0) {
    await db.delete(likes).where(eq(likes.userId, user.id)).and(eq(likes.contentId, contentId));
    return c.json({ liked: false });
  } else {
    await db.insert(likes).values({
      userId: user.id,
      contentId,
      createdAt: new Date()
    });
    return c.json({ liked: true });
  }
});

// ─── Favorites / Save ───────────────────────────────────────────────────────

interaction.get('/content/:id/favorite', auth, async (c) => {
  const user = c.get('user');
  const contentId = c.req.param('id');

  try {
    const countResult = await db.select({ count: count() }).from(favorites).where(eq(favorites.contentId, contentId));
    const favoriteCount = countResult[0]?.count ?? 0;

    const favorited = await db.select().from(favorites)
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

  const existing = await db.select().from(favorites)
    .where(eq(favorites.contentId, contentId))
    .and(eq(favorites.userId, user.id));

  if (existing.length > 0) {
    await db.delete(favorites).where(eq(favorites.userId, user.id)).and(eq(favorites.contentId, contentId));
    return c.json({ favorited: false });
  } else {
    await db.insert(favorites).values({
      userId: user.id,
      contentId,
      createdAt: new Date()
    });
    return c.json({ favorited: true });
  }
});

// ─── Comments ───────────────────────────────────────────────────────────────

interaction.get('/content/:id/comments', async (c) => {
  const contentId = c.req.param('id');
  const cursor = c.req.query('cursor');
  const limit = Math.min(parseInt(c.req.query('limit') || '20', 10), 50);

  try {
    const where = eq(comments.contentId, contentId);
    const order = desc(comments.createdAt);

    const rows = await db
      .select({
        id: comments.id,
        userId: comments.userId,
        body: comments.body,
        parentId: comments.parentId,
        createdAt: comments.createdAt,
        updatedAt: comments.updatedAt
      })
      .from(comments)
      .where(where)
      .orderBy(order)
      .limit(limit + 1);

    let nextCursor = null;
    if (rows.length > limit) {
      nextCursor = rows[limit].id;
      rows.pop();
    }

    const withUsernames = await Promise.all(rows.map(async (row) => {
      const u = await db.select({ name: users.name }).from(users).where(eq(users.id, row.userId));
      return { ...row, user: u[0]?.name || 'Unknown' };
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
  const now = new Date();

  const { body, parentId } = await c.req.json();

  if (!body || typeof body !== 'string' || body.trim().length === 0) {
    return c.json({ error: 'body is required' }, 400);
  }

  if (parentId) {
    const parent = await db.select().from(comments).where(eq(comments.id, parentId)).limit(1);
    if (parent.length === 0 || parent[0].contentId !== contentId) {
      return c.json({ error: 'Invalid parent comment' }, 400);
    }
  }

  const id = generateId();
  await db.insert(comments).values({
    id,
    contentId,
    userId: user.id,
    body: body.trim(),
    parentId: parentId || null,
    createdAt: now,
    updatedAt: now
  });

  const u = await db.select({ name: users.name }).from(users).where(eq(users.id, user.id));
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

  const comment = await db.select().from(comments).where(eq(comments.id, commentId)).limit(1);
  if (comment.length === 0) return c.json({ error: 'Not found' }, 404);

  if (comment[0].userId !== user.id) return c.json({ error: 'Forbidden' }, 403);

  await db.delete(comments).where(eq(comments.id, commentId));
  return c.json({ ok: true });
});

// ─── Follow ─────────────────────────────────────────────────────────────────

interaction.get('/users/:id/following', auth, async (c) => {
  const user = c.get('user');
  const targetId = c.req.param('id');

  if (user.id === targetId) return c.json({ following: false });

  const existing = await db.select().from(follows)
    .where(eq(follows.followerId, user.id))
    .and(eq(follows.followingId, targetId));

  return c.json({ following: existing.length > 0 });
});

interaction.post('/users/:id/follow', auth, async (c) => {
  const user = c.get('user');
  const targetId = c.req.param('id');

  if (user.id === targetId) return c.json({ following: false });

  const existing = await db.select().from(follows)
    .where(eq(follows.followerId, user.id))
    .and(eq(follows.followingId, targetId));

  if (existing.length > 0) {
    await db.delete(follows).where(eq(follows.followerId, user.id)).and(eq(follows.followingId, targetId));
    return c.json({ following: false });
  } else {
    await db.insert(follows).values({
      followerId: user.id,
      followingId: targetId,
      createdAt: new Date()
    });
    return c.json({ following: true });
  }
});

// ─── Collections ────────────────────────────────────────────────────────────

interaction.get('/collections', auth, async (c) => {
  const user = c.get('user');

  try {
    const list = await db.select()
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

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return c.json({ error: 'name is required' }, 400);
  }

  const id = generateId();
  const now = new Date();
  await db.insert(collections).values({ id, userId: user.id, name: name.trim(), createdAt: now, updatedAt: now });
  return c.json({ id, userId: user.id, name: name.trim(), createdAt: now, updatedAt: now });
});

interaction.put('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const { name } = await c.req.json();

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return c.json({ error: 'name is required' }, 400);
  }

  const col = await db.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await db.update(collections).set({ name: name.trim(), updatedAt: new Date() }).where(eq(collections.id, id));
  return c.json({ id, userId: user.id, name: name.trim(), updatedAt: new Date() });
});

interaction.delete('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');

  const col = await db.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await db.delete(collectionItems).where(eq(collectionItems.collectionId, id));
  await db.delete(collections).where(eq(collections.id, id));
  return c.json({ ok: true });
});

// Get collection with contents
interaction.get('/collections/:id', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');

  const col = await db.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  const items = await db
    .select({ contentId: collectionItems.contentId, addedAt: collectionItems.addedAt })
    .from(collectionItems)
    .where(eq(collectionItems.collectionId, id));

  const contentMap = {};
  for (const item of items) {
    const rows = await db.select().from(contents).where(eq(contents.id, item.contentId)).limit(1);
    if (rows.length) contentMap[item.contentId] = { ...rows[0], addedAt: item.addedAt };
  }

  return c.json({
    id: col[0].id,
    userId: col[0].userId,
    name: col[0].name,
    createdAt: col[0].createdAt,
    updatedAt: col[0].updatedAt,
    contents: Object.values(contentMap)
  });
});

// Add content to collection
interaction.post('/collections/:id/items', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const { contentId } = await c.req.json();

  if (!contentId) return c.json({ error: 'contentId is required' }, 400);

  const col = await db.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  const existing = await db.select().from(collectionItems)
    .where(eq(collectionItems.collectionId, id)).and(eq(collectionItems.contentId, contentId));

  if (existing.length > 0) return c.json({ added: false });

  await db.insert(collectionItems).values({ collectionId: id, contentId, addedAt: new Date() });
  await db.update(collections).set({ updatedAt: new Date() }).where(eq(collections.id, id));
  return c.json({ added: true });
});

// Remove content from collection
interaction.delete('/collections/:id/items/:contentId', auth, async (c) => {
  const user = c.get('user');
  const id = c.req.param('id');
  const contentId = c.req.param('contentId');

  const col = await db.select().from(collections).where(eq(collections.id, id)).and(eq(collections.userId, user.id)).limit(1);
  if (col.length === 0) return c.json({ error: 'Not found' }, 404);

  await db.delete(collectionItems).where(eq(collectionItems.collectionId, id)).and(eq(collectionItems.contentId, contentId));
  await db.update(collections).set({ updatedAt: new Date() }).where(eq(collections.id, id));
  return c.json({ ok: true });
});

export default interaction;
