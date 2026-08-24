'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Technology & Software');
  const [country, setCountry] = useState('India');
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
        body: JSON.stringify({
          name,
          email,
          password,
          role,
          country,
          organizationName: role === 'BRAND_ADMIN' ? organizationName : undefined,
          businessCategory: role === 'BRAND_ADMIN' ? businessCategory : undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      if (role === 'CREATOR') {
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
    <div className="auth-viewport">
      <div className="auth-card">
        {/* LEFT COLUMN: REGISTRATION FORM */}
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

          {/* Body Content */}
          <div className="auth-body">
            <div className="auth-avatar-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <h1 className="auth-title">Create your account</h1>
            <p className="auth-subtitle">Join top verified creators and enterprise brands worldwide.</p>

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

            {/* Role Switcher */}
            <div className="auth-role-tabs">
              <button
                type="button"
                onClick={() => setRole('CREATOR')}
                className={`auth-role-tab ${role === 'CREATOR' ? 'active' : ''}`}
              >
                Creator & Influencer
              </button>
              <button
                type="button"
                onClick={() => setRole('BRAND_ADMIN')}
                className={`auth-role-tab ${role === 'BRAND_ADMIN' ? 'active' : ''}`}
              >
                Brand & Agency
              </button>
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="auth-input-group">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="auth-input"
                />
              </div>

              <div className="auth-input-group">
                <input
                  type="password"
                  required
                  placeholder="Create password (min 8 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input"
                />
              </div>

              {role === 'BRAND_ADMIN' && (
                <>
                  <div className="auth-input-group">
                    <input
                      type="text"
                      required
                      placeholder="Company / Brand Name"
                      value={organizationName}
                      onChange={(e) => setOrganizationName(e.target.value)}
                      className="auth-input"
                    />
                  </div>

                  <div className="auth-input-group">
                    <select
                      value={businessCategory}
                      onChange={(e) => setBusinessCategory(e.target.value)}
                      className="auth-input"
                    >
                      <option value="Technology & Software">Technology & Software</option>
                      <option value="Fashion & Apparel">Fashion & Apparel</option>
                      <option value="Beauty & Cosmetics">Beauty & Cosmetics</option>
                      <option value="Fitness & Health">Fitness & Health</option>
                      <option value="Food & Beverage">Food & Beverage</option>
                      <option value="Gaming & Esports">Gaming & Esports</option>
                      <option value="Travel & Hospitality">Travel & Hospitality</option>
                    </select>
                  </div>
                </>
              )}

              <button
                type="submit"
                disabled={loading}
                className="auth-submit-btn"
              >
                {loading ? 'Creating Account...' : 'Sign up with Email'}
              </button>
            </form>

            <div className="auth-disclaimer">
              By continuing, you acknowledge TIA <Link href="/privacy">Privacy Policy</Link> and <Link href="/terms">Terms of Service</Link>.
            </div>
          </div>

          {/* Footer */}
          <div className="auth-footer">
            <span>© 2026 The Influencer&apos;s Agency</span>
            <span className="auth-lang">🌐 ENG ▾</span>
          </div>
        </div>

        {/* RIGHT COLUMN: VISUAL HERO & SHOWCASE */}
        <div className="auth-showcase-pane">
          <div className="auth-showcase-content">
            <h2 className="auth-showcase-title">
              Build, Contract &amp; Scale<br />Influencer Partnerships
            </h2>
            <p className="auth-showcase-desc">
              Manage every creator partnership, bilateral legal contract, and 5% escrow settlement from one intelligent platform built for modern enterprises.
            </p>
          </div>

          {/* 3D Glass Artwork Stack */}
          <div className="auth-3d-scene">
            <div className="auth-3d-glass-grid">
              <div className="glass-tile t1" />
              <div className="glass-tile t2" />
              <div className="glass-tile t3">
                <div className="glass-badge-glow">
                  <div className="glass-badge-inner">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="white" />
                    </svg>
                  </div>
                </div>
              </div>
              <div className="glass-tile t4" />
              <div className="glass-tile t5" />
            </div>
          </div>

          {/* Live Floating Status Indicators */}
          <div className="auth-floating-pills">
            <div className="auth-live-pill pill-active">
              <div className="pill-dot-wrapper">
                <div className="pill-dot pulse-orange" />
              </div>
              <div className="pill-text">
                Verify audience metrics &amp; engagement authenticity
              </div>
              <div className="pill-status orange">Working... <span className="status-dot">●</span></div>
            </div>

            <div className="auth-live-pill pill-success">
              <div className="pill-dot-wrapper">
                <div className="pill-dot static-green" />
              </div>
              <div className="pill-text">
                Bilateral contract eSigned &amp; 5% escrow funded
              </div>
              <div className="pill-status green">Done <span className="status-dot">●</span></div>
            </div>

            <div className="auth-live-pill pill-subtle">
              <div className="pill-dot-wrapper">
                <div className="pill-dot static-blue" />
              </div>
              <div className="pill-text">
                Milestone approved &amp; net 95% payout dispatched
              </div>
              <div className="pill-status green">Done <span className="status-dot">●</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div style={{ padding: '60px', textAlign: 'center' }}>Loading Registration...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
