import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';

export const metadata: Metadata = {
  title: 'YouTube Shorts Hashtag Generator | Free Viral Hashtags — FreeViralKit',
  description:
    'Free AI-powered hashtag generator built for YouTube Shorts. Find trending, viral hashtags that boost Shorts visibility, reach the Shorts shelf, and grow your channel fast.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools/youtube-hashtag-generator-for-shorts'),
  },
  openGraph: {
    title: 'YouTube Shorts Hashtag Generator | Free Viral Hashtags — FreeViralKit',
    description:
      'Generate trending hashtags specifically optimized for YouTube Shorts. Reach more viewers, land on the Shorts shelf, and go viral.',
    type: 'website',
    url: buildAbsoluteUrl('/tools/youtube-hashtag-generator-for-shorts'),
  },
  keywords: [
    'shorts hashtags',
    'youtube shorts hashtag',
    'viral shorts hashtags',
    'youtube shorts hashtag generator',
    'trending shorts hashtags',
    'best hashtags for youtube shorts',
    'shorts shelf hashtags',
    'short video hashtags',
  ],
};

const examplesByCategory = [
  {
    category: 'Trending & Viral',
    examples: [
      '#Shorts #Viral #TrendingShorts #FYP',
      '#ViralShorts #ShortsFeed #YouTubeShorts2026',
      '#TrendingNow #ShortVideo #GoViral',
    ],
  },
  {
    category: 'Comedy & Entertainment',
    examples: [
      '#FunnyShorts #ComedyShorts #Relatable #LOL',
      '#SkitComedy #FunnyMoments #Shorts',
    ],
  },
  {
    category: 'Educational & How-To',
    examples: [
      '#LearnOnShorts #DidYouKnow #QuickTips #LifeHack',
      '#FactsShorts #KnowledgeShorts #HowTo',
    ],
  },
  {
    category: 'Gaming & Tech',
    examples: [
      '#GamingShorts #GameClips #EpicMoments #Clutch',
      '#TechShorts #GadgetReview #TechTips #Shorts',
    ],
  },
];

const tips = [
  {
    title: 'Always include #Shorts',
    description:
      'The #Shorts hashtag signals YouTube that your video belongs on the Shorts shelf. While YouTube can detect vertical video automatically, adding #Shorts in your title or description removes all doubt and improves shelf placement.',
  },
  {
    title: 'Mix broad and niche hashtags',
    description:
      'Use 1–2 high-volume hashtags (#Shorts, #Viral) and 2–3 niche-specific ones (#CookingShorts, #MinecraftClutch). Broad tags give reach; niche tags give relevance and better conversion.',
  },
  {
    title: 'Limit hashtags to 3–5 per Short',
    description:
      'YouTube officially recommends no more than 15 hashtags per video, but data shows Shorts perform best with 3–5 focused hashtags. Too many dilute relevance signals.',
  },
  {
    title: 'Place hashtags in the title',
    description:
      'Hashtags in the Shorts title appear as clickable links above the video. This is prime real estate — viewers can tap on them to discover related content, and your Short rides that hashtag feed.',
  },
  {
    title: 'Ride trending hashtag waves',
    description:
      'When a new trend breaks — a dance, a meme format, a sound — use the trending hashtag within the first 24–48 hours. Early adoption gets exponentially more shelf impressions.',
  },
  {
    title: 'Avoid banned or spammy hashtags',
    description:
      'Hashtags like #FollowForFollow or misleading tags can trigger YouTube spam filters. Stick to relevant, descriptive hashtags that accurately represent your content.',
  },
];

const faqs = [
  {
    question: 'Do hashtags actually help YouTube Shorts get more views?',
    answer:
      'Yes. Hashtags help YouTube categorize your Short and surface it on relevant hashtag landing pages and the Shorts shelf. Creators who use 3–5 targeted hashtags consistently see 15–30% more impressions compared to Shorts with no hashtags.',
  },
  {
    question: 'How many hashtags should I use on a YouTube Short?',
    answer:
      'Use 3–5 hashtags per Short for the best results. Always include #Shorts plus 2–4 niche-relevant tags. Adding more than 5 rarely helps and can actually hurt discoverability by diluting relevance signals.',
  },
  {
    question: 'Where should I put hashtags — title or description?',
    answer:
      'For Shorts, putting hashtags in the title is most effective because they appear as clickable links above the video. You can place additional hashtags in the description, but the title placement gets the most visibility.',
  },
  {
    question: 'Is the Shorts hashtag generator free?',
    answer:
      'Absolutely. FreeViralKit is 100% free — no signup, no credit card, no hidden fees. Generate unlimited hashtag sets for your Shorts powered by AI.',
  },
  {
    question: 'Can I use the same hashtags on every Short?',
    answer:
      "You can, but you shouldn't. Rotating hashtags keeps your content fresh in YouTube's algorithm and lets you tap into different audience segments. Use a core set (like #Shorts) and rotate niche-specific tags.",
  },
];

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

const toolJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'YouTube Shorts Hashtag Generator — FreeViralKit',
  url: 'https://freeviralkit.com/tools/youtube-hashtag-generator-for-shorts',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web',
  description:
    'Free AI-powered hashtag generator specifically designed for YouTube Shorts. Generate trending, viral hashtags to boost Shorts shelf placement and views.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ShortsHashtagLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            YouTube Hashtag Generator for <span className="text-gradient">Shorts</span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-6">
            Find the perfect trending hashtags to get your Shorts on the shelf, boost impressions, and go viral. AI-powered, always free.
          </p>
          <Link
            href="/youtube-hashtag-generator"
            className="btn-primary inline-flex rounded-xl px-6 py-3.5 font-semibold text-lg"
          >
            Generate Shorts Hashtags Free →
          </Link>
        </section>

        {/* Why Shorts hashtags matter */}
        <section className="glass-card rounded-2xl p-6 md:p-8 mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Why Hashtags Are Critical for YouTube Shorts Success
          </h2>
          <p className="text-slate-600 mb-4">
            YouTube Shorts compete in one of the fastest-moving feeds on the internet. Every day, over 70 billion Shorts are watched globally. In that ocean of content, hashtags act as your compass — they tell the algorithm exactly who should see your Short.
          </p>
          <p className="text-slate-600 mb-4">
            Unlike long-form videos where SEO relies heavily on descriptions and tags, Shorts discovery is driven by the Shorts shelf algorithm. Hashtags are one of the strongest relevance signals the algorithm uses to categorize and recommend your content.
          </p>
          <p className="text-slate-600">
            The right combination of <strong className="text-slate-900">trending hashtags</strong>, <strong className="text-slate-900">niche-specific tags</strong>, and <strong className="text-slate-900">the #Shorts identifier</strong> can mean the difference between 100 views and 1 million views.
          </p>
        </section>

        {/* Examples by category */}
        {examplesByCategory.map((cat) => (
          <section key={cat.category} className="glass-card rounded-2xl p-6 md:p-8 mb-4">
            <h2 className="font-display text-lg font-semibold mb-3">{cat.category} Hashtags</h2>
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
            6 Best Practices for YouTube Shorts Hashtags
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
            How Our Shorts Hashtag Generator Works
          </h2>
          <ol className="space-y-3 text-slate-600">
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">1</span>
              <span><strong className="text-slate-900">Describe your Short</strong> — enter the topic, niche, or trend your video covers.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">2</span>
              <span><strong className="text-slate-900">AI generates optimized hashtag sets</strong> — mixing trending, niche, and shelf-boosting hashtags.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-7 h-7 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-sm font-bold text-purple-500 shrink-0">3</span>
              <span><strong className="text-slate-900">Copy and paste</strong> — add them to your Shorts title or description in YouTube Studio.</span>
            </li>
          </ol>
          <div className="mt-6">
            <Link
              href="/youtube-hashtag-generator"
              className="btn-primary inline-flex rounded-xl px-5 py-3 font-semibold"
            >
              Open Full Hashtag Generator
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
              href="/youtube-shorts-idea-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🎬 YouTube Shorts Idea Generator</span>
              <p className="text-slate-600 text-sm mt-1">Get viral-worthy Shorts ideas tailored to your niche in seconds.</p>
            </Link>
            <Link
              href="/youtube-hashtag-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">#️⃣ YouTube Hashtag Generator</span>
              <p className="text-slate-600 text-sm mt-1">Generate optimized hashtags for all YouTube video formats — long-form and Shorts.</p>
            </Link>
            <Link
              href="/youtube-tags-generator"
              className="block p-4 rounded-xl bg-slate-50 border border-slate-200 hover:border-purple-500/30 transition-all"
            >
              <span className="font-semibold text-slate-900">🏷️ YouTube Tags Generator</span>
              <p className="text-slate-600 text-sm mt-1">Boost discoverability with AI-generated tags for any YouTube video.</p>
            </Link>
          </div>
        </section>

        {/* Related blog posts */}
        <section className="mb-8">
          <h2 className="font-display text-xl font-semibold mb-4">
            Learn More About Shorts SEO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link
              href="/blog/youtube-shorts-viral-secrets"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Shorts</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Shorts Viral Secrets: What Actually Works in 2026
              </h3>
            </Link>
            <Link
              href="/blog/youtube-hashtag-strategy"
              className="glass-card rounded-xl p-5 group hover:border-purple-500/30 transition-all"
            >
              <span className="text-xs text-purple-400 font-medium">Hashtags</span>
              <h3 className="font-display text-sm font-bold mt-1 group-hover:text-purple-400 transition-colors leading-snug">
                YouTube Hashtag Strategy: The Complete Guide
              </h3>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
