import type { ColumnArticle } from './index';

export const sapCertCSigvt: ColumnArticle = {
  slug: 'sap-cert-c-sigvt',
  status: 'published',
  publishedAt: '2026-11-22',
  category: 'career',
  cardTitle: 'RISE with SAP認定資格（C_SIGVT）',
  title: 'RISE with SAP Transformation認定資格（C_SIGVT）を日本語で受けた｜LeanIX・Signavio・Cloud ALMのつながり',
  summary:
    'RISE with SAP Transformation の認定試験（C_SIGVT）を、AIロールプレイ形式・日本語で受けて70%で合格しました。試験の形式と範囲、LeanIX・Signavio・Cloud ALM・WalkMe の役割の整理、向いている人と導入・移行案件での生かし方をまとめます。',
  keywords: [
    'C_SIGVT',
    'RISE with SAP',
    'Agent-Led Toolchain',
    'SAP Signavio',
    'SAP LeanIX',
    'SAP Cloud ALM',
    'WalkMe',
    'SAP認定資格',
  ],
  related: [
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
    { label: 'SAP Activate認定資格（C_ACT）', href: '/articles/sap-cert-c-act' },
    { label: 'SAP Business AI Platform認定資格（C_BAIPA）', href: '/articles/sap-cert-c-baipa' },
    { label: 'SAP Analytics Cloud認定資格（C_SAC）', href: '/articles/sap-cert-c-sac' },
  ],
  body: [
    {
      type: 'p',
      text: 'RISE with SAP（S/4HANA のクラウドと、移行を支えるサービスをまとめた SAP の契約形態）での変革を扱う認定試験、C_SIGVT を受けました。正式名称は「SAP Certified - RISE with SAP Transformation - Agent-Led Toolchain」です。',
    },
    {
      type: 'p',
      text: '個別の製品の操作を深く問う試験ではなく、導入・移行プロジェクトの中で、SAPの複数のツールがそれぞれ何を担い、どうつながるかを理解しているかを問う試験です。この記事では、試験の形式と範囲、受けてみた様子、向いている人と業務での生かし方をまとめます。',
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
      caption: 'C_SIGVT の概要',
      stack: true,
      headers: ['項目', '内容'],
      rows: [
        ['正式名称', 'SAP Certified - RISE with SAP Transformation - Agent-Led Toolchain'],
        ['形式', 'シナリオ形式（Scenario Based Assessment）。AIのアバターと会話しながら答える'],
        ['範囲', 'RISE with SAP での変革を支えるツール群（SAP LeanIX・SAP Signavio・SAP Cloud ALM・WalkMe など）の役割とつながり'],
      ],
    },
    {
      type: 'p',
      text: 'この試験は、以前は「Validating Business Transformation」という名前で、2026年に名前と範囲が変わっています。古い名前の情報も残っているので、受ける前に SAP Learning（learning.sap.com）の認定ページで、最新の形式・時間・合格ラインを確認してください。',
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
        ['結果', '70%で合格'],
      ],
    },
    {
      type: 'p',
      text: '受けたきっかけは、会社の報奨金（1資格あたり数万円）です。AIのアバターとの会話は日本語で進みましたが、ところどころ言い回しが不自然で、日本語として少し引っかかる場面がありました。',
    },
    {
      type: 'p',
      text: 'Signavio、LeanIX、Cloud ALM といった製品の機能に加えて、導入・移行プロジェクト全体の中で各ツールがどうつながるのかを学ぶ機会になりました。',
    },

    { type: 'h', text: '事前に整理しておくとよいこと' },
    {
      type: 'p',
      text: 'まず、主なツールがそれぞれ何を担当しているかを一言で言えるようにしておきます。そのうえで、あるツールで分かったことが次のツールにどう渡されるのか、という流れで説明できるようにしておくのが準備の中心です。',
    },
    {
      type: 'table',
      caption: '主なツールの役割',
      stack: true,
      headers: ['ツール', '主な役割'],
      rows: [
        ['SAP LeanIX', '会社のシステムやアプリケーションの全体像を見えるようにし、どれを残し、どれを置き換えるかを考える'],
        ['SAP Signavio', '業務プロセスを見えるようにし、実際の処理の記録から問題点を見つけて改善する'],
        ['SAP Cloud ALM', '導入プロジェクトの作業・要件・テストを管理し、稼働後の運用も見守る'],
        ['WalkMe', '画面の上に操作のガイドを出して、新しいシステムを使いこなしてもらう'],
      ],
    },
    {
      type: 'p',
      text: 'SAP は、もともと「統合されたツールチェーン」と呼んでいたこれらのつながりを、AIエージェントが支える前提で「Agent-Led Toolchain」と呼ぶようになっています。名前の変化も含めて、ツールのつながり方の考え方を押さえておくとよいと思います。',
    },

    { type: 'h', text: 'こういう人に向いている' },
    {
      type: 'list',
      items: [
        'S/4HANA の導入・移行案件に関わる人',
        'SAPプロジェクトのPM・PMO',
        '業務改革やシステムの刷新を担当する人',
        'RISE with SAP の全体像を理解したい人',
      ],
    },

    { type: 'h', text: '業務でどう生かせるか' },
    {
      type: 'p',
      text: 'S/4HANA の導入・移行案件との関わりが深い資格です。業務の分析からシステムの設計、テスト、データ移行、運用まで、各工程をどうつなぐかを考えるときに役立ちます。',
    },
    {
      type: 'note',
      variant: 'info',
      title: 'C_ACT との違い',
      text: 'C_ACT（SAP Activate）が「プロジェクトの進め方」を学ぶ資格なら、C_SIGVT は「変革を支えるツールとそのつながり」を学ぶ資格です。2つを合わせると、導入・移行プロジェクトの全体像がつかみやすくなります。',
    },

    { type: 'h', text: 'この記事に出てきた名前' },
    {
      type: 'table',
      stack: true,
      headers: ['名前', '種類', '何のためのもの'],
      rows: [
        ['RISE with SAP', '契約形態', 'S/4HANA のクラウドと、移行を支えるツールやサービスをまとめたSAPの提供形態'],
        ['C_SIGVT', '認定試験', 'RISE with SAP での変革を支えるツール群の理解を問う認定試験の試験コード'],
        ['SAP LeanIX', '製品', '会社のシステムやアプリケーションの全体像を管理する'],
        ['SAP Signavio', '製品', '業務プロセスを見えるようにして、分析・改善する'],
        ['SAP Cloud ALM', '製品', '導入プロジェクトと稼働後の運用を管理する'],
        ['WalkMe', '製品', '画面上の操作ガイドで、システムの利用の定着を助ける'],
        ['Agent-Led Toolchain', '考え方', 'AIエージェントが支える前提で、変革のツールをつなげて使う SAP の考え方'],
      ],
    },
  ],
};
