import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import ChannelNameGeneratorClient from '@/components/tools/ChannelNameGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Channel Name Generator for Gaming',
  description:
    'Free AI-powered gaming channel name generator. Get unique, brandable name ideas for your gaming YouTube channel — clan-style, streamer names, funny gamer tags, and more.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-channel-name-generator-for-gaming'),
  },
  openGraph: {
    title: 'YouTube Channel Name Generator for Gaming',
    description:
      'Generate unique gaming YouTube channel names instantly. Clan-style, streamer, brand, and funny name ideas — all free.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-channel-name-generator-for-gaming'),
  },
  keywords: [
    'gaming channel name',
    'gaming youtube name ideas',
    'gamer name generator',
    'gaming channel name generator',
    'youtube gaming name ideas',
    'cool gaming names',
    'streamer name generator',
    'clan name generator',
  ],
};

const examplesByCategory = [
  {
    category: 'Clan-Style Names',
    examples: [
      'ShadowVortex Gaming',
      'NightRaid Studios',
      'PhantomSquad TV',
    ],
  },
  {
    category: 'Streamer-Style Names',
    examples: [
      'PixelPete Plays',
      'ChillGamerKai',
      'NoobToProNate',
    ],
  },
  {
    category: 'Brand-Style Names',
    examples: [
      'LevelUp Lounge',
      'GameForge Media',
      'ControllerCraft',
    ],
  },
  {
    category: 'Funny & Casual Names',
    examples: [
      'PotatoAimGaming',
      'RespawnAndChill',
      'BotLobbyKing',
    ],
  },
];

const tips = [
  {
    title: 'Keep it short and memorable',
    description:
      'The best gaming channel names are 2–3 words max. Short names are easier to remember, type in search, and fit cleanly on thumbnails and watermarks. Think "PewDiePie" not "TheUltimateGamingChannelXx".',
  },
  {
    title: 'Make it easy to spell and pronounce',
    description:
      'If viewers can\'t spell your name after hearing it once, they can\'t search for you. Avoid excessive numbers, underscores, or unusual spellings. "NovaCrux" is memorable; "N0v4_CruXx_92" is not.',
  },
  {
    title: 'Check availability everywhere',
    description:
      'Before committing, verify the name is available on YouTube, Twitter/X, Instagram, TikTok, and as a domain. Consistent branding across platforms is essential for growth.',
  },
  {
    title: 'Avoid game-specific names',
    description:
      'Naming yourself "FortniteMasterAlex" locks you into one game. When you want to branch out, your name works against you. Choose something broader that works across any game.',
  },
  {
    title: 'Consider your content style',
    description:
      'Your channel name should hint at your vibe. Competitive players lean toward sharp, aggressive names. Comedy creators go casual and funny. Tutorial channels sound professional and authoritative.',
  },
  {
    title: 'Test it with friends first',
    description:
      'Say your channel name out loud to 5 people. If they can repeat it back correctly and it doesn\'t sound awkward, you\'ve got a winner. First impressions matter.',
  },
];

