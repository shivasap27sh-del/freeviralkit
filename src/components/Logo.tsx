'use client';

import { useId } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
  className?: string;
}

/**
 * FreeViralKit logo using the original butterfly PNG icon
 * with brand-matched typography (FREEVIRAL bold + KIT light).
 */
export default function Logo({
  size = 'md',
  showText = true,
  showTagline = true,
  className = '',
}: LogoProps) {
  const svgSizes = {
    sm: 24,
    md: 30,
    lg: 40,
  };

  const containerSizes = {
    sm: 'w-9 h-9',
    md: 'w-11 h-11',
    lg: 'w-[3.5rem] h-[3.5rem]',
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const taglineSizes = {
    sm: 'text-[9px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  const svgSize = svgSizes[size];
  const uniqueId = useId();

  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      {/* Butterfly icon — inline SVG */}
      <div
        className={`${containerSizes[size]} rounded-xl bg-purple-50/40 dark:bg-purple-950/20 border border-purple-100/60 dark:border-purple-900/40 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-purple-500/10`}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="https://www.w3.org/2000/svg"
          aria-label="FreeViralKit butterfly logo"
        >
          <defs>
            <linearGradient id={`${uniqueId}-grad-left`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-grad-right`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ec4899" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id={`${uniqueId}-body`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#7c3aed" />
              <stop offset="100%" stopColor="#db2777" />
            </linearGradient>
          </defs>
          {/* Left upper wing */}
          <path
            d="M30 28C26 16 16 8 10 10C4 12 6 22 12 28C16 32 24 32 30 30Z"
            fill={`url(#${uniqueId}-grad-left)`}
            opacity="0.9"
          />
          {/* Left lower wing */}
          <path
            d="M30 34C24 36 14 38 10 46C8 52 14 56 20 50C24 46 28 38 30 34Z"
            fill={`url(#${uniqueId}-grad-left)`}
            opacity="0.7"
          />
          {/* Right upper wing */}
          <path
            d="M34 28C38 16 48 8 54 10C60 12 58 22 52 28C48 32 40 32 34 30Z"
            fill={`url(#${uniqueId}-grad-right)`}
            opacity="0.9"
          />
          {/* Right lower wing */}
          <path
            d="M34 34C40 36 50 38 54 46C56 52 50 56 44 50C40 46 36 38 34 34Z"
            fill={`url(#${uniqueId}-grad-right)`}
            opacity="0.7"
          />
          {/* Body */}
          <ellipse cx="32" cy="32" rx="2.5" ry="12" fill={`url(#${uniqueId}-body)`} />
          {/* Antennae */}
          <path
            d="M31 20C28 14 24 10 22 8"
            stroke="#7c3aed"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M33 20C36 14 40 10 42 8"
            stroke="#db2777"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Antenna tips */}
          <circle cx="22" cy="8" r="2" fill="#8b5cf6" />
          <circle cx="42" cy="8" r="2" fill="#ec4899" />
        </svg>
      </div>

      {/* Text branding — matches the brand reference:
           FREEVIRAL = heavy/black weight, dark plum
           KIT = lighter weight, magenta-pink
           Since 2026 = cursive italic pink */}
      {showText && (
        <div className="flex flex-col space-y-0.5 select-none text-left">
          <span
            className={`font-sans ${textSizes[size]} tracking-tight uppercase leading-none`}
          >
            <span className="font-black text-[#3b0a2a] dark:text-purple-200">
              FREEVIRAL
            </span>
            <span className="font-normal text-[#c2185b] dark:text-pink-300">
              KIT
            </span>
          </span>
          {showTagline && (
            <span
              className={`tracking-widest opacity-80 italic font-serif ${taglineSizes[size]} pl-0.5 leading-none text-[#e91e7e] dark:text-pink-400`}
            >
              Since 2026
            </span>
          )}
        </div>
      )}
    </div>
  );
}
