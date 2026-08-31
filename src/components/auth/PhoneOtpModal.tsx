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
    if (step !== 'OTP_INPUT' || timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timer]);

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

      // Initialize Recaptcha
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-md p-6 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        {/* Invisible Recaptcha Container */}
        <div id="firebase-phone-recaptcha-container" />

        {/* Top Accent Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-400" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mt-2 mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 shadow-inner">
            <Phone className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">
            {step === 'PHONE_INPUT' ? 'Phone SMS Authentication' : 'Enter SMS Code'}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {step === 'PHONE_INPUT'
              ? 'Enter your mobile phone number to receive a secure Firebase SMS OTP.'
              : `We sent a 6-digit SMS OTP to ${countryCode} ${phoneNumber}`}
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
            <span className="font-semibold">Phone verified successfully! Authenticating...</span>
          </div>
        )}

        {/* STEP 1: Phone Number Input */}
        {step === 'PHONE_INPUT' && (
          <form onSubmit={handleSendSmsOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Mobile Phone Number</label>
              <div className="flex gap-2">
                <select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  className="w-24 bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-3 text-white text-sm font-semibold outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
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
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50 transition"
                  autoFocus
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || phoneNumber.trim().length < 6}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none transition"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending SMS OTP...</span>
                </>
              ) : (
                <>
                  <span>Send Verification Code</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: 6-Digit SMS OTP Input */}
        {step === 'OTP_INPUT' && (
          <div>
            <div className="flex justify-center gap-2.5 mb-6">
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
                  className="w-12 h-14 text-center text-2xl font-bold bg-slate-950 border border-slate-700 rounded-xl text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition disabled:opacity-50"
                />
              ))}
            </div>

            <button
              disabled={loading || otpDigits.join('').length !== 6 || success}
              onClick={() => handleVerifyCode()}
              className="w-full py-3 px-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:pointer-events-none transition"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying SMS Code...</span>
                </>
              ) : success ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Verified</span>
                </>
              ) : (
                <>
                  <span>Verify & Sign In</span>
                  <ShieldCheck className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Resend SMS Footer */}
            <div className="mt-5 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setStep('PHONE_INPUT')}
                className="text-slate-400 hover:text-white underline"
              >
                Change Number
              </button>
              <span>•</span>
              {timer > 0 ? (
                <span className="text-slate-500 font-mono">Resend SMS in {timer}s</span>
              ) : (
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSendSmsOtp()}
                  className="text-emerald-400 hover:text-emerald-300 font-semibold inline-flex items-center gap-1 disabled:opacity-50"
                >
                  <RefreshCw className="w-3 h-3" />
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
