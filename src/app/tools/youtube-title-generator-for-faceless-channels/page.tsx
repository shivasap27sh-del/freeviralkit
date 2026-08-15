import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'YouTube Title Generator for Faceless Channels | FreeViralKit',
    description: 'Free AI YouTube title generator for faceless automation channels and video essayists. Generate high-RPM titles for business, true crime, tech, and history documentaries.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'YouTube Title Generator for Faceless Channels — High RPM Titles',
  description:
    'Free AI YouTube title generator for faceless channels. Create click-worthy documentary titles for business exposés, true crime mysteries, and tech video essays.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-faceless-channels'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Faceless Channels | FreeViralKit',
    description:
      'Generate high-CTR, high-RPM YouTube titles for faceless automation channels and documentary creators. 100% free AI tool.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-faceless-channels'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit Faceless YouTube Title Generator',
      },
    ],
  },
  keywords: [
    'youtube title generator faceless channels',
    'faceless youtube title ideas',
    'youtube automation title generator',
    'cash cow youtube title ideas',
    'video essay title generator',
    'documentary youtube titles',
    'high rpm youtube titles',
    'faceless channel seo',
  ],
};

const examplesByCategory = [
  {
    category: 'Business & Corporate Exposés',
    examples: [
      'How Rolex Tricked the Entire World into Buying Status',
      'The Dark Monopoly Behind Your Favorite Eyewear Brands',
      'Why WeWork Was Destined to Crash from Day One',
      'How Red Bull Built an Empire Without Selling Drinks',
    ],
  },
  {
    category: 'True Crime & Unsolved Mysteries',
    examples: [
      'The $500M Art Heist That Fooled the FBI for 25 Years',
      'The Disturbing Case of the Vanishing Cruise Passenger',
      'How a Fake Billionaire Fooled Wall Street and Got Away',
      'The Most Audacious Prison Escape in American History',
    ],
  },
  {
    category: 'Tech, Geopolitics & Future Trends',
    examples: [
      'Why Taiwan’s Microchips are More Dangerous Than Oil',
      'How Nvidia Quietly Built a $3 Trillion AI Monopoly',
      'The Terrifying Truth About the Global Deep-Sea Cable Grid',
      'Why China is Desperately Hoarding Gold in 2026',
    ],
  },
  {
    category: 'Psychology, History & Stoicism',
    examples: [
      'The Dark Psychology Casinos Use to Drain Your Wallet',
      'Marcus Aurelius: The Stoic Mindset That Built an Empire',
      'Why 99% of People Fail the Marshmallow Test (And What It Means)',
      'The Bizarre History of the World’s First Stock Market Crash',
    ],
  },
];

const caseStudies = [
  {
    creator: 'MagnatesMedia & Business Essays',
    strategy: 'The Netflix Thriller Narrative',
    breakdown:
      'Framing business stories with dramatic corporate villains and downfall arcs ("How X Destroyed His Empire") generates 3M+ views and $15+ AdSense RPM.',
  },
  {
    creator: 'Moon & Investigative Exposés',
    strategy: 'The "Dark Psychology" Frame',
    breakdown:
      'Exposing everyday manipulation tactics ("How Fast Food Tricked You") taps into widespread consumer skepticism and drives viral social sharing.',
  },
  {
    creator: 'Jake Tran & Geopolitical Deep Dives',
    strategy: 'High-Stakes Resource Battles',
    breakdown:
      'Connecting technology, currency, and global power ("Why Microchips Rule the World") attracts high-income adult viewers with strong advertiser appeal.',
  },
];

