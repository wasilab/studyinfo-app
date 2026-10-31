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
  { to: '/intake', label: 'Intake', text: 'Student files, checked on arrival', icon: 'inbox' },
  { to: '/ai', label: 'AI', text: 'Document checks and programme matching', icon: 'sparkle' },
  { to: '/tracking', label: 'Tracking', text: 'Submission and one shared status', icon: 'track' },
];

export const NAV: NavLink[] = [
  { to: '/partners', label: 'Partners' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/now', label: 'Now' },
  { to: '/contact', label: 'Contact' },
];

export type EnquiryType = 'files' | 'agency' | 'university' | 'other';

export const ENQUIRY_TYPES: Record<EnquiryType, { label: string; subject: string }> = {
  files: { label: 'Submit student files', subject: 'Student file submission' },
  agency: { label: 'Become an agency partner', subject: 'Agency partnership' },
  university: { label: 'Become a partner university', subject: 'University partnership' },
  other: { label: 'Ask a question', subject: 'General enquiry' },
};

export const contactLink = (type: EnquiryType) => `/contact?type=${type}`;

/** The row of product pages near the end of each page. */
export const EXPLORE: { to: string; title: string; label: string }[] = [
  { to: '/intake', title: 'Every student file, checked before it moves', label: 'Intake' },
  { to: '/ai', title: 'AI reads every file. Our team signs off.', label: 'AI' },
  { to: '/tracking', title: 'One status from submission to decision', label: 'Tracking' },
  { to: '/partners', title: 'The network behind every application', label: 'Partners' },
];

export interface Statement {
  text: string;
  label: string;
}

/** Our own standards, shown where Linear shows customer quotes. */
export const STATEMENTS: Statement[] = [
  { text: 'No file reaches a university until every required document is present and checked.', label: 'Complete before submission' },
  { text: 'AI suggests. Our admissions team decides what is submitted.', label: 'Human review' },
  { text: 'Agencies and universities see the same status at every stage.', label: 'One shared status' },
  { text: 'Student information is used only for their applications, and shared only with the universities they apply to.', label: 'Student data' },
  { text: 'Incomplete files go back to the agency with an exact list of what is missing.', label: 'Clear requests' },
];

export const FOOTER: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { to: '/intake', label: 'Intake' },
      { to: '/ai', label: 'AI' },
      { to: '/tracking', label: 'Tracking' },
      { to: '/pricing', label: 'Pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/partners', label: 'Partners' },
      { to: '/now', label: 'Now' },
      { to: '/contact', label: 'Contact' },
    ],
  },
  {
    title: 'Work with us',
    links: [
      { to: contactLink('files'), label: 'Submit student files' },
      { to: contactLink('agency'), label: 'Agency partners' },
      { to: contactLink('university'), label: 'Partner universities' },
    ],
  },
  {
    title: 'Guides',
    links: [
      { to: '/now/what-a-complete-student-file-includes', label: 'Complete student files' },
      { to: '/now/planning-for-the-september-and-january-intakes', label: 'Intake planning' },
      { to: '/now/english-test-scores-what-admissions-teams-look-for', label: 'English test scores' },
    ],
  },
];
