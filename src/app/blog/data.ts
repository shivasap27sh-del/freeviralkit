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

export const FALLBACK_POSTS: BlogPost[] = [
  {
    slug: 'how-to-write-youtube-titles-that-get-clicks',
    title: 'How to Write YouTube Titles That Get Clicks in 2026: The Ultimate CTR Guide',
    description: 'Master the art and science of high-CTR YouTube titles. Learn proven formulas, semantic keyword placement, curiosity gaps, and how to optimize for search and browse features.',
    category: 'YouTube Title Optimization',
    tags: ['YouTube Titles', 'CTR', 'YouTube SEO', 'Creator Tips'],
    readTime: '8 min read',
    date: '2026-07-20T10:00:00Z',
    content: `
Every minute, over 500 hours of video are uploaded to YouTube. In that ocean of content, your title is the single most powerful lever you control. It determines whether a viewer scrolls past your video or stops to click.

## Why Your YouTube Title Is the #1 Ranking Factor

YouTube’s own Creator Academy confirms that the title and thumbnail together account for the majority of a video’s click-through rate (CTR). While you cannot control which viewers see your video, you can control how compelling your title is when they do.

### 1. Front-Load Your Primary Keyword
YouTube weighs the beginning of your title more heavily than the end. If your video is about "beginner yoga stretches," that phrase should appear in the first 50 characters—not buried after a long hook.

### 2. Use Specific Numbers and Timeframes
Titles containing numbers outperform vague alternatives by over 36%. "7 Morning Habits That Changed My Life" is far more clickable than "Morning Habits That Changed My Life" because the number sets a clear, concrete expectation.

### 3. Trigger Curiosity Without Clickbait
Power words like *secret*, *mistake*, *actually*, and *nobody tells you* create an information gap—the viewer feels compelled to click to close that gap. However, your video MUST deliver on the title's promise. Misleading titles tank audience retention.

## Search Titles vs. Browse Titles

- **Search-Driven Titles**: Highly specific and problem-solving (e.g., "How to Change a Tire on a 2018 Honda Civic").
- **Browse-Driven Titles**: Broad appeal and curiosity-driven (e.g., "I Survived 50 Hours in Antarctica").

If you have under 10,000 subscribers, start with Search-Driven titles to build an initial subscriber base before pivoting to Browse-Driven titles.
`
  },
  {
    slug: 'youtube-seo-checklist-2026',
    title: 'The Ultimate YouTube SEO Checklist for 2026: Rank #1 in YouTube Search',
    description: 'A complete step-by-step checklist to optimize your YouTube video titles, descriptions, tags, chapters, and thumbnails for maximum organic reach.',
    category: 'YouTube SEO',
    tags: ['YouTube SEO', 'Algorithm', 'Video Optimization', 'Search Traffic'],
    readTime: '10 min read',
    date: '2026-07-18T10:00:00Z',
    content: `
YouTube is the second largest search engine in the world, processing over 3 billion searches every month. If you want sustainable, long-term traffic to your YouTube channel, mastering YouTube SEO is essential.

## Step 1: Keyword Research for YouTube

Before recording your video, identify what your target audience is searching for:
- Use YouTube Autocomplete to find long-tail search terms.
- Analyze top-ranking competitors in your niche.
- Identify low-competition keywords with high search interest.

## Step 2: Optimizing Video Metadata

### Video Title
- Keep your title between 50 and 70 characters to avoid truncation on mobile devices.
- Include your primary keyword within the first 50 characters.

### Video Description
- Write a detailed 200–300 word description.
- Include your primary keyword in the first 2 sentences.
- Add timestamps (chapters) to improve user experience and qualify for Google Key Moments in Google Search.

### Video Tags & Hashtags
- Include 3 to 5 relevant hashtags at the bottom of your description.
- Use specific brand and topic tags to reinforce search intent.
`
  },
  {
    slug: 'how-to-get-more-views-on-youtube-shorts',
    title: 'How to Get More Views on YouTube Shorts: Algorithm Secrets Revealed',
    description: 'Discover how YouTube Shorts recommendation engine works, optimal video length, hook strategies, and hashtag formulas to blow up your Shorts channel.',
    category: 'YouTube Shorts Strategy',
    tags: ['YouTube Shorts', 'Shorts Algorithm', 'Viral Video', 'Creator Growth'],
    readTime: '7 min read',
    date: '2026-07-15T10:00:00Z',
    content: `
YouTube Shorts generates over 70 billion daily views. However, getting your Shorts into the YouTube Shorts Feed requires a completely different strategy than long-form videos.

## The Shorts Algorithm Demystified

The Shorts algorithm prioritizes two primary metrics:
1. **Viewed vs. Swiped Away Ratio**: The percentage of people who choose to stay and watch your Short instead of swiping away in the first 2 seconds.
2. **Average Percentage Viewed (APV)**: To go viral, your Short should have an APV above 100% (meaning viewers rewatch your clip).

## 3 Rules for High-Performing YouTube Shorts

### Rule 1: The Visual Hook (0–3 Seconds)
Never start a Short with "Hey guys, welcome back!". Start directly in the middle of the action or ask an intriguing question immediately.

### Rule 2: Optimal Shorts Length (15–30 Seconds)
While Shorts can be up to 60 seconds, 15 to 30-second Shorts consistently achieve higher rewatch percentages.

### Rule 3: Seamless Loops
Design the ending of your Short to seamlessly connect back to the first line of your video. This tricks the viewer into watching the beginning twice, inflating your APV.
`
  },
  {
    slug: 'youtube-tag-optimization-guide',
    title: 'Do YouTube Tags Still Matter in 2026? The Definitive Guide',
    description: 'Uncover the truth about YouTube tags. Learn how tags help with misspellings, keyword clustering, and long-tail discoverability in YouTube search.',
    category: 'Metadata Optimization',
    tags: ['YouTube Tags', 'Metadata', 'SEO Guide', 'Channel Growth'],
    readTime: '6 min read',
    date: '2026-07-10T10:00:00Z',
    content: `
Creators often ask: *Are YouTube tags still important?* While YouTube's official documentation states that tags play a minor role compared to titles and thumbnails, they remain a crucial secondary signal for algorithm classification.

## When YouTube Tags Are Essential

1. **Common Misspellings**: If your channel name or topic is commonly misspelled (e.g., "iPhone" vs "iFone"), adding misspellings as tags ensures your video still appears in search results.
2. **Disambiguation**: If your video topic could mean multiple things, tags clarify context to the YouTube algorithm.
3. **Suggested Videos Placement**: Related tags help YouTube connect your video to similar content in the Suggested Videos sidebar.

## How to Build the Perfect Tag List

- **Target Tag (1–2)**: Exact primary keyword phrase.
- **Category Tags (3–5)**: Broader niche terms (e.g., "Tech Review", "Smartphone 2026").
- **Specific Tags (5–10)**: Long-tail variations and sub-topics.
`
  },
  {
    slug: 'how-to-write-viral-youtube-hooks',
    title: 'How to Write YouTube Hooks That Keep Viewers Watching Until the End',
    description: 'Learn how to hook viewers in the first 30 seconds of your video to boost audience retention, watch time, and YouTube algorithm recommendations.',
    category: 'Content Strategy',
    tags: ['YouTube Hooks', 'Audience Retention', 'Scriptwriting', 'Video Editing'],
    readTime: '7 min read',
    date: '2026-07-05T10:00:00Z',
    content: `
The first 30 seconds of your YouTube video determine whether it succeeds or fails. YouTube Studio analytics clearly show a sharp drop-off (the "intro cliff") in the first 30 seconds if your hook fails to grab attention.

## 4 Proven YouTube Hook Templates

### 1. The Negative Stake Hook
"If you are doing X, you are wasting hours of your time..."
This hook activates loss aversion, compelling the viewer to stick around.

### 2. The Result First Hook
Show the impressive end result of your project or tutorial right at 0:01, then say: "Here is how we built this in under 24 hours."

### 3. The Curiosity Gap Hook
"There is a hidden setting in YouTube Studio that 90% of creators turn off by mistake..."

### 4. The Story Teaser Hook
Start right in the middle of a high-tension moment before flashing back: "3 hours before this photo was taken, everything went wrong..."
`
  }
];

