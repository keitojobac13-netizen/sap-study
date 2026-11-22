import type { ColumnArticle } from './index';

export const sapCertCBaipa: ColumnArticle = {
  slug: 'sap-cert-c-baipa',
  status: 'published',
  publishedAt: '2026-11-22',
  category: 'career',
  cardTitle: 'SAP Business AI認定資格（C_BAIPA）',
  title: 'SAP Business AI Platform認定資格（C_BAIPA）を日本語で受けた｜Joule・AIエージェントの設計を問う試験',
  summary:
    'SAP Business AI Platform の認定試験（C_BAIPA）を、AIロールプレイ形式・日本語で受けて70%で合格しました。試験の形式と範囲、Joule Studio や AI Agent Hub など整理しておくとよい製品、向いている人と業務での生かし方をまとめます。',
  keywords: [
    'C_BAIPA',
    'SAP Business AI',
    'SAP Business AI Platform',
    'Joule',
    'Joule Studio',
    'AIエージェント',
    'SAP認定資格',
    'Solution Architect',
  ],
  related: [
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
    { label: 'SAP Activate認定資格（C_ACT）', href: '/articles/sap-cert-c-act' },
    { label: 'SAP Analytics Cloud認定資格（C_SAC）', href: '/articles/sap-cert-c-sac' },
    { label: 'RISE with SAP Transformation認定資格（C_SIGVT）', href: '/articles/sap-cert-c-sigvt' },
  ],
  body: [
    {
      type: 'p',
      text: 'SAP Business AI Platform の認定試験、C_BAIPA を受けました。正式名称は「SAP Certified - Solution Architect - SAP Business AI Platform」です。',
    },
    {
      type: 'p',
      text: 'AIの一般的な知識ではなく、企業の課題に対して、SAPのどの製品や技術を組み合わせて解決するかを考える試験です。この記事では、試験の形式と範囲、受けてみた様子、向いている人と業務での生かし方をまとめます。',
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
      caption: 'C_BAIPA の概要',
      stack: true,
      headers: ['項目', '内容'],
      rows: [
        ['正式名称', 'SAP Certified - Solution Architect - SAP Business AI Platform'],
        ['形式', 'シナリオ形式（Scenario Based Assessment）。AIのアバターと会話しながら答える'],
        ['時間', '2時間の枠'],
        ['合格ライン', '60%'],
        ['範囲', '連携の方針、技術的なアーキテクチャ、アプリケーションの設計、ソリューションのガバナンス（統制）'],
      ],
    },
    {
      type: 'p',
      text: 'SAPが勧めている学習コースは「Becoming an SAP Business AI Platform Solution Architect」です。形式や合格ラインは変わることがあるので、受ける前に SAP Learning（learning.sap.com）の認定ページで最新の情報を確認してください。',
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
      text: 'SAPのAI関連の製品は種類が多く、それぞれの役割と組み合わせ方を理解するのが学習の中心でした。結果は2つの領域ごとに5段階で返ってきて、AIエージェントの設計の領域は3、もう1つのアプリケーションの設計の領域は4でした。AIエージェントの設計は、特に難しく感じたところです。',
    },

    { type: 'h', text: '事前に整理しておくとよいこと' },
    {
      type: 'p',
      text: '製品ごとに「何ができるか」だけでなく、「どういう課題のときに、どれとどれを組み合わせるか」を説明できるようにしておくのが準備の中心です。主な製品の役割をざっくり整理すると、次のようになります。',
    },
    {
      type: 'table',
      caption: '役割を整理しておきたい主な製品',
      stack: true,
      headers: ['製品', '役割'],
      rows: [
        ['Joule', 'SAPの業務アプリの中で使える、生成AIのアシスタント'],
        ['Joule Studio', 'Joule のスキルやAIエージェントを作る開発環境'],
        ['SAP AI Agent Hub', '作ったAIエージェントを管理し、動きを見えるようにする'],
        ['SAP Knowledge Graph', 'SAPの業務データの意味とつながりを表し、AIが業務データを正しく扱えるようにする'],
        ['SAP Business Data Cloud', 'SAPの内外のデータをまとめ、分析やAIに使えるようにするデータ基盤'],
      ],
    },
    {
      type: 'p',
      text: 'あわせて、AIを業務に入れるときのセキュリティとガバナンス（誰が何を使えるか、AIの判断をどう確かめるか）の考え方も範囲に入っています。製品名を覚えるより、要件からアーキテクチャを選ぶ考え方に慣れておくほうが役に立ちます。',
    },

    { type: 'h', text: 'こういう人に向いている' },
    {
      type: 'list',
      items: [
        'SAP Business AI に興味がある人',
        'SAP BTP（SAPのクラウド開発・連携の基盤）やAIアプリケーションの設計に関わる人',
        'AIを使った業務改善を提案したいコンサルタント',
        'SAPの技術的な全体像を幅広く知りたい人',
      ],
    },

    { type: 'h', text: '業務でどう生かせるか' },
    {
      type: 'p',
      text: 'お客様から「生成AIを使って業務を効率化したい」と相談されたときに、SAPのAI関連の製品を整理して、実現の方法を考えるための土台になります。',
    },
    {
      type: 'p',
      text: '一方で、FIなどの既存の業務領域を担当しているだけだと、学んだ内容を直接使う場面は今のところ多くありません。今の担当業務に役立つというより、将来の提案の幅や、技術の領域を広げるための資格だと考えています。',
    },

    { type: 'h', text: 'この記事に出てきた名前' },
    {
      type: 'table',
      stack: true,
      headers: ['名前', '種類', '何のためのもの'],
      rows: [
        ['C_BAIPA', '認定試験', 'SAP Business AI Platform のソリューション設計を問う認定試験の試験コード'],
        ['SAP Business AI', '製品群', 'SAPの業務アプリに組み込まれたAIの機能とサービスの総称'],
        ['Joule', '製品', 'SAPの業務アプリの中で使える生成AIのアシスタント'],
        ['Joule Studio', '製品', 'Joule のスキルやAIエージェントを作る開発環境'],
        ['SAP AI Agent Hub', '製品', 'AIエージェントを管理し、動きを見えるようにする'],
        ['SAP Knowledge Graph', '製品', '業務データの意味とつながりを表し、AIが扱えるようにする'],
        ['SAP Business Data Cloud', '製品', 'SAPの内外のデータをまとめるデータ基盤'],
        ['SAP BTP', '基盤', 'SAPのクラウドの開発・連携・データの基盤（Business Technology Platform）'],
      ],
    },
  ],
};
