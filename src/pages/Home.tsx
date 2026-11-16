import { Link } from 'react-router';
import { Workspace } from '../components/mock/Workspace';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { Label, Section, SectionHeader } from '../components/ui/Section';
import { WordReveal } from '../components/ui/WordReveal';
import {
  AUDIENCES,
  AUDIENCES_HEADER,
  BROWSER_INTRO,
  HERO,
  HOME_IDS,
  INTRO,
  TOOLKIT_HEADER,
  TOOLKIT_TEASER,
  WAYS,
  WAYS_INTRO,
  WORKSPACE_SHOWCASE,
} from '../content/home';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';
import { UniversityBrowser } from './UniversityList';

type Way = (typeof WAYS)[number];
type Audience = (typeof AUDIENCES)[number];
type ToolkitItem = (typeof TOOLKIT_TEASER)[number];
type Highlight = (typeof WORKSPACE_SHOWCASE.highlights)[number];

/** Opening: headline and calls to action, then the live university browser. */
function HomeHero() {
  return (
    <section aria-labelledby={HOME_IDS.hero} className="relative isolate overflow-clip pt-16 pb-16 md:pt-24 md:pb-24">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(48%_42%_at_72%_8%,rgb(67_97_238/0.12),transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-[760px] bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(60%_55%_at_50%_0%,black,transparent)] bg-[size:64px_64px] opacity-50"
      />
      <Container>
        <div className="flex flex-col gap-7">
          <Link
            to={HERO.pill.to}
            className="group border-beam inline-flex w-fit max-w-full animate-enter items-center gap-2 rounded-full bg-surface/70 py-1 pr-3 pl-1 text-[13px] text-ink-2 ring-1 ring-line backdrop-blur transition-colors hover:text-ink hover:ring-line-2"
          >
            <span className="shrink-0 rounded-full bg-accent-soft px-2 py-0.5 text-[11.5px] font-medium text-accent">Network</span>
            <span className="truncate">{HERO.pill.label}</span>
            <Arrow size={12} />
          </Link>
          <h1 id={HOME_IDS.hero} className="max-w-5xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl md:text-[4.75rem]">
            <WordReveal text={HERO.title} delay={80} />
          </h1>
          <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl animate-enter text-[17px] leading-relaxed text-ink-2 [animation-delay:160ms] md:text-lg">{HERO.lead}</p>
            <div className="flex shrink-0 animate-enter flex-wrap items-center gap-3 [animation-delay:240ms]">
              <Button to={contactLink('join')}>Join the network</Button>
              <Button to="/send-files" variant="secondary">
                Send student files <Arrow />
              </Button>
            </div>
          </div>
        </div>
        <div className="mt-14 animate-tilt-in md:mt-20">
          <h2 className="sr-only">{BROWSER_INTRO.heading}</h2>
          <UniversityBrowser headingLevel={3} embedded />
        </div>
      </Container>
    </section>
  );
}

function WayCard({ way }: { way: Way }) {
  return (
    <Link
      to={way.to}
      className="group reveal flex flex-col gap-4 rounded-2xl bg-surface/60 p-6 ring-1 ring-line transition-[box-shadow,background-color] duration-300 hover:bg-surface hover:shadow-lift"
    >
      <span className="grid size-10 place-items-center rounded-xl bg-subtle text-ink ring-1 ring-line transition-colors group-hover:text-accent">
        <Icon name={way.icon} size={18} />
      </span>
      <span className="flex flex-col gap-1.5">
        <h3 className="text-[17px] font-medium tracking-[-0.015em]">{way.title}</h3>
        <span className="text-sm leading-relaxed text-ink-2">{way.text}</span>
      </span>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] text-ink-3 transition-colors group-hover:text-ink">
        {way.cta} <Arrow size={12} />
      </span>
    </Link>
  );
}

/** Three entry points: have students, have universities, or both. */
function WaysSection() {
  return (
    <Section border labelledBy={HOME_IDS.ways}>
      <h2 id={HOME_IDS.ways} className="reveal text-center text-[15px] leading-normal font-normal tracking-normal text-ink-2">
        <span className="font-medium text-ink">{WAYS_INTRO.lead}</span> {WAYS_INTRO.rest}
      </h2>
      <div className="mt-10 grid gap-3 md:grid-cols-3">
        {WAYS.map((w) => (
          <WayCard key={w.title} way={w} />
        ))}
      </div>
    </Section>
  );
}

