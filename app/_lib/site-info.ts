import type { Language } from './i18n';

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
    name: 'Keito',
    location: '日本',
    started: '2026年6月',
  },
  en: {
    siteName: 'SAP Study Portal',
    name: 'Keito',
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
