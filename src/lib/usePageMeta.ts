import { useEffect } from 'react';
import { useLocation } from 'react-router';
import { BRAND } from '../config';
import { OG_IMAGE, absoluteUrl, jsonLd, seoFor, type Seo } from '../content/seo';

/** Finds or creates a `<meta>` tag by its `name` or `property`, and sets its content. */
function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Applies a page's title and search and social tags to the document head. */
function applySeo(seo: Seo) {
  const url = absoluteUrl(seo.path);
  document.title = seo.title;
  setMeta('name', 'description', seo.description);
  setMeta('name', 'robots', seo.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large');

  let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (seo.noindex) {
    canonical?.remove();
  } else {
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
  }

  setMeta('property', 'og:site_name', BRAND);
  setMeta('property', 'og:type', seo.type);
  setMeta('property', 'og:title', seo.title);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:url', url);
  setMeta('property', 'og:image', OG_IMAGE.url);
  setMeta('name', 'twitter:card', 'summary_large_image');
  setMeta('name', 'twitter:title', seo.title);
  setMeta('name', 'twitter:description', seo.description);

  let data = document.getElementById('structured-data');
  if (!data) {
    data = document.createElement('script');
    data.id = 'structured-data';
    data.setAttribute('type', 'application/ld+json');
    document.head.appendChild(data);
  }
  data.textContent = JSON.stringify(jsonLd(seo));
}

/**
 * Keeps the document title and search and social tags in step with the current route. Each page's
 * text lives in src/content/seo.ts; the build writes the same tags into the pre-rendered HTML.
 */
export function usePageMeta() {
  const { pathname } = useLocation();
  useEffect(() => applySeo(seoFor(pathname)), [pathname]);
}
