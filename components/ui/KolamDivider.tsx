import React from 'react';

interface KolamDividerProps {
  className?: string;
  width?: string;
  color?: string;
}

export function KolamDivider({ className = '', width = 'max-w-md', color = '#C9A24B' }: KolamDividerProps) {
  return (
    <div className={`flex items-center justify-center gap-3 my-8 mx-auto ${width} ${className}`} aria-hidden="true">
      {/* Left line with taper */}
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent/50 to-accent" />

      {/* Center Kolam Motif */}
      <svg
        viewBox="0 0 64 24"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
        className="w-16 h-6 flex-shrink-0 text-accent"
      >
        {/* Kolam loops */}
        <circle cx="32" cy="12" r="3" fill={color} />
        <path d="M32 4 C37 8 43 8 48 12 C43 16 37 16 32 20 C27 16 21 16 16 12 C21 8 27 8 32 4 Z" />
        <circle cx="20" cy="12" r="1.5" fill={color} />
        <circle cx="44" cy="12" r="1.5" fill={color} />
        <path d="M12 12 L2 12" />
        <path d="M52 12 L62 12" />
      </svg>

      {/* Right line with taper */}
      <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-accent/50 to-accent" />
    </div>
  );
}
