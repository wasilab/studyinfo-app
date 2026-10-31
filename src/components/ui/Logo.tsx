import { useId } from 'react';
import { Link } from 'react-router';
import { BRAND } from '../../config';

/*
 * The StudyInfo symbol on a 48×48 grid: half brain, half network.
 * Left: a solid brain hemisphere made of three lobes, with two folds cut out of it.
 * Right: the same three-lobe rhythm drawn as a network of nodes joined by links.
 * public/logo.svg and public/favicon.svg are copies of these shapes. Change all three together.
 */
const LOBES: [number, number, number][] = [
  [16.5, 14, 9],
  [12, 24, 8.5],
  [16.5, 34, 9],
];
const FOLDS = 'M7.9 16.6A8.5 8.5 0 0 1 19.4 19.75M7.9 31.4A8.5 8.5 0 0 0 19.4 28.25';
const LINKS = 'M27.6 7.2V40.8M27.6 13.5H35M27.6 24H41.5M27.6 34.5H35M35 13.5L41.5 24L35 34.5';
const NODES: [number, number, number][] = [
  [35, 13.5, 3.5],
  [41.5, 24, 3.5],
  [35, 34.5, 3.5],
  [27.6, 7.2, 2.5],
  [27.6, 40.8, 2.5],
];

/**
 * The symbol in a single paint: a colour, `currentColor` or a gradient `url(#…)`.
 * `id` must be unique on the page; it names the mask that cuts the folds.
 */
export function LogoGlyph({ id, paint = 'currentColor' }: { id: string; paint?: string }) {
  const folds = `${id}-folds`;
  return (
    <>
      <mask id={folds} maskUnits="userSpaceOnUse" x="0" y="0" width="48" height="48">
        <rect width="48" height="48" fill="#fff" />
        <path d={FOLDS} fill="none" stroke="#000" strokeWidth="2.6" strokeLinecap="round" />
      </mask>
      <g fill={paint} mask={`url(#${folds})`}>
        {LOBES.map(([cx, cy, r]) => (
          <circle key={cy} cx={cx} cy={cy} r={r} />
        ))}
        <rect x="16.5" y="5" width="7" height="38" />
      </g>
      <path d={LINKS} fill="none" stroke={paint} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <g fill={paint}>
        {NODES.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} />
        ))}
      </g>
    </>
  );
}

/** The StudyInfo symbol in its indigo gradient. */
export function LogoMark({ size = 24 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={`${id}-paint`} x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a7b5ff" />
          <stop offset="1" stopColor="#4c5fe4" />
        </linearGradient>
      </defs>
      <LogoGlyph id={id} paint={`url(#${id}-paint)`} />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2 text-[15px] font-semibold tracking-[-0.02em] text-ink" aria-label={`${BRAND} home`}>
      <LogoMark />
      {BRAND}
    </Link>
  );
}
