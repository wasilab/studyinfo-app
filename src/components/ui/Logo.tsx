import { useId, type ReactNode } from 'react';
import { Link } from 'react-router';
import { BRAND } from '../../config';

/*
 * The StudyInfo mark on a 48×48 grid: an S tilted 45° so it rises to the upper right, with a dot on the
 * vertical centre line above it and below it. The dots are the two agencies and the S is the route
 * through StudyInfo between them.
 * Its line (5.9 wide) is 0.132 of its height: the same ratio as the strokes of "StudyInfo" in Inter
 * Semibold, so beside the word it reads as one more letter. Every curve is a quarter arc, so the
 * rounded coordinates stay exact. The ink spans x 9.25–38.75 and y 2–46, and a half turn about
 * (24, 24) maps the mark onto itself.
 * public/logo.svg and public/favicon.svg are copies of this shape. Change all three together.
 */
const MARK =
  'M15.11 10.75L11.97 13.9A9.3 9.3 0 0 0 11.97 27.05A9.3 9.3 0 0 0 25.12 27.05L27.05 25.12A3.4 3.4 0 0 1 31.86 25.12A3.4 3.4 0 0 1 31.86 29.93L28.72 33.08A2.95 2.95 0 0 0 28.72 37.25A2.95 2.95 0 0 0 32.89 37.25L36.03 34.1A9.3 9.3 0 0 0 36.03 20.95A9.3 9.3 0 0 0 22.88 20.95L20.95 22.88A3.4 3.4 0 0 1 16.14 22.88A3.4 3.4 0 0 1 16.14 18.07L19.28 14.92A2.95 2.95 0 0 0 19.28 10.75A2.95 2.95 0 0 0 15.11 10.75Z' +
  'M24 2A4.04 4.04 0 0 1 28.04 6.04A4.04 4.04 0 0 1 24 10.07A4.04 4.04 0 0 1 19.96 6.04A4.04 4.04 0 0 1 24 2Z' +
  'M24 37.93A4.04 4.04 0 0 1 28.04 41.96A4.04 4.04 0 0 1 24 46A4.04 4.04 0 0 1 19.96 41.96A4.04 4.04 0 0 1 24 37.93Z';

/** The mark's ink box. A lockup uses it so the mark is exactly as tall as the word beside it. */
const INK_BOX = '9.25 2 29.5 44';

/** The mark in a single paint: a colour, `currentColor` or a gradient `url(#…)`. */
export function LogoGlyph({ paint = 'currentColor' }: { paint?: string }) {
  return <path d={MARK} fill={paint} />;
}

/** The brand gradient, centred on the accent #4361ee: lighter at the top dot, deeper at the bottom one. */
function BrandPaint({ id }: { id: string }) {
  return (
    <linearGradient id={id} x1="10" y1="2" x2="38" y2="46" gradientUnits="userSpaceOnUse">
      <stop offset="0" stopColor="#6f8dff" />
      <stop offset="0.5" stopColor="#4361ee" />
      <stop offset="1" stopColor="#2638b8" />
    </linearGradient>
  );
}

/** The mark on its own, centred in a `size` × `size` square. */
export function LogoMark({ size = 24 }: { size?: number }) {
  const id = useId();
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" className="shrink-0">
      <defs>
        <BrandPaint id={`${id}-paint`} />
      </defs>
      <LogoGlyph paint={`url(#${id}-paint)`} />
    </svg>
  );
}

/**
 * The mark followed by a label (the brand name unless you pass one), at the current font size.
 * The mark is exactly as tall as "StudyInfo" in Inter: 0.95em, from the top of the S (0.74em above the
 * baseline) to the foot of the y (0.21em below it). It sits on the text baseline, then drops 0.21em.
 */
export function LogoLockup({ children = BRAND, className = '' }: { children?: ReactNode; className?: string }) {
  const id = useId();
  return (
    <span className={`inline-flex items-baseline gap-[0.35em] whitespace-nowrap ${className}`}>
      <svg viewBox={INK_BOX} fill="none" aria-hidden="true" className="relative top-[0.21em] h-[0.95em] w-[0.637em] shrink-0">
        <defs>
          <BrandPaint id={`${id}-paint`} />
        </defs>
        <LogoGlyph paint={`url(#${id}-paint)`} />
      </svg>
      <span>{children}</span>
    </span>
  );
}

export function Logo() {
  return (
    <Link to="/" className="text-[15px] font-semibold tracking-[-0.02em] text-ink" aria-label={`${BRAND} home`}>
      <LogoLockup />
    </Link>
  );
}
