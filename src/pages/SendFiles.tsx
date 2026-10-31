import { ChecklistPanel, MiniAnonymous, MiniChecklist, MiniRequest, MiniSent, MiniStudentView, MiniWithdraw, SendComposite } from '../components/mock/Minis';
import { DocCheckMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { SEND_FILES } from '../content/send-files';
import { usePageMeta } from '../lib/usePageMeta';

export function SendFiles() {
  usePageMeta();
  const [submit, check, checklist] = SEND_FILES.blocks;

  return (
    <>
      <ProductHero {...SEND_FILES.hero} backdrop="inbox" />
      <FeatureBlock block={submit} panel={<SendComposite />} visuals={[<MiniChecklist />, <MiniAnonymous />, <MiniSent />, <MiniWithdraw />]} />
      <FeatureBlock block={check} panel={<DocCheckMock />} inner="max-w-[560px]" visuals={[<MiniStudentView />, <MiniRequest />]} />
      <FeatureBlock block={checklist} panel={<ChecklistPanel />} />
      <ExploreRow />
      <StatementCards pick={[0, 4]} tone="lavender" />
      <CtaSection title={['Every student has a place.', 'Send the first file.']} />
    </>
  );
}
