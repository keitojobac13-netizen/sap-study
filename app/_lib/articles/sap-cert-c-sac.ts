import type { ColumnArticle } from './index';

export const sapCertCSac: ColumnArticle = {
  slug: 'sap-cert-c-sac',
  status: 'published',
  publishedAt: '2026-11-22',
  category: 'career',
  cardTitle: 'SAP Analytics Cloud認定資格（C_SAC）',
  title: 'SAP Analytics Cloud認定資格（C_SAC）を日本語で受けた｜FI・COの人が分析に広げるための資格',
  summary:
    'SAP Analytics Cloud の認定試験（C_SAC）を、AIロールプレイ形式・日本語で受けて80%で合格しました。試験の形式と範囲、Smart Insights や Smart Predict など似た機能の整理のしかた、向いている人と業務での生かし方をまとめます。',
  keywords: [
    'C_SAC',
    'SAP Analytics Cloud',
    'SAC',
    'SAP認定資格',
    'Data Analyst',
    'Smart Insights',
    'Smart Predict',
    'Planning',
  ],
  related: [
    { label: 'SAP認定資格は役に立つか', href: '/articles/sap-certification-value' },
    { label: 'SAP Activate認定資格（C_ACT）', href: '/articles/sap-cert-c-act' },
    { label: 'SAP Business AI Platform認定資格（C_BAIPA）', href: '/articles/sap-cert-c-baipa' },
    { label: 'RISE with SAP Transformation認定資格（C_SIGVT）', href: '/articles/sap-cert-c-sigvt' },
  ],
  body: [
    {
      type: 'p',
      text: 'SAP Analytics Cloud（SAC、SAPのクラウドの分析・計画ツール）の認定試験、C_SAC を受けました。正式名称は「SAP Certified - Data Analyst - SAP Analytics Cloud」です。',
    },
    {
      type: 'p',
      text: 'SAPで伝票を入力・処理する話ではなく、たまったデータをどう分析し、意思決定や計画につなげるかを問う試験です。この記事では、試験の形式と範囲、受けてみた様子、向いている人と業務での生かし方をまとめます。',
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
      caption: 'C_SAC の概要',
      stack: true,
      headers: ['項目', '内容'],
      rows: [
        ['正式名称', 'SAP Certified - Data Analyst - SAP Analytics Cloud'],
        ['形式', 'シナリオ形式（Scenario Based Assessment）。AIのアバターと会話しながら答える'],
        ['時間', '2時間の枠'],
        ['合格ライン', '60%'],
        ['受験の前提', 'なし'],
        ['範囲', 'データモデルの作成、ストーリー（レポート・ダッシュボード）の作成、データの分析、計画（Planning）'],
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
      text: '受けたきっかけは、会社の報奨金（1資格あたり数万円）です。AIのアバターとの会話は日本語で進みましたが、ところどころ言い回しが不自然で、日本語として少し引っかかる場面がありました。',
    },
    {
      type: 'note',
      variant: 'info',
      title: '受ける前に知っておくと安心なこと',
      text: '私が受けたときは、カメラをオンにしなくても受験できました。また、答えを考えるのに時間がかかっても、AIのアバターは返事を待ってくれます。急かされることはないので、調べものをしながら落ち着いて答えて大丈夫です。',
    },
    {
      type: 'p',
      text: '大事だと感じたのは、似た分析機能の違いを整理しておくことです。それぞれ何をする機能かだけでなく、どのデータモデルや接続方式で使えるのかまで押さえておく必要がありました。',
    },

    { type: 'h', text: '事前に整理しておくとよいこと' },
    {
      type: 'p',
      text: 'SAC には、AIや統計を使って分析を助ける機能がいくつもあり、名前も似ています。機能ごとに「何に答えてくれるのか」を一言で言えるようにしておくと混ざりません。',
    },
    {
      type: 'table',
      caption: '違いを整理しておきたい分析機能',
      stack: true,
      headers: ['機能', '何をするか'],
      rows: [
        ['Smart Insights', 'ある数値が、どの項目のせいで大きいのか・変わったのかを自動で説明する'],
        ['Smart Predict', '機械学習で予測する。分類（どちらになりそうか）、回帰（いくらになりそうか）、時系列予測（この先どう動くか）の3種類'],
        ['Just Ask', '言葉で質問すると、グラフや数値で答えてくれる'],
        ['Compass', '計画の数値をモンテカルロ法（乱数で何度も試す方法）でシミュレーションし、結果のばらつきを見る'],
        ['Joule', 'SAPの生成AIのアシスタント。分析の操作を助ける'],
      ],
    },
    {
      type: 'p',
      text: 'もう1つ大事なのが、データのつなぎ方です。SAC には、データを取り込んで使う方法（インポート）と、元のシステムのデータをそのまま見に行く方法（ライブ接続）があり、どちらかによって使える機能が変わります。機能の一覧を見るときに、使える条件もあわせて確認しておくと迷いません。',
    },

    { type: 'h', text: 'こういう人に向いている' },
    {
      type: 'list',
      items: [
        'BIツールやデータ分析に興味がある人',
        'SAPの分析・レポートの領域に関わる人',
        'FI・COの経験を、分析の領域に広げたい人',
        '経営管理や予算の計画に関わる人',
      ],
    },

    { type: 'h', text: '業務でどう生かせるか' },
    {
      type: 'p',
      text: 'FI・COの経験と組み合わせると、財務や管理会計のデータを、どう分析して見せるかの理解が深まります。予算と実績の比較、部門ごとの業績の分析、経営管理のダッシュボードづくりなどが、具体的な使いどころです。',
    },
    {
      type: 'p',
      text: 'ただし、SAC を導入していない案件では、直接使う機会は限られます。FI・COのコンサルタントが、分析の領域にスキルを広げるための資格と考えるとよいと思います。',
    },

    { type: 'h', text: 'この記事に出てきた名前' },
    {
      type: 'table',
      stack: true,
      headers: ['名前', '種類', '何のためのもの'],
      rows: [
        ['SAP Analytics Cloud（SAC）', '製品', 'SAPのクラウドの分析・計画ツール'],
        ['C_SAC', '認定試験', 'SAP Analytics Cloud の分析と計画の理解を問う認定試験の試験コード'],
        ['ストーリー', 'SACの機能', 'グラフや表を並べたレポート・ダッシュボード'],
        ['Smart Insights', 'SACの機能', '数値の要因を自動で説明する'],
        ['Smart Predict', 'SACの機能', '機械学習で分類・回帰・時系列の予測をする'],
        ['Just Ask', 'SACの機能', '言葉で質問してデータを調べる'],
        ['Compass', 'SACの機能', '計画の数値をシミュレーションして、ばらつきを見る'],
        ['ライブ接続', '接続方式', 'データを取り込まず、元のシステムのデータをそのまま見に行くつなぎ方'],
      ],
    },
  ],
};
