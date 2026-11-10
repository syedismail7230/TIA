// ============================================================================
// TIA CANONICAL TRANSACTIONAL EMAIL DESIGN SYSTEM
// Matches Official Platform Light UI/UX (Pure White, Electric Blue #0052FF, Slate #0F172A)
// 100% Mobile Responsive + Email-Client-Safe HTML Table Architecture
// Tested across iOS Mail, Gmail Android/iOS, Outlook Mobile/Desktop, Yahoo, Web
// ============================================================================

export interface BaseEmailOptions {
  badgeText: string;
  badgeColor?: 'blue' | 'emerald' | 'amber' | 'purple' | 'rose';
  title: string;
  subtitle?: string;
  contentHtml: string;
  ctaButton?: {
    label: string;
    url: string;
    color?: string;
  };
  highlightBox?: {
    label?: string;
    value: string;
    subtext?: string;
    style?: 'dashed' | 'solid';
  };
  keyValues?: { label: string; value: string; color?: string }[];
  footerNote?: string;
}

const BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  blue: { bg: '#EFF6FF', text: '#0052FF', border: '#BFDBFE' },
  emerald: { bg: '#ECFDF5', text: '#059669', border: '#A7F3D0' },
  amber: { bg: '#FFFBEB', text: '#D97706', border: '#FDE68A' },
  purple: { bg: '#FAF5FF', text: '#7C3AED', border: '#DDD6FE' },
  rose: { bg: '#FFF1F2', text: '#E11D48', border: '#FECDD3' },
};

