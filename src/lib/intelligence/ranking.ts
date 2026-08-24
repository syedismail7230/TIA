/**
 * TIA Marketplace Discovery & Creator Ranking Engine
 * Controls creator discovery feed positioning, top creator recommendations, and quality gates.
 */

import { CreatorScoreBreakdown } from './scoring';

export interface CreatorRankingProfile {
  id: string;
  displayName: string;
  username: string;
  avatarUrl?: string;
  country: string;
  categories: string[];
  totalAudience: number;
  averageEngagementRate: number;
  startingPriceMinor: number;
  isVerifiedBadge: boolean;
  hasOAuthConnection: boolean;
  completedCampaignsCount: number;
  averageRating: number; // 1.0 - 5.0
  intelligenceScore: CreatorScoreBreakdown;
  activeDisputesCount?: number;
}

export interface RankedCreatorItem {
  creator: CreatorRankingProfile;
  rankingScore: number; // 0 - 100
  tierBadge: 'TOP_TIER' | 'VERIFIED_ELITE' | 'RISING_STAR' | 'STANDARD' | 'RESTRICTED';
  rankingFactors: {
    factor: string;
    points: number;
  }[];
  isRecommendedForTop: boolean;
}

/**
 * Calculates marketplace rank for a creator profile
 */
export function calculateCreatorRankingScore(profile: CreatorRankingProfile): RankedCreatorItem {
  const { intelligenceScore, hasOAuthConnection, isVerifiedBadge, completedCampaignsCount, averageRating } = profile;

  // Severe Risk / Bot Override Gate: Suppress from top rankings
  if (intelligenceScore.riskLevel === 'CRITICAL' || intelligenceScore.authenticityScore < 40) {
    return {
      creator: profile,
      rankingScore: Math.min(25, intelligenceScore.overallScore * 0.3),
      tierBadge: 'RESTRICTED',
      rankingFactors: [
        { factor: 'Critical Risk / Bot Infiltration Penalty', points: -50 },
      ],
      isRecommendedForTop: false,
    };
  }

  // 1. Intelligence Score Weight (45%)
  const intelligencePoints = intelligenceScore.overallScore * 0.45;

  // 2. Authenticity Weight (20%)
  const authenticityPoints = intelligenceScore.authenticityScore * 0.20;

  // 3. Live OAuth & Platform Verification (15%)
  const verificationPoints = hasOAuthConnection ? 15 : isVerifiedBadge ? 10 : 3;

  // 4. Delivery & Review Reputation (10%)
  const ratingPoints = Math.min(10, (averageRating / 5.0) * 10);

  // 5. Campaign Experience Velocity (10%)
  const campaignPoints = Math.min(10, completedCampaignsCount * 1.5);

  const rawTotal = intelligencePoints + authenticityPoints + verificationPoints + ratingPoints + campaignPoints;
  const rankingScore = Math.round(Math.min(100, Math.max(0, rawTotal)));

  // Determine Creator Marketplace Tier
  let tierBadge: 'TOP_TIER' | 'VERIFIED_ELITE' | 'RISING_STAR' | 'STANDARD' | 'RESTRICTED' = 'STANDARD';
  if (rankingScore >= 90 && hasOAuthConnection) {
    tierBadge = 'TOP_TIER';
  } else if (rankingScore >= 80) {
    tierBadge = 'VERIFIED_ELITE';
  } else if (rankingScore >= 65) {
    tierBadge = 'RISING_STAR';
  }

  const isRecommendedForTop = rankingScore >= 75 && intelligenceScore.riskLevel === 'LOW';

  return {
    creator: profile,
    rankingScore,
    tierBadge,
    rankingFactors: [
      { factor: 'TIA Intelligence Composite (45%)', points: Math.round(intelligencePoints) },
      { factor: 'Audience Authenticity (20%)', points: Math.round(authenticityPoints) },
      { factor: 'Live API Verification (15%)', points: verificationPoints },
      { factor: 'Brand Review Rating (10%)', points: Math.round(ratingPoints) },
      { factor: 'Campaign Track Record (10%)', points: Math.round(campaignPoints) },
    ],
    isRecommendedForTop,
  };
}

/**
 * Sorts and ranks a pool of creators for the discovery marketplace
 */
export function rankCreatorsForMarketplace(creators: CreatorRankingProfile[]): RankedCreatorItem[] {
  return creators
    .map(calculateCreatorRankingScore)
    .sort((a, b) => b.rankingScore - a.rankingScore);
}
