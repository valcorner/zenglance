import { Hono } from 'hono';
import { createDb } from '../db/index.js';
import { users, oauthStates } from '../db/schema.js';
import { eq } from 'drizzle-orm';
import { signJwt, verifyJwt } from '../utils/jwt.js';

const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 天，与 jwt.js 默认值保持一致

/**
 * Auth routes for Valcorner OAuth 2.0 PKCE flow + JWT session
 */
export function createAuthRoutes() {
  const auth = new Hono();

  /**
   * GET /auth/login
   * Redirect to Valcorner OAuth authorization page
   */
  auth.get('/login', async (c) => {
    const clientId = c.env.VALCORNER_CLIENT_ID;
    const redirectUri = c.env.VALCORNER_REDIRECT_URI;

    if (!clientId || !redirectUri) {
      return c.json({ error: 'OAuth not configured', code: 'OAUTH_CONFIG_MISSING' }, 500);
    }

    // Generate PKCE code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);

    // Store code verifier in D1 for later validation
    const state = crypto.randomUUID();
    const expiresAt = Date.now() + 600000; // 10 minutes

    try {
      const db = createDb(c.env);
      await db.insert(oauthStates).values({
        id: state,
        codeVerifier,
        expiresAt
      });
    } catch (error) {
      console.error('Failed to store OAuth state:', error);
      return c.json({ error: 'Failed to initialize authentication' }, 500);
    }

    const authUrl = new URL('https://auth.valcorner.qzz.io/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('scope', 'openid email profile');
    authUrl.searchParams.set('state', state);
    authUrl.searchParams.set('code_challenge', codeChallenge);
    authUrl.searchParams.set('code_challenge_method', 'S256');

    return c.redirect(authUrl.toString());
  });

  /**
   * GET /auth/callback
   * Handle OAuth callback from Valcorner, exchange code for tokens,
   * upsert user, and issue local JWT session token.
   */
  auth.get('/callback', async (c) => {
    const code = c.req.query('code');
    const state = c.req.query('state');
    const error = c.req.query('error');

    if (error) {
      return c.json({ error: 'OAuth authorization failed', details: c.req.query('error_description') }, 400);
    }

    if (!code || !state) {
      return c.json({ error: 'Invalid callback parameters' }, 400);
    }

    try {
      const db = createDb(c.env);

      // Retrieve code verifier from D1
      const stateData = await db.query.oauthStates.findFirst({
        where: eq(oauthStates.id, state)
      });

      if (!stateData) {
        return c.json({ error: 'Invalid or expired state parameter' }, 400);
      }

      // Delete the state to prevent replay attacks
      await db.delete(oauthStates).where(eq(oauthStates.id, state));

      // Check if state has expired
      if (stateData.expiresAt < Date.now()) {
        return c.json({ error: 'State parameter has expired' }, 400);
      }

      const codeVerifier = stateData.codeVerifier;

      // Exchange code for tokens
      const tokenResponse = await fetch('https://auth.valcorner.qzz.io/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${btoa(`${c.env.VALCORNER_CLIENT_ID}:${c.env.VALCORNER_CLIENT_SECRET}`)}`
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code,
          redirect_uri: c.env.VALCORNER_REDIRECT_URI,
          code_verifier: codeVerifier
        })
      });

      if (!tokenResponse.ok) {
        throw new Error(`Token exchange failed: ${tokenResponse.status}`);
      }

      const tokens = await tokenResponse.json();

      // Get user info from Valcorner
      const userInfoResponse = await fetch('https://auth.valcorner.qzz.io/oauth/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`
        }
      });

      if (!userInfoResponse.ok) {
        throw new Error(`Failed to get user info: ${userInfoResponse.status}`);
      }

      const userInfo = await userInfoResponse.json();

      // Upsert user in database
      const now = Date.now();
      const [saved] = await db.insert(users).values({
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture,
        role: 'free', // Default role, can be upgraded later
        createdAt: now,
        updatedAt: now
      }).onConflictDoUpdate({
        target: users.id,
        set: {
          email: userInfo.email,
          name: userInfo.name,
          avatar: userInfo.picture,
          updatedAt: now
        }
      }).returning();

      // Issue local JWT session token
      const jwt = await signJwt(
        {
          sub: saved.id,
          email: saved.email,
          role: saved.role
        },
        c.env.JWT_SECRET,
        TOKEN_TTL_SECONDS
      );

      // Redirect to frontend with token (cookie-free, OAuth-friendly pattern).
      // Frontend extracts ?token=, stores in localStorage, and cleans the URL.
      const frontendUrl = new URL(c.env.FRONTEND_URL || 'http://localhost:8787');
      frontendUrl.searchParams.set('token', jwt);
      frontendUrl.searchParams.set('userId', saved.id);
      return c.redirect(frontendUrl.toString());
    } catch (error) {
      console.error('OAuth callback failed:', error);
      return c.json({ error: 'Authentication failed', details: error.message }, 500);
    }
  });

  /**
   * GET /auth/me
   * Return the current authenticated user's profile.
   * Requires Authorization: Bearer <jwt>
   */
  auth.get('/me', async (c) => {
    const authHeader = c.req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Unauthorized', code: 'MISSING_AUTH' }, 401);
    }

    const token = authHeader.substring(7).trim();
    try {
      const payload = await verifyJwt(token, c.env.JWT_SECRET);
      const db = createDb(c.env);
      const user = await db.query.users.findFirst({
        where: eq(users.id, payload.sub)
      });

      if (!user) {
        return c.json({ error: 'User not found', code: 'USER_NOT_FOUND' }, 404);
      }

      return c.json({
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.name,
        avatar: user.avatar,
        role: user.role,
        createdAt: user.createdAt
      });
    } catch (error) {
      const code = error.message === 'Token expired' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN';
      return c.json({ error: 'Authentication failed', code, details: error.message }, 401);
    }
  });

  /**
   * POST /auth/logout
   * Stateless JWT：服务端不维护会话，登出由客户端清除本地 token 完成。
   * 返回 200 让客户端进入清流程。
   */
  auth.post('/logout', (c) => {
    return c.json({
      success: true,
      message: 'Logged out. Please discard the local JWT.'
    });
  });

  return auth;
}

function generateCodeVerifier() {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

async function generateCodeChallenge(verifier) {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return base64UrlEncode(new Uint8Array(digest));
}

function base64UrlEncode(buffer) {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
