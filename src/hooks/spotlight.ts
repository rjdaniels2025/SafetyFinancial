import type { PointerEvent } from 'react';

/** Pointer handler for `.spotlight` elements: moves the soft highlight to follow the cursor. */
export function trackSpotlight(e: PointerEvent<HTMLElement>) {
  const el = e.currentTarget;
  const rect = el.getBoundingClientRect();
  el.style.setProperty('--x', `${e.clientX - rect.left}px`);
  el.style.setProperty('--y', `${e.clientY - rect.top}px`);
}
