import React from 'react';

interface OrnamentProps {
  type?: 'gopuram' | 'deepam' | 'lotus' | 'toranam' | 'corner' | 'mandala';
  className?: string;
  size?: number;
}

export function Ornament({ type = 'lotus', className = '', size = 32 }: OrnamentProps) {
  if (type === 'gopuram') {
    return (
      <svg
        viewBox="0 0 100 80"
        fill="currentColor"
        className={className}
        style={{ width: size, height: (size * 80) / 100 }}
        aria-hidden="true"
      >
        {/* Tiered Gopuram Silhouette */}
        <path d="M50 0 L52 8 L55 8 L54 16 L60 16 L58 26 L65 26 L63 38 L70 38 L68 52 L76 52 L74 68 L85 68 L85 78 L15 78 L15 68 L26 68 L24 52 L32 52 L30 38 L37 38 L35 26 L42 26 L40 16 L46 16 L45 8 L48 8 Z" />
        <path d="M44 60 C44 55 47 52 50 52 C53 52 56 55 56 60 L56 78 L44 78 Z" fill="#FBF3E4" opacity="0.3" />
        {/* Kalasam Finials */}
        <circle cx="50" cy="2" r="2.5" />
        <circle cx="45" cy="4" r="1.5" />
        <circle cx="55" cy="4" r="1.5" />
      </svg>
    );
  }

  if (type === 'deepam') {
    return (
      <svg
        viewBox="0 0 40 60"
        fill="none"
        className={className}
        style={{ width: size, height: (size * 60) / 40 }}
        aria-hidden="true"
      >
        {/* Oil Lamp / Kuthuvilakku Base & Stem */}
        <path
          d="M20 18 C20 18 10 24 10 32 C10 37 14 41 20 41 C26 41 30 37 30 32 C30 24 20 18 20 18 Z"
          fill="currentColor"
          opacity="0.85"
        />
        {/* Lamp Base Pedestal */}
        <path d="M18 41 L18 52 L12 56 L12 59 L28 59 L28 56 L22 52 L22 41 Z" fill="currentColor" />
        {/* Flame with Glow */}
        <path
          d="M20 4 C20 4 15 10 15 14 C15 17 17.2 19 20 19 C22.8 19 25 17 25 14 C25 10 20 4 20 4 Z"
          fill="#E8A317"
          className="animate-flame"
        />
        <circle cx="20" cy="14" r="2.5" fill="#FFFDF8" />
      </svg>
    );
  }

  if (type === 'corner') {
    return (
      <svg
        viewBox="0 0 50 50"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={className}
        style={{ width: size, height: size }}
        aria-hidden="true"
      >
        <path d="M2 48 L2 14 C2 7.37 7.37 2 14 2 L48 2" />
        <path d="M7 48 L7 17 C7 11.48 11.48 7 17 7 L48 7" opacity="0.6" strokeDasharray="2 2" />
        <circle cx="14" cy="14" r="3" fill="currentColor" />
      </svg>
    );
  }

  if (type === 'toranam') {
    return (
      <svg
        viewBox="0 0 200 40"
        fill="none"
        className={className}
        style={{ width: '100%', height: size }}
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Garland string */}
        <path d="M0 5 Q50 25 100 5 Q150 25 200 5" stroke="#C9A24B" strokeWidth="2" fill="none" />
        {/* Mango Leaves */}
        <path d="M25 14 C20 22 23 34 26 38 C28 34 32 22 27 14 Z" fill="#2F5D3A" />
        <path d="M50 18 C46 25 48 37 51 40 C53 37 57 25 52 18 Z" fill="#2F5D3A" />
        <path d="M75 14 C70 22 73 34 76 38 C78 34 82 22 77 14 Z" fill="#2F5D3A" />
        <path d="M100 19 C96 26 98 38 101 41 C103 38 107 26 102 19 Z" fill="#2F5D3A" />
        <path d="M125 14 C120 22 123 34 126 38 C128 34 132 22 127 14 Z" fill="#2F5D3A" />
        <path d="M150 18 C146 25 148 37 151 40 C153 37 157 25 152 18 Z" fill="#2F5D3A" />
        <path d="M175 14 C170 22 173 34 176 38 C178 34 182 22 177 14 Z" fill="#2F5D3A" />
        {/* Marigold / Jasmine accents */}
        <circle cx="26" cy="14" r="3" fill="#E8A317" />
        <circle cx="51" cy="18" r="3" fill="#E8A317" />
        <circle cx="76" cy="14" r="3" fill="#E8A317" />
        <circle cx="101" cy="19" r="3.5" fill="#E8A317" />
        <circle cx="126" cy="14" r="3" fill="#E8A317" />
        <circle cx="151" cy="18" r="3" fill="#E8A317" />
        <circle cx="176" cy="14" r="3" fill="#E8A317" />
      </svg>
    );
  }

  // Default: Lotus
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      className={className}
      style={{ width: size, height: (size * 40) / 60 }}
      aria-hidden="true"
    >
      {/* Central petal */}
      <path
        d="M30 4 C32 14 36 22 30 32 C24 22 28 14 30 4 Z"
        fill="currentColor"
        opacity="0.95"
      />
      {/* Inner left petal */}
      <path
        d="M30 14 C23 16 17 23 21 32 C25 31 29 24 30 14 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Inner right petal */}
      <path
        d="M30 14 C37 16 43 23 39 32 C35 31 31 24 30 14 Z"
        fill="currentColor"
        opacity="0.8"
      />
      {/* Outer left petal */}
      <path
        d="M26 22 C17 24 10 28 14 35 C20 35 24 30 26 22 Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Outer right petal */}
      <path
        d="M34 22 C43 24 50 28 46 35 C40 35 36 30 34 22 Z"
        fill="currentColor"
        opacity="0.65"
      />
      {/* Base curve */}
      <path
        d="M18 35 C24 38 36 38 42 35 C38 36 22 36 18 35 Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * Hanging Jasmine Garland (Poomalai)
 */
export function JasmineGarland({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-1.5 opacity-80 ${className}`} aria-hidden="true">
      <div className="w-0.5 h-12 bg-accent/40" />
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="flex gap-1 items-center">
          <div className="w-2.5 h-2.5 rounded-full bg-jasmine shadow-sm border border-accent/20" />
          {i % 3 === 0 && (
            <div className="w-2 h-2 rounded-full bg-turmeric shadow-sm" />
          )}
        </div>
      ))}
      <div className="w-4 h-6 rounded-b-full bg-accent/80 mt-1 shadow-sm" />
    </div>
  );
}
