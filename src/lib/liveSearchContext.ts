/**
 * Live Real-Time Context Fetcher for YouTube Title & Tag Generator
 *
 * Fetches real-world facts, plot summaries, release dates, and cast info
 * for movies, trending topics, and real-world events without web scraping.
 * Uses official clean REST APIs (Wikipedia REST API & DuckDuckGo Instant Answer).
 */

export interface RealTimeContextResult {
  query: string;
  source: 'tavily' | 'wikipedia' | 'duckduckgo' | 'none';
  summary: string;
  title?: string;
  url?: string;
}

/**
 * Fetches clean live summary data for a given query (e.g. "Obsession movie", "Avatar 3")
 */
export async function fetchRealTimeContext(query: string): Promise<RealTimeContextResult> {
  const cleanQuery = query.trim();
  if (!cleanQuery) {
    return { query, source: 'none', summary: '' };
  }

  // 1. Try Tavily Search API (If TAVILY_API_KEY is configured in .env.local / Vercel)
  const tavilyApiKey = process.env.TAVILY_API_KEY;
  if (tavilyApiKey) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);

      const response = await fetch('https://api.tavily.com/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: tavilyApiKey,
          query: `What is currently known and trending about: "${cleanQuery}"? Include release details, cast, storyline or news if applicable.`,
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
        const summary = data.answer || data.results?.map((r: any) => r.content).filter(Boolean).join('\n') || '';
        if (summary) {
          return {
            query: cleanQuery,
            source: 'tavily',
            title: cleanQuery,
            summary: summary.slice(0, 800),
            url: data.results?.[0]?.url,
          };
        }
      }
    } catch (err) {
      console.warn('[LiveContext] Tavily lookup failed, falling back to Wikipedia:', err);
    }
  }

  // 2. Fallback: Wikipedia Summary API
  try {
    const wikiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanQuery.replace(/\s+/g, '_'))}`;
    const res = await fetch(wikiUrl, {
      headers: { 'User-Agent': 'FreeViralKit/1.0 (https://freeviralkit.com)' },
      next: { revalidate: 3600 }, // Cache response for 1 hour
    });

    if (res.ok) {
      const data = await res.json();
      if (data.extract && data.type !== 'disambiguation') {
        return {
          query: cleanQuery,
          source: 'wikipedia',
          title: data.title,
          summary: data.extract,
          url: data.content_urls?.desktop?.page,
        };
      }
    }
  } catch (error) {
    console.warn('[LiveContext] Wikipedia lookup failed:', error);
  }

  // 2. Fallback: Try Wikipedia Search API if exact title match failed
  try {
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(cleanQuery)}&format=json&origin=*`;
    const searchRes = await fetch(searchUrl, {
      headers: { 'User-Agent': 'FreeViralKit/1.0 (https://freeviralkit.com)' },
      next: { revalidate: 3600 },
    });

    if (searchRes.ok) {
      const searchData = await searchRes.json();
      const topResult = searchData?.query?.search?.[0];
      if (topResult?.title) {
        const pageSummaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topResult.title.replace(/\s+/g, '_'))}`;
        const pageRes = await fetch(pageSummaryUrl, {
          headers: { 'User-Agent': 'FreeViralKit/1.0 (https://freeviralkit.com)' },
          next: { revalidate: 3600 },
        });

        if (pageRes.ok) {
          const pageData = await pageRes.json();
          if (pageData.extract) {
            return {
              query: cleanQuery,
              source: 'wikipedia',
              title: pageData.title,
              summary: pageData.extract,
              url: pageData.content_urls?.desktop?.page,
            };
          }
        }
      }
    }
  } catch (error) {
    console.warn('[LiveContext] Wikipedia search fallback failed:', error);
  }

  // 3. Fallback: DuckDuckGo Instant Answer API
  try {
    const ddgUrl = `https://api.duckduckgo.com/?q=${encodeURIComponent(cleanQuery)}&format=json&no_html=1&skip_disambig=1`;
    const ddgRes = await fetch(ddgUrl, {
      next: { revalidate: 3600 },
    });

    if (ddgRes.ok) {
      const ddgData = await ddgRes.json();
      if (ddgData.AbstractText) {
        return {
          query: cleanQuery,
          source: 'duckduckgo',
          title: ddgData.Heading,
          summary: ddgData.AbstractText,
          url: ddgData.AbstractURL,
        };
      }
    }
  } catch (error) {
    console.warn('[LiveContext] DuckDuckGo lookup failed:', error);
  }

  return {
    query: cleanQuery,
    source: 'none',
    summary: '',
  };
}
