import type { CSSProperties, ReactNode } from 'react';
import { CHECKLIST, STATUSES, type Status } from '../../content/files';
import { Icon, type IconName } from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import { StatusIcon } from '../ui/StatusIcon';
import { FileCheckMock, IntakeMock, ReviewMock } from './Mocks';
import { Chip, StatusChip } from './Window';

function MiniCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl bg-white text-[12px] shadow-card ${className}`}>{children}</div>;
}

function MiniHead({ icon, title, meta }: { icon: IconName; title: string; meta?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-line px-3.5 py-2.5">
      <span className="flex items-center gap-1.5 font-medium text-ink">
        <Icon name={icon} size={13} /> {title}
      </span>
      {meta && <span className="font-mono text-[10.5px] text-ink-3">{meta}</span>}
    </div>
  );
}

export function MiniChecklist() {
  return (
    <MiniCard className="w-full max-w-[300px]">
      <MiniHead icon="file" title="Documents" meta="SI-2041" />
      <ul className="divide-y divide-line">
        {CHECKLIST.slice(0, 5).map((d) => (
          <li key={d.name} className="flex items-center gap-2.5 px-3.5 py-2">
            <Icon name="check" size={13} className="text-success" />
            <span className="flex-1 truncate text-ink">{d.name}</span>
            <span className="text-ink-3">Checked</span>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniRequest() {
  return (
    <MiniCard className="w-full max-w-[300px] p-4">
      <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
        <Icon name="mail" size={12} /> To agency partner
      </p>
      <p className="mt-2 text-[13px] font-medium text-ink">SI-2042 needs 2 more documents</p>
      <ul className="mt-3 flex flex-col gap-1.5 text-ink-2">
        {['English test score', 'Second reference letter'].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-st-missing" /> {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <StatusChip file={{ status: 'missing' }} />
        <span className="text-[11px] text-ink-3">Returned with a list</span>
      </div>
    </MiniCard>
  );
}

export function MiniStatusStack({ current = 'review' }: { current?: Status }) {
  return (
    <MiniCard className="w-full max-w-[250px] p-1.5">
      <div className="flex items-center gap-2 rounded-md px-2 py-1.5 text-[11px] text-ink-3">
        <Icon name="search" size={12} /> Change status…
      </div>
      {STATUSES.map((s, i) => (
        <div key={s.id} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${s.id === current ? 'bg-muted text-ink' : 'text-ink-2'}`}>
          <StatusIcon status={s.id} />
          {s.label}
          <span className="ml-auto font-mono text-[10px] text-ink-3">{i + 1}</span>
        </div>
      ))}
    </MiniCard>
  );
}

const TILES = ['Passport', 'Transcripts', 'English test', 'Statement', 'References', 'CV'];

export function MiniPackage() {
  return (
    <div className="grid grid-cols-4 gap-2.5">
      <span className="size-16 rounded-xl bg-white opacity-40 shadow-card" />
      {TILES.map((t, i) => (
        <div
          key={t}
          className={`flex size-16 flex-col items-center justify-center gap-1 rounded-xl bg-white shadow-card ${i === 2 ? 'ring-2 ring-accent/60' : ''} ${i === 2 ? 'animate-float' : ''}`}
        >
          <Icon name="file" size={17} className={i === 2 ? 'text-accent' : 'text-ink-2'} />
          <span className="max-w-[3.6rem] truncate text-[9px] text-ink-3">{t}</span>
        </div>
      ))}
      <span className="size-16 rounded-xl bg-white opacity-40 shadow-card" />
    </div>
  );
}

function DocCard({ title, rows }: { title: string; rows: [string, string][] }) {
  return (
    <MiniCard className="w-[128px] p-3">
      <p className="flex items-center gap-1.5 font-medium text-ink">
        <Icon name="file" size={12} /> {title}
      </p>
      <dl className="mt-2.5 flex flex-col gap-1.5">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt className="text-[10px] text-ink-3">{k}</dt>
            <dd className="w-fit rounded bg-accent-soft px-1 text-[11px] text-ink">{v}</dd>
          </div>
        ))}
      </dl>
    </MiniCard>
  );
}

