import { Link } from 'react-router';
import { ChapterMock } from '../components/mock/Mocks';
import { Workspace } from '../components/mock/Workspace';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { CtaSection } from '../components/ui/CtaSection';
import { Icon } from '../components/ui/Icon';
import { Label, PointRow, Section, SplitHeading } from '../components/ui/Section';
import { ACCEPT, AUDIENCES, CHAPTERS, HERO, INTRO, STANDARDS } from '../content/home';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

export function Home() {
  usePageMeta(null, HERO.lead);

  return (
    <>
      <section className="relative overflow-hidden pt-14 md:pt-24">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[720px] bg-[radial-gradient(55%_50%_at_50%_0%,rgb(14_15_17/0.05),transparent_70%)]" />
        <Container className="relative">
          <div className="flex flex-col gap-7">
            <Link
              to={HERO.pill.to}
              className="group inline-flex w-fit items-center gap-2 rounded-full py-1 pr-3 pl-1 text-[13px] text-ink-2 ring-1 ring-line transition-colors hover:text-ink hover:ring-line-2"
            >
              <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[11.5px] font-medium text-accent">AI</span>
              {HERO.pill.label}
              <Icon name="chevron" size={13} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
            <h1 className="max-w-5xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl md:text-[4.75rem]">
              {HERO.title}
            </h1>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 md:text-lg">{HERO.lead}</p>
              <div className="flex flex-wrap items-center gap-3">
                <Button to={contactLink('agency')}>Become a partner</Button>
                <Button to={contactLink('files')} variant="secondary">
                  Submit student files <Icon name="arrow" size={15} />
                </Button>
              </div>
            </div>
          </div>
          <div className="mt-14 md:mt-20">
            <Workspace />
          </div>
        </Container>
      </section>

      <section className="pt-14 pb-20 md:pt-16 md:pb-28">
        <Container className="flex flex-col gap-8">
          <p className="text-[15px] text-ink-2">
            <span className="font-medium text-ink">We accept</span> student files, agency partners and partner universities.
          </p>
          <div className="grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line md:grid-cols-3">
            {ACCEPT.map((a) => (
              <Link key={a.title} to={a.to} className="group flex flex-col gap-1.5 bg-white p-6 transition-colors hover:bg-subtle">
                <span className="flex items-center justify-between text-[15px] font-medium tracking-[-0.01em]">
                  {a.title}
                  <Icon name="arrowUpRight" size={15} className="text-ink-3 transition-colors group-hover:text-ink" />
                </span>
                <span className="text-sm text-ink-2">{a.text}</span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <Section>
        <p className="max-w-4xl text-[1.85rem] leading-[1.18] font-medium tracking-[-0.03em] sm:text-[2.5rem]">
          {INTRO.statement} <span className="text-ink-3">{INTRO.rest}</span>
        </p>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {INTRO.pillars.map((p) => (
            <div key={p.title} className="flex flex-col gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-subtle text-ink ring-1 ring-line">
                <Icon name={p.icon} size={17} />
              </span>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
            </div>
          ))}
        </div>
      </Section>

      {CHAPTERS.map((ch) => (
        <Section key={ch.num}>
          <SplitHeading
            label={
              <Label to={ch.to}>
                {ch.num} {ch.label}
              </Label>
            }
            title={ch.title}
            text={ch.text}
          />
          <div className="mt-12 rounded-2xl bg-subtle p-3 ring-1 ring-line sm:p-6 md:p-12">
            <div className="mx-auto max-w-[860px]">
              <ChapterMock name={ch.mock} />
            </div>
          </div>
          <div className="mt-4">
            <PointRow points={ch.points} />
          </div>
        </Section>
      ))}

      <Section>
        <SplitHeading
          label={<Label>Who it is for</Label>}
          title="Built for both sides of admissions"
          text="Agencies send complete files. Universities receive applications that are ready to assess."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {AUDIENCES.map((a) => (
            <article key={a.label} className="flex flex-col gap-6 rounded-2xl p-7 ring-1 ring-line md:p-9">
              <div className="flex items-center justify-between gap-3">
                <Label>{a.label}</Label>
                <span className="rounded-full bg-subtle px-2.5 py-0.5 text-[12px] text-ink-2 ring-1 ring-line">{a.note}</span>
              </div>
              <h3 className="text-[1.6rem] leading-tight font-medium tracking-[-0.025em]">{a.title}</h3>
              <ul className="flex flex-col gap-3 text-[15px] text-ink-2">
                {a.points.map((p) => (
                  <li key={p} className="flex gap-2.5">
                    <Icon name="check" size={16} className="mt-0.5 text-accent" />
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-auto pt-2">
                <Button to={contactLink(a.cta.type)} variant="secondary">
                  {a.cta.label} <Icon name="arrow" size={15} />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SplitHeading label={<Label>Our standards</Label>} title="Quality admissions teams can rely on" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {STANDARDS.map((s) => (
            <div key={s.title} className="flex flex-col gap-3 bg-white p-6">
              <span className="grid size-6 place-items-center rounded-full bg-accent-soft text-accent">
                <Icon name="check" size={13} />
              </span>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
