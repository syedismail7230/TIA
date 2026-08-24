import assert from 'assert';
import {
  analyzeSocialAccount,
  getCreatorTier,
  getTierBenchmarkER,
  RawSocialAccountData,
} from '../src/lib/intelligence/account-analyzer';
import {
  calculateCreatorIntelligenceScore,
  calculateCampaignMatchScore,
} from '../src/lib/intelligence/scoring';
import {
  calculateCreatorRankingScore,
  rankCreatorsForMarketplace,
  CreatorRankingProfile,
} from '../src/lib/intelligence/ranking';
import {
  recommendCreatorsForCampaign,
  CampaignRecommendationBrief,
} from '../src/lib/intelligence/recommender';

console.log('================================================================');
console.log('🧪 TIA CREATOR INTELLIGENCE, SCORING & RECOMMENDATION QA SUITE');
console.log('================================================================\n');

let passedCount = 0;
let totalCount = 0;

function it(name: string, fn: () => void) {
  totalCount++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedCount++;
  } catch (err: any) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error(`     Error: ${err.message}\n`);
    throw err;
  }
}

// -------------------------------------------------------------
// 1. ACCOUNT ANALYZER TESTS
// -------------------------------------------------------------
console.log('▶ SECTION 1: Social Account & Follower Analysis Engine');

it('correctly maps audience follower tiers (Nano, Micro, Mid, Macro, Mega)', () => {
  assert.strictEqual(getCreatorTier(4500), 'NANO');
  assert.strictEqual(getCreatorTier(45000), 'MICRO');
  assert.strictEqual(getCreatorTier(250000), 'MID');
  assert.strictEqual(getCreatorTier(750000), 'MACRO');
  assert.strictEqual(getCreatorTier(2500000), 'MEGA');
});

it('correctly retrieves platform & tier-specific benchmark engagement rates', () => {
  assert.strictEqual(getTierBenchmarkER('INSTAGRAM', 'NANO'), 5.5);
  assert.strictEqual(getTierBenchmarkER('INSTAGRAM', 'MICRO'), 3.8);
  assert.strictEqual(getTierBenchmarkER('YOUTUBE', 'NANO'), 6.5);
  assert.strictEqual(getTierBenchmarkER('TIKTOK', 'NANO'), 8.5);
  assert.strictEqual(getTierBenchmarkER('X', 'MEGA'), 0.9);
});

it('accurately analyzes a high-authenticity creator profile', () => {
  const account: RawSocialAccountData = {
    platform: 'INSTAGRAM',
    followersCount: 120000,
    followingCount: 650,
    postsCount: 340,
    recentLikesAvg: 4800,
    recentCommentsAvg: 160,
    isVerifiedBadge: true,
    dataSource: 'OAUTH_API',
    lastSyncedAt: new Date(),
    onTimeDeliveryRate: 1.0,
    averageBrandRating: 4.9,
    historicalDisputesCount: 0,
  };

  const result = analyzeSocialAccount(account);
  assert.strictEqual(result.tier, 'MID');
  assert.ok(result.actualEngagementRate >= 3.5, 'Engagement rate should be healthy');
  assert.strictEqual(result.botProbabilityScore, 0, 'Clean account should have 0 bot score');
  assert.ok(result.authenticityScore >= 90, 'Authenticity score should be >= 90');
  assert.strictEqual(result.dataConfidenceScore, 100, 'Fresh OAuth data confidence should be 100');
  assert.strictEqual(result.anomaliesDetected.length, 0, 'No anomalies should be flagged');
});

it('detects bought/fake followers and bot inflation anomalies', () => {
  const fakeAccount: RawSocialAccountData = {
    platform: 'INSTAGRAM',
    followersCount: 350000,
    followingCount: 120,
    postsCount: 15,
    recentLikesAvg: 30, // 30 likes on 350,000 followers = 0.008% ER
    recentCommentsAvg: 1,
    dataSource: 'PUBLIC_API',
  };

  const result = analyzeSocialAccount(fakeAccount);
  assert.ok(result.botProbabilityScore >= 40, 'Bot probability score must be >= 40 for dead followers');
  assert.ok(result.authenticityScore <= 55, 'Authenticity score must be penalized');
  assert.ok(result.anomaliesDetected.some(a => a.includes('Abnormally low engagement')), 'Anomaly must be recorded');
});

it('detects unnatural comment pod clustering ratios', () => {
  const podAccount: RawSocialAccountData = {
    platform: 'INSTAGRAM',
    followersCount: 50000,
    followingCount: 400,
    postsCount: 100,
    recentLikesAvg: 800,
    recentCommentsAvg: 700, // 800 likes : 700 comments (1.14 ratio = comment pod)
    dataSource: 'PUBLIC_API',
  };

  const result = analyzeSocialAccount(podAccount);
  assert.ok(result.anomaliesDetected.some(a => a.includes('comment pod') || a.includes('clustering')), 'Pod anomaly must be recorded');
});

