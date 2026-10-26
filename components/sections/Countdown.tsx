'use client';

import React, { useRef } from 'react';
import { Calendar, Sparkles } from 'lucide-react';
import { useCountdown } from '@/hooks/useCountdown';
import { Button } from '@/components/ui/Button';
import { Ornament } from '@/components/ui/Ornament';
import { generateIcsFile } from '@/lib/ics';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

interface DigitTileProps {
  value: number;
  label: string;
}

function DigitTile({ value, label }: DigitTileProps) {
  const formatted = String(value).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center p-3.5 rounded-2xl bg-secondary/90 border border-accent/35 shadow-gold hover:border-accent transition-all duration-300">
      <span className="font-serif font-bold text-3xl sm:text-4xl text-primary tabular-nums tracking-tight">
        {formatted}
      </span>
      <span className="mt-1 text-[10px] uppercase tracking-[0.2em] font-sans font-semibold text-accent-dark">
        {label}
      </span>
    </div>
  );
}

export function Countdown() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { days, hours, minutes, seconds, state, isMounted } = useCountdown();

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from('.countdown-reveal', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: GSAP_EASE.smooth,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="countdown"
      ref={containerRef}
      className="relative py-12 px-4 bg-gradient-to-b from-secondary via-secondary-light to-secondary overflow-hidden text-center"
    >
      <div className="w-full max-w-sm mx-auto">
        <div aria-live="polite" className="countdown-reveal mb-6">
          {state === 'before' && (
            <div>
              <div className="inline-flex items-center gap-2 mb-2">
                <Ornament type="lotus" size={14} className="text-accent" />
                <p className="text-[11px] uppercase tracking-[0.25em] font-sans font-semibold text-accent">
                  Auspicious Beginning
                </p>
                <Ornament type="lotus" size={14} className="text-accent" />
              </div>
              <h2 className="text-2xl font-serif font-bold text-primary">
                Counting down to our celebration
              </h2>
            </div>
          )}

          {state === 'during' && (
            <div className="p-6 rounded-2xl bg-primary text-secondary border-2 border-accent shadow-gold-lg">
              <div className="inline-flex items-center gap-2 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                <span className="text-xs uppercase tracking-widest text-accent-light font-bold">Happening Now</span>
              </div>
              <h2 className="text-2xl font-serif font-bold text-accent mb-2">
                The celebration is happening now. Join us!
              </h2>
              <p className="text-xs text-secondary/90">
                Sasikumar &amp; Adithya are currently welcoming guests at Sree Velavar Mandapam, Dharapuram.
              </p>
            </div>
          )}

          {state === 'after' && (
            <div className="p-6 rounded-2xl bg-secondary border border-accent/40 shadow-gold">
              <Sparkles className="w-6 h-6 text-accent mx-auto mb-2" />
              <h2 className="text-2xl font-serif font-bold text-primary mb-1">
                Thank you for celebrating with us.
              </h2>
              <p className="text-xs text-ink/80 italic font-serif">
                Your presence made our reception truly unforgettable.
              </p>
            </div>
          )}
        </div>

        {/* 4 Counter Tiles */}
        {state === 'before' && (
          <div className="countdown-reveal flex flex-col items-center">
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs mb-6">
              <DigitTile value={isMounted ? days : 0} label="Days" />
              <DigitTile value={isMounted ? hours : 0} label="Hours" />
              <DigitTile value={isMounted ? minutes : 0} label="Minutes" />
              <DigitTile value={isMounted ? seconds : 0} label="Seconds" />
            </div>

            <Button
              variant="outline-gold"
              size="md"
              icon={<Calendar size={16} />}
              onClick={generateIcsFile}
              className="w-full max-w-xs"
            >
              Add to Calendar
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
