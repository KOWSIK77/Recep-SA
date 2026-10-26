'use client';

import React, { useState, useRef } from 'react';
import { ExternalLink, Navigation, Copy, Check, MapPin } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Button } from '@/components/ui/Button';
import { Toast } from '@/components/ui/Toast';
import { Ornament } from '@/components/ui/Ornament';
import { useGSAP } from '@gsap/react';
import { gsap, GSAP_EASE } from '@/lib/gsap';

export function VenueMap() {
  const [hasCopied, setHasCopied] = useState(false);
  const [mapError, setMapError] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const copyAddressToClipboard = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(siteConfig.venue.fullAddress);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = siteConfig.venue.fullAddress;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        document.execCommand('copy');
        textArea.remove();
      }
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 3000);
    } catch (err) {
      console.warn('Failed to copy address:', err);
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (prefersReduced) return;

      gsap.from(['.venue-info-card', '.venue-map-card'], {
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: GSAP_EASE.cinematic,
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
      id="venue"
      ref={containerRef}
      className="relative py-14 px-4 max-w-sm mx-auto overflow-hidden text-center"
    >
      <SectionHeading
        eyebrow="Location"
        title="Find Us"
        subtitle="Conveniently situated in Dharapuram, easily accessible from major transit routes."
      />

      <div className="flex flex-col gap-5 text-left">
        {/* Venue Information Card */}
        <div className="venue-info-card bg-secondary/90 rounded-3xl p-5 sm:p-6 border border-accent/35 shadow-temple relative">
          <Ornament type="corner" size={20} className="absolute top-3 left-3 text-accent/50" />
          <Ornament type="corner" size={20} className="absolute top-3 right-3 text-accent/50 rotate-90" />

          <div className="w-10 h-10 rounded-full bg-accent/15 flex items-center justify-center text-accent mb-3">
            <MapPin size={20} />
          </div>

          <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-semibold text-accent block mb-1">
            Reception Venue
          </span>
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-2 leading-snug">
            {siteConfig.venue.name}
          </h3>

          <div className="space-y-1 text-ink/80 text-xs sm:text-sm font-sans leading-relaxed mb-5">
            <p className="font-semibold text-primary">{siteConfig.venue.addressLine}</p>
            <p>{siteConfig.venue.cityStateZip}</p>
            <p className="text-[11px] text-accent-dark font-medium pt-0.5">
              Landmark: Near Dharapuram Bus Stand / Pollachi Road
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-accent/20">
            <Button
              href={siteConfig.venue.googleMapsUrl}
              isExternal
              variant="solid-gold"
              size="md"
              icon={<ExternalLink size={16} />}
              className="w-full"
            >
              Open in Google Maps
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  siteConfig.venue.fullAddress
                )}`}
                isExternal
                variant="outline-gold"
                size="sm"
                icon={<Navigation size={13} />}
                className="w-full text-xs"
              >
                Directions
              </Button>

              <Button
                variant="outline-gold"
                size="sm"
                icon={hasCopied ? <Check size={13} className="text-accent" /> : <Copy size={13} />}
                onClick={copyAddressToClipboard}
                className="w-full text-xs"
              >
                {hasCopied ? 'Copied!' : 'Copy'}
              </Button>
            </div>
          </div>
        </div>

        {/* Google Maps Embed Card */}
        <div className="venue-map-card bg-secondary/90 rounded-3xl overflow-hidden border-2 border-accent/35 shadow-temple h-[260px] relative">
          {!mapError ? (
            <iframe
              src={siteConfig.venue.embedUrl}
              title="Sree Velavar Mandapam Location Map"
              width="100%"
              height="100%"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              onError={() => setMapError(true)}
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-secondary">
              <MapPin className="w-8 h-8 text-accent mb-2" />
              <h4 className="font-serif text-lg font-bold text-primary mb-1">
                Sree Velavar Mandapam
              </h4>
              <p className="text-xs text-ink/75 max-w-xs mb-4">
                {siteConfig.venue.fullAddress}
              </p>
              <Button
                href={siteConfig.venue.googleMapsUrl}
                isExternal
                variant="solid-gold"
                size="sm"
                icon={<ExternalLink size={14} />}
              >
                Open in Google Maps
              </Button>
            </div>
          )}
        </div>
      </div>

      <Toast message="Address copied to clipboard!" isVisible={hasCopied} />
    </section>
  );
}
