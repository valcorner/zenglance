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

  // Propagate the session bookmark back to the response
  if (response) {
    const bm = session.getBookmark();
    if (bm) response.headers.set('x-d1-bookmark', bm);
  }

  return db;
}
