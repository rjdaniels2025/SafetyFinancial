import { useEffect, useRef } from 'react';

/**
 * Layered, slowly moving backdrop for the homepage hero: drifting light, a passing beam and a silver grid
 * gliding toward the viewer. Pure CSS animation, paused whenever the hero is scrolled out of view.
 */
export default function HeroBackdrop() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(([entry]) => {
      node.toggleAttribute('data-paused', !entry.isIntersecting);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="hero-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="hb-glow hb-glow-1" />
      <div className="hb-glow hb-glow-2" />
      <div className="hb-glow hb-glow-3" />
      <div className="hb-horizon">
        <div className="hb-floor">
          <div className="hb-plane" />
        </div>
      </div>
      <div className="hb-beam" />
      <div className="hb-grain" />
      <div className="hb-vignette" />
    </div>
  );
}
