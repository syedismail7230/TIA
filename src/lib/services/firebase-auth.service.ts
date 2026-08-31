// ===================================================
// TIA - FIREBASE AUTHENTICATION CLIENT SERVICE
// ===================================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  UserCredential,
  ConfirmationResult,
} from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase/config';
import { FirestoreService } from './firestore.service';

export interface FirebaseAuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER';
  authProvider: 'password' | 'google' | 'phone';
}

export class FirebaseAuthService {
  /**
   * 1. Email & Password Sign Up
   */
  static async signUpWithEmail(
    email: string,
    pass: string,
    name: string,
    role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER' = 'CREATOR'
  ): Promise<FirebaseAuthUser> {
    const cred: UserCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const user = cred.user;

    if (name) {
      await updateProfile(user, { displayName: name });
    }

    const userData: FirebaseAuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: name || user.displayName || 'TIA User',
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role,
      authProvider: 'password',
    };

    // Sync to Firestore
    await FirestoreService.saveUser({
      id: user.uid,
      email: user.email || '',
      displayName: userData.displayName || '',
      role: userData.role,
      phoneNumber: user.phoneNumber || undefined,
      photoURL: user.photoURL || undefined,
      authProvider: 'password',
    });

    return userData;
  }

  /**
   * 2. Email & Password Sign In
   */
  static async signInWithEmail(email: string, pass: string): Promise<FirebaseAuthUser> {
    const cred: UserCredential = await signInWithEmailAndPassword(auth, email, pass);
    const user = cred.user;

    // Fetch existing profile or default
    const existing = (await FirestoreService.getUser(user.uid)) as any;
    const role = (existing?.role as any) || 'CREATOR';

    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || existing?.displayName || 'TIA User',
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role,
      authProvider: 'password',
    };
  }

  /**
   * 3. Google Sign-In with 1-Click Popup
   */
  static async signInWithGoogle(role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER' = 'CREATOR'): Promise<FirebaseAuthUser> {
    const cred: UserCredential = await signInWithPopup(auth, googleProvider);
    const user = cred.user;

    const existing = (await FirestoreService.getUser(user.uid)) as any;
    const resolvedRole = existing?.role || role;

    const userData: FirebaseAuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Google User',
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role: resolvedRole,
      authProvider: 'google',
    };

    // Save to Firestore
    await FirestoreService.saveUser({
      id: user.uid,
      email: user.email || '',
      displayName: userData.displayName || '',
      role: resolvedRole,
      phoneNumber: user.phoneNumber || undefined,
      photoURL: user.photoURL || undefined,
      authProvider: 'google',
    });

    return userData;
  }

  /**
   * 4. Verify Phone SMS OTP
   */
  static async verifyPhoneOtp(
    confirmationResult: ConfirmationResult,
    otpCode: string,
    role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER' = 'CREATOR'
  ): Promise<FirebaseAuthUser> {
    const cred = await confirmationResult.confirm(otpCode);
    const user = cred.user;

    const existing = (await FirestoreService.getUser(user.uid)) as any;
    const resolvedRole = existing?.role || role;

    const userData: FirebaseAuthUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || `User ${user.phoneNumber?.slice(-4)}`,
      photoURL: user.photoURL,
      phoneNumber: user.phoneNumber,
      role: resolvedRole,
      authProvider: 'phone',
    };

    await FirestoreService.saveUser({
      id: user.uid,
      email: user.email || `${user.phoneNumber}@phone.tia.agency`,
      displayName: userData.displayName || '',
      role: resolvedRole,
      phoneNumber: user.phoneNumber || undefined,
      authProvider: 'phone',
    });

    return userData;
  }

  /**
   * 5. Sign Out
   */
  static async signOutUser(): Promise<void> {
    await signOut(auth);
  }
}
