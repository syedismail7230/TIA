'use client';

import React from 'react';

interface ScoreDisplayProps {
  score: number; // 0 - 100
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  showStatus?: boolean;
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({
  score,
  label = 'TIA Intelligence Score™',
  size = 'md',
  showStatus = true,
}) => {
  const getScoreColor = (val: number) => {
    if (val >= 90) return 'var(--brand-primary)';
    if (val >= 75) return '#059669'; // Crisp dark emerald
    if (val >= 50) return '#D97706'; // Crisp amber
    return '#DC2626'; // Red
  };

  const getStatusText = (val: number) => {
    if (val >= 90) return 'OPTIMAL';
    if (val >= 75) return 'STRONG';
    if (val >= 50) return 'MODERATE';
    return 'HIGH RISK';
  };

  const fontSize = size === 'lg' ? '36px' : size === 'md' ? '24px' : '16px';
  const labelSize = size === 'lg' ? '12px' : '11px';

  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      padding: size === 'lg' ? '16px 20px' : '12px 16px',
      backgroundColor: 'var(--bg-primary)',
      display: 'inline-flex',
      flexDirection: 'column',
      gap: '4px',
    }}>
      <div style={{
        fontSize: labelSize,
        fontWeight: 600,
        color: 'var(--text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        {label}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
        <span
          className="font-tabular"
          style={{
            fontSize,
            fontWeight: 800,
            color: getScoreColor(score),
            letterSpacing: '-0.02em',
          }}
        >
          {score}
        </span>
        <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>/ 100</span>

        {showStatus && (
          <span
            className="tia-badge"
            style={{
              marginLeft: 'auto',
              border: `1px solid ${getScoreColor(score)}`,
              color: getScoreColor(score),
              fontSize: '10px',
              fontWeight: 700,
            }}
          >
            {getStatusText(score)}
          </span>
        )}
      </div>
    </div>
  );
};
