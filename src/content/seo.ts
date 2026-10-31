import { BRAND, CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE_LINK, SITE_URL } from '../config';
import { NETWORK } from './network';
import { POSTS } from './posts';

/*
 * Search and social metadata for every page, in one place. The build pre-renders each page with
 * these tags (scripts/prerender.mjs); in the browser, usePageMeta keeps them in step on navigation.
 */

export interface Seo {
  /** Canonical path: no query string, no trailing slash. */
  path: string;
  title: string;
  description: string;
  type: 'website' | 'article';
  noindex: boolean;
}

/** Titles stay under about 60 characters and descriptions under 160, so search results show them in full. */
const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${BRAND} · The Network for International Education Agencies`,
    description:
      'Send student files to agencies that can apply where you can’t, add your partner universities to receive verified files, and share the commission.',
  },
  '/send-files': {
    title: `Send Student Files to Applying Agencies · ${BRAND}`,
    description:
      'Submit a student’s file once. Our team checks every document and forwards it to an agency that can apply to the university. Your student stays yours.',
  },
  '/universities': {
    title: `Add Your Partner Universities · ${BRAND}`,
    description:
      'Request each partner university once and receive verified student files from agencies across the StudyInfo network, with commission tracked on every case.',
  },
  '/tracking': {
    title: `Student Application Case Tracking · ${BRAND}`,
    description:
      'Follow every case from document check to offer and commission. Each step has an owner, and one thread connects both agencies and our team.',
  },
  '/toolkit': {
    title: `Agency Toolkit: CRM, AI Chatbot and Marketing · ${BRAND}`,
    description:
      'A student CRM, programme recommendations, an AI sales chatbot for WhatsApp and Messenger, AI content marketing and your own branded portal.',
  },
  '/network': {
    title: 'How the StudyInfo Agency Network Works',
    description:
      'Agencies with students meet agencies with universities. See how a file travels, how both agencies stay anonymous and how the commission is shared.',
  },
  '/grow-with-us': {
    title: `Grow Your Education Agency with ${BRAND}`,
    description:
      'Three ways to grow: share commission on files you send, receive files for your universities and win more leads with the agency toolkit. Try the demo.',
  },
  '/about': {
    title: `About ${BRAND} · A Partnership for Education Agencies`,
    description:
      'StudyInfo is a partnership: Tablab Research builds and runs the technology, and Global Desire Education runs the network under an exclusive license.',
  },
  '/now': {
    title: `Guides for International Education Agencies · ${BRAND}`,
    description:
      'Practical guides on complete student files, document checks, English test scores and intake planning, plus notes on how StudyInfo works.',
  },
  '/contact': {
    title: `Contact ${BRAND} · Join the Agency Network`,
    description:
      'Talk to the StudyInfo team about joining the network, sending student files, adding your universities or booking a demo. Email, phone or WhatsApp.',
  },
};

const NOT_FOUND = { title: `Page not found · ${BRAND}`, description: 'This page does not exist.' };

/** Every page to pre-render and list in the sitemap. */
export const ROUTES: string[] = [...Object.keys(PAGES), ...POSTS.map((p) => `/now/${p.slug}`)];

export const OG_IMAGE = { url: `${SITE_URL}/og-image.png`, width: 1200, height: 630, alt: `${BRAND}: the network for international education agencies` };

export function canonicalPath(pathname: string) {
  const path = pathname.split(/[?#]/)[0].replace(/\/+$/, '');
  return path === '' ? '/' : path;
}

export const absoluteUrl = (path: string) => `${SITE_URL}${path === '/' ? '/' : path}`;

export function seoFor(pathname: string): Seo {
  const path = canonicalPath(pathname);
  const page = PAGES[path];
  if (page) return { path, ...page, type: 'website', noindex: false };
  const post = path.startsWith('/now/') ? POSTS.find((p) => `/now/${p.slug}` === path) : undefined;
  if (post) return { path, title: `${post.title} · ${BRAND}`, description: post.excerpt, type: 'article', noindex: false };
  return { path, ...NOT_FOUND, type: 'website', noindex: true };
}

/** Structured data for search engines (schema.org), using only facts the site already states. */
export function jsonLd(seo: Seo) {
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND,
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo-512.png`,
    email: CONTACT_EMAIL,
    telephone: CONTACT_PHONE_LINK.replace('tel:', ''),
    address: { '@type': 'PostalAddress', streetAddress: CONTACT_ADDRESS, addressLocality: 'Sylhet', addressCountry: 'BD' },
    contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: CONTACT_EMAIL, telephone: CONTACT_PHONE_LINK.replace('tel:', '') },
  };
  const graph: object[] = [
    org,
    { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, name: BRAND, url: `${SITE_URL}/`, inLanguage: 'en', publisher: { '@id': org['@id'] } },
  ];
  const url = absoluteUrl(seo.path);
  if (!seo.noindex) {
    graph.push({
      '@type': seo.path === '/about' ? 'AboutPage' : 'WebPage',
      '@id': `${url}#webpage`,
      url,
      name: seo.title,
      description: seo.description,
      isPartOf: { '@id': `${SITE_URL}/#website` },
    });
  }
  if (seo.path === '/network') {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: NETWORK.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    });
  }
  const post = seo.type === 'article' ? POSTS.find((p) => `/now/${p.slug}` === seo.path) : undefined;
  if (post) {
    graph.push(
      {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url,
        mainEntityOfPage: { '@id': `${url}#webpage` },
        image: OG_IMAGE.url,
        inLanguage: 'en',
        author: { '@id': org['@id'] },
        publisher: { '@id': org['@id'] },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
          { '@type': 'ListItem', position: 2, name: 'Guides', item: absoluteUrl('/now') },
          { '@type': 'ListItem', position: 3, name: post.title, item: url },
        ],
      },
    );
  }
  return { '@context': 'https://schema.org', '@graph': graph };
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** The `<head>` tags for one page, as HTML. Used by the pre-render. */
export function seoHead(seo: Seo) {
  const url = absoluteUrl(seo.path);
  const ld = JSON.stringify(jsonLd(seo)).replace(/</g, '\\u003c');
  return [
    `<title>${esc(seo.title)}</title>`,
    `<meta name="description" content="${esc(seo.description)}" />`,
    `<meta name="robots" content="${seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'}" />`,
    seo.noindex ? '' : `<link rel="canonical" href="${url}" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:type" content="${seo.type}" />`,
    `<meta property="og:title" content="${esc(seo.title)}" />`,
    `<meta property="og:description" content="${esc(seo.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE.url}" />`,
    `<meta property="og:image:width" content="${OG_IMAGE.width}" />`,
    `<meta property="og:image:height" content="${OG_IMAGE.height}" />`,
    `<meta property="og:image:alt" content="${esc(OG_IMAGE.alt)}" />`,
    '<meta property="og:locale" content="en_US" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(seo.title)}" />`,
    `<meta name="twitter:description" content="${esc(seo.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE.url}" />`,
    `<script type="application/ld+json" id="structured-data">${ld}</script>`,
  ]
    .filter(Boolean)
    .join('\n    ');
}
