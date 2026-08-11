import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import RealTimeGeneratorClient from '@/components/tools/RealTimeGeneratorClient';
import { Sparkles } from 'lucide-react';
import RelatedTools from '@/components/RelatedTools';
import LatestBlogPosts from '@/components/LatestBlogPosts';

export const revalidate = 3600; // Cache on Edge CDN with SWR background revalidation

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Real-Time Movie & Live Topic YouTube Title Generator',
    description:
      'Generate accurate, high-CTR YouTube titles, search tags, hashtags, and descriptions for real-world movies, trailers, pop culture news, and live events.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Real-Time Movie & Live Topic YouTube Title Generator — Free AI Tool',
  description:
    'Generate accurate, high-CTR YouTube titles, search tags, hashtags, and descriptions for real-world movies, trailers, pop culture news, and live events with live fact fetching.',
  openGraph: {
    title: 'Real-Time Movie & Live Topic YouTube Title Generator — Free AI Tool',
    description:
      'Generate accurate, high-CTR YouTube titles, search tags, hashtags, and descriptions for real-world movies, trailers, pop culture news, and live events.',
    url: buildAbsoluteUrl('/youtube-realtime-title-generator'),
    type: 'website',
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-realtime-title-generator'),
  },
  keywords: [
    'movie youtube title generator',
    'real time youtube title generator',
    'youtube movie tags generator',
    'movie review youtube titles',
    'horror movie youtube title generator',
    'trending topic youtube title maker',
    'real world youtube title generator',
  ],
};

const faqItems = [
  {
    question: 'How does the Real-Time Movie YouTube Title Generator work?',
    answer:
      'Our tool fetches live real-world facts, plot summaries, release years, and character details from clean APIs (like Wikipedia and DuckDuckGo) without web scraping. It passes this context to our AI engine to generate 100% accurate, high-CTR titles, tags, and descriptions for real movies and trending topics.',
  },
  {
    question: 'Why should I use this tool instead of standard AI title generators?',
    answer:
      'Standard AI models (like Groq or ChatGPT) have knowledge cutoff dates and do not know about newly released movies or breaking events. This real-time tool enriches the AI with live facts so your generated titles accurately reference real movie plots, character names, and trending keywords.',
  },
  {
    question: 'When should I use the Standard Generator vs. the Real-Time Tool?',
    answer:
      'Use the Standard AI Generator for original creator content (e.g., vlogs, gaming videos, custom series like "Horror Tape Ep 1"). Use the Real-Time Generator when making videos about real-world movies (e.g., "Obsession Movie", "Avatar 3"), news, or public events.',
  },
  {
    question: 'Does this generator provide YouTube tags and descriptions?',
    answer:
      'Yes! Every generation produces 10 viral YouTube titles, 25 Studio search tags, 15 trending hashtags, and a 2-paragraph SEO video description referencing real plot details.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
};

const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Real-Time Movie & Live Topic YouTube Title Generator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function RealTimeTitleGeneratorPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }} />

      <div className="max-w-4xl mx-auto space-y-12">
        {/* Page Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-700 dark:text-purple-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            Live Search & Real-World Facts Powered
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Real-Time Movie & Live Topic <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-emerald-600 dark:from-purple-400 dark:via-indigo-300 dark:to-emerald-400 bg-clip-text text-transparent">
              YouTube AI Generator
            </span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Generate accurate viral titles, Studio search tags, hashtags, and SEO descriptions for real-world movies, trailers, and trending news using live fact context.
          </p>
        </div>

        {/* Client Component */}
        <RealTimeGeneratorClient />

        {/* FAQ Section */}
        <section className="glass-card rounded-2xl p-6 md:p-8 space-y-6 border border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/40 shadow-lg backdrop-blur-xl">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Frequently Asked Questions</h2>
          <div className="grid gap-6">
            {faqItems.map((faq, i) => (
              <div key={i} className="space-y-2 border-b border-slate-200 dark:border-slate-800/80 pb-4 last:border-0 last:pb-0">
                <h3 className="text-base font-semibold text-purple-700 dark:text-purple-300">{faq.question}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <RelatedTools currentToolPath="/youtube-realtime-title-generator" />

        {/* Latest Blog Posts */}
        <LatestBlogPosts />
      </div>
    </div>
  );
}
