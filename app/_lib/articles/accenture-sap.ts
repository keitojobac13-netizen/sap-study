import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const accentureSap: ColumnArticle = {
  slug: 'accenture-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  cardTitle: 'SAPの文脈で見るアクセンチュア',
  title: 'SAPの文脈で見るアクセンチュア｜SAPでの強み・担当工程・人材育成・待遇を8つの観点で整理',
  summary:
    'アクセンチュアのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2025年・2026年）と公式発表など、公開情報だけで書いています。',
  keywords: ['アクセンチュア SAP', 'アクセンチュア SAP 強み', 'アクセンチュア SAPコンサル', 'ADVANCE', 'SAP Cloud ERP', 'MSP', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'アクセンチュアとアビームのSAP', href: '/articles/accenture-abeam-sap' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
  ],
  body: companyArticleBody('accenture', [
    {
      type: 'p',
      text: 'アクセンチュアは、SAPの導入で必ず名前が挙がる外資系の総合ファームです。この記事では、SAPの仕事として見たときにアクセンチュアがどんな会社なのかを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、クラウドSAPの販売・導入・運用で幅広い実績' },
    {
      type: 'p',
      text: 'SAPジャパンの表彰では、2025年・2026年と2年続けてSAPクラウド製品の売上で最高位に選ばれ、2026年は運用サービス・認定技術者の育成を含む6部門に名前が挙がりました。販売・導入だけでなく、稼働後の運用や人材の育成まで、幅広い分野で評価されています。',
    },
    {
      type: 'p',
      text: '大規模な基幹システムの刷新に加えて、標準機能を生かした短期導入にも力を入れています。2026年4月にはSAPジャパンとクラウドERPの短期導入プログラム（ADVANCE）を本格化し、6月にはインフロニアHDの財務会計・経営管理の基盤を約3か月で構築したことが発表されました。',
    },
  ]),
};
