import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const abeamSap: ColumnArticle = {
  slug: 'abeam-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  cardTitle: 'SAPの文脈で見るアビーム',
  title: 'SAPの文脈で見るアビームコンサルティング｜SAPでの強み・グローバル案件・待遇を8つの観点で整理',
  summary:
    'アビームコンサルティングのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンとAPACの表彰、会社概要など、公開情報だけで書いています。',
  keywords: ['アビーム SAP', 'アビームコンサルティング SAP 強み', 'アビーム SAPコンサル', 'SCM', 'クリーンコア', 'アジア', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'アクセンチュアとアビームのSAP', href: '/articles/accenture-abeam-sap' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
  ],
  body: companyArticleBody('abeam', [
    {
      type: 'p',
      text: 'アビームコンサルティングは、日本に本社を置く総合ファームで、SAPとのパートナーシップは30年近くになります。この記事では、SAPの仕事として見たときのアビームを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、SCM・調達とアジア展開に強い日本発のファーム' },
    {
      type: 'p',
      text: '2026年は、SAPジャパンの表彰でSCM製品とINPEXのERP刷新、SAPのアジア太平洋地域（APAC）の表彰で導入の品質や調達領域など3部門に選ばれました。日本企業の基幹刷新と、アジアにまたがる展開の両方で実績が目立ちます。',
    },
  ]),
};
