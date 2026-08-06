import Groq from 'groq-sdk';
import { headers } from 'next/headers';
import { Redis } from '@upstash/redis';
import crypto from 'node:crypto';

// ======= Multi-AI Provider System with Automatic Fallback =======

interface ChatMessage { role: 'system' | 'user'; content: string; }
interface GenerateOptions { temperature: number; maxTokens: number; }

interface AIProvider {
  name: string;
  isConfigured: boolean;
  generate(messages: ChatMessage[], options: GenerateOptions): Promise<string>;
}

// --- Provider 1: Groq (Primary - Fastest) ---
const groqApiKeys: string[] = [];
if (process.env.GROQ_API_KEY) groqApiKeys.push(process.env.GROQ_API_KEY);
if (process.env.GROQ_API_KEY_2) groqApiKeys.push(process.env.GROQ_API_KEY_2);

// Auto-discover extra keys if defined in the future
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('GROQ_API_KEY_') && key !== 'GROQ_API_KEY_2') {
    const val = process.env[key];
    if (val && !groqApiKeys.includes(val)) {
      groqApiKeys.push(val);
    }
  }
});

const groqClients = groqApiKeys.map((key) => new Groq({
  apiKey: key,
  fetchOptions: { cache: 'no-store' },
}));

const groqProvider: AIProvider = {
  name: 'Groq',
  isConfigured: groqClients.length > 0,
  async generate(messages, options) {
    if (groqClients.length === 0) throw new Error('Groq not configured');

    let startIndex = 0;
    try {
      const redis = getRedisClient();
      if (redis) {
        // Atomic index rotation via Redis
        const rawIndex = await Promise.race([
          redis.incr('global:groq_index'),
          new Promise<number>((_, r) => setTimeout(() => r(new Error()), 400))
        ]);
        startIndex = rawIndex % groqClients.length;
      } else {
        startIndex = Math.floor(Math.random() * groqClients.length);
      }
    } catch (e) {
      startIndex = Math.floor(Math.random() * groqClients.length);
    }

    const errors: string[] = [];
    for (let i = 0; i < groqClients.length; i++) {
      const currentIndex = (startIndex + i) % groqClients.length;
      const client = groqClients[currentIndex];

      // Verify if current key index is marked as rate-limited in Redis
      try {
        const redis = getRedisClient();
        if (redis) {
          const isBlocked = await Promise.race([
            redis.get(`groq:blocked:${currentIndex}`),
            new Promise<null>((_, r) => setTimeout(() => r(new Error()), 400))
          ]);
          if (isBlocked) {
            console.log(`[Groq] Key #${currentIndex} is currently blocked, skipping.`);
            continue;
          }
        }
      } catch (e) {
        // Ignore if Redis is unavailable
      }

      try {
        console.log(`[Groq] Attempting generation with key index #${currentIndex}...`);
        const completion = await client.chat.completions.create({
          messages,
          model: 'llama-3.3-70b-versatile',
          temperature: options.temperature,
          max_completion_tokens: options.maxTokens,
            });
        return completion.choices[0]?.message?.content || '';
      } catch (error: any) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[Groq] Key #${currentIndex} failed: ${msg}`);
        errors.push(`Key #${currentIndex}: ${msg}`);

        // If it's a rate limit error (429), block it in Redis
        if (msg.includes('429') || msg.toLowerCase().includes('rate limit') || error?.status === 429) {
          try {
            const redis = getRedisClient();
            if (redis) {
              await redis.set(`groq:blocked:${currentIndex}`, '1', { ex: 30 });
              console.log(`[Groq] 🚫 Blocked Key #${currentIndex} in Redis for 30 seconds.`);
            }
          } catch (e) {
            // Ignore Redis errors
          }
        }
      }
    }

    throw new Error(`All Groq keys failed:\n${errors.join('\n')}`);
  }
};

