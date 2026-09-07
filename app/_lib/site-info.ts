import type { Language } from './i18n';

/**
 * Operator details shown on /about.
 *
 * ⚠️ TODO(owner): replace `name` and `location` with the real values before
 * re-submitting to AdSense. Reviewers check that the site says who runs it;
 * a placeholder here is worse than no page at all. A handle or pen name is
 * acceptable — a full legal address is not required for a personal site,
 * but the prefecture/country should be real.
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
    name: '（運営者名を記入してください）',
    location: '日本',
    started: '2026年6月',
  },
  en: {
    siteName: 'SAP Study Portal',
    name: '(operator name — please fill in)',
    location: 'Japan',
    started: 'June 2026',
  },
};
