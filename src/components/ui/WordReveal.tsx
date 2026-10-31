import { Fragment } from 'react';

/** Headline text that sharpens into place word by word on load. */
export function WordReveal({ text, delay = 0, step = 55 }: { text: string; delay?: number; step?: number }) {
  const words = text.split(' ');
  return (
    <>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block animate-word" style={{ animationDelay: `${delay + i * step}ms` }}>
            {word}
          </span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </>
  );
}
