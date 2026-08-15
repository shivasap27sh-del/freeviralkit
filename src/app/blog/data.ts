import { Pool } from 'pg';
import { unstable_cache } from 'next/cache';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  date: string;
  publishDate?: string;
  readTime: string;
  category: string;
  tags: string[];
}

/**
 * Slug alias lookup map ensuring all tool page links resolve seamlessly
 * to their primary canonical database article without any 404 errors.
 */
const SLUG_ALIASES: Record<string, string> = {
  'youtube-titles-that-get-clicks': 'how-to-write-youtube-titles-that-get-clicks',
  'youtube-title-strategies': 'how-to-write-youtube-titles-that-get-clicks',
  'youtube-seo-guide': 'youtube-seo-checklist-2026',
  'youtube-description-tips': 'youtube-description-optimization',
  'increase-youtube-audience-retention': 'how-to-write-viral-youtube-hooks',
  'best-youtube-tags': 'best-youtube-tags-for-gaming',
  'do-youtube-tags-still-work': 'best-youtube-tags-for-gaming',
  'youtube-tag-optimization-guide': 'best-youtube-tags-for-gaming',
  'how-to-find-youtube-niche': 'how-to-pick-youtube-channel-name',
  'do-youtube-hashtags-actually-help': 'youtube-hashtag-strategy',
  'youtube-shorts-seo': 'youtube-shorts-viral-secrets',
  'how-to-get-more-views-on-youtube-shorts': 'youtube-shorts-viral-secrets',
  'how-to-start-a-vlog-channel': 'youtube-gaming-channel-growth-guide',
  'youtube-ctr-secrets': 'youtube-thumbnail-psychology',
  'increase-youtube-ctr': 'youtube-thumbnail-psychology',
  'youtube-keyword-research-guide': 'how-to-grow-youtube-channel-from-zero',
  'how-to-rank-on-youtube': 'youtube-seo-checklist-2026',
  'how-to-add-youtube-chapters': 'youtube-description-optimization',
  'grow-educational-youtube-channel': 'how-to-grow-youtube-channel-from-zero',
  'how-to-promote-youtube-videos': 'how-to-grow-youtube-channel-from-zero',
};

// --- Database Connection Pool ---
const rawUrl = process.env.DATABASE_URL;
let DB_URL = '';
if (rawUrl) {
  DB_URL = rawUrl.includes('?') 
    ? (rawUrl.includes('uselibpqcompat') ? rawUrl : `${rawUrl}&uselibpqcompat=true`)
    : `${rawUrl}?sslmode=require&uselibpqcompat=true`;
} else {
  console.warn('[Database] DATABASE_URL is not defined in environment variables.');
}

const globalForPg = global as unknown as { pool: Pool | null };
export const pool: Pool | null = rawUrl ? (globalForPg.pool || new Pool({ connectionString: DB_URL })) : null;
if (process.env.NODE_ENV !== 'production' && pool) globalForPg.pool = pool;

function mapRowToBlogPost(row: Record<string, unknown>): BlogPost {
  let tags: string[] = [];
  try {
    tags = typeof row.tags === 'string' ? JSON.parse(row.tags) : (Array.isArray(row.tags) ? (row.tags as string[]) : []);
  } catch {
    tags = [];
  }

  return {
    slug: (row.slug as string) || '',
    title: (row.title as string) || '',
    description: (row.description as string) || '',
    content: (row.content as string) || '',
    date: row.date ? new Date(row.date as string | number | Date).toISOString() : new Date().toISOString(),
    publishDate: row.publish_date ? new Date(row.publish_date as string | number | Date).toISOString() : undefined,
    readTime: (row.read_time as string) || '8 min read',
    category: (row.category as string) || 'YouTube SEO',
    tags,
  };
}

// --- Cached data functions directly querying Neon PostgreSQL database ---

