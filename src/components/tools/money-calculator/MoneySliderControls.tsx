'use client';

import { nichePresets, geoTiers, type NichePreset, type GeoTier } from '@/data/moneyCalculatorData';
import { Sliders, DollarSign, Globe, Briefcase } from 'lucide-react';

interface MoneySliderControlsProps {
  dailyViews: number;
  onViewsChange: (val: number) => void;
  selectedNiche: NichePreset;
  onNicheChange: (niche: NichePreset) => void;
  selectedGeo: GeoTier;
  onGeoChange: (geo: GeoTier) => void;
  includeSponsorships: boolean;
  onSponsorshipToggle: (val: boolean) => void;
}

export function MoneySliderControls({
  dailyViews,
  onViewsChange,
  selectedNiche,
  onNicheChange,
  selectedGeo,
  onGeoChange,
  includeSponsorships,
  onSponsorshipToggle,
}: MoneySliderControlsProps) {
  const quickPillViews = [10000, 50000, 100000, 500000, 1000000];

  return (
    <div className="glass-card rounded-3xl p-6 md:p-8 border border-blue-500/20 bg-slate-900/90 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Views Slider Section */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-sm font-bold text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" /> Daily Video Views
          </label>
          <span className="text-lg md:text-xl font-extrabold font-mono px-3.5 py-1 rounded-xl bg-blue-500/20 text-cyan-300 border border-blue-500/30 self-start sm:self-auto shadow-md">
            {dailyViews.toLocaleString('en-US')} views/day
          </span>
        </div>

        <input
          type="range"
          min={1000}
          max={2000000}
          step={5000}
          value={dailyViews}
          onChange={(e) => onViewsChange(Number(e.target.value))}
          className="w-full h-3 rounded-lg appearance-none cursor-pointer accent-cyan-400 bg-slate-950 border border-slate-800"
        />

        {/* Quick View Presets */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-xs font-bold text-slate-400 mr-1">Quick Presets:</span>
          {quickPillViews.map((views) => (
            <button
              key={views}
              type="button"
              onClick={() => onViewsChange(views)}
              className={`px-3 py-1 rounded-xl text-xs font-mono font-bold border transition-all cursor-pointer ${
                dailyViews === views
                  ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30'
                  : 'bg-slate-950 hover:bg-slate-800 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {views >= 1000000 ? `${views / 1000000}M` : `${views / 1000}K`}
            </button>
          ))}
        </div>
      </div>

      {/* Niche Selector Matrix */}
      <div className="space-y-3 pt-2">
        <label className="text-sm font-bold text-white flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-cyan-400" /> Channel Niche &amp; Content Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
          {nichePresets.map((niche) => {
            const isSelected = selectedNiche.id === niche.id;
            return (
              <button
                key={niche.id}
                type="button"
                onClick={() => onNicheChange(niche)}
                className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-500 bg-blue-500/20 text-white shadow-lg shadow-blue-500/20'
                    : 'border-slate-800 bg-slate-950/60 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <div className="font-bold text-xs line-clamp-1 text-white">{niche.name}</div>
                <div className="text-[11px] font-mono font-bold mt-1 text-cyan-400">
                  ~${niche.avgRpm.toFixed(2)} RPM
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Audience Geography & Sponsorship Multiplier */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" /> Audience Geography (Ad CPM Tier)
          </label>
          <select
            value={selectedGeo.id}
            onChange={(e) => {
              const found = geoTiers.find((g) => g.id === e.target.value);
              if (found) onGeoChange(found);
            }}
            className="w-full px-4 py-3 rounded-2xl border border-slate-800 bg-slate-950 text-white text-xs font-bold outline-none focus:border-blue-500"
          >
            {geoTiers.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 flex flex-col justify-end">
          <label className="flex items-center gap-2 p-3 rounded-2xl border border-slate-800 bg-slate-950 cursor-pointer text-xs font-bold text-slate-200 hover:border-blue-500/50 transition-colors">
            <input
              type="checkbox"
              checked={includeSponsorships}
              onChange={(e) => onSponsorshipToggle(e.target.checked)}
              className="w-4 h-4 accent-cyan-500"
            />
            <span className="flex items-center gap-1">
              <Briefcase className="w-3.5 h-3.5 text-cyan-400" /> Include Brand Deals (+70% Avg Income)
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
