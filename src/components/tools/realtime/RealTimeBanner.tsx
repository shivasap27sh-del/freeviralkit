import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export function RealTimeBanner() {
  return (
    <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-indigo-50 to-purple-50/80 dark:from-purple-950/80 dark:via-indigo-950/80 dark:to-slate-900/80 border border-purple-200/80 dark:border-purple-500/30 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-500/20 text-purple-700 dark:text-purple-300 shrink-0 font-bold">
          ⚡
        </span>
        <div className="text-sm">
          <span className="font-semibold text-slate-900 dark:text-white">
            Looking for standard creator titles?{' '}
          </span>
          <span className="text-slate-600 dark:text-slate-300">
            For vlogs, gaming, or original series, use our ultra-fast standard generator.
          </span>
        </div>
      </div>
      <Link
        href="/youtube-title-generator"
        className="shrink-0 px-4 py-2.5 text-xs font-semibold rounded-xl bg-purple-600 hover:bg-purple-500 text-white active:scale-[0.96] transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5"
      >
        Standard AI Generator <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
