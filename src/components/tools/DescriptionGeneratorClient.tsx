'use client';

import { useState } from 'react';
import { generateDescriptionOnly } from '@/app/actions/descriptions';
import { motion, AnimatePresence } from 'framer-motion';
import { AlignLeft, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, Eye, Award, Check, AlertTriangle } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

interface DescriptionGeneratorClientProps {
  niche?: string;
}

export default function DescriptionGeneratorClient({ niche }: DescriptionGeneratorClientProps) {
  const [topic, setTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [description, setDescription] = useState('');
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : topic;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate ? description : '';
    setDescription('');
    setError(null);
    const result = await generateDescriptionOnly(inputVal, exclude, niche);
    if (result.success && result.description) setDescription(result.description);
    else setError(result.error || 'Failed to generate description');
    setIsGenerating(false);
  };

  const stripMarkdown = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '$1');

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => {
      if (index % 2 === 1) {
        return <strong key={index} className="text-slate-900 font-bold dark:text-white">{part}</strong>;
      }
      return part;
    });
  };

  const analyzeDescription = (desc: string) => {
    let score = 50;
    const charCount = desc.length;
    const checks = {
      length: { passed: false, text: 'Write a comprehensive description (1000+ chars)', color: 'text-slate-500' },
      links: { passed: false, text: 'Include social media, subscription, or affiliate links', color: 'text-slate-500' },
      hashtags: { passed: false, text: 'Add 3-5 relevant hashtags at the bottom', color: 'text-slate-500' },
      snippet: { passed: false, text: 'Front-load keywords in the first 150 characters', color: 'text-slate-500' },
    };

    if (charCount >= 1000 && charCount <= 4000) {
      score += 15;
      checks.length = { passed: true, text: `Good length (${charCount} characters)`, color: 'text-green-400' };
    } else if (charCount > 4000) {
      checks.length = { passed: false, text: 'Getting close to YouTube\'s 5000 character limit', color: 'text-yellow-400' };
    } else {
      checks.length = { passed: false, text: 'Too short (add chapters, links, or outlines)', color: 'text-slate-500' };
    }

    if (/https?:\/\/[^\s]+/.test(desc)) {
      score += 10;
      checks.links = { passed: true, text: 'Includes external links (good for conversions)', color: 'text-green-400' };
    }

    const hashtagCount = (desc.match(/#[a-zA-Z0-9_]+/g) || []).length;
    if (hashtagCount >= 3 && hashtagCount <= 5) {
      score += 10;
      checks.hashtags = { passed: true, text: `Perfect hashtag count (${hashtagCount} tags)`, color: 'text-green-400' };
    } else if (hashtagCount > 15) {
      checks.hashtags = { passed: false, text: 'Too many hashtags (more than 15 will be ignored)', color: 'text-red-400' };
    } else {
      checks.hashtags = { passed: false, text: 'Add 3-5 hashtags at the bottom', color: 'text-slate-500' };
    }

    if (charCount > 155) {
      const first150 = desc.slice(0, 150).toLowerCase();
      const hasAction = ['video', 'learn', 'show', 'tutorial', 'in this', 'how to', 'guide', 'review'].some(w => first150.includes(w));
      if (hasAction) {
        score += 15;
        checks.snippet = { passed: true, text: 'First 150 characters are highly descriptive', color: 'text-green-400' };
      }
    }

    return { score: Math.min(score, 100), checks };
  };

  const { score, checks } = description ? analyzeDescription(description) : { score: 0, checks: null };
  const getExamples = () => {
    if (niche === 'education') return ['Photosynthesis Explained', 'How to Write an Essay', 'History of Rome', 'Math Shortcuts'];
    if (niche === 'tech') return ['iPhone 16 Review', 'Best Laptops 2026', 'Mechanical Keyboard Build', 'Programming Setup'];
    return ['How To Bake Cake', 'iPhone 16 Review', 'Learn Piano Free', 'Paris Travel Guide'];
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder={niche ? `Enter your ${niche} video topic or title...` : "Enter your video topic or title (e.g. how to bake a chocolate cake, iphone 16 review...)"}
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()} />
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {getExamples().map(ex => (
            <button
              key={ex}
              onClick={() => {
                setTopic(ex);
                handleGenerate(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-slate-100 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        <button onClick={() => handleGenerate()} disabled={!topic.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating Description...</> : <><Sparkles className="w-5 h-5" /> Generate Description</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {description && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="font-display text-xl font-semibold">📝 Your Description</h2>
                <button onClick={() => handleGenerate(undefined, true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                  <RotateCcw className="w-3.5 h-3.5" /> Regenerate
                </button>
              </div>
              <button onClick={() => copy(stripMarkdown(description), 'desc')} aria-label="Copy description" className="copy-btn cursor-pointer">
                {copiedStates['desc'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600 dark:text-slate-400" /> Copy Description</>}
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Description Output */}
              <div className="lg:col-span-7 space-y-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col group hover:border-slate-300 dark:hover:border-slate-700 transition-all">
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-3 font-mono border-b dark:border-slate-800 pb-2">
                    <span>OUTPUT TEXT</span>
                    <span>{description.split(/\s+/).length} words • {description.length} chars</span>
                  </div>
                  <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed text-[0.95rem]">
                    {renderFormattedText(description)}
                  </p>
                </div>
              </div>

              {/* Sidebar with Mockup & SEO Analyzer */}
              <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
                {/* SEO Score Gauge */}
                <div className="glass-card rounded-2xl p-6 border border-slate-200/60 dark:border-slate-800/60 shadow-lg">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="w-5 h-5 text-green-400" />
                    <h3 className="font-display font-bold text-slate-800 dark:text-slate-200">SEO & Structure Score</h3>
                  </div>

                  <div className="flex items-center gap-5 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    {/* Circle Score Gauge */}
                    <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                      <svg className="w-full h-full transform -rotate-90">
                        <circle cx="32" cy="32" r="28" stroke="#f1f5f9" strokeWidth="6" fill="transparent" className="dark:stroke-slate-800" />
                        <circle cx="32" cy="32" r="28" stroke="url(#greenGrad)" strokeWidth="6" fill="transparent"
                          strokeDasharray={175} strokeDashoffset={175 - (175 * score) / 100} strokeLinecap="round" />
                        <defs>
                          <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#22c55e" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <span className="absolute font-mono text-base font-bold text-slate-800 dark:text-slate-100">{score}</span>
                    </div>

                    <div>
                      <div className="text-sm font-bold text-slate-800 dark:text-slate-100">
                        {score >= 80 ? '🔥 Expert Layout!' : score >= 65 ? '👍 Great Structure' : '⚠️ Missing Components'}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Based on YouTube crawl benchmarks for descriptions.</p>
                    </div>
                  </div>

                  {/* Checklist */}
                  {checks && (
                    <div className="space-y-3">
                      {(Object.keys(checks) as (keyof typeof checks)[]).map((key) => {
                        const check = checks[key];
                        return (
                          <div key={key} className="flex items-start gap-2.5 text-xs">
                            {check.passed ? (
                              <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                            )}
                            <span className={check.passed ? 'text-slate-700 dark:text-slate-300 font-medium' : 'text-slate-500 dark:text-slate-400'}>
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
                    <span className="font-semibold flex items-center gap-1.5"><Eye className="w-3.5 h-3.5" /> Search Snippet Preview</span>
                    <span className="bg-slate-800 px-2 py-0.5 rounded text-[10px]">Snippet</span>
                  </div>

                  <div className="space-y-3">
                    {/* Mock Search Result Card */}
                    <div className="flex gap-4">
                      {/* Video Thumbnail Placeholder */}
                      <div className="w-32 aspect-video bg-gradient-to-tr from-slate-900 to-slate-800 rounded-lg relative overflow-hidden flex items-center justify-center border border-slate-800/80 shrink-0">
                        <div className="w-7 h-7 rounded-full bg-red-600/90 flex items-center justify-center shadow-lg">
                          <div className="w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent border-l-[9px] border-l-white ml-0.5" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Mock Title */}
                        <h4 className="text-xs font-semibold leading-snug line-clamp-1 text-blue-400">
                          {topic ? `How to ${topic.replace(/^(how to|learn)\s+/i, '')}` : 'Optimized YouTube Video Title'}
                        </h4>

                        {/* Channel & views row */}
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          FreeViralKit Academy • 128K views
                        </div>

                        {/* Snippet Description */}
                        <p className="text-[10px] text-slate-400 mt-1 leading-normal line-clamp-2 italic">
                          {description ? `${description.slice(0, 140)}...` : 'Your generated description snippet will appear here when ranking in YouTube search feeds...'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5">
              <h4 className="font-display font-semibold text-green-400 mb-1 flex items-center gap-1.5">
                💡 Pro Tip: First 2 Lines Matter Most
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Front-load your primary focus keyword in the first two lines of your description. These first 150 characters are shown as a preview snippet in YouTube search results, directly impacting your video CTR.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
