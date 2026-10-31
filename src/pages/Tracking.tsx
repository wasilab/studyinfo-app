import { MiniHub, MiniSignoff, MiniStatusStack, MiniTimeline } from '../components/mock/Minis';
import { BoardMock, SubmissionMock } from '../components/mock/Mocks';
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
  usePageMeta('Tracking', TRACKING.blocks[1].text);
  const [submission, status] = TRACKING.blocks;

  return (
    <>
      <ProductHero {...TRACKING.hero} backdrop="board" />
      <FeatureBlock block={submission} panel={<SubmissionMock />} inner="max-w-[640px]" visuals={[<MiniSignoff />, <MiniHub />]} />
      <FeatureBlock block={status} panel={<BoardMock />} visuals={[<MiniTimeline />, <MiniStatusStack current="submitted" />]} />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="Six statuses, one meaning" text="Every file carries exactly one status, and it means the same thing to the agency, the university and our team." />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {STATUSES.map((s) => (
              <div key={s.id} className="bg-white">
                <div className="reveal flex flex-col gap-2 p-6">
                  <span className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]">
                    <StatusIcon status={s.id} className="size-4" />
                    {s.label}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ExploreRow />
      <StatementCards pick={[2, 0]} tone="lavender" />
      <CtaSection />
    </>
  );
}
