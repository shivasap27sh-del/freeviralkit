import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Tech',
  description:
    'Free AI-powered YouTube title generator for tech channels. Create click-worthy titles for product reviews, unboxing videos, tech comparisons, and how-to tutorials. Boost CTR and views instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-tech'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Tech',
    description:
      'Generate tech YouTube titles that improve CTR and discoverability. Free AI tool for tech reviewers and creators.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-tech'),
  },
  keywords: [
    'tech youtube title',
    'tech review title generator',
    'unboxing title',
    'tech comparison title ideas',
    'product review title generator',
    'how to tutorial title',
    'tech channel title ideas',
    'youtube tech seo',
  ],
};

const examplesByCategory = [
  {
    category: 'Product Reviews',
    examples: [
      'iPhone 17 Pro Max Review — Is It Actually Worth $1,200?',
      'I Used the Galaxy S26 for 30 Days — Here Is My Honest Opinion',
      'The Best Budget Laptop of 2026 (Under $500)',
    ],
  },
  {
    category: 'Unboxing Videos',
    examples: [
      'Unboxing the Most Expensive Gaming Setup on Amazon ($10,000)',
      'Apple Vision Pro 2 Unboxing — First Impressions and Setup',
      'I Bought Every Gadget Under $50 on Amazon — Are They Worth It?',
    ],
  },
  {
    category: 'Comparison & Versus',
    examples: [
      'iPhone 17 vs Samsung S26 — Which One Should You Actually Buy?',
      'MacBook Air M5 vs Dell XPS 15 — The REAL Difference',
      'Best Wireless Earbuds 2026: AirPods Pro 3 vs Galaxy Buds 4 vs Sony WF',
    ],
  },
  {
    category: 'How-To Tutorials',
    examples: [
      'How to Speed Up Your PC in 5 Minutes (Free, No Downloads)',
      'Set Up a Home Server for FREE — Complete Beginner Guide',
    ],
  },
];

const tips = [
  {
    title: 'Lead with the product or brand name',
    description:
      'Start your title with the specific product, brand, or technology. "iPhone 17 Pro Review" is instantly searchable, while "My New Phone Review" is vague and gets buried in results.',
  },
  {
    title: 'Use definitive language',
    description:
      'Words like "best", "ultimate", "honest", "real", and "actual" signal authority. Tech viewers want confident, informed opinions — not wishy-washy takes. "The BEST Budget Laptop" outperforms "A Good Budget Laptop".',
  },
  {
    title: 'Include the year or model number',
    description:
      'Tech content has a short shelf life. Adding "2026" or the model number ("M5", "S26", "RTX 5090") signals fresh content and captures time-specific searches that peak around launch windows.',
  },
  {
    title: 'Add a price point or budget angle',
    description:
      'Budget-conscious viewers search for price-specific content. "Best Laptop Under $500" or "Is This $200 Phone Worth It?" immediately qualifies the audience and drives higher CTR.',
  },
  {
    title: 'Create versus and comparison hooks',
    description:
      'Comparison titles like "X vs Y" are among the highest-searched tech queries. Viewers deciding between products actively search these terms and have high engagement rates.',
  },
  {
    title: 'Ask a question the viewer wants answered',
    description:
      'Titles like "Is It Worth It?" or "Should You Buy This?" mirror exactly what viewers type into YouTube search. Question-based titles align with search intent and boost click-through rates.',
  },
];

const faqs = [
  {
    question: 'What makes a good tech YouTube title?',
    answer:
      'A good tech YouTube title includes the product or brand name, specifies the content type (review, unboxing, comparison, tutorial), adds a hook or opinion, and stays under 65 characters. It should clearly tell viewers what they will learn or see.',
  },
  {
    question: 'How do I title an unboxing video for maximum views?',
    answer:
      'For unboxing videos, include the product name, add a price or exclusivity angle, and hint at your reaction. "Unboxing the $3,000 Gaming PC — Was It Worth It?" is more clickable than "New PC Unboxing".',
  },
  {
    question: 'Should I include the year in my tech video titles?',
    answer:
      'Yes, especially for reviews and comparisons. Adding the year or model number signals fresh content and catches viewers searching for the latest information. "Best Phones 2026" gets more clicks than evergreen-only titles.',
  },
  {
    question: 'Is this tech title generator free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, and no hidden fees. Generate unlimited tech video titles powered by AI.',
  },
  {
    question: 'Can I use this for software tutorials and how-to videos?',
    answer:
      'Absolutely! The AI title generator works for all tech content including product reviews, unboxing, comparisons, software tutorials, coding guides, setup guides, and troubleshooting videos.',
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
      name: 'YouTube Title Generator for Tech — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-tech',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator specifically designed for tech channels. Generate optimized titles for product reviews, unboxing, comparisons, and how-to tutorial videos.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function TechTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Tech</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Generate high-CTR titles for product reviews, unboxing videos, tech comparisons, and how-to tutorials. Powered by AI, built for tech creators.
          </p>
          <div className="text-left mt-8">
            <TitleGeneratorClient niche="tech" />
          </div>
        </section>

        {/* Why tech titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Tech Title Determines Your Video&apos;s Success
          </h2>
          <p className="text-slate-600 mb-4">
            Tech is one of the most competitive niches on YouTube. Every product launch triggers hundreds of review, unboxing, and comparison videos — all fighting for the same audience. The title is what separates a 500-view video from a 500K-view video.
          </p>
          <p className="text-slate-600 mb-4">
            A bland title like &ldquo;Phone Review&rdquo; gets completely lost. But &ldquo;iPhone 17 Pro Max Review — Is It Actually Worth $1,200?&rdquo; immediately tells the viewer the product, the format, and raises a question they need answered.
          </p>
          <p className="text-slate-600">
            Effective tech titles combine <strong className="text-slate-900">the product name</strong>, a <strong className="text-slate-900">clear content format</strong>, and a <strong className="text-slate-900">compelling hook or question</strong>. That&apos;s exactly what our AI generates for you.
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
            6 Best Practices for Tech Video SEO Titles
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
            How Our Tech Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your tech topic</strong> — describe your product review, unboxing, or tutorial.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 titles</strong> — each optimized with SEO keywords, emojis, and hooks specific to tech content.</span>
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
              href="/tools/youtube-title-generator-for-gaming"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎮 Title Generator for Gaming</span>
              <p className="text-slate-600 text-sm mt-1">Create click-worthy titles for gameplay walkthroughs, challenges, and reviews.</p>
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
              <p className="text-slate-600 text-sm mt-1">Generate optimized tags for your tech review and tutorial videos.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube SEO for Tech Channels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-titles-that-get-clicks"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Titles</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                How to Write YouTube Titles That Actually Get Clicks
              </h3>
            </Link>
            <Link
              href="/blog/youtube-seo-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">SEO</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                The Complete YouTube SEO Guide for Creators
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
