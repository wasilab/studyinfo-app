import { EXAMPLE_FILES, STATUS_LABEL, type Status } from '../../content/files';
import type { MockName } from '../../content/home';
import { Icon } from '../ui/Icon';
import { Chip, FileRow, StatusChip, Window } from './Window';

const byId = (id: string) => EXAMPLE_FILES.find((f) => f.id === id)!;

export function IntakeMock() {
  return (
    <Window
      title={
        <>
          <Icon name="inbox" size={14} /> Intake
        </>
      }
    >
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2 text-[11.5px]">
        <span className="rounded-md bg-muted px-2 py-0.5 text-ink">All 6</span>
        <span className="rounded-md px-2 py-0.5 text-ink-3">Needs documents 1</span>
        <span className="rounded-md px-2 py-0.5 text-ink-3">Ready 1</span>
      </div>
      <div className="divide-y divide-line">
        {EXAMPLE_FILES.map((f) => (
          <FileRow key={f.id} file={f} />
        ))}
      </div>
    </Window>
  );
}

const MATCHES: { programme: string; fit: string; tone: 'good' | 'warn' | 'plain'; reason: string }[] = [
  { programme: 'MSc Finance', fit: 'Strong fit', tone: 'good', reason: 'Meets the grade and English requirements. January intake available.' },
  { programme: 'MSc Financial Technology', fit: 'Strong fit', tone: 'good', reason: 'Meets every requirement. Quantitative background preferred.' },
  { programme: 'MSc Accounting and Finance', fit: 'Possible', tone: 'warn', reason: 'Needs 6.5 in IELTS writing. The student has 6.0.' },
  { programme: 'MBA', fit: 'Not eligible', tone: 'plain', reason: 'Requires two years of work experience.' },
];

