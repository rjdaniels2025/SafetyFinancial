// Looping line-art scenes for the dark heroes: each main page plays its own "chapter" of the WeWin story,
// drawn in silver light behind the smoke. The homepage plays all four chapters in turn, like a film.
// All motion is CSS (index.css, "Story loops"): one 10s cycle per scene in which lines draw in, hold and
// fade. The backdrop pauses it off screen, and reduced motion shows a still frame.

export type StoryVariant = 'home' | 'debt' | 'funding' | 'mortgage' | 'strategy' | 'about';

type Delay = { '--d'?: string };
const d = (s: number) => ({ '--d': `${s}s` }) as React.CSSProperties & Delay;
const P = { pathLength: 1 } as const;

/** Debt: a tangled knot gives way to one calm, rising line. */
function Debt() {
  return (
    <g>
      <path
        className="sl-knot"
        {...P}
        d="M150 330 C 200 200, 330 430, 270 280 S 150 170, 230 230 S 390 390, 320 310 S 170 250, 240 350 S 410 260, 340 210 S 210 390, 170 300 S 300 160, 360 260"
      />
      <path className="sl-line sl-late" {...P} d="M80 430 C 200 430, 250 330, 340 280 S 470 180, 530 150" />
      <path className="sl-line sl-late" style={d(0.4)} {...P} d="M80 470 H 330" />
      <path className="sl-line sl-late" style={d(0.6)} {...P} d="M80 500 H 260" />
      <circle className="sl-node sl-node-late" cx="530" cy="150" r="7" />
    </g>
  );
}

/** Funding: bars build, then a growth curve climbs with a spark travelling along it. */
function Funding() {
  const bars = [
    [110, 440],
    [190, 400],
    [270, 350],
    [350, 290],
    [430, 220],
  ];
  return (
    <g>
      <path className="sl-line" {...P} d="M80 500 H 530" />
      {bars.map(([x, top], i) => (
        <path key={x} className="sl-line" style={d(0.25 + i * 0.2)} {...P} d={`M${x} 500 V${top} H${x + 46} V500`} />
      ))}
      <path className="sl-line sl-late" {...P} d="M100 420 C 200 400, 270 330, 340 270 S 460 140, 520 110" />
      <g className="sl-node sl-node-late">
        <path className="sl-flow" {...P} d="M100 420 C 200 400, 270 330, 340 270 S 460 140, 520 110" />
      </g>
      <circle className="sl-node sl-node-late" cx="520" cy="110" r="7" />
    </g>
  );
}

/** Mortgage: a home draws itself, its windows light, and an arc rises above it. */
function Mortgage() {
  return (
    <g>
      <path className="sl-line" {...P} d="M90 470 H 510" />
      <path className="sl-line" style={d(0.2)} {...P} d="M170 470 V 310 H 430 V 470" />
      <path className="sl-line" style={d(0.5)} {...P} d="M140 330 L 300 190 L 460 330" />
      <path className="sl-line" style={d(0.8)} {...P} d="M380 245 V 205 H 410 V 272" />
      <path className="sl-line" style={d(1)} {...P} d="M272 470 V 395 H 328 V 470" />
      <rect className="sl-glow" x="200" y="345" width="48" height="44" rx="3" />
      <rect className="sl-glow" x="352" y="345" width="48" height="44" rx="3" style={d(0.3)} />
      <path className="sl-line sl-late" {...P} d="M110 160 Q 300 40 490 160" />
      <circle className="sl-node sl-node-late" cx="490" cy="160" r="6" />
    </g>
  );
}

/** Strategy: owner and trust above, holding company, operating company; surplus flows up; a slow orbit. */
function Strategy() {
  return (
    <g>
      <g className="sl-spin">
        <circle className="sl-orbit" cx="300" cy="300" r="262" />
      </g>
      {[
        [210, 150],
        [390, 150],
        [300, 300],
        [300, 450],
      ].map(([cx, cy], i) => (
        <circle key={i} className="sl-line" style={d(i * 0.25)} {...P} cx={cx} cy={cy} r="34" />
      ))}
      <path className="sl-line sl-late" {...P} d="M210 184 V 222 H 390 V 184 M 300 222 V 266" />
      <path className="sl-line sl-late" style={d(0.3)} {...P} d="M300 334 V 416" />
      <g className="sl-node sl-node-late">
        <path className="sl-flow" {...P} d="M300 416 V 334" />
      </g>
      {[
        [210, 150],
        [390, 150],
        [300, 300],
        [300, 450],
      ].map(([cx, cy], i) => (
        <circle key={`c${i}`} className="sl-node" style={d(i * 0.2)} cx={cx} cy={cy} r="5" />
      ))}
    </g>
  );
}

/** About: a constellation of specialists connected to one centre, slowly turning. */
function About() {
  const pts = Array.from({ length: 6 }, (_, i) => {
    const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
    return [300 + Math.cos(a) * 200, 300 + Math.sin(a) * 200];
  });
  return (
    <g className="sl-spin sl-spin-slow">
      {pts.map(([x, y], i) => (
        <path key={i} className="sl-line" style={d(i * 0.22)} {...P} d={`M${x.toFixed(1)} ${y.toFixed(1)} L300 300`} />
      ))}
      <path
        className="sl-line sl-late"
        {...P}
        d={`M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L')} Z`}
      />
      <circle className="sl-line" {...P} cx="300" cy="300" r="30" />
      {pts.map(([x, y], i) => (
        <circle key={`n${i}`} className="sl-node" style={d(i * 0.15)} cx={x} cy={y} r="8" />
      ))}
    </g>
  );
}

const CHAPTERS: { scene: () => JSX.Element; line: string }[] = [
  { scene: Debt, line: 'Clear the debt.' },
  { scene: Funding, line: 'Fund the growth.' },
  { scene: Mortgage, line: 'Secure the home.' },
  { scene: Strategy, line: 'Build what lasts.' },
];

const SCENES = { debt: Debt, funding: Funding, mortgage: Mortgage, strategy: Strategy, about: About };

export default function StoryLoop({ variant }: { variant: StoryVariant }) {
  return (
    <div className={`story-loop story-loop-${variant === 'home' ? 'home' : 'page'}`} aria-hidden="true">
      <svg viewBox="0 0 600 600">
        {variant === 'home' ? (
          CHAPTERS.map(({ scene: Scene, line }, i) => (
            <g key={line} className="sl-chapter" style={{ '--ch': `${i * 10}s` } as React.CSSProperties}>
              <Scene />
              <text className="sl-caption sl-node" x="300" y="580" textAnchor="middle">
                {line}
              </text>
            </g>
          ))
        ) : (
          (() => {
            const Scene = SCENES[variant];
            return <Scene />;
          })()
        )}
      </svg>
    </div>
  );
}
