import { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { CtaSection } from '../components/ui/Closers';
import { Container } from '../components/ui/Container';
import { Cover } from '../components/ui/Cover';
import { Icon } from '../components/ui/Icon';
import { POSTS, readingTime, type Post } from '../content/posts';
import { usePageMeta } from '../lib/usePageMeta';

type Filter = 'All' | Post['category'];
const FILTERS: Filter[] = ['All', 'Guide', 'How we work'];
const FILTER_LABEL: Record<Filter, string> = { All: 'All', Guide: 'Guides', 'How we work': 'How we work' };

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex items-center gap-2 text-[12px] text-ink-3">
      <span>{post.category}</span>
      <span aria-hidden="true">·</span>
      <span>{readingTime(post)} min read</span>
    </p>
  );
}

export function Now() {
  usePageMeta('Now', 'Practical guidance for agencies and universities, and notes on how StudyInfo works.');
  const [filter, setFilter] = useState<Filter>('All');
  const [query, setQuery] = useState('');

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return POSTS.map((post, index) => ({ post, index })).filter(
      ({ post }) => (filter === 'All' || post.category === filter) && (!q || `${post.title} ${post.excerpt}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <>
      <section className="pt-16 md:pt-24">
        <Container>
          <h1 className="animate-enter text-[2.75rem] leading-none font-medium tracking-[-0.04em] md:text-[3.5rem]">Now</h1>
          <p className="mt-4 max-w-xl animate-enter text-[17px] text-ink-2 [animation-delay:80ms]">
            Practical guidance for agencies and universities, and notes on how we work.
          </p>
          <div className="mt-10 flex animate-enter flex-col gap-4 border-b border-line pb-5 [animation-delay:160ms] sm:flex-row sm:items-center sm:justify-between">
            <div role="tablist" aria-label="Filter by category" className="flex flex-wrap gap-1">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  role="tab"
                  aria-selected={filter === f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${filter === f ? 'bg-ink text-white' : 'text-ink-2 hover:bg-muted hover:text-ink'}`}
                >
                  {FILTER_LABEL[f]}
                </button>
              ))}
            </div>
            <label className="relative w-full sm:w-64">
              <span className="sr-only">Search guides</span>
              <Icon name="search" size={14} className="absolute top-1/2 left-3 -translate-y-1/2 text-ink-3" />
              <input
                id="now-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="h-9 w-full rounded-full bg-subtle pr-3 pl-9 text-[13px] text-ink ring-1 ring-line outline-none ring-inset placeholder:text-ink-3 focus:bg-white focus:ring-accent/50"
              />
            </label>
          </div>
        </Container>
      </section>

      <section className="pt-10 pb-20 md:pb-28">
        <Container>
          {shown.length === 0 ? (
            <p className="py-16 text-center text-[15px] text-ink-2">No guides match “{query}”. Try another word, or clear the search.</p>
          ) : (
            <div className="grid gap-y-12 sm:grid-cols-2 sm:gap-x-12 lg:grid-cols-3">
              {shown.map(({ post, index }, i) => (
                <Link
                  key={post.slug}
                  to={`/now/${post.slug}`}
                  className={`group reveal relative flex flex-col gap-4 before:absolute before:inset-y-0 before:-left-6 before:hidden before:w-px before:bg-line ${
                    i % 2 === 1 ? 'sm:before:block' : ''
                  } ${i % 3 === 0 ? 'lg:before:hidden' : 'lg:before:block'}`}
                >
                  <Cover variant={index} className="aspect-[16/9] rounded-xl ring-1 ring-line transition-[box-shadow] duration-300 group-hover:shadow-lift" />
                  <h2 className="text-[17px] leading-snug font-medium tracking-[-0.015em] text-ink">{post.title}</h2>
                  <p className="line-clamp-3 text-sm leading-relaxed text-ink-2">{post.excerpt}</p>
                  <div className="mt-auto pt-2">
                    <PostMeta post={post} />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="border-t border-line py-20 md:py-24">
        <Container>
          <h2 className="reveal text-[1.75rem] font-medium tracking-[-0.025em]">All guides</h2>
          <ul className="reveal mt-8 border-t border-line">
            {POSTS.map((post) => (
              <li key={post.slug} className="border-b border-line">
                <Link to={`/now/${post.slug}`} className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                  <span className="text-[14px] font-medium text-ink transition-colors group-hover:text-accent">{post.title}</span>
                  <PostMeta post={post} />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}
