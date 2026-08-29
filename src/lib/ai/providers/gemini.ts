import { type AIProvider, type ChatMessage, type GenerateOptions } from './types';

const geminiKey = (process.env.GEMINI_API_KEY || '').trim();

export const geminiProvider: AIProvider = {
  name: 'Google Gemini',
  isConfigured: Boolean(geminiKey),
  timeoutMs: 12000,
  async generate(messages: ChatMessage[], options: GenerateOptions): Promise<string> {
    if (!geminiKey) throw new Error('Gemini API key not configured');

    const promptText = messages.map((m) => `${m.role.toUpperCase()}: ${m.content}`).join('\n\n');

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${geminiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: promptText }] }],
          generationConfig: {
            temperature: options.temperature,
            maxOutputTokens: options.maxTokens,
          },
        }),
      }
    );

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
