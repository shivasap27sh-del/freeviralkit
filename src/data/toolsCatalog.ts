import {
  Wand2,
  Hash,
  Tag,
  AlignLeft,
  User,
  Zap,
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
  Sparkles,
  Image as ImageIcon,
  DollarSign,
  type LucideIcon,
} from 'lucide-react';

export interface ToolItem {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'purple' | 'pink' | 'cyan' | 'green' | 'blue' | 'orange';
  badge?: string;
}

export const coreTools: ToolItem[] = [
  {
    href: '/youtube-ab-test-generator',
    title: '3-Way A/B Test Pack Generator ⚡',
    description: 'Generate 3 strategic packaging variants (Title + Thumbnail Text) for YouTube Studio’s native Test & Compare.',
    icon: Wand2,
    color: 'pink',
    badge: 'NEW',
  },
  {
    href: '/youtube-realtime-title-generator',
    title: 'Real-Time Movie & Live AI Generator ⚡',
    description: 'Fetch live real-world movie plot facts, cast info, and trending news to generate accurate titles, tags & descriptions.',
    icon: Clapperboard,
    color: 'purple',
    badge: 'LIVE',
  },
  {
    href: '/youtube-thumbnail-downloader',
    title: 'YouTube Thumbnail Downloader & Tag Extractor ⚡',
    description: 'Download full-resolution 4K, 1080p thumbnails and extract hidden video ranking tags in 0.05 seconds.',
    icon: ImageIcon,
    color: 'orange',
    badge: '500k+ Mo',
  },
  {
    href: '/youtube-money-calculator',
    title: 'YouTube Money & RPM Revenue Calculator ⚡',
    description: 'Interactive daily views slider with 2026 niche RPM rates, geographic multipliers, and brand deal income estimates.',
    icon: DollarSign,
    color: 'green',
    badge: '300k+ Mo',
  },
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

export const nicheTools: ToolItem[] = [
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
    title: 'YouTube Channel Name Generator for Gaming',
    description: 'Find cool, memorable, and unique gaming channel names for your brand.',
    icon: Gamepad2,
    color: 'purple',
  },
  {
    href: '/tools/youtube-title-generator-for-anime',
    title: 'YouTube Title Generator for Anime',
    description: 'Create compelling titles for anime recaps, reviews, tier lists, and theory breakdowns.',
    icon: Tv,
    color: 'pink',
  },
  {
    href: '/tools/youtube-title-generator-for-asmr',
    title: 'YouTube Title Generator for ASMR',
    description: 'Generate soothing, trigger-focused titles for ASMR roleplays, whispers, and tapping videos.',
    icon: Sparkles,
    color: 'purple',
  },
  {
    href: '/tools/youtube-title-generator-for-faceless-channels',
    title: 'YouTube Title Generator for Faceless Channels',
    description: 'High-CTR curiosity-driven titles tailored for automated and cash-cow faceless channels.',
    icon: Wand2,
    color: 'cyan',
  },
  {
    href: '/tools/youtube-title-generator-for-finance',
    title: 'YouTube Title Generator for Finance & Crypto',
    description: 'Generate high-RPM, authoritative titles for investing, market breakdowns, and finance guides.',
    icon: AlignLeft,
    color: 'green',
  },
  {
    href: '/tools/youtube-title-generator-for-ai-and-tech',
    title: 'YouTube Title Generator for AI & Future Tech',
    description: 'Viral titles for LLM tutorials, generative AI breakthroughs, robotics, and future tech reviews.',
    icon: Cpu,
    color: 'blue',
  },
];

export const toolsFaqs = [
  {
    question: 'Are all tools on FreeViralKit completely free to use?',
    answer:
      'Yes, 100% free with no login or subscription required. You get unlimited access to all AI generators, niche-specific tools, and YouTube SEO optimizers.',
  },
  {
    question: 'How do these AI tools help improve my YouTube video ranking?',
    answer:
      'Our tools analyze search trends and YouTube algorithm ranking signals to generate keyword-rich, high-CTR titles, descriptions, and tags that boost discoverability.',
  },
  {
    question: 'Can I use these tools for YouTube Shorts as well as long-form videos?',
    answer:
      'Yes! We have dedicated tools for YouTube Shorts including our Shorts Idea Generator and Shorts Hashtag Generator, as well as tools optimized for long-form content.',
  },
];
