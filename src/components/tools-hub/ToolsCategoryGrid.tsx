import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { type ToolItem } from '@/data/toolsCatalog';

const colorMap = {
  purple: 'bg-purple-500/10 text-purple-400',
  pink: 'bg-pink-500/10 text-pink-400',
  cyan: 'bg-cyan-500/10 text-cyan-400',
  green: 'bg-green-500/10 text-green-400',
  blue: 'bg-blue-500/10 text-blue-400',
  orange: 'bg-orange-500/10 text-orange-400',
};

interface ToolsCategoryGridProps {
  title: string;
  description: string;
  tools: ToolItem[];
}

export function ToolsCategoryGrid({ title, description, tools }: ToolsCategoryGridProps) {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{title}</h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm mt-1">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="glass-card rounded-2xl p-6 border border-slate-200 dark:border-slate-800 hover:border-purple-500/50 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl ${colorMap[tool.color]}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  {tool.badge && (
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 border border-purple-500/30">
                      {tool.badge}
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-400 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 line-clamp-2 leading-relaxed">
                  {tool.description}
                </p>
              </div>

              <div className="mt-6 flex items-center text-sm font-semibold text-purple-600 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                Launch Tool <ArrowRight className="w-4 h-4 ml-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
