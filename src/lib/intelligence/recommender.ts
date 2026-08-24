/**
 * TIA Campaign Recommender & Creator Matching Engine
 * Recommends optimal creators for brand briefs and computes explainable match rankings.
 */

import { calculateCampaignMatchScore, MatchScoreResult } from './scoring';
import { calculateCreatorRankingScore, CreatorRankingProfile, RankedCreatorItem } from './ranking';

export interface CampaignRecommendationBrief {
  id: string;
  title: string;
  category: string;
  requiredPlatforms: string[];
  targetGeographies: string[];
  budgetMinor: number;
  campaignObjective?: 'AWARENESS' | 'SALES' | 'CONVERSIONS' | 'ENGAGEMENT' | 'BRAND_BUILDING';
  minFollowers?: number;
  maxFollowers?: number;
  minEngagementRate?: number;
}

export interface CreatorRecommendationMatch {
  creator: CreatorRankingProfile;
  ranking: RankedCreatorItem;
  matchResult: MatchScoreResult;
  recommendationIndex: number; // 0 - 100
  isStrongMatch: boolean;
  matchHighlights: string[];
}

/**
 * Recommends and ranks creators specifically matched to a brand campaign brief
 */
export function recommendCreatorsForCampaign(
  campaign: CampaignRecommendationBrief,
  creators: CreatorRankingProfile[]
): CreatorRecommendationMatch[] {
  const matches: CreatorRecommendationMatch[] = [];

  for (const creator of creators) {
    // 1. Quality & Risk Gate Filter
    if (creator.intelligenceScore.riskLevel === 'CRITICAL') {
      continue;
    }

    // 2. Minimum Audience Filter
    if (campaign.minFollowers && creator.totalAudience < campaign.minFollowers) {
      continue;
    }
    if (campaign.maxFollowers && creator.totalAudience > campaign.maxFollowers) {
      continue;
    }
    if (campaign.minEngagementRate && creator.averageEngagementRate < campaign.minEngagementRate) {
      continue;
    }

    // 3. Compute Campaign Match Score
    const matchResult = calculateCampaignMatchScore({
      creatorCategories: creator.categories,
      campaignCategory: campaign.category,
      creatorPlatforms: ['INSTAGRAM', 'YOUTUBE', 'TIKTOK', 'X'], // Platforms creator active on
      requiredPlatforms: campaign.requiredPlatforms,
      creatorCountry: creator.country,
      targetGeographies: campaign.targetGeographies,
      creatorStartingPriceMinor: creator.startingPriceMinor,
      campaignBudgetMinor: campaign.budgetMinor,
      creatorReputation: creator.intelligenceScore.reputationScore,
      creatorBrandSafety: creator.intelligenceScore.brandSafetyScore,
      creatorEngagementRate: creator.averageEngagementRate,
      creatorIntelligenceScore: creator.intelligenceScore.overallScore,
      campaignObjective: campaign.campaignObjective,
    });

    // 4. Compute Marketplace Ranking
    const ranking = calculateCreatorRankingScore(creator);

    // 5. Composite Recommendation Index (70% Match + 30% Creator Base Rank)
    const recommendationIndex = Math.round(
      matchResult.overallMatch * 0.70 + ranking.rankingScore * 0.30
    );

    // 6. Highlight generation
    const highlights: string[] = [];
    if (matchResult.categoryFit >= 90) highlights.push(`Exact Category Alignment (${campaign.category})`);
    if (matchResult.geographyFit >= 90) highlights.push(`High Audience Geo Match (${creator.country})`);
    if (matchResult.priceEfficiency >= 90) highlights.push(`Budget-Optimized Commercial Rate`);
    if (creator.intelligenceScore.authenticityScore >= 90) highlights.push(`90%+ Verified Authentic Audience`);
    if (creator.hasOAuthConnection) highlights.push(`Live API Verified Metrics`);

    matches.push({
      creator,
      ranking,
      matchResult,
      recommendationIndex,
      isStrongMatch: recommendationIndex >= 78,
      matchHighlights: highlights,
    });
  }

  // Sort by Recommendation Index descending
  return matches.sort((a, b) => b.recommendationIndex - a.recommendationIndex);
}
