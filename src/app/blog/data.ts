import { Pool } from 'pg';
import { unstable_cache } from 'next/cache';
import { STATIC_BLOG_POSTS } from '@/data/blogPosts';

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
  'do-youtube-tags-still-work': 'best-youtube-tags-for-gaming',
  'increase-youtube-ctr': 'youtube-thumbnail-psychology',
  'youtube-keyword-research-guide': 'how-to-grow-youtube-channel-from-zero',
  'how-to-rank-on-youtube': 'youtube-seo-checklist-2026',
  'how-to-add-youtube-chapters': 'youtube-description-optimization',
  'freeviralkit-vs-vidiq': 'freeviralkit-vs-vidiq-tubebuddy',
  'freeviralkit-vs-tubebuddy': 'freeviralkit-vs-vidiq-tubebuddy',
  'freeviralkit-vs-chatgpt': 'freeviralkit-vs-chatgpt-youtube-seo',
};

// --- Database Connection Pool ---
const rawUrl = process.env.DATABASE_URL;

// Ensure pg-connection-string does not emit deprecated sslmode warning by explicitly declaring libpq compatibility
function getConnectionString(url: string | undefined): string | undefined {
  if (!url) return undefined;
  if (url.includes('uselibpqcompat=')) return url;
  const separator = url.includes('?') ? '&' : '?';
  return `${url}${separator}uselibpqcompat=true`;
}

const dbConnectionString = getConnectionString(rawUrl);

const globalForPg = global as unknown as { pool: Pool | null };
export const pool: Pool | null = dbConnectionString
  ? (globalForPg.pool ||
      new Pool({
        connectionString: dbConnectionString,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 15000,
        idleTimeoutMillis: 15000,
        max: 20,
      }))
  : null;

if (process.env.NODE_ENV !== 'production' && pool) {
  globalForPg.pool = pool;
}

if (pool) {
  pool.on('error', (err) => {
    console.warn('[Neon DB Pool Notice]:', err.message);
  });
}

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

// --- Cached data functions querying Neon PostgreSQL database with resilient static fallbacks ---

const _getPublishedPosts = async (): Promise<BlogPost[]> => {
  if (!pool) return STATIC_BLOG_POSTS;
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE publish_date IS NULL OR publish_date <= NOW()
      ORDER BY date DESC 
      LIMIT 1000;
    `);
    const dbPosts = rows.map(mapRowToBlogPost);
    if (dbPosts.length === 0) return STATIC_BLOG_POSTS;
    
    // Merge DB posts with any static posts not yet in DB to guarantee maximum rich content
    const existingSlugs = new Set(dbPosts.map((p) => p.slug));
    const missingStatic = STATIC_BLOG_POSTS.filter((p) => !existingSlugs.has(p.slug));
    return [...dbPosts, ...missingStatic];
  } catch (error) {
    console.warn('getPublishedPosts DB fallback:', error instanceof Error ? error.message : String(error));
    return STATIC_BLOG_POSTS;
  }
};

export const getPublishedPosts = unstable_cache(
  _getPublishedPosts,
  ['blog-published-posts-v14'],
  { tags: ['blog-posts'], revalidate: process.env.NODE_ENV === 'development' ? 1 : 3600 }
);

const _getPublishedPostBySlug = async (rawSlug: string): Promise<BlogPost | undefined> => {
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT * FROM posts 
        WHERE (slug = $1 OR slug = $2)
        AND (publish_date IS NULL OR publish_date <= NOW())
        LIMIT 1;
      `, [canonicalSlug, rawSlug]);
      if (rows.length > 0) return mapRowToBlogPost(rows[0]);
    } catch (error) {
      console.warn('getPublishedPostBySlug DB fallback:', error instanceof Error ? error.message : String(error));
    }
  }

  // Graceful fallback to bundled static posts
  return STATIC_BLOG_POSTS.find((p) => p.slug === canonicalSlug || p.slug === rawSlug);
};

export const getPublishedPostBySlug = unstable_cache(
  _getPublishedPostBySlug,
  ['blog-published-post-by-slug-v14'],
  { tags: ['blog-posts'], revalidate: process.env.NODE_ENV === 'development' ? 1 : 3600 }
);

const _getPostBySlug = async (rawSlug: string): Promise<BlogPost | undefined> => {
  const canonicalSlug = SLUG_ALIASES[rawSlug] || rawSlug;
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 OR slug = $2 LIMIT 1;', [canonicalSlug, rawSlug]);
      if (rows.length > 0) return mapRowToBlogPost(rows[0]);
    } catch (error) {
      console.warn('getPostBySlug DB fallback:', error instanceof Error ? error.message : String(error));
    }
  }

  return STATIC_BLOG_POSTS.find((p) => p.slug === canonicalSlug || p.slug === rawSlug);
};

export const getPostBySlug = unstable_cache(
  _getPostBySlug,
  ['blog-post-by-slug-v14'],
  { tags: ['blog-posts'], revalidate: process.env.NODE_ENV === 'development' ? 1 : 3600 }
);

const _getAllSlugs = async (): Promise<string[]> => {
  const staticSlugs = STATIC_BLOG_POSTS.map((p) => p.slug);
  const aliasSlugs = Object.keys(SLUG_ALIASES);
  if (!pool) return Array.from(new Set([...staticSlugs, ...aliasSlugs]));
  try {
    const { rows } = await pool.query('SELECT slug FROM posts LIMIT 1000;');
    const dbSlugs = rows.map((r) => r.slug as string);
    return Array.from(new Set([...dbSlugs, ...staticSlugs, ...aliasSlugs]));
  } catch (error) {
    console.warn('getAllSlugs DB fallback:', error instanceof Error ? error.message : String(error));
    return Array.from(new Set([...staticSlugs, ...aliasSlugs]));
  }
};

export const getAllSlugs = unstable_cache(
  _getAllSlugs,
  ['blog-all-slugs-v14'],
  { tags: ['blog-posts'], revalidate: process.env.NODE_ENV === 'development' ? 1 : 3600 }
);

const _getPublishedSlugs = async (): Promise<string[]> => {
  const staticSlugs = STATIC_BLOG_POSTS.map((p) => p.slug);
  const aliasSlugs = Object.keys(SLUG_ALIASES);
  if (!pool) return Array.from(new Set([...staticSlugs, ...aliasSlugs]));
  try {
    const { rows } = await pool.query(`
      SELECT slug FROM posts 
      WHERE publish_date IS NULL OR publish_date <= NOW()
      LIMIT 1000;
    `);
    const dbSlugs = rows.map((r) => r.slug as string);
    return Array.from(new Set([...dbSlugs, ...staticSlugs, ...aliasSlugs]));
  } catch (error) {
    console.warn('getPublishedSlugs DB fallback:', error instanceof Error ? error.message : String(error));
    return Array.from(new Set([...staticSlugs, ...aliasSlugs]));
  }
};

export const getPublishedSlugs = unstable_cache(
  _getPublishedSlugs,
  ['blog-published-slugs-v14'],
  { tags: ['blog-posts'], revalidate: process.env.NODE_ENV === 'development' ? 1 : 3600 }
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
