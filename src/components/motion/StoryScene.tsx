import { useRef, useState, type CSSProperties } from 'react';
import HeroBackdrop from './HeroBackdrop';
import StoryArt, { type StoryScene as SceneKey } from './StoryArt';
import useScrollProgress from '../../hooks/useScrollProgress';

export interface StoryChapter {
  scene: SceneKey;
  title: string;
  text: string;
}

/**
 * A full-screen scene between sections that plays like a film as the visitor scrolls: the section is tall,
 * its stage stays pinned to the screen, and scroll position drives the line art and the captions. With
 * several chapters they play one after another. With reduced motion the stage is a single still screen.
 */
export default function StoryScene({ eyebrow, chapters }: { eyebrow: string; chapters: StoryChapter[] }) {
  const ref = useRef<HTMLElement>(null);
  const [still] = useState(() => typeof window !== 'undefined' && !window.matchMedia('(prefers-reduced-motion: no-preference)').matches);
  useScrollProgress(ref);
  const n = chapters.length;
  const film = n > 1;
  // About 85% of a screen of scrolling per chapter, on top of the screen the stage itself occupies
  const height = still ? undefined : `${100 + (film ? 85 : 120) * n}svh`;

  return (
    <section ref={ref} aria-label={eyebrow} className="relative bg-ink text-paper" style={{ height }}>
      <div className={`${still ? '' : 'sticky top-0'} isolate h-[100svh] min-h-[560px] overflow-hidden`}>
        <HeroBackdrop variant="page" />
        <div className="ss-stage-art" aria-hidden="true">
          <StoryArt chapters={chapters.map((c) => c.scene)} />
        </div>
        <div className="container-page relative flex h-full items-start pt-28 sm:pt-36 lg:items-center lg:pt-0">
          <div className="max-w-md lg:max-w-lg">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-accent-light">
              <span className="h-px w-8 bg-accent-light/70" aria-hidden="true" />
              {eyebrow}
            </p>
            <div className="mt-5 grid">
              {chapters.map((c, i) => (
                <div
                  key={c.title}
                  className={`ss-caption col-start-1 row-start-1 ${still && i < n - 1 ? 'hidden' : ''}`}
                  style={{ '--c0': i / n, '--c1': (i + 1) / n, '--keep': i === n - 1 ? 1 : 0 } as CSSProperties}
                >
                  {film && (
                    <p className="font-serif text-lg text-paper/60">
                      {String(i + 1).padStart(2, '0')} <span className="text-paper/30">/ {String(n).padStart(2, '0')}</span>
                    </p>
                  )}
                  <h2 className="h-display title-shadow mt-2 text-paper">{c.title}</h2>
                  <p className="title-shadow mt-4 max-w-md text-[17px] leading-relaxed text-paper/80 sm:text-lg">{c.text}</p>
                </div>
              ))}
            </div>
            {film && !still && (
              <div className="mt-10 h-px w-40 bg-paper/15" aria-hidden="true">
                <div className="ss-progress h-px bg-paper/70" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
