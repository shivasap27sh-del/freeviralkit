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

// Helper: OpenAI-compatible fetch
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
  'gpt-oss-120b'
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
  geminiProvider,
  nvidiaProvider,
  cerebrasProvider,
  togetherProvider,
  openRouterProvider,
].filter(p => p.isConfigured);

function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${providerName} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

export async function generateWithFallback(
  messages: ChatMessage[],
  options: GenerateOptions
): Promise<string> {
  const errors: string[] = [];
  
  // Load Balancing: Randomly shuffle the active providers for each request
  const shuffledProviders = [...providers].sort(() => Math.random() - 0.5);

  for (const provider of shuffledProviders) {
    try {
      console.log(`[AI LoadBalancer] Routing request to ${provider.name}...`);
      const result = await withTimeout(
        provider.generate(messages, options),
        15000,
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

export async function checkRateLimit(limit = 10, windowMs = 60 * 1000): Promise<{ allowed: boolean; retryAfter?: number }> {
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
export function sanitizeInput(input: string, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  let trimmed = input.trim();
  if (trimmed.length > maxLength) {
    trimmed = trimmed.substring(0, maxLength);
  }
  trimmed = trimmed.replace(/[\u0000-\u001F\u007F-\u009F]/g, '');
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
    return Array.isArray(data) ? data : [];
  } catch (e) {
    console.error('Failed to parse Shorts ideas JSON:', e);
    return [];
  }
}
