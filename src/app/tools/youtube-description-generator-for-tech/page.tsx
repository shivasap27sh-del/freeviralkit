import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import DescriptionGeneratorClient from '@/components/tools/DescriptionGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Description Generator for Tech Videos',
  description:
    'Free AI-powered YouTube description generator for tech channels. Create SEO-optimized descriptions for product reviews, unboxings, comparisons, tutorials, and tech news videos.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-description-generator-for-tech'),
  },
  openGraph: {
    title: 'YouTube Description Generator for Tech Videos',
    description:
      'Generate structured, SEO-friendly descriptions for tech YouTube videos. Cover specs, timestamps, affiliate links, and CTAs — all free.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-description-generator-for-tech'),
  },
  keywords: [
    'tech video description',
    'product review description',
    'tech youtube description',
    'youtube description generator tech',
    'unboxing video description',
    'tech review seo',
    'youtube tech channel description',
    'comparison video description',
  ],
};

const examplesByCategory = [
  {
    category: 'Product Reviews',
    examples: [
      'In this video, I review the Samsung Galaxy S26 Ultra after 30 days of real-world use. I cover camera quality, battery life, display performance, and whether it\'s worth the $1,199 price tag.',
      'Full review of the MacBook Air M4 — benchmarks, thermals, real-world performance, and who should buy it vs. the MacBook Pro.',
    ],
  },
  {
    category: 'Unboxing & First Impressions',
    examples: [
      'Unboxing the Sony WH-1000XM6 noise-cancelling headphones! First impressions on build quality, comfort, ANC performance, and sound signature.',
      'I just received the Nothing Phone 3 — here\'s my unboxing, setup walkthrough, and first 24-hour impressions.',
    ],
  },
  {
    category: 'Comparisons & Versus',
    examples: [
      'iPhone 17 Pro vs Samsung Galaxy S26 Ultra — the ultimate camera, performance, and battery comparison. Which flagship wins in 2026?',
      'M4 MacBook Pro vs Dell XPS 16: Which laptop should you actually buy? I test both side-by-side.',
    ],
  },
  {
    category: 'Tutorials & How-To',
    examples: [
      'Step-by-step guide to building a budget gaming PC under $800 in 2026. Parts list, assembly walkthrough, benchmarks, and tips for first-time builders.',
      'How to set up a home network with mesh Wi-Fi — complete beginner tutorial covering hardware, placement, and speed optimization.',
    ],
  },
];

const tips = [
  {
    title: 'Lead with a 2–3 sentence hook',
    description:
      'The first 150 characters of your description appear in search results. Start with a compelling summary that includes your primary keyword. Don\'t waste this space with "Hey guys, welcome back to my channel."',
  },
  {
    title: 'Include product specs and model numbers',
    description:
      'Tech viewers search for specific model numbers (e.g., "RTX 5070 review"). Including specs and exact model names in your description captures long-tail search traffic competitors miss.',
  },
  {
    title: 'Add timestamps for every section',
    description:
      'Timestamps generate YouTube Chapters, which improve user experience and make your video eligible for key-moment rich snippets in Google Search. They also boost average view duration.',
  },
  {
    title: 'Structure affiliate links clearly',
    description:
      'Place affiliate and purchase links in a clearly labeled section. Use descriptive labels like "🛒 Buy Samsung Galaxy S26 Ultra" instead of raw URLs. Transparency builds trust and improves click-through.',
  },
  {
    title: 'Add a resources section',
    description:
      'Link to previous videos, written reviews, spec sheets, or tools you mentioned. This creates a web of internal links and keeps viewers in your content ecosystem longer.',
  },
  {
    title: 'Close with a subscribe CTA',
    description:
      'End your description with a clear call-to-action: subscribe, turn on notifications, or check out your tech playlist. Descriptions that include CTAs see 18% higher subscriber conversion.',
  },
];

