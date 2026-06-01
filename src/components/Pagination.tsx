import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string; // e.g., "/blog"
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  // Generate page numbers
  const pages = [];
  const maxVisiblePages = 5;
  
  let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
  let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

  if (endPage - startPage + 1 < maxVisiblePages) {
    startPage = Math.max(1, endPage - maxVisiblePages + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="flex items-center justify-center gap-2 mt-16 mb-8">
      {/* Previous Button */}
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? basePath : `${basePath}/page/${currentPage - 1}`}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-500 hover:border-purple-500/30 transition-all flex items-center justify-center"
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
      ) : (
        <span className="p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed flex items-center justify-center">
          <ChevronLeft className="w-5 h-5" />
        </span>
      )}

      {/* Page Numbers */}
      {startPage > 1 && (
        <>
          <Link
            href={basePath}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-purple-500 hover:border-purple-500/30 transition-all font-medium text-sm"
          >
            1
          </Link>
          {startPage > 2 && <span className="text-slate-400">...</span>}
        </>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={page === 1 ? basePath : `${basePath}/page/${page}`}
          className={`w-10 h-10 flex items-center justify-center rounded-xl border transition-all font-medium text-sm ${
            currentPage === page
              ? 'bg-purple-500 text-white border-purple-500 shadow-md shadow-purple-500/20'
              : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-purple-500 hover:border-purple-500/30'
          }`}
          aria-current={currentPage === page ? 'page' : undefined}
        >
          {page}
        </Link>
      ))}

      {endPage < totalPages && (
        <>
          {endPage < totalPages - 1 && <span className="text-slate-400">...</span>}
          <Link
            href={`${basePath}/page/${totalPages}`}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-purple-500 hover:border-purple-500/30 transition-all font-medium text-sm"
          >
            {totalPages}
          </Link>
        </>
      )}

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={`${basePath}/page/${currentPage + 1}`}
          className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-purple-500 hover:border-purple-500/30 transition-all flex items-center justify-center"
          aria-label="Next Page"
        >
          <ChevronRight className="w-5 h-5" />
        </Link>
      ) : (
        <span className="p-2 rounded-xl bg-slate-50/50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed flex items-center justify-center">
          <ChevronRight className="w-5 h-5" />
        </span>
      )}
    </div>
  );
}