const faqs = [
  {
    question: 'Should I put "Gaming" or "Plays" in my channel name?',
    answer:
      'It depends on your long-term goals. Adding "Gaming" (e.g., MarkiplierGaming) makes your niche instantly clear to new viewers. However, dropping it (e.g., just "Markiplier") gives you more flexibility to pivot into vlogs or reaction content later without confusing your audience.',
  },
  {
    question: 'How do I pick a clan name for my esports team?',
    answer:
      'Esports clan names should sound authoritative and be easily abbreviated into a 2-4 letter prefix (like FaZe, TSM, or NRG). Avoid overly long words. Opt for sharp, aggressive, or futuristic themes like "Sentinels", "OpTic", or "Cloud9".',
  },
  {
    question: 'Is it bad to have numbers in my gaming channel name?',
    answer:
      'Generally, yes. Names like "GamerDude99" look unprofessional and are hard for viewers to remember or type. The only exception is if the number is explicitly part of the brand identity (e.g., "LevelCapGaming" or "AchievementHunter").',
  },
  {
    question: 'What if the gaming name I want is taken on Xbox/PlayStation?',
    answer:
      'If you plan to stream or record multiplayer gameplay where your gamertag is visible, having a mismatched YouTube name and gamertag can confuse viewers trying to add you. Try to secure a variation that matches across all platforms, like adding "TV" or "Live" to the end.',
  },
  {
    question: 'How do I come up with a funny gaming channel name?',
    answer:
      'Combine a gaming term with an unexpected adjective or animal. E.g., "TacticalPotato", "SneakyTurtlePlays", or "CaffeinatedNoob". Self-deprecating names often perform very well in casual, non-competitive gaming niches.',
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
      name: 'YouTube Channel Name Generator for Gaming \u2014 FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-channel-name-generator-for-gaming',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered channel name generator for gaming YouTube channels. Get unique, brandable name ideas in clan-style, streamer-style, brand-style, and funny formats.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function GamingChannelNameLandingPage() {
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
            YouTube Channel Name Generator for <span className="text-gradient">Gaming</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate unique, brandable gaming channel names instantly. Clan-style, streamer names, professional brands, or funny gamer tags — all powered by AI.
          </p>
          <div className="text-left mt-8">
            <ChannelNameGeneratorClient niche="gaming" />
          </div>
        </section>

        {/* Why your channel name matters */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Gaming Channel Name Matters More Than You Think
          </h2>
          <p className="text-slate-600 mb-4">
            Your channel name is the first thing viewers see — before your thumbnail, before your title, before your content. It&apos;s your brand identity on YouTube, and in the gaming space, it communicates everything: your personality, your vibe, your credibility.
          </p>
          <p className="text-slate-600 mb-4">
            Think about the biggest gaming channels. &ldquo;PewDiePie,&rdquo; &ldquo;MrBeast Gaming,&rdquo; &ldquo;Dream&rdquo; — each name is short, memorable, and instantly recognizable. That&apos;s not an accident. A great name sticks in viewers&apos; minds and makes them more likely to subscribe, share, and return.
          </p>
          <p className="text-slate-600">
            Our AI generates names that are <strong className="text-slate-900">short and memorable</strong>, <strong className="text-slate-900">easy to spell</strong>, and <strong className="text-slate-900">tailored to your gaming niche</strong>. Whether you&apos;re starting a Minecraft let&apos;s play or a competitive Valorant channel, we&apos;ve got you covered.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category}</h2>
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
            6 Best Practices for Choosing a Gaming Channel Name
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
            How Our Gaming Channel Name Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Describe your channel vibe</strong> — tell us your gaming niche, personality, and style preferences.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates unique name ideas</strong> — clan-style, streamer, brand, and creative names tailored to gaming.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Pick your favorite</strong> — check availability and claim your name on YouTube and social media.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-channel-name-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Channel Name Generator
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
              href="/tools/youtube-title-generator-for-gaming"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎮 Title Generator for Gaming</span>
              <p className="text-slate-600 text-sm mt-1">Create click-worthy gaming video titles for walkthroughs, challenges, and reviews.</p>
            </Link>
            <Link
              href="/youtube-tags-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🏷️ YouTube Tags Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate optimized tags for your gaming videos to boost discoverability.</p>
            </Link>
            <Link
              href="/youtube-channel-name-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">💡 YouTube Channel Name Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate brandable channel names for any YouTube niche — not just gaming.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About Gaming Channel Growth
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-gaming-channel-growth-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Gaming</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Gaming Channel Growth Guide: From Zero to Monetization
              </h3>
            </Link>
            <Link
              href="/blog/how-to-pick-youtube-channel-name"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Channel Names</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Pick the Perfect YouTube Channel Name
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
