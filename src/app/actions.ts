'use server';

import Groq from 'groq-sdk';
import { headers } from 'next/headers';

// ======= Multi-AI Provider System with Automatic Fallback =======

interface ChatMessage { role: 'system' | 'user'; content: string; }
interface GenerateOptions { temperature: number; maxTokens: number; }

interface AIProvider {
  name: string;
  isConfigured: boolean;
  generate(messages: ChatMessage[], options: GenerateOptions): Promise<string>;
}

// --- Provider 1: Groq (Primary - Fastest) ---
const groqClient = process.env.GROQ_API_KEY ? new Groq({
  apiKey: process.env.GROQ_API_KEY,
  fetchOptions: {
    cache: 'no-store',
  },
}) : null;

const groqProvider: AIProvider = {
  name: 'Groq',
  isConfigured: !!process.env.GROQ_API_KEY,
  async generate(messages, options) {
    if (!groqClient) throw new Error('Groq not configured');
    const completion = await groqClient.chat.completions.create({
      messages,
      model: 'llama-3.3-70b-versatile',
      temperature: options.temperature,
      max_completion_tokens: options.maxTokens,
    });
    return completion.choices[0]?.message?.content || '';
  }
};

// Helper: OpenAI-compatible fetch (works for Gemini, NVIDIA, Cerebras, Together, etc.)
function createOpenAICompatibleProvider(
  name: string,
  envKey: string,
  baseUrl: string,
  model: string
): AIProvider {
  return {
    name,
    isConfigured: !!process.env[envKey],
    async generate(messages, options) {
      const apiKey = process.env[envKey];
      if (!apiKey) throw new Error(`${name} not configured`);

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: options.temperature,
          max_tokens: options.maxTokens,
        }),
        cache: 'no-store',
      });

      if (!response.ok) {
        const err = await response.text().catch(() => response.statusText);
        throw new Error(`${name} API error ${response.status}: ${err}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error(`${name} returned empty response`);
      return content;
    }
  };
}

// --- Provider 2: Google Gemini (Fallback 1) ---
const geminiProvider = createOpenAICompatibleProvider(
  'Google Gemini',
  'GEMINI_API_KEY',
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  'gemini-2.0-flash'
);

// --- Provider 3: NVIDIA NIM (Fallback 2 - 40 RPM free) ---
const nvidiaProvider = createOpenAICompatibleProvider(
  'NVIDIA NIM',
  'NVIDIA_API_KEY',
  'https://integrate.api.nvidia.com/v1/chat/completions',
  'meta/llama-3.3-70b-instruct'
);

// --- Provider 4: Cerebras (Fallback 3) ---
const cerebrasProvider = createOpenAICompatibleProvider(
  'Cerebras',
  'CEREBRAS_API_KEY',
  'https://api.cerebras.ai/v1/chat/completions',
  'llama-3.3-70b'
);

// --- Provider 5: Together AI (Fallback 4) ---
const togetherProvider = createOpenAICompatibleProvider(
  'Together AI',
  'TOGETHER_API_KEY',
  'https://api.together.xyz/v1/chat/completions',
  'meta-llama/Llama-3.3-70B-Instruct-Turbo'
);

// Build active provider chain — only includes providers with configured keys
const providers: AIProvider[] = [
  groqProvider,
  geminiProvider,
  nvidiaProvider,
  cerebrasProvider,
  togetherProvider,
].filter(p => p.isConfigured);

// Timeout wrapper — prevents a slow/hanging provider from blocking fallback
function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${providerName} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

// Core fallback logic: tries each provider in order until one succeeds
async function generateWithFallback(
  messages: ChatMessage[],
  options: GenerateOptions
): Promise<string> {
  const errors: string[] = [];

  for (const provider of providers) {
    try {
      console.log(`[AI] Trying ${provider.name}...`);
      const result = await withTimeout(
        provider.generate(messages, options),
        15000, // 15 second timeout per provider
        provider.name
      );
      console.log(`[AI] ✅ Success via ${provider.name}`);
      return result;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      console.warn(`[AI] ❌ ${provider.name} failed: ${msg}`);
      errors.push(`${provider.name}: ${msg}`);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join('\n')}`);
}

