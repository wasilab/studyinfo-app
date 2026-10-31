import type { ReactNode } from 'react';
import { Link } from 'react-router';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md';

const BASE =
  'group/btn inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full font-medium tracking-[-0.01em] transition-[background-color,box-shadow,color,scale] duration-200 active:scale-[0.97]';

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-ink text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.12)] hover:bg-ink/85',
  secondary: 'bg-white text-ink ring-1 ring-inset ring-line-2 hover:bg-subtle hover:ring-ink/20',
  ghost: 'text-ink-2 hover:text-ink',
};

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3.5 text-[13px]',
  md: 'h-10 px-5 text-sm',
};

interface ButtonProps {
  children: ReactNode;
  to?: string;
  href?: string;
  variant?: Variant;
  size?: Size;
  type?: 'button' | 'submit';
  className?: string;
  onClick?: () => void;
}

export function Button({ children, to, href, variant = 'primary', size = 'md', type = 'button', className = '', onClick }: ButtonProps) {
  const cls = `${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick}>
        {children}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} onClick={onClick}>
      {children}
    </button>
  );
}

/** Small arrow that nudges right when its button or link is hovered. */
export function Arrow({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover:translate-x-0.5">
      <path d="M3 8h9.5M8.5 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
