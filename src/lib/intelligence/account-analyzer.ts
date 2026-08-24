/**
 * TIA Account Intelligence & Follower Analysis Engine
 * Analyzes raw account metadata, audience authenticity, engagement health, and tier benchmarks.
 */

export interface RawSocialAccountData {
  platform: 'INSTAGRAM' | 'YOUTUBE' | 'TIKTOK' | 'X' | 'FACEBOOK' | 'LINKEDIN';
  followersCount: number;
  followingCount?: number;
  postsCount?: number;
  recentLikesAvg?: number;
  recentCommentsAvg?: number;
  recentViewsAvg?: number;
  accountAgeDays?: number;
  isVerifiedBadge?: boolean;
  dataSource: 'OAUTH_API' | 'PUBLIC_API' | 'MANUAL_CLAIM';
  lastSyncedAt?: Date | string;
  historicalDisputesCount?: number;
  completedContractsCount?: number;
  onTimeDeliveryRate?: number; // 0.0 - 1.0
  averageBrandRating?: number; // 1.0 - 5.0
  toxicityFlagCount?: number;
}

export interface AnalyzedAccountMetrics {
  tier: 'NANO' | 'MICRO' | 'MID' | 'MACRO' | 'MEGA';
  benchmarkEngagementRate: number; // Expected benchmark %
  actualEngagementRate: number; // Calculated actual %
  engagementHealthRatio: number; // actual / benchmark
  followerFollowingRatio: number;
  likeToCommentRatio: number;
  viewToFollowerRatio: number;
  botProbabilityScore: number; // 0 (Clean) - 100 (Bot infested)
  audienceQualityScore: number; // 0 - 100
  authenticityScore: number; // 0 - 100
  engagementQualityScore: number; // 0 - 100
  reputationScore: number; // 0 - 100
  brandSafetyScore: number; // 0 - 100
  dataConfidenceScore: number; // 0 - 100
  anomaliesDetected: string[];
}

/**
 * Determine creator audience tier based on follower size
 */
export function getCreatorTier(followers: number): 'NANO' | 'MICRO' | 'MID' | 'MACRO' | 'MEGA' {
  if (followers < 10000) return 'NANO';
  if (followers < 100000) return 'MICRO';
  if (followers < 500000) return 'MID';
  if (followers < 1000000) return 'MACRO';
  return 'MEGA';
}

/**
 * Platform & Tier-specific engagement rate benchmarks (%)
 */
export function getTierBenchmarkER(platform: string, tier: 'NANO' | 'MICRO' | 'MID' | 'MACRO' | 'MEGA'): number {
  const plat = platform.toUpperCase();

  const benchmarks: Record<string, Record<string, number>> = {
    INSTAGRAM: { NANO: 5.5, MICRO: 3.8, MID: 2.6, MACRO: 1.9, MEGA: 1.4 },
    YOUTUBE: { NANO: 6.5, MICRO: 4.8, MID: 3.4, MACRO: 2.5, MEGA: 1.8 },
    TIKTOK: { NANO: 8.5, MICRO: 6.2, MID: 4.5, MACRO: 3.2, MEGA: 2.2 },
    X: { NANO: 3.5, MICRO: 2.4, MID: 1.8, MACRO: 1.2, MEGA: 0.9 },
  };

  return benchmarks[plat]?.[tier] ?? benchmarks.INSTAGRAM[tier];
}

/**
 * Deeply analyzes raw social account metrics and computes dimensional health scores
 */
