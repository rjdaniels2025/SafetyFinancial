import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Building, Factory, ShieldCheck, User, type LucideIcon } from 'lucide-react';
import OwnershipDiagram from './OwnershipDiagram';
import Reveal from '../ui/Reveal';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    title: 'It starts with one company.',
    text: 'Many owner-managed businesses run everything through a single corporation. It operates the business, holds the cash and owns the valuable assets, so all of it sits exposed to the same day-to-day operating risk.',
  },
  {
    title: 'Add a holding company above it.',
    text: 'Surplus profits can move up to a holding company as inter-corporate dividends — generally tax-free, subject to specific rules — where investments, property and other valuable assets sit apart from the risks of running the business.',
  },
  {
    title: 'Freeze today’s value. Pass on the growth.',
    text: 'With an estate freeze, your shares are exchanged for fixed-value preferred shares. New common shares, held by a family trust, take on the future growth, helping you plan for the tax payable on death.',
  },
  {
    title: 'Built and maintained by a coordinated team.',
    text: 'Your CPAs and corporate, tax and litigation lawyers design, document and maintain the structure together, so debt, ownership and paperwork line up from the start and stay that way.',
  },
];

const team = ['CPAs', 'Corporate lawyers', 'Tax lawyers', 'Litigation lawyers'];

// Each step owns one unit of the scrubbed timeline; the change into a step plays over its first part
const CHANGE = 0.45;

// Pinning needs room: on short screens, or when motion is reduced, the story is shown as a static sequence
const canPin = () =>
  typeof window !== 'undefined' &&
  window.matchMedia(
    '(prefers-reduced-motion: no-preference) and (min-height: 600px) and (min-width: 1024px), (prefers-reduced-motion: no-preference) and (min-height: 720px)'
  ).matches;

function Entity({
  icon: Icon,
  title,
  children,
  name,
  dark = false,
  className,
}: {
  icon: LucideIcon;
  title: string;
  children: ReactNode;
  name: string;
  dark?: boolean;
  className: string;
}) {
  return (
    <div
      data-entity={name}
      className={`absolute flex flex-col items-center justify-center rounded-2xl border px-2 text-center sm:px-4 ${
        dark ? 'border-ink bg-ink text-paper shadow-float' : 'border-line bg-white shadow-card'
      } ${className}`}
    >
      <span
        className={`hidden h-8 w-8 items-center justify-center rounded-lg sm:flex ${
          dark ? 'bg-paper/10 text-accent-light' : 'bg-accent-50 text-accent-dark'
        }`}
      >
        <Icon className="h-4 w-4" aria-hidden="true" />
      </span>
      <p className={`font-serif text-[13px] font-semibold leading-tight sm:mt-2 sm:text-base ${dark ? 'text-paper' : 'text-ink'}`}>{title}</p>
      <div className={`relative mt-1 w-full text-[10.5px] leading-snug sm:text-xs ${dark ? 'text-paper/70' : 'text-muted'}`}>{children}</div>
    </div>
  );
}