const rawUrl = process.env.DATABASE_URL;
let DB_URL = '';
if (rawUrl) {
  DB_URL = rawUrl.includes('?') 
    ? (rawUrl.includes('uselibpqcompat') ? rawUrl : `${rawUrl}&uselibpqcompat=true`)
    : `${rawUrl}?sslmode=require&uselibpqcompat=true`;
} else {
  console.warn('[Database] DATABASE_URL is not defined. Using static fallback posts.');
}

const globalForPg = global as unknown as { pool: Pool | null };
export const pool: Pool | null = rawUrl ? (globalForPg.pool || new Pool({ connectionString: DB_URL })) : null;
if (process.env.NODE_ENV !== 'production' && pool) globalForPg.pool = pool;

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
  if (!pool) return FALLBACK_POSTS;
  try {
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE publish_date IS NULL OR publish_date <= NOW()
      ORDER BY date DESC 
      LIMIT 1000;
    `);
    if (rows.length === 0) return FALLBACK_POSTS;
    return rows.map(mapRowToBlogPost);
  } catch (error) {
    console.error('getPublishedPosts DB error:', error);
    return FALLBACK_POSTS;
  }
}

export async function getPublishedPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT * FROM posts 
        WHERE slug = $1 
        AND (publish_date IS NULL OR publish_date <= NOW())
        LIMIT 1;
      `, [slug]);
      if (rows.length > 0) return mapRowToBlogPost(rows[0]);
    } catch (error) {
      console.error('getPublishedPostBySlug DB error:', error);
    }
  }
  return FALLBACK_POSTS.find(p => p.slug === slug);
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT * FROM posts WHERE slug = $1 LIMIT 1;', [slug]);
      if (rows.length > 0) return mapRowToBlogPost(rows[0]);
    } catch (error) {
      console.error('getPostBySlug DB error:', error);
    }
  }
  return FALLBACK_POSTS.find(p => p.slug === slug);
}

