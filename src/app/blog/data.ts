import { Pool } from 'pg';

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

const rawUrl = process.env.XATA_URL;
if (!rawUrl) {
  throw new Error('XATA_URL environment variable is required. Set it in .env.local or your deployment environment.');
}
// Append uselibpqcompat to silence pg v8.x security warnings
const XATA_URL = rawUrl.includes('?') 
  ? (rawUrl.includes('uselibpqcompat') ? rawUrl : `${rawUrl}&uselibpqcompat=true`)
  : `${rawUrl}?sslmode=require&uselibpqcompat=true`;

// Ensure we only create a single connection pool in development
const globalForPg = global as unknown as { pool: Pool };
export const pool = globalForPg.pool || new Pool({ connectionString: XATA_URL });
if (process.env.NODE_ENV !== 'production') globalForPg.pool = pool;

function mapRowToBlogPost(row: any): BlogPost {
  return {
    slug: row.slug || '',
    title: row.title || '',
    description: row.description || '',
    content: row.content || '',
    date: row.date ? new Date(row.date).toISOString() : new Date().toISOString(),
    publishDate: row.publish_date ? new Date(row.publish_date).toISOString() : undefined,
    readTime: row.read_time || '5 min read',
    category: row.category || 'YouTube SEO',
    tags: typeof row.tags === 'string' ? row.tags.split(',') : (row.tags || []),
  };
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE publish_date IS NULL OR publish_date <= CURRENT_DATE::text
      ORDER BY date DESC 
      LIMIT 1000;
    `);
    return rows.map(mapRowToBlogPost);
  } catch (error) {
    console.error('Xata getPublishedPosts error:', error);
    return [];
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE slug = $1 
      AND (publish_date IS NULL OR publish_date <= CURRENT_DATE::text)
      LIMIT 1;
    `, [slug]);
    if (rows.length === 0) return undefined;
    return mapRowToBlogPost(rows[0]);
  } catch (error) {
    console.error('Xata getPublishedPostBySlug error:', error);
    return undefined;
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 LIMIT 1;', [slug]);
    if (rows.length === 0) return undefined;
    return mapRowToBlogPost(rows[0]);
  } catch (error) {
    console.error('Xata getPostBySlug error:', error);
    return undefined;
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const { rows } = await pool.query('SELECT slug FROM posts LIMIT 1000;');
    return rows.map(r => r.slug);
  } catch (error) {
    console.error('Xata getAllSlugs error:', error);
    return [];
  }
}

export async function getPublishedSlugs(): Promise<string[]> {
  try {
    const { rows } = await pool.query(`
      SELECT slug FROM posts 
      WHERE publish_date IS NULL OR publish_date <= CURRENT_DATE::text
      LIMIT 1000;
    `);
    return rows.map(r => r.slug);
  } catch (error) {
    console.error('Xata getPublishedSlugs error:', error);
    return [];
  }
}

export async function getRelatedPosts(currentSlug: string, count = 3): Promise<BlogPost[]> {
  try {
    // Basic related logic: same category, not current post, ordered by date
    const current = await getPostBySlug(currentSlug);
    if (!current) return [];
    
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE slug != $1 AND category = $2
      AND (publish_date IS NULL OR publish_date <= CURRENT_DATE::text)
      ORDER BY date DESC 
      LIMIT $3;
    `, [currentSlug, current.category, count]);
    
    // If we don't have enough related posts in the same category, fill with other recent posts
    let related = rows.map(mapRowToBlogPost);
    if (related.length < count) {
      const { rows: fallbackRows } = await pool.query(`
        SELECT * FROM posts 
        WHERE slug != $1 AND slug != ALL($2::text[])
        AND (publish_date IS NULL OR publish_date <= CURRENT_DATE::text)
        ORDER BY date DESC 
        LIMIT $3;
      `, [currentSlug, related.map(r => r.slug).length > 0 ? related.map(r => r.slug) : [''], count - related.length]);
      
      related = [...related, ...fallbackRows.map(mapRowToBlogPost)];
    }
    
    return related;
  } catch (error) {
    console.error('Xata getRelatedPosts error:', error);
    return [];
  }
}
