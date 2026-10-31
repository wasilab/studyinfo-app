import type { Block } from './blocks';

export const TOOLKIT = {
  hero: {
    label: 'Agency toolkit',
    title: 'Everything your agency runs on, in one place',
  },
  blocks: [
    {
      title: 'A CRM built for student journeys',
      text: 'Track every student from first enquiry to visa. Each journey covers one destination and intake, through six stages: interest, application, offer, payment, visa and completion.',
      panel: {
        title: 'Operations centre',
        text: 'What needs action now: follow-ups, deadlines, problems and payments.',
      },
      features: [
        { title: 'One-click case file', text: 'A student’s profile and uploads, flattened into one PDF.' },
        { title: 'Bring your spreadsheets', text: 'Import students and prospects from CSV, with a dry run first.' },
      ],
    },
    {
      title: 'Recommendations you can explain',
      text: 'Score programmes against a student’s grades, budget, English score and goals. Every result shows a match score out of 100, an admission-chance label, the total cost and matching scholarships.',
      panel: {
        title: 'A reason for every match',
        text: 'Each score is broken down, so you can answer “why this one?”.',
      },
      features: [
        { title: 'English requirements, side by side', text: 'Section scores compared with each programme’s minimums.' },
        { title: 'Compare universities', text: 'Put up to three universities side by side.' },
      ],
    },
    {
      title: 'Tools your students will use',
      text: 'An AI sales chatbot on WhatsApp and Messenger, AI interview practice, an AI Counselor and a visa document review, all under your brand.',
      panel: {
        title: 'AI sales chatbot',
        text: 'Answers enquiries in English and Bangla, asks qualifying questions and hands scored leads to your team.',
      },
      features: [
        { title: 'AI interview practice', text: 'Students rehearse university and visa interviews by voice, and every answer is scored.' },
        { title: 'AI Counselor', text: 'A short questionnaire that turns an ad click into a lead with ranked programme matches.' },
        { title: 'Visa document review', text: 'Checks visa documents against the rules and gives a readiness score.' },
        { title: 'Leads, scored for you', text: 'Hot, warm and cold leads, with a handoff to your team whenever you choose.' },
      ],
    },
    {
      title: 'Marketing on autopilot',
      text: 'Up to three posts a day, two posters and a short video, with captions in English or Bangla, published to Facebook, Instagram, TikTok and YouTube once your team approves them.',
      panel: {
        title: 'Posts that learn',
        text: 'Every post is measured, and the next one builds on what worked.',
      },
      features: [
        { title: 'Daily ad boost', text: 'Set a monthly budget, and each day your best post is boosted on Meta or Google Ads, never over budget.' },
        { title: 'You approve everything', text: 'Review and edit every post before it goes live.' },
      ],
    },
    {
      title: 'Your brand, your domain',
      text: 'Your portal can run on your own domain, with your logo, colours and fonts, and its own search settings. Students see your agency.',
      panel: {
        title: 'Your own portal',
        text: 'Students browse programmes, get recommendations and follow their applications on your site.',
      },
      features: [],
    },
  ] satisfies Block[],
};
