import Groq from 'groq-sdk';
import { type AIProvider, type ChatMessage, type GenerateOptions } from './types';

let globalGroqIndex = 0;

const groqApiKeys: string[] = [
  process.env.GROQ_API_KEY,
  process.env.GROQ_API_KEY_2,
].filter((k): k is string => Boolean(k));

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
  (apiKey) =>
    new Groq({
      apiKey,
      fetchOptions: { cache: 'no-store' },
    })
);

export const groqProvider: AIProvider = {
  name: 'Groq',
  isConfigured: groqClients.length > 0,
  timeoutMs: 12000,
  async generate(messages: ChatMessage[], options: GenerateOptions): Promise<string> {
    if (groqClients.length === 0) throw new Error('Groq not configured');

    const startIndex = globalGroqIndex % groqClients.length;
    globalGroqIndex++;

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

    // Hedged Request: launch backup on secondary key if primary takes > 650ms
    if (groqClients.length > 1) {
      const primaryIndex = startIndex;
      const secondaryIndex = (startIndex + 1) % groqClients.length;
      const primaryPromise = tryClient(primaryIndex);

      const hedgedPromise = new Promise<string>((resolve, reject) => {
        const timer = setTimeout(() => {
          tryClient(secondaryIndex).then(resolve).catch(reject);
        }, 650);

        primaryPromise
          .then((res) => {
            clearTimeout(timer);
            resolve(res);
          })
          .catch(() => {
            clearTimeout(timer);
            tryClient(secondaryIndex).then(resolve).catch(reject);
          });
      });

      return await Promise.race([primaryPromise, hedgedPromise]);
    }

    return await tryClient(startIndex);
  },
};