export function MatchMock() {
  const file = byId('SI-2043');
  return (
    <Window
      title={
        <>
          <Icon name="sparkle" size={14} className="text-accent" /> Programme matches · {file.id}
        </>
      }
    >
      <div className="grid md:grid-cols-[220px_minmax(0,1fr)]">
        <dl className="grid grid-cols-[72px_1fr] content-start gap-y-2 border-b border-line bg-subtle p-4 text-[12.5px] md:border-r md:border-b-0">
          <dt className="text-ink-3">Student</dt>
          <dd>{file.student}</dd>
          <dt className="text-ink-3">Degree</dt>
          <dd>BA Economics</dd>
          <dt className="text-ink-3">Grades</dt>
          <dd>GPA 3.4 / 4.0</dd>
          <dt className="text-ink-3">English</dt>
          <dd>IELTS 7.0, writing 6.0</dd>
          <dt className="text-ink-3">Intake</dt>
          <dd>{file.intake}</dd>
        </dl>
        <ul className="divide-y divide-line">
          {MATCHES.map((m) => (
            <li key={m.programme} className="flex flex-col gap-1 px-4 py-3 text-[12.5px]">
              <div className="flex items-center justify-between gap-3">
                <span className="truncate font-medium text-ink">{m.programme}</span>
                <Chip tone={m.tone}>{m.fit}</Chip>
              </div>
              <p className="text-ink-2">{m.reason}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-1.5 border-t border-line px-4 py-2.5 text-[12px] text-ink-3">
        <Icon name="userCheck" size={14} /> AI suggestions, waiting for review by our admissions team
      </div>
    </Window>
  );
}

const PACKAGE = ['01_Passport.pdf', '02_Academic_transcripts.pdf', '03_English_test.pdf', '04_Statement_of_purpose.pdf', '05_References.pdf', '06_CV.pdf'];

export function SubmissionMock() {
  const file = byId('SI-2044');
  return (
    <Window
      title={
        <>
          <Icon name="send" size={14} /> Application package · {file.id}
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
        <p className="text-[13px] font-medium">
          {file.programme} <span className="font-normal text-ink-3">· {file.intake}</span>
        </p>
        <StatusChip file={file} />
      </div>
      <ul className="mx-4 divide-y divide-line rounded-lg ring-1 ring-line">
        {PACKAGE.map((name) => (
          <li key={name} className="flex items-center gap-2.5 px-3 py-2 text-[12px]">
            <Icon name="paperclip" size={13} className="text-ink-3" />
            <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-ink-2">{name}</span>
            <Icon name="check" size={13} className="text-accent" />
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 px-4 py-3.5 text-[12px] text-ink-3">
        <span className="flex items-center gap-1.5">
          <Icon name="sparkle" size={13} className="text-accent" /> AI check passed
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="userCheck" size={13} /> Reviewed by admissions team
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="building" size={13} /> Sent to partner university
        </span>
      </div>
    </Window>
  );
}

const BOARD: Status[] = ['review', 'verified', 'submitted', 'decision'];

export function BoardMock() {
  return (
    <Window
      title={
        <>
          <Icon name="track" size={14} /> Applications
        </>
      }
    >
      <div className="grid grid-cols-2 gap-3 bg-subtle p-3 lg:grid-cols-4">
        {BOARD.map((status) => {
          const files = EXAMPLE_FILES.filter((f) => f.status === status || (status === 'review' && f.status === 'missing'));
          return (
            <div key={status} className="flex min-w-0 flex-col gap-2">
              <p className="flex items-center gap-1.5 px-1 text-[12px] font-medium text-ink-2">
                {STATUS_LABEL[status]} <span className="font-normal text-ink-3">{files.length}</span>
              </p>
              {files.map((f) => (
                <div key={f.id} className="flex flex-col gap-1.5 rounded-lg bg-white p-3 text-[12px] shadow-card">
                  <span className="font-mono text-[10.5px] text-ink-3">{f.id}</span>
                  <span className="truncate font-medium text-ink">{f.programme}</span>
                  <span className="flex items-center justify-between gap-2 text-ink-3">
                    {f.intake}
                    <span className="rounded border border-line px-1 font-mono text-[10px] text-ink-2">{f.country}</span>
                  </span>
                  {f.status === 'decision' && <Chip tone="good">Offer issued</Chip>}
                  {f.status === 'missing' && <Chip tone="bad">Missing documents</Chip>}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </Window>
  );
}

type Finding = { doc: string; tone: 'good' | 'warn' | 'bad'; text: string };

const FINDINGS: Finding[] = [
  { doc: 'Passport', tone: 'good', text: 'Valid until 2032' },
  { doc: 'Academic transcripts', tone: 'good', text: 'Grading scale found' },
  { doc: 'English test score', tone: 'bad', text: 'Not in the file' },
  { doc: 'Statement of purpose', tone: 'good', text: 'Names the programme' },
  { doc: 'Reference letters', tone: 'warn', text: '1 of 2 received' },
  { doc: 'CV', tone: 'good', text: 'Dates match transcripts' },
];

export function FileCheckMock() {
  const file = byId('SI-2042');
  return (
    <Window
      title={
        <>
          <Icon name="sparkle" size={14} className="text-accent" /> AI check · {file.id}
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 pb-3">
        <p className="text-[13px] font-medium">
          {file.programme} <span className="font-normal text-ink-3">· {file.intake}</span>
        </p>
        <StatusChip file={file} />
      </div>
      <ul className="mx-4 divide-y divide-line rounded-lg ring-1 ring-line">
        {FINDINGS.map((f) => (
          <li key={f.doc} className="flex items-center gap-2.5 px-3 py-2.5 text-[12.5px]">
            {f.tone === 'good' && <Icon name="check" size={14} className="text-accent" />}
            {f.tone === 'warn' && <span className="grid size-3.5 place-items-center rounded-full bg-amber-500 text-[9px] font-bold text-white">!</span>}
            {f.tone === 'bad' && <Icon name="close" size={14} className="text-red-600" />}
            <span className="min-w-0 flex-1 truncate text-ink">{f.doc}</span>
            <span className={f.tone === 'good' ? 'text-ink-3' : f.tone === 'warn' ? 'text-amber-700' : 'text-red-700'}>{f.text}</span>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-1.5 px-4 py-3.5 text-[12px] text-ink-3">
        <Icon name="userCheck" size={14} /> 2 items need attention · waiting for admissions review
      </div>
    </Window>
  );
}

export function MissingMock() {
  const file = byId('SI-2042');
  return (
    <Window
      title={
        <>
          <Icon name="mail" size={14} /> Request to agency partner
        </>
      }
    >
      <div className="flex flex-col gap-4 p-5 text-[13px]">
        <p className="font-medium">
          {file.id} needs 2 more documents
        </p>
        <p className="leading-relaxed text-ink-2">
          Before we can review {file.student}’s file for {file.programme} ({file.intake}), please send:
        </p>
        <ul className="flex flex-col gap-2">
          {['English test score (IELTS, TOEFL, PTE or equivalent)', 'A second reference letter'].map((item) => (
            <li key={item} className="flex items-start gap-2 text-ink">
              <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-st-missing" />
              {item}
            </li>
          ))}
        </ul>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
          <StatusChip file={file} />
          <span className="text-[12px] text-ink-3">The file continues as soon as these arrive.</span>
        </div>
      </div>
    </Window>
  );
}

const AI_FINDINGS: [string, string][] = [
  ['Documents', '6 of 6 present. Names and dates match.'],
  ['English', 'IELTS 7.0 overall, writing 6.0'],
  ['Shortlist', 'MSc Finance, MSc Financial Technology'],
];

const REVIEW_STEPS = ['Documents confirmed', 'Writing score noted for MSc Accounting and Finance', 'Shortlist approved'];

export function ReviewMock() {
  const file = byId('SI-2043');
  return (
    <Window
      title={
        <>
          <Icon name="userCheck" size={14} /> Admissions review · {file.id}
        </>
      }
    >
      <div className="grid md:grid-cols-2">
        <div className="flex flex-col gap-4 border-b border-line p-5 md:border-r md:border-b-0">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-3">
            <Icon name="sparkle" size={13} className="text-accent" /> AI findings
          </p>
          <dl className="grid grid-cols-[76px_1fr] gap-x-2 gap-y-3 text-[12.5px]">
            {AI_FINDINGS.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="text-ink-3">{k}</dt>
                <dd className="text-ink">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="flex flex-col gap-4 p-5">
          <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-3">
            <Icon name="userCheck" size={13} /> Admissions team
          </p>
          <ul className="flex flex-col gap-3 text-[12.5px]">
            {REVIEW_STEPS.map((t) => (
              <li key={t} className="flex items-start gap-2 text-ink">
                <span className="mt-px grid size-4 shrink-0 place-items-center rounded bg-ink text-white">
                  <Icon name="check" size={11} />
                </span>
                {t}
              </li>
            ))}
          </ul>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
            <StatusChip file={file} />
            <span className="text-[12px] text-ink-3">Ready for submission</span>
          </div>
        </div>
      </div>
    </Window>
  );
}

export function ChapterMock({ name }: { name: MockName }) {
  switch (name) {
    case 'intake':
      return <IntakeMock />;
    case 'match':
      return <MatchMock />;
    case 'submission':
      return <SubmissionMock />;
    case 'board':
      return <BoardMock />;
  }
}
