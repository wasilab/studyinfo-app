import { MiniHub } from '../components/mock/Minis';
import { BoardMock } from '../components/mock/Mocks';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { SpotlightPanel } from '../components/ui/Panels';
import { ProductHero } from '../components/ui/ProductHero';
import { Label, Section, SectionHeader } from '../components/ui/Section';
import { PARTNERS } from '../content/partners';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

export function Partners() {
  usePageMeta('Partners', PARTNERS.hero.lead);
  const { logos, stories, hub } = PARTNERS;

  return (
    <>
      <ProductHero label={PARTNERS.hero.label} title={PARTNERS.hero.title} lead={PARTNERS.hero.lead} backdrop="network">
        <Button to={contactLink('agency')}>Become an agency partner</Button>
        <Button to={contactLink('university')} variant="secondary">
          Become a partner university <Arrow />
        </Button>
      </ProductHero>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-3 md:grid-cols-2">
            {PARTNERS.types.map((t, i) => (
              <article
                key={t.title}
                className={`reveal flex flex-col gap-7 rounded-2xl p-7 ring-1 md:p-10 ${i === 0 ? 'bg-tint-lavender ring-accent/10' : 'bg-subtle ring-line'}`}
              >
                <div className="flex flex-col gap-3">
                  <Label>{t.label}</Label>
                  <h2 className="text-[2rem] leading-tight font-medium tracking-[-0.03em]">{t.title}</h2>
                  <p className="text-[16px] leading-relaxed text-ink-2">{t.text}</p>
                </div>
                <ul className="border-t border-ink/10">
                  {t.gets.map((g) => (
                    <li key={g} className="flex items-center gap-3 border-b border-ink/10 py-3.5 text-[15px]">
                      <Icon name="check" size={16} className="text-accent" />
                      {g}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto">
                  <Button to={contactLink(t.cta.type)} variant={i === 0 ? 'primary' : 'secondary'}>
                    {t.cta.label} <Arrow />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {logos.length > 0 && (
        <Section>
          <Label>Our partners</Label>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-3 lg:grid-cols-5">
            {logos.map((l) => (
              <div key={l.name} className="grid h-24 place-items-center bg-white p-6">
                <img src={l.src} alt={l.name} className="max-h-8 w-auto opacity-80 grayscale" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title={hub.title} text={hub.text} link={{ to: '/tracking', label: 'Tracking' }} />
          <div className="mt-12 md:mt-16">
            <SpotlightPanel title={hub.panel.title} text={hub.panel.text} inner="max-w-[420px] grid place-items-center">
              <MiniHub />
            </SpotlightPanel>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="From partnership to decision in four steps" text="Partnership terms are agreed once. After that, every student file follows the same path." />
          <ol className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.steps.map((s, i) => (
              <li key={s.title} className="bg-white">
                <div className="reveal flex flex-col gap-2 p-6">
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
          <SectionHeader
            title="Everyone sees the same application"
            text="Agency partners, partner universities and our team follow every file on one status, from receipt to decision."
          />
          <div className="mt-12 md:mt-16">
            <SpotlightPanel>
              <BoardMock />
            </SpotlightPanel>
          </div>
        </Container>
      </section>

      {stories.length > 0 && (
        <Section>
          <SectionHeader title="In our partners’ words" text="What agencies and universities say about working with StudyInfo." />
          <div className="mt-12 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.partner + s.person} className="reveal flex flex-col gap-6 rounded-2xl bg-subtle p-7 ring-1 ring-line">
                <span className="w-fit rounded-full bg-white px-2.5 py-0.5 text-[12px] text-ink-2 ring-1 ring-line">{s.kind}</span>
                <blockquote className="text-[17px] leading-relaxed tracking-[-0.01em]">“{s.quote}”</blockquote>
                <figcaption className="mt-auto text-sm">
                  <span className="font-medium">{s.person}</span>
                  <span className="text-ink-3">
                    {' '}
                    · {s.role}, {s.partner}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <ExploreRow />
      <StatementCards pick={[2, 4]} tone="sky" />
      <CtaSection title={['Join the StudyInfo network.', 'Agencies join free.']} />
    </>
  );
}
