'use client';

import React from 'react';
import { Check } from 'lucide-react';

interface ToastProps {
  message: string;
  isVisible: boolean;
}

export function Toast({ message, isVisible }: ToastProps) {
  if (!isVisible) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary text-secondary border border-accent shadow-gold-lg animate-in fade-in slide-in-from-bottom-4 duration-300"
    >
      <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center text-accent">
        <Check size={14} strokeWidth={3} />
      </div>
      <span className="text-xs sm:text-sm font-sans font-medium tracking-wide">
        {message}
      </span>
    </div>
  );
}