export function renderPlatformEmail(opts: BaseEmailOptions): string {
  const badgeStyle = BADGE_COLORS[opts.badgeColor || 'blue'] || BADGE_COLORS.blue;
  const ctaBg = opts.ctaButton?.color || '#0052FF';

  // Highlight Box (OTP or Key Highlight Metric) - Fluid & Mobile Safe
  let highlightHtml = '';
  if (opts.highlightBox) {
    const isDashed = opts.highlightBox.style !== 'solid';
    const borderStyle = isDashed ? 'dashed' : 'solid';
    highlightHtml = `
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" align="center" style="margin: 22px auto; width: 100%; max-width: 380px; border-collapse: separate;">
        <tr>
          <td class="mobile-otp-box" align="center" style="background-color: #EFF6FF; border: 2px ${borderStyle} #0052FF; border-radius: 12px; padding: 20px 28px; text-align: center;">
            ${opts.highlightBox.label ? `<div style="font-size: 11px; font-weight: 700; color: #475569; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${opts.highlightBox.label}</div>` : ''}
            <div class="mobile-otp-text" style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0052FF; font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace; line-height: 1.1; padding-left: 8px; word-break: break-all;">${opts.highlightBox.value}</div>
            ${opts.highlightBox.subtext ? `<div style="font-size: 12px; color: #64748B; margin-top: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">${opts.highlightBox.subtext}</div>` : ''}
          </td>
        </tr>
      </table>
    `;
  }

  // Key-Value Breakdown Table - 100% Email Safe & Responsive
  let keyValuesHtml = '';
  if (opts.keyValues && opts.keyValues.length > 0) {
    const rows = opts.keyValues
      .map((kv, idx) => {
        const isLast = idx === opts.keyValues!.length - 1;
        const borderStyle = isLast ? 'none' : '1px solid #E2E8F0';
        return `
          <tr>
            <td class="mobile-kv-cell" align="left" style="padding: 12px 0; border-bottom: ${borderStyle}; color: #64748B; font-size: 13.5px; font-weight: 500; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
              ${kv.label}
            </td>
            <td class="mobile-kv-cell" align="right" style="padding: 12px 0; border-bottom: ${borderStyle}; color: ${kv.color || '#0F172A'}; font-size: 13.5px; font-weight: 700; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; white-space: nowrap;">
              ${kv.value}
            </td>
          </tr>
        `;
      })
      .join('');

    keyValuesHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 22px 0; border-collapse: separate;">
        <tr>
          <td class="mobile-kv-container" style="background-color: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 6px 20px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
              ${rows}
            </table>
          </td>
        </tr>
      </table>
    `;
  }

  // Primary Call-To-Action Button - Bulletproof Email Table Button with Mobile Full-Width
  let ctaHtml = '';
  if (opts.ctaButton) {
    ctaHtml = `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 26px 0 10px;">
        <tr>
          <td align="center">
            <table role="presentation" class="mobile-btn-table" cellpadding="0" cellspacing="0" border="0" style="border-collapse: separate;">
              <tr>
                <td align="center" style="background-color: ${ctaBg}; border-radius: 8px;">
                  <a href="${opts.ctaButton.url}" target="_blank" class="mobile-btn-link" style="display: inline-block; padding: 14px 36px; background-color: ${ctaBg}; color: #FFFFFF; text-decoration: none; font-size: 14.5px; font-weight: 700; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; letter-spacing: 0.2px; -webkit-text-size-adjust: none;">
                    ${opts.ctaButton.label}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    `;
  }

  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
  <meta name="x-apple-disable-message-reformatting" />
  <meta name="format-detection" content="telephone=no, address=no, email=no, date=no, url=no" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <title>${opts.title}</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  <style type="text/css">
    /* Client-specific Resets */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
    body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #F1F5F9; }
    
    /* Mobile Responsive Rules */
    @media only screen and (max-width: 600px) {
      .mobile-outer-wrap {
        padding: 12px 8px !important;
      }
      .mobile-card {
        width: 100% !important;
        max-width: 100% !important;
        border-radius: 12px !important;
      }
      .mobile-header-padding {
        padding: 16px 18px !important;
      }
      .mobile-body-padding {
        padding: 26px 18px 22px 18px !important;
      }
      .mobile-footer-padding {
        padding: 20px 18px !important;
      }
      .mobile-brand-logo {
        width: 130px !important;
        height: auto !important;
      }
      .mobile-title {
        font-size: 21px !important;
        line-height: 1.3 !important;
      }
      .mobile-subtitle {
        font-size: 13.5px !important;
      }
      .mobile-otp-box {
        padding: 16px 18px !important;
      }
      .mobile-otp-text {
        font-size: 28px !important;
        letter-spacing: 5px !important;
        padding-left: 5px !important;
      }
      .mobile-kv-container {
        padding: 4px 14px !important;
      }
      .mobile-kv-cell {
        font-size: 12.5px !important;
        padding: 10px 0 !important;
      }
      .mobile-btn-table {
        width: 100% !important;
      }
      .mobile-btn-link {
        display: block !important;
        width: 100% !important;
        box-sizing: border-box !important;
        padding: 14px 20px !important;
        text-align: center !important;
      }
    }
  </style>
</head>
<body style="margin: 0; padding: 32px 12px; background-color: #F1F5F9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #0F172A; -webkit-font-smoothing: antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #F1F5F9; width: 100%;">
    <tr>
      <td class="mobile-outer-wrap" align="center" style="padding: 16px 8px;">
        <!-- Container Card -->
        <table role="presentation" class="mobile-card" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 560px; background-color: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 16px; overflow: hidden; border-collapse: separate; box-shadow: 0 10px 25px -5px rgba(0, 82, 255, 0.06), 0 8px 10px -6px rgba(0, 0, 0, 0.04);">
          
          <!-- Header Bar with Official TIA Brand Logo & Pill Badge -->
          <tr>
            <td class="mobile-header-padding" style="padding: 22px 28px; background-color: #FFFFFF; border-bottom: 1px solid #F1F5F9;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="border-collapse: collapse;">
                <tr>
                  <td align="left" style="vertical-align: middle;">
                    <a href="https://www.theinfluencers.agency" target="_blank" style="text-decoration: none; display: inline-block;">
                      <img src="https://www.theinfluencers.agency/logo-cropped.png" alt="The Influencer's Agency" class="mobile-brand-logo" width="150" height="38" style="display: block; width: 150px; max-width: 160px; height: 38px; border: 0; outline: none; text-decoration: none;" />
                    </a>
                  </td>
                  <td align="right" style="vertical-align: middle;">
                    <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="display: inline-table; border-collapse: separate;">
                      <tr>
                        <td style="padding: 5px 14px; background-color: ${badgeStyle.bg}; border: 1px solid ${badgeStyle.border}; border-radius: 9999px;">
                          <span style="font-size: 10.5px; font-weight: 800; color: ${badgeStyle.text}; text-transform: uppercase; letter-spacing: 0.6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                            ${opts.badgeText}
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Main Email Content -->
          <tr>
            <td class="mobile-body-padding" style="padding: 38px 32px 32px 32px; text-align: center;">
              
              <!-- Title -->
              <h1 class="mobile-title" style="color: #0F172A; margin: 0 0 10px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px; line-height: 1.3; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                ${opts.title}
              </h1>

              <!-- Subtitle -->
              ${opts.subtitle ? `
                <p class="mobile-subtitle" style="color: #64748B; margin: 0 0 20px 0; font-size: 14.5px; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  ${opts.subtitle}
                </p>
              ` : ''}

              <!-- Highlight Box (e.g. OTP) -->
              ${highlightHtml}

              <!-- Structured Breakdown Table -->
              ${keyValuesHtml}

              <!-- Narrative Content -->
              ${opts.contentHtml ? `
                <div style="text-align: left; color: #334155; font-size: 14px; line-height: 1.6; margin: 18px 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  ${opts.contentHtml}
                </div>
              ` : ''}

              <!-- Action Button -->
              ${ctaHtml}

              <!-- Optional Footer Note -->
              ${opts.footerNote ? `
                <p style="color: #64748B; font-size: 12.5px; line-height: 1.5; margin: 24px 0 0 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                  ${opts.footerNote}
                </p>
              ` : ''}

            </td>
          </tr>

          <!-- Footer Bar -->
          <tr>
            <td class="mobile-footer-padding" style="padding: 24px 32px; background-color: #F8FAFC; border-top: 1px solid #E2E8F0; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 11.5px; color: #64748B; line-height: 1.5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                &copy; 2026 The Influencer's Agency (TIA). All payments held under TIA Payment Protection.
              </p>
              <p style="margin: 0; font-size: 11px; color: #94A3B8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
                Bengaluru &bull; Mumbai &bull; Singapore &bull; London
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}
