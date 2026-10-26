'use client';

import React, { useRef } from 'react';
import { Calendar, Clock, MapPin, Share2 } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Ornament } from '@/components/ui/Ornament';
import { generateIcsFile } from '@/lib/ics';
import { openWhatsAppShare } from '@/lib/whatsapp';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

export function ReceptionDetails() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from('.details-card', {
        y: 25,
        opacity: 0,
        duration: 0.7,
        ease: GSAP_EASE.cinematic,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
      });

      gsap.from('.timeline-item', {
        x: -15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: GSAP_EASE.smooth,
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 85%',
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      id="details"
      ref={containerRef}
      className="relative py-14 px-4 max-w-sm mx-auto overflow-hidden text-center"
    >
      <SectionHeading
        eyebrow="Celebration Guide"
        title="Reception Details"
        subtitle="We look forward to welcoming you for an enchanting evening filled with warmth and festivities."
      />

      {/* Premium Event Card with double gold border & corner ornaments */}
      <div className="details-card relative bg-secondary/90 rounded-3xl p-5 sm:p-6 border-2 border-accent/40 shadow-temple text-left">
        {/* Corner ornaments */}
        <Ornament type="corner" size={24} className="absolute top-3 left-3 text-accent/50" />
        <Ornament type="corner" size={24} className="absolute top-3 right-3 text-accent/50 rotate-90" />
        <Ornament type="corner" size={24} className="absolute bottom-3 left-3 text-accent/50 -rotate-90" />
        <Ornament type="corner" size={24} className="absolute bottom-3 right-3 text-accent/50 rotate-180" />

        {/* Card Header */}
        <div className="text-center pb-5 border-b border-accent/20">
          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-accent block mb-1">
            Wedding Reception
          </span>
          <h3 className="text-2xl font-serif font-bold text-primary mb-2">
            {siteConfig.couple.groom} &amp; {siteConfig.couple.bride}
          </h3>
          <p className="text-xs text-ink/80 font-serif italic">
            {siteConfig.event.dateFormatted}
          </p>
          <p className="text-xs font-semibold text-accent-dark mt-0.5">
            {siteConfig.venue.name}, {siteConfig.event.city}
          </p>
        </div>

        {/* 3 Icon Tiles */}
        <div className="grid grid-cols-1 gap-2.5 my-5">
          <div className="p-3 rounded-xl bg-secondary-light border border-accent/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
              <Calendar size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary block">Date</span>
              <span className="text-xs text-ink/80 font-medium">{siteConfig.event.dateFormatted}</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-secondary-light border border-accent/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
              <Clock size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary block">Time</span>
              <span className="text-xs text-ink/80 font-medium">6:00 PM &ndash; 9:30 PM IST</span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-secondary-light border border-accent/20 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-accent/15 flex items-center justify-center text-accent flex-shrink-0">
              <MapPin size={16} />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-primary block">Venue</span>
              <span className="text-xs text-ink/80 font-medium">Sree Velavar Mandapam</span>
            </div>
          </div>
        </div>

        {/* Evening Flow Timeline */}
        <div className="pt-2">
          <div className="text-center mb-5">
            <h4 className="text-lg font-serif font-bold text-primary">
              Evening Flow
            </h4>
            <p className="text-[10px] uppercase tracking-widest text-accent font-sans mt-0.5">
              Program Itinerary
            </p>
          </div>

          <div className="timeline-container relative pl-5 border-l-2 border-accent/30 space-y-4">
            {siteConfig.timeline.map((item, idx) => (
              <div key={idx} className="timeline-item relative">
                {/* Node indicator */}
                <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-secondary border-2 border-accent" />
                <div>
                  <span className="text-xs font-bold font-sans tracking-wide text-accent block">
                    {item.time}
                  </span>
                  <h5 className="text-xs sm:text-sm font-serif font-bold text-primary">
                    {item.title}
                  </h5>
                  {item.description && (
                    <p className="text-[11px] text-ink/75 font-sans mt-0.5 leading-snug">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 mt-6 pt-5 border-t border-accent/20">
          <Button
            variant="solid-gold"
            size="md"
            icon={<Calendar size={16} />}
            onClick={generateIcsFile}
            className="w-full"
          >
            Add to Calendar
          </Button>

          <Button
            variant="outline-gold"
            size="md"
            icon={<Share2 size={16} />}
            onClick={() => openWhatsAppShare()}
            className="w-full"
          >
            Share on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
}