// ======= Rate Limiting System =======
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

async function checkRateLimit(limit = 10, windowMs = 60 * 1000): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');

    const now = Date.now();
    const record = rateLimitStore.get(ip);

    if (!record || now > record.resetTime) {
      rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
      return { allowed: true };
    }

    if (record.count >= limit) {
      return { allowed: false, retryAfter: Math.ceil((record.resetTime - now) / 1000) };
    }

    record.count += 1;
    return { allowed: true };
  } catch (e) {
    console.error('Rate limit check error:', e);
    return { allowed: true };
  }
}

// ======= Input Sanitization =======
function sanitizeInput(input: string, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  let trimmed = input.trim();
  if (trimmed.length > maxLength) {
    trimmed = trimmed.substring(0, maxLength);
  }
  // Strip control characters to avoid formatting exploits
  trimmed = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
  return trimmed;
}

// ======= Robust JSON Parser Wrappers =======
function safeParseJsonArray(text: string): string[] {
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(clean);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse JSON array from AI response, trying regex extraction:', e);
    const matches: string[] = [];
    const cleanText = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const doubleQuoteMatches = cleanText.match(/"([^"\\]*(?:\\.[^"\\]*)*)"/g);
    if (doubleQuoteMatches) {
      for (const m of doubleQuoteMatches) {
        const val = m.slice(1, -1).trim();
        if (val && val !== '[' && val !== ']' && val !== ',') {
          matches.push(val);
        }
      }
    }
    if (matches.length > 0) return matches.slice(0, 30);
    
    return text.split('\n')
      .map(line => line.replace(/^[-*\d.\s]+/, '').trim())
      .filter(line => line.length > 0);
  }
}

function safeParseChannelNames(text: string) {
  const fallback = { catchy: [], seo: [], brandable: [], shorts: [] };
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(clean);
    if (data && typeof data === 'object') {
      return {
        catchy: Array.isArray(data.catchy) ? data.catchy : [],
        seo: Array.isArray(data.seo) ? data.seo : [],
        brandable: Array.isArray(data.brandable) ? data.brandable : [],
        shorts: Array.isArray(data.shorts) ? data.shorts : []
      };
    }
  } catch (e) {
    console.error('Failed to parse channel names JSON:', e);
    try {
      const result: any = { catchy: [], seo: [], brandable: [], shorts: [] };
      const categories = ['catchy', 'seo', 'brandable', 'shorts'];
      for (const cat of categories) {
        const regex = new RegExp(`"${cat}"\\s*:\\s*\\[([\\s\\S]*?)\\]`, 'i');
        const match = regex.exec(text);
        if (match && match[1]) {
          const items = match[1].match(/"(.*?)"/g);
          if (items) {
            result[cat] = items.map(i => i.replace(/"/g, '').trim());
          }
        }
      }
      if (categories.some(cat => result[cat].length > 0)) {
        return result;
      }
    } catch (err) {
      console.error('Error in regex fallback for channel names:', err);
    }
  }
  return fallback;
}

function safeParseShortsIdeas(text: string) {
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(clean);
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Failed to parse Shorts ideas JSON:', e);
    return [];
  }
}

// ======= Title Generation =======

