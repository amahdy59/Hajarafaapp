import { useEffect } from "react";

interface PageMetaOptions {
  description: string;
  title: string;
}

export function usePageMeta({ description, title }: PageMetaOptions) {
  useEffect(() => {
    document.title = title;

    const descriptionMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]'
    );

    if (descriptionMeta) {
      descriptionMeta.content = description;
    }
  }, [description, title]);
}
