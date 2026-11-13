import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
}

/**
 * Client-side document metadata. Open Graph tags are static in index.html for
 * now — link previews from crawlers that do not run JavaScript will show the
 * academy defaults. Prerendering is the follow-up if per-route previews matter.
 */
export function usePageMeta({ title, description }: PageMeta): void {
  useEffect(() => {
    document.title = title;
    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
  }, [title, description]);
}

function setMeta(attribute: 'name' | 'property', key: string, value: string): void {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attribute, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', value);
}
