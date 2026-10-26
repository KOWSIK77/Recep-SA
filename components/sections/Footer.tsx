'use client';

import React from 'react';
import Image from 'next/image';
import { Share2, ArrowUp } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { Ornament } from '@/components/ui/Ornament';
import { Button } from '@/components/ui/Button';
import { openWhatsAppShare } from '@/lib/whatsapp';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative bg-primary text-secondary pt-14 pb-10 px-4 overflow-hidden border-t-2 border-accent/40 text-center"
    >
      {/* Background Gopuram Silhouette watermark */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-10 pointer-events-none select-none z-0">
        <Ornament type="gopuram" size={320} className="text-accent" />
      </div>

      {/* Ambient gold glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-accent/15 blur-2xl rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-auto flex flex-col items-center">
        {/* Logo Emblem */}
        <div className="relative h-16 w-28 flex items-center justify-center mb-4">
          <Image
            src={siteConfig.couple.logo}
            alt="Sasikumar & Adithya Logo"
            width={112}
            height={74}
            className="object-contain max-h-16 w-auto drop-shadow-[0_2px_12px_rgba(201,162,75,0.4)]"
          />
        </div>

        {/* Script Thank You */}
        <h3 className="text-3xl sm:text-4xl font-script text-accent-light mb-2">
          Thank you for being part of our story.
        </h3>

        {/* Couple Names */}
        <p className="font-serif text-lg font-bold text-secondary tracking-wide mb-1">
          {siteConfig.couple.groom} &amp; {siteConfig.couple.bride}
        </p>

        {/* Date and Venue Metadata */}
        <p className="text-[10px] sm:text-xs font-sans tracking-[0.2em] uppercase text-accent mb-6">
          {siteConfig.event.dateFormatted} &bull; {siteConfig.venue.name}
        </p>

        {/* Quick in-page links */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-[10px] uppercase tracking-[0.2em] font-sans font-medium text-secondary/70 mb-8">
          <a href="#home" className="hover:text-accent transition-colors">Home</a>
          <a href="#celebrate" className="hover:text-accent transition-colors">Celebrate</a>
          <a href="#couple" className="hover:text-accent transition-colors">Couple</a>
          <a href="#details" className="hover:text-accent transition-colors">Details</a>
          <a href="#venue" className="hover:text-accent transition-colors">Venue</a>
        </div>

        {/* WhatsApp Share CTA & Back to Top */}
        <div className="flex flex-col w-full gap-3 mb-8">
          <Button
            variant="solid-gold"
            size="md"
            icon={<Share2 size={16} />}
            onClick={() => openWhatsAppShare()}
            className="w-full"
          >
            Share on WhatsApp
          </Button>

          <Button
            variant="outline-gold"
            size="sm"
            icon={<ArrowUp size={14} />}
            onClick={scrollToTop}
            className="w-full border-accent/40 text-secondary hover:bg-accent/15"
          >
            Back to Top
          </Button>
        </div>

        {/* Subtle divider */}
        <div className="w-16 h-[1px] bg-accent/30 mb-4" />

        {/* Credit line */}
        <p className="text-[10px] text-secondary/50 font-sans tracking-wider">
          Made with love for Sasikumar &amp; Adithya.
        </p>
      </div>
    </footer>
  );
}
