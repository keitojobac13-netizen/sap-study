import type { Block } from './learning-types';

/**
 * One record per company for the "SAPの会社を8つの観点で比べる" series.
 * The hub tables, each company page's overview and the "この観点なら" links
 * are all built from here, so a new year's partner awards are one edit.
 *
 * Rules for the data (checked 2026-11-17):
 * - Only facts from a public source: SAP Japan press releases (partner
 *   awards 2025/2026), the company's own site, recruiting pages and press
 *   releases, and job postings for pay. Name the source in the text.
 * - No grades. Awards measure different things (sales, a project, a
 *   managed-service model), so one scale across them would be unfair.
 *   Write what can be confirmed instead.
 * - No reputations, reviews or anything heard inside a project.
 *
 * Sources used throughout:
 * - SAP AWARD OF EXCELLENCE 2025: news.sap.com/japan/2025/03/0307_sap-award-of-excellence-2025/
 * - SAP Appreciation for Partner Excellence 2026: news.sap.com/japan/2026/03/0310_sap-appreciation-for-partner-excellence-2026/
 * - GROW with SAP partner packages (2024-09-30): news.sap.com/japan/?p=18861
 * - Accenture job R00334432 (accenture.com/jp-ja/careers), ABeam HRMOS job 1717346057821540356
 *   and abeam.com mid-career training page, NTT DATA GSL recruit/info, PwC Enterprise Solution
 *   department page, Deloitte jposting job 281, SIGMAXYZ HRMOS job EP_26002
 */

export const CHECKED_ON = '2026年11月17日';

export type AxisId =
  | 'position'
  | 'products'
  | 'scope'
  | 'projects'
  | 'global'
  | 'talent'
  | 'roles'
  | 'pay';

export const AXES: { id: AxisId; label: string; question: string }[] = [
  { id: 'position', label: '企業の立ち位置', question: '総合ファーム・SIer・SAP専門会社など、どんな会社か' },
  { id: 'products', label: '実績が目立つSAP領域', question: 'ERP・会計・SCM・人事・調達・BTPなど、公開された実績が目立つ領域' },
  { id: 'scope', label: '担当する工程', question: '会社として、構想策定・要件定義・導入・稼働後の運用のどこまでを打ち出しているか' },
  { id: 'projects', label: '顧客・案件の特徴', question: '大企業か中堅企業か、新規導入・刷新・移行など、公開された案件の傾向' },
  { id: 'global', label: 'グローバル案件', question: '海外拠点へのSAP導入の実績と、海外と連携する体制' },
  { id: 'talent', label: '人材育成・キャリア', question: 'SAP研修・資格取得支援など、公式に公開されている育成の制度' },
  { id: 'roles', label: '担当業務・専門性', question: '求人の職種と職務内容から見える、入社後に担う仕事' },
  { id: 'pay', label: '待遇・働き方', question: 'SAP関連の求人の提示年収、新卒の初任給、勤務制度' },
];

export type ProductId = 'erp-public' | 'erp-private' | 'finance' | 'hr' | 'scm' | 'spend' | 'btp-data';

export const PRODUCTS: { id: ProductId; label: string }[] = [
  { id: 'erp-public', label: 'ERP（Public Edition）' },
  { id: 'erp-private', label: 'ERP（Private Edition・RISE with SAP関連）' },
  { id: 'finance', label: '会計・経営管理' },
  { id: 'hr', label: '人事（SuccessFactors）' },
  { id: 'scm', label: 'SCM・需給計画' },
  { id: 'spend', label: '調達・経費（Ariba・Spend）' },
  { id: 'btp-data', label: 'BTP・データ' },
];

/** Features used only to suggest other company pages. */
type Tag = 'midmarket' | 'run';

const TAG_REASONS: Record<Tag, string> = {
  midmarket: '中堅企業向けの導入に関わりたいなら',
  run: '稼働後の運用・保守まで関わりたいなら',
};

type Entry = {
  /** A few words for tables. */
  short: string;
  /** One to three sentences for the company page. */
  text: string;
};

export type CompanyId = 'accenture' | 'abeam' | 'nttdata-gsl' | 'pwc' | 'deloitte' | 'kpmg' | 'sigmaxyz';

export type Company = {
  id: CompanyId;
  name: string;
  /** Column slug under /articles. */
  slug: string;
  /** For the hub's company list. */
  oneLine: string;
  products: { id: ProductId; evidence: string }[];
  tags: Tag[];
  /** When this company's facts were checked, if not CHECKED_ON. */
  checkedOn?: string;
  axes: Record<AxisId, Entry>;
};

