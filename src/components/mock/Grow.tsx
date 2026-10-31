import type { ReactNode } from 'react';
import { enter, useInView } from '../../lib/motion';
import { Icon, type IconName } from '../ui/Icon';
import { Chip, Window } from './Window';

/* Illustrations for the Grow with Us sales page. All of them show example data. */

/* ---------------------------------------------------------------- 1.0 Send student files */

const STOPS: { icon: IconName; label: string; who: string }[] = [
  { icon: 'send', label: 'Submitted', who: 'Your agency' },
  { icon: 'shield', label: 'Document check', who: 'StudyInfo team' },
  { icon: 'arrow', label: 'Forwarded', who: 'StudyInfo team' },
  { icon: 'file', label: 'Offer received', who: 'Applying agency' },
  { icon: 'coins', label: 'Commission', who: 'Shared by both agencies' },
];

const COMMISSION = ['Pending', 'Claimed', 'Received'];

/** One case from the student agency's side: the rail fills stop by stop, ending at commission. */
export function FileJourney() {
  const [ref, state] = useInView<HTMLDivElement>(0.35);
  const armed = state === 'armed';
  const rail = enter(state, 'transition-[scale] duration-[1800ms] ease-out-expo');

  return (
    <Window
      title={
        <>
          <Icon name="track" size={14} /> Case SI-2046 · MBA
        </>
      }
    >
      <div ref={ref} className="px-5 pt-8 pb-5 sm:px-8">
        <ol className="relative grid gap-5 md:grid-cols-5 md:gap-3">
          <span aria-hidden="true" className="absolute top-2 bottom-2 left-[18px] w-px bg-line md:hidden" />
          <span
            aria-hidden="true"
            className={`absolute top-2 bottom-2 left-[18px] w-px origin-top bg-accent md:hidden ${rail} ${armed ? 'scale-y-0' : 'scale-y-100'}`}
          />
          <span aria-hidden="true" className="absolute top-[18px] right-[10%] left-[10%] hidden h-px bg-line md:block" />
          <span
            aria-hidden="true"
            className={`absolute top-[18px] right-[10%] left-[10%] hidden h-px origin-left bg-accent md:block ${rail} ${armed ? 'scale-x-0' : 'scale-x-100'}`}
          />
          {STOPS.map((s, i) => {
            const last = i === STOPS.length - 1;
            const lit = last ? 'bg-success-soft text-success ring-success/40' : 'bg-accent-soft text-accent ring-accent/40';
            return (
              <li key={s.label} className="relative flex items-center gap-4 md:flex-col md:gap-3 md:text-center">
                <span className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full bg-surface">
                  <span
                    className={`grid size-full place-items-center rounded-full ring-1 ${armed ? 'bg-surface-2 text-ink-3 ring-line' : lit} ${enter(state, 'transition-[background-color,color,box-shadow] duration-500')}`}
                    style={state === 'in' ? { transitionDelay: `${i * 340}ms` } : undefined}
                  >
                    <Icon name={s.icon} size={16} />
                  </span>
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[13px] font-medium text-ink">{s.label}</span>
                  <span className="font-mono text-[10px] tracking-[0.06em] text-ink-3 uppercase">{s.who}</span>
                </span>
              </li>
            );
          })}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5 text-[12px]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="mr-1 text-ink-3">Commission</span>
            {COMMISSION.map((c, i) => (
              <span
                key={c}
                className={`inline-flex h-6 items-center gap-1 rounded-md px-2 font-medium ring-1 ring-inset ${
                  i === 0 ? 'bg-success-soft text-success ring-success/30' : i === 1 ? 'bg-accent-soft text-ink ring-accent/50' : 'text-ink-3 ring-line'
                } ${i === 1 ? `${enter(state, 'transition-[opacity,scale] delay-[1500ms] duration-500 ease-out-expo')} ${armed ? 'scale-90 opacity-0' : 'scale-100 opacity-100'}` : ''}`}
              >
                {i === 0 && <Icon name="check" size={11} />}
                {c}
              </span>
            ))}
          </div>
          <span className="flex items-center gap-1.5 text-ink-3">
            <Icon name="lock" size={13} /> Never shown to the student
          </span>
        </div>
      </div>
    </Window>
  );
}

/* ---------------------------------------------------------------- 2.0 Add your universities */

