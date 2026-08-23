export interface CircumventionCheckResult {
  isFlagged: boolean;
  reasons: string[];
  flaggedPatterns: string[];
}

// Regex patterns for detecting external communication attempts
const EMAIL_REGEX = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
const PHONE_REGEX = /(\+?[0-9]{1,4}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}/g;
const UPI_REGEX = /[a-zA-Z0-9.\-_]{2,256}@[a-zA-Z]{2,64}/gi;
const WHATSAPP_KEYWORDS = /\b(whatsapp|wa\.me|tg|telegram|instagram\s+dm|dm\s+me|signal|skype|gpay|paytm|crypto|usdt)\b/gi;
const EXTERNAL_URL_REGEX = /https?:\/\/(?!(?:www\.)?theinfluencersagency\.com)[^\s]+/gi;

/**
 * Scans a message payload for prohibited external communication solicitation.
 */
export function scanForCircumvention(text: string): CircumventionCheckResult {
  const reasons: string[] = [];
  const flaggedPatterns: string[] = [];

  // Check email
  const emails = text.match(EMAIL_REGEX);
  if (emails && emails.length > 0) {
    reasons.push('Direct email address detected');
    flaggedPatterns.push(...emails);
  }

  // Check phone numbers (filtering out small numbers like 100, 2026, etc.)
  const rawPhones = text.match(PHONE_REGEX);
  if (rawPhones) {
    const validPhones = rawPhones.filter((p) => p.replace(/\D/g, '').length >= 10);
    if (validPhones.length > 0) {
      reasons.push('Phone or mobile number detected');
      flaggedPatterns.push(...validPhones);
    }
  }

  // Check UPI IDs
  const upiMatches = text.match(UPI_REGEX);
  if (upiMatches) {
    // Filter out common false positives like email already caught
    const uniqueUpi = upiMatches.filter((u) => !emails?.includes(u));
    if (uniqueUpi.length > 0) {
      reasons.push('Direct payment address (UPI) detected');
      flaggedPatterns.push(...uniqueUpi);
    }
  }

  // Check keyword solicitation
  const keywordMatches = text.match(WHATSAPP_KEYWORDS);
  if (keywordMatches && keywordMatches.length > 0) {
    reasons.push('Off-platform messaging keyword detected');
    flaggedPatterns.push(...keywordMatches);
  }

  // Check unauthorized external URLs
  const externalUrls = text.match(EXTERNAL_URL_REGEX);
  if (externalUrls && externalUrls.length > 0) {
    reasons.push('External website or payment link detected');
    flaggedPatterns.push(...externalUrls);
  }

  return {
    isFlagged: reasons.length > 0,
    reasons,
    flaggedPatterns: Array.from(new Set(flaggedPatterns)),
  };
}
