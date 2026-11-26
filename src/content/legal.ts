import { BRAND, CREDITS_PER_USD, CONTACT_ADDRESS, CONTACT_EMAIL, LEGAL_ENTITY, PAYMENT_PROVIDER, REFUND_DAYS, SITE_URL, TECH_PROVIDER } from '../config';

/**
 * Copy for /refund-policy, /privacy-policy and /terms-of-service.
 * Update `UPDATED` whenever the text of any policy changes. Have a lawyer review these before relying on them.
 */

export type LegalBlock = { type: 'p'; text: string } | { type: 'ul'; items: string[] };

export interface LegalSection {
  id: string;
  title: string;
  body: LegalBlock[];
}

export interface LegalDoc {
  path: string;
  label: string;
  title: string;
  lead: string;
  /** ISO date the policy last changed. */
  updated: string;
  sections: LegalSection[];
}

export const UPDATED = '2026-11-26';

const p = (text: string): LegalBlock => ({ type: 'p', text });
const ul = (...items: string[]): LegalBlock => ({ type: 'ul', items });

const SITE = SITE_URL.replace('https://', '');

const CONTACT_SECTION = (id = 'contact'): LegalSection => ({
  id,
  title: 'Contact us',
  body: [
    p(`If you have any questions about this policy, contact ${LEGAL_ENTITY}:`),
    ul(`Email: ${CONTACT_EMAIL}`, `Post: ${LEGAL_ENTITY}, ${CONTACT_ADDRESS}, Bangladesh`),
  ],
});

/* ───────────────────────────── Refund policy ───────────────────────────── */

export const REFUND_POLICY: LegalDoc = {
  path: '/refund-policy',
  label: 'Refund policy',
  title: 'Refund policy',
  lead: `${BRAND} is pay as you go: you buy AI credits and they are used as your agency uses the AI tools. If you change your mind, unused credits can be refunded within ${REFUND_DAYS} days of purchase.`,
  updated: UPDATED,
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      body: [
        p(
          `This refund policy applies to AI credits (“Credits”) sold by ${LEGAL_ENTITY} through ${SITE}. Credits are bought at a rate of 1 USD = ${CREDITS_PER_USD} credits and are used to pay for ${BRAND}’s AI tools. There are no subscriptions. Joining the ${BRAND} network, sending student files and adding universities are free, so no refund applies to them.`,
        ),
        p(
          `Our order process is conducted by our online reseller ${PAYMENT_PROVIDER}.com. ${PAYMENT_PROVIDER} is the merchant of record for all our orders, and refunds are issued by ${PAYMENT_PROVIDER} to your original payment method.`,
        ),
      ],
    },
    {
      id: 'unused-credits',
      title: `${REFUND_DAYS}-day refund on unused credits`,
      body: [
        p(
          `You can request a refund of any unused Credits within ${REFUND_DAYS} days of the date you bought them. You don’t have to give a reason, although your feedback helps us improve.`,
        ),
        p(
          'If none of the Credits from a purchase have been used, we refund that purchase in full. If some have been used, we refund the unused part, in proportion to the price you paid. When we issue a refund, the refunded Credits are removed from your balance.',
        ),
      ],
    },
    {
      id: 'used-credits',
      title: 'Used credits',
      body: [
        p(
          'Credits are deducted as the AI tools do work for you: the more AI you use, the more Credits are deducted. Credits that have already been used are not refundable, because the AI work they paid for has been delivered.',
        ),
        p(`Purchases older than ${REFUND_DAYS} days are not refundable, except in the cases listed below or where the law requires it.`),
      ],
    },
    {
      id: 'exceptions',
      title: 'When we always refund',
      body: [
        p('Regardless of the time limits above, we will refund you in full, or restore the Credits to your balance, if:'),
        ul(
          'you were charged more than once for the same purchase;',
          'Credits were deducted because of an error or outage on our side, or for AI work that failed to complete; or',
          'you are entitled to a refund under the consumer protection laws that apply to you.',
        ),
      ],
    },
    {
      id: 'not-refundable',
      title: 'What is not covered',
      body: [
        ul(
          'Agency commission shared between agencies on a placement. Commission is not a fee paid to us and is handled as described in our Terms of Service.',
          `Fees charged by universities, testing bodies, embassies or other third parties.`,
          'Payments for accounts we closed because of a serious breach of our Terms of Service, such as fraud or submitting forged documents.',
        ),
      ],
    },
    {
      id: 'how-to-request',
      title: 'How to request a refund',
      body: [
        ul(
          `Reply to your ${PAYMENT_PROVIDER} receipt email or visit paddle.net to look up your order and request a refund; or`,
          `Email ${CONTACT_EMAIL} with the email address used for the purchase and your order number.`,
        ),
        p(
          `We confirm your request within 2 business days. Once approved, ${PAYMENT_PROVIDER} returns the money to your original payment method. It usually arrives within 5–10 business days, depending on your bank or card provider.`,
        ),
      ],
    },
    CONTACT_SECTION(),
  ],
};