// Helper: OpenAI-compatible fetch with multi-key rotation
function createOpenAICompatibleProvider(
  name: string,
  envKey: string,
  baseUrl: string,
  model: string
): AIProvider {
  const apiKeys: string[] = [];
  const baseKeyVal = process.env[envKey];
  if (baseKeyVal) apiKeys.push(baseKeyVal);

  // Discover dynamic keys (e.g. GEMINI_API_KEY_2, CEREBRAS_API_KEY_3)
  Object.keys(process.env).forEach((key) => {
    if (key.startsWith(`${envKey}_`)) {
      const val = process.env[key];
      if (val && !apiKeys.includes(val)) {
        apiKeys.push(val);
      }
    }
  });

  return {
    name,
    isConfigured: apiKeys.length > 0,
    async generate(messages, options) {
      if (apiKeys.length === 0) throw new Error(`${name} not configured`);

      const cleanName = name.replace(/\s+/g, '_').toLowerCase();
      let startIndex = 0;
      try {
        const redis = getRedisClient();
        if (redis) {
          const rawIndex = await Promise.race([
            redis.incr(`global:index:${cleanName}`),
            new Promise<number>((_, r) => setTimeout(() => r(new Error()), 400))
          ]);
          startIndex = rawIndex % apiKeys.length;
        } else {
          startIndex = Math.floor(Math.random() * apiKeys.length);
        }
      } catch (e) {
        startIndex = Math.floor(Math.random() * apiKeys.length);
      }

      const errors: string[] = [];
      for (let i = 0; i < apiKeys.length; i++) {
        const currentIndex = (startIndex + i) % apiKeys.length;
        const apiKey = apiKeys[currentIndex];

        // Check if current key is blocked in Redis
        try {
          const redis = getRedisClient();
          if (redis) {
            const isBlocked = await Promise.race([
              redis.get(`blocked:${cleanName}:${currentIndex}`),
              new Promise<null>((_, r) => setTimeout(() => r(new Error()), 400))
            ]);
            if (isBlocked) {
              console.log(`[${name}] Key #${currentIndex} is blocked, skipping.`);
              continue;
            }
          }
        } catch (e) {
          // Bypass blocked check on connection error
        }

        try {
          console.log(`[${name}] Attempting generation with key index #${currentIndex}...`);
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
            const errText = await response.text().catch(() => response.statusText);
            throw new Error(`API error ${response.status}: ${errText}`);
          }

          const data = await response.json();
          const content = data.choices?.[0]?.message?.content;
          if (!content) throw new Error(`Returned empty response`);
          return content;
        } catch (error: any) {
          const msg = error instanceof Error ? error.message : String(error);
          console.warn(`[${name}] Key #${currentIndex} failed: ${msg}`);
          errors.push(`Key #${currentIndex}: ${msg}`);

          // If rate limit (429), block it in Redis
          if (msg.includes('429') || msg.toLowerCase().includes('rate limit') || error?.status === 429) {
            try {
              const redis = getRedisClient();
              if (redis) {
                await redis.set(`blocked:${cleanName}:${currentIndex}`, '1', { ex: 30 });
                console.log(`[${name}] 🚫 Blocked Key #${currentIndex} in Redis for 30 seconds.`);
              }
            } catch (e) {
              // Ignore Redis errors
            }
          }
        }
      }

      throw new Error(`All ${name} keys failed:\n${errors.join('\n')}`);
    }
  };
}

// --- Provider Fallbacks ---
const geminiProvider = createOpenAICompatibleProvider(
  'Google Gemini',
  'GEMINI_API_KEY',
  'https://generativelanguage.googleapis.com/v1beta/openai/chat/completions',
  'gemini-2.0-flash'
);

const nvidiaProvider = createOpenAICompatibleProvider(
  'NVIDIA NIM',
  'NVIDIA_API_KEY',
  'https://integrate.api.nvidia.com/v1/chat/completions',
  'meta/llama-3.3-70b-instruct'
);

const cerebrasProvider = createOpenAICompatibleProvider(
  'Cerebras',
  'CEREBRAS_API_KEY',
  'https://api.cerebras.ai/v1/chat/completions',
  'gemma-4-31b'
);

const togetherProvider = createOpenAICompatibleProvider(
  'Together AI',
  'TOGETHER_API_KEY',
  'https://api.together.xyz/v1/chat/completions',
  'meta-llama/Llama-3.3-70B-Instruct-Turbo'
);

const openRouterProvider = createOpenAICompatibleProvider(
  'OpenRouter',
  'OPENROUTER_API_KEY',
  'https://openrouter.ai/api/v1/chat/completions',
  'openrouter/free'
);

const providers: AIProvider[] = [
  groqProvider,
  nvidiaProvider,
  openRouterProvider,
  geminiProvider,
  cerebrasProvider,
].filter(p => p.isConfigured);

function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${providerName} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

