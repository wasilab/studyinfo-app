import { useEffect } from 'react';
import { BRAND } from '../config';

/** Sets the document title and meta description for the current page. */
export function usePageMeta(title: string | null, description: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${BRAND}` : `${BRAND} · The network for education agencies`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
