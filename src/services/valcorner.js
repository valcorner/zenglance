export class ValcornerCDNService {
  constructor() {
    this.baseUrl = 'https://cdn.valcorner.qzz.io';
    this.tokenApiUrl = 'https://cdn.valcorner.qzz.io/api/token';
  }

  /**
   * Get a CDN ticket from Valcorner Token API
   * Client calls this directly - Workers only provides the endpoint info
   */
  async getToken() {
    const response = await fetch(this.tokenApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to get CDN ticket: ${response.status}`);
    }

    const data = await response.json();
    return data.ticket;
  }

  /**
   * Construct HLS manifest URL
   * Format: https://cdn.valcorner.qzz.io/video/{content_type}/{content_id}/{manifest_index}.m3u8?ticket={ticket}
   */
  buildManifestUrl(contentType, contentId, manifestIndex, ticket) {
    const cdnType = this.mapContentTypeToCdnType(contentType);
    return `${this.baseUrl}/video/${cdnType}/${contentId}/${manifestIndex}?ticket=${ticket}`;
  }

  /**
   * Construct DASH manifest URL
   * Format: https://cdn.valcorner.qzz.io/video/{content_type}/{content_id}/{manifest_index}.mpd?ticket={ticket}
   */
  buildDashManifestUrl(contentType, contentId, manifestIndex, ticket) {
    const cdnType = this.mapContentTypeToCdnType(contentType);
    return `${this.baseUrl}/video/${cdnType}/${contentId}/${manifestIndex}?ticket=${ticket}`;
  }

  /**
   * Construct direct file URL for non-manifest content
   * Format: https://cdn.valcorner.qzz.io/video/{content_type}/{content_id}/{filename}?ticket={ticket}
   */
  buildDirectUrl(contentType, contentId, filename, ticket) {
    const cdnType = this.mapContentTypeToCdnType(contentType);
    return `${this.baseUrl}/video/${cdnType}/${contentId}/${filename}?ticket=${ticket}`;
  }

  /**
   * Get token API URL for client-side calls
   * Frontend calls this directly to get ticket
   */
  getTokenApiUrl() {
    return this.tokenApiUrl;
  }

  /**
   * Map internal content type to CDN type
   */
  mapContentTypeToCdnType(contentType) {
    const mapping = {
      'short_drama': 'drama',
      'tv_series': 'series',
      'movie': 'movie',
      'ugc_long_video': 'video',
      'short_video': 'short'
    };
    return mapping[contentType] || 'video';
  }

  /**
   * Generate complete CDN access info for a content item
   * Returns all info needed for client to access content via CDN
   */
  generateCdnAccessInfo(contentType, contentId, manifestIndex, filename) {
    const result = {
      tokenUrl: this.getTokenApiUrl(),
      requiresTicket: true
    };

    // Placeholder - ticket will be obtained client-side
    const placeholderTicket = '{ticket}';

    if (manifestIndex) {
      result.manifestUrl = this.buildManifestUrl(contentType, contentId, manifestIndex, placeholderTicket);
    } else if (filename) {
      result.directUrl = this.buildDirectUrl(contentType, contentId, filename, placeholderTicket);
    }

    return result;
  }
}
