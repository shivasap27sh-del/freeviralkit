'use client';

import { useState } from 'react';
import { generateChannelNames } from '../actions';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import ErrorBanner from '@/components/ErrorBanner';

type ChannelNames = {
  catchy: string[];
  seo: string[];
  brandable: string[];
  shorts: string[];
};

export default function ChannelNameGeneratorPage() {
  const [keyword, setKeyword] = useState('');
  const [style, setStyle] = useState('default');
  const [isGenerating, setIsGenerating] = useState(false);
  const [names, setNames] = useState<ChannelNames | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);
  const [savedNames, setSavedNames] = useState<string[]>([]);

  const handleGenerate = async (val?: string, isRegenerate = false) => {
    const inputVal = val !== undefined ? val : keyword;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    const exclude = isRegenerate && names ? [...names.catchy, ...names.seo, ...names.brandable, ...names.shorts] : [];
    setNames(null);
    setError(null);
    const result = await generateChannelNames(inputVal, style, exclude);
    if (result.success && result.names) {
      setNames(result.names as ChannelNames);
    } else {
      setError(result.error || 'Failed to generate channel names');
    }
    setIsGenerating(false);
  };

  const copy = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(p => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates(p => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const toggleSave = (name: string) => {
    setSavedNames(prev => prev.includes(name) ? prev.filter(item => item !== name) : [...prev, name]);
  };

  const examples = ['Gaming Tech', 'Healthy Recipes', 'Travel Vlog', 'Side Hustles'];
  const styles = [
    { value: 'default', label: '🎯 Balanced Vibe' },
    { value: 'creative', label: '🌟 Creative & Abstract' },
    { value: 'punny', label: '💡 Clever & Punny' },
    { value: 'corporate', label: '💼 Professional' },
  ];

  const categoryTitles = {
    catchy: '💡 Modern & Catchy',
    seo: '🔍 SEO-Optimized',
    brandable: '🌟 Brandable & Abstract',
    shorts: '⚡ Shorts Focus',
  };

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <User className="w-4 h-4" /> AI Channel Name Generator
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Channel Name Generator</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Generate 15 creative, memorable YouTube channel name ideas matching your niche. Categorized for easy selection.
        </p>
      </section>

      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <input
              type="text"
              value={keyword}
              onChange={e => setKeyword(e.target.value)}
              placeholder="Enter your niche or keyword (e.g. gaming, vegan cooking, tech reviews...)"
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
              onKeyDown={e => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          <div>
            <select
              value={style}
              onChange={e => setStyle(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg h-full cursor-pointer"
            >
              {styles.map(s => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {examples.map(ex => (
            <button
              key={ex}
              onClick={() => {
                setKeyword(ex);
                handleGenerate(ex);
              }}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-950 hover:bg-slate-200 transition-all cursor-pointer"
            >
              {ex}
            </button>
          ))}
        </div>

        <button
          onClick={() => handleGenerate()}
          disabled={!keyword.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Generating Names...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Generate 15 Names
            </>
          )}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Results */}
      <AnimatePresence>
        {names && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Your Generated Channel Names</h2>
              <button
                onClick={() => handleGenerate(undefined, true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Regenerate
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(Object.keys(categoryTitles) as Array<keyof ChannelNames>).map(catKey => {
                const list = names[catKey];
                return (
                  <div key={catKey} className="glass-card rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-display font-bold text-slate-800">{categoryTitles[catKey]}</h3>
                        <button
                          onClick={() => copy(list.join('\n'), `all-${catKey}`)}
                          className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                        >
                          {copiedStates[`all-${catKey}`] ? 'Copied All!' : 'Copy All'}
                        </button>
                      </div>
                      <div className="space-y-2">
                        {list.map((name, idx) => {
                          const isSaved = savedNames.includes(name);
                          return (
                            <div
                              key={idx}
                              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-3 flex items-center justify-between group hover:border-slate-300 dark:hover:border-slate-700 transition-all"
                            >
                              <span className="font-medium text-slate-800 dark:text-slate-100 text-sm">{name}</span>
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => toggleSave(name)}
                                  className="p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  <Star className={`w-3.5 h-3.5 ${isSaved ? 'text-yellow-500 fill-yellow-500' : 'text-slate-400'}`} />
                                </button>
                                <button
                                  onClick={() => copy(name, `${catKey}-${idx}`)}
                                  className="p-1 rounded hover:bg-slate-100 transition-colors cursor-pointer"
                                >
                                  {copiedStates[`${catKey}-${idx}`] ? (
                                    <CheckCircle2 className="w-3.5 h-3.5 text-green-400" />
                                  ) : (
                                    <Copy className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600" />
                                  )}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Saved Favorites Section */}
            {savedNames.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-2xl p-6 border border-yellow-400/20 bg-yellow-500/5 mt-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-display font-bold text-slate-800 flex items-center gap-1.5">
                    ⭐ Saved Favorites ({savedNames.length})
                  </h3>
                  <button
                    onClick={() => copy(savedNames.join('\n'), 'saved-names-all')}
                    className="text-xs text-purple-500 hover:text-purple-600 font-semibold cursor-pointer"
                  >
                    {copiedStates['saved-names-all'] ? 'Copied!' : 'Copy All'}
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {savedNames.map((n, idx) => (
                    <div
                      key={idx}
                      className="bg-white border border-slate-200 rounded-xl px-3.5 py-2 flex items-center gap-2"
                    >
                      <span className="font-medium text-slate-800 text-sm">{n}</span>
                      <button
                        onClick={() => toggleSave(n)}
                        className="text-red-400 hover:text-red-600 text-xs font-semibold ml-1 cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Pro Tip */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 mt-6">
              <h4 className="font-display font-semibold text-purple-400 mb-1 flex items-center gap-1.5">
                💡 Pro Tip for Choosing Names
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                Choose a channel name that is easy to pronounce, spell, and remember. Make sure to check YouTube search and social media channels to ensure the handle/username is available before final decision.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.channelNameBottom} />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">How to Choose a YouTube Channel Name</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>
            Your YouTube channel name represents your entire brand. It is the first thing viewers see when your video appears in search results or on their home feed, alongside your thumbnail.
          </p>
          <p>
            A perfect channel name should match your content category, be simple and memorable, and have clean pronunciation so viewers can share it by word-of-mouth. Our AI channel name generator uses proven branding frameworks to suggest names that work.
          </p>
        </div>
        <h3 className="font-display text-xl font-bold">Types of YouTube Channel Names</h3>
        <ul className="space-y-4 text-slate-600">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Personal Brand:</strong> Using your own name (e.g. <i>MKBHD</i>, <i>MrBeast</i>). Best for personality-driven vlogs, tutorials, or consulting channels.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Topic/Niche Specific:</strong> Incorporating keywords directly (e.g. <i>5-Minute Crafts</i>, <i>TechGamer</i>). Best for SEO ranking and immediately conveying what your channel is about.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
            <span>
              <strong>Brandable / Abstract:</strong> Short, energetic, and completely unique words (e.g. <i>Vevo</i>, <i>Smosh</i>). Easy to scale into a bigger business.
            </span>
          </li>
        </ul>

        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-slate-600 mb-4">Ready to optimize your channel metadata? Generate tags, titles, and descriptions all in one place.</p>
          <Link href="/" className="inline-flex items-center gap-2 btn-primary rounded-xl px-6 py-3 font-semibold">
            Try Full SEO Optimizer <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