export function analyzeSocialAccount(account: RawSocialAccountData): AnalyzedAccountMetrics {
  const followers = Math.max(0, account.followersCount || 0);
  const following = Math.max(0, account.followingCount || 0);
  const posts = Math.max(0, account.postsCount || 0);
  const avgLikes = Math.max(0, account.recentLikesAvg ?? (followers > 0 ? followers * 0.035 : 0));
  const avgComments = Math.max(0, account.recentCommentsAvg ?? (avgLikes > 0 ? avgLikes * 0.03 : 0));
  const avgViews = Math.max(0, account.recentViewsAvg ?? (followers > 0 ? followers * 0.25 : 0));

  const tier = getCreatorTier(followers);
  const benchmarkER = getTierBenchmarkER(account.platform, tier);
  const anomalies: string[] = [];

  // 1. Calculate Actual Engagement Rate
  let actualER = 0;
  if (followers > 0) {
    if (account.platform === 'YOUTUBE') {
      // YouTube: (Likes + Comments) / Views (or views to subscriber velocity)
      actualER = avgViews > 0 ? ((avgLikes + avgComments) / avgViews) * 100 : (avgLikes / followers) * 100;
    } else {
      // Instagram / TikTok / X: (Likes + Comments) / Followers
      actualER = ((avgLikes + avgComments) / followers) * 100;
    }
  }

  // Cap ER to realistic ranges
  actualER = Math.max(0, Math.min(100, actualER));

  // 2. Ratios & Anomaly Detection
  const followerFollowingRatio = following > 0 ? followers / following : followers;
  const likeToCommentRatio = avgComments > 0 ? avgLikes / avgComments : avgLikes;
  const viewToFollowerRatio = followers > 0 ? avgViews / followers : 0;

  let botScore = 0;

  // Anomaly: 0 or near-zero engagement on large follower base (Bought / dead followers)
  if (followers > 20000 && actualER < 0.2) {
    botScore += 45;
    anomalies.push('Abnormally low engagement rate relative to follower size');
  }

  // Anomaly: Extreme Follower-to-Following Inversion for large accounts
  if (followers > 50000 && following > followers * 1.5) {
    botScore += 25;
    anomalies.push('Suspicious mass-following pattern detected');
  }

  // Anomaly: Unnatural Like-to-Comment ratios (e.g. 5000 likes with 2 comments, or 500 likes with 500 comments)
  if (avgLikes > 500) {
    if (likeToCommentRatio > 250) {
      botScore += 20;
      anomalies.push('Unnatural like-to-comment ratio (disproportionate bot likes)');
    } else if (likeToCommentRatio < 2.0 && avgComments > 50) {
      botScore += 20;
      anomalies.push('Unnatural comment clustering (comment pod / bot spam)');
    }
  }

  // Anomaly: Zero posts with massive follower count
  if (followers > 10000 && posts < 3) {
    botScore += 35;
    anomalies.push('High follower count with zero content history');
  }

  botScore = Math.min(100, botScore);

  // 3. Dimensional Scoring

  // A. Audience Quality (25% Weight Component)
  let audienceQuality = 90;
  if (botScore > 0) audienceQuality -= botScore * 0.85;
  if (followerFollowingRatio > 2.0) audienceQuality += 5;
  if (account.isVerifiedBadge) audienceQuality += 5;
  audienceQuality = Math.max(10, Math.min(100, Math.round(audienceQuality)));

  // B. Authenticity (20% Weight Component)
  let authenticity = 92;
  if (botScore > 0) {
    authenticity -= botScore * 0.95;
  } else if (likeToCommentRatio >= 10 && likeToCommentRatio <= 60) {
    authenticity += 5; // Healthy organic ratio bonus only when zero bot flags
  }
  authenticity = Math.max(10, Math.min(100, Math.round(authenticity)));

  // C. Engagement Quality (20% Weight Component)
  const healthRatio = benchmarkER > 0 ? actualER / benchmarkER : 1.0;
  let engagementQuality = 50;
  if (healthRatio >= 1.5) engagementQuality = 96;
  else if (healthRatio >= 1.1) engagementQuality = 90;
  else if (healthRatio >= 0.85) engagementQuality = 82;
  else if (healthRatio >= 0.6) engagementQuality = 68;
  else if (healthRatio >= 0.3) engagementQuality = 48;
  else engagementQuality = 25;

  // D. Reputation (15% Weight Component)
  let reputation = 90;
  const onTime = account.onTimeDeliveryRate ?? 1.0;
  const disputes = account.historicalDisputesCount ?? 0;
  const rating = account.averageBrandRating ?? 4.8;

  reputation = Math.round(onTime * 40 + Math.min(50, (rating / 5.0) * 50) + 10 - Math.min(40, disputes * 15));
  reputation = Math.max(20, Math.min(100, reputation));

  // E. Brand Safety (10% Weight Component)
  let brandSafety = 98;
  const toxicity = account.toxicityFlagCount ?? 0;
  brandSafety = Math.max(10, brandSafety - toxicity * 25);

  // F. Data Confidence (10% Weight Component)
  let dataConfidence = 60;
  if (account.dataSource === 'OAUTH_API') dataConfidence = 100;
  else if (account.dataSource === 'PUBLIC_API') dataConfidence = 75;
  else dataConfidence = 40;

  // Token freshness penalty
  if (account.lastSyncedAt) {
    const daysSinceSync = (Date.now() - new Date(account.lastSyncedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceSync > 90) dataConfidence -= 40;
    else if (daysSinceSync > 30) dataConfidence -= 20;
    else if (daysSinceSync > 7) dataConfidence -= 5;
  }
  dataConfidence = Math.max(10, Math.min(100, dataConfidence));

  return {
    tier,
    benchmarkEngagementRate: benchmarkER,
    actualEngagementRate: Math.round(actualER * 100) / 100,
    engagementHealthRatio: Math.round(healthRatio * 100) / 100,
    followerFollowingRatio: Math.round(followerFollowingRatio * 10) / 10,
    likeToCommentRatio: Math.round(likeToCommentRatio * 10) / 10,
    viewToFollowerRatio: Math.round(viewToFollowerRatio * 100) / 100,
    botProbabilityScore: botScore,
    audienceQualityScore: audienceQuality,
    authenticityScore: authenticity,
    engagementQualityScore: engagementQuality,
    reputationScore: reputation,
    brandSafetyScore: brandSafety,
    dataConfidenceScore: dataConfidence,
    anomaliesDetected: anomalies,
  };
}
