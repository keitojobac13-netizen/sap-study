import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const kpmgSap: ColumnArticle = {
  slug: 'kpmg-sap',
  status: 'published',
  publishedAt: '2026-11-18',
  category: 'career',
  topic: 'companies',
  cardTitle: 'SAPの文脈で見るKPMG',
  title: 'SAPの文脈で見るKPMGコンサルティング｜人事・AI・製造業・待遇を8つの観点で整理',
  summary:
    'KPMGコンサルティングのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2026年）と公式発表・採用ページなど、公開情報だけで書いています。',
  keywords: ['KPMG SAP', 'KPMGコンサルティング SAP', 'ES-SAP', 'SuccessFactors', 'SAP Business AI', 'Big4', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
  ],
  body: companyArticleBody('kpmg', [
    {
      type: 'p',
      text: 'KPMGコンサルティングは、Big4と呼ばれる世界的な会計事務所グループの1つ、KPMGのコンサルティング会社です。この記事では、SAPの仕事として見たときのKPMGを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、SAP事業を拡大しているBig4' },
    {
      type: 'p',
      text: 'KPMGはSAP社の監査を担当していたため、SAPの導入支援には制約がありました。2023年夏に監査契約が満了してからSAPの事業を広げていて、2026年にはKPMG全体でSAPのパートナープログラムの最上位にあたる「SAP Global Strategic Service Partner」の契約を結びました。国内でも、SAPジャパンの表彰で、人事システムの導入プロジェクトとSAP Business AIの2部門に選ばれています。',
    },
    {
      type: 'p',
      text: '公開事例では、ヨネックスとNOKのSAP SuccessFactors導入、ベルソニカのSAP S/4HANA Cloud導入が確認できます。人事の領域だけでなく、製造業の基幹システムの刷新にも取り組んでいることが分かります。',
    },
  ]),
};
