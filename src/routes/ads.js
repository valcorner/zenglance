import { AdsService } from '../services/ads.js';

export function createAdsRoutes() {
  return {
    get: {
      '/serve': async (c) => {
        const adApiKey = c.env.ADS_API_KEY;
        if (!adApiKey) return c.json({ error: 'Ads service not configured' }, 503);

        const contentType = c.req.query('type');
        const contentId = c.req.query('content_id');
        const userId = c.req.query('user_id');
        const deviceId = c.req.query('device_id');

        // Use content type as interest tag; fall back to a generic tag
        const interestTags = contentType
          ? [contentType]
          : ['video'];

        // Use userId as device_id if available, otherwise generate from client info
        const effectiveDeviceId = deviceId || userId || 'anonymous';
        const effectiveUserId = userId ? parseInt(userId, 10) : undefined;

        const ads = new AdsService(adApiKey);
        const ad = await ads.serve(interestTags, effectiveDeviceId, effectiveUserId);

        if (!ad) return c.json({ ad: null });

        return c.json({ ad });
      },

      '/click': async (c) => {
        const adApiKey = c.env.ADS_API_KEY;
        if (!adApiKey) return c.json({ error: 'Ads service not configured' }, 503);

        const adId = c.req.query('ad_id');
        const deviceId = c.req.query('device_id');
        const userId = c.req.query('user_id');

        if (!adId) return c.json({ error: 'ad_id is required' }, 400);

        const ads = new AdsService(adApiKey);
        const success = await ads.recordClick(parseInt(adId, 10), deviceId || 'unknown', userId ? parseInt(userId, 10) : undefined);

        return c.json({ success });
      }
    }
  };
}
