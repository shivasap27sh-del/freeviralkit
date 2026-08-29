import { motion } from 'framer-motion';
import { Copy, CheckCircle2, ChevronRight, RotateCcw, Loader2, Sparkles } from 'lucide-react';

interface HomeTitleListProps {
  titles: string[];
  selectedTitle: string | null;
  onSelectTitle: (title: string) => void;
  onRegenerate: () => void;
  isGeneratingTitles: boolean;
  isGeneratingDetails: boolean;
  copiedStates: { [key: string]: boolean };
  onCopy: (text: string, key: string) => void;
}

export function HomeTitleList({
  titles,
  selectedTitle,
  onSelectTitle,
  onRegenerate,
  isGeneratingTitles,
  isGeneratingDetails,
  copiedStates,
  onCopy,
}: HomeTitleListProps) {
  const charColor = (len: number) =>
    len >= 50 && len <= 70
      ? 'text-green-600 dark:text-green-400'
      : len < 50
      ? 'text-yellow-600 dark:text-yellow-400'
      : 'text-red-600 dark:text-red-400';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
          Step 1: Choose Your Viral Title
        </h2>
        <button
          onClick={onRegenerate}
          disabled={isGeneratingTitles}
          className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 cursor-pointer active:scale-[0.96] transition-all"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Regenerate 10 Titles
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {titles.map((title, index) => {
          const key = `title-${index}`;
          const isSelected = selectedTitle === title;
          const isCopied = copiedStates[key];

          return (
            <div
              key={index}
              onClick={() => onSelectTitle(title)}
              className={`glass-card rounded-2xl p-4 md:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 cursor-pointer transition-all ${
                isSelected
                  ? 'border-purple-500/80 ring-2 ring-purple-500/20 bg-purple-50/50 dark:bg-purple-950/20 shadow-lg'
                  : 'hover:border-purple-400/50 hover:bg-slate-50/80 dark:hover:bg-slate-850/50'
              }`}
            >
              <div className="flex-1">
                <p className="text-slate-900 dark:text-white font-semibold text-base mb-1">
                  {title}
                </p>
                <div className="flex items-center gap-2 text-xs">
                  <span className={`font-mono font-medium ${charColor(title.length)}`}>
                    {title.length} chars
                  </span>
                  <span className="text-slate-400">•</span>
                  <span className="text-slate-500 text-xs">
                    {title.length >= 50 && title.length <= 70
                      ? '✓ Ideal YouTube Search Length'
                      : title.length > 70
                      ? '⚠️ May truncate on mobile'
                      : 'Short keyword title'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onCopy(title, key);
                  }}
                  className="p-2 rounded-xl text-xs font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shrink-0"
                  title="Copy title"
                >
                  {isCopied ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onSelectTitle(title)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                    isSelected
                      ? 'bg-purple-600 text-white shadow-purple-600/30'
                      : 'bg-purple-500/10 hover:bg-purple-600 hover:text-white text-purple-600 dark:text-purple-400'
                  }`}
                >
                  {isSelected && isGeneratingDetails ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Packaging...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Full SEO Pack <ChevronRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
