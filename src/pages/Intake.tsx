import { FileCheckMock, IntakeMock, MissingMock } from '../components/mock/Mocks';
import { Button } from '../components/ui/Button';
import { CtaSection } from '../components/ui/CtaSection';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../components/ui/PageHero';
import { H2, Label, Section, SplitHeading } from '../components/ui/Section';
import { StatusIcon } from '../components/ui/StatusIcon';
import { CHECKLIST, STATUSES } from '../content/files';
import { INTAKE } from '../content/intake';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

export function Intake() {
  usePageMeta('Intake', INTAKE.hero.lead);

  return (
    <>
      <PageHero
        {...INTAKE.hero}
        actions={
          <>
            <Button to={contactLink('files')}>Submit student files</Button>
            <Button to={contactLink('agency')} variant="secondary">
              Become an agency partner
            </Button>
          </>
        }
      >
        <div className="mt-14 grid items-start gap-5 md:mt-16 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <IntakeMock />
          <FileCheckMock />
        </div>
      </PageHero>

      <Section>
        <SplitHeading
          label={<Label>1.0 Flow</Label>}
          title="From agency to verified in four steps"
          text="Every file follows the same path, so agencies know what to expect and universities receive files they can assess."
        />
        <ol className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
          {INTAKE.flow.map((s, i) => (
            <li key={s.title} className="flex flex-col gap-2 bg-white p-6">
              <span className="font-mono text-[12px] text-ink-3">1.{i + 1}</span>
              <h3 className="text-[15px] font-medium tracking-[-0.01em]">{s.title}</h3>
              <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SplitHeading
          label={<Label>2.0 Statuses</Label>}
          title="Always know where a file stands"
          text="Every file carries one status, shared by the agency, the university and our team."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {STATUSES.map((s) => (
            <div key={s.id} className="flex flex-col gap-2 bg-white p-6">
              <span className="flex items-center gap-2 text-[15px] font-medium tracking-[-0.01em]">
                <StatusIcon status={s.id} className="size-4" />
                {s.label}
              </span>
              <p className="text-sm leading-relaxed text-ink-2">{s.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-start gap-5">
            <Label>3.0 Checklist</Label>
            <H2>What a complete student file includes</H2>
            <p className="max-w-md text-[16px] leading-relaxed text-ink-2">
              Requirements vary by programme. We confirm the exact list with each partner university and check every file against it.
            </p>
            <Button to="/now/what-a-complete-student-file-includes" variant="secondary">
              Read the guide <Icon name="arrow" size={15} />
            </Button>
          </div>
          <ul className="grid gap-px self-start overflow-hidden rounded-xl bg-line ring-1 ring-line sm:grid-cols-2">
            {CHECKLIST.map((c) => (
              <li key={c.name} className="flex gap-3 bg-white p-5">
                <Icon name="file" size={18} className="mt-0.5 text-ink-3" />
                <div>
                  <p className="text-[14px] font-medium">{c.name}</p>
                  <p className="text-[13px] text-ink-3">{c.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-5">
            <Label>4.0 Missing documents</Label>
            <H2>{INTAKE.missing.title}</H2>
            <p className="max-w-md text-[16px] leading-relaxed text-ink-2">{INTAKE.missing.text}</p>
          </div>
          <div className="rounded-2xl bg-subtle p-3 ring-1 ring-line sm:p-8">
            <MissingMock />
          </div>
        </div>
      </Section>

      <CtaSection title="Send your first student file." text="Agency partners join free. Every file is checked by AI and our admissions team." />
    </>
  );
}