export const COMPANIES: Company[] = [
  {
    id: 'accenture',
    name: 'アクセンチュア',
    slug: 'accenture-sap',
    oneLine: 'SAPクラウドの売上・運用・認定技術者の育成で表彰される外資系ファーム',
    products: [
      { id: 'erp-public', evidence: 'ADVANCE（2026年4月）でPublic Editionを含むSAP Cloud ERPを中核に' },
      { id: 'erp-private', evidence: 'ENEOSのS/4HANAバージョンアップとRISE化（2026年 Project Excellence）' },
      { id: 'btp-data', evidence: 'SAP BTP部門（2026年）、MSPとして日本初のSAP Business Data Cloud案件' },
      { id: 'finance', evidence: 'インフロニアHDの財務会計の基盤をSAP Cloud ERPで約3か月で構築（2026年6月発表）' },
      { id: 'spend', evidence: 'SAP Spend Management部門（2025年）' },
      { id: 'scm', evidence: 'SAP Supply Chain Management部門（2025年）' },
    ],
    tags: ['run'],
    axes: {
      position: {
        short: '外資系の総合ファーム',
        text: '世界規模のコンサル・IT企業の日本法人で、日本の社員は約3万1千人（2026年9月時点、同社サイト）。SAPとの協働は40年以上としています。',
      },
      products: {
        short: 'クラウドERP・BTP・データ',
        text: '2025年・2026年と2年続けて、SAPクラウド製品の売上で最高位（The Top Service Partner）に選ばれています。製品の部門では、2025年に調達・SCM・サステナビリティ、2026年にBTP・サステナビリティで選ばれました。',
      },
      scope: {
        short: '計画段階から運用まで',
        text: '公式の求人では、SAPプロジェクトは「ほぼすべてが直接受注」で、計画段階を含む全工程をカバーしているとしています。2026年には The Top Managed Service Provider に選出されました。大手製造業向けの複数のSAP Cloud ERP Private案件や、日本初のSAP Business Data Cloud案件をMSPとして獲得した実績などが評価されています。',
      },
      projects: {
        short: '大企業・グローバルの大規模案件',
        text: '公式の求人では、お客様は国内を代表する大企業や外資系企業が中心で、半導体メーカーのグローバル基幹システム構築や、企業統合に伴う基幹システムの統合などを例に挙げています。表彰された案件は、ENEOSのバージョンアップとRISE化の同時実施（2026年）、サカタインクスのS/4HANA導入（2025年、アドオンを66本に抑えた）です。ENEOSのような既存の基幹システムの大規模な刷新に加えて、インフロニアHDのようにSAP Cloud ERPを約3か月で導入した案件もあり、標準機能を生かしたクラウドERPの短期導入も進めていることが分かります。',
      },
      global: {
        short: '公式求人でグローバル案件が多いと説明',
        text: '公式の求人では「グローバル単位でのプロジェクトが多い」とし、海外拠点や社内の複数部署と連携して進めるとしています。会社全体の社員は世界で約81万4千人です（全社の人数で、SAP部門の人数ではありません）。',
      },
      talent: {
        short: '認定技術者の育成数で表彰',
        text: '2026年は The Top Resource Partner に選ばれ、SAPのクラウド領域で最も多くのSAP認定技術者を育成したと評価されています。公式の求人では、グローバルのSAPトレーニングに加え、日本独自のトレーニングも開発・開催しているとしています。',
      },
      roles: {
        short: 'コンサルタント／エンジニア、将来のPM',
        text: '公式の求人は「SAPコンサルタント／エンジニア」「SAP S/4HANA professionals」など。大規模プロジェクトのプロジェクトマネージャーを目指せること、SAPと他のソリューションを同時に入れる案件も多いことを打ち出しています。',
      },
      pay: {
        short: '中途の求人で480万〜2,500万円、在宅・フレックス',
        text: 'SAPコンサルタント／エンジニアの中途の求人に載っている年収は480万〜2,500万円でした（paiza、2026年3月更新）。働き方の制度として、フレックス、在宅勤務、短日・短時間勤務を公開しているほか、2022年8月には日本国内で住む場所を選べる「ロケーション フレキシビリティ」制度を導入しています（同社のキャリアブログ）。どの制度を使えるかは職種や案件で変わるため、個別に確認が必要です。',
      },
    },
  },
  {
    id: 'abeam',
    name: 'アビームコンサルティング',
    slug: 'abeam-sap',
    oneLine: '日本発・アジア発の総合ファーム。SCM・調達と、アジアへの展開で実績',
    products: [
      { id: 'erp-private', evidence: 'INPEXのERP刷新、既存アドオンを約60％削減（2026年 Project Excellence）' },
      { id: 'scm', evidence: 'SAP Supply Chain Management部門（2026年）' },
      { id: 'spend', evidence: 'APACのSAP Partner Awardsで調達領域の販売部門（2026年）' },
      { id: 'finance', evidence: 'みずほフィナンシャルグループの資産・予算管理システム更改（2025年 プロジェクト表彰）' },
    ],
    tags: ['run'],
    axes: {
      position: {
        short: '日系の総合ファーム',
        text: '1981年に等松・トウシュロス コンサルティングとして設立し、2003年にデロイトから独立して現社名に。2004年にNECと資本提携しています。連結の社員は9,632人（2026年4月時点、同社サイト）。SAPとのパートナーシップは30年近くとしています。',
      },
      products: {
        short: 'SCM・調達・ERP刷新・会計',
        text: '2026年はSCM製品の売上と、INPEXのERP刷新で選ばれました。2025年は、みずほフィナンシャルグループの資産・予算管理システムの更改（RISE with SAPや自社の不動産管理ソリューションなどを使用）でプロジェクト表彰を受けています。',
      },
      scope: {
        short: '構想・戦略立案から導入、運用改善',
        text: '公式の求人では、あるべき姿の策定や戦略立案の段階から入り、要件定義・導入まで関わることを想定しています。SAPの運用の最適化を担うアプリケーションマネジメントの求人もあり、事業としてアウトソーシングも手がけています。',
      },
      projects: {
        short: '大手製造業・金融・資源',
        text: '公式の求人では、大手製造業のグローバル経営基盤の構築や、日系製造業のSCM刷新などを入社後の案件の例に挙げています。表彰された案件は、INPEX（2026年）とみずほフィナンシャルグループ（2025年）です。',
      },
      global: {
        short: 'アジア中心の自社拠点',
        text: '自らを「日本発・アジア発」のファームと位置づけ、アジアを中心に拠点を持ちます（2026年にインドへ拠点を開設）。公式の求人では、ASEAN地域でのIBP・Aribaを使った改革や、日米欧でのS/4HANA導入を案件の例に挙げています。2026年はSAPのAPACの表彰（SAP Partner Awards）で3部門を受賞しました。',
      },
      talent: {
        short: '中途入社研修と資格取得支援',
        text: '中途入社者向けに、入社直後の10日間の研修（ロジカルシンキング、ドキュメンテーション、同社の方法論、プロジェクトマネジメントの基礎など）があります。キャリアの段階に応じた研修、資格取得の一時金と維持費用の支援、語学学習の支援も公開しています（同社の経験者採用サイト）。',
      },
      roles: {
        short: '業務・戦略寄りのコンサル、SAPテクノロジー',
        text: 'SAPのオープンポジションは Strategy Consultant 職・Solution Consultant 職として募集され、財務・会計、サプライチェーン、ITの領域に分かれます。S/4HANAへの移行やBTPを扱うSAPテクノロジーの求人もあります。なお、グループ会社のアビームシステムズでもBasisやSuccessFactorsのコンサルタントを募集していますが、採用する会社と担当する業務は異なります。',
      },
      pay: {
        short: '中途の求人で690万〜2,500万円',
        text: '公式の求人（SAPのオープンポジション）の年収は690万〜2,500万円で、賞与は年2回、フレックスタイム制です。新卒は、2027年卒のテクノロジーコンサルタントコースで学部卒の月給388,800円と掲載されています（就職情報サイトの募集要項）。',
      },
    },
  },
  {
    id: 'nttdata-gsl',
    name: 'NTTデータ グローバルソリューションズ',
    slug: 'nttdata-gsl-sap',
    oneLine: 'NTTデータグループのSAP専業会社。中堅企業向けと導入後の支援で実績',
    products: [
      { id: 'erp-public', evidence: 'アイメディアにPublic Editionをクリーンコアで導入、システムの切り替えは2日（2026年 Project Excellence）' },
      { id: 'erp-private', evidence: '伯東の国内外6社を同時にRISE with SAPのPrivate Editionへ移行（2025年 プロジェクト表彰）' },
    ],
    tags: ['midmarket', 'run'],
    axes: {
      position: {
        short: 'SAP専業（NTTデータグループ）',
        text: '2012年にSAP専業の会社として発足し、NTTデータグループの国内外のSAP事業を担う会社です（NTTデータの発表）。',
      },
      products: {
        short: 'Public Edition・S/4HANAへの移行',
        text: '2026年はアイメディアへのPublic Editionの導入（システムの切り替えは2日）、2025年は伯東のS/4HANAへの移行でプロジェクト表彰を受けています。',
      },
      scope: {
        short: '構想から導入、運用保守まで',
        text: '構想策定から導入、運用保守までをまとめて提供するとしています。2026年は Customer Success に選ばれ、導入後の支援でクラウド製品の契約の継続や追加導入を進めたことが評価されました。',
      },
      projects: {
        short: '大企業と中堅企業、移行と新規導入',
        text: 'SAPジャパンが2024年に始めた中堅・中小企業向けの短期・固定価格の導入パッケージ（GROW with SAP）で、SIを担う6社の1つです。表彰された案件は、伯東の国内外6社の同時移行（2025年）と、アイメディアのPublic Editionの新規導入（2026年）です。',
      },
      global: {
        short: '国内外の拠点の同時移行の実績',
        text: '伯東の案件では、国内・海外の合計6社の基幹システムを同時に移行しています（2025年の表彰）。',
      },
      talent: {
        short: '企業内大学とSAP Academy',
        text: '公式の採用ページで、企業内大学の「GSL大学」（研究室活動、公開講座、階層別研修など）、SAP認定資格を取得できる「SAP Academy」、資格取得報奨金、TOEIC受験支援、自己啓発支援金を公開しています。',
      },
      roles: {
        short: '導入のコンサルと、運用保守の専任',
        text: '公式の募集職種一覧は「構想策定」「新規導入」「運用保守」の3つに分かれ、会計・販売物流・購買在庫・生産の業務・SAPコンサルタント、SAP BTPコンサルタント、Basis、プロジェクトマネージャー、運用・保守の専任コンサルタントなどを募集しています。SAPを軸にしながら、業務領域やテクノロジー領域の専門性を深めるキャリアが考えられます。',
      },
      pay: {
        short: '中途の求人で600万〜1,300万円',
        text: '中途の求人に載っている年収は、SAPコンサルタントで800万〜1,300万円（ビズリーチ）、運用・保守のSAPコンサルで600万〜1,049万円（アンビ）でした。公式の新卒の募集要項では、学士の月額は379,167円（35時間分の時間外手当を含む）。フレックスタイム制（コアタイムなし）、リモートワーク手当、年間休日120日以上と公開しています。',
      },
    },
  },
  {
    id: 'pwc',
    name: 'PwCコンサルティング',
    slug: 'pwc-sap',
    oneLine: '人事（SuccessFactors）とERP刷新で表彰されるBig4。SAPの専門組織を持つ',
    products: [
      { id: 'hr', evidence: 'SAP SuccessFactors HCM部門（2026年）、スタンレー電気の人事基盤（2025年）' },
      { id: 'erp-private', evidence: 'MizkanのRISE with SAP・IBPによる刷新（2026年 Project of the Year）' },
      { id: 'scm', evidence: 'MizkanでIBP（需給計画）を活用' },
      { id: 'finance', evidence: '東京ガスグループの管理会計プラットフォームをSAP Analytics Cloudで構築（2026年6月）' },
      { id: 'btp-data', evidence: 'SAP BTP部門（2025年）、SAP BTP Hackathonで2年連続の最優秀賞（2024年・2025年）' },
    ],
    tags: [],
    axes: {
      position: {
        short: 'Big4の総合ファーム',
        text: '世界的な会計事務所グループ（Big4）のコンサルティング会社です。SAPを中心にしたテクノロジーとコンサルティングの専門組織「エンタープライズソリューション」を2022年7月に立ち上げています（同社の採用サイト）。',
      },
      products: {
        short: '人事・ERP刷新・管理会計・BTP',
        text: '2026年はSuccessFactorsの売上と、MizkanのERP刷新（Project of the Year）の2部門、2025年はBTPの部門で選ばれています。2026年6月には、東京ガスグループの管理会計プラットフォームの稼働も発表しました。',
      },
      scope: {
        short: '構想策定から定着化まで',
        text: '採用サイトの部門紹介では、構想策定から要件定義、実装、定着化までを一貫して支援できる体制だとしています。',
      },
      projects: {
        short: '大企業の刷新',
        text: '公開された案件は、Mizkan（365日稼働のチルド業務を含む基幹の刷新）、スタンレー電気（人事基盤）、東京ガスグループ（管理会計）など大企業です。',
      },
      global: {
        short: 'ロールイン・ロールアウト、海外オフィスとの連携',
        text: 'SAP関連の求人では、SAPのロールイン・ロールアウトの支援が業務に挙がり、PwCの海外オフィスと連携するクロスボーダー案件も増えているとしています（ビズリーチ掲載の求人）。部門紹介でも、PwCのグローバルネットワークとの連携を加速しているとしています。',
      },
      talent: {
        short: 'SAP・Basis・PMOの専門組織で育成',
        text: '部門紹介で、Center of Excellence（SAP／Basis／R&D／PMO）を中心に、若手から経験者まで継続的な能力開発を支援するとしています。',
      },
      roles: {
        short: '業務改革・アーキテクチャ・PMO・ロールアウト',
        text: 'SAP関連の求人には、業務改革とSAPの導入のほか、PMO、オフショア開発や複数ベンダーの管理、SAPのロールイン・ロールアウトの支援、システムアーキテクチャの設計、BTPを含むミドルウェアを使ったソリューション提案が挙がっています（ビズリーチ掲載の求人）。専門組織がSAP・Basis・R&D・PMOに分かれていることからも、基盤やプロジェクト管理の専門職としての道があることが分かります。',
      },
      pay: {
        short: '中途の求人で600万〜2,000万円',
        text: 'SAP関連の中途の求人に載っている年収は600万〜2,000万円でした（リクルートダイレクトスカウト）。同じ求人に、フレックス・リモート勤務と書かれています。',
      },
    },
  },
  {
    id: 'deloitte',
    name: 'デロイト トーマツ',
    slug: 'deloitte-sap',
    oneLine: '調達・人事・会計のPublic Editionで表彰されるBig4',
    products: [
      { id: 'spend', evidence: 'SAP Spend Management部門（2026年）' },
      { id: 'hr', evidence: 'トヨタ自動車の人事基幹システム（2026年 Project Excellence）' },
      { id: 'erp-public', evidence: '商船三井ロジスティクスの会計システムにPublic Editionをアドオンゼロで導入（2025年 プロジェクト表彰）' },
      { id: 'finance', evidence: '商船三井ロジスティクスの次期会計システム（2025年）' },
      { id: 'scm', evidence: '製薬会社へのIBP導入を求人の案件例に掲載' },
    ],
    tags: [],
    axes: {
      position: {
        short: 'Big4の総合ファーム',
        text: '世界的な会計事務所グループ（Big4）のファームです。2025年12月1日に、デロイト トーマツ コンサルティング、ファイナンシャルアドバイザリー、リスクアドバイザリーの3法人が合併して「合同会社デロイト トーマツ」が発足しました（同グループの発表）。そのため、2025年の表彰はデロイト トーマツ コンサルティング合同会社、2026年は合同会社デロイトトーマツの名前になっています。この記事では、旧デロイト トーマツ コンサルティングのSAP事業を中心に扱います。',
      },
      products: {
        short: '調達・人事・会計',
        text: '2026年は調達・経費の製品の売上と、トヨタ自動車の人事基幹システムで選ばれました。2025年は、商船三井ロジスティクスの会計システムにPublic Editionをアドオンゼロで導入した案件で表彰されています。',
      },
      scope: {
        short: '企画構想からテスト、オフショア管理',
        text: '公式の求人では、企画構想・要件定義から設計、開発、テスト、オフショアのマネジメントまでの一連の工程を担当するとしています。',
      },
      projects: {
        short: '大企業のグローバル導入・刷新',
        text: '公式の求人では、S/4HANAのグローバル導入、海外拠点の業務標準化、製薬会社へのIBP導入などを案件の例に挙げています。表彰された案件は、トヨタ自動車（2026年）と商船三井ロジスティクス（2025年）です。',
      },
      global: {
        short: '世界3万人超のSAP人材',
        text: '世界で3万人を超えるSAP専門人材のネットワークを持つとしています（同社サイト）。この記事で確認したSAPコンサルタントの求人では、英語力の目安としてTOEIC 700点以上が挙がっています（全てのSAP職種の応募条件ではありません）。',
      },
      talent: {
        short: 'この記事の調査範囲では確認できず',
        text: 'デロイト トーマツの研修制度は、中途入社者向けの基礎研修などが転職サイトの記事で紹介されています。一方、この記事で確認した公式のSAP求人とSAPのページでは、SAP職種に固有の研修や資格取得支援の詳細までは確認できませんでした。面接で直接確かめるとよい点です。',
      },
      roles: {
        short: 'SAPコンサルタント・エンジニア',
        text: '求人は「Digital Transformation with SAP」の名前で、SAPコンサルタントとSAPエンジニアを募集しています。基幹業務の要件定義の経験、SAP導入のいずれかの工程の経験、プロジェクト管理の経験などを歓迎し、FioriやBTPの開発をリードできる人も優遇するとしています。',
      },
      pay: {
        short: '年収の記載なし（公式求人）',
        text: '公式の求人には年収の記載がありませんでした。勤務地は東京・大阪・福岡で、申請により遠隔地に住むこともできるとしています。新卒は、2027年卒の経営コンサルタント職で、学士卒の基準給与年額が580万2,000円と掲載されています（就職情報サイトの募集要項）。',
      },
    },
  },
  {
    id: 'kpmg',
    name: 'KPMGコンサルティング',
    slug: 'kpmg-sap',
    oneLine: '2026年にSAPと最上位のパートナー契約を結んだBig4。人事とSAP Business AIで選出',
    checkedOn: '2026年11月18日',
    products: [
      { id: 'hr', evidence: 'ヨネックスの統合人財管理システムを7ヵ月で稼働（2026年 Project Excellence）、NOKのグローバル人材情報基盤（2026年2月発表）' },
      { id: 'finance', evidence: 'ベルソニカのS/4HANA Cloud導入（財務会計・管理会計を含む5領域、国内3工場に14ヵ月、2025年12月発表）' },
    ],
    tags: [],
    axes: {
      position: {
        short: 'Big4の総合ファーム',
        text: '世界的な会計事務所グループ（Big4）であるKPMGのコンサルティング会社で、社員は2,447名です（2026年7月1日時点、同社サイト）。SAPの専門部門（ES-SAP）は2017年10月に立ち上がりました。KPMGはSAP社の監査を担当していたため支援できる範囲に制約がありましたが、2023年夏に監査契約が満了し、SAPの事業を広げている段階だとしています（公式求人）。2026年2月には、KPMGがSAPのパートナープログラムで最上位にあたる「SAP Global Strategic Service Partner」の契約を結びました（KPMG全体での契約）。',
      },
      products: {
        short: '人事・SAP Business AI・製造業の基幹',
        text: '2026年は、ヨネックスの人事システム導入（Project Excellence）と、SAP Business AIの売上（SAP Business AI部門）の2部門で選ばれました。2025年の表彰には名前がありません。同じ2026年3月には、アジア太平洋地域で新しくSAPのパートナーになった会社に贈られる「Rising Star」（2026年SAP Partner Awards）も受賞しています。',
      },
      scope: {
        short: '構想策定から定着・拡張まで',
        text: '公式サイトでは、構想策定（アセスメント・PoC）、導入と移行、国内外の子会社への展開と機能の拡張までを提供サービスに挙げています。2026年4月の幹部インタビューでは、構想策定から稼働後の定着・拡張まで、同じメンバーが一貫して関わる体制を掲げています。開発・保守は、海外のKPMGメンバーファームや国内の協力会社と組んで進めるとしています（2024年9月の採用インタビュー）。',
      },
      projects: {
        short: '製造業（自動車部品など）が中心',
        text: '公開された案件は、自動車部品のベルソニカ（S/4HANA Cloudを国内3工場に14ヵ月で導入し、稼働2ヵ月後に自社主導の運用へ移行）、ヨネックス（人事システム、7ヵ月で稼働）、NOK（グローバルの人材情報基盤）です。公式サイトでも、製造業、とくに自動車部品業界向けの導入支援を打ち出しています。2024年9月の採用インタビューでは、10〜20名規模のプロジェクトを複数手がけているとしています。',
      },
      global: {
        short: '海外のKPMGと連携、ロールイン・ロールアウト',
        text: '採用ページでは、グローバルで6,000名以上のSAPコンサルタントと連携できる体制だとしています。ベルソニカでは海外3工場への展開を支援中で（2025年12月時点）、NOKでは各国の個人情報保護規制への対応も並行して支援しました。求人の職務には、グローバルERPプロジェクトのロールイン・ロールアウトが挙がっています。',
      },
      talent: {
        short: 'SAPの学習環境・eラーニング・資格取得支援',
        text: '採用ページでは、SAP社の学習環境を使えることと、勉強会やソリューションの研究活動が頻繁にあることを紹介しています。2024年9月の採用インタビューでは、社内のeラーニングとSAP認定資格の取得支援を挙げています。SAP部門の体系的な研修カリキュラムの公開は確認できませんでした。',
      },
      roles: {
        short: 'チーム別のアプリケーションコンサル・Basis',
        text: '公式の中途採用ページの募集職種は、SAPアプリケーションコンサルタントの5チーム（経営管理・財務会計等、SCM、Finance、HCM/HXM、Technology）です。職務は、構想策定・業務設計から、システム構築、拡張機能（アドオン）の設計、ユーザー側の支援（PMOを含む）、ロールイン・ロールアウトまでです。ES-SAP部門の人数は、2024年9月の採用インタビューで約70名でした（当時の目標は3年後に300名規模）。',
      },
      pay: {
        short: '公式求人で年収595万円以上（基本給）、フレックス',
        text: '公式の求人（HCM/HXMチーム）では、給与は「年収595万円以上」で、これは基本給（シニアコンサルタント以下は50時間分の固定残業手当を含む）で、賞与は別です。シニアコンサルタント以下はフレックスタイム制（コアタイムは9時〜17時のうち3時間）です。転職サイトに載っていたBasisコンサルタントの求人では、年収800万〜1,500万円でした（ビズリーチ、2024年9月更新）。在宅勤務についての記載は確認できませんでした。',
      },
    },
  },
  {
    id: 'sigmaxyz',
    name: 'シグマクシス',
    slug: 'sigmaxyz-sap',
    oneLine: '2年続けて最優秀プロジェクト。大企業の会計をPublic Editionで刷新',
    products: [
      { id: 'erp-public', evidence: '日本郵船（2026年）・商船三井（2025年）で2年続けて Project of the Year' },
      { id: 'finance', evidence: '日本郵船とグループ約350社の財務会計を標準化（2026年）' },
    ],
    tags: [],
    axes: {
      position: {
        short: '独立系のコンサル会社',
        text: '上場しているシグマクシス・ホールディングスのグループで、連結の社員は800人（うちコンサルティング事業708人、2026年3月時点、有価証券報告書）。大手ファームより小さな規模で、表彰を続けて受けています。',
      },
      products: {
        short: 'Public Edition・財務会計',
        text: '2025年は商船三井グループの仕組船会社の会計、2026年は日本郵船の財務会計で、2年続けてProject of the Yearに選ばれました。どちらもPublic Editionの導入です。',
      },
      scope: {
        short: '基幹刷新から経営基盤の運営支援',
        text: '公式の求人では、徹底したFit to Standardで基幹システムを刷新し、経営基盤の構築と運営を支援するとしています。2026年は SAP Services Collaboration にも選ばれ、SAPの開発部門と組んで、足りない機能を標準機能として作ってもらいました。',
      },
      projects: {
        short: '大企業の会計をPublic Editionで再構築',
        text: '表彰された案件は、日本郵船（国内外の子会社を含む約350社）と、商船三井グループの海外籍の船舶保有会社約250社です。日本郵船では、約450件あったアドオンを約1割まで減らしたと報じられています。',
      },
      global: {
        short: '海外子会社を含むグループ導入',
        text: '商船三井では海外籍の船舶保有会社約250社、日本郵船では国内外の子会社を含む約350社に導入しています。',
      },
      talent: {
        short: '個人表彰が2年続く（育成制度は確認できず）',
        text: 'SAPジャパンの個人表彰「SAPマイスターIQ」を、2025年・2026年と2年続けて同社のコンサルタントが受けています。これは個人の実績への表彰で、育成制度を示すものではありません。この記事で確認した公式の求人には、SAP向けの育成制度の説明は見当たりませんでした。',
      },
      roles: {
        short: 'Public Editionでの業務変革コンサル',
        text: '公式の求人は「パブリック・クラウド（Public Edition等）を活用した業務変革コンサルタント」。ERPやSaaSの導入経験だけでなく、事業会社での経理・販売・購買の業務経験とITの基礎スキルでも応募できるとしています。',
      },
      pay: {
        short: '中途の求人は応相談',
        text: '公式の求人では、給与は「応相談」でした。フレックスタイム制です。新卒は、初年度年俸の基準額650万円（2026年度新卒入社の参考額）と掲載されています（就職情報サイトの募集要項）。',
      },
    },
  },
];

