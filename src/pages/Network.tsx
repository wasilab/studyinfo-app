import { Link } from 'react-router';
import { FlowDiagram, MiniHub } from '../components/mock/Minis';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Faq } from '../components/ui/Faq';
import { Icon, type IconName } from '../components/ui/Icon';
import { SpotlightPanel } from '../components/ui/Panels';
import { ProductHero } from '../components/ui/ProductHero';
import { H2, Label, SectionHeader } from '../components/ui/Section';
import { NETWORK } from '../content/network';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

const CATALOG_FACTS: { icon: IconName; title: string; text: string }[] = [
  { icon: 'globe', title: 'Visible to every agency', text: 'Recommend any active university in the catalog to your students.' },
  { icon: 'building', title: 'Owned by one agency', text: 'The owner agency edits the university, its programmes and its application fields.' },
  { icon: 'shield', title: 'Added on request', text: 'An agency requests a university, and our team approves it before it joins the catalog.' },
];

export function Network() {
  usePageMeta();
  const { hero, parties, journey, anonymity, catalog, faq } = NETWORK;

  return (
    <>
      <ProductHero label={hero.label} title={hero.title} lead={hero.lead} backdrop="network">
        <Button to={contactLink('join')}>Join the network</Button>
        <Button to="/send-files" variant="secondary">
          Send student files <Arrow />
        </Button>
      </ProductHero>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="Three parties, one case"
            text="Every file has a student agency, an applying agency and our team in the middle. Each one has its own part to play, and its own steps."
          />
          <div className="mt-12 grid gap-3 md:mt-16 md:grid-cols-3">
            {parties.map((p, i) => (
              <article
                key={p.role}
                className={`reveal flex flex-col gap-6 rounded-2xl p-7 ring-1 md:p-8 ${i === 1 ? 'bg-tint-lavender ring-accent/25' : 'bg-subtle ring-line'}`}
              >
                <span className={`grid size-11 place-items-center rounded-xl bg-surface shadow-lift ${i === 1 ? 'text-accent' : 'text-ink'}`}>
                  <Icon name={p.icon} size={20} />
                </span>
                <div className="flex flex-col gap-2.5">
                  <Label>{p.role}</Label>
                  <h3 className="text-[1.35rem] leading-tight font-medium tracking-[-0.02em]">{p.title}</h3>
                  <p className="text-[15px] leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="How a file travels"
            text="From the agency that holds the student to the agency that holds the university, in six steps."
            link={{ to: '/tracking', label: 'Case tracking' }}
          />
          <div className="mt-12 md:mt-16">
            <SpotlightPanel inner="max-w-[760px]">
              <FlowDiagram />
            </SpotlightPanel>
          </div>
          <ol className="mt-3 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {journey.map((s, i) => (
              <li key={s.title} className="bg-canvas">
                <div className="reveal flex h-full flex-col gap-2 p-6 md:p-7">
                  <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title={anonymity.title} text={anonymity.text} />
          <div className="mt-12 grid gap-3 md:mt-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
            <SpotlightPanel
              title="Role labels, never names"
              text="Many student agencies, many applying agencies, and StudyInfo in the middle."
              inner="grid max-w-[420px] place-items-center"
            >
              <MiniHub />
            </SpotlightPanel>
            <ul className="reveal flex flex-col justify-center rounded-2xl border border-line bg-subtle px-6 py-3 sm:px-9">
              {anonymity.points.map((pt) => (
                <li key={pt} className="flex items-start gap-3 border-b border-line py-4 text-[15px] leading-relaxed last:border-b-0">
                  <Icon name="check" size={16} className="mt-1 shrink-0 text-accent" />
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title={catalog.title} text={catalog.text} link={{ to: '/universities', label: 'Add your universities' }} />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-3">
            {CATALOG_FACTS.map((f) => (
              <div key={f.title} className="bg-canvas">
                <div className="reveal flex h-full flex-col gap-3 p-7">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={f.icon} size={17} />
                  </span>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="reveal flex flex-col gap-4">
              <H2>Questions agencies ask</H2>
              <p className="text-[15px] text-ink-2">
                Can’t find your answer?{' '}
                <Link to={contactLink('other')} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                  Contact us
                </Link>
                .
              </p>
            </div>
            <div className="reveal">
              <Faq items={faq} />
            </div>
          </div>
        </Container>
      </section>

      <ExploreRow />
      <StatementCards pick={[1, 3]} tone="sky" />
      <CtaSection title={['One network.', 'More students, more universities.']} />
    </>
  );
}
