import type { IconName } from '../components/ui/Icon';

export type MockName = 'submission' | 'check' | 'received' | 'thread';

export interface Chapter {
  num: string;
  label: string;
  to?: string;
  title: string;
  text: string;
  mock: MockName;
  points: { title: string; text: string }[];
}

export const HERO = {
  pill: { label: 'An anonymous network for agencies · every file checked by our team', to: '/network' },
  title: 'Place every student. Fill every university.',
  lead: 'StudyInfo is the network for international education agencies. Send your students’ files to agencies that can apply where you can’t, add your universities to receive verified files from across the network, and share the commission.',
};

export const WAYS: { icon: IconName; title: string; text: string; to: string; cta: string }[] = [
  {
    icon: 'send',
    title: 'Have students?',
    text: 'Send their files through StudyInfo. Our team checks the documents and forwards each file to an agency that can apply.',
    to: '/send-files',
    cta: 'Send student files',
  },
  {
    icon: 'building',
    title: 'Have university partners?',
    text: 'Add your universities to the catalog and receive verified student files from agencies across the network.',
    to: '/universities',
    cta: 'Add your universities',
  },
  {
    icon: 'match',
    title: 'Have both?',
    text: 'Use both sides of the network from one account: send some files, receive others.',
    to: '/network',
    cta: 'How it works',
  },
];

export const INTRO = {
  statement: 'A student who fits a university you can’t apply to is no longer a lost student.',
  rest: 'Send the file through StudyInfo, and an agency with the university relationship applies for you. Both agencies share the commission, and neither ever sees the other’s name.',
  pillars: [
    { icon: 'shield', title: 'Checked by our team', text: 'A person on our team checks every file before it is forwarded.' },
    { icon: 'lock', title: 'Anonymous by design', text: 'Agencies see role labels only, never each other’s name, logo or contacts.' },
    { icon: 'coins', title: 'Commission shared', text: 'The university’s commission is shared between the two agencies.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
};

export const CHAPTERS: Chapter[] = [
  {
    num: '1.0',
    label: 'Submit',
    to: '/send-files',
    title: 'Send the student’s file',
    text: 'Open the programme, confirm the application and submit. StudyInfo builds a Student Application PDF from the required documents.',
    mock: 'submission',
    points: [
      { title: 'One application PDF', text: 'Profile, passport, transcripts, English score and university fields in one file.' },
      { title: 'No agency branding', text: 'The PDF carries no agency name, so your student stays yours.' },
      { title: 'Withdraw any time', text: 'You can withdraw a file at any point.' },
    ],
  },
  {
    num: '2.0',
    label: 'Document check',
    to: '/send-files',
    title: 'Our team checks every document',
    text: 'A person on our team reviews the file. If something is wrong, it comes back to you with a reason and a note to fix and resubmit.',
    mock: 'check',
    points: [
      { title: 'Clear reasons', text: 'Every returned file carries a reason and a note.' },
      { title: 'Resubmit when ready', text: 'Fix the file and send it again. Each resubmission is checked afresh.' },
      { title: 'Students kept informed', text: 'Your student sees “Under review by our team”, nothing more.' },
    ],
  },
  {
    num: '3.0',
    label: 'Apply',
    to: '/universities',
    title: 'An agency with the relationship applies',
    text: 'We forward the verified file to an applying agency, by default the university’s owner agency. It applies, uploads the offer letter and moves the university-side steps.',
    mock: 'received',
    points: [
      { title: 'Offer letters on the case', text: 'Conditional and unconditional offers are uploaded to the case.' },
      { title: 'The right party, every step', text: 'Each step can only be moved by the party that owns it.' },
      { title: 'Reassigned if needed', text: 'Our team can move a file to another applying agency.' },
    ],
  },
  {
    num: '4.0',
    label: 'Track and share',
    to: '/tracking',
    title: 'Follow the case. Share the commission.',
    text: 'All three parties talk in one thread on the case. When the case completes, the commission step tracks the agency commission.',
    mock: 'thread',
    points: [
      { title: 'One thread, three parties', text: 'Messages and attachments, labelled by role only.' },
      { title: 'Commission status', text: 'Pending, claimed and received, visible to agencies, never to students.' },
      { title: 'A full history', text: 'Every move is recorded in the case history.' },
    ],
  },
];

export const AUDIENCES = [
  {
    label: 'For student agencies',
    title: 'Place students at universities you can’t apply to',
    points: [
      'Send files through one process, in one format',
      'Every file checked by our team before it moves',
      'Share the university’s commission with the applying agency',
    ],
    cta: { label: 'Send student files', to: '/send-files' },
    note: 'You have students',
  },
  {
    label: 'For applying agencies',
    title: 'Receive verified files for your universities',
    points: [
      'Add your universities through a simple request',
      'Receive files already checked by our team',
      'Share the commission on every placement',
    ],
    cta: { label: 'Add your universities', to: '/universities' },
    note: 'You have universities',
  },
];

export const TOOLKIT_TEASER: { icon: IconName; title: string; text: string }[] = [
  { icon: 'users', title: 'Student CRM', text: 'Every student journey, from first enquiry to visa.' },
  { icon: 'match', title: 'Programme recommendations', text: 'A match score and admission chance for every programme.' },
  { icon: 'message', title: 'AI sales chatbot', text: 'Answers WhatsApp and Messenger enquiries, day and night.' },
  { icon: 'image', title: 'AI content marketing', text: 'Posters, short videos and captions, ready for your approval.' },
  { icon: 'chart', title: 'Daily ad boost', text: 'Your best post, boosted every day within your budget.' },
  { icon: 'globe', title: 'Your own portal', text: 'Your brand, on your own domain.' },
];
