import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlueCheckBadge } from '@/components/ui/blue-check-badge';
import { TabType } from './types';
import {
  CountryFlag,
  SlidersIcon,
  InstagramIcon,
  YouTubeIcon,
  TikTokIcon,
  XIcon,
  PinterestIcon,
  PercentBadgeIcon,
  SparklesIcon,
  InfoCircleIcon,
} from './CreatorIcons';

const renderThemeSocialIcon = (platform: string) => {
  switch (platform) {
    case 'INSTAGRAM':
      return (
        <span key={platform} title="Instagram" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </span>
      );
    case 'YOUTUBE':
      return (
        <span key={platform} title="YouTube" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
            <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
          </svg>
        </span>
      );
    case 'X':
      return (
        <span key={platform} title="X (Twitter)" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </span>
      );
    case 'PINTEREST':
      return (
        <span key={platform} title="Pinterest" style={{ display: 'inline-flex', alignItems: 'center', color: '#0F172A', transition: 'color 0.15s' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0a12 12 0 0 0-4.37 23.18c-.07-.98-.13-2.48.03-3.55.14-.97.94-3.98.94-3.98s-.24-.48-.24-1.2c0-1.12.65-1.96 1.46-1.96.69 0 1.02.52 1.02 1.14 0 .7-.44 1.74-.67 2.7-.19.81.4 1.47 1.2 1.47 1.44 0 2.54-1.52 2.54-3.71 0-1.94-1.39-3.3-3.38-3.3-2.3 0-3.66 1.73-3.66 3.51 0 .7.27 1.44.6 1.84a.3.3 0 0 1 .07.29c-.08.32-.25 1.02-.28 1.16-.05.18-.15.22-.35.13-1.33-.62-2.16-2.56-2.16-4.12 0-3.36 2.44-6.44 7.04-6.44 3.7 0 6.57 2.63 6.57 6.15 0 3.67-2.31 6.63-5.52 6.63-1.08 0-2.09-.56-2.44-1.22l-.66 2.53c-.24.93-.89 2.09-1.33 2.79A12 12 0 1 0 12 0z"/>
          </svg>
        </span>
      );
    default:
      return null;
  }
};

interface MarketplaceTabProps {
  selectedCampaign: any | null;
  setSelectedCampaign: (c: any | null) => void;
  campaigns: any[];
  filteredCampaigns: any[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedPlatform: string;
  setSelectedPlatform: (p: string) => void;
  selectedBudgetTier: string;
  setSelectedBudgetTier: (b: string) => void;
  selectedSuccessFilter: string;
  setSelectedSuccessFilter: (s: string) => void;
  selectedCommercialType: string;
  setSelectedCommercialType: (c: string) => void;
  selectedCountry: string;
  setSelectedCountry: (c: string) => void;
  sortBy: string;
  setSortBy: (s: any) => void;
  showMatchBanner: boolean;
  setShowMatchBanner: (b: boolean) => void;
  mobileFilterOpen: boolean;
  setMobileFilterOpen: (b: boolean) => void;
  advancedFilterExpanded: boolean;
  setAdvancedFilterExpanded: (b: boolean | ((prev: boolean) => boolean)) => void;
  countryDropdownOpen: boolean;
  setCountryDropdownOpen: (b: boolean | ((prev: boolean) => boolean)) => void;
  countrySearchQuery: string;
  setCountrySearchQuery: (q: string) => void;
  handleApply: (campaign: any) => void;
  applyCredits: number;
  setShowCreditsStoreView: (b: boolean) => void;
  activeTab: TabType;
  setActiveTab: (t: TabType) => void;
  filterCategories: any[];
  filterPlatforms: any[];
  filterBudgetTiers: any[];
  filterMatchTiers: any[];
  filterCountries: { code: string; label: string }[];
  activeAdvancedCount: number;
  activeFiltersCount: number;
  hasActiveFilters: boolean;
  resetFilters: () => void;
  dynamicGreeting: { title: string; subtitle: string };
  router: any;
  socialAccounts?: any[];
  handleTabChange?: (tab: TabType) => void;
  setShowApplyModal?: (b: boolean) => void;
  displayName?: string;
}

export function MarketplaceTab({
  selectedCampaign,
  setSelectedCampaign,
  campaigns,
  filteredCampaigns,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPlatform,
  setSelectedPlatform,
  selectedBudgetTier,
  setSelectedBudgetTier,
  selectedSuccessFilter,
  setSelectedSuccessFilter,
  selectedCommercialType,
  setSelectedCommercialType,
  selectedCountry,
  setSelectedCountry,
  sortBy,
  setSortBy,
  showMatchBanner,
  setShowMatchBanner,
  mobileFilterOpen,
  setMobileFilterOpen,
  advancedFilterExpanded,
  setAdvancedFilterExpanded,
  countryDropdownOpen,
  setCountryDropdownOpen,
  countrySearchQuery,
  setCountrySearchQuery,
  handleApply,
  applyCredits,
  setShowCreditsStoreView,
  activeTab,
  setActiveTab,
  filterCategories,
  filterPlatforms,
  filterBudgetTiers,
  filterMatchTiers,
  filterCountries,
  activeAdvancedCount,
  activeFiltersCount,
  hasActiveFilters,
  resetFilters,
  dynamicGreeting,
  router,
  socialAccounts = [],
  handleTabChange = () => {},
  setShowApplyModal = () => {},
  displayName = 'Creator',
}: MarketplaceTabProps) {
  const renderProfileRanksAndApplyWidget = () => {
    if (!selectedCampaign) return null;
    return (
      <>
        {/* Applicant Competition & Profile Standing Benchmark Graph */}
        <div className="cd-card">
          {/* Personalized User Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#0052FF', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '14px', flexShrink: 0 }}>
              {displayName ? displayName.charAt(0).toUpperCase() : 'C'}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  How Your Profile Ranks
                </h3>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669', display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
                  <span>⭐</span> Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}%
                </span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                Comparing <strong>@{displayName}</strong> against {selectedCampaign.creatorsApplied} applicants
              </div>
            </div>
          </div>

          {/* Explicit Two-Side Legend (Flat / No Card) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', fontSize: '10.5px', fontWeight: 700, flexWrap: 'wrap', gap: '4px', padding: '0 2px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#64748B' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#94A3B8' }}></div>
              <span>Other Applicants Avg</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#0052FF' }}>
              <div style={{ width: '7px', height: '7px', borderRadius: '50%', backgroundColor: '#0052FF' }}></div>
              <span>Your Profile (@{displayName})</span>
            </div>
          </div>

          {/* Hero Match Score Summary (Flat / No Card) */}
          <div style={{ marginBottom: '14px', padding: '0 2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Your Profile Match Score
                </div>
                <div style={{ fontSize: '20px', fontWeight: 900, color: '#0052FF', marginTop: '2px', lineHeight: 1 }}>
                  {selectedCampaign.eligibilityRate || 98}%
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669' }}>
                  High Probability
                </span>
                <div style={{ fontSize: '10px', color: '#64748B', marginTop: '2px', fontWeight: 600 }}>
                  Top {Math.max(2, 100 - (selectedCampaign.eligibilityRate || 95))}% tier
                </div>
              </div>
            </div>

            {/* Tiered Range Progress Bar */}
            <div style={{ position: 'relative', marginTop: '10px', marginBottom: '4px' }}>
              <div style={{ height: '7px', width: '100%', backgroundColor: '#E2E8F0', borderRadius: '5px', overflow: 'hidden', display: 'flex' }}>
                <div style={{ width: '40%', height: '100%', backgroundColor: '#CBD5E1' }} title="Average Pool"></div>
                <div style={{ width: '35%', height: '100%', backgroundColor: '#93C5FD' }} title="Competitive Tier"></div>
                <div style={{ width: '25%', height: '100%', backgroundColor: '#0052FF' }} title="Your Tier (Top Match)"></div>
              </div>

              {/* Your Position Indicator Needle */}
              <div style={{ position: 'absolute', left: `${Math.min(96, selectedCampaign.eligibilityRate || 95)}%`, top: '-4px', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: '15px', height: '15px', borderRadius: '50%', backgroundColor: '#0052FF', border: '2.5px solid #FFFFFF', boxShadow: '0 2px 6px rgba(0, 82, 255, 0.4)' }}></div>
              </div>

              {/* Tier Labels */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: '#64748B', fontWeight: 700, marginTop: '6px' }}>
                <span>Avg: 45%</span>
                <span>75%</span>
                <span style={{ color: '#0052FF', fontWeight: 900 }}>You: {selectedCampaign.eligibilityRate || 98}%</span>
              </div>
            </div>
          </div>

          {/* 3 Circular Pie / Donut Charts in Grid (Flat / No Cards) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', marginBottom: '12px', padding: '4px 0' }}>
            {/* Chart 1: Engagement Rate */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.42)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.87)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>8.7%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Engagement
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 4.2%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                +107% vs Avg
              </div>
            </div>

            {/* Chart 2: Niche Relevance */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.68)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#059669" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.96)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>96%</span>
                  <span style={{ fontSize: '7.5px', color: '#059669', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Niche Match
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 68%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 4px', borderRadius: '3px' }}>
                Top Category
              </div>
            </div>

            {/* Chart 3: Audience Geography */}
            <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ position: 'relative', width: '58px', height: '58px', marginBottom: '6px' }}>
                <svg viewBox="0 0 68 68" style={{ width: '100%', height: '100%', transform: 'rotate(-90deg)' }}>
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#F1F5F9" strokeWidth="6" />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#CBD5E1" strokeWidth="6" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.51)}`} />
                  <circle cx="34" cy="34" r="26" fill="none" stroke="#0052FF" strokeWidth="6" strokeLinecap="round" strokeDasharray="163.36" strokeDashoffset={`${163.36 * (1 - 0.84)}`} />
                </svg>
                <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, color: '#0F172A', lineHeight: 1 }}>84%</span>
                  <span style={{ fontSize: '7.5px', color: '#0052FF', fontWeight: 800 }}>YOU</span>
                </div>
              </div>
              <div style={{ fontSize: '10.5px', fontWeight: 700, color: '#0F172A', marginBottom: '2px' }}>
                Audience Fit
              </div>
              <div style={{ fontSize: '9.5px', color: '#64748B' }}>
                Avg: 51%
              </div>
              <div style={{ marginTop: '4px', fontSize: '9px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '1px 4px', borderRadius: '3px' }}>
                Direct Fit
              </div>
            </div>
          </div>

          {/* Advantage Footnote */}
          <div style={{ marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#059669', fontWeight: 700 }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>Based on your connected stats, your bid has high client visibility</span>
          </div>
        </div>

        {/* Action Card (Apply to Project) */}
        <div className="cd-card">
          <button
            type="button"
            onClick={() => setShowApplyModal(true)}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '13.5px',
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0, 82, 255, 0.25)',
              marginBottom: '10px',
            }}
          >
            Apply to this Project →
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '11px', color: '#059669', fontWeight: 700, justifyContent: 'center' }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <polyline points="9 12 11 14 15 10" />
            </svg>
            <span>100% Payment Protected</span>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
{/* TAB 1: MARKETPLACE                                                   */}
        {/* ==================================================================== */}
        {selectedCampaign ? (
          /* ================================================================ */
          /* FULL-PAGE ZOOM-IN PROJECT DETAIL VIEW (FREELANCER.COM STYLE)     */
          /* ================================================================ */
          <div style={{ animation: 'fadeIn 0.2s ease-in-out' }}>
            {/* Top Navigation & Breadcrumbs Bar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px', flexWrap: 'wrap', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '7px 14px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    color: '#0F172A',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#F8FAFC')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#FFFFFF')}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                  <span>Back to Marketplace</span>
                </button>

                <div className="tia-desktop-only" style={{ fontSize: '11.5px', fontWeight: 600, color: '#94A3B8', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>FREELANCER</span>
                  <span>›</span>
                  <span>CAMPAIGNS</span>
                  <span>›</span>
                  <span style={{ color: '#64748B' }}>{selectedCampaign.categories?.[0] || 'LIFESTYLE'}</span>
                  <span>›</span>
                  <span style={{ color: '#0F172A', fontWeight: 700 }}>{selectedCampaign.title}</span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                  Project ID: <strong style={{ color: '#0F172A' }}>#TIA-{selectedCampaign.id?.replace('camp-', '406740') || '40674076'}</strong>
                </span>
              </div>
            </div>

            {/* Main 2-Column Freelancer Layout */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '18px', alignItems: 'start' }}>
              {/* LEFT MAIN CONTENT COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. Project Hero Header Card */}
                <div className="cd-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '14px', marginBottom: '14px' }}>
                    <div style={{ flex: '1 1 300px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', flexWrap: 'wrap' }}>
                        <span style={{ backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '11px', fontWeight: 800, padding: '2px 8px', borderRadius: '5px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#059669' }}></span>
                          Open for Applications
                        </span>
                        <span style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                          <span>Posted {selectedCampaign.postedAt} • Ends in 18 days</span>
                        </span>
                      </div>
                      <h1 style={{ fontSize: '20px', fontWeight: 900, color: '#0F172A', margin: '0 0 6px 0', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.title}
                      </h1>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: '#64748B', flexWrap: 'wrap' }}>
                        <span style={{ fontSize: '11px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 6px', borderRadius: '4px' }}>
                          ✓ Verified Client
                        </span>
                        <span>•</span>
                        <span>{selectedCampaign.countryFlag} {selectedCampaign.country}</span>
                        <span>•</span>
                        <span>{selectedCampaign.language}</span>
                      </div>
                    </div>

                    {/* Big Payout & Deliverables Box */}
                    <div className="cd-payout-box">
                      <div style={{ fontSize: '26px', fontWeight: 900, color: '#0052FF', lineHeight: 1, letterSpacing: '-0.02em' }}>
                        {selectedCampaign.payoutAmount}
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600, marginTop: '4px' }}>
                        {selectedCampaign.payType || 'Fixed Pay'} (100% Protected)
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#0F172A', fontWeight: 700, marginTop: '3px' }}>
                        {selectedCampaign.deliverablesSummary}
                      </div>
                    </div>
                  </div>

                  {/* Quick Project Intelligence Bar */}
                  <div className="cd-intel-grid">
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Your Success Rate</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0284C7', marginTop: '2px' }}>{selectedCampaign.eligibilityRate}%</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Active Applicants</div>
                      <div style={{ fontSize: '15px', fontWeight: 900, color: '#0F172A', marginTop: '2px' }}>{selectedCampaign.creatorsApplied} Creators</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Project Timeline</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#0F172A', marginTop: '3px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{selectedCampaign.projectTimeline || 'Sep 5 – Sep 20'}</div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', padding: '8px 10px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                      <div style={{ fontSize: '10px', color: '#64748B', fontWeight: 600 }}>Payment Security</div>
                      <div style={{ fontSize: '12px', fontWeight: 800, color: '#059669', marginTop: '3px' }}>100% Protected</div>
                    </div>
                  </div>
                </div>

                {/* Mobile-Only: Section 2 - How Your Profile Ranks & Apply Action */}
                <div className="tia-mobile-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 2. Detailed Campaign Narrative & Scope of Work */}
                <div className="cd-card">
                  <h2 style={{ fontSize: '16.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Campaign Overview & Creative Brief
                  </h2>
                  <p style={{ fontSize: '13px', color: '#334155', lineHeight: 1.6, margin: '0 0 14px 0' }}>
                    {selectedCampaign.description} We are seeking dynamic, authentic digital creators who have demonstrated high viewer engagement and aesthetic video production in {selectedCampaign.categories?.join(', ')}. The primary objective of this project is to craft captivating, native-feel content that drives high conversion, genuine community discussions, and click-throughs to the campaign tracking link.
                  </p>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Selected Scope of Work
                  </h3>
                  <ul style={{ paddingLeft: '18px', margin: '0 0 16px 0', fontSize: '12.5px', color: '#334155', lineHeight: 1.65 }}>
                    {selectedCampaign.scopeOfWork && selectedCampaign.scopeOfWork.length > 0 ? (
                      selectedCampaign.scopeOfWork.map((scope: any, idx: number) => (
                        <li key={idx}><strong>{scope.title}:</strong> {scope.detail}</li>
                      ))
                    ) : (
                      <>
                        <li><strong>High-Resolution Deliverable:</strong> Produce high-quality content optimized for {selectedCampaign.socials?.join(', ') || 'social platforms'}.</li>
                        <li><strong>Integrated Storytelling:</strong> Seamlessly integrate project themes with authentic voiceover and hook in the first 3 seconds.</li>
                        <li><strong>Tracking & Attribution:</strong> Include dedicated UTM campaign link and pinned comment during the active campaign window.</li>
                        <li><strong>Compliance & Creative Quality:</strong> Deliver raw exports without third-party watermarks or copyrighted audio tracks.</li>
                      </>
                    )}
                  </ul>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Content Directions & Aesthetic Guidelines
                  </h3>
                  <div className="cd-directions-grid">
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                          <line x1="9" y1="9" x2="9.01" y2="9" />
                          <line x1="15" y1="9" x2="15.01" y2="9" />
                        </svg>
                        <span>Tone of Voice & Mood</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.tone || 'Authentic, vibrant, conversational, and energetic. Avoid overly rehearsed corporate sales scripts.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                        </svg>
                        <span>Video & Lighting Setup</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.videoSetup || 'Natural daylight or soft studio lighting. Sharp macro focus when showcasing details.'}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                          <line x1="7" y1="7" x2="7.01" y2="7" />
                        </svg>
                        <span>Hashtags & Mentions</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.hashtags || `Include #CreatorCollab and #${selectedCampaign.categories?.[0]?.replace(/\s+/g, '') || 'Lifestyle'}2026 in caption.`}
                      </div>
                    </div>
                    <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '10px 12px' }}>
                      <div style={{ fontWeight: 700, fontSize: '12px', color: '#0F172A', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                          <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                          <line x1="12" y1="19" x2="12" y2="23" />
                          <line x1="8" y1="23" x2="16" y2="23" />
                        </svg>
                        <span>Audio & Voiceover</span>
                      </div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.4 }}>
                        {selectedCampaign.contentDirections?.audio || 'Crystal-clear vocal recording with background ambient music mixed at -18dB. Subtitles mandatory.'}
                      </div>
                    </div>
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Client Expectations & Milestone Schedule
                  </h3>
                  <div style={{ backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', padding: '12px 14px', marginBottom: '16px', fontSize: '12px', color: '#1E3A8A', lineHeight: 1.55 }}>
                    <div style={{ fontWeight: 700, marginBottom: '4px' }}>Milestone Review Process:</div>
                    {selectedCampaign.milestones && selectedCampaign.milestones.length > 0 ? (
                      selectedCampaign.milestones.map((m: string, idx: number) => (
                        <div key={idx}>{m}</div>
                      ))
                    ) : (
                      <>
                        <div>1. <strong>Concept & Rough Cut:</strong> Due within 5 days of confirmation.</div>
                        <div>2. <strong>Client Review Window:</strong> Approval or revisions within 48 hours.</div>
                        <div>3. <strong>Final Publication:</strong> Post live on feed during peak hours ({selectedCampaign.projectTimeline}).</div>
                        <div>4. <strong>Analytics Verification:</strong> Submit reach insights after 7 days.</div>
                      </>
                    )}
                  </div>

                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '16px 0 8px 0' }}>
                    Campaign Terms & Payment Protection
                  </h3>
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 14px', fontSize: '12px', color: '#334155', lineHeight: 1.55 }}>
                    <ul style={{ paddingLeft: '16px', margin: 0 }}>
                      <li><strong>100% Payment Protection:</strong> Full {selectedCampaign.payoutAmount} secured through TIA verified settlement.</li>
                      <li><strong>Usage Rights:</strong> 90 days organic digital promotional distribution rights.</li>
                      <li><strong>Exclusivity:</strong> 30-day category exclusivity against direct competitors.</li>
                      <li><strong>Automated Disbursement:</strong> Funds released to your wallet upon automated URL verification.</li>
                    </ul>
                  </div>

                  {/* Skills / Niches Pill Chips */}
                  <div style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: '#64748B' }}>Skills / Niches:</span>
                    {selectedCampaign.categories?.map((cat: string) => (
                      <span key={cat} style={{ fontSize: '11px', fontWeight: 600, color: '#0052FF', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', padding: '2px 8px', borderRadius: '14px' }}>
                        {cat}
                      </span>
                    ))}
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>Instagram Reels</span>
                    <span style={{ fontSize: '11px', fontWeight: 600, color: '#475569', backgroundColor: '#F1F5F9', padding: '2px 8px', borderRadius: '14px' }}>4K Video Editing</span>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* 1. About the Client Card */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    About the Client
                  </h3>
                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 800, fontSize: '13.5px', color: '#0F172A' }}>
                        Verified Enterprise Client
                      </span>
                      <span style={{ fontSize: '10.5px', color: '#059669', fontWeight: 800, backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', padding: '1px 5px', borderRadius: '4px' }}>
                        ✓ Verified
                      </span>
                    </div>
                    <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                      {selectedCampaign.countryFlag} {selectedCampaign.country}
                    </div>
                  </div>

                  <div style={{ fontSize: '11.5px', color: '#D97706', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: '#F59E0B' }}>★</span>
                    <span style={{ color: '#0F172A' }}>5.0</span>
                    <span style={{ color: '#64748B', fontWeight: 500 }}>(42 reviews)</span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '11.5px', color: '#475569', borderTop: '1px solid #F1F5F9', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Payment method verified</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#059669', fontWeight: 600 }}>
                      <span>✓</span> <span>Milestone deposit authorized</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>Member since Mar 26, 2021</span>
                    </div>
                  </div>
                </div>

                {/* 2. Client Verification Checklist (Clean Green Outline SVG Vector Icons - Vertical Layout) */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                    Client Verification
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {/* Payment */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                        <line x1="1" y1="10" x2="23" y2="10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Payment Verified</span>
                    </div>

                    {/* Email */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Email Address Verified</span>
                    </div>

                    {/* Identity */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Identity Verified</span>
                    </div>

                    {/* Phone */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Phone Number Verified</span>
                    </div>

                    {/* Deposit */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <polyline points="9 12 11 14 15 10" />
                      </svg>
                      <span style={{ fontSize: '12px', fontWeight: 600, color: '#334155' }}>Deposit Verified</span>
                    </div>
                  </div>
                </div>

                {/* Desktop-Only: How Your Profile Ranks & Apply Action */}
                <div className="tia-desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {renderProfileRanksAndApplyWidget()}
                </div>

                {/* 5. Other Campaigns from this Client */}
                <div className="cd-card">
                  <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 10px 0' }}>
                    Other jobs from this client
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(selectedCampaign.otherJobs || [
                      { title: 'Summer Lifestyle Reel Launch', payout: '$850 Fixed Pay' },
                      { title: 'YouTube Product Integration', payout: '$1,400 Fixed Pay' },
                      { title: '24-Hour Story Takeover & Review', payout: '$450 Fixed Pay' }
                    ]).map((job: any, idx: number, arr: any[]) => (
                      <div key={idx} style={{ borderBottom: idx < arr.length - 1 ? '1px solid #F1F5F9' : 'none', paddingBottom: idx < arr.length - 1 ? '6px' : '0' }}>
                        <div style={{ fontSize: '12px', fontWeight: 700, color: '#0F172A' }}>{job.title}</div>
                        <div style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700, marginTop: '2px' }}>{job.payout}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            {/* High-End Match Booster Banner (Only shown if no social account is connected, and dismissible with ✕) */}
            {showMatchBanner && !socialAccounts.some((a) => a.connected) && (
              <div
                style={{
                  background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 60%, #EFF6FF 100%)',
                  border: '1px solid #E2E8F0',
                  borderRadius: '16px',
                  padding: '20px 48px 20px 24px',
                  marginBottom: '20px',
                  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.02)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '18px',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 380px' }}>
                  {/* Overlapping Social Badges */}
                  <div style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', zIndex: 2 }}>
                      <InstagramIcon size={18} />
                    </div>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF', boxShadow: '0 2px 6px rgba(0,0,0,0.06)', marginLeft: '-10px', zIndex: 1 }}>
                      <YouTubeIcon size={18} />
                    </div>
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '3px' }}>
                      <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 8px', borderRadius: '6px', letterSpacing: '0.03em' }}>
                        AUDIENCE INTELLIGENCE
                      </span>
                    </div>
                    <h2 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: '0 0 3px 0', lineHeight: 1.35 }}>
                      We&apos;re actively searching for your perfect campaign!
                    </h2>
                    <p style={{ fontSize: '12.5px', color: '#64748B', margin: 0, lineHeight: 1.45 }}>
                      The more socials you link, the better the chances of finding the right fit for your audience and style.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleTabChange('social-media')}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '11px 22px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: '0 2px 10px rgba(0, 82, 255, 0.25)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <span>Connect Socials</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>

                {/* Dismiss Button ✕ */}
                <button
                  type="button"
                  onClick={() => setShowMatchBanner(false)}
                  title="Hide banner"
                  aria-label="Hide banner"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    border: 'none',
                    backgroundColor: 'transparent',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F1F5F9';
                    e.currentTarget.style.color = '#0F172A';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = '#94A3B8';
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            )}

            {/* Embedded CSS for seamless desktop/mobile filter responsiveness */}
            <style>{`
              @media (max-width: 768px) {
                .tia-filter-desktop-group {
                  display: none !important;
                }
                .tia-filter-desktop-chips {
                  display: none !important;
                }
                .tia-filter-btn-mobile {
                  display: inline-flex !important;
                }
              }
              @media (min-width: 769px) {
                .tia-filter-desktop-group {
                  display: flex !important;
                }
                .tia-filter-desktop-chips {
                  display: flex !important;
                }
                .tia-filter-btn-mobile {
                  display: none !important;
                }
                .tia-filter-mobile-panel {
                  display: none !important;
                }
              }
            `}</style>

            {/* Search, Filter & Sort Toolbar (Clean, Responsive) */}
            <div
              style={{
                marginBottom: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
            >
              {/* Row 1: Search Input + Mobile Filter Button + Desktop Select Dropdowns */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  width: '100%',
                }}
              >
                {/* Search Input */}
                <div
                  style={{
                    position: 'relative',
                    flex: '1',
                    minWidth: '0',
                  }}
                >
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      pointerEvents: 'none',
                    }}
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search campaigns..."
                    style={{
                      width: '100%',
                      padding: '9px 30px 9px 34px',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: '#0F172A',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.15s ease',
                    }}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#94A3B8',
                        cursor: 'pointer',
                        fontSize: '12px',
                        padding: '2px',
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Mobile Filter Toggle Button (Compact Icon Button) */}
                <button
                  type="button"
                  aria-label="Filter campaigns"
                  onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
                  className="tia-filter-btn-mobile"
                  style={{
                    position: 'relative',
                    width: '38px',
                    height: '38px',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569',
                    backgroundColor: activeFiltersCount > 0 || mobileFilterOpen ? '#EFF6FF' : '#FFFFFF',
                    border: activeFiltersCount > 0 || mobileFilterOpen ? '1px solid #0052FF' : '1px solid #CBD5E1',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.15s ease',
                    flexShrink: 0,
                  }}
                >
                  <SlidersIcon size={16} color={activeFiltersCount > 0 || mobileFilterOpen ? '#0052FF' : '#475569'} />
                  {activeFiltersCount > 0 && (
                    <span
                      style={{
                        position: 'absolute',
                        top: '-4px',
                        right: '-4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        minWidth: '16px',
                        height: '16px',
                        padding: '0 3px',
                        fontSize: '9.5px',
                        fontWeight: 700,
                        color: '#FFFFFF',
                        backgroundColor: '#0052FF',
                        borderRadius: '10px',
                        border: '2px solid #FFFFFF',
                      }}
                    >
                      {activeFiltersCount}
                    </span>
                  )}
                </button>

                {/* Desktop-Only Filter Group */}
                <div
                  className="tia-filter-desktop-group"
                  style={{
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                  }}
                >
                  {/* Custom Country Filter Dropdown with Real Flag SVGs */}
                  <div id="country-filter-dropdown-container" style={{ position: 'relative' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setCountryDropdownOpen(!countryDropdownOpen);
                        setCountrySearchQuery('');
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: selectedCountry === 'ALL' ? '4px' : '8px',
                        padding: '8px 12px',
                        fontSize: '12.5px',
                        fontWeight: 600,
                        color: selectedCountry !== 'ALL' ? '#0052FF' : '#334155',
                        backgroundColor: selectedCountry !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                        border: countryDropdownOpen || selectedCountry !== 'ALL' ? '1px solid #0052FF' : '1px solid #CBD5E1',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        outline: 'none',
                        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                        transition: 'all 0.15s ease',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {selectedCountry !== 'ALL' && <CountryFlag code={selectedCountry} size={17} />}
                      <span>
                        {filterCountries.find((c) => c.code === selectedCountry)?.label || 'All Countries'}
                      </span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={selectedCountry !== 'ALL' ? '#0052FF' : '#94A3B8'}
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        style={{
                          transform: countryDropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.15s ease',
                          marginLeft: '2px',
                        }}
                      >
                        <polyline points="6 9 12 15 18 9" />
                      </svg>
                    </button>

                    {/* Dropdown Menu */}
                    {countryDropdownOpen && (
                      <div
                        style={{
                          position: 'absolute',
                          top: 'calc(100% + 4px)',
                          left: 0,
                          width: '230px',
                          backgroundColor: '#FFFFFF',
                          borderRadius: '10px',
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.12), 0 8px 10px -6px rgba(0, 0, 0, 0.08)',
                          border: '1px solid #E2E8F0',
                          padding: '6px',
                          zIndex: 100,
                        }}
                      >
                        {/* Search box inside dropdown */}
                        <div style={{ padding: '2px 4px 6px 4px', borderBottom: '1px solid #F1F5F9', marginBottom: '4px' }}>
                          <input
                            type="text"
                            value={countrySearchQuery}
                            onChange={(e) => setCountrySearchQuery(e.target.value)}
                            placeholder="Search country..."
                            autoFocus
                            style={{
                              width: '100%',
                              padding: '6px 8px',
                              fontSize: '12px',
                              color: '#0F172A',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              borderRadius: '6px',
                              outline: 'none',
                            }}
                          />
                        </div>

                        <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                          {filterCountries
                            .filter((c) =>
                              c.label.toLowerCase().includes(countrySearchQuery.toLowerCase()) ||
                              c.code.toLowerCase().includes(countrySearchQuery.toLowerCase())
                            )
                            .map((c) => {
                              const isSelected = selectedCountry === c.code;
                              return (
                                <button
                                  key={c.code}
                                  type="button"
                                  onClick={() => {
                                    setSelectedCountry(c.code);
                                    setCountryDropdownOpen(false);
                                    setCountrySearchQuery('');
                                  }}
                                  style={{
                                    width: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    gap: '8px',
                                    padding: '7px 8px',
                                    fontSize: '12px',
                                    fontWeight: isSelected ? 700 : 500,
                                    color: isSelected ? '#0052FF' : '#334155',
                                    backgroundColor: isSelected ? '#EFF6FF' : 'transparent',
                                    border: 'none',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    textAlign: 'left',
                                    transition: 'background-color 0.1s ease',
                                  }}
                                  onMouseEnter={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                                  }}
                                  onMouseLeave={(e) => {
                                    if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                                  }}
                                >
                                  <div style={{ display: 'flex', alignItems: 'center', gap: c.code === 'ALL' ? '0px' : '8px' }}>
                                    {c.code !== 'ALL' && <CountryFlag code={c.code} size={17} />}
                                    <span>{c.label}</span>
                                  </div>
                                  {isSelected && (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                  )}
                                </button>
                              );
                            })}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Commercial Type Filter */}
                  <select
                    value={selectedCommercialType}
                    onChange={(e) => setSelectedCommercialType(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: selectedCommercialType !== 'ALL' ? '#0052FF' : '#334155',
                      backgroundColor: selectedCommercialType !== 'ALL' ? '#EFF6FF' : '#FFFFFF',
                      border: selectedCommercialType !== 'ALL' ? '1px solid #0052FF' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <option value="ALL">All Deal Types</option>
                    <option value="FLAT_FEE">Guaranteed Fixed Pay</option>
                    <option value="COMMISSION">Commission % + Bonus</option>
                  </select>

                  {/* Sort By Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    style={{
                      padding: '9px 12px',
                      fontSize: '12.5px',
                      fontWeight: 600,
                      color: '#334155',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                    }}
                  >
                    <option value="success_rate">Sort: Highest Match</option>
                    <option value="payout_high">Sort: Highest Payout (₹ / $)</option>
                    <option value="applicants">Sort: Most Popular</option>
                    <option value="newest">Sort: Recently Posted</option>
                  </select>

                  {/* Advanced Filters Drawer Toggle Button */}
                  <button
                    type="button"
                    onClick={() => setAdvancedFilterExpanded(!advancedFilterExpanded)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '8px 13px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      color: advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#475569',
                      backgroundColor: advancedFilterExpanded || activeAdvancedCount > 0 ? '#EFF6FF' : '#FFFFFF',
                      border: advancedFilterExpanded || activeAdvancedCount > 0 ? '1px solid #0052FF' : '1px solid #CBD5E1',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      outline: 'none',
                      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.03)',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    <SlidersIcon size={14} color={advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#475569'} />
                    <span>Filters</span>
                    {activeAdvancedCount > 0 && (
                      <span
                        style={{
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          fontSize: '10px',
                          fontWeight: 800,
                          padding: '1px 6px',
                          borderRadius: '10px',
                          marginLeft: '2px',
                        }}
                      >
                        {activeAdvancedCount}
                      </span>
                    )}
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={advancedFilterExpanded || activeAdvancedCount > 0 ? '#0052FF' : '#94A3B8'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transform: advancedFilterExpanded ? 'rotate(180deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease',
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Row 2: Category Quick Chips Carousel (Desktop & Mobile) */}
              <div
                className="tia-filter-desktop-chips"
                style={{
                  alignItems: 'center',
                  gap: '6px',
                  overflowX: 'auto',
                  paddingBottom: '4px',
                  scrollbarWidth: 'none',
                }}
              >
                {filterCategories.map((cat) => {
                  const isSelected = selectedCategory === cat.id;
                  const matchingCount =
                    cat.id === 'ALL'
                      ? campaigns.length
                      : campaigns.filter((c) =>
                          c.categories.some((k: any) => k.toLowerCase().includes(cat.id.toLowerCase()))
                        ).length;

                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setSelectedCategory(cat.id)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        padding: '6px 13px',
                        fontSize: '12px',
                        fontWeight: isSelected ? 700 : 500,
                        color: isSelected ? '#0052FF' : '#475569',
                        backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                        border: isSelected ? '1px solid #0052FF' : '1px solid #E2E8F0',
                        borderRadius: '20px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        boxShadow: isSelected ? '0 2px 6px rgba(0, 82, 255, 0.15)' : '0 1px 2px rgba(0, 0, 0, 0.02)',
                        transition: 'all 0.15s ease',
                      }}
                    >
                      <span>{cat.label}</span>
                      <span
                        style={{
                          fontSize: '10px',
                          fontWeight: 700,
                          padding: '1px 5px',
                          borderRadius: '8px',
                          backgroundColor: isSelected ? '#DBEAFE' : '#F1F5F9',
                          color: isSelected ? '#0052FF' : '#94A3B8',
                        }}
                      >
                        {matchingCount}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Row 3: Advanced Filter Expandable Panel */}
              {advancedFilterExpanded && (
                <div
                  style={{
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #E2E8F0',
                    borderRadius: '12px',
                    padding: '16px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    marginTop: '2px',
                    animation: 'fadeIn 0.2s ease',
                  }}
                >
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                    {/* Platform Selector */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Social Platform
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterPlatforms.map((p) => {
                          const isSelected = selectedPlatform === p.id;
                          return (
                            <button
                              key={p.id}
                              type="button"
                              onClick={() => setSelectedPlatform(p.id)}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              <span>{p.icon}</span>
                              <span>{p.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Payout Range Selector */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Payout / Budget Tier
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterBudgetTiers.map((b) => {
                          const isSelected = selectedBudgetTier === b.id;
                          return (
                            <button
                              key={b.id}
                              type="button"
                              onClick={() => setSelectedBudgetTier(b.id)}
                              style={{
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              {b.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Opportunity / Match Level */}
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                        Opportunity & Match Level
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                        {filterMatchTiers.map((m) => {
                          const isSelected = selectedSuccessFilter === m.id;
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => setSelectedSuccessFilter(m.id)}
                              style={{
                                padding: '6px 11px',
                                fontSize: '11.5px',
                                fontWeight: isSelected ? 700 : 500,
                                color: isSelected ? '#0052FF' : '#334155',
                                backgroundColor: isSelected ? '#EFF6FF' : '#FFFFFF',
                                border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                transition: 'all 0.12s ease',
                              }}
                            >
                              {m.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Panel Footer */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #E2E8F0', paddingTop: '10px' }}>
                    <span style={{ fontSize: '12px', color: '#64748B', fontWeight: 500 }}>
                      Showing <strong>{filteredCampaigns.length}</strong> of {campaigns.length} campaigns
                    </span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '4px 8px',
                          }}
                        >
                          Clear all filters
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setAdvancedFilterExpanded(false)}
                        style={{
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '6px',
                          padding: '6px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        Apply Filters
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Row 4: Active Filter Chips Bar (When filters are applied) */}
              {hasActiveFilters && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    flexWrap: 'wrap',
                    paddingTop: '2px',
                  }}
                >
                  <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                    Active filters:
                  </span>

                  {searchQuery.trim() && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#F1F5F9',
                        color: '#0F172A',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Search: &ldquo;{searchQuery}&rdquo;
                      <button
                        type="button"
                        onClick={() => setSearchQuery('')}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCategory !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Niche: {filterCategories.find((c) => c.id === selectedCategory)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedCategory('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCountry !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Country: {filterCountries.find((c) => c.code === selectedCountry)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedCountry('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedCommercialType !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Deal: {selectedCommercialType === 'FLAT_FEE' ? 'Guaranteed Fixed' : 'Commission %'}
                      <button
                        type="button"
                        onClick={() => setSelectedCommercialType('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedPlatform !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Platform: {filterPlatforms.find((p) => p.id === selectedPlatform)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedPlatform('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedBudgetTier !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Budget: {filterBudgetTiers.find((b) => b.id === selectedBudgetTier)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedBudgetTier('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  {selectedSuccessFilter !== 'ALL' && (
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        backgroundColor: '#EFF6FF',
                        color: '#0052FF',
                        fontSize: '11.5px',
                        fontWeight: 600,
                        padding: '3px 8px',
                        borderRadius: '6px',
                      }}
                    >
                      Level: {filterMatchTiers.find((m) => m.id === selectedSuccessFilter)?.label}
                      <button
                        type="button"
                        onClick={() => setSelectedSuccessFilter('ALL')}
                        style={{ background: 'none', border: 'none', color: '#0052FF', cursor: 'pointer', padding: 0, fontSize: '12px' }}
                      >
                        ✕
                      </button>
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={resetFilters}
                    style={{
                      padding: '3px 9px',
                      fontSize: '11px',
                      fontWeight: 700,
                      color: '#EF4444',
                      backgroundColor: '#FEF2F2',
                      border: '1px solid #FECACA',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      marginLeft: 'auto',
                    }}
                  >
                    Reset all filters ({activeFiltersCount})
                  </button>
                </div>
              )}

              {/* Mobile Filter Collapsible Panel (Rendered only on Mobile when toggled) */}
              {mobileFilterOpen && (
                <div
                  className="tia-filter-mobile-panel"
                  style={{
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #CBD5E1',
                    borderRadius: '12px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.06)',
                  }}
                >
                  {/* Header */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <SlidersIcon size={14} color="#0052FF" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#0F172A' }}>Advanced Filters</span>
                      {activeFiltersCount > 0 && (
                        <span style={{ fontSize: '10.5px', fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '2px 7px', borderRadius: '10px' }}>
                          {activeFiltersCount} active
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      {hasActiveFilters && (
                        <button
                          type="button"
                          onClick={resetFilters}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#EF4444',
                            fontSize: '11.5px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            padding: '2px',
                          }}
                        >
                          Reset all
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => setMobileFilterOpen(false)}
                        style={{
                          background: '#F1F5F9',
                          border: 'none',
                          borderRadius: '50%',
                          width: '24px',
                          height: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#64748B',
                          fontSize: '12px',
                          cursor: 'pointer',
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>

                  {/* Dropdowns Row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {/* Deal Type */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Deal Type
                      </label>
                      <select
                        value={selectedCommercialType}
                        onChange={(e) => setSelectedCommercialType(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="ALL">All Deals</option>
                        <option value="FLAT_FEE">Fixed Pay</option>
                        <option value="COMMISSION">Commission %</option>
                      </select>
                    </div>

                    {/* Sort By */}
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e: any) => setSortBy(e.target.value)}
                        style={{
                          width: '100%',
                          padding: '8px 10px',
                          fontSize: '12px',
                          fontWeight: 600,
                          color: '#334155',
                          backgroundColor: '#F8FAFC',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          outline: 'none',
                        }}
                      >
                        <option value="success_rate">Highest Match</option>
                        <option value="payout_high">Highest Payout</option>
                        <option value="applicants">Most Popular</option>
                        <option value="newest">Newest</option>
                      </select>
                    </div>
                  </div>

                  {/* Social Platform Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Social Platform
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {filterPlatforms.map((p) => {
                        const isSelected = selectedPlatform === p.id;
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => setSelectedPlatform(p.id)}
                            style={{
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#334155',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                              borderRadius: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            {p.icon} {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Payout Range Filter */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Budget / Payout
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                      {filterBudgetTiers.map((b) => {
                        const isSelected = selectedBudgetTier === b.id;
                        return (
                          <button
                            key={b.id}
                            type="button"
                            onClick={() => setSelectedBudgetTier(b.id)}
                            style={{
                              padding: '5px 9px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#334155',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #0052FF' : '1px solid #CBD5E1',
                              borderRadius: '6px',
                              cursor: 'pointer',
                            }}
                          >
                            {b.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Country Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '4px' }}>
                      Country ({filterCountries.length} Countries)
                    </label>
                    <select
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 10px',
                        fontSize: '12px',
                        fontWeight: 600,
                        color: '#334155',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        outline: 'none',
                      }}
                    >
                      {filterCountries.map((c) => (
                        <option key={c.code} value={c.code}>
                          {c.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Categories / Niches */}
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, color: '#64748B', marginBottom: '6px' }}>
                      Niche / Category
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {filterCategories.map((cat) => {
                        const isSelected = selectedCategory === cat.id;
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                              padding: '5px 11px',
                              fontSize: '11px',
                              fontWeight: isSelected ? 700 : 500,
                              color: isSelected ? '#0052FF' : '#64748B',
                              backgroundColor: isSelected ? '#EFF6FF' : '#F8FAFC',
                              border: isSelected ? '1px solid #BFDBFE' : '1px solid #E2E8F0',
                              borderRadius: '16px',
                              cursor: 'pointer',
                              transition: 'all 0.15s ease',
                            }}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <button
                    type="button"
                    onClick={() => setMobileFilterOpen(false)}
                    style={{
                      width: '100%',
                      padding: '10px',
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12.5px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '4px',
                    }}
                  >
                    View Results ({filteredCampaigns.length})
                  </button>
                </div>
              )}
            </div>

            {/* Dynamic Time-Aware Personalized Greeting Header + Low Credits Buy Button */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '22px', fontWeight: 900, color: '#0F172A', margin: '0 0 4px 0', letterSpacing: '-0.02em' }}>
                  {dynamicGreeting.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#64748B', margin: 0, fontWeight: 500, lineHeight: 1.45 }}>
                  {dynamicGreeting.subtitle}
                </p>
              </div>

              {/* Buy Credit Button in this row: Visible ONLY when application credits are low (<= 1) */}
              {applyCredits <= 1 && (
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '12px',
                    backgroundColor: '#FFFFFF',
                    border: '1px solid #BFDBFE',
                    borderRadius: '12px',
                    padding: '8px 14px',
                    boxShadow: '0 2px 8px rgba(0, 82, 255, 0.05)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <div
                      style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '6px',
                        backgroundColor: '#EFF6FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0052FF',
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                      </svg>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <span style={{ fontSize: '12.5px', fontWeight: 800, color: applyCredits === 0 ? '#DC2626' : '#1E40AF' }}>
                        {applyCredits === 0 ? '0 Credits Left' : '1 Credit Remaining'}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('payments');
                      setShowCreditsStoreView(true);
                      router.replace('/creator?tab=payments');
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    style={{
                      backgroundColor: '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '6px 14px',
                      fontSize: '12px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '5px',
                      boxShadow: '0 2px 6px rgba(0, 82, 255, 0.28)',
                      transition: 'all 0.15s ease',
                      whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#0040D6';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#0052FF';
                      e.currentTarget.style.transform = 'none';
                    }}
                  >
                    <span>+ Buy Credit</span>
                  </button>
                </div>
              )}
            </div>

            {/* Exact Reference-Matched Clean Cards Grid */}
            {filteredCampaigns.length === 0 ? (
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  border: '1px dashed #CBD5E1',
                  borderRadius: '16px',
                  padding: '48px 24px',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '10px' }}>🔍</div>
                <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', margin: '0 0 6px 0' }}>
                  No campaigns match your filters
                </h4>
                <p style={{ fontSize: '13px', color: '#64748B', margin: '0 0 16px 0' }}>
                  Try changing your search terms, selecting a different niche, or clearing your active filters.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  style={{
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 18px',
                    fontSize: '12.5px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
                  gap: '20px',
                }}
              >
                {filteredCampaigns.map((camp, cIndex) => (
                  <div
                    key={camp.id}
                    className="upfluence-card"
                    style={{
                      backgroundColor: '#FFFFFF',
                      border: cIndex === 0 ? '1.5px solid #0052FF' : '1px solid #E2E8F0',
                      borderRadius: '16px',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      boxShadow: cIndex === 0 ? '0 4px 16px rgba(0, 82, 255, 0.10)' : '0 2px 8px rgba(0, 0, 0, 0.03)',
                      cursor: 'default',
                    }}
                  >
                    {/* Top Cover Banner */}
                    <div
                      style={{
                        height: '140px',
                        position: 'relative',
                        backgroundColor: '#CBD5E1',
                        borderTopLeftRadius: '15px',
                        borderTopRightRadius: '15px',
                      }}
                    >
                      {/* Blurred Image Wrapper (Inner overflow hidden to maintain top corner radius) */}
                      <div
                        style={{
                          position: 'absolute',
                          inset: 0,
                          overflow: 'hidden',
                          borderTopLeftRadius: '15px',
                          borderTopRightRadius: '15px',
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: -12,
                            left: -12,
                            right: -12,
                            bottom: -12,
                            backgroundImage: `url(${camp.bannerImage})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            filter: 'blur(16px) saturate(1.2)',
                            transform: 'scale(1.2)',
                          }}
                        />
                      </div>

                      {/* Payment Verified Pill Badge */}
                      <div
                        style={{
                          position: 'absolute',
                          top: '12px',
                          left: '12px',
                          backgroundColor: '#FFFFFF',
                          color: '#059669',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '0.01em',
                          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.08)',
                          zIndex: 2,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '5px',
                        }}
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                          <polyline points="9 12 11 14 15 10" />
                        </svg>
                        <span>{camp.commercialLabel}</span>
                      </div>

                      {/* Best Match Pill Badge on Top Right for the First Card */}
                      {cIndex === 0 && (
                        <div
                          style={{
                            position: 'absolute',
                            top: '12px',
                            right: '12px',
                            backgroundColor: '#0052FF',
                            color: '#FFFFFF',
                            padding: '4px 10px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '0.02em',
                            boxShadow: '0 2px 8px rgba(0, 82, 255, 0.35)',
                            zIndex: 2,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="#FFFFFF" stroke="#FFFFFF" strokeWidth="1">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span>Best Match</span>
                        </div>
                      )}

                      {/* Smooth Rounded Avatar Box with Blurred Brand Logo */}
                      <div
                        style={{
                          position: 'absolute',
                          bottom: '-14px',
                          left: '16px',
                          width: '40px',
                          height: '40px',
                          backgroundColor: '#FFFFFF',
                          border: '2px solid #FFFFFF',
                          borderRadius: '10px',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
                          zIndex: 3,
                          overflow: 'hidden',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '6px',
                        }}
                      >
                        <img
                          src={camp.partnerLogo}
                          alt="Partner Brand Logo"
                          style={{
                            maxWidth: '65%',
                            maxHeight: '65%',
                            objectFit: 'contain',
                            filter: 'blur(2.5px)',
                            display: 'block',
                          }}
                        />
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div style={{ padding: '26px 16px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      {/* Row 1: Confidential Brand + Divider + Category Capsule Pills */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                        <span
                          style={{
                            fontSize: '11.5px',
                            fontWeight: 700,
                            color: '#64748B',
                          }}
                        >
                          {camp.brandName}
                        </span>

                        <span style={{ width: '1px', height: '11px', backgroundColor: '#E2E8F0', margin: '0 2px' }} />

                        {camp.categories.map((cat: string, idx: number) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: '11px',
                              fontWeight: 600,
                              color: '#334155',
                              backgroundColor: '#F8FAFC',
                              border: '1px solid #E2E8F0',
                              padding: '3px 10px',
                              borderRadius: '20px',
                            }}
                          >
                            {cat}
                          </span>
                        ))}
                      </div>

                      {/* Middle Section: Left (Title + Status) & Right (Pricing + Requirements Details) */}
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '12px',
                          marginBottom: '14px',
                        }}
                      >
                        {/* Left: Campaign Name + Eligibility */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          {/* Title + "New" Sparkle Capsule Badge */}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
                            <span
                              style={{
                                fontSize: '13.5px',
                                fontWeight: 700,
                                color: '#0F172A',
                              }}
                            >
                              {camp.title}
                            </span>

                            {/* Posted Time & Date (Clean, Borderless Text) */}
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                fontSize: '11px',
                                fontWeight: 500,
                                color: '#94A3B8',
                              }}
                            >
                              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <polyline points="12 6 12 12 16 14" />
                              </svg>
                              <span>{camp.postedAt || 'Aug 27, 2026 • 2:30 PM'}</span>
                            </span>
                          </div>

                          {/* Status Badge */}
                          <div
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '6px',
                              color: '#059669',
                              fontSize: '12px',
                              fontWeight: 700,
                            }}
                          >
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                              <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <span>You are eligible</span>
                          </div>
                        </div>

                        {/* Right: Pricing & Requirements Details */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: '24px', fontWeight: 800, color: '#0F172A', lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                            {camp.payoutAmount}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '3px' }}>
                            {camp.payType || 'Fixed Pay'}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 500, marginTop: '2px', whiteSpace: 'nowrap' }}>
                            {camp.deliverablesSummary || '7 Posts • 7 Stories • 7 Reels'}
                          </div>
                        </div>
                      </div>

                      {/* Row 4: Clean Metadata List */}
                      <div
                        style={{
                          borderTop: '1px solid #F1F5F9',
                          paddingTop: '12px',
                          marginTop: 'auto',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '8px',
                          fontSize: '12px',
                        }}
                      >
                        {/* Profile Success Rate */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Your profile success rate</span>
                          <span style={{ fontWeight: 700, color: '#0F172A' }}>
                            {camp.eligibilityRate}%
                          </span>
                        </div>

                        {/* Language */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Language</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>{camp.language}</span>
                        </div>

                        {/* Country Flag & Full Name */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Country</span>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                            <img
                              src={`https://flagcdn.com/w40/${camp.countryCode.toLowerCase()}.png`}
                              alt={camp.country}
                              style={{
                                width: '16px',
                                height: '11px',
                                objectFit: 'cover',
                                borderRadius: '2px',
                                display: 'block',
                              }}
                            />
                            <span style={{ fontWeight: 600, color: '#0F172A' }}>
                              {camp.country}
                            </span>
                          </div>
                        </div>

                        {/* Project Timeline */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Project timeline</span>
                          <span style={{ fontWeight: 600, color: '#0F172A' }}>
                            {camp.projectTimeline || 'Sep 1 – Sep 15, 2026'}
                          </span>
                        </div>

                        {/* Socials - No Card Box, Clean Theme Icons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ color: '#94A3B8' }}>Socials</span>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            {camp.socials.map((s: string) => renderThemeSocialIcon(s))}
                          </div>
                        </div>
                      </div>

                      {/* Apply to Campaign Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApply(camp);
                        }}
                        style={{
                          marginTop: '16px',
                          width: '100%',
                          padding: '10px 16px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '10px',
                          fontSize: '13px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          boxShadow: '0 2px 8px rgba(0, 82, 255, 0.18)',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#0045D8';
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 82, 255, 0.28)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#0052FF';
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 82, 255, 0.18)';
                        }}
                      >
                        <span>Apply to Campaign</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
    </>
  );
}
