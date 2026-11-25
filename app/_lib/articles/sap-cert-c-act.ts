import type { ColumnArticle } from './index';

export const sapCertCAct: ColumnArticle = {
  slug: 'sap-cert-c-act',
  status: 'published',
  publishedAt: '2026-11-22',
  category: 'career',
  topic: 'career',
  cardTitle: 'SAP Activate認定資格（C_ACT）',
  title: 'SAP Activate認定資格（C_ACT）を日本語で受けた｜試験の形式・範囲と、向いている人',
  summary:
    'SAP Activate の認定試験（C_ACT）を、AIロールプレイ形式・日本語で受けて80%で合格しました。試験の形式と範囲、事前に整理しておくとよいこと、向いている人、導入・移行案件でどう生かせるかをまとめます。',
  keywords: [
    'C_ACT',
    'SAP Activate',
    'SAP認定資格',
    'Project Manager',
    'シナリオ形式',
    'Fit-to-Standard',
    '難易度',
    '日本語',
  ],
  related: [
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
    { label: 'RISE with SAP Transformation認定資格（C_SIGVT）', href: '/articles/sap-cert-c-sigvt' },
    { label: 'SAP Business AI Platform認定資格（C_BAIPA）', href: '/articles/sap-cert-c-baipa' },
    { label: 'SAP Analytics Cloud認定資格（C_SAC）', href: '/articles/sap-cert-c-sac' },
  ],
  body: [
    {
      type: 'p',
      text: 'SAP Activate（SAPの導入プロジェクトの進め方をまとめた方法論）の認定試験、C_ACT を受けました。正式名称は「SAP Certified - Project Manager - SAP Activate」です。',
    },
    {
      type: 'p',
      text: 'SAPの機能や設定を問う試験ではなく、導入プロジェクトの各フェーズで何をするかを理解しているかを問う試験です。この記事では、試験の形式と範囲、受けてみた様子、向いている人と業務での生かし方をまとめます。',
    },
    {
      type: 'note',
      variant: 'info',
      title: 'この記事で書かないこと',
      text: '認定試験は、試験内容を外部に出さないことに同意して受けます。この記事では、公式に公開されている範囲と、形式・時間・感想だけを書き、出題された内容には触れません。',
    },

    { type: 'h', text: '試験の概要' },
    {
      type: 'table',
      caption: 'C_ACT の概要',
      stack: true,
      headers: ['項目', '内容'],
      rows: [
        ['正式名称', 'SAP Certified - Project Manager - SAP Activate'],
        ['形式', 'シナリオ形式（Scenario Based Assessment）。AIのアバターと会話しながら答える'],
        ['時間', '2時間の枠'],
        ['合格ライン', '60%'],
        ['範囲', 'SAP Activate の6つのフェーズ、Fit-to-Standard、プロジェクト管理、テスト、データ移行、変更管理など'],
      ],
    },
    {
      type: 'p',
      text: '形式や合格ラインは変わることがあるので、受ける前に SAP Learning（learning.sap.com）の認定ページで最新の情報を確認してください。',
    },

    { type: 'h', text: '受けてみた様子' },
    {
      type: 'table',
      caption: '私が受けたときの様子',
      stack: true,
      headers: ['項目', '実際'],
      rows: [
        ['受けた時期', '2026年10〜11月'],
        ['言語', '日本語'],
        ['事前の勉強', '1週間ほど'],
        ['実際にかかった時間', '40〜60分ほど'],
        ['結果', '80%で合格'],
      ],
    },
    {
      type: 'p',
      text: '受けたきっかけは、会社の報奨金（1資格あたり数万円）です。AIのアバターとの会話は日本語で進みましたが、ところどころ言い回しが不自然で、日本語として少し引っかかる場面がありました。日本語で受けられるのは助かる一方、そういうものだと分かっていると落ち着いて受けられます。',
    },
    {
      type: 'note',
      variant: 'info',
      title: '受ける前に知っておくと安心なこと',
      text: '私が受けたときは、カメラをオンにしなくても受験できました。また、答えを考えるのに時間がかかっても、AIのアバターは返事を待ってくれます。急かされることはないので、調べものをしながら落ち着いて答えて大丈夫です。',
    },
    {
      type: 'p',
      text: '感じたのは、SAPの技術知識より、導入プロジェクトの各フェーズで何をすべきかを理解しているかが大事な試験だということです。実務で経験してきた作業を、プロジェクト全体の流れの中に置き直すよい機会になりました。',
    },

    { type: 'h', text: '事前に整理しておくとよいこと' },
    {
      type: 'p',
      text: '用語を覚えるだけでなく、それぞれの活動がどのフェーズのものかを説明できるようにしておくのが準備の中心です。まず6つのフェーズの役割を、自分の言葉で言えるようにしておきます。',
    },
    {
      type: 'table',
      caption: 'SAP Activate の6つのフェーズ',
      stack: true,
      headers: ['フェーズ', '主にすること'],
      rows: [
        ['Discover', 'SAPで何ができるかを知り、導入の方向性を決める'],
        ['Prepare', 'プロジェクトの計画と体制を決め、システムと環境を準備する'],
        ['Explore', 'Fit-to-Standard のワークショップで、標準の業務と自社の業務の差を確認し、追加の要件をまとめる'],
        ['Realize', '設定・開発・テスト・データ移行の準備を、スプリント（短い期間の区切り）を回しながら進める'],
        ['Deploy', '本番移行の準備とリハーサル、カットオーバー（本番への切り替え）、稼働直後の支援'],
        ['Run', '稼働後の運用と、継続的な改善'],
      ],
    },
    {
      type: 'list',
      items: [
        'Fit-to-Standard：要件を一から集めるのではなく、SAPの標準の業務を見せてから差を確認する進め方。従来の要件定義との違いを説明できるようにしておく',
        'SAP Best Practices：業界や業務ごとにSAPが用意している標準のプロセスと設定のひな形',
        'Roadmap Viewer：フェーズごとの作業や成果物を確認できるSAPの公開ツール。勉強のときに、どの作業がどのフェーズに入っているかを確かめるのに使える',
      ],
    },

    { type: 'h', text: 'こういう人に向いている' },
    {
      type: 'list',
      items: [
        'SAPコンサルタントになったばかりの人',
        'これからSAPの導入案件に入る予定の人',
        'PM・PMO（プロジェクトの管理や事務局）としてSAP案件に関わる人',
        '担当モジュールの外も含めて、導入の工程を体系的に理解したい人',
      ],
    },

    { type: 'h', text: '業務でどう生かせるか' },
    {
      type: 'p',
      text: '今回受けた4つの資格の中で、導入案件の仕事にいちばん直接つながる資格です。Fit-to-Standard の進め方、テスト計画、移行リハーサル、カットオーバーの準備などを、プロジェクト全体の流れの中で理解する助けになります。',
    },
    {
      type: 'p',
      text: 'S/4HANA への移行やアップグレードの案件でも、自分の作業の前後の工程で何が行われているかを把握しておくと、手戻りや認識のずれに早く気づけます。モジュールの担当者でも、取っておく意味のある資格です。',
    },
    {
      type: 'note',
      variant: 'info',
      title: '一緒に取るならC_SIGVT',
      text: 'C_ACT が「プロジェクトの進め方」を学ぶ資格なら、C_SIGVT（RISE with SAP Transformation）は「変革を支えるツールとそのつながり」を学ぶ資格です。2つを合わせると、導入・移行プロジェクトの全体像がつかみやすくなります。',
    },

    { type: 'h', text: 'この記事に出てきた名前' },
    {
      type: 'table',
      stack: true,
      headers: ['名前', '種類', '何のためのもの'],
      rows: [
        ['SAP Activate', '方法論', 'SAPの導入プロジェクトの進め方をまとめたもの。6つのフェーズで構成される'],
        ['C_ACT', '認定試験', 'SAP Activate の理解を問う認定試験の試験コード'],
        ['Fit-to-Standard', '進め方', 'SAPの標準の業務を見せてから、自社の業務との差を確認する要件の決め方'],
        ['SAP Best Practices', 'コンテンツ', 'SAPが用意している、業務ごとの標準プロセスと設定のひな形'],
        ['Roadmap Viewer', 'ツール', 'SAP Activate のフェーズごとの作業や成果物を確認できる公開ツール'],
        ['SAP Learning', 'サイト', 'SAPの公式学習サイト（learning.sap.com）。認定の申し込みや学習コースがある'],
      ],
    },
  ],
};
