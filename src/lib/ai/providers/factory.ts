import { type AIProvider, type ChatMessage, type GenerateOptions } from './types';

const providerKeyIndices = new Map<string, number>();

export function createOpenAICompatibleProvider(
  name: string,
  envKeyName: string,
  endpoint: string,
  defaultModel: string,
  timeoutMs = 12000
): AIProvider {
  const envVal = process.env[envKeyName];
  const keys: string[] = envVal
    ? envVal.split(',').map((k) => k.trim()).filter(Boolean)
    : [];

  return {
    name,
    isConfigured: keys.length > 0,
    timeoutMs,
    async generate(messages: ChatMessage[], options: GenerateOptions): Promise<string> {
      if (keys.length === 0) throw new Error(`${name} not configured`);

      const currentIndex = providerKeyIndices.get(name) || 0;
      const key = keys[currentIndex % keys.length];
      providerKeyIndices.set(name, (currentIndex + 1) % keys.length);

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: defaultModel,
          messages,
          temperature: options.temperature,
          max_tokens: options.maxTokens,
        }),
      });

      if (!response.ok) {
        const errText = await response.text().catch(() => response.statusText);
        throw new Error(`API error ${response.status}: ${errText}`);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (!content) throw new Error(`${name} returned empty response`);
      return content;
    },
  };
}