export async function generateTitles(topic: string, excludeTitles: string[] = []) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTitles) 
      ? excludeTitles.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    const responseText = await generateWithFallback([
      {
        role: 'system',
        content: `You are the #1 YouTube title strategist with 10+ years of experience. You create TWO types of titles:

TYPE A — SEO TITLES: Keyword-rich, 50-70 chars, optimized for YouTube search rankings. Include emojis and hashtags.
TYPE B — VIRAL TITLES: Short, punchy, 20-45 chars MAX. Curiosity-driven, emotional, raw. Think "I Quit.", "This Broke Me.", "It Actually Works.", "We Need To Talk." style. Emojis optional. NO hashtags.

You deeply understand every niche and tailor both styles to match the community.`
      },
      {
        role: 'user',
        content: `Generate exactly 10 YouTube video titles for this topic: "${sanitizedTopic}"
 
STRUCTURE:
- Titles 1-5: SEO-OPTIMIZED — keyword-rich, 50-70 chars, emojis + hashtags at end
- Titles 6-8: SHORT & PUNCHY VIRAL — 20-45 chars MAX, emotional, curiosity-driven, NO hashtags
- Titles 9-10: TRENDING FORMAT — mimic what's trending RIGHT NOW on YouTube, short and raw
 
RULES:
- Must feel like a REAL person wrote them
- BANNED: "You Won't Believe", "Shocking Truth", "Game Changer", "Mind Blowing", "Changes Everything"
- Each title MUST use a completely DIFFERENT angle/format
- SEO titles: 1-2 emojis + 1-2 hashtags at END
- Viral titles: under 45 chars, NO hashtags
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous titles, and use different angles/concepts than: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of 10 strings. No explanation, no markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    const titles = safeParseJsonArray(responseText);
    return { success: true, titles: Array.isArray(titles) ? titles : [] };
  } catch (error) {
    console.error('Error generating titles:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate titles.' };
  }
}

// ======= Internal Generators =======

async function generateTags(title: string, excludeTags: string[] = []): Promise<string[]> {
  const sanitizedExcludes = Array.isArray(excludeTags) 
    ? excludeTags.map(t => sanitizeInput(t)).filter(Boolean)
    : [];

  const text = await generateWithFallback([
    {
      role: 'system',
      content: 'You are a YouTube tags expert who optimizes for BOTH search rankings AND viral/Shorts discoverability.'
    },
    {
      role: 'user',
      content: `Generate 25-30 YouTube tags for this video title: "${title}"
 
STRUCTURE:
- Tags 1-10: SEO TAGS — exact match keywords, broad niche terms, long-tail search phrases
- Tags 11-18: SHORTS & VIRAL TAGS — "shorts", "youtube shorts", "viral", "trending", niche-specific viral tags
- Tags 19-25+: TRENDING TAGS — casual/slang search terms real people type
 
RULES:
- All lowercase, NO # symbols
- Vary length: single words + phrases + full search phrases
- Stay under 500 total characters
- Include: "shorts", "youtube shorts", "viral", "trending"
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous tags: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of strings. No markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
    }
  ], { temperature: 0.7, maxTokens: 500 });

  return safeParseJsonArray(text);
}

async function generateHashtags(title: string, excludeHashtags: string[] = []): Promise<string[]> {
  const sanitizedExcludes = Array.isArray(excludeHashtags) 
    ? excludeHashtags.map(h => sanitizeInput(h)).filter(Boolean)
    : [];

  const text = await generateWithFallback([
    {
      role: 'system',
      content: 'You are a YouTube hashtag strategist who optimizes for BOTH long-form videos AND Shorts.'
    },
    {
      role: 'user',
      content: `Generate 10-12 YouTube hashtags for this video title: "${title}"
 
STRUCTURE:
- First 3: STRONGEST high-traffic hashtags (shown above the title on YouTube)
- Next 4-5: Niche-specific SEO hashtags
- Last 3-4: Shorts/Viral hashtags — include #Shorts, #Viral, #Trending
 
RULES:
- CamelCase for multi-word (#HowToCook not #howtocook)
- Order by importance: highest traffic first
- ALWAYS include #Shorts if content could work as a Short
${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous hashtags: ${JSON.stringify(sanitizedExcludes)}` : ''}
 
Return ONLY a JSON array of strings with # symbol. No markdown.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
    }
  ], { temperature: 0.7, maxTokens: 300 });

  return safeParseJsonArray(text);
}

