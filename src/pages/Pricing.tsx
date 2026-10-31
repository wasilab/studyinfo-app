import { Fragment } from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/Button';
import { Container } from '../components/ui/Container';
import { CtaSection } from '../components/ui/CtaSection';
import { Faq } from '../components/ui/Faq';
import { Icon } from '../components/ui/Icon';
import { H2, Label, Section } from '../components/ui/Section';
import { COMPARE, PLANS, PRICING_FAQ } from '../content/pricing';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

function Included({ on }: { on: boolean }) {
  return on ? (
    <>
      <Icon name="check" size={16} className="text-ink" />
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
      <section className="relative overflow-hidden pt-16 pb-14 text-center md:pt-24 md:pb-16">
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(14_15_17/0.045),transparent_70%)]" />
        <Container className="relative flex flex-col items-center gap-5">
          <Label>Pricing</Label>
          <h1 className="text-[2.75rem] leading-[1.02] font-medium tracking-[-0.045em] sm:text-6xl md:text-[4.5rem]">Free for agencies</h1>
          <p className="max-w-xl text-[17px] leading-relaxed text-ink-2 md:text-lg">
            Agency partners join StudyInfo for free. Universities partner with us on terms agreed for each partnership.
          </p>
        </Container>
      </section>

      <Container>
        <div className="mx-auto grid max-w-4xl gap-4 md:grid-cols-2">
          {PLANS.map((p) => (
            <article
              key={p.name}
              className={`flex flex-col gap-7 rounded-2xl p-7 md:p-9 ${p.featured ? 'bg-white shadow-window' : 'bg-subtle ring-1 ring-line'}`}
            >
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

      <Section className="mt-20 md:mt-28">
        <div className="flex flex-col gap-4">
          <Label>Compare</Label>
          <H2>Compare partnerships</H2>
        </div>
        <div className="relative mt-10 overflow-x-auto">
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
                    <tr key={label} className="border-b border-line">
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
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="flex flex-col gap-4">
            <Label>FAQ</Label>
            <H2>Questions</H2>
            <p className="text-[15px] text-ink-2">
              Can’t find your answer?{' '}
              <Link to={contactLink('other')} className="font-medium text-ink underline decoration-line-2 underline-offset-4 hover:decoration-ink">
                Contact us
              </Link>
              .
            </p>
          </div>
          <Faq items={PRICING_FAQ} />
        </div>
      </Section>

      <CtaSection />
    </>
  );
}
