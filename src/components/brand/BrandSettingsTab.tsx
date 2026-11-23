import React from 'react';
import {
  BriefcaseIcon,
  UsersIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  BellIcon,
  SettingsIcon,
  MenuIcon,
} from '@/components/dashboard/icons';

interface BrandSettingsTabProps {
  settingsActiveSubTab: 'profile' | 'team' | 'billing' | 'contracts' | 'notifications' | 'security';
  onSetSubTab: (sub: 'profile' | 'team' | 'billing' | 'contracts' | 'notifications' | 'security') => void;
  mobileSettingsOpen: boolean;
  onToggleMobileSettings: () => void;
  settingsSavedToast: boolean;
  orgProfile: {
    name: string;
    handle: string;
    industry: string;
    website: string;
    hqLocation: string;
    gstin: string;
    panNumber: string;
  };
  onOrgProfileChange: (updated: any) => void;
  onSaveSettings: (e: React.FormEvent) => void;
}

export function BrandSettingsTab({
  settingsActiveSubTab,
  onSetSubTab,
  mobileSettingsOpen,
  onToggleMobileSettings,
  settingsSavedToast,
  orgProfile,
  onOrgProfileChange,
  onSaveSettings,
}: BrandSettingsTabProps) {
  return (
    <div>
      {/* Mobile Hamburger Drawer for Sub-Tabs */}
      <div style={{ display: 'none', marginBottom: '14px' }} className="mobile-settings-toggle">
        <button
          type="button"
          onClick={onToggleMobileSettings}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 700,
          }}
        >
          <MenuIcon size={16} color="#0052FF" />
          <span>Settings Menu ({settingsActiveSubTab.toUpperCase()})</span>
        </button>
      </div>

      <div className="brand-settings-grid">
        {/* Left Settings Sidebar */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '16px', height: 'fit-content' }}>
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', marginBottom: '10px', paddingLeft: '8px' }}>
            Enterprise Settings
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[
              { id: 'profile' as const, label: 'Organization Profile', icon: <BriefcaseIcon size={14} /> },
              { id: 'team' as const, label: 'Team & Permissions', icon: <UsersIcon size={14} /> },
              { id: 'billing' as const, label: 'Billing & GST Details', icon: <CreditCardIcon size={14} /> },
              { id: 'contracts' as const, label: 'Contract Standards', icon: <ShieldCheckIcon size={14} /> },
              { id: 'notifications' as const, label: 'Notification Alerts', icon: <BellIcon size={14} /> },
              { id: 'security' as const, label: 'Security & API Keys', icon: <SettingsIcon size={14} /> },
            ].map((sub) => {
              const isSubActive = settingsActiveSubTab === sub.id;
              return (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => onSetSubTab(sub.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 12px',
                    borderRadius: '8px',
                    backgroundColor: isSubActive ? '#EFF6FF' : 'transparent',
                    color: isSubActive ? '#0052FF' : '#475569',
                    fontSize: '13px',
                    fontWeight: isSubActive ? 800 : 600,
                    border: 'none',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <span style={{ color: isSubActive ? '#0052FF' : '#94A3B8' }}>{sub.icon}</span>
                  <span>{sub.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Settings Form Canvas */}
        <div style={{ backgroundColor: '#FFFFFF', borderRadius: '16px', border: '1px solid #E2E8F0', padding: '28px 32px' }}>
          {settingsSavedToast && (
            <div style={{ marginBottom: '16px', padding: '10px 16px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', borderRadius: '8px', color: '#059669', fontSize: '13px', fontWeight: 700 }}>
              ✓ Organization settings saved successfully.
            </div>
          )}

          {/* Sub-Tab 1: Organization Profile */}
          {settingsActiveSubTab === 'profile' && (
            <form onSubmit={onSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Organization Profile
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Public corporate details displayed to verified creators on campaign briefs.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Company Legal Name
                  </label>
                  <input
                    type="text"
                    value={orgProfile.name}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, name: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Brand Tag / Handle
                  </label>
                  <input
                    type="text"
                    value={orgProfile.handle}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, handle: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Industry & Vertical
                  </label>
                  <input
                    type="text"
                    value={orgProfile.industry}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, industry: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Corporate Website
                  </label>
                  <input
                    type="text"
                    value={orgProfile.website}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, website: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                  Corporate Headquarters Location
                </label>
                <input
                  type="text"
                  value={orgProfile.hqLocation}
                  onChange={(e) => onOrgProfileChange({ ...orgProfile, hqLocation: e.target.value })}
                  style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                />
              </div>

              <div style={{ paddingTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          )}

          {/* Sub-Tab 2: Team Members */}
          {settingsActiveSubTab === 'team' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                    Team & Brand Members
                  </h3>
                  <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                    Manage marketing leads and reviewers with access to campaign briefs.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => alert('Opening member invite modal...')}
                  style={{
                    padding: '7px 14px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '12.5px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  + Invite Member
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'Sameer Verma', email: 'sameer@nike.co.in', role: 'Brand Admin & Billing', status: 'ACTIVE' },
                  { name: 'Ananya Roy', email: 'ananya@nike.co.in', role: 'Campaign Marketing Lead', status: 'ACTIVE' },
                  { name: 'Vikram Joshi', email: 'vikram@nike.co.in', role: 'Deliverable Reviewer', status: 'ACTIVE' },
                ].map((m, idx) => (
                  <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
                    <div>
                      <div style={{ fontSize: '13.5px', fontWeight: 800, color: '#0F172A' }}>{m.name}</div>
                      <div style={{ fontSize: '12px', color: '#64748B' }}>{m.email} • <span style={{ color: '#0052FF', fontWeight: 700 }}>{m.role}</span></div>
                    </div>
                    <span style={{ fontSize: '11px', fontWeight: 800, color: '#059669', backgroundColor: '#ECFDF5', padding: '3px 8px', borderRadius: '6px' }}>
                      {m.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sub-Tab 3: Billing & GST */}
          {settingsActiveSubTab === 'billing' && (
            <form onSubmit={onSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Billing & GST Compliance
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Tax identification for automated monthly GST credit invoices.
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    GSTIN Identification Number
                  </label>
                  <input
                    type="text"
                    value={orgProfile.gstin}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, gstin: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#334155', marginBottom: '4px' }}>
                    Corporate PAN Number
                  </label>
                  <input
                    type="text"
                    value={orgProfile.panNumber}
                    onChange={(e) => onOrgProfileChange({ ...orgProfile, panNumber: e.target.value })}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px' }}
                  />
                </div>
              </div>

              <div style={{ paddingTop: '10px' }}>
                <button
                  type="submit"
                  style={{
                    padding: '10px 20px',
                    backgroundColor: '#0052FF',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Update Tax Information
                </button>
              </div>
            </form>
          )}

          {/* Sub-Tab 4: Contract Standards */}
          {settingsActiveSubTab === 'contracts' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  Standard Contract Guidelines
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  Default parameters automatically applied to new creator agreements.
                </p>
              </div>

              <div style={{ padding: '16px', backgroundColor: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Standard Exclusivity Window</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>30 Days Post-Publish</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Free Script Revisions</span>
                  <span style={{ fontWeight: 800, color: '#0F172A' }}>2 Included Rounds</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#64748B' }}>Payment Release Trigger</span>
                  <span style={{ fontWeight: 800, color: '#0052FF' }}>Explicit Brand Approval via Portal</span>
                </div>
              </div>
            </div>
          )}

          {/* Sub-Tab 5 & 6: Notification & Security Placeholders */}
          {(settingsActiveSubTab === 'notifications' || settingsActiveSubTab === 'security') && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <h3 style={{ fontSize: '17px', fontWeight: 800, color: '#0F172A', margin: 0 }}>
                  {settingsActiveSubTab === 'notifications' ? 'Real-Time Notification Preferences' : 'Security & Session Management'}
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748B', margin: '2px 0 0 0' }}>
                  {settingsActiveSubTab === 'notifications' ? 'Manage email and SMS push alerts for deliverable approvals.' : 'Two-factor authentication and enterprise SSO login controls.'}
                </p>
              </div>

              <div style={{ padding: '14px', backgroundColor: '#EFF6FF', borderRadius: '10px', border: '1px solid #BFDBFE', fontSize: '13px', color: '#1E40AF', fontWeight: 600 }}>
                ✓ All enterprise security and notification channels are active and monitored by TIA BotShield.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