export function getCompany(id: CompanyId): Company {
  const c = COMPANIES.find((x) => x.id === id);
  if (!c) throw new Error(`unknown company ${id}`);
  return c;
}

const href = (c: Company) => `/articles/${c.slug}`;
const productLabel = (id: ProductId) => PRODUCTS.find((p) => p.id === id)!.label;

/** The hub's table: one row per company, one column per axis. */
export function hubMatrixBlock(): Block {
  return {
    type: 'table',
    caption: `8つの観点で見た各社（公開情報、${CHECKED_ON}時点）`,
    stack: true,
    headers: ['会社', ...AXES.map((a) => a.label)],
    rows: COMPANIES.map((c) => [c.name, ...AXES.map((a) => c.axes[a.id].short)]),
  };
}

/** Product → companies, for readers who start from what they want to work on. */
export function productMatrixBlock(): Block {
  return {
    type: 'table',
    caption: 'SAP領域ごとに、公開された実績が目立つ会社',
    stack: true,
    headers: ['SAP領域', '会社', '根拠'],
    rows: PRODUCTS.map((p) => {
      const hits = COMPANIES.flatMap((c) =>
        c.products.filter((x) => x.id === p.id).map((x) => ({ c, evidence: x.evidence })),
      );
      return [
        p.label,
        hits.length ? hits.map((h) => h.c.name).join('、') : '―',
        hits.length ? hits.map((h) => `${h.c.name}：${h.evidence}`).join('／') : '―',
      ];
    }),
  };
}