it('gracefully handles boundary conditions (0 followers, 0 posts) without NaN', () => {
  const zeroAccount: RawSocialAccountData = {
    platform: 'INSTAGRAM',
    followersCount: 0,
    followingCount: 0,
    postsCount: 0,
    dataSource: 'MANUAL_CLAIM',
  };

  const result = analyzeSocialAccount(zeroAccount);
  assert.strictEqual(result.actualEngagementRate, 0);
  assert.ok(!isNaN(result.audienceQualityScore));
  assert.ok(!isNaN(result.authenticityScore));
  assert.ok(!isNaN(result.engagementQualityScore));
});

// -------------------------------------------------------------
// 2. MASTER CREATOR INTELLIGENCE SCORE TESTS
// -------------------------------------------------------------
console.log('\n▶ SECTION 2: TIA Creator Intelligence Score™ Composite');

it('calculates deterministic composite score matching exact PRD weights (25%, 20%, 20%, 15%, 10%, 10%)', () => {
  const score = calculateCreatorIntelligenceScore({
    audienceQuality: 80, // * 0.25 = 20.0
    authenticity: 90,   // * 0.20 = 18.0
    engagementQuality: 85, // * 0.20 = 17.0
    reputation: 90,     // * 0.15 = 13.5
    brandSafety: 100,   // * 0.10 = 10.0
    dataConfidence: 90, // * 0.10 = 9.0
  });

  // Expected: 20.0 + 18.0 + 17.0 + 13.5 + 10.0 + 9.0 = 87.5 -> 88
  assert.strictEqual(score.overallScore, 88);
  assert.strictEqual(score.riskLevel, 'LOW');
  assert.strictEqual(score.dimensions.length, 6);
});

it('triggers severe fraud override penalty when authenticity is critically low', () => {
  const score = calculateCreatorIntelligenceScore({
    audienceQuality: 30,
    authenticity: 25,
    engagementQuality: 20,
    reputation: 90,
    brandSafety: 90,
    dataConfidence: 80,
  });

  assert.strictEqual(score.riskLevel, 'CRITICAL');
  assert.ok(score.overallScore <= 40, 'Critical risk creator score must be capped to <= 40');
});

// -------------------------------------------------------------
// 3. CAMPAIGN MATCH SCORE ENGINE TESTS
// -------------------------------------------------------------
console.log('\n▶ SECTION 3: Campaign Match Score™ & Objective-Driven Weights');

it('calculates high match for ideal category, geography, platform, and price fit', () => {
  const match = calculateCampaignMatchScore({
    creatorCategories: ['Technology', 'Lifestyle'],
    campaignCategory: 'Technology',
    creatorPlatforms: ['YOUTUBE', 'INSTAGRAM'],
    requiredPlatforms: ['YOUTUBE'],
    creatorCountry: 'India',
    targetGeographies: ['India', 'United States'],
    creatorStartingPriceMinor: 2500000, // ₹25,000
    campaignBudgetMinor: 3000000,       // ₹30,000 budget
    creatorReputation: 95,
    creatorBrandSafety: 98,
    creatorEngagementRate: 4.8,
    campaignObjective: 'AWARENESS',
  });

  assert.ok(match.overallMatch >= 88, 'Match score should be >= 88 for ideal match');
  assert.strictEqual(match.categoryFit, 100);
  assert.strictEqual(match.platformFit, 100);
  assert.ok(match.explanation.includes('Match'));
});

it('dynamically adapts weights when campaign objective changes to SALES / CONVERSIONS', () => {
  const salesMatch = calculateCampaignMatchScore({
    creatorCategories: ['Fashion'],
    campaignCategory: 'Fashion',
    creatorPlatforms: ['INSTAGRAM'],
    requiredPlatforms: ['INSTAGRAM'],
    creatorCountry: 'India',
    targetGeographies: ['India'],
    creatorStartingPriceMinor: 1000000,
    campaignBudgetMinor: 1500000,
    creatorReputation: 90,
    creatorBrandSafety: 95,
    creatorEngagementRate: 5.5,
    campaignObjective: 'SALES',
  });

  const catFactor = salesMatch.contributingFactors.find(f => f.factor === 'Category Relevance');
  assert.strictEqual(catFactor?.weight, 25, 'SALES objective should weigh Category Relevance at 25%');
});

// -------------------------------------------------------------
// 4. MARKETPLACE RANKING & TOP CREATOR SELECTION TESTS
// -------------------------------------------------------------
console.log('\n▶ SECTION 4: Discovery Ranking & Top Creator Control');

it('promotes high-scoring, live OAuth verified creators to TOP_TIER badge', () => {
  const topCreator: CreatorRankingProfile = {
    id: 'creator-top-1',
    displayName: 'Aarav Sharma',
    username: 'aaravtech',
    country: 'India',
    categories: ['Technology'],
    totalAudience: 350000,
    averageEngagementRate: 4.8,
    startingPriceMinor: 2500000,
    isVerifiedBadge: true,
    hasOAuthConnection: true,
    completedCampaignsCount: 14,
    averageRating: 4.95,
    intelligenceScore: calculateCreatorIntelligenceScore({
      audienceQuality: 94,
      authenticity: 95,
      engagementQuality: 92,
      reputation: 96,
      brandSafety: 98,
      dataConfidence: 100,
    }),
  };

  const ranked = calculateCreatorRankingScore(topCreator);
  assert.strictEqual(ranked.tierBadge, 'TOP_TIER');
  assert.strictEqual(ranked.isRecommendedForTop, true);
  assert.ok(ranked.rankingScore >= 90);
});

