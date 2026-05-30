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
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Free YouTube SEO Tools & Niche Generators',
  description:
    'Boost your channel growth with our free suite of YouTube SEO tools. Generate viral titles, trending hashtags, search-optimized tags, descriptions, channel names, and more.',
  alternates: {
    canonical: buildAbsoluteUrl('/tools'),
  },
  openGraph: {
    title: 'Free YouTube SEO Tools & Niche Generators',
    description:
      'Explore our full suite of free YouTube SEO generators and niche-specific tools to optimize your videos and rank #1.',
    type: 'website',
    url: buildAbsoluteUrl('/tools'),
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

export default function ToolsPage() {
  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Header */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 animate-pulse" /> Complete SEO Suite
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          YouTube SEO <br /><span className="text-gradient">Tools &amp; Generators</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Explore our suite of free generators designed to optimize your metadata, find trending keywords, and boost channel growth.
        </p>
      </section>

      {/* Core Tools Section */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Sparkles className="w-5 h-5 text-purple-400" /> Core SEO Tools
        </h2>
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
                  <h3 className="font-display text-lg font-bold group-hover:text-purple-400 transition-colors mb-2">
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
      <section className="mb-12">
        <h2 className="font-display text-2xl font-bold mb-8 flex items-center gap-2 pb-2 border-b border-slate-200 dark:border-slate-800">
          <Gamepad2 className="w-5 h-5 text-purple-400" /> Niche-Specific Generators
        </h2>
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
                  <h3 className="font-display text-lg font-bold group-hover:text-purple-400 transition-colors mb-2">
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
    </main>
  );
}
