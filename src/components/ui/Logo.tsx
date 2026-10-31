import { useId } from 'react';

// The WeWin mark: two interlocking V strokes forming a W — a white stroke behind a brushed-silver one,
// separated by a thin cut. Drawn on a 332 × 266 grid traced from the supplied master artwork.
const WHITE_V = 'M21 21 113 245 205 21';
const SILVER_V = 'M127 21 219 245 311 21';
const STROKE = 42;
const CUT = 8;

/**
 * The bare W symbol. Place it on a forest green or other dark background.
 * `draw` plays the intro: each stroke draws itself in turn, then a glint of light runs along the silver.
 */
export function WMark({ className = '', draw = false }: { className?: string; draw?: boolean }) {
  const id = useId().replace(/:/g, '');
  const stroke = { fill: 'none', strokeWidth: STROKE, strokeLinecap: 'round', strokeLinejoin: 'round' } as const;
  // pathLength normalises both strokes to 1 so the CSS draw animation needs no measuring
  const drawLength = draw ? { pathLength: 1 } : {};
  return (
    <svg viewBox="0 0 332 266" className={`${draw ? 'w-draw' : ''} ${className}`} aria-hidden="true">
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
          <path d={SILVER_V} className="w-stroke-2" {...drawLength} {...stroke} stroke="#000" strokeWidth={STROKE + CUT * 2} />
        </mask>
        {draw && (
          <>
            <mask id={`${id}-silver-only`} maskUnits="userSpaceOnUse" x="0" y="0" width="332" height="266">
              <path d={SILVER_V} {...stroke} stroke="#fff" />
            </mask>
            <filter id={`${id}-soften`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="9" />
            </filter>
          </>
        )}
      </defs>
      <path d={WHITE_V} className="w-stroke-1" {...drawLength} mask={`url(#${id}-cut)`} {...stroke} stroke="#FFFFFF" />
      <path d={SILVER_V} className="w-stroke-2" {...drawLength} {...stroke} stroke={`url(#${id}-silver)`} />
      {draw && (
        <g mask={`url(#${id}-silver-only)`}>
          <path d={SILVER_V} className="w-glint" pathLength={1} filter={`url(#${id}-soften)`} {...stroke} stroke="#FFFFFF" strokeWidth={70} strokeLinecap="butt" />
        </g>
      )}
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
  /** Light wordmark for forest green backgrounds. */
  reversed?: boolean;
  /** Show the symbol without its tile (only on green backgrounds). */
  bare?: boolean;
}

/** Full lockup: symbol plus the WeWin wordmark. */
export default function Logo({ reversed = false, bare = false }: LogoProps) {
  return (
    <span className="flex items-center gap-3">
      {bare ? <WMark className="h-8 w-10 flex-shrink-0" /> : <LogoMark className="h-10 w-10" />}
      <span className="flex flex-col items-stretch leading-none">
        <span className="font-sans text-[1.5rem] tracking-[-0.02em]">
          <span className={`font-light transition-colors duration-300 ${reversed ? 'text-white' : 'text-ink'}`}>We</span>
          <span className={`font-bold ${reversed ? 'text-silver' : 'text-silver-dark'}`}>Win</span>
        </span>
        <span
          className={`mt-1 text-[0.5rem] font-medium uppercase tracking-[0.32em] transition-colors duration-300 ${reversed ? 'text-white' : 'text-ink'}`}
        >
          Consulting Group
        </span>
      </span>
    </span>
  );
}
