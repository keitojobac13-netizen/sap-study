import type { Block } from '../learning-types';
import { consignment } from './consignment';
import { documentDatePostingDate } from './document-date-posting-date';
import { creditMemoDebitMemo } from './credit-memo-debit-memo';
import { backflush } from './backflush';
import { ricefw } from './ricefw';
import { sapModules } from './sap-modules';
import { goodsIssueShipping } from './goods-issue-shipping';
import { fiBeginnerPitfalls } from './fi-beginner-pitfalls';
import { sapErrorTriage } from './sap-error-triage';
import { bpCviError } from './bp-cvi-error';
import { bpMaster } from './bp-master';
import { f110PaymentMedium } from './f110-payment-medium';
import { ck24MarkRelease } from './ck24-mark-release';
import { addonTracing } from './addon-tracing';
import { autoClearingF13 } from './auto-clearing-f13';
import { sapConsumptionTax } from './sap-consumption-tax';
import { wbsSettlementError } from './wbs-settlement-error';
import { withholdingTaxSetup } from './withholding-tax-setup';
import { costObjectChoice } from './cost-object-choice';
import { s4hanaTableFlow } from './s4hana-table-flow';
import { consultantVsInhouseSe } from './consultant-vs-inhouse-se';
import { sapFreelanceRates } from './sap-freelance-rates';
import { sapImplementationCost } from './sap-implementation-cost';
import { balanceVsOpenItemMigration } from './balance-vs-open-item-migration';
import { sapConsultantEnglish } from './sap-consultant-english';
import { sapCertificationValue } from './sap-certification-value';
import { sapCertCAct } from './sap-cert-c-act';
import { sapCertCBaipa } from './sap-cert-c-baipa';
import { sapCertCSac } from './sap-cert-c-sac';
import { sapCertCSigvt } from './sap-cert-c-sigvt';
import { sapPartnerExcellence2026 } from './sap-partner-excellence-2026';
import { sapCompanyTypes } from './sap-company-types';
import { accentureAbeamSap } from './accenture-abeam-sap';
import { sapCompanyAxes } from './sap-company-axes';
import { accentureSap } from './accenture-sap';
import { abeamSap } from './abeam-sap';
import { nttdataGslSap } from './nttdata-gsl-sap';
import { pwcSap } from './pwc-sap';
import { deloitteSap } from './deloitte-sap';
import { kpmgSap } from './kpmg-sap';
import { sigmaxyzSap } from './sigmaxyz-sap';
import { fujitsuSap } from './fujitsu-sap';
import { fb08FbraReversal } from './fb08-fbra-reversal';

/**
 * Standalone columns that answer one search question each — a term, a
 * difference between two terms, or an overview that spans modules. Japanese
 * only: the topics come from the Japanese queries in Search Console.
 *
 * Articles are written ahead of time as drafts. A draft renders under
 * `next dev` so it can be proofread in the real layout, but a production build
 * leaves it out of every page, list, link and the sitemap. Publishing is a
 * one-line change: set `status: 'published'` and a `publishedAt` date.
 */

export type ArticleCategory = 'term' | 'compare' | 'overview' | 'career';

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  term: '用語解説',
  compare: '違いの比較',
  overview: '全体像',
  career: 'キャリア',
};

/**
 * What the article is about, for grouping the list page. `category` says what
 * kind of article it is (a term, a comparison…); `topic` says where a reader
 * would look for it.
 */
export type ArticleTopic = 'fico' | 'logistics' | 'system' | 'basics' | 'career' | 'companies';

/** List-page sections, in the order they appear. */
export const TOPICS: { id: ArticleTopic; label: string; lead: string }[] = [
  { id: 'fico', label: '会計（FI・CO・PS）', lead: '消費税・源泉徴収・支払・原価・決済など、会計まわりの実務' },
  { id: 'logistics', label: '購買・在庫・販売', lead: '在庫の持ち方、出庫と出荷、取引先マスタなど' },
  { id: 'system', label: '移行・開発・トラブル対応', lead: 'テーブル、データ移行、エラーやアドオンの調べ方' },
  { id: 'basics', label: 'SAPの全体像・導入', lead: 'モジュールの全体像、開発の種類、導入費用' },
  { id: 'career', label: 'キャリア・資格', lead: '働き方、単価、英語、新形式のSAP認定資格' },
  { id: 'companies', label: 'SAPに強い会社', lead: '会社の種類と選び方、各社をSAPの文脈で見る' },
];

