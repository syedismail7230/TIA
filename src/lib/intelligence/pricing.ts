// ===================================================
// TIA INTELLIGENCE - FAIR MARKET PRICING ENGINE
// Reverse-engineered Upfluence Cost-Per-Engagement (CPE) & Cost-Per-View (CPV) Algorithm
// ===================================================

export interface PricingInput {
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK' | 'X' | 'LINKEDIN';
  category: string;
  followers: number;
  averageViews: number;
  engagementRate: number; // e.g. 4.5 for 4.5%
  authenticityScore: number; // 0 - 100%
}

export interface PricingEstimate {
  estimatedLow: number;
  estimatedMedian: number;
  estimatedHigh: number;
  currency: 'INR';
  cpeBenchmark: number;
  cpvBenchmark: number;
  botHaircutPercentage: number;
  confidence: 'HIGH' | 'MEDIUM' | 'ESTIMATED';
  deliverablesBreakdown: {
    dedicatedVideo: number;
    integratedSegment: number;
    shortReel: number;
    storySet: number;
  };
}

// Category-specific Cost-Per-Engagement (CPE) & Cost-Per-View (CPV) benchmarks in INR
const NICHE_BENCHMARKS: Record<string, { cpe: number; cpv: number }> = {
  'Tech & Software': { cpe: 8.5, cpv: 1.8 },
  'Finance & Crypto': { cpe: 12.0, cpv: 2.5 },
  'Fitness & Athletics': { cpe: 6.0, cpv: 1.2 },
  'Beauty & Skincare': { cpe: 5.5, cpv: 1.1 },
  'Lifestyle & Travel': { cpe: 4.8, cpv: 0.95 },
  'Gaming & Esports': { cpe: 4.5, cpv: 0.85 },
  'Food & Culinary': { cpe: 4.0, cpv: 0.8 },
  'Default': { cpe: 5.0, cpv: 1.0 },
};

/**
 * Calculates fair commercial price range based on verified view velocity,
 * niche benchmarks, and discounts inorganic/bot audience proportion.
 */
export function calculateFairMarketPricing(input: PricingInput): PricingEstimate {
  const benchmark = NICHE_BENCHMARKS[input.category] || NICHE_BENCHMARKS['Default'];

  // Base View-Driven & Engagement-Driven Value
  const effectiveViews = Math.max(input.averageViews, Math.round(input.followers * 0.12));
  const estimatedEngagements = Math.round(effectiveViews * (input.engagementRate / 100));

  const viewComponent = effectiveViews * benchmark.cpv;
  const engagementComponent = estimatedEngagements * benchmark.cpe;

  // Composite raw valuation
  const rawBasePrice = (viewComponent * 0.45) + (engagementComponent * 0.55);

  // Authenticity Discount Factor (Upfluence Bot Haircut)
  // If authenticity is < 85%, scale down pricing directly
  const authenticityFactor = Math.max(0.3, Math.min(1.0, input.authenticityScore / 100));
  const botHaircutPercentage = Math.round((1 - authenticityFactor) * 100);

  const discountedMedian = Math.round((rawBasePrice * authenticityFactor) / 500) * 500; // Round to nearest ₹500
  const safeMedian = Math.max(3000, discountedMedian);

  const estimatedLow = Math.round((safeMedian * 0.8) / 500) * 500;
  const estimatedHigh = Math.round((safeMedian * 1.25) / 500) * 500;

  return {
    estimatedLow,
    estimatedMedian: safeMedian,
    estimatedHigh,
    currency: 'INR',
    cpeBenchmark: benchmark.cpe,
    cpvBenchmark: benchmark.cpv,
    botHaircutPercentage,
    confidence: input.averageViews > 0 ? 'HIGH' : 'MEDIUM',
    deliverablesBreakdown: {
      dedicatedVideo: safeMedian,
      integratedSegment: Math.round((safeMedian * 0.55) / 500) * 500,
      shortReel: Math.round((safeMedian * 0.4) / 500) * 500,
      storySet: Math.round((safeMedian * 0.2) / 500) * 500,
    },
  };
}

