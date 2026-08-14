import Groq from 'groq-sdk';
import { getRedisClient } from './rateLimiter';
import { filterAIOutput, SAFETY_INSTRUCTION } from '@/lib/content-safety';

/**
 * Multi-AI Provider Pool with Dynamic Fallback & Circuit Breaker
 * Providers: Groq (Primary) -> NVIDIA NIM -> OpenRouter -> Google Gemini -> Cerebras -> Together AI
 */

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

export interface ChatMessage {
  role: 'system' | 'user';
  content: string;
}

export interface GenerateOptions {
  temperature: number;
  maxTokens: number;
}

export interface AIProvider {
  name: string;
  isConfigured: boolean;
  generate(messages: ChatMessage[], options: GenerateOptions): Promise<string>;
}

// --- Provider 1: Groq (Primary - Ultra-Fast Llama-3.3 70B) ---
const groqApiKeys: string[] = [];
if (process.env.GROQ_API_KEY) groqApiKeys.push(process.env.GROQ_API_KEY);
if (process.env.GROQ_API_KEY_2) groqApiKeys.push(process.env.GROQ_API_KEY_2);

// Auto-discover extra keys if defined in environment
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('GROQ_API_KEY_') && key !== 'GROQ_API_KEY_2') {
    const val = process.env[key];
    if (val && !groqApiKeys.includes(val)) {
      groqApiKeys.push(val);
    }
  }
});

const groqClients = groqApiKeys.map(
  (key) =>
    new Groq({
      apiKey: key,
      fetchOptions: { cache: 'no-store' },
    })
);

const groqProvider: AIProvider = {
  name: 'Groq',
  isConfigured: groqClients.length > 0,
  async generate(messages, options) {
    if (groqClients.length === 0) throw new Error('Groq not configured');

    let startIndex = 0;
    try {
      const redis = getRedisClient();
      if (redis) {
        const rawIndex = await Promise.race([
          redis.incr('global:groq_index'),
          new Promise<number>((_, r) => setTimeout(() => r(new Error()), 400)),
        ]);
        startIndex = rawIndex % groqClients.length;
      } else {
        startIndex = Math.floor(Math.random() * groqClients.length);
      }
    } catch {
      startIndex = Math.floor(Math.random() * groqClients.length);
    }

    const errors: string[] = [];
    for (let i = 0; i < groqClients.length; i++) {
      const currentIndex = (startIndex + i) % groqClients.length;
      const client = groqClients[currentIndex];

      // Check if key is temporarily rate-limited in Redis
      try {
        const redis = getRedisClient();
        if (redis) {
          const isBlocked = await Promise.race([
            redis.get(`groq:blocked:${currentIndex}`),
            new Promise<null>((_, r) => setTimeout(() => r(new Error()), 400)),
          ]);
          if (isBlocked) {
            log(`[Groq] Key #${currentIndex} is currently blocked, skipping.`);
            continue;
          }
        }
      } catch {
        // Bypass blocked check on Redis timeout
      }

      try {
        log(`[Groq] Attempting generation with key index #${currentIndex}...`);
        const completion = await client.chat.completions.create({
          messages,
          model: 'llama-3.3-70b-versatile',
          temperature: options.temperature,
          max_completion_tokens: options.maxTokens,
        });
        return completion.choices[0]?.message?.content || '';
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : String(error);
        console.warn(`[Groq] Key #${currentIndex} failed: ${msg}`);
        errors.push(`Key #${currentIndex}: ${msg}`);

        // If rate limit (429), block this specific key for 30s in Redis
        if (
          msg.includes('429') ||
          msg.toLowerCase().includes('rate limit') ||
          (error as { status?: number })?.status === 429
        ) {
          try {
            const redis = getRedisClient();
            if (redis) {
              await redis.set(`groq:blocked:${currentIndex}`, '1', { ex: 30 });
              log(`[Groq] 🚫 Blocked Key #${currentIndex} in Redis for 30 seconds.`);
            }
          } catch {
            // Ignore Redis errors
          }
        }
      }
    }

    throw new Error(`All Groq keys failed:\n${errors.join('\n')}`);
  },
};

