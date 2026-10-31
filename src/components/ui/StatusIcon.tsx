import type { Status } from '../../content/files';

/** Small circular glyph for an application status, in the style of an issue tracker. */
export function StatusIcon({ status, className = '' }: { status: Status; className?: string }) {
  const props = { viewBox: '0 0 14 14', className: `size-3.5 shrink-0 ${className}`, 'aria-hidden': true } as const;
  switch (status) {
    case 'received':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" strokeDasharray="2.2 2.2" className="fill-none stroke-st-received" />
        </svg>
      );
    case 'review':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-review" />
          <path d="M7 3.6a3.4 3.4 0 0 1 0 6.8z" className="fill-st-review" />
        </svg>
      );
    case 'missing':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-missing" />
          <path d="M7 4.3v3.3" strokeWidth="1.5" strokeLinecap="round" className="stroke-st-missing" />
          <circle cx="7" cy="9.7" r=".85" className="fill-st-missing" />
        </svg>
      );
    case 'verified':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-verified" />
          <path d="M4.8 7.1l1.5 1.5 2.9-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-st-verified" />
        </svg>
      );
    case 'submitted':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="6.25" className="fill-st-submitted" />
          <path d="M4.4 7h5M7.6 5l2 2-2 2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-canvas" />
        </svg>
      );
    case 'decision':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="6.25" className="fill-st-decision" />
          <path d="M4.6 7.2l1.6 1.6 3.2-3.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-canvas" />
        </svg>
      );
  }
}
