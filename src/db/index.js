import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema.js';

/**
 * Create a Drizzle instance scoped to a D1 session.
 *
 * D1 read replication routes reads to the nearest replica while writes go to
 * the primary.  To guarantee sequential consistency across multiple queries
 * within the same logical request (or across requests from the same client),
 * we use the Sessions API with bookmarks.
 *
 * The bookmark is carried in the x-d1-bookmark header:
 *  - Request  → x-d1-bookmark header  (set by previous response, or "first-unconstrained")
 *  - Response → x-d1-bookmark header  (new bookmark from this session)
 *
 * Enable read replication on the D1 database via the Cloudflare Dashboard
 * (D1 → your-db → Settings → Enable Read Replication) or the REST API:
 *   PUT /accounts/{id}/d1/database/{id}
 *   { "read_replication": { "mode": "auto" } }
 */
export function createDb(env, request, response) {
  const bookmark = request.headers.get('x-d1-bookmark') || 'first-unconstrained';
  const session = env.DB.withSession(bookmark);
  const db = drizzle(session, { schema });

  // NOTE: Do not call session.getBookmark() here — at this point no queries
  // have run yet, so the bookmark would be the initial value, not the one
  // reflecting this request's writes. To propagate the bookmark back to the
  // client, a route handler must call session.getBookmark() *after* all
  // queries are done and set the x-d1-bookmark response header explicitly.
  // The `response` argument is accepted for backwards compatibility but is
  // not used here.
  return db;
}
