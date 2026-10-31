import { FlowDiagram, MiniExpiry, MiniNameMatch, MiniPrompt, MiniRequest, MiniScores, MiniSignoff, ReviewComposite } from '../components/mock/Minis';
import { MatchMock } from '../components/mock/Mocks';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { FeatureBlock } from '../components/ui/FeatureBlock';
import { ProductHero } from '../components/ui/ProductHero';
import { SectionHeader } from '../components/ui/Section';
import { AI } from '../content/ai';
import { usePageMeta } from '../lib/usePageMeta';

export function Ai() {
  usePageMeta('AI', AI.blocks[0].text);
  const [checks, matching, people] = AI.blocks;

  return (
    <>
      <ProductHero {...AI.hero} backdrop="particles" />
      <FeatureBlock block={checks} panel={<ReviewComposite />} visuals={[<MiniNameMatch />, <MiniExpiry />, <MiniScores />, <MiniRequest />]} />
      <FeatureBlock block={matching} panel={<MatchMock />} visuals={[<MiniPrompt />, <MiniSignoff />]} />
      <FeatureBlock block={people} panel={<FlowDiagram />} inner="max-w-[760px]" />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="How we use AI" text="AI makes our checks faster and more consistent. It does not make admissions decisions." />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:grid-cols-3">
            {AI.principles.map((p, i) => (
              <div key={p.title} className="bg-white">
                <div className="reveal flex flex-col gap-2 p-7">
                  <span className="font-mono text-[12px] text-ink-3">0{i + 1}</span>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <ExploreRow />
      <StatementCards pick={[1, 3]} tone="sky" />
      <CtaSection title={['Faster checks.', 'People in charge.']} />
    </>
  );
}
