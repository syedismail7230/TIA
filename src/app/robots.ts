import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://www.theinfluencers.agency';

  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/pricing',
          '/legal',
          '/terms',
          '/privacy',
          '/escrow-policy',
          '/dispute-policy',
          '/influencer-compliance',
          '/ip-licensing',
          '/creator/*',
          '/login',
          '/register',
        ],
        disallow: [
          '/admin',
          '/admin/*',
          '/brand',
          '/brand/*',
          '/workspace',
          '/workspace/*',
          '/api/admin',
          '/api/admin/*',
          '/api/auth',
          '/api/auth/*',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/*',
          '/brand/*',
          '/workspace/*',
          '/api/admin/*',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
