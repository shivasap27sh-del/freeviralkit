import type { Metadata } from 'next';
import { buildAbsoluteUrl } from '@/lib/site';
import HomePageClient from '@/components/tools/HomePageClient';
import { Wand2, AlignLeft, Search, User, Zap, Tag, Hash, Laptop, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { getPublishedPosts } from '@/app/blog/data';

export const metadata: Metadata = {
  title: 'Free AI YouTube SEO & Title Generator',
  description:
    'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
  twitter: {
    card: 'summary_large_image',
    title: 'Free AI YouTube SEO & Title Generator',
    description: 'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  openGraph: {
    title: 'FreeViralKit — Free AI YouTube SEO & Title Tool',
    description:
      'Free YouTube SEO tool. Generate viral titles, descriptions, hashtags, and tags instantly. No signup required to boost your channel.',
    url: buildAbsoluteUrl('/'),
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
    canonical: buildAbsoluteUrl('/'),
  },
  keywords: [
    'youtube seo tool',
    'free youtube seo',
    'youtube title generator',
    'youtube description generator',
    'youtube tags generator',
    'youtube hashtag generator',
    'youtube seo optimizer',
    'how to rank on youtube',
    'free viral kit',
    'youtube channel tools',
  ],
};

const homepageFaqs = [
  {
    q: 'Is FreeViralKit really free?',
    a: 'Yes — 100% free, no signup, no credit card. Generate unlimited titles, descriptions, hashtags, and tags for all your YouTube videos without any hidden costs.',
  },
  {
    q: 'How does the AI generate YouTube titles?',
    a: 'We use advanced language models trained on successful YouTube title patterns across every niche. The AI analyzes top-performing videos to craft titles that drive clicks while staying SEO-friendly.',
  },
  {
    q: 'Will these tags and titles help me rank?',
    a: 'Yes — our AI generates content following YouTube SEO best practices: proper keyword placement, optimal character counts, and trending formats. Optimized metadata helps YouTube\'s algorithm understand your content better, which can improve discoverability over time.',
  },
  {
    q: 'Can I use FreeViralKit for YouTube Shorts?',
    a: 'Absolutely! FreeViralKit works for long-form videos and Shorts. The AI adapts its output to match your content type, generating punchy titles and trending hashtags perfect for short-form content.',
  },
  {
    q: 'How many titles can I generate at once?',
    a: 'FreeViralKit generates 10 optimized titles per request. You can regenerate as many times as you want to find the perfect title for your video. Each batch includes SEO-focused, viral, and trending title styles.',
  },
  {
    q: 'What makes FreeViralKit different from other YouTube tools?',
    a: 'FreeViralKit is the only tool that gives you a complete SEO package in one click — title, description, hashtags, tags, and a pinned comment — all optimized together for maximum YouTube visibility.',
  },
  {
    q: 'Do I need a YouTube channel to use FreeViralKit?',
    a: 'No — anyone can use FreeViralKit. Whether you are planning your first video or managing a channel with thousands of subscribers, our AI tools help you create better metadata for every upload.',
  },
];

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: homepageFaqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.a,
    },
  })),
};


const softwareJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'FreeViralKit',
  url: 'https://freeviralkit.com',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  description: 'Free AI YouTube SEO tool. Generate viral titles, descriptions, hashtags & tags. Boost your video views and rankings instantly.',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  author: {
    '@type': 'Person',
    name: 'Shiva',
  },
};

