/**
 * Real-Time Web Context Grounding via Tavily Search API
 * Provides live contextual facts for trending movies, current news, and upcoming events.
 * Gracefully returns an empty string if Tavily is unavailable or unconfigured.
 */

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

const searchContextCache = new Map<string, { text: string; exp: number }>();
const SEARCH_CACHE_MAX_SIZE = 500;

// Periodic cleanup of expired search cache entries
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, val] of searchContextCache) {
      if (now > val.exp) searchContextCache.delete(key);
    }
    if (searchContextCache.size > SEARCH_CACHE_MAX_SIZE) searchContextCache.clear();
  }, 120_000);
}

export async function searchGroundedContext(topic: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    log('[Search] No Tavily API key configured, skipping web context');
    return '';
  }

  const cleanTopic = topic.trim().toLowerCase();
  const cached = searchContextCache.get(cleanTopic);
  if (cached && Date.now() < cached.exp) {
    log(`[Search] ⚡ Cache HIT for web context: "${topic.slice(0, 30)}..."`);
    return cached.text;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    log(`[Search] Fetching web context for: "${topic}"`);
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: `What is currently known and trending about: "${topic}"? Please include specific names, cast, controversies, or facts if applicable.`,
        search_depth: 'basic',
        include_answer: true,
        max_results: 3,
      }),
      signal: controller.signal,
      cache: 'no-store',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => '');
      console.warn(`[Search] Tavily search failed (${response.status}): ${errText.slice(0, 100)}`);
      return '';
    }

    const data = await response.json();
    const text =
      data.answer ||
      data.results?.map((r: { content?: string }) => r.content).filter(Boolean).join('\n') ||
      '';

    const resultText = !text || text.trim().length < 10 ? '' : text.trim();
    searchContextCache.set(cleanTopic, { text: resultText, exp: Date.now() + 5 * 60 * 1000 });

    if (resultText) log(`[Search] ✅ Got web context (${resultText.length} chars)`);
    return resultText;
  } catch (error) {
    clearTimeout(timeout);
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Search] Web context unavailable: ${msg}`);
    return '';
  }
}
