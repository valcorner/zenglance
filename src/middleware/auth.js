import { createDb } from '../db/index.js';
import { users } from '../db/schema.js';
import { verifyJwt } from '../utils/jwt.js';
import { eq } from 'drizzle-orm';

/**
 * JWT 鉴权中间件
 *
 * 从 Authorization: Bearer <token> 头解析并校验 JWT，
 * 将解码后的用户对象挂到 c.var.user 上。
 *
 * 携带的字段：id / email / role / name / avatar
 */
export function createAuthMiddleware() {
  return async (c, next) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    const token = authHeader.substring(7).trim();
    if (!token) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    try {
      const payload = await verifyJwt(token, c.env.JWT_SECRET);

      // 从 D1 拉取最新用户信息，确保角色变更后立即生效
      const db = createDb(c.env);
      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.sub)
      });

      if (!user) {
        return c.json({ error: 'Invalid token', code: 'INVALID_TOKEN' }, 401);
      }

      c.set('user', user);
      c.set('token', token);
      await next();
    } catch (error) {
      const code = error.message === 'Token expired' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
      return c.json({ error: 'Authentication failed', code, details: error.message }, 401);
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
