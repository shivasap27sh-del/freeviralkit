import { motion } from 'framer-motion';
import {
  Copy,
  CheckCircle2,
  Package,
  AlignLeft,
  Hash,
  Tag,
  MessageCircle,
} from 'lucide-react';

export interface DetailsData {
  description: string;
  hashtags: string[];
  tags: string[];
  pinnedComment: string;
}

interface HomeDetailsPackageProps {
  selectedTitle: string;
  details: DetailsData;
  copiedStates: { [key: string]: boolean };
  onCopy: (text: string, key: string) => void;
  onCopyFullPackage: () => void;
  detailsRef: React.RefObject<HTMLDivElement | null>;
}

export function HomeDetailsPackage({
  selectedTitle,
  details,
  copiedStates,
  onCopy,
  onCopyFullPackage,
  detailsRef,
}: HomeDetailsPackageProps) {
  const tagsTotalChars = (tags: string[]) => tags.join(', ').length;

  return (
    <motion.div
      ref={detailsRef}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6 md:p-8 border border-purple-500/30 bg-white/90 dark:bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-8 mt-12"
    >
      {/* Header & Copy All Button */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div>
          <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
            Step 2: Complete Metadata Cockpit
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            SEO Packaging for: &quot;{selectedTitle}&quot;
          </h2>
        </div>

        <button
          type="button"
          onClick={onCopyFullPackage}
          className="w-full sm:w-auto px-5 py-3 rounded-2xl font-bold text-sm bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-600/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
        >
          {copiedStates['full-package'] ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" /> Entire Package Copied!
            </>
          ) : (
            <>
              <Package className="w-4 h-4" /> Copy Entire YouTube Pack
            </>
          )}
        </button>
      </div>

      {/* Description Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <AlignLeft className="w-4 h-4 text-purple-500" /> Optimized Video Description
          </label>
          <button
            type="button"
            onClick={() => onCopy(details.description, 'desc')}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
          >
            {copiedStates['desc'] ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedStates['desc'] ? 'Copied' : 'Copy Description'}
          </button>
        </div>
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm whitespace-pre-wrap font-mono leading-relaxed max-h-60 overflow-y-auto">
          {details.description}
        </div>
      </div>

      {/* Tags Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Tag className="w-4 h-4 text-cyan-500" /> YouTube Studio Search Tags ({details.tags.length})
            </label>
            <span
              className={`text-xs font-mono font-medium ${
                tagsTotalChars(details.tags) <= 500 ? 'text-emerald-500' : 'text-rose-500'
              }`}
            >
              ({tagsTotalChars(details.tags)}/500 chars)
            </span>
          </div>
          <button
            type="button"
            onClick={() => onCopy(details.tags.join(', '), 'all-tags')}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
          >
            {copiedStates['all-tags'] ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedStates['all-tags'] ? 'Copied' : 'Copy All Tags'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          {details.tags.map((tag, idx) => {
            const key = `tag-${idx}`;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => onCopy(tag, key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                  copiedStates[key]
                    ? 'bg-emerald-500/20 text-emerald-600 border-emerald-500/40'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-purple-500'
                }`}
              >
                {tag}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hashtags Section */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Hash className="w-4 h-4 text-pink-500" /> Trending Hashtags ({details.hashtags.length})
          </label>
          <button
            type="button"
            onClick={() => onCopy(details.hashtags.join(' '), 'all-hashtags')}
            className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
          >
            {copiedStates['all-hashtags'] ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <Copy className="w-3.5 h-3.5" />
            )}
            {copiedStates['all-hashtags'] ? 'Copied' : 'Copy Hashtags'}
          </button>
        </div>
        <div className="flex flex-wrap gap-2 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
          {details.hashtags.map((ht, idx) => (
            <span
              key={idx}
              className="px-3 py-1 rounded-full text-xs font-bold bg-pink-500/10 text-pink-500 border border-pink-500/20"
            >
              {ht}
            </span>
          ))}
        </div>
      </div>

      {/* Pinned Comment Section */}
      {details.pinnedComment && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-amber-500" /> High-Engagement Pinned Comment
            </label>
            <button
              type="button"
              onClick={() => onCopy(details.pinnedComment, 'pinned')}
              className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 transition-all"
            >
              {copiedStates['pinned'] ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              {copiedStates['pinned'] ? 'Copied' : 'Copy Comment'}
            </button>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-sm font-mono leading-relaxed">
            {details.pinnedComment}
          </div>
        </div>
      )}
    </motion.div>
  );
}