async function generateDescription(title: string, excludeDescription = ''): Promise<string> {
  const sanitizedExclude = sanitizeInput(excludeDescription, 1000);

  return await generateWithFallback([
    {
      role: 'system',
      content: 'You are a YouTube SEO expert who writes optimized video descriptions for ANY niche.'
    },
    {
      role: 'user',
      content: `Generate a complete YouTube description for this video title: "${title}"
 
Structure:
1. HOOK (2-3 lines): Bold, engaging opening
2. CALL TO ACTION:
   👍 LIKE if you found this helpful
   💬 COMMENT your thoughts below
   🔔 SUBSCRIBE for more content like this
3. SEO BODY (3-4 sentences): Natural keywords woven into readable sentences
4. HASHTAGS: Exactly 5 relevant hashtags at the end
 
RULES:
- Auto-detect niche and match tone
- Total under 250 words
- No keyword stuffing
${sanitizedExclude ? `- Make this description significantly different in structure and phrasing compared to this previous version: "${sanitizedExclude.slice(0, 300)}..."` : ''}
- Return ONLY the description as plain text. No JSON.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
    }
  ], { temperature: 0.7, maxTokens: 600 });
}

async function generatePinnedComment(title: string): Promise<string> {
  return await generateWithFallback([
    {
      role: 'system',
      content: 'You are a YouTube engagement expert. You write pinned comments that drive replies and boost watch time.'
    },
    {
      role: 'user',
      content: `Write a pinned comment for a YouTube video titled: "${title}"
 
RULES:
- Start with a hook or question that makes people REPLY
- Keep it 2-4 lines max
- Match the niche tone
- Include a call-to-action
- Use 1-2 relevant emojis
- Feel authentic, like the creator wrote it
- Do NOT say "pin this" or "pinned comment"
 
Return ONLY the comment as plain text.
[Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
    }
  ], { temperature: 0.8, maxTokens: 200 });
}

// ======= Exported Server Actions =======

export async function generateDetails(
  selectedTitle: string,
  excludeTags: string[] = [],
  excludeHashtags: string[] = [],
  excludeDescription = ''
) {
  try {
    const sanitizedTitle = sanitizeInput(selectedTitle);
    if (!sanitizedTitle) {
      return { success: false, error: 'Title cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const [tags, hashtags, description, pinnedComment] = await Promise.all([
      generateTags(sanitizedTitle, excludeTags),
      generateHashtags(sanitizedTitle, excludeHashtags),
      generateDescription(sanitizedTitle, excludeDescription),
      generatePinnedComment(sanitizedTitle),
    ]);
    return {
      success: true,
      details: {
        description,
        hashtags: Array.isArray(hashtags) ? hashtags : [],
        tags: Array.isArray(tags) ? tags : [],
        pinnedComment,
      },
    };
  } catch (error) {
    console.error('Error generating details:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate details.' };
  }
}

export async function generateHashtagsOnly(topic: string, excludeHashtags: string[] = []) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const hashtags = await generateHashtags(sanitizedTopic, excludeHashtags);
    return { success: true, hashtags: Array.isArray(hashtags) ? hashtags : [] };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate hashtags.' };
  }
}

export async function generateTagsOnly(topic: string, excludeTags: string[] = []) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const tags = await generateTags(sanitizedTopic, excludeTags);
    return { success: true, tags: Array.isArray(tags) ? tags : [] };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate tags.' };
  }
}

export async function generateDescriptionOnly(topic: string, excludeDescription = '') {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const description = await generateDescription(sanitizedTopic, excludeDescription);
    return { success: true, description };
  } catch (error) {
    console.error('Error generating description:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate description.' };
  }
}

// ======= Channel Name Generator =======