// Helper factory for OpenAI-compatible REST API endpoints
function createOpenAICompatibleProvider(
  name: string,
  envKey: string,
  baseUrl: string,
  model: string
): AIProvider {
  const apiKeys: string[] = [];
  const baseKeyVal = process.env[envKey];
  if (baseKeyVal) apiKeys.push(baseKeyVal);

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
            new Promise<number>((_, r) => setTimeout(() => r(new Error()), 400)),
          ]);
          startIndex = rawIndex % apiKeys.length;
        } else {
          startIndex = Math.floor(Math.random() * apiKeys.length);
        }
      } catch {
        startIndex = Math.floor(Math.random() * apiKeys.length);
      }

      const errors: string[] = [];
      for (let i = 0; i < apiKeys.length; i++) {
        const currentIndex = (startIndex + i) % apiKeys.length;
        const apiKey = apiKeys[currentIndex];

        // Check if key is blocked in Redis
        try {
          const redis = getRedisClient();
          if (redis) {
            const isBlocked = await Promise.race([
              redis.get(`blocked:${cleanName}:${currentIndex}`),
              new Promise<null>((_, r) => setTimeout(() => r(new Error()), 400)),
            ]);
            if (isBlocked) {
              log(`[${name}] Key #${currentIndex} is blocked, skipping.`);
              continue;
            }
          }
        } catch {
          // Bypass blocked check on connection error
        }

        try {
          log(`[${name}] Attempting generation with key index #${currentIndex}...`);
          const response = await fetch(baseUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
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
          if (!content) throw new Error('Returned empty response');
          return content;
        } catch (error: unknown) {
          const msg = error instanceof Error ? error.message : String(error);
          console.warn(`[${name}] Key #${currentIndex} failed: ${msg}`);
          errors.push(`Key #${currentIndex}: ${msg}`);

          if (
            msg.includes('429') ||
            msg.toLowerCase().includes('rate limit') ||
            (error instanceof Object && 'status' in error && (error as { status: number }).status === 429)
          ) {
            try {
              const redis = getRedisClient();
              if (redis) {
                await redis.set(`blocked:${cleanName}:${currentIndex}`, '1', { ex: 30 });
                log(`[${name}] 🚫 Blocked Key #${currentIndex} in Redis for 30 seconds.`);
              }
            } catch {
              // Ignore Redis errors
            }
          }
        }
      }

      throw new Error(`All ${name} keys failed:\n${errors.join('\n')}`);
    },
  };
}

// Fallback Provider instances
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

export const providers: AIProvider[] = [
  groqProvider,
  nvidiaProvider,
  openRouterProvider,
  geminiProvider,
  cerebrasProvider,
  togetherProvider,
].filter((p) => p.isConfigured);

function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${providerName} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

// Circuit Breaker tracker: Timestamp (ms) until a failing provider can be retried
const providerTimeouts = new Map<string, number>();

export async function generateWithFallback(
  messages: ChatMessage[],
  options: GenerateOptions
): Promise<string> {
  const errors: string[] = [];

  // Inject content safety instruction
  const safeMessages = [...messages];
  const systemMsgIndex = safeMessages.findIndex((m) => m.role === 'system');
  if (systemMsgIndex !== -1) {
    safeMessages[systemMsgIndex] = {
      ...safeMessages[systemMsgIndex],
      content: safeMessages[systemMsgIndex].content + SAFETY_INSTRUCTION,
    };
  } else {
    safeMessages.unshift({ role: 'system', content: SAFETY_INSTRUCTION });
  }

  for (const provider of providers) {
    // Check Circuit Breaker
    const timeoutUntil = providerTimeouts.get(provider.name) || 0;
    if (Date.now() < timeoutUntil) {
      log(
        `[AI] ⚡ Skipping ${provider.name} (Circuit Breaker active for ${Math.round(
          (timeoutUntil - Date.now()) / 1000
        )}s)`
      );
      continue;
    }

    try {
      log(`[AI] Routing request to ${provider.name}...`);
      const result = await withTimeout(provider.generate(safeMessages, options), 15000, provider.name);

      const safetyCheck = filterAIOutput(result);
      if (!safetyCheck.safe) {
        throw new Error('CONTENT_SAFETY: ' + (safetyCheck.reason || 'Output flagged by content filter'));
      }

      log(`[AI] ✅ Success via ${provider.name}`);
      return safetyCheck.filtered;
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error);

      // Halt on content safety violations without retrying other providers
      if (msg.startsWith('CONTENT_SAFETY:')) {
        throw new Error(msg.replace('CONTENT_SAFETY: ', ''));
      }

      console.warn(`[AI] ❌ ${provider.name} failed: ${msg}`);
      errors.push(`${provider.name}: ${msg}`);

      // Activate Circuit Breaker: 60s cooldown for failing provider
      providerTimeouts.set(provider.name, Date.now() + 60000);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join('\n')}`);
}
