// ===================================================
// TIA BACKEND - AUTHENTICATION SERVICE
// ===================================================

import bcrypt from 'bcryptjs';
import { signJwtToken, verifyJwtToken, SessionPayload } from '@/lib/auth/session';
import { getStoredUserByEmail, createStoredUser, StoredUser } from '@/lib/auth/local-auth-store';
import { logAudit } from '@/lib/audit/logger';

export interface RegisterInput {
  email: string;
  password: string;
  name: string;
  role: 'CREATOR' | 'BRAND_ADMIN' | 'BRAND_USER';
  companyName?: string;
  category?: string;
  country?: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface AuthResult {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    country?: string;
  };
  token: string;
}

export class AuthService {
  /**
   * Register a new Creator or Brand account
   */
  static async register(input: RegisterInput): Promise<AuthResult> {
    const existing = getStoredUserByEmail(input.email);
    if (existing) {
      throw new Error('An account with this email address already exists.');
    }

    if (input.password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    const passwordHash = bcrypt.hashSync(input.password, 10);
    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

    const newUser: StoredUser = {
      id: userId,
      email: input.email.toLowerCase().trim(),
      passwordHash,
      name: input.name.trim(),
      role: input.role,
      country: input.country || 'India',
      createdAt: new Date().toISOString(),
    };

    createStoredUser(newUser);

    logAudit({
      actorId: userId,
      action: 'USER_REGISTERED',
      targetType: 'User',
      targetId: userId,
      details: { role: input.role, email: input.email },
    });

    const token = await signJwtToken({
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role,
      name: newUser.name,
    });

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
        country: newUser.country,
      },
      token,
    };
  }

  /**
   * Authenticate credentials and return signed session token
   */
  static async login(input: LoginInput): Promise<AuthResult> {
    const user = getStoredUserByEmail(input.email.toLowerCase().trim());
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    const isMatch = bcrypt.compareSync(input.password, user.passwordHash);
    if (!isMatch) {
      throw new Error('Invalid email or password.');
    }

    logAudit({
      actorId: user.id,
      action: 'USER_LOGGED_IN',
      targetType: 'User',
      targetId: user.id,
      details: { email: user.email },
    });

    const token = await signJwtToken({
      userId: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        country: user.country,
      },
      token,
    };
  }

  /**
   * Verify token payload
   */
  static async verifySession(token: string): Promise<SessionPayload | null> {
    return verifyJwtToken(token);
  }
}
