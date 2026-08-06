import { Hono } from 'hono';
import { createDb } from '../db/index.js';
import { users } from '../db/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Auth routes for Valcorner OAuth 2.0 PKCE flow
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
    
    // Generate PKCE code verifier and challenge
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = await generateCodeChallenge(codeVerifier);
    
    // Store code verifier in KV for later validation
    const state = crypto.randomUUID();
    await c.env.KV.put(`oauth_state:${state}`, codeVerifier, { expirationTtl: 600 });
    
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
   * Handle OAuth callback from Valcorner
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
      
      // Retrieve code verifier from KV
      const codeVerifier = await c.env.KV.get(`oauth_state:${state}`);
      if (!codeVerifier) {
        return c.json({ error: 'Invalid or expired state parameter' }, 400);
      }
      
      // Delete the state to prevent replay attacks
      await c.env.KV.delete(`oauth_state:${state}`);
      
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
        throw new Error('Token exchange failed');
      }
      
      const tokens = await tokenResponse.json();
      
      // Get user info from Valcorner
      const userInfoResponse = await fetch('https://auth.valcorner.qzz.io/oauth/userinfo', {
        headers: {
          'Authorization': `Bearer ${tokens.access_token}`
        }
      });
      
      if (!userInfoResponse.ok) {
        throw new Error('Failed to get user info');
      }
      
      const userInfo = await userInfoResponse.json();
      
      // Upsert user in database
      const now = Date.now();
      await db.insert(users).values({
        id: userInfo.sub,
        email: userInfo.email,
        name: userInfo.name,
        avatar: userInfo.picture,
        role: 'free', // Default role, can be upgraded
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
      });
      
      // In production, issue JWT session token
      // For now, return user ID directly (simplified)
      return c.json({
        success: true,
        userId: userInfo.sub,
        // accessToken: tokens.access_token,
        // refreshToken: tokens.refresh_token
      });
      
    } catch (error) {
      console.error('OAuth callback failed:', error);
      return c.json({ error: 'Authentication failed', details: error.message }, 500);
    }
  });

  /**
   * POST /auth/logout
   * Invalidate session
   */
  auth.post('/logout', async (c) => {
    // TODO: Implement session invalidation
    return c.json({ success: true });
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
