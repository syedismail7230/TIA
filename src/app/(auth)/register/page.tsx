'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole);
  const [step, setStep] = useState<'FORM' | 'SOCIAL_CONNECT'>('FORM');
  
  // Registration Form State
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('Male');
  const [age, setAge] = useState<string>('24');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agreedTerms, setAgreedTerms] = useState(true);
  
  // Status State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Social Connections State
  const [connectedSocials, setConnectedSocials] = useState<{ [key: string]: boolean }>({});

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18) {
      setError('You must be at least 18 years old to register on TIA.');
      return;
    }

    if (!agreedTerms) {
      setError('Please agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          name,
          role,
          gender,
          age: ageNum,
          organizationName: role === 'BRAND_ADMIN' ? name : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Seamlessly advance to social onboarding step
      setStep('SOCIAL_CONNECT');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnectSocial = (platform: string) => {
    setConnectedSocials((prev) => ({
      ...prev,
      [platform]: !prev[platform],
    }));
  };

  const handleFinish = () => {
    if (role === 'CREATOR') {
      router.push('/creator');
    } else {
      router.push('/brand');
    }
    router.refresh();
  };

  const handleSocialOAuth = (platform: string) => {
    window.location.href = `/api/connectors/${platform.toLowerCase()}/auth`;
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        {/* LEFT COLUMN: REGISTRATION FLOW */}
        <div className="auth-form-pane">
          {/* Header */}
          <div className="auth-header">
            <Link href="/" className="auth-brand">
              <img
                src="/main-logo-cropped.png"
                alt="The Influencer's Agency"
                className="auth-brand-logo-img"
              />
            </Link>

            <div className="auth-switch-prompt">
              <span>Already registered?</span>
              <Link href="/login" className="auth-switch-btn">Sign in</Link>
            </div>
          </div>

          <div className="auth-body">
            {/* Logo Mark Icon */}
            <div className="auth-avatar-icon">
              <img
                src="/main-logo-cropped.png"
                alt="The Influencer's Agency"
                className="auth-avatar-logo-img"
              />
            </div>

            {/* VIEW 1: REGISTRATION FORM */}
            {step === 'FORM' && (
              <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                <h1 className="auth-title">Create your TIA account</h1>
                <p className="auth-subtitle">Join India&apos;s leading platform for direct brand deals &amp; creator growth.</p>

                {/* Role Switcher Pill */}
                <div className="auth-role-tabs">
                  <button
                    type="button"
                    className={`auth-role-tab ${role === 'BRAND_ADMIN' ? 'active' : ''}`}
                    onClick={() => setRole('BRAND_ADMIN')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                    </svg>
                    <span>Brand / Agency</span>
                  </button>
                  <button
                    type="button"
                    className={`auth-role-tab ${role === 'CREATOR' ? 'active' : ''}`}
                    onClick={() => setRole('CREATOR')}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77L5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                    </svg>
                    <span>Creator / Talent</span>
                  </button>
                </div>

                {/* Social OAuth Buttons */}
                <div className="auth-social-stack">
                  <button
                    type="button"
                    onClick={() => handleSocialOAuth('google')}
                    className="auth-social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialOAuth('apple')}
                    className="auth-social-btn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.06 1.72-.93 2.74 1.01.08 2.02-.51 2.63-1.24z"/>
                    </svg>
                    <span>Continue with Apple</span>
                  </button>
                </div>

                <div className="auth-divider">
                  <span className="auth-divider-text">Or register with email</span>
                </div>

                {error && (
                  <div className="auth-error-box">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}

                <form onSubmit={handleRegisterSubmit} className="auth-form">
                  {/* Name */}
                  <div className="auth-input-group">
                    <label className="auth-label">{role === 'BRAND_ADMIN' ? 'Brand / Organization Name' : 'Full Legal Name'}</label>
                    <input
                      type="text"
                      required
                      placeholder={role === 'BRAND_ADMIN' ? 'Acme Corp / Agency' : 'Your Legal Name'}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="auth-input"
                    />
                  </div>

                  {/* Demographics Row (Gender & Age) */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px', width: '100%' }}>
                    <div>
                      <label className="auth-label">Gender</label>
                      <select
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="auth-input"
                        style={{ height: '42px', padding: '0 12px', background: '#F8FAFC' }}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Non-Binary">Non-Binary</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>

                    <div>
                      <label className="auth-label">Age (18+)</label>
                      <input
                        type="number"
                        min="18"
                        max="100"
                        required
                        placeholder="24"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="auth-input"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="auth-input-group">
                    <label className="auth-label">{role === 'BRAND_ADMIN' ? 'Work Email' : 'Personal / Management Email'}</label>
                    <input
                      type="email"
                      required
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="auth-input"
                    />
                  </div>

                  {/* Password */}
                  <div className="auth-input-group">
                    <label className="auth-label">Create Secure Password</label>
                    <input
                      type="password"
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="auth-input"
                    />
                  </div>

                  {/* Terms Checkbox */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                    <input
                      type="checkbox"
                      id="terms-check"
                      checked={agreedTerms}
                      onChange={(e) => setAgreedTerms(e.target.checked)}
                      style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#0052FF' }}
                    />
                    <label htmlFor="terms-check" style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45, cursor: 'pointer' }}>
                      I confirm I am at least 18 years old and agree to TIA <Link href="/terms" style={{ color: '#0052FF', fontWeight: 600 }}>Terms of Service</Link> &amp; <Link href="/privacy" style={{ color: '#0052FF', fontWeight: 600 }}>Privacy Policy</Link>.
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="auth-submit-btn"
                  >
                    {loading ? 'Creating Account...' : `Register as ${role === 'BRAND_ADMIN' ? 'Brand / Agency' : 'Verified Creator'}`}
                  </button>
                </form>
              </div>
            )}

            {/* VIEW 2: CONNECT SOCIAL ACCOUNTS (SKIPPABLE) */}
            {step === 'SOCIAL_CONNECT' && (
              <div style={{ width: '100%', animation: 'fadeIn 0.25s ease' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '11px', color: '#059669', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: '#ECFDF5', border: '1px solid #A7F3D0', padding: '4px 12px', borderRadius: '9999px' }}>
                    Account Created Successfully
                  </span>
                </div>

                <h1 className="auth-title">Connect your social channels</h1>
                <p className="auth-subtitle">
                  {role === 'CREATOR'
                    ? 'Connect your accounts to verify audience metrics and get matched with top brands.'
                    : 'Connect your brand social profiles for campaign tracking and audience alignment.'}
                </p>

                {/* Social Connect Stack */}
                <div className="auth-social-connect-stack">
                  {/* Instagram */}
                  <div className="auth-social-tile">
                    <div className="auth-social-info">
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                        </svg>
                      </div>
                      <div>
                        <div className="auth-social-name">Instagram</div>
                        <div className="auth-social-subtitle">{connectedSocials['instagram'] ? 'Connected' : 'Audience & Engagement'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="auth-social-action-btn"
                      onClick={() => handleConnectSocial('instagram')}
                      style={connectedSocials['instagram'] ? { background: '#ECFDF5', borderColor: '#10B981', color: '#059669' } : {}}
                    >
                      {connectedSocials['instagram'] ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>

                  {/* YouTube */}
                  <div className="auth-social-tile">
                    <div className="auth-social-info">
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="auth-social-name">YouTube</div>
                        <div className="auth-social-subtitle">{connectedSocials['youtube'] ? 'Connected' : 'Subscriber & Watch Time'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="auth-social-action-btn"
                      onClick={() => handleConnectSocial('youtube')}
                      style={connectedSocials['youtube'] ? { background: '#ECFDF5', borderColor: '#10B981', color: '#059669' } : {}}
                    >
                      {connectedSocials['youtube'] ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>

                  {/* TikTok */}
                  <div className="auth-social-tile">
                    <div className="auth-social-info">
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47A6.29 6.29 0 0 0 15.82 16V9.13a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.56z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="auth-social-name">TikTok</div>
                        <div className="auth-social-subtitle">{connectedSocials['tiktok'] ? 'Connected' : 'Video Reach & Views'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="auth-social-action-btn"
                      onClick={() => handleConnectSocial('tiktok')}
                      style={connectedSocials['tiktok'] ? { background: '#ECFDF5', borderColor: '#10B981', color: '#059669' } : {}}
                    >
                      {connectedSocials['tiktok'] ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>

                  {/* X (Twitter) */}
                  <div className="auth-social-tile">
                    <div className="auth-social-info">
                      <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                        </svg>
                      </div>
                      <div>
                        <div className="auth-social-name">X (Twitter)</div>
                        <div className="auth-social-subtitle">{connectedSocials['twitter'] ? 'Connected' : 'Impressions & Reposts'}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="auth-social-action-btn"
                      onClick={() => handleConnectSocial('twitter')}
                      style={connectedSocials['twitter'] ? { background: '#ECFDF5', borderColor: '#10B981', color: '#059669' } : {}}
                    >
                      {connectedSocials['twitter'] ? 'Connected ✓' : 'Connect'}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleFinish}
                  className="auth-submit-btn"
                >
                  Complete Setup &amp; Go to Dashboard →
                </button>

                <div style={{ textAlign: 'center' }}>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="auth-skip-btn"
                  >
                    Skip for Now
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <span>© 2026 The Influencer&apos;s Agency • India&apos;s Verified Network</span>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link href="/legal" style={{ color: '#64748B', textDecoration: 'none' }}>Legal</Link>
              <Link href="/pricing" style={{ color: '#64748B', textDecoration: 'none' }}>Pricing</Link>
              <span className="auth-lang" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
                <span>ENG</span>
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC ANIMATED SHOWCASE PANE */}
        <div className="auth-showcase-pane">
          {/* Animated Atmospheric Background Layers */}
          <div className="auth-ambient-grid" />
          <div className="auth-glow-orb orb-1" />
          <div className="auth-glow-orb orb-2" />
          <div className="auth-glow-orb orb-3" />

          <div className="auth-showcase-content" key={role} style={{ animation: 'fadeIn 0.3s ease' }}>
            {role === 'CREATOR' ? (
              <>
                <h2 className="auth-showcase-title">
                  <span>Monetize Your Influence.</span><br />
                  <span style={{ color: '#0052FF', fontWeight: 500 }}>Land High-Paying Deals.</span>
                </h2>
                <p className="auth-showcase-desc">
                  Direct collaborations with verified premium brands, guaranteed milestone payouts, and automated contracts with only a 5% fee.
                </p>
              </>
            ) : (
              <>
                <h2 className="auth-showcase-title">
                  <span>Discover Top Creators.</span><br />
                  <span style={{ color: '#0052FF', fontWeight: 500 }}>Execute Protected Deals.</span>
                </h2>
                <p className="auth-showcase-desc">
                  Direct brand collaborations, audited audience insights, and smart milestone contracts with a flat 5% platform fee.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', color: '#64748B' }}>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
