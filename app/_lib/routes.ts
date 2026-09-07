import type { Language, ModuleKey } from './i18n';

export const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sapstudy.jp';

/**
 * Japanese lives at the site root, English under /en.
 * Query-string locales (`?lang=en`) are gone: they produced duplicate URLs
 * that search engines collapse, hiding the English content entirely.
 */
export function localePrefix(lang: Language): string {
  return lang === 'en' ? '/en' : '';
}

export function homePath(lang: Language) {
  return localePrefix(lang) || '/';
}

export function modulePath(lang: Language, module: ModuleKey) {
  return `${localePrefix(lang)}/${module}`;
}

export function sectionPath(lang: Language, module: ModuleKey, section: string) {
  return `${localePrefix(lang)}/${module}/${section}`;
}

export function dictionaryPath(lang: Language) {
  return `${localePrefix(lang)}/dictionary`;
}

export function aboutPath(lang: Language) {
  return `${localePrefix(lang)}/about`;
}

export function contactPath(lang: Language) {
  return `${localePrefix(lang)}/contact`;
}

export function privacyPath(lang: Language) {
  return `${localePrefix(lang)}/privacy`;
}

export const OTHER_LANG: Record<Language, Language> = { ja: 'en', en: 'ja' };

/** canonical + hreflang metadata for a path that exists in both languages. */
export function alternatesFor(lang: Language, pathFor: (l: Language) => string) {
  return {
    canonical: `${BASE_URL}${pathFor(lang)}`,
    languages: {
      ja: `${BASE_URL}${pathFor('ja')}`,
      en: `${BASE_URL}${pathFor('en')}`,
      'x-default': `${BASE_URL}${pathFor('ja')}`,
    },
  };
}