// --- Circuit Breaker System ---
// Tracks when a provider is allowed to be tried again (Unix timestamp in ms)
// This prevents the system from being slow by constantly retrying exhausted APIs
const providerTimeouts = new Map<string, number>();

export async function generateWithFallback(
  messages: ChatMessage[],
  options: GenerateOptions
): Promise<string> {
  const errors: string[] = [];

  // Inject SAFETY_INSTRUCTION into the system prompt (or first message)
  const safeMessages = [...messages];
  const systemMsgIndex = safeMessages.findIndex(m => m.role === 'system');
  if (systemMsgIndex !== -1) {
    safeMessages[systemMsgIndex] = {
      ...safeMessages[systemMsgIndex],
      content: safeMessages[systemMsgIndex].content + SAFETY_INSTRUCTION
    };
  } else {
    // If no system prompt, add one
    safeMessages.unshift({ role: 'system', content: SAFETY_INSTRUCTION });
  }

  for (const provider of providers) {
    // Check Circuit Breaker: If this provider recently failed, skip it instantly to save time
    const timeoutUntil = providerTimeouts.get(provider.name) || 0;
    if (Date.now() < timeoutUntil) {
      console.log(`[AI] ⚡ Skipping ${provider.name} (Circuit Breaker active for ${Math.round((timeoutUntil - Date.now()) / 1000)}s)`);
      continue;
    }

    try {
      console.log(`[AI] Routing request to ${provider.name}...`);
      const result = await withTimeout(
        provider.generate(safeMessages, options),
        15000,
        provider.name
      );
      
      const safetyCheck = filterAIOutput(result);
      if (!safetyCheck.safe) {
        throw new Error('CONTENT_SAFETY: ' + (safetyCheck.reason || 'Output flagged by content filter'));
      }
      
      console.log(`[AI] ✅ Success via ${provider.name}`);
      return safetyCheck.filtered;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);
      
      // If it's a content safety error, throw it immediately (do not retry other providers)
      if (msg.startsWith('CONTENT_SAFETY:')) {
        throw new Error(msg.replace('CONTENT_SAFETY: ', ''));
      }
      
      console.warn(`[AI] ❌ ${provider.name} failed: ${msg}`);
      errors.push(`${provider.name}: ${msg}`);
      
      // Activate Circuit Breaker: Put this provider in "timeout" for 60 seconds
      // This ensures the NEXT user doesn't have to wait for this API to fail again
      providerTimeouts.set(provider.name, Date.now() + 60000);
    }
  }
  throw new Error(`All AI providers failed:\n${errors.join('\n')}`);
}

// ======= Real-Time Web Context via Tavily Search API =======
// Uses Tavily to fetch current info about a topic and synthesize a short answer.
// This gives our generators awareness of trending movies, current events, latest news, etc.
// Falls back gracefully — returns "" if Tavily is unavailable, so generation still works.

const searchContextCache = new Map<string, { text: string; exp: number }>();

export async function searchGroundedContext(topic: string): Promise<string> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.log('[Search] No Tavily API key configured, skipping web context');
    return '';
  }

  const cleanTopic = topic.trim().toLowerCase();
  const cached = searchContextCache.get(cleanTopic);
  if (cached && Date.now() < cached.exp) {
    console.log(`[Search] ⚡ Cache HIT for web context: "${topic.slice(0, 30)}..."`);
    return cached.text;
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    console.log(`[Search] Fetching web context for: "${topic}"`);
    const response = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: `What is currently known and trending about: "${topic}"? Please include specific names, cast, controversies, or facts if applicable.`,
        search_depth: 'basic',
        include_answer: true,
        max_results: 3
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
    const text = data.answer || data.results?.map((r: any) => r.content).join('\n') || '';

    const resultText = (!text || text.trim().length < 10) ? '' : text.trim();
    searchContextCache.set(cleanTopic, { text: resultText, exp: Date.now() + 5 * 60 * 1000 });

    if (resultText) console.log(`[Search] ✅ Got web context (${resultText.length} chars)`);
    return resultText;
  } catch (error) {
    clearTimeout(timeout);
    const msg = error instanceof Error ? error.message : String(error);
    console.warn(`[Search] Web context unavailable: ${msg}`);
    return '';
  }
}

// ======= Rate Limiting System =======
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const isDev = process.env.NODE_ENV === 'development';
const rateLimitTimeoutMs = isDev ? 3000 : 800;
const cacheTimeoutMs = isDev ? 2000 : 400;
let redisClient: Redis | null = null;
let redisDegradedUntil = 0;

