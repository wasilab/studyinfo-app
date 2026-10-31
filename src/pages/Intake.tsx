import { ChecklistPanel, IntakeComposite, MiniChecklist, MiniExpiry, MiniPackage, MiniRequest, MiniStatusStack, MiniTimeline } from '../components/mock/Minis';
import { MissingMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { INTAKE } from '../content/intake';
import { usePageMeta } from '../lib/usePageMeta';

export function Intake() {
  usePageMeta('Intake', INTAKE.blocks[0].text);
  const [files, checklist, missing] = INTAKE.blocks;

  return (
    <>
      <ProductHero {...INTAKE.hero} backdrop="inbox" />
      <FeatureBlock block={files} panel={<IntakeComposite />} visuals={[<MiniChecklist />, <MiniRequest />, <MiniPackage />, <MiniStatusStack />]} />
      <FeatureBlock block={checklist} panel={<ChecklistPanel />} />
      <FeatureBlock block={missing} panel={<MissingMock />} inner="max-w-[560px]" visuals={[<MiniExpiry />, <MiniTimeline current={1} />]} />
      <ExploreRow />
      <StatementCards pick={[0, 4]} tone="lavender" />
      <CtaSection title={['Send your first student file.', 'Agency partners join free.']} />
    </>
  );
}
