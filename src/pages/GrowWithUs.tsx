import { useEffect, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router';
import { FileJourney, LeadLoop, UniversityInflow } from '../components/mock/Grow';
import { Workspace } from '../components/mock/Workspace';
import { Arrow, Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { SpotlightPanel } from '../components/ui/Panels';
import { ProductHero } from '../components/ui/ProductHero';
import { Label, SectionHeader } from '../components/ui/Section';
import { CONTACT_PHONE, CONTACT_PHONE_LINK, CONTACT_WHATSAPP } from '../config';
import { GROW, type Chapter, type Point } from '../content/grow';
import { contactLink, demoLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

/** Three short points under a chapter's panel, divided by hairlines. */
function Points({ points }: { points: Point[] }) {
  return (
    <div className="mt-3 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:grid-cols-3">
      {points.map((p) => (
        <div key={p.title} className="bg-canvas">
          <div className="reveal flex h-full items-start gap-3.5 p-6">
            <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
              <Icon name={p.icon} size={16} />
            </span>
            <span>
              <span className="block text-[15px] font-medium tracking-[-0.01em]">{p.title}</span>
              <span className="mt-0.5 block text-sm leading-relaxed text-ink-2">{p.text}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A numbered chapter: header, a large illustration, then three points. */
function ChapterSection({ chapter, children }: { chapter: Chapter; children: ReactNode }) {
  return (
    <section id={chapter.id} className="scroll-mt-16 py-20 md:py-28">
      <Container>
        <SectionHeader
          label={
            <Label>
              {chapter.num} {chapter.label}
            </Label>
          }
          title={chapter.title}
          text={chapter.text}
          link={chapter.link}
        />
        <div className="mt-12 md:mt-16">
          <SpotlightPanel title={chapter.panel.title} text={chapter.panel.text}>
            {children}
          </SpotlightPanel>
          <Points points={chapter.points} />
        </div>
      </Container>
    </section>
  );
}

export function GrowWithUs() {
  usePageMeta('Grow with Us', GROW.hero.lead);
  const { hash } = useLocation();
  const { hero, agenda, send, universities, toolkit, demo } = GROW;

  // Open shared links such as /grow-with-us#demo at their section. Deferred so it runs after the
  // layout's scroll-to-top on navigation.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView(), 0);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <>
      <ProductHero label={hero.label} title={hero.title} lead={hero.lead} backdrop="network">
        <Button {...demoLink()}>
          Try Demo <Arrow />
        </Button>
        <Button to={contactLink('join')} variant="secondary">
          Join the network
        </Button>
      </ProductHero>

      <nav aria-label="On this page" className="pt-10 md:pt-14">
        <Container>
          <ol className="grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {agenda.map((a) => (
              <li key={a.id} className="bg-canvas">
                <a href={`#${a.id}`} className="group flex h-full items-center justify-between gap-4 p-5 transition-colors hover:bg-subtle md:p-6">
                  <span>
                    <span className="block font-mono text-[12px] text-ink-3">{a.num}</span>
                    <span className="mt-1.5 block text-[15px] font-medium tracking-[-0.01em] text-ink">{a.title}</span>
                    <span className="block text-[13px] text-ink-3">{a.text}</span>
                  </span>
                  <Icon name="arrow" size={15} className="shrink-0 rotate-90 text-ink-3 transition-transform group-hover:translate-y-0.5 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ol>
        </Container>
      </nav>

      <ChapterSection chapter={send}>
        <FileJourney />
      </ChapterSection>

      <ChapterSection chapter={universities}>
        <UniversityInflow />
      </ChapterSection>

      <section id={toolkit.id} className="scroll-mt-16 py-20 md:py-28">
        <Container>
          <SectionHeader
            label={
              <Label>
                {toolkit.num} {toolkit.label}
              </Label>
            }
            title={toolkit.title}
            text={toolkit.text}
            link={toolkit.link}
          />
          <div className="mt-12 md:mt-16">
            <LeadLoop />
          </div>
          <p className="reveal mx-auto mt-6 flex max-w-xl items-start justify-center gap-2 text-center text-[13.5px] text-ink-3">
            <Icon name="repeat" size={15} className="mt-0.5 shrink-0 text-accent" />
            {toolkit.loop}
          </p>
          <div className="mt-14">
            <p className="reveal font-mono text-[12px] text-ink-3">Also in the toolkit</p>
            <div className="mt-4 grid gap-px overflow-clip rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
              {toolkit.tools.map((t) => (
                <Link key={t.title} to="/toolkit" className="group bg-canvas transition-colors hover:bg-subtle">
                  <span className="reveal flex items-center gap-3.5 p-5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line transition-colors group-hover:text-accent">
                      <Icon name={t.icon} size={16} />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-medium tracking-[-0.01em] text-ink">{t.title}</span>
                      <span className="block text-[13px] text-ink-3">{t.text}</span>
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section id={demo.id} className="relative isolate scroll-mt-16 overflow-clip border-t border-line pt-24 md:pt-32">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(50%_45%_at_50%_30%,rgb(110_139_255/0.18),transparent_70%)]" />
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(60%_45%_at_50%_25%,black,transparent)] bg-[size:56px_56px] opacity-60"
        />
        <Container className="flex flex-col items-center gap-7 text-center">
          <Label>
            {demo.num} {demo.label}
          </Label>
          <h2 className="reveal text-[2.5rem] leading-[1.06] font-medium tracking-[-0.035em] sm:text-[3.4rem] md:text-[4rem]">
            {demo.title[0]}
            <br />
            {demo.title[1]}
          </h2>
          <p className="reveal max-w-md text-[17px] leading-relaxed text-ink-2">{demo.text}</p>
          <div className="reveal flex flex-wrap justify-center gap-3">
            <Button {...demoLink()}>
              Try Demo <Arrow />
            </Button>
            <Button href={CONTACT_WHATSAPP} external variant="secondary">
              <Icon name="message" size={15} /> WhatsApp us
            </Button>
          </div>
          <p className="reveal text-[13px] text-ink-3">
            or call{' '}
            <a href={CONTACT_PHONE_LINK} className="text-ink-2 transition-colors hover:text-ink">
              {CONTACT_PHONE}
            </a>
          </p>
        </Container>
        <Container className="mt-16 md:mt-20">
          <div className="reveal [mask-image:linear-gradient(to_bottom,black_62%,transparent)]">
            <Workspace />
          </div>
        </Container>
      </section>
    </>
  );
}
