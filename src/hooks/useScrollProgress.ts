import { useEffect, type RefObject } from 'react';

/**
 * Mirrors how far the visitor has scrolled through a tall section to the `--p` CSS variable on it: 0 when its
 * top is halfway up the screen (so the scene is already drawing as it arrives), 1 when its bottom reaches the
 * bottom of the screen. Visitors who ask for reduced motion
 * get the finished state (1).
 */
export default function useScrollProgress(ref: RefObject<HTMLElement>) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      node.style.setProperty('--p', '1');
      return;
    }
    let frame = 0;
    let last = -1;
    const update = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const lead = window.innerHeight * 0.5;
      const span = Math.max(1, rect.height - window.innerHeight + lead);
      const value = Math.min(1, Math.max(0, (lead - rect.top) / span));
      if (Math.abs(value - last) < 0.0005) return;
      last = value;
      node.style.setProperty('--p', value.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ref]);
}
