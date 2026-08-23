export interface CreatorScoreBreakdown {
  overallScore: number; // 0 - 100
  audienceQualityScore: number; // 0 - 100
  authenticityScore: number; // 0 - 100
  engagementQualityScore: number; // 0 - 100
  reputationScore: number; // 0 - 100
  brandSafetyScore: number; // 0 - 100
  dataConfidenceScore: number; // 0 - 100
  dimensions: {
    name: string;
    score: number;
    weight: number;
    status: 'OPTIMAL' | 'GOOD' | 'NEEDS_ATTENTION' | 'CRITICAL';
  }[];
}

export interface MatchScoreResult {
  overallMatch: number; // 0 - 100%
  audienceFit: number;
  geographyFit: number;
  categoryFit: number;
  platformFit: number;
  engagementQuality: number;
  priceEfficiency: number;
  reputationFit: number;
  brandSafetyFit: number;
  explanation: string;
  contributingFactors: {
    factor: string;
    score: number;
    weight: number;
  }[];
}

/**
 * Calculates the deterministic composite TIA Creator Intelligence Score™
 * Weights:
 * - Audience Quality: 25%
 * - Authenticity: 20%
 * - Engagement Quality: 20%
 * - Reputation: 15%
 * - Brand Safety: 10%
 * - Data Confidence: 10%
 */
export function calculateCreatorIntelligenceScore(params: {
  audienceQuality?: number;
  authenticity?: number;
  engagementQuality?: number;
  reputation?: number;
  brandSafety?: number;
  dataConfidence?: number;
}): CreatorScoreBreakdown {
  const audienceQuality = Math.min(100, Math.max(0, params.audienceQuality ?? 85));
  const authenticity = Math.min(100, Math.max(0, params.authenticity ?? 90));
  const engagementQuality = Math.min(100, Math.max(0, params.engagementQuality ?? 80));
  const reputation = Math.min(100, Math.max(0, params.reputation ?? 95));
  const brandSafety = Math.min(100, Math.max(0, params.brandSafety ?? 98));
  const dataConfidence = Math.min(100, Math.max(0, params.dataConfidence ?? 90));

  const weightedScore =
    audienceQuality * 0.25 +
    authenticity * 0.20 +
    engagementQuality * 0.20 +
    reputation * 0.15 +
    brandSafety * 0.10 +
    dataConfidence * 0.10;

  const overallScore = Math.round(weightedScore);

  const getStatus = (val: number) => {
    if (val >= 90) return 'OPTIMAL';
    if (val >= 75) return 'GOOD';
    if (val >= 50) return 'NEEDS_ATTENTION';
    return 'CRITICAL';
  };

  return {
    overallScore,
    audienceQualityScore: audienceQuality,
    authenticityScore: authenticity,
    engagementQualityScore: engagementQuality,
    reputationScore: reputation,
    brandSafetyScore: brandSafety,
    dataConfidenceScore: dataConfidence,
    dimensions: [
      { name: 'Audience Quality', score: audienceQuality, weight: 25, status: getStatus(audienceQuality) },
      { name: 'Authenticity', score: authenticity, weight: 20, status: getStatus(authenticity) },
      { name: 'Engagement Quality', score: engagementQuality, weight: 20, status: getStatus(engagementQuality) },
      { name: 'Reputation', score: reputation, weight: 15, status: getStatus(reputation) },
      { name: 'Brand Safety', score: brandSafety, weight: 10, status: getStatus(brandSafety) },
      { name: 'Data Confidence', score: dataConfidence, weight: 10, status: getStatus(dataConfidence) },
    ],
  };
}

/**
 * Calculates campaign-specific TIA Match Score™ and generates explainable rationale.
 */
