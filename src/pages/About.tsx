import { CompanyBadge, PartnershipVisual } from '../components/mock/About';
import { CtaSection, StatementCards } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { SpotlightPanel } from '../components/ui/Panels';
import { ProductHero } from '../components/ui/ProductHero';
import { Label, SectionHeader } from '../components/ui/Section';
import { ABOUT } from '../content/about';
import { usePageMeta } from '../lib/usePageMeta';

// Team portrait imports
import visionImg from '../media/the_vision.png';
import partnerImg from '../media/the_partner.png';
import coderImg from '../media/the_coder.png';

/* ─── Team data ────────────────────────────────────────────────────────────── */
const CEO = {
  name: 'Rupak Kanti Deb',
  title: 'Chief Executive Officer',
  badge: 'CEO',
  persona: 'The Vision',
  photo: visionImg,
  email: 'ceo.rupak@studyinfo.app',
  phone: '+880 1727-091557',
  bio: 'Rupak built StudyInfo to give every agency no matter where they operate a trusted, anonymous route to place students at the right university.',
};

const PARTNER = {
  name: 'Sultan Ahmed',
  title: 'Director',
  badge: 'Director',
  persona: 'The Partner',
  photo: partnerImg,
  email: 'director.sultan@studyinfo.app',
  phone: '+44 7405 120621',
  bio: 'Based in the UK, Sultan leads our institutional partnerships and ensures every university in the network is verified, current, and ready to welcome your students.',
};

const CTO = {
  name: 'Khandokar Rifat Muhtasim',
  title: 'Chief Technology Officer',
  badge: 'CTO',
  persona: 'The Coder',
  photo: coderImg,
  email: 'cto.rifat@studyinfo.app',
  phone: '+880 1814-297793',
  bio: 'Rifat designed the file-routing engine, document-check pipeline, and real-time case-tracking system that keep every submission secure and every agency in sync.',
};