export function companyListBlock(): Block {
  return {
    type: 'links',
    title: '会社ごとの記事',
    items: COMPANIES.map((c) => ({ href: href(c), label: `SAPの文脈で見る${c.name}`, text: c.oneLine })),
  };
}

/** The company page's overview table. */
export function overviewBlock(id: CompanyId): Block {
  const c = getCompany(id);
  return {
    type: 'table',
    caption: `${c.name}を8つの観点で見ると`,
    stack: true,
    headers: ['観点', 'ひとこと'],
    rows: AXES.map((a) => [a.label, c.axes[a.id].short]),
  };
}

/** One heading and paragraph per axis. */
export function axisDetailBlocks(id: CompanyId): Block[] {
  const c = getCompany(id);
  return AXES.flatMap((a): Block[] => {
    const e = c.axes[a.id];
    const blocks: Block[] = [
      { type: 'h', text: `${a.label}：${e.short}` },
      { type: 'p', text: e.text },
    ];
    if (a.id === 'products') {
      blocks.push({
        type: 'table',
        caption: 'SAP領域ごとの根拠',
        stack: true,
        headers: ['SAP領域', '根拠'],
        rows: c.products.map((p) => [productLabel(p.id), p.evidence]),
      });
      blocks.push({
        type: 'p',
        text: '表彰は、その領域の販売や導入で評価されたことを示すもので、会社全体の技術力や案件の数を比べたものではありません。また、FIやSDといったモジュールごとの強みは、表彰からは分かりません。',
      });
    }
    if (a.id === 'pay') blocks.push(companyPayNote(id));
    return blocks;
  });
}