const tips = [
  {
    title: '1. Lead with the Institution, Brand, or Recognizable Figure',
    description:
      'Faceless video essays thrive on recognizable entities ("Rolex", "Nvidia", "Wall Street", "The FBI"). Putting the dominant brand or subject in the first 3 words drives instant visual recognition in search feeds.',
  },
  {
    title: '2. Expose Hidden Mechanics ("How X Quietly Did Y")',
    description:
      'High-performing faceless channels use revelation framing: "How X Fooled...", "The Dark Truth About...", or "Why X is Collapsing" to create deep intellectual intrigue.',
  },
  {
    title: '3. Optimize for High-RPM Commercial Keywords',
    description:
      'Faceless channels in Finance, Real Estate, Business, and Tech earn 4x to 8x higher AdSense RPM ($12-$30+ per 1,000 views). Target commercial intent keywords without losing dramatic storytelling appeal.',
  },
  {
    title: '4. Enforce the 45–65 Character Mobile Sweet Spot',
    description:
      'Keep titles strictly under 65 characters so the dramatic tension of your hook is never truncated with an ellipsis (...) on mobile YouTube feeds.',
  },
  {
    title: '5. Match Title Stakes with the First 15 Seconds',
    description:
      'Deliver on the title premise immediately with fast-paced B-roll cuts, sound design, and motion graphics to maintain 60%+ 30-second retention.',
  },
  {
    title: '6. Avoid Clickbait Strike Penalties',
    description:
      'Use provocative, verified truths rather than fake drama. The YouTube recommendation engine rewards high completion rates over empty clickbait.',
  },
];

const faqs = [
  {
    question: 'What makes a faceless YouTube video title go viral?',
    answer:
      'Faceless channels rely 100% on packaging (Title + Thumbnail) because there is no personal creator face on camera. High-converting faceless titles combine high-stakes narrative questions, corporate intrigue, and intense curiosity gaps.',
  },
  {
    question: 'How do I avoid clickbait penalties on faceless channels?',
    answer:
      'Ensure the core premise stated in your title is directly addressed in the first 30 seconds of your video. Use provocative truths rather than misleading fabrications to keep watch time high.',
  },
  {
    question: 'What niches have the highest AdSense RPM for faceless channels?',
    answer:
      'Finance & Investing ($15–$35 RPM), SaaS & Tech Tools ($12–$25 RPM), Business Exposés ($10–$20 RPM), and Real Estate ($12–$28 RPM) yield the highest ad payouts on YouTube.',
  },
  {
    question: 'Is this faceless title generator free for YouTube automation?',
    answer:
      'Yes! FreeViralKit is completely free with no limits, no login required, and full support for YouTube automation creators.',
  },
];

export default function FacelessTitleGeneratorPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'YouTube Title Generator for Faceless Channels',
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description:
      'AI YouTube title generator for faceless automation channels and video essayists. Generate high-RPM documentary titles.',
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
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 mb-4 uppercase tracking-widest">
            💼 Faceless Automation Studio
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            YouTube Title Generator for <span className="text-gradient">Faceless Channels</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
            Generate high-RPM, documentary-style YouTube titles engineered for video essays, business exposés, true crime mysteries, and YouTube automation.
          </p>
        </section>

        {/* Interactive Tool Component */}
        <TitleGeneratorClient niche="Faceless YouTube Automation & Documentaries" />

        {/* Curated Niche Title Formulas */}
        <section className="mt-16 mb-12">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-6 text-center">
            High-Performing Faceless Documentary Title Formats
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {examplesByCategory.map((cat, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800"
              >
                <h3 className="font-display text-base font-bold text-emerald-500 dark:text-emerald-400 mb-3 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
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
            How Million-Subscriber Documentary Channels Title Their Videos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20">
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
            The 6 Rules for Faceless YouTube Automation in 2026
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

        {/* FAQ Section */}
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
        <section className="text-center bg-gradient-to-r from-emerald-500/10 via-purple-500/10 to-emerald-500/10 border border-emerald-500/20 rounded-3xl p-8">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
            Generate Complete Faceless Scripts & Metadata
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-6 max-w-lg mx-auto">
            Use our AI Script Storyboard and SEO suite to produce full video outlines with visual B-roll prompts and high-RPM descriptions.
          </p>
          <Link
            href="/"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white shadow-lg shadow-emerald-500/20"
          >
            Go to Full YouTube Suite 💼
          </Link>
        </section>
      </main>
    </>
  );
}
