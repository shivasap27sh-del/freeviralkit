import { thumbnailResolutions } from '@/data/thumbnailDownloaderData';
import { Layers } from 'lucide-react';

export function ThumbnailResolutionSpecsTable() {
  return (
    <section aria-labelledby="specs-heading" className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-cyan-400 mb-2 uppercase">
          <Layers className="w-3.5 h-3.5" />
          <span>Technical Specifications</span>
        </div>
        <h2
          id="specs-heading"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
        >
          YouTube Thumbnail <span className="gradient-text">Resolution Specs</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Official dimensions, aspect ratios, and device rendering guidelines for YouTube thumbnails.
        </p>
      </div>

      <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-cyan-400 font-mono uppercase border-b border-slate-800 text-[11px]">
              <tr>
                <th className="px-5 py-4 font-bold">Quality Level</th>
                <th className="px-5 py-4 font-bold">Pixel Dimensions</th>
                <th className="px-5 py-4 font-bold">Aspect Ratio</th>
                <th className="px-5 py-4 font-bold">Device Optimization</th>
                <th className="px-5 py-4 font-bold">Max File Size</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {thumbnailResolutions.map((res) => (
                <tr key={res.id} className="hover:bg-blue-500/5 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white">
                    {res.name}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-cyan-400 font-bold">
                    {res.dimensions}
                  </td>
                  <td className="px-5 py-3.5 font-mono">16:9 Standard</td>
                  <td className="px-5 py-3.5 text-slate-400">
                    {res.id === 'maxres'
                      ? '4K Smart TVs, Retina Desktop Feeds'
                      : res.id === 'hq'
                      ? 'Standard Desktop & Tablet Feeds'
                      : 'Mobile Feeds & Suggested Sidebar'}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-emerald-400 font-bold">
                    &lt; 2.0 MB
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