/** Animated dashed arrow between columns. Points down when the columns stack. */
function Connector() {
  return (
    <svg viewBox="0 0 120 16" className="mx-auto h-4 w-8 rotate-90 lg:w-24 lg:rotate-0" fill="none" aria-hidden="true">
      <line x1="0" y1="8" x2="112" y2="8" strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash stroke-accent/60" />
      <path d="M108 4l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="stroke-accent/80" />
    </svg>
  );
}

const RECEIVED = [
  { id: 'SI-2051', programme: 'MSc Cyber Security' },
  { id: 'SI-2052', programme: 'BSc Nursing' },
  { id: 'SI-2053', programme: 'MSc Finance' },
];

/** Agencies across the network send files; our team checks them; they arrive at your university. */
export function UniversityInflow() {
  return (
    <div className="grid items-center gap-4 pb-2 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,0.75fr)_auto_minmax(0,1.35fr)] lg:gap-0">
      <div className="flex flex-col items-center gap-2.5">
        {RECEIVED.map((r) => (
          <span key={r.id} className="flex w-full max-w-[230px] items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-[12px] text-ink-2 shadow-card">
            <Icon name="users" size={13} /> Student agency
            <span className="ml-auto font-mono text-[10.5px] text-ink-3">{r.id}</span>
          </span>
        ))}
        <p className="mt-1 font-mono text-[10px] tracking-[0.08em] text-ink-3 uppercase">Names hidden</p>
      </div>

      <Connector />

      <div className="flex flex-col items-center gap-3 text-center">
        <span className="grid size-14 place-items-center rounded-2xl bg-surface text-accent shadow-lift">
          <Icon name="shield" size={22} />
        </span>
        <p className="font-mono text-[11px] font-medium tracking-[0.08em] text-ink uppercase">StudyInfo team</p>
        <Chip tone="good">
          <Icon name="check" size={11} /> Document check
        </Chip>
      </div>

      <Connector />

      <Window
        title={
          <>
            <Icon name="building" size={14} /> Your university
          </>
        }
      >
        <p className="flex items-center gap-1.5 border-b border-line px-4 py-2 text-[11.5px] text-ink-3">
          <Icon name="userCheck" size={12} /> Owner: your agency
        </p>
        <ul className="divide-y divide-line">
          {RECEIVED.map((r) => (
            <li key={r.id} className="flex items-center gap-3 px-4 py-2.5 text-[12.5px]">
              <span className="font-mono text-[10.5px] text-ink-3">{r.id}</span>
              <span className="min-w-0 flex-1 truncate text-ink">{r.programme}</span>
              <Chip tone="good">Checked</Chip>
            </li>
          ))}
        </ul>
      </Window>
    </div>
  );
}

/* ---------------------------------------------------------------- 3.0 Agency toolkit */

function PostVisual() {
  return (
    <div className="w-full max-w-[200px] rounded-xl bg-surface p-2.5 text-[11px] shadow-card">
      <div className="flex h-20 flex-col justify-end rounded-lg bg-[linear-gradient(150deg,#1e2a5a,#6e8bff)] p-2.5">
        <p className="text-[12px] leading-tight font-semibold text-white">Scholarships in the UK</p>
        <p className="text-[10px] text-white/70">September 2027 intake</p>
      </div>
      <div className="mt-2.5 flex flex-wrap gap-1">
        {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((p) => (
          <span key={p} className="rounded bg-muted px-1.5 py-0.5 text-[9.5px] text-ink-2">
            {p}
          </span>
        ))}
      </div>
    </div>
  );
}

function BoostVisual() {
  const [ref, state] = useInView<HTMLDivElement>();
  return (
    <div ref={ref} className="w-full max-w-[200px] rounded-xl bg-surface p-3 text-[11px] shadow-card">
      <div className="flex items-baseline justify-between">
        <span className="font-medium text-ink">Monthly budget</span>
        <span className="font-mono text-[10px] text-ink-3">53%</span>
      </div>
      <div className="mt-2.5 h-1.5 overflow-clip rounded-full bg-muted">
        <div
          className={`h-full rounded-full bg-accent ${enter(state, 'transition-[width] duration-[1400ms] ease-out-expo')}`}
          style={{ width: state === 'armed' ? 0 : '53%' }}
        />
      </div>
      <p className="mt-3 flex items-center gap-1.5 text-ink-2">
        <Icon name="chart" size={12} className="text-accent" /> Today’s best post on Meta Ads
      </p>
    </div>
  );
}

