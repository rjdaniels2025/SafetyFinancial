// Line-art scenes that tell the WeWin story, driven by scroll rather than by time: nothing repeats. Each scene
// reads a progress value --p (0–1) from an ancestor and every stroke maps a window of it to its own draw-in, so
// the picture builds forward and backward with the visitor's scrolling. Two acts per scene: act one (the
// situation) by ~0.45, act two (the resolution) from ~0.5. Styles live in index.css, "Scroll story".

export type StoryScene = 'debt' | 'funding' | 'mortgage' | 'strategy' | 'about';

/** Progress window: draw over [a, b]; optionally fade out over [fa, fb]. */
const w = (a: number, b: number, fa?: number, fb?: number) =>
  ({ '--a': a, '--b': b, ...(fa !== undefined ? { '--fa': fa, '--fb': fb } : {}) }) as React.CSSProperties;
const P = { pathLength: 1 } as const;

function Debt() {
  // A balance scale. Act one: the debts stack up on one side and tip it down. Act two: they lift away one at a
  // time, the beam comes back to level, and a check mark settles above the pivot.
  const debts = [
    [130, 266, 84],
    [130, 236, 68],
    [130, 206, 52],
  ];
  return (
    <g>
      <path className="ss-el ss-line" style={w(0.02, 0.12)} {...P} d="M220 520 H 380" />
      <path className="ss-el ss-line" style={w(0.04, 0.16)} {...P} d="M300 520 V 178" />
      <circle className="ss-el ss-node" style={w(0.12, 0.2)} cx="300" cy="170" r="8" />
      <g className="ss-tilt" style={w(0.5, 0.86)}>
        <path className="ss-el ss-line" style={w(0.1, 0.22)} {...P} d="M130 170 H 470" />
        {[130, 470].map((x, i) => (
          <g key={x} className="ss-hang" style={{ transformOrigin: `${x}px 170px` }}>
            <path className="ss-el ss-line" style={w(0.16 + i * 0.04, 0.3 + i * 0.04)} {...P} d={`M${x} 170 L${x - 54} 296 M${x} 170 L${x + 54} 296`} />
            <path className="ss-el ss-line" style={w(0.22 + i * 0.04, 0.34 + i * 0.04)} {...P} d={`M${x - 66} 296 H${x + 66} Q${x} 342 ${x - 66} 296`} />
          </g>
        ))}
        {/* The debts ride on the left pan */}
        <g className="ss-hang" style={{ transformOrigin: '130px 170px' }}>
          {debts.map(([cx, y, wd], i) => (
            <path
              key={y}
              className="ss-el ss-line"
              style={w(0.26 + i * 0.05, 0.38 + i * 0.05, 0.66 - i * 0.07, 0.74 - i * 0.07)}
              {...P}
              d={`M${cx - wd / 2} ${y + 28} V${y} H${cx + wd / 2} V${y + 28} Z`}
            />
          ))}
        </g>
      </g>
      <path className="ss-el ss-line" style={w(0.86, 0.97)} {...P} d="M276 104 L 294 122 L 326 86" />
    </g>
  );
}

function Funding() {
  const bars = [
    [110, 440],
    [190, 400],
    [270, 350],
    [350, 290],
    [430, 220],
  ];
  const curve = 'M100 420 C 200 400, 270 330, 340 270 S 460 140, 520 110';
  return (
    <g>
      <path className="ss-el ss-line" style={w(0.02, 0.14)} {...P} d="M80 500 H 530" />
      {bars.map(([x, top], i) => (
        <path key={x} className="ss-el ss-line" style={w(0.08 + i * 0.065, 0.24 + i * 0.065)} {...P} d={`M${x} 500 V${top} H${x + 46} V500`} />
      ))}
      <path className="ss-el ss-line" style={w(0.5, 0.84)} {...P} d={curve} />
      <path className="ss-el ss-flow" style={w(0.56, 0.98)} {...P} d={curve} />
      <circle className="ss-el ss-node" style={w(0.84, 0.94)} cx="520" cy="110" r="7" />
    </g>
  );
}

