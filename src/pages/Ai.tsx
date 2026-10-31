import { FileCheckMock, MatchMock, ReviewMock } from '../components/mock/Mocks';
import { Button } from '../components/ui/Button';
import { CtaSection } from '../components/ui/CtaSection';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../components/ui/PageHero';
import { H2, Label, Section, SplitHeading } from '../components/ui/Section';
import { AI } from '../content/ai';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

const VISUALS = [<FileCheckMock key="check" />, <MatchMock key="match" />, null];

export function Ai() {
  usePageMeta('AI', AI.hero.lead);

  return (
    <>
      <PageHero
        {...AI.hero}
        actions={
          <>
            <Button to={contactLink('files')}>Submit student files</Button>
            <Button to="/now/how-ai-and-our-team-check-every-file" variant="secondary">
              How we check files <Icon name="arrow" size={15} />
            </Button>
          </>
        }
      >
        <div className="mt-14 rounded-2xl bg-subtle p-3 ring-1 ring-line sm:p-6 md:mt-16 md:p-12">
          <div className="mx-auto max-w-[860px]">
            <ReviewMock />
          </div>
        </div>
      </PageHero>

      {AI.capabilities.map((c, i) => {
        const visual = VISUALS[i];
        return (
          <Section key={c.num}>
            <div className={`grid items-center gap-12 lg:gap-16 ${visual ? 'lg:grid-cols-2' : ''}`}>
              <div className={`flex flex-col gap-5 ${visual && i % 2 === 1 ? 'lg:order-2' : ''}`}>
                <Label>{c.num}</Label>
                <H2>{c.title}</H2>
                <p className="max-w-lg text-[16px] leading-relaxed text-ink-2">{c.text}</p>
                <ul className={`mt-2 grid border-t border-line ${visual ? '' : 'sm:grid-cols-3 sm:gap-x-8'}`}>
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px]">
                      <Icon name="check" size={16} className="text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              {visual && <div className="rounded-2xl bg-subtle p-3 ring-1 ring-line sm:p-6">{visual}</div>}
            </div>
          </Section>
        );
      })}

      <Section>
        <SplitHeading label={<Label>Principles</Label>} title="How we use AI" text="AI makes our checks faster and more consistent. It does not make admissions decisions." />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line md:grid-cols-3">
          {AI.principles.map((p) => (
            <div key={p.title} className="flex flex-col gap-2 bg-white p-7">
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection title="Faster checks. People in charge." text="Send us student files and see how AI and our admissions team work together." />
    </>
  );
}
