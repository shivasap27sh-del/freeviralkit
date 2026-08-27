import Groq from 'groq-sdk';
import { filterAIOutput, SAFETY_INSTRUCTION } from '@/lib/content-safety';

/**
 * Multi-AI Provider Pool with Dynamic Fallback & Zero-Latency Key Rotation
 * Providers: Groq (Primary) -> Cerebras -> Google Gemini -> OpenRouter -> NVIDIA NIM -> Together AI
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
  timeoutMs: number;
  generate(messages: ChatMessage[], options: GenerateOptions): Promise<string>;
}

// In-memory key rotation counters for 0ms overhead
let globalGroqIndex = 0;
const providerKeyIndices = new Map<string, number>();

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
  timeoutMs: 5000, // 5s low-latency timeout
  async generate(messages, options) {
    if (groqClients.length === 0) throw new Error('Groq not configured');

    const startIndex = globalGroqIndex % groqClients.length;
    globalGroqIndex++;

    // Helper to attempt generation on a single client
    const tryClient = async (clientIndex: number): Promise<string> => {
      const client = groqClients[clientIndex];
      const models = ['qwen/qwen3.8-27b', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b'];
      let lastErr = '';
      for (const model of models) {
        try {
          const completion = await client.chat.completions.create({
            messages,
            model,
            temperature: options.temperature,
            max_completion_tokens: options.maxTokens,
          });
          const text = completion.choices[0]?.message?.content || '';
          if (text) return text;
        } catch (mErr: unknown) {
          lastErr = mErr instanceof Error ? mErr.message : String(mErr);
        }
      }
      throw new Error(lastErr || `Groq key #${clientIndex} all models failed`);
    };

    // If multiple keys exist: Use Hedged Request (speculative race if primary exceeds 650ms)
    if (groqClients.length > 1) {
      const primaryIndex = startIndex;
      const secondaryIndex = (startIndex + 1) % groqClients.length;

      const primaryPromise = tryClient(primaryIndex);

      // Hedged speculative backup launched if primary takes > 650ms
      const hedgedPromise = new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => {
          log(`[Groq] ⚡ Hedged Request triggered on Key #${secondaryIndex} (>650ms speculative race)`);
          tryClient(secondaryIndex).then(resolve).catch(reject);
        }, 650);

        primaryPromise
          .then((res) => {
            clearTimeout(timer);
            resolve(res);
          })
          .catch((err) => {
            clearTimeout(timer);
            // If primary failed immediately before 650ms, run secondary immediately
            tryClient(secondaryIndex).then(resolve).catch(reject);
          });
      });

      return await Promise.race([primaryPromise, hedgedPromise]);
    }

    return await tryClient(startIndex);
  },
};

// Helper factory for OpenAI-compatible REST API endpoints
function createOpenAICompatibleProvider(
  name: string,
  envKey: string,
  baseUrl: string,
  model: string,
  timeoutMs = 8000
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
    timeoutMs,
    async generate(messages, options) {
      if (apiKeys.length === 0) throw new Error(`${name} not configured`);

      const currentIndexRaw = providerKeyIndices.get(name) || 0;
      const startIndex = currentIndexRaw % apiKeys.length;
      providerKeyIndices.set(name, startIndex + 1);

      const errors: string[] = [];
      for (let i = 0; i < apiKeys.length; i++) {
        const currentIndex = (startIndex + i) % apiKeys.length;
        const apiKey = apiKeys[currentIndex];

        try {
          log(`[${name}] Attempting generation with key index #${currentIndex}...`);
          const controller = new AbortController();
          const timeout = setTimeout(() => controller.abort(), timeoutMs - 500);

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
            signal: controller.signal,
            cache: 'no-store',
          });

          clearTimeout(timeout);

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
        }
      }

      throw new Error(`All ${name} keys failed:\n${errors.join('\n')}`);
    },
  };
}

// Native Google Gemini Provider
const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiProvider: AIProvider = {
  name: 'Google Gemini',
  isConfigured: !!geminiApiKey,
  timeoutMs: 12000,
  async generate(messages, options) {
    if (!geminiApiKey) throw new Error('Google Gemini not configured');

    const contents = messages.map((m) => ({
      role: m.role === 'system' ? 'user' : m.role,
      parts: [{ text: m.content }],
    }));

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 11500);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiApiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            maxOutputTokens: options.maxTokens,
            temperature: options.temperature,
          },
        }),
        signal: controller.signal,
        cache: 'no-store',
      }
    );

    clearTimeout(timeout);

    if (!response.ok) {
      const errText = await response.text().catch(() => response.statusText);
      throw new Error(`Gemini API error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) throw new Error('Gemini returned empty response');
    return content;
  },
};

const cfAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').replace(/['"]/g, '').trim();
const cfApiToken = (process.env.CLOUDFLARE_API_TOKEN || '').replace(/['"]/g, '').trim();

const cloudflareProvider: AIProvider = {
  name: 'Cloudflare Workers AI',
  isConfigured: Boolean(cfAccountId && cfApiToken),
  timeoutMs: 6000,
  async generate(messages, options) {
    if (!cfAccountId || !cfApiToken) throw new Error('Cloudflare Workers AI not configured');

    const models = [
      '@cf/openai/gpt-oss-20b',
      '@cf/meta/llama-3.2-1b-instruct',
      '@cf/zai-org/glm-4.7-flash',
      '@cf/meta/llama-3.2-3b-instruct',
      '@cf/deepseek-ai/deepseek-r1-distill-qwen-32b',
    ];

    let lastErr = '';
    for (const model of models) {
      try {
        const response = await fetch(
          `https://api.cloudflare.com/client/v4/accounts/${cfAccountId}/ai/v1/chat/completions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${cfApiToken}`,
            },
            body: JSON.stringify({
              model,
              messages,
              max_tokens: options.maxTokens,
              temperature: options.temperature,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          let content = data.choices?.[0]?.message?.content || '';
          if (content.includes('</think>')) {
            content = content.split('</think>')[1].trim();
          }
          if (content) return content;
        } else {
          lastErr = await response.text();
        }
      } catch (err: unknown) {
        lastErr = err instanceof Error ? err.message : String(err);
      }
    }
    throw new Error(`Cloudflare all models failed: ${lastErr}`);
  },
};

const cerebrasProvider = createOpenAICompatibleProvider(
  'Cerebras',
  'CEREBRAS_API_KEY',
  'https://api.cerebras.ai/v1/chat/completions',
  'gemma-4-31b',
  8000
);

const openRouterProvider = createOpenAICompatibleProvider(
  'OpenRouter',
  'OPENROUTER_API_KEY',
  'https://openrouter.ai/api/v1/chat/completions',
  'meta-llama/llama-3.3-70b-instruct:free',
  10000
);

const nvidiaProvider = createOpenAICompatibleProvider(
  'NVIDIA NIM',
  'NVIDIA_API_KEY',
  'https://integrate.api.nvidia.com/v1/chat/completions',
  'nvidia/nemotron-3-super-120b-a12b',
  10000
);

const togetherProvider = createOpenAICompatibleProvider(
  'Together AI',
  'TOGETHER_API_KEY',
  'https://api.together.xyz/v1/chat/completions',
  'meta-llama/Llama-3.3-70B-Instruct-Turbo',
  8000
);

export const providers: AIProvider[] = [
  groqProvider,         // 1. Groq LPUs (qwen/qwen3.8-27b @ 600ms with Hedged Race)
  geminiProvider,       // 2. Google Gemini 3.6 Flash (~800ms)
  cloudflareProvider,   // 3. Cloudflare Global Edge (10,000 Free Req/Day @ 624ms)
  openRouterProvider,   // 4. OpenRouter Free Pool
  cerebrasProvider,     // 5. Cerebras
  togetherProvider,     // 6. Together AI
  nvidiaProvider,       // 7. NVIDIA NIM
].filter((p) => p.isConfigured);

function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error(`${providerName} timed out after ${ms}ms`)), ms)
    ),
  ]);
}

import { circuitBreaker } from './circuitBreaker';

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
    // Check Circuit Breaker State (CLOSED -> healthy; OPEN -> skip; HALF_OPEN -> test probe)
    if (!circuitBreaker.canExecute(provider.name)) {
      const cooldownSecs = circuitBreaker.getRemainingCooldown(provider.name);
      log(`[AI] ⚡ Skipping ${provider.name} (Circuit Breaker OPEN - Cooldown: ${cooldownSecs}s)`);
      continue;
    }

    try {
      log(`[AI] Routing request to ${provider.name}...`);
      const result = await withTimeout(
        provider.generate(safeMessages, options),
        provider.timeoutMs || 8000,
        provider.name
      );

      const safetyCheck = filterAIOutput(result);
      if (!safetyCheck.safe) {
        throw new Error('CONTENT_SAFETY: ' + (safetyCheck.reason || 'Output flagged by content filter'));
      }

      // Record success in Circuit Breaker
      circuitBreaker.recordSuccess(provider.name);
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

      // Record failure in Circuit Breaker (Trips to OPEN if threshold reached)
      circuitBreaker.recordFailure(provider.name, error);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join('\n')}`);
}
