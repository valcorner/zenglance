import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// User roles enum
export const roles = ['free', 'senior', 'admin'];

// Content types enum
export const contentTypes = [
  'short_drama',
  'tv_series',
  'movie',
  'ugc_long_video',
  'short_video'
];

// Users table - stores OAuth user info
export const users = sqliteTable('users', {
  id: text('id').primaryKey(), // Valcorner OAuth user ID
  email: text('email').notNull().unique(),
  name: text('name'),
  avatar: text('avatar'),
  role: text('role', { enum: roles }).notNull().default('free'),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('users_email_idx').on(table.email),
  index('users_role_idx').on(table.role)
]);

// Contents table - metadata for all media
export const contents = sqliteTable('contents', {
  id: text('id').primaryKey(), // D1 generated content_id (UUID)
  slug: text('slug').notNull().unique(), // Human-readable URL slug
  title: text('title').notNull(),
  description: text('description'),
  contentType: text('content_type', { enum: contentTypes }).notNull(),

  // Upload info
  uploaderId: text('uploader_id').notNull().references(() => users.id),
  b2Bucket: text('b2_bucket').notNull(),
  b2Key: text('b2_key').notNull(), // B2 对象路径
  
  // CDN routing info
  cdnType: text('cdn_type').notNull(), // drama/series/movie/video/short
  
  // File info
  fileSize: integer('file_size'),
  duration: integer('duration'), // seconds, for video/audio
  mimeType: text('mime_type'),
  
  // Manifest files (for HLS/DASH)
  manifestIndex: text('manifest_index'), // e.g., "1.m3u8" or "1.mpd"
  
  // Status
  status: text('status').notNull().default('pending'), // pending, ready, error
  errorCode: text('error_code'),
  errorMessage: text('error_message'),
  
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('contents_slug_idx').on(table.slug),
  index('contents_uploader_idx').on(table.uploaderId),
  index('contents_type_idx').on(table.contentType),
  index('contents_status_idx').on(table.status)
]);

// Upload sessions table - tracks presigned URL sessions
export const uploadSessions = sqliteTable('upload_sessions', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  contentType: text('content_type', { enum: contentTypes }).notNull(),
  b2UploadUrl: text('b2_upload_url').notNull(), // B2 upload URL (from b2_get_upload_url)
  b2UploadAuth: text('b2_upload_auth').notNull(), // B2 upload Authorization token (Bearer header)
  b2Key: text('b2_key').notNull(), // Target object key
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  status: text('status').notNull().default('pending'), // pending, completed, expired
  contentId: text('content_id'), // Linked content after upload
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('upload_sessions_user_idx').on(table.userId),
  index('upload_sessions_expires_idx').on(table.expiresAt)
]);

// View counts cache (stored in D1)
export const viewCounts = sqliteTable('view_counts', {
  contentId: text('content_id').primaryKey().references(() => contents.id),
  count: integer('count').notNull().default(0),
  lastSyncedAt: integer('last_synced_at', { mode: 'timestamp' })
});

// OAuth states table - stores PKCE code verifiers temporarily
export const oauthStates = sqliteTable('oauth_states', {
  id: text('id').primaryKey(), // UUID state parameter
  codeVerifier: text('code_verifier').notNull(),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => Date.now())
}, (table) => [
  index('oauth_states_expires_idx').on(table.expiresAt)
]);

// Sessions table - 服务端会话（替代 JWT）
// 前端把 session.id 作为 Bearer token，Workers 每次请求查表校验
export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(), // UUID session token
  userId: text('user_id').notNull().references(() => users.id),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => Date.now())
}, (table) => [
  index('sessions_user_idx').on(table.userId),
  index('sessions_expires_idx').on(table.expiresAt)
]);

