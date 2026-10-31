import type { ReactNode } from 'react';
import { Container } from './Container';
import { HeroBackdrop, type Backdrop } from './HeroBackdrop';

/** Tall product-page hero: animated backdrop, with a label and headline in the bottom-left. */
export function ProductHero({ label, title, lead, backdrop, children }: { label: string; title: string; lead?: string; backdrop: Backdrop; children?: ReactNode }) {
  return (
    <section className="relative isolate overflow-clip border-b border-line">
      <HeroBackdrop variant={backdrop} />
      <Container className="flex min-h-[400px] flex-col justify-end pt-32 pb-14 md:min-h-[500px] md:pb-20">
        <p className="animate-enter text-[13px] font-medium text-ink-2">{label}</p>
        <h1 className="mt-4 max-w-3xl animate-enter text-[2.6rem] leading-[1.04] font-medium tracking-[-0.034em] [animation-delay:90ms] sm:text-[3.4rem] md:text-[4rem]">
          {title}
        </h1>
        {lead && <p className="mt-6 max-w-xl animate-enter text-[17px] leading-relaxed text-ink-2 [animation-delay:180ms]">{lead}</p>}
        {children && <div className="mt-8 flex animate-enter flex-wrap items-center gap-3 [animation-delay:260ms]">{children}</div>}
      </Container>
    </section>
  );
}
