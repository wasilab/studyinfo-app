import { BoardMock } from '../components/mock/Mocks';
import { Button } from '../components/ui/Button';
import { CtaSection } from '../components/ui/CtaSection';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../components/ui/PageHero';
import { Label, Section, SplitHeading } from '../components/ui/Section';
import { PARTNERS } from '../content/partners';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

export function Partners() {
  usePageMeta('Partners', PARTNERS.hero.lead);
  const { logos, stories } = PARTNERS;

  return (
    <>
      <PageHero
        {...PARTNERS.hero}
        actions={
          <>
            <Button to={contactLink('agency')}>Become an agency partner</Button>
            <Button to={contactLink('university')} variant="secondary">
              Become a partner university
            </Button>
          </>
        }
      />

      <section className="pb-20 md:pb-28">
        <div className="mx-auto grid w-full max-w-[1200px] gap-4 page-x md:grid-cols-2">
          {PARTNERS.types.map((t) => (
            <article key={t.title} className="flex flex-col gap-7 rounded-2xl p-7 ring-1 ring-line md:p-10">
              <div className="flex flex-col gap-3">
                <Label>{t.label}</Label>
                <h2 className="text-[2rem] leading-tight font-medium tracking-[-0.03em]">{t.title}</h2>
                <p className="text-[16px] leading-relaxed text-ink-2">{t.text}</p>
              </div>
              <ul className="border-t border-line">
                {t.gets.map((g) => (
                  <li key={g} className="flex items-center gap-3 border-b border-line py-3.5 text-[15px]">
                    <Icon name="check" size={16} className="text-accent" />
                    {g}
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Button to={contactLink(t.cta.type)}>{t.cta.label}</Button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {logos.length > 0 && (
        <Section>
          <Label>Our partners</Label>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-3 lg:grid-cols-5">
            {logos.map((l) => (
              <div key={l.name} className="grid h-24 place-items-center bg-white p-6">
                <img src={l.src} alt={l.name} className="max-h-8 w-auto opacity-80 grayscale" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section>
        <SplitHeading
          label={<Label>How it works</Label>}
          title="From partnership to decision in four steps"
          text="Partnership terms are agreed once. After that, every student file follows the same path."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {PARTNERS.steps.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 bg-white p-6">
              <span className="font-mono text-[12px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SplitHeading
          label={<Label>Shared status</Label>}
          title="Everyone sees the same application"
          text="Agency partners, partner universities and our team follow every file on one status, from receipt to decision."
        />
        <div className="mt-12 rounded-2xl bg-subtle p-3 ring-1 ring-line sm:p-6 md:p-12">
          <div className="mx-auto max-w-[860px]">
            <BoardMock />
          </div>
        </div>
      </Section>

      {stories.length > 0 && (
        <Section>
          <SplitHeading label={<Label>Partner stories</Label>} title="In our partners’ words" />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stories.map((s) => (
              <figure key={s.partner + s.person} className="flex flex-col gap-6 rounded-2xl p-7 ring-1 ring-line">
                <span className="w-fit rounded-full bg-subtle px-2.5 py-0.5 text-[12px] text-ink-2 ring-1 ring-line">{s.kind}</span>
                <blockquote className="text-[17px] leading-relaxed tracking-[-0.01em]">“{s.quote}”</blockquote>
                <figcaption className="mt-auto text-sm">
                  <span className="font-medium">{s.person}</span>
                  <span className="text-ink-3">
                    {' '}
                    · {s.role}, {s.partner}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      <CtaSection title="Join the StudyInfo network." />
    </>
  );
}
