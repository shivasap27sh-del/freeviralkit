import { Zap, Target, Shield, Users, Code2, Globe, Database, Star, type LucideIcon } from 'lucide-react';

export interface ValueCardItem {
  icon: LucideIcon;
  title: string;
  description: string;
  color: string;
  bg: string;
  border: string;
}

export interface TechStackItem {
  icon: LucideIcon;
  name: string;
  detail: string;
}

export const aboutStats = [
  { value: 'Growing', label: 'Creator Community' },
  { value: '100%', label: 'Free — No Signup Required' },
  { value: '<5s', label: 'AI Generation Speed' },
  { value: '11+', label: 'SEO Tools in One Place' },
];

export const aboutValues: ValueCardItem[] = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Sub-second AI generation powered by Groq LPUs and Cloudflare Workers AI edge network.',
    color: 'text-purple-400',
    bg: 'bg-purple-500/10',
    border: 'border-purple-500/20',
  },
  {
    icon: Target,
    title: 'Data-Driven SEO',
    description: 'Prompts tuned to YouTube algorithm ranking factors, CTR psychology, and retention curves.',
    color: 'text-pink-400',
    bg: 'bg-pink-500/10',
    border: 'border-pink-500/20',
  },
  {
    icon: Shield,
    title: '100% Free',
    description: 'No subscriptions, no hidden fees, no signup required. Just paste and optimize.',
    color: 'text-green-400',
    bg: 'bg-green-500/10',
    border: 'border-green-500/20',
  },
  {
    icon: Users,
    title: 'Built for Creators',
    description: 'Designed by a developer who deeply understands the YouTube algorithm and what it takes to grow.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
    border: 'border-cyan-500/20',
  },
];

export const aboutTechStack: TechStackItem[] = [
  { icon: Code2, name: 'Next.js 16', detail: 'App Router + SSG' },
  { icon: Globe, name: 'Groq & Cloudflare', detail: 'Edge LLM Inference' },
  { icon: Database, name: 'TypeScript', detail: 'Type-safe codebase' },
  { icon: Star, name: 'Vercel', detail: 'Edge deployment' },
];

export const aboutFaqs = [
  {
    question: 'Is FreeViralKit really 100% free?',
    answer:
      "Yes, absolutely. We don't believe in paywalling basic SEO tools. Everything from our title generator to our YouTube description builder is completely free to use without even needing to create an account. No subscriptions, no hidden fees, and no credit cards required.",
  },
  {
    question: 'How does the AI optimize for YouTube SEO?',
    answer:
      "Our backend is powered by advanced Large Language Models running on high-speed inference engines. The AI is specifically prompted with deep YouTube SEO knowledge—such as character limits, high-CTR hook patterns, keyword front-loading, and algorithm preferences—to generate content that performs exceptionally well in search and suggested feeds.",
  },
  {
    question: 'Do I need to worry about algorithmic penalties for using AI?',
    answer:
      "No. Our tools are designed to generate high-quality, human-sounding text that avoids the robotic, repetitive patterns that YouTube's spam filters penalize. By providing unique, highly relevant, and context-aware titles and descriptions, you align perfectly with YouTube's goal of serving high-quality content to viewers.",
  },
  {
    question: 'Why did you build FreeViralKit?',
    answer:
      "I noticed a frustrating trend in the creator economy: basic metadata optimization tools were locked behind expensive monthly subscriptions ($20-$50/mo). I believe understanding the YouTube algorithm shouldn't be a luxury reserved for massive channels. I built FreeViralKit to democratize access to top-tier SEO tools so independent creators can compete on a level playing field.",
  },
  {
    question: 'Are my video ideas kept private?',
    answer:
      'Yes. We do not store or sell your queries or generated outputs. The prompts are processed statelessly by our AI provider, and once the generation is complete, the data is not retained on our servers.',
  },
];
