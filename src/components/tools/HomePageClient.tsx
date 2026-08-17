'use client';

import { useState, useRef } from 'react';
import { generateTitles } from '@/app/actions/titles';
import { generateDetails } from '@/app/actions/details';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Video, Copy, CheckCircle2, ChevronRight, ChevronDown, Hash, Tag, AlignLeft,
  Loader2, Sparkles, RotateCcw, Zap, Package, MessageCircle, AlertTriangle, ExternalLink
} from 'lucide-react';
import Link from 'next/link';

type Details = { description: string; hashtags: string[]; tags: string[]; pinnedComment: string };

export default function HomePageClient() {
  const [topic, setTopic] = useState('');
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);
  const [details, setDetails] = useState<Details | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [showDebug, setShowDebug] = useState(false);
  const detailsSectionRef = useRef<HTMLDivElement>(null);

  const handleGenerateTitles = async (isRegenerate = false) => {
    if (!topic.trim()) return;
    setIsGeneratingTitles(true);
    setError(null);
    const exclude = isRegenerate ? titles : [];
    setTitles([]); setSelectedTitle(null); setDetails(null);
    const result = await generateTitles(topic, exclude);
    if (result.success && result.titles) setTitles(result.titles);
    else setError(result.error || 'Failed to generate titles');
    setIsGeneratingTitles(false);
  };

  const handleSelectTitle = async (title: string) => {
    setSelectedTitle(title);
    setIsGeneratingDetails(true);
    setError(null);
    setDetails(null);

    // Smoothly scroll down to the SEO package section with sticky navbar offset
    setTimeout(() => {
      if (detailsSectionRef.current) {
        const yOffset = -80;
        const y = detailsSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 80);

    const result = await generateDetails(title);
    if (result.success && result.details) setDetails(result.details);
    else setError(result.error || 'Failed to generate details');
    setIsGeneratingDetails(false);
  };

  const stripMarkdown = (text: string) => text.replace(/\*\*(.*?)\*\*/g, '$1');

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const copyFullPackage = () => {
    if (!details || !selectedTitle) return;
    const cleanDesc = stripMarkdown(details.description);
    const cleanPinned = stripMarkdown(details.pinnedComment);
    const full = `TITLE:\n${selectedTitle}\n\nDESCRIPTION:\n${cleanDesc}\n\nHASHTAGS:\n${details.hashtags.join(' ')}\n\nTAGS:\n${details.tags.join(', ')}\n\nPINNED COMMENT:\n${cleanPinned}`;
    copy(full, 'full-package');
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70 ? 'text-green-600 dark:text-green-400' : len < 50 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400';

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

  const tagsTotalChars = (tags: string[]) => tags.join(', ').length;

  return (
    <>
      {/* Accessible live region for screen reader announcements */}
      <div aria-live="polite" aria-busy={isGeneratingTitles || isGeneratingDetails}>
      {/* Real-Time Movie & Live Topic Banner */}
      <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50/80 dark:from-indigo-950/80 dark:via-purple-950/80 dark:to-slate-900/80 border border-indigo-200/80 dark:border-indigo-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-300 shrink-0 font-bold">🎬</span>
          <div className="text-sm">
            <span className="font-semibold text-slate-900 dark:text-white">Making a video about a real-world movie, trailer, or news? </span>
            <span className="text-slate-600 dark:text-slate-300">Try our Real-Time Movie AI Tool for live plot facts, tags & descriptions.</span>
          </div>
        </div>
        <Link
          href="/youtube-realtime-title-generator"
          className="shrink-0 px-4 py-2.5 text-xs font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white active:scale-[0.96] transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5"
        >
          Real-Time Movie Tool ⚡ <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Step 1 */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="step-badge"><Sparkles className="w-5 h-5" /></div>
          <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">1. Enter Your Video Topic</h2>
        </div>
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g., how to make pasta, iphone 16 review, minecraft survival ep 1..."
            className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-4 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerateTitles()} />
        </div>
        <button onClick={() => handleGenerateTitles(false)} disabled={!topic.trim() || isGeneratingTitles}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer">
          {isGeneratingTitles ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating 10 Titles...</> : <><Wand2 className="w-5 h-5" /> Generate Optimized Titles</>}
        </button>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="font-display font-semibold text-red-400 mb-1">AI Generation Error</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                The AI system encountered an issue while generating content. Please try again.
              </p>
              <button onClick={() => setShowDebug(!showDebug)} className="text-xs text-red-400/80 hover:text-red-400 underline mt-3 block cursor-pointer">
                {showDebug ? 'Hide Technical Details' : 'Show Technical Details'}
              </button>
              {showDebug && (
                <pre className="mt-3 p-4 bg-slate-900 text-red-300 rounded-xl text-xs font-mono whitespace-pre-wrap leading-normal border border-slate-800">
                  {error}
                </pre>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Skeleton */}
      <AnimatePresence>
        {isGeneratingTitles && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="step-badge step-badge-blue"><Video className="w-5 h-5" /></div>
              <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">2. AI is crafting your titles...</h2>
            </div>
            <div className="flex flex-col gap-3">
              {[...Array(5)].map((_, i) => <div key={i} className="skeleton-line" style={{ animationDelay: `${i * 0.15}s`, width: `${85 - i * 5}%` }} />)}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 2: Titles */}
      <AnimatePresence>
        {titles.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="step-badge step-badge-blue shrink-0"><Video className="w-5 h-5" /></div>
                <div>
                  <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white">2. Pick Your Title</h2>
                  <p className="text-xs sm:text-sm text-purple-600 dark:text-purple-400 font-medium flex items-center gap-1.5 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5 shrink-0 animate-pulse" /> Click any title below to generate description, tags &amp; hashtags
                  </p>
                </div>
              </div>
              <button onClick={() => handleGenerateTitles(true)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>
            <div className="flex flex-col gap-2.5">
              {titles.map((title, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.05 }}>
                  <div onClick={() => !(isGeneratingDetails && selectedTitle !== title) && handleSelectTitle(title)}
                    className={`title-card w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 group ${
                      (isGeneratingDetails && selectedTitle !== title) ? 'opacity-50 cursor-not-allowed ' : 'cursor-pointer '
                    }${
                      selectedTitle === title ? 'bg-purple-500/15 border-purple-500/60 dark:border-purple-500/40 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
                    }`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 transition-all ${
                      selectedTitle === title ? 'bg-purple-500 text-white' : 'bg-slate-200 text-slate-600 group-hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-400'
                    }`}>
                      {selectedTitle === title && isGeneratingDetails ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : selectedTitle === title ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[1.02rem] leading-snug text-slate-800 dark:text-slate-100 font-medium">{title}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1.5">
                        <span className={`text-xs font-mono ${charColor(title.length)}`}>{title.length} chars</span>
                        {idx < 5 ? (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 border border-blue-500/20">SEO</span>
                        ) : idx < 8 ? (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/20">VIRAL</span>
                        ) : (
                          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-pink-500/15 text-pink-400 border border-pink-500/20">TRENDING</span>
                        )}
                        {selectedTitle === title && isGeneratingDetails ? (
                          <span className="text-[11px] font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                            <Loader2 className="w-3 h-3 animate-spin" /> Generating description, tags &amp; hashtags...
                          </span>
                        ) : selectedTitle === title && details ? (
                          <span className="text-[11px] font-semibold text-green-600 dark:text-green-400 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> SEO Package Generated Below ↓
                          </span>
                        ) : (
                          <span className="text-[11px] font-medium text-slate-500 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors flex items-center gap-1">
                            Click to generate description, tags &amp; hashtags <ChevronDown className="w-3 h-3 transition-transform group-hover:translate-y-0.5" />
                          </span>
                        )}
                      </div>
                    </div>
                    <button onClick={e => { e.stopPropagation(); copy(title, `title-${idx}`); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 shrink-0 cursor-pointer">
                      {copiedStates[`title-${idx}`] ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-500" />}
                    </button>
                    <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-colors ${selectedTitle === title ? 'text-purple-400' : 'text-gray-600'}`} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: SEO Package */}
      <AnimatePresence>
        {(details || (isGeneratingDetails && selectedTitle)) && (
          <motion.div
            ref={detailsSectionRef}
            id="seo-package-section"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 scroll-mt-24"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3 min-w-0 w-full">
                <div className="step-badge step-badge-green shrink-0"><Zap className="w-5 h-5" /></div>
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-semibold text-slate-900 dark:text-white truncate">3. Your SEO Package</h2>
                  <p className="text-sm text-slate-500 truncate max-w-full">For: <span className="text-slate-700 dark:text-slate-300 italic">&ldquo;{selectedTitle}&rdquo;</span></p>
                </div>
              </div>
              {details && (
                <button onClick={copyFullPackage} className="w-full sm:w-auto shrink-0 flex justify-center items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-primary text-slate-900 text-sm font-semibold hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)] cursor-pointer">
                  {copiedStates['full-package'] ? <><CheckCircle2 className="w-4 h-4 shrink-0" /> Copied!</> : <><Package className="w-4 h-4 shrink-0" /> Copy Full Package</>}
                </button>
              )}
            </div>

            {/* Loading */}
            {isGeneratingDetails && !details && (
              <div className="glass-card rounded-2xl p-6 md:p-8">
                <div className="space-y-3">
                  {[...Array(6)].map((_, i) => <div key={i} className="skeleton-line" style={{ animationDelay: `${i * 0.12}s`, width: `${95 - i * 8}%` }} />)}
                </div>
              </div>
            )}

            {details && (
              <>
                {/* Description */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0"><AlignLeft className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">📝 Optimized Description</h3>
                        <span className="text-xs text-slate-500">{details.description.split(/\s+/).length} words</span>
                      </div>
                    </div>
                    <button onClick={() => copy(stripMarkdown(details.description), 'desc')} className="copy-btn cursor-pointer" aria-label="Copy description">
                      {copiedStates['desc'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy</>}
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800">
                    <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed text-[0.95rem]">
                      {renderFormattedText(details.description)}
                    </p>
                  </div>
                </motion.div>

                {/* Hashtags */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0"><Hash className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white"># Hashtags</h3>
                        <span className="text-xs text-slate-500">⭐ First 3 appear above your video title</span>
                      </div>
                    </div>
                    <button onClick={() => copy(details.hashtags.join(' '), 'hash')} className="copy-btn cursor-pointer" aria-label="Copy hashtags">
                      {copiedStates['hash'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details.hashtags.map((ht, idx) => (
                      <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}
                        onClick={() => copy(ht, `ht-${idx}`)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105 cursor-pointer ${
                          idx < 3 ? 'bg-pink-500/15 border border-pink-500/30 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                            : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}>
                        {copiedStates[`ht-${idx}`] ? <span className="text-green-400">Copied!</span> : (ht.startsWith('#') ? ht : `#${ht}`)}
                        {idx < 3 && <span className="ml-2 text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full">TOP</span>}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Tag className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">🏷️ Tags</h3>
                        <span className="text-xs text-slate-500">Paste in YouTube Studio → Tags</span>
                      </div>
                    </div>
                    <button onClick={() => copy(details.tags.join(', '), 'tags')} className="copy-btn cursor-pointer" aria-label="Copy tags">
                      {copiedStates['tags'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
                    </button>
                  </div>
                  {/* Tag character limit bar */}
                  <div className="mb-4 bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 border border-slate-100 dark:border-slate-700">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600 dark:text-slate-400">Tag characters used</span>
                      <span className={tagsTotalChars(details.tags) <= 500 ? 'text-green-400' : 'text-red-400'}>
                        {tagsTotalChars(details.tags)} / 500
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full transition-all ${tagsTotalChars(details.tags) <= 400 ? 'bg-green-500' : tagsTotalChars(details.tags) <= 500 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min((tagsTotalChars(details.tags) / 500) * 100, 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details.tags.map((tag, idx) => (
                      <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.03 }}
                        onClick={() => copy(tag, `tag-${idx}`)}
                        className="px-3 py-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium hover:bg-cyan-500/20 hover:scale-105 transition-all cursor-pointer">
                        {copiedStates[`tag-${idx}`] ? <span className="text-green-400">✓</span> : tag}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Pinned Comment */}
                {details.pinnedComment && (
                  <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card rounded-2xl p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0"><MessageCircle className="w-4 h-4" /></div>
                        <div>
                          <h3 className="font-display text-lg font-semibold text-slate-900 dark:text-white">📌 Pinned Comment</h3>
                          <span className="text-xs text-slate-500">Pin this to boost engagement</span>
                        </div>
                      </div>
                      <button onClick={() => copy(details.pinnedComment, 'pinned')} className="copy-btn cursor-pointer" aria-label="Copy pinned comment">
                        {copiedStates['pinned'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy</>}
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 dark:bg-slate-900/40 dark:border-slate-800">
                      <p className="whitespace-pre-wrap text-slate-700 dark:text-slate-300 leading-relaxed">{details.pinnedComment}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </>
  );
}
