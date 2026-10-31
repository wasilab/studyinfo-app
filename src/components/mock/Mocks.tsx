import type { ReactNode } from 'react';
import { EXAMPLE_FILES, REQUIRED_DOCUMENTS, type ExampleFile } from '../../content/files';
import type { MockName } from '../../content/home';
import { Icon, type IconName } from '../ui/Icon';
import { Chip, FileRow, StatusChip, Window } from './Window';

const byId = (id: string) => EXAMPLE_FILES.find((f) => f.id === id)!;

function Title({ icon, children }: { icon: IconName; children: ReactNode }) {
  return (
    <>
      <Icon name={icon} size={14} /> {children}
    </>
  );
}

function Tabs({ items }: { items: string[] }) {
  return (
    <div className="flex items-center gap-1.5 border-b border-line px-4 py-2 text-[11.5px]">
      {items.map((t, i) => (
        <span key={t} className={`rounded-md px-2 py-0.5 ${i === 0 ? 'bg-muted text-ink' : 'text-ink-3'}`}>
          {t}
        </span>
      ))}
    </div>
  );
}

const UNREAD: Record<string, number> = { 'SI-2042': 2, 'SI-2044': 1 };

/** The student agency's list of files sent through the network. */
export function SentMock() {
  return (
    <Window title={<Title icon="send">Sent Applications</Title>}>
      <Tabs items={['All 6', 'Returned 1', 'Unread 2']} />
      <div className="divide-y divide-line">
        {EXAMPLE_FILES.map((f) => (
          <FileRow key={f.id} file={f} unread={UNREAD[f.id]} />
        ))}
      </div>
    </Window>
  );
}

const RECEIVED: ExampleFile[] = [
  { id: 'SI-2051', student: 'F. Ahmed', programme: 'MSc Cyber Security', intake: 'Sep 2027', country: 'BD', status: 'forwarded', note: 'Checked by StudyInfo team' },
  { id: 'SI-2043', student: 'L. Nguyen', programme: 'MSc Finance', intake: 'Jan 2028', country: 'VN', status: 'forwarded', note: 'Apply before 15 Nov' },
  { id: 'SI-2052', student: 'K. Boateng', programme: 'BSc Nursing', intake: 'Sep 2027', country: 'GH', status: 'forwarded', note: 'Checked by StudyInfo team' },
  { id: 'SI-2044', student: 'P. Sharma', programme: 'MSc Public Health', intake: 'Sep 2027', country: 'IN', status: 'offer', note: 'Conditional offer uploaded' },
  { id: 'SI-2046', student: 'S. Mensah', programme: 'MBA', intake: 'Jan 2028', country: 'GH', status: 'commission', note: 'Commission claimed' },
];

/** The applying agency's list of verified files it has received. */
export function ReceivedMock() {
  return (
    <Window title={<Title icon="inbox">Received Applications</Title>}>
      <Tabs items={['All 5', 'To apply 3', 'Unread 1']} />
      <div className="divide-y divide-line">
        {RECEIVED.map((f) => (
          <FileRow key={f.id} file={f} unread={f.id === 'SI-2051' ? 1 : 0} />
        ))}
      </div>
    </Window>
  );
}

/** The Student Application PDF the platform builds from the required documents. */
export function ApplicationPdfMock() {
  const file = byId('SI-2041');
  return (
    <Window title={<Title icon="file">Student Application PDF · {file.id}</Title>}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
        <p className="text-[13px] font-medium">
          {file.programme} <span className="font-normal text-ink-3">· {file.intake}</span>
        </p>
        <StatusChip file={{ status: 'submitted' }} />
      </div>
      <ul className="mx-4 divide-y divide-line rounded-lg ring-1 ring-line">
        {REQUIRED_DOCUMENTS.map((d, i) => (
          <li key={d.name} className="flex items-center gap-2.5 px-3 py-2 text-[12px]">
            <span className="w-4 font-mono text-[10.5px] text-ink-3">{i + 1}</span>
            <span className="min-w-0 flex-1 truncate text-ink">{d.name}</span>
            <Icon name="check" size={13} className="text-success" />
          </li>
        ))}
        <li className="flex items-center gap-2.5 px-3 py-2 text-[12px] text-ink-3">
          <span className="w-4" />
          <span className="min-w-0 flex-1 truncate">Additional documents (optional): CV, statement of purpose</span>
        </li>
      </ul>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 px-4 py-3.5 text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <Icon name="layers" size={13} className="text-accent" /> Built automatically
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="lock" size={13} /> No agency branding
        </span>
      </div>
    </Window>
  );
}

