/** Generated line-art covers for articles, one motif per variant. */
export function Cover({ variant, className = '' }: { variant: number; className?: string }) {
  return (
    <div className={`overflow-hidden bg-[#f6f6f8] ${className}`} aria-hidden="true">
      <svg viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="block size-full" fill="none" strokeWidth="1">
        <Motif variant={variant % 5} />
      </svg>
    </div>
  );
}

function Motif({ variant }: { variant: number }) {
  switch (variant) {
    case 0:
      // Stacked documents, the top one checked.
      return (
        <g>
          {Array.from({ length: 9 }, (_, i) => (
            <rect key={i} x={118 + i * 8} y={40 + i * 6} width="140" height="110" rx="8" className="stroke-ink/25" />
          ))}
          <rect x="182" y="88" width="140" height="110" rx="8" className="fill-white stroke-ink/60" />
          {[0, 1, 2, 3].map((i) => (
            <line key={i} x1="200" y1={112 + i * 16} x2={i === 3 ? 260 : 300} y2={112 + i * 16} strokeLinecap="round" className="stroke-ink/30" />
          ))}
          <circle cx="306" cy="186" r="13" className="fill-accent" />
          <path d="M300 186l4.5 4.5 8-8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      );
    case 1:
      // Concentric rings: AI reading outward from a point.
      return (
        <g>
          {Array.from({ length: 12 }, (_, i) => (
            <circle key={i} cx="200" cy="112" r={10 + i * 14} className={i === 5 ? 'stroke-accent' : 'stroke-ink/20'} />
          ))}
          <circle cx="200" cy="112" r="4" className="fill-ink" />
        </g>
      );
    case 2:
      // A wave of months with two intakes marked.
      return (
        <g>
          {Array.from({ length: 48 }, (_, i) => {
            const x = 20 + i * 7.6;
            const h = 30 + Math.sin(i / 3.2) * 22 + (i % 12 === 8 || i % 12 === 0 ? 40 : 0);
            return <line key={i} x1={x} y1={112 - h / 2} x2={x} y2={112 + h / 2} strokeLinecap="round" className={i % 12 === 8 || i % 12 === 0 ? 'stroke-accent' : 'stroke-ink/25'} />;
          })}
        </g>
      );
    case 3:
      // Section scores against a dashed minimum.
      return (
        <g>
          {[0, 1, 2, 3].map((i) => {
            const heights = [118, 82, 106, 106];
            const x = 116 + i * 46;
            return Array.from({ length: Math.round(heights[i] / 6) }, (_, j) => (
              <line key={`${i}-${j}`} x1={x} y1={190 - j * 6} x2={x + 28} y2={190 - j * 6} className={i === 1 ? 'stroke-st-review' : 'stroke-ink/30'} />
            ));
          })}
          <line x1="96" y1="96" x2="304" y2="96" strokeDasharray="5 5" className="stroke-ink/70" />
        </g>
      );
    default:
      // Lines of a statement converging on one highlighted line.
      return (
        <g>
          {Array.from({ length: 14 }, (_, i) => (
            <path key={i} d={`M20 ${20 + i * 14} C 160 ${20 + i * 14}, 220 112, 380 112`} className={i === 6 ? 'stroke-accent' : 'stroke-ink/20'} />
          ))}
          <circle cx="380" cy="112" r="3" className="fill-ink" />
        </g>
      );
  }
}
