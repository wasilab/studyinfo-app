import type { CSSProperties, ReactNode, Ref } from 'react';
import { CHECKLIST, REQUIRED_DOCUMENTS } from '../../content/files';
import { useInView, type InViewState } from '../../lib/motion';
import { Icon, type IconName } from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import { StatusIcon } from '../ui/StatusIcon';
import { ApplicationPdfMock, SentMock } from './Mocks';
import { Chip, StatusChip } from './Window';

function MiniCard({ children, className = '', innerRef }: { children: ReactNode; className?: string; innerRef?: Ref<HTMLDivElement> }) {
  return (
    <div ref={innerRef} className={`rounded-xl bg-surface text-[12px] shadow-card ${className}`}>
      {children}
    </div>
  );
}

/**
 * Classes for an in-view entrance: the start state is applied instantly while 'armed', and the
 * transition only runs once the element is 'in' view.
 */
const enter = (state: InViewState, transition: string) => (state === 'in' ? transition : '');
const pop = (state: InViewState) =>
  state === 'armed' ? 'scale-50 opacity-0' : `${enter(state, 'transition-[opacity,scale] duration-500 ease-out-expo')} scale-100 opacity-100`;

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

function Hidden({ width = 'w-16' }: { width?: string }) {
  return <span aria-hidden="true" className={`inline-block h-2 rounded-full bg-ink-3/40 ${width}`} />;
}

/* ---------------------------------------------------------------- Send student files */

