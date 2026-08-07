/**
 * HS256 JWT 签发与校验，基于 Web Crypto API（Cloudflare Workers 原生支持）
 *
 * Payload 约定：
 * - sub: 用户 ID
 * - email: 用户邮箱
 * - role: 用户角色（free / premium / official）
 * - iat: 签发时间（秒）
 * - exp: 过期时间（秒）
 */

const ALG = 'HS256';
const ALG_CODE = { name: 'HMAC', hash: 'SHA-256' };
const TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 天

function base64UrlEncode(buffer) {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function base64UrlDecode(str) {
  const padded = str.replace(/-/g, '+').replace(/_/g, '/');
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function strToBytes(str) {
  return new TextEncoder().encode(str);
}

async function getKey(secret) {
  return crypto.subtle.importKey(
    'raw',
    strToBytes(secret),
    ALG_CODE,
    false,
    ['sign', 'verify']
  );
}

/**
 * 签发 JWT
 * @param {object} payload - 自定义载荷字段（不含 iat/exp）
 * @param {string} secret - JWT_SECRET
 * @param {number} [ttlSeconds] - 有效期（秒），默认 7 天
 * @returns {Promise<string>} compact JWT
 */
export async function signJwt(payload, secret, ttlSeconds = TOKEN_TTL_SECONDS) {
  const now = Math.floor(Date.now() / 1000);
  const fullPayload = {
    ...payload,
    iat: now,
    exp: now + ttlSeconds
  };

  const header = { alg: ALG, typ: 'JWT' };
  const headerB64 = base64UrlEncode(strToBytes(JSON.stringify(header)));
  const payloadB64 = base64UrlEncode(strToBytes(JSON.stringify(fullPayload)));
  const signingInput = `${headerB64}.${payloadB64}`;

  const key = await getKey(secret);
  const signature = await crypto.subtle.sign(ALG_CODE, key, strToBytes(signingInput));
  const signatureB64 = base64UrlEncode(signature);

  return `${signingInput}.${signatureB64}`;
}

/**
 * 校验 JWT 并返回载荷
 * @param {string} token - compact JWT
 * @param {string} secret - JWT_SECRET
 * @returns {Promise<object>} 解码后的 payload
 * @throws {Error} 当签名无效、格式错误或已过期时抛出
 */
export async function verifyJwt(token, secret) {
  if (typeof token !== 'string') {
    throw new Error('Invalid token type');
  }

  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid token format');
  }

  const [headerB64, payloadB64, signatureB64] = parts;
  const signingInput = `${headerB64}.${payloadB64}`;

  // 校验 header
  let header;
  try {
    header = JSON.parse(new TextDecoder().decode(base64UrlDecode(headerB64)));
  } catch {
    throw new Error('Invalid token header');
  }
  if (header.alg !== ALG) {
    throw new Error(`Unsupported algorithm: ${header.alg}`);
  }

  // 校验签名
  const key = await getKey(secret);
  const signature = base64UrlDecode(signatureB64);
  const valid = await crypto.subtle.verify(ALG_CODE, key, signature, strToBytes(signingInput));
  if (!valid) {
    throw new Error('Invalid signature');
  }

  // 解析 payload
  let payload;
  try {
    payload = JSON.parse(new TextDecoder().decode(base64UrlDecode(payloadB64)));
  } catch {
    throw new Error('Invalid token payload');
  }

  // 校验过期时间
  if (typeof payload.exp !== 'number' || Math.floor(Date.now() / 1000) >= payload.exp) {
    throw new Error('Token expired');
  }

  return payload;
}
