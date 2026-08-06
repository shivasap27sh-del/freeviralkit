/**
 * Live Real-Time Context Fetcher for YouTube Title & Tag Generator
 *
 * Fetches real-world facts, plot summaries, release dates, and cast info
 * for movies, trending topics, and real-world events without web scraping.
 * Uses official clean REST APIs (Wikipedia REST API & DuckDuckGo Instant Answer).
 */

export interface RealTimeContextResult {
  query: string;
  source: 'wikipedia' | 'duckduckgo' | 'none';
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

  // 1. Try Wikipedia Summary API (Best for Movies, TV Shows, Trending Topics, Historical Events)
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
