import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Container } from './Container';
import { Icon } from './Icon';

/** A page band with a hairline top border, Linear-style. */
export function Section({ children, className = '', border = true, id }: { children: ReactNode; className?: string; border?: boolean; id?: string }) {
  return (
    <section id={id} className={`${border ? 'border-t border-line' : ''} py-20 md:py-28 ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Small mono label such as "1.0 Intake", optionally linking somewhere. */
export function Label({ children, to, className = '' }: { children: ReactNode; to?: string; className?: string }) {
  const cls = `inline-flex items-center gap-1.5 font-mono text-[12px] text-ink-3 ${className}`;
  if (to) {
    return (
      <Link to={to} className={`${cls} group hover:text-ink`}>
        {children}
        <Icon name="chevron" size={12} className="transition-transform group-hover:translate-x-0.5" />
      </Link>
    );
  }
  return <p className={cls}>{children}</p>;
}

export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-[2rem] leading-[1.08] font-medium tracking-[-0.03em] sm:text-[2.5rem] md:text-[2.75rem] ${className}`}>{children}</h2>;
}

/** Two-column section header: heading on the left, supporting text on the right. */
export function SplitHeading({ title, text, label }: { title: ReactNode; text?: ReactNode; label?: ReactNode }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 md:items-end md:gap-12">
      <div className="flex flex-col gap-4">
        {label}
        <H2>{title}</H2>
      </div>
      {text && <p className="max-w-md text-[16px] leading-relaxed text-ink-2 md:justify-self-end">{text}</p>}
    </div>
  );
}

/** Three short numbered points in columns separated by hairlines. */
export function PointRow({ points }: { points: { num?: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p) => (
        <div key={p.title} className="flex flex-col gap-2 bg-white p-6">
          {p.num && <span className="font-mono text-[12px] text-ink-3">{p.num}</span>}
          <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
          <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
        </div>
      ))}
    </div>
  );
}