const faqs = [
  {
    question: 'What should a tech video description include?',
    answer:
      'A strong tech video description should include: a keyword-rich opening summary (150 characters), timestamps for chapters, product specs and model numbers, affiliate/purchase links, links to related videos, social media links, and a subscribe CTA.',
  },
  {
    question: 'How long should a tech YouTube description be?',
    answer:
      'Aim for 200–500 words. YouTube indexes up to 5,000 characters, so longer descriptions with relevant keywords perform better in search. Include timestamps, specs, and links to fill the space meaningfully.',
  },
  {
    question: 'Do descriptions help tech videos rank better?',
    answer:
      'Absolutely. YouTube uses your description to understand video content and match it to search queries. Tech descriptions with specific model names, specs, and comparison keywords rank significantly higher than generic ones.',
  },
  {
    question: 'Is this tech description generator free?',
    answer:
      'Yes, FreeViralKit is 100% free to use. No signup, no credit card, no hidden fees. Generate unlimited tech video descriptions powered by AI.',
  },
  {
    question: 'Can I use this for product reviews and unboxing videos?',
    answer:
      'Yes! The generator works for all tech content types — product reviews, unboxings, comparisons, tutorials, build guides, tech news, and more. Just describe your video topic and get an optimized description.',
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
      name: 'YouTube Description Generator for Tech Videos \u2014 FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-description-generator-for-tech',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube description generator designed for tech channels. Create structured, SEO-optimized descriptions for reviews, unboxings, comparisons, and tutorials.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function TechDescriptionLandingPage() {
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
            YouTube Description Generator for <span className="text-gradient">Tech</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Create structured, SEO-optimized descriptions for product reviews, unboxings, comparisons, and tech tutorials. Powered by AI, always free.
          </p>
          <div className="text-left mt-8">
            <DescriptionGeneratorClient niche="tech" />
          </div>
        </section>

        {/* Why tech descriptions matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Tech Video Descriptions Are Different
          </h2>
          <p className="text-slate-600 mb-4">
            Tech viewers are researchers. They search for specific product names, model numbers, and comparison queries before making a purchase decision. Your description is where YouTube (and Google) finds those keywords.
          </p>
          <p className="text-slate-600 mb-4">
            A well-structured tech description doesn&apos;t just help with SEO — it builds viewer trust. When someone sees organized timestamps, clear product links, and detailed specs in your description, they know you&apos;re a credible source.
          </p>
          <p className="text-slate-600">
            The best tech descriptions combine <strong className="text-slate-900">keyword-rich summaries</strong>, <strong className="text-slate-900">structured timestamps</strong>, and <strong className="text-slate-900">clear affiliate/purchase links</strong>. That&apos;s exactly what our AI builds for you.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Descriptions</h2>
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
            6 Best Practices for Tech Video Descriptions
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
            How Our Tech Description Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your video topic</strong> — describe the product, comparison, or tutorial you&apos;re covering.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates a structured description</strong> — with SEO summary, timestamps template, specs section, and CTAs.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Customize and publish</strong> — edit the timestamps, add your links, and paste into YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-description-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Description Generator
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
              href="/youtube-title-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">✏️ YouTube Title Generator</span>
              <p className="text-slate-600 text-sm mt-1">Create click-worthy titles for your tech reviews and comparisons.</p>
            </Link>
            <Link
              href="/tools/youtube-description-generator-for-education"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📚 Description Generator for Education</span>
              <p className="text-slate-600 text-sm mt-1">Write structured educational descriptions with learning outcomes and CTAs.</p>
            </Link>
            <Link
              href="/youtube-description-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📝 YouTube Description Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate SEO-optimized descriptions for any YouTube video niche.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About YouTube Descriptions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-description-tips"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Descriptions</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Description Tips: Write Descriptions That Rank
              </h3>
            </Link>
            <Link
              href="/blog/youtube-seo-guide"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">SEO</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube SEO Guide: Rank Higher and Get More Views
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
