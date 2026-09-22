import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  clickable?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showTagline = false,
  clickable = true,
}) => {
  const iconSizeMap = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
  };

  const textSizeMap = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const content = (
    <div className="flex items-center gap-3 group select-none">
      {/* SVG Icon matching stylized C identity */}
      <div className={`relative flex-shrink-0 ${iconSizeMap[size]} transition-transform duration-300 group-hover:scale-105`}>
        <svg viewBox="0 0 140 140" className="w-full h-full drop-shadow-[0_0_12px_rgba(124,58,237,0.5)]">
          <defs>
            <linearGradient id="logo-c-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A78BFA" />
              <stop offset="40%" stopColor="#7C3AED" />
              <stop offset="75%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <linearGradient id="logo-x-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7C3AED" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
            <pattern id="logo-checker" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="8" height="8" fill="#18181B" />
              <rect x="8" y="0" width="8" height="8" fill="#2E2A45" />
              <rect x="0" y="8" width="8" height="8" fill="#2E2A45" />
              <rect x="8" y="8" width="8" height="8" fill="#18181B" />
            </pattern>
          </defs>

          {/* Checkerboard inside cutout */}
          <circle cx="65" cy="65" r="32" fill="url(#logo-checker)" />

          {/* C Shape */}
          <path
            d="M 108 36 C 94 14, 64 6, 38 20 C 12 34, 2 66 14 94 C 26 122, 60 134 88 122 C 102 116, 110 106, 112 98 L 90 90 C 86 96, 78 102, 68 104 C 48 108, 32 94, 28 78 C 24 58, 38 38, 58 32 C 74 28, 90 36, 96 46 Z"
            fill="url(#logo-c-grad)"
          />

          {/* Floating Pixel Blocks */}
          <rect x="110" y="70" width="10" height="10" rx="2" fill="#3B82F6" />
          <rect x="123" y="70" width="7" height="7" rx="1.5" fill="#22D3EE" />
          <rect x="123" y="83" width="5" height="5" rx="1" fill="#A78BFA" />
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col">
        <div className={`font-extrabold tracking-tight text-white flex items-center ${textSizeMap[size]}`}>
          <span>Clipp</span>
          {/* Dot on i */}
          <span className="relative">
            i
            <span className="absolute -top-1 left-[30%] w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
          </span>
          <span className="bg-gradient-to-r from-[#7C3AED] via-[#3B82F6] to-[#22D3EE] bg-clip-text text-transparent ml-0.5">
            x
          </span>
        </div>

        {showTagline && (
          <span className="text-[9px] font-semibold tracking-[0.25em] text-[#A1A1AA] uppercase mt-0.5">
            EDIT <span className="text-[#A78BFA]">•</span> REMOVE <span className="text-[#22D3EE">•</span> CREATE
          </span>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return <Link to="/">{content}</Link>;
  }

  return content;
};
