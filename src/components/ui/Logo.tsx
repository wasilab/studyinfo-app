import { Link } from 'react-router';
import { BRAND } from '../../config';

export function LogoMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" className="shrink-0">
      <rect width="24" height="24" rx="6" className="fill-ink" />
      <path d="M7.5 8h9M7.5 12h9M7.5 16h5.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
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
