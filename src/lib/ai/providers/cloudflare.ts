import { type AIProvider, type ChatMessage, type GenerateOptions } from './types';

const cfAccountId = (process.env.CLOUDFLARE_ACCOUNT_ID || '').replace(/['"]/g, '').trim();
const cfApiToken = (process.env.CLOUDFLARE_API_TOKEN || '').replace(/['"]/g, '').trim();

export const cloudflareProvider: AIProvider = {
  name: 'Cloudflare Workers AI',
  isConfigured: Boolean(cfAccountId && cfApiToken),
  timeoutMs: 12000,
  async generate(messages: ChatMessage[], options: GenerateOptions): Promise<string> {
    if (!cfAccountId || !cfApiToken) throw new Error('Cloudflare Workers AI not configured');

    const models = [
      '@cf/meta/llama-3.2-3b-instruct',
      '@cf/meta/llama-3.2-1b-instruct',
      '@cf/openai/gpt-oss-20b',
      '@cf/zai-org/glm-4.7-flash',
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
          const choice = data.choices?.[0]?.message;
          let content = choice?.content || choice?.reasoning_content || choice?.reasoning || '';
          if (content.includes('</think>')) {
            content = content.split('</think>')[1].trim();
          }
          if (content.trim()) return content.trim();
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
