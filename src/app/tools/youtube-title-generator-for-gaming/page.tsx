import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Gaming',
  description:
    'Free AI-powered YouTube title generator for gaming channels. Create click-worthy titles for gameplay walkthroughs, reviews, Minecraft, GTA, Fortnite, and challenge videos. Boost CTR and views instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-gaming'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Gaming',
    description:
      'Generate gaming YouTube titles that improve CTR and discoverability. Free AI tool for gaming creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-gaming'),
  },
  keywords: [
    'youtube title generator gaming',
    'gaming youtube title ideas',
    'gaming video title generator',
    'minecraft title generator',
    'fortnite title ideas',
    'gta title generator',
    'gaming seo',
    'youtube gaming titles',
  ],
};

const examplesByCategory = [
  {
    category: 'Survival & Challenge',
    examples: [
      'I Survived 100 Days in Hardcore Minecraft (No Mods)',
      'Can I Beat GTA 5 Without Getting Hit ONCE?',
      'I Played the Hardest Roblox Obby Ever Made',
    ],
  },
  {
    category: 'Tips & Tutorials',
    examples: [
      'BGMI Sensitivity Settings That Instantly Improve Aim',
      '5 Valorant Tips I Wish I Knew as a Beginner',
      'How to Build Like a Pro in Fortnite (Step-by-Step)',
    ],
  },
  {
    category: 'Rankings & Reviews',
    examples: [
      'I Tried Every Weapon in GTA 5 — Here Is the Best One',
      'Top 10 Hidden Tricks in Roblox You Missed',
      'Ranking Every Minecraft Biome from Worst to Best',
    ],
  },
  {
    category: 'Let\'s Plays & Series',
    examples: [
      'Starting a New Minecraft Survival World — Day 1',
      'My First Time Playing Elden Ring (This Game Is BRUTAL)',
    ],
  },
];

const tips = [
  {
    title: 'Put the game name first',
    description:
      'Start your title with the game name so YouTube immediately categorizes your video. Viewers scanning search results recognize the game instantly.',
  },
  {
    title: 'Use specific hooks',
    description:
      'Mention the challenge type, update version, rank tier, or time constraint. "I Survived 100 Days" is far more clickable than "Playing Minecraft".',
  },
  {
    title: 'Keep it under 60-70 characters',
    description:
      'Titles longer than 70 characters get cut off on mobile. Aim for 50-65 characters to keep the full title visible in search results and recommendations.',
  },
  {
    title: 'Add numbers when possible',
    description:
      'Titles with numbers get 36% more clicks on average. "Top 10", "5 Tips", "100 Days" — numbers create clear expectations and draw the eye.',
  },
  {
    title: 'Create an information gap',
    description:
      'Phrases like "What Happened Next Shocked Me" or "You Won\'t Believe This" create curiosity. But always deliver on the promise — misleading clickbait kills watch time.',
  },
  {
    title: 'Match trending search terms',
    description:
      'When a new season, update, or DLC drops, use those keywords immediately. Fresh search terms have high volume and low competition.',
  },
];

const faqs = [
  {
    question: 'How do I title a Let\'s Play video without being boring?',
    answer:
      'Instead of generic titles like "Minecraft Survival Part 4", use the title to highlight the most exciting moment or challenge from that specific episode. For example, "I Survived 100 Days in Hardcore Minecraft" or "The Creepers Destroyed My Entire Base".',
  },
  {
    question: 'Should I put the game name at the start or end of the title?',
    answer:
      'If you are a smaller channel relying on search traffic, putting the game name closer to the beginning can help with YouTube SEO. However, if you are focusing on Browse features and CTR, put your emotional hook first and the game name at the end (e.g., "I Built an IMPOSSIBLE Rollercoaster - Planet Coaster").',
  },
  {
    question: 'Are clickbait titles acceptable in the gaming niche?',
    answer:
      'Clickbait that lies to the viewer will ruin your Audience Retention and kill your channel. However, "Click-worthy" titles that exaggerate a real event in the game (e.g., "This Boss Fight Broke My Controller") are highly encouraged in the gaming community.',
  },
  {
    question: 'How do I title a gaming tutorial or walkthrough?',
    answer:
      'For tutorials, be extremely specific and use exact match keywords. Include the game version or year if relevant. For example, "How to Defeat Malenia in Elden Ring (Patch 1.09) - Easy Method" is much better than "Elden Ring Boss Guide".',
  },
  {
    question: 'Do all caps titles perform better for gaming videos?',
    answer:
      'Using all caps for ONE or TWO emphasis words works incredibly well in gaming (e.g., "I Found the MOST RARE Item in Skyrim"). However, typing the entire title in all caps looks spammy and can actually reduce your click-through rate.',
  },
];

const pageJsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
    {
      '@type': 'WebApplication',
      name: 'YouTube Title Generator for Gaming — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-gaming',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator specifically designed for gaming channels. Generate optimized titles for gameplay, walkthroughs, reviews, and challenge videos.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function GamingTitleLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd).replace(/</g, '\\u003c') }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            YouTube Title Generator for <span className="text-gradient">Gaming</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate high-CTR gaming titles for walkthroughs, shorts, ranked gameplay, tutorials, and challenge videos. Powered by AI, built for gamers.
          </p>
          <div className="text-left mt-8">
            <TitleGeneratorClient niche="gaming" />
          </div>
        </section>

        {/* Why gaming titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Gaming Title Makes or Breaks Your Video
          </h2>
          <p className="text-slate-600 mb-4">
            Gaming is the largest category on YouTube by watch time, and also the most competitive. Millions of gaming videos go up every single day. The difference between 50 views and 50,000 often comes down to one thing: the title.
          </p>
          <p className="text-slate-600 mb-4">
            Your title is the first thing viewers see in search results and the recommended feed. A vague title like &ldquo;Gaming Video #12&rdquo; tells the viewer nothing. But &ldquo;I Survived 100 Days in Hardcore Minecraft (No Mods)&rdquo; immediately tells them the game, the challenge, and the stakes.
          </p>
          <p className="text-slate-600">
            Great gaming titles combine <strong className="text-slate-900">the game name</strong>, a <strong className="text-slate-900">specific hook</strong>, and <strong className="text-slate-900">curiosity</strong>. That&apos;s exactly what our AI generates for you.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Titles</h2>
            <ul className="space-y-2 text-slate-700">
              {cat.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  {example}
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Best practices */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            6 Best Practices for Gaming SEO Titles
          </h2>
          <div className="space-y-5">
            {tips.map((tip, i) => (
              <div key={tip.title}>
                <h3 className="font-semibold text-slate-900 mb-1">
                  {i + 1}. {tip.title}
                </h3>
                <p className="text-slate-600 text-sm">{tip.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            How Our Gaming Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your gaming topic</strong> — describe your gameplay, challenge, or tutorial.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to gaming.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Copy and use</strong> — paste your favorite title directly into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-title-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Title Generator
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-5">
            {faqs.map((faq) => (
              <div key={faq.question}>
                <h3 className="font-semibold text-slate-900 mb-1">{faq.question}</h3>
                <p className="text-slate-600 text-sm">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-links */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Explore More YouTube SEO Tools
          </h2>
          <div className="space-y-3">
            <Link
              href="/tools/youtube-title-generator-for-vlogs"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎬 Title Generator for Vlogs</span>
              <p className="text-slate-600 text-sm mt-1">Create relatable vlog titles for daily routines, travel, and lifestyle content.</p>
            </Link>
            <Link
              href="/tools/youtube-description-generator-for-education"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📚 Description Generator for Education</span>
              <p className="text-slate-600 text-sm mt-1">Write structured educational descriptions with learning outcomes and CTAs.</p>
            </Link>
            <Link
              href="/youtube-tags-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🏷️ YouTube Tags Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate optimized tags for your gaming videos to boost discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About Gaming SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/best-youtube-tags-for-gaming"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Gaming</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                Best YouTube Tags for Gaming Videos in 2026
              </h3>
            </Link>
            <Link
              href="/blog/youtube-titles-that-get-clicks"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Titles</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Write YouTube Titles That Actually Get Clicks
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
