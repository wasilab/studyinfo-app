import { Link } from 'react-router';
import { EXPLORE, STATEMENTS, contactLink, type Statement } from '../../content/site';
import { Arrow, Button } from './Button';
import { Container } from './Container';
import { LogoMark } from './Logo';

/** Row of the four product pages, divided by hairlines. */
export function ExploreRow() {
  return (
    <section className="border-t border-line py-16 md:py-24">
      <Container>
        <div className="grid lg:grid-cols-4">
          {EXPLORE.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={`group reveal flex flex-col justify-between gap-6 border-line py-6 lg:min-h-[9.5rem] lg:py-0 ${
                i > 0 ? 'border-t lg:border-t-0 lg:border-l lg:pl-7' : 'lg:pr-7'
              } ${i > 0 && i < EXPLORE.length - 1 ? 'lg:pr-7' : ''}`}
            >
              <span className="max-w-[15rem] text-[17px] leading-snug font-medium tracking-[-0.015em] text-ink">{item.title}</span>
              <span className="inline-flex items-center gap-1.5 text-[13px] text-ink-3 transition-colors group-hover:text-ink">
                {item.label} <Arrow size={12} />
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

function StatementCard({ statement, tone }: { statement: Statement; tone: 'neutral' | 'lavender' | 'sky' }) {
  const tones = {
    neutral: 'bg-subtle ring-line',
    lavender: 'bg-tint-lavender ring-accent/10',
    sky: 'bg-[linear-gradient(160deg,var(--color-tint-sky),var(--color-tint-lavender)_70%,#fdf2f4)] ring-accent/10',
  } as const;
  return (
    <figure className={`group reveal relative isolate flex min-h-[280px] flex-col justify-between gap-12 overflow-hidden rounded-2xl p-7 ring-1 md:min-h-[340px] md:p-9 ${tones[tone]}`}>
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="absolute -right-12 -bottom-16 -z-10 size-80 text-ink/[0.08] transition-transform duration-1000 ease-out-expo group-hover:scale-105 group-hover:rotate-6">
        {[0.5, 2.25, 4].map((inset) => (
          <rect key={inset} x={inset} y={inset} width={24 - inset * 2} height={24 - inset * 2} rx={6 - inset / 2} stroke="currentColor" strokeWidth="0.12" />
        ))}
        <path d="M7.5 9h9M7.5 12h9M7.5 15h5.5" stroke="currentColor" strokeWidth="0.12" strokeLinecap="round" />
      </svg>
      <blockquote className="max-w-xl text-[1.5rem] leading-[1.22] font-medium tracking-[-0.025em] text-ink md:text-[1.75rem]">{statement.text}</blockquote>
      <figcaption className="flex items-center gap-3">
        <LogoMark size={26} />
        <span className="text-[13px] leading-tight">
          <span className="block font-medium text-ink">StudyInfo standard</span>
          <span className="text-ink-3">{statement.label}</span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Two statement cards in Linear's testimonial slot. These are our own standards, not quotes. */
export function StatementCards({ pick = [0, 1], tone = 'lavender' }: { pick?: [number, number]; tone?: 'lavender' | 'sky' }) {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="grid gap-3 md:grid-cols-[1.55fr_1fr]">
          <StatementCard statement={STATEMENTS[pick[0]]} tone="neutral" />
          <StatementCard statement={STATEMENTS[pick[1]]} tone={tone} />
        </div>
        <div className="reveal mt-6 flex flex-wrap items-center justify-between gap-3 text-[13px] text-ink-3">
          <p>
            StudyInfo accepts <span className="text-ink">student files, agency partners and partner universities.</span>
          </p>
          <Link to="/partners" className="group inline-flex items-center gap-1.5 transition-colors hover:text-ink">
            Partners <Arrow size={12} />
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Centred closing call to action. */
export function CtaSection({ title = ['Every file complete.', 'Every partner informed.'] }: { title?: [string, string] }) {
  return (
    <section className="relative isolate overflow-clip border-t border-line py-28 md:py-40">
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(45%_70%_at_50%_100%,rgb(91_91_214/0.10),transparent_70%)]" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(60%_60%_at_50%_100%,black,transparent)] bg-[size:56px_56px] opacity-60"
      />
      <Container className="flex flex-col items-center gap-9 text-center">
        <h2 className="reveal text-[2.5rem] leading-[1.06] font-medium tracking-[-0.035em] sm:text-[3.4rem] md:text-[4rem]">
          {title[0]}
          <br />
          {title[1]}
        </h2>
        <div className="reveal flex flex-wrap justify-center gap-3">
          <Button to={contactLink('agency')}>Become a partner</Button>
          <Button to="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </Container>
    </section>
  );
}
