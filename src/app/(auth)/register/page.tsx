'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, role }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      if (data.user.role === 'CREATOR') {
        router.push('/creator');
      } else {
        router.push('/brand');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (platform: string) => {
    window.location.href = `/api/connectors/${platform.toLowerCase()}/auth`;
  };

  return (
    <div className="auth-body">
      <div className="auth-avatar-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      </div>

      <h1 className="auth-title">Create your TIA account</h1>
      <p className="auth-subtitle">Join India&apos;s leading platform for direct brand deals &amp; creator growth.</p>

      {/* Account Type Toggle */}
      <div className="auth-role-tabs">
        <button
          type="button"
          className={`auth-role-tab ${role === 'BRAND_ADMIN' ? 'active' : ''}`}
          onClick={() => setRole('BRAND_ADMIN')}
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
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
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77L5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          <span>Creator / Talent</span>
        </button>
      </div>

      {/* Social Auth Buttons */}
      <div className="auth-social-stack">
        <button
          type="button"
          onClick={() => handleSocialAuth('google')}
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
          onClick={() => handleSocialAuth('apple')}
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

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="auth-form">
        <div className="auth-input-group">
          <label className="auth-label">{role === 'BRAND_ADMIN' ? 'Brand / Organization Name' : 'Creator Full Name'}</label>
          <input
            type="text"
            required
            placeholder={role === 'BRAND_ADMIN' ? 'Acme Corp / Agency' : 'Your Legal Name'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="auth-input"
          />
        </div>

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

        <button
          type="submit"
          disabled={loading}
          className="auth-submit-btn"
        >
          {loading ? 'Creating Account...' : `Register as ${role === 'BRAND_ADMIN' ? 'Brand / Agency' : 'Verified Creator'}`}
        </button>
      </form>

      <div className="auth-disclaimer">
        By creating an account, you agree to TIA <Link href="/terms">Terms of Service</Link> and <Link href="/privacy">Privacy Policy</Link>.
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="auth-viewport">
      <div className="auth-card">
        {/* LEFT COLUMN: REGISTER FORM */}
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
              <span>Already have an account?</span>
              <Link href="/login" className="auth-switch-btn">Sign in</Link>
            </div>
          </div>

          <Suspense fallback={<div style={{ padding: '40px', textAlign: 'center', color: '#64748B' }}>Loading...</div>}>
            <RegisterForm />
          </Suspense>

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

        {/* RIGHT COLUMN: PREMIUM EDITORIAL TIA SHOWCASE PANE */}
        <div className="auth-showcase-pane">
          {/* Top Headline & Trust Badge */}
          <div className="auth-showcase-content">
            <div className="tia-theme-badge">
              <span className="tia-badge-dot"></span>
              <span>VERIFIED BRAND-CREATOR NETWORK</span>
            </div>
            <h2 className="auth-showcase-title">
              Discover Top Creators.<br />
              <span style={{ color: '#0052FF' }}>Execute Protected Deals.</span>
            </h2>
            <p className="auth-showcase-desc">
              Direct brand collaborations, audited audience insights, and smart milestone contracts with a flat 5% platform fee.
            </p>
          </div>

          {/* Centerpiece: Real Creator Talent Asset with Floating Telemetry HUD */}
          <div className="tia-hero-visual-center">
            {/* Top Left Floating HUD Pill */}
            <div className="tia-hud-floating-top">
              <div className="tia-hud-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
                <span>Audience Verified</span>
              </div>
              <div className="tia-hud-subtitle">99.2% Authentic Demographics</div>
              <div className="tia-hud-stat-pill">
                <span className="tia-hud-stat">Reach: <strong>850K</strong></span>
                <span className="tia-hud-stat">Eng: <strong>4.9%</strong></span>
              </div>
            </div>

            {/* Creator Photo Cutout Asset */}
            <img
              src="/influencer-home.png"
              alt="TIA Verified Creator Talent"
              className="tia-creator-hero-img"
            />

            {/* Bottom Right Floating HUD Card */}
            <div className="tia-hud-floating-bottom">
              <div className="tia-hud-title">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                </svg>
                <span>Campaign #TIA-8920</span>
              </div>
              <div className="tia-hud-subtitle">Commercial License &bull; 5% Platform Fee</div>
              <div className="tia-hud-progress">
                <div className="tia-hud-progress-bar"></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '11px', color: '#64748B' }}>
                <span>Milestone 2 of 3</span>
                <span style={{ color: '#0052FF', fontWeight: 700 }}>In Review</span>
              </div>
            </div>
          </div>

          {/* Bottom Trust Stat Bar */}
          <div className="tia-auth-trust-row">
            <div className="tia-trust-stat">
              <div className="stat-num">5,000+</div>
              <div className="stat-label">Verified Creators</div>
            </div>
            <div className="tia-trust-divider" />
            <div className="tia-trust-stat">
              <div className="stat-num">₹15 Cr+</div>
              <div className="stat-label">Deals Facilitated</div>
            </div>
            <div className="tia-trust-divider" />
            <div className="tia-trust-stat">
              <div className="stat-num">5%</div>
              <div className="stat-label">Platform Fee</div>
            </div>
            <div className="tia-trust-divider" />
            <div className="tia-trust-stat">
              <div className="stat-num">100%</div>
              <div className="stat-label">Milestone Tracked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
