-- ActivityPub federation tables

-- Remote actors cache (federated users from other instances)
CREATE TABLE IF NOT EXISTS ap_remote_actors (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  preferred_username TEXT,
  domain TEXT NOT NULL,
  inbox_url TEXT NOT NULL,
  shared_inbox_url TEXT,
  followers_url TEXT,
  following_url TEXT,
  public_key_id TEXT,
  public_key_pem TEXT,
  icon_url TEXT,
  name TEXT,
  summary TEXT,
  raw_json TEXT,
  fetched_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ap_remote_actors_domain_idx ON ap_remote_actors(domain);

-- Activities log (both incoming and outgoing)
CREATE TABLE IF NOT EXISTS ap_activities (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  actor_id TEXT NOT NULL,
  object_id TEXT,
  raw_json TEXT NOT NULL,
  direction TEXT NOT NULL,
  to_audience TEXT,
  cc_audience TEXT,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ap_activities_actor_idx ON ap_activities(actor_id);
CREATE INDEX IF NOT EXISTS ap_activities_type_idx ON ap_activities(type);
CREATE INDEX IF NOT EXISTS ap_activities_direction_idx ON ap_activities(direction);

-- Delivery queue (outgoing activities to remote inboxes)
CREATE TABLE IF NOT EXISTS ap_delivery_queue (
  id TEXT PRIMARY KEY,
  activity_id TEXT NOT NULL,
  target_inbox TEXT NOT NULL,
  target_domain TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  attempts INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  created_at INTEGER NOT NULL,
  next_attempt_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS ap_delivery_status_idx ON ap_delivery_queue(status);
CREATE INDEX IF NOT EXISTS ap_delivery_next_idx ON ap_delivery_queue(next_attempt_at);

-- Local actor key pairs (RSA for HTTP Signatures)
CREATE TABLE IF NOT EXISTS ap_actor_keys (
  user_id TEXT PRIMARY KEY REFERENCES users(id),
  public_key_pem TEXT NOT NULL,
  private_key_pem TEXT NOT NULL,
  key_id TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
