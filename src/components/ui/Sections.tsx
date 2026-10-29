import type { ReactNode } from 'react';
import { Info } from 'lucide-react';
import { ArcPattern } from '../illustrations/Illustrations';
import Button from './Button';
import Reveal from './Reveal';

/** Dark page header used at the top of every interior page. */
export function PageHero({
  eyebrow,
  title,
  children,
  actions,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
  actions?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-ink pb-14 pt-28 text-paper sm:pb-24 sm:pt-44">
      <div className="aurora" />
      <ArcPattern className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 opacity-70 sm:-right-10 sm:h-[34rem] sm:w-[34rem] sm:opacity-100" />
      <div className="container-page relative">
        <Reveal variant="fade">
          <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-eyebrow text-brass-light">
            <span className="h-px w-8 bg-brass-light/70" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
        <h1 className="h-display mt-4 max-w-3xl text-paper sm:mt-5">
          <span className="line">
            <span style={{ animationDelay: '80ms' }}>{title}</span>
          </span>
        </h1>
        {children && (
          <Reveal delay={260}>
            <div className="mt-5 max-w-2xl text-[17px] leading-relaxed text-paper/75 sm:mt-6 sm:text-lg">{children}</div>
          </Reveal>
        )}
        {actions && (
          <Reveal delay={380}>
            <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row">{actions}</div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  children,
  align = 'left',
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className={`eyebrow flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span
            className="h-px w-8 origin-left bg-brass"
            style={{ animation: 'reveal-fade 1s ease both, line-grow 0.9s cubic-bezier(0.22, 1, 0.36, 1) 150ms both' }}
            aria-hidden="true"
          />
          {eyebrow}
        </p>
      )}
      <h2 className="h-section mt-3">{title}</h2>
      {children && <div className="lead mt-4">{children}</div>}
    </Reveal>
  );
}

export function ProcessSteps({ steps }: { steps: { title: string; text: string }[] }) {
  return (
    <ol className="grid border-t border-line sm:gap-px sm:overflow-hidden sm:rounded-2xl sm:border sm:bg-line md:grid-cols-2 lg:grid-cols-3">
      {steps.map((step, i) => (
        <Reveal
          as="li"
          key={step.title}
          delay={(i % 3) * 110}
          className="group relative flex gap-5 border-b border-line py-5 transition-colors duration-500 sm:block sm:border-0 sm:bg-white sm:p-7 sm:hover:bg-paper"
        >
          <span
            className="absolute inset-x-0 top-0 hidden h-0.5 origin-left scale-x-0 bg-brass transition-transform duration-500 ease-brand group-hover:scale-x-100 sm:block"
            aria-hidden="true"
          />
          <span className="w-8 flex-shrink-0 font-serif text-2xl font-semibold leading-none text-brass transition-transform duration-500 ease-brand sm:text-3xl sm:group-hover:-translate-y-0.5">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div>
            <h3 className="text-lg font-semibold leading-snug sm:mt-3">{step.title}</h3>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted sm:mt-2">{step.text}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

export function TopicList({ items, columns = 2 }: { items: string[]; columns?: 1 | 2 | 3 }) {
  const grid = { 1: '', 2: 'sm:grid-cols-2', 3: 'sm:grid-cols-2 lg:grid-cols-3' }[columns];
  return (
    <ul className={`grid gap-x-8 gap-y-3 ${grid}`}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} variant="left" delay={Math.min(i, 8) * 45} className="flex gap-3 text-[15px] leading-relaxed text-ink/85">
          <span className="mt-2.5 h-px w-4 flex-shrink-0 bg-brass" aria-hidden="true" />
          {item}
        </Reveal>
      ))}
    </ul>
  );
}

/** Compliance or "please note" box. */
export function Notice({ title = 'Important information', children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="flex gap-4 rounded-xl border border-brass/30 bg-brass-50 p-5 text-sm leading-relaxed text-ink/80">
      <Info className="mt-0.5 h-5 w-5 flex-shrink-0 text-brass-dark" aria-hidden="true" />
      <div>
        <p className="mb-1 font-semibold text-ink">{title}</p>
        {children}
      </div>
    </aside>
  );
}

export function ConsultationBand({
  title = 'Start with a confidential conversation.',
  text = 'Tell us about your situation and we will help you understand your options and the appropriate next steps.',
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="bg-paper py-14 sm:py-24">
      <div className="container-page">
        <Reveal variant="scale" className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center shadow-float sm:px-14 sm:py-20">
          <div className="aurora" style={{ '--aurora-a': 0.22 } as React.CSSProperties} />
          <ArcPattern spin className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rotate-180 opacity-70" />
          <ArcPattern spin className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 opacity-40" />
          <h2 className="h-section relative mx-auto max-w-2xl text-paper">{title}</h2>
          <p className="relative mx-auto mt-4 max-w-xl text-paper/70">{text}</p>
          <div className="relative mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button to="/contact" variant="light" arrow>
              Book a Consultation
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
