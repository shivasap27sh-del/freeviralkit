import React from 'react';

interface ButterflyIconProps {
  className?: string;
}

/**
 * Standalone butterfly icon for use outside the Logo component.
 * Uses the same premium gradient design for brand consistency.
 */
export default function ButterflyIcon({ className = 'w-6 h-6' }: ButterflyIconProps) {
  const id = React.useId().replace(/:/g, '');

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="https://www.w3.org/2000/svg"
      aria-label="FreeViralKit butterfly"
    >
      <defs>
        <linearGradient id={`${id}-pink`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#db2777" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id={`${id}-purple`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="50%" stopColor="#6d28d9" />
          <stop offset="100%" stopColor="#831843" />
        </linearGradient>
        <linearGradient id={`${id}-body`} x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Top Left Wing */}
      <ellipse
        cx="32"
        cy="36"
        rx="14"
        ry="22"
        transform="rotate(-25 32 36)"
        fill={`url(#${id}-pink)`}
        opacity="0.95"
      />
      {/* Top Right Wing */}
      <ellipse
        cx="68"
        cy="36"
        rx="14"
        ry="22"
        transform="rotate(25 68 36)"
        fill={`url(#${id}-pink)`}
        opacity="0.95"
      />

      {/* Bottom Left Wing */}
      <ellipse
        cx="38"
        cy="62"
        rx="10"
        ry="15"
        transform="rotate(-12 38 62)"
        fill={`url(#${id}-purple)`}
        opacity="0.9"
      />
      {/* Bottom Right Wing */}
      <ellipse
        cx="62"
        cy="62"
        rx="10"
        ry="15"
        transform="rotate(12 62 62)"
        fill={`url(#${id}-purple)`}
        opacity="0.9"
      />

      {/* Wing highlights */}
      <ellipse cx="36" cy="34" rx="5" ry="8" transform="rotate(-25 36 34)" fill="white" opacity="0.12" />
      <ellipse cx="64" cy="34" rx="5" ry="8" transform="rotate(25 64 34)" fill="white" opacity="0.12" />

      {/* Body */}
      <ellipse cx="50" cy="50" rx="3" ry="16" fill={`url(#${id}-body)`} />

      {/* Antennae */}
      <path d="M50 34 Q44 22 38 18" fill="none" stroke={`url(#${id}-body)`} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <path d="M50 34 Q56 22 62 18" fill="none" stroke={`url(#${id}-body)`} strokeWidth="1.5" strokeLinecap="round" opacity="0.7" />
      <circle cx="37" cy="17" r="2" fill="#ec4899" opacity="0.6" />
      <circle cx="63" cy="17" r="2" fill="#ec4899" opacity="0.6" />
    </svg>
  );
}
