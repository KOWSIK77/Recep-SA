'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

export function SplineFallback() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      // Gentle floating animation
      gsap.to('.fallback-lotus', {
        y: -12,
        rotation: 2,
        duration: 3.5,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Subtle breathing glow rings
      gsap.to('.fallback-glow', {
        scale: 1.15,
        opacity: 0.7,
        duration: 2.8,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none"
      aria-hidden="true"
    >
      {/* Radiant ambient glow rings */}
      <div className="fallback-glow absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent/15 blur-3xl" />
      <div className="fallback-glow absolute w-48 h-48 md:w-60 md:h-60 rounded-full bg-accent-light/20 blur-2xl" />

      {/* Ornate Gold Lotus and Deepam Sacred Emblem */}
      <div className="fallback-lotus relative z-10 flex flex-col items-center">
        {/* Flame with glowing aura */}
        <div className="relative mb-[-12px] z-20">
          <svg width="42" height="60" viewBox="0 0 42 60" fill="none">
            <path
              d="M21 2 C21 2 10 14 10 24 C10 32 15 36 21 36 C27 36 32 32 32 24 C32 14 21 2 21 2 Z"
              fill="url(#goldFlameGrad)"
              className="animate-flame"
            />
            <circle cx="21" cy="24" r="5" fill="#FFFDF8" opacity="0.9" />
            <defs>
              <linearGradient id="goldFlameGrad" x1="21" y1="2" x2="21" y2="36" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFFDF8" />
                <stop offset="0.4" stopColor="#E8A317" />
                <stop offset="1" stopColor="#C9A24B" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Regal Lotus Tier */}
        <svg
          width="160"
          height="120"
          viewBox="0 0 160 120"
          fill="none"
          className="text-accent drop-shadow-[0_4px_16px_rgba(201,162,75,0.4)]"
        >
          {/* Outer Petals */}
          <path
            d="M80 40 C60 10 30 35 40 70 C55 68 70 58 80 40 Z"
            fill="url(#lotusGold1)"
            opacity="0.85"
          />
          <path
            d="M80 40 C100 10 130 35 120 70 C105 68 90 58 80 40 Z"
            fill="url(#lotusGold1)"
            opacity="0.85"
          />

          {/* Side Outer Petals */}
          <path
            d="M80 60 C45 35 15 65 30 95 C55 92 72 80 80 60 Z"
            fill="url(#lotusGold2)"
            opacity="0.75"
          />
          <path
            d="M80 60 C115 35 145 65 130 95 C105 92 88 80 80 60 Z"
            fill="url(#lotusGold2)"
            opacity="0.75"
          />

          {/* Center Main Petals */}
          <path
            d="M80 20 C70 42 74 65 80 82 C86 65 90 42 80 20 Z"
            fill="url(#lotusGoldCenter)"
          />
          <path
            d="M80 45 C68 50 56 65 65 86 C72 84 78 72 80 45 Z"
            fill="url(#lotusGold1)"
          />
          <path
            d="M80 45 C92 50 104 65 95 86 C88 84 82 72 80 45 Z"
            fill="url(#lotusGold1)"
          />

          {/* Lotus Base Pedestal */}
          <path
            d="M50 92 C70 100 90 100 110 92 C100 97 60 97 50 92 Z"
            fill="#E6C980"
          />
          <path
            d="M62 96 L62 106 L54 112 L106 112 L98 106 L98 96 Z"
            fill="url(#lotusGoldCenter)"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="lotusGoldCenter" x1="80" y1="20" x2="80" y2="112" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFEAA7" />
              <stop offset="0.5" stopColor="#E6C980" />
              <stop offset="1" stopColor="#C9A24B" />
            </linearGradient>
            <linearGradient id="lotusGold1" x1="40" y1="20" x2="120" y2="90" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FDE68A" />
              <stop offset="0.7" stopColor="#C9A24B" />
              <stop offset="1" stopColor="#9E7B30" />
            </linearGradient>
            <linearGradient id="lotusGold2" x1="20" y1="30" x2="140" y2="100" gradientUnits="userSpaceOnUse">
              <stop stopColor="#E6C980" />
              <stop offset="1" stopColor="#78591A" />
            </linearGradient>
          </defs>
        </svg>

        {/* Monogram or Auspicious S&A crest underneath */}
        <div className="mt-2 text-center">
          <span className="font-serif tracking-[0.3em] text-xs font-semibold uppercase text-accent-light drop-shadow-sm">
            Sasikumar &amp; Adithya
          </span>
        </div>
      </div>
    </div>
  );
}
