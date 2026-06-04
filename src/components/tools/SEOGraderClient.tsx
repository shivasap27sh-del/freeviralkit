'use client';

import { useState } from 'react';
import { gradeVideoSEO, type SEOResult } from '@/app/actions/seoGrader';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Activity, CheckCircle2, XCircle, AlertTriangle, ChevronRight } from 'lucide-react';
import ErrorBanner from '@/components/ErrorBanner';

export default function SEOGraderClient() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<SEOResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGrade = async () => {
    if (!title.trim() && !description.trim()) return;
    setIsGenerating(true);
    setResult(null);
    setError(null);
    const res = await gradeVideoSEO(title, description, tags);
    if (res.success && res.result) setResult(res.result);
    else setError(res.error || 'Failed to grade SEO');
    setIsGenerating(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 50) return 'text-amber-500';
    return 'text-rose-500';
  };

  const getBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-500/10 border-green-500/20';
    if (score >= 50) return 'bg-amber-500/10 border-amber-500/20';
    return 'bg-rose-500/10 border-rose-500/20';
  };

  return (
    <>
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-8">
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Video Title</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)}
              placeholder="E.g., How to Code in React (2026 Guide)"
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-base" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Video Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)}
              placeholder="Paste your full description here..."
              className="w-full h-32 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-base resize-none" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1">Tags (Comma separated) <span className="font-normal text-slate-400">(Optional)</span></label>
            <input type="text" value={tags} onChange={e => setTags(e.target.value)}
              placeholder="react, coding, tutorial..."
              className="w-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-5 py-3 text-slate-900 dark:text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-base" />
          </div>
        </div>

        <button onClick={handleGrade} disabled={(!title.trim() && !description.trim()) || isGenerating}
          className="w-full btn-primary rounded-xl py-4 font-semibold text-lg flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700">
          {isGenerating ? <><Loader2 className="w-5 h-5 animate-spin" /> Analyzing Metadata...</> : <><Activity className="w-5 h-5" /> Calculate SEO Score</>}
        </button>
      </div>

      <ErrorBanner error={error} onClear={() => setError(null)} />

      <AnimatePresence>
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6 mb-8">
            <div className={`border rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 ${getBgColor(result.score)}`}>
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-white dark:bg-slate-900 shadow-xl border-4 border-white dark:border-slate-800">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90">
                    <circle cx="64" cy="64" r="56" className="stroke-current text-slate-200 dark:text-slate-700" strokeWidth="8" fill="none" />
                    <circle cx="64" cy="64" r="56" className={`stroke-current ${getScoreColor(result.score)}`} strokeWidth="8" fill="none" strokeDasharray="351.8" strokeDashoffset={351.8 - (351.8 * result.score) / 100} style={{ transition: 'stroke-dashoffset 1s ease-in-out' }} strokeLinecap="round" />
                  </svg>
                  <span className={`font-display text-4xl font-black ${getScoreColor(result.score)}`}>{result.score}</span>
                </div>
                <span className="mt-4 font-semibold text-slate-700 dark:text-slate-300 tracking-wide uppercase text-sm">SEO Score</span>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl font-bold mb-2">Verdict</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{result.verdict}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Strengths */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-semibold text-green-500 text-lg mb-4">
                  <CheckCircle2 className="w-5 h-5" /> What You Did Right
                </h4>
                <ul className="space-y-3">
                  {result.strengths.map((str, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" /> {str}
                    </li>
                  ))}
                  {result.strengths.length === 0 && <li className="text-slate-500 italic">No significant strengths found.</li>}
                </ul>
              </div>

              {/* Weaknesses */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h4 className="flex items-center gap-2 font-semibold text-rose-500 text-lg mb-4">
                  <XCircle className="w-5 h-5" /> What Needs Fixing
                </h4>
                <ul className="space-y-3">
                  {result.weaknesses.map((weak, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" /> {weak}
                    </li>
                  ))}
                  {result.weaknesses.length === 0 && <li className="text-slate-500 italic">No significant weaknesses found. Great job!</li>}
                </ul>
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6 md:p-8">
              <h4 className="flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 text-xl mb-6">
                <AlertTriangle className="w-6 h-6" /> Actionable SEO Recommendations
              </h4>
              <div className="space-y-4">
                {result.recommendations.map((rec, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/60 dark:bg-slate-900/60 rounded-xl p-4 border border-indigo-500/10">
                    <ChevronRight className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                    <p className="text-slate-700 dark:text-slate-300 font-medium">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
