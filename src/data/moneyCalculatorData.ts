export interface NichePreset {
  id: string;
  name: string;
  category: string;
  lowRpm: number;
  avgRpm: number;
  highRpm: number;
  iconName: string;
}

export interface GeoTier {
  id: string;
  name: string;
  multiplier: number;
  description: string;
}

export const nichePresets: NichePreset[] = [
  { id: 'finance', name: 'Finance, Crypto & Investing', category: 'Finance', lowRpm: 12.0, avgRpm: 18.5, highRpm: 32.0, iconName: 'TrendingUp' },
  { id: 'tech', name: 'Tech, Software & AI Tools', category: 'Tech', lowRpm: 7.5, avgRpm: 12.0, highRpm: 20.0, iconName: 'Cpu' },
  { id: 'business', name: 'Business, E-Commerce & SaaS', category: 'Business', lowRpm: 6.5, avgRpm: 10.5, highRpm: 18.0, iconName: 'Briefcase' },
  { id: 'health', name: 'Health, Fitness & Nutrition', category: 'Health', lowRpm: 4.5, avgRpm: 7.5, highRpm: 14.0, iconName: 'Activity' },
  { id: 'education', name: 'Education & Science', category: 'Education', lowRpm: 3.8, avgRpm: 6.2, highRpm: 11.5, iconName: 'GraduationCap' },
  { id: 'lifestyle', name: 'Beauty, Fashion & Luxury', category: 'Lifestyle', lowRpm: 3.0, avgRpm: 5.5, highRpm: 9.5, iconName: 'Sparkles' },
  { id: 'travel', name: 'Travel, Vlogs & Adventure', category: 'Travel', lowRpm: 2.8, avgRpm: 4.8, highRpm: 8.5, iconName: 'Compass' },
  { id: 'gaming', name: 'Gaming, Streaming & Esports', category: 'Gaming', lowRpm: 1.8, avgRpm: 3.2, highRpm: 6.0, iconName: 'Gamepad2' },
  { id: 'entertainment', name: 'Entertainment & Comedy', category: 'General', lowRpm: 1.5, avgRpm: 2.8, highRpm: 5.0, iconName: 'Film' },
  { id: 'shorts', name: 'YouTube Shorts (All Niches)', category: 'Shorts', lowRpm: 0.04, avgRpm: 0.08, highRpm: 0.18, iconName: 'Zap' },
];

export const geoTiers: GeoTier[] = [
  { id: 'tier1', name: '🇺🇸 Tier 1 (USA, UK, Canada, Australia)', multiplier: 1.0, description: 'Highest advertiser bidding competition ($12 - $30 CPM)' },
  { id: 'tier2', name: '🇪🇺 Tier 2 (Germany, France, Japan, UAE)', multiplier: 0.75, description: 'Strong purchasing power ($8 - $18 CPM)' },
  { id: 'tier3', name: '🌎 Tier 3 (India, Brazil, Southeast Asia)', multiplier: 0.35, description: 'Massive volume with lower regional advertiser CPMs' },
  { id: 'mixed', name: '🌐 Global Mixed Audience (Worldwide)', multiplier: 0.65, description: 'Standard international blend' },
];

export const moneyCalculatorFaqs = [
  {
    q: 'What is the mathematical difference between YouTube CPM and RPM?',
    a: 'CPM (Cost Per Mille) is the gross price advertisers pay to YouTube per 1,000 ad impressions. RPM (Revenue Per Mille) is your actual net payout per 1,000 video views. YouTube retains a 45% platform fee on AdSense, meaning your net RPM is approximately 55% of the video CPM + any Channel Memberships or Super Chats.',
  },
  {
    q: 'How much does YouTube pay creators for 1,000,000 views in 2026?',
    a: 'For 1 million long-form video views, payouts typically range from $3,000 to $20,000 USD. In high-CPM niches (Finance, SaaS, Crypto, Real Estate) targeting US viewers, 1M views can yield upwards of $18,000+. In entertainment or gaming, 1M views typically earns $2,500 to $4,500 USD.',
  },
  {
    q: 'How can creators double their channel RPM without getting more views?',
    a: 'Creators increase RPM through 3 proven tactics: (1) Publishing videos longer than 8 minutes to enable strategic mid-roll ad placements, (2) Front-loading titles and descriptions with high commercial intent keywords (e.g. "Best Software", "Investing Strategy"), and (3) Attracting older demographics (ages 25-54) with higher disposable income.',
  },
  {
    q: 'How much do YouTube Shorts pay compared to regular long-form videos?',
    a: 'Shorts monetize through a shared creator revenue pool rather than dedicated pre-roll/mid-roll auction ads. Shorts average an RPM of $0.05 to $0.15 per 1,000 views, meaning 10 million Shorts views generates roughly $500 to $1,500 USD.',
  },
  {
    q: 'What are the exact YouTube Partner Program (YPP) requirements in 2026?',
    a: 'To unlock monetization, you must meet either: Path A (1,000 subscribers AND 4,000 valid public watch hours in the past 12 months) OR Path B (1,000 subscribers AND 10 million public Shorts views in the past 90 days), with zero active community guideline strikes.',
  },
];
