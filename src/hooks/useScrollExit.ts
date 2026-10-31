import { useEffect, useRef, type RefObject } from 'react';

/**
 * Tracks how far a section has scrolled off the top of the screen (0 in place, 1 gone) and mirrors it to
 * the `--exit` CSS variable on the section, so its content can drift and fade like a camera moving on.
 */
export default function useScrollExit(ref: RefObject<HTMLElement>) {
  const exit = useRef(0);

  useEffect(() => {
    const node = ref.current;
    if (!node || !window.matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const value = Math.min(1, Math.max(0, -rect.top / rect.height));
      if (value === exit.current) return;
      exit.current = value;
      node.style.setProperty('--exit', value.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, [ref]);

  return exit;
}
