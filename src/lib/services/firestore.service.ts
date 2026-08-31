// ===================================================
// TIA BACKEND - FIRESTORE DATABASE SERVICE
// ===================================================

import { db } from '@/lib/firebase/config';
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  updateDoc,
  serverTimestamp,
} from 'firebase/firestore';

export class FirestoreService {
  /**
   * Users Collection
   */
  static async saveUser(user: {
    id: string;
    email: string;
    displayName: string;
    role: string;
    phoneNumber?: string;
    photoURL?: string;
    authProvider: 'password' | 'google' | 'phone';
  }) {
    const userRef = doc(db, 'users', user.id);
    await setDoc(
      userRef,
      {
        ...user,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return user;
  }

  static async getUser(id: string) {
    const userRef = doc(db, 'users', id);
    const snap = await getDoc(userRef);
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };
  }

  /**
   * Campaigns Collection
   */
  static async saveCampaign(campaign: any) {
    const campRef = doc(db, 'campaigns', campaign.id);
    await setDoc(
      campRef,
      {
        ...campaign,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return campaign;
  }

  static async getCampaigns(filters?: { status?: string; brandId?: string }) {
    const colRef = collection(db, 'campaigns');
    let q = query(colRef, orderBy('createdAt', 'desc'));

    if (filters?.status) {
      q = query(colRef, where('status', '==', filters.status));
    }
    if (filters?.brandId) {
      q = query(colRef, where('brandId', '==', filters.brandId));
    }

    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  /**
   * Creators Collection
   */
  static async saveCreator(creator: any) {
    const creatorRef = doc(db, 'creators', creator.id);
    await setDoc(
      creatorRef,
      {
        ...creator,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return creator;
  }

  static async getCreators() {
    const colRef = collection(db, 'creators');
    const snap = await getDocs(colRef);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }

  /**
   * Transactions & Protection Ledger Collection
   */
  static async saveTransaction(tx: any) {
    const txRef = doc(db, 'transactions', tx.id);
    await setDoc(
      txRef,
      {
        ...tx,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
    return tx;
  }

  static async getTransactions(brandId?: string) {
    const colRef = collection(db, 'transactions');
    let q = query(colRef, orderBy('date', 'desc'));
    if (brandId) {
      q = query(colRef, where('brandId', '==', brandId));
    }
    const snap = await getDocs(q);
    return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
  }
}
