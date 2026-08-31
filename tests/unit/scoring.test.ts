import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateCreatorIntelligenceScore,
  calculateCampaignMatchScore,
} from '../../src/lib/intelligence/scoring';

describe('TIA Intelligence & Match Scoring Engine', () => {
  it('calculates the composite Creator Intelligence Score™ with specified weights', () => {
    const scoreBreakdown = calculateCreatorIntelligenceScore({
      audienceQuality: 95,
      authenticity: 94,
      engagementQuality: 89,
      reputation: 96,
      brandSafety: 97,
      dataConfidence: 90,
    });

    // 95*0.25 + 94*0.2 + 89*0.2 + 96*0.15 + 97*0.1 + 90*0.1 = 23.75 + 18.8 + 17.8 + 14.4 + 9.7 + 9.0 = 93.45 -> 93
    assert.equal(scoreBreakdown.overallScore, 93);
    assert.equal(scoreBreakdown.dimensions.length, 6);
    assert.equal(scoreBreakdown.dimensions[0].status, 'OPTIMAL');
  });

  it('calculates campaign match score and generates explainable rationale', () => {
    const match = calculateCampaignMatchScore({
      creatorCategories: ['Technology', 'AI'],
      campaignCategory: 'Technology',
      creatorPlatforms: ['INSTAGRAM', 'YOUTUBE'],
      requiredPlatforms: ['INSTAGRAM'],
      creatorCountry: 'India',
      targetGeographies: ['India'],
      creatorStartingPriceMinor: 2500000,
      campaignBudgetMinor: 3000000,
      creatorReputation: 95,
      creatorBrandSafety: 98,
      creatorEngagementRate: 4.8,
      campaignObjective: 'AWARENESS',
    });

    assert.ok(match.overallMatch >= 80);
    assert.equal(match.categoryFit, 100);
    assert.equal(match.geographyFit, 98);
    assert.ok(match.explanation.includes('Category relevance rated at 100%'));
  });
});