/** Companies whose pay text quotes a new-graduate figure. */
const NEW_GRAD_PAY: CompanyId[] = ['abeam', 'nttdata-gsl', 'deloitte', 'sigmaxyz'];

/** The short pay note for one company page; the hub uses PAY_NOTE. */
function companyPayNote(id: CompanyId): Block {
  const base = `掲載した金額は、${getCompany(id).checkedOn ?? CHECKED_ON}時点で確認したSAP関連の求人に基づきます。会社全体の平均年収や、SAPコンサルタントの一般的な年収を示すものではありません。実際の提示額は、経験・職位・募集職種によって変わります。`;
  const grad = '新卒の金額は募集要項の記載で、月給（時間外手当を含むものがある）と年俸など、会社によって基準が違います。';
  return {
    type: 'note',
    variant: 'warn',
    title: '年収の数字について',
    text: NEW_GRAD_PAY.includes(id) ? base + grad : base,
  };
}

export const PAY_NOTE: Block = {
  type: 'note',
  variant: 'warn',
  title: '年収の数字の見方',
  text: `${CHECKED_ON}時点で確認できた、SAP関連の求人と新卒の募集要項に載っている金額です。求人の年収は職位の幅をまとめたもので、平均年収でも、SAPコンサルタントの一般的な年収でもありません。新卒の金額を載せている会社でも、月給（時間外手当を含むものがある）と年俸で基準が違うため、そのままは比べられません。記載が見つからなかった会社は、条件が不透明という意味ではありません。`,
};

/**
 * "この観点なら、こちらの会社も": the SAP areas this company has no public
 * record in, and the features (midmarket, run) it isn't tagged with, each
 * pointing at the companies that have them.
 */
export function crossLinkBlock(id: CompanyId): Block {
  const c = getCompany(id);
  const others = COMPANIES.filter((x) => x.id !== id);
  const items: { href: string; label: string; text: string }[] = [];
  const add = (o: Company, why: string) => {
    const item = items.find((i) => i.href === href(o));
    if (item) item.text = `${item.text}／${why}`;
    else items.push({ href: href(o), label: `SAPの文脈で見る${o.name}`, text: why });
  };

  const mine = new Set(c.products.map((p) => p.id));
  for (const p of PRODUCTS) {
    if (mine.has(p.id)) continue;
    for (const o of others) if (o.products.some((x) => x.id === p.id)) add(o, `${p.label}の実績なら`);
  }
  for (const tag of Object.keys(TAG_REASONS) as Tag[]) {
    if (c.tags.includes(tag)) continue;
    for (const o of others) if (o.tags.includes(tag)) add(o, TAG_REASONS[tag]);
  }
  return { type: 'links', title: 'この観点なら、こちらの会社も', items };
}

/** Questions worth asking in an interview, the same for every company. */
export const INTERVIEW_QUESTIONS = [
  '直近の案件で、自分が入る領域（例：FI）の担当は、要件定義から保守までのどこを担当したか',
  'Public EditionとPrivate（RISE with SAP）の案件の割合はどのくらいか',
  '元請けの案件と、他社の下で入る案件の割合はどのくらいか',
  '導入の案件と、運用・保守の案件のどちらに入ることが多いか',
  '表彰された案件や製品の領域に、入社後に関われる可能性はあるか',
];

const SAP_TENSHOKU: Block = {
  type: 'affiliate',
  href: 'https://px.a8.net/svt/ejp?a8mat=4BCCJC+8P60Z6+5N98+BWVTE',
  pixel: 'https://www11.a8.net/0.gif?a8mat=4BCCJC+8P60Z6+5N98+BWVTE',
  label: 'SAPテンショク',
  text: 'SAPコンサルタント・SAPエンジニアに特化した転職サービス。カウンセラーもSAPの仕事の経験者。',
  audience: 'SAPのコンサルかエンジニアの経験がある、国内在住の40歳以下の人',
  cta: '無料で相談してみる',
};

export const SAP_TENSHOKU_BLOCK = SAP_TENSHOKU;

/**
 * The shared body of a company page. `intro` is the hand-written opening
 * (two or three paragraphs and the one-line summary); everything after it is
 * built from the data so all company pages read the same way.
 */
export function companyArticleBody(id: CompanyId, intro: Block[], extra: Block[] = []): Block[] {
  const c = getCompany(id);
  const checked = c.checkedOn ?? CHECKED_ON;
  return [
    ...intro,
    {
      type: 'note',
      variant: 'info',
      title: 'この記事の決まりごと',
      text: `SAPジャパンの表彰（2025年のSAP AWARD OF EXCELLENCEは「受賞」、2026年から名前が変わったSAP Appreciation for Partner Excellenceは「選出」と書いています）、会社とSAPの公式発表、公式の採用ページ、求人に載っている条件など、公開情報だけで書いています（${checked}時点）。評判・口コミ・社内の様子は扱いません。会社の優劣をつけるものではなく、確認できなかったことは「強みがない」という意味ではありません。ほかの会社の記事も同じ8つの観点でそろえています。`,
    },
    overviewBlock(id),
    ...axisDetailBlocks(id),
    { type: 'h', text: `${c.name}で経験できる可能性がある仕事` },
    {
      type: 'p',
      text: '公式の求人と採用ページに書かれている職務内容から、仕事の方向性を整理しました。',
    },
    {
      type: 'table',
      caption: '公開求人から読み取れる仕事',
      stack: true,
      headers: ['仕事の方向性', '公開情報から読み取れる内容'],
      rows: DETAILS[id].work,
    },
    ...(DETAILS[id].workNote ? [{ type: 'p', text: DETAILS[id].workNote } as Block] : []),
    {
      type: 'note',
      variant: 'info',
      title: '全員が経験できるわけではありません',
      text: 'ここに挙げたのは、求人から確認できる仕事の方向性です。担当するモジュール、上流工程への関わり方、海外案件に入るかどうかは、応募する職種と配属先によって変わります。',
    },
    { type: 'h', text: `${c.name}はどんな人の検討候補になるか` },
    {
      type: 'p',
      text: '公開された実績と採用情報から見ると、次のような経験を積みたい人にとって検討候補になる会社です。',
    },
    { type: 'list', items: DETAILS[id].fit },
    {
      type: 'p',
      text: '志望する業務領域がはっきりしている場合は、募集職種ごとの職務内容と応募要件を個別に確認してください。',
    },
    ...extra,
    { type: 'h', text: 'ほかの会社と比べる' },
    {
      type: 'p',
      text: 'どちらが優れているかではなく、違いを確かめたいときに読んでほしい会社です。',
    },
    {
      type: 'links',
      title: 'あわせて比べたい会社',
      items: DETAILS[id].compare.map((x) => {
        const o = getCompany(x.id);
        return { href: href(o), label: `SAPの文脈で見る${o.name}`, text: x.point };
      }),
    },
    { type: 'h', text: 'この観点なら、ほかの会社も見てみる' },
    {
      type: 'p',
      text: `${c.name}の記事で公開実績が見当たらなかったSAP領域や案件の種類は、ほかの会社の記事で実績を確認できることがあります。やりたい仕事に近い会社の記事も読んで比べてみてください。`,
    },
    crossLinkBlock(id),
    {
      type: 'link',
      href: '/articles/sap-company-axes',
      label: 'SAPの会社を8つの観点で比べる（一覧）',
      text: '全社を1つの表で比べるなら',
    },
    { type: 'h', text: '面接で確かめたいこと' },
    {
      type: 'p',
      text: '同じ会社でも、入る部署や案件で仕事は大きく変わります。公開情報で分かるのは会社全体の傾向までなので、面接では次のような点を具体的に聞いてみてください。',
    },
    { type: 'list', items: INTERVIEW_QUESTIONS },
    {
      type: 'p',
      text: '年収の提示や、自分の経験がどの職位で評価されそうかは、SAPの仕事を知っている転職エージェントに聞くと、求人票より具体的に分かります。',
    },
    SAP_TENSHOKU,
    { type: 'h', text: 'SAPの仕事をもっと知る' },
    {
      type: 'links',
      title: '会社選びの前に読んでおきたい記事',
      items: [
        { href: '/articles/sap-company-types', label: 'SAPコンサルの会社の種類と仕事の違い', text: 'ファーム・SIer・SAP専門会社で、FIの担当範囲がどう変わるか' },
        { href: '/articles/consultant-vs-inhouse-se', label: 'SAPコンサルと社内SEの違い', text: 'ユーザー企業の情報システム部門という選択肢' },
        { href: '/articles/sap-modules', label: 'SAPのモジュール一覧', text: 'FI・CO・SD・MMなど、担当する領域の全体像' },
        { href: '/articles/ricefw', label: 'RICEFWとは', text: 'アドオン開発の種類と、コンサルが書く仕様の範囲' },
        { href: '/articles/sap-certification-value', label: 'SAP認定資格は役に立つか', text: '新形式の試験と、転職での見られ方' },
      ],
    },
    { type: 'h', text: '主な情報源' },
    {
      type: 'p',
      text: `この記事の内容は、${checked}時点で次の情報源から確認しました。`,
    },
    {
      type: 'links',
      title: 'リンクで確認できる情報源',
      items: DETAILS[id].sources.filter((s) => s.href).map((s) => ({ href: s.href!, label: s.label, text: s.note })),
    },
    ...(DETAILS[id].sources.some((s) => !s.href)
      ? [
          {
            type: 'list',
            items: DETAILS[id].sources.filter((s) => !s.href).map((s) => (s.note ? `${s.label}（${s.note}）` : s.label)),
          } as Block,
        ]
      : []),
    { type: 'h', text: 'この記事に出てきた名前' },
    namesTable(id),
  ];
}

