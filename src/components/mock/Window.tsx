import type { ReactNode } from 'react';
import type { ExampleFile } from '../../content/files';
import { STATUS_LABEL } from '../../content/files';
import { StatusIcon } from '../ui/StatusIcon';

/** App-window frame for product illustrations. Every illustration is labelled as example data. */
export function Window({ title, children, className = '' }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <figure className={`relative overflow-hidden rounded-xl bg-surface text-left shadow-window ${className}`}>
      {title && (
        <div className="flex h-10 items-center justify-between gap-3 border-b border-line px-4">
          <div className="flex min-w-0 items-center gap-2 truncate text-[12.5px] font-medium text-ink">{title}</div>
          <ExampleTag />
        </div>
      )}
      {children}
    </figure>
  );
}

export function ExampleTag() {
  return <span className="shrink-0 font-mono text-[10px] tracking-wider text-ink-3 uppercase">Example data</span>;
}

export function Avatar({ name }: { name: string }) {
  const initials = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2);
  return (
    <span className="grid size-5 shrink-0 place-items-center rounded-full bg-muted text-[9px] font-semibold text-ink-2 ring-1 ring-line">
      {initials}
    </span>
  );
}

export function Chip({ children, tone = 'plain' }: { children: ReactNode; tone?: 'plain' | 'good' | 'warn' | 'bad' | 'info' | 'accent' }) {
  const tones = {
    plain: 'bg-muted text-ink-2',
    good: 'bg-success-soft text-success',
    accent: 'bg-accent-soft text-accent',
    warn: 'bg-warn-soft text-warn',
    bad: 'bg-danger-soft text-danger',
    info: 'bg-accent-soft text-accent',
  } as const;
  return <span className={`inline-flex h-5 shrink-0 items-center gap-1 rounded-md px-1.5 text-[11px] font-medium ${tones[tone]}`}>{children}</span>;
}

export function StatusChip({ file }: { file: Pick<ExampleFile, 'status'> }) {
  return (
    <span className="inline-flex h-6 shrink-0 items-center gap-1.5 rounded-md px-2 text-[11.5px] font-medium text-ink-2 ring-1 ring-line ring-inset">
      <StatusIcon status={file.status} />
      {STATUS_LABEL[file.status]}
    </span>
  );
}

export function FileRow({ file, active = false, note = true, unread = 0 }: { file: ExampleFile; active?: boolean; note?: boolean; unread?: number }) {
  return (
    <div className={`flex h-10 items-center gap-3 px-4 text-[12.5px] ${active ? 'bg-muted/70' : ''}`}>
      <StatusIcon status={file.status} />
      <span className="w-[3.4rem] shrink-0 font-mono text-[11px] text-ink-3">{file.id}</span>
      <span className="min-w-0 flex-1 truncate text-ink">{file.programme}</span>
      {note && <span className="hidden max-w-[38%] truncate text-ink-3 sm:block">{file.note}</span>}
      <span className="hidden shrink-0 text-ink-3 xl:block">{file.intake}</span>
      {unread > 0 && (
        <span className="grid h-4 min-w-4 shrink-0 place-items-center rounded-full bg-accent px-1 text-[10px] font-semibold text-canvas tabular-nums" aria-label={`${unread} unread`}>
          {unread}
        </span>
      )}
      <span className="shrink-0 rounded border border-line px-1 font-mono text-[10px] text-ink-2">{file.country}</span>
      <Avatar name={file.student} />
    </div>
  );
}
