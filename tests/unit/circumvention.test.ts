import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { scanForCircumvention } from '../../src/lib/circumvention/detector';

describe('TIA Anti-Circumvention Pattern Detector', () => {
  it('detects prohibited email addresses', () => {
    const text = 'Hey brand, email me directly at creator@gmail.com for faster rates.';
    const result = scanForCircumvention(text);

    assert.equal(result.isFlagged, true);
    assert.ok(result.reasons.some((r) => r.includes('email')));
  });

  it('detects phone and WhatsApp contact attempts', () => {
    const text = 'Call or ping me on WhatsApp at +91 9876543210 to discuss off-platform.';
    const result = scanForCircumvention(text);

    assert.equal(result.isFlagged, true);
    assert.ok(result.reasons.some((r) => r.includes('Phone') || r.includes('WhatsApp')));
  });

  it('detects off-platform payment addresses (UPI / Crypto)', () => {
    const text = 'Pay me directly on my UPI alexrivera@okaxis so we skip fees.';
    const result = scanForCircumvention(text);

    assert.equal(result.isFlagged, true);
    assert.ok(result.reasons.some((r) => r.includes('payment') || r.includes('email')));
  });

  it('allows safe, platform-compliant conversation text', () => {
    const text = 'I will deliver the draft for the Instagram Reel by Thursday evening as agreed in the contract.';
    const result = scanForCircumvention(text);

    assert.equal(result.isFlagged, false);
    assert.equal(result.reasons.length, 0);
  });
});
