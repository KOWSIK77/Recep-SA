'use client';

import React, { useRef } from 'react';
import { siteConfig } from '@/lib/config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { SafeImage } from '@/components/ui/SafeImage';
import { Ornament } from '@/components/ui/Ornament';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

export function Couple() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from(['.groom-card', '.couple-center-lotus', '.bride-card'], {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: GSAP_EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="couple"
      ref={containerRef}
      className="relative py-14 px-4 max-w-sm mx-auto overflow-hidden text-center"
    >
      <SectionHeading
        eyebrow="The Couple"
        title="Meet Sasikumar & Adithya"
        subtitle="Two souls united in love, embarking on a sacred lifelong journey together."
      />

      <div className="flex flex-col items-center gap-6 pt-2">
        {/* Groom Card */}
        <div className="groom-card w-full bg-secondary/85 rounded-3xl p-5 border border-accent/35 shadow-gold relative">
          <Ornament type="corner" size={20} className="absolute top-3 left-3 text-accent/50" />
          <Ornament type="corner" size={20} className="absolute top-3 right-3 text-accent/50 rotate-90" />
          <Ornament type="corner" size={20} className="absolute bottom-3 left-3 text-accent/50 -rotate-90" />
          <Ornament type="corner" size={20} className="absolute bottom-3 right-3 text-accent/50 rotate-180" />

          {/* Arched Temple-Window Photo Frame */}
          <div className="w-48 h-64 mx-auto overflow-hidden rounded-t-full rounded-b-xl border-2 border-accent shadow-temple relative mb-4 bg-secondary-light">
            <SafeImage
              src={siteConfig.couple.groomPhoto}
              alt="Sasikumar - The Groom"
              fallbackInitial="S"
              fallbackTitle="Sasikumar"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-accent block mb-1">
            The Groom
          </span>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2">
            {siteConfig.couple.groom}
          </h3>
          <p className="text-xs sm:text-sm text-ink/80 font-serif italic max-w-xs mx-auto">
            &ldquo;{siteConfig.couple.groomBio}&rdquo;
          </p>
        </div>

        {/* Connecting Gold Lotus Emblem */}
        <div className="couple-center-lotus flex-shrink-0 z-10 my-[-6px]">
          <div className="w-12 h-12 rounded-full bg-secondary border-2 border-accent shadow-gold flex items-center justify-center text-accent">
            <Ornament type="lotus" size={26} />
          </div>
        </div>

        {/* Bride Card */}
        <div className="bride-card w-full bg-secondary/85 rounded-3xl p-5 border border-accent/35 shadow-gold relative">
          <Ornament type="corner" size={20} className="absolute top-3 left-3 text-accent/50" />
          <Ornament type="corner" size={20} className="absolute top-3 right-3 text-accent/50 rotate-90" />
          <Ornament type="corner" size={20} className="absolute bottom-3 left-3 text-accent/50 -rotate-90" />
          <Ornament type="corner" size={20} className="absolute bottom-3 right-3 text-accent/50 rotate-180" />

          {/* Arched Temple-Window Photo Frame */}
          <div className="w-48 h-64 mx-auto overflow-hidden rounded-t-full rounded-b-xl border-2 border-accent shadow-temple relative mb-4 bg-secondary-light">
            <SafeImage
              src={siteConfig.couple.bridePhoto}
              alt="Adithya - The Bride"
              fallbackInitial="A"
              fallbackTitle="Adithya"
              fill
              sizes="200px"
              className="object-cover"
            />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-accent block mb-1">
            The Bride
          </span>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2">
            {siteConfig.couple.bride}
          </h3>
          <p className="text-xs sm:text-sm text-ink/80 font-serif italic max-w-xs mx-auto">
            &ldquo;{siteConfig.couple.brideBio}&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
