interface LogoMarkProps {
  className?: string;
  reversed?: boolean;
}

/** The WeWin mark: a W whose final stroke rises past its start, signalling forward progress. */
export function LogoMark({ className = 'h-9 w-9', reversed = false }: LogoMarkProps) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="9" fill={reversed ? '#F5F7F6' : '#123A26'} />
      <path
        d="M11 16 17.5 33 24 20.5 30.5 33 38 11"
        fill="none"
        stroke={reversed ? '#1F5A3C' : '#C9D0CD'}
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

interface LogoProps {
  reversed?: boolean;
}

export default function Logo({ reversed = false }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      <LogoMark reversed={reversed} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-serif text-[1.35rem] font-semibold tracking-tight ${reversed ? 'text-paper' : 'text-ink'}`}
        >
          WeWin
        </span>
        <span
          className={`mt-1 text-[0.6rem] font-semibold uppercase tracking-[0.24em] ${
            reversed ? 'text-accent-light' : 'text-accent-dark'
          }`}
        >
          Consulting Group
        </span>
      </span>
    </span>
  );
}
