import { type AIProvider, type ChatMessage, type GenerateOptions } from './types';

let globalOpenRouterIndex = 0;

const openRouterKeys: string[] = [
  process.env.OPENROUTER_API_KEY,
  process.env.OPENROUTER_API_KEY_2,
].filter((k): k is string => Boolean(k?.trim()));

// Auto-discover extra keys if defined in environment
Object.keys(process.env).forEach((key) => {
  if (key.startsWith('OPENROUTER_API_KEY_') && key !== 'OPENROUTER_API_KEY_2') {
    const val = process.env[key]?.trim();
    if (val && !openRouterKeys.includes(val)) {
      openRouterKeys.push(val);
    }
  }
});

// Dynamic priority cascade of free/resilient models.
// If any model is deprecated or busy (404, 429, 503), the provider cascades automatically.
const fallbackModels: string[] = [
  ...(process.env.OPENROUTER_MODEL ? [process.env.OPENROUTER_MODEL.trim()] : []),
  'inclusionai/ling-3.0-flash-fin:free',
  'nvidia/nemotron-3.5-lightning:free',
  'dots-studio/dots-3-note-preview:free',
  'liquid/lfm-2.5-2.6b:free',
  'meta-llama/llama-3.2-3b-instruct:free',
  'mistralai/mistral-7b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
];

export const openRouterProvider: AIProvider = {
  name: 'OpenRouter',
  isConfigured: openRouterKeys.length > 0,
  timeoutMs: 12000,
  async generate(messages: ChatMessage[], options: GenerateOptions): Promise<string> {
    if (openRouterKeys.length === 0) throw new Error('OpenRouter not configured');

    const apiKey = openRouterKeys[globalOpenRouterIndex % openRouterKeys.length];
    globalOpenRouterIndex++;

    let lastErr = '';

    for (const model of fallbackModels) {
      try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://freeviralkit.com',
            'X-Title': 'FreeViralKit YouTube SEO',
          },
          body: JSON.stringify({
            model,
            messages,
            temperature: options.temperature,
            max_tokens: options.maxTokens,
          }),
        });

        if (!response.ok) {
          const errText = await response.text().catch(() => response.statusText);
          lastErr = `Model ${model} failed (${response.status}): ${errText}`;
          continue;
        }

        const data = await response.json();
        const choice = data.choices?.[0]?.message;
        let content = choice?.content || choice?.reasoning || choice?.reasoning_content || '';

        if (content.includes('</think>')) {
          content = content.split('</think>')[1].trim();
        }

        if (content.trim()) {
          return content.trim();
        }

        lastErr = `Model ${model} returned empty content`;
      } catch (err: unknown) {
        lastErr = err instanceof Error ? err.message : String(err);
      }
    }

    throw new Error(`OpenRouter all fallback models failed: ${lastErr}`);
  },
};
