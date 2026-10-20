/** Restrained, on-brand illustrations used where photography has not yet been supplied. */

export function HeroIllustration({ className = '' }: { className?: string }) {
  const bars = [
    { x: 56, h: 118 },
    { x: 132, h: 162 },
    { x: 208, h: 214 },
    { x: 284, h: 276 },
    { x: 360, h: 352 },
  ];
  const baseY = 470;
  const tops = bars.map((b) => `${b.x + 22},${baseY - b.h}`).join(' ');

  return (
    <svg viewBox="0 0 440 520" className={className} role="img" aria-label="Abstract illustration of steady, structured growth">
      <defs>
        <linearGradient id="hero-bar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2A4467" />
          <stop offset="1" stopColor="#12263F" />
        </linearGradient>
      </defs>
      <rect width="440" height="520" rx="14" fill="#0B1B2E" />
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={i * 55} y1="0" x2={i * 55} y2="520" stroke="#F7F5F0" strokeOpacity="0.05" />
      ))}
      {Array.from({ length: 10 }).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i * 55} x2="440" y2={i * 55} stroke="#F7F5F0" strokeOpacity="0.05" />
      ))}
      {bars.map((b) => (
        <rect key={b.x} x={b.x} y={baseY - b.h} width="44" height={b.h} rx="3" fill="url(#hero-bar)" />
      ))}
      <line x1="32" y1={baseY} x2="408" y2={baseY} stroke="#D8C29B" strokeOpacity="0.4" />
      <polyline points={tops} fill="none" stroke="#A8834A" strokeWidth="2" strokeLinejoin="round" />
      {bars.map((b) => (
        <circle key={`c${b.x}`} cx={b.x + 22} cy={baseY - b.h} r="3.5" fill="#0B1B2E" stroke="#A8834A" strokeWidth="2" />
      ))}
      <circle cx="382" cy={baseY - 352} r="12" fill="none" stroke="#A8834A" strokeOpacity="0.45" />
      <text x="32" y="58" fill="#D8C29B" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="2.5">
        CLARITY · STRATEGY · STRUCTURE
      </text>
    </svg>
  );
}

export function ArcPattern({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      {[60, 110, 160, 210, 260, 310].map((r, i) => (
        <circle
          key={r}
          cx="400"
          cy="400"
          r={r}
          fill="none"
          stroke={i % 2 ? '#A8834A' : '#F7F5F0'}
          strokeOpacity={i % 2 ? 0.35 : 0.08}
        />
      ))}
    </svg>
  );
}

export function ConsultationIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 360" className={className} role="img" aria-label="Abstract illustration of a structured consultation">
      <rect width="440" height="360" rx="14" fill="#EEEAE1" />
      <rect x="40" y="48" width="220" height="264" rx="8" fill="#FFFFFF" stroke="#DDD7CB" />
      {[92, 128, 164, 200].map((y, i) => (
        <g key={y}>
          <circle cx="70" cy={y} r="7" fill={i < 3 ? '#0B1B2E' : '#FFFFFF'} stroke="#0B1B2E" strokeWidth="1.5" />
          <rect x="90" y={y - 4} width={i === 1 ? 110 : 140} height="8" rx="4" fill="#DDD7CB" />
        </g>
      ))}
      <rect x="60" y="240" width="120" height="34" rx="5" fill="#0B1B2E" />
      <rect x="236" y="96" width="164" height="176" rx="8" fill="#0B1B2E" />
      <polyline points="258,236 292,206 322,218 360,160 380,150" fill="none" stroke="#A8834A" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="258" y1="246" x2="380" y2="246" stroke="#F7F5F0" strokeOpacity="0.25" />
      <rect x="258" y="118" width="70" height="7" rx="3.5" fill="#F7F5F0" fillOpacity="0.5" />
    </svg>
  );
}