function Mortgage() {
  return (
    <g>
      <path className="ss-el ss-line" style={w(0.02, 0.12)} {...P} d="M90 470 H 510" />
      <path className="ss-el ss-line" style={w(0.06, 0.26)} {...P} d="M170 470 V 310 H 430 V 470" />
      <path className="ss-el ss-line" style={w(0.16, 0.34)} {...P} d="M140 330 L 300 190 L 460 330" />
      <path className="ss-el ss-line" style={w(0.28, 0.38)} {...P} d="M380 245 V 205 H 410 V 272" />
      <path className="ss-el ss-line" style={w(0.3, 0.44)} {...P} d="M272 470 V 395 H 328 V 470" />
      <rect className="ss-el ss-glow" style={w(0.5, 0.62)} x="200" y="345" width="48" height="44" rx="3" />
      <rect className="ss-el ss-glow" style={w(0.56, 0.68)} x="352" y="345" width="48" height="44" rx="3" />
      {/* The path upward: private lender to institutional lender */}
      <path className="ss-el ss-line" style={w(0.64, 0.9)} {...P} d="M110 160 Q 300 40 490 160" />
      <circle className="ss-el ss-node" style={w(0.88, 0.96)} cx="490" cy="160" r="6" />
    </g>
  );
}

function Strategy() {
  const nodes = [
    [210, 150],
    [390, 150],
    [300, 300],
    [300, 450],
  ];
  return (
    <g>
      <g className="ss-spin">
        <circle className="ss-orbit" cx="300" cy="300" r="262" />
      </g>
      {nodes.map(([cx, cy], i) => (
        <circle key={i} className="ss-el ss-line" style={w(0.02 + i * 0.08, 0.2 + i * 0.08)} {...P} cx={cx} cy={cy} r="34" />
      ))}
      {nodes.map(([cx, cy], i) => (
        <circle key={`c${i}`} className="ss-el ss-node" style={w(0.3 + i * 0.03, 0.4 + i * 0.03)} cx={cx} cy={cy} r="5" />
      ))}
      <path className="ss-el ss-line" style={w(0.5, 0.7)} {...P} d="M210 184 V 222 H 390 V 184 M 300 222 V 266" />
      <path className="ss-el ss-line" style={w(0.6, 0.74)} {...P} d="M300 334 V 416" />
      {/* Surplus flowing up from the operating company to the holding company */}
      <path className="ss-el ss-flow" style={w(0.7, 0.98)} {...P} d="M300 416 V 334" />
    </g>
  );
}

function About() {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [300 + Math.cos(a) * 200, 300 + Math.sin(a) * 200];
  });
  return (
    <g className="ss-spin">
      {pts.map(([x, y], i) => (
        <circle key={`n${i}`} className="ss-el ss-node" style={w(0.02 + i * 0.06, 0.12 + i * 0.06)} cx={x} cy={y} r="8" />
      ))}
      <circle className="ss-el ss-line" style={w(0.3, 0.44)} {...P} cx="300" cy="300" r="30" />
      {pts.map(([x, y], i) => (
        <path key={i} className="ss-el ss-line" style={w(0.5 + i * 0.05, 0.64 + i * 0.05)} {...P} d={`M${x.toFixed(1)} ${y.toFixed(1)} L300 300`} />
      ))}
      <path
        className="ss-el ss-line"
        style={w(0.8, 0.97)}
        {...P}
        d={`M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`}
      />
    </g>
  );
}

const SCENES: Record<StoryScene, () => JSX.Element> = { debt: Debt, funding: Funding, mortgage: Mortgage, strategy: Strategy, about: About };

/** One scene, or (with `chapters`) several scenes that play one after another across the progress range. */
export default function StoryArt({ scene, chapters, className = '' }: { scene?: StoryScene; chapters?: StoryScene[]; className?: string }) {
  const list = chapters ?? (scene ? [scene] : []);
  const n = list.length;
  return (
    <svg viewBox="0 0 600 600" className={`ss ${className}`} aria-hidden="true">
      {list.map((key, i) => {
        const Scene = SCENES[key];
        if (n === 1) return <Scene key={key} />;
        return (
          <g
            key={key}
            className="ss-chapter"
            style={{ '--c0': i / n, '--c1': (i + 1) / n, '--keep': i === n - 1 ? 1 : 0 } as React.CSSProperties}
          >
            <Scene />
          </g>
        );
      })}
    </svg>
  );
}
