import type { ReactNode } from 'react';
import { Container } from './Container';
import { Label } from './Section';

export function PageHero({ label, title, lead, actions, children }: { label: string; title: string; lead: string; actions?: ReactNode; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden pt-16 pb-16 md:pt-24 md:pb-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[480px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(14_15_17/0.045),transparent_70%)]" />
      <Container className="relative">
        <div className="flex max-w-3xl flex-col gap-6">
          <Label>{label}</Label>
          <h1 className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem] md:text-[4rem] md:leading-[1.02]">{title}</h1>
          <p className="max-w-2xl text-[17px] leading-relaxed text-ink-2 md:text-lg">{lead}</p>
          {actions && <div className="flex flex-wrap items-center gap-3 pt-2">{actions}</div>}
        </div>
        {children}
      </Container>
    </section>
  );
}
