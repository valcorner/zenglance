import { Hono } from 'hono';
import { AdsService } from '../services/ads.js';

export function createAdsRoutes() {
  const ads = new Hono();

  ads.get('/serve', async (c) => {
    const adApiKey = c.env.ADS_API_KEY;
    if (!adApiKey) return c.json({ error: 'Ads service not configured' }, 503);

    const contentType = c.req.query('type');
    const userId = c.req.query('user_id');
    const deviceId = c.req.query('device_id');

    const interestTags = contentType ? [contentType] : ['video'];
    const effectiveDeviceId = deviceId || userId || 'anonymous';
    const effectiveUserId = userId ? parseInt(userId, 10) : undefined;

    const service = new AdsService(adApiKey);
    const ad = await service.serve(interestTags, effectiveDeviceId, effectiveUserId);

    return c.json({ ad: ad || null });
  });

  ads.get('/click', async (c) => {
    const adApiKey = c.env.ADS_API_KEY;
    if (!adApiKey) return c.json({ error: 'Ads service not configured' }, 503);

    const adId = c.req.query('ad_id');
    const deviceId = c.req.query('device_id');
    const userId = c.req.query('user_id');

    if (!adId) return c.json({ error: 'ad_id is required' }, 400);

    const service = new AdsService(adApiKey);
    const success = await service.recordClick(
      parseInt(adId, 10),
      deviceId || 'unknown',
      userId ? parseInt(userId, 10) : undefined
    );

    return c.json({ success });
  });

  return ads;
}
