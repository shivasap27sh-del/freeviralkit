import { Sparkles, ExternalLink } from 'lucide-react';
import { type GearCategory } from '@/data/creatorGearData';

interface GearCategoryCardProps {
  category: GearCategory;
}

export function GearCategoryCard({ category }: GearCategoryCardProps) {
  const Icon = category.icon;

  return (
    <section className="space-y-6">
      <div className="border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <h2 className="font-display text-2xl font-bold text-slate-800 dark:text-slate-100">
            {category.title}
          </h2>
        </div>
        <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-4xl">
          {category.categoryDesc}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {category.items.map((item) => (
          <div
            key={item.id}
            className={`glass-card rounded-2xl p-6 flex flex-col justify-between relative transition-all duration-300 hover:border-purple-500/30 group hover:shadow-lg ${
              item.popular ? 'border-purple-500/30 ring-1 ring-purple-500/10' : ''
            }`}
          >
            {item.popular && (
              <span className="absolute -top-3 left-6 bg-purple-500 text-white text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                <Sparkles className="w-3 h-3" aria-hidden="true" /> Recommended
              </span>
            )}

            <div>
              <div className="flex justify-between items-start gap-2 mb-3">
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                  {item.tag}
                </span>
                <span className="text-xs font-semibold text-slate-400">{item.price}</span>
              </div>
              <h3 className="font-display font-bold text-slate-800 dark:text-slate-100 group-hover:text-purple-400 transition-colors line-clamp-2 min-h-[2.75rem] mb-2 leading-snug">
                {item.name}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-4">
                {item.desc}
              </p>
            </div>

            <div className="flex items-center justify-between mt-auto border-t border-slate-100 dark:border-slate-800/80 pt-4">
              <span className="text-xs font-medium text-slate-400">
                Rating: <strong className="text-amber-500">{item.rating}</strong>
              </span>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:text-purple-300 transition-colors"
              >
                Check Price <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
