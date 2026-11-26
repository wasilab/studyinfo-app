import { useId, useState } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { CtaSection } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Faq } from '../components/ui/Faq';
import { Icon } from '../components/ui/Icon';
import { H2, Label, Section } from '../components/ui/Section';
import { WordReveal } from '../components/ui/WordReveal';
import { CREDITS_PER_USD, PAYMENT_PROVIDER, REFUND_DAYS } from '../config';
import { PRICING } from '../content/pricing';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

const MIN = 5;
const MAX = 500;
const STEP = 5;

/** Same output on the server and in the browser, so the pre-rendered page hydrates cleanly. */
const fmt = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const LINK = 'text-ink underline decoration-line-2 underline-offset-2 hover:decoration-ink';

function CreditCalculator() {
  const id = useId();
  const [usd, setUsd] = useState(25);
  const credits = usd * CREDITS_PER_USD;
  const fill = ((usd - MIN) / (MAX - MIN)) * 100;

  return (
    <div className="reveal grid overflow-clip rounded-2xl bg-surface shadow-window md:grid-cols-[1.2fr_1fr]">
      <div className="flex flex-col gap-7 p-7 md:p-10">
        <div>
          <label htmlFor={`${id}-range`} className="text-[15px] font-medium">
            How much would you like to top up?
          </label>
          <p className="mt-1 text-[13.5px] text-ink-3">Drag the slider or pick an amount to see how many credits you get.</p>
        </div>

        <div className="flex flex-col gap-3">
          <input
            id={`${id}-range`}
            type="range"
            min={MIN}
            max={MAX}
            step={STEP}
            value={usd}
            onChange={(e) => setUsd(Number(e.target.value))}
            aria-valuetext={`${usd} US dollars, ${fmt(credits)} credits`}
            style={{ background: `linear-gradient(to right, var(--color-accent) ${fill}%, var(--color-muted) ${fill}%)` }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full accent-accent [&::-moz-range-thumb]:size-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-accent [&::-webkit-slider-thumb]:size-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:shadow-[0_0_0_4px_rgb(67_97_238/0.18)]"
          />
          <div className="flex justify-between font-mono text-[11.5px] text-ink-3">
            <span>${MIN}</span>
            <span>${MAX}</span>
          </div>
        </div>

        <div role="group" aria-label="Quick amounts" className="flex flex-wrap gap-2">
          {PRICING.amounts.map((a) => (
            <button
              key={a}
              type="button"
              aria-pressed={usd === a}
              onClick={() => setUsd(a)}
              className={`h-9 rounded-full px-4 text-[13.5px] font-medium ring-1 transition-colors ring-inset ${usd === a ? 'bg-accent-soft text-accent ring-accent/50' : 'text-ink-2 ring-line-2 hover:bg-subtle hover:text-ink'}`}
            >
              ${a}
            </button>
          ))}
        </div>
      </div>

      <div className="relative isolate flex flex-col justify-between gap-8 border-t border-line bg-subtle p-7 md:border-t-0 md:border-l md:p-10">
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_100%_0%,rgb(67_97_238/0.10),transparent_70%)]" />
        <div aria-live="polite">
          <p className="font-mono text-[12px] text-ink-3">You pay</p>
          <p className="mt-1 text-[2rem] leading-none font-medium tracking-[-0.03em] tabular-nums">
            ${fmt(usd)} <span className="text-[15px] font-normal text-ink-3">USD</span>
          </p>
          <p className="mt-7 font-mono text-[12px] text-ink-3">You get</p>
          <p className="mt-1 text-[3rem] leading-none font-medium tracking-[-0.04em] text-accent tabular-nums md:text-[3.5rem]">
            {fmt(credits)}
          </p>
          <p className="mt-2 text-[14px] text-ink-2">AI credits</p>
        </div>
        <div className="flex flex-col gap-3">
          <Button to={contactLink('demo')} className="w-full">
            Get started
          </Button>
          <p className="text-center text-[12px] text-ink-3">Taxes may apply at checkout · Processed by {PAYMENT_PROVIDER}</p>
        </div>
      </div>
    </div>
  );
}

