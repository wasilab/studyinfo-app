import raw from '../data/universities.json';

/**
 * The universities agencies can browse on /universities, read from src/data/universities.json.
 * The file is either an array of { name, country, campuses (or cities), description? } or { "sample": true, "universities": [...] }.
 * Set "sample" to true to show a "Sample list" tag on the page; leave it out for real data.
 */
export interface University {
  name: string;
  country: string;
  /** The campuses, usually city names. The JSON may call this "campuses" or "cities". */
  campuses: string[];
  /** Optional short description, shown when the university is selected. */
  description?: string;
}

interface RawUniversity {
  name: string;
  country: string;
  campuses?: string[];
  cities?: string[];
  description?: string;
}

interface Source {
  sample?: boolean;
  universities: RawUniversity[];
}

const source: Source = Array.isArray(raw) ? { universities: raw as RawUniversity[] } : (raw as Source);

export const IS_SAMPLE = source.sample === true;

export const UNIVERSITIES_LIST: University[] = source.universities
  .map((u) => ({
    name: u.name.trim(),
    country: u.country.trim(),
    campuses: (u.campuses ?? u.cities ?? []).map((c) => c.trim()).filter(Boolean),
    description: u.description?.trim() || undefined,
  }))
  .sort((a, b) => a.country.localeCompare(b.country) || a.name.localeCompare(b.name));

/** Countries with how many universities each has, sorted by name. */
export const COUNTRIES: { name: string; count: number }[] = [...UNIVERSITIES_LIST.reduce((m, u) => m.set(u.country, (m.get(u.country) ?? 0) + 1), new Map<string, number>())]
  .map(([name, count]) => ({ name, count }))
  .sort((a, b) => a.name.localeCompare(b.name));

/** Two-letter-style badge for a country, such as "UK" or "CA". */
export function countryCode(country: string) {
  const known: Record<string, string> = { 'united kingdom': 'UK', 'united states': 'US', 'united arab emirates': 'AE', 'new zealand': 'NZ' };
  const k = known[country.toLowerCase()];
  if (k) return k;
  const words = country.split(/\s+/).filter(Boolean);
  return (words.length > 1 ? words.map((w) => w[0]).join('') : country.slice(0, 2)).toUpperCase();
}