function IntroSection() {
  return (
    <Section border labelledBy={HOME_IDS.intro}>
      <h2 id={HOME_IDS.intro} className="reveal max-w-4xl text-[1.85rem] leading-[1.18] font-medium tracking-[-0.03em] sm:text-[2.5rem]">
        {INTRO.statement} <span className="text-ink-3">{INTRO.rest}</span>
      </h2>
      <div className="mt-14 grid gap-10 md:grid-cols-3">
        {INTRO.pillars.map((p) => (
          <div key={p.title} className="reveal flex flex-col gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon name={p.icon} size={17} />
            </span>
            <h3 className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</h3>
            <p className="text-sm leading-relaxed text-ink-2">{p.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function AudienceCard({ audience, primary }: { audience: Audience; primary: boolean }) {
  return (
    <article className={`reveal flex flex-col gap-6 rounded-2xl p-7 ring-1 md:p-9 ${primary ? 'bg-tint-lavender ring-accent/10' : 'bg-subtle ring-line'}`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label>{audience.label}</Label>
        <span className="rounded-full bg-surface px-2.5 py-0.5 text-[12px] text-ink-2 ring-1 ring-line">{audience.note}</span>
      </div>
      <h3 className="text-[1.6rem] leading-tight font-medium tracking-[-0.025em]">{audience.title}</h3>
      <ul className="flex flex-col gap-3 text-[15px] text-ink-2">
        {audience.points.map((p) => (
          <li key={p} className="flex gap-2.5">
            <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
            {p}
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-2">
        <Button to={audience.cta.to} variant={primary ? 'primary' : 'secondary'}>
          {audience.cta.label} <Arrow />
        </Button>
      </div>
    </article>
  );
}

function AudiencesSection() {
  return (
    <Section border labelledBy={HOME_IDS.audiences}>
      <SectionHeader title={AUDIENCES_HEADER.title} titleId={HOME_IDS.audiences} text={AUDIENCES_HEADER.text} link={AUDIENCES_HEADER.link} />
      <div className="mt-12 grid gap-3 md:grid-cols-2">
        {AUDIENCES.map((a, i) => (
          <AudienceCard key={a.label} audience={a} primary={i === 0} />
        ))}
      </div>
    </Section>
  );
}

function HighlightItem({ item }: { item: Highlight }) {
  return (
    <li className="reveal flex flex-col gap-3">
      <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
        <Icon name={item.icon} size={17} />
      </span>
      <h3 className="text-[15px] font-medium tracking-[-0.01em]">{item.title}</h3>
      <p className="text-sm leading-relaxed text-ink-2">{item.text}</p>
    </li>
  );
}

/** The animated workspace mock, staged as a product showcase. It replays from the first step when scrolled to. */
function WorkspaceShowcase() {
  return (
    <Section border labelledBy={HOME_IDS.workspace}>
      <SectionHeader
        label={<Label>{WORKSPACE_SHOWCASE.label}</Label>}
        title={WORKSPACE_SHOWCASE.title}
        titleId={HOME_IDS.workspace}
        text={WORKSPACE_SHOWCASE.text}
        link={WORKSPACE_SHOWCASE.link}
      />
      <div className="reveal relative isolate mt-12 sm:rounded-3xl sm:p-4 sm:ring-1 sm:ring-line md:mt-16 md:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_70%_at_50%_0%,rgb(67_97_238/0.10),transparent_70%)] sm:rounded-3xl"
        />
        <Workspace replayOnView />
      </div>
      <ul className="mt-12 grid gap-10 md:grid-cols-3">
        {WORKSPACE_SHOWCASE.highlights.map((h) => (
          <HighlightItem key={h.title} item={h} />
        ))}
      </ul>
    </Section>
  );
}

function ToolkitCard({ item }: { item: ToolkitItem }) {
  return (
    <Link to="/toolkit" className="group bg-canvas transition-colors hover:bg-subtle">
      <span className="reveal flex h-full flex-col gap-3 p-6 md:p-7">
        <span className="grid size-9 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line transition-colors group-hover:text-accent">
          <Icon name={item.icon} size={16} />
        </span>
        <h3 className="text-[15px] font-medium tracking-[-0.01em] text-ink">{item.title}</h3>
        <span className="text-sm leading-relaxed text-ink-2">{item.text}</span>
      </span>
    </Link>
  );
}

function ToolkitSection() {
  return (
    <Section border labelledBy={HOME_IDS.toolkit}>
      <SectionHeader title={TOOLKIT_HEADER.title} titleId={HOME_IDS.toolkit} text={TOOLKIT_HEADER.text} link={TOOLKIT_HEADER.link} />
      <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {TOOLKIT_TEASER.map((t) => (
          <ToolkitCard key={t.title} item={t} />
        ))}
      </div>
    </Section>
  );
}

export function Home() {
  usePageMeta();

  return (
    <>
      <HomeHero />
      <WaysSection />
      <IntroSection />
      <HowItWorks />
      <AudiencesSection />
      <WorkspaceShowcase />
      <ToolkitSection />
      <ExploreRow />
      <StatementCards pick={[0, 1]} tone="lavender" />
      <CtaSection />
    </>
  );
}
