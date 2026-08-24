'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { EmptyState } from '@/components/ui/EmptyState';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import {
  CheckIcon,
  SearchIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
} from '@/components/ui/Icons';

export default function CreatorDiscoveryPage() {
  const [creators, setCreators] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCreator, setSelectedCreator] = useState<any | null>(null);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('q', searchQuery);
      if (selectedCategory) params.append('category', selectedCategory);
      if (selectedCountry) params.append('country', selectedCountry);

      const res = await fetch(`/api/creators/search?${params.toString()}`);
      const data = await res.json();
      setCreators(data.creators || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCreators();
  }, [selectedCategory, selectedCountry]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchCreators();
  };

  return (
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px clamp(16px, 3vw, 36px)' }}>
      {/* Header */}
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 800, letterSpacing: '-0.02em', color: '#0F172A', marginBottom: '6px' }}>
          Creator Discovery Engine
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Search, evaluate, and collaborate with authenticated creators scored by proprietary audience authenticity metrics.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        border: '1px solid #E2E8F0',
        backgroundColor: '#FFFFFF',
        padding: '16px 20px',
        marginBottom: '32px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)',
      }}>
        <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 300px', display: 'flex', alignItems: 'center', position: 'relative' }}>
          <input
            type="text"
            className="tia-input"
            placeholder="Search by name, handle, or niche keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '14px', height: '42px', fontSize: '13.5px' }}
          />
        </form>

        <select
          className="tia-input"
          style={{ width: 'auto', height: '42px', fontSize: '13px' }}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Tech">Tech</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Finance">Finance</option>
          <option value="Fitness">Fitness</option>
          <option value="Gaming">Gaming</option>
          <option value="Fashion">Fashion</option>
        </select>

        <select
          className="tia-input"
          style={{ width: 'auto', height: '42px', fontSize: '13px' }}
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="India">India</option>
          <option value="United States">United States</option>
          <option value="United Kingdom">United Kingdom</option>
          <option value="Singapore">Singapore</option>
          <option value="United Arab Emirates">United Arab Emirates</option>
        </select>

        <button
          type="button"
          onClick={fetchCreators}
          className="tia-btn-primary"
          style={{
            padding: '10px 22px',
            height: '42px',
            backgroundColor: '#0052FF',
            borderColor: '#0052FF',
            fontWeight: 700,
            fontSize: '13.5px',
          }}
        >
          Filter
        </button>
      </div>

      {/* Results Section */}
      {loading ? (
        <div style={{ padding: '64px', textAlign: 'center', color: '#64748B', fontSize: '14px' }}>
          Scanning verified creator intelligence profiles...
        </div>
      ) : creators.length === 0 ? (
        <EmptyState
          title="No creators found matching your criteria"
          description="Try broadening your search keywords, location filters, or category parameters."
        />
      ) : (
        /* Modern 3-Column Creator Card Grid */
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '24px',
        }}>
          {creators.map((creator) => {
            const isAvailable = creator.availabilityStatus === 'AVAILABLE';
            const initials = (creator.displayName || creator.username || 'C')
              .split(' ')
              .map((n: string) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2);

            return (
              <div
                key={creator.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  position: 'relative',
                  transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)',
                }}
                className="creator-card-item"
              >
                <div>
                  {/* Card Header: Avatar, Name, Handle & Availability */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      {/* Avatar with gradient initials */}
                      <div style={{
                        width: '48px',
                        height: '48px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        border: '1px solid #BFDBFE',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: 800,
                        fontSize: '16px',
                        letterSpacing: '0.02em',
                      }}>
                        {initials}
                      </div>

                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                            {creator.displayName}
                          </h3>
                          <BlueCheckBadge size={16} title="TIA Verified Creator" />
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                          @{creator.username} • {creator.country || 'Global'}
                        </div>
                      </div>
                    </div>

                    {/* Availability Pill */}
                    <span style={{
                      fontSize: '10.5px',
                      fontWeight: 700,
                      padding: '3px 8px',
                      backgroundColor: isAvailable ? '#ECFDF5' : '#FEF3C7',
                      color: isAvailable ? '#059669' : '#D97706',
                      border: `1px solid ${isAvailable ? '#A7F3D0' : '#FDE68A'}`,
                    }}>
                      {isAvailable ? 'AVAILABLE' : 'BUSY'}
                    </span>
                  </div>

                  {/* Categories & Platforms */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '16px' }}>
                    <span style={{
                      fontSize: '11px',
                      fontWeight: 700,
                      backgroundColor: '#EFF6FF',
                      color: '#0052FF',
                      padding: '2px 8px',
                      border: '1px solid #DBEAFE',
                    }}>
                      {creator.categories?.[0] || 'General'}
                    </span>

                    {creator.socialAccounts && creator.socialAccounts.length > 0 ? (
                      creator.socialAccounts.map((s: any, idx: number) => (
                        <span
                          key={idx}
                          style={{
                            fontSize: '11px',
                            color: '#475569',
                            backgroundColor: '#F8FAFC',
                            padding: '2px 8px',
                            border: '1px solid #E2E8F0',
                          }}
                        >
                          {s.platform}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>Verified Creator</span>
                    )}
                  </div>

                  {/* Metrics Dashboard Strip */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: '8px',
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    padding: '12px',
                    marginBottom: '16px',
                    textAlign: 'center',
                  }}>
                    <div>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        TIA Score
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0052FF' }}>
                        {creator.intelligenceScore}
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>/100</span>
                      </div>
                    </div>

                    <div style={{ borderLeft: '1px solid #E2E8F0', borderRight: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        Reputation
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A' }}>
                        {creator.reputationScore}
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8' }}>/100</span>
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 700, textTransform: 'uppercase', marginBottom: '4px' }}>
                        Starting Rate
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: '#0F172A' }}>
                        ₹{(creator.startingPrice / 100).toLocaleString('en-IN')}
                      </div>
                    </div>
                  </div>

                  {/* Bio Preview */}
                  <p style={{
                    fontSize: '12.5px',
                    color: '#64748B',
                    lineHeight: 1.5,
                    marginBottom: '20px',
                    minHeight: '38px',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {creator.bio || 'Verified content creator on TIA marketplace with high engagement rate.'}
                  </p>
                </div>

                {/* Actions Footer */}
                <div style={{ display: 'flex', gap: '8px', paddingTop: '16px', borderTop: '1px solid #F1F5F9' }}>
                  <button
                    type="button"
                    onClick={() => setSelectedCreator(creator)}
                    className="tia-btn-secondary"
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      justifyContent: 'center',
                    }}
                  >
                    Inspect Profile
                  </button>

                  <Link
                    href={`/brand/campaigns/new?creatorId=${creator.id}`}
                    className="tia-btn-primary"
                    style={{
                      flex: 1,
                      padding: '9px 12px',
                      fontSize: '12px',
                      fontWeight: 700,
                      backgroundColor: '#0052FF',
                      borderColor: '#0052FF',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '4px',
                    }}
                  >
                    <span>Invite</span>
                    <ArrowRightIcon size={12} color="#FFFFFF" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Creator Detail Modal */}
      {selectedCreator && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px',
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            width: '100%',
            maxWidth: '640px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid #E2E8F0',
            padding: '32px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    {selectedCreator.displayName}
                  </h2>
                  <BlueCheckBadge size={20} title="TIA Verified Creator" />
                </div>
                <div style={{ fontSize: '13px', color: '#64748B' }}>
                  @{selectedCreator.username} • {selectedCreator.country || 'Global'}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCreator(null)}
                style={{
                  fontSize: '18px',
                  fontWeight: 700,
                  padding: '4px 10px',
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#F8FAFC',
                  cursor: 'pointer',
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <ScoreDisplay score={selectedCreator.intelligenceScore} size="lg" />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                Biography & Creator Positioning
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#334155' }}>
                {selectedCreator.bio || 'Professional content creator on TIA marketplace.'}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#64748B', marginBottom: '8px' }}>
                Commercial Pricing & Availability
              </div>
              <div style={{ padding: '14px 16px', backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', fontSize: '13px' }}>
                <div style={{ marginBottom: '6px' }}>
                  • Starting Campaign Rate: <strong style={{ color: '#0F172A' }}>₹{(selectedCreator.startingPrice / 100).toLocaleString('en-IN')}</strong>
                </div>
                <div>
                  • Current Availability:{' '}
                  <strong style={{ color: selectedCreator.availabilityStatus === 'AVAILABLE' ? '#059669' : '#D97706' }}>
                    {selectedCreator.availabilityStatus}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid #E2E8F0', paddingTop: '20px' }}>
              <button type="button" onClick={() => setSelectedCreator(null)} className="tia-btn-secondary" style={{ padding: '10px 20px', fontWeight: 700 }}>
                Close
              </button>
              <Link
                href={`/brand/campaigns/new?creatorId=${selectedCreator.id}`}
                className="tia-btn-primary"
                style={{
                  padding: '10px 22px',
                  backgroundColor: '#0052FF',
                  borderColor: '#0052FF',
                  fontWeight: 700,
                  textDecoration: 'none',
                }}
              >
                Invite to Campaign
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
