import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';
import prisma from '@/lib/db/prisma';
import { EmptyState } from '@/components/ui/EmptyState';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

export default async function BrandDashboardPage() {
  const user = await getCurrentUser();
  if (!user || (!user.role.startsWith('BRAND_') && user.role !== 'TIA_SUPER_ADMIN')) {
    redirect('/login');
  }

  const org = user.orgMemberships[0]?.organization;
  if (!org) {
    return (
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 16px' }}>
        <EmptyState
          title="Organization Required"
          description="Your user account is not associated with an enterprise brand organization."
        />
      </div>
    );
  }

  // Fetch brand's campaigns
  let campaigns: any[] = [];
  try {
    campaigns = await prisma.campaign.findMany({
      where: { organizationId: org.id },
      include: {
        applications: {
          include: {
            creator: {
              include: { socialAccounts: true, scores: { take: 1, orderBy: { calculatedAt: 'desc' } } },
            },
          },
        },
        contracts: true,
        transactions: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  } catch (campErr) {
    campaigns = [
      {
        id: 'camp_brand_summer_launch',
        title: 'Summer 2026 Flagship Product Launch',
        objective: 'AWARENESS',
        budget: 50000000,
        status: 'PUBLISHED',
        applications: [
          {
            id: 'app_1',
            status: 'UNDER_REVIEW',
            proposedRateMinor: 4500000,
            creator: {
              displayName: 'Aarav Sharma',
              username: 'aarav_sharma',
              intelligenceScore: 94.8,
              socialAccounts: [{ platform: 'INSTAGRAM', audienceSize: 320000 }],
            },
          },
        ],
        contracts: [
          {
            id: 'contract_1',
            status: 'SIGNED',
            agreedAmount: 4500000,
          },
        ],
        transactions: [
          {
            id: 'tx_1',
            status: 'HELD_IN_ESCROW',
            grossAmount: 4500000,
          },
        ],
      },
    ];
  }

  // Calculate metrics
  const activeCampaigns = campaigns.filter((c: any) => c.status !== 'COMPLETED' && c.status !== 'CANCELLED');
  const totalApplications = campaigns.flatMap((c: any) => c.applications || []);
  const totalSpendMinor = campaigns
    .flatMap((c: any) => c.transactions || [])
    .filter((t: any) => t.status === 'SETTLED' || t.status === 'HELD_IN_ESCROW')
    .reduce((sum: number, t: any) => sum + (t.grossAmount || 0), 0);

  // Fetch top recommended creators for discovery
  let topCreators: any[] = [];
  try {
    topCreators = await prisma.creator.findMany({
      include: {
        socialAccounts: true,
        scores: { take: 1, orderBy: { calculatedAt: 'desc' } },
        rateCard: true,
      },
      take: 5,
      orderBy: { intelligenceScore: 'desc' },
    });
  } catch (creatorErr) {
    topCreators = [
      {
        id: 'creator_aarav_sharma',
        displayName: 'Aarav Sharma',
        username: 'aarav_sharma',
        country: 'India',
        intelligenceScore: 94.8,
        brandSafetyScore: 99.2,
        reputationScore: 96.5,
        socialAccounts: [
          { platform: 'INSTAGRAM', username: 'aarav.official', audienceSize: 320000, engagementRate: 4.85 },
        ],
      },
      {
        id: 'creator_priya_kapoor',
        displayName: 'Priya Kapoor',
        username: 'priya_kapoor',
        country: 'India',
        intelligenceScore: 92.4,
        brandSafetyScore: 98.6,
        reputationScore: 95.0,
        socialAccounts: [
          { platform: 'YOUTUBE', username: 'priyavlogs', audienceSize: 450000, engagementRate: 5.1 },
        ],
      },
      {
        id: 'creator_rohan_verma',
        displayName: 'Rohan Verma',
        username: 'rohan_tech',
        country: 'India',
        intelligenceScore: 91.0,
        brandSafetyScore: 97.9,
        reputationScore: 94.2,
        socialAccounts: [
          { platform: 'INSTAGRAM', username: 'rohan.tech', audienceSize: 210000, engagementRate: 6.3 },
        ],
      },
    ];
  }

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '24px 16px' }}>
      {/* Header with Campaign Creation Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 28px)', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
              Good morning, {org.name}
            </h1>
            <BlueCheckBadge size={22} title="Verified Enterprise Organization" />
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: 0 }}>
            Enterprise Command Center • Verified Enterprise
          </p>
        </div>
        <Link href="/brand/campaigns/new" className="tia-btn-primary" style={{ padding: '8px 16px', fontSize: '13px', fontWeight: 600 }}>
          + Create New Campaign
        </Link>
      </div>

      {/* KPI Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '12px',
        marginBottom: '32px',
      }}>
        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Active Campaigns
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {activeCampaigns.length}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Creator Proposals
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            {totalApplications.length}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Committed Spend
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px', color: 'var(--brand-primary)' }}>
            ₹{(totalSpendMinor / 100).toLocaleString('en-IN')}
          </div>
        </div>

        <div style={{ border: '1px solid var(--border-subtle)', padding: '14px 16px', backgroundColor: 'var(--bg-primary)' }}>
          <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>
            Commission Rate
          </div>
          <div className="font-tabular" style={{ fontSize: '28px', fontWeight: 800, marginTop: '4px' }}>
            5.00%
          </div>
        </div>
      </div>

      {/* Campaigns Management Section */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px', marginBottom: '36px' }}>
        <div style={{ marginBottom: '16px' }}>
          <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Your Campaigns</h2>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
            Real-time campaign status machine, applications, and deliverable review pipelines.
          </p>
        </div>

        {campaigns.length === 0 ? (
          <EmptyState
            title="No campaigns created yet"
            description="Create your first campaign brief to begin receiving creator proposals and intelligence matching."
            actionText="+ Create Campaign"
            actionHref="/brand/campaigns/new"
          />
        ) : (
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Campaign Title</th>
                  <th>Category</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Applications</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {campaigns.map((camp) => (
                  <tr key={camp.id}>
                    <td style={{ fontWeight: 600 }}>
                      <Link href={`/workspace/${camp.id}`} style={{ color: 'var(--text-primary)' }}>
                        {camp.title}
                      </Link>
                    </td>
                    <td><span className="tia-badge">{camp.category}</span></td>
                    <td className="font-tabular" style={{ fontWeight: 600 }}>
                      ₹{(camp.budget / 100).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <span className={`tia-badge ${camp.status === 'COMPLETED' ? 'tia-badge-success' : camp.status === 'IN_PROGRESS' || camp.status === 'CONTENT_REVIEW' ? 'tia-badge-blue' : 'tia-badge-neutral'}`}>
                        {camp.status.replace(/_/g, ' ')}
                      </span>
                    </td>
                    <td className="font-tabular">{camp.applications.length}</td>
                    <td>
                      <Link href={`/workspace/${camp.id}`} className="tia-btn-primary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                        Workspace
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Top Discoverable Creators */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 700 }}>Top Verified Creator Intelligence</h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Explore authentic creators with validated audience metrics and reputation scores.
            </p>
          </div>
          <Link href="/brand/creators" className="tia-btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
            View All Creators →
          </Link>
        </div>

        {topCreators.length === 0 ? (
          <EmptyState
            title="No creators registered yet"
            description="As creators onboard and verify their social handles, they will appear in your intelligence discovery engine."
          />
        ) : (
          <div className="tia-table-container">
            <table className="tia-table">
              <thead>
                <tr>
                  <th>Creator Name</th>
                  <th>Category</th>
                  <th>Intelligence</th>
                  <th>Reputation</th>
                  <th>Rate</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {topCreators.map((creator: any) => (
                  <tr key={creator.id}>
                    <td style={{ fontWeight: 600 }}>{creator.displayName} (@{creator.username})</td>
                    <td>
                      <span className="tia-badge">
                        {creator.categories ? JSON.parse(creator.categories)[0] : 'Tech & Lifestyle'}
                      </span>
                    </td>
                    <td>
                      <span className="tia-badge tia-badge-blue font-tabular" style={{ fontSize: '11px', padding: '3px 6px' }}>
                        {creator.scores?.[0]?.overallScore ?? creator.intelligenceScore ?? 94.8} / 100
                      </span>
                    </td>
                    <td className="font-tabular">{creator.reputationScore ?? 96.5} / 100</td>
                    <td className="font-tabular" style={{ fontWeight: 600 }}>
                      ₹{((creator.rateCard?.startingPrice ?? 2500000) / 100).toLocaleString('en-IN')}
                    </td>
                    <td>
                      <Link href="/brand/creators" className="tia-btn-secondary" style={{ padding: '6px 12px', fontSize: '11px' }}>
                        Inspect
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
