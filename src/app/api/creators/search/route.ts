import { NextResponse } from 'next/server';
import prisma from '@/lib/db/prisma';
import { calculateCampaignMatchScore } from '@/lib/intelligence/scoring';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const platform = searchParams.get('platform');
    const country = searchParams.get('country');
    const query = searchParams.get('q');
    const minScore = searchParams.get('minScore') ? parseInt(searchParams.get('minScore')!) : 0;
    const campaignId = searchParams.get('campaignId');

    const whereClause: any = {};

    if (country) {
      whereClause.country = country;
    }

    if (minScore > 0) {
      whereClause.intelligenceScore = { gte: minScore };
    }

    if (query) {
      whereClause.OR = [
        { displayName: { contains: query } },
        { username: { contains: query } },
        { bio: { contains: query } },
      ];
    }

    // Optional campaign context to calculate live TIA Match Scores
    let targetCampaign: any = null;
    if (campaignId) {
      targetCampaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
      });
    }

    const creators = await prisma.creator.findMany({
      where: whereClause,
      include: {
        socialAccounts: true,
        rateCard: true,
        availability: true,
        scores: {
          take: 1,
          orderBy: { calculatedAt: 'desc' },
        },
        riskSignals: {
          where: { status: 'CONFIRMED' },
        },
      },
      take: 50,
      orderBy: { intelligenceScore: 'desc' },
    });

    // Compute live Match Scores and format results
    const results = creators.map((creator) => {
      const creatorCats = creator.categories ? JSON.parse(creator.categories) : ['Tech', 'Lifestyle'];
      const creatorPlats = creator.socialAccounts.map((s) => s.platform);
      const startingPrice = creator.rateCard?.startingPrice ?? 2500000;
      const latestScore = creator.scores[0];

      let matchData = null;
      if (targetCampaign) {
        const requiredPlats = targetCampaign.requiredPlatforms ? JSON.parse(targetCampaign.requiredPlatforms) : ['INSTAGRAM'];
        const targetGeos = targetCampaign.targetGeographies ? JSON.parse(targetCampaign.targetGeographies) : [];
        matchData = calculateCampaignMatchScore({
          creatorCategories: creatorCats,
          campaignCategory: targetCampaign.category,
          creatorPlatforms: creatorPlats,
          requiredPlatforms: requiredPlats,
          creatorCountry: creator.country ?? undefined,
          targetGeographies: targetGeos,
          creatorStartingPriceMinor: startingPrice,
          campaignBudgetMinor: targetCampaign.budget,
          creatorReputation: creator.reputationScore,
          creatorBrandSafety: creator.brandSafetyScore,
          creatorEngagementRate: creator.socialAccounts[0]?.engagementRate ?? 4.5,
          campaignObjective: targetCampaign.objective,
        });
      }

      return {
        id: creator.id,
        displayName: creator.displayName,
        username: creator.username,
        bio: creator.bio,
        country: creator.country,
        city: creator.city,
        categories: creatorCats,
        verificationStatus: creator.verificationStatus,
        intelligenceScore: latestScore?.overallScore ?? creator.intelligenceScore,
        reputationScore: creator.reputationScore,
        brandSafetyScore: creator.brandSafetyScore,
        availabilityStatus: creator.availabilityStatus,
        startingPrice,
        currency: creator.rateCard?.currency ?? 'INR',
        socialAccounts: creator.socialAccounts.map((s) => ({
          platform: s.platform,
          username: s.username,
          audienceSize: s.audienceSize,
          engagementRate: s.engagementRate,
          averageViews: s.averageViews,
        })),
        matchScore: matchData?.overallMatch ?? null,
        matchExplanation: matchData?.explanation ?? null,
      };
    });

    return NextResponse.json({ creators: results, total: results.length });
  } catch (error: any) {
    console.error('Search Creators Error:', error);
    return NextResponse.json({ error: 'Failed to search creators' }, { status: 500 });
  }
}