/* ───────────────────────────── Privacy policy ───────────────────────────── */

export const PRIVACY_POLICY: LegalDoc = {
  path: '/privacy-policy',
  label: 'Privacy policy',
  title: 'Privacy policy',
  lead: `This policy explains what personal data ${BRAND} collects, why we collect it, who we share it with and the choices you have. We collect only what we need to run the network, and we never sell personal data.`,
  updated: UPDATED,
  sections: [
    {
      id: 'who-we-are',
      title: 'Who we are',
      body: [
        p(
          `${BRAND} is operated by ${LEGAL_ENTITY} (“we”, “us”), ${CONTACT_ADDRESS}, Bangladesh, under an exclusive license from ${TECH_PROVIDER}. ${LEGAL_ENTITY} is the controller of the personal data described in this policy.`,
        ),
        p(`${TECH_PROVIDER} builds and hosts the ${BRAND} platform and processes personal data on our behalf, under our instructions.`),
        p(
          `When an agency uploads a student’s file, that agency is responsible for having the student’s consent and a lawful basis to share it. We process the student’s data to provide the ${BRAND} service to that agency.`,
        ),
      ],
    },
    {
      id: 'data-we-collect',
      title: 'Data we collect',
      body: [
        p('Depending on how you use StudyInfo, we collect:'),
        ul(
          'Agency account data: your name, work email, phone number, agency name, country, role and login details.',
          'Student file data uploaded by agencies: student profile, contact details, passport, academic transcripts, English test scores, statements and other application documents.',
          'Case data: the status of each case, messages in the case thread, and commission status.',
          'Enquiries: the details you include when you contact us by email, phone, WhatsApp or the contact form.',
          `Billing data: your name, email, billing address and plan. Card and payment details are collected and processed by ${PAYMENT_PROVIDER}; we never see or store your full card number.`,
          'Technical data: IP address, browser and device type, and pages visited, collected in server logs for security and to keep the service running.',
        ),
      ],
    },
    {
      id: 'how-we-use-data',
      title: 'How we use data',
      body: [
        p('We use personal data, and rely on these legal bases, to:'),
        ul(
          'provide the service: check documents, forward files to applying agencies and universities, and track cases (performance of a contract);',
          'manage accounts, AI credit purchases and billing (performance of a contract);',
          'answer enquiries and provide support (legitimate interests, or steps before a contract);',
          'keep the service secure, prevent fraud and forged documents, and fix problems (legitimate interests);',
          'send service and billing notices, and product news you can opt out of (legitimate interests or consent);',
          'meet legal, tax and accounting obligations (legal obligation).',
        ),
      ],
    },
    {
      id: 'anonymity',
      title: 'Anonymity between agencies',
      body: [
        p(
          'Agencies on the network never see each other’s name, logo or contact details; they see only role labels. Students never see the case thread, the commission or the other agency. We share a student’s file with an applying agency and university only to the extent needed to apply for that student.',
        ),
      ],
    },
    {
      id: 'sharing',
      title: 'Who we share data with',
      body: [
        p('We do not sell or rent personal data. We share it only with:'),
        ul(
          `${TECH_PROVIDER}, which hosts and runs the platform for us;`,
          `${PAYMENT_PROVIDER} (Paddle.com Market Ltd), our merchant of record, to process payments, invoices, taxes and refunds. ${PAYMENT_PROVIDER} handles your payment data under its own privacy policy;`,
          'applying agencies and universities, for a specific student’s application;',
          'service providers that help us run StudyInfo, such as cloud hosting, email delivery and messaging, under contracts that protect your data;',
          'authorities, courts or advisers where the law requires it, or to protect our rights and users.',
        ),
      ],
    },
    {
      id: 'security',
      title: 'How we protect data',
      body: [
        p(
          'Student data is encrypted with a key unique to each agency, and all data is encrypted in transit. Access is limited to people who need it to do their job, and our team reviews documents only to run the document check.',
        ),
        p('No system is completely secure. If a breach affects your data, we will tell you and the relevant authorities as the law requires.'),
      ],
    },
    {
      id: 'retention',
      title: 'How long we keep data',
      body: [
        p(
          'We keep agency account data while your account is open. We keep student files and case data for as long as the agency that uploaded them keeps them on StudyInfo, and for up to 24 months after a case closes so that commission can be settled. Billing records are kept for as long as tax and accounting law requires. After that, we delete or anonymise the data.',
        ),
      ],
    },
    {
      id: 'your-rights',
      title: 'Your rights',
      body: [
        p('Depending on where you live, you may have the right to:'),
        ul(
          'access the personal data we hold about you and get a copy of it;',
          'correct data that is wrong or incomplete;',
          'ask us to delete your data;',
          'object to or restrict how we use your data;',
          'withdraw consent at any time, where we rely on consent;',
          'complain to your local data protection authority.',
        ),
        p(
          `To use any of these rights, email ${CONTACT_EMAIL}. We reply within 30 days. If you are a student, you can also ask the agency that holds your file, and we will help them respond.`,
        ),
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies',
      body: [
        p(
          `The ${SITE} website does not use advertising or tracking cookies. We use only the storage that is strictly necessary for the site and the platform to work, such as keeping you signed in. ${PAYMENT_PROVIDER} may set its own cookies during checkout to process payments securely and prevent fraud.`,
        ),
      ],
    },
    {
      id: 'international-transfers',
      title: 'International transfers',
      body: [
        p(
          'StudyInfo connects agencies and universities in many countries, so data may be processed outside the country you live in. When we transfer data, we use safeguards such as contractual protections to keep it protected to the standard described in this policy.',
        ),
      ],
    },
    {
      id: 'children',
      title: 'Students under 18',
      body: [
        p(
          'StudyInfo is a service for agencies, not for children. Some students may be under 18; in that case the agency uploading the file is responsible for having the consent of a parent or guardian.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Changes to this policy',
      body: [p('We may update this policy from time to time. We will change the date at the top and, for significant changes, tell account holders by email before they take effect.')],
    },
    CONTACT_SECTION(),
  ],
};

/* ───────────────────────────── Terms of service ───────────────────────────── */

export const TERMS_OF_SERVICE: LegalDoc = {
  path: '/terms-of-service',
  label: 'Terms of service',
  title: 'Terms of service',
  lead: `These terms are an agreement between your agency and ${LEGAL_ENTITY}, and they apply whenever you use ${BRAND}. Please read them carefully.`,
  updated: UPDATED,
  sections: [
    {
      id: 'agreement',
      title: 'About these terms',
      body: [
        p(
          `${BRAND} (${SITE}) is operated by ${LEGAL_ENTITY}, ${CONTACT_ADDRESS}, Bangladesh (“we”, “us”), under an exclusive license from ${TECH_PROVIDER}. These Terms of Service (“Terms”) govern your access to and use of the ${BRAND} website, network, platform and AI credits (the “Service”).`,
        ),
        p(
          'By creating an account, joining the network or buying AI credits, you agree to these Terms on behalf of yourself and the agency you represent, and you confirm you have authority to do so. If you do not agree, do not use the Service.',
        ),
      ],
    },
    {
      id: 'the-service',
      title: 'The service',
      body: [
        p(`${BRAND} is a business-to-business network for international education agencies. Through the Service, agencies can:`),
        ul(
          'send student files to agencies that can apply to a university (“Sending Agencies” and “Applying Agencies”);',
          'add partner universities and receive verified student files;',
          'track each case from document check to commission; and',
          'use the Agency Toolkit, including AI tools such as the AI sales chatbot, AI Counselor, AI interview practice, visa document review and AI content marketing, paid for with AI credits.',
        ),
        p('We do not guarantee that any student will receive an offer, a visa or a place at any university. Admission decisions belong to universities and authorities.'),
      ],
    },
    {
      id: 'accounts',
      title: 'Accounts and eligibility',
      body: [
        ul(
          'You must be a registered education agency or business, and at least 18 years old.',
          'You must give accurate information and keep it up to date.',
          'You are responsible for everything done through your account, and for keeping your login details secure. Tell us straight away if you suspect unauthorised use.',
          'We may review and approve agencies before they join the network, and may decline an application at our discretion.',
        ),
      ],
    },
    {
      id: 'agency-obligations',
      title: 'Your responsibilities',
      body: [
        p('When you use the Service, you agree to:'),
        ul(
          'upload only genuine, accurate and complete documents. Submitting forged or altered documents leads to immediate suspension;',
          'have each student’s informed consent (or a parent’s or guardian’s, where required) to share their personal data through StudyInfo;',
          'comply with all laws that apply to you, including data protection, consumer and anti-bribery laws, and the rules of the universities you work with;',
          'treat students honestly and not charge them fees that misrepresent the Service.',
        ),
      ],
    },
    {
      id: 'anonymity',
      title: 'Anonymity and non-circumvention',
      body: [
        p(
          'Agencies on the network see each other only through role labels. You agree not to try to identify, contact or deal directly with the other agency on a case to bypass StudyInfo or the commission share, during the case and for 12 months after it closes.',
        ),
      ],
    },
    {
      id: 'commission',
      title: 'Commission',
      body: [
        p(
          'Each university carries an agency commission. When a student sent through StudyInfo is placed, the commission is shared between the Sending Agency and the Applying Agency in the proportion shown on the case before it is forwarded. The commission step on the case records its status: pending, claimed and received.',
        ),
        p(
          'Commission depends on the university paying it, and on the student enrolling and meeting the university’s conditions. If a university reverses or claws back a commission, the shares are adjusted accordingly. Commission is not a fee for the Service and is not covered by our refund policy.',
        ),
      ],
    },
    {
      id: 'ai-credits',
      title: 'AI credits, billing and taxes',
      body: [
        p(
          `Our order process is conducted by our online reseller ${PAYMENT_PROVIDER}.com. ${PAYMENT_PROVIDER} is the merchant of record for all our orders. ${PAYMENT_PROVIDER} provides all customer service enquiries related to payment and handles returns. Purchases are also subject to ${PAYMENT_PROVIDER}’s Buyer Terms.`,
        ),
        ul(
          `${BRAND} is pay as you go. There are no subscriptions and nothing is charged automatically. You pay for AI tools by buying AI credits (“Credits”) in advance, at 1 USD = ${CREDITS_PER_USD} credits.`,
          'Credits are deducted from your agency’s balance each time an AI tool does work for you. The number of Credits an action uses depends on how much AI work it takes: the more AI you use, the more Credits are deducted.',
          'When your balance runs out, the AI tools pause until you buy more Credits. Features that do not use AI keep working.',
          'Credits have no cash value, cannot be transferred to another account and can only be used on StudyInfo.',
          'Prices are shown at checkout and may include VAT or sales tax depending on your location.',
          'We may change the credit rate or the Credits used by an AI action in future. We will tell you at least 30 days before a change takes effect; Credits you have already bought keep their value.',
        ),
      ],
    },
    {
      id: 'refunds',
      title: 'Refunds',
      body: [
        p(
          `Unused Credits can be refunded within ${REFUND_DAYS} days of purchase. Credits that have been used are not refundable. Full details are in our Refund Policy at ${SITE}/refund-policy, which forms part of these Terms.`,
        ),
      ],
    },
    {
      id: 'intellectual-property',
      title: 'Intellectual property',
      body: [
        p(
          `The Service, including its software, design, text and the ${BRAND} name and logo, is owned by ${TECH_PROVIDER} and licensed to ${LEGAL_ENTITY}. We grant you a limited, non-exclusive, non-transferable right to use the Service for your agency’s business while these Terms apply.`,
        ),
        p(
          'You keep all rights to the content and documents you upload. You give us permission to store, process, check and share that content only as needed to provide the Service.',
        ),
      ],
    },
    {
      id: 'acceptable-use',
      title: 'Acceptable use',
      body: [
        p('You must not:'),
        ul(
          'copy, resell or reverse engineer the Service, or access it by automated means except through features we provide;',
          'upload malware, or try to break or bypass our security;',
          'use the AI tools to create content that is misleading, unlawful, or infringes the rights of others;',
          'send spam or unsolicited messages to students through the Service;',
          'use the Service in a way that harms StudyInfo, other agencies, students or universities.',
        ),
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy and data protection',
      body: [
        p(
          `Our Privacy Policy at ${SITE}/privacy-policy explains how we handle personal data. For student data you upload, you are responsible for having a lawful basis to share it, and we process it to provide the Service to you.`,
        ),
      ],
    },
    {
      id: 'third-parties',
      title: 'Third-party services',
      body: [
        p(
          'The Service may connect to third-party services such as WhatsApp, Messenger and payment providers. Your use of those services is governed by their own terms, and we are not responsible for them.',
        ),
      ],
    },
    {
      id: 'disclaimers',
      title: 'Disclaimers',
      body: [
        p(
          'Our document check reviews whether files are complete and consistent; it is not a guarantee that documents are genuine or that an application will succeed. AI features may produce inaccurate results and should be reviewed before use. Except as stated in these Terms, the Service is provided “as is” and “as available”, to the extent the law allows.',
        ),
      ],
    },
    {
      id: 'liability',
      title: 'Limitation of liability',
      body: [
        p(
          'To the extent the law allows, we are not liable for indirect or consequential losses, or for lost profits, commission, revenue or data. Our total liability for any claim relating to the Service is limited to the amount you paid us for the Service in the 12 months before the claim.',
        ),
        p('Nothing in these Terms limits liability that cannot be limited by law, such as liability for fraud.'),
      ],
    },
    {
      id: 'termination',
      title: 'Suspension and termination',
      body: [
        p(
          'You can stop using the Service and close your account at any time. We may suspend or close an account if you seriously or repeatedly breach these Terms, submit forged documents, fail to pay, or if the law requires it. Where reasonable, we will give notice first. Sections that by their nature should continue, such as commission on cases already in progress, non-circumvention and limitation of liability, survive termination.',
        ),
      ],
    },
    {
      id: 'governing-law',
      title: 'Governing law and disputes',
      body: [
        p(
          'These Terms are governed by the laws of the People’s Republic of Bangladesh. We will first try to resolve any dispute informally; if we cannot, the courts of Sylhet, Bangladesh have exclusive jurisdiction, unless the law of your country gives you the right to bring a claim where you live.',
        ),
      ],
    },
    {
      id: 'changes',
      title: 'Changes to these terms',
      body: [
        p(
          'We may update these Terms from time to time. We will change the date at the top and, for significant changes, tell account holders by email at least 30 days before they take effect. Continuing to use the Service after that means you accept the updated Terms.',
        ),
      ],
    },
    CONTACT_SECTION(),
  ],
};

export const LEGAL_DOCS = [TERMS_OF_SERVICE, PRIVACY_POLICY, REFUND_POLICY];
