import type { CSSProperties } from 'react';
import { EXAMPLE_FILES, type Status } from '../../content/files';
import { StatusIcon } from './StatusIcon';

export type Backdrop = 'cards' | 'inbox' | 'particles' | 'board' | 'network';

/** Deterministic pseudo-random numbers, so the artwork is identical on every render. */
function seeded(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Ambient, slowly moving artwork behind a page hero. Purely decorative. */
export function HeroBackdrop({ variant }: { variant: Backdrop }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden select-none">
      {variant === 'cards' && <Cards />}
      {variant === 'inbox' && <Inbox />}
      {variant === 'particles' && <Particles />}
      {variant === 'board' && <Board />}
      {variant === 'network' && <Network />}
      {/* Fades the artwork out behind the text in the bottom-left. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_top,#fff_6%,rgb(255_255_255/0.7)_38%,rgb(255_255_255/0)_72%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#fff_8%,rgb(255_255_255/0.55)_40%,rgb(255_255_255/0)_70%)]" />
    </div>
  );
}

const CARD_STATUSES: Status[] = ['review', 'verified', 'submitted', 'missing', 'received', 'decision'];

function Cards() {
  const cards = Array.from({ length: 30 }, (_, i) => {
    const f = EXAMPLE_FILES[i % EXAMPLE_FILES.length];
    return { ...f, id: `SI-${2041 + i * 7}`, status: CARD_STATUSES[(i * 5) % CARD_STATUSES.length] };
  });
  return (
    <div className="absolute top-[-30%] left-[18%] h-[190%] w-[150%] [transform:perspective(1400px)_rotateX(54deg)_rotateZ(-20deg)]">
      <div className="grid animate-drift grid-cols-5 gap-5">
        {cards.map((c) => (
          <div key={c.id} className="flex flex-col gap-2 rounded-xl bg-white p-4 text-[13px] shadow-card">
            <div className="flex items-center gap-2">
              <StatusIcon status={c.status} />
              <span className="font-mono text-[11px] text-ink-3">{c.id}</span>
            </div>
            <span className="truncate font-medium text-ink">{c.programme}</span>
            <span className="text-[12px] text-ink-3">{c.intake}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const INBOX_ROWS: { status: Status; id: string; text: string }[] = [
  { status: 'missing', id: 'SI-2042', text: 'English test score missing' },
  { status: 'review', id: 'SI-2041', text: 'AI check: 6 of 6 documents' },
  { status: 'received', id: 'SI-2045', text: 'Waiting for checks' },
  { status: 'verified', id: 'SI-2043', text: 'Ready for matching' },
  { status: 'review', id: 'SI-2049', text: 'Transcript grading scale found' },
  { status: 'missing', id: 'SI-2051', text: 'Second reference letter' },
  { status: 'verified', id: 'SI-2052', text: 'Names match across documents' },
];

function Inbox() {
  return (
    <div className="absolute top-[-10%] right-[-12%] w-[78%] [transform:perspective(1100px)_rotateY(-30deg)_rotateX(16deg)]">
      <div className="flex animate-rise flex-col gap-7">
        {[...INBOX_ROWS, ...INBOX_ROWS].map((r, i) => (
          <div
            key={i}
            className="flex items-center gap-5 rounded-2xl bg-white/80 px-6 py-5 shadow-card"
            style={{ filter: `blur(${(i % 3) * 0.6}px)`, opacity: 1 - (i % 4) * 0.12 }}
          >
            <StatusIcon status={r.status} className="size-6" />
            <span className="font-mono text-xl text-ink-3">{r.id}</span>
            <span className="text-3xl font-medium tracking-[-0.02em] whitespace-nowrap text-ink/80">{r.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Particles() {
  const rand = seeded(7);
  const colors = ['bg-accent', 'bg-accent', 'bg-success', 'bg-ink-3', 'bg-st-review'];
  const dots = Array.from({ length: 90 }, () => ({
    x: 30 + rand() * 72,
    y: rand() * 100,
    size: 2 + rand() * 4,
    blur: rand() > 0.6 ? 1.5 : 0,
    color: colors[Math.floor(rand() * colors.length)],
    delay: rand() * 4,
    duration: 3 + rand() * 4,
  }));
  return (
    <div className="absolute inset-0">
      <div className="absolute top-[-20%] right-[-10%] size-[640px] rounded-full bg-[radial-gradient(circle,rgb(91_91_214/0.12),transparent_65%)]" />
      {dots.map((d, i) => (
        <span
          key={i}
          className={`absolute animate-twinkle rounded-full ${d.color}`}
          style={
            {
              left: `${d.x}%`,
              top: `${d.y}%`,
              width: d.size,
              height: d.size,
              filter: d.blur ? `blur(${d.blur}px)` : undefined,
              animationDelay: `${d.delay}s`,
              animationDuration: `${d.duration}s`,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}

function Board() {
  const rand = seeded(11);
  const columns = Array.from({ length: 5 }, (_, c) =>
    Array.from({ length: 7 }, () => ({ width: 45 + rand() * 50, status: CARD_STATUSES[Math.floor(rand() * CARD_STATUSES.length)], c })),
  );
  return (
    <div className="absolute top-[-35%] left-[25%] h-[180%] w-[110%] [transform:perspective(1200px)_rotateX(58deg)_rotateZ(-24deg)]">
      <div className="grid animate-slide grid-cols-5 gap-6">
        {columns.map((col, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl bg-muted/70 p-4">
            {col.map((bar, j) => (
              <div key={j} className="flex items-center gap-3 rounded-lg bg-white p-3 shadow-card">
                <StatusIcon status={bar.status} />
                <span className="h-2 rounded-full bg-line-2" style={{ width: `${bar.width}%` }} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function Network() {
  const rand = seeded(23);
  const nodes = Array.from({ length: 26 }, () => ({ x: 560 + rand() * 640, y: 20 + rand() * 460, r: 3 + rand() * 4 }));
  const edges: [number, number][] = [];
  nodes.forEach((a, i) => {
    nodes.forEach((b, j) => {
      if (j > i && Math.hypot(a.x - b.x, a.y - b.y) < 190) edges.push([i, j]);
    });
  });
  return (
    <svg viewBox="0 0 1200 500" preserveAspectRatio="xMaxYMid slice" className="absolute inset-0 size-full">
      <g className="animate-float">
        {edges.map(([i, j]) => (
          <line
            key={`${i}-${j}`}
            x1={nodes[i].x}
            y1={nodes[i].y}
            x2={nodes[j].x}
            y2={nodes[j].y}
            strokeWidth="1"
            strokeDasharray="4 6"
            className="animate-dash stroke-line-2"
          />
        ))}
        {nodes.map((n, i) => (
          <g key={i}>
            {i % 6 === 0 && <circle cx={n.x} cy={n.y} r={n.r * 2.5} className="fill-accent/15" />}
            <circle cx={n.x} cy={n.y} r={n.r} className={i % 6 === 0 ? 'fill-accent' : i % 4 === 0 ? 'fill-success' : 'fill-ink-3/60'} />
          </g>
        ))}
      </g>
    </svg>
  );
}
