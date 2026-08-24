import React from 'react';

interface BlueCheckBadgeProps {
  size?: number;
  title?: string;
  className?: string;
}

/**
 * Official TIA Blue Tick Badge component (Geometric Scalloped Rosette with Crisp White Check)
 */
export function BlueCheckBadge({
  size = 18,
  title = 'Verified Profile',
  className = '',
}: BlueCheckBadgeProps) {
  return (
    <span
      title={title}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        verticalAlign: 'middle',
        flexShrink: 0,
        cursor: 'default',
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.5213 2.62368C11.3147 1.75255 12.6853 1.75255 13.4787 2.62368L14.4989 3.74391C14.8998 4.18418 15.4761 4.42288 16.071 4.39508L17.5845 4.32431C18.7614 4.26924 19.7308 5.23862 19.6757 6.41551L19.6049 7.92901C19.5771 8.52387 19.8158 9.10017 20.2561 9.50111L21.3763 10.5213C22.2475 11.3147 22.2475 12.6853 21.3763 13.4787L20.2561 14.4989C19.8158 14.8998 19.5771 15.4761 19.6049 16.071L19.6757 17.5845C19.7308 18.7614 18.7614 19.7308 17.5845 19.6757L16.071 19.6049C15.4761 19.5771 14.8998 19.8158 14.4989 20.2561L13.4787 21.3763C12.6853 22.2475 11.3147 22.2475 10.5213 21.3763L9.50111 20.2561C9.10017 19.8158 8.52387 19.5771 7.92901 19.6049L6.41551 19.6757C5.23862 19.7308 4.26924 18.7614 4.32431 17.5845L4.39508 16.071C4.42288 15.4761 4.18418 14.8998 3.74391 14.4989L2.62368 13.4787C1.75255 12.6853 1.75255 11.3147 2.62368 10.5213L3.74391 9.50111C4.18418 9.10017 4.42288 8.52387 4.39508 7.92901L4.32431 6.41551C4.26924 5.23862 5.23862 4.26924 6.41551 4.32431L7.92901 4.39508C8.52387 4.42288 9.10017 4.18418 9.50111 3.74391L10.5213 2.62368Z"
          fill="#0052FF"
        />
        <path
          d="M8.80005 12.2L11.2 14.6L16 9.60001"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default BlueCheckBadge;