/* ─── Horizontal team card: photo left, content right ───────────────────────── */
function TeamCard({
  member,
}: {
  member: typeof CEO | typeof PARTNER | typeof CTO;
}) {
  return (
    <article className="reveal group flex flex-col overflow-hidden rounded-2xl bg-surface ring-1 ring-line shadow-card sm:flex-row">

      {/* ── Photo panel ── */}
      <div className="relative h-96 w-full shrink-0 overflow-hidden sm:h-auto sm:w-56 md:w-64 lg:w-72">
        <img
          src={member.photo}
          alt={member.name}
          className="absolute inset-0 h-full w-full object-cover object-[center_10%] transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Mobile: bottom white gradient blend into card body */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white via-white/40 to-transparent sm:hidden" />
        {/* Desktop: right-side white gradient dissolve into text panel */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-24 bg-gradient-to-r from-transparent to-white sm:block" />
      </div>

      {/* ── Right: name, badge, bio, contacts ── */}
      <div className="group/content flex flex-1 flex-col justify-end gap-3 p-5 md:p-7">

        {/* Badge — top-right */}
        <span className="self-end inline-flex items-center rounded-full bg-accent-soft px-2.5 py-0.5 text-[11px] font-medium text-accent ring-1 ring-accent/20">
          {member.badge}
        </span>

        {/* Persona label — large display title */}
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            {/* Thin accent bar */}
            <span
              className="block h-0.5 w-8 shrink-0 rounded-full bg-accent/50 transition-all duration-500 group-hover/content:w-12 group-hover/content:bg-accent"
              aria-hidden="true"
            />
            <span className="font-mono text-[13px] font-bold uppercase tracking-[0.25em] text-accent transition-colors duration-300 group-hover/content:text-accent">
              {member.persona}
            </span>
          </div>

          {/* Name + title — spaced further below the persona label */}
          <div className="mt-5">
            <h3 className="text-[1.1rem] font-semibold leading-tight tracking-[-0.02em] text-ink">
              {member.name}
            </h3>
            <p className="mt-0.5 text-[12.5px] text-ink-3">{member.title}</p>
          </div>
        </div>

        {/* One-sentence bio */}
        <p className="text-[13.5px] leading-relaxed text-ink-2">{member.bio}</p>

        {/* Contact links */}
        <div className="flex flex-col gap-1.5 border-t border-line pt-4">
          <a
            href={`mailto:${member.email}`}
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-3 transition-colors hover:text-accent"
          >
            <Icon name="mail" size={13} className="shrink-0 text-accent" />
            <span className="break-all">{member.email}</span>
          </a>
          <a
            href={`tel:${member.phone.replace(/\s/g, '')}`}
            className="inline-flex items-center gap-2 text-[12.5px] text-ink-3 transition-colors hover:text-ink"
          >
            <Icon name="phone" size={13} className="shrink-0 text-ink-3" />
            {member.phone}
          </a>
        </div>
      </div>

    </article>
  );
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export function About() {
  usePageMeta();
  const { hero, problem, mission, vision, partnership } = ABOUT;

  return (
    <>
      <ProductHero label={hero.label} title={hero.title} lead={hero.lead} backdrop="network" />

      {/* Problem */}
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

      {/* Mission + Vision */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-3 md:grid-cols-2">
            {[
              { label: 'Our mission', text: mission, tone: 'bg-tint-lavender ring-accent/15' },
              { label: 'Our vision', text: vision, tone: 'bg-subtle ring-line' },
            ].map((c) => (
              <article
                key={c.label}
                className={`reveal flex min-h-[260px] flex-col justify-between gap-10 rounded-2xl p-7 ring-1 md:p-10 ${c.tone}`}
              >
                <h2 className="font-mono text-[12px] text-ink-3">{c.label}</h2>
                <p className="text-[1.6rem] leading-[1.22] font-medium tracking-[-0.025em] md:text-[1.9rem]">
                  {c.text}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Meet the Team ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <Container>
          {/* Section header */}
          <div className="reveal mb-12 md:mb-16">
            <p className="font-mono text-[12px] text-ink-3">The people</p>
            <h2 className="mt-3 text-[2rem] font-semibold leading-tight tracking-[-0.028em] sm:text-[2.4rem]">
              Meet the team
            </h2>
            <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-ink-2">
              StudyInfo is built and run by a focused team with deep roots in international education.
              We are accessible, responsive, and genuinely invested in helping every agency that joins.
            </p>
          </div>

          {/*
            Layout (horizontal cards):
              Row 1 → CEO left  |  Partner right   (2-col grid)
              Row 2 → CTO spanning full width
          */}
          <div className="flex flex-col gap-4">

            {/* Top row: CEO + Partner — side-by-side on desktop, stacked on mobile */}
            <div className="grid gap-4 md:grid-cols-2">
              <TeamCard member={CEO} />
              <TeamCard member={PARTNER} />
            </div>

            {/* Bottom row: CTO full width */}
            <TeamCard member={CTO} />

          </div>

          {/* Welcome note */}
          <div className="reveal mt-12 rounded-2xl bg-tint-lavender p-7 ring-1 ring-accent/15 md:mt-16 md:p-10">
            <p className="font-mono text-[12px] text-ink-3">A note from the founders</p>
            <blockquote className="mt-4 text-[1.2rem] leading-[1.5] font-medium tracking-[-0.02em] text-ink md:text-[1.4rem]">
              "StudyInfo exists because we kept running into the same wall: a student ready to apply, a university with a place, and no reliable, neutral way to get the file from one agency to the other. We built the network to be that bridge — anonymous so agencies trust it, transparent so students can track it, and commission-sharing so everyone has a reason to keep using it. Whether you hold students or universities, there is a place for you here."
            </blockquote>
            <div className="mt-6 flex flex-wrap items-center gap-6 border-t border-accent/15 pt-6 text-[13px] text-ink-3">
              <span><span className="font-medium text-ink">Rupak Kanti Deb</span> · CEO</span>
              <span><span className="font-medium text-ink">Sultan Ahmed</span> · Director</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Partnership */}
      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader
            label={<Label>{partnership.label}</Label>}
            title={partnership.title}
            text={partnership.text}
          />
          <div className="mt-12 md:mt-16">
            <SpotlightPanel
              title="Exclusive license"
              text="Tablab Research licenses StudyInfo exclusively to Global Desire Education."
              inner="max-w-[900px]"
            >
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
