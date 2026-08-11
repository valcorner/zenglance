const ADS_API_BASE = 'https://ads.valcorner.qzz.io/api/v1';

export class AdsService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async serve(interestTags, deviceId, userId) {
    const res = await fetch(`${ADS_API_BASE}/serve`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ interest_tags: interestTags, device_id: deviceId, user_id: userId })
    });

    if (!res.ok) {
      console.error(`Ads serve failed (${res.status})`);
      return null;
    }

    const data = await res.json();
    return data.ads && data.ads.length > 0 ? data.ads[0] : null;
  }

  async recordClick(adId, deviceId, userId) {
    const res = await fetch(`${ADS_API_BASE}/serve/click`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`
      },
      body: JSON.stringify({ ad_id: adId, device_id: deviceId, user_id: userId })
    });
    return res.ok;
  }
}
