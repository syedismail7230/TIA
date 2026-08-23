'use client';

import React from 'react';
import Link from 'next/link';

interface EmptyStateProps {
  title: string;
  description: string;
  actionText?: string;
  actionHref?: string;
  onAction?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
  actionText,
  actionHref,
  onAction,
}) => {
  return (
    <div style={{
      border: '1px solid var(--border-subtle)',
      backgroundColor: 'var(--bg-primary)',
      padding: '48px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '12px',
    }}>
      <h3 style={{
        fontSize: '16px',
        fontWeight: 700,
        color: 'var(--text-primary)',
        letterSpacing: '-0.01em',
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '13px',
        color: 'var(--text-secondary)',
        maxWidth: '420px',
        lineHeight: 1.6,
      }}>
        {description}
      </p>

      {actionText && (
        <div style={{ marginTop: '12px' }}>
          {actionHref ? (
            <Link href={actionHref} className="tia-btn-primary">
              {actionText}
            </Link>
          ) : (
            <button onClick={onAction} className="tia-btn-primary">
              {actionText}
            </button>
          )}
        </div>
      )}
    </div>
  );
};
