import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const deloitteSap: ColumnArticle = {
  slug: 'deloitte-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  topic: 'companies',
  cardTitle: 'SAPの文脈で見るデロイト',
  title: 'SAPの文脈で見るデロイト トーマツ｜調達・人事・会計・グローバル案件を8つの観点で整理',
  summary:
    'デロイト トーマツのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2025年・2026年）と公式サイトなど、公開情報だけで書いています。',
  keywords: ['デロイト SAP', 'デロイト トーマツ SAP 強み', 'Spend Management', 'トヨタ 人事', 'Public Edition', 'Big4', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'SAPコンサルに必要な英語力', href: '/articles/sap-consultant-english' },
  ],
  body: companyArticleBody('deloitte', [
    {
      type: 'p',
      text: 'デロイト トーマツは、Big4と呼ばれる世界的な会計事務所グループのファームです。この記事では、SAPの仕事として見たときのデロイトを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、調達・人事・会計で表彰される、世界規模のSAP人材を持つBig4' },
    {
      type: 'p',
      text: '2026年は調達・経費の製品の売上とトヨタ自動車の人事基幹システム、2025年は商船三井ロジスティクスの会計システムへのPublic Editionの導入で選ばれています。世界で3万人を超えるSAP専門人材のネットワークを持つとしていて、海外にまたがる案件の土台があります。',
    },
  ]),
};
