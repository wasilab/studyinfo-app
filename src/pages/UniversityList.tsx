import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Arrow, Button } from '../components/ui/Button';
import { CtaSection, ExploreRow } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Icon } from '../components/ui/Icon';
import { ProductHero } from '../components/ui/ProductHero';
import { COUNTRIES, IS_SAMPLE, UNIVERSITIES_LIST, countryCode } from '../content/universityList';
import { contactLink } from '../content/site';
import { usePageMeta } from '../lib/usePageMeta';

const ALL = 'All';

export function UniversityList() {
  usePageMeta();
  const [params, setParams] = useSearchParams();
  const [country, setCountry] = useState(ALL);
  const [query, setQuery] = useState('');

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
      (u) => (country === ALL || u.country === country) && (!q || `${u.name} ${u.country} ${u.cities.join(' ')}`.toLowerCase().includes(q)),
    );
  }, [country, query]);

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
      />

      <section className="pt-10 md:pt-14">
        <Container>
          <div className="flex flex-col gap-4 border-b border-line pb-5 lg:flex-row lg:items-center lg:justify-between">
            <div role="tablist" aria-label="Filter by country" className="flex flex-wrap gap-1">
              {[{ name: ALL, count: UNIVERSITIES_LIST.length }, ...COUNTRIES].map((c) => (
                <button
                  key={c.name}
                  type="button"
                  role="tab"
                  aria-selected={country === c.name}
                  onClick={() => choose(c.name)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                    country === c.name ? 'bg-ink text-canvas' : 'text-ink-2 hover:bg-muted hover:text-ink'
                  }`}
                >
                  {c.name}
                  <span className={`text-[11.5px] tabular-nums ${country === c.name ? 'text-canvas/60' : 'text-ink-3'}`}>{c.count}</span>
                </button>
              ))}
            </div>
            <label className="relative w-full lg:w-64">
              <span className="sr-only">Search universities or cities</span>
              <Icon name="search" size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-ink-3" />
              <input
                id="university-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search university or city…"
                className="h-9 w-full rounded-full bg-subtle pr-3 pl-9 text-[13px] text-ink ring-1 ring-line outline-none ring-inset placeholder:text-ink-3 focus:bg-surface focus:ring-accent/50"
              />
            </label>
          </div>
          <div className="mt-5 flex items-center justify-between gap-3 text-[13px] text-ink-3">
            <p aria-live="polite" data-testid="result-count">
              {shown.length} {shown.length === 1 ? 'university' : 'universities'}
              {country !== ALL && <> in {country}</>}
            </p>
            {IS_SAMPLE && <span className="font-mono text-[10px] tracking-wider uppercase">Sample list</span>}
          </div>
        </Container>
      </section>

      <section className="pt-6 pb-20 md:pb-28">
        <Container>
          {shown.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-16 text-center">
              <p className="text-[15px] text-ink-2">No universities match your search. Try another word, or clear the filters.</p>
              <Button variant="secondary" size="sm" onClick={clear}>
                Clear filters
              </Button>
            </div>
          ) : (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {shown.map((u) => (
                <li key={`${u.country}-${u.name}`} className="reveal flex flex-col gap-5 rounded-2xl bg-subtle p-6 ring-1 ring-line transition-colors hover:bg-surface">
                  <div className="flex items-start gap-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-surface text-ink-2 ring-1 ring-line">
                      <Icon name="building" size={18} />
                    </span>
                    <div className="min-w-0">
                      <h2 className="text-[16px] leading-snug font-medium tracking-[-0.01em] text-ink">{u.name}</h2>
                      <p className="mt-1 flex items-center gap-2 text-[13px] text-ink-2">
                        <span className="rounded border border-line px-1 font-mono text-[10.5px] text-ink-2">{countryCode(u.country)}</span>
                        {u.country}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[11px] text-ink-3">{u.cities.length === 1 ? 'City' : 'Cities'}</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {u.cities.map((c) => (
                        <li key={c} className="flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-[12.5px] text-ink-2 ring-1 ring-line">
                          <Icon name="pin" size={11} className="text-ink-3" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto pt-1">
                    <Button to={`${contactLink('files')}&university=${encodeURIComponent(u.name)}`} variant="secondary" size="sm">
                      Send student file <Arrow size={12} />
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      <ExploreRow />
      <CtaSection title={['Don’t see your university?', 'Add it to the network.']} />
    </>
  );
}
