import { Link } from 'react-router';
import { CONTACT_EMAIL, LEGAL_ENTITY } from '../../config';
import { LEGAL_DOCS, type LegalBlock, type LegalDoc } from '../../content/legal';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { Label } from '../ui/Section';
import { WordReveal } from '../ui/WordReveal';

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/** Formats an ISO date the same way on the server and in the browser, so hydration matches. */
function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

function Body({ block }: { block: LegalBlock }) {
  if (block.type === 'ul') {
    return (
      <ul className="mt-4 flex flex-col gap-2.5 text-[15.5px] leading-relaxed text-ink-2">
        {block.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span aria-hidden="true" className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ink-3" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }
  return <p className="mt-4 text-[15.5px] leading-[1.75] text-ink-2">{block.text}</p>;
}

/** Shared layout for the refund, privacy and terms pages: header, table of contents, numbered sections and related policies. */
export function LegalPage({ doc }: { doc: LegalDoc }) {
  const others = LEGAL_DOCS.filter((d) => d.path !== doc.path);

  return (
    <article className="relative pt-14 pb-20 md:pt-20 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(60%_60%_at_50%_0%,rgb(110_139_255/0.12),transparent_70%)] print:hidden"
      />
      <Container className="relative">
        <header className="flex max-w-3xl flex-col gap-5 border-b border-line pb-10 md:pb-14">
          <Label>Legal</Label>
          <h1 className="text-[2.6rem] leading-[1.04] font-medium tracking-[-0.04em] sm:text-[3.4rem]">
            <WordReveal text={doc.title} />
          </h1>
          <p className="max-w-2xl animate-enter text-[17px] leading-relaxed text-ink-2 [animation-delay:200ms]">{doc.lead}</p>
          <p className="animate-enter font-mono text-[12px] text-ink-3 [animation-delay:280ms]">
            Last updated <time dateTime={doc.updated}>{formatDate(doc.updated)}</time>
          </p>
        </header>

        <div className="mt-10 grid gap-12 md:mt-14 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="On this page" className="print:hidden lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
            <p className="font-mono text-[12px] text-ink-3">On this page</p>
            <ol className="mt-3 flex flex-col gap-0.5 border-l border-line text-[13.5px]">
              {doc.sections.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="-ml-px flex gap-2.5 border-l border-transparent py-1.5 pl-4 text-ink-3 transition-colors hover:border-ink hover:text-ink">
                    <span className="font-mono text-[11.5px] leading-5 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                    <span className="leading-5">{s.title}</span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="max-w-[720px]">
            {doc.sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-title`} className="scroll-mt-24 border-b border-line py-9 first:pt-0 last:border-b-0">
                <h2 id={`${s.id}-title`} className="flex items-baseline gap-3 text-[1.35rem] leading-snug font-medium tracking-[-0.02em]">
                  <span className="font-mono text-[13px] font-normal text-ink-3 tabular-nums">{String(i + 1).padStart(2, '0')}</span>
                  {s.title}
                </h2>
                {s.body.map((b, j) => (
                  <Body key={j} block={b} />
                ))}
              </section>
            ))}

            <aside className="mt-10 flex flex-col gap-4 rounded-2xl bg-subtle p-6 ring-1 ring-line sm:flex-row sm:items-center sm:justify-between md:p-7 print:hidden">
              <div className="flex items-start gap-3.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-surface text-ink-2 ring-1 ring-line">
                  <Icon name="mail" size={15} />
                </span>
                <div>
                  <p className="text-[14.5px] font-medium">Questions about this policy?</p>
                  <p className="mt-0.5 text-[13.5px] text-ink-3">
                    {LEGAL_ENTITY} ·{' '}
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-ink-2 underline decoration-line-2 underline-offset-2 hover:text-ink">
                      {CONTACT_EMAIL}
                    </a>
                  </p>
                </div>
              </div>
              <Link to="/contact?type=other" className="group inline-flex shrink-0 items-center gap-1.5 text-[13.5px] font-medium text-ink hover:text-accent">
                Contact us <Icon name="arrow" size={14} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </aside>

            <div className="mt-12 print:hidden">
              <p className="font-mono text-[12px] text-ink-3">Related policies</p>
              <ul className="mt-3 divide-y divide-line border-y border-line">
                {others.map((d) => (
                  <li key={d.path}>
                    <Link to={d.path} className="group flex items-center justify-between gap-6 py-4">
                      <span className="text-[15px] font-medium tracking-[-0.01em]">{d.title}</span>
                      <Icon name="arrow" size={15} className="text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
                <li>
                  <Link to="/pricing" className="group flex items-center justify-between gap-6 py-4">
                    <span className="text-[15px] font-medium tracking-[-0.01em]">Pricing</span>
                    <Icon name="arrow" size={15} className="text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </article>
  );
}
