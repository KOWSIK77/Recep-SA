'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';

export function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }
      setIsScrolled(currentScroll > 40);
      setShowNavbar(currentScroll > window.innerHeight * 0.4);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="nav"
      className={`fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[500px] z-50 transition-all duration-500 ${
        showNavbar ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none'
      } ${
        isScrolled
          ? 'bg-secondary/95 backdrop-blur-md shadow-temple border-b border-accent/20'
          : 'bg-secondary/80 backdrop-blur-sm'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-accent via-accent-light to-turmeric transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Reading progress"
      />

      <nav
        className="px-4 flex items-center justify-between h-16 w-full"
        aria-label="Header Navigation"
      >
        {/* Logo and Couple Name */}
        <a
          href="#home"
          className="group flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-lg p-1"
          aria-label="Sasikumar & Adithya Home"
        >
          <div className="relative h-10 w-12 flex items-center justify-center flex-shrink-0">
            <Image
              src={siteConfig.couple.logo}
              alt="Sasikumar & Adithya Logo"
              width={48}
              height={32}
              className="object-contain max-h-9 w-auto group-hover:scale-105 transition-transform"
              priority
            />
          </div>
          <span className="font-serif text-sm tracking-wider uppercase font-bold text-primary">
            {siteConfig.couple.order}
          </span>
        </a>

        {/* Auspicious Date Badge */}
        <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest text-accent font-semibold px-2.5 py-1 rounded-full border border-accent/30 bg-secondary/90 shadow-sm">
          <span>1 Nov 2026</span>
        </div>
      </nav>
    </header>
  );
}
