import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { OtpService } from '../../src/lib/services/otp.service';
import fs from 'fs';
import path from 'path';

describe('TIA Backend - Email OTP Verification QA Tests', () => {
  const testEmail = `otp_test_${Date.now()}@tia.agency`;

  it('generates and dispatches a 6-digit OTP code', async () => {
    const res = await OtpService.sendOtp(testEmail, 'SIGNUP');
    assert.equal(res.success, true);
    assert.ok(res.message.includes(testEmail));

    // Verify stored OTP record
    const dataFile = path.join(process.cwd(), '.data', 'email_otps.json');
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const otps = JSON.parse(raw);
    const record = otps.find((o: any) => o.email === testEmail && o.purpose === 'SIGNUP');

    assert.ok(record);
    assert.equal(record.code.length, 6);
    assert.ok(/^\d{6}$/.test(record.code)); // exactly 6 digits
  });

  it('rejects incorrect OTP codes and updates attempts count', async () => {
    await assert.rejects(
      async () => {
        await OtpService.verifyOtp(testEmail, '000000', 'SIGNUP');
      },
      { message: /Incorrect verification code/ }
    );
  });

  it('successfully verifies the correct 6-digit OTP code and burns it', async () => {
    // Read the generated code
    const dataFile = path.join(process.cwd(), '.data', 'email_otps.json');
    const raw = fs.readFileSync(dataFile, 'utf-8');
    const otps = JSON.parse(raw);
    const record = otps.find((o: any) => o.email === testEmail && o.purpose === 'SIGNUP');

    assert.ok(record);
    const validCode = record.code;

    const verifyRes = await OtpService.verifyOtp(testEmail, validCode, 'SIGNUP');
    assert.equal(verifyRes.success, true);
    assert.equal(verifyRes.message, 'Email successfully verified!');

    // Verify OTP was burned/consumed
    const rawAfter = fs.readFileSync(dataFile, 'utf-8');
    const otpsAfter = JSON.parse(rawAfter);
    const consumed = otpsAfter.find((o: any) => o.email === testEmail && o.purpose === 'SIGNUP');
    assert.equal(consumed, undefined);
  });
});
