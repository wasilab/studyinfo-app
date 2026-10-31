import type { Status } from '../../content/files';

/** Small circular glyph for a case step, in the style of an issue tracker. */
export function StatusIcon({ status, className = '' }: { status: Status; className?: string }) {
  const props = { viewBox: '0 0 14 14', className: `size-3.5 shrink-0 ${className}`, 'aria-hidden': true } as const;
  switch (status) {
    case 'submitted':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" strokeDasharray="2.2 2.2" className="fill-none stroke-st-submitted" />
        </svg>
      );
    case 'check':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-check" />
          <path d="M7 3.6a3.4 3.4 0 0 1 0 6.8z" className="fill-st-check" />
        </svg>
      );
    case 'returned':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-returned" />
          <path d="M7 4.3v3.3" strokeWidth="1.5" strokeLinecap="round" className="stroke-st-returned" />
          <circle cx="7" cy="9.7" r=".85" className="fill-st-returned" />
        </svg>
      );
    case 'forwarded':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="6.25" className="fill-st-forwarded" />
          <path d="M4.4 7h5M7.6 5l2 2-2 2" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-canvas" />
        </svg>
      );
    case 'offer':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="5.5" strokeWidth="1.5" className="fill-none stroke-st-offer" />
          <path d="M4.8 7.1l1.5 1.5 2.9-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-st-offer" />
        </svg>
      );
    case 'commission':
      return (
        <svg {...props}>
          <circle cx="7" cy="7" r="6.25" className="fill-st-commission" />
          <path d="M4.6 7.2l1.6 1.6 3.2-3.3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-canvas" />
        </svg>
      );
  }
}
