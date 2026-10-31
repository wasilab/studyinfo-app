import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { CHECKLIST, EXAMPLE_FILES, STATUSES, type Status } from '../../content/files';
import { useOnScreen, usePrefersReducedMotion } from '../../lib/motion';
import { Icon, type IconName } from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import { StatusIcon } from '../ui/StatusIcon';
import { ExampleTag, FileRow, StatusChip } from './Window';

const NAV: { icon: IconName; label: string; active?: boolean }[] = [
  { icon: 'inbox', label: 'Inbox' },
  { icon: 'file', label: 'Student files', active: true },
  { icon: 'sparkle', label: 'Matching' },
  { icon: 'send', label: 'Submissions' },
];

/** The demo loops: AI check running → waiting for review → verified. */
type Phase = 0 | 1 | 2;
const PHASE_MS: Record<Phase, number> = { 0: 2600, 1: 2600, 2: 4200 };
const NOTES: Record<Phase, string> = { 0: 'AI check running…', 1: 'AI check: 6 of 6 documents', 2: 'Verified just now' };
const SELECTED = 'SI-2041';

/** The large hero illustration: a StudyInfo workspace with a short, looping demo. */
export function Workspace() {
  const reduced = usePrefersReducedMotion();
  const [figureRef, onScreen] = useOnScreen<HTMLElement>();
  const [phase, setPhase] = useState<Phase>(1);
  const [cycle, setCycle] = useState(0);
  const animate = !reduced && onScreen;

  useEffect(() => {
    if (!animate) return;
    const t = window.setTimeout(() => {
      if (phase === 2) {
        setPhase(0);
        setCycle((c) => c + 1);
      } else {
        setPhase((phase + 1) as Phase);
      }
    }, PHASE_MS[phase]);
    return () => window.clearTimeout(t);
  }, [animate, phase]);

  const status: Status = phase === 2 ? 'verified' : 'review';
  const files = EXAMPLE_FILES.map((f) => (f.id === SELECTED ? { ...f, status, note: NOTES[phase] } : f));
  const selected = files.find((f) => f.id === SELECTED)!;
  const groups = STATUSES.map((s) => ({ ...s, files: files.filter((f) => f.status === s.id) }));

  // FLIP: when a row changes group, glide it from its old position to the new one.
  const listRef = useRef<HTMLDivElement>(null);
  const positions = useRef(new Map<string, number>());
  useLayoutEffect(() => {
    const rows = listRef.current?.querySelectorAll<HTMLElement>('[data-row]') ?? [];
    rows.forEach((row) => {
      const id = row.dataset.row!;
      const top = row.offsetTop;
      const before = positions.current.get(id);
      if (animate && before !== undefined && before !== top) {
        row.animate([{ transform: `translateY(${before - top}px)` }, { transform: 'translateY(0)' }], {
          duration: 700,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        });
      }
      positions.current.set(id, top);
    });
  });

  return (
    <figure
      ref={figureRef}
      role="img"
      aria-label="Example StudyInfo workspace: student files grouped by status, an AI document check and an admissions review."
      className="relative overflow-hidden rounded-xl bg-white text-left shadow-window"
    >
      <div className="grid h-[420px] md:h-[540px] md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[200px_minmax(0,1fr)_290px]">
        <aside className="hidden flex-col gap-0.5 border-r border-line bg-subtle p-3 text-[12.5px] md:flex">
          <div className="mb-3 flex items-center gap-2 px-2 py-1 font-medium text-ink">
            <LogoMark size={18} /> StudyInfo
          </div>
          {NAV.map((n) => (
            <div key={n.label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${n.active ? 'bg-white text-ink shadow-card' : 'text-ink-2'}`}>
              <Icon name={n.icon} size={14} />
              {n.label}
            </div>
          ))}
          <p className="px-2 pt-5 pb-1 text-[11px] font-medium text-ink-3">Partners</p>
          <div className="flex items-center gap-2 px-2 py-1.5 text-ink-2">
            <Icon name="users" size={14} /> Agencies
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5 text-ink-2">
            <Icon name="building" size={14} /> Universities
          </div>
          <div className="px-2 pt-6">
            <ExampleTag />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col">
          <div className="flex h-11 items-center justify-between gap-3 border-b border-line px-4">
            <div className="flex min-w-0 items-center gap-2 text-[13px] font-medium">
              Student files
              <span className="font-normal text-ink-3">{files.length}</span>
            </div>
            <div className="hidden items-center gap-1.5 sm:flex">
              <span className="rounded-md bg-muted px-2 py-0.5 text-[11.5px] text-ink">All files</span>
              <span className="rounded-md px-2 py-0.5 text-[11.5px] text-ink-3">In review</span>
              <span className="rounded-md px-2 py-0.5 text-[11.5px] text-ink-3">Missing documents</span>
            </div>
            <span className="md:hidden">
              <ExampleTag />
            </span>
          </div>
          <div ref={listRef} className="relative min-h-0 flex-1 overflow-hidden">
            {groups.map((g) => (
              <div key={g.id}>
                <div data-row={`group-${g.id}`} className="relative flex h-8 items-center gap-2 bg-subtle px-4 text-[12px] font-medium text-ink-2">
                  <StatusIcon status={g.id} />
                  {g.label}
                  <span className="font-normal text-ink-3 tabular-nums">{g.files.length}</span>
                </div>
                {g.files.map((f) => (
                  <div key={f.id} data-row={f.id} className={`relative bg-white ${f.id === SELECTED && phase === 2 && animate ? 'z-10 animate-flash' : ''}`}>
                    <FileRow file={f} active={f.id === SELECTED} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden min-w-0 flex-col gap-5 border-l border-line p-5 text-[12.5px] lg:flex">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-3">{selected.id}</span>
            <span key={status} className={animate ? 'animate-pop' : undefined}>
              <StatusChip file={selected} />
            </span>
          </div>
          <div>
            <p className="text-[15px] font-medium tracking-[-0.01em]">{selected.programme}</p>
            <dl className="mt-3 grid grid-cols-[80px_1fr] gap-y-1.5 text-ink-2">
              <dt className="text-ink-3">Student</dt>
              <dd>{selected.student}</dd>
              <dt className="text-ink-3">Intake</dt>
              <dd>{selected.intake}</dd>
              <dt className="text-ink-3">Country</dt>
              <dd className="font-mono text-[11px]">{selected.country}</dd>
            </dl>
          </div>
          <div>
            <p className="mb-2 text-[11px] font-medium text-ink-3">Documents · {phase === 0 ? 'checking' : '6 of 6'}</p>
            <ul key={cycle} className="flex flex-col gap-1.5">
              {CHECKLIST.map((d, i) => (
                <li key={d.name} className="flex items-center gap-2 text-ink-2">
                  <span className={phase === 0 && animate ? 'animate-pop' : undefined} style={phase === 0 ? { animationDelay: `${300 + i * 320}ms` } : undefined}>
                    <Icon name="check" size={13} className="text-success" />
                  </span>
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-subtle p-3 ring-1 ring-line">
            <p className="flex items-center gap-1.5 font-medium text-ink">
              <Icon name="sparkle" size={13} className="text-accent" /> AI check
            </p>
            {phase === 0 ? (
              <div key={`run-${cycle}`} className="mt-2.5">
                <p className="text-ink-3">Reading documents…</p>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                  <div className={`h-full origin-left rounded-full bg-accent ${animate ? 'animate-fill' : ''}`} />
                </div>
              </div>
            ) : (
              <p key={`done-${cycle}`} className={`mt-1.5 leading-relaxed text-ink-2 ${animate ? 'animate-enter' : ''}`}>
                All documents present. Names and dates match. IELTS 7.0 meets the programme requirement.
              </p>
            )}
          </div>
          {phase === 2 ? (
            <p key="approved" className={`mt-auto flex items-center gap-1.5 text-success ${animate ? 'animate-enter' : ''}`}>
              <Icon name="userCheck" size={14} /> Approved by admissions team
            </p>
          ) : (
            <p className="mt-auto flex items-center gap-1.5 text-ink-3">
              <span className="relative grid size-3.5 place-items-center">
                {phase === 1 && <span className="absolute size-2 animate-ping-soft rounded-full bg-st-review" />}
                <span className="size-2 rounded-full bg-st-review" />
              </span>
              Waiting for admissions review
            </p>
          )}
        </aside>
      </div>

      {phase === 2 && (
        <div
          key={`toast-${cycle}`}
          className={`absolute right-4 bottom-4 z-20 flex items-center gap-3 rounded-xl bg-white py-3 pr-4 pl-3 text-[12.5px] shadow-lift ${animate ? 'animate-toast' : ''}`}
        >
          <span className="grid size-6 place-items-center rounded-full bg-success text-white">
            <Icon name="check" size={13} />
          </span>
          <span>
            <span className="block font-medium text-ink">{SELECTED} verified</span>
            <span className="block text-ink-3">Ready for programme matching</span>
          </span>
        </div>
      )}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-20 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff)]" />
    </figure>
  );
}
