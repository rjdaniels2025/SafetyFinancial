import { Building, Factory, ShieldCheck, User, type LucideIcon } from 'lucide-react';
import Reveal from '../ui/Reveal';

function Entity({
  icon: Icon,
  title,
  text,
  tone = 'light',
  delay = 0,
}: {
  icon: LucideIcon;
  title: string;
  text: string;
  tone?: 'light' | 'dark';
  delay?: number;
}) {
  const dark = tone === 'dark';
  return (
    <Reveal
      variant="scale"
      delay={delay}
      className={`relative rounded-2xl border p-4 text-center sm:p-5 ${
        dark ? 'border-ink bg-ink text-paper shadow-float' : 'border-line bg-white shadow-card'
      }`}
    >
      <span
        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-xl ${
          dark ? 'bg-paper/10 text-accent-light' : 'bg-accent-50 text-accent-dark'
        }`}
      >
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className={`mt-3 font-serif text-base font-semibold sm:text-lg ${dark ? 'text-paper' : 'text-ink'}`}>{title}</p>
      <p className={`mt-1 text-xs leading-relaxed sm:text-[13px] ${dark ? 'text-paper/70' : 'text-muted'}`}>{text}</p>
    </Reveal>
  );
}

function Connector({ label, merge = false }: { label: string; merge?: boolean }) {
  return (
    <Reveal variant="fade">
      <div className="relative flex flex-col items-center py-1" aria-hidden="true">
        {merge ? (
          <svg viewBox="0 0 200 36" preserveAspectRatio="none" className="h-9 w-1/2 text-accent">
            <path d="M1 0 V12 Q1 18 8 18 H192 Q199 18 199 12 V0 M100 18 V36" fill="none" stroke="currentColor" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
          </svg>
        ) : (
          <span className="h-9 w-px bg-accent" />
        )}
        <span className="my-1.5 rounded-full border border-line bg-white px-3 py-1 text-[11px] font-medium text-muted shadow-card">
          {label}
        </span>
        <span className="h-5 w-px bg-accent" />
      </div>
    </Reveal>
  );
}

/** Illustrative ownership: the owner and a family trust own a holding company, which owns the operating company. */
export default function OwnershipDiagram({ className = '' }: { className?: string }) {
  return (
    <figure className={className} aria-label="Diagram of a typical restructured ownership: the owner and a family trust own a holding company, which owns the operating company">
      <div className="rounded-3xl border border-line bg-paper p-4 sm:p-8">
        <div className="grid grid-cols-2 gap-3 sm:gap-5">
          <Entity icon={User} title="You, the owner" text="Fixed-value preferred shares after an estate freeze" />
          <Entity icon={ShieldCheck} title="Family trust" text="New common shares that hold future growth" delay={100} />
        </div>
        <Connector merge label="Own the shares of" />
        <div className="mx-auto max-w-xs">
          <Entity
            icon={Building}
            tone="dark"
            title="Holding company"
            text="Receives surplus and holds investments, property and other valuable assets"
            delay={200}
          />
        </div>
        <Connector label="Owns · surplus flows up as dividends" />
        <div className="mx-auto max-w-xs">
          <Entity icon={Factory} title="Operating company" text="Runs the business and carries the day-to-day operating risk" delay={300} />
        </div>
      </div>
      <figcaption className="mt-3 text-center text-xs text-muted">Illustrative only — not a recommendation for any specific situation.</figcaption>
    </figure>
  );
}
