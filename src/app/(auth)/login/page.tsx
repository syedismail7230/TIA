'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PhoneOtpModal } from '@/components/auth/PhoneOtpModal';
import { FirebaseAuthService } from '@/lib/services/firebase-auth.service';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // 1. Try Firebase Auth
      let firebaseUser = null;
      try {
        firebaseUser = await FirebaseAuthService.signInWithEmail(email, password);
      } catch (fbErr: any) {
        console.log('Firebase signIn note:', fbErr.message);
      }

      // 2. Local Backend Login
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok && !firebaseUser) {
        throw new Error(data.error || 'Failed to sign in');
      }

      const role = data?.user?.role || firebaseUser?.role || 'CREATOR';
      if (role === 'CREATOR') {
        router.push('/creator');
      } else if (role.startsWith('BRAND_')) {
        router.push('/brand');
      } else if (role.startsWith('TIA_')) {
        router.push('/admin');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setLoading(true);
    try {
      const user = await FirebaseAuthService.signInWithGoogle('CREATOR');

      // Establish server session cookie
      await fetch('/api/auth/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber || user.email,
          displayName: user.displayName,
          role: user.role || 'CREATOR',
        }),
      });

      if (user.role === 'CREATOR') {
        router.push('/creator');
      } else if (user.role.startsWith('BRAND_')) {
        router.push('/brand');
      } else {
        router.push('/');
      }
      router.refresh();
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Google sign-in cancelled or failed.');
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneSuccess = async (user: any) => {
    setPhoneModalOpen(false);
    try {
      // Establish server session cookie
      await fetch('/api/auth/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber || user.email,
          displayName: user.displayName,
          role: user.role || 'CREATOR',
        }),
      });
    } catch (e) {
      console.warn('Session sync note:', e);
    }

    if (user.role === 'CREATOR') {
      router.push('/creator');
    } else if (user.role.startsWith('BRAND_')) {
      router.push('/brand');
    } else {
      router.push('/');
    }
    router.refresh();
  };

  return (
    <div className="auth-viewport">
      {/* Firebase Phone OTP Modal */}
      <PhoneOtpModal
        isOpen={phoneModalOpen}
        role="CREATOR"
        onSuccess={handlePhoneSuccess}
        onClose={() => setPhoneModalOpen(false)}
      />

      <div className="auth-card">
        {/* LEFT COLUMN: LOGIN FORM */}
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
              <span>Don&apos;t have an account?</span>
              <Link href="/register" className="auth-switch-btn">Sign up</Link>
            </div>
          </div>

          {/* Body Content */}
          <div className="auth-body">
            <div className="auth-avatar-icon">
              <img
                src="/main-logo-cropped.png"
                alt="The Influencer's Agency"
                className="auth-avatar-logo-img"
              />
            </div>

            <h1 className="auth-title">Welcome back to TIA</h1>
            <p className="auth-subtitle">Sign in to manage your creator deals, campaigns &amp; deliverables.</p>

            {/* Social & Phone Auth Buttons */}
            <div className="auth-social-stack">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={loading}
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
                onClick={() => setPhoneModalOpen(true)}
                disabled={loading}
                className="auth-social-btn"
                style={{ borderColor: 'rgba(16, 185, 129, 0.4)', background: 'rgba(16, 185, 129, 0.05)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span style={{ color: '#10b981', fontWeight: 600 }}>Continue with Phone OTP</span>
              </button>
            </div>

            <div className="auth-divider">
              <span className="auth-divider-text">Or sign in with email</span>
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
                <label className="auth-label">Business / Personal Email</label>
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <label className="auth-label">Password</label>
                  <Link href="/privacy" style={{ fontSize: '11.5px', color: '#0052FF', textDecoration: 'none', fontWeight: 600 }}>Forgot password?</Link>
                </div>
                <div className="auth-password-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="auth-input"
                    style={{ paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-password-toggle-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="auth-submit-btn"
              >
                {loading ? (
                  <span className="auth-btn-loader">
                    <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Sign In to Dashboard →'
                )}
              </button>
            </form>
          </div>

          {/* Footer Links */}
          <div className="auth-footer">
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

        {/* RIGHT COLUMN: DYNAMIC ANIMATED SHOWCASE PANE */}
        <div className="auth-showcase-pane">
          {/* Animated Atmospheric Background Layers */}
          <div className="auth-ambient-grid" />
          <div className="auth-glow-orb orb-1" />
          <div className="auth-glow-orb orb-2" />
          <div className="auth-glow-orb orb-3" />

          <div className="auth-showcase-content" style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 className="auth-showcase-title">
              <span>The Intelligence Operating System</span><br />
              <span style={{ color: '#0052FF', fontWeight: 600 }}>for Modern Creators & Brands.</span>
            </h2>
            <p className="auth-showcase-desc">
              100% Payment Protection, 72h deliverable review SLAs, automated 5% commission settlement, and verified audience demographics across 500,000+ creators.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
