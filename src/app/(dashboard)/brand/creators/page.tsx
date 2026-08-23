'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ScoreDisplay } from '@/components/ui/ScoreDisplay';
import { EmptyState } from '@/components/ui/EmptyState';

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
    <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 800, letterSpacing: '-0.02em' }}>
          CREATOR DISCOVERY ENGINE
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
          Search, evaluate, and compare creators by authenticated intelligence and reputation metrics.
        </p>
      </div>

      {/* Filter Bar */}
      <div style={{
        border: '1px solid var(--border-subtle)',
        backgroundColor: 'var(--bg-primary)',
        padding: '16px',
        marginBottom: '24px',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
      }}>
        <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 300px' }}>
          <input
            type="text"
            className="tia-input"
            placeholder="Search by name, handle, or bio keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>

        <select
          className="tia-input"
          style={{ width: 'auto' }}
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
          style={{ width: 'auto' }}
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

        <button type="button" onClick={fetchCreators} className="tia-btn-primary" style={{ padding: '8px 16px' }}>
          Filter
        </button>
      </div>

      {/* Results Grid / Table */}
      {loading ? (
        <div style={{ padding: '48px', textAlign: 'center', color: 'var(--text-muted)' }}>
          Scanning verified creator intelligence profiles...
        </div>
      ) : creators.length === 0 ? (
        <EmptyState
          title="No creators found matching your criteria"
          description="Try broadening your search keywords, location filters, or category parameters."
        />
      ) : (
        <div className="tia-table-container">
          <table className="tia-table">
            <thead>
              <tr>
                <th>Creator Identity</th>
                <th>Platforms</th>
                <th>Category</th>
                <th>Location</th>
                <th>TIA Intelligence</th>
                <th>Reputation</th>
                <th>Starting Rate</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {creators.map((creator) => (
                <tr key={creator.id}>
                  <td>
                    <div>
                      <div style={{ fontWeight: 700 }}>{creator.displayName}</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>@{creator.username}</div>
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                      {creator.socialAccounts.length > 0 ? (
                        creator.socialAccounts.map((s: any, idx: number) => (
                          <span key={idx} className="tia-badge tia-badge-neutral" style={{ fontSize: '10px' }}>
                            {s.platform}
                          </span>
                        ))
                      ) : (
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Unlinked</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className="tia-badge">{creator.categories?.[0] || 'General'}</span>
                  </td>
                  <td>{creator.country || 'Global'}</td>
                  <td>
                    <span className="tia-badge tia-badge-blue font-tabular" style={{ fontSize: '12px', padding: '4px 8px' }}>
                      {creator.intelligenceScore} / 100
                    </span>
                  </td>
                  <td className="font-tabular">{creator.reputationScore} / 100</td>
                  <td className="font-tabular" style={{ fontWeight: 600 }}>
                    ₹{(creator.startingPrice / 100).toLocaleString('en-IN')}
                  </td>
                  <td>
                    <span className={`tia-badge ${creator.availabilityStatus === 'AVAILABLE' ? 'tia-badge-success' : 'tia-badge-warning'}`}>
                      {creator.availabilityStatus}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => setSelectedCreator(creator)}
                      className="tia-btn-secondary"
                      style={{ padding: '4px 10px', fontSize: '11px' }}
                    >
                      Inspect Profile
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Creator Detail Modal (PRD Section 84) */}
      {selectedCreator && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '24px',
        }}>
          <div style={{
            backgroundColor: 'var(--bg-primary)',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            border: '1px solid var(--border-subtle)',
            padding: '32px',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
              <div>
                <h2 style={{ fontSize: '24px', fontWeight: 800 }}>{selectedCreator.displayName}</h2>
                <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>@{selectedCreator.username} • {selectedCreator.country}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedCreator(null)}
                style={{ fontSize: '20px', fontWeight: 700, padding: '4px 8px' }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <ScoreDisplay score={selectedCreator.intelligenceScore} size="lg" />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Biography & Creator Positioning
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: 'var(--text-primary)' }}>
                {selectedCreator.bio || 'Professional content creator on TIA marketplace.'}
              </p>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                Commercial Pricing & Availability
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-subtle)', fontSize: '13px' }}>
                <div>• Starting Campaign Rate: <strong>₹{(selectedCreator.startingPrice / 100).toLocaleString('en-IN')}</strong></div>
                <div>• Current Availability: <strong style={{ color: '#059669' }}>{selectedCreator.availabilityStatus}</strong></div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '32px', borderTop: '1px solid var(--border-subtle)', paddingTop: '20px' }}>
              <button type="button" onClick={() => setSelectedCreator(null)} className="tia-btn-secondary">
                Close
              </button>
              <Link href="/brand/campaigns/new" className="tia-btn-primary">
                Invite to Campaign
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
