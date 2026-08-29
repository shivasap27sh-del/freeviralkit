import Link from 'next/link';
import { Sparkles, ExternalLink } from 'lucide-react';

export function HomeTopBanner() {
  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50/80 dark:from-indigo-950/80 dark:via-purple-950/80 dark:to-slate-900/80 border border-indigo-200/80 dark:border-indigo-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 shrink-0 font-bold">
          ⚡
        </span>
        <div className="text-sm">
          <span className="font-semibold text-slate-900 dark:text-white">
            Making a video on a Movie, Anime, or Live Trend?{' '}
          </span>
          <span className="text-slate-600 dark:text-slate-300">
            Use our live grounded real-time AI to fetch accurate cast, release dates &amp; plots.
          </span>
        </div>
      </div>
      <Link
        href="/youtube-realtime-title-generator"
        className="shrink-0 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white active:scale-[0.96] transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
      >
        <Sparkles className="w-3.5 h-3.5" /> Real-Time Live Tool <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
