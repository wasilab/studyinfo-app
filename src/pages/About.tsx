import { CompanyBadge, PartnershipVisual } from '../components/mock/About';
import { CtaSection, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { SpotlightPanel } from '../components/ui/Panels';
import { ProductHero } from '../components/ui/ProductHero';
import { Label, SectionHeader } from '../components/ui/Section';
import { ABOUT } from '../content/about';
import { usePageMeta } from '../lib/usePageMeta';

export function About() {
  usePageMeta();
  const { hero, problem, mission, vision, partnership } = ABOUT;

  return (
    <>
      <ProductHero label={hero.label} title={hero.title} lead={hero.lead} backdrop="network" />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title={problem.title} text={problem.text} />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:mt-16 md:grid-cols-3">
            {problem.points.map((p) => (
              <div key={p.title} className="bg-canvas">
                <div className="reveal flex h-full flex-col gap-3 p-7">
                  <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={p.icon} size={17} />
                  </span>
                  <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="reveal mt-14 max-w-4xl text-[1.6rem] leading-[1.22] font-medium tracking-[-0.025em] sm:text-[2rem]">
            {problem.answer.statement} <span className="text-ink-3">{problem.answer.rest}</span>
          </p>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: 'Our mission', text: mission, tone: 'bg-tint-lavender ring-accent/15' },
              { label: 'Our vision', text: vision, tone: 'bg-subtle ring-line' },
            ].map((c) => (
              <article key={c.label} className={`reveal flex min-h-[260px] flex-col justify-between gap-10 rounded-2xl p-7 ring-1 md:p-10 ${c.tone}`}>
                <h2 className="font-mono text-[12px] text-ink-3">{c.label}</h2>
                <p className="text-[1.6rem] leading-[1.22] font-medium tracking-[-0.025em] md:text-[1.9rem]">{c.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader label={<Label>{partnership.label}</Label>} title={partnership.title} text={partnership.text} />
          <div className="mt-12 md:mt-16">
            <SpotlightPanel title="Exclusive license" text="Tablab Research licenses StudyInfo exclusively to Global Desire Education." inner="max-w-[900px]">
              <PartnershipVisual />
            </SpotlightPanel>
          </div>

          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {partnership.companies.map((c, i) => (
              <article key={c.name} className="reveal flex flex-col gap-6 rounded-2xl bg-subtle p-7 ring-1 ring-line md:p-9">
                <div className="flex items-center gap-3.5">
                  <CompanyBadge company={c} index={i} />
                  <div>
                    <h3 className="text-[1.25rem] leading-tight font-medium tracking-[-0.02em]">{c.name}</h3>
                    <p className="text-[13.5px] text-ink-3">{c.role}</p>
                  </div>
                </div>
                <ul className="flex flex-col gap-3 border-t border-line pt-5 text-[15px] text-ink-2">
                  {c.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <ol className="mt-3 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:grid-cols-3">
            {partnership.steps.map((s, i) => (
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

      <StatementCards pick={[0, 1]} tone="lavender" />
      <CtaSection />
    </>
  );
}
