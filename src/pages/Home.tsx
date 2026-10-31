import { Link } from 'react-router';
import { Workspace } from '../components/mock/Workspace';
import { HowItWorks } from '../components/sections/HowItWorks';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { Label, SectionHeader } from '../components/ui/Section';
import { WordReveal } from '../components/ui/WordReveal';
import { AUDIENCES, HERO, INTRO, TOOLKIT_TEASER, WAYS } from '../content/home';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

export function Home() {
  usePageMeta(null, HERO.lead);

  return (
    <>
      <section className="relative isolate overflow-clip pt-16 md:pt-24">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[900px] bg-[radial-gradient(48%_42%_at_72%_8%,rgb(110_139_255/0.20),transparent_70%)]" />
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
            <h1 className="max-w-5xl text-[2.75rem] leading-[1.02] font-medium tracking-[-0.04em] sm:text-6xl md:text-[4.75rem]">
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
            <Workspace />
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-24">
        <Container>
          <p className="reveal text-center text-[15px] text-ink-2">
            <span className="font-medium text-ink">One network, two sides.</span> Use either, or both.
          </p>
          <div className="mt-10 grid gap-3 md:grid-cols-3">
            {WAYS.map((w) => (
              <Link
                key={w.title}
                to={w.to}
                className="group reveal flex flex-col gap-4 rounded-2xl bg-surface/60 p-6 ring-1 ring-line transition-[box-shadow,background-color] duration-300 hover:bg-surface hover:shadow-lift"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-subtle text-ink ring-1 ring-line transition-colors group-hover:text-accent">
                  <Icon name={w.icon} size={18} />
                </span>
                <span className="flex flex-col gap-1.5">
                  <span className="text-[17px] font-medium tracking-[-0.015em]">{w.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{w.text}</span>
                </span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-[13px] text-ink-3 transition-colors group-hover:text-ink">
                  {w.cta} <Arrow size={12} />
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-28">
        <Container>
          <p className="reveal max-w-4xl text-[1.85rem] leading-[1.18] font-medium tracking-[-0.03em] sm:text-[2.5rem]">
            {INTRO.statement} <span className="text-ink-3">{INTRO.rest}</span>
          </p>
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
        </Container>
      </section>

      <HowItWorks />

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="Built for both sides of the network"
            text="Agencies with students send files. Agencies with universities receive them. Many agencies do both."
            link={{ to: '/network', label: 'How it works' }}
          />
          <div className="mt-12 grid gap-3 md:grid-cols-2">
            {AUDIENCES.map((a, i) => (
              <article
                key={a.label}
                className={`reveal flex flex-col gap-6 rounded-2xl p-7 ring-1 md:p-9 ${i === 0 ? 'bg-tint-lavender ring-accent/10' : 'bg-subtle ring-line'}`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Label>{a.label}</Label>
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-[12px] text-ink-2 ring-1 ring-line">{a.note}</span>
                </div>
                <h3 className="text-[1.6rem] leading-tight font-medium tracking-[-0.025em]">{a.title}</h3>
                <ul className="flex flex-col gap-3 text-[15px] text-ink-2">
                  {a.points.map((p) => (
                    <li key={p} className="flex gap-2.5">
                      <Icon name="check" size={16} className="mt-0.5 shrink-0 text-accent" />
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-2">
                  <Button to={a.cta.to} variant={i === 0 ? 'primary' : 'secondary'}>
                    {a.cta.label} <Arrow />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            title="More than a network"
            text="Around the network sits a full toolkit, so your agency can find, convert and manage its students in one place."
            link={{ to: '/toolkit', label: 'Agency toolkit' }}
          />
          <div className="mt-12 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {TOOLKIT_TEASER.map((t) => (
              <Link key={t.title} to="/toolkit" className="group bg-canvas transition-colors hover:bg-subtle">
                <span className="reveal flex h-full flex-col gap-3 p-6 md:p-7">
                  <span className="grid size-9 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line transition-colors group-hover:text-accent">
                    <Icon name={t.icon} size={16} />
                  </span>
                  <span className="text-[15px] font-medium tracking-[-0.01em] text-ink">{t.title}</span>
                  <span className="text-sm leading-relaxed text-ink-2">{t.text}</span>
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <ExploreRow />
      <StatementCards pick={[0, 1]} tone="lavender" />
      <CtaSection />
    </>
  );
}
