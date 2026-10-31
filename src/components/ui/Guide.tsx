import { useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import HeroBackdrop from '../motion/HeroBackdrop';
import useScrollExit from '../../hooks/useScrollExit';
import { useDarkHero } from '../../lib/darkHero';
import Reveal from './Reveal';
import { strategyGuides } from '../../data/services';

/** Dark cinematic header for in-depth guides. `accent` is set in italic silver within the title. */
export function GuideHero({
  eyebrow,
  before,
  accent,
  after = '',
  children,
}: {
  eyebrow: string;
  before: string;
  accent: string;
  after?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const exit = useScrollExit(ref);
  useDarkHero();

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-ink pb-16 pt-32 text-paper sm:pb-24 sm:pt-44">
      <HeroBackdrop exit={exit} />
      <div className="hero-exit container-page relative">
        <Reveal variant="fade">
          <Link
            to="/financial-strategies#corporate-restructuring"
            className="inline-flex items-center gap-2 text-sm font-medium text-paper/70 transition-colors hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Corporate Restructuring
          </Link>
          <p className="mt-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-accent-light">
            <span className="h-px w-8 bg-accent-light/70" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="title-shadow mt-5 max-w-4xl font-serif text-[2.6rem] font-semibold leading-[1.04] tracking-tight text-paper sm:text-6xl lg:text-7xl">
          <span className="focus-line">
            <span style={{ animationDelay: '80ms' }}>
              {before} <em className="font-normal italic text-accent-light">{accent}</em>
              {after}
            </span>
          </span>
        </h1>
        <Reveal delay={300}>
          <div className="title-shadow mt-7 max-w-2xl text-lg leading-relaxed text-paper/80 sm:text-xl">{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

export function GuideSection({
  eyebrow,
  title,
  intro,
  tone = 'white',
  children,
}: {
  eyebrow: string;
  title: string;
  intro?: ReactNode;
  tone?: 'white' | 'paper';
  children: ReactNode;
}) {
  return (
    <section className={`border-b border-line py-14 sm:py-20 lg:py-24 ${tone === 'white' ? 'bg-white' : 'bg-paper'}`}>
      <div className="container-page grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="lg:col-span-4">
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-3">{title}</h2>
          {intro && <div className="mt-4 text-[15px] leading-relaxed text-muted">{intro}</div>}
        </Reveal>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}

/** Numbered points with a bold lead-in, inside a bordered panel. */
export function NumberedPoints({ items }: { items: { lead: string; text: ReactNode }[] }) {
  return (
    <ol className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => (
        <Reveal as="li" key={item.lead} delay={i * 90} className="flex gap-5 p-6 sm:gap-7 sm:p-8">
          <span className="w-6 flex-shrink-0 font-serif text-4xl font-normal leading-none text-accent-dark sm:text-5xl">{i + 1}</span>
          <p className="text-[16px] leading-relaxed text-ink/80 sm:text-[17px]">
            <strong className="font-semibold text-ink">{item.lead}</strong> {item.text}
          </p>
        </Reveal>
      ))}
    </ol>
  );
}

/** Definition cards with a green rule along the top. */
export function RuleCards({ items }: { items: { title: string; text: ReactNode }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
      {items.map((item, i) => (
        <Reveal key={item.title} delay={i * 100} className="group bg-white p-6 sm:p-8">
          <span
            className="block h-0.5 w-full origin-left bg-accent-dark transition-transform duration-700 ease-brand group-hover:scale-x-105"
            aria-hidden="true"
          />
          <h3 className="mt-6 text-2xl font-semibold">{item.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{item.text}</p>
        </Reveal>
      ))}
    </div>
  );
}

export function StepCards({ steps }: { steps: { title: string; text: ReactNode }[] }) {
  return (
    <ol className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
      {steps.map((step, i) => (
        <Reveal as="li" key={step.title} delay={(i % 2) * 110} className="bg-white p-6 transition-colors duration-500 hover:bg-paper sm:p-8">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-muted">Step {String(i + 1).padStart(2, '0')}</p>
          <h3 className="mt-3 text-2xl font-semibold leading-snug">{step.title}</h3>
          <p className="mt-3 text-[15px] leading-relaxed text-ink/75">{step.text}</p>
        </Reveal>
      ))}
    </ol>
  );
}

export function ArrowList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
      {items.map((item, i) => (
        <Reveal as="li" key={i} variant="left" delay={i * 80} className="flex gap-4 p-6 text-[16px] leading-relaxed text-ink/85 sm:p-7 sm:text-[17px]">
          <ArrowRight className="mt-1 h-5 w-5 flex-shrink-0 text-accent-dark" aria-hidden="true" />
          <span>{item}</span>
        </Reveal>
      ))}
    </ul>
  );
}

/** Links to the other in-depth guides. */
export function RelatedGuides({ current }: { current: string }) {
  const others = strategyGuides.filter((g) => g.path !== current);
  return (
    <section className="bg-white py-14 sm:py-20">
      <div className="container-page">
        <Reveal>
          <p className="eyebrow">Keep reading</p>
          <h2 className="h-section mt-3">Related guides</h2>
        </Reveal>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {others.map((g, i) => (
            <Reveal key={g.path} delay={i * 90} className="h-full">
              <Link
                to={g.path}
                className="group flex h-full flex-col rounded-2xl border border-line bg-paper p-6 transition-all duration-500 ease-brand hover:-translate-y-1 hover:border-accent hover:bg-white hover:shadow-lift"
              >
                <span className="font-serif text-xl font-semibold">{g.title}</span>
                <span className="mt-2 flex-1 text-sm leading-relaxed text-muted">{g.blurb}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent-dark">
                  Read the guide
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-brand group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
