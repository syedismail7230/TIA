import React from 'react';
import Link from 'next/link';
import { CreatorSettingsProfile, CreatorSettingsRates, CreatorBankAccount } from './types';

const getSettingsSvgIcon = (id: string | null, size = 18, color = '#0052FF') => {
  switch (id) {
    case 'profile':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
    case 'rates':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23" />
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      );
    case 'payouts':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="21" x2="21" y2="21" />
          <line x1="3" y1="10" x2="21" y2="10" />
          <polyline points="5 6 12 3 19 6" />
          <line x1="4" y1="10" x2="4" y2="21" />
          <line x1="20" y1="10" x2="20" y2="21" />
          <line x1="8" y1="14" x2="8" y2="17" />
          <line x1="12" y1="14" x2="12" y2="17" />
          <line x1="16" y1="14" x2="16" y2="17" />
        </svg>
      );
    case 'notifications':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>
      );
    case 'security':
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    default:
      return null;
  }
};

interface CreatorSettingsTabProps {
  settingsActiveSubTab: 'profile' | 'rates' | 'payouts' | 'notifications' | 'security';
  setSettingsActiveSubTab: (s: 'profile' | 'rates' | 'payouts' | 'notifications' | 'security') => void;
  mobileSettingsSubPage: 'profile' | 'rates' | 'payouts' | 'notifications' | 'security' | null;
  setMobileSettingsSubPage: (s: 'profile' | 'rates' | 'payouts' | 'notifications' | 'security' | null) => void;
  settingsProfile: CreatorSettingsProfile;
  setSettingsProfile: React.Dispatch<React.SetStateAction<CreatorSettingsProfile>>;
  settingsRates: CreatorSettingsRates;
  setSettingsRates: React.Dispatch<React.SetStateAction<CreatorSettingsRates>>;
  settingsNotifications: {
    matchEngineAlerts: boolean;
    milestonePaymentAlerts: boolean;
    directBrandInquiries: boolean;
    weeklyPerformanceDigest: boolean;
    whatsappAlerts: boolean;
  };
  setSettingsNotifications: React.Dispatch<React.SetStateAction<{
    matchEngineAlerts: boolean;
    milestonePaymentAlerts: boolean;
    directBrandInquiries: boolean;
    weeklyPerformanceDigest: boolean;
    whatsappAlerts: boolean;
  }>>;
  settingsSavedSuccess: boolean;
  setSettingsSavedSuccess: (b: boolean) => void;
  bankAccount: CreatorBankAccount | null;
  setShowBankModal: (b: boolean) => void;
  setShowAiStudioModal: (b: boolean) => void;
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  customAvatarUrl: string;
  setLiveToast: (toast: any) => void;
}