export async function generateChannelNames(keyword: string, style = 'default', excludeNames: string[] = []) {
  try {
    const sanitizedKeyword = sanitizeInput(keyword);
    if (!sanitizedKeyword) {
      return { success: false, error: 'Keyword cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeNames) 
      ? excludeNames.map(n => sanitizeInput(n)).filter(Boolean)
      : [];

    let styleInstruction = '';
    if (style === 'creative') {
      styleInstruction = 'Emphasize high creativity, unique wordplay, abstract concepts, and metaphors. Avoid simple keywords.';
    } else if (style === 'punny') {
      styleInstruction = 'Make the names funny, clever, and include witty puns or humorous wordplay related to the topic.';
    } else if (style === 'corporate') {
      styleInstruction = 'Make the names clean, professional, authority-driven, and trustworthy, suitable for a business or educational brand.';
    } else {
      styleInstruction = 'Keep a balanced mix of clever, modern, SEO-friendly, and brandable channel name suggestions.';
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: 'You are a YouTube branding expert who helps creators choose catchy, memorable, and SEO-friendly channel names.'
      },
      {
        role: 'user',
        content: `Generate 15 creative YouTube channel name ideas for the keyword or niche: "${sanitizedKeyword}".
         
        STYLE/VIBE FOCUS: ${styleInstruction}

        Group them into exactly 4 categories:
        - "catchy" (Modern, clever, and easy to remember - 4 ideas)
        - "seo" (Includes relevant keywords for search ranking - 4 ideas)
        - "brandable" (Unique, short, and punchy single-word or abstract names - 4 ideas)
        - "shorts" (Simple, short, and energetic names for a Shorts channel - 3 ideas)
 
        RULES:
        - Keep names clean, professional, and easy to pronounce
        - No numbers or special characters unless it fits perfectly
        - Return ONLY a valid JSON object matching this structure:
        {
          "catchy": ["name1", "name2", "name3", "name4"],
          "seo": ["name1", "name2", "name3", "name4"],
          "brandable": ["name1", "name2", "name3", "name4"],
          "shorts": ["name1", "name2", "name3"]
        }
        ${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous names under any category: ${JSON.stringify(sanitizedExcludes)}` : ''}
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 400 });

    const names = safeParseChannelNames(text);
    return { success: true, names };
  } catch (error) {
    console.error('Error generating channel names:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate channel names.' };
  }
}

// ======= Shorts Idea Generator =======