type Finding = { doc: string; tone: 'good' | 'bad'; text: string };

const FINDINGS: Finding[] = [
  { doc: 'Student profile', tone: 'good', text: 'Complete' },
  { doc: 'Passport', tone: 'good', text: 'Clear copy, valid' },
  { doc: 'Academic transcripts', tone: 'good', text: 'Certified copies' },
  { doc: 'English test score', tone: 'bad', text: 'Result expired' },
  { doc: 'University fields', tone: 'good', text: '2 of 2 answered' },
];

/** A document check done by a person on the StudyInfo team. */
export function DocCheckMock() {
  const file = byId('SI-2042');
  return (
    <Window title={<Title icon="shield">Document Check · {file.id}</Title>}>
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
        <p className="text-[13px] font-medium">
          {file.programme} <span className="font-normal text-ink-3">· {file.intake}</span>
        </p>
        <StatusChip file={file} />
      </div>
      <ul className="mx-4 divide-y divide-line rounded-lg ring-1 ring-line">
        {FINDINGS.map((f) => (
          <li key={f.doc} className="flex items-center gap-2.5 px-3 py-2.5 text-[12.5px]">
            {f.tone === 'good' ? <Icon name="check" size={14} className="text-success" /> : <Icon name="close" size={14} className="text-danger" />}
            <span className="min-w-0 flex-1 truncate text-ink">{f.doc}</span>
            <span className={f.tone === 'good' ? 'text-ink-3' : 'text-danger'}>{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center gap-2 px-4 py-3.5 text-[12px] text-ink-3">
        <Icon name="userCheck" size={14} /> Checked by StudyInfo team
        <Chip tone="bad">Reason: expired document</Chip>
      </div>
    </Window>
  );
}

const THREAD: { role: string; tone: 'accent' | 'plain' | 'good'; text: string; file?: string; time: string }[] = [
  { role: 'Applying agency', tone: 'plain', text: 'Conditional offer uploaded. The condition is the final transcript.', file: 'Offer_letter.pdf', time: '10:12' },
  { role: 'Student agency', tone: 'accent', text: 'Thanks. The student sends the final transcript next week.', time: '10:40' },
  { role: 'StudyInfo team', tone: 'good', text: 'Noted. We’ll keep the case open until the condition is met.', time: '11:05' },
];

/** The three-party thread on a case, labelled by role only. */
export function ThreadMock() {
  return (
    <Window title={<Title icon="message">Case thread · SI-2044</Title>}>
      <div className="flex flex-col gap-4 p-4 sm:p-5">
        {THREAD.map((m) => (
          <div key={m.time} className={`flex max-w-[88%] flex-col gap-1.5 ${m.role === 'Student agency' ? 'self-end items-end' : 'items-start'}`}>
            <span className="flex items-center gap-2 text-[11px] text-ink-3">
              <Chip tone={m.tone}>{m.role}</Chip> {m.time}
            </span>
            <div className={`rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${m.role === 'Student agency' ? 'rounded-tr-md bg-accent/20 text-ink' : 'rounded-tl-md bg-muted text-ink'}`}>
              {m.text}
              {m.file && (
                <span className="mt-2 flex w-fit items-center gap-1.5 rounded-md bg-canvas/60 px-2 py-1 font-mono text-[10.5px] text-ink-2">
                  <Icon name="paperclip" size={11} /> {m.file}
                </span>
              )}
            </div>
          </div>
        ))}
        <p className="flex items-center justify-end gap-1 text-[11px] text-ink-3">
          <Icon name="check" size={11} className="text-accent" />
          <Icon name="check" size={11} className="-ml-2 text-accent" /> Read
        </p>
      </div>
    </Window>
  );
}

const COMMISSION_STEPS = ['Pending', 'Claimed', 'Received'];

/** The commission step at the end of a case. */
export function CommissionMock({ current = 1 }: { current?: number }) {
  return (
    <Window title={<Title icon="coins">Commission · SI-2046</Title>}>
      <div className="flex flex-col gap-5 p-5 text-[12.5px]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-medium">MBA · Jan 2028</p>
          <StatusChip file={{ status: 'commission' }} />
        </div>
        <ol className="grid grid-cols-3 gap-2">
          {COMMISSION_STEPS.map((s, i) => (
            <li
              key={s}
              className={`flex flex-col gap-1.5 rounded-lg p-3 ring-1 ${
                i < current ? 'bg-success-soft ring-success/30' : i === current ? 'bg-accent-soft ring-accent/40' : 'bg-canvas/40 ring-line'
              }`}
            >
              <span className={`font-mono text-[10.5px] ${i <= current ? 'text-ink-2' : 'text-ink-3'}`}>0{i + 1}</span>
              <span className={`font-medium ${i <= current ? 'text-ink' : 'text-ink-3'}`}>{s}</span>
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-line pt-4 text-[12px] text-ink-3">
          <span className="flex items-center gap-1.5">
            <Icon name="users" size={13} /> Visible to both agencies
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="lock" size={13} /> Never shown to the student
          </span>
        </div>
      </div>
    </Window>
  );
}

const UNIVERSITY_COMMISSIONS = [
  { university: 'Partner university, UK', terms: '15% of first-year tuition' },
  { university: 'Partner university, Canada', terms: 'CAD 2,000 fixed' },
  { university: 'Partner university, Australia', terms: '12% of first-year tuition' },
];

/** The University Commissions table owners and admins see. */
export function UniversityCommissionsMock() {
  return (
    <Window title={<Title icon="coins">University Commissions</Title>}>
      <table className="w-full text-left text-[12.5px]">
        <thead>
          <tr className="border-b border-line text-[11px] text-ink-3">
            <th className="px-4 py-2.5 font-medium">University</th>
            <th className="px-4 py-2.5 font-medium">Agency commission</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {UNIVERSITY_COMMISSIONS.map((u) => (
            <tr key={u.university}>
              <td className="px-4 py-3 text-ink">
                <span className="flex items-center gap-2">
                  <Icon name="building" size={13} className="text-ink-3" /> {u.university}
                </span>
              </td>
              <td className="px-4 py-3 text-ink-2 tabular-nums">{u.terms}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-line px-4 py-3 text-[12px] text-ink-3">Visible to your owners and admins</p>
    </Window>
  );
}

/** Requesting a university for the catalog, and the team's decision. */
export function UniversityRequestMock() {
  const fields = [
    ['University website', 'https://www.university.example'],
    ['Campus country', 'United Kingdom'],
    ['Platform share offered', 'Percentage · 10%'],
  ];
  return (
    <Window title={<Title icon="building">Request a university</Title>}>
      <div className="grid gap-px bg-line md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3 bg-surface p-5 text-[12.5px]">
          {fields.map(([k, v]) => (
            <div key={k} className="flex flex-col gap-1">
              <span className="text-[11px] text-ink-3">{k}</span>
              <span className="truncate rounded-md bg-canvas/60 px-2.5 py-1.5 text-ink ring-1 ring-line">{v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 bg-surface p-5 text-[12.5px]">
          <span className="text-[11px] text-ink-3">StudyInfo team</span>
          {[
            ['check', 'Approve', 'You become the owner'],
            ['close', 'Reject', 'With a reason'],
            ['layers', 'Link', 'If it’s already in the catalog'],
          ].map(([icon, label, text], i) => (
            <div key={label} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ring-1 ${i === 0 ? 'bg-success-soft ring-success/30' : 'ring-line'}`}>
              <Icon name={icon as IconName} size={14} className={i === 0 ? 'text-success' : 'text-ink-3'} />
              <span>
                <span className="block font-medium text-ink">{label}</span>
                <span className="block text-[11px] text-ink-3">{text}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </Window>
  );
}

const CASE_STEPS: { step: string; owner: string; state: 'done' | 'now' | 'next'; mine: boolean }[] = [
  { step: 'Document check', owner: 'StudyInfo team', state: 'done', mine: false },
  { step: 'Applied', owner: 'Applying agency', state: 'done', mine: false },
  { step: 'Conditional offer', owner: 'Applying agency', state: 'done', mine: false },
  { step: 'Offer accepted', owner: 'Student agency', state: 'now', mine: true },
  { step: 'CAS', owner: 'Applying agency', state: 'next', mine: false },
  { step: 'Payment', owner: 'Student agency', state: 'next', mine: true },
  { step: 'Visa', owner: 'Student agency', state: 'next', mine: true },
  { step: 'Commission', owner: 'Applying agency', state: 'next', mine: false },
];

/** Case steps with the party that owns each one, as the student agency sees them. */
export function CaseStepsMock() {
  return (
    <Window title={<Title icon="track">Case steps · SI-2044</Title>}>
      <ol className="flex flex-col p-2">
        {CASE_STEPS.map((s) => (
          <li key={s.step} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-[12.5px] ${s.state === 'now' ? 'bg-accent-soft' : ''}`}>
            <span
              className={`grid size-4 shrink-0 place-items-center rounded-full ${
                s.state === 'done' ? 'bg-success text-canvas' : s.state === 'now' ? 'ring-2 ring-accent' : 'ring-1 ring-line-2'
              }`}
            >
              {s.state === 'done' && <Icon name="check" size={10} />}
            </span>
            <span className={`min-w-0 flex-1 truncate ${s.state === 'next' ? 'text-ink-3' : 'text-ink'}`}>{s.step}</span>
            <span className="hidden text-[11px] text-ink-3 sm:block">{s.owner}</span>
            {!s.mine && s.state !== 'done' && <Icon name="lock" size={12} className="text-ink-3" />}
          </li>
        ))}
      </ol>
    </Window>
  );
}

const MATCHES: { programme: string; score: number; chance: 'High' | 'Medium' | 'Low'; cost: string; reason: string }[] = [
  { programme: 'MSc Finance', score: 92, chance: 'High', cost: '£44,900 total', reason: 'Within budget. Grades and English meet the requirements.' },
  { programme: 'MSc Financial Technology', score: 86, chance: 'High', cost: '£47,400 total', reason: 'Strong study-area fit. January intake available.' },
  { programme: 'MSc Accounting and Finance', score: 71, chance: 'Medium', cost: '£43,300 total', reason: 'Needs 6.5 in IELTS writing. The student has 6.0.' },
];

/** Programme recommendations with a match score, admission chance and total cost. */
export function MatchMock() {
  const file = byId('SI-2043');
  return (
    <Window title={<Title icon="match">Programme recommendations · {file.student}</Title>}>
      <div className="grid md:grid-cols-[200px_minmax(0,1fr)]">
        <dl className="grid grid-cols-[64px_1fr] content-start gap-y-2 border-b border-line bg-subtle p-4 text-[12.5px] md:border-r md:border-b-0">
          <dt className="text-ink-3">Degree</dt>
          <dd>BA Economics</dd>
          <dt className="text-ink-3">Grades</dt>
          <dd>GPA 3.4 / 4.0</dd>
          <dt className="text-ink-3">English</dt>
          <dd>IELTS 7.0</dd>
          <dt className="text-ink-3">Budget</dt>
          <dd>£48,000 total</dd>
          <dt className="text-ink-3">Intake</dt>
          <dd>{file.intake}</dd>
        </dl>
        <ul className="divide-y divide-line">
          {MATCHES.map((m) => (
            <li key={m.programme} className="flex flex-col gap-1.5 px-4 py-3 text-[12.5px]">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-medium text-ink">{m.programme}</span>
                <span className="font-mono text-[12px] text-ink tabular-nums">{m.score}/100</span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Chip tone={m.chance === 'High' ? 'good' : m.chance === 'Medium' ? 'warn' : 'plain'}>{m.chance} chance</Chip>
                <span className="text-ink-3 tabular-nums">{m.cost}</span>
              </div>
              <p className="text-ink-2">{m.reason}</p>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  );
}

/** The CRM's operations centre. */
export function CrmMock() {
  const kpis = [
    ['Follow-ups due', '6'],
    ['Open problems', '2'],
    ['Deadlines this week', '3'],
  ];
  const actions: { text: string; tone: 'bad' | 'warn' | 'accent' }[] = [
    { text: 'Payment overdue · A. Rahman', tone: 'bad' },
    { text: 'Application deadline in 2 days · C. Okafor', tone: 'warn' },
    { text: 'Visa appointment booked · L. Nguyen', tone: 'accent' },
  ];
  const stages = [
    ['Interest', 14],
    ['Application', 9],
    ['Offer', 6],
    ['Payment', 4],
    ['Visa', 3],
    ['Completion', 2],
  ] as const;
  return (
    <Window title={<Title icon="chart">Operations centre</Title>}>
      <div className="flex flex-col gap-4 p-4 text-[12.5px] sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map(([k, v]) => (
            <div key={k} className="rounded-lg bg-canvas/50 p-3 ring-1 ring-line">
              <p className="text-[11px] text-ink-3">{k}</p>
              <p className="mt-1 text-xl font-medium tracking-tight text-ink tabular-nums">{v}</p>
            </div>
          ))}
        </div>
        <div>
          <p className="mb-2 text-[11px] font-medium text-ink-3">Needs action</p>
          <ul className="divide-y divide-line rounded-lg ring-1 ring-line">
            {actions.map((a) => (
              <li key={a.text} className="flex items-center gap-2.5 px-3 py-2">
                <span className={`size-1.5 shrink-0 rounded-full ${a.tone === 'bad' ? 'bg-danger' : a.tone === 'warn' ? 'bg-warn' : 'bg-accent'}`} />
                <span className="truncate text-ink">{a.text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-medium text-ink-3">Journeys by stage</p>
          <div className="grid grid-cols-6 gap-1.5">
            {stages.map(([s, n]) => (
              <div key={s} className="flex min-w-0 flex-col gap-1.5">
                <div className="h-12 overflow-hidden rounded bg-canvas/50">
                  <div className="h-full origin-bottom rounded bg-accent/70" style={{ transform: `scaleY(${n / 14})` }} />
                </div>
                <span className="truncate text-[10px] text-ink-3">{s}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
}

/** The AI sales chatbot on WhatsApp. */
export function ChatbotMock() {
  const messages: { from: 'student' | 'bot'; text: string }[] = [
    { from: 'student', text: 'Hi, I want to study in the UK. My budget is around £15,000.' },
    { from: 'bot', text: 'Great to hear from you! What is your highest qualification, and your grade?' },
    { from: 'student', text: 'BSc in Business, CGPA 3.4.' },
    { from: 'bot', text: 'Thanks. Here are three programmes that fit your budget and grades. Shall I ask a counsellor to call you?' },
  ];
  return (
    <Window title={<Title icon="message">WhatsApp · New enquiry</Title>}>
      <div className="flex flex-col gap-2.5 p-4 sm:p-5">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
              m.from === 'student' ? 'self-end rounded-tr-md bg-success/20 text-ink' : 'self-start rounded-tl-md bg-muted text-ink'
            }`}
          >
            {m.text}
          </div>
        ))}
        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-3 text-[12px] text-ink-3">
          <span className="flex items-center gap-1.5">
            <Icon name="sparkle" size={13} className="text-accent" /> AI reply
          </span>
          <Chip tone="bad">HOT lead · handed to your team</Chip>
        </div>
      </div>
    </Window>
  );
}

/** A generated social post waiting for approval. */
export function PostMock() {
  return (
    <Window title={<Title icon="image">Today’s posts</Title>}>
      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] sm:p-5">
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[linear-gradient(150deg,#1e2a5a,#3b4db3_55%,#6e8bff)] p-4">
          <div className="absolute -right-8 -bottom-8 size-40 rounded-full bg-white/10" />
          <span className="flex items-center gap-1.5 text-[10px] font-medium text-white/80">
            <span className="grid size-3.5 place-items-center rounded-[4px] bg-white/90 text-[8px] font-bold text-[#3b4db3]">Y</span> Your agency
          </span>
          <p className="mt-6 text-[19px] leading-tight font-semibold text-white">Study in Canada this September</p>
          <p className="mt-2 text-[11px] text-white/75">Programmes, costs and scholarships</p>
        </div>
        <div className="flex flex-col gap-3 text-[12.5px]">
          <p className="leading-relaxed text-ink-2">Thinking about Canada? Here’s what a September start involves, from offers to visas.</p>
          <div className="flex flex-wrap gap-1.5">
            {['Facebook', 'Instagram', 'TikTok', 'YouTube'].map((p) => (
              <Chip key={p}>{p}</Chip>
            ))}
          </div>
          <div className="mt-auto flex flex-col gap-2 border-t border-line pt-3">
            <span className="flex items-center gap-1.5 text-ink-3">
              <Icon name="userCheck" size={13} /> Waiting for your approval
            </span>
            <span className="flex items-center gap-1.5 text-ink-3">
              <Icon name="chart" size={13} /> 2 posters and 1 short video today
            </span>
          </div>
        </div>
      </div>
    </Window>
  );
}

/** The agency's own branded portal on its own domain. */
export function PortalMock() {
  const programmes = ['MSc Data Science', 'BBA International Business', 'MSc Public Health'];
  return (
    <figure className="overflow-hidden rounded-xl bg-surface text-left shadow-window">
      <div className="flex items-center gap-3 border-b border-line px-4 py-2.5">
        <span className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
          <span className="size-2.5 rounded-full bg-muted" />
        </span>
        <span className="flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md bg-canvas/60 px-3 py-1 font-mono text-[11px] text-ink-2">
          <Icon name="lock" size={11} /> youragency.com
        </span>
      </div>
      <div className="flex flex-col gap-4 p-5 text-[12.5px]">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 font-medium text-ink">
            <span className="grid size-6 place-items-center rounded-md bg-success/80 text-[11px] font-bold text-canvas">Y</span> Your Agency
          </span>
          <span className="text-[11px] text-ink-3">Programmes · Countries · Apply</span>
        </div>
        <p className="text-[18px] leading-tight font-medium tracking-tight text-ink">Find the right programme abroad</p>
        <div className="flex items-center gap-2 rounded-lg bg-canvas/60 px-3 py-2 text-ink-3 ring-1 ring-line">
          <Icon name="search" size={13} /> Search programmes, universities and countries
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          {programmes.map((p) => (
            <div key={p} className="rounded-lg bg-surface-2 p-3 ring-1 ring-line">
              <p className="truncate font-medium text-ink">{p}</p>
              <p className="mt-1 text-[11px] text-ink-3">Match score shown after sign-up</p>
            </div>
          ))}
        </div>
      </div>
      <figcaption className="sr-only">Example of an agency portal on its own domain</figcaption>
    </figure>
  );
}

export function ChapterMock({ name }: { name: MockName }) {
  switch (name) {
    case 'submission':
      return <ApplicationPdfMock />;
    case 'check':
      return <DocCheckMock />;
    case 'received':
      return <ReceivedMock />;
    case 'thread':
      return <ThreadMock />;
  }
}
