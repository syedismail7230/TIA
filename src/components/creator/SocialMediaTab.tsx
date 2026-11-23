import React from 'react';
import { CreatorSettingsProfile } from './types';

interface SocialMediaTabProps {
  connectedAccounts: Record<string, boolean>;
  onConnectAccount: (platform: string) => void;
  onDisconnectAccount: (platform: string) => void;
  isDemoUser: boolean;
  settingsProfile: CreatorSettingsProfile;
}

export function SocialMediaTab({
  connectedAccounts,
  onConnectAccount,
  onDisconnectAccount,
  isDemoUser,
  settingsProfile,
}: SocialMediaTabProps) {
  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Main Connected Channels Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid #E2E8F0',
          padding: '20px 24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
            flexWrap: 'wrap',
            gap: '10px',
          }}
        >
          <div>
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Connected Channels
            </h2>
            <p style={{ fontSize: '12px', color: '#64748B', margin: '2px 0 0 0' }}>
              Live synced social accounts and audience metrics
            </p>
          </div>

          <button
            type="button"
            onClick={() => onConnectAccount('TIKTOK')}
            style={{
              padding: '6px 14px',
              backgroundColor: '#0052FF',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
          >
            + Connect Account
          </button>
        </div>

        {/* Connected Accounts Clean List */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            {
              name: 'YouTube',
              handle: connectedAccounts['YouTube'] ? (isDemoUser ? '@creator.official' : `@${settingsProfile.handle.replace('@', '')}`) : 'Not connected',
              count: connectedAccounts['YouTube'] ? (isDemoUser ? '185K Subs' : 'Live Synced') : '—',
              extra: connectedAccounts['YouTube'] ? (isDemoUser ? '45.2K Avg Views • 5.2% ER' : 'Synced') : 'Sync disconnected',
              icon: (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0052FF',
                    flexShrink: 0,
                  }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                </div>
              ),
            },
            {
              name: 'Instagram',
              handle: connectedAccounts['Instagram'] ? (isDemoUser ? '@creator.official' : `@${settingsProfile.handle.replace('@', '')}`) : 'Not connected',
              count: connectedAccounts['Instagram'] ? (isDemoUser ? '320K Followers' : 'Live Synced') : '—',
              extra: connectedAccounts['Instagram'] ? (isDemoUser ? '38.4K Avg Likes • 4.8% ER' : 'Synced') : 'Sync disconnected',
              icon: (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0052FF',
                    flexShrink: 0,
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
              ),
            },
            {
              name: 'LinkedIn',
              handle: connectedAccounts['LinkedIn'] ? (isDemoUser ? 'Sarah Jenkins' : settingsProfile.displayName) : 'Not connected',
              count: connectedAccounts['LinkedIn'] ? (isDemoUser ? '65K Connections' : 'Live Synced') : '—',
              extra: connectedAccounts['LinkedIn'] ? (isDemoUser ? '92.4K Reach • 6.1% ER' : 'Synced') : 'Sync disconnected',
              icon: (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0052FF',
                    flexShrink: 0,
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                  </svg>
                </div>
              ),
            },
            {
              name: 'X (Twitter)',
              handle: connectedAccounts['X (Twitter)'] ? (isDemoUser ? '@creator_x' : `@${settingsProfile.handle.replace('@', '')}`) : 'Not connected',
              count: connectedAccounts['X (Twitter)'] ? (isDemoUser ? '45K Followers' : 'Live Synced') : '—',
              extra: connectedAccounts['X (Twitter)'] ? (isDemoUser ? '12.1K Impr. • 3.6% ER' : 'Synced') : 'Sync disconnected',
              icon: (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '8px',
                    backgroundColor: '#EFF6FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0052FF',
                    flexShrink: 0,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
              ),
            },
          ].map((channel, idx) => {
            const isConnected = connectedAccounts[channel.name] ?? false;
            return (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 0',
                  borderBottom: idx < 3 ? '1px solid #F1F5F9' : 'none',
                  opacity: isConnected ? 1 : 0.65,
                  gap: '10px',
                }}
              >
                {/* Left: Icon & Channel Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0, flex: 1 }}>
                  {channel.icon}
                  <div style={{ minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{channel.name}</span>
                      <span style={{ fontSize: '11.5px', color: '#64748B' }}>{channel.handle}</span>
                    </div>
                    <div style={{ fontSize: '11px', color: '#94A3B8', marginTop: '1px' }}>
                      {isConnected ? `${channel.count} • ${channel.extra}` : 'Sync disconnected'}
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                  {isConnected ? (
                    <>
                      <span
                        style={{
                          fontSize: '11px',
                          fontWeight: 700,
                          color: '#059669',
                          backgroundColor: '#ECFDF5',
                          padding: '3px 7px',
                          borderRadius: '6px',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        ● Connected
                      </span>
                      <button
                        type="button"
                        onClick={() => onDisconnectAccount(channel.name)}
                        style={{
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#94A3B8',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '3px 6px',
                          borderRadius: '4px',
                          transition: 'color 0.15s ease',
                          whiteSpace: 'nowrap',
                        }}
                        title={`Disconnect ${channel.name}`}
                      >
                        Disconnect
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onConnectAccount(channel.name)}
                      style={{
                        fontSize: '11px',
                        fontWeight: 700,
                        color: '#0052FF',
                        backgroundColor: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        padding: '3px 10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      + Connect
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Aggregated Numbers 4-Stat Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '14px',
            marginTop: '14px',
            paddingTop: '16px',
            borderTop: '1px solid #F1F5F9',
          }}
        >
          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Total Audience</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginTop: '1px' }}>
              {isDemoUser ? '615,000+' : (Object.values(connectedAccounts).some(Boolean) ? 'Live Synced' : '0')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Monthly Impressions</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginTop: '1px' }}>
              {isDemoUser ? '2.84M' : (Object.values(connectedAccounts).some(Boolean) ? 'Live Synced' : '0')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Avg. Engagement</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#0F172A', marginTop: '1px' }}>
              {isDemoUser ? '4.85%' : (Object.values(connectedAccounts).some(Boolean) ? 'Live Synced' : '0.0%')}
            </div>
          </div>

          <div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: 600 }}>Audience Quality</div>
            <div style={{ fontSize: '18px', fontWeight: 900, color: '#059669', marginTop: '1px' }}>
              {isDemoUser ? '98.4% Real' : '100% Real'}
            </div>
          </div>
        </div>
      </div>

      {/* 2. Demographics & Recent Posts (Clean 2-Card Grid) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        {/* Left: Demographics */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
          }}
        >
          <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
            Audience Breakdown
          </h3>

          {isDemoUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#475569' }}>🇮🇳 India</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>68%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#475569' }}>🇺🇸 United States</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>14%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#475569' }}>🇦🇪 United Arab Emirates</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>7%</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                <span style={{ color: '#475569' }}>🇬🇧 United Kingdom</span>
                <span style={{ fontWeight: 800, color: '#0F172A' }}>6%</span>
              </div>

              <div style={{ marginTop: '6px', paddingTop: '10px', borderTop: '1px solid #F1F5F9', fontSize: '11px', color: '#64748B', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '6px' }}>
                <span>Age: <strong style={{ color: '#0F172A' }}>18–34 yrs (82%)</strong></span>
                <span>Gender: <strong style={{ color: '#0F172A' }}>58% M / 42% F</strong></span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#94A3B8', fontSize: '12.5px' }}>
              Connect a social account above to view verified audience demographics and geographic distribution.
            </div>
          )}
        </div>

        {/* Right: Recent Content */}
        <div
          style={{
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid #E2E8F0',
            padding: '18px 20px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.02)',
          }}
        >
          <h3 style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A', margin: '0 0 12px 0' }}>
            Recent Posts
          </h3>

          {isDemoUser ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {[
                { title: 'Top 5 Tech Gadgets 2026', views: '48.2K', er: '6.4%', channel: 'YouTube' },
                { title: 'Morning Fitness Routine', views: '84.5K', er: '5.8%', channel: 'Instagram' },
                { title: 'Why Creator Monetization Shifted', views: '24.6K', er: '6.2%', channel: 'LinkedIn' },
                { title: 'New ANC Earbuds Unboxing', views: '32.1K', er: '3.8%', channel: 'X' },
              ].map((post, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '12px',
                    paddingBottom: '6px',
                    borderBottom: idx < 3 ? '1px solid #F8FAFC' : 'none',
                    gap: '8px',
                  }}
                >
                  <div style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    <span style={{ fontWeight: 700, color: '#0F172A' }}>{post.title}</span>
                    <span style={{ color: '#94A3B8', marginLeft: '4px' }}>• {post.channel}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
                    <span style={{ color: '#64748B', fontSize: '11.5px' }}>{post.views}</span>
                    <span style={{ fontWeight: 700, color: '#0052FF', backgroundColor: '#EFF6FF', padding: '1px 5px', borderRadius: '4px', fontSize: '10.5px' }}>
                      {post.er}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '24px 12px', color: '#94A3B8', fontSize: '12.5px' }}>
              No recent synced posts. Connect your channels to display live content analytics and engagement.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
