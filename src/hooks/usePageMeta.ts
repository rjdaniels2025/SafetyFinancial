import { useEffect } from 'react';
import { site } from '../config/site';

/** Sets the document title, description and canonical/social URLs for the current page. */
export default function usePageMeta(title: string, description: string, path: string) {
  useEffect(() => {
    const fullTitle = path === '/' ? title : `${title} | ${site.name}`;
    const url = `${site.url}${path === '/' ? '' : path}`;
    document.title = fullTitle;

    const setMeta = (selector: string, attr: string, value: string) => {
      document.querySelector(selector)?.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', url);
    setMeta('link[rel="canonical"]', 'href', url);
  }, [title, description, path]);
}
