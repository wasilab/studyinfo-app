import type { ReactNode } from 'react';
import { useSpotlight } from '../../lib/motion';

/** Top spotlight, a hairline highlight and a pointer-following light. Needs a `group/spot` parent. */
export function SpotlightGlow() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[75%] bg-[radial-gradient(55%_70%_at_50%_0%,rgb(140_160_255/0.20),rgb(110_139_255/0.06)_45%,transparent_75%)]" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-[linear-gradient(to_right,transparent,rgb(160_178_255/0.55),transparent)]" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100 bg-[radial-gradient(460px_circle_at_var(--sx,50%)_var(--sy,0%),rgb(110_139_255/0.13),transparent_65%)]"
      />
    </>
  );
}

/**
 * Large rounded panel with a soft top spotlight and a light that follows the pointer,
 * holding a product illustration and a caption in the bottom-left corner.
 */
export function SpotlightPanel({
  children,
  title,
  text,
  inner = 'max-w-[880px]',
  className = '',
}: {
  children: ReactNode;
  title?: string;
  text?: string;
  inner?: string;
  className?: string;
}) {
  const { ref, onPointerMove } = useSpotlight<HTMLElement>();

  return (
    <figure
      ref={ref}
      onPointerMove={onPointerMove}
      className={`reveal group/spot relative isolate overflow-hidden rounded-2xl border border-line bg-subtle ${className}`}
    >
      <SpotlightGlow />
      <div className={`px-3 pt-10 sm:px-10 md:pt-16 ${title || text ? '' : 'pb-10 md:pb-16'}`}>
        <div className={`mx-auto ${inner}`}>{children}</div>
      </div>
      {(title || text) && (
        <figcaption className="px-6 pt-9 pb-7 sm:px-10 sm:pb-9">
          {title && <p className="text-[14px] font-medium text-ink">{title}</p>}
          {text && <p className="mt-1 max-w-md text-[14px] leading-relaxed text-ink-3">{text}</p>}
        </figcaption>
      )}
    </figure>
  );
}

export interface Feature {
  title: string;
  text: string;
  visual: ReactNode;
}

/** 2×2 grid of hairline-divided cells, each with a small illustration and a caption. */
export function FeatureGrid({ items }: { items: Feature[] }) {
  return (
    <div className="mt-3 grid gap-px overflow-clip rounded-2xl border border-line bg-line md:grid-cols-2">
      {items.map((f, i) => (
        <div key={f.title} className={`group/cell bg-canvas ${items.length % 2 === 1 && i === items.length - 1 ? 'md:col-span-2' : ''}`}>
          <div className="reveal flex h-full flex-col">
            <div className="relative grid h-[230px] place-items-center overflow-hidden px-5 pt-6 [mask-image:linear-gradient(to_bottom,black_78%,transparent)] sm:h-[250px]">
              <div className="grid w-full place-items-center transition-transform duration-700 ease-out-expo group-hover/cell:-translate-y-1.5">{f.visual}</div>
            </div>
            <div className="px-6 pt-2 pb-7 sm:px-8">
              <p className="text-[14px] font-medium text-ink">{f.title}</p>
              <p className="mt-1 max-w-sm text-[14px] leading-relaxed text-ink-3">{f.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