const _getPublishedPosts = async (): Promise<BlogPost[]> => {
  if (!pool) return [];
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE publish_date IS NULL OR publish_date <= NOW()
      ORDER BY date DESC 
      LIMIT 1000;
    `);
    return rows.map(mapRowToBlogPost);
  } catch (error) {
    console.error('getPublishedPosts DB error:', error);
    return [];
  }
};

export const getPublishedPosts = unstable_cache(
  _getPublishedPosts,
  ['blog-published-posts-v3'],
  { tags: ['blog-posts'], revalidate: 3600 }
);

const _getPublishedPostBySlug = async (rawSlug: string): Promise<BlogPost | undefined> => {
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  
  if (!pool) return undefined;
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE (slug = $1 OR slug = $2)
      AND (publish_date IS NULL OR publish_date <= NOW())
      LIMIT 1;
    `, [canonicalSlug, rawSlug]);
    if (rows.length > 0) return mapRowToBlogPost(rows[0]);
  } catch (error) {
    console.error('getPublishedPostBySlug DB error:', error);
  }
  return undefined;
};

export const getPublishedPostBySlug = unstable_cache(
  _getPublishedPostBySlug,
  ['blog-published-post-by-slug-v3'],
  { tags: ['blog-posts'], revalidate: 3600 }
);

const _getPostBySlug = async (rawSlug: string): Promise<BlogPost | undefined> => {
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  if (!pool) return undefined;
  try {
    const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 OR slug = $2 LIMIT 1;', [canonicalSlug, rawSlug]);
    if (rows.length > 0) return mapRowToBlogPost(rows[0]);
  } catch (error) {
    console.error('getPostBySlug DB error:', error);
  }
  return undefined;
};

export const getPostBySlug = unstable_cache(
  _getPostBySlug,
  ['blog-post-by-slug-v3'],
  { tags: ['blog-posts'], revalidate: 3600 }
);

const _getAllSlugs = async (): Promise<string[]> => {
  if (!pool) return Object.keys(SLUG_ALIASES);
  try {
    const { rows } = await pool.query('SELECT slug FROM posts LIMIT 1000;');
    const dbSlugs = rows.map(r => r.slug as string);
    return Array.from(new Set([...dbSlugs, ...Object.keys(SLUG_ALIASES)]));
  } catch (error) {
    console.error('getAllSlugs DB error:', error);
    return Object.keys(SLUG_ALIASES);
  }
};

export const getAllSlugs = unstable_cache(
  _getAllSlugs,
  ['blog-all-slugs-v3'],
  { tags: ['blog-posts'], revalidate: 3600 }
);

const _getPublishedSlugs = async (): Promise<string[]> => {
  if (!pool) return Object.keys(SLUG_ALIASES);
  try {
    const { rows } = await pool.query(`
      SELECT slug FROM posts 
      WHERE publish_date IS NULL OR publish_date <= NOW()
      LIMIT 1000;
    `);
    const dbSlugs = rows.map(r => r.slug as string);
    return Array.from(new Set([...dbSlugs, ...Object.keys(SLUG_ALIASES)]));
  } catch (error) {
    console.error('getPublishedSlugs DB error:', error);
    return Object.keys(SLUG_ALIASES);
  }
};

export const getPublishedSlugs = unstable_cache(
  _getPublishedSlugs,
  ['blog-published-slugs-v3'],
  { tags: ['blog-posts'], revalidate: 3600 }
);

export async function getRelatedPosts(currentSlug: string, count = 4): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const canonicalCurrent = SLUG_ALIASES[currentSlug] || currentSlug;
  const current = allPosts.find(p => p.slug === canonicalCurrent);
  const otherPosts = allPosts.filter(p => p.slug !== canonicalCurrent);
  
  if (!current) return otherPosts.slice(0, count);
  
  const sameCategory = otherPosts.filter(p => p.category === current.category);
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  
  const remaining = otherPosts.filter(p => p.category !== current.category);
  return [...sameCategory, ...remaining].slice(0, count);
}
