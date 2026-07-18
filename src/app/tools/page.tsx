import type { Metadata } from 'next';
import Link from 'next/link';
import { buildAbsoluteUrl } from '@/lib/site';
import {
  Wand2,
  Hash,
  Tag,
  AlignLeft,
  User,
  Zap,
  ArrowRight,
  Sparkles,
  Gamepad2,
  Tv,
  GraduationCap,
  UtensilsCrossed,
  Music,
  Cpu,
  Dumbbell,
  Compass,
  Palette,
  Clapperboard,
  Search,
} from 'lucide-react';

export const metadata: Metadata = {
  twitter: {
    card: 'summary_large_image',
    title: 'Free YouTube SEO Tools & Niche Generators',
    description: 'Free YouTube SEO tools: generate viral titles, hashtags, tags, descriptions, and channel names. Boost your channel growth instantly.',
    images: [buildAbsoluteUrl('/banner.png')],
  },
  title: 'Free YouTube SEO Tools & Niche Generators',
  description:
    'Free YouTube SEO tools: generate viral titles, hashtags, tags, descriptions, and channel names. Boost your channel growth instantly.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools'),
  },
  openGraph: {
    title: 'Free YouTube SEO Tools & Niche Generators',
    description:
      'Free YouTube SEO generators and niche-specific tools to optimize your videos and rank higher.',
    type: 'website',
    url: buildAbsoluteUrl('/tools'),
    images: [
      {
        url: buildAbsoluteUrl('/banner.png'),
        width: 1200,
        height: 630,
        alt: 'FreeViralKit',
      },
    ],
  },
};

const colorMap = {
  purple: 'bg-purple-500/10 text-purple-400',
  pink: 'bg-pink-500/10 text-pink-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
  green: 'bg-green-500/10 text-green-400',
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
};

const coreTools = [
  {
    href: '/youtube-title-generator',
    title: 'YouTube Title Generator',
    description: 'Get 10 viral, click-worthy, and SEO-optimized video titles in seconds.',
    icon: Wand2,
    color: 'purple',
  },
  {
    href: '/youtube-hashtag-generator',
    title: 'YouTube Hashtag Generator',
    description: 'Find trending and relevant hashtags to boost your video discoverability.',
    icon: Hash,
    color: 'pink',
  },
  {
    href: '/youtube-tags-generator',
    title: 'YouTube Tags Generator',
    description: 'Generate 20-25 highly relevant SEO tags keeping under the 500 character limit.',
    icon: Tag,
    color: 'cyan',
  },
  {
    href: '/youtube-description-generator',
    title: 'YouTube Description Generator',
    description: 'Structure keyword-rich descriptions with dynamic templates and CTAs.',
    icon: AlignLeft,
    color: 'green',
  },
  {
    href: '/youtube-channel-name-generator',
    title: 'YouTube Channel Name Generator',
    description: 'Brainstorm memorable, catchy, and brandable channel names based on your niche.',
    icon: User,
    color: 'blue',
  },
  {
    href: '/youtube-shorts-idea-generator',
    title: 'YouTube Shorts Idea Generator',
    description: 'Generate high-retention hook ideas and concept outlines for viral Shorts.',
    icon: Zap,
    color: 'orange',
  },
  {
    href: '/youtube-hook-generator',
    title: 'YouTube Hook Generator',
    description: 'Generate 5 high-retention script hooks to grab attention in the first 5 seconds.',
    icon: Wand2,
    color: 'pink',
  },
  {
    href: '/youtube-chapter-generator',
    title: 'YouTube Chapter Generator',
    description: 'Automatically generate SEO-optimized timestamps and chapters from your video script.',
    icon: Tag,
    color: 'cyan',
  },
  {
    href: '/youtube-thumbnail-generator',
    title: 'Thumbnail Concept Generator',
    description: 'Generate 3 high-CTR visual concepts and text overlays based on psychology.',
    icon: User,
    color: 'purple',
  },
  {
    href: '/youtube-seo-grader',
    title: 'YouTube SEO Score Grader',
    description: 'Analyze your title, description, and tags together and get an instant SEO score out of 100.',
    icon: AlignLeft,
    color: 'blue',
  },
  {
    href: '/youtube-script-generator',
    title: 'YouTube Script Generator',
    description: 'Generate structured, high-retention video script outlines and B-roll visual cues.',
    icon: AlignLeft,
    color: 'pink',
  },
  {
    href: '/youtube-topic-researcher',
    title: 'YouTube Niche & Topic Researcher',
    description: 'Analyze search volume and competitor difficulty to find high-potential topics.',
    icon: Search,
    color: 'cyan',
  },
];

