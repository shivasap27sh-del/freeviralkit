import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import NicheStudioLayout, { type NicheFramework, type NicheCaseStudy, type NicheFAQ } from '@/components/tools/niche/NicheStudioLayout';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for AI Tools & Tech Creators | FreeViralKit',
    description: 'Free AI YouTube Title Generator for AI agents, developer tools, coding tutorials, and tech reviews. Generate high-CTR titles with live CTR analysis.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for AI Tools & Tech Channels | FreeViralKit',
  description:
    'Free AI YouTube Title Generator for AI & Tech Creators. Create high-CTR, zero-fluff video titles for LLMs, agentic workflows, Cursor/coding tutorials, and software reviews.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-ai-and-tech'),
  },
  openGraph: {
    title: 'YouTube Title Generator for AI Tools & Tech Channels',
    description:
      'Engineered for AI researchers, software engineers, and tech reviewers. Generate high-CTR titles designed for modern high-velocity tech audiences.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-ai-and-tech'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit YouTube Title Generator for AI & Tech',
      },
    ],
  },
  keywords: [
    'youtube title generator for ai',
    'ai tech youtube video titles',
    'developer youtube title ideas',
    'coding tutorial youtube titles',
    'ai agent video title generator',
    'software review youtube titles',
    'tech channel title generator',
    'ai tool title ideas',
  ],
};

const aiFrameworks: NicheFramework[] = [
  {
    archetype: 'The Autonomous Agent Speed Run',
    strategy: 'Demonstrates a concrete capability built in an astonishingly short timeframe with zero fluff.',
    formula: 'I Built an Autonomous AI [Tool/Agent] in [Timeframe] (No Code / Full Code)',
    example: 'I Built an Autonomous AI Agent in 10 Minutes (No Code)',
    badge: 'High Organic Browse',
  },
  {
    archetype: 'The Head-to-Head Benchmark Gauntlet',
    strategy: 'Pits two hyped competing models or tools against a brutal real-world stress test.',
    formula: '[Tool A] vs [Tool B]: The Brutal [Metric/Task] Benchmark Test',
    example: 'Cursor AI vs Windsurf: The Brutal Coding Benchmark Test',
    badge: 'Surging Search Demand',
  },
  {
    archetype: 'The Asymmetric Developer Leverage',
    strategy: 'Shows how a solo engineer or creator leveraged AI automation to replace an entire agency or build a SaaS.',
    formula: 'How 1 Solo Developer Built a $[Revenue]/mo App in [Timeframe] Using AI',
    example: 'How 1 Developer Built a $20k/mo App Using AI in 48 Hours',
    badge: 'High Viral Sharing',
  },
  {
    archetype: 'The Future Career Shift & Reality Check',
    strategy: 'Explores how automated workflows and new model architectures are restructuring software engineering.',
    formula: 'Why [AI Breakthrough] Changes [Industry/Skill] Forever (What to Do)',
    example: 'Why Agentic AI Changes Software Engineering Forever in 2026',
    badge: 'High Discussion',
  },
];

const caseStudies: NicheCaseStudy[] = [
  {
    creator: 'Fireship',
    focus: '100-Second Code Explanations',
    tactics: 'Uses ultra-dense pacing, meme culture, active engineering verbs, and concise tech vocabulary to capture high developer retention.',
  },
  {
    creator: 'Matt Wolfe',
    focus: 'AI Tools & Productivity News',
    tactics: 'Tests 5-10 tools per video, categorizes breakthrough releases, and leads with practical workflow integration rather than theoretical hype.',
  },
  {
    creator: 'NetworkChuck',
    focus: 'Hands-On Tech Projects',
    tactics: 'Commands immediate curiosity with dramatic high-energy hooks ("You NEED to learn this NOW") paired with step-by-step terminal demos.',
  },
];

const faqs: NicheFAQ[] = [
  {
    question: 'Why are specific tool names critical in AI video titles?',
    answer:
      'Tech and developer audiences search for specific model names (e.g., "DeepSeek R1", "Claude 3.7", "Cursor AI", "OpenAI o3"). Front-loading the exact model name within the first 3 words dramatically increases search rankings on both YouTube and Google Search.',
  },
  {
    question: 'How do I avoid AI hype fatigue in my tech titles?',
    answer:
      'Avoid vague buzzwords like "Game Changer" or "This Changes Everything". Instead, use concrete metrics ("Built in 10 Minutes", "Tested on 100 Repos", "Zero Code") and specific technical constraints to establish instant credibility.',
  },
  {
    question: 'What is the optimal character length for tech YouTube titles?',
    answer:
      'Between 45 and 65 characters. Over 65% of tech audiences view content on mobile devices while commuting or browsing, making mobile truncation prevention critical.',
  },
  {
    question: 'Can I generate titles for coding tutorials and developer tools?',
    answer:
      'Yes! FreeViralKit’s AI & Tech engine covers full-stack web development, Python automation, agentic workflows, machine learning models, and developer tooling comparisons.',
  },
];

export default function AITitleGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Title Generator for AI Tools & Tech Creators',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'Free AI YouTube Title Generator for AI & Tech Creators. Create high-CTR, zero-fluff video titles for LLMs, agentic workflows, Cursor/coding tutorials, and software reviews.',
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <NicheStudioLayout
        badgeText="⚡ AI & Tech Creator Studio (2026 Trend)"
        badgeColorClass="text-cyan-400 bg-cyan-500/10 border border-cyan-500/20"
        titlePrefix="YouTube Title Generator for"
        titleHighlight="AI & Tech Channels"
        description="Engineer high-density, zero-fluff titles for AI agent workflows, software benchmarks, coding tutorials, and developer tool reviews."
        niche="ai-and-tech"
        currentToolPath="/tools/youtube-title-generator-for-ai-and-tech"
        frameworksTitle="The 4 High-Velocity Packaging Frameworks for Tech Creators"
        frameworksSubtitle="How leading tech and AI essayists cut through algorithm noise and command massive developer attention."
        frameworks={aiFrameworks}
        caseStudiesTitle="Case Studies: How Elite Tech Creators Package Videos"
        caseStudies={caseStudies}
        faqs={faqs}
      />
    </>
  );
}
