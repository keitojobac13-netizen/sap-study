import type { ColumnArticle } from './index';
import {
  AXES,
  CHECKED_ON,
  PAY_NOTE,
  SAP_TENSHOKU_BLOCK,
  companyListBlock,
  hubMatrixBlock,
  productMatrixBlock,
} from '../sap-companies';

export const sapCompanyAxes: ColumnArticle = {
  slug: 'sap-company-axes',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  cardTitle: 'SAPの会社を8つの観点で比べる',
  title: 'SAPの会社を8つの観点で比べる｜SAP領域・担当工程・育成・担当業務・待遇を公開情報で一覧に',
  summary:
    'アクセンチュア、アビーム、NTTデータ グローバルソリューションズ、PwC、デロイト、KPMG、シグマクシス。SAPの導入を手がける会社を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で、公開情報だけを使って一覧にしました。',
  keywords: [
    'SAP 会社 比較',
    'SAPコンサル 会社 比較',
    'SAP 強い 会社',
    'SAPコンサル 転職',
    'アクセンチュア',
    'アビーム',
    'NTTデータ グローバルソリューションズ',
    'PwC',
    'デロイト',
    'KPMG',
    'シグマクシス',
    '年収',
    '研修',
  ],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: 'アクセンチュアとアビームのSAP', href: '/articles/accenture-abeam-sap' },
    { label: 'SAPコンサルと社内SEの違い', href: '/articles/consultant-vs-inhouse-se' },
  ],
  body: [
    {
      type: 'p',
      text: 'SAPの導入を手がける会社を比べようとすると、出てくるのは年収ランキングや口コミが中心で、「SAPの仕事として何が違うのか」は見えにくいものです。',
    },
    {
      type: 'p',
      text: 'SAPコンサルタントの仕事内容やキャリアは、所属する会社だけでなく、担当するSAP製品、案件の規模、担当する工程によっても変わります。この記事では、各社の公開情報をもとに、8つの観点から違いを整理します。気になる会社があれば、会社ごとの記事で根拠まで確かめられます。',
    },

    { type: 'h', text: '8つの観点' },
    {
      type: 'table',
      caption: 'この記事で使う観点',
      stack: true,
      headers: ['観点', '比べる内容'],
      rows: AXES.map((a) => [a.label, a.question]),
    },
    {
      type: 'p',
      text: '「担当する工程」と「担当業務・専門性」は別の観点です。会社として構想から運用まで手がけていても、社員全員が上流工程を担当するわけではありません。前者は会社が提供するサービスの範囲、後者は入社した人が担う仕事を、求人の職種と職務内容から見ています。',
    },
    {
      type: 'note',
      variant: 'info',
      title: 'この記事の読み方',
      text: `この記事は会社の優劣をつけるランキングではありません。使っているのは、SAPジャパンの表彰（2025年・2026年）、各社の公式発表・採用ページ、導入事例、公開されている求人です（${CHECKED_ON}時点）。表彰は特定の領域での成果を示すもので、会社全体の技術力や、社員一人ひとりが経験できる仕事を保証するものではありません。また、公開されている情報の量は会社によって違うため、確認できなかったことは、その領域に強みがないという意味ではありません。`,
    },

    { type: 'h', text: '一覧で比べる' },
    hubMatrixBlock(),
    PAY_NOTE,

    { type: 'h', text: 'やりたいSAP領域から選ぶ' },
    {
      type: 'p',
      text: '「人事の案件がやりたい」「Public Editionの経験を積みたい」のように、やりたい仕事が決まっているなら、SAP領域ごとに見るのが早道です。',
    },
    productMatrixBlock(),

    { type: 'h', text: '目的ごとに見ると' },
    {
      type: 'list',
      items: [
        '導入から稼働後の運用まで関わりたいなら：アクセンチュア（2026年に運用サービスの部門で選出）、NTTデータ グローバルソリューションズ（導入後の支援で表彰、運用・保守専任の求人あり）、アビーム（SAPの運用最適化の求人あり）',
        '中堅企業向けのPublic Edition導入に関わりたいなら：NTTデータ グローバルソリューションズ（SAPジャパンの中堅企業向け導入パッケージを担う6社の1つ）',
        '海外拠点への展開に関わりたいなら：アクセンチュア（グローバル単位の案件が多いと公式に記載）、アビーム（ASEANや日米欧の案件例）、デロイト（グローバル導入や海外拠点の標準化の案件例）',
        '会計の刷新をPublic Editionでやりたいなら：シグマクシス（2年続けて最優秀プロジェクト）、デロイト（2025年に会計のPublic Editionをアドオンゼロで導入）',
        '人事の案件なら：PwC、デロイト、KPMG（2026年にヨネックスの人事システム導入で選出）',
        'SCM・調達なら：アビーム、PwC（需給計画）、デロイト（調達）、アクセンチュア',
        '研修制度を重視するなら：アクセンチュア（2026年に認定技術者の育成数で選出）、NTTデータ グローバルソリューションズ（企業内大学・SAP Academy）、アビーム（中途入社研修・資格取得支援）、PwC（SAP・Basis・PMOの専門組織での育成）',
        '経理などの業務経験からSAPの仕事に入りたいなら：シグマクシス（経理・販売・購買の業務経験とITの基礎スキルでも応募できる求人あり）',
      ],
    },

    { type: 'h', text: '会社ごとの記事' },
    {
      type: 'p',
      text: '会社ごとの記事では、8つの観点それぞれの根拠と、「この観点なら、こちらの会社も」という比べ方の案内をまとめています。',
    },
    companyListBlock(),
    {
      type: 'link',
      href: '/articles/sap-company-types',
      label: 'SAPコンサルの会社の種類と仕事の違い',
      text: 'ファーム・SIer・SAP専門会社の違いから考えるなら',
    },

    { type: 'h', text: '転職先を相談するなら' },
    {
      type: 'p',
      text: '公開情報で分かるのは会社全体の傾向までです。実際に入る部署の案件や、自分の経験でどの職位・年収になりそうかは、SAPの仕事を知っている転職エージェントに聞くのが確実です。',
    },
    SAP_TENSHOKU_BLOCK,

    { type: 'h', text: 'この記事の出典' },
    {
      type: 'list',
      items: [
        'SAPジャパン「SAP AWARD OF EXCELLENCE 2025受賞パートナーを発表」（2025年3月7日）',
        'SAPジャパン「SAP Appreciation for Partner Excellence 2026選出パートナーを発表」（2026年3月10日）。2026年から表彰の名前が「Award」から「Appreciation」に変わりました',
        'SAPジャパン「GROW with SAP」パートナー・パッケージ・プログラムの発表（2024年9月30日）',
        '各社の公式サイト・プレスリリース・採用ページ、有価証券報告書',
        'KPMGコンサルティング「2026年SAP Partner AwardsのRising Starを受賞」（2026年3月）',
        `待遇：${CHECKED_ON}時点で確認できた各社のSAP関連の求人（公式の採用ページ、ビズリーチ、paiza、アンビ、リクルートダイレクトスカウト）と、新卒の募集要項（公式の採用ページ、就職情報サイト）。KPMGコンサルティングは2026年11月18日に追加し、その時点で確認しました`,
      ],
    },
  ],
};
