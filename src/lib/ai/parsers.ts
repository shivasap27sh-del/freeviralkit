/**
 * Resilient JSON & Regex Parsers for AI Tool Responses
 * Provides safe parsing with multi-layer regex fallback to prevent crashes on malformed LLM outputs.
 */

export function safeParseJsonArray(text: unknown): string[] {
  if (Array.isArray(text)) {
    return text.map(String);
  }
  const str = typeof text === 'string' ? text : String(text || '');
  const clean = str.replace(/```json/gi, '').replace(/```/g, '').trim();

  // Primary: Standard JSON parsing
  try {
    const parsed = JSON.parse(clean);
    if (Array.isArray(parsed)) return parsed.map(String);
  } catch {
    // Fall back to regex parsing below
  }

  // Fallback 1: Extract all quoted strings
  const doubleQuoteMatches = clean.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
  if (doubleQuoteMatches && doubleQuoteMatches.length > 0) {
    const extracted = doubleQuoteMatches
      .map((m) => m.slice(1, -1).trim())
      .filter((val) => val && val !== '[' && val !== ']' && val !== ',');
    if (extracted.length > 0) return extracted.slice(0, 30);
  }

  // Fallback 2: Line-by-line bullet extraction
  return str
    .split('\n')
    .map((line) => line.replace(/^[-*\d.\s]+/, '').trim())
    .filter((line) => line.length > 0);
}

export interface ChannelNamesResult {
  catchy: string[];
  seo: string[];
  brandable: string[];
  shorts: string[];
}

export function safeParseChannelNames(text: string): ChannelNamesResult {
  const fallback: ChannelNamesResult = { catchy: [], seo: [], brandable: [], shorts: [] };
  if (!text) return fallback;

  const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    const data = JSON.parse(clean);
    if (data && typeof data === 'object') {
      return {
        catchy: Array.isArray(data.catchy) ? data.catchy.map(String) : [],
        seo: Array.isArray(data.seo) ? data.seo.map(String) : [],
        brandable: Array.isArray(data.brandable) ? data.brandable.map(String) : [],
        shorts: Array.isArray(data.shorts) ? data.shorts.map(String) : [],
      };
    }
  } catch {
    // Regex category extraction fallback
  }

  try {
    const result: ChannelNamesResult = { catchy: [], seo: [], brandable: [], shorts: [] };
    const categories: (keyof ChannelNamesResult)[] = ['catchy', 'seo', 'brandable', 'shorts'];
    
    for (const cat of categories) {
      const regex = new RegExp(`"${cat}"\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'i');
      const match = regex.exec(clean);
      if (match && match[1]) {
        const items = match[1].match(/"(.*?)"/g);
        if (items) {
          result[cat] = items.map((i) => i.replace(/"/g, '').trim());
        }
      }
    }

    if (categories.some((cat) => result[cat].length > 0)) {
      return result;
    }
  } catch (err) {
    console.error('[Parsers] Channel names fallback parsing error:', err);
  }

  return fallback;
}

export interface ShortsIdea {
  title: string;
  hook: string;
  visuals: string;
  audio: string;
}

export function safeParseShortsIdeas(text: string): ShortsIdea[] {
  if (!text) return [];
  const clean = text.replace(/```json/gi, '').replace(/```/g, '').trim();

  try {
    const data = JSON.parse(clean);
    if (!Array.isArray(data)) return [];
    return data.map((item: unknown) => {
      const obj = typeof item === 'object' && item !== null ? (item as Record<string, unknown>) : {};
      return {
        title: typeof obj.title === 'string' ? obj.title.replace(/\*/g, '').trim() : '',
        hook: typeof obj.hook === 'string' ? obj.hook.replace(/\*/g, '').trim() : '',
        visuals: typeof obj.visuals === 'string' ? obj.visuals.replace(/\*/g, '').trim() : '',
        audio: typeof obj.audio === 'string' ? obj.audio.replace(/\*/g, '').trim() : '',
      };
    });
  } catch (e) {
    console.error('[Parsers] Failed to parse Shorts ideas JSON:', e);
    return [];
  }
}
