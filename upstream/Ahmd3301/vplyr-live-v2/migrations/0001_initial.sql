-- Source: Ahmd3301/vplyr-live-v2 @ 26cec450d4bee06f1cee0d02899593fd4ed3bef7
CREATE TABLE IF NOT EXISTS users (
  telegram_user_id TEXT PRIMARY KEY,
  username TEXT,
  first_name TEXT,
  user_bot_token TEXT,
  user_bot_id TEXT,
  user_bot_username TEXT,
  invite_link TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE TABLE IF NOT EXISTS jobs (
  id TEXT PRIMARY KEY,
  stream_key TEXT NOT NULL,
  source_url TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued',
  active INTEGER NOT NULL DEFAULT 1,
  github_run_id TEXT,
  error TEXT,
  created_by TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);
CREATE INDEX IF NOT EXISTS idx_jobs_stream_created ON jobs(stream_key, created_at DESC);

CREATE TABLE IF NOT EXISTS stream_variants (
  stream_key TEXT NOT NULL,
  variant TEXT NOT NULL,
  bandwidth INTEGER NOT NULL,
  resolution TEXT NOT NULL,
  init_message_id INTEGER,
  init_size INTEGER,
  updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (stream_key, variant)
);

CREATE TABLE IF NOT EXISTS segments (
  stream_key TEXT NOT NULL,
  variant TEXT NOT NULL,
  sequence INTEGER NOT NULL,
  message_id INTEGER NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  duration REAL NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch()),
  PRIMARY KEY (stream_key, variant, sequence)
);
CREATE INDEX IF NOT EXISTS idx_segments_window ON segments(stream_key, variant, sequence DESC);
