import type { Metadata } from 'next';
import type { Language, ModuleKey } from './i18n';
import type { ModuleContent, Section } from './learning-types';
import { sectionSummary } from './learning-types';
import { OG_IMAGES } from './og-image';
import { BASE_URL, modulePath, sectionPath } from './routes';

const SITE = { ja: 'SAP学習ポータル', en: 'SAP Study Portal' } as const;

function locale(lang: Language) {
  return lang === 'ja' ? 'ja_JP' : 'en_US';
}

/** Clamp to a length search engines actually display. */
function clamp(text: string, max = 155) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

/**
 * Open Graph and Twitter tags for one page. Next.js replaces the root
 * layout's `openGraph` block wholesale rather than merging it, so a page that
 * skips this is shared with the home page's URL and site-wide description.
 */
export function sharingMetadata({ lang, path, title, description, type = 'website' }: {
  lang: Language;
  path: string;
  title: string;
  description: string;
  type?: 'website' | 'article';
}): Pick<Metadata, 'openGraph' | 'twitter'> {
  return {
    openGraph: {
      type,
      locale: locale(lang),
      siteName: SITE[lang],
      url: `${BASE_URL}${path}`,
      title,
      description,
      images: OG_IMAGES,
    },
    twitter: { card: 'summary_large_image', title, description, images: OG_IMAGES },
  };
}

/**
 * Module page titles written for the search, "SAP CO とは" plus the topics a
 * searcher expects, rather than the bare module name.
 */
const MODULE_SEO_TITLES: Record<ModuleKey, Record<Language, string>> = {
  fi: {
    ja: 'SAP FI（財務会計）とは｜仕訳・買掛金・売掛金・固定資産・決算を解説',
    en: 'SAP FI (Financial Accounting) Explained: Journal Entries, AP, AR, Assets and Closing',
  },
  co: {
    ja: 'SAP CO（管理会計）とは｜原価センタ・内部指図・製品原価計算を解説',
    en: 'SAP CO (Controlling) Explained: Cost Centers, Internal Orders and Product Costing',
  },
  sd: {
    ja: 'SAP SD（販売管理）とは｜受注・出荷・請求・価格設定を解説',
    en: 'SAP SD (Sales and Distribution) Explained: Orders, Delivery, Billing and Pricing',
  },
  mm: {
    ja: 'SAP MM（資材管理）とは｜購買発注・入庫・請求書照合・在庫評価を解説',
    en: 'SAP MM (Materials Management) Explained: Purchasing, Goods Receipt and Valuation',
  },
  pp: {
    ja: 'SAP PP（生産管理）とは｜部品表・作業手順・MRP・製造指図を解説',
    en: 'SAP PP (Production Planning) Explained: BOMs, Routings, MRP and Production Orders',
  },
  abap: {
    ja: 'SAP ABAPとは｜開発環境・内部テーブル・Open SQL・デバッグを解説',
    en: 'SAP ABAP Explained: Development Tools, Internal Tables, Open SQL and Debugging',
  },
  basis: {
    ja: 'SAP Basisとは｜ユーザー・権限・トランスポート・システム監視を解説',
    en: 'SAP Basis Explained: Users, Authorizations, Transports and Monitoring',
  },
  ps: {
    ja: 'SAP PS（プロジェクト管理）とは｜WBS・ネットワーク・予算・決済を解説',
    en: 'SAP PS (Project System) Explained: WBS, Networks, Budgets and Settlement',
  },
};

export function buildModuleMetadata(mod: ModuleContent, lang: Language): Metadata {
  const key = mod.id as ModuleKey;
  const total = mod.sections.reduce((n, s) => n + s.quizzes.length, 0);
  const suffix =
    lang === 'ja'
      ? `全${mod.sections.length}セクション・${total}問の確認問題で体系的に学べます。`
      : `${mod.sections.length} sections and ${total} practice questions.`;
  // Some module descriptions lack a closing stop; add one so the appended
  // sentence does not run on ("学びます全10セクション").
  const base =
    lang === 'en'
      ? /[.!?]$/.test(mod.description) ? mod.description : `${mod.description}.`
      : /[。！？]$/.test(mod.description) ? mod.description : `${mod.description}。`;
  const description = clamp(`${base}${lang === 'ja' ? '' : ' '}${suffix}`);
  const heading = MODULE_SEO_TITLES[key]?.[lang] ?? mod.title;
  // Absolute, so the root layout template does not append the site name twice.
  const title = `${heading} | ${SITE[lang]}`;

  return {
    title: { absolute: title },
    description,
    ...sharingMetadata({ lang, path: modulePath(lang, key), title, description }),
  };
}

export function buildSectionMetadata(
  mod: ModuleContent,
  section: Section,
  lang: Language
): Metadata {
  const description = clamp(sectionSummary(section));
  const title = `${section.title} | ${mod.title} | ${SITE[lang]}`;

  return {
    title: { absolute: title },
    description,
    keywords: section.keywords,
    ...sharingMetadata({
      lang,
      path: sectionPath(lang, mod.id as ModuleKey, section.id),
      title: `${section.title} | ${mod.title}`,
      description,
      type: 'article',
    }),
  };
}
