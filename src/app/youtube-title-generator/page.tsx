'use client';

import { useState } from 'react';
import { generateTitles } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { Wand2, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, Eye, Award, Check, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import ErrorBanner from '@/components/ErrorBanner';

export default function TitleGeneratorPage() {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [selectedIdx, setSelectedIdx] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGenerating(true);
    setError(null);
    const exclude = isRegenerate ? titles : [];
    setTitles([]);
    setSelectedIdx(0);
    const result = await generateTitles(topic, exclude);
    if (result.success && result.titles) setTitles(result.titles);
    else setError(result.error || 'Failed to generate titles');
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70 ? 'text-green-400' : len < 50 ? 'text-yellow-400' : 'text-red-400';

  const analyzeTitle = (titleText: string) => {
    let score = 50;
    const len = titleText.length;
    const checks = {
      length: { passed: false, text: 'Keep length between 50-70 characters', color: 'text-slate-500' },
      emoji: { passed: false, text: 'Add 1-2 emojis to stand out visually', color: 'text-slate-500' },
      number: { passed: false, text: 'Include a number (e.g. 2026, 5 Steps) for higher CTR', color: 'text-slate-500' },
      powerWord: { passed: false, text: 'Use a curiosity-inducing power word (e.g., Secret, Easy, Best)', color: 'text-slate-500' },
    };

    if (len >= 50 && len <= 70) {
      score += 15;
      checks.length = { passed: true, text: 'Perfect title length (50-70 chars)', color: 'text-green-400' };
    } else if (len > 70) {
      checks.length = { passed: false, text: 'Too long (will be truncated in search feeds)', color: 'text-red-400' };
    } else {
      checks.length = { passed: false, text: 'Too short (underuse of keywords)', color: 'text-yellow-400' };
    }

    const emojiRegex = /[\p{Emoji_Presentation}\p{Extended_Pictographic}]/u;
    if (emojiRegex.test(titleText)) {
      score += 10;
      checks.emoji = { passed: true, text: 'Has visually appealing emojis', color: 'text-green-400' };
    }

    if (/\d+/.test(titleText)) {
      score += 10;
      checks.number = { passed: true, text: 'Includes digits/statistics', color: 'text-green-400' };
    }

    const powerWords = ['secret', 'mistake', 'review', 'how to', 'best', 'easy', 'fast', 'complete', 'guide', 'viral', 'hacks', 'tips', 'trick', 'tutorial', 'new', 'ultimate', 'stop', 'why', 'proof', 'revealed', 'under'];
    const lowerTitle = titleText.toLowerCase();
    const hasPower = powerWords.some(pw => lowerTitle.includes(pw));
    if (hasPower) {
      score += 15;
      checks.powerWord = { passed: true, text: 'Contains high-interest power word', color: 'text-green-400' };
    }

    return { score: Math.min(score, 100), checks };
  };

  const selectedTitle = titles[selectedIdx] || '';
  const { score, checks } = selectedTitle ? analyzeTitle(selectedTitle) : { score: 0, checks: null };

  return (
    <main className="container mx-auto px-6 py-12 max-w-5xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Sparkles className="w-4 h-4" /> AI Title Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Title Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate 10 viral, SEO-optimized YouTube titles with emojis and hashtags. Powered by AI — crafted for every niche.
        </p>
      </section>

      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="Enter your video topic (e.g. how to edit videos, fitness routine, gaming tips...)"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>
        <button onClick={() => handleGenerate(false)} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Titles...</> : <><Wand2 className="w-5 h-5" /> Generate 10 Titles</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Results */}
      <AnimatePresence>
        {titles.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your Generated Titles</h2>
              <button onClick={() => handleGenerate(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Titles list */}
              <div className="lg:col-span-7 flex flex-col gap-2.5">
                {titles.map((title, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    onClick={() => setSelectedIdx(idx)}
                    className={`bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-4 flex items-start gap-3 group transition-all cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 ${
                      selectedIdx === idx ? 'border-purple-500 ring-1 ring-purple-500/30 dark:ring-purple-500/40' : 'border-slate-200'
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                      selectedIdx === idx ? 'bg-purple-500 text-white' : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[1.01rem] leading-snug font-medium text-slate-800 dark:text-slate-100">{title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`text-xs font-mono ${charColor(title.length)}`}>{title.length} chars</span>
                        {idx < 5 ? (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">SEO</span>
                        ) : idx < 8 ? (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">VIRAL</span>
                        ) : (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">TRENDING</span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copy(title, `title-${idx}`);
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-200 shrink-0 cursor-pointer"
                    >
                      {copiedStates[`title-${idx}`] ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    </button>
                  </motion.div>
                ))}

                <button onClick={() => copy(titles.join('\n'), 'all-titles')} className="w-full py-3 rounded-xl bg-slate-100 border border-slate-200 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-all cursor-pointer">
                  {copiedStates['all-titles'] ? '✓ All Titles Copied!' : 'Copy All Titles'}
                </button>
              </div>

              {/* Sidebar with Mockup & SEO Analyzer */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* SEO Score Gauge */}
                <div className="glass-card rounded-2xl p-6 border border-slate-200/60 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-purple-400" />
                    <h3 className="font-display font-bold text-slate-800">SEO & CTR Analyzer</h3>
                  </div>

                  <div className="flex items-center gap-5 mb-5 pb-4 border-b border-slate-100">
                    {/* Circle Score Gauge */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" />
                        <circle cx="32" cy="32" r="28" stroke="url(#purpleGrad)" strokeWidth="6" fill="transparent"
                          strokeDasharray={175} strokeDashoffset={175 - (175 * score) / 100} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute font-mono text-base font-bold text-slate-800">{score}</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-800">
                        {score >= 80 ? '🔥 Great Title!' : score >= 65 ? '👍 Good Potential' : '⚠️ Optimize Recommended'}
                      </div>
                      <p className="text-xs text-slate-500">Based on metrics matching high-CTR search templates.</p>
                    </div>
                  </div>

                  {/* Checklist */}
                  {checks && (
                    <div className="space-y-3">
                      {(Object.keys(checks) as Array<keyof typeof checks>).map((key) => {
                        const check = checks[key];
                        return (
                          <div key={key} className="flex items-start gap-2.5 text-xs">
                            {check.passed ? (
                              <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className={check.passed ? 'text-slate-700 font-medium' : 'text-slate-500'}>
                              {check.text}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* YouTube Search Result Live Mockup */}
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-lg text-white">
                  <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-3 mb-4">
                    <span className="font-semibold flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> YouTube Feed Preview</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">Mobile</span>
                  </div>

                  <div className="space-y-3.5">
                    {/* Mock Search Result Card */}
                    <div className="flex flex-col gap-2.5">
                      {/* Video Thumbnail Placeholder */}
                      <div className="aspect-video bg-gradient-to-tr from-slate-900 to-slate-800 rounded-xl relative overflow-hidden flex items-center justify-center border border-slate-800/80">
                        <div className="w-12 h-12 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                          <div className="w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-[14px] border-l-white ml-1" />
                        </div>
                        <span className="absolute bottom-2 right-2 bg-slate-950/80 text-[10px] font-bold px-1.5 py-0.5 rounded font-mono">10:45</span>
                      </div>

                      {/* Title & Metadata row */}
                      <div className="flex gap-3">
                        {/* Channel logo placeholder */}
                        <div className="w-9 h-9 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-400 font-bold flex items-center justify-center shrink-0 text-sm">
                          FV
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* Truncated Selected Title */}
                          <h4 className="text-sm font-semibold leading-snug line-clamp-2 text-slate-100 pr-2">
                            {selectedTitle || 'Your video title will render here...'}
                          </h4>

                          {/* Channel & views row */}
                          <div className="flex flex-col gap-0.5 mt-1 text-slate-400 text-xs">
                            <span className="flex items-center gap-1">
                              FreeViralKit Academy
                              <span className="w-3 h-3 rounded-full bg-slate-700 text-slate-300 flex items-center justify-center text-[8px]">✓</span>
                            </span>
                            <span>128K views • 2 weeks ago</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.titleBottom} />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Write the Perfect YouTube Title</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Your YouTube title is the most important ranking factor for your videos. It determines whether viewers click on your video in search results, suggested videos, and their home feed.</p>
          <p>A great YouTube title should be <strong className="text-slate-900">50-70 characters</strong>, include your primary keyword, use power words that trigger curiosity, and match the search intent of your target audience.</p>
          <p>Our AI YouTube title generator analyzes your topic, detects the niche, and creates 10 unique titles using proven formats that real successful creators use — not generic clickbait.</p>
        </div>
        <h3 className="font-display text-xl font-bold">Tips for YouTube Titles That Get Clicks</h3>
        <ul className="space-y-2 text-slate-600">
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Include your main keyword in the first 50 characters</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Use numbers and specific details (e.g. &quot;in 5 minutes&quot;)</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Add 1-2 relevant emojis to increase CTR by up to 33%</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Append 1-2 hashtags at the end for discoverability</span></li>
          <li className="flex items-start gap-2"><span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" /><span>Avoid misleading clickbait — it hurts watch time</span></li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Need the full SEO package? Get titles + descriptions + hashtags + tags all at once.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full SEO Optimizer →
          </Link>
        </div>
      </section>
    </main>
  );
}
