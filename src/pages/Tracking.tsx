import { MiniAttachment, MiniOffer, MiniSent, MiniTimeline } from '../components/mock/Minis';
import { CaseStepsMock, CommissionMock, ThreadMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { SectionHeader } from '../components/ui/Section';
import { StatusIcon } from '../components/ui/StatusIcon';
import { STATUSES } from '../content/files';
import { TRACKING } from '../content/tracking';
import { usePageMeta } from '../lib/usePageMeta';

export function Tracking() {
  usePageMeta();
  const [steps, thread, commission] = TRACKING.blocks;

  return (
    <>
      <ProductHero {...TRACKING.hero} backdrop="board" />
      <FeatureBlock block={steps} panel={<CaseStepsMock />} visuals={[<MiniOffer />, <MiniTimeline />]} />
      <FeatureBlock block={thread} panel={<ThreadMock />} inner="max-w-[600px]" visuals={[<MiniSent />, <MiniAttachment />]} />
      <FeatureBlock block={commission} panel={<CommissionMock />} inner="max-w-[560px]" />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="Six moments in every case" text="Every case moves through the same moments, and each one has an owner. Students only ever see their own journey." />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {STATUSES.map((s) => (
              <div key={s.id} className="bg-canvas">
                <div className="reveal flex h-full flex-col gap-2 p-6">
                  <span className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]">
                    <StatusIcon status={s.id} className="size-4" />
                    {s.label}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
                  <p className="mt-auto pt-2 font-mono text-[11.5px] text-ink-3">{s.owner}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ExploreRow />
      <StatementCards pick={[2, 0]} tone="lavender" />
      <CtaSection title={['One case.', 'Three parties, always in step.']} />
    </>
  );
}
