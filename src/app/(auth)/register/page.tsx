'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Building2, Sparkles, ArrowRight, ShieldCheck, Check, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { FirebaseAuthService } from '@/lib/services/firebase-auth.service';

function RegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get('role');
  const initialRole = roleParam === 'CREATOR' ? 'CREATOR' : 'BRAND_ADMIN';

  // Role & Step State (Starts directly on credentials step)
  const [role, setRole] = useState<'CREATOR' | 'BRAND_ADMIN'>(initialRole);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Sync role with searchParams if updated externally
  useEffect(() => {
    if (roleParam === 'CREATOR') setRole('CREATOR');
    else if (roleParam === 'BRAND_ADMIN') setRole('BRAND_ADMIN');
  }, [roleParam]);

  // Step 1: Credentials State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [optInPromo, setOptInPromo] = useState(false);

  // Step 2: Role-Specific Profile Details
  // Brand Profile
  const [companyName, setCompanyName] = useState('');
  const [businessCategory, setBusinessCategory] = useState('Fashion & Apparel');
  const [contactName, setContactName] = useState('');
  const [campaignBudget, setCampaignBudget] = useState('₹50,000 - ₹2,00,000');

  // Creator Profile
  const [creatorName, setCreatorName] = useState('');
  const [contentNiche, setContentNiche] = useState('Tech & AI');
  const [gender, setGender] = useState<string>('Male');
  const [age, setAge] = useState<string>('24');

  // Status & Loading State
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 3 (Creator Social Connect) State
  const [connectedSocials, setConnectedSocials] = useState<{ [key: string]: { handle: string; verified: boolean; audience: string; engagement: string } | null }>({
    instagram: null,
    youtube: null,
    tiktok: null,
    twitter: null,
  });
  const [connectingPlatform, setConnectingPlatform] = useState<string | null>(null);

  // Validation
  const isValidEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim());

  // Password Strength
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

  /**
   * Handle Step 1 Submit (Credentials -> Step 2)
   */
  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !isValidEmail(email)) {
      setError(role === 'BRAND_ADMIN' ? 'Please enter a valid work email (e.g. name@brand.com).' : 'Please enter a valid email address.');
      return;
    }

    if (!password || passwordScore < 2 || !hasMinLength) {
      setError('Password must be at least 8 characters and meet strength criteria.');
      return;
    }

    if (!agreedTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setStep(2);
  };

  /**
   * Handle Step 2 Submit (Profile Details -> Finalize Account Registration)
   */
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (role === 'BRAND_ADMIN') {
      if (!companyName || companyName.trim().length < 2) {
        setError('Please enter your Company or Organization Name.');
        return;
      }
      if (!contactName || contactName.trim().length < 2) {
        setError('Please enter the contact person name.');
        return;
      }
    } else {
      if (!creatorName || creatorName.trim().length < 2) {
        setError('Please enter your Creator / Stage Name.');
        return;
      }
      const ageNum = parseInt(age, 10);
      if (isNaN(ageNum) || ageNum < 18) {
        setError('You must be at least 18 years old to execute advertising agreements.');
        return;
      }
    }

    setLoading(true);

    try {
      const payload: any = {
        email: email.toLowerCase().trim(),
        password,
        role,
        country: 'India',
      };

      if (role === 'BRAND_ADMIN') {
        payload.name = contactName.trim();
        payload.organizationName = companyName.trim();
        payload.businessCategory = businessCategory;
      } else {
        payload.name = creatorName.trim();
        payload.gender = gender;
        payload.age = parseInt(age, 10);
      }

      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // If Creator, proceed to Step 3 for social channel linking; if Brand, direct to workspace
      if (role === 'CREATOR') {
        setStep(3);
      } else {
        router.push('/brand');
        router.refresh();
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Direct Social Linking in Step 3 for Creators
   */
  const handleDirectConnectPlatform = async (platform: string) => {
    if (connectedSocials[platform]) {
      setConnectedSocials((prev) => ({ ...prev, [platform]: null }));
      return;
    }

    setConnectingPlatform(platform);
    const targetPlatform = platform === 'twitter' ? 'x' : platform;

    const handleAuthMessage = (event: MessageEvent) => {
      if (event.data?.type === 'TIA_SOCIAL_CONNECTED') {
        const { platform: retPlatform, profile } = event.data;
        const key = retPlatform === 'x' ? 'twitter' : retPlatform;
        const audienceCount = profile.audienceSize || 0;
        const formattedAudience =
          audienceCount >= 1000000
            ? `${(audienceCount / 1000000).toFixed(1)}M ${key === 'youtube' ? 'Subscribers' : 'Followers'}`
            : audienceCount >= 1000
            ? `${(audienceCount / 1000).toFixed(0)}K ${key === 'youtube' ? 'Subscribers' : 'Followers'}`
            : `${audienceCount} ${key === 'youtube' ? 'Subscribers' : 'Followers'}`;

        setConnectedSocials((prev) => ({
          ...prev,
          [key]: {
            handle: profile.username?.startsWith('@') ? profile.username : `@${profile.username}`,
            verified: true,
            audience: formattedAudience,
            engagement: `${profile.engagementRate || 4.2}% ER`,
            profileImageUrl: profile.profileImageUrl,
            verifiedBy: `${key.toUpperCase()} Live API`,
          },
        }));
        setConnectingPlatform(null);
        window.removeEventListener('message', handleAuthMessage);
      }
    };

    window.addEventListener('message', handleAuthMessage);

    const authEndpoint = `/api/connectors/${targetPlatform}/auth?flow=onboarding&role=${role}`;
    const popup = window.open(authEndpoint, `tia_verify_${targetPlatform}`, 'width=600,height=720');

    if (!popup || popup.closed) {
      setConnectingPlatform(null);
    }
  };

  const handleFinishCreator = () => {
    router.push('/creator');
    router.refresh();
  };

  const totalSteps = role === 'CREATOR' ? 3 : 2;

  return (
    <div className="auth-viewport">
      <div className="auth-card">
        {/* LEFT COLUMN: ONBOARDING ENGINE */}
        <div className="auth-form-pane">
          {/* Header */}
          <div className="auth-header">
            <Link href="/" className="auth-brand">
              <img
                src="/logo-cropped.png"
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
              {/* Stepper Progress Bar (Centered) */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '24px' }}>
                <div style={{ display: 'flex', gap: '8px', width: role === 'CREATOR' ? '240px' : '160px' }}>
                  <div
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '9999px',
                      background: step >= 1 ? '#0052FF' : '#E2E8F0',
                      boxShadow: step === 1 ? '0 0 8px rgba(0, 82, 255, 0.35)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  <div
                    style={{
                      flex: 1,
                      height: '4px',
                      borderRadius: '9999px',
                      background: step >= 2 ? '#0052FF' : '#E2E8F0',
                      boxShadow: step === 2 ? '0 0 8px rgba(0, 82, 255, 0.35)' : 'none',
                      transition: 'all 0.3s ease',
                    }}
                  />
                  {role === 'CREATOR' && (
                    <div
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '9999px',
                        background: step >= 3 ? '#0052FF' : '#E2E8F0',
                        boxShadow: step === 3 ? '0 0 8px rgba(0, 82, 255, 0.35)' : 'none',
                        transition: 'all 0.3s ease',
                      }}
                    />
                  )}
                </div>
              </div>

              {/* Error Message Box */}
              {error && (
                <div className="auth-error-box" style={{ marginBottom: '16px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 1: CREDENTIALS (BRAND OR CREATOR) */}
              {/* ============================================================== */}
              {step === 1 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <h1 className="auth-title">
                    {role === 'BRAND_ADMIN' ? 'Create Your Brand Workspace' : 'Join as a Verified Creator'}
                  </h1>
                  <p className="auth-subtitle">
                    {role === 'BRAND_ADMIN'
                      ? 'Access 50,000+ audited creators with 100% upfront milestone payment protection.'
                      : 'Connect your channels, showcase audited analytics & get direct brand deals with 0% cuts.'}
                  </p>

                  <form onSubmit={handleStep1Submit} className="auth-form">
                    {/* Email Input */}
                    <div className="auth-input-group">
                      <label className="auth-label">
                        {role === 'BRAND_ADMIN' ? 'Work Email Address' : 'Email Address'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder={role === 'BRAND_ADMIN' ? 'name@company.com' : 'you@creator.com'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="auth-input"
                        autoFocus
                      />
                    </div>

                    {/* Password Input */}
                    <div className="auth-input-group">
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label className="auth-label">Create Secure Password</label>
                        {password && (
                          <span style={{ color: strengthMeta.color, fontSize: '11px', fontWeight: 600 }}>
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
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>

                      {/* Criteria Grid */}
                      <div className="auth-pwd-strength-box" style={{ marginTop: '8px' }}>
                        <div className="auth-pwd-meter-bars">
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 1 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 2 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 3 ? strengthMeta.levelClass : ''}`} />
                          <div className={`auth-pwd-bar-segment ${passwordScore >= 4 ? strengthMeta.levelClass : ''}`} />
                        </div>
                      </div>
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
                        I agree to TIA <Link href="/terms" style={{ color: '#0052FF', fontWeight: 600 }}>Terms of Service</Link> and <Link href="/privacy" style={{ color: '#0052FF', fontWeight: 600 }}>Privacy Policy</Link>.
                      </label>
                    </div>

                    <button type="submit" className="auth-submit-btn" style={{ marginTop: '12px' }}>
                      {role === 'BRAND_ADMIN' ? 'Continue to Company Details →' : 'Continue to Creator Profile →'}
                    </button>
                  </form>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 2: PROFILE DETAILS (BRAND OR CREATOR) */}
              {/* ============================================================== */}
              {step === 2 && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ background: 'none', border: 'none', color: '#0052FF', fontSize: '12px', fontWeight: 600, cursor: 'pointer', padding: 0 }}
                    >
                      ← Back to Credentials
                    </button>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#64748B' }}>
                      Step 2 of {totalSteps}
                    </span>
                  </div>

                  <h1 className="auth-title">
                    {role === 'BRAND_ADMIN' ? 'Brand & Organization Profile' : 'Creator Identity & Niche'}
                  </h1>
                  <p className="auth-subtitle">
                    {role === 'BRAND_ADMIN'
                      ? 'Tell us about your brand to customize campaign workflows & creator matchmaking.'
                      : 'Set up your public creator portfolio to showcase to top hiring brands.'}
                  </p>

                  <form onSubmit={handleStep2Submit} className="auth-form">
                    {role === 'BRAND_ADMIN' ? (
                      <>
                        {/* Brand Name */}
                        <div className="auth-input-group">
                          <label className="auth-label">Brand / Organization Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Nike India, Acme Studio, Zomato"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                            className="auth-input"
                            autoFocus
                          />
                        </div>

                        {/* Industry / Category */}
                        <div className="auth-input-group">
                          <label className="auth-label">Business Industry / Category</label>
                          <select
                            value={businessCategory}
                            onChange={(e) => setBusinessCategory(e.target.value)}
                            className="auth-input"
                            style={{ cursor: 'pointer', background: '#FFFFFF' }}
                          >
                            <option value="Fashion & Apparel">Fashion &amp; Apparel</option>
                            <option value="Beauty & Personal Care">Beauty &amp; Personal Care</option>
                            <option value="Tech & Consumer Electronics">Tech &amp; Electronics</option>
                            <option value="FMCG, Food & Beverage">FMCG &amp; Food Beverage</option>
                            <option value="Fitness, Sports & Wellness">Fitness &amp; Wellness</option>
                            <option value="FinTech & Web3">FinTech &amp; Financial Services</option>
                            <option value="Gaming & Esports">Gaming &amp; Esports</option>
                            <option value="E-Commerce & Retail">E-Commerce &amp; Direct-to-Consumer</option>
                            <option value="Media & Entertainment">Media &amp; Entertainment</option>
                            <option value="General Enterprise">General Enterprise</option>
                          </select>
                        </div>

                        {/* Contact Person */}
                        <div className="auth-input-group">
                          <label className="auth-label">Contact Person Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Priya Sharma (Marketing Lead)"
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="auth-input"
                          />
                        </div>

                        {/* Campaign Budget Range */}
                        <div className="auth-input-group">
                          <label className="auth-label">Typical Monthly Campaign Budget</label>
                          <select
                            value={campaignBudget}
                            onChange={(e) => setCampaignBudget(e.target.value)}
                            className="auth-input"
                            style={{ cursor: 'pointer', background: '#FFFFFF' }}
                          >
                            <option value="₹25,000 - ₹50,000">₹25,000 – ₹50,000 (Emerging)</option>
                            <option value="₹50,000 - ₹2,00,000">₹50,000 – ₹2,00,000 (Growth)</option>
                            <option value="₹2,00,000 - ₹10,00,000">₹2,00,000 – ₹10,00,000 (Scale)</option>
                            <option value="₹10,00,000+">₹10,00,000+ (Enterprise Tier-1)</option>
                          </select>
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="auth-submit-btn"
                          style={{ marginTop: '12px' }}
                        >
                          {loading ? 'Activating Brand Workspace...' : 'Complete & Launch Brand Workspace →'}
                        </button>
                      </>
                    ) : (
                      <>
                        {/* Creator Stage Name */}
                        <div className="auth-input-group">
                          <label className="auth-label">Creator / Channel Display Name</label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rohan Tech, Ananya Vlogs"
                            value={creatorName}
                            onChange={(e) => setCreatorName(e.target.value)}
                            className="auth-input"
                            autoFocus
                          />
                        </div>

                        {/* Content Niche */}
                        <div className="auth-input-group">
                          <label className="auth-label">Primary Content Niche</label>
                          <select
                            value={contentNiche}
                            onChange={(e) => setContentNiche(e.target.value)}
                            className="auth-input"
                            style={{ cursor: 'pointer', background: '#FFFFFF' }}
                          >
                            <option value="Tech & AI">Tech &amp; Consumer AI</option>
                            <option value="Fashion & Lifestyle">Fashion &amp; Lifestyle</option>
                            <option value="Beauty & Skincare">Beauty &amp; Skincare</option>
                            <option value="Fitness & Health">Fitness &amp; Sports</option>
                            <option value="Gaming & Esports">Gaming &amp; Esports</option>
                            <option value="Food & Travel">Food &amp; Travel</option>
                            <option value="Finance & Business">Finance &amp; Business</option>
                            <option value="Comedy & Entertainment">Comedy &amp; Entertainment</option>
                          </select>
                        </div>

                        {/* Gender & Age Row */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                          <div className="auth-input-group">
                            <label className="auth-label">Gender</label>
                            <select
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                              className="auth-input"
                              style={{ cursor: 'pointer', background: '#FFFFFF' }}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Non-Binary">Non-Binary</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>

                          <div className="auth-input-group">
                            <label className="auth-label">Age (18+ Required)</label>
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

                        <button
                          type="submit"
                          disabled={loading}
                          className="auth-submit-btn"
                          style={{ marginTop: '12px' }}
                        >
                          {loading ? 'Saving Profile...' : 'Continue to Social Accounts →'}
                        </button>
                      </>
                    )}
                  </form>
                </div>
              )}

              {/* ============================================================== */}
              {/* STEP 3: CREATOR SOCIAL CHANNELS (CREATORS ONLY) */}
              {/* ============================================================== */}
              {step === 3 && role === 'CREATOR' && (
                <div style={{ width: '100%', animation: 'fadeIn 0.2s ease' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: 600, color: '#0052FF' }}>
                      Step 3 of 3 • Channel Verification
                    </span>
                  </div>

                  <h1 className="auth-title">Link your social channels</h1>
                  <p className="auth-subtitle">
                    Connect your public profiles to verify engagement, sync live analytics, and land higher-paying campaigns.
                  </p>

                  <div className="auth-social-unified-list" style={{ marginTop: '16px' }}>
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
                              : 'Reels & Story Analytics'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={connectingPlatform === 'instagram'}
                        className={`auth-social-action-btn ${connectedSocials['instagram'] ? 'is-connected' : ''}`}
                        onClick={() => handleDirectConnectPlatform('instagram')}
                      >
                        {connectedSocials['instagram'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>

                    {/* YouTube */}
                    <div className={`auth-social-row ${connectedSocials['youtube'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#FF0000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
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
                              : 'Subscribers & Video Views'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={connectingPlatform === 'youtube'}
                        className={`auth-social-action-btn ${connectedSocials['youtube'] ? 'is-connected' : ''}`}
                        onClick={() => handleDirectConnectPlatform('youtube')}
                      >
                        {connectedSocials['youtube'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>

                    {/* X (Twitter) */}
                    <div className={`auth-social-row ${connectedSocials['twitter'] ? 'connected' : ''}`}>
                      <div className="auth-social-info">
                        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0F172A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', flexShrink: 0 }}>
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
                              : 'Audience & Engagement'}
                          </div>
                        </div>
                      </div>
                      <button
                        type="button"
                        disabled={connectingPlatform === 'twitter'}
                        className={`auth-social-action-btn ${connectedSocials['twitter'] ? 'is-connected' : ''}`}
                        onClick={() => handleDirectConnectPlatform('twitter')}
                      >
                        {connectedSocials['twitter'] ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleFinishCreator}
                    className="auth-submit-btn"
                    style={{ marginTop: '20px' }}
                  >
                    Complete &amp; Launch Creator Portal →
                  </button>

                  <div style={{ textAlign: 'center', marginTop: '10px' }}>
                    <button
                      type="button"
                      onClick={handleFinishCreator}
                      className="auth-skip-btn"
                    >
                      Skip for now
                    </button>
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
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DYNAMIC SHOWCASE PANE */}
        <div className="auth-showcase-pane">
          <div className="auth-ambient-grid" />
          <div className="auth-glow-orb orb-1" />
          <div className="auth-glow-orb orb-2" />
          <div className="auth-glow-orb orb-3" />

          <div className="auth-showcase-content" key={role} style={{ animation: 'fadeIn 0.3s ease' }}>
            {role === 'CREATOR' ? (
              <>
                <h2 className="auth-showcase-title">
                  <span>Monetize Your Influence.</span><br />
                  <span style={{ color: '#0052FF', fontWeight: 600 }}>Get Direct Brand Deals.</span>
                </h2>
                <p className="auth-showcase-desc">
                  Direct brand collaborations, 100% upfront milestone payment protection, and automated GST contracts with zero agency commission cuts.
                </p>
              </>
            ) : (
              <>
                <h2 className="auth-showcase-title">
                  <span>Discover Audited Creators.</span><br />
                  <span style={{ color: '#0052FF', fontWeight: 600 }}>Execute Protected Deals.</span>
                </h2>
                <p className="auth-showcase-desc">
                  Direct creator contracts, authentic audience metrics, automated milestone escrow, and a flat 5% platform fee with zero agency markups.
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
