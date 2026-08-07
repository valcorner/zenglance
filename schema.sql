-- ZenGlance Database Schema
-- SQLite schema for Cloudflare D1

-- Users table - stores OAuth user info
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar TEXT,
  role TEXT NOT NULL DEFAULT 'free' CHECK(role IN ('free', 'premium', 'official')),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
CREATE INDEX IF NOT EXISTS users_role_idx ON users(role);

-- Contents table - metadata for all media
CREATE TABLE IF NOT EXISTS contents (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  description TEXT,
  content_type TEXT NOT NULL CHECK(content_type IN ('short_drama', 'tv_series', 'movie', 'ugc_long_video', 'short_video', 'music', 'podcast', 'novel')),
  is_premium BOOLEAN NOT NULL DEFAULT 0,
  is_encrypted BOOLEAN NOT NULL DEFAULT 0,
  uploader_id TEXT NOT NULL REFERENCES users(id),
  b2_bucket TEXT NOT NULL,
  b2_key TEXT NOT NULL,
  cdn_type TEXT NOT NULL,
  file_size INTEGER,
  duration INTEGER,
  mime_type TEXT,
  manifest_index TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'ready', 'error')),
  error_code TEXT,
  error_message TEXT,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS contents_slug_idx ON contents(slug);
CREATE INDEX IF NOT EXISTS contents_uploader_idx ON contents(uploader_id);
CREATE INDEX IF NOT EXISTS contents_type_idx ON contents(content_type);
CREATE INDEX IF NOT EXISTS contents_premium_idx ON contents(is_premium);
CREATE INDEX IF NOT EXISTS contents_status_idx ON contents(status);

-- Encryption keys table - stores AES-256-GCM key metadata
CREATE TABLE IF NOT EXISTS encryption_keys (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL UNIQUE REFERENCES contents(id),
  key_id TEXT NOT NULL,
  iv TEXT NOT NULL,
  auth_tag TEXT,
  key_derivation_info TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS encryption_keys_content_idx ON encryption_keys(content_id);

-- Upload sessions table - tracks presigned URL sessions
CREATE TABLE IF NOT EXISTS upload_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  content_type TEXT NOT NULL,
  b2_upload_url TEXT NOT NULL,
  b2_key TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK(status IN ('pending', 'completed', 'expired')),
  content_id TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS upload_sessions_user_idx ON upload_sessions(user_id);
CREATE INDEX IF NOT EXISTS upload_sessions_expires_idx ON upload_sessions(expires_at);

-- View counts cache (stored in D1)
CREATE TABLE IF NOT EXISTS view_counts (
  content_id TEXT PRIMARY KEY REFERENCES contents(id),
  count INTEGER NOT NULL DEFAULT 0,
  last_synced_at INTEGER
);

-- OAuth states table - stores PKCE code verifiers temporarily (replaces KV/Map)
CREATE TABLE IF NOT EXISTS oauth_states (
  id TEXT PRIMARY KEY,
  code_verifier TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS oauth_states_expires_idx ON oauth_states(expires_at);
