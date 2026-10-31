import type { Block } from './blocks';

export const TRACKING = {
  hero: {
    label: 'Case tracking',
    title: 'Every step, from document check to commission',
  },
  blocks: [
    {
      title: 'Everyone moves their own steps',
      text: 'The applying agency moves the university-side steps: applied, offers, conditions and CAS. The student agency moves offer acceptance, payment and visa. A step set by the wrong party is refused.',
      link: { to: '/network', label: 'How it works' },
      panel: {
        title: 'One case, clear ownership',
        text: 'Each step shows who moves it, and every move is recorded in the case history.',
      },
      features: [
        { title: 'Offers, conditions and CAS', text: 'The applying agency records the university’s side as it happens.' },
        { title: 'Payment and visa', text: 'The student agency keeps its own steps up to date.' },
      ],
    },
    {
      title: 'One thread, three parties',
      text: 'The student agency, the applying agency and our team talk in one thread on the case, with attachments and read receipts.',
      panel: {
        title: 'Role labels, never names',
        text: 'Every message shows Student agency, Applying agency or StudyInfo team, and nothing else.',
      },
      features: [
        { title: 'Unread badges and notifications', text: 'See which cases have new messages at a glance.' },
        { title: 'Attachments on the case', text: 'Share documents in the thread, kept with the case.' },
      ],
    },
    {
      title: 'Commission, tracked to the end',
      text: 'After the final step, the commission step tracks the agency commission as pending, claimed or received. Students never see it.',
      panel: {
        title: 'Commission status',
        text: 'Visible to both agencies and our team.',
      },
      features: [],
    },
  ] satisfies Block[],
};
