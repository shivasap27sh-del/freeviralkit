import { filterAIOutput, SAFETY_INSTRUCTION } from '@/lib/content-safety';
import { type AIProvider, type ChatMessage, type GenerateOptions } from './providers/types';
import { groqProvider } from './providers/groq';
import { geminiProvider } from './providers/gemini';
import { cloudflareProvider } from './providers/cloudflare';
import { openRouterProvider } from './providers/openrouter';

export * from './providers/types';

const log = (...args: unknown[]) => {
  if (process.env.NODE_ENV !== 'production') console.log(...args);
};

export const providers: AIProvider[] = [
  groqProvider,
  cloudflareProvider,
  geminiProvider,
  openRouterProvider,
];

function withTimeout<T>(promise: Promise<T>, ms: number, providerName: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error(`${providerName} timed out after ${ms}ms`));
    }, ms);

    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export async function generateWithFallback(
  messages: ChatMessage[],
  options: GenerateOptions = { temperature: 0.7, maxTokens: 1000 }
): Promise<string> {
  const configuredProviders = providers.filter((p) => p.isConfigured);
  if (configuredProviders.length === 0) {
    throw new Error('No AI providers configured. Please add an API key.');
  }

  const safeMessages: ChatMessage[] = messages.map((m) =>
    m.role === 'system'
      ? { ...m, content: `${m.content}\n\n${SAFETY_INSTRUCTION}` }
      : m
  );

  const errors: string[] = [];

  for (const provider of configuredProviders) {
    try {
      log(`[AI] Routing request to ${provider.name}...`);
      const rawOutput = await withTimeout(
        provider.generate(safeMessages, options),
        provider.timeoutMs,
        provider.name
      );

      const safetyResult = filterAIOutput(rawOutput);
      if (!safetyResult.safe) {
        log(`[ContentSafety] Output flagged by filter: ${safetyResult.reason}. Trying next provider...`);
        errors.push(`${provider.name}: Output flagged by content safety filter (${safetyResult.reason})`);
        continue;
      }

      return safetyResult.filtered;
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      log(`[AI] ❌ ${provider.name} failed: ${errMsg}`);
      errors.push(`${provider.name}: ${errMsg}`);
    }
  }

  throw new Error(`All AI providers failed:\n${errors.join('\n')}`);
}
