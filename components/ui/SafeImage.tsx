'use client';

import React, { useState } from 'react';
import Image, { ImageProps } from 'next/image';

interface SafeImageProps extends Omit<ImageProps, 'onError'> {
  fallbackInitial?: string;
  fallbackTitle?: string;
}

export function SafeImage({
  src,
  alt,
  fallbackInitial,
  fallbackTitle,
  className = '',
  ...props
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 via-secondary to-primary/15 border border-accent/30 text-center p-6 ${className}`}
        aria-label={alt}
      >
        <div className="w-20 h-20 rounded-full border-2 border-accent/60 bg-secondary flex items-center justify-center shadow-gold mb-3">
          <span className="font-serif text-3xl font-bold text-accent">
            {fallbackInitial || (alt ? alt.charAt(0) : 'S')}
          </span>
        </div>
        {fallbackTitle && (
          <p className="font-serif text-base font-semibold text-primary">
            {fallbackTitle}
          </p>
        )}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