/**
 * 「よく読まれている記事」, most-read first. Hand-picked from Search Console
 * clicks (last 28 days as of 2026-11-25); refresh every month or two.
 */
const POPULAR_SLUGS = [
  'sap-consumption-tax',
  's4hana-table-flow',
  'document-date-posting-date',
  'cost-object-choice',
  'withholding-tax-setup',
];

export type RelatedLink = { label: string; href: string };

type ArticleBase = {
  slug: string;
  /** The full title: the article page heading, the `<title>` and the search result. */
  title: string;
  /**
   * Short title for list cards, where the full SEO title runs to three lines.
   * Keep it under about 24 characters. Falls back to the part of `title`
   * before the `｜` when not set.
   */
  cardTitle?: string;
  /** One or two sentences. Meta description and list card; keep under 155 characters. */
  summary: string;
  category: ArticleCategory;
  topic: ArticleTopic;
  keywords?: string[];
  body: Block[];
  /** Site pages to read next, shown below the article. */
  related?: RelatedLink[];
  /**
   * Set once the article carries affiliate links. Shows the PR notice that
   * the 2023 stealth-marketing rules (景品表示法) require.
   */
  hasAffiliateLinks?: boolean;
};

export type ColumnArticle =
  | (ArticleBase & { status: 'draft' })
  | (ArticleBase & { status: 'published'; publishedAt: string; updatedAt?: string });

const ARTICLES: ColumnArticle[] = [
  fb08FbraReversal,
  sapImplementationCost,
  sapCompanyAxes,
  accentureSap,
  abeamSap,
  nttdataGslSap,
  pwcSap,
  deloitteSap,
  kpmgSap,
  sigmaxyzSap,
  fujitsuSap,
  sapPartnerExcellence2026,
  sapCompanyTypes,
  accentureAbeamSap,
  sapCertCAct,
  sapCertCBaipa,
  sapCertCSac,
  sapCertCSigvt,
  sapCertificationValue,
  sapConsultantEnglish,
  balanceVsOpenItemMigration,
  consultantVsInhouseSe,
  sapFreelanceRates,
  s4hanaTableFlow,
  costObjectChoice,
  withholdingTaxSetup,
  wbsSettlementError,
  sapConsumptionTax,
  autoClearingF13,
  sapErrorTriage,
  bpMaster,
  bpCviError,
  f110PaymentMedium,
  ck24MarkRelease,
  addonTracing,
  fiBeginnerPitfalls,
  consignment,
  documentDatePostingDate,
  creditMemoDebitMemo,
  backflush,
  ricefw,
  sapModules,
  goodsIssueShipping,
];

const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

function isVisible(article: ColumnArticle) {
  return article.status === 'published' || SHOW_DRAFTS;
}

/** Newest first; drafts (dev only) sort ahead of everything published. */
function byDate(a: ColumnArticle, b: ColumnArticle) {
  const da = a.status === 'published' ? a.publishedAt : '9999';
  const db = b.status === 'published' ? b.publishedAt : '9999';
  return db.localeCompare(da);
}

/** Articles a reader can reach in this build. */
export function visibleArticles(): ColumnArticle[] {
  return ARTICLES.filter(isVisible).sort(byDate);
}

/** Published articles only, whatever the environment. For the sitemap. */
export function publishedArticles() {
  return ARTICLES.filter(
    (a): a is Extract<ColumnArticle, { status: 'published' }> => a.status === 'published'
  ).sort(byDate);
}

/** The 「よく読まれている記事」 list, skipping any slug not visible in this build. */
export function popularArticles(): ColumnArticle[] {
  return POPULAR_SLUGS.map((slug) => getArticle(slug)).filter(
    (a): a is ColumnArticle => a !== undefined
  );
}

export function getArticle(slug: string): ColumnArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug && isVisible(a));
}

/** Title for list cards: the authored short title, else the part before `｜`. */
export function cardTitle(article: ColumnArticle): string {
  return article.cardTitle ?? article.title.split('｜')[0];
}

/** `2026-09-20` → `2026年9月20日` */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}
