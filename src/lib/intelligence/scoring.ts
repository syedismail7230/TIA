/**
 * TIA Creator Intelligence Score™ & Campaign Match Algorithm
 * Implements deterministic scoring, fraud penalties, and objective-based matching.
 */

import { analyzeSocialAccount, RawSocialAccountData, AnalyzedAccountMetrics } from './account-analyzer';

export interface CreatorScoreBreakdown {
  overallScore: number; // 0 - 100
  audienceQualityScore: number; // 0 - 100 (25% Weight)
  authenticityScore: number; // 0 - 100 (20% Weight)
  engagementQualityScore: number; // 0 - 100 (20% Weight)
  reputationScore: number; // 0 - 100 (15% Weight)
  brandSafetyScore: number; // 0 - 100 (10% Weight)
  dataConfidenceScore: number; // 0 - 100 (10% Weight)
  riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL';
  anomaliesDetected: string[];
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
 * Exact PRD Weights:
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
  rawAccounts?: RawSocialAccountData[];
}): CreatorScoreBreakdown {
  let audienceQuality = params.audienceQuality ?? 85;
  let authenticity = params.authenticity ?? 90;
  let engagementQuality = params.engagementQuality ?? 80;
  let reputation = params.reputation ?? 95;
  let brandSafety = params.brandSafety ?? 98;
  let dataConfidence = params.dataConfidence ?? 90;
  let anomalies: string[] = [];

  // If raw account data is provided, analyze accounts through deep analysis engine
  if (params.rawAccounts && params.rawAccounts.length > 0) {
    const analyzed = params.rawAccounts.map(analyzeSocialAccount);

    // Aggregate weighted averages across connected platforms
    audienceQuality = Math.round(analyzed.reduce((acc, a) => acc + a.audienceQualityScore, 0) / analyzed.length);
    authenticity = Math.round(analyzed.reduce((acc, a) => acc + a.authenticityScore, 0) / analyzed.length);
    engagementQuality = Math.round(analyzed.reduce((acc, a) => acc + a.engagementQualityScore, 0) / analyzed.length);
    reputation = Math.round(analyzed.reduce((acc, a) => acc + a.reputationScore, 0) / analyzed.length);
    brandSafety = Math.round(analyzed.reduce((acc, a) => acc + a.brandSafetyScore, 0) / analyzed.length);
    dataConfidence = Math.round(analyzed.reduce((acc, a) => acc + a.dataConfidenceScore, 0) / analyzed.length);
    anomalies = analyzed.flatMap((a) => a.anomaliesDetected);
  }

  // Constrain bounds (0 - 100)
  audienceQuality = Math.min(100, Math.max(0, audienceQuality));
  authenticity = Math.min(100, Math.max(0, authenticity));
  engagementQuality = Math.min(100, Math.max(0, engagementQuality));
  reputation = Math.min(100, Math.max(0, reputation));
  brandSafety = Math.min(100, Math.max(0, brandSafety));
  dataConfidence = Math.min(100, Math.max(0, dataConfidence));

  // Weighted calculation (PRD exact weights)
  let weightedScore =
    audienceQuality * 0.25 +
    authenticity * 0.20 +
    engagementQuality * 0.20 +
    reputation * 0.15 +
    brandSafety * 0.10 +
    dataConfidence * 0.10;

  // Severe Fraud & Bot Penalty Guardrail
  let riskLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'CRITICAL' = 'LOW';

  if (authenticity < 40 || audienceQuality < 35) {
    riskLevel = 'CRITICAL';
    weightedScore = Math.min(40, weightedScore * 0.5); // Cap to 40 max if bot/fraud detected
  } else if (authenticity < 60 || audienceQuality < 55) {
    riskLevel = 'HIGH';
    weightedScore = Math.min(65, weightedScore * 0.8);
  } else if (authenticity < 75 || dataConfidence < 50) {
    riskLevel = 'MODERATE';
  }

  const overallScore = Math.round(Math.min(100, Math.max(0, weightedScore)));

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
    riskLevel,
    anomaliesDetected: Array.from(new Set(anomalies)),
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
  creatorIntelligenceScore?: number;
  campaignObjective?: string;
}): MatchScoreResult {
  // 1. Category Fit
  const hasCategory = params.creatorCategories.some(
    (c) => c.toLowerCase().trim() === params.campaignCategory.toLowerCase().trim()
  );
  const categoryFit = hasCategory ? 100 : 35;

  // 2. Platform Fit
  const matchingPlatforms = params.requiredPlatforms.filter((p) =>
    params.creatorPlatforms.map((x) => x.toUpperCase()).includes(p.toUpperCase())
  );
  const platformFit =
    params.requiredPlatforms.length > 0
      ? Math.round((matchingPlatforms.length / params.requiredPlatforms.length) * 100)
      : 100;

  // 3. Geography Fit
  let geographyFit = 80;
  if (params.targetGeographies && params.targetGeographies.length > 0) {
    const creatorCountry = (params.creatorCountry || 'India').toLowerCase();
    const matched = params.targetGeographies.some((g) => g.toLowerCase() === creatorCountry || g.toLowerCase() === 'global');
    geographyFit = matched ? 98 : 40;
  }

  // 4. Price Efficiency (Creator rate vs. Campaign budget)
  let priceEfficiency = 85;
  if (params.campaignBudgetMinor > 0 && params.creatorStartingPriceMinor > 0) {
    const ratio = params.creatorStartingPriceMinor / params.campaignBudgetMinor;
    if (ratio <= 0.7) priceEfficiency = 98;
    else if (ratio <= 1.0) priceEfficiency = 92;
    else if (ratio <= 1.25) priceEfficiency = 74;
    else if (ratio <= 1.5) priceEfficiency = 55;
    else priceEfficiency = 30;
  }

  // 5. Engagement Quality Fit
  const engagementQuality = Math.min(100, Math.max(10, Math.round(params.creatorEngagementRate * 18)));
  const reputationFit = Math.min(100, Math.max(10, params.creatorReputation));
  const brandSafetyFit = Math.min(100, Math.max(10, params.creatorBrandSafety));

  // Dynamic Weights by Campaign Objective
  let weights = { geo: 0.25, cat: 0.20, plat: 0.15, eng: 0.15, price: 0.10, rep: 0.10, safe: 0.05 };
  const obj = (params.campaignObjective || 'AWARENESS').toUpperCase();

  if (obj === 'AWARENESS' || obj === 'REACH') {
    weights = { geo: 0.30, cat: 0.20, plat: 0.20, eng: 0.15, price: 0.10, rep: 0.05, safe: 0.00 };
  } else if (obj === 'SALES' || obj === 'CONVERSIONS' || obj === 'LEAD_GEN') {
    weights = { geo: 0.20, cat: 0.25, plat: 0.15, eng: 0.20, price: 0.15, rep: 0.05, safe: 0.00 };
  } else if (obj === 'ENGAGEMENT' || obj === 'VIRAL') {
    weights = { geo: 0.20, cat: 0.20, plat: 0.15, eng: 0.30, price: 0.10, rep: 0.05, safe: 0.00 };
  } else if (obj === 'BRAND_BUILDING' || obj === 'LONG_TERM') {
    weights = { geo: 0.20, cat: 0.25, plat: 0.15, eng: 0.15, price: 0.10, rep: 0.10, safe: 0.05 };
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

  const explanation = `${overall}% Match: Category relevance rated at ${categoryFit}%, target geography alignment is ${geographyFit}%, platform compatibility is ${platformFit}%, and commercial price efficiency is ${priceEfficiency}%.`;

  return {
    overallMatch: Math.min(100, Math.max(0, overall)),
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
      { factor: 'Geography Alignment', score: geographyFit, weight: Math.round(weights.geo * 100) },
      { factor: 'Category Relevance', score: categoryFit, weight: Math.round(weights.cat * 100) },
      { factor: 'Platform Compatibility', score: platformFit, weight: Math.round(weights.plat * 100) },
      { factor: 'Engagement Quality', score: engagementQuality, weight: Math.round(weights.eng * 100) },
      { factor: 'Commercial Efficiency', score: priceEfficiency, weight: Math.round(weights.price * 100) },
      { factor: 'Creator Reputation', score: reputationFit, weight: Math.round(weights.rep * 100) },
    ],
  };
}
