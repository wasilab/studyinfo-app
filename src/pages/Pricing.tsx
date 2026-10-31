import { Fragment } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { CtaSection } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Faq } from '../components/ui/Faq';
import { Icon } from '../components/ui/Icon';
import { H2, SectionHeader } from '../components/ui/Section';
import { COMPARE, PLANS, PRICING_FAQ } from '../content/pricing';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

function Included({ on }: { on: boolean }) {
  return on ? (
    <>
      <Icon name="check" size={16} className="text-accent" />
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <span aria-hidden="true" className="text-ink-3">—</span>
      <span className="sr-only">Not included</span>
    </>
  );
}

export function Pricing() {
  usePageMeta('Pricing', 'StudyInfo is free for agency partners. Universities partner with us on custom terms.');

  return (
    <>
      <section className="relative isolate overflow-clip pt-20 pb-14 text-center md:pt-28 md:pb-20">
        <div aria-hidden="true" className="absolute inset-x-0 top-0 -z-10 h-[520px] bg-[radial-gradient(50%_60%_at_50%_0%,rgb(91_91_214/0.10),transparent_70%)]" />
        <Container className="flex flex-col items-center gap-5">
          <p className="animate-enter text-[13px] font-medium text-ink-2">Pricing</p>
          <h1 className="animate-enter text-[2.75rem] leading-[1.02] font-medium tracking-[-0.04em] [animation-delay:80ms] sm:text-6xl md:text-[4.5rem]">
            Free for agencies
          </h1>
          <p className="max-w-xl animate-enter text-[17px] leading-relaxed text-ink-2 [animation-delay:160ms] md:text-lg">
            Agency partners join StudyInfo for free. Universities partner with us on terms agreed for each partnership.
          </p>
        </Container>
      </section>

      <Container>
        <div className="mx-auto grid max-w-4xl animate-enter gap-3 [animation-delay:240ms] md:grid-cols-2">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`relative flex flex-col gap-7 overflow-hidden rounded-2xl p-7 md:p-9 ${p.featured ? 'bg-white shadow-window' : 'bg-subtle ring-1 ring-line'}`}
            >
              {p.featured && <div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 bg-[linear-gradient(to_right,transparent,var(--color-accent),transparent)]" />}
              <div className="flex flex-col gap-1.5">
                <h2 className="text-[15px] font-medium tracking-[-0.01em]">{p.name}</h2>
                <p className="text-sm text-ink-2">{p.audience}</p>
              </div>
              <div>
                <p className="text-5xl font-medium tracking-[-0.045em]">{p.price}</p>
                <p className="mt-2 text-sm text-ink-3">{p.priceNote}</p>
              </div>
              <Button to={contactLink(p.cta.type)} variant={p.featured ? 'primary' : 'secondary'} className="w-full">
                {p.cta.label}
              </Button>
              <ul className="flex flex-col gap-3 border-t border-line pt-6 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <Icon name="check" size={16} className="mt-px text-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>

      <section className="py-20 md:py-28">
        <Container>
          <SectionHeader title="Compare partnerships" text="What agency partners and partner universities each get from StudyInfo." />
          <div className="reveal relative mt-12 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="w-1/2 py-3 font-normal text-ink-3">
                    <span className="sr-only">Feature</span>
                  </th>
                  {PLANS.map((p) => (
                    <th key={p.name} scope="col" className="py-3 font-medium">
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((g) => (
                  <Fragment key={g.group}>
                    <tr>
                      <th colSpan={3} scope="colgroup" className="pt-8 pb-2 font-mono text-[12px] font-normal text-ink-3">
                        {g.group}
                      </th>
                    </tr>
                    {g.rows.map(([label, agency, university]) => (
                      <tr key={label} className="border-b border-line transition-colors hover:bg-subtle">
                        <th scope="row" className="py-3.5 pr-4 font-normal text-ink-2">
                          {label}
                        </th>
                        <td className="py-3.5">
                          <Included on={agency} />
                        </td>
                        <td className="py-3.5">
                          <Included on={university} />
                        </td>
                      </tr>
                    ))}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-20 md:py-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div className="reveal flex flex-col gap-4">
              <H2>Questions</H2>
              <p className="text-[15px] text-ink-2">
                Can’t find your answer?{' '}
                <Link to={contactLink('other')} className="font-medium text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">
                  Contact us
                </Link>
                .
              </p>
            </div>
            <div className="reveal">
              <Faq items={PRICING_FAQ} />
            </div>
          </div>
        </Container>
      </section>

      <CtaSection title={['Free for agencies.', 'Custom terms for universities.']} />
    </>
  );
}
