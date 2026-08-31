// ===================================================
// TIA - FIREBASE CLIENT & FIRESTORE INITIALIZATION
// ===================================================

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'AIzaSyBOo_MMqlpMbiGQg5lLUVdi9yaM5EXzZNw',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'theinfluencersagency-31162.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'theinfluencersagency-31162',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'theinfluencersagency-31162.firebasestorage.app',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '447760973569',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:447760973569:web:d53c79e84483e09fb5a500',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-PQZ9FHL07C',
};

// Initialize Firebase App
export const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Google Auth Provider
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Initializes the invisible RecaptchaVerifier on a container element
 */
export function setupRecaptcha(containerId: string = 'recaptcha-container'): RecaptchaVerifier {
  if (typeof window === 'undefined') {
    throw new Error('RecaptchaVerifier can only be initialized on the client side.');
  }

  // Clear existing verifier if attached to window
  if ((window as any).recaptchaVerifier) {
    try {
      (window as any).recaptchaVerifier.clear();
    } catch {
      // ignore
    }
  }

  const verifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved successfully');
    },
    'expired-callback': () => {
      console.warn('reCAPTCHA expired, please try again.');
    },
  });

  (window as any).recaptchaVerifier = verifier;
  return verifier;
}

/**
 * Dispatches an SMS OTP via Firebase to the given E.164 phone number
 */
export async function sendPhoneOtp(
  phoneNumberE164: string,
  verifier: RecaptchaVerifier
): Promise<ConfirmationResult> {
  return await signInWithPhoneNumber(auth, phoneNumberE164, verifier);
}
