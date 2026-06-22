import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import HashtagGeneratorClient from '@/components/tools/HashtagGeneratorClient';
import { Hash } from 'lucide-react';
import Link from 'next/link';
import RelatedTools from '@/components/RelatedTools';


export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube Hashtag Generator',
    description: 'Generate trending YouTube hashtags instantly with our free AI hashtag generator. Get 15+ niche-specific hashtags ranked by traffic potential.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free AI YouTube Hashtag Generator',
  description:
    'Generate trending YouTube hashtags instantly with our free AI hashtag generator. Get 15+ niche-specific hashtags ranked by traffic potential.',
  openGraph: {
    title: 'Free YouTube Hashtag Generator — Trending Tags',
    description:
      'Generate trending YouTube hashtags instantly. Get 15+ niche-specific hashtags ranked by traffic potential — completely free.',
    url: buildAbsoluteUrl('/youtube-hashtag-generator'),
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


const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'YouTube Hashtag Generator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function HashtagGeneratorPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />

      <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
        {/* Hero */}
        <section className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-pink-400 bg-pink-400/10 border border-pink-400/20 mb-6 uppercase tracking-wider">
            <Hash className="w-4 h-4" /> AI Hashtag Generator
          </div>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4"> Free YouTube Hashtag Generator — Trending Hashtags Instantly </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Generate trending YouTube hashtags instantly with our free AI hashtag generator. Enter your video topic and get 15+ niche-specific hashtags ranked by traffic potential — completely free, no account required.
          </p>
        </section>

        <HashtagGeneratorClient />

        {/* Educational Content */}
        <section className="mt-16 space-y-12">
          <div>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-6 text-slate-900 dark:text-white">
              Understanding YouTube Hashtags and Why They Matter in 2026
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                YouTube hashtags are one of the most underutilized discovery tools on the platform today. While the vast majority of creators pour all their energy into perfecting their titles, tweaking their thumbnails, and stuffing backend tags, hashtags remain a critical yet frequently ignored piece of the optimization puzzle. They offer an entirely unique advantage: they create <strong className="text-slate-900 dark:text-white">clickable, browsable topic pages</strong> that viewers actively explore when looking for specific content or trends. When someone clicks a hashtag on any video, they immediately land on a curated feed of all videos utilizing that exact hashtag. Your video could easily be among them, acting as a powerful secondary entry point to your channel.
              </p>



              <p>
                To fully grasp why this is important, we must look at how YouTube organizes its massive library. With over 800 million videos currently hosted on the platform and millions more uploaded every single day, accurately categorizing content and helping viewers find what they actually want to watch is a monumental engineering challenge. Hashtags solve a piece of this puzzle by creating hyper-specific, topic-level groupings that cut across channel size, subscriber counts, and even upload dates. A relatively small, undiscovered channel using the right hashtag strategy can suddenly find their video sitting right alongside uploads from mega-creators with millions of subscribers. It levels the playing field in a way that standard search engine optimization sometimes struggles to achieve.
              </p>
              <p>
                The absolute most crucial element to understand about YouTube hashtags is their physical placement on the screen and how viewers interact with them. When you add hashtags anywhere in your video description, <strong className="text-slate-900 dark:text-white">the first three automatically surface as clickable blue links positioned directly above your video title</strong>. This is incredibly premium real estate. It is visible before the viewer even has to click &quot;show more&quot; to read your description. Making sure those three slots are occupied by your most relevant, high-converting terms is non-negotiable if you want to maximize your organic reach.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              How to Build an Unstoppable Hashtag Strategy
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                A truly effective, view-generating hashtag strategy is never just throwing random words into a description box and hoping for the best. It requires a balanced, deliberate approach that targets different levels of search intent. Specifically, it balances three distinct categories: <strong className="text-slate-900 dark:text-white">broad hashtags</strong> with massive global search volume, <strong className="text-slate-900 dark:text-white">niche hashtags</strong> that target your exact, hyper-specific demographic, and <strong className="text-slate-900 dark:text-white">branded hashtags</strong> that are entirely unique to your channel identity. Mastering this three-pronged mix is precisely what separates elite creators from everyone else.
              </p>

              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white pt-4">
                Broad Hashtags for Maximum Theoretical Exposure
              </h3>
              <p>
                Broad hashtags include massive, universally understood terms like #Cooking, #Gaming, #Fitness, or #Vlog. These terms naturally possess astronomical search volumes, sometimes numbering in the tens of millions of queries per month. Including them exposes your video to the widest possible theoretical audience. However, because they are so broad, the competition is extraordinarily fierce. If you only use broad hashtags, your video will be instantly buried under millions of other uploads. The correct approach is to use exactly 2 or 3 broad hashtags per video simply to cast a wide net and signal the general genre of your content to the algorithm, but you should never rely on them as your primary driver of traffic.
              </p>



              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white pt-4">
                Niche Hashtags for Targeted, High-Retention Discovery
              </h3>
              <p>
                Niche hashtags are the secret weapon of fast-growing channels. This is where the real algorithmic value lies. Instead of competing for a massive term like #Cooking, you should target hyper-specific phrases like #MealPrepForBeginners, #VeganKetoRecipes, or #30MinuteDinners. These specialized hashtags have significantly lower overall competition, meaning your video has a much higher chance of ranking at the top of the hashtag feed. More importantly, they attract viewers who are actively, specifically searching for the exact solution you provide. A viewer who finds your video through a niche hashtag is highly motivated; they are mathematically far more likely to watch the entire video, subscribe to your channel, and engage with your content. They are your ideal, high-retention audience.
              </p>

              <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white pt-4">
                Branded Hashtags for Channel Identity and Binge-Watching
              </h3>
              <p>
                Creating a completely unique hashtag for your channel name or a specific, ongoing series builds a beautifully browsable library of your content. When viewers click your branded hashtag (for example, #YourChannelNameCooks or #MyTechReviewSeries), they see absolutely nothing but your videos. It effectively functions as a custom, distraction-free playlist that viewers voluntarily enter. This is profoundly powerful for driving binge-watching sessions, which signals to the YouTube algorithm that your content keeps people on the platform for long periods. Every single video you upload should contain at least one branded hashtag.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8 border-t-4 border-t-pink-400">
            <h2 className="font-display text-2xl font-bold mb-6 text-slate-900 dark:text-white">
              The Ultimate Hashtag Best Practices Checklist
            </h2>
            <ul className="space-y-4 text-slate-600 text-lg">
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Target exactly <strong className="text-slate-900 dark:text-white">8 to 15 hashtags</strong> per upload. This provides enough algorithmic signals without triggering spam filters.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Stack your 3 absolute most critical hashtags at the very top of your list. These are the ones that will be visually displayed above your title.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Always use CamelCase formatting for multi-word phrases (e.g., #HowToCook instead of #howtocook) to improve accessibility and human readability.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Strategically mix high-volume broad hashtags with low-competition niche tags to create a diversified traffic portfolio.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Never, under any circumstances, use wildly irrelevant trending hashtags just to get views. YouTube&apos;s algorithm will detect this bounce rate and severely penalize the video&apos;s reach.</span></li>
              <li className="flex items-start gap-3"><span className="mt-2 w-2 h-2 rounded-full bg-pink-400 shrink-0" /><span className="dark:text-slate-300">Periodically audit and update the hashtags on your older, underperforming videos to align with current search trends.</span></li>
            </ul>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              YouTube Shorts and Hashtags: The Algorithmic Connection
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                If you are creating short-form content, you must understand that hashtags play a significantly outsized role in YouTube Shorts discovery compared to long-form content. On traditional videos, your thumbnail and your title do the heavy lifting of convincing a human being to click. However, the Shorts feed is a fundamentally different environment. Viewers do not click to watch a Short; the algorithm serves it to them directly in an endless, rapid-fire feed. Because of this, the algorithm relies incredibly heavily on backend metadata—specifically hashtags—to understand the exact context and target demographic for your Short.
              </p>
              <p>
                The inclusion of the #Shorts hashtag itself has been the subject of endless debate within the creator community. While YouTube engineers have officially stated that the #Shorts tag is not strictly mandatory for a vertical video to be indexed properly in the Shorts shelf, thousands of creators consistently report slightly faster initial indexing and wider early distribution when they include it. It is generally considered a best practice to keep it.
              </p>
              <p>
                Beyond simply tagging it as a Short, you must add <strong className="text-slate-900 dark:text-white">3 to 5 highly specific topical hashtags</strong> to the description of your Short. This provides the algorithm with the clear, unambiguous signals it needs to test your video with the right audience cohort. Because the Shorts feed is highly sensitive to real-time, viral trends, aligning your Shorts hashtags with current cultural moments or trending audio can result in explosive, exponential viewership growth. Our AI generator constantly monitors these micro-trends so you can capitalize on them before they fade.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Dangerous Hashtag Mistakes That Destroy Your Reach
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-6 text-lg">
              <p>
                The single most common, and most devastating, mistake creators make with hashtags is <strong className="text-slate-900 dark:text-white">exceeding the strict 15-hashtag limit</strong>. YouTube&apos;s official documentation explicitly states that if a video contains more than 15 hashtags, the algorithm will completely ignore every single one of them. It does not just ignore the 16th hashtag; it ignores all of them, completely stripping your video of this powerful discovery mechanism. Less is often more.
              </p>
              <p>
                Another incredibly frequent error is placing hashtags directly inside the title text instead of letting them live in the description. While title hashtags technically function as clickable links, they consume desperately needed character space that should be reserved for emotional hooks and high-impact SEO keywords. The superior, professional strategy is to craft a compelling, human-readable title, and place your hashtags at the very bottom of your video description. YouTube will automatically extract the first three and neatly display them above the title anyway, giving you the best of both worlds.
              </p>
              <p>
                Finally, many beginners make formatting errors that render their tags useless. Inserting spaces or punctuation inside a hashtag fundamentally breaks the link. For example, typing #How To Cook will result in only the word #How becoming a clickable link, completely destroying the search intent of the phrase. You must compress the phrase into a single, continuous string: #HowToCook. Furthermore, you should aggressively avoid overly long, complex hashtags. A tag like #HowToCookAuthenticItalianPastaFromScratchForAbsoluteBeginners is a grammatical nightmare and possesses precisely zero search volume. Keep your hashtags punchy, concise, and reflective of how actual human beings type queries into search bars.
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
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
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

          <RelatedTools currentToolPath="/youtube-hashtag-generator" />
        </section>
      </main>
    </>
  );
}
