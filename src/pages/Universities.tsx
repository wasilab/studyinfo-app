import { MiniCatalog, MiniFields, MiniOffer, MiniOwner, MiniSteps, MiniVisible } from '../components/mock/Minis';
import { ReceivedMock, UniversityCommissionsMock, UniversityRequestMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { UNIVERSITIES } from '../content/universities';
import { usePageMeta } from '../lib/usePageMeta';

export function Universities() {
  usePageMeta();
  const [request, received, commission] = UNIVERSITIES.blocks;

  return (
    <>
      <ProductHero {...UNIVERSITIES.hero} backdrop="cards" />
      <FeatureBlock block={request} panel={<UniversityRequestMock />} inner="max-w-[640px]" visuals={[<MiniCatalog />, <MiniOwner />, <MiniFields />, <MiniVisible />]} />
      <FeatureBlock block={received} panel={<ReceivedMock />} visuals={[<MiniOffer />, <MiniSteps />]} />
      <FeatureBlock block={commission} panel={<UniversityCommissionsMock />} inner="max-w-[620px]" />
      <ExploreRow />
      <StatementCards pick={[1, 2]} tone="sky" />
      <CtaSection title={['More students for', 'every university you hold.']} />
    </>
  );
}