export default async function Home() {
  const publishedPosts = await getPublishedPosts();
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
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
            <span className="pulse-dot" /> YouTube SEO Optimizer
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold leading-tight tracking-tight mb-6"> Get Your Full YouTube SEO Package in 10 Seconds — Free </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto mb-8">
            Enter your video topic — get 10 SEO-optimized titles with emojis &amp; hashtags.
            Pick one to unlock your description, hashtags &amp; tags.
          </p>

          {/* Social Proof */}
          <div className="flex flex-col items-center gap-3 mb-10">
            <div className="flex -space-x-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className={`w-8 h-8 rounded-full border-2 border-white dark:border-slate-950 bg-gradient-to-br ${
                  ['from-purple-500 to-indigo-500', 'from-pink-500 to-rose-500', 'from-cyan-500 to-blue-500', 'from-amber-500 to-orange-500', 'from-emerald-500 to-teal-500'][i]
                } flex items-center justify-center text-[10px] font-bold text-white shadow-sm`}>
                  {['M', 'A', 'J', 'S', 'R'][i]}
                </div>
              ))}
            </div>
            <div className="text-sm font-medium text-slate-600 dark:text-slate-400">
              Used by <strong className="text-slate-900 dark:text-white">creators worldwide</strong> to generate optimized titles
            </div>
          </div>
        </section>

        {/* Client Side Generator Tool */}
        <HomePageClient />

        {/* Tool Links Section — SEO Internal Linking */}
        <section className="mt-20 mb-12">
          <div aria-hidden="true" className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3 text-slate-900 dark:text-white">
            Individual <span className="text-gradient">SEO Tools</span>
          </div>
          <h2 className="sr-only">Individual SEO Tools</h2>
          <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">Need just one piece of the puzzle? Use our dedicated generators.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(() => {
              const colorMap = {
                purple: 'bg-purple-500/10 text-purple-400',
                pink: 'bg-pink-500/10 text-pink-400',
                cyan: 'bg-cyan-500/10 text-cyan-400',
                green: 'bg-green-500/10 text-green-400',
                blue: 'bg-blue-500/10 text-blue-400',
                orange: 'bg-orange-500/10 text-orange-400',
              };
              return [
                { href: '/youtube-title-generator', icon: Wand2, label: 'YouTube Title Generator', desc: 'Get 10 viral, SEO-optimized titles', color: 'purple' },
                { href: '/youtube-script-generator', icon: AlignLeft, label: 'AI Script Outline', desc: 'Generate high-retention video script structures', color: 'pink' },
                { href: '/youtube-topic-researcher', icon: Search, label: 'AI Niche Researcher', desc: 'Analyze competition and topic suggestions', color: 'cyan' },
                { href: '/youtube-description-generator', icon: AlignLeft, label: 'YouTube Description Generator', desc: 'Keyword-rich descriptions in seconds', color: 'green' },
                { href: '/youtube-channel-name-generator', icon: User, label: 'Channel Name Generator', desc: 'Find catchy, SEO-friendly channel names', color: 'blue' },
                { href: '/youtube-shorts-idea-generator', icon: Zap, label: 'Shorts Idea Generator', desc: 'Generate viral, high-retention Shorts concepts', color: 'orange' },
                { href: '/youtube-tags-generator', icon: Tag, label: 'YouTube Tags Generator', desc: '20-25 SEO tags under 500 chars', color: 'purple' },
                { href: '/youtube-hashtag-generator', icon: Hash, label: 'YouTube Hashtag Generator', desc: 'Trending hashtags for any niche', color: 'pink' },
                { href: '/creator-gear', icon: Laptop, label: 'Creator Gear & Tools', desc: 'Best equipment & software recommendations', color: 'cyan' },
              ].map((tool) => (
                <Link key={tool.href} href={tool.href}
                  className="glass-card rounded-2xl p-5 group hover:border-purple-500/30 transition-all flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${colorMap[tool.color as keyof typeof colorMap]} flex items-center justify-center shrink-0 mb-4`}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-1">{tool.label}</h3>
                    <p className="text-slate-500 text-sm mb-4">{tool.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors">
                    Try Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              ));
            })()}
          </div>
        </section>

        {/* Why FreeViralKit — SEO Content Section */}
        <section className="mt-20 mb-12">
          <div aria-hidden="true" className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3 text-slate-900 dark:text-white">
            Why Choose <span className="text-gradient">FreeViralKit</span>?
          </div>
          <h2 className="sr-only">Why Choose FreeViralKit?</h2>
          <p className="text-slate-500 text-center mb-10 max-w-2xl mx-auto">
            Built for YouTubers who don&apos;t want to pay for expensive SEO tools.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">🚀 Grow Faster with AI-Powered SEO</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                YouTube is the second largest search engine in the world. To get discovered, your videos need
                optimized metadata — the right title, description, tags, and hashtags. FreeViralKit uses advanced
                AI to analyze what works on YouTube right now and generates SEO-optimized content tailored to your
                video topic. Stop guessing and start ranking.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">🎯 Complete SEO Package in One Click</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Most YouTube SEO tools only generate titles or tags. FreeViralKit gives you everything in a single
                workflow — 10 clickable titles, a keyword-rich description, trending hashtags, SEO-optimized tags
                under the 500-character limit, and even a pinned comment to boost engagement. Copy the full package
                with one click and paste it directly into YouTube Studio.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">💡 Built for Every Creator</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Whether you are a beginner uploading your first video or a seasoned creator with thousands of
                subscribers, FreeViralKit adapts to your needs. Our AI understands every niche — gaming, tech reviews,
                cooking tutorials, vlogs, educational content, fitness, and more. Just enter your topic and let the
                AI do the heavy lifting.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-6">
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white mb-2">⚡ 100% Free, No Limits</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                No signup required. No credit card. No usage limits. FreeViralKit is completely free to use and always
                will be. Generate as many titles, descriptions, hashtags, and tags as you need. We believe every
                creator deserves access to professional-grade YouTube SEO tools without paying for expensive subscriptions.
              </p>
            </div>
          </div>
        </section>

        {/* Ultimate SEO Masterclass Section */}
        <section className="mt-20 mb-12">
          <div aria-hidden="true" className="font-display text-3xl md:text-4xl font-extrabold text-center mb-10 text-slate-900 dark:text-white">
            The Ultimate Guide to <span className="text-gradient">YouTube SEO in 2026</span>
          </div>
          <h2 className="sr-only">The Ultimate Guide to YouTube SEO in 2026</h2>
          
          <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto space-y-8 text-slate-600 dark:text-slate-400">
            <p>
              If you are uploading videos to YouTube without optimizing your metadata, you are essentially burying your own content. YouTube is not just a video platform; it is the second largest search engine in the world, owned by the largest search engine in the world (Google). To succeed, you must understand how the algorithm discovers, categorizes, and serves content to viewers. This guide will break down the exact strategies top creators use to dominate search rankings and trigger the recommended feed.
            </p>

            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
              How the YouTube Algorithm Actually Works
            </h3>
            <p>
              Historically, YouTube relied heavily on tags and keyword stuffing to understand what a video was about. Today, the algorithm is vastly more sophisticated. It operates on a neural network designed to achieve one primary goal: <strong>maximize user satisfaction and session time</strong>. It does this by analyzing two massive sets of data: Video Metadata and User Behavior.
            </p>
            <p>
              Your metadata (Title, Description, and Tags) acts as the initial &quot;bridge.&quot; When you publish a video, YouTube uses this text data to run an initial test. It serves your video to a small, hyper-targeted audience that has shown interest in the keywords you provided. From there, the algorithm tracks two critical human metrics:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Click-Through Rate (CTR):</strong> Out of the people who saw your thumbnail and title on their homepage, how many actually clicked it?</li>
              <li><strong>Average View Duration (AVD):</strong> Once they clicked, how long did they stay? Did they watch 10% of the video or 70%?</li>
            </ul>

            <div className="my-10 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-xl">
              <Image src="/images/seo_dashboard.png" alt="YouTube Growth Analytics Dashboard" width={1200} height={630} className="w-full h-auto object-cover" />
            </div>

            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
              The &quot;Holy Trinity&quot; of Video Discovery
            </h3>
            <p>
              To trigger exponential growth, you need to master the Holy Trinity of YouTube discovery. This consists of your Title, your Thumbnail, and your Hook. If any one of these elements fails, the entire system collapses.
            </p>
            <p>
              <strong>1. The Title (Search + Psychology):</strong> A perfect YouTube title must serve two masters. First, it must include broad, highly searched keywords so the algorithm knows how to index it. Second, it must contain a psychological trigger—curiosity, fear of missing out (FOMO), or an unbelievable claim—that forces the human brain to click. For example, instead of &quot;How to bake a cake,&quot; a viral title would be &quot;I baked a cake using only 3 ingredients (and it blew my mind).&quot;
            </p>
            <p>
              <strong>2. The Thumbnail (Visual Disruption):</strong> The thumbnail is your billboard. It needs to stand out in a sea of distractions. The best thumbnails use high contrast, expressive human faces (to trigger mirror neurons), and follow the &quot;Rule of Thirds.&quot; More importantly, your thumbnail should not just repeat the title; it should complement it. If your title asks a question, your thumbnail should hint at the answer.
            </p>
            <p>
              <strong>3. The Hook (Retention Optimization):</strong> The moment a viewer clicks, you have approximately 5 to 10 seconds to convince them to stay. This is the &quot;Hook.&quot; Never start a video with a slow logo intro or a boring &quot;Hey guys, welcome back to my channel.&quot; Instead, immediately deliver on the promise of the title. Validate their decision to click by showing them the end result, asking a compelling question, or plunging them directly into the action.
            </p>

            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
              Why Description Formatting is Your Secret Weapon
            </h3>
            <p>
              While titles get all the glory, the YouTube description is the unsung hero of SEO. The first 150 characters of your description are the most critical real estate on your entire channel. Why? Because these characters are displayed directly in the YouTube search results, right below your title. If your target keyword is not naturally woven into the first two sentences of your description, you are losing out on a massive relevancy signal.
            </p>

            <p>
              Furthermore, a well-formatted description enhances the viewer experience. By including timestamped Chapters, you allow viewers to navigate long-form content effortlessly. This prevents them from clicking away when they hit a slow segment. You should also strategically use your description to funnel traffic to your other videos using internal links, keeping viewers trapped in your &quot;ecosystem&quot; and racking up session watch time—the ultimate metric that YouTube rewards.
            </p>

            <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mt-12 mb-4">
              How FreeViralKit Automates Your Success
            </h3>
            <p>
              Understanding YouTube SEO is one thing; executing it consistently for every single upload is exhausting. That is why we built FreeViralKit. Our suite of AI-powered tools removes the guesswork from the equation. Instead of staring at a blank screen wondering what title will get clicks, our AI analyzes current trends and generates 10 optimized options instantly. 
            </p>
            <p>
              Instead of manually typing out keyword-rich descriptions and hunting for trending hashtags, FreeViralKit generates the entire metadata package in seconds. By consistently using these tools, you ensure that every video you upload is perfectly primed for the algorithm, giving you the freedom to focus on what actually matters: creating incredible content.
            </p>
          </div>
        </section>

        {/* Latest Blog Posts — internal links prevent orphan URLs for new posts */}
        {(() => {
          const latestPosts = publishedPosts.slice(0, 4);
          return (
            <section className="mt-20 mb-12">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white">
                    Latest from the <span className="text-gradient">Blog</span>
                  </h2>
                  <p className="text-slate-500 text-sm mt-1">YouTube growth tips & strategies</p>
                </div>
                <Link
                  href="/blog"
                  className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                >
                  View all posts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="glass-card rounded-2xl p-5 group hover:border-purple-500/30 transition-all flex flex-col gap-2"
                  >
                    <span className="text-xs font-semibold text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full w-fit border border-purple-400/20">
                      {post.category}
                    </span>
                    <h3 className="font-display text-sm font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{post.description}</p>
                    <div className="flex items-center gap-1 text-xs font-semibold text-purple-400 group-hover:text-purple-300 transition-colors mt-auto pt-1">
                      Read more <ArrowRight className="w-3 h-3" />
                    </div>
                  </Link>
                ))}
              </div>
              <div className="text-center mt-6 sm:hidden">
                <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-purple-400">
                  View all blog posts <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </section>
          );
        })()}

        {/* FAQ Section for SEO */}
        <section className="mt-12 mb-8">
          <h2 className="font-display text-2xl font-bold text-center mb-8 text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {homepageFaqs.map((faq, i) => (
              <details
                key={i}
                className="glass-card rounded-xl group"
              >
                <summary className="cursor-pointer px-6 py-4 font-semibold text-slate-900 dark:text-white select-none list-none flex items-center justify-between gap-4">
                  {faq.q}
                  <span className="text-purple-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
