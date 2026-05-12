'use client';

import { useState } from 'react';
import { generateTitles, generateDetails } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Video, Copy, CheckCircle2, ChevronRight, Hash, Tag, AlignLeft,
  Loader2, Sparkles, RotateCcw, Zap, Package, MessageCircle, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';

type Details = { description: string; hashtags: string[]; tags: string[]; pinnedComment: string };

export default function Home() {
  const [topic, setTopic] = useState('');
  const [isGeneratingTitles, setIsGeneratingTitles] = useState(false);
  const [titles, setTitles] = useState<string[]>([]);
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);
  const [isGeneratingDetails, setIsGeneratingDetails] = useState(false);
  const [details, setDetails] = useState<Details | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const handleGenerateTitles = async () => {
    if (!topic.trim()) return;
    setIsGeneratingTitles(true);
    setTitles([]); setSelectedTitle(null); setDetails(null);
    const result = await generateTitles(topic);
    if (result.success && result.titles) setTitles(result.titles);
    else alert(result.error || 'Failed to generate titles');
    setIsGeneratingTitles(false);
  };

  const handleSelectTitle = async (title: string) => {
    setSelectedTitle(title);
    setIsGeneratingDetails(true);
    setDetails(null);
    const result = await generateDetails(title);
    if (result.success && result.details) setDetails(result.details);
    else alert(result.error || 'Failed to generate details');
    setIsGeneratingDetails(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) { console.error('Failed to copy', err); }
  };

  const copyFullPackage = () => {
    if (!details || !selectedTitle) return;
    const full = `TITLE:\n${selectedTitle}\n\nDESCRIPTION:\n${details.description}\n\nHASHTAGS:\n${details.hashtags.join(' ')}\n\nTAGS:\n${details.tags.join(', ')}\n\nPINNED COMMENT:\n${details.pinnedComment}`;
    copy(full, 'full-package');
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70 ? 'text-green-400' : len < 50 ? 'text-yellow-400' : 'text-red-400';

  const tagsTotalChars = (tags: string[]) => tags.join(', ').length;

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-cyan-400 bg-cyan-400/10 border border-cyan-400/20 mb-6 uppercase tracking-wider">
          <span className="pulse-dot" /> YouTube SEO Optimizer
        </div>
        <h1 className="font-display text-4xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6">
          Supercharge Your <br /><span className="text-gradient">YouTube Growth</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Enter your video topic — get 10 SEO-optimized titles with emojis &amp; hashtags.
          Pick one to unlock description, hashtags &amp; tags.
        </p>
      </section>

      {/* Step 1 */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="step-badge"><Sparkles className="w-5 h-5" /></div>
          <h2 className="font-display text-xl font-semibold">1. Enter Your Video Topic</h2>
        </div>
        <div className="relative mb-4">
          <input type="text" value={topic} onChange={e => setTopic(e.target.value)}
            placeholder="e.g., how to make pasta, iphone 16 review, minecraft survival ep 1..."
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerateTitles()} />
        </div>
        <button onClick={handleGenerateTitles} disabled={!topic.trim() || isGeneratingTitles}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2">
          {isGeneratingTitles ? <><Loader2 className="w-5 h-5 animate-spin" /> Generating 10 Titles...</> : <><Wand2 className="w-5 h-5" /> Generate Optimized Titles</>}
        </button>
      </motion.div>

      {/* Skeleton */}
      <AnimatePresence>
        {isGeneratingTitles && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="glass-card rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="step-badge step-badge-blue"><Video className="w-5 h-5" /></div>
              <h2 className="font-display text-xl font-semibold">2. AI is crafting your titles...</h2>
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
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="step-badge step-badge-blue"><Video className="w-5 h-5" /></div>
                <h2 className="font-display text-xl font-semibold">2. Pick Your Title</h2>
              </div>
              <button onClick={handleGenerateTitles} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors">
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
                      selectedTitle === title ? 'bg-purple-500/15 border-purple-500/60 shadow-[0_0_20px_rgba(139,92,246,0.15)]' : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                    }`}>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-sm font-bold mt-0.5 transition-all ${
                      selectedTitle === title ? 'bg-purple-500 text-slate-900' : 'bg-slate-200 text-slate-600 group-hover:bg-white/15'
                    }`}>
                      {selectedTitle === title && isGeneratingDetails ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        : selectedTitle === title ? <CheckCircle2 className="w-3.5 h-3.5" /> : idx + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[1.02rem] leading-snug">{title}</p>
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
                    <button onClick={e => { e.stopPropagation(); copy(title, `title-${idx}`); }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-slate-200 shrink-0">
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

      {/* In-content Ad between titles and SEO package */}
      {titles.length > 0 && <InContentAd slot={adSlots.homeMid} />}

      {/* Step 3: SEO Package — All Stacked */}
      <AnimatePresence>
        {(details || (isGeneratingDetails && selectedTitle)) && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="step-badge step-badge-green"><Zap className="w-5 h-5" /></div>
                <div>
                  <h2 className="font-display text-xl font-semibold">3. Your SEO Package</h2>
                  <p className="text-sm text-slate-500 truncate max-w-md">For: <span className="text-slate-700 italic">&ldquo;{selectedTitle}&rdquo;</span></p>
                </div>
              </div>
              {details && (
                <button onClick={copyFullPackage} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-primary text-slate-900 text-sm font-semibold hover:opacity-90 transition-all shadow-[0_4px_15px_rgba(139,92,246,0.3)]">
                  {copiedStates['full-package'] ? <><CheckCircle2 className="w-4 h-4" /> Copied!</> : <><Package className="w-4 h-4" /> Copy Full Package</>}
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
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 flex items-center justify-center shrink-0"><AlignLeft className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">📝 Optimized Description</h3>
                        <span className="text-xs text-slate-500">{details.description.split(/\s+/).length} words</span>
                      </div>
                    </div>
                    <button onClick={() => copy(details.description, 'desc')} className="copy-btn">
                      {copiedStates['desc'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy</>}
                    </button>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                    <p className="whitespace-pre-wrap text-slate-700 leading-relaxed text-[0.95rem]" dangerouslySetInnerHTML={{ __html: details.description.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-900">$1</strong>') }} />
                  </div>
                </motion.div>

                {/* Hashtags */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-pink-500/10 text-pink-400 flex items-center justify-center shrink-0"><Hash className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold"># Hashtags</h3>
                        <span className="text-xs text-slate-500">⭐ First 3 appear above your video title</span>
                      </div>
                    </div>
                    <button onClick={() => copy(details.hashtags.join(' '), 'hash')} className="copy-btn">
                      {copiedStates['hash'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {details.hashtags.map((ht, idx) => (
                      <motion.button key={idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.04 }}
                        onClick={() => copy(ht, `ht-${idx}`)}
                        className={`px-4 py-2.5 rounded-xl font-medium transition-all hover:scale-105 cursor-pointer ${
                          idx < 3 ? 'bg-pink-500/15 border border-pink-500/30 text-pink-300 shadow-[0_0_10px_rgba(236,72,153,0.1)]'
                            : 'bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200'
                        }`}>
                        {copiedStates[`ht-${idx}`] ? <span className="text-green-400">Copied!</span> : (ht.startsWith('#') ? ht : `#${ht}`)}
                        {idx < 3 && <span className="ml-2 text-[10px] bg-pink-500/20 text-pink-300 px-1.5 py-0.5 rounded-full">TOP</span>}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>

                {/* Tags */}
                <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card rounded-2xl p-6 md:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0"><Tag className="w-4 h-4" /></div>
                      <div>
                        <h3 className="font-display text-lg font-semibold">🏷️ Tags</h3>
                        <span className="text-xs text-slate-500">Paste in YouTube Studio → Tags</span>
                      </div>
                    </div>
                    <button onClick={() => copy(details.tags.join(', '), 'tags')} className="copy-btn">
                      {copiedStates['tags'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy All</>}
                    </button>
                  </div>
                  {/* Tag character limit bar */}
                  <div className="mb-4 bg-slate-100 rounded-lg p-3 border border-slate-100">
                    <div className="flex justify-between text-xs mb-1.5">
                      <span className="text-slate-600">Tag characters used</span>
                      <span className={tagsTotalChars(details.tags) <= 500 ? 'text-green-400' : 'text-red-400'}>
                        {tagsTotalChars(details.tags)} / 500
                      </span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
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
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-yellow-500/10 text-yellow-400 flex items-center justify-center shrink-0"><MessageCircle className="w-4 h-4" /></div>
                        <div>
                          <h3 className="font-display text-lg font-semibold">📌 Pinned Comment</h3>
                          <span className="text-xs text-slate-500">Pin this to boost engagement</span>
                        </div>
                      </div>
                      <button onClick={() => copy(details.pinnedComment, 'pinned')} className="copy-btn">
                        {copiedStates['pinned'] ? <><CheckCircle2 className="w-4 h-4 text-green-400" /> Copied!</> : <><Copy className="w-4 h-4 text-slate-600" /> Copy</>}
                      </button>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
                      <p className="whitespace-pre-wrap text-slate-700 leading-relaxed">{details.pinnedComment}</p>
                    </div>
                  </motion.div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tool Links Section — SEO Internal Linking */}
      <section className="mt-20 mb-12">
        <h2 className="font-display text-2xl md:text-3xl font-extrabold text-center mb-3">
          Individual <span className="text-gradient">SEO Tools</span>
        </h2>
        <p className="text-slate-500 text-center mb-10 max-w-xl mx-auto">Need just one piece of the puzzle? Use our dedicated generators.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { href: '/youtube-title-generator', icon: Wand2, label: 'YouTube Title Generator', desc: 'Get 10 viral, SEO-optimized titles', color: 'purple' },
            { href: '/youtube-hashtag-generator', icon: Hash, label: 'YouTube Hashtag Generator', desc: 'Trending hashtags for any niche', color: 'pink' },
            { href: '/youtube-tags-generator', icon: Tag, label: 'YouTube Tags Generator', desc: '20-25 SEO tags under 500 chars', color: 'cyan' },
            { href: '/youtube-description-generator', icon: AlignLeft, label: 'YouTube Description Generator', desc: 'Keyword-rich descriptions in seconds', color: 'green' },
          ].map((tool) => (
            <Link key={tool.href} href={tool.href}
              className="glass-card rounded-2xl p-5 group hover:border-purple-500/30 transition-all flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-${tool.color}-500/10 text-${tool.color}-400 flex items-center justify-center shrink-0`}>
                <tool.icon className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-display text-base font-bold group-hover:text-purple-400 transition-colors">{tool.label}</h3>
                <p className="text-slate-500 text-sm">{tool.desc}</p>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-600 group-hover:text-purple-400 transition-colors shrink-0" />
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section for SEO */}
      <section className="mt-12 mb-8">
        <h2 className="font-display text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: 'Is FreeViralKit really free?', a: 'Yes — 100% free, no signup, no credit card. Generate unlimited titles, descriptions, hashtags, and tags.' },
            { q: 'How does the AI generate YouTube titles?', a: 'We use Groq AI with advanced language models trained on successful YouTube title patterns across every niche.' },
            { q: 'Will these tags and titles help me rank?', a: 'Yes — our AI generates content following YouTube SEO best practices: proper keyword placement, optimal character counts, and trending formats.' },
            { q: 'Can I use FreeViralKit for YouTube Shorts?', a: 'Absolutely! FreeViralKit works for long-form videos and Shorts. The AI adapts its output to match your content type.' },
          ].map((faq, i) => (
            <div key={i} className="glass-card rounded-xl p-5">
              <h3 className="font-display text-base font-semibold mb-2">{faq.q}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
