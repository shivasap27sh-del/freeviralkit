import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import TitleGeneratorClient from '@/components/tools/TitleGeneratorClient';

export const metadata: Metadata = {
  title: 'YouTube Title Generator for Beauty & Makeup',
  description:
    'Free AI-powered YouTube title generator for beauty and makeup channels. Create viral titles for GRWM, skincare routines, product reviews, makeup tutorials, and transformation videos.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-title-generator-for-beauty'),
  },
  openGraph: {
    title: 'YouTube Title Generator for Beauty & Makeup',
    description:
      'Generate beauty YouTube titles that get clicks and views. GRWM, tutorials, reviews, skincare, and transformations — optimized by AI.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-title-generator-for-beauty'),
  },
  keywords: [
    'beauty youtube title',
    'makeup tutorial title',
    'skincare video title',
    'beauty video title generator',
    'grwm title ideas',
    'makeup video seo',
    'beauty channel title ideas',
    'beauty youtube seo',
  ],
};

const examplesByCategory = [
  {
    category: 'GRWM (Get Ready With Me)',
    examples: [
      'GRWM for a First Date — Soft Glam Makeup + Outfit',
      'Get Ready With Me: Everyday 10-Minute Makeup Routine',
      'GRWM Using ONLY Drugstore Products Under $5',
    ],
  },
  {
    category: 'Skincare Routines',
    examples: [
      'My Dermatologist-Approved Skincare Routine for Acne-Prone Skin',
      'I Tried a 10-Step Korean Skincare Routine for 30 Days — Results',
    ],
  },
  {
    category: 'Product Reviews & Hauls',
    examples: [
      'I Tried Every NEW Sephora Launch — Here Are the Winners and Losers',
      'Honest Review: Is the Rare Beauty Blush Actually Worth the Hype?',
      '$500 Ulta Haul — Testing Everything for a Week',
    ],
  },
  {
    category: 'Transformations & Tutorials',
    examples: [
      'Turning Myself Into Margot Robbie Using ONLY Makeup',
      'How to Do a Perfect Smokey Eye in 5 Minutes (Beginner-Friendly)',
    ],
  },
];

const tips = [
  {
    title: 'Name the specific look or technique',
    description:
      'Viewers search for exact looks: "soft glam tutorial," "glass skin routine," "cut crease tutorial." Naming the technique in your title captures these high-intent searches directly.',
  },
  {
    title: 'Use GRWM and trending format names',
    description:
      '"GRWM," "Get Ready With Me," "Testing," and "Trying" are high-volume search terms in the beauty niche. Using these format keywords signals the video style and attracts the right audience.',
  },
  {
    title: 'Include product or brand names',
    description:
      'Beauty viewers search for specific brands and products. "Charlotte Tilbury Pillow Talk Review" or "Drunk Elephant vs. CeraVe" captures purchase-intent traffic that converts to high watch time.',
  },
  {
    title: 'Add relatable constraints',
    description:
      'Titles with constraints create instant curiosity: "Using ONLY $1 Makeup," "5-Minute Makeup Challenge," "No Foundation Routine." Constraints make your video stand out in a sea of tutorials.',
  },
  {
    title: 'Show transformation or results',
    description:
      'Titles that promise a visible result perform best: "This Serum Cleared My Acne in 2 Weeks" or "Turning Myself Into a Celebrity." Viewers want to see the before-and-after payoff.',
  },
  {
    title: 'Keep it conversational',
    description:
      'The beauty community thrives on authenticity. Titles like "My Honest Foundation Routine" or "Why I Stopped Using This Product" feel more genuine than corporate-sounding alternatives.',
  },
];

const faqs = [
  {
    question: 'How do I title a makeup review so it ranks in YouTube Search?',
    answer:
      'Always use the exact product name, shade, and brand. Don\'t just say "New Foundation Review". Say "Fenty Beauty Pro Filt\'r Soft Matte Foundation Review (Shade 290)". This captures the exact long-tail search intent of a buyer.',
  },
  {
    question: 'Should I put my skin type in the title?',
    answer:
      'Yes, especially for skincare and foundation reviews. Including "For Oily Skin" or "Acne Prone Skin" creates an immediate connection with viewers who share your skin type, significantly boosting click-through rates and watch time.',
  },
  {
    question: 'How do I title a GRWM (Get Ready With Me) video?',
    answer:
      'A GRWM title needs a secondary hook—usually the occasion or a topic you discuss. "GRWM: First Date Makeup + Storytime" or "GRWM: My 10-Minute Morning Routine for College" performs much better than just "GRWM".',
  },
  {
    question: 'Do negative titles work well in the beauty community?',
    answer:
      'Yes, "Anti-Hauls" or "Products I Regret Buying" are incredibly popular because they save the viewer money and offer a refreshing break from constant sponsorships. Just ensure you are honest and constructive.',
  },
  {
    question: 'How do I title a "dupes" video?',
    answer:
      'Clearly state the expensive product and the cheap alternative. "Charlotte Tilbury Flawless Filter DUPE? (Only $6!)" creates massive curiosity by promising luxury results at a drugstore price.',
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
      name: 'YouTube Title Generator for Beauty & Makeup — FreeViralKit',
      url: 'https://freeviralkit.com/tools/youtube-title-generator-for-beauty',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Web',
      description:
        'Free AI-powered YouTube title generator for beauty and makeup channels. Create viral-worthy titles for GRWM, skincare routines, product reviews, tutorials, and transformation videos.',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
  ],
};

export default function BeautyTitleLandingPage() {
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
            YouTube Title Generator for <span className="text-gradient">Beauty</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Create viral titles for GRWM, makeup tutorials, skincare routines, product reviews, and transformation videos. Powered by AI, always free.
          </p>
          <div className="text-left mt-8">
            <TitleGeneratorClient niche="beauty" />
          </div>
        </section>

        {/* Why beauty titles matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Your Beauty Title Determines Your Video&apos;s Success
          </h2>
          <p className="text-slate-600 mb-4">
            The beauty niche on YouTube is massive — and fiercely competitive. With thousands of makeup tutorials, skincare routines, and product reviews uploaded daily, your title is the single biggest factor that determines whether someone clicks your video or scrolls past it.
          </p>
          <p className="text-slate-600 mb-4">
            Beauty viewers are searching with high intent. They&apos;re looking for &ldquo;best drugstore foundation for oily skin&rdquo; or &ldquo;GRWM everyday makeup.&rdquo; If your title matches their search query naturally, YouTube rewards you with higher rankings and more recommendations.
          </p>
          <p className="text-slate-600">
            Great beauty titles combine a <strong className="text-slate-900">specific look or technique</strong>, a <strong className="text-slate-900">relatable constraint</strong>, and <strong className="text-slate-900">authentic language</strong>. That&apos;s exactly what our AI generates for you.
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
            6 Best Practices for Beauty Video Titles
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
            How Our Beauty Title Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Enter your beauty topic</strong> — describe the look, product, routine, or tutorial you&apos;re creating.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates 10 optimized titles</strong> — each crafted with beauty keywords, trending formats, and engagement hooks.</span>
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
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Find trending beauty and makeup hashtags to boost your video&apos;s reach.</p>
            </Link>
            <Link
              href="/youtube-description-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">📝 YouTube Description Generator</span>
              <p className="text-slate-600 text-sm mt-1">Write SEO-optimized descriptions with product links, timestamps, and affiliate sections.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About Beauty Video SEO
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
              href="/blog/youtube-ctr-secrets"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">CTR</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube CTR Secrets: How to Get More Clicks on Every Video
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
