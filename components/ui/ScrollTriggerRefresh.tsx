'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/gsap';

export function ScrollTriggerRefresh() {
  useEffect(() => {
    // Refresh ScrollTrigger after fonts load
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    // Refresh ScrollTrigger after full window load
    const handleLoad = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('load', handleLoad);
    return () => window.removeEventListener('load', handleLoad);
  }, []);

  return null;
}