export async function generateShortsIdeas(topic: string, excludeTitles: string[] = []) {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeTitles) 
      ? excludeTitles.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    const text = await generateWithFallback([
      {
        role: 'system',
        content: 'You are a YouTube Shorts growth strategist who specializes in creating high-retention vertical videos.'
      },
      {
        role: 'user',
        content: `Generate 5 viral YouTube Shorts ideas for the topic/niche: "${sanitizedTopic}".
         
        For each idea, provide:
        - "title": A punchy working title for the concept
        - "hook": A 1-sentence hook to capture attention in the first 3 seconds (bold, high-retention text)
        - "visuals": Brief descriptions of visual transitions/actions to show on screen (B-roll, overlays, etc.)
        - "audio": A quick voiceover script and background sound suggestions (energetic, trending audio guidance)
 
        Return ONLY a JSON array containing 5 objects with "title", "hook", "visuals", and "audio" fields. 
        Structure:
        [
          {
            "title": "idea title",
            "hook": "first 3 seconds hook",
            "visuals": "on-screen action details",
            "audio": "voiceover and audio guidance"
          }
        ]
        ${sanitizedExcludes.length > 0 ? `- DO NOT generate any of these previous ideas/titles: ${JSON.stringify(sanitizedExcludes)}` : ''}
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    const ideas = safeParseShortsIdeas(text);
    return { success: true, ideas: Array.isArray(ideas) ? ideas : [] };
  } catch (error) {
    console.error('Error generating Shorts ideas:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate Shorts ideas.' };
  }
}

// ======= AI Video Script Generator =======

export async function generateScriptOutline(title: string, tone = 'energetic', duration = '5 minutes') {
  try {
    const sanitizedTitle = sanitizeInput(title);
    if (!sanitizedTitle) {
      return { success: false, error: 'Title cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: 'You are an elite YouTube script consultant and story structure expert who crafts high-retention video outlines.'
      },
      {
        role: 'user',
        content: `Create a highly structured YouTube video script outline/storyboard for:
        - **Video Title**: "${sanitizedTitle}"
        - **Tone**: ${tone}
        - **Target Duration**: ${duration}
 
        Structure the response into 4 distinct segments:
        - **hook**: A 1-sentence hook to capture attention in the first 3 seconds (bold, high-retention text)
        - **body**: Step-by-step video script flow/outline with timestamps, visual descriptions (b-roll, slide-ins), and core bullet-point scripts.
        - **cta**: Interactive call-to-action suggestions placed naturally (e.g. asking for likes, comments, subscriber milestones)
        - **outro**: A closing transition that keeps watch time high (like recommending another video or playlist for a loop effect)
 
        Return ONLY a valid JSON object matching this structure:
        {
          "hook": "first 3 seconds visual & audio hook",
          "body": ["Segment 1: Description with visuals (0:00-1:00)", "Segment 2: Core points (1:00-3:00)", "Segment 3: Summary (3:00-4:30)"],
          "cta": "engaging callback to action",
          "outro": "recommending loop playout"
        }
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.8, maxTokens: 800 });

    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      return { success: true, outline: parsed };
    } catch (e) {
      const hookMatch = text.match(/"hook"\s*:\s*"(.*?)"/i);
      const ctaMatch = text.match(/"cta"\s*:\s*"(.*?)"/i);
      const outroMatch = text.match(/"outro"\s*:\s*"(.*?)"/i);
      
      const bodySegments: string[] = [];
      const bodyRegex = /"body"\s*:\s*\[([\s\S]*?)\]/i;
      const bodyMatch = bodyRegex.exec(text);
      if (bodyMatch && bodyMatch[1]) {
        const items = bodyMatch[1].match(/"(.*?)"/g);
        if (items) {
          bodySegments.push(...items.map(i => i.replace(/"/g, '').trim()));
        }
      }

      return {
        success: true,
        outline: {
          hook: hookMatch ? hookMatch[1] : 'Intro hook here',
          body: bodySegments.length > 0 ? bodySegments : ['Outline details here'],
          cta: ctaMatch ? ctaMatch[1] : 'CTA details here',
          outro: outroMatch ? outroMatch[1] : 'Outro loop details here'
        }
      };
    }
  } catch (error) {
    console.error('Error generating script outline:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to generate script outline.' };
  }
}

// ======= Niche Research / Topic Finder =======

export async function researchTopic(niche: string) {
  try {
    const sanitizedNiche = sanitizeInput(niche);
    if (!sanitizedNiche) {
      return { success: false, error: 'Niche cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const text = await generateWithFallback([
      {
        role: 'system',
        content: 'You are a YouTube search strategist and keyword researcher who identifies trending, high-traffic topics.'
      },
      {
        role: 'user',
        content: `Perform niche research for the topic or niche: "${sanitizedNiche}".
         
        Identify:
        - **volume**: Search volume indicator ("High", "Medium", or "Low")
        - **competition**: Competition indicator ("High", "Medium", or "Low")
        - **ideas**: A list of 5 trending, specific video titles that creators should make right now to stand out, along with a 1-sentence explanation of why it will perform well.
 
        Return ONLY a valid JSON object matching this structure:
        {
          "volume": "High",
          "competition": "Medium",
          "ideas": [
            { "title": "video title 1", "reason": "why it ranks" },
            { "title": "video title 2", "reason": "why it ranks" },
            { "title": "video title 3", "reason": "why it ranks" },
            { "title": "video title 4", "reason": "why it ranks" },
            { "title": "video title 5", "reason": "why it ranks" }
          ]
        }
        Do not include any explanation or markdown formatting.
        [Variation Seed: ${Math.random().toString(36).substring(2, 10)}]`
      }
    ], { temperature: 0.7, maxTokens: 600 });

    try {
      const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(clean);
      return { success: true, data: parsed };
    } catch (e) {
      console.error('Failed to parse topic research JSON:', e);
      return {
        success: true,
        data: {
          volume: 'Medium',
          competition: 'Medium',
          ideas: [
            { title: `How to start in ${sanitizedNiche} for beginners`, reason: 'High search volume with new audience search interest' },
            { title: `Top 5 mistakes in ${sanitizedNiche} to avoid`, reason: 'Curiosity clickbait that drives high Click-Through-Rates' }
          ]
        }
      };
    }
  } catch (error) {
    console.error('Error in topic researcher:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Failed to perform niche research.' };
  }
}
