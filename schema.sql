-- Video Database Schema
-- SQLite schema for Cloudflare D1

-- Users table - stores OAuth user info
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  avatar TEXT,
  bio TEXT,
  role TEXT NOT NULL DEFAULT 'free' CHECK(role IN ('free', 'senior', 'admin')),
  is_public INTEGER NOT NULL DEFAULT 1,
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
  content_type TEXT NOT NULL CHECK(content_type IN ('short_drama', 'tv_series', 'movie', 'ugc_long_video', 'short_video')),
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
CREATE INDEX IF NOT EXISTS contents_status_idx ON contents(status);

-- Upload sessions table - tracks presigned URL sessions
CREATE TABLE IF NOT EXISTS upload_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  content_type TEXT NOT NULL,
  b2_upload_url TEXT NOT NULL,
  b2_upload_auth TEXT NOT NULL,
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

-- OAuth states table - stores PKCE code verifiers temporarily
CREATE TABLE IF NOT EXISTS oauth_states (
  id TEXT PRIMARY KEY,
  code_verifier TEXT NOT NULL,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS oauth_states_expires_idx ON oauth_states(expires_at);

-- Sessions table - 服务端会话（替代 JWT）
CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS sessions_user_idx ON sessions(user_id);
CREATE INDEX IF NOT EXISTS sessions_expires_idx ON sessions(expires_at);

-- Type-specific content tables (each references contents.id as FK)
-- All interactions (likes, favorites, comments) use contents.id as universal PK

-- Short dramas: season, episode count, studio
CREATE TABLE IF NOT EXISTS short_dramas (
  contents_id TEXT PRIMARY KEY REFERENCES contents(id) ON DELETE CASCADE,
  season INTEGER NOT NULL DEFAULT 1,
  total_episodes INTEGER NOT NULL DEFAULT 0,
  episode_length INTEGER,
  studio TEXT,
  genre TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
CREATE INDEX IF NOT EXISTS short_dramas_content_idx ON short_dramas(contents_id);

-- TV series: seasons/episodes, network, status
CREATE TABLE IF NOT EXISTS tv_series (
  contents_id TEXT PRIMARY KEY REFERENCES contents(id) ON DELETE CASCADE,
  total_seasons INTEGER NOT NULL DEFAULT 1,
  total_episodes INTEGER NOT NULL DEFAULT 0,
  series_status TEXT CHECK(series_status IN ('ongoing', 'completed', 'hiatus')),
  genre TEXT,
  network TEXT,
  first_aired INTEGER,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
CREATE INDEX IF NOT EXISTS tv_series_content_idx ON tv_series(contents_id);

-- Movies: director, rating, box office
CREATE TABLE IF NOT EXISTS movies (
  contents_id TEXT PRIMARY KEY REFERENCES contents(id) ON DELETE CASCADE,
  director TEXT,
  genre TEXT,
  rating TEXT,
  release_year INTEGER,
  budget INTEGER,
  box_office INTEGER,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
CREATE INDEX IF NOT EXISTS movies_content_idx ON movies(contents_id);

-- UGC long videos: category, tags, license
CREATE TABLE IF NOT EXISTS ugc_long_videos (
  contents_id TEXT PRIMARY KEY REFERENCES contents(id) ON DELETE CASCADE,
  category TEXT,
  tags TEXT,
  views_target INTEGER,
  license TEXT,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
CREATE INDEX IF NOT EXISTS ugc_long_videos_content_idx ON ugc_long_videos(contents_id);

-- Short videos: platform, hashtags, trending
CREATE TABLE IF NOT EXISTS short_videos (
  contents_id TEXT PRIMARY KEY REFERENCES contents(id) ON DELETE CASCADE,
  platform TEXT CHECK(platform IN ('tiktok', 'youtube_shorts', 'instagram_reels')),
  hashtags TEXT,
  challenge TEXT,
  trending_score INTEGER,
  created_at INTEGER NOT NULL DEFAULT (strftime('%s','now')),
  updated_at INTEGER NOT NULL DEFAULT (strftime('%s','now'))
);
CREATE INDEX IF NOT EXISTS short_videos_content_idx ON short_videos(contents_id);

-- Likes
CREATE TABLE IF NOT EXISTS likes (
  user_id TEXT NOT NULL REFERENCES users(id),
  content_id TEXT NOT NULL REFERENCES contents(id),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, content_id)
);

-- Favorites
CREATE TABLE IF NOT EXISTS favorites (
  user_id TEXT NOT NULL REFERENCES users(id),
  content_id TEXT NOT NULL REFERENCES contents(id),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, content_id)
);

-- Comments (supports nested replies via parent_id)
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL REFERENCES contents(id),
  user_id TEXT NOT NULL REFERENCES users(id),
  body TEXT NOT NULL,
  parent_id TEXT REFERENCES comments(id),
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS comments_content_idx ON comments(content_id);
CREATE INDEX IF NOT EXISTS comments_parent_idx ON comments(parent_id);

-- Follows (self-referencing: user follows another user)
CREATE TABLE IF NOT EXISTS follows (
  follower_id TEXT NOT NULL REFERENCES users(id),
  following_id TEXT NOT NULL REFERENCES users(id),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (follower_id, following_id)
);

-- Collections (owned by users)
CREATE TABLE IF NOT EXISTS collections (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL REFERENCES users(id),
  name TEXT NOT NULL,
  created_at INTEGER NOT NULL,
  updated_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS collections_user_idx ON collections(user_id);

-- Collection items (many-to-many between collections and contents)
CREATE TABLE IF NOT EXISTS collection_items (
  collection_id TEXT NOT NULL REFERENCES collections(id) ON DELETE CASCADE,
  content_id TEXT NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
  added_at INTEGER NOT NULL,
  PRIMARY KEY (collection_id, content_id)
);
CREATE INDEX IF NOT EXISTS collection_items_content_idx ON collection_items(content_id);

-- Watch history - tracks which user watched which content
CREATE TABLE IF NOT EXISTS watch_history (
  user_id TEXT NOT NULL REFERENCES users(id),
  content_id TEXT NOT NULL REFERENCES contents(id),
  watched_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, content_id)
);
CREATE INDEX IF NOT EXISTS watch_history_user_idx ON watch_history(user_id);
CREATE INDEX IF NOT EXISTS watch_history_content_idx ON watch_history(content_id);
