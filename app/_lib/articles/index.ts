import type { Block } from '../learning-types';

/**
 * Standalone columns: career, freelance, S/4HANA and certification topics
 * that do not belong to a single module. Japanese only — they are written for
 * the Japanese job market, and the affiliate programmes they may link to are
 * Japanese too.
 *
 * Articles are written ahead of time as drafts. A draft renders under
 * `next dev` so it can be proofread in the real layout, but a production build
 * leaves it out of every page, list, link and the sitemap. Publishing is a
 * one-line change: set `status: 'published'` and a `publishedAt` date.
 */

export type ArticleCategory = 'career' | 'freelance' | 's4hana' | 'certification';

export const CATEGORY_LABELS: Record<ArticleCategory, string> = {
  career: 'キャリア',
  freelance: 'フリーランス',
  s4hana: 'S/4HANA・動向',
  certification: '認定資格',
};

export type RelatedLink = { label: string; href: string };

type ArticleBase = {
  slug: string;
  title: string;
  /** One or two sentences. Meta description and list card; keep under 155 characters. */
  summary: string;
  category: ArticleCategory;
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

const ARTICLES: ColumnArticle[] = [];

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

export function getArticle(slug: string): ColumnArticle | undefined {
  return ARTICLES.find((a) => a.slug === slug && isVisible(a));
}

/** `2026-09-20` → `2026年9月20日` */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${y}年${m}月${d}日`;
}
