'use server';

import Groq from 'groq-sdk';

// ======= Multi-AI Provider System with Automatic Fallback =======

interface ChatMessage { role: 'system' | 'user'; content: string; }
interface GenerateOptions { temperature: number; maxTokens: number; }

interface AIProvider {
  name: string;
  isConfigured: boolean;
  generate(messages: ChatMessage[], options: GenerateOptions): Promise<string>;
}

// --- Provider 1: Groq (Primary - Fastest) ---
const groqClient = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;

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

// ======= Title Generation =======

export async function generateTitles(topic: string) {
  try {
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
        content: `Generate exactly 10 YouTube video titles for this topic: "${topic}"

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

Return ONLY a JSON array of 10 strings. No explanation, no markdown.`
      }
    ], { temperature: 0.7, maxTokens: 800 });

    const cleanJson = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    const titles = JSON.parse(cleanJson);
    return { success: true, titles: Array.isArray(titles) ? titles : [] };
  } catch (error) {
    console.error('Error generating titles:', error);
    return { success: false, error: 'Failed to generate titles. Please try again.' };
  }
}

// ======= Internal Generators =======

async function generateTags(title: string): Promise<string[]> {
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

Return ONLY a JSON array of strings. No markdown.`
    }
  ], { temperature: 0.7, maxTokens: 500 });

  return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
}

async function generateHashtags(title: string): Promise<string[]> {
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

Return ONLY a JSON array of strings with # symbol. No markdown.`
    }
  ], { temperature: 0.7, maxTokens: 300 });

  return JSON.parse(text.replace(/```json/g, '').replace(/```/g, '').trim());
}

async function generateDescription(title: string): Promise<string> {
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
- Return ONLY the description as plain text. No JSON.`
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

Return ONLY the comment as plain text.`
    }
  ], { temperature: 0.8, maxTokens: 200 });
}

// ======= Exported Server Actions =======

export async function generateDetails(selectedTitle: string) {
  try {
    const [tags, hashtags, description, pinnedComment] = await Promise.all([
      generateTags(selectedTitle),
      generateHashtags(selectedTitle),
      generateDescription(selectedTitle),
      generatePinnedComment(selectedTitle),
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
    return { success: false, error: 'Failed to generate details. Please try again.' };
  }
}

export async function generateHashtagsOnly(topic: string) {
  try {
    const hashtags = await generateHashtags(topic);
    return { success: true, hashtags: Array.isArray(hashtags) ? hashtags : [] };
  } catch (error) {
    console.error('Error generating hashtags:', error);
    return { success: false, error: 'Failed to generate hashtags. Please try again.' };
  }
}

export async function generateTagsOnly(topic: string) {
  try {
    const tags = await generateTags(topic);
    return { success: true, tags: Array.isArray(tags) ? tags : [] };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { success: false, error: 'Failed to generate tags. Please try again.' };
  }
}

export async function generateDescriptionOnly(topic: string) {
  try {
    const description = await generateDescription(topic);
    return { success: true, description };
  } catch (error) {
    console.error('Error generating description:', error);
    return { success: false, error: 'Failed to generate description. Please try again.' };
  }
}
