import type { MetadataRoute } from 'next';
import { getPublishedPosts } from './blog/data';
import { buildAbsoluteUrl } from '@/lib/site';
import { getSourceLastModifiedDates } from '@/lib/source-history';

type SitemapEntryDefinition = {
  path: string;
  sourceFiles: readonly string[];
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
};

const staticEntries = [
  { path: '/', sourceFiles: ['src/app/page.tsx'], changeFrequency: 'weekly', priority: 1.0 },
  { path: '/youtube-title-generator', sourceFiles: ['src/app/youtube-title-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-hashtag-generator', sourceFiles: ['src/app/youtube-hashtag-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-tags-generator', sourceFiles: ['src/app/youtube-tags-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-description-generator', sourceFiles: ['src/app/youtube-description-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-channel-name-generator', sourceFiles: ['src/app/youtube-channel-name-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-shorts-idea-generator', sourceFiles: ['src/app/youtube-shorts-idea-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-script-generator', sourceFiles: ['src/app/youtube-script-generator/page.tsx'], changeFrequency: 'weekly', priority: 0.95 },
  { path: '/youtube-topic-researcher', sourceFiles: ['src/app/youtube-topic-researcher/page.tsx'], changeFrequency: 'weekly', priority: 0.95 },
  { path: '/youtube-hook-generator', sourceFiles: ['src/app/youtube-hook-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-chapter-generator', sourceFiles: ['src/app/youtube-chapter-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-thumbnail-generator', sourceFiles: ['src/app/youtube-thumbnail-generator/page.tsx'], changeFrequency: 'monthly', priority: 0.95 },
  { path: '/youtube-seo-grader', sourceFiles: ['src/app/youtube-seo-grader/page.tsx'], changeFrequency: 'weekly', priority: 0.95 },
  { path: '/creator-gear', sourceFiles: ['src/app/creator-gear/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools', sourceFiles: ['src/app/tools/page.tsx'], changeFrequency: 'monthly', priority: 0.85 },
  { path: '/tools/youtube-title-generator-for-gaming', sourceFiles: ['src/app/tools/youtube-title-generator-for-gaming/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-vlogs', sourceFiles: ['src/app/tools/youtube-title-generator-for-vlogs/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-description-generator-for-education', sourceFiles: ['src/app/tools/youtube-description-generator-for-education/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-cooking', sourceFiles: ['src/app/tools/youtube-title-generator-for-cooking/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-music', sourceFiles: ['src/app/tools/youtube-title-generator-for-music/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-tech', sourceFiles: ['src/app/tools/youtube-title-generator-for-tech/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-fitness', sourceFiles: ['src/app/tools/youtube-title-generator-for-fitness/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-tags-generator-for-gaming', sourceFiles: ['src/app/tools/youtube-tags-generator-for-gaming/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-hashtag-generator-for-shorts', sourceFiles: ['src/app/tools/youtube-hashtag-generator-for-shorts/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-description-generator-for-tech', sourceFiles: ['src/app/tools/youtube-description-generator-for-tech/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-channel-name-generator-for-gaming', sourceFiles: ['src/app/tools/youtube-channel-name-generator-for-gaming/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-travel', sourceFiles: ['src/app/tools/youtube-title-generator-for-travel/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/tools/youtube-title-generator-for-beauty', sourceFiles: ['src/app/tools/youtube-title-generator-for-beauty/page.tsx'], changeFrequency: 'monthly', priority: 0.9 },
  { path: '/about', sourceFiles: ['src/app/about/page.tsx'], changeFrequency: 'yearly', priority: 0.8 },
  { path: '/contact', sourceFiles: ['src/app/contact/page.tsx'], changeFrequency: 'yearly', priority: 0.4 },
  { path: '/blog', sourceFiles: ['src/app/blog/page.tsx', 'src/app/blog/data.ts'], changeFrequency: 'weekly', priority: 0.9 },
  { path: '/privacy-policy', sourceFiles: ['src/app/privacy-policy/page.tsx'], changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', sourceFiles: ['src/app/terms/page.tsx'], changeFrequency: 'yearly', priority: 0.3 },
  { path: '/disclaimer', sourceFiles: ['src/app/disclaimer/page.tsx'], changeFrequency: 'yearly', priority: 0.3 },
] as const satisfies readonly SitemapEntryDefinition[];

function getLatestSourceDate(sourceFiles: readonly string[], sourceDates: ReadonlyMap<string, Date>): Date {
  const timestamps = sourceFiles.map((sourceFile) => {
    const sourceDate = sourceDates.get(sourceFile);
    if (!sourceDate) {
      throw new Error(`Missing sitemap source date for ${sourceFile}.`);
    }
    return sourceDate.getTime();
  });

  return new Date(Math.max(...timestamps));
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const publishedPosts = await getPublishedPosts();
  
  const blogEntries = publishedPosts.map((post) => ({
    path: `/blog/${post.slug}`,
    sourceFiles: [], // No longer rely on local files for blog posts
    changeFrequency: 'monthly' as const,
    priority: 0.7,
    lastModified: new Date(post.date), // Use DB date
  }));
  
  const sitemapEntries = [...staticEntries, ...blogEntries];
  const sourceDates = getSourceLastModifiedDates(sitemapEntries.flatMap((entry) => entry.sourceFiles));

  return sitemapEntries.map((entry) => ({
    url: buildAbsoluteUrl(entry.path),
    lastModified: ('lastModified' in entry ? entry.lastModified : undefined) || getLatestSourceDate(entry.sourceFiles, sourceDates),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}
