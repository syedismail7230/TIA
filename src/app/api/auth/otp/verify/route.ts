// ===================================================
// TIA BACKEND - VERIFY EMAIL OTP API
// ===================================================

import { NextResponse } from 'next/server';
import { OtpService } from '@/lib/services/otp.service';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, code, purpose = 'SIGNUP' } = body;

    if (!email || !code) {
      return NextResponse.json({ success: false, error: 'Email and 6-digit code are required' }, { status: 400 });
    }

    const result = await OtpService.verifyOtp(email, code, purpose);
    return NextResponse.json(result);
  } catch (error: any) {
    console.error('Verify OTP API Error:', error);
    return NextResponse.json({ success: false, error: error.message || 'OTP verification failed' }, { status: 400 });
  }
}
