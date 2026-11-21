/**
 * Glossary terms that have a page of their own at /dictionary/<id>.
 *
 * Only terms with a longer explanation get a page; every other term is an
 * entry on the one-page glossary (/dictionary#<id>), and its old page URL
 * redirects there (next.config.ts). A page with only the one-paragraph
 * definition is too thin to stand on its own.
 *
 * Kept apart from glossary-pages.ts so client components can tell where a
 * term lives without bundling every explanation. TERM_PAGES is typed by this
 * list, so the two cannot drift: adding a page means adding its id here.
 */
export const TERM_PAGE_IDS = [
  'reconciliation-account',
  'posting-period',
  'controlling-area',
  'auc',
  'acdoca',
  'subledger',
  'clearing',
  'activity-price',
  'account-group',
  'teco',
  'gr-ir',
  'fiscal-year-variant',
  'document-reversal',
  'house-bank',
  'balance-carryforward',
  'allocation',
  'settlement-rule',
  'special-gl',
  'overhead-calculation',
  'material-ledger',
  'gl-account',
  'parked-document',
  'purchasing-group',
  'allocation-structure',
  'plant',
  'storage-location',
  'valuation-class',
  'material-type',
  'milestone',
  'costing-variant',
  'system-status',
  'document-splitting',
  'financial-statement-version',
  'exchange-rate-type',
  'functional-area',
  'asset-class',
  'depreciation-key',
  'dunning',
  'availability-control',
  'business-area',
  'account-determination',
  'user-status',
  'segregation-of-duties',
  'account-assignment-category',
  'release-strategy',
  'depreciation-area',
  'statistical-key-figure',
] as const;

export type TermPageId = (typeof TERM_PAGE_IDS)[number];

const IDS: ReadonlySet<string> = new Set(TERM_PAGE_IDS);

export function hasTermPage(id: string): id is TermPageId {
  return IDS.has(id);
}
