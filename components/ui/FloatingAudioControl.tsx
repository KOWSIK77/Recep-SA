'use client';

import React from 'react';
import { VolumeX } from 'lucide-react';
import { useAudio } from '@/context/AudioContext';

export function FloatingAudioControl() {
  const { isPlaying, toggleMusic } = useAudio();

  return (
    <div className="fixed bottom-5 right-4 z-40">
      <button
        type="button"
        onClick={toggleMusic}
        aria-label={isPlaying ? 'Mute background music' : 'Play subtle background music'}
        className={`w-11 h-11 rounded-full border border-accent/40 bg-secondary/95 backdrop-blur-md flex items-center justify-center text-primary shadow-gold hover:bg-accent/20 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-95 ${
          isPlaying ? 'shadow-gold-lg' : ''
        }`}
      >
        {isPlaying ? (
          <div className="flex items-center gap-[2.5px] h-4">
            <span className="w-[2.5px] h-3 bg-accent rounded-full animate-pulse" />
            <span className="w-[2.5px] h-4 bg-accent rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
            <span className="w-[2.5px] h-2 bg-accent rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
          </div>
        ) : (
          <VolumeX size={18} className="text-ink/60" />
        )}
      </button>
    </div>
  );
}
