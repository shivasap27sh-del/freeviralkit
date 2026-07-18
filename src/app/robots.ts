import type { MetadataRoute } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/_next/static/'],
        disallow: ['/api/', '/blog/page/'],
      },
    ],
    sitemap: buildAbsoluteUrl('/sitemap.xml'),
  };
}