export function MiniNameMatch() {
  const rows: [string, string][] = [
    ['Name', 'A. Rahman'],
    ['Date of birth', '12 Mar 2004'],
  ];
  return (
    <div className="flex items-center">
      <DocCard title="Passport" rows={rows} />
      <div className="relative w-10 sm:w-14">
        <svg viewBox="0 0 56 2" preserveAspectRatio="none" className="h-0.5 w-full">
          <line x1="0" y1="1" x2="56" y2="1" strokeWidth="2" strokeDasharray="4 4" className="animate-dash stroke-accent/60" />
        </svg>
        <span className="absolute top-1/2 left-1/2 grid size-6 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-success text-white ring-4 ring-white">
          <Icon name="check" size={12} />
        </span>
      </div>
      <DocCard title="Transcript" rows={rows} />
    </div>
  );
}

function ValidityRow({ label, until, fill, marker }: { label: string; until: string; fill: number; marker: number }) {
  return (
    <div className="flex flex-col gap-2 px-3.5 py-3">
      <div className="flex items-center justify-between gap-3">
        <span className="font-medium text-ink">{label}</span>
        <span className="flex items-center gap-1 text-ink-3">
          Valid until {until} <Icon name="check" size={12} className="text-success" />
        </span>
      </div>
      <div className="relative h-1.5 rounded-full bg-muted">
        <div className="absolute inset-y-0 left-0 rounded-full bg-success/70" style={{ width: `${fill}%` }} />
        <div className="absolute -top-1 h-3.5 w-0.5 rounded bg-ink" style={{ left: `${marker}%` }} />
      </div>
    </div>
  );
}

export function MiniExpiry() {
  return (
    <MiniCard className="w-full max-w-[300px]">
      <MiniHead icon="lock" title="Validity check" meta="SI-2041" />
      <div className="divide-y divide-line">
        <ValidityRow label="Passport" until="Jun 2032" fill={92} marker={58} />
        <ValidityRow label="English test" until="Feb 2028" fill={64} marker={40} />
      </div>
      <p className="border-t border-line px-3.5 py-2 text-[11px] text-ink-3">Marker shows when the application is assessed.</p>
    </MiniCard>
  );
}

const SCORES = [
  { label: 'R', name: 'Reading', score: 7.5 },
  { label: 'W', name: 'Writing', score: 6.0 },
  { label: 'L', name: 'Listening', score: 7.0 },
  { label: 'S', name: 'Speaking', score: 7.0 },
];

export function MiniScores() {
  const min = 6.5;
  const h = (s: number) => `${(s / 9) * 100}%`;
  return (
    <MiniCard className="w-full max-w-[280px] p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink">IELTS sections</span>
        <Chip tone="warn">Writing below 6.5</Chip>
      </div>
      <div className="relative mt-4 flex h-[110px] items-end justify-around gap-3 border-b border-line">
        <div className="absolute inset-x-0 border-t border-dashed border-ink/50" style={{ bottom: h(min) }}>
          <span className="absolute -top-4 right-0 font-mono text-[9.5px] text-ink-3">min {min}</span>
        </div>
        {SCORES.map((s) => (
          <div key={s.label} className={`w-7 rounded-t-md ${s.score < min ? 'bg-st-review' : 'bg-accent/80'}`} style={{ height: h(s.score) }} title={`${s.name} ${s.score}`} />
        ))}
      </div>
      <div className="mt-1.5 flex justify-around font-mono text-[10px] text-ink-3">
        {SCORES.map((s) => (
          <span key={s.label} className="w-7 text-center">
            {s.label} {s.score.toFixed(1)}
          </span>
        ))}
      </div>
    </MiniCard>
  );
}

export function MiniSignoff() {
  return (
    <MiniCard className="w-full max-w-[290px]">
      <div className="flex items-center gap-2.5 border-b border-line px-3.5 py-3">
        <span className="grid size-7 place-items-center rounded-full bg-ink text-[10px] font-semibold text-white">AT</span>
        <span>
          <span className="block font-medium text-ink">Admissions team</span>
          <span className="block text-[11px] text-ink-3">Reviewing SI-2043</span>
        </span>
      </div>
      <ul className="flex flex-col gap-2.5 px-3.5 py-3">
        {['Documents confirmed', 'Shortlist approved'].map((t) => (
          <li key={t} className="flex items-center gap-2 text-ink">
            <span className="grid size-4 place-items-center rounded bg-ink text-white">
              <Icon name="check" size={11} />
            </span>
            {t}
          </li>
        ))}
        <li className="flex items-center gap-2 text-ink-2">
          <span className="relative grid size-4 place-items-center">
            <span className="absolute size-2 animate-ping-soft rounded-full bg-accent" />
            <span className="size-2 rounded-full bg-accent" />
          </span>
          Ready to submit
        </li>
      </ul>
    </MiniCard>
  );
}

