import { useEffect, useLayoutEffect, useRef, useState } from 'react';

interface SectionTabsProps {
  label: string;
  sections: { id: string; short: string }[];
}

/**
 * Sticky in-page navigation that sits under the header, highlights the section
 * currently being read, and scrolls sideways on narrow screens.
 */
export default function SectionTabs({ label, sections }: SectionTabsProps) {
  const [active, setActive] = useState(sections[0]?.id);
  const rowRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) setActive(visible[0].target.id);
      },
      // A thin band just below the header and tabs decides which section is "current"
      { rootMargin: '-140px 0px -65% 0px' }
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  // Slide the highlight under the active tab and keep that tab in view on narrow screens
  useLayoutEffect(() => {
    const row = rowRef.current;
    const tab = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!row || !tab) return;
    const measure = () => setIndicator({ left: tab.offsetLeft, width: tab.offsetWidth });
    measure();
    // Tab widths change once the web fonts load
    document.fonts?.ready.then(measure);
    row.scrollTo({ left: tab.offsetLeft - row.clientWidth / 2 + tab.clientWidth / 2, behavior: 'smooth' });
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [active]);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <nav aria-label={label} className="sticky top-16 z-30 border-b border-line bg-paper/95 backdrop-blur lg:top-20">
      <div
        ref={rowRef}
        className="container-page relative flex gap-1.5 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <span
          aria-hidden="true"
          className="absolute top-2.5 h-[calc(100%-1.25rem)] rounded-full bg-ink shadow-[0_6px_16px_-8px_rgba(18,58,38,0.6)] transition-all duration-500 ease-brand"
          style={{ left: indicator.left, width: indicator.width }}
        />
        {sections.map((s, i) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            data-id={s.id}
            onClick={go(s.id)}
            aria-current={active === s.id ? 'true' : undefined}
            className={`relative flex flex-shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-300 ${
              active === s.id ? 'text-paper' : 'text-ink/70 hover:bg-paper-dark hover:text-ink'
            }`}
          >
            <span className={`font-serif font-semibold transition-colors duration-300 ${active === s.id ? 'text-accent-light' : 'text-accent-dark'}`}>
              {String.fromCharCode(65 + i)}
            </span>
            {s.short}
          </a>
        ))}
      </div>
    </nav>
  );
}
