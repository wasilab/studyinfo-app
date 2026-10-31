import { MiniApprove, MiniBoost, MiniCompare, MiniCsv, MiniInterview, MiniLead, MiniPdfFile, MiniPrompt, MiniScores, MiniVisaReview } from '../components/mock/Minis';
import { ChatbotMock, CrmMock, MatchMock, PortalMock, PostMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { TOOLKIT } from '../content/toolkit';
import { usePageMeta } from '../lib/usePageMeta';

export function Toolkit() {
  usePageMeta();
  const [crm, recommendations, students, marketing, brand] = TOOLKIT.blocks;

  return (
    <>
      <ProductHero {...TOOLKIT.hero} backdrop="particles" />
      <FeatureBlock block={crm} panel={<CrmMock />} visuals={[<MiniPdfFile />, <MiniCsv />]} />
      <FeatureBlock block={recommendations} panel={<MatchMock />} inner="max-w-[640px]" visuals={[<MiniScores />, <MiniCompare />]} />
      <FeatureBlock block={students} panel={<ChatbotMock />} inner="max-w-[520px]" visuals={[<MiniInterview />, <MiniPrompt />, <MiniVisaReview />, <MiniLead />]} />
      <FeatureBlock block={marketing} panel={<PostMock />} inner="max-w-[600px]" visuals={[<MiniBoost />, <MiniApprove />]} />
      <FeatureBlock block={brand} panel={<PortalMock />} />
      <ExploreRow />
      <StatementCards pick={[3, 1]} tone="sky" />
      <CtaSection title={['Find students. Convert them.', 'Manage them in one place.']} />
    </>
  );
}