const STEPS: Status[] = ['received', 'review', 'verified', 'submitted', 'decision'];
const STEP_LABELS: Record<string, string> = { received: 'Received', review: 'In review', verified: 'Verified', submitted: 'Submitted', decision: 'Decision' };

export function MiniTimeline({ current = 3 }: { current?: number }) {
  return (
    <MiniCard className="w-full max-w-[340px] px-4 py-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink">SI-2044 · MSc Public Health</span>
        <span className="font-mono text-[10.5px] text-ink-3">Sep 2027</span>
      </div>
      <div className="relative mt-6 mb-1">
        <div className="absolute inset-x-2 top-[7px] h-0.5 rounded bg-muted" />
        <div className="absolute top-[7px] left-2 h-0.5 rounded bg-accent" style={{ width: `calc(${(current / (STEPS.length - 1)) * 100}% - ${(current / (STEPS.length - 1)) * 16}px)` }} />
        <ol className="relative flex justify-between">
          {STEPS.map((s, i) => (
            <li key={s} className="flex w-12 flex-col items-center gap-2 first:items-start last:items-end">
              <span className="relative grid size-4 place-items-center">
                {i === current && <span className="absolute size-4 animate-ping-soft rounded-full bg-accent" />}
                <span className={`relative size-3.5 rounded-full ring-2 ring-white ${i <= current ? 'bg-accent' : 'bg-line-2'}`} />
              </span>
              <span className={`text-[10px] whitespace-nowrap ${i <= current ? 'text-ink' : 'text-ink-3'}`}>{STEP_LABELS[s]}</span>
            </li>
          ))}
        </ol>
      </div>
    </MiniCard>
  );
}

function HubNode({ icon, label, style }: { icon: IconName; label: string; style: CSSProperties }) {
  return (
    <span className="absolute flex h-7 w-[92px] items-center gap-1.5 rounded-full bg-white px-2.5 text-[11px] text-ink-2 shadow-card" style={style}>
      <Icon name={icon} size={12} /> {label}
    </span>
  );
}

/** Agencies on the left, universities on the right, StudyInfo in the middle. */
export function MiniHub() {
  const ys = [16, 76, 136];
  return (
    <div className="relative h-[180px] w-[340px] max-w-full scale-90 sm:scale-100">
      <svg viewBox="0 0 340 180" className="absolute inset-0 size-full" fill="none">
        {ys.map((y) => (
          <path key={`l${y}`} d={`M92 ${y + 14} C 126 ${y + 14}, 126 90, 144 90`} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/50" />
        ))}
        {ys.map((y) => (
          <path key={`r${y}`} d={`M196 90 C 214 90, 214 ${y + 14}, 248 ${y + 14}`} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/50" />
        ))}
      </svg>
      {ys.map((y) => (
        <HubNode key={`a${y}`} icon="users" label="Agency" style={{ left: 0, top: y }} />
      ))}
      {ys.map((y) => (
        <HubNode key={`u${y}`} icon="building" label="University" style={{ right: 0, top: y }} />
      ))}
      <span className="absolute top-1/2 left-1/2 grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-white shadow-lift">
        <span className="absolute inset-0 animate-ping-soft rounded-2xl bg-accent/20" />
        <LogoMark size={28} />
      </span>
    </div>
  );
}