function getRedisClient(): Redis | null {
  if (Date.now() < redisDegradedUntil) {
    return null;
  }

  if (redisClient !== null) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    return null;
  }

  try {
    redisClient = new Redis({ url, token });
    return redisClient;
  } catch (error) {
    console.error('[Redis] Failed to initialize Redis client:', error);
    return null;
  }
}

async function checkRedisRateLimit(ip: string, limit: number, windowMs: number): Promise<{ allowed: boolean; retryAfter?: number } | null> {
  try {
    const redis = getRedisClient();
    if (!redis) return null;

    const now = Date.now();
    const currentWindow = Math.floor(now / windowMs) * windowMs;
    const previousWindow = currentWindow - windowMs;

    const currentKey = `ratelimit:${ip}:${currentWindow}`;
    const previousKey = `ratelimit:${ip}:${previousWindow}`;

    // Race Redis commands with an 800ms network timeout
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Redis request timed out')), rateLimitTimeoutMs)
    );

    const fetchPromise = Promise.all([
      redis.get<number>(currentKey),
      redis.get<number>(previousKey)
    ]);

    const [currentCountRaw, previousCountRaw] = await Promise.race([fetchPromise, timeoutPromise]);
    const currentCount = currentCountRaw || 0;
    const previousCount = previousCountRaw || 0;

    const timePassedInCurrentWindow = now - currentWindow;
    const weight = (windowMs - timePassedInCurrentWindow) / windowMs;
    const estimatedRequests = Math.floor(previousCount * weight) + currentCount;

    if (estimatedRequests >= limit) {
      return { allowed: false, retryAfter: Math.ceil((currentWindow + windowMs - now) / 1000) };
    }

    // Increment current usage
    const incrPromise = redis.incr(currentKey);
    const newCount = await Promise.race([incrPromise, timeoutPromise]);

    if (newCount === 1) {
      // Fire-and-forget expire to prevent block latency
      redis.expire(currentKey, 120).catch(err => console.error('[Redis] Expire failed:', err));
    }

    return { allowed: true };
  } catch (error) {
    console.warn('[Redis] Connection failed or timed out. Falling back to local memory. Error:', error);
    const errorStr = String(error);
    if (errorStr.includes('403') || errorStr.includes('quota') || errorStr.includes('Forbidden') || errorStr.includes('ECONNREFUSED')) {
      redisDegradedUntil = Date.now() + 5 * 60 * 1000;
      console.log('[Redis] ⚠️ Redis marked as degraded for 5 minutes.');
    }
    return null;
  }
}

function checkLocalRateLimit(ip: string, limit: number, windowMs: number): { allowed: boolean; retryAfter?: number } {
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
}

export async function checkRateLimit(limit = 10, windowMs = 60 * 1000): Promise<{ allowed: boolean; retryAfter?: number }> {
  try {
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');

    const redisResult = await checkRedisRateLimit(ip, limit, windowMs);
    if (redisResult !== null) {
      return redisResult;
    }
  } catch (e) {
    console.error('Distributed rate limit error, falling back:', e);
  }

  try {
    const reqHeaders = await headers();
    const forwardedFor = reqHeaders.get('x-forwarded-for');
    const ip = forwardedFor ? forwardedFor.split(',')[0].trim() : (reqHeaders.get('x-real-ip') || '127.0.0.1');
    return checkLocalRateLimit(ip, limit, windowMs);
  } catch (e) {
    console.error('Rate limit fallback error:', e);
    return { allowed: true };
  }
}

// ======= Generic AI Tool Generation Wrapper =======
function generateCacheKey(systemPrompt: string, userPrompt: string): string {
  const hash = crypto.createHash('sha256')
    .update(systemPrompt + '||' + userPrompt)
    .digest('hex')
    .slice(0, 32);
  return `cache:gen:${hash}`;
}