/** The holding company / operating company / family trust structure, built up as the visitor scrolls. */
export default function StructureStory() {
  const [pinned] = useState(canPin);
  const [step, setStep] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const panel = panelRef.current;
    if (!pinned || !track || !panel) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(panel);
      const enter = { autoAlpha: 1, y: 0, scale: 1, duration: CHANGE, ease: 'power2.out' };

      // Starting frame: only the operating company, framed close up
      gsap.set(q('[data-entity]:not([data-entity="opco"]), [data-pill], [data-flow], [data-halo]'), { autoAlpha: 0, y: 14, scale: 0.94 });
      gsap.set(q('[data-team] li'), { autoAlpha: 0, y: 8 });
      gsap.set(q('[data-grow="down"]'), { scaleY: 0, transformOrigin: '50% 0%' });
      gsap.set(q('[data-grow="right"]'), { scaleX: 0, transformOrigin: '0% 50%' });
      gsap.set(q('[data-grow="left"]'), { scaleX: 0, transformOrigin: '100% 50%' });
      // Narration uses opacity only, so every step stays readable to screen readers
      gsap.set(q('[data-step]:not(:first-child)'), { opacity: 0, y: 18 });
      gsap.set(q('[data-opco-later]'), { opacity: 0 });
      gsap.set(q('[data-stage]'), { scale: 1.32, yPercent: -51 });

      const narrate = (from: number, at: number) => {
        tl.to(q(`[data-step]:nth-child(${from + 1})`), { opacity: 0, y: -18, duration: CHANGE * 0.6, ease: 'power1.in' }, at);
        tl.to(q(`[data-step]:nth-child(${from + 2})`), { opacity: 1, y: 0, duration: CHANGE, ease: 'power2.out' }, at + CHANGE * 0.35);
      };

      const tl = gsap.timeline({
        defaults: { ease: 'power2.inOut' },
        scrollTrigger: {
          trigger: track,
          start: () => `top top+=${parseFloat(getComputedStyle(panel).top) || 0}`,
          end: 'bottom bottom',
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            panel.style.setProperty('--progress', self.progress.toFixed(4));
            // Switch the counter midway through each change rather than after it
            setStep(Math.min(steps.length - 1, Math.floor(self.progress * steps.length + 0.2)));
          },
        },
      });

      // 1 → 2: pull back to reveal the holding company; surplus starts to flow up
      let at = 0.55;
      narrate(0, at);
      tl.to(q('[data-stage]'), { scale: 1.1, yPercent: -21, duration: CHANGE * 1.6 }, at);
      tl.to(q('[data-entity="holdco"]'), enter, at + 0.15);
      tl.to(q('[data-line="holdco"]'), { scaleY: 1, duration: CHANGE }, at + 0.25);
      tl.to(q('[data-flow], [data-pill]'), { ...enter, stagger: 0.08 }, at + 0.45);
      tl.to(q('[data-opco-now]'), { opacity: 0, duration: CHANGE * 0.5 }, at + 0.2);
      tl.to(q('[data-opco-later]'), { opacity: 1, duration: CHANGE * 0.5 }, at + 0.35);

      // 2 → 3: pull back again; the owner and the family trust arrive above
      at = 1.55;
      narrate(1, at);
      tl.to(q('[data-stage]'), { scale: 0.98, yPercent: 0, duration: CHANGE * 1.6 }, at);
      tl.to(q('[data-entity="owner"], [data-entity="trust"]'), { ...enter, stagger: 0.1 }, at + 0.2);
      // The lines run down from the owner and the trust, meet in the middle, then drop to the holding company
      const owners = q('[data-line="owners"]');
      tl.to(owners.slice(0, 2), { scaleY: 1, duration: CHANGE * 0.4 }, at + 0.4);
      tl.to(owners.slice(2, 4), { scaleX: 1, duration: CHANGE * 0.4 }, at + 0.58);
      tl.to(owners[4], { scaleY: 1, duration: CHANGE * 0.3 }, at + 0.76);

      // 3 → 4: the holding company is highlighted and the professional team comes in
      at = 2.55;
      narrate(2, at);
      tl.to(q('[data-halo]'), enter, at + 0.1);
      tl.to(q('[data-team] li'), { autoAlpha: 1, y: 0, duration: CHANGE * 0.6, stagger: 0.06, ease: 'power2.out' }, at + 0.2);

      // Hold the finished picture before the section releases
      tl.to({}, { duration: 0.55 }, 3.45);
    }, panel);

    return () => ctx.revert();
  }, [pinned]);

  const heading = (
    <Reveal className="max-w-2xl">
      <p className="eyebrow">A common structure</p>
      <h3 className="mt-3 font-serif text-2xl font-semibold sm:text-3xl">Holding company, operating company and family trust</h3>
      <p className="mt-4 text-[15px] leading-relaxed text-muted">
        Here is how a typical owner-managed business can be reorganized, one step at a time. The right design depends
        entirely on your circumstances and is confirmed with your lawyers and accountants.
      </p>
    </Reveal>
  );

  if (!pinned) {
    return (
      <div>
        {heading}
        <div className="mt-8 grid items-start gap-10 lg:grid-cols-12">
          <ol className="space-y-6 lg:col-span-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex gap-4">
                <span className="font-serif text-xl font-semibold text-accent">{i + 1}</span>
                <div>
                  <h4 className="font-serif text-lg font-semibold">{s.title}</h4>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <OwnershipDiagram className="lg:col-span-7" />
        </div>
      </div>
    );
  }

  return (
    <div>
      {heading}
      {/* The tall track supplies the scroll distance; the panel inside stays pinned while the story plays */}
      <div ref={trackRef} className="relative mt-6" style={{ height: `${steps.length * 75 + 25}svh` }}>
        <div
          ref={panelRef}
          className="sticky top-[121px] flex h-[calc(100svh-121px)] flex-col justify-center pb-[84px] pt-4 lg:top-[137px] lg:h-[calc(100svh-137px)] lg:py-4"
        >
          <div className="grid items-center gap-5 sm:gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Narration */}
            <div className="lg:col-span-5">
              <div className="flex items-center gap-3">
                <span className="font-serif text-sm font-semibold text-accent-dark">
                  Step {step + 1} <span className="font-normal text-muted">of {steps.length}</span>
                </span>
                <span className="relative h-px flex-1 overflow-hidden bg-line" aria-hidden="true">
                  <span className="absolute inset-0 origin-left bg-accent-dark" style={{ transform: 'scaleX(var(--progress, 0))' }} />
                </span>
              </div>
              <ol className="relative mt-3 min-h-[180px] sm:mt-4 sm:min-h-[200px]">
                {steps.map((s) => (
                  <li key={s.title} data-step className="absolute inset-x-0 top-0">
                    <h4 className="font-serif text-lg font-semibold leading-snug sm:text-2xl lg:text-[1.75rem]">{s.title}</h4>
                    <p className="mt-2 text-[14px] leading-relaxed text-muted sm:mt-3 sm:text-base">{s.text}</p>
                  </li>
                ))}
              </ol>
            </div>

            {/* Diagram */}
            <figure
              className="lg:col-span-7"
              aria-label="Diagram of a typical restructured ownership: the owner and a family trust own a holding company, which owns the operating company"
            >
              <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-3 sm:p-6">
                <div
                  data-stage
                  className="relative mx-auto aspect-[10/9] w-[min(100%,calc((100svh-590px)*1.11))] will-change-transform sm:w-[min(100%,calc((100svh-520px)*1.11))] lg:w-[min(100%,calc((100svh-260px)*1.11))]"
                >
                  {/* Connectors, drawn as thin rules that grow into place */}
                  <div aria-hidden="true">
                    <span data-line="owners" data-grow="down" className="absolute left-[25%] top-[25%] -ml-px h-[8%] w-[1.5px] bg-accent" />
                    <span data-line="owners" data-grow="down" className="absolute left-[75%] top-[25%] -ml-px h-[8%] w-[1.5px] bg-accent" />
                    <span data-line="owners" data-grow="right" className="absolute left-[25%] top-[33%] h-[1.5px] w-[25%] bg-accent" />
                    <span data-line="owners" data-grow="left" className="absolute left-[50%] top-[33%] h-[1.5px] w-[25%] bg-accent" />
                    <span data-line="owners" data-grow="down" className="absolute left-[50%] top-[33%] -ml-px h-[6%] w-[1.5px] bg-accent" />
                    <span data-line="holdco" data-grow="down" className="absolute left-[50%] top-[61%] -ml-px h-[14%] w-[1.5px] bg-accent" />
                  </div>

                  {/* Surplus flowing up from the operating company to the holding company */}
                  <div data-flow className="absolute left-1/2 top-[61%] h-[14%] w-0" aria-hidden="true">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="story-dot absolute left-0 h-1.5 w-1.5 rounded-full bg-accent-dark"
                        style={{ animationDelay: `${d * 0.73}s` }}
                      />
                    ))}
                  </div>
                  <span
                    data-pill
                    className="absolute left-[60%] top-[64%] whitespace-nowrap rounded-full border border-line bg-white px-2.5 py-1 text-[10px] font-medium text-muted shadow-card sm:left-[62%] sm:text-[11px]"
                  >
                    Surplus flows up
                  </span>

                  <Entity icon={User} title="You, the owner" name="owner" className="left-0 top-0 h-[25%] w-[47%]">
                    Fixed-value preferred shares
                  </Entity>
                  <Entity icon={ShieldCheck} title="Family trust" name="trust" className="right-0 top-0 h-[25%] w-[47%]">
                    New common shares and future growth
                  </Entity>
                  <span
                    data-halo
                    className="story-halo absolute left-[22%] top-[39%] h-[22%] w-[56%] rounded-2xl"
                    aria-hidden="true"
                  />
                  <Entity icon={Building} title="Holding company" name="holdco" dark className="left-[22%] top-[39%] h-[22%] w-[56%]">
                    Holds surplus, investments and property
                  </Entity>
                  <Entity icon={Factory} title="Operating company" name="opco" className="bottom-0 left-[22%] h-[25%] w-[56%]">
                    <span data-opco-now className="block">
                      Runs the business, holds the cash and assets
                    </span>
                    <span data-opco-later className="absolute inset-x-0 top-0 block">
                      Runs the business and carries operating risk
                    </span>
                  </Entity>
                </div>

                {/* The professional team, introduced in the final step */}
                <ul data-team className="mt-3 flex flex-wrap justify-center gap-1.5 sm:mt-5 sm:gap-2" aria-label="Professional team">
                  {team.map((member) => (
                    <li
                      key={member}
                      className="rounded-full border border-ink/15 bg-white px-2.5 py-1 text-[11px] font-medium text-ink sm:px-3 sm:text-xs"
                    >
                      {member}
                    </li>
                  ))}
                </ul>
              </div>
              <figcaption className="mt-2 text-center text-[11px] text-muted sm:text-xs">Illustrative only — not a recommendation for any specific situation.</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </div>
  );
}
