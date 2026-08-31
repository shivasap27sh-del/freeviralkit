'use server';

export interface ExtractTagsResult {
  success: boolean;
  videoId?: string;
  title?: string;
  channel?: string;
  tags?: string[];
  error?: string;
}

export async function extractYouTubeTagsAction(urlOrId: string): Promise<ExtractTagsResult> {
  try {
    if (!urlOrId || typeof urlOrId !== 'string') {
      return { success: false, error: 'Please enter a valid YouTube URL or Video ID' };
    }

    const trimmed = urlOrId.trim();
    // Regex matching YouTube URLs: watch?v=, youtu.be/, shorts/, embed/
    const videoIdMatch = trimmed.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/
    );

    const videoId = videoIdMatch ? videoIdMatch[1] : trimmed.length === 11 ? trimmed : null;

    if (!videoId) {
      return { success: false, error: 'Could not detect a valid 11-character YouTube Video ID' };
    }

    // Fetch public HTML from YouTube
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return {
        success: true,
        videoId,
        tags: [],
        title: 'YouTube Video',
      };
    }

    const html = await res.text();

    // 1. Try parsing meta name="keywords"
    let tags: string[] = [];
    const metaKeywordsMatch = html.match(/<meta\s+name="keywords"\s+content="([^"]*)"/i);
    if (metaKeywordsMatch && metaKeywordsMatch[1]) {
      tags = metaKeywordsMatch[1]
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }

    // 2. Fallback: Parse ytInitialPlayerResponse keywords JSON
    if (tags.length === 0) {
      const playerMatch = html.match(/ytInitialPlayerResponse\s*=\s*({.+?});/);
      if (playerMatch && playerMatch[1]) {
        try {
          const json = JSON.parse(playerMatch[1]);
          if (json?.videoDetails?.keywords && Array.isArray(json.videoDetails.keywords)) {
            tags = json.videoDetails.keywords;
          }
        } catch {
          // ignore json parse error
        }
      }
    }

    // Extract Title
    const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
    const rawTitle = titleMatch ? titleMatch[1].replace(' - YouTube', '').trim() : 'YouTube Video';

    // Extract Channel Name
    const channelMatch = html.match(/<link\s+itemprop="name"\s+content="([^"]*)"/i);
    const channel = channelMatch ? channelMatch[1] : undefined;

    return {
      success: true,
      videoId,
      title: rawTitle,
      channel,
      tags: Array.from(new Set(tags)), // deduplicate
    };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { success: false, error: `Failed to inspect tags: ${msg}` };
  }
}
