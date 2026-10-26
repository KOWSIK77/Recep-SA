'use client';

import React, { useRef } from 'react';
import { siteConfig } from '@/lib/config';
import { Ornament } from '@/components/ui/Ornament';
import { KolamDivider } from '@/components/ui/KolamDivider';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

export function Celebrate() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      tl.from('.celebrate-ornament', {
        scale: 0.7,
        opacity: 0,
        duration: 0.6,
        ease: GSAP_EASE.bounce,
      })
        .from(
          '.celebrate-eyebrow',
          {
            y: -10,
            opacity: 0,
            duration: 0.5,
          },
          '-=0.3'
        )
        .from(
          '.celebrate-title',
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: GSAP_EASE.cinematic,
          },
          '-=0.3'
        )
        .from(
          '.celebrate-text',
          {
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: GSAP_EASE.smooth,
          },
          '-=0.4'
        )
        .from(
          '.celebrate-families',
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
            ease: GSAP_EASE.smooth,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="celebrate"
      ref={containerRef}
      className="relative py-14 px-4 max-w-sm mx-auto text-center overflow-hidden"
    >
      {/* Auspicious Lotus Top Emblem */}
      <div className="celebrate-ornament flex justify-center mb-3">
        <Ornament type="lotus" size={36} className="text-accent" />
      </div>

      <p className="celebrate-eyebrow text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-accent mb-2">
        Blessings &amp; Welcome
      </p>

      <h2 className="celebrate-title text-2xl sm:text-3xl font-serif font-bold text-primary mb-4">
        With Joyful Hearts &amp; Grace
      </h2>

      <KolamDivider className="my-4" />

      {/* Invitation Note Copy */}
      <p className="celebrate-text text-base text-ink font-serif italic leading-relaxed mb-6 px-1">
        &ldquo;{siteConfig.event.celebrateNote}&rdquo;
      </p>

      {/* Families Tribute */}
      <div className="celebrate-families w-full p-4 rounded-2xl bg-secondary/85 border border-accent/30 shadow-sm flex flex-col items-center">
        <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-accent mb-1">
          Cordially Invited By
        </span>
        <span className="font-serif text-base font-bold text-primary tracking-wide">
          {siteConfig.event.hosts}
        </span>
      </div>
    </section>
  );
}