export function CreatorSettingsTab({
  settingsActiveSubTab,
  setSettingsActiveSubTab,
  mobileSettingsSubPage,
  setMobileSettingsSubPage,
  settingsProfile,
  setSettingsProfile,
  settingsRates,
  setSettingsRates,
  settingsNotifications,
  setSettingsNotifications,
  settingsSavedSuccess,
  setSettingsSavedSuccess,
  bankAccount,
  setShowBankModal,
  setShowAiStudioModal,
  currentUser,
  setCurrentUser,
  customAvatarUrl,
  setLiveToast,
}: CreatorSettingsTabProps) {
  return (
    <>

          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
            {/* ------------------------------------------------------------------ */}
            {/* 1. MOBILE VIEW (DEDICATED SUB-PAGE DRILLDOWN NAVIGATION)           */}
            {/* ------------------------------------------------------------------ */}
            <div className="settings-mobile-only">
              {mobileSettingsSubPage === null ? (
                /* MOBILE SETTINGS DIRECTORY / MENU HOME */
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {/* Modern Creator Profile Header Card */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      padding: '16px 18px',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '12px',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
                      {/* Circular Avatar with Gradient & Verified Badge */}
                      <div style={{ position: 'relative', flexShrink: 0 }}>
                        <div
                          style={{
                            width: '46px',
                            height: '46px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #0052FF 0%, #2563EB 100%)',
                            color: '#FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '16px',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                            boxShadow: '0 2px 8px rgba(0, 82, 255, 0.2)',
                          }}
                        >
                          SJ
                        </div>
                        <div
                          style={{
                            position: 'absolute',
                            bottom: '-1px',
                            right: '-1px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            backgroundColor: '#0052FF',
                            border: '2px solid #FFFFFF',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#FFFFFF',
                            fontSize: '8px',
                            fontWeight: 900,
                          }}
                        >
                          ✓
                        </div>
                      </div>

                      {/* Name & Handle */}
                      <div style={{ minWidth: 0, overflow: 'hidden' }}>
                        <div style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {settingsProfile.displayName}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {settingsProfile.handle}
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/creator/profile"
                      target="_blank"
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #DBEAFE',
                        borderRadius: '8px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        color: '#0052FF',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        whiteSpace: 'nowrap',
                        flexShrink: 0,
                      }}
                    >
                      Public ↗
                    </Link>
                  </div>

                  {/* Settings Category Navigation List */}
                  <div
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '16px',
                      border: '1px solid #E2E8F0',
                      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                      overflow: 'hidden',
                    }}
                  >
                    {[
                      { id: 'profile', label: 'Profile & Bio', desc: 'Display name, handle, bio, and social links' },
                      { id: 'rates', label: 'Commercial Rates', desc: 'Deliverable pricing, min budget, and fees' },
                      { id: 'payouts', label: 'Payout & Taxes', desc: 'Bank account, IFSC, UPI, and PAN info' },
                      { id: 'notifications', label: 'Notifications', desc: 'Match alerts, briefs, and WhatsApp updates' },
                      { id: 'security', label: 'Security', desc: '2FA authentication and account passwords' },
                    ].map((item, idx) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setMobileSettingsSubPage(item.id as any);
                          setSettingsActiveSubTab(item.id as any);
                        }}
                        style={{
                          width: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          padding: '15px 18px',
                          backgroundColor: '#FFFFFF',
                          border: 'none',
                          borderBottom: idx === 4 ? 'none' : '1px solid #F1F5F9',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background-color 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <div
                            style={{
                              width: '26px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            {getSettingsSvgIcon(item.id, 22, '#0052FF')}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                              {item.label}
                            </div>
                            <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                              {item.desc}
                            </div>
                          </div>
                        </div>
                        <div style={{ fontSize: '18px', color: '#94A3B8', fontWeight: 700, paddingLeft: '8px' }}>
                          ›
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* DEDICATED MOBILE SUB-PAGE WITH BACK BUTTON */
                <div
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '16px',
                    border: '1px solid #E2E8F0',
                    padding: '18px 18px',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '18px',
                  }}
                >
                  {/* Top Sub-Page Header */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid #F1F5F9',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => setMobileSettingsSubPage(null)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '5px',
                        padding: '6px 12px',
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 700,
                        color: '#334155',
                        cursor: 'pointer',
                        flexShrink: 0,
                      }}
                    >
                      ← Back
                    </button>

                    <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#0F172A', margin: 0, display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      {getSettingsSvgIcon(mobileSettingsSubPage, 18, '#0052FF')}
                      <span>
                        {mobileSettingsSubPage === 'profile' && 'Profile & Bio'}
                        {mobileSettingsSubPage === 'rates' && 'Commercial Rates'}
                        {mobileSettingsSubPage === 'payouts' && 'Payout & Taxes'}
                        {mobileSettingsSubPage === 'notifications' && 'Notifications'}
                        {mobileSettingsSubPage === 'security' && 'Security'}
                      </span>
                    </h3>
                  </div>

                  {/* Form Component for Active Mobile SubPage */}
                  {mobileSettingsSubPage === 'profile' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', paddingBottom: '14px', borderBottom: '1px solid #F8FAFC' }}>
                        <div
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '14px',
                            backgroundColor: customAvatarUrl ? '#EFF6FF' : '#0052FF',
                            border: '2px solid #BFDBFE',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                            color: '#FFFFFF',
                            fontWeight: 800,
                            fontSize: '18px',
                          }}
                        >
                          {customAvatarUrl ? (
                            <img
                              src={customAvatarUrl}
                              alt="Creator Avatar"
                              style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }}
                            />
                          ) : (
                            <span>
                              {settingsProfile.displayName
                                ? settingsProfile.displayName.split(' ').map((w: string) => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase()
                                : 'CR'}
                            </span>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Creator Profile Photo</div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>AI Studio Transparent Cutout (Auto-styled)</div>
                          <button
                            type="button"
                            onClick={() => setShowAiStudioModal(true)}
                            style={{
                              marginTop: '5px',
                              padding: '5px 12px',
                              fontSize: '11.5px',
                              fontWeight: 700,
                              backgroundColor: '#EFF6FF',
                              border: '1px solid #BFDBFE',
                              borderRadius: '6px',
                              color: '#0052FF',
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '5px',
                            }}
                          >
                            <span>✨ Open AI Studio Uploader</span>
                          </button>
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Display Name
                        </label>
                        <input
                          type="text"
                          value={settingsProfile.displayName}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, displayName: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Creator Handle / Username
                        </label>
                        <input
                          type="text"
                          value={settingsProfile.handle}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, handle: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Profile Tagline / Subtitle
                        </label>
                        <input
                          type="text"
                          value={settingsProfile.tagline}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, tagline: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          About / Bio
                        </label>
                        <textarea
                          rows={3}
                          value={settingsProfile.bio}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, bio: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Location
                        </label>
                        <input
                          type="text"
                          value={settingsProfile.location}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, location: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Content Languages
                        </label>
                        <input
                          type="text"
                          value={settingsProfile.languages}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, languages: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Collab Contact Email
                        </label>
                        <input
                          type="email"
                          value={settingsProfile.contactEmail}
                          onChange={(e) => setSettingsProfile({ ...settingsProfile, contactEmail: e.target.value })}
                          style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  )}

                  {mobileSettingsSubPage === 'rates' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div style={{ padding: '12px 14px', backgroundColor: '#EFF6FF', border: '1px solid #BFDBFE', borderRadius: '10px', display: 'flex', gap: '10px' }}>
                        <span style={{ fontSize: '16px' }}>ℹ️</span>
                        <div style={{ fontSize: '11.5px', color: '#1E3A8A', lineHeight: 1.4 }}>
                          All campaign payouts are disbursed directly by TIA into your bank upon deliverable approval, after <strong>5% TIA fee</strong> and <strong>1% TDS</strong> (Sec 194J).
                        </div>
                      </div>

                      <div>
                        <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                          Minimum Campaign Budget (INR)
                        </label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '13px', fontWeight: 700, color: '#64748B' }}>₹</span>
                          <input
                            type="number"
                            value={settingsRates.minCollabBudget}
                            onChange={(e) => setSettingsRates({ ...settingsRates, minCollabBudget: Number(e.target.value) })}
                            style={{ width: '100%', padding: '9px 12px 9px 28px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', fontWeight: 700, outline: 'none', boxSizing: 'border-box' }}
                          />
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {[
                          { key: 'youtubeDedicated', label: 'YouTube Dedicated Review', defaultVal: settingsRates.youtubeDedicated },
                          { key: 'youtubeIntegration', label: 'YouTube 60s Integration', defaultVal: settingsRates.youtubeIntegration },
                          { key: 'instagramReel', label: 'Instagram Reel (60-90s)', defaultVal: settingsRates.instagramReel },
                          { key: 'instagramStory', label: 'Instagram Story (3 Slides + Link)', defaultVal: settingsRates.instagramStory },
                          { key: 'linkedinPost', label: 'LinkedIn Sponsored Post', defaultVal: settingsRates.linkedinPost },
                          { key: 'twitterThread', label: 'X/Twitter Dedicated Thread', defaultVal: settingsRates.twitterThread },
                        ].map((item) => (
                          <div key={item.key} style={{ padding: '12px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                            <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '4px' }}>
                              {item.label}
                            </label>
                            <div style={{ position: 'relative' }}>
                              <span style={{ position: 'absolute', left: '10px', top: '7px', fontSize: '12px', fontWeight: 700, color: '#64748B' }}>₹</span>
                              <input
                                type="number"
                                value={(settingsRates as any)[item.key]}
                                onChange={(e) => setSettingsRates({ ...settingsRates, [item.key]: Number(e.target.value) })}
                                style={{ width: '100%', padding: '7px 10px 7px 24px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '13px', color: '#0F172A', fontWeight: 700, outline: 'none', boxSizing: 'border-box', backgroundColor: '#FFFFFF' }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {mobileSettingsSubPage === 'payouts' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>
                            {bankAccount?.bankName || 'HDFC Bank Ltd.'}
                          </span>
                          <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 6px', borderRadius: '4px' }}>
                            ● Verified
                          </span>
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '4px' }}>
                          A/C: •••••••••••• {bankAccount?.accountNumber?.slice(-4) || '0482'} • IFSC: {bankAccount?.ifscCode || 'HDFC0000128'}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748B', marginTop: '2px' }}>
                          Beneficiary: {bankAccount?.accountHolderName || 'Sarah Jenkins'}
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowBankModal(true)}
                          style={{
                            marginTop: '10px',
                            width: '100%',
                            padding: '7px 12px',
                            backgroundColor: '#FFFFFF',
                            border: '1px solid #CBD5E1',
                            borderRadius: '8px',
                            fontSize: '12px',
                            fontWeight: 700,
                            color: '#0052FF',
                            cursor: 'pointer',
                          }}
                        >
                          Update Bank Details
                        </button>
                      </div>

                      <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                        <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>PAN Number (TDS Compliance)</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                          <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{bankAccount?.panNumber || 'ABCDE1234F'}</span>
                          <span style={{ fontSize: '10px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                            1% TDS (Sec 194J)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {mobileSettingsSubPage === 'notifications' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      {[
                        { key: 'matchEngineAlerts', title: 'Campaign Match Alerts', desc: 'Instant alert when new briefs match over 80%', checked: settingsNotifications.matchEngineAlerts },
                        { key: 'milestonePaymentAlerts', title: 'Payment Secured Alerts', desc: 'Alerts when client deposits 100% upfront milestone', checked: settingsNotifications.milestonePaymentAlerts },
                        { key: 'directBrandInquiries', title: 'Direct Brand Inquiries', desc: 'Allow verified marketers to send direct collab proposals', checked: settingsNotifications.directBrandInquiries },
                        { key: 'whatsappAlerts', title: 'WhatsApp & SMS Alerts', desc: 'Urgent alerts for deliverable approvals and payouts', checked: settingsNotifications.whatsappAlerts },
                        { key: 'weeklyPerformanceDigest', title: 'Weekly Digest', desc: 'Weekly report on profile views and match ranking', checked: settingsNotifications.weeklyPerformanceDigest },
                      ].map((notif) => (
                        <div key={notif.key} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #F1F5F9', gap: '12px' }}>
                          <div>
                            <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>{notif.title}</div>
                            <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{notif.desc}</div>
                          </div>
                          <input
                            type="checkbox"
                            checked={notif.checked}
                            onChange={(e) => setSettingsNotifications({ ...settingsNotifications, [notif.key]: e.target.checked })}
                            style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0052FF', flexShrink: 0 }}
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {mobileSettingsSubPage === 'security' && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      <div style={{ padding: '14px', backgroundColor: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Two-Factor Auth (2FA)</div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Authenticator App (TOTP) is active</div>
                        </div>
                        <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '2px 8px', borderRadius: '6px' }}>
                          ● Active
                        </span>
                      </div>

                      <div style={{ padding: '14px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 800, color: '#0F172A' }}>Account Password</div>
                          <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Updated 2 weeks ago</div>
                        </div>
                        <button
                          type="button"
                          style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 700, backgroundColor: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '6px', color: '#334155', cursor: 'pointer' }}
                        >
                          Change
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Bottom Navigation Buttons on Mobile */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px', paddingTop: '14px', borderTop: '1px solid #F1F5F9' }}>
                    <button
                      type="button"
                      onClick={() => {
                        setSettingsSavedSuccess(true);
                        setLiveToast({
                          id: `toast-${Date.now()}`,
                          type: 'SYSTEM',
                          category: 'SYSTEM',
                          title: 'Settings Saved',
                          message: 'Your settings have been successfully updated.',
                          timeAgo: 'Just now',
                          timestamp: Date.now(),
                          read: false,
                        });
                        setTimeout(() => setSettingsSavedSuccess(false), 3500);
                      }}
                      style={{
                        width: '100%',
                        padding: '10px 16px',
                        backgroundColor: settingsSavedSuccess ? '#059669' : '#0052FF',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '13px',
                        fontWeight: 700,
                        cursor: 'pointer',
                      }}
                    >
                      {settingsSavedSuccess ? '✓ Changes Saved' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* ------------------------------------------------------------------ */}
            {/* 2. DESKTOP & TABLET VIEW (STANDARD UNDERLINE TAB STRIP)             */}
            {/* ------------------------------------------------------------------ */}
            <div
              className="settings-desktop-only"
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #E2E8F0',
                padding: '20px 24px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
              }}
            >
              {/* Desktop Header */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #F1F5F9',
                  marginBottom: '18px',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Settings & Preferences
                  </h2>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                    Configure your public creator profile, commercial rate card, bank payout details, and security.
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Link
                    href="/creator/profile"
                    target="_blank"
                    style={{
                      padding: '7px 14px',
                      backgroundColor: '#FFFFFF',
                      border: '1px solid #CBD5E1',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      color: '#334155',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      cursor: 'pointer',
                    }}
                  >
                    Public Profile ↗
                  </Link>

                  <button
                    type="button"
                    onClick={async () => {
                      try {
                        if (settingsProfile.contactPhone) {
                          localStorage.setItem('tia_user_phone', settingsProfile.contactPhone);
                        }
                        await fetch('/api/creators/profile', {
                          method: 'PUT',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            displayName: settingsProfile.displayName,
                            bio: settingsProfile.bio,
                            phone: settingsProfile.contactPhone,
                            country: settingsProfile.location,
                          }),
                        });
                        setCurrentUser((prev: any) => ({
                          ...prev,
                          name: settingsProfile.displayName,
                          phone: settingsProfile.contactPhone,
                        }));
                      } catch {}
                      setSettingsSavedSuccess(true);
                      setLiveToast({
                        id: `toast-${Date.now()}`,
                        type: 'SYSTEM',
                        category: 'SYSTEM',
                        title: 'Settings Saved Successfully',
                        message: 'Your profile, phone number, and preferences have been updated.',
                        timeAgo: 'Just now',
                        timestamp: Date.now(),
                        read: false,
                      });
                      setTimeout(() => {
                        setSettingsSavedSuccess(false);
                      }, 3500);
                    }}
                    style={{
                      padding: '7px 16px',
                      backgroundColor: settingsSavedSuccess ? '#059669' : '#0052FF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {settingsSavedSuccess ? '✓ Saved!' : 'Save Changes'}
                  </button>
                </div>
              </div>

              {/* 2-Column Settings Layout: Left Navigation + Right Content */}
              <div style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}>
                {/* Left Vertical Sub-Navigation Sidebar */}
                <div
                  style={{
                    width: '230px',
                    flexShrink: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    paddingRight: '16px',
                    borderRight: '1px solid #F1F5F9',
                  }}
                >
                  {[
                    { id: 'profile', label: 'Profile & Bio' },
                    { id: 'rates', label: 'Commercial Rates' },
                    { id: 'payouts', label: 'Payout & Taxes' },
                    { id: 'notifications', label: 'Notifications' },
                    { id: 'security', label: 'Security' },
                  ].map((subTab) => {
                    const isActive = settingsActiveSubTab === subTab.id;
                    return (
                      <button
                        key={subTab.id}
                        type="button"
                        onClick={() => setSettingsActiveSubTab(subTab.id as any)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '11px 14px',
                          fontSize: '13.5px',
                          fontWeight: isActive ? 700 : 600,
                          color: isActive ? '#0052FF' : '#475569',
                          backgroundColor: isActive ? '#EFF6FF' : 'transparent',
                          border: 'none',
                          borderRadius: '10px',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                          transition: 'all 0.15s ease',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '20px', flexShrink: 0 }}>
                          {getSettingsSvgIcon(subTab.id, 17, isActive ? '#0052FF' : '#64748B')}
                        </div>
                        <span>{subTab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Right Form / Sub-Tab Content Area */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* SUB-TAB 1: PROFILE & BIO */}
                  {settingsActiveSubTab === 'profile' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Avatar + Basic Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', paddingBottom: '18px', borderBottom: '1px solid #F8FAFC' }}>
                    <div
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '16px',
                        backgroundColor: customAvatarUrl ? '#EFF6FF' : '#0052FF',
                        border: '2px solid #BFDBFE',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: customAvatarUrl ? 'flex-end' : 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      {customAvatarUrl ? (
                        <img
                          src={customAvatarUrl}
                          alt="Creator Avatar"
                          style={{ width: '100%', height: '100%', objectFit: 'contain', objectPosition: 'bottom center' }}
                        />
                      ) : (
                        <div
                          style={{
                            color: '#FFFFFF',
                            fontSize: '20px',
                            fontWeight: 800,
                            letterSpacing: '-0.02em',
                          }}
                        >
                          {(currentUser?.name || settingsProfile.displayName || 'Creator')
                            .split(' ')
                            .map((w: string) => w[0])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join('')
                            .toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>Creator Profile Photo</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>AI Studio Transparent Cutout (Auto-styled with 3 variations)</div>
                      <button
                        type="button"
                        onClick={() => setShowAiStudioModal(true)}
                        style={{
                          marginTop: '6px',
                          padding: '5px 14px',
                          fontSize: '12px',
                          fontWeight: 700,
                          backgroundColor: '#EFF6FF',
                          border: '1px solid #BFDBFE',
                          borderRadius: '8px',
                          color: '#0052FF',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <span>✨ Open AI Studio Uploader</span>
                      </button>
                    </div>
                  </div>

                  {/* 2-Column Grid: Name & Handle */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Display Name
                      </label>
                      <input
                        type="text"
                        value={settingsProfile.displayName}
                        onChange={(e) => setSettingsProfile({ ...settingsProfile, displayName: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Creator Handle / Username
                      </label>
                      <input
                        type="text"
                        value={settingsProfile.handle}
                        onChange={(e) => setSettingsProfile({ ...settingsProfile, handle: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                  </div>

                  {/* Tagline */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                      Profile Tagline / Subtitle
                    </label>
                    <input
                      type="text"
                      value={settingsProfile.tagline}
                      onChange={(e) => setSettingsProfile({ ...settingsProfile, tagline: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        color: '#0F172A',
                        outline: 'none',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* Bio */}
                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                      About / Bio
                    </label>
                    <textarea
                      rows={3}
                      value={settingsProfile.bio}
                      onChange={(e) => setSettingsProfile({ ...settingsProfile, bio: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '9px 12px',
                        borderRadius: '8px',
                        border: '1px solid #CBD5E1',
                        fontSize: '13px',
                        color: '#0F172A',
                        outline: 'none',
                        resize: 'vertical',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>

                  {/* 3-Column Grid: Location, Languages, Contact Email */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Location
                      </label>
                      <input
                        type="text"
                        value={settingsProfile.location}
                        onChange={(e) => setSettingsProfile({ ...settingsProfile, location: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Content Languages
                      </label>
                      <input
                        type="text"
                        value={settingsProfile.languages}
                        onChange={(e) => setSettingsProfile({ ...settingsProfile, languages: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Collab Contact Email
                      </label>
                      <input
                        type="email"
                        value={settingsProfile.contactEmail}
                        onChange={(e) => setSettingsProfile({ ...settingsProfile, contactEmail: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '9px 12px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                        Phone Number (for Direct UPI & Instant Payout Alerts)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '13px', fontWeight: 700, color: '#64748B' }}>+91</span>
                        <input
                          type="tel"
                          placeholder="e.g. 9820198201"
                          maxLength={10}
                          value={settingsProfile.contactPhone?.replace(/^\+91/, '') || ''}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            setSettingsProfile({ ...settingsProfile, contactPhone: val });
                            if (typeof window !== 'undefined') localStorage.setItem('tia_user_phone', val);
                          }}
                          style={{
                            width: '100%',
                            padding: '9px 12px 9px 44px',
                            borderRadius: '8px',
                            border: '1px solid #CBD5E1',
                            fontSize: '13px',
                            color: '#0F172A',
                            outline: 'none',
                            boxSizing: 'border-box',
                          }}
                        />
                      </div>
                      <div style={{ fontSize: '11px', color: '#64748B', marginTop: '4px' }}>
                        Auto-fills Razorpay payments so you can pay instantly via UPI without entering contact details.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 2: COMMERCIAL RATES & RATE CARD */}
              {settingsActiveSubTab === 'rates' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {/* Payout & Tax Fee Banner */}
                  <div
                    style={{
                      padding: '14px 18px',
                      backgroundColor: '#EFF6FF',
                      border: '1px solid #BFDBFE',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>ℹ️</span>
                    <div>
                      <div style={{ fontSize: '13px', fontWeight: 800, color: '#1E40AF' }}>
                        TIA Fee & Milestone Payout Transparency
                      </div>
                      <div style={{ fontSize: '12px', color: '#1E3A8A', marginTop: '2px', lineHeight: 1.4 }}>
                        All client campaign payments are disbursed directly by TIA into your verified bank account upon milestone deliverable approval, after deducting a <strong>5% platform fee</strong> and <strong>1% TDS</strong> (under Section 194J of the IT Act with verified PAN).
                      </div>
                    </div>
                  </div>

                  {/* Minimum Collab Budget */}
                  <div style={{ maxWidth: '320px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                      Minimum Campaign Budget (INR)
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '13px', fontWeight: 700, color: '#64748B' }}>₹</span>
                      <input
                        type="number"
                        value={settingsRates.minCollabBudget}
                        onChange={(e) => setSettingsRates({ ...settingsRates, minCollabBudget: Number(e.target.value) })}
                        style={{
                          width: '100%',
                          padding: '9px 12px 9px 28px',
                          borderRadius: '8px',
                          border: '1px solid #CBD5E1',
                          fontSize: '13px',
                          color: '#0F172A',
                          fontWeight: 700,
                          outline: 'none',
                          boxSizing: 'border-box',
                        }}
                      />
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B', marginTop: '3px' }}>
                      Briefs below this amount will be automatically filtered.
                    </div>
                  </div>

                  {/* Deliverable Rate Card Grid */}
                  <div>
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
                      Standard Deliverable Rates
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px' }}>
                      {[
                        { key: 'youtubeDedicated', label: 'YouTube Dedicated Review', defaultVal: settingsRates.youtubeDedicated },
                        { key: 'youtubeIntegration', label: 'YouTube 60s Integration', defaultVal: settingsRates.youtubeIntegration },
                        { key: 'instagramReel', label: 'Instagram Reel (60-90s)', defaultVal: settingsRates.instagramReel },
                        { key: 'instagramStory', label: 'Instagram Story (3 Slides + Link)', defaultVal: settingsRates.instagramStory },
                        { key: 'linkedinPost', label: 'LinkedIn Sponsored Post', defaultVal: settingsRates.linkedinPost },
                        { key: 'twitterThread', label: 'X/Twitter Dedicated Thread', defaultVal: settingsRates.twitterThread },
                      ].map((item) => (
                        <div key={item.key}>
                          <label style={{ fontSize: '12px', fontWeight: 700, color: '#334155', display: 'block', marginBottom: '5px' }}>
                            {item.label}
                          </label>
                          <div style={{ position: 'relative' }}>
                            <span style={{ position: 'absolute', left: '12px', top: '9px', fontSize: '13px', fontWeight: 700, color: '#64748B' }}>₹</span>
                            <input
                              type="number"
                              value={(settingsRates as any)[item.key]}
                              onChange={(e) => setSettingsRates({ ...settingsRates, [item.key]: Number(e.target.value) })}
                              style={{
                                width: '100%',
                                padding: '9px 12px 9px 28px',
                                borderRadius: '8px',
                                border: '1px solid #CBD5E1',
                                fontSize: '13px',
                                color: '#0F172A',
                                fontWeight: 700,
                                outline: 'none',
                                boxSizing: 'border-box',
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 3: PAYOUT & TAXES */}
              {settingsActiveSubTab === 'payouts' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  {bankAccount ? (
                    <div
                      style={{
                        padding: '18px 20px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        gap: '14px',
                      }}
                    >
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>
                            {bankAccount.bankName}
                          </span>
                          <span
                            style={{
                              fontSize: '11px',
                              fontWeight: 800,
                              color: '#059669',
                              backgroundColor: '#ECFDF5',
                              padding: '2px 8px',
                              borderRadius: '6px',
                            }}
                          >
                            ● Verified & Active
                          </span>
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                          Account Number: •••••••••••• {bankAccount.accountNumber?.slice(-4) || '****'} • IFSC: {bankAccount.ifscCode}
                        </div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                          Beneficiary: {bankAccount.accountHolderName} • UPI: {bankAccount.upiId || 'Not registered'}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setShowBankModal(true)}
                        style={{
                          padding: '7px 14px',
                          backgroundColor: '#FFFFFF',
                          border: '1px solid #CBD5E1',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                          color: '#0052FF',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Update Bank Account
                      </button>
                    </div>
                  ) : (
                    <div
                      style={{
                        padding: '28px 24px',
                        backgroundColor: '#F8FAFC',
                        borderRadius: '12px',
                        border: '1px dashed #CBD5E1',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                        gap: '12px',
                      }}
                    >
                      <div
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '12px',
                          backgroundColor: '#EFF6FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#0052FF',
                        }}
                      >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
                        </svg>
                      </div>
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>No Bank Account Linked</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '3px', maxWidth: '380px', lineHeight: 1.5 }}>
                          Add your bank account details and PAN to receive 100% direct payouts for approved brand collaborations.
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowBankModal(true)}
                        style={{
                          padding: '8px 18px',
                          backgroundColor: '#0052FF',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontSize: '12.5px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(0, 82, 255, 0.25)',
                        }}
                      >
                        + Add Bank Account
                      </button>
                    </div>
                  )}

                  {/* Tax & PAN Card */}
                  <div
                    style={{
                      padding: '18px 20px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                      gap: '14px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>PAN Number (TDS Compliance)</div>
                      {bankAccount?.panNumber ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '3px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A' }}>{bankAccount.panNumber}</span>
                          <span style={{ fontSize: '10.5px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '1px 6px', borderRadius: '4px' }}>
                            1% TDS (Sec 194J)
                          </span>
                        </div>
                      ) : (
                        <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 600, marginTop: '3px' }}>
                          Not Registered
                        </div>
                      )}
                    </div>

                    <div>
                      <div style={{ fontSize: '11.5px', color: '#64748B', fontWeight: 600 }}>GST Registration Status</div>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: bankAccount ? '#0F172A' : '#94A3B8', marginTop: '3px' }}>
                        {bankAccount ? 'Unregistered (Under ₹20 Lakhs Threshold)' : 'Not Registered'}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SUB-TAB 4: NOTIFICATIONS */}
              {settingsActiveSubTab === 'notifications' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {[
                    {
                      key: 'matchEngineAlerts',
                      title: 'High-Match Campaign Alerts',
                      desc: 'Receive instant notifications when new brand briefs match over 80% of your audience.',
                      checked: settingsNotifications.matchEngineAlerts,
                    },
                    {
                      key: 'milestonePaymentAlerts',
                      title: 'Milestone Payment Secured Alerts',
                      desc: 'Instant alerts when enterprise clients fund 100% upfront milestone payments.',
                      checked: settingsNotifications.milestonePaymentAlerts,
                    },
                    {
                      key: 'directBrandInquiries',
                      title: 'Direct Brand Inquiries',
                      desc: 'Allow verified brand marketers to send direct collab proposals to your inbox.',
                      checked: settingsNotifications.directBrandInquiries,
                    },
                    {
                      key: 'whatsappAlerts',
                      title: 'WhatsApp & SMS Urgent Updates',
                      desc: 'Get immediate alerts on WhatsApp for urgent deliverable revisions and payout releases.',
                      checked: settingsNotifications.whatsappAlerts,
                    },
                    {
                      key: 'weeklyPerformanceDigest',
                      title: 'Weekly Performance Digest',
                      desc: 'Weekly report on profile views, match ranking, and creator marketplace trends.',
                      checked: settingsNotifications.weeklyPerformanceDigest,
                    },
                  ].map((notif) => (
                    <div
                      key={notif.key}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '14px 0',
                        borderBottom: '1px solid #F1F5F9',
                        gap: '12px',
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{notif.title}</div>
                        <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>{notif.desc}</div>
                      </div>

                      <input
                        type="checkbox"
                        checked={notif.checked}
                        onChange={(e) =>
                          setSettingsNotifications({
                            ...settingsNotifications,
                            [notif.key]: e.target.checked,
                          })
                        }
                        style={{ width: '18px', height: '18px', cursor: 'pointer', accentColor: '#0052FF', flexShrink: 0 }}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* SUB-TAB 5: SECURITY */}
              {settingsActiveSubTab === 'security' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  <div
                    style={{
                      padding: '16px 18px',
                      backgroundColor: '#F8FAFC',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Two-Factor Authentication (2FA)</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
                        Authenticator App (TOTP) is active and protecting your creator payout account.
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px', whiteSpace: 'nowrap' }}>
                      ● Enabled
                    </span>
                  </div>

                  <div
                    style={{
                      padding: '16px 18px',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '12px',
                      border: '1px solid #E2E8F0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Password</div>
                      <div style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>Last updated 2 weeks ago</div>
                    </div>
                    <button
                      type="button"
                      style={{
                        padding: '6px 12px',
                        fontSize: '11.5px',
                        fontWeight: 700,
                        backgroundColor: '#F8FAFC',
                        border: '1px solid #CBD5E1',
                        borderRadius: '6px',
                        color: '#334155',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      Change Password
                    </button>
                  </div>

                  {/* Active Sessions */}
                  <div style={{ padding: '16px 18px', backgroundColor: '#FFFFFF', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>Active Devices & Sessions</div>
                    <div style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                      Current session: <strong>Chrome on Windows 11</strong> (IP: 103.21.244.18 • Mumbai, India)
                    </div>
                  </div>
                </div>
              )}
                </div>
              </div>
            </div>
          </div>
        
    </>
  );
}