// ---------------------------------------------------------------------------
// Likes table
// ---------------------------------------------------------------------------
export const likes = sqliteTable('likes', {
  userId: text('user_id').notNull().references(() => users.id),
  contentId: text('content_id').notNull().references(() => contents.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  { name: 'likes_user_content_unique', constraints: table.unique().on(table.userId, table.contentId) }
]);

// ---------------------------------------------------------------------------
// Favorites table
// ---------------------------------------------------------------------------
export const favorites = sqliteTable('favorites', {
  userId: text('user_id').notNull().references(() => users.id),
  contentId: text('content_id').notNull().references(() => contents.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  { name: 'favorites_user_content_unique', constraints: table.unique().on(table.userId, table.contentId) }
]);

// ---------------------------------------------------------------------------
// Comments table
// ---------------------------------------------------------------------------
export const comments = sqliteTable('comments', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull().references(() => contents.id),
  userId: text('user_id').notNull().references(() => users.id),
  body: text('body').notNull(),
  parentId: text('parent_id').references(() => comments.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('comments_content_idx').on(table.contentId),
  index('comments_parent_idx').on(table.parentId)
]);

// ---------------------------------------------------------------------------
// Follows table
// ---------------------------------------------------------------------------
export const follows = sqliteTable('follows', {
  followerId: text('follower_id').notNull().references(() => users.id),
  followingId: text('following_id').notNull().references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  { name: 'follows_unique', constraints: table.unique().on(table.followerId, table.followingId) }
]);

// ---------------------------------------------------------------------------
// Collections table
// ---------------------------------------------------------------------------
export const collections = sqliteTable('collections', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().references(() => users.id),
  name: text('name').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('collections_user_idx').on(table.userId)
]);

// ---------------------------------------------------------------------------
// Collection items table
// ---------------------------------------------------------------------------
export const collectionItems = sqliteTable('collection_items', {
  collectionId: text('collection_id').notNull().references(() => collections.id),
  contentId: text('content_id').notNull().references(() => contents.id),
  addedAt: integer('added_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  { name: 'collection_items_unique', constraints: table.unique().on(table.collectionId, table.contentId) },
  index('collection_items_content_idx').on(table.contentId)
]);

// ---------------------------------------------------------------------------
// Relations - 必需，否则 db.query.*.findMany({ with: {...} }) 会抛错
// ---------------------------------------------------------------------------

export const usersRelations = relations(users, ({ many }) => ({
  uploadedContents: many(contents),
  uploadSessions: many(uploadSessions),
  sessions: many(sessions),
  likes: many(likes),
  favorites: many(favorites),
  comments: many(comments),
  follows: many(follows),
  followedBy: many(follows, { relationName: 'follows' }),
  collections: many(collections)
}));

export const contentsRelations = relations(contents, ({ one, many }) => ({
  uploader: one(users, {
    fields: [contents.uploaderId],
    references: [users.id]
  }),
  uploadSessions: many(uploadSessions),
  viewCount: one(viewCounts),
  likes: many(likes),
  favorites: many(favorites),
  comments: many(comments),
  collectionItems: many(collectionItems)
}));

export const uploadSessionsRelations = relations(uploadSessions, ({ one }) => ({
  user: one(users, {
    fields: [uploadSessions.userId],
    references: [users.id]
  }),
  content: one(contents, {
    fields: [uploadSessions.contentId],
    references: [contents.id]
  })
}));

export const viewCountsRelations = relations(viewCounts, ({ one }) => ({
  content: one(contents, {
    fields: [viewCounts.contentId],
    references: [contents.id]
  })
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}));

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(users, { fields: [likes.userId], references: [users.id] }),
  content: one(contents, { fields: [likes.contentId], references: [contents.id] })
}));

export const favoritesRelations = relations(favorites, ({ one }) => ({
  user: one(users, { fields: [favorites.userId], references: [users.id] }),
  content: one(contents, { fields: [favorites.contentId], references: [contents.id] })
}));

export const commentsRelations = relations(comments, ({ one, many }) => ({
  content: one(contents, { fields: [comments.contentId], references: [contents.id] }),
  author: one(users, { fields: [comments.userId], references: [users.id] }),
  parent: one(comments, { fields: [comments.parentId], references: [comments.id] }),
  replies: many(comments, { relationName: 'commentReplies' })
}));

export const followsRelations = relations(follows, ({ one }) => ({
  follower: one(users, { fields: [follows.followerId], references: [users.id] }),
  following: one(users, { fields: [follows.followingId], references: [users.id] })
}));

export const collectionsRelations = relations(collections, ({ one, many }) => ({
  owner: one(users, { fields: [collections.userId], references: [users.id] }),
  items: many(collectionItems)
}));

export const collectionItemsRelations = relations(collectionItems, ({ one }) => ({
  collection: one(collections, { fields: [collectionItems.collectionId], references: [collections.id] }),
  content: one(contents, { fields: [collectionItems.contentId], references: [contents.id] })
}));