function ChatVisual() {
  return (
    <div className="flex w-full max-w-[210px] flex-col gap-1.5 text-[11px]">
      <span className="flex items-center gap-1 text-[10px] text-ink-3">
        <Icon name="message" size={11} /> WhatsApp
      </span>
      <p className="w-fit max-w-[85%] rounded-xl rounded-bl-sm bg-surface px-2.5 py-1.5 text-ink shadow-card">Hi! UK for September 2027?</p>
      <p className="ml-auto w-fit max-w-[85%] rounded-xl rounded-br-sm bg-success-soft px-2.5 py-1.5 text-ink ring-1 ring-success/25">
        Yes! What’s your budget and English score?
      </p>
      <span className="ml-auto flex items-center gap-1 text-[10px] text-ink-3">
        <Icon name="sparkle" size={10} /> AI reply · 2:04 AM
      </span>
    </div>
  );
}

const JOURNEY = ['Interest', 'Application', 'Offer', 'Payment', 'Visa', 'Completion'];

function EnrolVisual() {
  return (
    <div className="w-full max-w-[210px] rounded-xl bg-surface p-3 text-[11px] shadow-card">
      <div className="flex items-center gap-2">
        <Chip tone="bad">HOT</Chip>
        <span className="truncate text-ink">Handed to your team</span>
      </div>
      <p className="mt-3 text-[10px] text-ink-3">Journey · UK · Sep 2027</p>
      <div className="mt-1.5 flex items-center gap-1" aria-label="At the application stage">
        {JOURNEY.map((j, i) => (
          <span key={j} title={j} className={`h-1.5 flex-1 rounded-full ${i < 2 ? 'bg-accent' : 'bg-muted'}`} />
        ))}
      </div>
      <p className="mt-1.5 text-[10px] text-ink-2">Application</p>
    </div>
  );
}

const LOOP: { num: string; title: string; text: string; tone: string; visual: ReactNode }[] = [
  {
    num: '01',
    title: 'Post',
    text: 'AI posters, videos and captions, every day.',
    tone: 'bg-[linear-gradient(160deg,rgb(110_139_255/0.18),rgb(110_139_255/0.04)_70%)]',
    visual: <PostVisual />,
  },
  {
    num: '02',
    title: 'Boost',
    text: 'Your best post, boosted daily within budget.',
    tone: 'bg-[linear-gradient(160deg,rgb(56_189_248/0.16),rgb(56_189_248/0.03)_70%)]',
    visual: <BoostVisual />,
  },
  {
    num: '03',
    title: 'Chat',
    text: 'The AI chatbot answers on WhatsApp and Messenger, day and night.',
    tone: 'bg-[linear-gradient(160deg,rgb(52_211_153/0.14),rgb(52_211_153/0.03)_70%)]',
    visual: <ChatVisual />,
  },
  {
    num: '04',
    title: 'Enrol',
    text: 'Scored leads go to your team. The CRM tracks the rest.',
    tone: 'bg-[linear-gradient(160deg,rgb(236_72_153/0.12),rgb(110_139_255/0.05)_70%)]',
    visual: <EnrolVisual />,
  },
];

/** The growth loop as four tinted cards, joined by arrows on wide screens. */
export function LeadLoop() {
  return (
    <div className="relative">
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {LOOP.map((s) => (
          <li key={s.num} className={`reveal flex min-h-[320px] flex-col justify-between gap-6 rounded-2xl p-5 ring-1 ring-line ${s.tone}`}>
            <div className="grid h-[150px] place-items-center">{s.visual}</div>
            <div>
              <p className="font-mono text-[11px] text-ink-3">{s.num}</p>
              <h3 className="mt-1 text-[17px] font-medium tracking-[-0.015em]">{s.title}</h3>
              <p className="mt-1 text-[13.5px] leading-relaxed text-ink-2">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
      {/* Arrows sit in the 12px gaps between the four columns, above the cards. */}
      {[1, 2, 3].map((k) => (
        <span
          key={k}
          aria-hidden="true"
          className="absolute top-1/2 z-10 hidden size-[22px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-canvas text-ink-3 ring-1 ring-line lg:grid"
          style={{ left: `calc((100% - 36px) / 4 * ${k} + ${12 * (k - 1) + 6}px)` }}
        >
          <Icon name="chevron" size={12} />
        </span>
      ))}
    </div>
  );
}
