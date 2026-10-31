import { useId } from 'react';
import { Link } from 'react-router';
import { BRAND } from '../../config';

/*
 * The StudyInfo symbol on a 32×32 grid: a brain seen from above whose left half is drawn as a
 * brain (lobes and two folds) and whose right half is a network of connected dots.
 * The same shapes are copied into public/logo.svg and public/favicon.svg. Change all three together.
 */
const BRAIN =
  'M15.6 5.2C13.6 3.6 9.6 3.6 7.6 6.2C5 6.6 3.8 9.4 4.6 11.8C3 13.6 3 17.6 4.8 19.4C4.2 22.2 5.8 25 8.6 25.6C10.4 28 13.6 28.4 15.6 26.8' +
  'M15.6 11.4C13 11.4 11.2 10.2 10.8 8.2M15.6 20.2C12.8 20.2 10.8 21.4 10.4 23.6';
const MIDLINE = 'M16 5.2V26.8';
const NETWORK = 'M16.4 5.2L23.2 5.6L27.4 11.4L27.4 19.6L23.4 26L16.4 26.8M16.4 11.4H21.8M16.4 20.2H21.8';
const NODES: [number, number][] = [
  [23.2, 5.6],
  [27.4, 11.4],
  [27.4, 19.6],
  [23.4, 26],
  [21.8, 11.4],
  [21.8, 20.2],
];

/** The symbol's lines and dots in a single paint: a CSS colour, `currentColor` or a gradient `url(#id)`. */
export function LogoGlyph({ color = 'currentColor', strokeWidth = 2.2, dot = 2.45 }: { color?: string; strokeWidth?: number; dot?: number }) {
  return (
    <>
      <path d={BRAIN + MIDLINE + NETWORK} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
      {NODES.map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={dot} fill={color} />
      ))}
    </>
  );
}

/** The StudyInfo symbol in its indigo gradient. */
export function LogoMark({ size = 26 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true" className="shrink-0">
      <defs>
        <linearGradient id={id} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#9cadff" />
          <stop offset="1" stopColor="#5266ea" />
        </linearGradient>
      </defs>
      <LogoGlyph color={`url(#${id})`} />
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
