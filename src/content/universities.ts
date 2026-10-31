import type { Block } from './blocks';

export const UNIVERSITIES = {
  hero: {
    label: 'Add your universities',
    title: 'Turn university partnerships into a steady flow of students',
  },
  blocks: [
    {
      title: 'Add a university in one request',
      text: 'Send a university request with its website, campus country and the share of commission you offer the platform. When our team approves it, the university joins the catalog with your agency as its owner.',
      link: { to: '/network', label: 'How the network works' },
      panel: {
        title: 'Request a university',
        text: 'Approved, rejected with a reason, or linked to a university already in the catalog.',
      },
      features: [
        { title: 'Data gathered for you', text: 'Programmes, fees, intakes and requirements are collected from the university’s website.' },
        { title: 'You own it', text: 'Only your agency and our team can edit the university, its programmes and requirements.' },
        { title: 'Your own application fields', text: 'Ask every applicant for the extra questions or documents the university needs.' },
        { title: 'Seen by every agency', text: 'Agencies across the network can recommend your university to their students.' },
      ],
    },
    {
      title: 'Receive verified files',
      text: 'Files for your universities arrive already checked by our team. You apply, upload the offer letter and move the university-side steps.',
      link: { to: '/tracking', label: 'Case tracking' },
      panel: {
        title: 'Received Applications',
        text: 'Every file sent to you, with its step and unread messages.',
      },
      features: [
        { title: 'Offer letters on the case', text: 'Upload conditional and unconditional offers straight to the case.' },
        { title: 'Your steps, enforced', text: 'Only you move the university-side steps, and only the student agency moves theirs.' },
      ],
    },
    {
      title: 'Commission on every placement',
      text: 'Each university carries an agency commission. Owners and admins see it for every university in one table, and each case tracks it to the end.',
      panel: {
        title: 'University Commissions',
        text: 'The agency commission for every university, visible to your owners and admins.',
      },
      features: [],
    },
  ] satisfies Block[],
};
