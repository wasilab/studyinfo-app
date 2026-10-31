import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { Arrow } from './Button';
import { Container } from './Container';

/** A page band, optionally with a hairline top border. */
export function Section({ children, className = '', border = false, id }: { children: ReactNode; className?: string; border?: boolean; id?: string }) {
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
        <Arrow size={12} />
      </Link>
    );
  }
  return <p className={cls}>{children}</p>;
}

export function H2({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <h2 className={`text-[2rem] leading-[1.1] font-medium tracking-[-0.028em] sm:text-[2.4rem] md:text-[2.6rem] ${className}`}>{children}</h2>;
}

/** Linear-style section header: heading on the left; text and a link on the right. */
export function SectionHeader({ title, text, link, label }: { title: ReactNode; text: ReactNode; link?: { to: string; label: string }; label?: ReactNode }) {
  return (
    <div className="reveal grid gap-6 md:grid-cols-2 md:gap-12">
      <div className="flex flex-col gap-4">
        {label}
        <H2>{title}</H2>
      </div>
      <div className="flex flex-col items-start gap-5 md:pt-1">
        <p className="max-w-md text-[17px] leading-relaxed text-ink-2">{text}</p>
        {link && (
          <Link to={link.to} className="group inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors hover:text-ink">
            {link.label} <Arrow size={12} />
          </Link>
        )}
      </div>
    </div>
  );
}

/** Short numbered points in columns separated by hairlines. */
export function PointRow({ points }: { points: { num?: string; title: string; text: string }[] }) {
  return (
    <div className="grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p) => (
        <div key={p.title} className="bg-white">
          <div className="reveal flex flex-col gap-2 p-6">
            {p.num && <span className="font-mono text-[12px] text-ink-3">{p.num}</span>}
            <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
            <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