export function Pricing() {
  usePageMeta();
  const { hero, rate, steps, usesCredits, free, faq } = PRICING;

  return (
    <>
      <section className="relative overflow-clip pt-16 pb-16 md:pt-24 md:pb-24">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(110_139_255/0.16),transparent_70%)]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] [mask-image:radial-gradient(50%_60%_at_50%_0%,black,transparent)] bg-[size:56px_56px] opacity-70"
        />
        <Container className="relative">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-5 text-center">
            <Label>{hero.label}</Label>
            <h1 className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem] md:text-[4.2rem]">
              <WordReveal text={hero.title} />
            </h1>
            <p className="max-w-xl animate-enter text-[17px] leading-relaxed text-ink-2 [animation-delay:240ms]">{hero.lead}</p>

            <div className="mt-6 flex animate-enter flex-col items-center gap-2 [animation-delay:340ms]">
              <p className="flex items-baseline gap-3 text-[2.2rem] font-medium tracking-[-0.035em] sm:text-[2.8rem]" aria-label={rate}>
                <span>1 USD</span>
                <span aria-hidden="true" className="text-ink-3">
                  =
                </span>
                <span className="bg-[linear-gradient(120deg,var(--color-accent),#7c5cff)] bg-clip-text text-transparent">{fmt(CREDITS_PER_USD)} credits</span>
              </p>
              <p className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-[13px] text-ink-3">
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-success" /> No subscription
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-success" /> No monthly fee
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Icon name="check" size={13} className="text-success" /> Pay as you go
                </span>
              </p>
            </div>
          </div>

          <div className="mx-auto mt-14 max-w-4xl md:mt-16">
            <CreditCalculator />
          </div>
        </Container>
      </section>

      <Section border labelledBy="how-credits-work">
        <div className="reveal flex flex-col gap-4">
          <Label>Pay as you go</Label>
          <H2 id="how-credits-work">How AI credits work</H2>
        </div>
        <ol className="mt-12 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={`reveal flex flex-col gap-3 border-line py-7 ${i > 0 ? 'border-t sm:border-t-0' : ''} ${i % 2 === 1 ? 'sm:border-l sm:pl-7' : 'sm:pr-7'} ${i >= 2 ? 'sm:border-t lg:border-t-0' : ''} ${i > 0 ? 'lg:border-l lg:pl-7' : ''} lg:pr-7`}
            >
              <span className="font-mono text-[12px] text-accent">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-[16px] font-medium tracking-[-0.01em]">{s.title}</span>
              <span className="text-[14px] leading-relaxed text-ink-2">{s.text}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section border labelledBy="what-uses-credits">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
          <div>
            <div className="reveal flex flex-col gap-4">
              <Label>Uses credits</Label>
              <H2 id="what-uses-credits">The more AI you use, the more credits it uses</H2>
              <p className="max-w-lg text-[16px] leading-relaxed text-ink-2">
                Credits are deducted each time an AI tool does work for you. A short chatbot reply uses fewer credits than a full interview practice session.
              </p>
            </div>
            <ul className="mt-10 divide-y divide-line border-y border-line">
              {usesCredits.map((f) => (
                <li key={f.title} className="reveal flex items-start gap-4 py-5">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                    <Icon name={f.icon} size={16} />
                  </span>
                  <span className="flex flex-col gap-0.5">
                    <span className="text-[15px] font-medium">{f.title}</span>
                    <span className="text-[14px] leading-relaxed text-ink-2">{f.text}</span>
                  </span>
                  <span className="ml-auto hidden shrink-0 items-center gap-1.5 self-center font-mono text-[11.5px] text-ink-3 sm:inline-flex">
                    <Icon name="coins" size={13} /> Per use
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:pt-2">
            <div className="reveal flex flex-col gap-4">
              <Label>Always free</Label>
              <h3 className="text-[1.6rem] leading-tight font-medium tracking-[-0.025em]">No credits needed</h3>
              <p className="text-[15px] leading-relaxed text-ink-2">The network itself costs nothing. It is paid for by the shared commission when a student is placed.</p>
            </div>
            <ul className="mt-8 flex flex-col gap-3.5 text-[15px] text-ink-2">
              {free.map((f) => (
                <li key={f} className="reveal flex gap-3">
                  <Icon name="check" size={16} className="mt-[3px] shrink-0 text-success" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section border labelledBy="pricing-faq-title">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div className="reveal flex flex-col gap-4">
            <Label>FAQ</Label>
            <H2 id="pricing-faq-title">Questions about credits</H2>
            <p className="max-w-sm text-[15px] leading-relaxed text-ink-2">
              Unused credits can be refunded within {REFUND_DAYS} days. Read our{' '}
              <Link to="/refund-policy" className={LINK}>
                refund policy
              </Link>{' '}
              and{' '}
              <Link to="/terms-of-service" className={LINK}>
                terms of service
              </Link>
              , or{' '}
              <Link to={contactLink('other')} className={LINK}>
                ask us
              </Link>
              .
            </p>
          </div>
          <div className="reveal">
            <Faq items={faq} />
          </div>
        </div>
      </Section>

      <CtaSection title={['Free to join.', 'Pay only for the AI you use.']} />
    </>
  );
}
