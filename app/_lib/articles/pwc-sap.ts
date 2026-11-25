import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const pwcSap: ColumnArticle = {
  slug: 'pwc-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  topic: 'companies',
  cardTitle: 'SAPの文脈で見るPwC',
  title: 'SAPの文脈で見るPwCコンサルティング｜人事・ERP刷新・育成・待遇を8つの観点で整理',
  summary:
    'PwCコンサルティングのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2025年・2026年）と公式発表など、公開情報だけで書いています。',
  keywords: ['PwC SAP', 'PwCコンサルティング SAP 強み', 'SuccessFactors', 'Mizkan', 'Big4', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
  ],
  body: companyArticleBody('pwc', [
    {
      type: 'p',
      text: 'PwCコンサルティングは、Big4と呼ばれる世界的な会計事務所グループのコンサルティング会社です。この記事では、SAPの仕事として見たときのPwCを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、人事とERP刷新で2026年に存在感を増したBig4' },
    {
      type: 'p',
      text: '2026年は、SuccessFactors（人事）の売上と、MizkanのERP刷新の2部門で選ばれ、MizkanはProject of the Year（最優秀プロジェクト）になりました。2025年もBTPの部門で選ばれていて、人事・ERP・開発基盤と幅広い製品で名前が挙がっています。',
    },
  ]),
};
