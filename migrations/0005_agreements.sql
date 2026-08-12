-- Remove old column from users table (D1 SQLite doesn't support DROP COLUMN in older versions,
-- so we add the new table and handle migration separately if needed)
-- NOTE: For existing databases, the agreed_terms_at column is harmless (unused).
-- Run this migration to create the new agreements table.

CREATE TABLE IF NOT EXISTS agreements (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL REFERENCES users(id),
  type        TEXT NOT NULL CHECK(type IN ('terms', 'privacy', 'cookie')),
  agreed_at   INTEGER NOT NULL,
  expires_at  INTEGER
);

CREATE INDEX IF NOT EXISTS idx_agreements_user ON agreements(user_id);
CREATE UNIQUE INDEX IF NOT EXISTS idx_agreements_user_type ON agreements(user_id, type);
