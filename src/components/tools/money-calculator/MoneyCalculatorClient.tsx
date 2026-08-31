'use client';

import { useState } from 'react';
import { nichePresets, geoTiers, type NichePreset, type GeoTier } from '@/data/moneyCalculatorData';
import { MoneySliderControls } from './MoneySliderControls';
import { MoneyRevenueCards } from './MoneyRevenueCards';

export function MoneyCalculatorClient() {
  const [dailyViews, setDailyViews] = useState<number>(50000);
  const [selectedNiche, setSelectedNiche] = useState<NichePreset>(nichePresets[0]); // Finance default
  const [selectedGeo, setSelectedGeo] = useState<GeoTier>(geoTiers[0]); // Tier 1 default
  const [includeSponsorships, setIncludeSponsorships] = useState<boolean>(true);

  const effectiveRpm = selectedNiche.avgRpm * selectedGeo.multiplier;

  return (
    <div className="w-full space-y-8">
      {/* Dynamic Interactive Sliders */}
      <MoneySliderControls
        dailyViews={dailyViews}
        onViewsChange={setDailyViews}
        selectedNiche={selectedNiche}
        onNicheChange={setSelectedNiche}
        selectedGeo={selectedGeo}
        onGeoChange={setSelectedGeo}
        includeSponsorships={includeSponsorships}
        onSponsorshipToggle={setIncludeSponsorships}
      />

      {/* Real-Time Estimated Revenue Cards */}
      <MoneyRevenueCards
        dailyViews={dailyViews}
        effectiveRpm={effectiveRpm}
        includeSponsorships={includeSponsorships}
      />
    </div>
  );
}
