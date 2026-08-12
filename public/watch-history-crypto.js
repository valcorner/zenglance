/**
 * watch-history-crypto.js
 * Client-side AES-GCM encryption for watch history.
 *
 * Architecture:
 *  - Server generates a random 256-bit AES key per user on first login.
 *  - The per-user key is encrypted with the master key (in Cloudflare Secrets)
 *    and stored in the database.
 *  - Client calls GET /api/interaction/history/key → receives plaintext key (base64).
 *  - Client uses that key to encrypt/decrypt all history records.
 *  - Server never stores the plaintext key; it only sees ciphertext.
 */

// Import a raw AES-GCM key from a base64-encoded 32-byte key.
export async function importKey(keyB64) {
  const bytes = Uint8Array.from(atob(keyB64), c => c.charCodeAt(0));
  return crypto.subtle.importKey('raw', bytes.buffer, 'AES-GCM', false, ['encrypt', 'decrypt']);
}

function bufferToBase64(buf) {
  const bytes = new Uint8Array(buf);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

function base64ToBuffer(str) {
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

export function generateDeviceId() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  }
  return 'device-' + Date.now() + '-' + Math.random().toString(36).slice(2, 8);
}

function getStoredDeviceId() {
  try { return localStorage.getItem('zenglance_device_id') || null; } catch { return null; }
}

export function getDeviceId() {
  let id = getStoredDeviceId();
  if (!id) {
    id = generateDeviceId();
    try { localStorage.setItem('zenglance_device_id', id); } catch {}
  }
  return id;
}

// Encrypt history records with the user key (returned from server).
export async function encryptHistory(keyB64, plaintext) {
  const key = await importKey(keyB64);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder().encode(typeof plaintext === 'string' ? plaintext : JSON.stringify(plaintext));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc);
  const ctBytes = new Uint8Array(ciphertext);
  return {
    data: bufferToBase64(ctBytes),
    iv: bufferToBase64(iv),
    tag: bufferToBase64(ctBytes.slice(-16)),
    ctOnly: bufferToBase64(ctBytes.slice(0, ctBytes.length - 16))
  };
}

// Decrypt history records with the user key.
export async function decryptHistory(keyB64, iv, tag, ctOnly) {
  const key = await importKey(keyB64);
  const ivBuf = base64ToBuffer(iv);
  const tagBuf = base64ToBuffer(tag);
  const ctBuf = base64ToBuffer(ctOnly);
  const ciphertext = new Uint8Array([...ctBuf, ...tagBuf]);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, ciphertext);
  try { return JSON.parse(new TextDecoder().decode(plaintext)); } catch { return new TextDecoder().decode(plaintext); }
}

// Encrypt progress data with the user key.
export async function encryptProgress(keyB64, progressObj) {
  const key = await importKey(keyB64);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder().encode(JSON.stringify(progressObj));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc);
  const ctBytes = new Uint8Array(ciphertext);
  return {
    data: bufferToBase64(ctBytes.slice(0, ctBytes.length - 16)),
    iv: bufferToBase64(iv),
    tag: bufferToBase64(ctBytes.slice(-16))
  };
}

// Decrypt progress data with the user key.
export async function decryptProgress(keyB64, iv, tag, ctOnly) {
  const key = await importKey(keyB64);
  const ivBuf = base64ToBuffer(iv);
  const tagBuf = base64ToBuffer(tag);
  const ctBuf = base64ToBuffer(ctOnly);
  const ciphertext = new Uint8Array([...ctBuf, ...tagBuf]);
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: ivBuf }, key, ciphertext);
  try { return JSON.parse(new TextDecoder().decode(plaintext)); } catch { return {}; }
}
