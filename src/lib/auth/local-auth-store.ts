import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

export interface StoredUser {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER' | 'TIA_SUPER_ADMIN';
  phone?: string;
  gender?: string;
  age?: number;
  country?: string;
  createdAt: string;
}

const DATA_DIR = path.join(process.cwd(), '.data');
const USERS_FILE = path.join(DATA_DIR, 'auth_users.json');

// Default initial accounts
const DEFAULT_ACCOUNTS: StoredUser[] = [
  {
    id: 'demo-brand-user-id',
    email: 'brand@tia.agency',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    name: 'Nexus Brand Manager',
    role: 'BRAND_ADMIN',
    country: 'India',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-creator-user-id',
    email: 'creator@tia.agency',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    name: 'Aarav Sharma',
    role: 'CREATOR',
    country: 'India',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'demo-admin-user-id',
    email: 'admin@tia.agency',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    name: 'TIA Super Admin',
    role: 'TIA_SUPER_ADMIN',
    country: 'India',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'user_creators_alliance',
    email: 'creatorsalliance.media@gmail.com',
    passwordHash: bcrypt.hashSync('Password@123', 10),
    name: 'Creators Alliance',
    role: 'CREATOR',
    country: 'India',
    createdAt: new Date().toISOString(),
  },
];

// In-memory cache for serverless environments
let memoryUsers: StoredUser[] = [...DEFAULT_ACCOUNTS];

function ensureFileExists() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, JSON.stringify(DEFAULT_ACCOUNTS, null, 2), 'utf-8');
    }
  } catch (err) {
    // In read-only serverless environments, fs write may fail gracefully
  }
}

export function getAllStoredUsers(): StoredUser[] {
  try {
    ensureFileExists();
    if (fs.existsSync(USERS_FILE)) {
      const data = fs.readFileSync(USERS_FILE, 'utf-8');
      const parsed = JSON.parse(data) as StoredUser[];
      const combined = [...parsed];
      for (const m of memoryUsers) {
        if (!combined.some((u) => u.email.toLowerCase() === m.email.toLowerCase())) {
          combined.push(m);
        }
      }
      return combined;
    }
  } catch (err) {
    // fallback to memory
  }
  return memoryUsers;
}

export function findStoredUserByEmail(email: string): StoredUser | null {
  const normalized = email.toLowerCase().trim();
  const users = getAllStoredUsers();
  return users.find((u) => u.email.toLowerCase() === normalized) || null;
}

export const getStoredUserByEmail = findStoredUserByEmail;

export function saveStoredUser(user: StoredUser): void {
  const normalized = user.email.toLowerCase().trim();
  
  // Update memory
  const existingIdx = memoryUsers.findIndex((u) => u.email.toLowerCase() === normalized);
  if (existingIdx >= 0) {
    memoryUsers[existingIdx] = user;
  } else {
    memoryUsers.push(user);
  }

  // Update file if possible
  try {
    ensureFileExists();
    const users = getAllStoredUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === normalized);
    if (idx >= 0) {
      users[idx] = user;
    } else {
      users.push(user);
    }
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    // Graceful fallback for read-only serverless
  }
}

export const createStoredUser = saveStoredUser;
