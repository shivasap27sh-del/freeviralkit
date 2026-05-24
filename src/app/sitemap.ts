import type { MetadataRoute } from 'next';
import { blogPosts, getPublishedSlugs } from './blog/data';
import { buildAbsoluteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const blogSlugs = getPublishedSlugs();

  // Use the actual publish date from each post so Google can trust lastModified
  const blogUrls = blogSlugs.map((slug) => {
    const post = blogPosts.find((p) => p.slug === slug);
    return {
      url: buildAbsoluteUrl(`/blog/${slug}`),
      lastModified: new Date(post?.date ?? '2026-05-01'),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [
    {
      url: buildAbsoluteUrl('/'),
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Dedicated tool pages — HIGH priority for SEO
    {
      url: buildAbsoluteUrl('/youtube-title-generator'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/youtube-hashtag-generator'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/youtube-tags-generator'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/youtube-description-generator'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/youtube-channel-name-generator'),
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/youtube-shorts-idea-generator'),
      lastModified: new Date('2026-05-20'),
      changeFrequency: 'monthly' as const,
      priority: 0.95,
    },
    {
      url: buildAbsoluteUrl('/tools'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    },
    {
      url: buildAbsoluteUrl('/tools/youtube-title-generator-for-gaming'),
      lastModified: new Date('2026-05-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl('/tools/youtube-title-generator-for-vlogs'),
      lastModified: new Date('2026-05-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl('/tools/youtube-description-generator-for-education'),
      lastModified: new Date('2026-05-12'),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    },
    {
      url: buildAbsoluteUrl('/about'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'yearly' as const,
      priority: 0.8,
    },
    {
      url: buildAbsoluteUrl('/blog'),
      lastModified: new Date('2026-05-17'),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    ...blogUrls,
    {
      url: buildAbsoluteUrl('/contact'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'yearly' as const,
      priority: 0.5,
    },
    {
      url: buildAbsoluteUrl('/privacy-policy'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: buildAbsoluteUrl('/terms'),
      lastModified: new Date('2026-05-10'),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ];
}

