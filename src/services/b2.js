/**
 * Backblaze B2 原生 REST API（非 S3 兼容层）
 *
 * 认证流程：
 *  1. b2_authorize_account  → 获取 authToken
 *  2. b2_get_upload_url     → 获取 uploadUrl + uploadAuth（PUT 时使用）
 *  3. 客户端 PUT <uploadUrl> 带 Authorization: Bearer <uploadAuth>
 */

const API_VERSION = 'v2';
const DEFAULT_API_URL = 'https://api.backblazeb2.com';

export class B2Service {
  /**
   * @param {string} applicationKeyId  — B2 application key ID（原生 API 凭据，非 S3 凭据）
   * @param {string} applicationKey    — B2 application key（原生 API 凭据）
   * @param {string} [apiUrl]          — B2 API 端点，默认 https://api.backblazeb2.com
   * @param {string} bucketName        — 桶名
   */
  constructor(applicationKeyId, applicationKey, apiUrl = DEFAULT_API_URL, bucketName) {
    this.apiBaseUrl = apiUrl.endsWith('/') ? apiUrl : `${apiUrl}/`;
    this.apiBase = `${apiUrl}/b2api/${API_VERSION}`;
    this.bucketName = bucketName;
    this.applicationKeyId = applicationKeyId;
    this.applicationKey = applicationKey;
    this._authToken = null;
    this._authExpiresAt = 0;
    this._bucketId = null;
  }

  // -----------------------------------------------------------------------
  // Auth
  // -----------------------------------------------------------------------

  /**
   * 调用 b2_authorize_account，缓存 authToken（75 分钟 TTL）
   */
  async authorize() {
    const now = Date.now();
    if (this._authToken && this._authExpiresAt > now) {
      return { token: this._authToken, bucketId: this._bucketId };
    }

    const auth = b64(`${this.applicationKeyId}:${this.applicationKey}`);

    const res = await fetch(`${this.apiBase}/b2_authorize_account`, {
      headers: { Authorization: `Basic ${auth}` }
    });

    if (!res.ok) {
      const body = await res.text();
      throw new Error(`B2 authorize failed (${res.status}): ${body}`);
    }

    const data = await res.json();
    this._authToken = data.authorizationToken;
    this._authExpiresAt = now + (data.validDurationSeconds || 3600) * 1000 - 60000; // 提前 1 分钟过期
    this._bucketId = data.bucketId;
    this.apiBase = data.apiUrl.replace(/\/$/, '') + `/b2api/${API_VERSION}`;

    return { token: this._authToken, bucketId: this._bucketId };
  }

  // -----------------------------------------------------------------------
  // Upload URL
  // -----------------------------------------------------------------------

  /**
   * 获取直传 URL 和对应的 Authorization header
   * @param {string} [contentType] — 文件 MIME type，用于限制文件类型
   * @returns {{ uploadUrl: string, uploadAuth: string }}
   */
  async getUploadUrl(contentType) {
    const { token } = await this.authorize();

    const body = {
      bucketId: this._bucketId,
      fileNamePrefix: ''
    };
    if (contentType) body.contentType = contentType;

    const res = await fetch(`${this.apiBase}/b2_get_upload_url`, {
      method: 'POST',
      headers: {
        Authorization: token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`B2 get_upload_url failed (${res.status}): ${err}`);
    }

    const data = await res.json();
    return {
      uploadUrl: data.uploadUrl,
      uploadAuth: data.authorizationToken
    };
  }

  // -----------------------------------------------------------------------
  // Upload completion hook（可选，供服务端验证）
  // -----------------------------------------------------------------------

  /**
   * 调用 b2_complete_large_file 或 b2_finish_part（大文件分片上传用）
   * 普通单 PUT 上传不需要调用，B2 在 PUT 返回 200 时自动完成
   */

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  /**
   * Generate B2 object key based on content type and ID
   * Format: {content_type}/{content_id}/{filename}
   */
  static generateObjectKey(contentType, contentId, filename) {
    return `${contentType}/${contentId}/${filename}`;
  }
}

function b64(str) {
  return btoa(str);
}