export async function executeAIGeneration<T>({
  topic,
  excludeItems = [],
  systemPrompt,
  userPrompt,
  options = { temperature: 0.8, maxTokens: 800 },
  parseResponse,
  overrideWebContext,
}: {
  topic: string;
  excludeItems?: string[];
  systemPrompt: string | ((webContext: string) => string);
  userPrompt: string | ((webContext: string, excludes: string[]) => string);
  options?: { temperature: number; maxTokens: number };
  parseResponse: (text: string) => T;
  overrideWebContext?: string;
}): Promise<{ success: boolean; data?: T; error?: string }> {
  try {
    const sanitizedTopic = sanitizeInput(topic);
    if (!sanitizedTopic) {
      return { success: false, error: 'Topic cannot be empty.' };
    }

    const rateLimit = await checkRateLimit();
    if (!rateLimit.allowed) {
      return { success: false, error: `Rate limit exceeded. Please wait ${rateLimit.retryAfter} seconds.` };
    }

    const sanitizedExcludes = Array.isArray(excludeItems)
      ? excludeItems.map(t => sanitizeInput(t)).filter(Boolean)
      : [];

    const webContext = overrideWebContext !== undefined ? overrideWebContext : '';

    const finalSystemPrompt = typeof systemPrompt === 'function' ? systemPrompt(webContext) : systemPrompt;
    const finalUserPrompt = typeof userPrompt === 'function' ? userPrompt(webContext, sanitizedExcludes) : userPrompt;

    // Cache Check
    const redis = getRedisClient();
    let cacheKey = '';
    if (redis) {
      try {
        cacheKey = generateCacheKey(finalSystemPrompt, finalUserPrompt);
        const cached = await Promise.race([
          redis.get<string>(cacheKey),
          new Promise<null>((_, r) => setTimeout(() => r(new Error()), cacheTimeoutMs))
        ]);

        if (cached) {
          console.log('[Cache] ⚡ Cache HIT! Verifying content safety on cached response...');
          const safetyCheck = filterAIOutput(cached);
          if (!safetyCheck.safe) {
            console.warn('[Cache] ⚠️ Cached response failed post-safety audit. Deleting poisoned key.');
            redis.del(cacheKey).catch(() => {});
          } else {
            const parsed = parseResponse(safetyCheck.filtered);
            return { success: true, data: parsed };
          }
        }
      } catch (err) {
        console.warn('[Cache] Lookup bypassed or timed out:', err);
      }
    }

    // Cache Miss -> Live Generation
    console.log('[Cache] ❄️ Cache Miss. Executing live AI generation...');
    const responseText = await generateWithFallback([
      { role: 'system', content: finalSystemPrompt },
      { role: 'user', content: finalUserPrompt }
    ], options);

    // Save in Cache (Fire-and-forget 24-hour expiration)
    if (redis && cacheKey) {
      redis.set(cacheKey, responseText, { ex: 86400 }).catch(err => {
        console.error('[Cache] Failed to write cache entry:', err);
      });
    }

    const parsed = parseResponse(responseText);
    return { success: true, data: parsed };
  } catch (error) {
    console.error('executeAIGeneration error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'An unexpected error occurred during generation.' 
    };
  }
}

import { checkInputSafety, filterAIOutput, sanitizeOutput, SAFETY_INSTRUCTION } from '@/lib/content-safety';
export { checkInputSafety, filterAIOutput, sanitizeOutput, SAFETY_INSTRUCTION };

export function sanitizeInput(input: string, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  let trimmed = input.trim();
  if (trimmed.length > maxLength) {
    trimmed = trimmed.substring(0, maxLength);
  }
  trimmed = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');

  const safetyCheck = checkInputSafety(trimmed);
  if (!safetyCheck.safe) {
    throw new Error('CONTENT_SAFETY: ' + (safetyCheck.reason || 'Input flagged by content filter'));
  }

  return trimmed;
}

// ======= Robust JSON Parser Wrappers =======
export function safeParseJsonArray(text: string): string[] {
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

export function safeParseChannelNames(text: string) {
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
            result[cat] = items.map((i: string) => i.replace(/"/g, '').trim());
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

export function safeParseShortsIdeas(text: string) {
  try {
    const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
    const data = JSON.parse(clean);
    if (!Array.isArray(data)) return [];
    return data.map((item: any) => ({
      title: typeof item.title === 'string' ? item.title.replace(/\*/g, '').trim() : '',
      hook: typeof item.hook === 'string' ? item.hook.replace(/\*/g, '').trim() : '',
      visuals: typeof item.visuals === 'string' ? item.visuals.replace(/\*/g, '').trim() : '',
      audio: typeof item.audio === 'string' ? item.audio.replace(/\*/g, '').trim() : '',
    }));
  } catch (e) {
    console.error('Failed to parse Shorts ideas JSON:', e);
    return [];
  }
}
