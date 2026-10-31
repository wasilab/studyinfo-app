export interface NavLink {
  to: string;
  label: string;
}

export const NAV: NavLink[] = [
  { to: '/intake', label: 'Intake' },
  { to: '/ai', label: 'AI' },
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

export const FOOTER: { title: string; links: NavLink[] }[] = [
  {
    title: 'Product',
    links: [
      { to: '/intake', label: 'Intake' },
      { to: '/ai', label: 'AI' },
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
];
