import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Tags Generator for Gaming',
  description:
    'Free AI-powered YouTube tags generator for gaming videos. Generate optimized tags for FPS, RPG, mobile gaming, streaming, Minecraft, GTA, Fortnite, and more. Boost discoverability instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-tags-generator-for-gaming'),
  },
  openGraph: {
    title: 'YouTube Tags Generator for Gaming',
    description:
      'Generate gaming-specific YouTube tags that improve search rankings and discoverability. Free AI tool for gaming creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-tags-generator-for-gaming'),
  },
  keywords: [
    'gaming youtube tags',
    'gaming video tags',
    'best tags for gaming',
    'youtube tags for gaming videos',
    'gaming seo tags',
    'minecraft tags',
    'fortnite tags',
    'gaming channel tags generator',
  ],
};

const examplesByCategory = [
  {
    category: 'FPS & Shooter Games',
    examples: [
      'valorant gameplay, valorant tips, fps tips, valorant ranked, valorant montage, best aim settings',
      'call of duty warzone, warzone loadout, cod tips, warzone best weapons, fps gameplay 2026',
      'apex legends, apex ranked, battle royale tips, apex movement guide, fps shooter',
    ],
  },
  {
    category: 'RPG & Open World',
    examples: [
      'elden ring gameplay, elden ring boss guide, rpg walkthrough, souls-like game, open world rpg 2026',
      'zelda tears of the kingdom, zelda guide, open world exploration, nintendo switch games',
      'baldurs gate 3, bg3 build guide, crpg tips, dnd game, rpg character builds',
    ],
  },
  {
    category: 'Mobile Gaming',
    examples: [
      'bgmi gameplay, bgmi tips and tricks, mobile gaming, pubg mobile, bgmi sensitivity settings',
      'free fire, free fire max, mobile battle royale, free fire gameplay, mobile fps',
      'genshin impact, genshin tips, gacha game, mobile rpg, genshin build guide',
    ],
  },
  {
    category: 'Streaming & Let\'s Plays',
    examples: [
      'gaming stream, live stream gaming, twitch highlights, stream setup, gaming content creator',
      'lets play minecraft, minecraft survival, minecraft series, gaming series, gameplay commentary',
    ],
  },
];

const tips = [
  {
    title: 'Always include the game name as a tag',
    description:
      'The game title is the most important tag. Include the full name, common abbreviations, and alternate spellings. "Minecraft", "minecraft gameplay", and "mc" should all be separate tags.',
  },
  {
    title: 'Mix broad and specific tags',
    description:
      'Combine broad tags like "gaming" and "gameplay" with specific tags like "minecraft hardcore day 100" or "valorant sage tips". Broad tags help categorization; specific tags target niche searches.',
  },
  {
    title: 'Use the full 500-character tag limit',
    description:
      'YouTube allows up to 500 characters of tags. Most creators use less than half. Fill the full limit with relevant tags to maximize the number of search queries your video can appear for.',
  },
  {
    title: 'Include trending and seasonal tags',
    description:
      'When a new season, update, or DLC drops, add those keywords as tags immediately. Tags like "fortnite season 12" or "minecraft 1.22 update" capture fresh search traffic with low competition.',
  },
  {
    title: 'Add platform and device tags',
    description:
      'Include tags for the platform you are playing on: "pc gaming", "ps5 gameplay", "xbox series x", "nintendo switch", or "mobile gaming". Many viewers search by platform when looking for specific content.',
  },
  {
    title: 'Spy on competitor tags for inspiration',
    description:
      'Look at the tags used by top gaming channels in your niche. Tools and browser extensions can reveal competitor tags. Use similar high-performing tags adapted to your specific content.',
  },
];

const faqs = [
  {
    question: 'What are the best YouTube tags for gaming videos?',
    answer:
      'The best gaming YouTube tags include the game name, game genre (fps, rpg, battle royale), specific content type (walkthrough, review, tips), platform (PC, PS5, mobile), and trending keywords related to current updates or seasons.',
  },
  {
    question: 'How many tags should I use for gaming videos?',
    answer:
      'Use as many relevant tags as possible within YouTube\'s 500-character limit. Aim for 15-30 tags that mix broad gaming terms with specific tags for your video. Quality and relevance matter more than quantity.',
  },
  {
    question: 'Do YouTube tags still matter for gaming SEO in 2026?',
    answer:
      'Yes, tags still matter as a secondary ranking signal. While titles, descriptions, and watch time are more important, tags help YouTube understand your content and can improve suggested video placement, especially for niche gaming searches.',
  },
  {
    question: 'Is this gaming tags generator free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, and no hidden fees. Generate unlimited gaming video tags powered by AI.',
  },
  {
    question: 'Can I generate tags for specific games like Minecraft or Fortnite?',
    answer:
      'Absolutely! Enter any game name or topic and the AI will generate tags optimized for that specific game. It works for Minecraft, Fortnite, GTA, Valorant, Call of Duty, Roblox, and every other game.',
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
      name: 'YouTube Tags Generator for Gaming — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-tags-generator-for-gaming',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube tags generator specifically designed for gaming videos. Generate optimized tags for FPS, RPG, mobile gaming, streaming, and all gaming genres.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function GamingTagsLandingPage() {
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
            YouTube Tags Generator for <span className="text-gradient">Gaming</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate optimized tags for FPS, RPG, mobile gaming, streaming, and every genre. Maximize discoverability with AI-powered gaming tags.
          </p>
          <Link
            href="/youtube-tags-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Gaming Tags Free →
          </Link>
        </section>

        {/* Why gaming tags matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Tags Matter for Gaming Video Discoverability
          </h2>
          <p className="text-slate-600 mb-4">
            YouTube tags are a secondary but important ranking signal that helps the algorithm understand what your video is about. For gaming videos, where competition is intense, tags can be the difference between appearing in suggested videos or being invisible.
          </p>
          <p className="text-slate-600 mb-4">
            Proper tags help YouTube connect your video with related content. When a viewer watches a Minecraft walkthrough, YouTube uses tags (among other signals) to decide whether to suggest your Minecraft video next. Without the right tags, you miss these opportunities entirely.
          </p>
          <p className="text-slate-600">
            The best gaming tag strategies combine <strong className="text-slate-900">game-specific keywords</strong>, <strong className="text-slate-900">genre tags</strong>, and <strong className="text-slate-900">trending terms</strong>. That&apos;s exactly what our AI generates for you.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Tags</h2>
            <ul className="space-y-2 text-slate-700">
              {cat.examples.map((example) => (
                <li key={example} className="flex items-start gap-2">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="text-sm font-mono bg-slate-50 px-2 py-1 rounded">{example}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}

        {/* Best practices */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mt-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-6">
            6 Best Practices for Gaming Video Tags
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
            How Our Gaming Tags Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your gaming topic</strong> — describe your game, genre, or video type.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates optimized tags</strong> — a mix of broad, niche, and trending gaming tags tailored to your content.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Copy all tags</strong> — paste the full tag set into YouTube Studio with one click.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-tags-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Tags Generator
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
              <p className="text-slate-600 text-sm mt-1">Create click-worthy titles for gameplay walkthroughs, challenges, and reviews.</p>
            </Link>
            <Link
              href="/youtube-tags-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🏷️ YouTube Tags Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate optimized tags for any YouTube niche — not just gaming.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate trending hashtags for your gaming videos to maximize reach.</p>
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
              href="/blog/youtube-gaming-channel-growth-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Growth</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Gaming Channel Growth Guide — From Zero to Thousands
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
