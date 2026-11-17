import type { ColumnArticle } from './index';

/**
 * Source for every fact below: SAP Japan press release, 2026-03-10,
 * https://news.sap.com/japan/2026/03/0310_sap-appreciation-for-partner-excellence-2026/
 * Only what the release states is written here; anything else (headcounts,
 * revenue, reputations) is left out on purpose.
 */
export const sapPartnerExcellence2026: ColumnArticle = {
  slug: 'sap-partner-excellence-2026',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  cardTitle: 'SAPパートナー表彰2026を読む',
  title:
    'SAPパートナー表彰2026から読む、各社の得意領域｜アクセンチュア・アビーム・NTTデータ・Big4ほか',
  summary:
    'SAPジャパンが毎年選ぶパートナー表彰「SAP Appreciation for Partner Excellence」。2026年の結果を会社ごと・製品ごとに整理し、各社がSAPのどの領域に強いのか、導入プロジェクトの流れがどこへ向かっているのかを読み解きます。',
  keywords: [
    'SAP Appreciation for Partner Excellence 2026',
    'SAP パートナー アワード',
    'SAP AWARD OF EXCELLENCE',
    'SAPパートナー',
    'SAPコンサル 会社',
    'アクセンチュア',
    'アビームコンサルティング',
    'NTTデータグローバルソリューションズ',
    'シグマクシス',
    'PwCコンサルティング',
    'デロイトトーマツ',
    'KPMGコンサルティング',
    'EY',
    '日立システムズ',
    'Public Edition',
    'Fit to Standard',
    'クリーンコア',
    '転職',
  ],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPコンサルと社内SEの違い', href: '/articles/consultant-vs-inhouse-se' },
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
    { label: 'SAPフリーランスの単価と働き方', href: '/articles/sap-freelance-rates' },
    { label: 'SAPのモジュール一覧', href: '/articles/sap-modules' },
  ],
  body: [
    {
      type: 'p',
      text: 'SAPの導入を手がける会社はたくさんありますが、外から見ると「どこもSAPをやっている」ようにしか見えません。転職先や発注先を考えるときに知りたいのは、その会社がSAPのどの製品・どの業務領域に強いのか、という点です。',
    },
    {
      type: 'p',
      text: 'それを公開情報から読み取る手がかりになるのが、SAPジャパンが毎年発表しているパートナー表彰です。この記事では、2026年3月に発表された「SAP Appreciation for Partner Excellence 2026」の結果を、会社ごと・製品ごとに整理します。',
    },
    {
      type: 'note',
      variant: 'info',
      title: 'この記事の出典',
      text: '表彰の内容は、すべてSAPジャパンのプレスリリース（2026年3月10日）にもとづいています。各社の年収・評判・社内の様子は扱いません。',
    },

    { type: 'h', text: 'SAP Appreciation for Partner Excellenceとは' },
    {
      type: 'p',
      text: 'SAPジャパンが、SAPビジネスへの貢献度や導入プロジェクトの成果をもとに、優れた実績を上げたパートナー企業を選ぶプログラムです。2026年で29回目になり、パートナー向けのイベント「SAP Japan Partner Kick-off Meeting」で発表されます。',
    },
    {
      type: 'p',
      text: '2025年までは「SAP AWARD OF EXCELLENCE」という名前でしたが、SAPのグローバルのブランドルールが変わり、「Award」はSAP本社の公式表彰だけに使うことになりました。そのため日本の表彰は、功績を称える「Appreciation」という呼び方に変わっています。中身は同じ系統の表彰です。',
    },
    {
      type: 'note',
      variant: 'warn',
      title: '読むときの注意',
      text: '多くの部門は「その製品の売上や案件数でSAPのビジネスに貢献したか」で選ばれています。つまり、SAPから見て「よく売った・よく広げた」会社であり、コンサルタントの質や働きやすさを直接示すものではありません。また、載っていない会社がその領域に弱いとも限りません。あくまで「その年に何で目立ったか」を知る材料として読んでください。',
    },

    { type: 'h', text: '一言でいうと、アクセンチュアが全方位、ほかは製品ごとにすみ分け' },
    {
      type: 'p',
      text: '2026年は、アクセンチュアが6部門で選ばれ、売上・運用・人材育成・プロジェクトのすべてで名前が挙がりました。ほかの会社は、人事ならPwC・デロイト・KPMG、SCMならアビーム、業務プロセスの可視化ならEY、というように、製品ごとに強い会社がはっきり分かれています。',
    },
    {
      type: 'p',
      text: 'プロジェクトの表彰では、ほぼすべての案件に「Fit to Standard（標準機能に業務を合わせる）」と「クリーンコア（SAP本体にアドオンを作り込まない）」が書かれていて、導入の進め方そのものが変わってきていることも読み取れます。',
    },

    { type: 'h', text: '部門は大きく3種類' },
    {
      type: 'table',
      caption: '表彰の部門の種類',
      stack: true,
      headers: ['種類', '主な部門', '何で選ばれるか'],
      rows: [
        [
          'ビジネスの実績',
          'The Top Service Partner、The Top Resell Partner、The Top Managed Service Provider、The Top Cloud Renewal Partner など',
          'SAPクラウド製品の売上、販売件数、契約の更新率、運用サービスなど、会社全体としての実績',
        ],
        [
          '製品ごとの実績',
          'SAP SuccessFactors HCM、SAP Supply Chain Management、SAP Business AI など',
          'その製品の売上と、ビジネスの拡大への貢献',
        ],
        [
          'プロジェクト',
          'Project of the Year、Project Excellence',
          '個別の導入プロジェクトの成果。お客様の名前とプロジェクトの内容が公表される',
        ],
      ],
    },
    {
      type: 'p',
      text: 'このほかに、人材育成（The Top Resource Partner、Growth of New SAP talents）、新しいパートナー（Emerging Partner）、個人の表彰（SAPマイスターIQ、SAP BTPチャンピオン）があります。',
    },

    { type: 'h', text: '会社ごとに見る' },
    {
      type: 'p',
      text: 'コンサルティング会社とSIerを中心に、選ばれた部門と、そこから読み取れる得意領域をまとめました。',
    },
    {
      type: 'table',
      caption: '主な会社と選ばれた部門（2026年）',
      stack: true,
      headers: ['会社', '選ばれた部門', '読み取れること'],
      rows: [
        [
          'アクセンチュア',
          'The Top Service Partner／The Top Managed Service Provider／The Top Resource Partner／SAP BTP／SAP Sustainability／Project Excellence（ENEOS）',
          'SAPクラウドの売上で最高位。導入だけでなく、インフラからアプリまでの運用（MSP）も担う。SAP認定技術者を最も多く育成した',
        ],
        [
          'アビームコンサルティング',
          'SAP Supply Chain Management／Project Excellence（INPEX）',
          'SCM製品の売上で選出。INPEXの刷新ではクリーンコアを徹底し、既存のアドオンを約60％削減',
        ],
        [
          'NTTデータグローバルソリューションズ',
          'Customer Success／Project Excellence（アイメディア）',
          '導入後の支援で、クラウド製品の契約更新や追加販売を進めた。アイメディアではPublic Editionをクリーンコアで導入し、切り替えは2日',
        ],
        ['NTTデータ', 'SAP Business Data Cloud', 'データ基盤の新製品（BDC）の売上で選出'],
        [
          'シグマクシス',
          'SAP Services Collaboration／Project of the Year（日本郵船）',
          '日本郵船の財務会計で、旧ERPのアップグレードではなくPublic Editionを新規導入。足りない機能はSAPの開発部門と組んで標準機能として作ってもらい、アドオンを抑えた',
        ],
        [
          'PwCコンサルティング',
          'SAP SuccessFactors HCM／Project of the Year（Mizkan）',
          '人事製品の売上で選出。Mizkanでは、RISE with SAPとIBP（需給計画）などを使い、食品業界の基幹刷新を計画どおり稼働',
        ],
        [
          'デロイトトーマツ',
          'SAP Spend Management／Project Excellence（トヨタ自動車）',
          '調達・経費の製品の売上で選出。トヨタの全従業員を対象とした人事基幹システムを構築',
        ],
        [
          'KPMGコンサルティング',
          'SAP Business AI／Project Excellence（ヨネックス）',
          'AI製品の売上で選出。ヨネックスの人事システムを7か月で稼働。導入にはAIアシスタント（Joule for Consultants）も使った',
        ],
        [
          'EYストラテジー・アンド・コンサルティング',
          'SAP Business Transformation Management',
          '業務プロセスの可視化（SAP Signavio）と、システム全体の構成管理（SAP LeanIX）の売上で選出',
        ],
        [
          '日立システムズ',
          'The Top Market Expansion／The Top Resell Partner',
          'SAPクラウド製品の販売（再販）と新規顧客の獲得件数で最高位。案件を自ら生み出す力が強い',
        ],
        ['日本IBM', 'The Top Cloud Renewal Partner', 'SAPクラウド製品の契約更新率・更新金額で最高位'],
        [
          '伊藤忠テクノソリューションズ（CTC）',
          'SAP Cloud ERP（Public Edition）',
          'Public Editionの売上で選出',
        ],
        [
          '富士通',
          'Project Excellence（東京海上日動火災保険）',
          '日本で初めてSAP for Insurance（保険業向けの製品）を導入。複数のパートナーを取りまとめて稼働させた',
        ],
        [
          '日立製作所',
          'Project Excellence（ミドリ安全）',
          'SAP BTPを使い、S/4HANAのデータを活かした営業向けのポータルを開発',
        ],
        [
          'NEC',
          'Project Excellence（NEC自身）',
          '自社の基幹システムをRISE with SAPへ移行し、クリーンコア化',
        ],
        [
          'フォーティエンスコンサルティング',
          'Project Excellence（リオ・ホールディングス）',
          'グループ全体へのSAP Cloud ERPの導入を約8か月で完了。グループレポーティング（連結の報告）と同時に稼働',
        ],
        [
          'アイ・ピー・エス',
          'Project Excellence（日本電波工業）',
          'グローバルSCMから管理会計まで、データとシステムをSAP中心に統合',
        ],
      ],
    },
    {
      type: 'p',
      text: 'このほか、ソフテス（イーグル工業での調達のデジタル化）、インフォシス（CRM・CX製品）、ブラックライン（決算業務の製品）、チームスピリット（パートナーとしての案件の共同創出）、オデッセイ（人事のパッケージ製品）、K2パートナーリングソリューションズ（SAP人材の育成）、グロービング（新しいパートナー）も選ばれています。',
    },

    { type: 'h', text: '製品・領域ごとに見る' },
    {
      type: 'p',
      text: '逆に、やりたい領域から会社を探す場合は、製品ごとに見ると分かりやすくなります。',
    },
    {
      type: 'table',
      caption: '製品・領域と、2026年に名前が挙がった会社',
      stack: true,
      headers: ['製品・領域', '名前が挙がった会社', 'ひとこと'],
      rows: [
        ['ERP（Public Edition）', 'CTC、シグマクシス、NTTデータグローバルソリューションズ', '売上での選出と、大型・短期間のプロジェクトの両方で名前が挙がった'],
        ['ERP（Private・RISE with SAP）', 'アクセンチュア、PwC、NEC', '既存のS/4HANAからの移行や、大手企業の基幹刷新'],
        ['人事（SuccessFactors）', 'PwC、デロイト、KPMG、オデッセイ', '人事は売上・プロジェクトとも複数の会社が強い領域'],
        ['SCM・需給計画', 'アビーム、PwC（IBP）、アイ・ピー・エス', '製造業・食品業の案件が中心'],
        ['調達・経費（Ariba・Spend）', 'デロイト、ソフテス', '見積から発注・請求までの調達業務'],
        ['BTP（開発基盤）', 'アクセンチュア、日立製作所', 'アドオンをSAP本体の外に作る流れで重要度が増している'],
        ['データ（Business Data Cloud）', 'NTTデータ、アクセンチュア', '2025年に出た新しい製品'],
        ['AI（Business AI）', 'KPMG', '製品の売上での選出は1社'],
        ['業務プロセスの可視化（Signavio・LeanIX）', 'EY', '導入前の業務分析や、システム全体の整理'],
      ],
    },

    { type: 'h', text: 'プロジェクト表彰から見える3つの流れ' },
    {
      type: 'p',
      text: '会社の比較とは別に、プロジェクトの表彰を並べると、いまのSAP導入がどこへ向かっているかも見えてきます。',
    },
    {
      type: 'list',
      ordered: true,
      items: [
        'Fit to Standardとクリーンコアが前提になった：アビーム（INPEX）はアドオンを約60％削減、シグマクシス（日本郵船）は足りない機能をSAPの標準機能として作ってもらった。アドオンを作り込む導入は評価されにくくなっている',
        '大企業でもPublic Editionを選ぶ例が出てきた：日本郵船は総資産約5兆円・グループ350社の財務会計をPublic Editionで標準化した。以前は中堅企業向けと見られがちだった製品が、大企業の選択肢にもなっている',
        '短期間での稼働が評価される：リオ・ホールディングスは約8か月、ヨネックスの人事は7か月、アイメディアは切り替え2日。標準機能に合わせることで、期間を短くできることが示されている',
      ],
    },
    {
      type: 'p',
      text: '導入プロジェクトでの経験からいうと、Fit to Standardは「アドオンを作らない」だけでなく、「標準機能に合わせて業務の側を変える」ことをお客様に納得してもらう仕事が中心になります。設定や開発の量が減るぶん、業務を理解して説明できるかどうかが、コンサルタントに求められる力として大きくなっていると感じます。',
    },

    { type: 'h', text: '転職・案件選びにどう使うか' },
    {
      type: 'p',
      text: '表彰の結果は、会社の良し悪しではなく、「その会社でどんな案件に関われそうか」を考える材料として使うのがおすすめです。',
    },
    {
      type: 'list',
      items: [
        'やりたい製品から会社を絞る：人事をやりたいならPwC・デロイト・KPMG、SCMならアビーム、Public Editionなら表彰に名前のある会社、というように候補を絞れる',
        '面接で具体的に聞く：表彰されたプロジェクトや製品について、「その領域の案件はどのくらいあるか」「入社後に関われる可能性はあるか」を聞くと、求人票だけでは分からない実態が見えやすい',
        '人材育成の表彰を見る：アクセンチュアはSAP認定技術者を最も多く育成した会社として選ばれている。未経験からSAPを始めたい人は、研修や資格取得の支援がどれだけあるかを確認するとよい',
        '1年分だけで判断しない：表彰は毎年変わる。過去の年の結果や、各社が公開している導入事例もあわせて見ると、一時的な強みか、長く続く強みかが分かる',
      ],
    },
    {
      type: 'p',
      text: 'SAPの領域ごとの強みまで踏まえて転職先を考えたい場合は、SAPの仕事を経験したカウンセラーに相談するのも1つの方法です。',
    },
    {
      type: 'affiliate',
      href: 'https://px.a8.net/svt/ejp?a8mat=4BCCJC+8P60Z6+5N98+BWVTE',
      pixel: 'https://www11.a8.net/0.gif?a8mat=4BCCJC+8P60Z6+5N98+BWVTE',
      label: 'SAPテンショク',
      text: 'SAPコンサルタント・SAPエンジニアに特化した転職サービス。カウンセラーもSAPの仕事の経験者。',
      audience: 'SAPのコンサルかエンジニアの経験がある、国内在住の40歳以下の人',
      cta: '無料で相談してみる',
    },

    { type: 'h', text: 'この記事に出てきた名前' },
    {
      type: 'table',
      stack: true,
      headers: ['名前', '種類', '何のためのもの'],
      rows: [
        ['SAP Appreciation for Partner Excellence', '表彰', 'SAPジャパンが毎年選ぶパートナー表彰。2025年までの名前はSAP AWARD OF EXCELLENCE'],
        ['Public Edition（SAP S/4HANA Cloud Public Edition）', 'ERP製品', 'SAPがクラウドで提供する、全社共通の標準版のERP。アドオンの自由度は小さいが、更新はSAPが行う'],
        ['RISE with SAP', '契約・サービス', 'S/4HANA（Private Edition）とインフラ・運用などをまとめて契約するSAPのサービス'],
        ['SAP BTP（Business Technology Platform）', '開発基盤', 'SAP本体の外でアドオンや連携を作るための基盤'],
        ['SAP Business Data Cloud（BDC）', 'データ製品', 'SAPと周辺システムのデータをまとめて分析・活用するための製品'],
        ['SAP SuccessFactors', '人事製品', '人事・給与・タレントマネジメントのクラウド製品'],
        ['IBP（Integrated Business Planning）', 'SCM製品', '需要と供給の計画を立てるクラウド製品'],
        ['SAP Ariba', '調達製品', '見積・発注・請求など調達業務のクラウド製品'],
        ['SAP Signavio／SAP LeanIX', '分析製品', '業務プロセスの可視化と、システム全体の構成の管理'],
        ['MSP（Managed Service Provider）', '役割', 'インフラからアプリまでの運用をまとめて引き受けるパートナー'],
        ['Fit to Standard', '導入の進め方', '標準機能に業務を合わせ、アドオンを最小限にする導入方法'],
        ['クリーンコア', '導入の考え方', 'SAP本体に手を加えず、拡張は本体の外（BTPなど）に作る考え方'],
      ],
    },
  ],
};
