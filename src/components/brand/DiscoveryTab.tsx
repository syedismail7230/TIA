// ===================================================
// TIA BRAND DASHBOARD - CREATOR DISCOVERY TAB COMPONENT
// ===================================================

import React from 'react';
import { SearchIcon } from '@/components/dashboard/icons';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';

interface DiscoveryTabProps {
  discoverySearchQuery: string;
  setDiscoverySearchQuery: (q: string) => void;
  discoveryCategory: string;
  setDiscoveryCategory: (c: string) => void;
  filteredCreators: any[];
  setSelectedCreatorProfile: (creator: any) => void;
  setShowCreateCampaignModal: (show: boolean) => void;
}

export const DiscoveryTab: React.FC<DiscoveryTabProps> = ({
  discoverySearchQuery,
  setDiscoverySearchQuery,
  discoveryCategory,
  setDiscoveryCategory,
  filteredCreators,
  setSelectedCreatorProfile,
  setShowCreateCampaignModal,
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
      {/* Discovery Header & Filters */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
        <div style={{ position: 'relative', minWidth: '320px', flex: 1 }}>
          <div style={{ position: 'absolute', left: '12px', top: '11px' }}>
            <SearchIcon size={15} color="#94A3B8" />
          </div>
          <input
            type="text"
            placeholder="Search by creator name, handle, or niche..."
            value={discoverySearchQuery}
            onChange={(e) => setDiscoverySearchQuery(e.target.value)}
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

        {/* Category Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', overflowX: 'auto' }}>
          {['ALL', 'Tech', 'Fitness', 'Lifestyle', 'Gaming'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setDiscoveryCategory(cat)}
              style={{
                padding: '6px 14px',
                fontSize: '12px',
                fontWeight: 700,
                borderRadius: '8px',
                border: discoveryCategory === cat ? '1px solid #0052FF' : '1px solid #E2E8F0',
                backgroundColor: discoveryCategory === cat ? '#EFF6FF' : '#FFFFFF',
                color: discoveryCategory === cat ? '#0052FF' : '#475569',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              {cat === 'ALL' ? 'All Niches' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Creators Grid */}
      <div className="brand-creators-grid">
        {filteredCreators.map((creator) => (
          <div
            key={creator.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '22px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              {/* Avatar & Header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
                <div
                  style={{
                    width: '52px',
                    height: '52px',
                    borderRadius: '50%',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: 900,
                    flexShrink: 0,
                  }}
                >
                  {creator.avatarText}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <h4 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                      {creator.name}
                    </h4>
                    <BlueCheckBadge size={14} title="TIA Verified" />
                  </div>
                  <div style={{ fontSize: '12px', color: '#0052FF', fontWeight: 700 }}>
                    {creator.handle}
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {creator.category} • {creator.location}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '12.5px', color: '#475569', lineHeight: 1.45, margin: '0 0 16px 0' }}>
                {creator.bio}
              </p>

              {/* Stats Grid Box */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', padding: '10px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #F1F5F9', marginBottom: '16px', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Audience</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{creator.totalReach}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Engagement</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#059669' }}>{creator.engagementRate}</div>
                </div>
                <div>
                  <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700 }}>Credibility</div>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#0052FF' }}>{creator.intelligenceScore}/100</div>
                </div>
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#64748B', marginBottom: '12px' }}>
                <span>Starting Package:</span>
                <span style={{ fontWeight: 800, color: '#0F172A', fontSize: '14px' }}>₹{creator.startingRate.toLocaleString('en-IN')}</span>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCreatorProfile(creator)}
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
                  Inspect Profile
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateCampaignModal(true)}
                  style={{
                    padding: '8px 14px',
                    backgroundColor: '#EFF6FF',
                    color: '#0052FF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Invite
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
