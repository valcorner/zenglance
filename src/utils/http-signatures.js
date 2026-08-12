/**
 * HTTP Signatures (draft-cavage-http-signatures-12) for ActivityPub federation.
 * Uses Web Crypto API (RSASSA-PKCS1-v1_5 + SHA-256), natively supported by Cloudflare Workers.
 */

// ── RSA Key Generation ────────────────────────────────────────────────────

/**
 * Generate an RSA-2048 key pair for HTTP Signatures.
 * Returns { publicKeyPem, privateKeyPem } in PEM format.
 */
export async function generateKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
    {
      name: 'RSASSA-PKCS1-v1_5',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256'
    },
    true,
    ['sign', 'verify']
  );

  const publicSpki = await crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privatePkcs8 = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKeyPem: pemEncode(publicSpki, 'PUBLIC KEY'),
    privateKeyPem: pemEncode(privatePkcs8, 'PRIVATE KEY')
  };
}

// ── PEM Encoding ──────────────────────────────────────────────────────────

function pemEncode(buffer, label) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  const lines = base64.match(/.{1,64}/g).join('\n');
  return `-----BEGIN ${label}-----\n${lines}\n-----END ${label}-----`;
}

function pemDecode(pem, label) {
  const header = `-----BEGIN ${label}-----`;
  const footer = `-----END ${label}-----`;
  const content = pem.replace(header, '').replace(footer, '').replace(/\s/g, '');
  const binary = atob(content);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

// ── Import Keys for sign/verify ───────────────────────────────────────────

async function importPrivateKey(privateKeyPem) {
  return crypto.subtle.importKey(
    'pkcs8',
    pemDecode(privateKeyPem, 'PRIVATE KEY'),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['sign']
  );
}

async function importPublicKey(publicKeyPem) {
  // Normalize PEM: extract from between headers
  const pem = publicKeyPem.includes('BEGIN PUBLIC KEY')
    ? publicKeyPem
    : publicKeyPem.replace(/-----[^-]+-----/g, '').trim();
  return crypto.subtle.importKey(
    'spki',
    pemDecode(pem.includes('BEGIN PUBLIC KEY') ? pem : `-----BEGIN PUBLIC KEY-----\n${pem}\n-----END PUBLIC KEY-----`, 'PUBLIC KEY'),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

// ── Signature Construction ────────────────────────────────────────────────

/**
 * Build the signature string from headers list.
 * @param {string} method - HTTP method (lowercase)
 * @param {string} path - Request path (e.g., /users/abc/inbox)
 * @param {Object} headers - Key-value map of headers (lowercase keys)
 * @param {string[]} headerList - Ordered list of header names to include
 * @returns {string} Signature string
 */
function buildSignatureString(method, path, headers, headerList) {
  return headerList.map(name => {
    if (name === '(request-target)') {
      return `(request-target): ${method.toLowerCase()} ${path}`;
    }
    return `${name}: ${headers[name]}`;
  }).join('\n');
}

// ── Sign Outgoing Request ─────────────────────────────────────────────────

/**
 * Sign an outgoing HTTP request with HTTP Signatures.
 * @param {Object} params
 * @param {string} params.method - HTTP method
 * @param {string} params.url - Full URL
 * @param {Object} params.headers - Headers object (keys should be lowercase)
 * @param {string} params.body - Request body (string)
 * @param {string} params.privateKeyPem - Private key in PEM format
 * @param {string} params.keyId - Key ID URI (e.g., https://domain/users/:id#main-key)
 * @returns {Object} Headers object with Signature, Date, Digest added
 */
export async function signRequest({ method, url, headers, body, privateKeyPem, keyId }) {
  const urlObj = new URL(url);
  const path = urlObj.pathname + urlObj.search;
  const host = urlObj.host;

  // Ensure Date and Digest headers exist
  const allHeaders = { ...headers };
  if (!allHeaders['date']) {
    allHeaders['date'] = new Date().toUTCString();
  }
  if (body && !allHeaders['digest']) {
    const digest = await computeDigest(body);
    allHeaders['digest'] = digest;
  }
  allHeaders['host'] = host;

  // Headers to sign (Fediverse standard)
  const headerList = body
    ? ['(request-target)', 'host', 'date', 'digest']
    : ['(request-target)', 'host', 'date'];

  const sigString = buildSignatureString(method, path, allHeaders, headerList);
  const key = await importPrivateKey(privateKeyPem);
  const sigBuf = await crypto.subtle.sign(
    'RSASSA-PKCS1-v1_5',
    key,
    new TextEncoder().encode(sigString)
  );
  const signature = btoa(String.fromCharCode(...new Uint8Array(sigBuf)));

  allHeaders['signature'] = `keyId="${keyId}",algorithm="rsa-sha256",headers="${headerList.join(' ')}",signature="${signature}"`;

  return allHeaders;
}

// ── Verify Incoming Request ───────────────────────────────────────────────

/**
 * Verify an incoming HTTP Signature.
 * @param {Object} params
 * @param {string} params.method - HTTP method
 * @param {string} params.path - Request path
 * @param {Object} params.headers - Headers object (lowercase keys)
 * @param {string} params.body - Raw request body (string)
 * @param {string} params.publicKeyPem - Sender's public key in PEM format
 * @returns {Promise<boolean>} Whether the signature is valid
 */
export async function verifyRequest({ method, path, headers, body, publicKeyPem }) {
  const sigHeader = headers['signature'] || headers['authorization']?.replace(/^Signature\s+/, '');
  if (!sigHeader) return false;

  const params = parseSignatureHeader(sigHeader);
  if (!params.signature || !params.keyId) return false;

  const headerList = params.headers
    ? params.headers.split(/\s+/)
    : ['date'];

  // Build headers map for signature string
  const headersMap = { ...headers };
  if (body && headersMap['digest']) {
    // Verify digest
    const expectedDigest = await computeDigest(body);
    if (headersMap['digest'] !== expectedDigest) return false;
  }

  const sigString = buildSignatureString(method, path, headersMap, headerList);
  const key = await importPublicKey(publicKeyPem);
  const sigBytes = Uint8Array.from(atob(params.signature), c => c.charCodeAt(0));

  return crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5',
    key,
    sigBytes,
    new TextEncoder().encode(sigString)
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────

async function computeDigest(body) {
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
  return `SHA-256=${btoa(String.fromCharCode(...new Uint8Array(digest)))}`;
}

function parseSignatureHeader(header) {
  const params = {};
  // Match key="value" pairs, handling escaped quotes
  const regex = /(\w+)="([^"]*(?:\\.[^"]*)*)"/g;
  let match;
  while ((match = regex.exec(header)) !== null) {
    params[match[1]] = match[2].replace(/\\"/g, '"');
  }
  return params;
}

/**
 * Extract keyId from Signature or Authorization header.
 */
export function extractKeyId(headers) {
  const sigHeader = headers['signature'] || headers['authorization']?.replace(/^Signature\s+/, '');
  if (!sigHeader) return null;
  const params = parseSignatureHeader(sigHeader);
  return params.keyId || null;
}
