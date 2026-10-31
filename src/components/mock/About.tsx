import { ABOUT, type Company } from '../../content/about';
import { Icon } from '../ui/Icon';
import { LogoMark } from '../ui/Logo';
import { Connector } from './Grow';

const BADGE = ['bg-[linear-gradient(150deg,#8ba2ff,#4c5fe4)]', 'bg-[linear-gradient(150deg,#5eead4,#0f9f86)]'];

/** A neutral initials badge for a partner company (not its logo). `index` picks the colour. */
export function CompanyBadge({ company, index }: { company: Company; index: number }) {
  return (
    <span aria-hidden="true" className={`grid size-11 shrink-0 place-items-center rounded-xl text-[14px] font-semibold tracking-wide text-white ${BADGE[index % BADGE.length]}`}>
      {company.initials}
    </span>
  );
}

function CompanyCard({ company, index }: { company: Company; index: number }) {
  return (
    <div className="w-full max-w-[300px] rounded-xl bg-surface p-5 text-left shadow-window lg:max-w-none">
      <div className="flex items-center gap-3">
        <CompanyBadge company={company} index={index} />
        <span className="min-w-0">
          <span className="block text-[15px] font-medium tracking-[-0.01em] text-ink">{company.name}</span>
          <span className="block text-[12.5px] text-ink-3">{company.role}</span>
        </span>
      </div>
      <p className="mt-4 border-t border-line pt-4 text-[13px] leading-relaxed text-ink-2">{company.line}</p>
    </div>
  );
}

/** The two partner companies joined by a handshake: Tablab Research licenses StudyInfo to Global Desire Education. */
export function PartnershipVisual() {
  const [tablab, gde] = ABOUT.partnership.companies;
  return (
    <div className="flex flex-col items-center gap-8 pb-4">
      <div className="grid w-full items-center justify-items-center gap-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-0">
        <CompanyCard company={tablab} index={0} />
        <div className="flex flex-col items-center gap-3 lg:flex-row lg:gap-1">
          <Connector />
          <div className="flex flex-col items-center gap-2.5 py-1">
            <span className="relative grid size-[76px] place-items-center rounded-full bg-surface text-accent shadow-lift ring-1 ring-accent/30">
              <span aria-hidden="true" className="absolute inset-0 animate-ping-soft rounded-full bg-accent/15" />
              <Icon name="handshake" size={40} />
            </span>
            <span className="font-mono text-[10.5px] font-medium tracking-[0.08em] text-ink uppercase">Exclusive license</span>
          </div>
          <Connector />
        </div>
        <CompanyCard company={gde} index={1} />
      </div>
      <p className="flex items-center gap-2.5 text-[14px] text-ink-2">
        <LogoMark size={24} />
        <span>
          <span className="font-medium text-ink">StudyInfo</span> · a partnership project
        </span>
      </p>
    </div>
  );
}

