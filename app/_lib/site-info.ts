import type { Language, ModuleKey } from './i18n';

/**
 * Operator details shown on /about.
 *
 * A handle is deliberate: reviewers look for a named party who takes
 * responsibility for the site, not for a legal identity. A personal site
 * needs no address, but the country should stay accurate.
 */
export const SITE_OPERATOR: Record<Language, {
  siteName: string;
  name: string;
  location: string;
  started: string;
}> & { foundingDate: string } = {
  foundingDate: '2026-06-22',
  ja: {
    siteName: 'SAP学習ポータル',
    name: 'kei',
    location: '日本',
    started: '2026年6月',
  },
  en: {
    siteName: 'SAP Study Portal',
    name: 'kei',
    location: 'Japan',
    started: 'June 2026',
  },
};

/**
 * When the section articles were last rewritten. Google wants `datePublished`
 * and `dateModified` on an `Article`, and the site has no per-article dates,
 * so one honest site-wide date stands in for all of them.
 *
 * Bump this whenever the article bodies change substantially.
 */
export const ARTICLES_UPDATED = '2026-09-07';

/**
 * When each module's sections, summaries or quizzes last changed, for the
 * sitemap and each section's `dateModified`. Bump a module's date whenever
 * its `<module>.ts`, `<module>-content.ts` or `<module>-quizzes.ts` changes;
 * column links are dated automatically from the columns themselves.
 */
export const MODULE_CONTENT_UPDATED: Record<ModuleKey, string> = {
  fi: '2026-09-17',
  co: '2026-09-16',
  sd: '2026-09-14',
  mm: '2026-09-16',
  pp: '2026-09-14',
  abap: '2026-09-14',
  basis: '2026-09-14',
  ps: '2026-09-28',
};

/** When the glossary, the about page and the other standalone pages last changed. */
export const PAGE_UPDATED = {
  dictionary: '2026-09-28',
  about: '2026-09-28',
  contact: '2026-09-08',
  privacy: '2026-09-08',
} as const;
