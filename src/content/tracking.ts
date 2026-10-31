import type { Block } from './blocks';

export const TRACKING = {
  hero: {
    label: 'Tracking',
    title: 'One status from submission to decision',
  },
  blocks: [
    {
      title: 'Applications ready to assess',
      text: 'We submit each application to partner universities in the format their admissions team expects, so nothing is delayed by paperwork.',
      link: { to: '/intake', label: 'Intake' },
      panel: {
        title: 'University-ready packages',
        text: 'Documents ordered and named the way each admissions team asks.',
      },
      features: [
        { title: 'Checked twice', text: 'An AI check and a human review before anything is sent.' },
        { title: 'One point of contact', text: 'Universities deal with StudyInfo, not dozens of agency inboxes.' },
      ],
    },
    {
      title: 'One status for every application',
      text: 'Agencies and universities see the same status for every file, from receipt to decision, without chasing email threads.',
      link: { to: '/partners', label: 'Partners' },
      panel: {
        title: 'Everyone sees the same board',
        text: 'The agency, the university and our team follow every file on one status.',
      },
      features: [
        { title: 'Every stage visible', text: 'Received, in review, verified, submitted and decision.' },
        { title: 'Fewer follow-ups', text: 'Nobody has to chase an email thread to find out where a file is.' },
      ],
    },
  ] satisfies Block[],
};
