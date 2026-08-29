import { useState } from 'react';
import { type RealTimePackageResult } from '@/app/actions/realtimeTitles';
import {
  Copy,
  CheckCircle2,
  RotateCcw,
  Tag,
  Hash,
  FileText,
  Check,
  Wand2,
} from 'lucide-react';

interface RealTimeResultTabsProps {
  result: RealTimePackageResult;
  onRegenerate: () => void;
  isGenerating: boolean;
}

export function RealTimeResultTabs({ result, onRegenerate, isGenerating }: RealTimeResultTabsProps) {
  const [activeTab, setActiveTab] = useState<'titles' | 'description' | 'tags' | 'hashtags'>('titles');
  const [selectedTitleIdx, setSelectedTitleIdx] = useState<number>(0);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});

  const copyText = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates((p) => ({ ...p, [key]: true }));
      setTimeout(() => setCopiedStates((p) => ({ ...p, [key]: false })), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const charColor = (len: number) =>
    len >= 50 && len <= 70
      ? 'text-emerald-600 dark:text-emerald-400'
      : len < 50
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-rose-600 dark:text-rose-400';

  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800/80">
        <button
          onClick={() => setActiveTab('titles')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
            activeTab === 'titles'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Wand2 className="w-4 h-4" /> Titles ({result.titles?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('description')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
            activeTab === 'description'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <FileText className="w-4 h-4" /> SEO Description
        </button>
        <button
          onClick={() => setActiveTab('tags')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
            activeTab === 'tags'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Tag className="w-4 h-4" /> Search Tags ({result.tags?.length || 0})
        </button>
        <button
          onClick={() => setActiveTab('hashtags')}
          className={`px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 active:scale-[0.96] transition-all duration-75 cursor-pointer ${
            activeTab === 'hashtags'
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60'
          }`}
        >
          <Hash className="w-4 h-4" /> Hashtags ({result.hashtags?.length || 0})
        </button>
      </div>

      {/* TAB 1: TITLES */}
      {activeTab === 'titles' && result.titles && (
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
              Generated Real-World Titles
            </h3>
            <button
              onClick={onRegenerate}
              disabled={isGenerating}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.95] text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer transition-all duration-75 border border-slate-200 dark:border-slate-700"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Regenerate 10 New
            </button>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {result.titles.map((t, idx) => {
              const key = `title_${idx}`;
              const isCopied = copiedStates[key];
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all duration-150 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    selectedTitleIdx === idx
                      ? 'bg-white dark:bg-slate-900 border-purple-500/60 ring-1 ring-purple-500/30 shadow-lg'
                      : 'bg-white/80 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 hover:border-purple-300 dark:hover:border-slate-700'
                  }`}
                  onClick={() => setSelectedTitleIdx(idx)}
                >
                  <div className="flex-1">
                    <p className="text-slate-900 dark:text-white font-medium text-base mb-1">{t}</p>
                    <div className="flex items-center gap-3 text-xs">
                      <span className={charColor(t.length)}>{t.length} chars</span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-slate-500 dark:text-slate-400">
                        {t.length >= 50 && t.length <= 70
                          ? '✓ Ideal YouTube Search Length'
                          : t.length > 70
                          ? '⚠️ Truncates on mobile feed'
                          : 'Short keyword title'}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      copyText(t, key);
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer active:scale-[0.94] transition-all duration-75 shrink-0 ${
                      isCopied
                        ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy Title
                      </>
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SEO DESCRIPTION */}
      {activeTab === 'description' && result.description && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">SEO Video Description</h3>
            <button
              onClick={() => copyText(result.description!, 'desc')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
            >
              {copiedStates['desc'] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Description Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy Entire Description
                </>
              )}
            </button>
          </div>
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm whitespace-pre-wrap leading-relaxed font-mono shadow-sm">
            {result.description}
          </div>
        </div>
      )}

      {/* TAB 3: SEARCH TAGS */}
      {activeTab === 'tags' && result.tags && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">YouTube Studio Search Tags</h3>
            <button
              onClick={() => copyText(result.tags!.join(', '), 'all_tags')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
            >
              {copiedStates['all_tags'] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> All Tags Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy All 25 Tags
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {result.tags.map((tg, idx) => {
              const key = `tag_${idx}`;
              return (
                <button
                  key={idx}
                  onClick={() => copyText(tg, key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-75 cursor-pointer active:scale-[0.94] flex items-center gap-1.5 ${
                    copiedStates[key]
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-500'
                  }`}
                >
                  {tg}
                  {copiedStates[key] ? (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 4: HASHTAGS */}
      {activeTab === 'hashtags' && result.hashtags && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Trending Hashtags</h3>
            <button
              onClick={() => copyText(result.hashtags!.join(' '), 'all_hashtags')}
              className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all duration-75 ease-out shadow-md shadow-purple-600/20"
            >
              {copiedStates['all_hashtags'] ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" /> All Hashtags Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copy All Hashtags
                </>
              )}
            </button>
          </div>
          <div className="flex flex-wrap gap-2 p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
            {result.hashtags.map((ht, idx) => {
              const key = `ht_${idx}`;
              return (
                <button
                  key={idx}
                  onClick={() => copyText(ht, key)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-75 cursor-pointer active:scale-[0.94] flex items-center gap-1.5 ${
                    copiedStates[key]
                      ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-700 dark:text-emerald-300'
                      : 'bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800/40 text-purple-700 dark:text-purple-300 hover:border-purple-500'
                  }`}
                >
                  {ht}
                  {copiedStates[key] ? (
                    <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Copy className="w-3 h-3 text-purple-500 dark:text-purple-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
