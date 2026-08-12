import { Hono } from 'hono';
import {
  verifyAuditToken,
  checkRateLimit,
  auditContent
} from '../services/audit.js';

/**
 * Content Audit API routes
 * POST /api/audit  — audit text content via Llama Guard 3 8B
 */
export function createAuditRoutes() {
  const audit = new Hono();

  audit.post('/', async (c) => {
    // 1. Method check (Hono route already ensures POST)

    // 2. Rate limit check
    const clientIP = c.req.header('CF-Connecting-IP') || 'unknown';
    const rl = await checkRateLimit(clientIP, c.env);
    if (!rl.allowed) {
      return c.json({ error: 'Too Many Requests' }, 429, {
        'Retry-After': String(rl.retryAfter)
      });
    }

    // 3. Token verification
    const authHeader = c.req.header('Authorization');
    if (!verifyAuditToken(authHeader, c.env)) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    // 4. Parse & validate body
    let body;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ error: 'Bad Request: invalid JSON' }, 400);
    }

    const { id, content } = body || {};

    if (!id || typeof id !== 'string') {
      return c.json({ error: 'Bad Request: id is required' }, 400);
    }
    if (!content || typeof content !== 'string' || content.trim().length === 0) {
      return c.json({ error: 'Bad Request: content is required' }, 400);
    }

    // 5. Audit content (with cache)
    try {
      const result = await auditContent(content.trim(), id, c.env);
      return c.json(result, 200);
    } catch (e) {
      console.error('AI audit failed:', e);
      return c.json({ error: 'Server Error' }, 500);
    }
  });

  return audit;
}
