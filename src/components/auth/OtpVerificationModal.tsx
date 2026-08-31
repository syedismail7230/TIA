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
        setError(data.error || 'Failed to dispatch verification code.');
      } else {
        setTimer(60);
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setResending(false);
    }
  };

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      // Handle paste of full 6 digits
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

    // Auto submit on last digit
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 mb-3 shadow-inner">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Enter Verification Code</h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            We sent a 6-digit secure OTP to <span className="text-slate-200 font-semibold">{email}</span>
          </p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-red-400 text-xs">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-400 text-xs">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold">Email verified successfully! Redirecting...</span>
          </div>
        )}

        {/* 6 Digit Input Boxes */}
        <div className="flex justify-center gap-2.5 mb-6">
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
              className="w-12 h-14 text-center text-2xl font-bold bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition disabled:opacity-50"
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          disabled={loading || digits.join('').length !== 6 || success}
          onClick={() => handleVerifyCode()}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none transition"
        >
          {loading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Verifying Code...</span>
            </>
          ) : success ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Verified</span>
            </>
          ) : (
            <>
              <span>Verify & Continue</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

        {/* Resend OTP Footer */}
        <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
          <span>Didn&apos;t receive code?</span>
          {timer > 0 ? (
            <span className="text-slate-500 font-mono">Resend in {timer}s</span>
          ) : (
            <button
              disabled={resending}
              onClick={handleSendOtp}
              className="text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 disabled:opacity-50"
            >
              {resending ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Mail className="w-3 h-3" />}
              <span>Resend OTP</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
