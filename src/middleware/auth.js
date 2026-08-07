import { createDb } from '../db/index.js';
import { sessions } from '../db/schema.js';
import { eq, and, gt } from 'drizzle-orm';

const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000; // 7 天

/**
 * 会话鉴权中间件（基于 D1 sessions 表，替代 JWT）
 *
 * 从 Authorization: Bearer <session_id> 头解析 session_id，
 * 查 D1 sessions 表（关联 users），将用户对象挂到 c.var.user。
 *
 * 过期/不存在的 session 返回 401，由客户端重新走 OAuth 登录。
 */
export function createAuthMiddleware() {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    const sessionId = authHeader.substring(7).trim();
    if (!sessionId) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    try {
      const db = createDb(c.env);
      const now = Date.now();

      // 关联查询 session + user，且 session 未过期
      const session = await db.query.sessions.findFirst({
        where: and(
          eq(sessions.id, sessionId),
          gt(sessions.expiresAt, now)
        ),
        with: {
          user: true
        }
      });

      if (!session || !session.user) {
        return c.json({ error: 'Invalid or expired session', code: 'INVALID_SESSION' }, 401);
      }

      c.set('user', session.user);
      c.set('sessionId', sessionId);
      await next();
    } catch (error) {
      console.error('Auth middleware error:', error);
      return c.json({ error: 'Authentication failed', code: 'AUTH_ERROR' }, 401);
    }
  };
}

/**
 * 角色守卫：要求当前用户具有指定角色之一
 * 必须在 createAuthMiddleware 之后使用
 *
 * @param {string[]} allowedRoles
 */
export function requireRole(...allowedRoles) {
  return async (c, next) => {
    const user = c.get('user');
    if (!user) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    if (!allowedRoles.includes(user.role)) {
      return c.json(
        {
          error: 'Insufficient permissions',
          code: 'FORBIDDEN',
          details: { required: allowedRoles, current: user.role }
        },
        403
      );
    }

    await next();
  };
}

/**
 * 创建新会话并写入 D1
 * @returns {Promise<{id: string, expiresAt: number}>}
 */
export async function createSession(db, userId) {
  const sessionId = crypto.randomUUID();
  const now = Date.now();
  const expiresAt = now + SESSION_TTL_MS;

  await db.insert(sessions).values({
    id: sessionId,
    userId,
    expiresAt,
    createdAt: now
  });

  return { id: sessionId, expiresAt };
}

/**
 * 删除指定会话（登出）
 * @returns {Promise<boolean>} 是否删除了记录
 */
export async function deleteSession(db, sessionId) {
  const result = await db.delete(sessions).where(eq(sessions.id, sessionId)).returning();
  return result.length > 0;
}
