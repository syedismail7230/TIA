'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Mail, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, X } from 'lucide-react';

interface OtpVerificationModalProps {
  isOpen: boolean;
  email: string;
  purpose?: 'SIGNUP' | 'LOGIN' | 'PASSWORD_RESET' | 'PAYOUT_VERIFICATION';
  onVerified: () => void;
  onClose: () => void;
}

export function OtpVerificationModal({
  isOpen,
  email,
  purpose = 'SIGNUP',
  onVerified,
  onClose,
}: OtpVerificationModalProps) {
  const [digits, setDigits] = useState<string[]>(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [timer, setTimer] = useState(60);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Reset state on open
    setDigits(['', '', '', '', '', '']);
    setError(null);
    setSuccess(false);
    setTimer(60);

    // Initial send if opened
    handleSendOtp();

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);
  }, [isOpen, email]);

  useEffect(() => {
    if (!isOpen || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  if (!isOpen) return null;

  const handleSendOtp = async () => {
    try {
      setResending(true);
      setError(null);
      const res = await fetch('/api/auth/otp/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, purpose }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || 'Failed to send verification code. Please try again.');
      } else {
        setTimer(60);
      }
    } catch {
      setError('Network error. Failed to reach verification service.');
    } finally {
      setResending(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      const pasted = value.replace(/\D/g, '').slice(0, 6);
      if (pasted.length === 6) {
        const newDigits = pasted.split('');
        setDigits(newDigits);
        inputRefs.current[5]?.focus();
        handleVerifyCode(pasted);
        return;
      }
    }

    const char = value.slice(-1).replace(/\D/g, '');
    const newDigits = [...digits];
    newDigits[index] = char;
    setDigits(newDigits);

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
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyCode = async (codeToVerify?: string) => {
    const code = codeToVerify || digits.join('');
    if (code.length !== 6) {
      setError('Please enter all 6 digits of the verification code.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const res = await fetch('/api/auth/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, purpose }),
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Incorrect or expired verification code.');
      } else {
        setSuccess(true);
        setTimeout(() => {
          onVerified();
        }, 1200);
      }
    } catch {
      setError('Verification failed. Please check network connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tia-modal-backdrop">
      <div className="tia-modal-card">
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
          <ShieldCheck style={{ width: '28px', height: '28px' }} />
        </div>

        <h3 className="tia-modal-title">Enter Verification Code</h3>
        <p className="tia-modal-desc">
          We sent a 6-digit secure OTP to <span style={{ color: '#E2E8F0', fontWeight: 600 }}>{email}</span>
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
            <span style={{ fontWeight: 600 }}>Email verified successfully! Redirecting...</span>
          </div>
        )}

        {/* 6 Digit Input Boxes */}
        <div className="tia-otp-digit-row">
          {digits.map((digit, index) => (
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

        {/* Action Button */}
        <button
          type="button"
          disabled={loading || digits.join('').length !== 6 || success}
          onClick={() => handleVerifyCode()}
          className="tia-modal-primary-btn"
        >
          {loading ? (
            <>
              <RefreshCw style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} />
              <span>Verifying Code...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle2 style={{ width: '16px', height: '16px', color: '#6EE7B7' }} />
              <span>Verified</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight style={{ width: '16px', height: '16px' }} />
            </>
          )}
        </button>

        {/* Resend OTP Footer */}
        <div style={{
          marginTop: '20px',
          textAlign: 'center',
          fontSize: '12px',
          color: '#94A3B8',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
        }}>
          <span>Didn&apos;t receive code?</span>
          {timer > 0 ? (
            <span style={{ color: '#64748B', fontFamily: 'monospace' }}>Resend in {timer}s</span>
          ) : (
            <button
              type="button"
              disabled={resending}
              onClick={handleSendOtp}
              style={{
                background: 'none',
                border: 'none',
                color: '#38BDF8',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              {resending ? <RefreshCw style={{ width: '12px', height: '12px', animation: 'spin 1s linear infinite' }} /> : <Mail style={{ width: '12px', height: '12px' }} />}
              <span>Resend OTP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
