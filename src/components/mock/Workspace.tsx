import { CHECKLIST, EXAMPLE_FILES, STATUSES } from '../../content/files';
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

/** The large hero illustration: a StudyInfo workspace with the file pipeline. */
export function Workspace() {
  const selected = EXAMPLE_FILES[0];
  const groups = STATUSES.map((s) => ({ ...s, files: EXAMPLE_FILES.filter((f) => f.status === s.id) })).filter((g) => g.files.length);

  return (
    <figure className="relative overflow-hidden rounded-xl bg-white text-left shadow-window">
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
              <span className="font-normal text-ink-3">{EXAMPLE_FILES.length}</span>
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
          <div className="min-h-0 flex-1 overflow-hidden">
            {groups.map((g) => (
              <div key={g.id}>
                <div className="flex h-8 items-center gap-2 bg-subtle px-4 text-[12px] font-medium text-ink-2">
                  <StatusIcon status={g.id} />
                  {g.label}
                  <span className="font-normal text-ink-3">{g.files.length}</span>
                </div>
                {g.files.map((f) => (
                  <FileRow key={f.id} file={f} active={f.id === selected.id} />
                ))}
              </div>
            ))}
          </div>
        </div>

        <aside className="hidden min-w-0 flex-col gap-5 border-l border-line p-5 text-[12.5px] lg:flex">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] text-ink-3">{selected.id}</span>
            <StatusChip file={selected} />
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
            <p className="mb-2 text-[11px] font-medium text-ink-3">Documents · 6 of 6</p>
            <ul className="flex flex-col gap-1.5">
              {CHECKLIST.map((d) => (
                <li key={d.name} className="flex items-center gap-2 text-ink-2">
                  <Icon name="check" size={13} className="text-success" />
                  {d.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg bg-subtle p-3 ring-1 ring-line">
            <p className="flex items-center gap-1.5 font-medium text-ink">
              <Icon name="sparkle" size={13} className="text-accent" /> AI check
            </p>
            <p className="mt-1.5 leading-relaxed text-ink-2">All documents present. Names and dates match. IELTS 7.0 meets the programme requirement.</p>
          </div>
          <p className="mt-auto flex items-center gap-1.5 text-ink-3">
            <Icon name="userCheck" size={14} /> Waiting for admissions review
          </p>
        </aside>
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-[linear-gradient(to_bottom,rgb(255_255_255/0),#fff)]" />
    </figure>
  );
}
