'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import { ChevronDown, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { siteConfig } from '@/lib/config';
import { Ornament } from '@/components/ui/Ornament';
import { useAudio } from '@/context/AudioContext';
import { useScrollLock } from '@/hooks/useScrollLock';

const TOTAL_FRAMES = 288;
const VIDEO_END_FRAME = 97;
const SCROLL_START_FRAME = 98;
const IMG_WIDTH = 1920;
const IMG_HEIGHT = 1080;
const KEYFRAME_STRIDE = 3;

export function IntroSequence() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Global Audio Hook
  const { isPlaying, playMusic, toggleMusic } = useAudio();

  // Loaded images cache & bitmask for instantaneous lookup
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedBitmaskRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currentFrameRef = useRef<number>(1);
  const videoAnimIdRef = useRef<number | null>(null);

  // Virtual Scroll State (Locks page from premature jump until animation finishes)
  const progressRef = useRef<number>(0);
  const targetProgressRef = useRef<number>(0);
  const touchStartYRef = useRef<number>(0);
  const isTransitioningOutRef = useRef<boolean>(false);

  // Precomputed source crop coordinates for object-fit: cover
  const cropRectRef = useRef<{ sx: number; sy: number; sWidth: number; sHeight: number }>({
    sx: 0,
    sy: 0,
    sWidth: IMG_WIDTH,
    sHeight: IMG_HEIGHT,
  });

  // States
  const [loadProgress, setLoadProgress] = useState(0);
  const [isTier1Ready, setIsTier1Ready] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isScrollPhaseReady, setIsScrollPhaseReady] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [introDismissed, setIntroDismissed] = useState(false);

  // Lock body scroll completely while intro sequence is active
  useScrollLock(!introDismissed);

  // Fast nearest-frame finder to prevent blank/stuck frames when scrolling over slow networks
  const findNearestLoadedFrame = (targetFrame: number): number => {
    if (loadedBitmaskRef.current[targetFrame - 1]) {
      return targetFrame;
    }

    let offset = 1;
    const maxOffset = Math.max(targetFrame, TOTAL_FRAMES - targetFrame);

    while (offset <= maxOffset) {
      const prev = targetFrame - offset;
      if (prev >= 1 && loadedBitmaskRef.current[prev - 1]) {
        return prev;
      }
      const next = targetFrame + offset;
      if (next <= TOTAL_FRAMES && loadedBitmaskRef.current[next - 1]) {
        return next;
      }
      offset++;
    }

    return currentFrameRef.current || 1;
  };

  // Render a specific frame on canvas with high-DPI, precomputed cover scaling, and zero redundant redraws
  const renderFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resolvedFrame = findNearestLoadedFrame(frameIndex);

    // Skip redundant GPU repaint if the frame is already on canvas
    if (resolvedFrame === currentFrameRef.current && canvas.dataset.rendered === 'true') {
      return;
    }

    const img = imagesRef.current[resolvedFrame - 1];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    const crop = cropRectRef.current;

    ctx.imageSmoothingQuality = 'medium';
    ctx.drawImage(img, crop.sx, crop.sy, crop.sWidth, crop.sHeight, 0, 0, w, h);

    currentFrameRef.current = resolvedFrame;
    canvas.dataset.rendered = 'true';
  }, []);

  // Update canvas size on resize and precalculate source crop rectangle once
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const parent = canvas.parentElement;
    const displayWidth = parent ? parent.clientWidth : window.innerWidth;
    const displayHeight = parent ? parent.clientHeight : window.innerHeight;

    const targetWidth = Math.round(displayWidth * dpr);
    const targetHeight = Math.round(displayHeight * dpr);

    if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
      canvas.width = targetWidth;
      canvas.height = targetHeight;
    }

    // Precalculate object-fit: cover math for 1920x1080 source
    const imgRatio = IMG_WIDTH / IMG_HEIGHT;
    const canvasRatio = targetWidth / targetHeight;

    let sWidth = IMG_WIDTH;
    let sHeight = IMG_HEIGHT;
    let sx = 0;
    let sy = 0;

    if (canvasRatio > imgRatio) {
      sHeight = IMG_WIDTH / canvasRatio;
      sy = (IMG_HEIGHT - sHeight) / 2;
    } else {
      sWidth = IMG_HEIGHT * canvasRatio;
      sx = (IMG_WIDTH - sWidth) / 2;
    }

    cropRectRef.current = { sx, sy, sWidth, sHeight };

    canvas.dataset.rendered = 'false';
    renderFrame(currentFrameRef.current);
  }, [renderFrame]);

  // Progressive image preloading with off-thread decoding and StrictMode resilience
  useEffect(() => {
    let isMounted = true;
    let tier1Count = 0;

    const getFrameUrl = (idx: number) => {
      const padded = String(idx).padStart(3, '0');
      return `/Hero/ezgif-frame-${padded}.jpg`;
    };

    const handleFrameReady = (idx: number) => {
      if (!isMounted) return;
      loadedBitmaskRef.current[idx - 1] = true;

      if (idx <= VIDEO_END_FRAME) {
        tier1Count++;
        const pct = Math.min(100, Math.round((tier1Count / Math.min(20, VIDEO_END_FRAME)) * 100));
        setLoadProgress(pct);

        if (idx === 1) {
          resizeCanvas();
          renderFrame(1);
        }

        if (tier1Count >= 10 || tier1Count >= VIDEO_END_FRAME) {
          setIsTier1Ready(true);
        }
      }
    };

    const loadSingleFrame = (idx: number) => {
      const existing = imagesRef.current[idx - 1];
      if (existing) {
        if (existing.complete && existing.naturalWidth > 0) {
          handleFrameReady(idx);
        }
        return;
      }

      const img = new Image();
      img.onload = () => {
        handleFrameReady(idx);
        if ('decode' in img) {
          img.decode().catch(() => {});
        }
      };

      img.onerror = () => {
        handleFrameReady(idx);
      };

      img.src = getFrameUrl(idx);
      imagesRef.current[idx - 1] = img;

      if (img.complete && img.naturalWidth > 0) {
        handleFrameReady(idx);
      }
    };

    const safetyTimer = setTimeout(() => {
      if (isMounted) {
        setIsTier1Ready(true);
      }
    }, 1500);

    // 1. Load Tier 1 video frames (1 - 97)
    for (let i = 1; i <= VIDEO_END_FRAME; i++) {
      loadSingleFrame(i);
    }

    // 2. Concurrently kick off Tier 2 Keyframes (every 3rd frame: 98, 101, 104... 288)
    const tier2KeyframesTimeout = setTimeout(() => {
      if (!isMounted) return;
      for (let i = SCROLL_START_FRAME; i <= TOTAL_FRAMES; i += KEYFRAME_STRIDE) {
        loadSingleFrame(i);
      }
    }, 80);

    // 3. Follow up by filling intermediate frames in the background
    const tier2FillTimeout = setTimeout(() => {
      if (!isMounted) return;
      for (let i = SCROLL_START_FRAME; i <= TOTAL_FRAMES; i++) {
        if ((i - SCROLL_START_FRAME) % KEYFRAME_STRIDE !== 0) {
          loadSingleFrame(i);
        }
      }
    }, 400);

    window.addEventListener('resize', resizeCanvas, { passive: true });
    resizeCanvas();

    return () => {
      isMounted = false;
      clearTimeout(safetyTimer);
      clearTimeout(tier2KeyframesTimeout);
      clearTimeout(tier2FillTimeout);
      window.removeEventListener('resize', resizeCanvas);
      if (videoAnimIdRef.current !== null) {
        cancelAnimationFrame(videoAnimIdRef.current);
      }
    };
  }, [resizeCanvas, renderFrame]);

  // Start Video Playback (Frames 1 -> 97)
  const startVideoPlayback = useCallback(() => {
    if (hasStarted) return;
    setHasStarted(true);
    setIsPlayingVideo(true);

    playMusic();

    let frame = 1;
    const fps = 28;
    const interval = 1000 / fps;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = now - lastTime;
      if (delta >= interval) {
        lastTime = now - (delta % interval);
        frame++;

        if (frame <= VIDEO_END_FRAME) {
          renderFrame(frame);
          videoAnimIdRef.current = requestAnimationFrame(step);
        } else {
          // Reached frame 97! Now pause and switch to scroll mode
          renderFrame(SCROLL_START_FRAME);
          setIsPlayingVideo(false);
          setIsScrollPhaseReady(true);
          videoAnimIdRef.current = null;
        }
      } else {
        videoAnimIdRef.current = requestAnimationFrame(step);
      }
    };

    videoAnimIdRef.current = requestAnimationFrame(step);
  }, [hasStarted, renderFrame, playMusic]);

  // Finish Intro and seamlessly reveal the next section (#home)
  const finishIntro = useCallback(() => {
    if (isTransitioningOutRef.current) return;
    isTransitioningOutRef.current = true;
    setIsExiting(true);

    setTimeout(() => {
      setIntroDismissed(true);
      window.scrollTo(0, 0);
    }, 550);
  }, []);

  // Skip Intro handler
  const skipIntro = () => {
    if (videoAnimIdRef.current !== null) {
      cancelAnimationFrame(videoAnimIdRef.current);
      videoAnimIdRef.current = null;
    }
    finishIntro();
  };

  // Phase 2: Virtual Scroll Controller (Frames 98 to 288)
  // Completely isolates the scroll animation so it NEVER collides with or jumps into the next section prematurely
  useEffect(() => {
    if (!isScrollPhaseReady || introDismissed) return;

    let animId: number;

    const onWheel = (e: WheelEvent) => {
      if (isTransitioningOutRef.current) return;
      e.preventDefault();

      // Normalize delta across different trackpads and mouse wheels
      const delta = Math.sign(e.deltaY) * Math.min(Math.abs(e.deltaY), 120);
      const deltaProgress = delta * 0.0018;

      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + deltaProgress));
    };

    const onTouchStart = (e: TouchEvent) => {
      if (isTransitioningOutRef.current) return;
      touchStartYRef.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (isTransitioningOutRef.current) return;
      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - currentY; // positive when swiping up (scrolling down)
      touchStartYRef.current = currentY;

      // Sensitivity: ~750px of swipe spans from frame 98 to 288
      const deltaProgress = deltaY / 750;
      targetProgressRef.current = Math.min(1, Math.max(0, targetProgressRef.current + deltaProgress));
    };

    // Continuous 60fps lerp loop for buttery smooth scrub tracking
    const updateLoop = () => {
      if (isTransitioningOutRef.current) return;

      const diff = targetProgressRef.current - progressRef.current;
      if (Math.abs(diff) > 0.0005) {
        progressRef.current += diff * 0.22;
      } else {
        progressRef.current = targetProgressRef.current;
      }

      const currentProg = progressRef.current;
      const targetFrame = Math.min(
        TOTAL_FRAMES,
        Math.max(
          SCROLL_START_FRAME,
          Math.round(SCROLL_START_FRAME + currentProg * (TOTAL_FRAMES - SCROLL_START_FRAME))
        )
      );

      renderFrame(targetFrame);

      // Only finish when the animation has reached the very end (frame 288)
      if (targetProgressRef.current >= 0.99 && currentProg >= 0.985) {
        renderFrame(TOTAL_FRAMES);
        finishIntro();
        return;
      }

      animId = requestAnimationFrame(updateLoop);
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    animId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      cancelAnimationFrame(animId);
    };
  }, [isScrollPhaseReady, introDismissed, renderFrame, finishIntro]);

  if (introDismissed) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="intro"
      className="fixed inset-0 z-50 w-full h-[100svh] overflow-hidden bg-primary-dark select-none"
    >
      {/* Viewport container with smooth exit dissolve */}
      <div
        ref={canvasWrapperRef}
        className={`w-full h-full relative overflow-hidden flex items-center justify-center bg-primary-dark will-change-transform transform-gpu transition-all duration-500 ease-out ${
          isExiting ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
        }`}
      >
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover block will-change-transform transform-gpu"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-transparent to-primary-dark/40 pointer-events-none" />

        {/* Audio Mute / Unmute Toggle Button in top-left */}
        <button
          type="button"
          onClick={toggleMusic}
          aria-label={isPlaying ? 'Mute Background Music' : 'Play Background Music'}
          className="absolute top-5 left-5 z-30 w-9 h-9 rounded-full bg-secondary/80 hover:bg-secondary text-primary border border-accent/40 backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-gold active:scale-95"
        >
          {isPlaying ? (
            <Volume2 size={16} className="text-accent" />
          ) : (
            <VolumeX size={16} className="text-ink/60" />
          )}
        </button>

        {/* Skip button in top right */}
        {hasStarted && (
          <button
            type="button"
            onClick={skipIntro}
            className="absolute top-5 right-5 z-30 px-3.5 py-1.5 rounded-full bg-secondary/80 hover:bg-secondary text-primary border border-accent/40 backdrop-blur-md text-[10px] uppercase tracking-widest font-sans font-semibold transition-all duration-300 shadow-gold"
          >
            Skip Intro
          </button>
        )}

        {/* Phase 1 Overlay: Tap to Enter Celebration (Before Click) */}
        {!hasStarted && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-between p-6 sm:p-12 text-center bg-primary-dark/50 backdrop-blur-[2px]">
            {/* Top Logo */}
            <div className="pt-4 sm:pt-8 flex flex-col items-center animate-in fade-in duration-700">
              <div className="relative h-12 w-20 flex items-center justify-center mb-2">
                <NextImage
                  src={siteConfig.couple.logo}
                  alt="Sasikumar & Adithya Logo"
                  width={72}
                  height={48}
                  className="object-contain max-h-12 w-auto drop-shadow-md"
                  priority
                />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] font-sans font-semibold text-accent-light">
                {siteConfig.event.type}
              </p>
            </div>

            {/* Center Action */}
            <div className="my-auto max-w-md mx-auto flex flex-col items-center px-4 animate-in fade-in zoom-in-95 duration-1000">
              <Ornament type="lotus" size={48} className="text-accent mb-4 animate-pulse" />

              <h1 className="text-3xl sm:text-5xl font-serif font-bold text-secondary mb-2 tracking-tight">
                {siteConfig.couple.groom}{' '}
                <span className="font-script text-accent font-normal text-4xl sm:text-6xl">&amp;</span>{' '}
                {siteConfig.couple.bride}
              </h1>

              <p className="text-sm sm:text-base text-secondary/80 font-serif italic mb-8">
                {siteConfig.event.dateFormatted} &bull; {siteConfig.event.city}
              </p>

              {isTier1Ready ? (
                <button
                  type="button"
                  onClick={startVideoPlayback}
                  className="group relative px-8 py-4 rounded-full bg-accent text-primary font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.25em] shadow-gold-lg hover:bg-accent-light active:scale-95 transition-all duration-300 flex items-center gap-3 border border-accent-light"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-primary animate-ping" />
                  <span>Tap to Enter</span>
                  <Sparkles size={16} className="text-primary group-hover:rotate-12 transition-transform" />
                </button>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                  <span className="text-xs uppercase tracking-widest text-accent font-sans">
                    Preparing Experience ({loadProgress}%)...
                  </span>
                </div>
              )}
            </div>

            {/* Bottom Note */}
            <div className="pb-4 sm:pb-8">
              <p className="text-[11px] uppercase tracking-widest text-secondary/60 font-sans">
                With the blessings of our elders &amp; families
              </p>
            </div>
          </div>
        )}

        {/* Video Playing Indicator */}
        {isPlayingVideo && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2.5 px-4 py-2 rounded-full bg-primary-dark/70 border border-accent/30 backdrop-blur-md animate-in fade-in duration-300">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
            <span className="text-[11px] uppercase tracking-widest text-accent-light font-sans font-medium">
              Opening Celebration...
            </span>
          </div>
        )}

        {/* Phase 2 Hint Overlay: Scroll to Unfold (Frames 98 to 288) */}
        {isScrollPhaseReady && !isExiting && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="px-5 py-2.5 rounded-full bg-secondary/90 border border-accent/40 shadow-gold backdrop-blur-md flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-[0.2em] font-sans font-bold text-primary">
                Scroll to Unfold
              </span>
              <ChevronDown size={16} className="text-accent animate-bounce" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
