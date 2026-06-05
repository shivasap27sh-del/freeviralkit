import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import HashtagGeneratorClient from '@/components/tools/HashtagGeneratorClient';
import { Hash } from 'lucide-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Free YouTube Hashtag Generator — Trending Hashtags for More Views',
  description:
    'Generate trending YouTube hashtags instantly with our free AI hashtag generator. Get 15+ niche-specific hashtags ranked by traffic potential — no signup required.',
  openGraph: {
    title: 'Free YouTube Hashtag Generator — Trending Hashtags for More Views',
    description:
      'Generate trending YouTube hashtags instantly. Get 15+ niche-specific hashtags ranked by traffic potential — completely free.',
    url: buildAbsoluteUrl('/youtube-hashtag-generator'),
    type: 'website',
  },
  alternates: {
    canonical: buildAbsoluteUrl('/youtube-hashtag-generator'),
  },
  keywords: [
    'youtube hashtag generator',
    'free youtube hashtag generator',
    'youtube hashtags generator',
    'best hashtags for youtube',
    'trending youtube hashtags',
    'youtube hashtag finder',
    'hashtags for youtube videos',
    'youtube shorts hashtags',
    'youtube hashtag strategy',
    'youtube hashtag tool',
  ],
};

const faqItems = [
  {
    question: 'How do YouTube hashtags work?',
    answer:
      'YouTube hashtags are clickable keywords preceded by the # symbol that you add to your video title or description. When viewers click a hashtag, they see a results page with all videos using that same hashtag. The first three hashtags in your description appear as clickable blue links directly above your video title, giving you prime visibility.',
  },
  {
    question: 'How many hashtags should I use on YouTube?',
    answer:
      'YouTube recommends using no more than 15 hashtags per video. Using more than 15 will cause YouTube to ignore all of them. The sweet spot for most creators is 8-15 hashtags — enough to cover broad and niche categories without appearing spammy. Your three strongest, most relevant hashtags should come first since those appear above the title.',
  },
  {
    question: 'Do hashtags actually help YouTube videos get more views?',
    answer:
      'Yes, hashtags provide an additional discovery pathway. When a viewer clicks a hashtag on any video, your video may appear in those results. Hashtags also help YouTube understand your content for search and recommendation purposes. While hashtags alone will not make a video go viral, they contribute to your overall discoverability alongside strong titles, descriptions, and tags.',
  },
  {
    question: 'What is the difference between YouTube hashtags and tags?',
    answer:
      'Hashtags appear visibly in your title or description and are clickable by viewers. Tags are hidden metadata added in the upload settings. Hashtags directly create browsable topic pages, while tags primarily help YouTube understand your content context. Both serve SEO purposes, but hashtags offer the added benefit of being a visible, clickable discovery tool for viewers.',
  },
  {
    question: 'Should I use the same hashtags on every video?',
    answer:
      'No. Using identical hashtags on every video reduces their effectiveness and can look spammy to the algorithm. While you might reuse 2-3 brand-specific or channel-related hashtags, the majority should be tailored to each video\'s specific topic, keywords, and target audience. Our generator creates unique hashtag sets for every topic.',
  },
  {
    question: 'Do hashtags work on YouTube Shorts?',
    answer:
      'Absolutely. Hashtags are especially powerful for YouTube Shorts because the Shorts algorithm heavily relies on topic signals to distribute content. Adding #Shorts along with 3-5 niche-specific hashtags helps the algorithm surface your Short to the right audience. Many viral Shorts owe part of their reach to strategic hashtag usage.',
  },
  {
    question: 'Can hashtags hurt my YouTube video?',
    answer:
      'Hashtags can hurt your video if you use irrelevant or misleading ones, exceed 15 total, or use hashtags that violate YouTube\'s community guidelines. Using trending but unrelated hashtags is considered spam and can result in your video being removed from search results. Always ensure every hashtag is genuinely relevant to your video content.',
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

export default function HashtagGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-400/20 mb-6 uppercase tracking-wider">
            <Hash className="w-4 h-4" /> AI Hashtag Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
            Free YouTube Hashtag Generator — <span className="text-gradient">Trending Hashtags Instantly</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate trending YouTube hashtags instantly with our free AI hashtag generator. Enter your video topic and get 15+ niche-specific hashtags ranked by traffic potential — completely free, no account required.
          </p>
        </section>

        <HashtagGeneratorClient />

        {/* Educational Content */}
        <section className="mt-16 space-y-10">
          <div>
            <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-slate-900 dark:text-white">
              Understanding YouTube Hashtags and Why They Matter
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                YouTube hashtags are one of the most underutilized discovery tools on the platform. While most creators focus heavily on titles, thumbnails, and tags, hashtags offer a unique advantage: they create <strong className="text-slate-900 dark:text-white">clickable, browsable topic pages</strong> that viewers actively explore. When someone clicks a hashtag on any video, they land on a curated feed of all videos using that hashtag — and your video could be among them.
              </p>
              <p>
                YouTube introduced hashtags to help organize the massive volume of content uploaded every day. With over 800 million videos on the platform, helping viewers find relevant content is a constant challenge. Hashtags solve this by creating topic-level groupings that cut across channels, subscriber counts, and upload dates. A small channel using the right hashtag can appear alongside videos from creators with millions of subscribers.
              </p>
              <p>
                The most important thing to understand about YouTube hashtags is their placement. When you add hashtags to your video description, <strong className="text-slate-900 dark:text-white">the first three automatically appear as clickable blue links above your video title</strong>. This is premium real estate — it&apos;s visible before the viewer even reads your description, making those three slots critical for your hashtag strategy.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              How to Build an Effective Hashtag Strategy
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                A strong hashtag strategy balances three categories: <strong className="text-slate-900 dark:text-white">broad hashtags</strong> with high search volume, <strong className="text-slate-900 dark:text-white">niche hashtags</strong> targeting your specific audience, and <strong className="text-slate-900 dark:text-white">branded hashtags</strong> unique to your channel. Getting this mix right is what separates creators who gain traction from hashtags and those who see no results.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                Broad Hashtags for Maximum Exposure
              </h3>
              <p>
                Broad hashtags like #Cooking, #Gaming, or #Fitness have enormous search volumes. They expose your video to the widest possible audience, but the competition is fierce. Use 2-3 broad hashtags per video to cast a wide net, but don&apos;t rely on them alone — your video will be competing with millions of others for visibility in those feeds.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                Niche Hashtags for Targeted Discovery
              </h3>
              <p>
                Niche hashtags are where the real value lies. Instead of #Cooking, try #MealPrepForBeginners or #30MinuteDinners. These hashtags have lower competition but attract viewers who are actively searching for exactly what you offer. Viewers who find you through niche hashtags are more likely to watch the full video, subscribe, and return for more — they&apos;re your ideal audience.
              </p>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-white pt-2">
                Branded Hashtags for Channel Identity
              </h3>
              <p>
                Creating a unique hashtag for your channel or series builds a browsable library of your content. When viewers click your branded hashtag, they see only your videos — it&apos;s essentially a custom playlist that viewers create by clicking. This is especially powerful for series content, challenges, or recurring video formats.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Hashtag Best Practices Every Creator Should Follow
            </h2>
            <ul className="space-y-2 text-slate-600">
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Use <strong className="text-slate-900 dark:text-white">8-15 hashtags</strong> per video — enough for coverage without looking spammy</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Put your 3 strongest hashtags first — they appear above the title as clickable links</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Use CamelCase for multi-word hashtags (#HowToCook) for better readability</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Mix popular broad hashtags with niche-specific ones for balanced discovery</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Never use irrelevant trending hashtags — YouTube may penalize your video</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Research hashtag competition — avoid oversaturated hashtags with millions of videos</span></li>
              <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Update hashtags on older videos that aren&apos;t performing well in search</span></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              YouTube Shorts and Hashtags: A Special Relationship
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                Hashtags play an outsized role in YouTube Shorts discovery. Unlike long-form videos where titles and thumbnails drive most clicks, Shorts rely heavily on the algorithm&apos;s ability to match content with interested viewers. Hashtags provide direct topic signals that help the Shorts algorithm understand and distribute your content more effectively.
              </p>
              <p>
                The #Shorts hashtag itself has been a subject of debate. While YouTube has stated it&apos;s not required for a video to be treated as a Short, many creators report better initial distribution when including it. Beyond #Shorts, adding <strong className="text-slate-900 dark:text-white">3-5 topic-specific hashtags</strong> to your Short&apos;s description gives the algorithm clear signals about who should see your content.
              </p>
              <p>
                For Shorts, trending hashtags become especially powerful. Because the Shorts feed is algorithmically curated and heavily influenced by trending topics, aligning your hashtags with current trends can dramatically boost your Short&apos;s reach. Our generator identifies trending hashtags in your niche so you can capitalize on what&apos;s hot right now.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Common Hashtag Mistakes That Limit Your Reach
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                The most common mistake creators make is <strong className="text-slate-900 dark:text-white">using more than 15 hashtags</strong>. YouTube explicitly states that exceeding this limit causes all hashtags to be ignored — not just the extras, but every single one. This effectively removes a discovery channel from your video entirely.
              </p>
              <p>
                Another frequent error is using hashtags only in the title instead of the description. While title hashtags work, they consume valuable character space that could be used for keywords and hooks. The best practice is to place hashtags at the bottom of your description where they don&apos;t interfere with your description&apos;s readability, while still getting the first three displayed above the title.
              </p>
              <p>
                Using spaces or special characters within hashtags breaks them. #How To Cook becomes just #How, losing the full phrase. Always write multi-word hashtags as a single string: #HowToCook. Similarly, avoid hashtags that are too long — #HowToCookItalianPastaFromScratchForBeginners is unwieldy and unlikely to be searched. Keep hashtags concise and searchable.
              </p>
            </div>
          </div>

          {/* Related Blog Posts */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              Deepen Your YouTube SEO Knowledge
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <Link
                href="/blog/youtube-hashtag-strategy"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Hashtag Strategy Guide
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Advanced strategies for hashtag research, placement, and optimization.
                </p>
              </Link>
              <Link
                href="/blog/do-youtube-hashtags-actually-help"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  Do YouTube Hashtags Actually Help?
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Data-driven analysis of hashtag impact on views and discoverability.
                </p>
              </Link>
              <Link
                href="/blog/youtube-shorts-seo"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Shorts SEO Guide
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  How to optimize Shorts for maximum reach with hashtags, titles, and more.
                </p>
              </Link>
              <Link
                href="/youtube-tags-generator"
                className="glass-card rounded-xl p-5 hover:border-pink-400/40 transition-colors group"
              >
                <h3 className="font-semibold text-slate-900 dark:text-white group-hover:text-pink-400 transition-colors mb-1">
                  YouTube Tags Generator →
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Generate SEO-optimized tags to complement your hashtag strategy.
                </p>
              </Link>
            </div>
          </div>

          {/* FAQ Section */}
          <div>
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <details
                  key={index}
                  className="glass-card rounded-xl group"
                >
                  <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                    {item.question}
                    <span className="text-pink-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Related Tools CTA */}
          <div className="glass-card rounded-2xl p-6 text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-4">Want the complete SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
                Try Full SEO Optimizer →
              </Link>
              <Link href="/youtube-title-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-pink-400/40 transition-colors">
                Title Generator
              </Link>
              <Link href="/youtube-description-generator" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-pink-400/40 transition-colors">
                Description Generator
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
