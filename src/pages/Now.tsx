import { Link } from 'react-router';
import { Container } from '../components/ui/Container';
import { Cover } from '../components/ui/Cover';
import { CtaSection } from '../components/ui/CtaSection';
import { Icon } from '../components/ui/Icon';
import { PageHero } from '../components/ui/PageHero';
import { POSTS, readingTime, type Post } from '../content/posts';
import { usePageMeta } from '../lib/usePageMeta';

export function PostMeta({ post }: { post: Post }) {
  return (
    <p className="flex items-center gap-2 font-mono text-[12px] text-ink-3">
      <span>{post.category}</span>
      <span aria-hidden="true">·</span>
      <span>{readingTime(post)} min read</span>
    </p>
  );
}

export function Now() {
  const lead = 'Practical guidance for agencies and universities, and notes on how we work.';
  usePageMeta('Now', lead);
  const [featured, ...rest] = POSTS;

  return (
    <>
      <PageHero label="Now" title="Guides and notes from StudyInfo" lead={lead} />

      <Container className="pb-20 md:pb-28">
        <Link
          to={`/now/${featured.slug}`}
          className="group grid overflow-hidden rounded-2xl ring-1 ring-line transition-shadow hover:shadow-window md:grid-cols-2"
        >
          <Cover variant={0} className="aspect-[16/10] md:aspect-auto md:min-h-[340px]" />
          <div className="flex flex-col justify-center gap-4 p-7 md:p-12">
            <PostMeta post={featured} />
            <h2 className="text-[1.9rem] leading-tight font-medium tracking-[-0.03em]">{featured.title}</h2>
            <p className="text-[16px] leading-relaxed text-ink-2">{featured.excerpt}</p>
            <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium">
              Read the guide <Icon name="arrow" size={15} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </Link>

        <div className="mt-6 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((post, i) => (
            <Link key={post.slug} to={`/now/${post.slug}`} className="group flex flex-col gap-4">
              <Cover variant={i + 1} className="aspect-[16/10] rounded-xl ring-1 ring-line transition-shadow group-hover:shadow-window" />
              <PostMeta post={post} />
              <h3 className="text-[17px] leading-snug font-medium tracking-[-0.015em] group-hover:underline group-hover:decoration-line-2 group-hover:underline-offset-4">
                {post.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-2">{post.excerpt}</p>
            </Link>
          ))}
        </div>
      </Container>

      <CtaSection />
    </>
  );
}