const nicheTools = [
  {
    href: '/tools/youtube-title-generator-for-gaming',
    title: 'YouTube Title Generator for Gaming',
    description: 'Generate gaming titles designed for walkthroughs, tips, and challenge videos.',
    icon: Gamepad2,
    color: 'purple',
  },
  {
    href: '/tools/youtube-title-generator-for-vlogs',
    title: 'YouTube Title Generator for Vlogs',
    description: 'Create vlog titles that boost clicks for daily life, travel, and personal stories.',
    icon: Tv,
    color: 'pink',
  },
  {
    href: '/tools/youtube-description-generator-for-education',
    title: 'YouTube Description Generator for Education',
    description: 'Write clear educational descriptions with structured learning outcomes and CTAs.',
    icon: GraduationCap,
    color: 'green',
  },
  {
    href: '/tools/youtube-title-generator-for-cooking',
    title: 'YouTube Title Generator for Cooking',
    description: 'Generate recipe and cooking video titles that attract food lovers and boost CTR.',
    icon: UtensilsCrossed,
    color: 'orange',
  },
  {
    href: '/tools/youtube-title-generator-for-music',
    title: 'YouTube Title Generator for Music',
    description: 'Create titles for song covers, music production tutorials, beats, and album reviews.',
    icon: Music,
    color: 'cyan',
  },
  {
    href: '/tools/youtube-title-generator-for-tech',
    title: 'YouTube Title Generator for Tech',
    description: 'Generate click-worthy titles for product reviews, unboxing, and tech comparisons.',
    icon: Cpu,
    color: 'blue',
  },
  {
    href: '/tools/youtube-title-generator-for-fitness',
    title: 'YouTube Title Generator for Fitness',
    description: 'Create workout and fitness titles for routines, transformations, and challenges.',
    icon: Dumbbell,
    color: 'green',
  },
  {
    href: '/tools/youtube-title-generator-for-travel',
    title: 'YouTube Title Generator for Travel',
    description: 'Generate travel vlog titles for destination guides, budget travel, and solo adventures.',
    icon: Compass,
    color: 'cyan',
  },
  {
    href: '/tools/youtube-title-generator-for-beauty',
    title: 'YouTube Title Generator for Beauty',
    description: 'Create beauty and makeup titles for tutorials, GRWM, skincare, and product reviews.',
    icon: Palette,
    color: 'pink',
  },
  {
    href: '/tools/youtube-tags-generator-for-gaming',
    title: 'YouTube Tags Generator for Gaming',
    description: 'Generate SEO-optimized tags specifically for FPS, RPG, mobile, and streaming content.',
    icon: Tag,
    color: 'purple',
  },
  {
    href: '/tools/youtube-hashtag-generator-for-shorts',
    title: 'YouTube Hashtag Generator for Shorts',
    description: 'Find trending and viral hashtags designed specifically for YouTube Shorts content.',
    icon: Hash,
    color: 'orange',
  },
  {
    href: '/tools/youtube-description-generator-for-tech',
    title: 'YouTube Description Generator for Tech',
    description: 'Write structured tech review descriptions with specs, comparisons, and affiliate links.',
    icon: AlignLeft,
    color: 'blue',
  },
  {
    href: '/tools/youtube-channel-name-generator-for-gaming',
    title: 'Channel Name Generator for Gaming',
    description: 'Brainstorm memorable gaming channel names — clan-style, streamer-style, or brand-style.',
    icon: Clapperboard,
    color: 'purple',
  },
];

