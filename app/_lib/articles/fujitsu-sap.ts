import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const fujitsuSap: ColumnArticle = {
  slug: 'fujitsu-sap',
  status: 'published',
  publishedAt: '2026-11-24',
  category: 'career',
  cardTitle: 'SAPの文脈で見る富士通',
  title: 'SAPの文脈で見る富士通｜RISE with SAP・自社導入OneERP+・保険業のSAP・待遇を8つの観点で整理',
  summary:
    '富士通のSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2025年・2026年）と公式発表・採用ページ・公式求人など、公開情報だけで書いています。',
  keywords: ['富士通 SAP', '富士通 SAPコンサル', 'RISE with SAP', 'プレミアムサプライヤー', 'OneERP+', 'SAP for Insurance', 'SIer', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
  ],
  body: companyArticleBody('fujitsu', [
    {
      type: 'p',
      text: '富士通は国内の大手ITサービス企業で、SAPの導入から運用までを手がけています。この記事では、SAPの仕事として見たときの富士通を、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、自社でもSAPを入れた大手SIer' },
    {
      type: 'p',
      text: '富士通は、自社のグローバルの基幹システムをSAP S/4HANA中心に刷新した「OneERP+」で、2025年にSAPジャパンのプロジェクト表彰を受けました。国内だけで6万人超が使う規模です。2023年には、日本企業として初めてRISE with SAPのプレミアムサプライヤーになり、RISE with SAPの構築から運用までを引き受けています。',
    },
    {
      type: 'p',
      text: '表彰では、東京海上日動火災保険への日本初のSAP for Insuranceの導入（2026年）や、中央省庁で初めてのERP案件（2025年）など、業種向けのSAPソリューションを使った大規模案件が目立ちます。公式の求人は、SAPコンサルタントのほか、Basis、アーキテクト、稼働後の運用（AMS）まであり、多くの求人でSAP認定資格を応募の必須条件にしています。',
    },
  ]),
};
