'use client';

import React, { useRef } from 'react';
import { ArrowDown, Calendar, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { Button } from '@/components/ui/Button';
import { Ornament, JasmineGarland } from '@/components/ui/Ornament';
import { SplineScene } from '@/components/three/SplineScene';
import { generateIcsFile } from '@/lib/ics';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

export function Hero() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      const tl = gsap.timeline({ defaults: { ease: GSAP_EASE.cinematic } });

      tl.from('.hero-eyebrow', {
        y: -15,
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
      })
        .from(
          '.hero-names',
          {
            y: 25,
            opacity: 0,
            duration: 0.8,
          },
          '-=0.3'
        )
        .from(
          '.hero-subtitle',
          {
            y: 15,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.4'
        )
        .from(
          '.hero-meta',
          {
            scale: 0.95,
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          '.hero-quote',
          {
            opacity: 0,
            duration: 0.6,
          },
          '-=0.3'
        )
        .from(
          '.hero-cta',
          {
            y: 15,
            opacity: 0,
            stagger: 0.1,
            duration: 0.5,
          },
          '-=0.3'
        );
    },
    { scope: containerRef }
  );

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between items-center pt-20 pb-8 px-4 overflow-hidden bg-radial-temple text-center"
    >
      {/* Mango Leaf Toranam across the top */}
      <div className="absolute top-14 left-0 right-0 z-20 pointer-events-none animate-sway">
        <Ornament type="toranam" size={28} className="w-full text-accent" />
      </div>

      {/* Hanging Jasmine Strings on left and right */}
      <div className="absolute top-16 left-2 z-20 pointer-events-none opacity-60 animate-sway">
        <JasmineGarland />
      </div>
      <div className="absolute top-16 right-2 z-20 pointer-events-none opacity-60 animate-sway-delayed">
        <JasmineGarland />
      </div>

      {/* Gopuram Temple Silhouette Background */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full opacity-[0.06] pointer-events-none z-0 flex justify-center">
        <Ornament type="gopuram" size={380} className="text-primary" />
      </div>

      {/* Drifting Gold Dust Particle Simulation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-10" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-accent/40 blur-[1px] animate-pulse" />
        <div className="absolute top-1/3 right-1/4 w-2.5 h-2.5 rounded-full bg-accent-light/50 blur-[1px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 rounded-full bg-turmeric/40 blur-[1px] animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Center 3D Spline Layer / Fallback Gold Lotus Emblem */}
      <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-full z-0 opacity-40 pointer-events-none">
        <SplineScene />
      </div>

      {/* Main Hero Content */}
      <div className="hero-content-block relative z-20 w-full max-w-sm mx-auto my-auto flex flex-col items-center">
        {/* Eyebrow */}
        <div className="hero-eyebrow flex items-center justify-center gap-2 mb-3">
          <span className="w-6 h-[1px] bg-accent/60" />
          <p className="uppercase tracking-[0.25em] text-[11px] font-sans font-semibold text-accent">
            {siteConfig.event.tagline}
          </p>
          <span className="w-6 h-[1px] bg-accent/60" />
        </div>

        {/* Couple Names */}
        <h1 className="hero-names text-4xl sm:text-5xl font-serif font-bold text-primary tracking-tight leading-[1.12] mb-3">
          <span>{siteConfig.couple.groom}</span>
          <span className="font-script text-accent font-normal text-4xl sm:text-5xl mx-2">&amp;</span>
          <span>{siteConfig.couple.bride}</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle text-base sm:text-lg font-serif text-ink italic font-normal mb-4">
          {siteConfig.event.invitationSubtitle}
        </p>

        {/* Meta Row Pill */}
        <div className="hero-meta w-full max-w-xs flex flex-col items-center gap-1 text-xs font-sans tracking-wider text-ink py-2.5 px-4 rounded-2xl border border-accent/40 bg-secondary/85 backdrop-blur-md shadow-sm mb-5">
          <span className="font-bold text-primary">{siteConfig.event.dateFormatted}</span>
          <div className="flex items-center gap-2 text-[11px] text-ink/80">
            <span>6:00 PM onwards</span>
            <span className="w-1 h-1 rounded-full bg-accent" />
            <span className="font-semibold text-accent-dark">Dharapuram</span>
          </div>
        </div>

        {/* Romantic Quote */}
        <p className="hero-quote text-xs sm:text-sm italic font-serif text-ink/80 max-w-xs mx-auto mb-6 leading-relaxed">
          &ldquo;{siteConfig.event.quote}&rdquo;
        </p>

        {/* CTAs */}
        <div className="flex flex-col w-full gap-3 max-w-xs mx-auto">
          <Button
            href="#venue"
            variant="solid-gold"
            size="md"
            icon={<MapPin size={16} />}
            className="hero-cta w-full shadow-gold"
          >
            View Venue
          </Button>

          <Button
            variant="outline-gold"
            size="md"
            icon={<Calendar size={16} />}
            onClick={generateIcsFile}
            className="hero-cta w-full"
          >
            Add to Calendar
          </Button>
        </div>
      </div>

      {/* Scroll Down Hint with bouncing arrow */}
      <div className="relative z-20 flex flex-col items-center gap-1 pt-4">
        <a
          href="#countdown"
          className="group flex flex-col items-center text-[10px] uppercase tracking-[0.2em] text-ink/60 hover:text-accent transition-colors p-1"
          aria-label="Scroll down to countdown"
        >
          <span>Scroll</span>
          <ArrowDown size={14} className="text-accent animate-bounce mt-0.5" />
        </a>
      </div>
    </section>
  );
}