export function calculateCampaignMatchScore(params: {
  creatorCategories: string[];
  campaignCategory: string;
  creatorPlatforms: string[];
  requiredPlatforms: string[];
  creatorCountry?: string;
  targetGeographies?: string[];
  creatorStartingPriceMinor: number;
  campaignBudgetMinor: number;
  creatorReputation: number;
  creatorBrandSafety: number;
  creatorEngagementRate: number;
  campaignObjective?: string;
}): MatchScoreResult {
  // 1. Category Fit
  const hasCategory = params.creatorCategories.some(
    (c) => c.toLowerCase() === params.campaignCategory.toLowerCase()
  );
  const categoryFit = hasCategory ? 100 : 40;

  // 2. Platform Fit
  const matchingPlatforms = params.requiredPlatforms.filter((p) =>
    params.creatorPlatforms.includes(p)
  );
  const platformFit =
    params.requiredPlatforms.length > 0
      ? Math.round((matchingPlatforms.length / params.requiredPlatforms.length) * 100)
      : 100;

  // 3. Geography Fit
  let geographyFit = 75;
  if (params.targetGeographies && params.targetGeographies.length > 0) {
    if (params.creatorCountry && params.targetGeographies.includes(params.creatorCountry)) {
      geographyFit = 98;
    } else {
      geographyFit = 45;
    }
  }

  // 4. Price Efficiency (Creator rate vs. Campaign budget)
  let priceEfficiency = 85;
  if (params.campaignBudgetMinor > 0) {
    const ratio = params.creatorStartingPriceMinor / params.campaignBudgetMinor;
    if (ratio <= 0.8) priceEfficiency = 95;
    else if (ratio <= 1.0) priceEfficiency = 90;
    else if (ratio <= 1.2) priceEfficiency = 75;
    else priceEfficiency = 50;
  }

  // 5. Engagement Quality
  const engagementQuality = Math.min(100, Math.round(params.creatorEngagementRate * 18));
  const reputationFit = params.creatorReputation;
  const brandSafetyFit = params.creatorBrandSafety;

  // Weights dynamically adapt to campaign objective
  let weights = { geo: 0.25, cat: 0.20, plat: 0.15, eng: 0.15, price: 0.10, rep: 0.10, safe: 0.05 };
  if (params.campaignObjective === 'AWARENESS') {
    weights = { geo: 0.30, cat: 0.20, plat: 0.20, eng: 0.10, price: 0.10, rep: 0.05, safe: 0.05 };
  } else if (params.campaignObjective === 'SALES' || params.campaignObjective === 'LEAD_GEN') {
    weights = { geo: 0.20, cat: 0.25, plat: 0.10, eng: 0.20, price: 0.15, rep: 0.05, safe: 0.05 };
  }

  const overall = Math.round(
    geographyFit * weights.geo +
    categoryFit * weights.cat +
    platformFit * weights.plat +
    engagementQuality * weights.eng +
    priceEfficiency * weights.price +
    reputationFit * weights.rep +
    brandSafetyFit * weights.safe
  );

  const explanation = `${overall}% Match because creator content category (${params.campaignCategory}) aligns with campaign requirements, target geography match is ${geographyFit}%, and pricing efficiency is rated at ${priceEfficiency}%.`;

  return {
    overallMatch: overall,
    audienceFit: Math.round((geographyFit + categoryFit) / 2),
    geographyFit,
    categoryFit,
    platformFit,
    engagementQuality,
    priceEfficiency,
    reputationFit,
    brandSafetyFit,
    explanation,
    contributingFactors: [
      { factor: 'Geography Alignment', score: geographyFit, weight: weights.geo * 100 },
      { factor: 'Category Relevance', score: categoryFit, weight: weights.cat * 100 },
      { factor: 'Platform Compatibility', score: platformFit, weight: weights.plat * 100 },
      { factor: 'Engagement Quality', score: engagementQuality, weight: weights.eng * 100 },
      { factor: 'Commercial Efficiency', score: priceEfficiency, weight: weights.price * 100 },
      { factor: 'Creator Reputation', score: reputationFit, weight: weights.rep * 100 },
    ],
  };
}
