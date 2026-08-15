import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for Anime Channels | FreeViralKit',
    description: 'Free AI YouTube title generator for Anime creators. Generate high-CTR titles for anime reviews, episode breakdowns, power scaling, and tier lists.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for Anime Channels — High CTR Titles',
  description:
    'Free AI YouTube title generator for anime creators. Create click-worthy titles for episode reviews, manga theories, power scaling, and seasonal rankings.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-anime'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Anime Channels | FreeViralKit',
    description:
      'Generate viral Anime YouTube titles that maximize click-through rate. 100% free AI tool for anime reviewers, power scalers, and video essayists.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-anime'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit Anime Title Generator',
      },
    ],
  },
  keywords: [
    'youtube title generator anime',
    'anime youtube title ideas',
    'anime video title generator',
    'anime review title generator',
    'manga theory titles',
    'power scaling youtube titles',
    'anime tier list titles',
    'anime seo tool',
  ],
};

const examplesByCategory = [
  {
    category: 'Episode Breakdowns & Manga Revelations',
    examples: [
      'The Hidden One Piece Detail You Missed in Episode 1120',
      'Why Sukuna’s True Power is Terrifying (Jujutsu Kaisen Theory)',
      'Solo Leveling Season 2: Everything the Manhwa Changed',
      'The 1 Scene MAPPA Cut From Attack on Titan (And Why)',
    ],
  },
  {
    category: 'Power Scaling & VS Battle Debates',
    examples: [
      'Could Gojo Beat Goku? (Complete Ability Breakdown)',
      'Top 10 Strongest Anime Characters Who Can Destroy Realities',
      'The Most Overpowered Anime Villains of All Time',
      'Why Saitama Beats Every Character in Modern Anime',
    ],
  },
  {
    category: 'Seasonal Rankings & Controversial Tier Lists',
    examples: [
      'Ranking Every Winter 2026 Anime from Peak to Trash',
      'Top 7 Must-Watch Dark Fantasy Anime You Never Heard Of',
      'The Definitive Shonen Protagonist Tier List (Honest Ranking)',
      'Why This Popular Anime is Overrated (Honest Review)',
    ],
  },
  {
    category: 'Video Essays & Character Deep Dives',
    examples: [
      'The Tragic Philosophy of Eren Yeager (Attack on Titan Essay)',
      'Why Vinland Saga is the Best Written Story of Our Generation',
      'How Demon Slayer Changed the Global Animation Industry',
      'The Psychology of Light Yagami: When Justice Becomes Evil',
    ],
  },
];

const caseStudies = [
  {
    creator: 'AniNews & Video Essayists',
    strategy: 'The "What Was Cut" Angle',
    breakdown:
      'Light novel and manga adaptations constantly cut side plots. Titles highlighting "What Was Cut" or "The Scene Too Dark for TV" drive 3x higher CTR from loyal source-material readers.',
  },
  {
    creator: 'Nux Taku & Anime Hype Channels',
    strategy: 'The Contrarian Tier List',
    breakdown:
      'Instead of neutral reviews, framing titles with polar opposites like "Peak vs Trash" triggers passionate fanbases in the comments, boosting YouTube recommendation velocity.',
  },
  {
    creator: 'Power Scalers & Lore Hunters',
    strategy: 'Direct Ability Clashes',
    breakdown:
      'Pitting two iconic characters with unresolved power dynamics (e.g. "Sukuna vs Gojo") generates immediate search traffic and high average percentage viewed (APV).',
  },
];

