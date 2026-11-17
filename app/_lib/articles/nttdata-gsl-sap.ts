import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const nttdataGslSap: ColumnArticle = {
  slug: 'nttdata-gsl-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  cardTitle: 'SAPの文脈で見るNTTデータGSL',
  title: 'SAPの文脈で見るNTTデータ グローバルソリューションズ｜中堅企業・導入後の支援・待遇を8つの観点で整理',
  summary:
    'NTTデータ グローバルソリューションズ（GSL）のSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰と公式発表など、公開情報だけで書いています。',
  keywords: ['NTTデータ グローバルソリューションズ', 'NTTデータGSL SAP', 'SAP専業', 'Public Edition', 'GROW with SAP', '中堅企業', '年収', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPコンサルと社内SEの違い', href: '/articles/consultant-vs-inhouse-se' },
  ],
  body: companyArticleBody('nttdata-gsl', [
    {
      type: 'p',
      text: 'NTTデータ グローバルソリューションズ（GSL）は、NTTデータグループでSAPを専門に手がける会社です。総合ファームとは違う「SAP専業」の会社として、SAPの仕事の中身がどう違うのかを、8つの観点で整理します。',
    },
    { type: 'h', text: '一言でいうと、中堅企業への導入と、導入後の支援に強いSAP専業' },
    {
      type: 'p',
      text: '2026年は、導入後の支援で契約の継続や追加導入を進めた Customer Success と、Public Editionを導入したアイメディアのプロジェクト（システムの切り替えは2日）で選ばれました。SAPジャパンの中堅企業向け導入パッケージを担う6社の1つでもあり、大企業に加えて中堅企業向けの導入も手がけています。',
    },
  ]),
};
