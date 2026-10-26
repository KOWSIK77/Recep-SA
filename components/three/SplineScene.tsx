'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { SplineFallback } from './SplineFallback';

// Dynamically import Spline with ssr: false
const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
  loading: () => <SplineFallback />,
});

export function SplineScene() {
  const [shouldLoadSpline, setShouldLoadSpline] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const sceneUrl = process.env.NEXT_PUBLIC_SPLINE_SCENE_URL;

  useEffect(() => {
    // 1. If no scene URL provided, immediately stay with fallback
    if (!sceneUrl || sceneUrl.trim() === '') {
      return;
    }

    // 2. Check screen width (< 768px -> use fallback for mobile performance)
    if (window.innerWidth < 768) {
      return;
    }

    // 3. Check prefers-reduced-motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    // 4. Check data-saver (Save-Data header / connection)
    const nav = navigator as unknown as { connection?: { saveData?: boolean } };
    if (nav.connection?.saveData) {
      return;
    }

    // 5. Load only when browser is idle after first paint
    const timeoutId = setTimeout(() => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(() => {
          setShouldLoadSpline(true);
        });
      } else {
        setShouldLoadSpline(true);
      }
    }, 800);

    // 6. 6-second timeout fallback
    const fallbackTimeoutId = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 6000);

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(fallbackTimeoutId);
    };
  }, [sceneUrl, isLoaded]);

  // 7. Pause / unmount when leaving viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[360px] sm:h-[420px] md:h-[480px] max-w-xl mx-auto flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {shouldLoadSpline && !hasError && isInView && sceneUrl ? (
        <div className="w-full h-full relative">
          {!isLoaded && <SplineFallback />}
          <Spline
            scene={sceneUrl}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            className={`w-full h-full transition-opacity duration-700 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          />
        </div>
      ) : (
        <SplineFallback />
      )}
    </div>
  );
}
