import { useId } from 'react';

// The WeWin mark: two interlocking V strokes forming a W — a white stroke behind a brushed-silver one,
// separated by a thin cut. Drawn on a 332 × 266 grid traced from the supplied master artwork.
const WHITE_V = 'M21 21 113 245 205 21';
const SILVER_V = 'M127 21 219 245 311 21';
const STROKE = 42;
const CUT = 8;

/** The bare W symbol. Place it on a forest green or other dark background. */
export function WMark({ className = '' }: { className?: string }) {
  const id = useId().replace(/:/g, '');
  return (
    <svg viewBox="0 0 332 266" className={className} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-silver`} gradientUnits="userSpaceOnUse" x1="127" y1="0" x2="311" y2="266">
          <stop offset="0" stopColor="#E6E9EC" />
          <stop offset="0.38" stopColor="#A1A7AF" />
          <stop offset="0.52" stopColor="#DCDFE3" />
          <stop offset="0.78" stopColor="#A7ADB4" />
          <stop offset="1" stopColor="#C8CCD1" />
        </linearGradient>
        {/* Hides the part of the white stroke that passes behind the silver one, leaving a clean cut */}
        <mask id={`${id}-cut`} maskUnits="userSpaceOnUse" x="0" y="0" width="332" height="266">
          <rect width="332" height="266" fill="#fff" />
          <path d={SILVER_V} fill="none" stroke="#000" strokeWidth={STROKE + CUT * 2} strokeLinecap="round" strokeLinejoin="round" />
        </mask>
      </defs>
      <path
        d={WHITE_V}
        mask={`url(#${id}-cut)`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={SILVER_V}
        fill="none"
        stroke={`url(#${id}-silver)`}
        strokeWidth={STROKE}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The W symbol on a forest green tile, for light backgrounds. */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <span className={`flex flex-shrink-0 items-center justify-center rounded-[22%] bg-ink ${className}`} aria-hidden="true">
      <WMark className="w-[64%]" />
    </span>
  );
}

interface LogoProps {
  reversed?: boolean;
}

/** Full lockup: symbol plus the WeWin wordmark. `reversed` is for forest green backgrounds. */
export default function Logo({ reversed = false }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      {reversed ? <WMark className="h-8 w-10 flex-shrink-0" /> : <LogoMark className="h-10 w-10" />}
      <span className="flex flex-col items-stretch leading-none">
        <span className="font-sans text-[1.5rem] tracking-[-0.02em]">
          <span className={`font-light ${reversed ? 'text-white' : 'text-ink'}`}>We</span>
          <span className={`font-bold ${reversed ? 'text-silver' : 'text-silver-dark'}`}>Win</span>
        </span>
        <span
          className={`mt-1 text-[0.5rem] font-medium uppercase tracking-[0.32em] ${reversed ? 'text-white' : 'text-ink'}`}
        >
          Consulting Group
        </span>
      </span>
    </span>
  );
}
