import type { IconName } from '../components/ui/Icon';
import { CREDITS_PER_USD, PAYMENT_PROVIDER, REFUND_DAYS } from '../config';

/**
 * Copy for /pricing. StudyInfo is pay as you go: no plans and no subscription.
 * AI features use AI credits (1 USD = CREDITS_PER_USD credits), deducted as the AI is used.
 */

const RATE = `1 USD = ${CREDITS_PER_USD} credits`;

export const PRICING = {
  hero: {
    label: 'Pricing',
    title: 'Pay only for the AI you use',
    lead: 'No plans and no subscription. Top up AI credits, and credits are deducted as your agency uses the AI tools. The more AI you use, the more credits it uses.',
  },
  rate: RATE,
  /** Amounts shown as quick picks in the credit calculator, in USD. */
  amounts: [10, 25, 50, 100, 250],
  steps: [
    { title: 'Top up credits', text: `Buy AI credits at ${RATE}. Payments are processed securely by ${PAYMENT_PROVIDER}.` },
    { title: 'Use the AI tools', text: 'Your team and your students use the chatbot, counselor, interview practice and more.' },
    { title: 'Credits are deducted as used', text: 'Every AI action takes credits from your balance, in line with how much AI work it does.' },
    { title: 'Top up when you need more', text: 'No monthly bill. When your balance runs low, add more credits.' },
  ],
  /** Features that use AI credits. */
  usesCredits: [
    { icon: 'message', title: 'AI sales chatbot', text: 'Answers leads on WhatsApp and Messenger, day and night.' },
    { icon: 'sparkle', title: 'AI Counselor', text: 'Turns an ad click into a lead with ranked programme matches.' },
    { icon: 'mic', title: 'AI interview practice', text: 'Students rehearse university and visa interviews by voice.' },
    { icon: 'shield', title: 'Visa document review', text: 'Checks visa documents against the rules and gives a readiness score.' },
    { icon: 'image', title: 'AI content marketing', text: 'Writes and designs posts for your agency’s social channels.' },
  ] satisfies { icon: IconName; title: string; text: string }[],
  /** Things that never use credits. */
  free: [
    'Joining the StudyInfo network',
    'Sending student files',
    'Adding your partner universities',
    'Document check by our team',
    'Case tracking and the shared thread',
    'Shared commission on placements',
  ],
  faq: [
    {
      q: 'What are AI credits?',
      a: `AI credits are how you pay for StudyInfo’s AI tools. ${RATE}, so 10 USD buys 1,000 credits. Each time an AI tool does work for you, the credits it uses are deducted from your agency’s balance.`,
    },
    {
      q: 'How many credits does each AI action use?',
      a: 'It depends on how much AI work the action takes. A short chatbot reply uses fewer credits than a full interview practice session or a visa document review. The more AI you use, the more credits are deducted.',
    },
    {
      q: 'Is there a subscription or monthly fee?',
      a: 'No. StudyInfo is pay as you go. You only pay for the credits you buy, and nothing is charged automatically.',
    },
    {
      q: 'What happens when I run out of credits?',
      a: 'The AI tools pause until you top up. Everything else, including sending files, case tracking and the network, keeps working.',
    },
    {
      q: 'Who processes payments?',
      a: `Our order process is conducted by our online reseller ${PAYMENT_PROVIDER}.com. ${PAYMENT_PROVIDER} is the merchant of record for all our orders and handles billing, invoices, taxes and payment enquiries.`,
    },
    {
      q: 'Can I get a refund?',
      a: `Yes. You can request a refund of unused credits within ${REFUND_DAYS} days of buying them. Credits that have already been used are not refundable. See our refund policy for details.`,
    },
    {
      q: 'Which payment methods do you accept?',
      a: `${PAYMENT_PROVIDER} accepts major credit and debit cards, PayPal and other local payment methods depending on your country. Prices may include VAT or sales tax where it applies.`,
    },
  ],
};
