import React from 'react';
import { Ornament } from './Ornament';
import { KolamDivider } from './KolamDivider';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: 'center' | 'left';
  showDivider?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  className = '',
  align = 'center',
  showDivider = true,
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 ${isCenter ? 'text-center' : 'text-left'} ${className}`}>
      {eyebrow && (
        <div className={`flex items-center gap-2 mb-2 ${isCenter ? 'justify-center' : 'justify-start'}`}>
          <Ornament type="lotus" size={14} className="text-accent" />
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] font-sans font-semibold text-accent">
            {eyebrow}
          </p>
          <Ornament type="lotus" size={14} className="text-accent" />
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary tracking-tight leading-snug">
        {title}
      </h2>

      {subtitle && (
        <p className="mt-2 text-xs sm:text-sm text-ink/80 font-serif italic max-w-xs mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}

      {showDivider && <KolamDivider className="mt-4 mb-1" />}
    </div>
  );
}
