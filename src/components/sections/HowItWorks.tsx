import { useEffect, useRef, useState } from 'react';
import { CHAPTERS } from '../../content/home';
import { ChapterMock } from '../mock/Mocks';
import { Container } from '../ui/Container';
import { Icon } from '../ui/Icon';
import { useSpotlight } from '../../lib/motion';
import { SpotlightGlow, SpotlightPanel } from '../ui/Panels';
import { Label, SectionHeader } from '../ui/Section';

/**
 * Scroll story: the steps scroll on the left while a pinned product window on the right
 * crossfades to the matching illustration. Below `lg` each step shows its own illustration.
 *
 * The active step is the one whose text sits closest to the middle of the pinned window, measured
 * on every scroll frame, so the image always belongs to the text beside it.
 */
export function HowItWorks() {
  const [active, setActive] = useState(0);
  const texts = useRef<(HTMLDivElement | null)[]>([]);
  const { ref: panelRef, onPointerMove } = useSpotlight<HTMLDivElement>();

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const box = panelRef.current?.getBoundingClientRect();
      // Below lg the pinned window is hidden and each step shows its own illustration.
      if (!box || box.height === 0) return;
      const line = box.top + box.height / 2;
      let next = 0;
      let nearest = Infinity;
      texts.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const distance = Math.abs(r.top + r.height / 2 - line);
        if (distance < nearest) {
          nearest = distance;
          next = i;
        }
      });
      setActive((current) => (current === next ? current : next));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, [panelRef]);

  return (
    <section className="py-20 md:py-28">
      <Container>
        <SectionHeader
          label={<Label>How it works</Label>}
          title="From student file to commission"
          text="Follow one student file from the agency that holds the student, through our team, to the agency that applies."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-16">
          <div className="relative min-w-0">
            <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-px bg-line lg:block">
              <div
                className="w-px bg-accent transition-[height] duration-700 ease-out-expo"
                style={{ height: `${((active + 1) / CHAPTERS.length) * 100}%` }}
              />
            </div>
            {CHAPTERS.map((ch, i) => (
              <div
                key={ch.num}
                data-step={i}
                className={`flex flex-col gap-4 py-10 transition-opacity duration-300 lg:min-h-[64vh] lg:justify-center lg:pl-10 ${
                  i === active ? 'lg:opacity-100' : 'lg:opacity-40'
                }`}
              >
                <div
                  ref={(el) => {
                    texts.current[i] = el;
                  }}
                  className="flex flex-col gap-4"
                >
                  <Label to={ch.to}>
                    {ch.num} {ch.label}
                  </Label>
                  <h3 className="text-[1.75rem] leading-tight font-medium tracking-[-0.025em] md:text-[2rem]">{ch.title}</h3>
                  <p className="max-w-md text-[16px] leading-relaxed text-ink-2">{ch.text}</p>
                  <ul className="mt-1 flex max-w-md flex-col gap-2.5 text-[14px] text-ink-2">
                    {ch.points.map((p) => (
                      <li key={p.title} className="flex gap-2.5">
                        <Icon name="check" size={15} className="mt-0.5 text-accent" />
                        <span>
                          <span className="font-medium text-ink">{p.title}.</span> {p.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4 lg:hidden">
                  <SpotlightPanel>
                    <ChapterMock name={ch.mock} />
                  </SpotlightPanel>
                </div>
              </div>
            ))}
          </div>

          <div className="hidden lg:block">
            <div
              ref={panelRef}
              onPointerMove={onPointerMove}
              className="group/spot sticky top-[calc(env(safe-area-inset-top,0px)+6rem)] isolate h-[min(560px,calc(100dvh_-_8rem))] overflow-hidden rounded-2xl border border-line bg-subtle"
            >
              <SpotlightGlow />
              {CHAPTERS.map((ch, i) => (
                <div
                  key={ch.num}
                  aria-hidden={i !== active}
                  className={`absolute inset-x-8 top-14 transition-[opacity,translate] ease-out-expo ${
                    // The outgoing window fades out quickly, then the new one rises in, so two never overlap.
                    i === active ? 'translate-y-0 opacity-100 delay-100 duration-500' : 'pointer-events-none translate-y-3 opacity-0 duration-200'
                  }`}
                >
                  <ChapterMock name={ch.mock} />
                </div>
              ))}
              <div className="absolute bottom-6 left-8 flex items-center gap-3">
                <span className="font-mono text-[12px] text-ink-3 tabular-nums">{CHAPTERS[active].num}</span>
                <div className="flex gap-1.5">
                  {CHAPTERS.map((ch, i) => (
                    <span key={ch.num} className={`h-1 rounded-full transition-all duration-500 ${i === active ? 'w-6 bg-accent' : 'w-2 bg-line-2'}`} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
