'use client';

import type { Metadata } from 'next';

import { useState } from 'react';
import { researchTopic } from '../actions/research';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Copy, CheckCircle2, Loader2, Sparkles, RotateCcw, AlertCircle, BarChart3, ShieldAlert, Award } from 'lucide-react';
import Link from 'next/link';
import { InContentAd } from '@/components/AdSense';
import { adSlots } from '@/lib/ad-slots';
import ErrorBanner from '@/components/ErrorBanner';

type TopicIdea = {
  title: string;
  reason: string;
};

type ResearchData = {
  volume: 'High' | 'Medium' | 'Low';
  competition: 'High' | 'Medium' | 'Low';
  ideas: TopicIdea[];
};

export default function TopicResearcherPage() {
  const [niche, setNiche] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [data, setData] = useState<ResearchData | null>(null);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (val?: string) => {
    const inputVal = val !== undefined ? val : niche;
    if (!inputVal.trim()) return;
    setIsGenerating(true);
    setData(null);
    setError(null);
    const result = await researchTopic(inputVal);
    if (result.success && result.data) {
      setData(result.data as ResearchData);
    } else {
      setError(result.error || 'Failed to analyze niche topics');
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

  const getOpportunityScore = (vol: string, comp: string) => {
    const v = vol.toLowerCase();
    const c = comp.toLowerCase();
    
    if (v === 'high' && c === 'low') return { score: '🔥 Excellent Opportunity', color: 'text-green-400 bg-green-400/10 border-green-500/20' };
    if (v === 'high' && c === 'medium') return { score: '👍 Great Opportunity', color: 'text-green-400 bg-green-400/10 border-green-500/20' };
    if (v === 'medium' && c === 'low') return { score: '👍 Good Opportunity', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-500/20' };
    if (v === 'low' && c === 'low') return { score: '🌱 Niche Opportunity', color: 'text-cyan-400 bg-cyan-400/10 border-cyan-500/20' };
    if (v === 'high' && c === 'high') return { score: '⚡ Very Competitive', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20' };
    if (v === 'medium' && c === 'medium') return { score: '📊 Moderate Opportunity', color: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20' };
    return { score: '⚠️ Highly Competitive', color: 'text-red-400 bg-red-400/10 border-red-500/20' };
  };

  const volumeColors = {
    High: 'text-green-400 bg-green-400/10 border-green-500/20',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20',
    Low: 'text-red-400 bg-red-400/10 border-red-500/20',
  };

  const competitionColors = {
    Low: 'text-green-400 bg-green-400/10 border-green-500/20',
    Medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-500/20',
    High: 'text-red-400 bg-red-400/10 border-red-500/20',
  };

  const examples = ['Python Coding', 'Vegan Breakfasts', 'Budget Travel', 'Minecraft Building'];

  return (
    <main className="container mx-auto px-6 py-12 max-w-4xl relative z-10 min-h-screen">
      {/* Hero */}
      <section className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold text-purple-400 bg-purple-400/10 border border-purple-400/20 mb-6 uppercase tracking-wider">
          <Search className="w-4 h-4" /> AI Niche Researcher
        </div>
        <h1 className="font-display text-3xl md:text-5xl font-extrabold leading-tight tracking-tight mb-4">
          Free YouTube <span className="text-gradient">Niche & Topic Researcher</span>
        </h1>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
          Analyze search demand and competition levels for your niche, and unlock high-potential video topics to rank easily.
        </p>
      </section>

      {/* Generator */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="relative mb-4">
          <input
            type="text"
            value={niche}
            onChange={e => setNiche(e.target.value)}
            placeholder="Enter your target niche or keyword (e.g. vegan baking, smartphone reviews, DIY room decor...)"
            className="w-full bg-slate-100 border border-slate-200 rounded-xl px-5 py-4 text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-lg"
            onKeyDown={e => e.key === 'Enter' && handleGenerate()}
          />
        </div>

        {/* Clickable Examples */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs text-slate-500 font-medium">Examples:</span>
          {examples.map(ex => (
            <button
              key={ex}
              onClick={() => {
                setNiche(ex);
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
          disabled={!niche.trim() || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Analyzing Niche...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5" /> Analyze Niche & Find Topics
            </>
          )}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      {/* Results */}
      <AnimatePresence>
        {data && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold">Niche Metrics & Suggestions</h2>
              <button
                onClick={() => handleGenerate()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Re-Analyze
              </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Search Volume */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center">
                <BarChart3 className="w-8 h-8 text-cyan-400 mb-3" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Search Demand</span>
                <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${volumeColors[data.volume] || 'text-slate-500'}`}>
                  {data.volume} Volume
                </span>
              </div>

              {/* Competition */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center">
                <ShieldAlert className="w-8 h-8 text-red-400 mb-3" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Competition Level</span>
                <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${competitionColors[data.competition] || 'text-slate-500'}`}>
                  {data.competition} Competition
                </span>
              </div>

              {/* Opportunity Score */}
              <div className="glass-card rounded-2xl p-6 flex flex-col justify-between items-center text-center">
                <Award className="w-8 h-8 text-purple-400 mb-3" />
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Opportunity Assessment</span>
                <span className={`px-4 py-1.5 rounded-full border text-sm font-bold ${getOpportunityScore(data.volume, data.competition).color}`}>
                  {getOpportunityScore(data.volume, data.competition).score}
                </span>
              </div>
            </div>

            {/* Trending Video Topics */}
            <div className="glass-card rounded-2xl p-6 md:p-8 mt-6">
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 mb-6">
                💡 High-Potential Video Topics
              </h3>

              <div className="space-y-4">
                {data.ideas.map((idea, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-5 hover:border-purple-500/30 transition-all duration-200 group flex justify-between items-start gap-4"
                  >
                    <div>
                      <h4 className="font-display font-bold text-slate-800 dark:text-slate-100 text-base mb-1.5">
                        {idea.title}
                      </h4>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {idea.reason}
                      </p>
                    </div>
                    <button
                      onClick={() => copy(idea.title, `idea-${idx}`)}
                      className="copy-btn py-1 px-3 text-xs shrink-0 cursor-pointer"
                    >
                      {copiedStates[`idea-${idx}`] ? (
                        <span className="text-green-400">Copied!</span>
                      ) : (
                        <span>Copy Title</span>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro Tip */}
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-5 mt-6">
              <h4 className="font-display font-semibold text-purple-400 mb-1 flex items-center gap-1.5">
                💡 Target Long-Tail for Low Competition
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                If the general competition for your niche is **High**, focus on creating videos that answer ultra-specific user queries (long-tail keywords). It is much easier to rank #1 for a specific tutorial than a general topic.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <InContentAd slot={adSlots.tagsBottom} />

      {/* SEO Content */}
      <section className="mt-12 space-y-8">
        <h2 className="font-display text-2xl font-bold">Why Niche Research is Crucial for YouTube Growth</h2>
        <div className="text-slate-600 leading-relaxed space-y-4">
          <p>Many creators fail because they upload videos on topics that are either too competitive or have zero search demand. If you review general tech or build general gaming channels, you are competing with multi-million subscriber channels.</p>
          <p>Performing niche research helps you find the sweet spot: topics that have **High Search Volume** but **Low Competition**. Finding these low-competition keywords allows newer channels to rank high on the first page easily, generating passive watch time and subscribers.</p>
        </div>
      </section>
    </main>
  );
}
