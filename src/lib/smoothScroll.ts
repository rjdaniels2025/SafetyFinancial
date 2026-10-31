import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Smooth, eased wheel scrolling for mouse and trackpad users. Touch scrolling stays native, and
// visitors who have asked their device to reduce motion keep the browser's own scrolling.
let lenis: Lenis | null = null;

export function startSmoothScroll() {
  if (lenis || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return () => {};
  lenis = new Lenis({ autoRaf: true });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

/** Scrolls to an element, respecting its scroll-margin, using the smooth scroller when it is running. */
export function scrollToElement(el: HTMLElement) {
  if (lenis) lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function scrollToTop() {
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo({ top: 0 });
}

/** Stops page scrolling while an overlay such as the mobile menu is open. */
export function setScrollLocked(locked: boolean) {
  if (locked) lenis?.stop();
  else lenis?.start();
}
