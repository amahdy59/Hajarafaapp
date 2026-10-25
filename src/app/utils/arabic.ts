/**
 * Arabic & Multilingual text normalization utilities for e-commerce search.
 * Unifies letter variants (Alef, Ta Marbuta, Alef Maksura) and strips Tashkeel.
 */

export function normalizeArabic(text: string): string {
  if (!text) return "";

  return text
    // Normalize Unicode decomposition
    .normalize("NFKD")
    // Strip Arabic diacritics (Fatha, Damma, Kasra, Sukun, Shaddah, Tanwin, etc.)
    .replace(/[\u064B-\u065F\u0670]/g, "")
    // Normalize Alef variants (أ, إ, آ -> ا)
    .replace(/[أإآ]/g, "ا")
    // Normalize Ta Marbuta (ة -> ه)
    .replace(/ة/g, "ه")
    // Normalize Alef Maksura (ى -> ي)
    .replace(/ى/g, "ي")
    // Remove tatweel (kashida)
    .replace(/\u0640/g, "")
    .toLowerCase()
    .trim();
}

/**
 * Checks whether target string contains the search query,
 * supporting both normalized Arabic and case-insensitive English.
 */
export function matchesArabicOrEnglish(target: string | undefined | null, query: string): boolean {
  if (!target || !query) return false;

  const normalizedQuery = normalizeArabic(query);
  const normalizedTarget = normalizeArabic(target);

  return (
    normalizedTarget.includes(normalizedQuery) ||
    target.toLowerCase().includes(query.toLowerCase().trim())
  );
}
