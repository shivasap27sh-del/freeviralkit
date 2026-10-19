'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Gamepad2,
  Tag,
  Sparkles,
  Cpu,
  FileText,
  Hash,
  Zap,
  Flame,
  DollarSign,
  Calculator,
  Wand2,
  UtensilsCrossed,
  Dumbbell,
  GraduationCap,
  Clock,
  Compass,
  ChevronDown,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react';

export interface NicheHubSwitcherProps {
  currentNiche: string;
  currentToolPath?: string;
  topic?: string;
}

interface NicheTool {
  name: string;
  path: string;
  icon: LucideIcon;
}

const NICHE_TOOLS_MAP: Record<string, NicheTool[]> = {
  gaming: [
    { name: 'Gaming Titles', path: '/tools/youtube-title-generator-for-gaming', icon: Gamepad2 },
    { name: 'Gaming Tags', path: '/tools/youtube-tags-generator-for-gaming', icon: Tag },
    { name: 'Gaming Channel Names', path: '/tools/youtube-channel-name-generator-for-gaming', icon: Sparkles },
  ],
  tech: [
    { name: 'Tech Titles', path: '/tools/youtube-title-generator-for-tech', icon: Cpu },
    { name: 'Tech Descriptions', path: '/tools/youtube-description-generator-for-tech', icon: FileText },
    { name: 'AI & Future Tech', path: '/tools/youtube-title-generator-for-ai-and-tech', icon: Sparkles },
  ],
  'ai-and-tech': [
    { name: 'AI & Future Tech', path: '/tools/youtube-title-generator-for-ai-and-tech', icon: Cpu },
    { name: 'Tech Titles', path: '/tools/youtube-title-generator-for-tech', icon: Sparkles },
    { name: 'Tech Descriptions', path: '/tools/youtube-description-generator-for-tech', icon: FileText },
  ],
  shorts: [
    { name: 'Shorts Hashtags', path: '/tools/youtube-hashtag-generator-for-shorts', icon: Hash },
    { name: 'Shorts Idea Generator', path: '/youtube-shorts-idea-generator', icon: Zap },
    { name: 'Realtime Trends', path: '/youtube-realtime-title-generator', icon: Flame },
  ],
  finance: [
    { name: 'Finance Titles', path: '/tools/youtube-title-generator-for-finance', icon: DollarSign },
    { name: 'Money & RPM Calculator', path: '/youtube-money-calculator', icon: Calculator },
    { name: 'A/B Test Pack', path: '/youtube-ab-test-generator', icon: Wand2 },
  ],
  cooking: [
    { name: 'Cooking Titles', path: '/tools/youtube-title-generator-for-cooking', icon: UtensilsCrossed },
    { name: 'Full SEO Optimizer', path: '/', icon: Sparkles },
    { name: 'Tags Generator', path: '/youtube-tags-generator', icon: Tag },
  ],
  fitness: [
    { name: 'Fitness Titles', path: '/tools/youtube-title-generator-for-fitness', icon: Dumbbell },
    { name: 'Full SEO Optimizer', path: '/', icon: Sparkles },
    { name: 'Tags Generator', path: '/youtube-tags-generator', icon: Tag },
  ],
  education: [
    { name: 'Education Descriptions', path: '/tools/youtube-description-generator-for-education', icon: GraduationCap },
    { name: 'Full SEO Optimizer', path: '/', icon: Sparkles },
    { name: 'Chapter Generator', path: '/youtube-chapter-generator', icon: Clock },
  ],
};

const ALL_NICHES: { id: string; name: string; path: string; icon: LucideIcon }[] = [
  { id: 'gaming', name: 'Gaming', path: '/tools/youtube-title-generator-for-gaming', icon: Gamepad2 },
  { id: 'tech', name: 'Tech', path: '/tools/youtube-title-generator-for-tech', icon: Cpu },
  { id: 'ai-and-tech', name: 'AI & Tech', path: '/tools/youtube-title-generator-for-ai-and-tech', icon: Cpu },
  { id: 'shorts', name: 'Shorts', path: '/tools/youtube-hashtag-generator-for-shorts', icon: Hash },
  { id: 'finance', name: 'Finance & Wealth', path: '/tools/youtube-title-generator-for-finance', icon: DollarSign },
  { id: 'cooking', name: 'Cooking & Food', path: '/tools/youtube-title-generator-for-cooking', icon: UtensilsCrossed },
  { id: 'fitness', name: 'Fitness & Health', path: '/tools/youtube-title-generator-for-fitness', icon: Dumbbell },
  { id: 'education', name: 'Education', path: '/tools/youtube-description-generator-for-education', icon: GraduationCap },
  { id: 'anime', name: 'Anime', path: '/tools/youtube-title-generator-for-anime', icon: Sparkles },
  { id: 'asmr', name: 'ASMR', path: '/tools/youtube-title-generator-for-asmr', icon: Sparkles },
  { id: 'faceless', name: 'Faceless Channels', path: '/tools/youtube-title-generator-for-faceless-channels', icon: Sparkles },
  { id: 'music', name: 'Music', path: '/tools/youtube-title-generator-for-music', icon: Sparkles },
  { id: 'travel', name: 'Travel', path: '/tools/youtube-title-generator-for-travel', icon: Sparkles },
  { id: 'vlogs', name: 'Vlogs', path: '/tools/youtube-title-generator-for-vlogs', icon: Sparkles },
  { id: 'beauty', name: 'Beauty', path: '/tools/youtube-title-generator-for-beauty', icon: Sparkles },
];

