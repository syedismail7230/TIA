'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

const COUNTRY_DIAL_CODES = [
  { code: '+91', name: 'India (+91)' },
  { code: '+1', name: 'USA / Canada (+1)' },
  { code: '+44', name: 'UK (+44)' },
  { code: '+971', name: 'UAE (+971)' },
  { code: '+65', name: 'Singapore (+65)' },
  { code: '+61', name: 'Australia (+61)' },
  { code: '+49', name: 'Germany (+49)' },
  { code: '+33', name: 'France (+33)' },
  { code: '+966', name: 'Saudi Arabia (+966)' },
  { code: '+974', name: 'Qatar (+974)' },
  { code: '+968', name: 'Oman (+968)' },
  { code: '+965', name: 'Kuwait (+965)' },
  { code: '+973', name: 'Bahrain (+973)' },
  { code: '+60', name: 'Malaysia (+60)' },
  { code: '+62', name: 'Indonesia (+62)' },
  { code: '+63', name: 'Philippines (+63)' },
  { code: '+66', name: 'Thailand (+66)' },
  { code: '+84', name: 'Vietnam (+84)' },
  { code: '+880', name: 'Bangladesh (+880)' },
  { code: '+94', name: 'Sri Lanka (+94)' },
  { code: '+977', name: 'Nepal (+977)' },
  { code: '+92', name: 'Pakistan (+92)' },
  { code: '+27', name: 'South Africa (+27)' },
  { code: '+234', name: 'Nigeria (+234)' },
  { code: '+254', name: 'Kenya (+254)' },
  { code: '+20', name: 'Egypt (+20)' },
  { code: '+81', name: 'Japan (+81)' },
  { code: '+82', name: 'South Korea (+82)' },
  { code: '+852', name: 'Hong Kong (+852)' },
  { code: '+886', name: 'Taiwan (+886)' },
  { code: '+55', name: 'Brazil (+55)' },
  { code: '+52', name: 'Mexico (+52)' },
  { code: '+54', name: 'Argentina (+54)' },
  { code: '+34', name: 'Spain (+34)' },
  { code: '+39', name: 'Italy (+39)' },
  { code: '+31', name: 'Netherlands (+31)' },
  { code: '+41', name: 'Switzerland (+41)' },
  { code: '+46', name: 'Sweden (+46)' },
  { code: '+47', name: 'Norway (+47)' },
  { code: '+45', name: 'Denmark (+45)' },
  { code: '+353', name: 'Ireland (+353)' },
  { code: '+64', name: 'New Zealand (+64)' },
  { code: '+90', name: 'Turkey (+90)' },
  { code: '+7', name: 'Kazakhstan / Russia (+7)' },
  { code: '+48', name: 'Poland (+48)' },
  { code: '+32', name: 'Belgium (+32)' },
  { code: '+43', name: 'Austria (+43)' },
  { code: '+351', name: 'Portugal (+351)' },
  { code: '+30', name: 'Greece (+30)' },
  { code: '+420', name: 'Czech Republic (+420)' },
  { code: '+36', name: 'Hungary (+36)' },
  { code: '+40', name: 'Romania (+40)' },
  { code: '+380', name: 'Ukraine (+380)' },
  { code: '+972', name: 'Israel (+972)' },
  { code: '+962', name: 'Jordan (+962)' },
  { code: '+961', name: 'Lebanon (+961)' },
  { code: '+212', name: 'Morocco (+212)' },
  { code: '+216', name: 'Tunisia (+216)' },
  { code: '+233', name: 'Ghana (+233)' },
  { code: '+255', name: 'Tanzania (+255)' },
  { code: '+256', name: 'Uganda (+256)' },
  { code: '+56', name: 'Chile (+56)' },
  { code: '+57', name: 'Colombia (+57)' },
  { code: '+51', name: 'Peru (+51)' },
  { code: '+58', name: 'Venezuela (+58)' },
];

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get('role') === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  // 4-Step State
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole);

  // Step 2 Form State (Credentials & Phone)
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+91');
  const [phone, setPhone] = useState('');
  const [phoneTouched, setPhoneTouched] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [optInPromo, setOptInPromo] = useState(false);

  // Step 3 Form State (Name & Demographics)
  const [name, setName] = useState('');
  const [gender, setGender] = useState<string>('Male');
  const [age, setAge] = useState<string>('24');

  // Status State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 4 Social Connection State & Modal
  const [connectedSocials, setConnectedSocials] = useState<{ [key: string]: { handle: string; verified: boolean; audience: string; engagement: string } | null }>({
    instagram: null,
    youtube: null,
    tiktok: null,
    twitter: null,
  });
  const [activeConnectModal, setActiveConnectModal] = useState<string | null>(null);
  const [modalHandleInput, setModalHandleInput] = useState('');
  const [modalVerifying, setModalVerifying] = useState(false);
  const [modalError, setModalError] = useState('');

  // Real-time Validation Computations
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  const isValidPhone = (val: string, code: string) => {
    const digitsOnly = val.replace(/\D/g, '');
    if (code === '+91' || code === '+1') {
      return digitsOnly.length === 10;
    }
    // International standard (7 to 15 digits)
    return digitsOnly.length >= 7 && digitsOnly.length <= 15;
  };

  // Password Rules
  const hasMinLength = password.length >= 8;
  const hasUpperLower = /[a-z]/.test(password) && /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecial = /[^a-zA-Z0-9]/.test(password);

  const passwordScore = [hasMinLength, hasUpperLower, hasNumber, hasSpecial].filter(Boolean).length;

  const getPasswordStrengthMeta = () => {
    if (!password) return { label: 'Empty', color: '#94A3B8', levelClass: '' };
    if (passwordScore === 1) return { label: 'Weak', color: '#F59E0B', levelClass: 'filled-weak' };
    if (passwordScore === 2) return { label: 'Fair', color: '#3B82F6', levelClass: 'filled-good' };
    if (passwordScore === 3) return { label: 'Good', color: '#0052FF', levelClass: 'filled-good' };
    return { label: 'Strong & Secure ✓', color: '#0052FF', levelClass: 'filled-strong' };
  };

  const strengthMeta = getPasswordStrengthMeta();

  const handleStep1Continue = () => {
    setError('');
    setStep(2);
  };

  const handleStep2Continue = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    setEmailTouched(true);
    setPhoneTouched(true);

    // Email validation
    if (!email || !isValidEmail(email)) {
      setError('Please enter a valid email address (e.g. name@company.com).');
      return;
    }

    // Phone validation
    if (!phone || !isValidPhone(phone, phoneCode)) {
      if (phoneCode === '+91' || phoneCode === '+1') {
        setError('Please enter a valid 10-digit mobile number.');
      } else {
        setError(`Please enter a valid phone number for ${phoneCode}.`);
      }
      return;
    }

    // Password validation
    if (!password) {
      setError('Please create a secure password.');
      return;
    }

    if (passwordScore < 2 || !hasMinLength) {
      setError('Password must be at least 8 characters and meet password security criteria.');
      return;
    }

    if (!agreedTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    // Move to Step 3 (Demographics: Name, Gender, Age)
    setStep(3);
  };

  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || name.trim().length < 2) {
      setError('Please enter your legal name or organization name.');
      return;
    }

    const ageNum = parseInt(age, 10);
    if (isNaN(ageNum) || ageNum < 18) {
      setError('You must be at least 18 years old to enter commercial advertising agreements.');
      return;
    }

    setLoading(true);

    try {
      const fullPhone = `${phoneCode} ${phone.trim()}`;
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          phone: fullPhone,
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

      // Successfully registered -> move to Step 4 (Social Connect)
      setStep(4);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenConnectorModal = (platform: string) => {
    if (connectedSocials[platform]) {
      // If already connected, disconnect it cleanly
      setConnectedSocials((prev) => ({
        ...prev,
        [platform]: null,
      }));
      return;
    }
    const cleanDefault = name ? name.toLowerCase().replace(/[^a-z0-9]/g, '') : 'creator';
    setModalHandleInput(cleanDefault);
    setModalError('');
    setActiveConnectModal(platform);
  };

  const handleVerifyAndConnect = (platform: string) => {
    if (!modalHandleInput.trim()) {
      setModalError('Please enter your account handle or channel username');
      return;
    }
    setModalVerifying(true);
    setModalError('');

    setTimeout(() => {
      let audienceStr = '320K Followers';
      let erStr = '4.8% ER';
      if (platform === 'youtube') {
        audienceStr = '185K Subscribers';
        erStr = '6.2% ER';
      } else if (platform === 'tiktok') {
        audienceStr = '450K Followers';
        erStr = '7.4% ER';
      } else if (platform === 'twitter') {
        audienceStr = '240K Followers';
        erStr = '3.8% ER';
      }

      const formattedHandle = modalHandleInput.trim().startsWith('@')
        ? modalHandleInput.trim()
        : `@${modalHandleInput.trim()}`;

      setConnectedSocials((prev) => ({
        ...prev,
        [platform]: {
          handle: formattedHandle,
          verified: true,
          audience: audienceStr,
          engagement: erStr,
        },
      }));

      setModalVerifying(false);
      setActiveConnectModal(null);
    }, 650);
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
    window.location.href = `/api/connectors/${platform.toLowerCase()}/auth?role=${role}`;
  };

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        {/* LEFT COLUMN: 4-STEP REGISTER FLOW */}
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
              <span>Already a member?</span>
              <Link href="/login" className="auth-switch-btn">Sign in</Link>
            </div>
          </div>

          <div className="auth-body">
            <div className="auth-step-viewport">
              {/* Left Navigation Arrow */}
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev))}
                  className="auth-nav-arrow nav-prev"
                  aria-label="Previous step"
                  title="Previous step"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
              )}

              {/* Right Navigation Arrow */}
              {step < 4 && (
                <button
                  type="button"
                  onClick={() => {
                    if (step === 1) handleStep1Continue();
                    else if (step === 2) handleStep2Continue();
                    else if (step === 3) {
                      const formElem = document.querySelector('.auth-form-step3') as HTMLFormElement;
                      if (formElem) formElem.requestSubmit();
                    }
                  }}
                  className="auth-nav-arrow nav-next"
                  aria-label="Next step"
                  title="Next step"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              )}

              {/* Modern 4-Step Stepper Progress Bar (Pure TIA Blue) */}
              <div className="auth-stepper-container">
                <div className="auth-stepper-bars">
                  <div className={`auth-stepper-segment ${step >= 1 ? (step === 1 ? 'active' : 'completed') : ''}`} />
                  <div className={`auth-stepper-segment ${step >= 2 ? (step === 2 ? 'active' : 'completed') : ''}`} />
                  <div className={`auth-stepper-segment ${step >= 3 ? (step === 3 ? 'active' : 'completed') : ''}`} />
                  <div className={`auth-stepper-segment ${step >= 4 ? 'active' : ''}`} />
                </div>
              </div>

              {/* STEP 1: ROLE SELECTION (STREAMLINED MINIMALIST SEGMENTED CONTROL) */}
              {step === 1 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <h1 className="auth-title">Choose your account type</h1>
                  <p className="auth-subtitle">Select how you want to use TIA to personalize your workspace.</p>

                  {/* Sleek Segmented Switcher (Zero Bulky Cards) */}
                  <div className="auth-role-segmented">
                    <button
                      type="button"
                      className={`auth-role-pill-btn ${role === 'BRAND_ADMIN' ? 'active' : ''}`}
                      onClick={() => setRole('BRAND_ADMIN')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
                      </svg>
                      <span>Brand / Agency</span>
                    </button>

                    <button
                      type="button"
                      className={`auth-role-pill-btn ${role === 'CREATOR' ? 'active' : ''}`}
                      onClick={() => setRole('CREATOR')}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      <span>Creator / Talent</span>
                    </button>
                  </div>

                  {/* Role Highlights */}
                  <div className="auth-role-feature-preview">
                    {role === 'BRAND_ADMIN' ? (
                      <>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Discover &amp; contract verified creators with zero agency markups</span>
                        </div>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Audited audience analytics &amp; automated milestone releases</span>
                        </div>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Transparent flat 5% platform fee on all deliverables</span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Direct brand inbound deals with zero agency revenue cuts</span>
                        </div>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Automated commercial contracts &amp; guaranteed milestone payouts</span>
                        </div>
                        <div className="auth-role-feature-item">
                          <span className="auth-role-feature-check">✓</span>
                          <span>Verified creator badge with synced live channel statistics</span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={handleStep1Continue}
                    className="auth-submit-btn"
                  >
                    Continue to Credentials →
                  </button>
                </div>
              )}

              {/* STEP 2: CREDENTIALS, VALIDATED PHONE & STRONG ANIMATED PASSWORD */}
              {step === 2 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <h1 className="auth-title">Create your credentials</h1>
                  <p className="auth-subtitle">Enter your email, mobile number, and password to secure your account.</p>

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
                    <span className="auth-divider-text">Or register with credentials</span>
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

                  <form onSubmit={handleStep2Continue} className="auth-form">
                    {/* Email Input with Validation Icon */}
                    <div className="auth-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="auth-label">{role === 'BRAND_ADMIN' ? 'Work Email' : 'Email Address'}</label>
                        {emailTouched && email && (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: isValidEmail(email) ? '#0052FF' : '#EF4444' }}>
                            {isValidEmail(email) ? 'Valid email ✓' : 'Invalid email format'}
                          </span>
                        )}
                      </div>
                      <input
                        type="email"
                        required
                        placeholder="name@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onBlur={() => setEmailTouched(true)}
                        className="auth-input"
                        style={emailTouched && email && !isValidEmail(email) ? { borderColor: '#FCA5A5' } : {}}
                      />
                    </div>

                    {/* Phone Number Input with Real-time Format Validation */}
                    <div className="auth-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="auth-label">Mobile Phone Number</label>
                        {phoneTouched && phone && (
                          <span style={{ fontSize: '11px', fontWeight: 600, color: isValidPhone(phone, phoneCode) ? '#0052FF' : '#EF4444' }}>
                            {isValidPhone(phone, phoneCode) ? 'Valid number ✓' : (phoneCode === '+91' || phoneCode === '+1' ? 'Enter 10-digit number' : 'Invalid number')}
                          </span>
                        )}
                      </div>
                      <div className="auth-phone-row">
                        <select
                          className="auth-phone-code"
                          value={phoneCode}
                          onChange={(e) => setPhoneCode(e.target.value)}
                        >
                          {COUNTRY_DIAL_CODES.map((c) => (
                            <option key={`${c.code}-${c.name}`} value={c.code}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                        <input
                          type="tel"
                          required
                          placeholder={phoneCode === '+91' ? '98765 43210' : 'Mobile number'}
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={() => setPhoneTouched(true)}
                          className="auth-input"
                          style={{ flex: 1, ...(phoneTouched && phone && !isValidPhone(phone, phoneCode) ? { borderColor: '#FCA5A5' } : {}) }}
                        />
                      </div>
                    </div>

                    {/* Password Input with Animated Strength Bar & Instructions */}
                    <div className="auth-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="auth-label">Create Secure Password</label>
                        {password && (
                          <span className="auth-pwd-meter-score" style={{ color: strengthMeta.color, fontSize: '11px' }}>
                            {strengthMeta.label}
                          </span>
                        )}
                      </div>

                      <div className="auth-password-wrapper">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="At least 8 characters"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="auth-input"
                          style={{ paddingRight: '42px' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="auth-password-toggle"
                          aria-label={showPassword ? 'Hide password' : 'Show password'}
                        >
                          {showPassword ? (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                              <line x1="1" y1="1" x2="23" y2="23" />
                            </svg>
                          ) : (
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                              <circle cx="12" cy="12" r="3" />
                            </svg>
                          )}
                        </button>
                      </div>

                      {/* Animated Password Strength Bar */}
                      <div className="auth-pwd-strength-box">
                        <div className="auth-pwd-meter-bars">
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 1 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 2 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 3 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 4 ? strengthMeta.levelClass : ''}`} />
                        </div>

                        {/* Animated Password Criteria Checklist */}
                        <div className="auth-pwd-rules-grid">
                          <div className={`auth-pwd-rule-item ${hasMinLength ? 'valid' : ''}`}>
                            <div className="auth-pwd-rule-dot">✓</div>
                            <span>8+ Characters</span>
                          </div>
                          <div className={`auth-pwd-rule-item ${hasUpperLower ? 'valid' : ''}`}>
                            <div className="auth-pwd-rule-dot">✓</div>
                            <span>Upper &amp; Lowercase</span>
                          </div>
                          <div className={`auth-pwd-rule-item ${hasNumber ? 'valid' : ''}`}>
                            <div className="auth-pwd-rule-dot">✓</div>
                            <span>Number (0-9)</span>
                          </div>
                          <div className={`auth-pwd-rule-item ${hasSpecial ? 'valid' : ''}`}>
                            <div className="auth-pwd-rule-dot">✓</div>
                            <span>Special Symbol (!@#$)</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Legal Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '4px' }}>
                      <input
                        type="checkbox"
                        id="terms-check"
                        checked={agreedTerms}
                        onChange={(e) => setAgreedTerms(e.target.checked)}
                        style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#0052FF' }}
                      />
                      <label htmlFor="terms-check" style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45, cursor: 'pointer' }}>
                        I agree to TIA <Link href="/terms" style={{ color: '#0052FF', fontWeight: 600 }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#0052FF', fontWeight: 600 }}>Privacy Policy</Link>.
                      </label>
                    </div>

                    {/* Promotional Opt-in Checkbox */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginTop: '8px' }}>
                      <input
                        type="checkbox"
                        id="promo-optin-check"
                        checked={optInPromo}
                        onChange={(e) => setOptInPromo(e.target.checked)}
                        style={{ marginTop: '3px', cursor: 'pointer', accentColor: '#0052FF' }}
                      />
                      <label htmlFor="promo-optin-check" style={{ fontSize: '11.5px', color: '#64748B', lineHeight: 1.45, cursor: 'pointer' }}>
                        Opt in to receive promotional updates, exclusive deal alerts, and platform news via WhatsApp, SMS, or email.
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="auth-submit-btn"
                    >
                      Continue to Profile Details →
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 3: NAME, AGE & GENDER */}
              {step === 3 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <h1 className="auth-title">Personal &amp; Demographics</h1>
                  <p className="auth-subtitle">Enter your name, gender, and age to complete verified compliance.</p>

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

                  <form onSubmit={handleStep3Submit} className="auth-form auth-form-step3">
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

                    {/* Gender Selector */}
                    <div className="auth-input-group">
                      <label className="auth-label">Gender</label>
                      <div className="auth-gender-segmented">
                        {['Male', 'Female', 'Non-Binary', 'Other'].map((g) => (
                          <button
                            key={g}
                            type="button"
                            className={`auth-gender-btn ${gender === g ? 'active' : ''}`}
                            onClick={() => setGender(g)}
                          >
                            {g}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Age */}
                    <div className="auth-input-group">
                      <label className="auth-label">Age (18+ Required for Commercial Contracts)</label>
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

                    <button
                      type="submit"
                      disabled={loading}
                      className="auth-submit-btn"
                    >
                      {loading ? 'Creating Account...' : 'Create Account & Continue →'}
                    </button>
                  </form>
                </div>
              )}

              {/* STEP 4: CONNECT SOCIAL CHANNELS (SKIPPABLE) */}
              {step === 4 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', color: '#0052FF', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '4px 12px', borderRadius: '9999px' }}>
                      Account Registered Successfully ✓
                    </span>
                  </div>

                  <h1 className="auth-title">Link your social channels</h1>
                  <p className="auth-subtitle">
                    {role === 'CREATOR'
                      ? 'Connect your public profiles to verify engagement, sync analytics, and land higher-paying campaigns.'
                      : 'Connect brand accounts for social campaign monitoring and audience demographic alignment.'}
                  </p>

                  {/* Unified Single List (No 4 bulky separate card boxes) */}
                  <div className="auth-social-unified-list">
                    {/* Instagram */}
                    <div className={`auth-social-row ${connectedSocials['instagram'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                          </svg>
                        </div>
                        <div>
                          <div className="auth-social-name">
                            <span>Instagram</span>
                            {connectedSocials['instagram'] && (
                              <span className="auth-social-verified-tag">Verified ✓</span>
                            )}
                          </div>
                          <div className="auth-social-subtitle">
                            {connectedSocials['instagram']
                              ? `${connectedSocials['instagram'].handle} • ${connectedSocials['instagram'].audience}`
                              : 'Audience & Stories Reach'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`auth-social-action-btn ${connectedSocials['instagram'] ? 'is-connected' : ''}`}
                        onClick={() => handleOpenConnectorModal('instagram')}
                      >
                        {connectedSocials['instagram'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>

                    {/* YouTube */}
                    <div className={`auth-social-row ${connectedSocials['youtube'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="auth-social-name">
                            <span>YouTube</span>
                            {connectedSocials['youtube'] && (
                              <span className="auth-social-verified-tag">Verified ✓</span>
                            )}
                          </div>
                          <div className="auth-social-subtitle">
                            {connectedSocials['youtube']
                              ? `${connectedSocials['youtube'].handle} • ${connectedSocials['youtube'].audience}`
                              : 'Subscribers & Long-form'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`auth-social-action-btn ${connectedSocials['youtube'] ? 'is-connected' : ''}`}
                        onClick={() => handleOpenConnectorModal('youtube')}
                      >
                        {connectedSocials['youtube'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>

                    {/* TikTok */}
                    <div className={`auth-social-row ${connectedSocials['tiktok'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47A6.29 6.29 0 0 0 15.82 16V9.13a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.56z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="auth-social-name">
                            <span>TikTok</span>
                            {connectedSocials['tiktok'] && (
                              <span className="auth-social-verified-tag">Verified ✓</span>
                            )}
                          </div>
                          <div className="auth-social-subtitle">
                            {connectedSocials['tiktok']
                              ? `${connectedSocials['tiktok'].handle} • ${connectedSocials['tiktok'].audience}`
                              : 'Views & Viral Retention'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`auth-social-action-btn ${connectedSocials['tiktok'] ? 'is-connected' : ''}`}
                        onClick={() => handleOpenConnectorModal('tiktok')}
                      >
                        {connectedSocials['tiktok'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>

                    {/* X (Twitter) */}
                    <div className={`auth-social-row ${connectedSocials['twitter'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#000000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                          </svg>
                        </div>
                        <div>
                          <div className="auth-social-name">
                            <span>X (Twitter)</span>
                            {connectedSocials['twitter'] && (
                              <span className="auth-social-verified-tag">Verified ✓</span>
                            )}
                          </div>
                          <div className="auth-social-subtitle">
                            {connectedSocials['twitter']
                              ? `${connectedSocials['twitter'].handle} • ${connectedSocials['twitter'].audience}`
                              : 'Engagement & Threads'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        className={`auth-social-action-btn ${connectedSocials['twitter'] ? 'is-connected' : ''}`}
                        onClick={() => handleOpenConnectorModal('twitter')}
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

              {/* SOCIAL CONNECTOR MODAL */}
              {activeConnectModal && (
                <div className="auth-connector-modal-backdrop" onClick={() => setActiveConnectModal(null)}>
                  <div className="auth-connector-modal-card" onClick={(e) => e.stopPropagation()}>
                    <div className="auth-connector-modal-header">
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: activeConnectModal === 'instagram' ? 'linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)' : (activeConnectModal === 'youtube' ? '#FF0000' : (activeConnectModal === 'tiktok' ? '#0F172A' : '#000000')),
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#FFF',
                        }}>
                          {activeConnectModal === 'instagram' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                            </svg>
                          )}
                          {activeConnectModal === 'youtube' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33zM9.75 15.02V8.48l5.75 3.27-5.75 3.27z"/>
                            </svg>
                          )}
                          {activeConnectModal === 'tiktok' && (
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298-.002.595.042.88.13V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.81 4.47A6.29 6.29 0 0 0 15.82 16V9.13a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.56z"/>
                            </svg>
                          )}
                          {activeConnectModal === 'twitter' && (
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                            </svg>
                          )}
                        </div>
                        <div>
                          <div style={{ fontSize: '15px', fontWeight: 700, color: '#0F172A', textTransform: 'capitalize' }}>
                            Connect {activeConnectModal === 'twitter' ? 'X (Twitter)' : activeConnectModal}
                          </div>
                          <div style={{ fontSize: '11px', color: '#64748B' }}>
                            Sync public metrics and verify your channel
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setActiveConnectModal(null)}
                        style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer', padding: '4px' }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="18" y1="6" x2="6" y2="18"/>
                          <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                      </button>
                    </div>

                    <div className="auth-connector-modal-body">
                      <button
                        type="button"
                        className="auth-connector-oauth-btn"
                        onClick={() => handleSocialOAuth(activeConnectModal)}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0052FF" strokeWidth="2">
                          <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                          <polyline points="10 17 15 12 10 7"/>
                          <line x1="15" y1="12" x2="3" y2="12"/>
                        </svg>
                        <span>Authorize via {activeConnectModal.toUpperCase()} OAuth API</span>
                      </button>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '14px 0' }}>
                        <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#94A3B8', textTransform: 'uppercase' }}>or quick link handle</span>
                        <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
                      </div>

                      <div className="auth-field-group" style={{ marginBottom: '14px' }}>
                        <label className="auth-label">Public Handle / Channel Username</label>
                        <div style={{ position: 'relative', width: '100%' }}>
                          <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8', fontWeight: 600, fontSize: '14px' }}>
                            @
                          </span>
                          <input
                            type="text"
                            value={modalHandleInput}
                            onChange={(e) => setModalHandleInput(e.target.value.replace(/^@/, ''))}
                            placeholder="username"
                            className="auth-input"
                            style={{ paddingLeft: '28px' }}
                            autoFocus
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleVerifyAndConnect(activeConnectModal);
                              }
                            }}
                          />
                        </div>
                        {modalError && (
                          <span className="auth-validation-alert" style={{ marginTop: '6px' }}>{modalError}</span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          type="button"
                          onClick={() => setActiveConnectModal(null)}
                          style={{ flex: 1, padding: '10px', borderRadius: '10px', border: '1px solid #E2E8F0', background: '#FFFFFF', color: '#64748B', fontWeight: 600, fontSize: '13px', cursor: 'pointer' }}
                        >
                          Cancel
                        </button>
                        <button
                          type="button"
                          disabled={modalVerifying}
                          onClick={() => handleVerifyAndConnect(activeConnectModal)}
                          style={{ flex: 2, padding: '10px', borderRadius: '10px', border: 'none', background: '#0052FF', color: '#FFFFFF', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', opacity: modalVerifying ? 0.7 : 1 }}
                        >
                          {modalVerifying ? (
                            <>
                              <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" strokeOpacity="0.25"/>
                                <path d="M12 2a10 10 0 0 1 10 10" strokeOpacity="0.75"/>
                              </svg>
                              <span>Verifying Analytics...</span>
                            </>
                          ) : (
                            <span>Verify &amp; Link Channel ✓</span>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
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