type Detail = {
  /**
   * [direction of work, what the public postings say]. Use only these
   * directions, and only the ones the postings show: 業務・SAPコンサル,
   * 技術・開発, PM・PMO, グローバル, 運用・改善.
   */
  work: string[][];
  /** A note under the work table, e.g. a group company that hires separately. */
  workNote?: string;
  /** Two or three companies worth reading next, and what to compare. */
  compare: { id: CompanyId; point: string }[];
  /** Who might consider this company, from public records only. */
  fit: string[];
  sources: { label: string; href?: string; note?: string }[];
  /** Names only this company's page mentions, added to the shared table. */
  names?: string[][];
};

const SAP_AWARDS_2026 = {
  label: 'SAPジャパン「SAP Appreciation for Partner Excellence 2026」',
  href: 'https://news.sap.com/japan/2026/03/0310_sap-appreciation-for-partner-excellence-2026/',
  note: '2026年3月10日',
};
const SAP_AWARDS_2025 = {
  label: 'SAPジャパン「SAP AWARD OF EXCELLENCE 2025」',
  href: 'https://news.sap.com/japan/2025/03/0307_sap-award-of-excellence-2025/',
  note: '2025年3月7日',
};

const DETAILS: Record<CompanyId, Detail> = {
  accenture: {
    work: [
      ['業務・SAPコンサル', 'SAP導入を契機にした全社改革やグローバルオペレーションの実現（公式求人「SAPコンサルタント／エンジニア」）'],
      ['技術・開発', '「SAP S/4HANA professionals」の求人。分析・予測の新しい技術や、クラウドサービス・ECパッケージを同時に入れるハイブリッド型の案件'],
      ['PM・PMO', '大規模プロジェクトのプロジェクトマネージャーを目指せると明記'],
      ['グローバル', '海外拠点や社内の複数部署と連携して進める案件が多いと説明'],
      ['運用・改善', '求人の案件例に、大手ハイテクメーカーの基幹システムの保守運用と拡張'],
    ],
    compare: [
      { id: 'pwc', point: '総合ファームどうしで、SAPの専門組織と担当する職種を比べるなら' },
      { id: 'abeam', point: '総合ファームどうしで、グローバル案件の地域や業務領域を比べるなら' },
    ],
    fit: [
      '大規模なSAP導入に携わりたい人：国内の大企業やグローバル企業の基幹システム刷新・業務変革が案件例に挙がっています',
      'SAPのクラウド領域に関わりたい人：Public Edition、RISE with SAP、BTP、Business Data Cloudでの取り組みが確認できます',
      'SAPの専門性とマネジメントの両方を磨きたい人：大規模プロジェクトのPMを目指せることが公式求人に書かれています',
      'グローバル案件に携わりたい人：海外拠点や海外チームと連携する案件が採用情報で紹介されています',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      {
        label: 'SAPジャパン「アクセンチュアとSAPジャパン、基幹システム導入アプローチの常識を変革するプログラムを本格化」',
        href: 'https://news.sap.com/japan/2026/04/0424_accenture-sap-japan-erp-transformation/',
        note: '2026年4月24日（ADVANCE）',
      },
      {
        label: 'SAPジャパン「インフロニア、現場の原価管理からグループ経営判断までを一気通貫で支えるための基盤を3か月で構築」',
        href: 'https://news.sap.com/japan/?p=28892',
        note: '2026年6月22日',
      },
      {
        label: 'アクセンチュア 公式求人「SAPコンサルタント / エンジニア」',
        href: 'https://www.accenture.com/jp-ja/careers/jobdetails?id=R00334432_ja',
        note: '職務内容・案件例・研修',
      },
      {
        label: 'アクセンチュア ジャパン 会社概要',
        href: 'https://www.accenture.com/jp-ja/about/company/japan',
        note: '社員数',
      },
      {
        label: 'アクセンチュア キャリアブログ',
        href: 'https://www.accenture.com/jp-ja/blogs/japan-careers-blog/why-accenture',
        note: '働き方の制度',
      },
      { label: 'paiza 掲載のアクセンチュアのSAP求人', note: '年収、2026年3月更新' },
    ],
  },
  abeam: {
    work: [
      ['業務・SAPコンサル', 'Strategy Consultant職・Solution Consultant職として募集。あるべき姿の策定や戦略立案から、要件定義・導入まで関わる想定。領域は財務・会計（グローバル経営基盤）とサプライチェーン（SCM刷新）など'],
      ['技術・開発', 'S/4HANAへの移行やBTPを扱うSAPテクノロジーの求人。自社クラウド（ABeamCloud）上のERP構築'],
      ['グローバル', 'ASEAN地域でのIBP・Aribaを使った計画・調達の改革、日系製造業の日米欧でのS/4HANA導入、グローバル各拠点への展開'],
      ['運用・改善', 'SAPの運用最適化（アプリケーションマネジメント）の求人、基幹システムの運用改善とバージョンアップ計画、ERPの年次アップグレード'],
    ],
    workNote: 'グループ会社のアビームシステムズでも、BasisやSuccessFactorsなどのSAP関連職種を募集していますが、採用する会社と担当する業務は異なります。',
    compare: [
      { id: 'nttdata-gsl', point: 'SAP専業の会社で、業務・技術・運用の職種がどう分かれているかを比べるなら' },
      { id: 'accenture', point: '総合ファームどうしで、グローバル案件とクラウドERPの実績を比べるなら' },
    ],
    fit: [
      'あるべき姿や戦略の段階からSAPの仕事に関わりたい人：公式求人で、構想・戦略立案から入ることを想定しています',
      'SCM・調達の領域を深めたい人：2026年にSCM製品の部門で選出され、ASEANでのIBP・Ariba案件が求人に挙がっています',
      'アジアを中心に海外拠点の仕事に関わりたい人：アジアの自社拠点と、APACでの表彰があります',
      '会計の領域で、グローバルの経営基盤づくりに関わりたい人：財務・会計領域の案件例が公式求人に載っています',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      { label: 'アビームコンサルティング 会社概要', href: 'https://www.abeam.com/jp/ja/about/company/', note: '沿革・社員数' },
      { label: 'アビームコンサルティング SAPコンサルティング', href: 'https://www.abeam.com/jp/ja/expertise/sap_consulting/', note: 'RSSPへの参画' },
      { label: 'アビームコンサルティング「2026 SAP Partner Awards」にて3部門で受賞', href: 'https://www.abeam.com/jp/ja/news/2026/0205/', note: '2026年2月5日' },
      { label: 'アビームコンサルティング 公式求人「SAP_ポジションマッチング」', href: 'https://hrmos.co/pages/abeamconsulting/jobs/1717346057821540356', note: '職務内容・年収・勤務時間' },
      { label: 'アビームコンサルティング 経験者採用「人材育成」', href: 'https://www.abeam.com/content/abeam/jp/ja/mid-career/career/training.html', note: '中途入社研修・資格取得支援' },
      { label: '就職情報サイト掲載の2027年卒の募集要項', note: '新卒の月給' },
    ],
  },
  'nttdata-gsl': {
    work: [
      ['業務・SAPコンサル', '構想策定（会計・SCM・経営管理・IBP・PLM/MESなど）と、新規導入の業務・SAPコンサルタント（会計・販売物流・購買在庫・生産）。各モジュールのジュニアコンサルタントや、BlackLineを扱うデジタルファイナンスの職種も'],
      ['技術・開発', 'SAP BTPコンサルタント、BTPソリューションエキスパート、デジタルテクノロジースペシャリスト、Cloud Engineer、SAP基盤構築（Basis）'],
      ['PM・PMO', 'SAPプロジェクトマネージャー、大規模顧客向けのプログラムマネージャー'],
      ['運用・改善', '大規模な運用・保守の専任コンサルタント、運用・保守のサービスデリバリーマネージャー、生成AIを使った運用・保守サービスの変革のリーダー'],
    ],
    compare: [
      { id: 'abeam', point: '総合ファームとSAP専業の会社で、職種の分かれ方と担当する工程の違いを比べるなら' },
      { id: 'accenture', point: '導入から運用までを手がける会社どうしで、案件の規模や種類を比べるなら' },
    ],
    fit: [
      'SAP中心のキャリアを築きたい人：SAPを事業の中心とする会社で、業務とテクノロジーの両方の職種があります',
      '導入後の運用・保守の仕事に関心がある人：運用・保守を専任で担う職種があり、導入後の支援でも選出されています（同じ人が導入と運用の両方を担当するかは配属によります）',
      '会計などのモジュールをジュニアから学びたい人：会計・販売物流・購買在庫・生産のSAPモジュールのジュニアコンサルタントを募集しています',
      '中堅企業向けのPublic Edition導入に関わりたい人：中堅企業向け導入パッケージを担う会社の1つです',
      '研修と資格取得の制度を重視する人：企業内大学とSAP Academyを公式に公開しています',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      { label: 'SAPジャパン「GROW with SAP」のパートナー・パッケージ・プログラムを開始', href: 'https://news.sap.com/japan/?p=18861', note: '2024年9月30日' },
      { label: 'NTTデータ ニュースリリース（SAP専業会社の設立）', href: 'https://www.nttdata.com/jp/ja/news/release/2012/062800/', note: '2012年6月28日' },
      { label: 'NTTデータ グローバルソリューションズ 募集要項', href: 'https://www.nttdata-gsl.co.jp/recruit/info/', note: '新卒の給与・勤務制度・教育制度' },
      { label: 'NTTデータ グローバルソリューションズ キャリア採用「募集職種一覧」', href: 'https://www.nttdata-gsl.co.jp/recruit/mid-career/work/', note: '職種' },
      { label: 'ビズリーチ・アンビ掲載のSAP求人', note: '中途の年収' },
    ],
  },
  pwc: {
    work: [
      ['業務・SAPコンサル', '業務改革とSAPの導入。構想策定から要件定義、実装、定着化まで（部門紹介）'],
      ['技術・開発', 'システムアーキテクチャの設計、BTPを含むミドルウェアを使ったソリューション提案（求人）。Basisの専門組織。生成AIとSAPを組み合わせる「AI×SAPコンサルタント」の求人も'],
      ['PM・PMO', 'PMO、オフショア開発の管理、複数ベンダーの管理（求人）'],
      ['グローバル', 'SAPのロールイン・ロールアウトの支援。PwCの海外オフィスと連携するクロスボーダー案件も増えているとしています（求人）'],
    ],
    compare: [
      { id: 'deloitte', point: 'Big4どうしで、SAPの専門組織と扱う製品を比べるなら' },
      { id: 'accenture', point: '総合ファームどうしで、担当する職種とグローバル案件を比べるなら' },
    ],
    fit: [
      '人事（SuccessFactors）の案件に関わりたい人：2026年に人事製品の部門で選出され、スタンレー電気の人事基盤の事例があります',
      '業務改革と定着化まで見届けたい人：構想策定から定着化までの支援を打ち出しています',
      'Basis・PMOなどの専門職としてSAPに関わりたい人：専門組織がSAP・Basis・R&D・PMOに分かれています',
      'BTPの開発に関わりたい人：2025年にBTPの部門で受賞し、SAP BTP Hackathonで2年連続の最優秀賞を受けています',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      { label: 'PwCコンサルティング 部門紹介「エンタープライズソリューション」', href: 'https://www.pwc.com/jp/ja/careers/consulting/mid-career/department/ba.html', note: '組織・担当工程・育成' },
      { label: 'PwCコンサルティング「SAP Appreciation for Partner Excellence 2026」において2部門に選出', href: 'https://www.pwc.com/jp/ja/press-room/2026/sap-appreciation-for-partner-excellence-2026.html', note: '2026年3月' },
      { label: 'SAPジャパン スタンレー電気グループの人事DXプラットフォーム構築', href: 'https://news.sap.com/japan/2025/10/1030stanley/', note: '2025年10月30日' },
      { label: 'ビズリーチ掲載のSAPコンサルタント求人', note: 'PMO・ロールイン／ロールアウト・アーキテクチャなどの職務' },
      { label: 'リクルートダイレクトスカウト掲載のSAP求人', note: '中途の年収・勤務制度' },
    ],
  },
  deloitte: {
    work: [
      ['業務・SAPコンサル', '企画構想・要件定義から設計まで（公式求人）。扱う製品はS/4HANA、SAP Analytics Cloud、BW/4HANA、IBP、Ariba、Fieldglassなど'],
      ['技術・開発', '開発・テスト。FioriやBTPでの開発をリードできる人を優遇。SAP on Cloudの基盤構想から導入（AWS・Azure・GCPなど）の経験も歓迎'],
      ['PM・PMO', 'オフショアのマネジメント。基幹システム導入のプロジェクト管理・チームリードの経験を歓迎'],
      ['グローバル', 'S/4HANAのグローバル導入や海外拠点の業務標準化が案件例。グローバルプロジェクトのPM・チームリード経験を優遇'],
    ],
    compare: [
      { id: 'pwc', point: 'Big4どうしで、SAPの専門組織と人事の案件を比べるなら' },
      { id: 'abeam', point: 'グローバル導入とSCM・調達の実績を比べるなら' },
    ],
    fit: [
      '幅広いSAP製品に関わりたい人：公式求人に、ERPからSCM・調達・分析・BTPまでの製品群が挙がっています',
      'グローバル導入や海外拠点の標準化に関わりたい人：案件例に挙がり、確認した求人では英語力の目安（TOEIC 700点以上）も示されています',
      'FioriやBTPの開発をリードしたい人：公式求人で優遇条件になっています',
      '人事・調達の領域に関わりたい人：2026年にトヨタ自動車の人事基幹システムと調達製品の部門で選出されています',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      { label: 'デロイト トーマツ「Deloitte + SAP」', href: 'https://www.deloitte.com/jp/ja/alliances/sap.html', note: 'SAP専門人材の数' },
      { label: 'デロイト トーマツ グループ 新会社名称「合同会社デロイト トーマツ」を発表', href: 'https://digitalpr.jp/r/119906', note: '2025年10月10日、3法人の合併' },
      { label: 'デロイト トーマツ 公式求人「Digital Transformation with SAP（SAPコンサルタント）」', href: 'https://pgst02.jposting.net/u/job.phtml?job_code=281', note: '職務内容・応募要件・勤務地' },
      { label: '就職情報サイト掲載の2027年卒の募集要項', note: '新卒の基準給与' },
    ],
  },
  kpmg: {
    work: [
      ['業務・SAPコンサル', '現状分析と構想策定、業務設計、アーキテクチャデザイン（公式求人）。経営管理・財務会計、SCM、Finance、HCM/HXMのチームごとに募集'],
      ['技術・開発', 'Technologyチーム（Basis）：インフラ設計、アーキテクチャデザイン、移行、拡張機能（アドオン）の設計。採用ページではBTPを活用した支援も挙げています'],
      ['PM・PMO', 'システム導入でのユーザー側の支援（PMOを含む）'],
      ['グローバル', 'グローバルERPプロジェクトのロールイン・ロールアウト'],
    ],
    compare: [
      { id: 'pwc', point: 'Big4どうしで、人事（SuccessFactors）の案件とSAPの専門組織を比べるなら' },
      { id: 'deloitte', point: 'Big4どうしで、扱う製品の幅とグローバル導入を比べるなら' },
    ],
    fit: [
      '製造業、とくに自動車部品業界のSAP導入に関わりたい人：公式サイトで打ち出していて、ベルソニカの事例があります',
      '人事（SuccessFactors）の案件に関わりたい人：2026年にヨネックスの人事システム導入で選出され、NOKの事例もあります',
      'SAPとAIを組み合わせた仕事に関わりたい人：2026年にSAP Business AIの部門で選出され、ヨネックスの導入ではSAP Joule for Consultantsを使っています',
      '拡大中の組織で担当範囲を広げたい人：2024年9月の採用インタビューで、チームが小さいため要件定義からテストまで担当範囲が広くなると説明しています',
    ],
    sources: [
      SAP_AWARDS_2026,
      { label: 'KPMGコンサルティング「SAP Appreciation for Partner Excellence 2026」の2部門に選出', href: 'https://kpmg.com/jp/ja/media/press-releases/2026/03/kc-sap-partnerexcellence.html', note: '2026年3月10日' },
      { label: 'KPMGコンサルティング、2026年SAP Partner AwardsのRising Starを受賞', href: 'https://kpmg.com/jp/ja/media/press-releases/2026/03/kc-sap-partnerawards.html', note: '2026年3月' },
      { label: 'KPMGとSAP、「SAP Global Strategic Service Partner」契約を締結', href: 'https://kpmg.com/jp/ja/media/press-releases/2026/03/kc-sap-gssp.html', note: '2026年3月4日（元の発表は2026年2月10日）' },
      { label: 'KPMGジャパン「SAP」', href: 'https://kpmg.com/jp/ja/home/about/sap.html', note: '提供サービス・事例' },
      { label: 'KPMGコンサルティング、ベルソニカのSAP S/4HANA Cloud導入を支援', href: 'https://kpmg.com/jp/ja/media/press-releases/2025/12/kc-sap-bellsonica.html', note: '2025年12月17日' },
      { label: 'KPMGコンサルティング、NOKのSAP SuccessFactors導入を支援', href: 'https://kpmg.com/jp/ja/media/press-releases/2026/02/kc-sap-successfactors.html', note: '2026年2月16日' },
      { label: 'KPMGコンサルティング「SAP×AIで描く次の成長」（幹部インタビュー）', href: 'https://kpmg.com/jp/ja/insights/2026/04/kc-interview-sap.html', note: '2026年4月' },
      { label: 'KPMGコンサルティング ES-SAP中途採用情報', href: 'https://recruit.kpmg-consulting.jp/info/es-sap', note: '募集職種・育成・グローバル連携' },
      { label: 'KPMGコンサルティング 公式求人「SAPアプリケーションコンサルタント（HCM/HXMチーム）」', href: 'https://js01.jposting.net/kpmgkc/u/mid_careers/job.phtml?job_code=486', note: '職務・給与・勤務制度' },
      { label: 'JAC Recruitment「KPMGコンサルティング採用インタビュー」', href: 'https://www.jac-recruitment.jp/company/kpmg/interview03/', note: '2024年9月実施。部門の人数・案件規模・育成' },
      { label: 'KPMGコンサルティング 会社概要', href: 'https://kpmg.com/jp/ja/about/kc/corporate-profile.html', note: '従業員数' },
      { label: 'ビズリーチ掲載のSAP Basisコンサルタント求人', note: '中途の年収。2024年9月更新' },
    ],
    names: [
      ['SAP Global Strategic Service Partner', 'パートナー契約', 'SAPのパートナープログラムで最上位に位置づけられる契約'],
      ['SAP Business AI', 'AI', 'SAPの業務アプリに組み込まれたAI機能の総称'],
      ['SAP Joule for Consultants', 'AI', 'SAPの導入を担当するコンサルタント向けのAIアシスタント'],
      ['ES-SAP', '部門', 'KPMGコンサルティングのSAP専門部門（Enterprise Solutions - SAP）'],
    ],
  },
  sigmaxyz: {
    work: [
      ['業務・SAPコンサル', 'パブリック・クラウド（Public Edition等）を活用し、徹底したFit to Standardで基幹システムを刷新。経営分析や事業予測ができる経営基盤の構築と、その運営の支援'],
      ['PM・PMO', '大規模プロジェクトのマネジメントの経験を歓迎'],
    ],
    workNote: '応募できる経験として、ERPやSaaSの導入経験、上流工程の経験のほか、事業会社での経理・販売・購買の業務経験とITの基礎スキルも挙がっています。経営層との対話、英語、プロセスマイニング・AI-OCR・RPAなどの経験も歓迎されます。',
    compare: [
      { id: 'deloitte', point: '会計システムへのPublic Editionの導入実績を比べるなら' },
      { id: 'nttdata-gsl', point: 'Public Editionの導入を、中堅企業向けの導入も含めて比べるなら' },
    ],
    fit: [
      'Public Editionで基幹システムを作り直す仕事に関わりたい人：2年続けて最優秀プロジェクトに選ばれています',
      '会計の刷新に関わりたい人：表彰された2つの案件は、どちらも会計の刷新です',
      '経理などの業務経験からSAPの仕事に入りたい人：業務経験とITの基礎スキルで応募できる求人があります',
    ],
    sources: [
      SAP_AWARDS_2026,
      SAP_AWARDS_2025,
      { label: 'シグマクシス 公式求人「パブリック・クラウドを活用した業務変革コンサルタント」', href: 'https://hrmos.co/pages/sigmaxyzinc/jobs/EP_26002', note: '職務内容・応募要件・給与' },
      { label: 'IT Leaders「日本郵船、グループ350社の会計システムを『SAP S/4HANA Cloud』に移行」', href: 'https://it.impress.co.jp/articles/-/28668', note: '2025年11月27日、アドオンの削減' },
      { label: 'シグマクシス・ホールディングス 有価証券報告書（2026年3月期）', note: '連結の社員数' },
      { label: '就職情報サイト掲載の募集要項', note: '新卒の年俸の参考額' },
    ],
  },
};

