import { sqliteTable, text, integer, index } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

// User roles enum
export const roles = ['free', 'premium', 'official'];

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
  isPremium: integer('is_premium', { mode: 'boolean' }).notNull().default(false),
  isEncrypted: integer('is_encrypted', { mode: 'boolean' }).notNull().default(false),
  
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
  index('contents_premium_idx').on(table.isPremium),
  index('contents_status_idx').on(table.status)
]);

// Encryption keys table - stores AES-256-GCM key info (NOT the actual key)
// The actual encrypted content key is stored client-side or in a secure vault
export const encryptionKeys = sqliteTable('encryption_keys', {
  id: text('id').primaryKey(),
  contentId: text('content_id').notNull().unique().references(() => contents.id),
  // We only store metadata here - actual keys are managed client-side
  keyId: text('key_id').notNull(), // Identifier for key retrieval
  iv: text('iv').notNull(), // Base64 encoded initialization vector
  authTag: text('auth_tag'), // Base64 encoded auth tag (GCM)
  keyDerivationInfo: text('key_derivation_info'), // HKDF salt/info for derivation
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull()
}, (table) => [
  index('encryption_keys_content_idx').on(table.contentId)
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
// Relations - 必需，否则 db.query.*.findMany({ with: {...} }) 会抛错
// ---------------------------------------------------------------------------

export const usersRelations = relations(users, ({ many }) => ({
  uploadedContents: many(contents),
  uploadSessions: many(uploadSessions),
  sessions: many(sessions)
}));

export const contentsRelations = relations(contents, ({ one, many }) => ({
  uploader: one(users, {
    fields: [contents.uploaderId],
    references: [users.id]
  }),
  encryptionKeys: many(encryptionKeys),
  uploadSessions: many(uploadSessions),
  viewCount: one(viewCounts)
}));

export const encryptionKeysRelations = relations(encryptionKeys, ({ one }) => ({
  content: one(contents, {
    fields: [encryptionKeys.contentId],
    references: [contents.id]
  })
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
