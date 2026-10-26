'use client';

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const GSAP_EASE = {
  smooth: 'power2.out',
  cinematic: 'power3.out',
  expressive: 'power4.out',
  gentle: 'sine.inOut',
  bounce: 'back.out(1.7)',
} as const;

export const GSAP_DURATION = {
  fast: 0.4,
  base: 0.8,
  slow: 1.2,
  epic: 1.6,
} as const;

/**
 * Splits text content of an HTML element into span-wrapped words and characters
 * for fine-grained GSAP split-text stagger animations.
 */
export function splitTextIntoChars(element: HTMLElement | null): HTMLElement[] {
  if (!element) return [];

  const text = element.textContent || '';
  element.innerHTML = '';
  const charElements: HTMLElement[] = [];

  const words = text.split(' ');
  words.forEach((word, wordIndex) => {
    const wordSpan = document.createElement('span');
    wordSpan.style.display = 'inline-block';
    wordSpan.style.whiteSpace = 'nowrap';

    for (let i = 0; i < word.length; i++) {
      const charSpan = document.createElement('span');
      charSpan.textContent = word[i];
      charSpan.style.display = 'inline-block';
      charSpan.className = 'split-char';
      wordSpan.appendChild(charSpan);
      charElements.push(charSpan);
    }

    element.appendChild(wordSpan);

    if (wordIndex < words.length - 1) {
      const space = document.createTextNode('\u00A0');
      element.appendChild(space);
    }
  });

  return charElements;
}

export { gsap, ScrollTrigger };
