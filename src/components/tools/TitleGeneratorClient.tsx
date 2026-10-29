'use client';

import { useState } from 'react';
import { generateTitles } from '@/app/actions/titles';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2,
  Copy,
  CheckCircle2,
  Loader2,
  RotateCcw,
  Eye,
  Award,
  Check,
  AlertTriangle,
  Smartphone,
  Monitor,
  LayoutGrid,
  ArrowRight,
  Sparkles,
  X,
} from 'lucide-react';
import Link from 'next/link';
import ErrorBanner from '@/components/ErrorBanner';
import { useToast } from '@/components/ToastProvider';
import CreatorPipelineBar from './CreatorPipelineBar';

interface TitleGeneratorClientProps {
  niche?: string;
  initialTopic?: string;
}

type SurfaceType = 'mobile' | 'desktop' | 'suggested';

const TRENDING_CHIPS = [
  'AI Agents in 2026',
  'Minecraft 100 Days Hardcore',
  '10-Minute High-Protein Meals',
  '24 Hours in Tokyo Solo',
  'Dividend Portfolio at 25',
  'Fix YouTube Studio Retention',
];

export default function TitleGeneratorClient({ niche, initialTopic }: TitleGeneratorClientProps) {
  const [topic, setTopic] = useState(initialTopic || '');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [activeSurface, setActiveSurface] = useState<SurfaceType>('mobile');
  const [error, setError] = useState<string | null>(null);
  const { showToast } = useToast();

  const handleGenerate = async (isRegenerate = false, overrideTopic?: string) => {
    const query = (overrideTopic !== undefined ? overrideTopic : topic).trim();
    if (!query) return;
    if (overrideTopic !== undefined) setTopic(overrideTopic);
    setIsGenerating(true);
    setError(null);
    const exclude = isRegenerate ? titles : [];
    setTitles([]);
    setSelectedIdx(0);

    const result = await generateTitles(query, exclude, niche);
    if (result.success && result.titles && result.titles.length > 0) {
      setTitles(result.titles);
    } else {
      setError(result.error || 'Failed to generate titles');
    }
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string, label?: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      showToast(label ? `Copied ${label}!` : 'Copied title to clipboard!', 'success');
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
      showToast('Failed to copy title', 'error');
    }
  };

  const getCharBadge = (len: number) => {
    if (len <= 55) {
      return {
        label: `${len} chars • Safe Mobile`,
        class: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20',
      };
    }
    if (len <= 70) {
      return {
        label: `${len} chars • Desktop Optimal`,
        class: 'text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10 border-amber-200 dark:border-amber-500/20',
      };
    }
    return {
      label: `${len} chars • Cutoff Warning`,
      class: 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 border-rose-200 dark:border-rose-500/20',
    };
  };

  const analyzeTitle = (titleText: string) => {
    let score = 50;
    const len = titleText.length;
    const lowerTitle = titleText.toLowerCase();

    // 1. Mobile Safe Zone (chars <= 60)
    let lengthScore = 0;
    let lengthPassed = false;
    let lengthText = 'Keep under 60 chars for zero mobile cutoff';
    if (len >= 35 && len <= 58) {
      score += 15;
      lengthScore = 15;
      lengthPassed = true;
      lengthText = '100% visible on mobile feeds (zero truncation)';
    } else if (len <= 70) {
      score += 10;
      lengthScore = 10;
      lengthPassed = true;
      lengthText = 'Optimal desktop length; minor mobile cutoff';
    } else if (len > 80) {
      score -= 5;
      lengthText = 'Exceeds 80 chars; heavily truncated in browse feeds';
    }

    // 2. Front-Loaded Keyword Hook
    const frontSnippet = lowerTitle.slice(0, 42);
    const hasFrontHook =
      frontSnippet.includes('how to') ||
      frontSnippet.includes('why') ||
      frontSnippet.includes('secret') ||
      frontSnippet.includes('best') ||
      frontSnippet.includes('stop') ||
      frontSnippet.includes('build') ||
      /\d+/.test(frontSnippet);
    let frontHookScore = 0;
    if (hasFrontHook) {
      score += 12;
      frontHookScore = 12;
    }

    // 3. Curiosity Gap & Power Words
    const powerWords = [
      'secret',
      'mistake',
      'revealed',
      'proof',
      'truth',
      'actually',
      'exposed',
      'banned',
      'brutal',
      'shocking',
      'nobody',
      'fastest',
      'worst',
      'ultimate',
      'genius',
      'rules',
      'step',
    ];
    const hasPowerWord = powerWords.some((pw) => lowerTitle.includes(pw));
    let powerScore = 0;
    if (hasPowerWord) {
      score += 13;
      powerScore = 13;
    }

    // 4. Pattern Interrupt (Numbers, Brackets, Emojis)
    const hasNumber = /\d+/.test(titleText);
    const hasBrackets = /[[({]/.test(titleText);
    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
    const hasEmoji = emojiRegex.test(titleText);
    let patternScore = 0;
    if (hasNumber || hasBrackets || hasEmoji) {
      score += 10;
      patternScore = 10;
    }

    const finalScore = Math.min(Math.max(score, 30), 100);

    return {
      score: finalScore,
      pillars: [
        {
          name: 'Mobile Safe Zone',
          passed: lengthPassed,
          detail: lengthText,
          scoreText: `${lengthScore}/15`,
        },
        {
          name: 'Front-Loaded Hook',
          passed: hasFrontHook,
          detail: hasFrontHook
            ? 'Core keywords positioned within first 40 characters'
            : 'Move key search terms earlier in the title',
          scoreText: `${frontHookScore}/12`,
        },
        {
          name: 'Curiosity Gap / Power Word',
          passed: hasPowerWord,
          detail: hasPowerWord
            ? 'Includes compelling curiosity or urgency trigger'
            : 'Add a high-CTR power word (e.g. Secret, Brutal, Truth)',
          scoreText: `${powerScore}/13`,
        },
        {
          name: 'Pattern Interrupt',
          passed: patternScore > 0,
          detail:
            hasNumber || hasBrackets
              ? 'Includes digits, brackets, or visual anchor'
              : 'Add specific numbers (e.g. 2026, 7 Steps) for higher CTR',
          scoreText: `${patternScore}/10`,
        },
      ],
    };
  };

  const selectedTitle = titles[selectedIdx] || '';
  const { score, pillars } = selectedTitle ? analyzeTitle(selectedTitle) : { score: 0, pillars: [] };

  return (
    <div className="w-full space-y-8">
      {/* 1. Generator Input Cockpit Card */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGenerate();
        }}
        className="glass-card rounded-3xl p-6 md:p-8 border border-slate-200/80 dark:border-white/[0.08] bg-white/95 dark:bg-[#121216]/95 shadow-2xl backdrop-blur-xl space-y-5 relative overflow-hidden"
      >
        <div className="flex items-center justify-between">
          <label htmlFor="title-topic-input" className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <span>Video Topic or Working Idea</span>
            <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium text-slate-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800">
              {topic.length} characters
            </span>
          </label>
          <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-800/80 px-2.5 py-0.5 rounded-md border border-slate-200/60 dark:border-zinc-700/60 hidden sm:inline-flex">
            10 Variations • Algorithmic CTR Scored
          </span>
        </div>

        <div className="relative flex items-center">
          <input
            id="title-topic-input"
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder={
              niche
                ? `Enter your ${niche} video topic (e.g., Best Settings for 2026, 100 Days Challenge...)`
                : 'e.g., How to Edit YouTube Videos 10x Faster, 24 Hours in Tokyo on a Budget, Personal Finance Mistakes...'
            }
            className="w-full pl-5 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/80 dark:bg-[#09090b] text-slate-900 dark:text-slate-100 placeholder:text-slate-500 text-base md:text-lg focus:ring-2 focus:ring-red-500/40 focus:border-red-500/60 dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)] outline-none transition-all font-sans"
          />
          {topic.trim() && (
            <button
              type="button"
              onClick={() => setTopic('')}
              className="absolute right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-200/60 dark:bg-zinc-800 transition-colors cursor-pointer"
              title="Clear input"
              aria-label="Clear video topic input"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Quick-Prompt Niche Chips & Submit Button */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-1">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-slate-600 dark:text-slate-400 mr-1 font-mono">Quick test:</span>
            {TRENDING_CHIPS.map((chipText) => (
              <button
                key={chipText}
                type="button"
                onClick={() => handleGenerate(false, chipText)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-[#18181f] hover:border-zinc-400 hover:text-red-600 dark:hover:text-red-400 dark:hover:bg-zinc-800 border border-slate-200/60 dark:border-white/[0.06] transition-all font-medium cursor-pointer active:scale-[0.96] flex items-center gap-1"
              >
                <span>{chipText}</span>
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isGenerating || !topic.trim()}
            className="btn-primary w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm md:text-base flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" /> Generating Titles...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" /> Generate 10 High-CTR Titles
              </>
            )}
          </button>
        </div>
      </form>

      {/* Error Alert */}
      {error && <ErrorBanner error={error} onClear={() => setError(null)} onRetry={() => handleGenerate(false)} />}

      {/* 2. Results Workspace Cockpit */}
      <AnimatePresence>
        {titles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.35 }}
            className="space-y-6 origin-top"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  10 Algorithmic Title Candidates
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Select any title to inspect its real-world safe zone and live YouTube search appearance.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleGenerate(true)}
                  disabled={isGenerating}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 border border-slate-200 dark:border-zinc-700 text-xs font-semibold text-slate-700 dark:text-zinc-200 transition-all cursor-pointer active:scale-[0.96]"
                >
                  <RotateCcw className={`w-3.5 h-3.5 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Regenerate 10 New</span>
                </button>
                <button
                  type="button"
                  onClick={() => copy(titles.join('\n'), 'all-titles', 'All 10 Titles')}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-[0.96]"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedStates['all-titles'] ? '✓ Copied All' : 'Copy All'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: 10 Interactive Title Cards (col-span-7) */}
              <div className="lg:col-span-7 flex flex-col gap-3">
                {titles.map((title, idx) => {
                  const isSelected = selectedIdx === idx;
                  const badge = getCharBadge(title.length);
                  const isCopied = copiedStates[`title-${idx}`];

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ type: 'spring', bounce: 0, duration: 0.25, delay: idx * 0.025 }}
                      onClick={() => setSelectedIdx(idx)}
                      className={`relative rounded-2xl p-4.5 transition-all duration-150 cursor-pointer border ${
                        isSelected
                          ? 'bg-white dark:bg-[#15151c] border-red-500 ring-2 ring-red-500/20 shadow-xl'
                          : 'bg-white/90 dark:bg-[#0e0e12] border-slate-200/80 dark:border-white/[0.06] hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-[#121218]'
                      }`}
                    >
                      <div className="flex items-start gap-3.5">
                        {/* Number Index Badge */}
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-mono font-bold transition-colors ${
                            isSelected
                              ? 'bg-red-600 text-white shadow-sm'
                              : 'bg-slate-100 text-slate-700 dark:bg-zinc-800 dark:text-zinc-300'
                          }`}
                        >
                          {idx + 1}
                        </div>

                        {/* Title Text & Metadata */}
                        <div className="flex-1 min-w-0 pr-2">
                          <p className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                            {title}
                          </p>

                          <div className="flex flex-wrap items-center gap-2 mt-2 pt-1 border-t border-slate-100 dark:border-white/[0.04]">
                            <span className={`text-[11px] font-mono font-medium px-2 py-0.5 rounded-md border ${badge.class}`}>
                              {badge.label}
                            </span>
                            {idx < 4 ? (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                                High Browse
                              </span>
                            ) : idx < 7 ? (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20">
                                Search Ranked
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20">
                                Viral Hook
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Copy Button with Accessible Focus */}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            copy(title, `title-${idx}`, `Title #${idx + 1}`);
                          }}
                          aria-label={`Copy title: ${title}`}
                          className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-zinc-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 focus:opacity-100 focus:ring-2 focus:ring-red-500 outline-none shrink-0 cursor-pointer transition-all active:scale-[0.92]"
                        >
                          {isCopied ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Signature Packaging Simulator & CTR Gauge (col-span-5) */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* 1. Algorithmic CTR Diagnostic Dashboard */}
                <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-white/[0.08] bg-white dark:bg-[#121216] shadow-xl">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100 dark:border-white/[0.06]">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-red-500" />
                      <h3 className="font-display font-bold text-slate-900 dark:text-white text-base">
                        Algorithmic CTR Diagnostic
                      </h3>
                    </div>
                    <span className="text-xs font-mono font-bold text-slate-500 dark:text-zinc-400">
                      Candidate #{selectedIdx + 1}
                    </span>
                  </div>

                  <div className="flex items-center gap-5 mb-5 pb-4 border-b border-slate-100 dark:border-white/[0.06]">
                    {/* Animated Score Gauge */}
                    <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          stroke="#e2e8f0"
                          strokeWidth="6"
                          fill="transparent"
                          className="dark:stroke-zinc-800"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          stroke="url(#ctrGrad)"
                          strokeWidth="6"
                          fill="transparent"
                          strokeDasharray={188}
                          strokeDashoffset={188 - (188 * score) / 100}
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out"
                        />
                        <defs>
                          <linearGradient id="ctrGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ef4444" />
                            <stop offset="100%" stopColor="#f43f5e" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute font-mono text-lg font-black text-slate-900 dark:text-white tabular-nums">
                        {score}
                      </span>
                    </div>

                    <div className="space-y-1">
                      <div className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        {score >= 85 ? (
                          <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <Sparkles className="w-4 h-4" /> Viral Tier Packaging
                          </span>
                        ) : score >= 70 ? (
                          <span className="text-blue-600 dark:text-blue-400">Solid CTR Rating</span>
                        ) : (
                          <span className="text-amber-600 dark:text-amber-400">Good — Room to Optimize</span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                        Evaluated against search indexing weights, curiosity triggers, and mobile viewport limits.
                      </p>
                    </div>
                  </div>

                  {/* 4 Algorithmic Quality Pillars */}
                  <div className="space-y-3">
                    {pillars.map((pillar, pIdx) => (
                      <div
                        key={pIdx}
                        className="flex items-start justify-between gap-3 p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-white/[0.04]"
                      >
                        <div className="flex items-start gap-2 min-w-0">
                          {pillar.passed ? (
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                          )}
                          <div>
                            <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                              {pillar.name}
                            </div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">
                              {pillar.detail}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono font-bold text-slate-600 dark:text-zinc-400 shrink-0">
                          {pillar.scoreText}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bridge Action to A/B Testing Simulator */}
                  <div className="pt-4 mt-4 border-t border-slate-100 dark:border-white/[0.06]">
                    <Link
                      href={`/youtube-ab-test-generator?title=${encodeURIComponent(selectedTitle)}`}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl text-xs font-bold text-red-600 dark:text-red-400 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 transition-all active:scale-[0.98]"
                    >
                      <span>Simulate 3-Way A/B Test Pack</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                {/* 2. The Signature Moment: Multi-Surface YouTube Packaging Simulator */}
                <div className="glass-card rounded-3xl p-6 border border-slate-200/80 dark:border-white/[0.08] bg-[#0c0c10] text-white shadow-2xl space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-red-500" />
                      <span className="text-xs font-bold tracking-tight text-zinc-200">
                        YouTube Studio Simulator
                      </span>
                    </div>

                    {/* Viewport Surface Switcher */}
                    <div className="flex items-center gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                      <button
                        type="button"
                        onClick={() => setActiveSurface('mobile')}
                        className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                          activeSurface === 'mobile'
                            ? 'bg-zinc-800 text-white shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <Smartphone className="w-3 h-3" />
                        <span>Mobile</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSurface('desktop')}
                        className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                          activeSurface === 'desktop'
                            ? 'bg-zinc-800 text-white shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <Monitor className="w-3 h-3" />
                        <span>Search</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveSurface('suggested')}
                        className={`px-2 py-1 rounded text-[11px] font-medium flex items-center gap-1 transition-all ${
                          activeSurface === 'suggested'
                            ? 'bg-zinc-800 text-white shadow-xs'
                            : 'text-zinc-400 hover:text-zinc-200'
                        }`}
                      >
                        <LayoutGrid className="w-3 h-3" />
                        <span>Suggested</span>
                      </button>
                    </div>
                  </div>

                  {/* Visual Safe-Zone Truncation Ruler */}
                  <div className="space-y-1.5 bg-zinc-900/80 p-3 rounded-xl border border-zinc-800/80">
                    <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span>Safe Zone (Chars 1-55)</span>
                      <span className="text-amber-400 font-bold">{selectedTitle.length} chars</span>
                    </div>
                    {/* Visual 3-tier bar */}
                    <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden flex">
                      <div className="w-[55%] bg-emerald-500 h-full" title="Mobile Safe Zone (≤55 chars)" />
                      <div className="w-[15%] bg-amber-500 h-full" title="Desktop Optimal (56-70 chars)" />
                      <div className="w-[30%] bg-rose-500/50 h-full" title="Mobile Truncation Zone (>70 chars)" />
                    </div>
                    <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
                      <span>0</span>
                      <span>55 (Mobile)</span>
                      <span>70 (Desktop)</span>
                      <span>100</span>
                    </div>
                  </div>

                  {/* Surface Feed Mockup */}
                  <div className="pt-1">
                    {activeSurface === 'mobile' && (
                      <div className="space-y-3">
                        <div className="aspect-video bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-900 rounded-xl relative overflow-hidden flex items-center justify-center border border-zinc-800 shadow-inner">
                          <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                            <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[14px] border-l-white ml-1" />
                          </div>
                          <span className="absolute bottom-2 right-2 bg-black/85 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">
                            14:28
                          </span>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 text-red-400 font-bold flex items-center justify-center shrink-0 text-xs">
                            FV
                          </div>
                          <div className="flex-1 min-w-0">
                            {/* Realistic Mobile Title Truncation at 2 lines / ~55 chars */}
                            <h4 className="text-sm font-semibold leading-snug line-clamp-2 text-zinc-100">
                              {selectedTitle || 'Your video title will render here...'}
                            </h4>
                            <div className="flex items-center gap-1.5 mt-1 text-zinc-400 text-xs">
                              <span className="font-medium text-zinc-300">FreeViralKit</span>
                              <span>•</span>
                              <span>184K views</span>
                              <span>•</span>
                              <span>2 days ago</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activeSurface === 'desktop' && (
                      <div className="flex gap-4 items-start bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                        <div className="w-40 aspect-video bg-zinc-800 rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center">
                            <div className="w-0 h-0 border-t-5 border-t-transparent border-b-5 border-b-transparent border-l-[10px] border-l-white ml-0.5" />
                          </div>
                          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-[9px] font-bold px-1 rounded font-mono">
                            14:28
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-sm font-semibold leading-snug text-zinc-100 line-clamp-2">
                            {selectedTitle}
                          </h4>
                          <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                            <span>FreeViralKit</span>
                            <span>•</span>
                            <span>184K views</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed">
                            Discover the highest-CTR title formulas for YouTube algorithm browse and search indexing...
                          </p>
                        </div>
                      </div>
                    )}

                    {activeSurface === 'suggested' && (
                      <div className="flex gap-3 items-start bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800">
                        <div className="w-32 aspect-video bg-zinc-800 rounded-lg shrink-0 relative overflow-hidden flex items-center justify-center">
                          <span className="absolute bottom-1 right-1 bg-black/80 text-[8px] font-bold px-1 rounded font-mono">
                            14:28
                          </span>
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <h4 className="text-xs font-semibold leading-tight text-zinc-100 line-clamp-2">
                            {selectedTitle}
                          </h4>
                          <div className="text-[10px] text-zinc-400">FreeViralKit</div>
                          <div className="text-[10px] text-zinc-500">184K views • 2 days ago</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Publishing Workflow Pipeline */}
            <CreatorPipelineBar
              currentStep="packaging"
              currentTool="youtube-title-generator"
              topic={selectedTitle || topic}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
