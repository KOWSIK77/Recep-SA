'use client';

import { useSyncExternalStore } from 'react';
import { siteConfig } from '@/lib/config';

export type CountdownState = 'before' | 'during' | 'after';

export interface CountdownTime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  state: CountdownState;
  isMounted: boolean;
}

const SERVER_SNAPSHOT: CountdownTime = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  state: 'before',
  isMounted: false,
};

class CountdownStore {
  private targetTime: number;
  private endTime: number;
  private snapshot: CountdownTime;
  private listeners = new Set<() => void>();
  private intervalId: ReturnType<typeof setInterval> | null = null;

  constructor(targetIso: string, endIso: string) {
    this.targetTime = new Date(targetIso).getTime();
    this.endTime = new Date(endIso).getTime();
    this.snapshot = SERVER_SNAPSHOT;
  }

  private compute(): CountdownTime {
    if (typeof window === 'undefined') return SERVER_SNAPSHOT;

    const now = Date.now();
    let state: CountdownState = 'before';

    if (now >= this.endTime) {
      state = 'after';
    } else if (now >= this.targetTime) {
      state = 'during';
    }

    const diff = Math.max(0, this.targetTime - now);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    // If identical values, preserve current object reference
    if (
      this.snapshot.isMounted &&
      this.snapshot.days === days &&
      this.snapshot.hours === hours &&
      this.snapshot.minutes === minutes &&
      this.snapshot.seconds === seconds &&
      this.snapshot.state === state
    ) {
      return this.snapshot;
    }

    return {
      days,
      hours,
      minutes,
      seconds,
      state,
      isMounted: true,
    };
  }

  private tick = () => {
    const nextSnapshot = this.compute();
    if (nextSnapshot !== this.snapshot) {
      this.snapshot = nextSnapshot;
      this.listeners.forEach((listener) => listener());
    }
  };

  public subscribe = (listener: () => void) => {
    this.listeners.add(listener);

    if (this.listeners.size === 1) {
      this.snapshot = this.compute();
      this.intervalId = setInterval(this.tick, 1000);
    }

    return () => {
      this.listeners.delete(listener);
      if (this.listeners.size === 0 && this.intervalId) {
        clearInterval(this.intervalId);
        this.intervalId = null;
      }
    };
  };

  public getSnapshot = (): CountdownTime => {
    if (typeof window === 'undefined') return SERVER_SNAPSHOT;
    if (!this.snapshot.isMounted) {
      this.snapshot = this.compute();
    }
    return this.snapshot;
  };

  public getServerSnapshot = (): CountdownTime => {
    return SERVER_SNAPSHOT;
  };
}

const defaultStore = new CountdownStore(siteConfig.event.targetIso, siteConfig.event.endIso);

export function useCountdown(): CountdownTime {
  return useSyncExternalStore(
    defaultStore.subscribe,
    defaultStore.getSnapshot,
    defaultStore.getServerSnapshot
  );
}