function formatNicheName(niche: string): string {
  const map: Record<string, string> = {
    gaming: 'Gaming',
    tech: 'Tech',
    'ai-and-tech': 'AI & Tech',
    shorts: 'Shorts',
    finance: 'Finance',
    cooking: 'Cooking',
    fitness: 'Fitness',
    education: 'Education',
    anime: 'Anime',
    asmr: 'ASMR',
    faceless: 'Faceless',
    'faceless-channels': 'Faceless',
    music: 'Music',
    travel: 'Travel',
    vlogs: 'Vlogs',
    vlog: 'Vlogs',
    beauty: 'Beauty',
  };
  const key = niche.toLowerCase().trim();
  if (map[key]) return map[key];
  return niche.charAt(0).toUpperCase() + niche.slice(1);
}

function getTitleGeneratorPath(niche: string): string {
  if (niche === 'faceless' || niche === 'faceless-channels') {
    return '/tools/youtube-title-generator-for-faceless-channels';
  }
  return `/tools/youtube-title-generator-for-${niche}`;
}

function getToolsForNiche(niche: string): NicheTool[] {
  const key = niche.toLowerCase().trim();
  if (NICHE_TOOLS_MAP[key]) {
    return NICHE_TOOLS_MAP[key];
  }
  const dedicatedPath = getTitleGeneratorPath(key);
  const dedicatedName = `${formatNicheName(key)} Titles`;

  return [
    { name: dedicatedName, path: dedicatedPath, icon: Sparkles },
    { name: 'Full SEO Optimizer', path: '/', icon: Sparkles },
    { name: 'Tags Generator', path: '/youtube-tags-generator', icon: Tag },
  ];
}

function normalizePath(p: string): string {
  if (!p) return '';
  return p.split('?')[0].replace(/\/+$/, '') || '/';
}

export default function NicheHubSwitcher({
  currentNiche,
  currentToolPath,
  topic,
}: NicheHubSwitcherProps) {
  const pathname = usePathname();
  const activePath = currentToolPath || pathname || '';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const tools = getToolsForNiche(currentNiche);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const buildHref = (path: string): string => {
    if (!topic || !topic.trim()) return path;
    const separator = path.includes('?') ? '&' : '?';
    return `${path}${separator}topic=${encodeURIComponent(topic.trim())}`;
  };

  return (
    <div className="glass-card rounded-2xl p-2.5 sm:p-3 mb-6 flex flex-wrap items-center justify-between gap-2.5 border border-slate-200/60 dark:border-zinc-800">
      {/* Niche Tool Pills */}
      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isCurrent = normalizePath(activePath) === normalizePath(tool.path);
          return (
            <Link
              key={tool.path}
              href={buildHref(tool.path)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                isCurrent
                  ? 'bg-red-500/10 dark:bg-red-500/15 border border-red-500/30 text-red-600 dark:text-red-400 font-semibold shadow-xs'
                  : 'bg-slate-100/70 dark:bg-zinc-800/50 hover:bg-slate-200/80 dark:hover:bg-zinc-700/60 border border-slate-200/50 dark:border-zinc-700/50 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all'
              }`}
              aria-current={isCurrent ? 'page' : undefined}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tool.name}</span>
            </Link>
          );
        })}
      </div>

      {/* More Niches Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-medium bg-slate-100/70 dark:bg-zinc-800/50 hover:bg-slate-200/80 dark:hover:bg-zinc-700/60 border border-slate-200/50 dark:border-zinc-700/50 text-slate-600 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white transition-all"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <Compass className="w-3.5 h-3.5 shrink-0" />
          <span>More Niches</span>
          <ChevronDown
            className={`w-3 h-3 shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-60 sm:w-64 max-h-80 overflow-y-auto glass-card bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 dark:border-zinc-800 p-2 text-xs">
            <div className="px-2.5 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider font-mono">
              Switch Niche Studio
            </div>
            <div className="space-y-0.5 mt-1">
              {ALL_NICHES.map((nicheItem) => {
                const NIcon = nicheItem.icon;
                const isSelected = currentNiche.toLowerCase() === nicheItem.id;
                return (
                  <Link
                    key={nicheItem.id}
                    href={buildHref(nicheItem.path)}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl transition-all ${
                      isSelected
                        ? 'bg-red-500/10 dark:bg-red-500/15 text-red-600 dark:text-red-400 font-semibold'
                        : 'text-slate-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    <NIcon className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">{nicheItem.name}</span>
                  </Link>
                );
              })}
            </div>
            <div className="pt-1.5 mt-1.5 border-t border-slate-200/60 dark:border-zinc-800">
              <Link
                href={buildHref('/tools')}
                onClick={() => setIsOpen(false)}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-xl text-slate-800 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 font-medium transition-colors"
              >
                <span>Browse All 30+ Tools</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