function namesTable(id: CompanyId): Block {
  const extra = DETAILS[id].names;
  if (!extra) return NAMES_TABLE;
  const base = NAMES_TABLE as Extract<Block, { type: 'table' }>;
  return { ...base, rows: [...base.rows, ...extra] };
}

const NAMES_TABLE: Block = {
  type: 'table',
  stack: true,
  headers: ['名前', '種類', '何のためのもの'],
  rows: [
    ['SAP Appreciation for Partner Excellence', '表彰', 'SAPジャパンが毎年選ぶパートナー表彰。2025年までの名前はSAP AWARD OF EXCELLENCE'],
    ['Public Edition（SAP S/4HANA Cloud Public Edition）', 'ERP製品', 'SAPがクラウドで提供する標準版のERP。アドオンの自由度は小さいが、更新はSAPが行う'],
    ['RISE with SAP', '契約・サービス', 'S/4HANA（Private Edition）とインフラ・運用などをまとめて契約するSAPのサービス'],
    ['GROW with SAP', '契約・サービス', '中堅・中小企業向けに、クラウドERPを短期間・決まった形で導入するSAPのサービス'],
    ['SAP BTP', '開発基盤', 'SAP本体の外でアドオンや連携を作るための基盤'],
    ['SuccessFactors', '人事製品', '人事・給与・タレントマネジメントのクラウド製品'],
    ['IBP（Integrated Business Planning）', 'SCM製品', '需要と供給の計画を立てるクラウド製品'],
    ['MSP（Managed Service Provider）', '役割', 'インフラからアプリまでの運用をまとめて引き受けるパートナー'],
    ['Basis', '役割', 'SAPのシステム基盤（インストール・権限・性能・移送など）を担当する領域'],
    ['Fit to Standard', '導入の進め方', '標準機能に業務を合わせ、アドオンを最小限にする導入方法'],
    ['クリーンコア', '導入の考え方', 'SAP本体に手を加えず、拡張は本体の外に作る考え方'],
  ],
};
