// ===================================================
// TIA BRAND DASHBOARD - CAMPAIGNS TAB COMPONENT
// ===================================================

import React from 'react';
import { BrandCampaign, BrandTabType } from './types';
import { CheckIcon, SearchIcon } from '@/components/dashboard/icons';

interface CampaignsTabProps {
  campaigns: BrandCampaign[];
  campaignSearchQuery: string;
  setCampaignSearchQuery: (q: string) => void;
  campaignStatusFilter: string;
  setCampaignStatusFilter: (s: string) => void;
  handleTabChange: (tab: BrandTabType) => void;
}

export const CampaignsTab: React.FC<CampaignsTabProps> = ({
  campaigns,
  campaignSearchQuery,
  setCampaignSearchQuery,
  campaignStatusFilter,
  setCampaignStatusFilter,
  handleTabChange,
}) => {
  const filteredCampaigns = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(campaignSearchQuery.toLowerCase()) ||
      c.category.toLowerCase().includes(campaignSearchQuery.toLowerCase());
    const matchesStatus = campaignStatusFilter === 'ALL' || c.status === campaignStatusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 4-Card Executive KPI Grid */}
      <div className="brand-kpi-grid">
        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Active Campaigns
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
            {campaigns.filter((c) => c.status !== 'COMPLETED').length}
          </div>
          <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
            <CheckIcon size={12} color="#059669" />
            <span>3 Active in Pipeline</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Total Creator Proposals
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
            44
          </div>
          <div style={{ fontSize: '11.5px', color: '#0052FF', fontWeight: 700, marginTop: '4px' }}>
            +12 Fresh Applications Today
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Protected Budget Spend
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0052FF', marginTop: '4px' }}>
            ₹7,80,000
          </div>
          <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
            100% TIA Payment Protection
          </div>
        </div>

        <div style={{ backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Verified Human Reach
          </div>
          <div style={{ fontSize: '28px', fontWeight: 900, color: '#0F172A', marginTop: '4px' }}>
            1.42M
          </div>
          <div style={{ fontSize: '11.5px', color: '#059669', fontWeight: 700, marginTop: '4px' }}>
            98.2% BotShield Certified
          </div>
        </div>
      </div>

      {/* Campaign Filters & Search Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', minWidth: '280px', flex: 1 }}>
          <div style={{ position: 'absolute', left: '12px', top: '11px' }}>
            <SearchIcon size={15} color="#94A3B8" />
          </div>
          <input
            type="text"
            placeholder="Search campaigns by title, category, or objective..."
            value={campaignSearchQuery}
            onChange={(e) => setCampaignSearchQuery(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px 9px 36px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '13px',
              outline: 'none',
              backgroundColor: '#FFFFFF',
            }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: '#FFFFFF', padding: '4px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          {['ALL', 'PUBLISHED', 'IN_PROGRESS', 'CONTENT_REVIEW'].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setCampaignStatusFilter(status)}
              style={{
                padding: '5px 12px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '6px',
                border: 'none',
                backgroundColor: campaignStatusFilter === status ? '#0052FF' : 'transparent',
                color: campaignStatusFilter === status ? '#FFFFFF' : '#64748B',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
              }}
            >
              {status === 'ALL' ? 'All Campaigns' : status.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Campaigns Grid */}
      <div className="brand-campaigns-grid">
        {filteredCampaigns.map((camp) => (
          <div
            key={camp.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '11px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '4px' }}>
                  {camp.category}
                </span>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 800,
                    color: camp.status === 'COMPLETED' ? '#059669' : '#0052FF',
                    backgroundColor: camp.status === 'COMPLETED' ? '#ECFDF5' : '#EFF6FF',
                    padding: '2px 8px',
                    borderRadius: '4px',
                  }}
                >
                  {camp.status.replace('_', ' ')}
                </span>
              </div>

              <h3 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 8px 0', lineHeight: 1.35 }}>
                {camp.title}
              </h3>
              <p style={{ fontSize: '12.5px', color: '#64748B', margin: '0 0 16px 0' }}>
                {camp.deliverables}
              </p>

              <div style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11.5px', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
                  <span>Stage {camp.stage}/4: {camp.stageLabel}</span>
                  <span>{Math.round((camp.stage / 4) * 100)}%</span>
                </div>
                <div style={{ width: '100%', height: '6px', backgroundColor: '#F1F5F9', borderRadius: '999px', overflow: 'hidden' }}>
                  <div style={{ width: `${(camp.stage / 4) * 100}%`, height: '100%', backgroundColor: '#0052FF', borderRadius: '999px' }} />
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '14px' }}>
                <div>
                  <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700 }}>Total Budget</div>
                  <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>₹{camp.budget.toLocaleString('en-IN')}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '10.5px', color: '#64748B', fontWeight: 700 }}>Proposals</div>
                  <div style={{ fontSize: '15px', fontWeight: 800, color: '#0052FF' }}>{camp.applicationsCount} Applicants</div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => handleTabChange('applications')}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Review Bids ({camp.applicationsCount})
                </button>
                <button
                  type="button"
                  onClick={() => handleTabChange('workspace')}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#F1F5F9',
                    color: '#334155',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Workspace
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
