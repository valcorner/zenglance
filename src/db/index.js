import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema.js';

export function createDb(env) {
  return drizzle(env.DB, { schema });
}
