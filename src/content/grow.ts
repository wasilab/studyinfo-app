import type { IconName } from '../components/ui/Icon';

/** Copy for /grow-with-us, the page our sales team walks agencies through. Keep it short. */

export interface Point {
  icon: IconName;
  title: string;
  text: string;
}

export interface Chapter {
  id: string;
  num: string;
  label: string;
  title: string;
  text: string;
  link: { to: string; label: string };
  panel: { title: string; text: string };
  points: Point[];
}

export const GROW = {
  hero: {
    label: 'Grow with Us',
    title: 'Three ways to grow your agency',
    lead: 'Share commission on files you send. Receive files for your universities. Win more leads, every day.',
  },
  agenda: [
    { id: 'send', num: '1.0', title: 'Send student files', text: 'Earn commission' },
    { id: 'universities', num: '2.0', title: 'Add your universities', text: 'Receive more students' },
    { id: 'toolkit', num: '3.0', title: 'Agency toolkit', text: 'Win more leads' },
    { id: 'demo', num: '4.0', title: 'Try the demo', text: 'See it in action' },
  ],
  send: {
    id: 'send',
    num: '1.0',
    label: 'Send student files',
    title: 'Send student files. Earn commission.',
    text: 'Have a student for a university you can’t apply to? Send the file. We check it, an applying agency applies, and you share the commission.',
    link: { to: '/send-files', label: 'Send student files' },
    panel: { title: 'One case, from file to commission', text: 'Every step is tracked. The student never sees the commission.' },
    points: [
      { icon: 'users', title: 'No student turned away', text: 'Place students where you can’t apply.' },
      { icon: 'shield', title: 'Checked by our team', text: 'Every document, before the file moves.' },
      { icon: 'lock', title: 'Your student stays yours', text: 'The other agency never sees your name.' },
    ],
  } satisfies Chapter,
  universities: {
    id: 'universities',
    num: '2.0',
    label: 'Add your universities',
    title: 'Add your universities. Receive more students.',
    text: 'Request each partner university once. Agencies across the network send you verified files for it.',
    link: { to: '/add-universities', label: 'Add your universities' },
    panel: { title: 'Verified files, straight to you', text: 'Our team checks every file before it reaches you.' },
    points: [
      { icon: 'building', title: 'One request', text: 'Website, campus country, platform share.' },
      { icon: 'globe', title: 'Seen by every agency', text: 'Your universities, in the global catalog.' },
      { icon: 'coins', title: 'Commission on every placement', text: 'Tracked on every case.' },
    ],
  } satisfies Chapter,
  toolkit: {
    id: 'toolkit',
    num: '3.0',
    label: 'Agency toolkit',
    title: 'Turn followers into students.',
    text: 'Posts bring enquiries in. The chatbot answers them. Your team and CRM turn them into students.',
    link: { to: '/toolkit', label: 'Agency toolkit' },
    loop: 'Every enrolment is traced back to the post that brought it in, so the next post gets sharper.',
    tools: [
      { icon: 'users', title: 'Student CRM', text: 'Every journey, enquiry to visa.' },
      { icon: 'match', title: 'Recommendations', text: 'Match score and admission chance.' },
      { icon: 'sparkle', title: 'AI Counselor', text: 'From ad click to shortlist.' },
      { icon: 'mic', title: 'AI interview practice', text: 'Rehearse and get scored.' },
      { icon: 'shield', title: 'Visa document review', text: 'A readiness score for every file.' },
      { icon: 'globe', title: 'Your own portal', text: 'Your brand, on your domain.' },
    ] satisfies Point[],
  },
  demo: {
    id: 'demo',
    num: '4.0',
    label: 'Try the demo',
    title: ['See StudyInfo in action.', 'Try the demo.'] as [string, string],
    text: 'Send a file, add a university and follow a lead in a demo agency.',
  },
};