it('suppresses bot/critical risk creators from marketplace top rankings', () => {
  const botCreator: CreatorRankingProfile = {
    id: 'creator-bot-1',
    displayName: 'Fake Bot King',
    username: 'botking99',
    country: 'India',
    categories: ['Technology'],
    totalAudience: 1000000,
    averageEngagementRate: 0.05,
    startingPriceMinor: 500000,
    isVerifiedBadge: false,
    hasOAuthConnection: false,
    completedCampaignsCount: 0,
    averageRating: 2.0,
    intelligenceScore: calculateCreatorIntelligenceScore({
      audienceQuality: 20,
      authenticity: 15,
      engagementQuality: 10,
      reputation: 40,
      brandSafety: 50,
      dataConfidence: 30,
    }),
  };

  const ranked = calculateCreatorRankingScore(botCreator);
  assert.strictEqual(ranked.tierBadge, 'RESTRICTED');
  assert.strictEqual(ranked.isRecommendedForTop, false);
  assert.ok(ranked.rankingScore <= 25);
});

// -------------------------------------------------------------
// 5. CAMPAIGN RECOMMENDER INTEGRATION TESTS
// -------------------------------------------------------------
console.log('\n▶ SECTION 5: Campaign Recommender & Multi-Creator Matching');

it('filters out ineligible and critical risk creators, ranking best candidate first', () => {
  const campaign: CampaignRecommendationBrief = {
    id: 'camp-tech-launch',
    title: 'Flagship Smartphone Launch',
    category: 'Technology',
    requiredPlatforms: ['YOUTUBE'],
    targetGeographies: ['India'],
    budgetMinor: 4000000, // ₹40,000
    campaignObjective: 'AWARENESS',
    minFollowers: 50000,
  };

  const creatorPool: CreatorRankingProfile[] = [
    // 1. Ideal Candidate
    {
      id: 'creator-1',
      displayName: 'Pooja Tech',
      username: 'poojatech',
      country: 'India',
      categories: ['Technology'],
      totalAudience: 180000,
      averageEngagementRate: 5.2,
      startingPriceMinor: 3000000,
      isVerifiedBadge: true,
      hasOAuthConnection: true,
      completedCampaignsCount: 12,
      averageRating: 4.9,
      intelligenceScore: calculateCreatorIntelligenceScore({
        audienceQuality: 92,
        authenticity: 94,
        engagementQuality: 90,
        reputation: 95,
        brandSafety: 98,
        dataConfidence: 100,
      }),
    },
    // 2. Mismatched Category Candidate
    {
      id: 'creator-2',
      displayName: 'Chef Sanjay',
      username: 'chefsanjay',
      country: 'India',
      categories: ['Food & Culinary'],
      totalAudience: 220000,
      averageEngagementRate: 4.5,
      startingPriceMinor: 2000000,
      isVerifiedBadge: true,
      hasOAuthConnection: true,
      completedCampaignsCount: 8,
      averageRating: 4.8,
      intelligenceScore: calculateCreatorIntelligenceScore({
        audienceQuality: 88,
        authenticity: 90,
        engagementQuality: 85,
        reputation: 92,
        brandSafety: 95,
        dataConfidence: 90,
      }),
    },
    // 3. Bot Candidate (Must be excluded)
    {
      id: 'creator-3',
      displayName: 'Scam Account',
      username: 'scamtech',
      country: 'India',
      categories: ['Technology'],
      totalAudience: 500000,
      averageEngagementRate: 0.01,
      startingPriceMinor: 1000000,
      isVerifiedBadge: false,
      hasOAuthConnection: false,
      completedCampaignsCount: 0,
      averageRating: 1.0,
      intelligenceScore: calculateCreatorIntelligenceScore({
        audienceQuality: 20,
        authenticity: 20,
        engagementQuality: 10,
        reputation: 30,
        brandSafety: 40,
        dataConfidence: 20,
      }),
    },
  ];

  const recommendations = recommendCreatorsForCampaign(campaign, creatorPool);

  assert.strictEqual(recommendations.length, 2, 'Bot creator must be excluded');
  assert.strictEqual(recommendations[0].creator.id, 'creator-1', 'Ideal candidate must be ranked #1');
  assert.ok(recommendations[0].recommendationIndex > recommendations[1].recommendationIndex);
  assert.ok(recommendations[0].isStrongMatch, 'Candidate #1 should be marked as Strong Match');
});

console.log('\n================================================================');
console.log(`🎉 ALL ${passedCount}/${totalCount} INTELLIGENCE ALGORITHM QA TESTS PASSED!`);
console.log('================================================================\n');
