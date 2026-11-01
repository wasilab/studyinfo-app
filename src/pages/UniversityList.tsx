import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { LogoMark } from '../components/ui/Logo';
import { ProductHero } from '../components/ui/ProductHero';
import { COUNTRIES, IS_SAMPLE, UNIVERSITIES_LIST, countryCode } from '../content/universityList';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

const ALL = 'All';

/** Same columns for the header and every row: university, country, campuses. */
const COLUMNS = 'grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-4 sm:grid-cols-[minmax(0,1.25fr)_minmax(0,0.8fr)_minmax(0,1.1fr)]';

export function UniversityList() {
  usePageMeta();
  const [params, setParams] = useSearchParams();
  const [country, setCountry] = useState(ALL);
  const [query, setQuery] = useState('');
  const [selectedName, setSelectedName] = useState<string | null>(null);

  // The chosen country lives in ?country= so a filtered list can be shared. It is applied after load,
  // so the first render matches the pre-rendered page.
  const requested = params.get('country');
  useEffect(() => {
    if (requested && COUNTRIES.some((c) => c.name === requested)) setCountry(requested);
  }, [requested]);

  const choose = (next: string) => {
    setCountry(next);
    setParams(next === ALL ? {} : { country: next }, { replace: true });
  };

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return UNIVERSITIES_LIST.filter(
      (u) => (country === ALL || u.country === country) && (!q || `${u.name} ${u.country} ${u.campuses.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [country, query]);

  // The first university is selected until the visitor picks one, and again if their pick is filtered out.
  const selected = shown.find((u) => u.name === selectedName) ?? shown[0];

  const clear = () => {
    setQuery('');
    choose(ALL);
  };

  return (
    <>
      <ProductHero
        label="Universities"
        title="Find a university for your student"
        lead="Browse universities by country, then send your student’s file through StudyInfo to an agency that can apply."
        backdrop="cards"
      >
        <Button to={contactLink('files')}>
          Send student file <Arrow />
        </Button>
      </ProductHero>

      <section className="py-14 md:py-20">
        <Container>
          <div className="reveal overflow-hidden rounded-xl bg-surface text-left shadow-window">
            <div className="grid md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[210px_minmax(0,1fr)_300px]">
              <aside className="flex flex-col gap-0.5 border-b border-line bg-subtle p-3 text-[12.5px] md:border-r md:border-b-0">
                <div className="mb-2 hidden items-center gap-2 px-2 py-1 font-medium text-ink md:flex">
                  <LogoMark size={18} /> StudyInfo
                </div>
                <p className="hidden px-2 pb-1 text-[11px] font-medium text-ink-3 md:block">Country</p>
                <div role="tablist" aria-label="Filter by country" className="flex flex-wrap gap-1 md:flex-col md:gap-0.5">
                  {[{ name: ALL, count: UNIVERSITIES_LIST.length }, ...COUNTRIES].map((c) => {
                    const on = country === c.name;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        role="tab"
                        aria-selected={on}
                        onClick={() => choose(c.name)}
                        className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-left transition-colors ${
                          on ? 'bg-surface-2 text-ink shadow-card' : 'text-ink-2 hover:bg-white/5 hover:text-ink'
                        }`}
                      >
                        <Icon name={c.name === ALL ? 'globe' : 'pin'} size={14} className={on ? 'text-accent' : 'text-ink-3'} />
                        <span className="flex-1">{c.name === ALL ? 'All countries' : c.name}</span>
                        <span className="text-[11.5px] text-ink-3 tabular-nums">{c.count}</span>
                      </button>
                    );
                  })}
                </div>
                {IS_SAMPLE && <p className="mt-4 hidden px-2 font-mono text-[10px] tracking-wider text-ink-3 uppercase md:block">Sample list</p>}
              </aside>

              <div className="min-w-0 border-line lg:border-r">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line px-4 py-3">
                  <p className="text-[13.5px] font-medium text-ink" aria-live="polite" data-testid="result-count">
                    Universities <span className="ml-1 font-normal text-ink-3 tabular-nums">{shown.length}</span>
                    {country !== ALL && <span className="font-normal text-ink-3"> · {country}</span>}
                  </p>
                  <label className="relative w-full sm:w-60">
                    <span className="sr-only">Search universities or campuses</span>
                    <Icon name="search" size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-ink-3" />
                    <input
                      id="university-search"
                      type="search"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search university or campus…"
                      className="h-8 w-full rounded-full bg-canvas pr-3 pl-9 text-[12.5px] text-ink ring-1 ring-line outline-none ring-inset placeholder:text-ink-3 focus:ring-accent/50"
                    />
                  </label>
                </div>

                <div className={`${COLUMNS} h-9 bg-surface-2 px-4 text-[12px] font-medium text-ink-2`}>
                  <span>University</span>
                  <span className="hidden sm:block">Country</span>
                  <span className="text-right sm:text-left">Campuses</span>
                </div>

                {shown.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 px-4 py-16 text-center">
                    <p className="text-[14px] text-ink-2">No universities match your search.</p>
                    <Button variant="secondary" size="sm" onClick={clear}>
                      Clear filters
                    </Button>
                  </div>
                ) : (
                  <ul className="max-h-[560px] divide-y divide-line overflow-y-auto" aria-label="Universities">
                    {shown.map((u) => {
                      const on = u === selected;
                      return (
                        <li key={`${u.country}-${u.name}`}>
                          <button
                            type="button"
                            aria-pressed={on}
                            data-university={u.name}
                            onClick={() => setSelectedName(u.name)}
                            className={`${COLUMNS} min-h-11 w-full px-4 py-2 text-left text-[12.5px] transition-colors ${on ? 'bg-muted/70' : 'hover:bg-white/[0.03]'}`}
                          >
                            <span className="flex min-w-0 items-center gap-2.5">
                              <Icon name="building" size={14} className={on ? 'text-accent' : 'text-ink-3'} />
                              <span className="truncate text-ink">{u.name}</span>
                            </span>
                            <span className="hidden items-center gap-2 text-ink-2 sm:flex">
                              <span className="rounded border border-line px-1 font-mono text-[10px] text-ink-2">{countryCode(u.country)}</span>
                              <span className="truncate">{u.country}</span>
                            </span>
                            <span className="truncate text-right text-ink-3 sm:text-left">{u.campuses.join(' · ') || '—'}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {selected && (
                <aside className="border-t border-line p-5 text-[12.5px] md:col-span-2 lg:col-span-1 lg:border-t-0" aria-label="University details" data-testid="details">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-mono text-[11px] text-ink-3">University</span>
                    <span className="inline-flex h-6 items-center gap-1.5 rounded-md px-2 text-[11.5px] font-medium text-ink-2 ring-1 ring-line ring-inset">
                      <span className="rounded border border-line px-1 font-mono text-[10px]">{countryCode(selected.country)}</span>
                      {selected.country}
                    </span>
                  </div>
                  <h2 className="mt-4 text-[17px] leading-snug font-medium tracking-[-0.015em] text-ink">{selected.name}</h2>
                  <dl className="mt-4 grid grid-cols-[72px_1fr] gap-y-2">
                    <dt className="text-ink-3">Country</dt>
                    <dd className="text-ink">{selected.country}</dd>
                    <dt className="text-ink-3">Campuses</dt>
                    <dd className="text-ink">{selected.campuses.length}</dd>
                  </dl>
                  {selected.description && <p className="mt-5 text-[13px] leading-relaxed text-ink-2">{selected.description}</p>}
                  <p className="mt-5 mb-2 text-[11px] text-ink-3">Campuses</p>
                  <ul className="flex flex-col gap-1.5">
                    {selected.campuses.map((c) => (
                      <li key={c} className="flex items-center gap-2 text-ink">
                        <Icon name="pin" size={13} className="text-accent" />
                        {c}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-start gap-2 rounded-lg bg-subtle p-3 ring-1 ring-line">
                    <Icon name="shield" size={13} className="mt-0.5 shrink-0 text-accent" />
                    <p className="text-ink-2">Send a student’s file for this university and our team checks it before it moves.</p>
                  </div>
                  <div className="mt-4">
                    <Button to={`${contactLink('files')}&university=${encodeURIComponent(selected.name)}`} size="sm">
                      Send student file <Arrow size={12} />
                    </Button>
                  </div>
                </aside>
              )}
            </div>
          </div>
        </Container>
      </section>

      <ExploreRow />
      <CtaSection title={['Don’t see your university?', 'Add it to the network.']} />
    </>
  );
}