export function MiniPrompt() {
  return (
    <MiniCard className="w-full max-w-[310px]">
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-3 text-[12.5px] text-ink">
        <Icon name="sparkle" size={14} className="text-accent" />
        <span className="truncate">Match SI-2043 to January programmes</span>
        <span className="-ml-1 h-4 w-px animate-caret bg-ink" />
      </div>
      <ul className="divide-y divide-line">
        {[
          ['MSc Finance', 'Strong fit'],
          ['MSc Financial Technology', 'Strong fit'],
          ['MSc Accounting and Finance', 'Possible'],
        ].map(([p, fit]) => (
          <li key={p} className="flex items-center justify-between gap-3 px-3.5 py-2">
            <span className="truncate text-ink">{p}</span>
            <Chip tone={fit === 'Possible' ? 'warn' : 'good'}>{fit}</Chip>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

const FLOW: { icon: IconName; title: string; lines: string[] }[] = [
  { icon: 'sparkle', title: 'AI check', lines: ['Reads every document', 'Flags missing, expired or', 'mismatched items'] },
  { icon: 'userCheck', title: 'Admissions review', lines: ['Confirms each finding', 'Approves the shortlist'] },
  { icon: 'send', title: 'Submission', lines: ['Only approved files', 'reach a university'] },
];

/** Three-step flow with animated connectors and mono annotations. */
export function FlowDiagram() {
  return (
    <div className="grid gap-4 pb-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-0">
      {FLOW.map((step, i) => (
        <div key={step.title} className="contents">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className={`grid size-16 place-items-center rounded-2xl bg-white shadow-lift ${i === 1 ? 'text-accent' : 'text-ink'}`}>
              <Icon name={step.icon} size={24} />
            </span>
            <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase">{step.title}</p>
            <p className="font-mono text-[10px] leading-relaxed tracking-[0.06em] text-ink-3 uppercase">
              {step.lines.map((l) => (
                <span key={l} className="block">
                  {l}
                </span>
              ))}
            </p>
          </div>
          {i < FLOW.length - 1 && (
            <svg viewBox="0 0 120 16" className="mx-auto h-4 w-6 rotate-90 md:mt-6 md:w-28 md:rotate-0" fill="none" aria-hidden="true">
              <line x1="0" y1="8" x2="112" y2="8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/60" />
              <path d="M108 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent/80" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

/** Mono list of required documents beside a statement-of-purpose preview. */
export function ChecklistPanel() {
  return (
    <div className="grid gap-6 pb-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-10">
      <ul className="flex flex-col gap-1 md:pt-6">
        {CHECKLIST.map((d, i) => (
          <li key={d.name} className={`rounded-lg px-4 py-3 ${i === 3 ? 'bg-white shadow-card' : ''}`}>
            <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase">{d.name}</p>
            <p className="mt-0.5 font-mono text-[10px] tracking-[0.06em] text-ink-3 uppercase">{d.note}</p>
          </li>
        ))}
      </ul>
      <div className="rounded-xl bg-white p-6 text-[13px] shadow-window">
        <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
          <Icon name="file" size={12} /> SI-2043 · Statement of purpose
        </p>
        <p className="mt-4 text-[16px] font-medium tracking-[-0.01em] text-ink">Why MSc Finance</p>
        <p className="mt-3 leading-relaxed text-ink-2">
          During my BA in Economics I worked on a project modelling small-business lending, which is why the{' '}
          <span className="rounded bg-accent-soft px-0.5 text-ink">MSc Finance</span> programme’s focus on corporate finance fits my plans.
        </p>
        <p className="mt-3 leading-relaxed text-ink-3">After graduating I want to work in credit analysis for…</p>
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-subtle p-3 ring-1 ring-line">
          <Icon name="sparkle" size={13} className="mt-0.5 text-accent" />
          <p className="text-[12px] text-ink-2">Names the programme it is submitted for. Within the word limit.</p>
        </div>
      </div>
    </div>
  );
}

/** Two product windows overlapping, like a desktop with two panes open. */
function Overlap({ back, front }: { back: ReactNode; front: ReactNode }) {
  return (
    <div className="relative pb-6 md:pb-10">
      <div className="hidden w-[64%] opacity-90 md:block">{back}</div>
      <div className="md:absolute md:top-12 md:right-0 md:w-[54%]">{front}</div>
    </div>
  );
}

export function IntakeComposite() {
  return <Overlap back={<IntakeMock />} front={<FileCheckMock />} />;
}

export function ReviewComposite() {
  return <Overlap back={<FileCheckMock />} front={<ReviewMock />} />;
}
