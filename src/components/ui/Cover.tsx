/** Generated cover art for articles, one motif per variant. */
export function Cover({ variant, className = '' }: { variant: number; className?: string }) {
  return (
    <div className={`overflow-hidden bg-subtle ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 250" preserveAspectRatio="xMidYMid slice" className="block size-full">
        <Motif variant={variant % 5} />
      </svg>
    </div>
  );
}

function Motif({ variant }: { variant: number }) {
  switch (variant) {
    case 0:
      // A stack of files, the top one verified.
      return (
        <g>
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={120 + i * 14} y={52 + i * 12} width="136" height="150" rx="10" className="fill-white stroke-line-2" />
          ))}
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="180" y={108 + i * 18} width={i === 3 ? 44 : 64} height="6" rx="3" className="fill-line-2" />
          ))}
          <circle cx="300" cy="180" r="18" className="fill-accent" />
          <path d="M291 180l6 6 12-12" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 1:
      // A field of points, one picked out.
      return (
        <g>
          {Array.from({ length: 12 * 8 }, (_, n) => {
            const x = 40 + (n % 12) * 29;
            const y = 24 + Math.floor(n / 12) * 29;
            return <circle key={n} cx={x} cy={y} r="2.2" className="fill-line-2" />;
          })}
          <path d="M243 81c1.6 15.6 8.4 22.4 24 24-15.6 1.6-22.4 8.4-24 24-1.6-15.6-8.4-22.4-24-24 15.6-1.6 22.4-8.4 24-24z" className="fill-accent" />
        </g>
      );
    case 2:
      // Twelve months, two intakes.
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <rect key={i} x={38 + i * 28} y="70" width="22" height="110" rx="5" className={i === 8 || i === 0 ? 'fill-ink' : 'fill-white stroke-line-2'} />
          ))}
          <rect x="38" y="196" width="324" height="4" rx="2" className="fill-line-2" />
          <rect x="262" y="196" width="22" height="4" rx="2" className="fill-accent" />
        </g>
      );
    case 3:
      // Four section scores against a minimum.
      return (
        <g>
          {[120, 150, 92, 136].map((h, i) => (
            <rect key={i} x={110 + i * 52} y={205 - h} width="34" height={h} rx="5" className={i === 2 ? 'fill-st-review' : 'fill-white stroke-line-2'} />
          ))}
          <line x1="90" y1="95" x2="320" y2="95" strokeWidth="2" strokeDasharray="6 6" className="stroke-ink" />
        </g>
      );
    default:
      // Lines of a statement, one highlighted.
      return (
        <g>
          <rect x="110" y="34" width="180" height="200" rx="10" className="fill-white stroke-line-2" />
          {[64, 84, 104, 124, 144, 164, 184].map((y, i) => (
            <rect key={y} x="134" y={y} width={[132, 120, 132, 96, 132, 116, 70][i]} height="7" rx="3.5" className={i === 3 ? 'fill-accent' : 'fill-line-2'} />
          ))}
        </g>
      );
  }
}
