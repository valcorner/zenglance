/**
 * Content Audit Service
 * Uses Cloudflare Workers AI (Llama Guard 3 8B) + KV cache + rate limiting.
 */

const RATE_LIMIT_WINDOW = 60;       // seconds
const RATE_LIMIT_MAX = 60;          // requests per window
const CACHE_TTL = 604800;           // 7 days in seconds
const AI_MODEL = '@cf/meta/llama-guard-3-8b';

/**
 * Constant-time string comparison to prevent timing side-channel attacks.
 * Does NOT use crypto.subtle.timingSafeEqual (not available in Workers).
 */
export function constantTimeEqual(a, b) {
  const enc = new TextEncoder();
  const bufA = enc.encode(a);
  const bufB = enc.encode(b);
  if (bufA.byteLength !== bufB.byteLength) {
    // Still do a dummy loop to keep timing similar
    const len = Math.max(bufA.byteLength, bufB.byteLength);
    let dummy = 0;
    for (let i = 0; i < len; i++) {
      dummy |= (bufA[i] || 0) ^ (bufB[i] || 0);
    }
    return false;
  }
  let diff = 0;
  for (let i = 0; i < bufA.byteLength; i++) {
    diff |= bufA[i] ^ bufB[i];
  }
  return diff === 0;
}

/**
 * Verify Bearer token from Authorization header.
 * @returns {boolean}
 */
export function verifyAuditToken(authHeader, env) {
  if (!authHeader || !authHeader.startsWith('Bearer ')) return false;
  const token = authHeader.substring(7).trim();
  const expected = `Bearer ${env.AUDIT_API_TOKEN}`;
  return constantTimeEqual(authHeader, expected);
}

/**
 * Check rate limit for a given IP using KV.
 * Fail-open: if KV read fails, allow the request.
 * @returns {{ allowed: boolean, retryAfter: number }}
 */
export async function checkRateLimit(ip, env) {
  const key = `ratelimit:${ip}`;
  const windowStart = Math.floor(Date.now() / 1000 / RATE_LIMIT_WINDOW) * RATE_LIMIT_WINDOW;

  try {
    const raw = await env.AUDIT_KV.get(key);
    const count = raw ? parseInt(raw, 10) : 0;

    if (count >= RATE_LIMIT_MAX) {
      return { allowed: false, retryAfter: RATE_LIMIT_WINDOW };
    }

    // Increment count (fire-and-forget, best-effort)
    await env.AUDIT_KV.put(key, String(count + 1), {
      expirationTtl: RATE_LIMIT_WINDOW
    });

    return { allowed: true, retryAfter: 0 };
  } catch (e) {
    // Fail-open: log and allow
    console.error('Rate limit check failed (fail-open):', e);
    return { allowed: true, retryAfter: 0 };
  }
}

/**
 * Compute SHA-256 hash of content (hex string).
 */
async function contentHash(content) {
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Call Llama Guard 3 8B to classify content.
 * @returns {{ isSafe: boolean, raw: string }}
 */
async function callAI(content, env) {
  const res = await env.AI.run(AI_MODEL, {
    messages: [{ role: 'user', content }]
  });

  const text = (res.response || '').trim();
  // If response starts with "unsafe", content is unsafe
  const isSafe = !/^unsafe\b/i.test(text);
  return { isSafe, raw: text };
}

/**
 * Audit text content with caching.
 * @param {string} content - Text to audit
 * @param {string} id - Request identifier (for cache response)
 * @param {Object} env - Worker environment (AI, AUDIT_KV)
 * @returns {{ id, contentHash, isSafe, timestamp, cached }}
 */
export async function auditContent(content, id, env) {
  const hash = await contentHash(content);
  const cacheKey = `audit:${hash}`;

  // Check cache
  try {
    const cached = await env.AUDIT_KV.get(cacheKey, 'json');
    if (cached && typeof cached.isSafe === 'boolean') {
      return {
        id,
        contentHash: hash,
        isSafe: cached.isSafe,
        timestamp: cached.timestamp,
        cached: true
      };
    }
  } catch (e) {
    // Cache miss or error – continue to AI call
    console.error('Audit cache read failed:', e);
  }

  // Call AI model
  const { isSafe } = await callAI(content, env);
  const timestamp = Date.now();

  // Write to cache (best-effort)
  try {
    await env.AUDIT_KV.put(cacheKey, JSON.stringify({ isSafe, timestamp }), {
      expirationTtl: CACHE_TTL
    });
  } catch (e) {
    console.error('Audit cache write failed:', e);
  }

  return {
    id,
    contentHash: hash,
    isSafe,
    timestamp,
    cached: false
  };
}
