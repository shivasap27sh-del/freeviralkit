import type { MetadataRoute } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
    ],
    sitemap: buildAbsoluteUrl('/sitemap.xml'),
  };
}
