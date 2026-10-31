import { useLayoutEffect, useSyncExternalStore } from 'react';

// Pages whose first section is a dark, full-bleed hero register here so the header can sit
// transparently over it until the visitor scrolls.
let count = 0;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

export function useDarkHero() {
  useLayoutEffect(() => {
    count += 1;
    emit();
    return () => {
      count -= 1;
      emit();
    };
  }, []);
}

export function useHasDarkHero() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => count > 0
  );
}
