import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Travel Vlogs',
  description:
    'Free AI-powered YouTube title generator for travel channels. Create engaging titles for destination guides, budget travel, solo travel, food travel, and adventure vlogs that boost clicks and views.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-travel'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Travel Vlogs',
    description:
      'Generate travel vlog titles that get clicks and rank in search. Destination guides, budget tips, solo travel stories — all optimized by AI.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-travel'),
  },
  keywords: [
    'travel youtube title',
    'travel vlog title ideas',
    'travel video title generator',
    'destination guide title',
    'budget travel youtube title',
    'solo travel video title',
    'travel vlog seo',
    'adventure vlog title ideas',
  ],
};

const examplesByCategory = [
  {
    category: 'Destination Guides',
    examples: [
      'First Time in Bali — 7 Days, $500 Budget (Complete Guide)',
      'Tokyo Travel Guide 2026: Everything You Need to Know Before Going',
      '48 Hours in Istanbul — The Perfect Itinerary',
    ],
  },
  {
    category: 'Budget Travel',
    examples: [
      'How I Traveled Southeast Asia for $30 a Day (Full Breakdown)',
      'Europe on a Budget: 10 Countries in 30 Days for Under $2,000',
    ],
  },
  {
    category: 'Solo Travel',
    examples: [
      'I Traveled Solo Through South America for 3 Months — Here Is What Happened',
      'Solo Female Travel in Morocco: Is It Safe? (Honest Review)',
      'Why Traveling Alone Changed My Life — 1 Year Update',
    ],
  },
  {
    category: 'Food & Culture Travel',
    examples: [
      'I Tried Every Street Food in Bangkok — Rating the Best and Worst',
      'Italian Food Tour: 10 Dishes You MUST Try in Rome',
    ],
  },
];

const tips = [
  {
    title: 'Include the destination name',
    description:
      'Always put the country, city, or region name in your title. Travelers search for specific destinations like "Thailand travel guide" or "things to do in Paris." This is your primary SEO keyword.',
  },
  {
    title: 'Add specific numbers',
    description:
      'Numbers create clear expectations and boost CTR. "7 Days in Japan" is more clickable than "My Japan Trip." Mention days, budget amounts, number of places, or costs — viewers love concrete details.',
  },
  {
    title: 'Use a personal angle',
    description:
      'First-person titles like "I Spent 30 Days in India" outperform generic ones like "India Travel Guide" because they promise a unique perspective and authentic experience.',
  },
  {
    title: 'Create urgency or stakes',
    description:
      'Titles with stakes get more clicks. "Can I Survive Japan on $10 a Day?" or "I Got Lost in the Amazon Rainforest" create tension that makes viewers need to click.',
  },
  {
    title: 'Keep it under 65 characters',
    description:
      'Travel titles tend to run long because of destination names. Fight the urge — titles over 70 characters get cut off on mobile, where most travel content is consumed.',
  },
  {
    title: 'Include the year for evergreen content',
    description:
      'Adding "2026" to destination guides signals freshness. Travelers want current information — prices, visa rules, and safety conditions change yearly. A dated title gets more clicks from search.',
  },
];

const faqs = [
  {
    question: 'What makes a good travel YouTube title?',
    answer:
      'A great travel title includes the destination name, uses specific numbers (days, budget, places), creates curiosity or stakes, and stays under 65 characters. It should make viewers feel like they\'ll miss out if they don\'t watch.',
  },
  {
    question: 'Should I include the year in my travel video title?',
    answer:
      'Yes, for destination guides and travel tips videos. Adding the year (e.g., "2026") signals that your information is current and accurate. This significantly boosts CTR from Google and YouTube search results.',
  },
  {
    question: 'How do I make my travel vlogs rank on YouTube?',
    answer:
      'Use destination-specific keywords in your title, description, and tags. Create detailed timestamps, add location tags, and use the YouTube location feature. Pair strong titles with eye-catching thumbnails showing the destination.',
  },
  {
    question: 'Is this travel title generator free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, no hidden fees. Generate unlimited travel vlog titles powered by AI.',
  },
  {
    question: 'Can I use this for food travel and adventure vlogs?',
    answer:
      'Absolutely! The AI generates titles for all travel sub-niches including food tours, adventure travel, solo backpacking, luxury travel, cultural experiences, road trips, and digital nomad content.',
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
      name: 'YouTube Title Generator for Travel Vlogs \u2014 FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-travel',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator for travel vloggers. Create engaging titles for destination guides, budget travel, solo travel, food travel, and adventure content.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function TravelTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Travel</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Create engaging titles for destination guides, budget travel, solo adventures, and food travel vlogs. Optimized for clicks, powered by AI.
          </p>
          <Link
            href="/youtube-title-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Travel Titles Free →
          </Link>
        </section>

        {/* Why travel titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Travel Title Is Your Most Important SEO Asset
          </h2>
          <p className="text-slate-600 mb-4">
            Travel is one of the most searched categories on YouTube. Millions of people plan their trips by watching YouTube videos — and your title is what determines whether they click on your video or a competitor&apos;s.
          </p>
          <p className="text-slate-600 mb-4">
            A generic title like &ldquo;My Trip to Thailand&rdquo; competes with millions of similar videos. But &ldquo;First Time in Thailand — 10 Days, $800 Budget (Complete Guide)&rdquo; immediately tells the viewer the destination, duration, cost, and value they&apos;ll get.
          </p>
          <p className="text-slate-600">
            The best travel titles combine a <strong className="text-slate-900">specific destination</strong>, <strong className="text-slate-900">concrete numbers</strong>, and <strong className="text-slate-900">a compelling hook</strong>. Our AI crafts these for you in seconds.
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
            6 Best Practices for Travel Video Titles
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
            How Our Travel Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your travel topic</strong> — describe the destination, trip style, or travel experience.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 optimized titles</strong> — each crafted with destination keywords, hooks, and SEO best practices.</span>
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
              <p className="text-slate-600 text-sm mt-1">Create relatable vlog titles for daily routines, lifestyle, and personal content.</p>
            </Link>
            <Link
              href="/youtube-description-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📝 YouTube Description Generator</span>
              <p className="text-slate-600 text-sm mt-1">Write SEO-optimized descriptions with timestamps, links, and CTAs for your travel videos.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Find trending travel hashtags to boost your video&apos;s discoverability.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About Travel Video SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/how-to-start-a-vlog-channel"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Vlogs</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Start a Vlog Channel: Complete Beginner Guide
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
