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
