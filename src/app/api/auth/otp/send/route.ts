// ===================================================
// TIA BACKEND - DISPATCH EMAIL OTP API
// ===================================================

import { NextResponse } from 'next/server';
import { OtpService } from '@/lib/services/otp.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, purpose = 'SIGNUP' } = body;

    if (!email) {
      return NextResponse.json({ success: false, error: 'Email address is required' }, { status: 400 });
    }

    const result = await OtpService.sendOtp(email, purpose);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Send OTP API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'Failed to dispatch verification email' }, { status: 400 });
  }
}
