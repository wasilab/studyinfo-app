import { useId, useState } from 'react';

/** Accordion with animated open and close. One answer is open at a time. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  const id = useId();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-center justify-between gap-6 py-5 text-left text-[15px] font-medium tracking-[-0.01em] text-ink"
              >
                {f.q}
                <span aria-hidden="true" className={`relative grid size-6 shrink-0 place-items-center rounded-full transition-colors duration-300 ${isOpen ? 'bg-accent-soft text-accent' : 'text-ink-3 group-hover:bg-muted'}`}>
                  <span className="absolute h-px w-2.5 bg-current" />
                  <span className={`absolute h-2.5 w-px bg-current transition-transform duration-300 ease-out-expo ${isOpen ? 'rotate-90' : ''}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-a${i}`}
              role="region"
              aria-labelledby={`${id}-q${i}`}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-out-expo ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <p className="max-w-2xl pb-5 text-[15px] leading-relaxed text-ink-2">{f.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