const tips = [
  {
    title: '1. Front-load the Franchise or Character Name',
    description:
      'Start with the anime franchise or primary character name ("Jujutsu Kaisen", "Luffy", "Gojo") in the first 3-4 words so the YouTube algorithm instantly indexes your video for related watch feeds and recommendation carousels.',
  },
  {
    title: '2. Open Irresistible Curiosity Loops',
    description:
      'Anime fans love unresolved mysteries and hidden lore. Phrases like "The Hidden Detail You Missed" or "What the Anime Cut" trigger immediate debate in the community without misleading viewers.',
  },
  {
    title: '3. Enforce the 45–65 Character Mobile Sweet Spot',
    description:
      'Over 75% of anime YouTube views happen on mobile devices. Keep titles strictly between 45 and 65 characters so your primary hook is never truncated with an ellipsis (...) in the mobile feed.',
  },
  {
    title: '4. Combine Emotional Opinions with Tier Lists',
    description:
      'Instead of a dry title like "My Anime Tier List", use high-energy framing: "Ranking Every Winter 2026 Anime (Peak vs Trash)" to spark instant comment velocity.',
  },
  {
    title: '5. Leverage Fair Use Thumbnail & Title Synergy',
    description:
      'Pair high-contrast manga panel crops with bold 2-4 word text overlays (e.g. "HE LIED", "PEAK FICTION") that complement your title rather than repeating it.',
  },
  {
    title: '6. Tag Seasonal Spikes Early',
    description:
      'When a new anime season drops (Spring/Fall), publish seasonal preview titles 2 weeks ahead of the premiere to capture early surging search traffic.',
  },
];

const faqs = [
  {
    question: 'How do I title an Anime theory video without spoiling the manga?',
    answer:
      'Use curiosity-driven phrasing that hints at the mystery without revealing the exact plot twist. For example, use "The Dark Secret Behind Sukuna’s Final Form" rather than explicitly stating the spoiler in the title. This protects new viewers while enticing manga readers.',
  },
  {
    question: 'What types of Anime titles get the highest CTR on YouTube?',
    answer:
      'Power scaling matchups (Character A vs Character B), hidden lore breakdowns ("10 Details You Missed in Episode X"), and seasonal Tier Lists consistently yield the highest CTR and audience comment debates.',
  },
  {
    question: 'How does YouTube categorize anime videos for the algorithm?',
    answer:
      'YouTube scans the first 3 words of your title, the first 150 characters of your description, and your chapter markers to match your video with viewer watch history. Front-loading the anime title ensures high-accuracy categorization.',
  },
  {
    question: 'Is this Anime Title Generator really 100% free?',
    answer:
      'Yes! FreeViralKit is completely free with no signup, no credit card, and unlimited generations for anime creators worldwide.',
  },
];

export default function AnimeTitleGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Title Generator for Anime',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'AI YouTube title generator for anime creators. Create high-CTR titles for anime reviews, power scaling, and lore theories.',
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

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 mb-4 uppercase tracking-widest">
            ⚔️ Anime Creator Studio
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            YouTube Title Generator for <span className="text-gradient">Anime Channels</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Generate viral, high-CTR YouTube titles engineered for anime reviews, manga breakdowns, power-scaling debates, and seasonal tier lists.
          </p>
        </section>

        {/* Interactive Tool Component */}
        <TitleGeneratorClient niche="Anime & Manga" />

        {/* Curated Niche Title Formulas */}
        <section className="mt-16 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Top-Performing Anime Title Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examplesByCategory.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-display text-base font-bold text-pink-500 dark:text-pink-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500"></span>
                  {cat.category}
                </h3>
                <ul className="space-y-2">
                  {cat.examples.map((ex, i) => (
                    <li
                      key={i}
                      className="text-sm text-slate-700 dark:text-slate-300 bg-slate-100/60 dark:bg-slate-800/60 p-2.5 rounded-xl font-mono text-xs border border-slate-200/40 dark:border-slate-700/40"
                    >
                      {ex}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Deep Dive: Channel Strategy Case Studies */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            How Million-Subscriber Anime Channels Title Their Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-pink-400 bg-pink-500/10 px-2 py-1 rounded-md border border-pink-500/20">
                    {cs.creator}
                  </span>
                  <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mt-3 mb-2">
                    {cs.strategy}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {cs.breakdown}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Best Practice Tips */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            The 6 Golden Rules for Anime YouTube SEO in 2026
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tips.map((tip, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5"
              >
                <h3 className="font-display text-base font-semibold text-slate-900 dark:text-white mb-2">
                  {tip.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {tip.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section with Rich Snippets */}
        <section className="mb-16">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="text-center bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-purple-500/10 border border-purple-500/20 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Want Full YouTube Studio Metadata?
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
            Get your titles, descriptions with timestamps, 4-tier tags, and hashtags all in one click on our homepage.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-purple-500/20"
          >
            Go to Full YouTube Suite 🚀
          </Link>
        </section>
      </main>
    </>
  );
}
