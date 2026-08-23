import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { EmptyState } from '@/components/ui/EmptyState';
import { calculateCampaignMatchScore } from '@/lib/intelligence/scoring';

export default async function CreatorDashboardPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'CREATOR') {
    redirect('/login');
  }

  const creator = await prisma.creator.findUnique({
    where: { userId: user.id },
    include: {
      scores: { take: 1, orderBy: { calculatedAt: 'desc' } },
      socialAccounts: true,
      applications: {
        include: {
          campaign: {
            include: { organization: true },
          },
        },
      },
      contracts: {
        where: { status: 'SIGNED' },
        include: {
          campaign: true,
          deliverableItems: true,
        },
      },
    },
  });

  if (!creator) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
        <EmptyState
          title="Creator Profile Not Found"
          description="Please complete your creator profile setup to start discovering marketplace campaigns."
        />
      </div>
    );
  }

  // Fetch available campaigns for match recommendations
  const openCampaigns = await prisma.campaign.findMany({
    where: {
      status: { in: ['PUBLISHED', 'ACCEPTING_APPLICATIONS'] },
      visibility: 'PUBLIC',
    },
    include: { organization: true },
    take: 10,
  });

  const creatorCats = creator.categories ? JSON.parse(creator.categories) : ['Tech', 'Lifestyle'];
  const creatorPlats = creator.socialAccounts.map((s) => s.platform);

  // Compute live match scores for all open campaigns
  const recommendedCampaigns = openCampaigns.map((camp) => {
    const requiredPlats = camp.requiredPlatforms ? JSON.parse(camp.requiredPlatforms) : ['INSTAGRAM'];
    const targetGeos = camp.targetGeographies ? JSON.parse(camp.targetGeographies) : [];
    const match = calculateCampaignMatchScore({
      creatorCategories: creatorCats,
      campaignCategory: camp.category,
      creatorPlatforms: creatorPlats,
      requiredPlatforms: requiredPlats,
      creatorCountry: creator.country ?? undefined,
      targetGeographies: targetGeos,
      creatorStartingPriceMinor: 2500000,
      campaignBudgetMinor: camp.budget,
      creatorReputation: creator.reputationScore,
      creatorBrandSafety: creator.brandSafetyScore,
      creatorEngagementRate: creator.socialAccounts[0]?.engagementRate ?? 4.5,
      campaignObjective: camp.objective,
    });
    return { ...camp, matchScore: match.overallMatch, matchExplanation: match.explanation };
  }).sort((a, b) => b.matchScore - a.matchScore);

  const pendingApps = creator.applications.filter((a) => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW');
  const activeContracts = creator.contracts;
  const upcomingDeliverables = creator.contracts.flatMap((c) => c.deliverableItems.filter((d) => d.status !== 'APPROVED'));

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '6px' }}>
          Good morning, {creator.displayName}.
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
          TIA Creator Command Center • Verified Status: <strong style={{ color: 'var(--brand-primary)' }}>{creator.verificationStatus}</strong>
        </p>
      </div>

      {/* KPI & Intelligence Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <ScoreDisplay
          score={creator.scores[0]?.overallScore ?? creator.intelligenceScore}
          label="Creator Intelligence"
          size="md"
        />

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Recommended
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {recommendedCampaigns.length}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Active Contracts
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {activeContracts.length}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Pending Applications
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {pendingApps.length}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Upcoming Deliverables
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {upcomingDeliverables.length}
          </div>
        </div>
      </div>

      {/* Recommended Campaigns Section */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginBottom: '36px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Recommended for You</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Ranked deterministically by audience compatibility, target geography, category, and pricing efficiency.
          </p>
        </div>

        {recommendedCampaigns.length === 0 ? (
          <EmptyState
            title="No campaigns available right now"
            description="When enterprise brands publish campaigns matching your content category and geography, they will appear here."
          />
        ) : (
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Match Score</th>
                  <th>Campaign Title</th>
                  <th>Brand</th>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {recommendedCampaigns.map((camp) => (
                  <tr key={camp.id}>
                    <td>
                      <span className="tia-badge tia-badge-blue font-tabular" style={{ fontSize: '11px', padding: '3px 6px' }}>
                        {camp.matchScore}% MATCH
                      </span>
                    </td>
                    <td style={{ fontWeight: 600 }}>
                      <Link href={`/workspace/${camp.id}`} style={{ color: 'var(--text-primary)' }}>
                        {camp.title}
                      </Link>
                    </td>
                    <td>{camp.organization.name}</td>
                    <td><span className="tia-badge tia-badge-neutral">{camp.category}</span></td>
                    <td className="font-tabular" style={{ fontWeight: 600 }}>
                      ₹{(camp.budget / 100).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <Link href={`/workspace/${camp.id}`} className="tia-btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                        Review & Apply
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Active Workspaces */}
      {activeContracts.length > 0 && (
        <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700, marginBottom: '16px' }}>Active Contract Workspaces</h2>
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Agreed Value</th>
                  <th>Your Net Allocation (95%)</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {activeContracts.map((c) => (
                  <tr key={c.id}>
                    <td style={{ fontWeight: 600 }}>{c.campaign.title}</td>
                    <td className="font-tabular">₹{(c.agreedAmount / 100).toLocaleString('en-IN')}</td>
                    <td className="font-tabular" style={{ color: 'var(--brand-primary)', fontWeight: 700 }}>
                      ₹{(c.creatorAllocationAmount / 100).toLocaleString('en-IN')}
                    </td>
                    <td><span className="tia-badge tia-badge-success">{c.status}</span></td>
                    <td>
                      <Link href={`/workspace/${c.campaignId}`} className="tia-btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                        Open Workspace
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
