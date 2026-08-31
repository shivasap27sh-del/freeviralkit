import { nichePresets } from '@/data/moneyCalculatorData';
import { Table, TrendingUp } from 'lucide-react';

export function MoneyNicheBenchmarkTable() {
  return (
    <section aria-labelledby="benchmark-heading" className="space-y-6">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 border border-blue-500/30 text-cyan-400 mb-2 uppercase">
          <Table className="w-3.5 h-3.5" />
          <span>2026 Industry Benchmarks</span>
        </div>
        <h2
          id="benchmark-heading"
          className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight"
        >
          YouTube Niche <span className="gradient-text">RPM Comparison Matrix</span>
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Estimated net take-home earnings across major YouTube categories based on real 2026 AdSense data.
        </p>
      </div>

      <div className="glass-card rounded-3xl border border-blue-500/20 bg-slate-900/90 overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-cyan-400 font-mono uppercase border-b border-slate-800 text-[11px]">
              <tr>
                <th className="px-5 py-4 font-bold">Content Niche</th>
                <th className="px-5 py-4 font-bold">Average RPM</th>
                <th className="px-5 py-4 font-bold">10,000 Views</th>
                <th className="px-5 py-4 font-bold">100,000 Views</th>
                <th className="px-5 py-4 font-bold">1,000,000 Views</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {nichePresets.map((niche) => (
                <tr key={niche.id} className="hover:bg-blue-500/5 transition-colors">
                  <td className="px-5 py-3.5 font-bold text-white flex items-center gap-2">
                    <span>{niche.name}</span>
                  </td>
                  <td className="px-5 py-3.5 font-mono text-cyan-400 font-bold">
                    ${niche.avgRpm.toFixed(2)}
                  </td>
                  <td className="px-5 py-3.5 font-mono">
                    ${(niche.avgRpm * 10).toFixed(0)}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-white font-bold">
                    ${Math.round(niche.avgRpm * 100).toLocaleString('en-US')}
                  </td>
                  <td className="px-5 py-3.5 font-mono text-emerald-400 font-bold">
                    ${Math.round(niche.avgRpm * 1000).toLocaleString('en-US')}
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