const faqItems = [
  {
    question: 'Why should I use YouTube SEO tools?',
    answer: 'YouTube is the second largest search engine in the world. Uploading a video without optimizing its metadata is like writing a book and putting a blank cover on it. SEO tools help you identify what users are actively searching for, structure your titles to maximize Click-Through Rate (CTR), and utilize descriptions and tags to help the YouTube algorithm categorize and rank your videos.',
  },
  {
    question: 'Which tool should I use first?',
    answer: 'We recommend starting with the Niche & Topic Researcher to validate your video idea. Once you confirm there is search volume with low competition, use the Title Generator to craft the perfect hook. After your title is set, move on to the Script Generator for your outline, and finally the Description, Tags, and Hashtags generators right before you upload.',
  },
  {
    question: 'Are these tools really free to use?',
    answer: 'Yes! All the tools in the FreeViralKit suite are 100% free to use. You do not need to create an account, log in, or provide a credit card. You can generate unlimited titles, descriptions, and tags to support your content creation journey.',
  },
  {
    question: 'How does AI help with YouTube SEO?',
    answer: 'Our tools are powered by advanced AI models that have been trained on millions of high-performing YouTube videos across various niches. The AI understands the psychological triggers that make a title clickable, the keyword density required for a good description, and the relevance of tags and hashtags. It automates the tedious research process, giving you optimized results in seconds.',
  },
  {
    question: 'Will these tools guarantee my video goes viral?',
    answer: 'No tool can guarantee a viral video. SEO tools ensure that your video is properly indexed and discoverable by the YouTube algorithm and search engines. However, for a video to go viral, the actual content must be highly engaging, retain viewers\' attention, and deliver on the promise made by the thumbnail and title.',
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
  name: 'Tools',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
};

export default function ToolsPage() {
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
        {/* Header */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 animate-pulse" /> Complete SEO Suite
          </div>
          <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6 text-slate-900 dark:text-white"> YouTube SEO Tools &amp; Generators </h1>
          <p className="text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
            Explore our suite of free generators designed to optimize your metadata, find trending keywords, and boost channel growth.
          </p>
        </section>

        {/* Core Tools Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 mb-8">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Core SEO Tools
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {coreTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${colorMap[tool.color as keyof typeof colorMap]} flex items-center justify-center shrink-0 mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
                    Use Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Niche-Specific Tools Section */}
        <section className="mb-16">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800 mb-8">
            <Gamepad2 className="w-5 h-5 text-purple-400" />
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
              Niche-Specific Generators
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {nicheTools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="glass-card rounded-2xl p-6 group hover:border-purple-500/30 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${colorMap[tool.color as keyof typeof colorMap]} flex items-center justify-center shrink-0 mb-4`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors mb-2">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm font-semibold text-purple-400 group-hover:text-purple-300 transition-colors mt-auto">
                    Use Tool <ArrowRight className="w-4 h-4" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Educational Content Section */}
        <section className="mb-16 space-y-10">
          <div>
            <h2 className="font-display text-3xl font-bold mb-6 text-slate-900 dark:text-white">
              Why You Need a YouTube SEO Tool Suite
            </h2>
            <div className="text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
              <p>
                In the highly competitive world of content creation, producing a great video is only half the battle. If your target audience cannot find your video in search results, your hard work will go unnoticed. This is where a comprehensive <strong>YouTube SEO tool suite</strong> becomes essential for both new and established creators.
              </p>
              <p>
                Search Engine Optimization (SEO) for YouTube involves strategically placing relevant keywords in your video's title, description, tags, and even your spoken script. When done correctly, this metadata signals to the YouTube algorithm exactly what your video is about, categorizing it properly, and recommending it to viewers who have previously engaged with similar content.
              </p>
              <p>
                Our AI-powered tools automate the research and copywriting process. Instead of spending hours manually checking competitor tags or trying to write a compelling 500-word description, you can utilize FreeViralKit to generate professional-grade metadata in a matter of seconds.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-display text-2xl font-bold mb-4 text-slate-900 dark:text-white">
              The 3 Pillars of YouTube SEO
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-purple-500">
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">1. Click-Through Rate (CTR)</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Your title and thumbnail are the most critical factors. If users don't click, your video won't grow. Use our Title Generator to craft titles that invoke curiosity, urgency, or extreme value without resorting to deceptive clickbait.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-green-500">
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">2. Keyword Relevance</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  The algorithm reads your description and tags. The first 150 characters of your description are particularly important as they appear in search results. Our Description Generator ensures your primary keyword is positioned optimally.
                </p>
              </div>
              <div className="glass-card rounded-2xl p-6 border-t-4 border-t-blue-500">
                <h4 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">3. Audience Retention</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Once a viewer clicks, how long do they stay? Tools like our Script Generator and Hook Generator help you structure your video to minimize drop-off and maximize Average View Duration (AVD).
                </p>
              </div>
            </div>
          </div>

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
                    <span className="text-purple-400 text-xl leading-none group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
