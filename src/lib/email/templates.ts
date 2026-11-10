// ============================================================================
// TIA CANONICAL TRANSACTIONAL EMAIL DESIGN SYSTEM
// Matches Platform Dark Luxury UI/UX (Tailwind Slate / Indigo / Electric Blue)
// ============================================================================

export interface BaseEmailOptions {
  badgeText: string;
  badgeColor?: string; // 'blue' | 'emerald' | 'amber' | 'purple' | 'rose'
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
  blue: { bg: 'rgba(59, 130, 246, 0.2)', text: '#60a5fa', border: 'rgba(59, 130, 246, 0.4)' },
  emerald: { bg: 'rgba(16, 185, 129, 0.2)', text: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
  amber: { bg: 'rgba(245, 158, 11, 0.2)', text: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' },
  purple: { bg: 'rgba(147, 51, 234, 0.2)', text: '#c084fc', border: 'rgba(147, 51, 234, 0.4)' },
  rose: { bg: 'rgba(244, 63, 94, 0.2)', text: '#fb7185', border: 'rgba(244, 63, 94, 0.4)' },
};

export function renderPlatformEmail(opts: BaseEmailOptions): string {
  const badgeStyle = BADGE_COLORS[opts.badgeColor || 'blue'] || BADGE_COLORS.blue;
  const ctaBg = opts.ctaButton?.color || '#2563eb';

  let highlightHtml = '';
  if (opts.highlightBox) {
    const isDashed = opts.highlightBox.style !== 'solid';
    highlightHtml = `
      <div style="margin: 24px auto; padding: 20px 24px; background: #1e293b; border: 2px ${isDashed ? 'dashed' : 'solid'} #3b82f6; border-radius: 12px; display: inline-block; max-width: 90%;">
        ${opts.highlightBox.label ? `<div style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 6px;">${opts.highlightBox.label}</div>` : ''}
        <div style="font-size: 32px; font-weight: 800; letter-spacing: 4px; color: #60a5fa; font-family: monospace;">${opts.highlightBox.value}</div>
        ${opts.highlightBox.subtext ? `<div style="font-size: 12px; color: #94a3b8; margin-top: 6px;">${opts.highlightBox.subtext}</div>` : ''}
      </div>
    `;
  }

  let keyValuesHtml = '';
  if (opts.keyValues && opts.keyValues.length > 0) {
    const rows = opts.keyValues
      .map(
        (kv) => `
        <div style="display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid #1e293b; font-size: 13px;">
          <span style="color: #94a3b8;">${kv.label}</span>
          <span style="font-weight: 700; color: ${kv.color || '#f1f5f9'};">${kv.value}</span>
        </div>`
      )
      .join('');

    keyValuesHtml = `
      <div style="background: #0f172a; border: 1px solid #1e293b; border-radius: 10px; padding: 14px 18px; margin: 20px 0; text-align: left;">
        ${rows}
      </div>
    `;
  }

  let ctaHtml = '';
  if (opts.ctaButton) {
    ctaHtml = `
      <div style="margin: 28px 0 10px;">
        <a href="${opts.ctaButton.url}" style="display: inline-block; padding: 12px 32px; background: ${ctaBg}; color: #ffffff; text-decoration: none; font-weight: 700; font-size: 14px; border-radius: 8px; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);">${opts.ctaButton.label}</a>
      </div>
    `;
  }

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${opts.title}</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #030712; color: #f9fafb; margin: 0; padding: 32px 16px;">
  <div style="max-width: 540px; margin: 0 auto; background-color: #0b0f19; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
    <!-- Header -->
    <div style="padding: 24px 32px; background: linear-gradient(135deg, #0b0f19 0%, #1e1b4b 100%); border-bottom: 1px solid #1e293b; display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 16px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">THE INFLUENCER'S AGENCY</span>
      <span style="display: inline-block; padding: 3px 10px; font-size: 10px; font-weight: 700; background: ${badgeStyle.bg}; color: ${badgeStyle.text}; border: 1px solid ${badgeStyle.border}; border-radius: 9999px; letter-spacing: 0.5px; text-transform: uppercase;">${opts.badgeText}</span>
    </div>

    <!-- Body -->
    <div style="padding: 36px 32px; color: #cbd5e1; line-height: 1.6; font-size: 14px; text-align: center;">
      <h2 style="color: #ffffff; margin: 0 0 10px 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">${opts.title}</h2>
      ${opts.subtitle ? `<p style="color: #94a3b8; margin: 0 0 20px 0; font-size: 14px;">${opts.subtitle}</p>` : ''}

      ${highlightHtml}
      ${keyValuesHtml}

      <div style="text-align: left; color: #94a3b8; font-size: 14px; margin: 16px 0;">
        ${opts.contentHtml}
      </div>

      ${ctaHtml}

      ${opts.footerNote ? `<p style="color: #64748b; font-size: 12px; margin-top: 24px;">${opts.footerNote}</p>` : ''}
    </div>

    <!-- Footer -->
    <div style="padding: 20px 32px; background-color: #030712; border-top: 1px solid #1e293b; text-align: center; font-size: 11px; color: #64748b; line-height: 1.5;">
      &copy; 2026 The Influencer's Agency (TIA). All payments held under TIA Payment Protection.<br/>
      Bengaluru • Mumbai • Singapore • London
    </div>
  </div>
</body>
</html>
  `.trim();
}
