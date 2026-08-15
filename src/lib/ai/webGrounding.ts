import { getCachedAIResponse, setCachedAIResponse } from './cache';

/**
 * Real-Time Web Context Grounding Engine
 * Fetches live contextual facts from Tavily Search API with automated Wikipedia/DDG fallback.
 * Uses L1/L2 multi-tier caching (5-minute TTL) for instant sub-millisecond retrieval.
 */

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

export async function searchGroundedContext(topic: string): Promise<string> {
  const cleanTopic = topic.trim().toLowerCase();
  if (!cleanTopic) return '';

  const cacheKey = `webgrounding:${cleanTopic.slice(0, 50)}`;
  const cached = await getCachedAIResponse(cacheKey);
  if (cached) {
    log(`[Search] ⚡ Cache HIT for web context: "${topic.slice(0, 30)}..."`);
    return cached;
  }

  // 1. Try Tavily Search API if configured
  const apiKey = process.env.TAVILY_API_KEY;
  if (apiKey) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
      log(`[Search] Fetching web context via Tavily for: "${topic}"`);
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

      if (response.ok) {
        const data = await response.json();
        const text =
          data.answer ||
          data.results?.map((r: { content?: string }) => r.content).filter(Boolean).join('\n') ||
          '';

        const resultText = !text || text.trim().length < 10 ? '' : text.trim();
        if (resultText) {
          log(`[Search] ✅ Got Tavily context (${resultText.length} chars)`);
          await setCachedAIResponse(cacheKey, resultText, 3600); // 1 hour cache
          return resultText;
        }
      }
    } catch (error) {
      clearTimeout(timeout);
      console.warn(`[Search] Tavily bypassed: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  // 2. Fallback: Wikipedia Summary API (<500ms)
  try {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
      cleanTopic.replace(/\s+/g, '_')
    )}`;
    const wikiRes = await fetch(wikiUrl, {
      headers: { 'User-Agent': 'FreeViralKit/1.0 (https://freeviralkit.com)' },
    });

    if (wikiRes.ok) {
      const data = await wikiRes.json();
      if (data.extract && data.type !== 'disambiguation') {
        const wikiText = data.extract.trim();
        log(`[Search] ✅ Got Wikipedia context (${wikiText.length} chars)`);
        await setCachedAIResponse(cacheKey, wikiText, 86400); // 24 hour cache
        return wikiText;
      }
    }
  } catch {
    // Wikipedia fallback failure ignored
  }

  return '';
}