export function MiniChecklist() {
  const [ref, state] = useInView<HTMLDivElement>();
  return (
    <MiniCard innerRef={ref} className="w-full max-w-[300px]">
      <MiniHead icon="file" title="Required documents" meta="SI-2041" />
      <ul className="divide-y divide-line">
        {REQUIRED_DOCUMENTS.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2.5 px-3.5 py-2">
            <span className={pop(state)} style={{ transitionDelay: `${150 + i * 140}ms` }}>
              <Icon name="check" size={13} className="text-success" />
            </span>
            <span className="flex-1 truncate text-ink">{d.name}</span>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniAnonymous() {
  const side = (role: string, icon: IconName) => (
    <MiniCard className="flex w-[118px] flex-col items-center gap-2 p-3 text-center">
      <span className="grid size-8 place-items-center rounded-full bg-muted text-ink-2">
        <Icon name={icon} size={15} />
      </span>
      <span className="font-medium text-ink">{role}</span>
      <Hidden width="w-14" />
      <Hidden width="w-10" />
    </MiniCard>
  );
  return (
    <div className="flex items-center gap-3">
      {side('Student agency', 'users')}
      <span className="flex flex-col items-center gap-1.5 text-ink-3">
        <span className="grid size-8 place-items-center rounded-full bg-accent-soft text-accent">
          <Icon name="lock" size={14} />
        </span>
        <span className="text-[10.5px] whitespace-nowrap">Names hidden</span>
      </span>
      {side('Applying agency', 'building')}
    </div>
  );
}

const SENT_ROWS: { id: string; status: 'returned' | 'forwarded' | 'offer'; text: string; unread: number }[] = [
  { id: 'SI-2042', status: 'returned', text: 'BEng Mechanical Engineering', unread: 2 },
  { id: 'SI-2043', status: 'forwarded', text: 'MSc Finance', unread: 0 },
  { id: 'SI-2044', status: 'offer', text: 'MSc Public Health', unread: 1 },
];

export function MiniSent({ title = 'Sent Applications' }: { title?: string }) {
  return (
    <MiniCard className="w-full max-w-[310px]">
      <MiniHead icon="send" title={title} meta="3 unread" />
      <ul className="divide-y divide-line">
        {SENT_ROWS.map((r) => (
          <li key={r.id} className="flex items-center gap-2.5 px-3.5 py-2.5">
            <StatusIcon status={r.status} />
            <span className="font-mono text-[10.5px] text-ink-3">{r.id}</span>
            <span className="min-w-0 flex-1 truncate text-ink">{r.text}</span>
            {r.unread > 0 && <span className="grid h-4 min-w-4 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-canvas">{r.unread}</span>}
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniWithdraw() {
  return (
    <MiniCard className="w-full max-w-[290px] p-4">
      <div className="flex items-center gap-2">
        <StatusIcon status="submitted" />
        <span className="font-mono text-[10.5px] text-ink-3">SI-2045</span>
        <span className="truncate text-ink">BA International Relations</span>
      </div>
      <p className="mt-3 leading-relaxed text-ink-2">Plans changed? You can withdraw a file at any point.</p>
      <div className="mt-4 flex gap-2">
        <span className="rounded-full px-3 py-1.5 text-ink-2 ring-1 ring-line-2">Keep file</span>
        <span className="rounded-full bg-danger-soft px-3 py-1.5 text-danger ring-1 ring-danger/30">Withdraw</span>
      </div>
    </MiniCard>
  );
}

export function MiniStudentView() {
  return (
    <div className="w-[190px] rounded-[26px] bg-surface p-2.5 shadow-lift">
      <div className="flex flex-col gap-3 rounded-[20px] bg-canvas/70 p-4 text-[12px]">
        <span className="mx-auto h-1 w-10 rounded-full bg-muted" />
        <span className="text-[11px] text-ink-3">Your application</span>
        <span className="font-medium text-ink">MSc Data Science</span>
        <span className="flex items-center gap-2 rounded-lg bg-warn-soft px-2.5 py-2 text-warn">
          <span className="size-1.5 shrink-0 animate-ping-soft rounded-full bg-warn" />
          Under review by our team
        </span>
        <Hidden width="w-24" />
        <Hidden width="w-16" />
      </div>
    </div>
  );
}

export function MiniRequest() {
  return (
    <MiniCard className="w-full max-w-[300px] p-4">
      <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
        <Icon name="shield" size={12} /> StudyInfo team
      </p>
      <p className="mt-2 text-[13px] font-medium text-ink">SI-2042 was returned</p>
      <ul className="mt-3 flex flex-col gap-1.5 text-ink-2">
        {['Reason: expired document', 'Note: upload a valid English test result'].map((item) => (
          <li key={item} className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-st-returned" /> {item}
          </li>
        ))}
      </ul>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
        <StatusChip file={{ status: 'returned' }} />
        <span className="text-[11px] text-ink-3">Fix and resubmit</span>
      </div>
    </MiniCard>
  );
}

/* ---------------------------------------------------------------- Add your universities */

export function MiniCatalog() {
  const rows = [
    ['MSc Finance', '£31,400', 'Sep · Jan'],
    ['MSc Data Science', '£29,900', 'Sep'],
    ['BSc Nursing', '£24,500', 'Sep'],
  ];
  return (
    <MiniCard className="w-full max-w-[310px]">
      <MiniHead icon="globe" title="Gathered from the website" />
      <ul className="divide-y divide-line">
        {rows.map(([p, fee, intake]) => (
          <li key={p} className="grid grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-3 px-3.5 py-2">
            <span className="truncate text-ink">{p}</span>
            <span className="text-ink-3 tabular-nums">{fee}</span>
            <span className="text-ink-3">{intake}</span>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniOwner() {
  return (
    <MiniCard className="w-full max-w-[280px] p-4">
      <div className="flex items-center gap-2.5">
        <span className="grid size-9 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon name="building" size={16} />
        </span>
        <span>
          <span className="block font-medium text-ink">Your university</span>
          <span className="block text-[11px] text-ink-3">Owner: your agency</span>
        </span>
      </div>
      <ul className="mt-4 flex flex-col gap-2">
        <li className="flex items-center justify-between rounded-lg bg-success-soft px-3 py-2 text-success">
          Programmes and requirements <span className="text-[11px]">You edit</span>
        </li>
        <li className="flex items-center justify-between rounded-lg px-3 py-2 text-ink-3 ring-1 ring-line">
          Other agencies
          <span className="flex items-center gap-1 text-[11px]">
            <Icon name="lock" size={11} /> Read only
          </span>
        </li>
      </ul>
    </MiniCard>
  );
}

export function MiniFields() {
  const fields = [
    ['Portfolio link', 'Text'],
    ['Work experience letter', 'Upload'],
  ];
  return (
    <MiniCard className="w-full max-w-[290px]">
      <MiniHead icon="file" title="Custom application fields" />
      <ul className="divide-y divide-line">
        {fields.map(([f, kind]) => (
          <li key={f} className="flex items-center justify-between gap-3 px-3.5 py-2.5">
            <span className="truncate text-ink">{f}</span>
            <span className="flex items-center gap-1.5">
              <Chip>{kind}</Chip>
              <Chip tone="accent">Required</Chip>
            </span>
          </li>
        ))}
      </ul>
      <p className="border-t border-line px-3.5 py-2.5 text-ink-3">+ Add a field</p>
    </MiniCard>
  );
}

export function MiniVisible() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex flex-col gap-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="flex h-7 items-center gap-1.5 rounded-full bg-surface px-2.5 text-[11px] text-ink-2 shadow-card">
            <Icon name="users" size={12} /> Student agency
          </span>
        ))}
      </div>
      <svg viewBox="0 0 40 90" className="h-[90px] w-10" fill="none" aria-hidden="true">
        {[13, 45, 77].map((y) => (
          <path key={y} d={`M0 ${y} C 22 ${y}, 22 45, 40 45`} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/50" />
        ))}
      </svg>
      <MiniCard className="w-[124px] p-3 text-center">
        <span className="mx-auto grid size-8 place-items-center rounded-lg bg-accent-soft text-accent">
          <Icon name="building" size={15} />
        </span>
        <span className="mt-2 block font-medium text-ink">Your university</span>
        <span className="mt-1 block text-[10.5px] text-ink-3">In the global catalog</span>
      </MiniCard>
    </div>
  );
}

export function MiniOffer() {
  return (
    <MiniCard className="w-full max-w-[290px] p-4">
      <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
        <Icon name="building" size={12} /> Applying agency
      </p>
      <div className="mt-3 flex items-center gap-3 rounded-lg bg-canvas/50 p-3 ring-1 ring-line">
        <Icon name="file" size={18} className="text-accent" />
        <span className="min-w-0 flex-1">
          <span className="block truncate font-mono text-[11px] text-ink">Offer_letter.pdf</span>
          <span className="block text-[11px] text-ink-3">Conditional offer</span>
        </span>
        <Icon name="check" size={14} className="text-success" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <StatusChip file={{ status: 'offer' }} />
        <span className="text-[11px] text-ink-3">Uploaded to the case</span>
      </div>
    </MiniCard>
  );
}

export function MiniSteps() {
  const steps: [string, string, boolean][] = [
    ['Applied', 'Applying agency', true],
    ['Conditional offer', 'Applying agency', true],
    ['Offer accepted', 'Student agency', false],
    ['CAS', 'Applying agency', true],
  ];
  return (
    <MiniCard className="w-full max-w-[300px] p-1.5">
      <p className="px-2.5 pt-1.5 pb-1 text-[11px] text-ink-3">Viewing as Applying agency</p>
      {steps.map(([step, owner, mine]) => (
        <div key={step} className="flex items-center gap-2.5 rounded-md px-2.5 py-2">
          <span className={`size-2 rounded-full ${mine ? 'bg-accent' : 'bg-line-2'}`} />
          <span className={`min-w-0 flex-1 truncate ${mine ? 'text-ink' : 'text-ink-3'}`}>{step}</span>
          <span className="text-[10.5px] text-ink-3">{owner}</span>
          {!mine && <Icon name="lock" size={11} className="text-ink-3" />}
        </div>
      ))}
    </MiniCard>
  );
}

/* ---------------------------------------------------------------- Case tracking */

export function MiniTimeline({ steps = ['Offer accepted', 'Payment', 'Visa', 'Commission'], current = 2 }: { steps?: string[]; current?: number }) {
  const [ref, state] = useInView<HTMLDivElement>();
  const armed = state === 'armed';
  const last = steps.length - 1;
  return (
    <MiniCard innerRef={ref} className="w-full max-w-[340px] px-4 py-5">
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink">SI-2044 · MSc Public Health</span>
        <span className="text-[10.5px] text-ink-3">Student agency</span>
      </div>
      <div className="relative mt-6 mb-1">
        <div className="absolute inset-x-2 top-[7px] h-0.5 rounded bg-muted" />
        <div
          className={`absolute top-[7px] left-2 h-0.5 rounded bg-accent ${enter(state, 'transition-[width] duration-[1600ms] ease-out-expo')}`}
          style={{ width: armed ? 0 : `calc(${(current / last) * 100}% - ${(current / last) * 16}px)` }}
        />
        <ol className="relative flex justify-between">
          {steps.map((s, i) => (
            <li key={s} className="flex w-14 flex-col items-center gap-2 first:items-start last:items-end">
              <span className="relative grid size-4 place-items-center">
                {i === current && !armed && <span className="absolute size-4 animate-ping-soft rounded-full bg-accent" />}
                <span
                  className={`relative size-3.5 rounded-full ring-2 ring-surface ${enter(state, 'transition-colors duration-500')} ${i <= current && !armed ? 'bg-accent' : 'bg-line-2'}`}
                  style={{ transitionDelay: `${i * 320}ms` }}
                />
              </span>
              <span className={`text-[10px] whitespace-nowrap ${i <= current ? 'text-ink' : 'text-ink-3'}`}>{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </MiniCard>
  );
}

export function MiniAttachment() {
  return (
    <MiniCard className="w-full max-w-[290px] p-4">
      <span className="flex items-center gap-2 text-[11px] text-ink-3">
        <Chip>Applying agency</Chip> 10:12
      </span>
      <div className="mt-2 rounded-2xl rounded-tl-md bg-muted px-3.5 py-2.5 leading-relaxed text-ink">
        CAS issued. Copy attached.
        <span className="mt-2 flex w-fit items-center gap-1.5 rounded-md bg-canvas/60 px-2 py-1 font-mono text-[10.5px] text-ink-2">
          <Icon name="paperclip" size={11} /> CAS_statement.pdf
        </span>
      </div>
      <p className="mt-2 flex items-center justify-end gap-1 text-[11px] text-ink-3">
        <Icon name="check" size={11} className="text-accent" />
        <Icon name="check" size={11} className="-ml-2 text-accent" /> Read
      </p>
    </MiniCard>
  );
}

/* ---------------------------------------------------------------- Agency toolkit */

export function MiniPdfFile() {
  return (
    <MiniCard className="flex w-full max-w-[280px] items-center gap-4 p-4">
      <div className="relative h-20 w-16 shrink-0 rounded-md bg-canvas/60 ring-1 ring-line">
        <span className="absolute top-3 left-2.5 h-1.5 w-8 rounded bg-ink-3/50" />
        <span className="absolute top-6 left-2.5 h-1.5 w-10 rounded bg-ink-3/30" />
        <span className="absolute top-9 left-2.5 h-1.5 w-7 rounded bg-ink-3/30" />
        <span className="absolute right-1.5 bottom-1.5 rounded bg-danger px-1 text-[8px] font-bold text-canvas">PDF</span>
      </div>
      <div className="min-w-0">
        <p className="truncate font-medium text-ink">A. Rahman · case file</p>
        <p className="mt-1 text-ink-3">Profile and every upload in one document</p>
        <p className="mt-2 flex items-center gap-1.5 text-accent">
          <Icon name="file" size={12} /> One click
        </p>
      </div>
    </MiniCard>
  );
}

export function MiniCsv() {
  return (
    <MiniCard className="w-full max-w-[290px]">
      <MiniHead icon="layers" title="students.csv" meta="Dry run" />
      <ul className="divide-y divide-line">
        <li className="flex items-center justify-between px-3.5 py-2">
          <span className="text-ink-2">Rows ready to import</span>
          <span className="font-mono text-ink tabular-nums">312</span>
        </li>
        <li className="flex items-center justify-between px-3.5 py-2">
          <span className="text-ink-2">Warnings to review</span>
          <span className="font-mono text-warn tabular-nums">3</span>
        </li>
      </ul>
      <div className="flex justify-end gap-2 border-t border-line px-3.5 py-2.5">
        <span className="rounded-full px-3 py-1 text-ink-2 ring-1 ring-line-2">Review</span>
        <span className="rounded-full bg-ink px-3 py-1 text-canvas">Import</span>
      </div>
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
  const [ref, state] = useInView<HTMLDivElement>();
  const min = 6.5;
  const h = (s: number) => `${(s / 9) * 100}%`;
  return (
    <MiniCard innerRef={ref} className="w-full max-w-[280px] p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-ink">IELTS sections</span>
        <Chip tone="warn">Writing below 6.5</Chip>
      </div>
      <div className="relative mt-4 flex h-[110px] items-end justify-around gap-3 border-b border-line">
        <div className="absolute inset-x-0 border-t border-dashed border-ink/50" style={{ bottom: h(min) }}>
          <span className="absolute -top-4 right-0 font-mono text-[9.5px] text-ink-3">min {min}</span>
        </div>
        {SCORES.map((s, i) => (
          <div
            key={s.label}
            className={`w-7 rounded-t-md ${enter(state, 'transition-[height] duration-[1200ms] ease-out-expo')} ${s.score < min ? 'bg-st-check' : 'bg-accent/80'}`}
            style={{ height: state === 'armed' ? 0 : h(s.score), transitionDelay: `${i * 110}ms` }}
            title={`${s.name} ${s.score}`}
          />
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

export function MiniCompare() {
  const cols = [
    ['UK', '£44.9k', 'High'],
    ['Canada', 'CAD 61k', 'Medium'],
    ['Australia', 'AUD 72k', 'High'],
  ];
  return (
    <MiniCard className="grid w-full max-w-[320px] grid-cols-3 gap-px overflow-hidden bg-line p-0">
      {cols.map(([country, cost, chance]) => (
        <div key={country} className="flex flex-col gap-2 bg-surface p-3">
          <span className="flex items-center gap-1.5 font-medium text-ink">
            <Icon name="building" size={12} className="text-ink-3" /> {country}
          </span>
          <span className="text-ink-3 tabular-nums">{cost} total</span>
          <Chip tone={chance === 'High' ? 'good' : 'warn'}>{chance}</Chip>
        </div>
      ))}
    </MiniCard>
  );
}

export function MiniInterview() {
  return (
    <MiniCard className="w-full max-w-[290px] p-4">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 font-medium text-ink">
          <Icon name="mic" size={13} className="text-accent" /> Visa interview
        </span>
        <span className="text-[11px] text-ink-3">Question 3 of 8</span>
      </div>
      <p className="mt-3 leading-relaxed text-ink-2">“Why did you choose this university?”</p>
      <div className="mt-3 flex items-center gap-3 rounded-lg bg-canvas/50 p-3 ring-1 ring-line">
        <span className="font-mono text-[18px] text-ink tabular-nums">8/10</span>
        <span className="text-[11px] leading-snug text-ink-3">Clear and specific. Mention the course modules next time.</span>
      </div>
    </MiniCard>
  );
}

export function MiniPrompt() {
  return (
    <MiniCard className="w-full max-w-[300px]">
      <div className="flex items-center gap-2 border-b border-line px-3.5 py-3 text-[12.5px] text-ink">
        <Icon name="sparkle" size={14} className="text-accent" />
        <span className="truncate">12 programmes match your answers</span>
      </div>
      <ul className="divide-y divide-line">
        {[
          ['MSc Finance', 'Great'],
          ['MSc Financial Technology', 'Good'],
          ['MSc Economics', 'Reach'],
        ].map(([p, fit]) => (
          <li key={p} className="flex items-center justify-between gap-3 px-3.5 py-2">
            <span className="truncate text-ink">{p}</span>
            <Chip tone={fit === 'Great' ? 'good' : fit === 'Good' ? 'accent' : 'warn'}>{fit}</Chip>
          </li>
        ))}
      </ul>
      <p className="flex items-center gap-1.5 border-t border-line px-3.5 py-2.5 text-ink-3">
        Ask the AI about any programme
        <span className="h-3.5 w-px animate-caret bg-ink" />
      </p>
    </MiniCard>
  );
}

export function MiniVisaReview() {
  const [ref, state] = useInView<HTMLDivElement>();
  const checks: [string, boolean][] = [
    ['Proof of funds', true],
    ['Passport validity', true],
    ['Name matches across documents', false],
  ];
  return (
    <MiniCard innerRef={ref} className="w-full max-w-[290px]">
      <MiniHead icon="shield" title="Visa document review" />
      <div className="px-3.5 pt-3">
        <div className="flex items-baseline justify-between">
          <span className="text-ink-3">Readiness</span>
          <span className="font-mono text-ink tabular-nums">82/100</span>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
          <div
            className={`h-full rounded-full bg-success/80 ${enter(state, 'transition-[width] duration-[1400ms] ease-out-expo')}`}
            style={{ width: state === 'armed' ? 0 : '82%' }}
          />
        </div>
      </div>
      <ul className="flex flex-col gap-1.5 px-3.5 py-3">
        {checks.map(([c, ok]) => (
          <li key={c} className="flex items-center gap-2">
            {ok ? <Icon name="check" size={12} className="text-success" /> : <span className="grid size-3 place-items-center rounded-full bg-warn text-[8px] font-bold text-canvas">!</span>}
            <span className={ok ? 'text-ink-2' : 'text-warn'}>{c}</span>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniLead() {
  const leads: [string, 'HOT' | 'WARM' | 'COLD', string][] = [
    ['Enquiry · UK, Sep 2027', 'HOT', 'Handed to your team'],
    ['Enquiry · Canada, Jan 2028', 'WARM', 'Follow-up sequence'],
    ['Enquiry · Australia', 'COLD', 'Nurturing'],
  ];
  return (
    <MiniCard className="w-full max-w-[310px]">
      <MiniHead icon="message" title="Chatbot leads" />
      <ul className="divide-y divide-line">
        {leads.map(([l, score, next]) => (
          <li key={l} className="flex items-center gap-2.5 px-3.5 py-2">
            <Chip tone={score === 'HOT' ? 'bad' : score === 'WARM' ? 'warn' : 'plain'}>{score}</Chip>
            <span className="min-w-0 flex-1 truncate text-ink">{l}</span>
            <span className="hidden text-[10.5px] text-ink-3 sm:block">{next}</span>
          </li>
        ))}
      </ul>
    </MiniCard>
  );
}

export function MiniBoost() {
  const [ref, state] = useInView<HTMLDivElement>();
  return (
    <MiniCard innerRef={ref} className="w-full max-w-[290px] p-4">
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-ink">Monthly ad budget</span>
        <span className="font-mono text-ink-3 tabular-nums">$64 of $120</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
        <div
          className={`h-full rounded-full bg-accent ${enter(state, 'transition-[width] duration-[1400ms] ease-out-expo')}`}
          style={{ width: state === 'armed' ? 0 : '53%' }}
        />
      </div>
      <div className="mt-4 flex items-center gap-2.5 rounded-lg bg-canvas/50 p-3 ring-1 ring-line">
        <Icon name="chart" size={15} className="text-accent" />
        <span className="leading-snug text-ink-2">Today: boosting your best post on Meta Ads</span>
      </div>
    </MiniCard>
  );
}

export function MiniApprove() {
  return (
    <MiniCard className="flex w-full max-w-[290px] gap-3 p-3">
      <div className="h-20 w-16 shrink-0 rounded-lg bg-[linear-gradient(150deg,#1e2a5a,#6e8bff)]" />
      <div className="flex min-w-0 flex-col">
        <p className="truncate font-medium text-ink">Scholarships in the UK</p>
        <p className="mt-1 line-clamp-2 text-ink-3">Poster and caption ready for Facebook and Instagram.</p>
        <div className="mt-auto flex gap-2 pt-2">
          <span className="rounded-full px-3 py-1 text-ink-2 ring-1 ring-line-2">Edit</span>
          <span className="rounded-full bg-ink px-3 py-1 text-canvas">Approve</span>
        </div>
      </div>
    </MiniCard>
  );
}

/* ---------------------------------------------------------------- How it works */

function HubNode({ icon, label, style }: { icon: IconName; label: string; style: CSSProperties }) {
  return (
    <span className="absolute flex h-7 w-[130px] items-center gap-1.5 rounded-full bg-surface px-2.5 text-[11px] whitespace-nowrap text-ink-2 shadow-card" style={style}>
      <Icon name={icon} size={12} /> {label}
    </span>
  );
}

/** Student agencies on the left, applying agencies on the right, StudyInfo in the middle. */
export function MiniHub() {
  const ys = [16, 76, 136];
  return (
    <div className="relative h-[180px] w-[380px] max-w-full scale-[0.85] sm:scale-100">
      <svg viewBox="0 0 380 180" className="absolute inset-0 size-full" fill="none">
        {ys.map((y) => (
          <path key={`l${y}`} d={`M130 ${y + 14} C 150 ${y + 14}, 150 90, 164 90`} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/50" />
        ))}
        {ys.map((y) => (
          <path key={`r${y}`} d={`M216 90 C 230 90, 230 ${y + 14}, 250 ${y + 14}`} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/50" />
        ))}
      </svg>
      {ys.map((y) => (
        <HubNode key={`a${y}`} icon="users" label="Student agency" style={{ left: 0, top: y }} />
      ))}
      {ys.map((y) => (
        <HubNode key={`u${y}`} icon="building" label="Applying agency" style={{ right: 0, top: y }} />
      ))}
      <span className="absolute top-1/2 left-1/2 grid size-[52px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl bg-surface shadow-lift">
        <span className="absolute inset-0 animate-ping-soft rounded-2xl bg-accent/20" />
        <LogoMark size={28} />
      </span>
    </div>
  );
}

const FLOW: { icon: IconName; title: string; lines: string[] }[] = [
  { icon: 'users', title: 'Student agency', lines: ['Submits the file', 'Keeps its own steps'] },
  { icon: 'shield', title: 'StudyInfo team', lines: ['Checks every document', 'Returns or forwards'] },
  { icon: 'building', title: 'Applying agency', lines: ['Applies to the university', 'Uploads the offer letter'] },
];

/** The three parties, with animated connectors and mono annotations. */
export function FlowDiagram() {
  return (
    <div className="grid gap-4 pb-6 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-start md:gap-0">
      {FLOW.map((step, i) => (
        <div key={step.title} className="contents">
          <div className="flex flex-col items-center gap-4 text-center">
            <span className={`grid size-16 place-items-center rounded-2xl bg-surface shadow-lift ${i === 1 ? 'text-accent' : 'text-ink'}`}>
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

/** Required and optional documents beside a Student Application PDF preview. */
export function ChecklistPanel() {
  return (
    <div className="grid gap-6 pb-2 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start md:gap-10">
      <ul className="flex flex-col gap-1 md:pt-2">
        {CHECKLIST.map((d) => (
          <li key={d.name} className="flex items-start justify-between gap-3 rounded-lg px-4 py-2.5">
            <span>
              <span className="block font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase">{d.name}</span>
              <span className="mt-0.5 block font-mono text-[10px] tracking-[0.06em] text-ink-3 uppercase">{d.note}</span>
            </span>
            <span className={`shrink-0 rounded-full px-2 py-0.5 font-mono text-[9.5px] tracking-[0.06em] uppercase ${d.optional ? 'text-ink-3 ring-1 ring-line' : 'bg-accent-soft text-accent'}`}>
              {d.optional ? 'Optional' : 'Required'}
            </span>
          </li>
        ))}
      </ul>
      <div className="rounded-xl bg-surface p-6 text-[13px] shadow-window">
        <p className="flex items-center gap-1.5 text-[11px] text-ink-3">
          <Icon name="file" size={12} /> Student Application PDF · SI-2041
        </p>
        <p className="mt-4 text-[16px] font-medium tracking-[-0.01em] text-ink">MSc Data Science · Sep 2027</p>
        <div className="mt-4 flex flex-col gap-2">
          {['Student profile', 'Passport', 'Academic transcripts', 'English test score', 'University fields'].map((s, i) => (
            <div key={s} className="flex items-center gap-3 rounded-md bg-canvas/50 px-3 py-2 ring-1 ring-line">
              <span className="font-mono text-[10.5px] text-ink-3">{String(i + 1).padStart(2, '0')}</span>
              <span className="text-ink-2">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-start gap-2 rounded-lg bg-subtle p-3 ring-1 ring-line">
          <Icon name="shield" size={13} className="mt-0.5 text-accent" />
          <p className="text-[12px] text-ink-2">Checked by our team before it is forwarded. No agency branding on the PDF.</p>
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

export function SendComposite() {
  return <Overlap back={<SentMock />} front={<ApplicationPdfMock />} />;
}
