import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  jsonLd?: Record<string, unknown>;
}

export function SEOHead({ title, description, jsonLd }: SEOHeadProps) {
  useEffect(() => {
    document.title = title;

    const setMeta = (selector: string, attrName: string, attrVal: string, content: string) => {
      let tag = document.querySelector(selector) as HTMLMetaElement | null;
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrVal);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', 'name', 'description', description);
    setMeta('meta[property="og:title"]', 'property', 'og:title', title);
    setMeta('meta[property="og:description"]', 'property', 'og:description', description);

    const existingScript = document.getElementById('tarifpilot-jsonld');
    if (existingScript) {
      existingScript.remove();
    }

    if (jsonLd) {
      const script = document.createElement('script');
      script.id = 'tarifpilot-jsonld';
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const cleanup = document.getElementById('tarifpilot-jsonld');
      if (cleanup) cleanup.remove();
    };
  }, [title, description, jsonLd]);

  return null;
}
