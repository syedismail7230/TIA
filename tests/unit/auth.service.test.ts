import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { AuthService } from '../../src/lib/services/auth.service';

describe('TIA Backend - AuthService QA Tests', () => {
  it('registers a new user with bcrypt password hashing and returns JWT token', async () => {
    const testEmail = `qa_test_${Date.now()}@tia.agency`;
    const res = await AuthService.register({
      email: testEmail,
      password: 'SecurePassword123!',
      name: 'QA Test Creator',
      role: 'CREATOR',
      country: 'India',
    });

    assert.ok(res.token);
    assert.equal(res.user.email, testEmail);
    assert.equal(res.user.role, 'CREATOR');

    // Verify session
    const verified = await AuthService.verifySession(res.token);
    assert.ok(verified);
    assert.equal(verified?.email, testEmail);
    assert.equal(verified?.role, 'CREATOR');
  });

  it('rejects duplicate email registrations', async () => {
    const testEmail = 'brand@tia.agency';
    await assert.rejects(
      async () => {
        await AuthService.register({
          email: testEmail,
          password: 'Password@123',
          name: 'Duplicate Test',
          role: 'BRAND_ADMIN',
        });
      },
      { message: 'An account with this email address already exists.' }
    );
  });

  it('authenticates valid credentials and rejects incorrect passwords', async () => {
    // Valid login
    const loginRes = await AuthService.login({
      email: 'brand@tia.agency',
      password: 'Password@123',
    });
    assert.ok(loginRes.token);
    assert.equal(loginRes.user.email, 'brand@tia.agency');

    // Invalid password
    await assert.rejects(
      async () => {
        await AuthService.login({
          email: 'brand@tia.agency',
          password: 'WrongPassword123!',
        });
      },
      { message: 'Invalid email or password.' }
    );
  });
});