export async function getAllSlugs(): Promise<string[]> {
  if (pool) {
    try {
      const { rows } = await pool.query('SELECT slug FROM posts LIMIT 1000;');
      if (rows.length > 0) return rows.map(r => r.slug);
    } catch (error) {
      console.error('getAllSlugs DB error:', error);
    }
  }
  return FALLBACK_POSTS.map(p => p.slug);
}

export async function getPublishedSlugs(): Promise<string[]> {
  if (pool) {
    try {
      const { rows } = await pool.query(`
        SELECT slug FROM posts 
        WHERE publish_date IS NULL OR publish_date <= NOW()
        LIMIT 1000;
      `);
      if (rows.length > 0) return rows.map(r => r.slug);
    } catch (error) {
      console.error('getPublishedSlugs DB error:', error);
    }
  }
  return FALLBACK_POSTS.map(p => p.slug);
}

export async function getRelatedPosts(currentSlug: string, count = 3): Promise<BlogPost[]> {
  const allPosts = await getPublishedPosts();
  const current = allPosts.find(p => p.slug === currentSlug);
  const otherPosts = allPosts.filter(p => p.slug !== currentSlug);
  
  if (!current) return otherPosts.slice(0, count);
  
  const sameCategory = otherPosts.filter(p => p.category === current.category);
  if (sameCategory.length >= count) {
    return sameCategory.slice(0, count);
  }
  
  const remaining = otherPosts.filter(p => p.category !== current.category);
  return [...sameCategory, ...remaining].slice(0, count);
}

