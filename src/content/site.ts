import type { IconName } from '../components/ui/Icon';

export interface NavLink {
  to: string;
  label: string;
}

export interface ProductLink extends NavLink {
  text: string;
  icon: IconName;
}

/** Items in the header's Product menu. */
export const PRODUCT_MENU: ProductLink[] = [
  { to: '/send-files', label: 'Send student files', text: 'For agencies with students', icon: 'send' },
  { to: '/universities', label: 'Add your universities', text: 'For agencies with university partners', icon: 'building' },
  { to: '/tracking', label: 'Case tracking', text: 'From document check to commission', icon: 'track' },
  { to: '/toolkit', label: 'Agency toolkit', text: 'CRM, recommendations and AI tools', icon: 'layers' },
];

export const NAV: NavLink[] = [
  { to: '/network', label: 'How it works' },
  { to: '/now', label: 'Now' },
  { to: '/contact', label: 'Contact' },
];

export type EnquiryType = 'files' | 'universities' | 'join' | 'other';

export const ENQUIRY_TYPES: Record<EnquiryType, { label: string; subject: string }> = {
  join: { label: 'Join the network', subject: 'Joining the StudyInfo network' },
  files: { label: 'Send student files', subject: 'Sending student files' },
  universities: { label: 'Add our universities', subject: 'Adding our universities' },
  other: { label: 'Ask a question', subject: 'General enquiry' },
};

export const contactLink = (type: EnquiryType) => `/contact?type=${type}`;

/** The row of product pages near the end of each page. */
export const EXPLORE: { to: string; title: string; label: string }[] = [
  { to: '/send-files', title: 'Every student has a place, even where you can’t apply', label: 'Send student files' },
  { to: '/universities', title: 'Turn university partnerships into a steady flow of students', label: 'Add your universities' },
  { to: '/tracking', title: 'Every step, from document check to commission', label: 'Case tracking' },
  { to: '/toolkit', title: 'Everything your agency runs on, in one place', label: 'Agency toolkit' },
];

export interface Statement {
  text: string;
  label: string;
}

/** Our own standards, shown where Linear shows customer quotes. */
export const STATEMENTS: Statement[] = [
  { text: 'No file is forwarded until our team has checked every required document.', label: 'Document check' },
  { text: 'Agencies never see each other’s name, logo or contact details. Only role labels.', label: 'Anonymity' },
  { text: 'Both agencies follow the same case, step by step, in one shared thread.', label: 'One shared case' },
  { text: 'Student data is encrypted with a key unique to your agency.', label: 'Student data' },
  { text: 'A returned file comes back with a reason and a note, never a vague rejection.', label: 'Clear returns' },
];

export const FOOTER: { title: string; links: NavLink[] }[] = [
  {
    title: 'Network',
    links: [
      { to: '/send-files', label: 'Send student files' },
      { to: '/universities', label: 'Add your universities' },
      { to: '/tracking', label: 'Case tracking' },
      { to: '/network', label: 'How it works' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/toolkit', label: 'Agency toolkit' },
      { to: '/now', label: 'Now' },
      { to: contactLink('join'), label: 'Join the network' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { to: '/now/what-a-complete-student-file-includes', label: 'Complete student files' },
      { to: '/now/how-our-team-checks-every-student-file', label: 'Our document check' },
      { to: '/now/planning-for-the-september-and-january-intakes', label: 'Intake planning' },
    ],
  },
];
