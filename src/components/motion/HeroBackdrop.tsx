import { useEffect, useRef, type MutableRefObject } from 'react';
import SmokeField from './SmokeField';
import StoryArt, { type StoryScene } from './StoryArt';

interface HeroBackdropProps {
  /**
   * `home`: the full scene with the gliding silver floor and a passing beam of light.
   * `page`: interior page headers. `band`: the closing consultation banner.
   */
  variant?: 'home' | 'page' | 'band';
  /** Colour of the section below the hero, for a cloud bank that blends into it. */
  bank?: string;
  bankRest?: number;
  exit?: MutableRefObject<number>;
  /** A line-art chapter of the WeWin story: it opens as the page loads and resolves as the header scrolls away. */
  story?: StoryScene;
}

const smoke = {
  home: { intensity: 0.62, biasRight: true },
  page: { intensity: 0.5, biasRight: true },
  band: { intensity: 0.42, biasRight: false },
};

/**
 * Layered cinematic backdrop for dark sections: drifting light, live smoke, film grain and a vignette.
 * CSS layers are paused whenever the section is scrolled out of view.
 */
export default function HeroBackdrop({ variant = 'page', bank, bankRest, exit, story }: HeroBackdropProps) {
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
      {variant === 'home' && (
        <>
          <div className="hb-glow hb-glow-3" />
          <div className="hb-horizon">
            <div className="hb-floor">
              <div className="hb-plane" />
            </div>
          </div>
          <div className="hb-beam" />
        </>
      )}
      {/* The vignette sits under the smoke so the cloud bank stays pure white where it meets the next section */}
      <div className="hb-vignette" />
      {story && (
        <div className="ss-hero">
          <StoryArt scene={story} />
        </div>
      )}
      <SmokeField {...smoke[variant]} bank={bank} bankRest={bankRest} exit={exit} />
      <div className="hb-grain" />
    </div>
  );
}
