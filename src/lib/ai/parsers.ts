/**
 * Resilient JSON & Regex Parsers for AI Tool Responses
 * Provides safe parsing with multi-layer fallback to prevent crashes or markdown leakage.
 */

export function safeParseJsonArray(text: unknown): string[] {
  if (Array.isArray(text)) {
    return text.map(String).filter((s) => s.trim().length > 0);
  }
  const rawStr = typeof text === 'string' ? text : String(text || '');

  // 1. Primary: Extract array substring between first '[' and last ']'
  const firstBracket = rawStr.indexOf('[');
  const lastBracket = rawStr.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    const jsonSub = rawStr.substring(firstBracket, lastBracket + 1);
    try {
      const parsed = JSON.parse(jsonSub);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed
          .map(String)
          .map((s) => s.replace(/```[a-z]*/gi, '').replace(/```/g, '').trim())
          .filter((val) => val.length > 0 && !val.startsWith('{') && !val.startsWith('}'));
      }
    } catch {
      // Fall through to regex extraction
    }
  }

  // 2. Fallback 1: Extract all quoted strings from clean text
  const clean = rawStr
    .replace(/```json/gi, '')
    .replace(/```/g, '')
    .trim();

  const doubleQuoteMatches = clean.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
  if (doubleQuoteMatches && doubleQuoteMatches.length > 0) {
    const extracted = doubleQuoteMatches
      .map((m) => m.slice(1, -1).trim())
      .map((s) => s.replace(/\\"/g, '"').trim())
      .filter((val) => val.length > 0 && val !== '[' && val !== ']' && val !== ',' && !val.startsWith('```'));
    if (extracted.length > 0) return extracted.slice(0, 30);
  }

  // 3. Fallback 2: Line-by-line bullet extraction (strictly filtering out markdown artifacts)
  return clean
    .split('\n')
    .map((line) => line.replace(/^[-*\d.\s]+/, '').trim())
    .map((line) => line.replace(/^["']|["']$/g, '').trim())
    .filter(
      (line) =>
        line.length > 0 &&
        !line.startsWith('```') &&
        line !== '[' &&
        line !== ']' &&
        line !== '{' &&
        line !== '}'
    );
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

  const firstBrace = clean.indexOf('{');
  const lastBrace = clean.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const data = JSON.parse(clean.substring(firstBrace, lastBrace + 1));
      if (data && typeof data === 'object') {
        return {
          catchy: Array.isArray(data.catchy) ? data.catchy.map(String).filter((s: string) => !s.startsWith('```')) : [],
          seo: Array.isArray(data.seo) ? data.seo.map(String).filter((s: string) => !s.startsWith('```')) : [],
          brandable: Array.isArray(data.brandable) ? data.brandable.map(String).filter((s: string) => !s.startsWith('```')) : [],
          shorts: Array.isArray(data.shorts) ? data.shorts.map(String).filter((s: string) => !s.startsWith('```')) : [],
        };
      }
    } catch {
      // Regex category extraction fallback
    }
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
          result[cat] = items
            .map((i) => i.replace(/"/g, '').trim())
            .filter((s) => !s.startsWith('```'));
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

  const firstBracket = clean.indexOf('[');
  const lastBracket = clean.lastIndexOf(']');
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    try {
      const parsed = JSON.parse(clean.substring(firstBracket, lastBracket + 1));
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed as ShortsIdea[];
      }
    } catch {
      // Fall through to object extractor
    }
  }

  return [];
}
