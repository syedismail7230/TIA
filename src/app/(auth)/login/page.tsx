'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FirebaseAuthService } from '@/lib/services/firebase-auth.service';
import { setupRecaptcha, sendPhoneOtp } from '@/lib/firebase/config';
import { ConfirmationResult } from 'firebase/auth';

export default function LoginPage() {
  const router = useRouter();

  // Auth Mode: 'EMAIL' | 'PHONE'
  const [authMode, setAuthMode] = useState<'EMAIL' | 'PHONE'>('EMAIL');

  // Email/Password State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Phone OTP State
  const [phoneStep, setPhoneStep] = useState<'PHONE_INPUT' | 'OTP_INPUT'>('PHONE_INPUT');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [resendTimer, setResendTimer] = useState(60);

  // Status & Loading State
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend Timer Countdown
  useEffect(() => {
    if (authMode !== 'PHONE' || phoneStep !== 'OTP_INPUT' || resendTimer <= 0) return;
    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [authMode, phoneStep, resendTimer]);

  const handleRouteRedirect = (role: string) => {
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
  };

  /**
   * Email / Password Login Submit
   */
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      // 1. Firebase Auth Attempt
      let firebaseUser = null;
      try {
        firebaseUser = await FirebaseAuthService.signInWithEmail(email, password);
      } catch (fbErr: any) {
        console.log('Firebase signIn note:', fbErr.message);
      }

      // 2. Server Session Login
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
      handleRouteRedirect(role);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Google 1-Click Popup Sign In
   */
  const handleGoogleSignIn = async () => {
    setError('');
    setSuccessMsg('');
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

      handleRouteRedirect(user.role || 'CREATOR');
    } catch (err: any) {
      console.error('Google Sign In Error:', err);
      setError(err.message || 'Google sign-in was cancelled.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Phone Step 1: Send SMS OTP
   */
  const handleSendPhoneOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setError('Please enter a valid mobile phone number.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${cleanPhone}`;

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('');

      const verifier = setupRecaptcha('firebase-phone-recaptcha-container');
      const confirmation = await sendPhoneOtp(fullPhoneNumber, verifier);
      setConfirmationResult(confirmation);
      setPhoneStep('OTP_INPUT');
      setResendTimer(60);
      setSuccessMsg(`SMS verification code dispatched to ${countryCode} ${phoneNumber}`);

      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 150);
    } catch (err: any) {
      console.error('Firebase Phone OTP Error:', err);
      setError(err.message || 'Failed to dispatch SMS OTP. Please verify your phone number.');
    } finally {
      setLoading(false);
    }
  };

  /**
   * Phone OTP Digit Typing
   */
  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted.length === 6) {
        const newDigits = pasted.split('');
        setOtpDigits(newDigits);
        otpInputRefs.current[5]?.focus();
        handleVerifyPhoneCode(pasted);
        return;
      }
    }

    const char = value.slice(-1).replace(/\D/g, '');
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && char) {
      const fullCode = newDigits.join('');
      if (fullCode.length === 6) {
        handleVerifyPhoneCode(fullCode);
      }
    }
  };

  const handleDigitKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  /**
   * Phone Step 2: Verify SMS OTP
   */
  const handleVerifyPhoneCode = async (codeToVerify?: string) => {
    if (!confirmationResult) {
      setError('Verification session expired. Please request a new code.');
      return;
    }

    const code = codeToVerify || otpDigits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the SMS verification code.');
      return;
    }

    try {
      setLoading(true);
      setError('');
      setSuccessMsg('Verifying SMS code...');

      const user = await FirebaseAuthService.verifyPhoneOtp(confirmationResult, code, 'CREATOR');

      // Establish server session cookie
      await fetch('/api/auth/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          uid: user.uid,
          phoneNumber: user.phoneNumber || `${countryCode}${phoneNumber}`,
          displayName: user.displayName,
          role: user.role || 'CREATOR',
        }),
      });

      setSuccessMsg('Verification successful! Redirecting...');
      setTimeout(() => {
        handleRouteRedirect(user.role || 'CREATOR');
      }, 600);
    } catch (err: any) {
      console.error('Verify Phone Code Error:', err);
      setError(err.message || 'Incorrect or expired SMS verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-viewport">
      {/* Invisible Recaptcha Container for Firebase */}
      <div id="firebase-phone-recaptcha-container" />

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
            <p className="auth-subtitle">
              {authMode === 'EMAIL'
                ? 'Sign in to manage your creator deals, campaigns & deliverables.'
                : 'Enter your phone number to sign in instantly via SMS OTP.'}
            </p>

            {/* Error Message Box */}
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

            {/* Success Message Box */}
            {successMsg && (
              <div style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 16px',
                background: '#ECFDF5',
                border: '1px solid #A7F3D0',
                borderRadius: '12px',
                color: '#065F46',
                fontSize: '13px',
                marginBottom: '16px',
                boxSizing: 'border-box',
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{successMsg}</span>
              </div>
            )}

            {/* ===================================================
                MODE 1: EMAIL & PASSWORD LOGIN
               =================================================== */}
            {authMode === 'EMAIL' && (
              <div style={{ width: '100%' }}>
                {/* Social & Phone 1-Click Buttons */}
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
                    onClick={() => {
                      setError('');
                      setSuccessMsg('');
                      setAuthMode('PHONE');
                      setPhoneStep('PHONE_INPUT');
                    }}
                    disabled={loading}
                    className="auth-social-btn"
                    style={{
                      borderColor: '#10B981',
                      background: '#F0FDF4',
                      color: '#065F46',
                    }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    <span style={{ fontWeight: 600 }}>Continue with Phone OTP</span>
                  </button>
                </div>

                <div className="auth-divider">
                  <span className="auth-divider-text">Or sign in with email</span>
                </div>

                {/* Email Form */}
                <form onSubmit={handleEmailSubmit} className="auth-form">
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
            )}

            {/* ===================================================
                MODE 2: INLINE PHONE OTP LOGIN
               =================================================== */}
            {authMode === 'PHONE' && (
              <div style={{ width: '100%', animation: 'fadeIn 0.2s ease-out' }}>
                {/* Back to Email Pill */}
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setSuccessMsg('');
                    setAuthMode('EMAIL');
                  }}
                  style={{
                    background: '#F1F5F9',
                    border: '1px solid #E2E8F0',
                    borderRadius: '8px',
                    padding: '6px 12px',
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#475569',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    marginBottom: '16px',
                    cursor: 'pointer',
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  <span>Back to Email Sign In</span>
                </button>

                {/* STEP 1: Enter Phone Number */}
                {phoneStep === 'PHONE_INPUT' && (
                  <form onSubmit={handleSendPhoneOtp} className="auth-form">
                    <div className="auth-input-group">
                      <label className="auth-label">Mobile Phone Number</label>
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <select
                          value={countryCode}
                          onChange={(e) => setCountryCode(e.target.value)}
                          className="auth-phone-code"
                          style={{
                            width: '105px',
                            minWidth: '105px',
                            background: '#F8FAFC',
                            border: '1px solid #CBD5E1',
                            borderRadius: '12px',
                            padding: '12px 8px',
                            fontSize: '13.5px',
                            fontWeight: 600,
                            color: '#0F172A',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="+91">🇮🇳 +91</option>
                          <option value="+1">🇺🇸 +1</option>
                          <option value="+44">🇬🇧 +44</option>
                          <option value="+971">🇦🇪 +971</option>
                          <option value="+65">🇸🇬 +65</option>
                          <option value="+61">🇦🇺 +61</option>
                        </select>

                        <input
                          type="tel"
                          required
                          placeholder="98765 43210"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          disabled={loading}
                          className="auth-input"
                          style={{ flex: 1 }}
                          autoFocus
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading || phoneNumber.trim().length < 6}
                      className="auth-submit-btn"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      {loading ? (
                        <span className="auth-btn-loader">
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending SMS OTP...
                        </span>
                      ) : (
                        'Send Verification Code →'
                      )}
                    </button>
                  </form>
                )}

                {/* STEP 2: Enter 6-Digit SMS OTP Code */}
                {phoneStep === 'OTP_INPUT' && (
                  <div style={{ width: '100%' }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'center',
                      gap: '8px',
                      marginBottom: '20px',
                      marginTop: '4px',
                    }}>
                      {otpDigits.map((digit, index) => (
                        <input
                          key={index}
                          ref={(el) => {
                            otpInputRefs.current[index] = el;
                          }}
                          type="text"
                          inputMode="numeric"
                          maxLength={6}
                          value={digit}
                          disabled={loading}
                          onChange={(e) => handleDigitChange(index, e.target.value)}
                          onKeyDown={(e) => handleDigitKeyDown(index, e)}
                          style={{
                            width: '46px',
                            height: '52px',
                            textAlign: 'center',
                            fontSize: '22px',
                            fontWeight: 700,
                            background: '#F8FAFC',
                            border: '1.5px solid #CBD5E1',
                            borderRadius: '12px',
                            color: '#0F172A',
                            outline: 'none',
                            transition: 'all 0.15s ease',
                          }}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      disabled={loading || otpDigits.join('').length !== 6}
                      onClick={() => handleVerifyPhoneCode()}
                      className="auth-submit-btn"
                      style={{
                        background: 'linear-gradient(135deg, #10B981, #059669)',
                        boxShadow: '0 4px 14px rgba(16, 185, 129, 0.3)',
                      }}
                    >
                      {loading ? (
                        <span className="auth-btn-loader">
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Verifying Code...
                        </span>
                      ) : (
                        'Verify & Sign In →'
                      )}
                    </button>

                    {/* Resend Actions */}
                    <div style={{
                      marginTop: '16px',
                      textAlign: 'center',
                      fontSize: '12.5px',
                      color: '#64748B',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                    }}>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneStep('PHONE_INPUT');
                          setOtpDigits(['', '', '', '', '', '']);
                          setError('');
                        }}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#64748B',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                          fontSize: '12.5px',
                        }}
                      >
                        Change Number
                      </button>
                      <span>•</span>
                      {resendTimer > 0 ? (
                        <span style={{ color: '#94A3B8', fontFamily: 'monospace' }}>Resend in {resendTimer}s</span>
                      ) : (
                        <button
                          type="button"
                          disabled={loading}
                          onClick={() => handleSendPhoneOtp()}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#10B981',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '12.5px',
                          }}
                        >
                          Resend SMS Code
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
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
