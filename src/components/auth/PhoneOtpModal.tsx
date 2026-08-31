'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Phone, ShieldCheck, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, X } from 'lucide-react';
import { setupRecaptcha, sendPhoneOtp } from '@/lib/firebase/config';
import { FirebaseAuthService } from '@/lib/services/firebase-auth.service';
import { ConfirmationResult } from 'firebase/auth';

interface PhoneOtpModalProps {
  isOpen: boolean;
  role?: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER';
  onSuccess: (user: any) => void;
  onClose: () => void;
}

export function PhoneOtpModal({
  isOpen,
  role = 'CREATOR',
  onSuccess,
  onClose,
}: PhoneOtpModalProps) {
  const [step, setStep] = useState<'PHONE_INPUT' | 'OTP_INPUT'>('PHONE_INPUT');
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpDigits, setOtpDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;
    setStep('PHONE_INPUT');
    setPhoneNumber('');
    setOtpDigits(['', '', '', '', '', '']);
    setError(null);
    setSuccess(false);
    setTimer(60);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen || step !== 'OTP_INPUT' || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, step, timer]);

  if (!isOpen) return null;

  const handleSendSmsOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const cleanPhone = phoneNumber.replace(/\D/g, '');
    if (cleanPhone.length < 8) {
      setError('Please enter a valid phone number.');
      return;
    }

    const fullPhoneNumber = `${countryCode}${cleanPhone}`;

    try {
      setLoading(true);
      setError(null);

      const verifier = setupRecaptcha('firebase-phone-recaptcha-container');
      const confirmation = await sendPhoneOtp(fullPhoneNumber, verifier);
      setConfirmationResult(confirmation);
      setStep('OTP_INPUT');
      setTimer(60);

      setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);
    } catch (err: any) {
      console.error('Firebase Phone OTP Error:', err);
      setError(err.message || 'Failed to dispatch SMS OTP. Please check phone number.');
    } finally {
      setLoading(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted.length === 6) {
        const newDigits = pasted.split('');
        setOtpDigits(newDigits);
        inputRefs.current[5]?.focus();
        handleVerifyCode(pasted);
        return;
      }
    }

    const char = value.slice(-1).replace(/\D/g, '');
    const newDigits = [...otpDigits];
    newDigits[index] = char;
    setOtpDigits(newDigits);

    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    if (index === 5 && char) {
      const fullCode = newDigits.join('');
      if (fullCode.length === 6) {
        handleVerifyCode(fullCode);
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (codeToVerify?: string) => {
    if (!confirmationResult) {
      setError('No active verification session. Please resend code.');
      return;
    }

    const code = codeToVerify || otpDigits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the SMS code.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const user = await FirebaseAuthService.verifyPhoneOtp(confirmationResult, code, role);
      setSuccess(true);

      setTimeout(() => {
        onSuccess(user);
      }, 1200);
    } catch (err: any) {
      console.error('Verify Phone Code Error:', err);
      setError(err.message || 'Incorrect or expired SMS verification code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tia-modal-backdrop">
      <div className="tia-modal-card">
        {/* Invisible Recaptcha Container */}
        <div id="firebase-phone-recaptcha-container" />

        {/* Top Accent Gradient */}
        <div className="tia-modal-accent-line" />

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="tia-modal-close-btn"
          aria-label="Close"
        >
          <X style={{ width: '18px', height: '18px' }} />
        </button>

        {/* Header Icon */}
        <div className="tia-modal-icon-badge">
          <Phone style={{ width: '28px', height: '28px' }} />
        </div>

        <h3 className="tia-modal-title">
          {step === 'PHONE_INPUT' ? 'Phone SMS Authentication' : 'Enter SMS Code'}
        </h3>
        <p className="tia-modal-desc">
          {step === 'PHONE_INPUT'
            ? 'Enter your mobile phone number to receive a secure Firebase SMS OTP.'
            : `We sent a 6-digit SMS OTP to ${countryCode} ${phoneNumber}`}
        </p>

        {/* Status Messages */}
        {error && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(239, 68, 68, 0.12)',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#F87171',
            fontSize: '12.5px',
          }}>
            <AlertCircle style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div style={{
            marginBottom: '16px',
            padding: '12px 16px',
            borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: '#34D399',
            fontSize: '12.5px',
          }}>
            <CheckCircle2 style={{ width: '16px', height: '16px', flexShrink: 0 }} />
            <span style={{ fontWeight: 600 }}>Phone verified successfully! Authenticating...</span>
          </div>
        )}

        {/* STEP 1: Phone Number Input */}
        {step === 'PHONE_INPUT' && (
          <form onSubmit={handleSendSmsOtp} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#94A3B8', marginBottom: '6px' }}>
                Mobile Phone Number
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  style={{
                    width: '100px',
                    background: '#020617',
                    border: '1.5px solid #334155',
                    borderRadius: '12px',
                    padding: '12px 10px',
                    color: '#FFFFFF',
                    fontSize: '13.5px',
                    fontWeight: 600,
                    outline: 'none',
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
                  placeholder="98765 43210"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  disabled={loading}
                  style={{
                    flex: 1,
                    background: '#020617',
                    border: '1.5px solid #334155',
                    borderRadius: '12px',
                    padding: '12px 16px',
                    color: '#FFFFFF',
                    fontSize: '14px',
                    outline: 'none',
                  }}
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.trim().length < 6}
              className="tia-modal-primary-btn"
            >
              {loading ? (
                <>
                  <RefreshCw style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                  <span>Sending SMS OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight style={{ width: '16px', height: '16px' }} />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 6-Digit SMS OTP Input */}
        {step === 'OTP_INPUT' && (
          <div>
            <div className="tia-otp-digit-row">
              {otpDigits.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => {
                    inputRefs.current[index] = el;
                  }}
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={digit}
                  disabled={loading || success}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="tia-otp-digit-input"
                />
              ))}
            </div>

            <button
              type="button"
              disabled={loading || otpDigits.join('').length !== 6 || success}
              onClick={() => handleVerifyCode()}
              className="tia-modal-primary-btn"
            >
              {loading ? (
                <>
                  <RefreshCw style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
                  <span>Verifying SMS Code...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 style={{ width: '16px', height: '16px', color: '#6EE7B7' }} />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <span>Verify & Sign In</span>
                  <ShieldCheck style={{ width: '16px', height: '16px' }} />
                </>
              )}
            </button>

            {/* Resend SMS Footer */}
            <div style={{
              marginTop: '20px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#94A3B8',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
            }}>
              <button
                type="button"
                onClick={() => setStep('PHONE_INPUT')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94A3B8',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                  fontSize: '12px',
                }}
              >
                Change Number
              </button>
              <span>•</span>
              {timer > 0 ? (
                <span style={{ color: '#64748B', fontFamily: 'monospace' }}>Resend in {timer}s</span>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSendSmsOtp()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#10B981',
                    fontWeight: 600,
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    fontSize: '12px',
                  }}
                >
                  <RefreshCw style={{ width: '12px', height: '12px' }} />
                  <span>Resend SMS OTP</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
