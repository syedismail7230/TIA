import React from 'react';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import { CreatorApplicant } from './types';

interface ApplicationsTabProps {
  applicants: CreatorApplicant[];
  onAccept: (id: string) => void;
  onDecline: (id: string) => void;
}

export function ApplicationsTab({ applicants, onAccept, onDecline }: ApplicationsTabProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
            Inbound Creator Bids & Proposals
          </h2>
          <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
            Review creator pitches, proposed deliverable rates, and fund agreements securely into TIA Payment Protection.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {applicants.map((app) => (
          <div
            key={app.id}
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '16px',
              border: '1px solid #E2E8F0',
              padding: '22px 24px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ flex: 1, minWidth: '280px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px' }}>
                  {app.avatarText}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A' }}>{app.creatorName}</span>
                    <span style={{ fontSize: '13px', color: '#0052FF', fontWeight: 700 }}>{app.creatorHandle}</span>
                    <BlueCheckBadge size={14} title="Verified" />
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B' }}>
                    Campaign: <strong>{app.campaignTitle}</strong> • {app.appliedAt}
                  </div>
                </div>
              </div>

              <p style={{ fontSize: '13px', color: '#475569', lineHeight: 1.5, margin: '10px 0 14px 0', backgroundColor: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #F1F5F9' }}>
                &ldquo;{app.pitch}&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '12px', color: '#64748B' }}>
                <span>Reach: <strong style={{ color: '#0F172A' }}>{app.reach}</strong></span>
                <span>•</span>
                <span>Engagement: <strong style={{ color: '#059669' }}>{app.engagement}</strong></span>
                <span>•</span>
                <span>TIA Score: <strong style={{ color: '#0052FF' }}>{app.intelligenceScore}/100</strong></span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '180px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 700 }}>Proposed Rate</div>
                <div style={{ fontSize: '22px', fontWeight: 900, color: '#0052FF' }}>
                  ₹{app.proposedRate.toLocaleString('en-IN')}
                </div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>
                  Delivery in {app.proposedDays} business days
                </div>
              </div>

              {app.status === 'ACCEPTED' ? (
                <span style={{ fontSize: '12px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '6px 14px', borderRadius: '8px' }}>
                  ✓ Deal Accepted & Funded
                </span>
              ) : (
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => onDecline(app.id)}
                    style={{
                      padding: '8px 14px',
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    Decline
                  </button>
                  <button
                    type="button"
                    onClick={() => onAccept(app.id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      boxShadow: '0 2px 6px rgba(0,82,255,0.25)',
                    }}
                  >
                    Accept & Fund Deal →
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
