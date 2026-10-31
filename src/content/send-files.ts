import type { Block } from './blocks';

export const SEND_FILES = {
  hero: {
    label: 'Send student files',
    title: 'Every student has a place, even where you can’t apply',
  },
  blocks: [
    {
      title: 'Submit once, in one format',
      text: 'Open the programme, confirm the application and submit. StudyInfo builds a Student Application PDF from the student’s required documents and the university’s own fields.',
      link: { to: '/network', label: 'How the network works' },
      panel: {
        title: 'The Student Application PDF',
        text: 'Built automatically from the required documents, with no agency branding.',
      },
      features: [
        { title: 'Everything in one file', text: 'Profile, passport, transcripts, English score and the university’s own fields.' },
        { title: 'Your student stays yours', text: 'The applying agency never sees your name, logo or contact details.' },
        { title: 'Follow it in Sent Applications', text: 'Every file you send, with its step and unread messages.' },
        { title: 'Withdraw any time', text: 'Plans changed? Withdraw the file at any point.' },
      ],
    },
    {
      title: 'Checked by our team before it moves',
      text: 'A person on our team checks every document. If something needs fixing, the file comes back to you with a reason and a note.',
      link: { to: '/tracking', label: 'Case tracking' },
      panel: {
        title: 'A person checks every file',
        text: 'Files are only forwarded once every required document is in place and clear.',
      },
      features: [
        { title: 'Your student is kept informed', text: 'They see “Under review by our team” while we check the file.' },
        { title: 'A clear reason, every time', text: 'Fix the file and resubmit. Each resubmission is checked afresh.' },
      ],
    },
    {
      title: 'What a complete student file includes',
      text: 'Five things are required. CV, statement of purpose and reference letters are optional additional documents.',
      link: { to: '/now/what-a-complete-student-file-includes', label: 'Read the guide' },
      panel: {
        title: 'Required and optional documents',
        text: 'Each university’s owner agency can add the extra fields its programmes need.',
      },
      features: [],
    },
  ] satisfies Block[],
};
