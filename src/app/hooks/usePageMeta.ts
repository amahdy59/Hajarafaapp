import { useEffect } from "react";

export type StructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

interface PageMetaOptions {
  description: string;
  title: string;
  structuredData?: StructuredData;
}

export function usePageMeta({ description, title, structuredData }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (descriptionMeta) {
      descriptionMeta.content = description;
    }
  }, [description, title]);

  useEffect(() => {
    if (!structuredData) return;

    const scriptId = "schema-org-structured-data";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(structuredData);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) {
        existing.remove();
      }
    };
  }, [structuredData]);
}

