/** Restrained, on-brand decorative artwork used where photography has not yet been supplied. */

const radii = [60, 110, 160, 210, 260, 310];

/** Concentric quarter-arcs that draw themselves in on load; `spin` adds a very slow rotation. */
export function ArcPattern({ className = '', spin = false }: { className?: string; spin?: boolean }) {
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden="true">
      <g
        style={spin ? { transformOrigin: '400px 400px', animation: 'slow-spin 120s linear infinite' } : undefined}
      >
        {radii.map((r, i) => {
          const length = Math.ceil(2 * Math.PI * r);
          return (
            <circle
              key={r}
              cx="400"
              cy="400"
              r={r}
              fill="none"
              stroke={i % 2 ? '#B8C1BD' : '#F5F7F6'}
              strokeOpacity={i % 2 ? 0.35 : 0.08}
              strokeDasharray={length}
              style={
                {
                  '--dash': length,
                  animation: `draw 2.4s cubic-bezier(0.22, 1, 0.36, 1) ${200 + i * 140}ms both`,
                } as React.CSSProperties
              }
            />
          );
        })}
      </g>
    </svg>
  );
}

export function ConsultationIllustration({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 440 360" className={className} role="img" aria-label="Abstract illustration of a structured consultation">
      <rect width="440" height="360" rx="14" fill="#E9EDEB" />
      <rect x="40" y="48" width="220" height="264" rx="8" fill="#FFFFFF" stroke="#D8DEDB" />
      {[92, 128, 164, 200].map((y, i) => (
        <g key={y}>
          <circle cx="70" cy={y} r="7" fill={i < 3 ? '#123A26' : '#FFFFFF'} stroke="#123A26" strokeWidth="1.5" />
          <rect x="90" y={y - 4} width={i === 1 ? 110 : 140} height="8" rx="4" fill="#D8DEDB" />
        </g>
      ))}
      <rect x="60" y="240" width="120" height="34" rx="5" fill="#123A26" />
      <rect x="236" y="96" width="164" height="176" rx="8" fill="#123A26" />
      <polyline points="258,236 292,206 322,218 360,160 380,150" fill="none" stroke="#B8C1BD" strokeWidth="2.5" strokeLinejoin="round" />
      <line x1="258" y1="246" x2="380" y2="246" stroke="#F5F7F6" strokeOpacity="0.25" />
      <rect x="258" y="118" width="70" height="7" rx="3.5" fill="#F5F7F6" fillOpacity="0.5" />
    </svg>
  );
}
