import { Link, useParams } from 'react-router';
import { Container } from '../components/ui/Container';
import { Cover } from '../components/ui/Cover';
import { CtaSection } from '../components/ui/Closers';
import { Icon } from '../components/ui/Icon';
import { POSTS } from '../content/posts';
import { usePageMeta } from '../lib/usePageMeta';
import { NotFound } from './NotFound';
import { PostMeta } from './Now';
import { WordReveal } from '../components/ui/WordReveal';

export function Post() {
  const { slug } = useParams();
  const index = POSTS.findIndex((p) => p.slug === slug);
  const post = POSTS[index];
  usePageMeta();

  if (!post) return <NotFound />;
  const more = POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <div aria-hidden="true" className="read-progress fixed inset-x-0 top-[calc(env(safe-area-inset-top,0px)+4rem)] z-40 h-0.5 bg-accent" />
      <article className="pt-12 pb-20 md:pt-20 md:pb-28">
        <Container>
          <div className="mx-auto flex max-w-[720px] flex-col">
            <Link to="/now" className="group mb-10 inline-flex w-fit items-center gap-1.5 text-sm text-ink-3 hover:text-ink">
              <Icon name="chevron" size={14} className="rotate-180 transition-transform group-hover:-translate-x-0.5" /> Now
            </Link>
            <div className="animate-enter">
              <PostMeta post={post} />
            </div>
            <h1 className="mt-4 text-[2.4rem] leading-[1.08] font-medium tracking-[-0.035em] md:text-5xl">
              <WordReveal text={post.title} delay={80} step={40} />
            </h1>
            <p className="mt-5 animate-enter text-lg leading-relaxed text-ink-2 [animation-delay:160ms]">{post.excerpt}</p>
            <Cover variant={index} className="mt-10 aspect-[16/8] rounded-2xl ring-1 ring-line" />
            <div className="mt-6">
              {post.body.map((block, i) => {
                if (block.type === 'h2') {
                  return (
                    <h2 key={i} className="mt-12 text-[1.5rem] leading-snug font-medium tracking-[-0.02em]">
                      {block.text}
                    </h2>
                  );
                }
                if (block.type === 'ul') {
                  return (
                    <ul key={i} className="mt-5 flex flex-col gap-2.5 text-[16.5px] leading-relaxed text-ink-2">
                      {block.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[0.7em] size-1.5 shrink-0 rounded-full bg-ink-3" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p key={i} className="mt-5 text-[16.5px] leading-[1.75] text-ink-2">
                    {block.text}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="mx-auto mt-20 max-w-[720px] border-t border-line pt-10">
            <p className="font-mono text-[12px] text-ink-3">More from Now</p>
            <ul className="mt-4 divide-y divide-line">
              {more.map((p) => (
                <li key={p.slug}>
                  <Link to={`/now/${p.slug}`} className="group flex items-center justify-between gap-6 py-4">
                    <span className="text-[15px] font-medium tracking-[-0.01em]">{p.title}</span>
                    <Icon name="arrow" size={15} className="text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-ink" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </article>

      <CtaSection />
    </>
  );
}
