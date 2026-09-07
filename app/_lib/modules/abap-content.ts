import type { Language } from '../i18n';
import type { ModuleEnrichment } from '../learning-types';

/** Long-form article text for the ABAP module. Quizzes stay in `abap.ts`. */
export const abapContent: Record<Language, ModuleEnrichment> = {
  ja: {
    intro: [
      'ABAP（Advanced Business Application Programming）は、SAPの業務アプリケーションを記述するために作られたプログラミング言語です。SAP標準の機能そのものがABAPで書かれており、追加開発もアドオンも同じ言語で行います。',
      'ABAPの特徴は、業務システムに必要なものが言語とランタイムに組み込まれている点にあります。データベースアクセス（Open SQL）、画面制御、印刷、権限チェック、多言語対応、そして開発物の移送——これらが外部ライブラリなしで使えます。一般的なプログラミング言語との違いは、まさにこの「業務アプリケーション専用」という設計思想にあります。',
      'この11セクションでは、開発環境とデータ型といった基礎から、内部テーブルとOpen SQLというABAPの中核、モジュール化とオブジェクト指向、そしてALVレポート・データディクショナリ・デバッグまでを扱います。',
    ],
    sections: {
      'abap-overview': {
        summary:
          'ABAPが何のための言語か、SAP標準との関係、追加開発の位置づけ、そしてABAPの世代的な変遷を整理します。',
        keywords: ['ABAP', 'SAP開発', 'アドオン', 'カスタマイズ', 'ABAP Cloud', 'クリーンコア'],
        body: [
          {
            type: 'p',
            text: 'ABAP（Advanced Business Application Programming）は、SAPが自社の業務アプリケーションを開発するために作った言語です。1980年代に登場し、以来SAPシステムの実装言語であり続けています。',
          },
          {
            type: 'p',
            text: '重要なのは、SAP標準の機能もすべてABAPで書かれているという点です。ユーザーはSE38やSE80から標準プログラムのソースコードを読むことができます。「この処理は内部で何をしているのか」を確認できることは、トラブルシューティングにおいて大きな武器になります。',
          },
          { type: 'h', text: 'ABAPが業務向けである意味' },
          {
            type: 'p',
            text: '一般的なプログラミング言語では外部ライブラリに頼る機能が、ABAPには言語とランタイムに組み込まれています。',
          },
          {
            type: 'table',
            caption: '組み込まれている業務向け機能',
            headers: ['機能', '内容'],
            rows: [
              ['Open SQL', 'DBの種類を意識せずにデータベースへアクセスできる'],
              ['内部テーブル', 'メモリ上の表形式データ構造が言語の基本型'],
              ['画面（Dynpro）', '入力画面の定義と制御が標準機能'],
              ['権限チェック', 'AUTHORITY-CHECK文で権限を検証できる'],
              ['多言語対応', 'テキスト要素が言語別に管理される'],
              ['移送', '開発物が自動的にトランスポートに記録される'],
              ['ロック', 'ロックオブジェクトによる排他制御'],
            ],
          },
          { type: 'h', text: '追加開発の位置づけ' },
          {
            type: 'p',
            text: 'SAP導入では、標準機能で要件を満たせない部分を追加開発で補います。この追加開発は、性質によって分類されます。',
          },
          {
            type: 'table',
            caption: '追加開発の分類（RICEFW）',
            headers: ['略号', '内容', '例'],
            rows: [
              ['R（Report）', '帳票・レポート', '独自の集計表、法定帳票'],
              ['I（Interface）', '外部システム連携', '銀行データ取込、EDI'],
              ['C（Conversion）', 'データ移行', '旧システムからのマスタ移行'],
              ['E（Enhancement）', '標準機能の拡張', '入力チェックの追加'],
              ['F（Form）', '帳票フォーム', '請求書、発注書のレイアウト'],
              ['W（Workflow）', '承認フロー', '購買承認、経費精算'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: '追加開発は最小限にすべき',
            text: 'アドオンは、バージョンアップのたびに動作確認と修正が必要になります。標準機能で代替できないかを十分に検討してから開発すべきです。「標準に業務を合わせる」という原則が繰り返し語られるのは、この保守コストがあるためです。特にS/4HANAへの移行では、大量のアドオンが移行の障壁になるケースが多く見られます。',
          },
          { type: 'h', text: '標準を変更しない拡張の考え方' },
          {
            type: 'p',
            text: '標準プログラムを直接書き換えること（モディフィケーション）は、原則として避けるべきです。SAPが提供するパッチや新バージョンを適用するたびに、変更が上書きされたり衝突したりするためです。',
          },
          {
            type: 'p',
            text: 'そのため、SAPは標準を変更せずに機能を追加するための仕組みを用意しています。',
          },
          {
            type: 'table',
            caption: '拡張技術の変遷',
            headers: ['技術', '世代', '特徴'],
            rows: [
              ['ユーザーイグジット', '古い', 'SAPが用意した空のサブルーチンに実装'],
              ['カスタマーイグジット', '古い', 'CMODで有効化。機能グループ単位'],
              ['BAdI（クラシック）', '中間', 'オブジェクト指向。複数実装が可能'],
              ['エンハンスメントフレームワーク', '新しい', 'ソースコードの任意箇所にフックを挿入'],
              ['新BAdI', '新しい', 'エンハンスメントスポットに統合'],
            ],
          },
          { type: 'h', text: 'ABAPの世代的変化' },
          {
            type: 'p',
            text: 'ABAPは長い歴史を持つ言語ですが、近年大きく進化しています。',
          },
          {
            type: 'list',
            items: [
              '手続き型ABAP：レポートとサブルーチン中心の古典的なスタイル',
              'ABAPオブジェクト（1999年〜）：クラスとインタフェースによるオブジェクト指向',
              'ABAP 7.4以降：インライン宣言、コンストラクタ式、テーブル式など簡潔な記法',
              'ABAP Cloud（S/4HANA Cloud）：公開APIのみを使う制限された開発モデル',
            ],
          },
          {
            type: 'note',
            variant: 'info',
            title: 'クリーンコアという考え方',
            text: 'S/4HANAでは「クリーンコア」という原則が強調されています。標準のコアを変更せず、SAPが公開したAPIとエクステンションポイントだけを使って拡張する、という考え方です。これにより、バージョンアップを容易にし、クラウドへの移行も可能にします。ABAP Cloudは、この原則を技術的に強制する開発モデルです。',
          },
          { type: 'h', text: 'プログラムの種類' },
          {
            type: 'table',
            headers: ['種類', '起動方法', '用途'],
            rows: [
              ['実行可能プログラム', 'SE38、Tコード', 'レポート、バッチ処理'],
              ['モジュールプール', 'Tコードのみ', '対話型の画面プログラム'],
              ['関数グループ', '呼び出し', '再利用可能な機能の集合'],
              ['クラスプール', '呼び出し', 'グローバルクラス'],
              ['インクルード', '取り込み', 'ソースコードの分割'],
              ['インタフェースプール', '実装', 'グローバルインタフェース'],
            ],
          },
        ],
      },

      'abap-dev-environment': {
        summary:
          'SE80とADT（Eclipse）という2つの開発環境、パッケージとトランスポートの仕組み、名前空間のルールを解説します。',
        keywords: ['SE80', 'ADT', 'Eclipse', 'パッケージ', 'トランスポート', '名前空間', 'SE38'],
        body: [
          {
            type: 'p',
            text: 'ABAP開発には、SAP GUI上で動く従来型の環境と、Eclipseベースの新しい環境の2つがあります。どちらを使うかは、対象のシステムと開発する内容によって決まります。',
          },
          { type: 'h', text: '2つの開発環境' },
          {
            type: 'table',
            caption: '開発環境の比較',
            headers: ['観点', 'SAP GUI（SE80など）', 'ADT（Eclipse）'],
            rows: [
              ['動作環境', 'SAP GUI内', 'Eclipseプラグイン'],
              ['エディタ', 'ABAPエディタ', 'モダンなコードエディタ'],
              ['補完・リファクタリング', '限定的', '充実している'],
              ['画面（Dynpro）開発', '可能', '不可（GUIが必要）'],
              ['CDSビュー開発', '不可', '必須'],
              ['複数システムの同時操作', '困難', '容易'],
              ['対象', 'ECC、S/4HANAオンプレミス', 'S/4HANA、BTP、Cloud'],
            ],
          },
          {
            type: 'p',
            text: '新しい技術（CDSビュー、RAP、ABAP Cloud）はADTでしか開発できません。一方、従来型のDynpro画面はSAP GUIでしか作れません。実務では両方を使い分けることになります。',
          },
          { type: 'h', text: '主要なトランザクション' },
          {
            type: 'table',
            headers: ['Tコード', '用途'],
            rows: [
              ['SE38', 'ABAPエディタ（プログラムの作成・編集・実行）'],
              ['SE80', 'オブジェクトナビゲータ（統合開発環境）'],
              ['SE11', 'データディクショナリ（テーブル、データ要素の定義）'],
              ['SE37', '関数ビルダ（関数モジュールの作成）'],
              ['SE24', 'クラスビルダ（グローバルクラスの作成）'],
              ['SE41', 'メニューペインタ（画面のメニュー定義）'],
              ['SE51', 'スクリーンペインタ（Dynpro画面の作成）'],
              ['SE93', 'トランザクションコードの定義'],
              ['SE09 / SE10', 'トランスポートオーガナイザ'],
              ['SE16N', 'テーブルの内容表示'],
            ],
          },
          { type: 'h', text: 'パッケージ' },
          {
            type: 'p',
            text: 'パッケージ（旧称：開発クラス）は、開発オブジェクトをまとめる単位です。すべての開発物は、いずれかのパッケージに属します。',
          },
          {
            type: 'p',
            text: 'パッケージは単なるフォルダではありません。トランスポート層と紐づいており、そのパッケージに属するオブジェクトがどのシステムへ移送されるかを決めます。',
          },
          {
            type: 'table',
            headers: ['パッケージ', '意味'],
            rows: [
              ['$TMP', 'ローカルオブジェクト。移送されない。一時的な検証用'],
              ['Z*／Y*', '顧客が作成する通常のパッケージ。移送対象'],
              ['それ以外', 'SAP標準のパッケージ'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: '$TMPに作ったものは移送できない',
            text: 'ローカルオブジェクトとして作成したプログラムは、開発機の中でしか存在できません。本番へ移送するには、後からパッケージを変更する必要があります。検証目的で$TMPを使うのは構いませんが、正式な開発は最初から適切なパッケージに作るべきです。',
          },
          { type: 'h', text: 'トランスポート' },
          {
            type: 'p',
            text: '開発したものを開発機から品質保証機、本番機へ移す仕組みがトランスポートです。ABAPでは、オブジェクトを変更すると自動的にトランスポート要求への登録が求められます。',
          },
          {
            type: 'table',
            caption: 'トランスポート要求の種類',
            headers: ['種類', '内容'],
            rows: [
              ['ワークベンチ要求', 'プログラム、テーブル定義など開発オブジェクト'],
              ['カスタマイジング要求', 'IMGで設定した内容。クライアント依存'],
            ],
          },
          {
            type: 'p',
            text: 'トランスポート要求は、要求（Request）とタスク（Task）の2階層です。要求が移送の単位で、タスクは開発者ごとの作業単位です。開発者が自分のタスクをリリースし、すべてのタスクがリリースされてはじめて、要求をリリースできます。',
          },
          {
            type: 'note',
            variant: 'tip',
            title: '依存関係を意識した移送順序',
            text: 'テーブル定義を使うプログラムがある場合、テーブルが先に移送されていなければプログラムはエラーになります。複数の要求に分かれている場合、リリースの順序と移送の順序を管理する必要があります。関連するオブジェクトは同じ要求にまとめるのが基本です。',
          },
          { type: 'h', text: '名前空間' },
          {
            type: 'p',
            text: '顧客が作成するオブジェクトの名前は、ZまたはYで始めるという規約があります。これはSAPが提供するオブジェクトとの衝突を防ぐためです。',
          },
          {
            type: 'p',
            text: 'SAPが将来リリースするオブジェクトがZやYで始まることはありません。したがって、この規約を守っている限り、バージョンアップで名前が衝突することはありません。',
          },
          {
            type: 'table',
            headers: ['接頭辞', '意味'],
            rows: [
              ['Z', '顧客開発（最も一般的）'],
              ['Y', '顧客開発（Zとの使い分けは組織による）'],
              ['/名前空間/', 'SAPに登録した専用名前空間。パートナー企業などが使用'],
            ],
          },
          {
            type: 'p',
            text: '大規模な組織では、Zの後にさらに接頭辞を付ける命名規約を設けることが多くあります。「ZFI_」「ZMM_」のようにモジュールを示す、あるいは「ZR_」でレポート、「ZI_」でインタフェースを示す、といった規約です。',
          },
        ],
      },

      'abap-data-types': {
        summary:
          'ABAPの組み込み型、変数宣言の書き方、構造体と内部テーブル、そしてインライン宣言による現代的な記法を解説します。',
        keywords: ['データ型', 'DATA', 'TYPES', '構造体', 'CHAR', 'STRING', 'インライン宣言'],
        body: [
          {
            type: 'p',
            text: 'ABAPには業務データを扱うための型が揃っています。特に、金額と数量を正確に扱うための型が用意されている点は、業務言語としての性格をよく表しています。',
          },
          { type: 'h', text: '組み込み型' },
          {
            type: 'table',
            caption: 'ABAPの主な組み込み型',
            headers: ['型', '内容', '既定長', '初期値'],
            rows: [
              ['C', '文字列（固定長）', '1', 'スペース'],
              ['N', '数字文字列（0埋め）', '1', "'0'"],
              ['D', '日付（YYYYMMDD）', '8', "'00000000'"],
              ['T', '時刻（HHMMSS）', '6', "'000000'"],
              ['I', '整数（4バイト）', '—', '0'],
              ['INT8', '整数（8バイト）', '—', '0'],
              ['P', 'パック数（小数桁を指定）', '8', '0'],
              ['F', '浮動小数点', '8', '0'],
              ['STRING', '可変長文字列', '可変', '空'],
              ['XSTRING', '可変長バイト列', '可変', '空'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: '金額にはP型を使う',
            text: '金額の計算に浮動小数点（F型）を使うと、丸め誤差が発生します。ABAPでは金額と数量にはP型（パック数）を使うのが原則です。P型は10進数を正確に表現できるため、会計計算で誤差が生じません。標準テーブルの金額項目も、すべてCURR型（実体はP型）で定義されています。',
          },
          { type: 'h', text: 'N型とC型の違い' },
          {
            type: 'p',
            text: 'N型は「数字だけを格納する文字列」です。数値ではないため計算には使えませんが、前ゼロが保持されます。',
          },
          {
            type: 'code',
            caption: 'N型とC型の挙動',
            code: 'DATA lv_num TYPE n LENGTH 5.\nDATA lv_chr TYPE c LENGTH 5.\n\nlv_num = 42.       " 結果: \'00042\' （前ゼロで埋まる）\nlv_chr = 42.       " 結果: \'42   \' （後ろがスペース）',
          },
          {
            type: 'p',
            text: 'SAPの伝票番号や品目コードは、多くがN型で定義されています。「0000012345」のような前ゼロ付きのコードが表示されるのは、この型を使っているためです。',
          },
          { type: 'h', text: '変数の宣言' },
          {
            type: 'code',
            caption: '基本的な宣言',
            code: '" 組み込み型を直接指定\nDATA lv_name TYPE c LENGTH 30.\nDATA lv_amount TYPE p LENGTH 8 DECIMALS 2.\n\n" データディクショナリの型を参照（推奨）\nDATA lv_matnr TYPE matnr.\nDATA lv_werks TYPE werks_d.\n\n" テーブル項目を参照\nDATA lv_bukrs TYPE bkpf-bukrs.\n\n" 初期値の指定\nDATA lv_count TYPE i VALUE 10.\n\n" 定数\nCONSTANTS lc_status TYPE c LENGTH 1 VALUE \'A\'.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'データ要素を参照するのが基本',
            text: '組み込み型を直接書くより、データディクショナリのデータ要素を参照するほうが望ましい書き方です。項目の桁数がSAPの定義と自動的に一致し、桁数変更にも追随します。品目コードなら TYPE matnr、会社コードなら TYPE bukrs と書くのが原則です。',
          },
          { type: 'h', text: '構造体（Structure）' },
          {
            type: 'p',
            text: '構造体は、複数の項目をまとめた型です。1件のレコードを表現するのに使います。',
          },
          {
            type: 'code',
            caption: '構造体の定義と使用',
            code: 'TYPES: BEGIN OF ty_item,\n         matnr TYPE matnr,\n         maktx TYPE maktx,\n         menge TYPE i,\n         price TYPE p LENGTH 8 DECIMALS 2,\n       END OF ty_item.\n\nDATA ls_item TYPE ty_item.\n\nls_item-matnr = \'MAT-001\'.\nls_item-menge = 10.\n\n" ディクショナリの構造を参照\nDATA ls_mara TYPE mara.',
          },
          { type: 'h', text: '内部テーブルの型' },
          {
            type: 'p',
            text: '内部テーブルは、構造体を複数保持するためのメモリ上の表です。詳細は専用のセクションで扱いますが、宣言の書き方だけ押さえておきます。',
          },
          {
            type: 'code',
            caption: '内部テーブルの宣言',
            code: '" 標準テーブル\nDATA lt_items TYPE STANDARD TABLE OF ty_item.\n\n" 作業領域つき（古い書き方）\nDATA lt_items TYPE TABLE OF ty_item WITH HEADER LINE.\n\n" ディクショナリ構造を使う\nDATA lt_mara TYPE STANDARD TABLE OF mara.\n\n" キー付きソート済テーブル\nDATA lt_sorted TYPE SORTED TABLE OF ty_item\n                WITH UNIQUE KEY matnr.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'WITH HEADER LINEは使わない',
            text: 'ヘッダ行つきの内部テーブルは古い記法であり、テーブル自体とヘッダ行が同じ名前になるため混乱を招きます。ABAPオブジェクト（クラス内）では使用できません。現代のコードでは、明示的に作業領域を宣言するか、フィールドシンボルやインライン宣言を使います。',
          },
          { type: 'h', text: 'インライン宣言（ABAP 7.4以降）' },
          {
            type: 'p',
            text: 'ABAP 7.4からは、使う場所で変数を宣言できるようになりました。型はコンパイラが推論します。',
          },
          {
            type: 'code',
            caption: 'インライン宣言',
            code: '" 従来の書き方\nDATA ls_mara TYPE mara.\nSELECT SINGLE * FROM mara INTO ls_mara WHERE matnr = @lv_matnr.\n\n" インライン宣言\nSELECT SINGLE * FROM mara INTO @DATA(ls_mara) WHERE matnr = @lv_matnr.\n\n" ループでの使用\nLOOP AT lt_items INTO DATA(ls_item).\n  WRITE: / ls_item-matnr.\nENDLOOP.\n\n" 値のコンストラクタ式\nDATA(lt_numbers) = VALUE int_tab( ( 1 ) ( 2 ) ( 3 ) ).',
          },
          {
            type: 'p',
            text: 'インライン宣言により、宣言部とロジックが離れることによる読みにくさが解消されます。変数のスコープが使用箇所の近くに限定されるため、可読性が向上します。',
          },
        ],
      },

      'abap-control-flow': {
        summary:
          '条件分岐とループの書き方、CASE文とCHECK文、ループ制御の命令、そして例外処理との関係を解説します。',
        keywords: ['IF', 'CASE', 'DO', 'WHILE', 'LOOP', 'CHECK', 'EXIT', 'CONTINUE'],
        body: [
          {
            type: 'p',
            text: 'ABAPの制御構文は、他の言語と大きくは変わりません。ただし、業務処理でよく使われる独特の命令（CHECK、EXIT）があり、これらの挙動を正確に理解しておく必要があります。',
          },
          { type: 'h', text: '条件分岐：IF文' },
          {
            type: 'code',
            caption: 'IF文の基本形',
            code: 'IF lv_amount > 10000.\n  lv_discount = 10.\nELSEIF lv_amount > 5000.\n  lv_discount = 5.\nELSE.\n  lv_discount = 0.\nENDIF.\n\n" 複合条件\nIF lv_status = \'A\' AND lv_amount > 0.\n  \" 処理\nENDIF.\n\n" 初期値の判定\nIF lv_matnr IS INITIAL.\n  \" 未設定の場合\nENDIF.\n\n" 内部テーブルが空かどうか\nIF lt_items IS NOT INITIAL.\n  \" データがある場合\nENDIF.',
          },
          {
            type: 'table',
            caption: '比較演算子',
            headers: ['演算子', '別記法', '意味'],
            rows: [
              ['=', 'EQ', '等しい'],
              ['<>', 'NE', '等しくない'],
              ['<', 'LT', '未満'],
              ['>', 'GT', 'より大きい'],
              ['<=', 'LE', '以下'],
              ['>=', 'GE', '以上'],
              ['BETWEEN a AND b', '—', '範囲内'],
              ['IS INITIAL', '—', '初期値である'],
              ['IN', '—', 'レンジテーブルに含まれる'],
              ['CS', '—', '文字列を含む（Contains String）'],
              ['CP', '—', 'パターンに一致（Contains Pattern）'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'IS INITIALとIS NULLは違う',
            text: 'ABAPには他言語のNULLに相当する概念が変数にはありません。IS INITIALは「その型の初期値と等しいか」を判定します。整数なら0、文字なら空白、日付なら00000000です。したがって、「値が0である」ことと「未設定である」ことを区別できません。区別が必要な場合は、別のフラグ項目を用意する設計が必要です。',
          },
          { type: 'h', text: '条件分岐：CASE文' },
          {
            type: 'code',
            caption: 'CASE文',
            code: 'CASE lv_status.\n  WHEN \'A\'.\n    lv_text = \'受付済\'.\n  WHEN \'B\' OR \'C\'.\n    lv_text = \'処理中\'.\n  WHEN \'Z\'.\n    lv_text = \'完了\'.\n  WHEN OTHERS.\n    lv_text = \'不明\'.\nENDCASE.',
          },
          {
            type: 'p',
            text: '同じ変数を複数の値と比較する場合は、IF-ELSEIFを連ねるよりCASE文のほうが読みやすくなります。WHEN OTHERSは必ず書いておくと、想定外の値が来たときに気づけます。',
          },
          { type: 'h', text: 'ループ：DO文とWHILE文' },
          {
            type: 'code',
            caption: '回数指定と条件指定のループ',
            code: '" 回数を指定\nDO 10 TIMES.\n  WRITE: / sy-index.   \" sy-index に回数が入る\nENDDO.\n\n" 無限ループ（EXITで抜ける）\nDO.\n  IF lv_count > 100.\n    EXIT.\n  ENDIF.\n  lv_count = lv_count + 1.\nENDDO.\n\n" 条件が真の間繰り返す\nWHILE lv_flag = abap_true.\n  \" 処理\nENDWHILE.',
          },
          {
            type: 'p',
            text: 'DOループの中では、システム変数sy-indexに現在の繰り返し回数（1から始まる）が入ります。ネストしたループでは、内側のループのsy-indexが優先されるため、外側の回数を保持したい場合は別の変数に退避します。',
          },
          { type: 'h', text: 'ループ：LOOP文' },
          {
            type: 'code',
            caption: '内部テーブルのループ',
            code: '" 作業領域へコピー\nLOOP AT lt_items INTO DATA(ls_item).\n  WRITE: / ls_item-matnr, ls_item-menge.\nENDLOOP.\n\n" フィールドシンボルで参照（高速・変更可能）\nLOOP AT lt_items ASSIGNING FIELD-SYMBOL(<fs_item>).\n  <fs_item>-menge = <fs_item>-menge * 2.\nENDLOOP.\n\n" 条件付きループ\nLOOP AT lt_items INTO ls_item WHERE menge > 100.\n  \" 条件に合う行だけ処理\nENDLOOP.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'ASSIGNINGとINTOの使い分け',
            text: 'INTOは行の内容を作業領域にコピーします。ASSIGNINGはフィールドシンボルで行そのものを参照するため、コピーが発生せず高速です。また、ASSIGNINGなら内部テーブルの行を直接変更できます。大量データを扱う場合や、ループ内で行を更新する場合はASSIGNINGを使います。',
          },
          { type: 'h', text: 'ループ制御の命令' },
          {
            type: 'table',
            caption: 'ループを制御する命令',
            headers: ['命令', '挙動'],
            rows: [
              ['EXIT', 'ループを完全に抜ける'],
              ['CONTINUE', '現在の繰り返しを中断し、次の繰り返しへ'],
              ['CHECK 条件', '条件が偽なら、CONTINUEと同じ動作'],
            ],
          },
          {
            type: 'code',
            caption: 'CHECK文の挙動',
            code: 'LOOP AT lt_items INTO ls_item.\n  CHECK ls_item-menge > 0.   \" 0以下ならスキップ\n  \" ここから先は menge > 0 の行だけ実行される\n  lv_total = lv_total + ls_item-menge.\nENDLOOP.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'CHECKはループ外では処理を終了させる',
            text: 'CHECK文の挙動は、書かれている場所によって変わります。ループの中ではCONTINUEと同じですが、サブルーチンやメソッドの中でループの外に書くと、その処理単位を終了させます。イベントブロックの中では、そのイベントの処理を打ち切ります。この文脈依存の挙動は、可読性を下げる原因になるため、CHECKを使うより明示的なIF文を書くほうが安全な場合が多くあります。',
          },
          { type: 'h', text: 'システムフィールド' },
          {
            type: 'p',
            text: 'ABAPには、実行状態を保持するシステムフィールドがあります。制御構文と組み合わせて頻繁に使われます。',
          },
          {
            type: 'table',
            headers: ['フィールド', '内容'],
            rows: [
              ['sy-subrc', '直前の処理の結果コード。0が成功'],
              ['sy-index', 'DO／WHILEの繰り返し回数'],
              ['sy-tabix', 'LOOP中の現在行のインデックス'],
              ['sy-datum', '現在の日付'],
              ['sy-uzeit', '現在の時刻'],
              ['sy-uname', 'ログインユーザー名'],
              ['sy-mandt', 'クライアント番号'],
              ['sy-langu', 'ログイン言語'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'sy-subrcは直後に判定する',
            text: 'sy-subrcは、多くのABAP命令の実行後に更新されます。SELECT文の後にsy-subrcを見て0かどうかを判定するのが定石ですが、間に別の命令を挟むと値が上書きされます。判定は必ず対象の命令の直後に行ってください。',
          },
        ],
      },

      'abap-internal-tables': {
        summary:
          '内部テーブルの3つの種類とキーの考え方、行の操作命令、そして性能を左右する選択の基準を解説します。',
        keywords: ['内部テーブル', 'STANDARD TABLE', 'SORTED TABLE', 'HASHED TABLE', 'READ TABLE', 'フィールドシンボル'],
        body: [
          {
            type: 'p',
            text: '内部テーブルは、ABAPの中核をなすデータ構造です。メモリ上に表形式でデータを保持し、データベースから取得した結果を加工したり、集計したりするのに使います。ABAPプログラムの大半は、内部テーブルの操作で成り立っています。',
          },
          { type: 'h', text: '3つのテーブル種類' },
          {
            type: 'p',
            text: '内部テーブルには3種類あり、内部の実装とアクセス性能が異なります。',
          },
          {
            type: 'table',
            caption: '内部テーブルの種類',
            headers: ['種類', 'キー', '検索方式', '重複', '主な用途'],
            rows: [
              ['STANDARD TABLE', '非ユニーク', '線形探索', '可', '順次処理、行番号アクセス'],
              ['SORTED TABLE', 'ユニークまたは非ユニーク', '二分探索', '設定次第', 'キー検索が多い、常にソート状態を保ちたい'],
              ['HASHED TABLE', 'ユニーク必須', 'ハッシュ', '不可', '完全キーでの高速検索'],
            ],
          },
          {
            type: 'code',
            caption: '各種類の宣言',
            code: '" 標準テーブル（最も一般的）\nDATA lt_std TYPE STANDARD TABLE OF ty_item.\n\n" ソート済テーブル\nDATA lt_srt TYPE SORTED TABLE OF ty_item\n            WITH UNIQUE KEY matnr.\n\n" ハッシュテーブル\nDATA lt_hsh TYPE HASHED TABLE OF ty_item\n            WITH UNIQUE KEY matnr.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: '種類の選び方',
            text: '件数が少なく順番に処理するだけなら標準テーブルで十分です。数千件以上のデータに対してキーで繰り返し検索するなら、ソート済またはハッシュテーブルを検討します。完全キーでの単一行検索が中心ならハッシュ、範囲検索や部分キー検索もあるならソート済が適します。標準テーブルで線形探索を繰り返すのは、性能問題の典型的な原因です。',
          },
          { type: 'h', text: '行の追加' },
          {
            type: 'code',
            caption: '行を追加する',
            code: '" 作業領域から追加\nls_item-matnr = \'MAT-001\'.\nls_item-menge = 10.\nAPPEND ls_item TO lt_items.\n\n" ソート済／ハッシュテーブルへの追加（APPENDは使えない）\nINSERT ls_item INTO TABLE lt_sorted.\n\n" 位置を指定して挿入\nINSERT ls_item INTO lt_items INDEX 1.\n\n" 別のテーブルからまとめて追加\nAPPEND LINES OF lt_source TO lt_target.\n\n" VALUE式でまとめて構築（7.4以降）\nDATA(lt_items) = VALUE ty_items(\n  ( matnr = \'MAT-001\' menge = 10 )\n  ( matnr = \'MAT-002\' menge = 20 ) ).',
          },
          {
            type: 'p',
            text: 'ソート済テーブルとハッシュテーブルにはAPPENDが使えません。順序がキーによって決まるため、末尾に追加するという概念がないからです。INSERT ... INTO TABLE を使います。',
          },
          { type: 'h', text: '行の読み取り' },
          {
            type: 'code',
            caption: '行を読む',
            code: '" キーで検索（作業領域へ）\nREAD TABLE lt_items INTO ls_item\n     WITH KEY matnr = \'MAT-001\'.\nIF sy-subrc = 0.\n  \" 見つかった\nENDIF.\n\n" フィールドシンボルで参照（コピーなし）\nREAD TABLE lt_items ASSIGNING FIELD-SYMBOL(<fs_item>)\n     WITH KEY matnr = \'MAT-001\'.\n\n" インデックスで読む\nREAD TABLE lt_items INTO ls_item INDEX 1.\n\n" 存在確認だけ（読み込まない・高速）\nREAD TABLE lt_items TRANSPORTING NO FIELDS\n     WITH KEY matnr = \'MAT-001\'.\n\n" テーブル式（7.4以降、見つからないと例外）\nDATA(ls_found) = lt_items[ matnr = \'MAT-001\' ].',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'ソート済テーブルではBINARY SEARCHを明示しない',
            text: '標準テーブルをソートしてから検索する場合、READ TABLE ... BINARY SEARCH を指定すると二分探索になり高速です。ただし、事前にSORTしていなければ結果が不正になります。ソート済テーブル（SORTED TABLE）では、キー検索が自動的に二分探索になるため、BINARY SEARCHの指定は不要です。',
          },
          { type: 'h', text: '行の変更と削除' },
          {
            type: 'code',
            caption: '変更と削除',
            code: '" キーで特定して更新\nMODIFY lt_items FROM ls_item\n       TRANSPORTING menge\n       WHERE matnr = \'MAT-001\'.\n\n" ループ内で更新（ASSIGNINGなら直接書き換え可）\nLOOP AT lt_items ASSIGNING FIELD-SYMBOL(<fs>).\n  <fs>-menge = <fs>-menge * 2.\nENDLOOP.\n\n" 条件で削除\nDELETE lt_items WHERE menge = 0.\n\n" 重複の削除（事前にSORTが必要）\nSORT lt_items BY matnr.\nDELETE ADJACENT DUPLICATES FROM lt_items COMPARING matnr.\n\n" 全件クリア\nCLEAR lt_items.\nFREE lt_items.   \" メモリも解放',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'DELETE ADJACENT DUPLICATESは隣接行しか見ない',
            text: 'この命令は「隣り合う行が同じか」だけを判定します。したがって、事前に同じキーでSORTしていなければ、重複が残ります。SORT忘れは、この命令にまつわる最も多いバグです。',
          },
          { type: 'h', text: '集計と加工' },
          {
            type: 'code',
            caption: 'よく使う集計処理',
            code: '" ソート\nSORT lt_items BY matnr ASCENDING menge DESCENDING.\n\n" 制御レベル処理（キーの切り替わりを検出）\nSORT lt_items BY matnr.\nLOOP AT lt_items INTO ls_item.\n  AT NEW matnr.\n    lv_subtotal = 0.\n  ENDAT.\n\n  lv_subtotal = lv_subtotal + ls_item-menge.\n\n  AT END OF matnr.\n    WRITE: / ls_item-matnr, lv_subtotal.\n  ENDAT.\nENDLOOP.\n\n" 件数\nDATA(lv_count) = lines( lt_items ).\n\n" REDUCEによる集計（7.4以降）\nDATA(lv_total) = REDUCE i( INIT s = 0\n                           FOR ls IN lt_items\n                           NEXT s = s + ls-menge ).',
          },
          {
            type: 'p',
            text: 'AT NEW／AT END OF は制御レベル処理と呼ばれ、ソート済みのデータをキーごとに区切って集計するための構文です。小計・中計・合計を出す帳票プログラムで頻繁に使われます。',
          },
          {
            type: 'note',
            variant: 'tip',
            title: '性能を意識した書き方',
            text: 'ループの中でREAD TABLEを繰り返す構造（ネステッドループ）は、件数が増えると急激に遅くなります。1万件のテーブルを1万件のループで検索すると、最悪1億回の比較が発生します。この場合は、検索対象をハッシュテーブルにする、あるいは事前にソートしてBINARY SEARCHを使うといった対策が必要です。ABAPの性能問題の大半は、この構造に起因します。',
          },
        ],
      },

      'abap-open-sql': {
        summary:
          'Open SQLがデータベースを抽象化する仕組み、性能を左右する書き方の原則、そしてCDSビューへの発展を解説します。',
        keywords: ['Open SQL', 'SELECT', 'INTO TABLE', 'FOR ALL ENTRIES', 'JOIN', 'CDSビュー', 'コードプッシュダウン'],
        body: [
          {
            type: 'p',
            text: 'Open SQLは、ABAPからデータベースにアクセスするための命令群です。データベース製品の違いを吸収し、同じコードがOracle、SQL Server、HANAのいずれでも動作します。',
          },
          { type: 'h', text: 'Open SQLが提供するもの' },
          {
            type: 'list',
            items: [
              'データベース非依存：SQLの方言差を意識しなくてよい',
              'クライアント自動処理：WHERE句にクライアント条件が自動的に付与される',
              'バッファリング：テーブルバッファを自動的に利用する',
              'テーブル権限：データベースレベルの権限チェック',
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'クライアント条件は自動で付く',
            text: 'SAPのテーブルの多くは、先頭項目にMANDT（クライアント）を持ちます。Open SQLでは、WHERE句に明示的に書かなくても、現在のクライアントの条件が自動的に追加されます。これがあるため、他クライアントのデータを誤って読むことがありません。あえて全クライアントを対象にしたい場合は、CLIENT SPECIFIED を指定します。',
          },
          { type: 'h', text: 'SELECT文の基本' },
          {
            type: 'code',
            caption: '基本的な取得',
            code: '" 1件だけ取得\nSELECT SINGLE matnr, mtart, meins\n  FROM mara\n  INTO @DATA(ls_mara)\n  WHERE matnr = @lv_matnr.\n\nIF sy-subrc = 0.\n  \" 見つかった\nENDIF.\n\n" 複数件を内部テーブルへ\nSELECT matnr, mtart, meins\n  FROM mara\n  INTO TABLE @DATA(lt_mara)\n  WHERE mtart = \'FERT\'\n  ORDER BY matnr.\n\n" 件数の取得\nSELECT COUNT(*)\n  FROM mara\n  INTO @DATA(lv_count)\n  WHERE mtart = \'FERT\'.',
          },
          {
            type: 'p',
            text: 'ABAP 7.4以降では、ホスト変数の前に@を付ける新しい構文が推奨されています。この記法では、ABAPの変数とSQLの項目が明確に区別され、可読性が向上します。',
          },
          { type: 'h', text: '性能を左右する原則' },
          {
            type: 'p',
            text: 'Open SQLの書き方は、プログラムの性能に直結します。以下の原則は、ABAP開発における最も重要な知識の1つです。',
          },
          {
            type: 'table',
            caption: '性能のための5原則',
            headers: ['原則', '内容'],
            rows: [
              ['必要な項目だけ選ぶ', 'SELECT * ではなく項目を明示する'],
              ['必要な行だけ選ぶ', 'WHERE句で絞り込んでから取得する'],
              ['ループ内でSELECTしない', 'DB往復が件数分発生する'],
              ['インデックスを意識する', 'WHERE句の項目がインデックスの先頭から使われるように'],
              ['集計はDB側で行う', 'ABAPで集計せず、SUMやGROUP BYを使う'],
            ],
          },
          {
            type: 'code',
            caption: 'アンチパターンと改善例',
            code: '" 悪い例：ループ内でSELECT\nLOOP AT lt_items INTO ls_item.\n  SELECT SINGLE maktx FROM makt\n    INTO ls_item-maktx\n    WHERE matnr = ls_item-matnr\n      AND spras = sy-langu.\nENDLOOP.\n\n" 良い例：一度にまとめて取得してから結合\nIF lt_items IS NOT INITIAL.\n  SELECT matnr, maktx FROM makt\n    INTO TABLE @DATA(lt_makt)\n    FOR ALL ENTRIES IN @lt_items\n    WHERE matnr = @lt_items-matnr\n      AND spras = @sy-langu.\n\n  SORT lt_makt BY matnr.\n\n  LOOP AT lt_items ASSIGNING FIELD-SYMBOL(<fs>).\n    READ TABLE lt_makt INTO DATA(ls_makt)\n         WITH KEY matnr = <fs>-matnr BINARY SEARCH.\n    IF sy-subrc = 0.\n      <fs>-maktx = ls_makt-maktx.\n    ENDIF.\n  ENDLOOP.\nENDIF.',
          },
          { type: 'h', text: 'FOR ALL ENTRIESの注意点' },
          {
            type: 'p',
            text: 'FOR ALL ENTRIESは、内部テーブルの各行の値を条件にして一括取得する構文です。便利ですが、いくつか落とし穴があります。',
          },
          {
            type: 'table',
            caption: 'FOR ALL ENTRIESの注意点',
            headers: ['注意点', '内容'],
            rows: [
              ['空テーブルは全件取得になる', '駆動表が空だとWHERE条件が消え、全件が返る'],
              ['重複が自動的に除去される', '結果から重複行が消えるため、件数が期待と違うことがある'],
              ['分割実行される', '内部的に複数のSQLに分割される。件数が多いと往復が増える'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: '空チェックは必須',
            text: 'FOR ALL ENTRIESの駆動表が空の場合、WHERE条件そのものが無視され、テーブルの全件が返ってきます。数百万件のテーブルに対してこれが起きると、システム全体が停止しかねません。FOR ALL ENTRIESの前には必ず IF lt_table IS NOT INITIAL. のチェックを入れてください。',
          },
          { type: 'h', text: 'JOINとサブクエリ' },
          {
            type: 'code',
            caption: '内部結合',
            code: 'SELECT a~matnr, a~mtart, b~maktx\n  FROM mara AS a\n  INNER JOIN makt AS b\n    ON a~matnr = b~matnr\n  INTO TABLE @DATA(lt_result)\n  WHERE a~mtart = \'FERT\'\n    AND b~spras = @sy-langu.',
          },
          {
            type: 'p',
            text: 'JOINを使えば、複数テーブルのデータを1回のSQLで取得できます。FOR ALL ENTRIESより効率的な場合が多いため、結合可能な場合はJOINを優先します。ただし、結合するテーブルが多すぎると、逆に遅くなることもあります。',
          },
          { type: 'h', text: '更新系の命令' },
          {
            type: 'code',
            caption: 'データの更新',
            code: '" 挿入\nINSERT ztable FROM ls_data.\nINSERT ztable FROM TABLE lt_data.\n\n" 更新\nUPDATE ztable FROM ls_data.\nUPDATE ztable SET status = \'C\'\n       WHERE matnr = @lv_matnr.\n\n" 挿入または更新\nMODIFY ztable FROM ls_data.\n\n" 削除\nDELETE FROM ztable WHERE matnr = @lv_matnr.\n\n" コミット\nCOMMIT WORK.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'SAP標準テーブルを直接更新しない',
            text: 'INSERT／UPDATE／DELETE文でSAP標準のテーブルを直接書き換えることは、絶対に避けるべきです。標準の処理は複数のテーブルを整合性を保ちながら更新しており、1つのテーブルだけを変更するとデータの不整合が発生します。標準データを更新する場合は、必ずBAPIやトランザクションを経由してください。直接更新が許されるのは、自分で作成したZテーブルだけです。',
          },
          { type: 'h', text: 'CDSビューとコードプッシュダウン' },
          {
            type: 'p',
            text: 'HANAの登場により、「処理をできるだけデータベース側で行う」というコードプッシュダウンの考え方が重要になりました。',
          },
          {
            type: 'p',
            text: '従来は、データを大量にABAPサーバへ持ってきてから加工していました。HANAでは、集計や結合をデータベース側で実行し、結果だけを受け取るほうが圧倒的に高速です。',
          },
          {
            type: 'p',
            text: 'この実現手段がCDS（Core Data Services）ビューです。ADTで定義し、複数テーブルの結合、集計、計算列、権限制御までをビューとして記述できます。ABAPからは単純なSELECTでアクセスするだけで、複雑な処理はHANAが実行します。',
          },
          {
            type: 'code',
            caption: 'CDSビューの例',
            code: '@AbapCatalog.sqlViewName: \'ZVMATSUM\'\n@AccessControl.authorizationCheck: #CHECK\ndefine view Z_Material_Summary as\n  select from mara as m\n    inner join makt as t\n      on m.matnr = t.matnr\n{\n  key m.matnr    as Material,\n      m.mtart    as MaterialType,\n      t.maktx    as Description\n}\nwhere t.spras = $session.system_language',
          },
        ],
      },

      'abap-modularization': {
        summary:
          'サブルーチン・関数モジュール・メソッドという3つのモジュール化手段、パラメータの渡し方、BAPIの位置づけを解説します。',
        keywords: ['モジュール化', 'FORM', '関数モジュール', 'SE37', 'BAPI', 'RFC', 'パラメータ'],
        body: [
          {
            type: 'p',
            text: 'モジュール化は、処理をまとまった単位に分割して再利用可能にする技法です。ABAPには歴史的な経緯から複数の手段があり、それぞれ適した用途が異なります。',
          },
          { type: 'h', text: '3つのモジュール化手段' },
          {
            type: 'table',
            caption: 'モジュール化手段の比較',
            headers: ['手段', '定義場所', '再利用範囲', '現在の推奨度'],
            rows: [
              ['サブルーチン（FORM）', 'プログラム内', '同一プログラム内が原則', '非推奨（レガシー）'],
              ['関数モジュール', '関数グループ', 'システム全体', '用途による'],
              ['メソッド', 'クラス', 'システム全体', '推奨'],
            ],
          },
          { type: 'h', text: 'サブルーチン（FORM）' },
          {
            type: 'code',
            caption: 'サブルーチンの定義と呼び出し',
            code: 'PERFORM calculate_total\n  USING    lt_items\n  CHANGING lv_total.\n\nFORM calculate_total\n  USING    it_items TYPE ty_items\n  CHANGING cv_total TYPE i.\n\n  CLEAR cv_total.\n  LOOP AT it_items INTO DATA(ls_item).\n    cv_total = cv_total + ls_item-menge.\n  ENDLOOP.\n\nENDFORM.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'FORMは新規開発では使わない',
            text: 'サブルーチンは、型チェックが緩く、グローバル変数に依存しやすく、オブジェクト指向のコードから呼べないといった問題があります。SAPも公式に非推奨としています。既存プログラムの保守で読む必要はありますが、新規開発ではクラスのメソッドを使うべきです。',
          },
          { type: 'h', text: '関数モジュール' },
          {
            type: 'p',
            text: '関数モジュールは、SE37で作成する再利用可能な処理単位です。関数グループという入れ物に属し、同じグループ内の関数はグローバルデータを共有します。',
          },
          {
            type: 'table',
            caption: '関数モジュールのパラメータ',
            headers: ['種類', '方向', '特徴'],
            rows: [
              ['IMPORT', '入力', '関数が受け取る値'],
              ['EXPORT', '出力', '関数が返す値'],
              ['CHANGING', '入出力', '渡した変数が書き換えられる'],
              ['TABLES', '入出力', '内部テーブル用（古い形式）'],
              ['EXCEPTIONS', '例外', '呼び出し元でsy-subrcとして受け取る'],
            ],
          },
          {
            type: 'code',
            caption: '関数モジュールの呼び出し',
            code: 'CALL FUNCTION \'Z_CALCULATE_DISCOUNT\'\n  EXPORTING\n    iv_amount     = lv_amount\n    iv_customer   = lv_kunnr\n  IMPORTING\n    ev_discount   = lv_discount\n  EXCEPTIONS\n    invalid_input = 1\n    not_found     = 2\n    OTHERS        = 3.\n\nIF sy-subrc <> 0.\n  \" エラー処理\nENDIF.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'EXPORTINGとIMPORTINGの向きに注意',
            text: '呼び出し側のEXPORTINGは「関数へ渡す」、IMPORTINGは「関数から受け取る」を意味します。関数定義側から見ると逆になります（定義側のIMPORTが受け取り）。この向きの逆転は初学者が必ず混乱する点なので、「呼び出し側から見た向き」と覚えてください。',
          },
          { type: 'h', text: 'RFC対応関数とBAPI' },
          {
            type: 'p',
            text: '関数モジュールをRFC対応（リモート呼び出し可能）に設定すると、外部システムから呼び出せるようになります。この仕組みを使い、SAPが業務処理の標準APIとして提供しているのがBAPIです。',
          },
          {
            type: 'table',
            caption: '代表的なBAPI',
            headers: ['BAPI', '用途'],
            rows: [
              ['BAPI_MATERIAL_SAVEDATA', '品目マスタの登録・変更'],
              ['BAPI_SALESORDER_CREATEFROMDAT2', '受注伝票の作成'],
              ['BAPI_PO_CREATE1', '購買発注の作成'],
              ['BAPI_ACC_DOCUMENT_POST', '会計伝票の転記'],
              ['BAPI_GOODSMVT_CREATE', '在庫移動の転記'],
              ['BAPI_TRANSACTION_COMMIT', 'コミット（BAPI呼び出し後に必須）'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'BAPIの後には必ずCOMMITが必要',
            text: 'BAPIは内部でCOMMIT WORKを実行しません。呼び出し側で BAPI_TRANSACTION_COMMIT を呼ばなければ、データは保存されません。逆にエラー時は BAPI_TRANSACTION_ROLLBACK を呼びます。また、BAPIの戻り値であるRETURNテーブルには、エラーや警告のメッセージが入ります。TYPEが「E」または「A」ならエラーなので、必ず確認してください。',
          },
          { type: 'h', text: 'メソッド（ABAPオブジェクト）' },
          {
            type: 'p',
            text: '現代のABAP開発では、クラスのメソッドが標準的なモジュール化手段です。詳細は次のセクションで扱いますが、パラメータの考え方は関数モジュールと似ています。',
          },
          {
            type: 'code',
            caption: 'メソッドの定義と呼び出し',
            code: 'CLASS lcl_calculator DEFINITION.\n  PUBLIC SECTION.\n    METHODS calculate_total\n      IMPORTING it_items        TYPE ty_items\n      RETURNING VALUE(rv_total) TYPE i.\nENDCLASS.\n\nCLASS lcl_calculator IMPLEMENTATION.\n  METHOD calculate_total.\n    LOOP AT it_items INTO DATA(ls_item).\n      rv_total = rv_total + ls_item-menge.\n    ENDLOOP.\n  ENDMETHOD.\nENDCLASS.\n\n" 呼び出し\nDATA(lo_calc) = NEW lcl_calculator( ).\nDATA(lv_total) = lo_calc->calculate_total( lt_items ).',
          },
          {
            type: 'p',
            text: 'RETURNINGパラメータを持つメソッドは、式の中で直接使えます。これにより、一時変数を減らした簡潔なコードが書けます。RETURNINGは1つしか定義できませんが、その制約が「メソッドは1つのことをする」という設計を促します。',
          },
          { type: 'h', text: 'パラメータの渡し方' },
          {
            type: 'table',
            caption: '値渡しと参照渡し',
            headers: ['方式', '記法', '挙動'],
            rows: [
              ['参照渡し（既定）', 'IMPORTING iv_x TYPE i', 'コピーが発生しない。高速だが変更に注意'],
              ['値渡し', 'IMPORTING VALUE(iv_x) TYPE i', 'コピーが渡される。安全だが大きなデータでは遅い'],
            ],
          },
          {
            type: 'p',
            text: 'ABAPでは既定が参照渡しです。IMPORTINGパラメータは呼び出し先で変更できないよう保護されていますが、大きな内部テーブルを扱う場合、値渡しにするとコピーのコストが発生します。性能が問題になる場面では、この違いを意識する必要があります。',
          },
        ],
      },

      'abap-oop': {
        summary:
          'ABAPオブジェクトのクラス定義、継承とインタフェース、静的と動的の違い、そして例外クラスの使い方を解説します。',
        keywords: ['ABAPオブジェクト', 'CLASS', 'インタフェース', '継承', 'SE24', '例外クラス', 'TRY CATCH'],
        body: [
          {
            type: 'p',
            text: 'ABAPオブジェクトは、1999年にABAPへ導入されたオブジェクト指向の機能です。現在のABAP開発では、これが標準的な書き方となっています。',
          },
          { type: 'h', text: 'クラスの定義' },
          {
            type: 'p',
            text: 'ABAPのクラスは、定義部（DEFINITION）と実装部（IMPLEMENTATION）に分かれています。',
          },
          {
            type: 'code',
            caption: 'クラスの基本構造',
            code: 'CLASS lcl_order DEFINITION.\n\n  PUBLIC SECTION.\n    METHODS constructor\n      IMPORTING iv_order_id TYPE vbeln.\n\n    METHODS get_total\n      RETURNING VALUE(rv_total) TYPE p LENGTH 8 DECIMALS 2.\n\n    CLASS-METHODS create_from_db\n      IMPORTING iv_order_id      TYPE vbeln\n      RETURNING VALUE(ro_order)  TYPE REF TO lcl_order.\n\n  PROTECTED SECTION.\n    METHODS calculate_tax\n      RETURNING VALUE(rv_tax) TYPE p LENGTH 8 DECIMALS 2.\n\n  PRIVATE SECTION.\n    DATA mv_order_id TYPE vbeln.\n    DATA mt_items    TYPE ty_items.\n\nENDCLASS.\n\nCLASS lcl_order IMPLEMENTATION.\n\n  METHOD constructor.\n    mv_order_id = iv_order_id.\n  ENDMETHOD.\n\n  METHOD get_total.\n    LOOP AT mt_items INTO DATA(ls_item).\n      rv_total = rv_total + ls_item-amount.\n    ENDLOOP.\n  ENDMETHOD.\n\nENDCLASS.',
          },
          {
            type: 'table',
            caption: '可視性セクション',
            headers: ['セクション', 'アクセス範囲'],
            rows: [
              ['PUBLIC', 'どこからでもアクセス可能'],
              ['PROTECTED', '自クラスと継承したクラスからアクセス可能'],
              ['PRIVATE', '自クラス内からのみアクセス可能'],
            ],
          },
          { type: 'h', text: 'インスタンスと静的' },
          {
            type: 'p',
            text: 'ABAPでは、インスタンスに属するものと、クラス自体に属するもの（静的）を、キーワードで区別します。',
          },
          {
            type: 'table',
            headers: ['種類', 'キーワード', 'アクセス演算子'],
            rows: [
              ['インスタンス属性', 'DATA', 'obj->attr'],
              ['静的属性', 'CLASS-DATA', 'class=>attr'],
              ['インスタンスメソッド', 'METHODS', 'obj->method( )'],
              ['静的メソッド', 'CLASS-METHODS', 'class=>method( )'],
            ],
          },
          {
            type: 'code',
            caption: 'インスタンスの生成と使用',
            code: '" 従来の書き方\nDATA lo_order TYPE REF TO lcl_order.\nCREATE OBJECT lo_order\n  EXPORTING iv_order_id = \'0000012345\'.\n\n" 現代的な書き方（7.4以降）\nDATA(lo_order) = NEW lcl_order( iv_order_id = \'0000012345\' ).\n\n" メソッド呼び出し\nDATA(lv_total) = lo_order->get_total( ).\n\n" 静的メソッド呼び出し（インスタンス不要）\nDATA(lo_new) = lcl_order=>create_from_db( \'0000012345\' ).',
          },
          { type: 'h', text: '継承' },
          {
            type: 'code',
            caption: '継承とメソッドの再定義',
            code: 'CLASS lcl_rush_order DEFINITION\n  INHERITING FROM lcl_order.\n\n  PUBLIC SECTION.\n    METHODS get_total REDEFINITION.\n\nENDCLASS.\n\nCLASS lcl_rush_order IMPLEMENTATION.\n  METHOD get_total.\n    \" 親クラスの処理を呼ぶ\n    rv_total = super->get_total( ).\n    \" 特急料金を加算\n    rv_total = rv_total * \'1.2\'.\n  ENDMETHOD.\nENDCLASS.',
          },
          {
            type: 'p',
            text: 'ABAPは単一継承のみをサポートします。複数の親を持つことはできません。複数の振る舞いを組み合わせたい場合は、インタフェースを使います。',
          },
          { type: 'h', text: 'インタフェース' },
          {
            type: 'code',
            caption: 'インタフェースの定義と実装',
            code: 'INTERFACE lif_printable.\n  METHODS print.\nENDINTERFACE.\n\nCLASS lcl_invoice DEFINITION.\n  PUBLIC SECTION.\n    INTERFACES lif_printable.\nENDCLASS.\n\nCLASS lcl_invoice IMPLEMENTATION.\n  METHOD lif_printable~print.\n    WRITE: / \'請求書を印刷します\'.\n  ENDMETHOD.\nENDCLASS.\n\n" インタフェース参照で扱う\nDATA lo_printable TYPE REF TO lif_printable.\nlo_printable = NEW lcl_invoice( ).\nlo_printable->print( ).',
          },
          {
            type: 'p',
            text: 'インタフェースを使うと、実装クラスが何であれ同じように扱えます。「印刷できるもの」として請求書も納品書も同じコードで処理できる——これがポリモーフィズムです。テストの際にモックオブジェクトへ差し替えられるという利点もあります。',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'インタフェースメソッドの呼び出しは ~ を使う',
            text: 'インタフェースのメソッドを実装するときも、クラス内部から呼ぶときも、「インタフェース名~メソッド名」という記法を使います。このチルダ記法はABAP独特のもので、どのインタフェースに由来するメソッドかを明示します。',
          },
          { type: 'h', text: '例外クラス' },
          {
            type: 'p',
            text: 'ABAPオブジェクトでは、例外もクラスとして扱います。従来のEXCEPTIONS（sy-subrcで判定）より、はるかに詳細な情報を伝えられます。',
          },
          {
            type: 'code',
            caption: '例外処理',
            code: '" 例外の送出\nMETHOD get_customer.\n  SELECT SINGLE * FROM kna1 INTO @DATA(ls_kna1)\n    WHERE kunnr = @iv_kunnr.\n\n  IF sy-subrc <> 0.\n    RAISE EXCEPTION TYPE zcx_customer_not_found\n      EXPORTING customer_id = iv_kunnr.\n  ENDIF.\nENDMETHOD.\n\n" 例外の捕捉\nTRY.\n    DATA(ls_customer) = lo_service->get_customer( \'0000001000\' ).\n\n  CATCH zcx_customer_not_found INTO DATA(lx_notfound).\n    MESSAGE lx_notfound->get_text( ) TYPE \'E\'.\n\n  CATCH cx_root INTO DATA(lx_root).\n    \" 想定外のエラー\n    MESSAGE lx_root->get_text( ) TYPE \'E\'.\n\n  CLEANUP.\n    \" 例外発生時の後始末\nENDTRY.',
          },
          {
            type: 'table',
            caption: '例外クラスの基底',
            headers: ['クラス', '性質'],
            rows: [
              ['CX_STATIC_CHECK', '宣言必須。呼び出し元が必ず処理する'],
              ['CX_DYNAMIC_CHECK', '宣言不要。実行時にチェック'],
              ['CX_NO_CHECK', '宣言も捕捉も不要。致命的エラー向け'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'CATCH cx_root だけで済ませない',
            text: 'すべての例外をcx_rootで一括して捕まえると、想定していたエラーと予期しないバグを区別できなくなります。まず具体的な例外クラスを捕捉し、最後の手段としてcx_rootを置くのが正しい書き方です。また、捕捉して何もしない（握りつぶす）のは、原因究明を困難にする最悪の実装です。',
          },
        ],
      },

      'abap-alv': {
        summary:
          'ALVが提供する標準機能、SALVとCL_GUI_ALV_GRIDの使い分け、フィールドカタログの作り方を解説します。',
        keywords: ['ALV', 'SALV', 'CL_GUI_ALV_GRID', 'フィールドカタログ', 'レポート', 'REUSE_ALV_GRID_DISPLAY'],
        body: [
          {
            type: 'p',
            text: 'ALV（ABAP List Viewer）は、内部テーブルの内容を表形式で表示するための標準部品です。ABAPで帳票やレポートを作る際、ほぼ必ず使うことになります。',
          },
          { type: 'h', text: 'ALVが提供する機能' },
          {
            type: 'p',
            text: 'ALVを使う最大の理由は、実装なしで多くの機能が手に入ることです。',
          },
          {
            type: 'list',
            items: [
              '列のソート、フィルタ、並べ替え、幅の調整',
              '小計・合計の自動計算',
              'Excel、CSV、PDFへのエクスポート',
              '表示レイアウトの保存と再利用（バリアント）',
              '行の選択とダブルクリックによる詳細表示',
              '印刷レイアウトの自動生成',
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: '自前で表を作らない',
            text: 'WRITE文で表を組み立てるプログラムを見かけることがありますが、ALVを使えば数十行のコードで同じ以上のものが得られます。ソートもExcel出力もユーザーが自分で行えるため、「並べ替えたレポートが欲しい」という追加要望も発生しません。新規開発でWRITE文による帳票を書く理由はほとんどありません。',
          },
          { type: 'h', text: 'ALVの実装方式' },
          {
            type: 'table',
            caption: 'ALVの3つの実装方式',
            headers: ['方式', '呼び方', '特徴', '推奨度'],
            rows: [
              ['関数モジュール', 'REUSE_ALV_GRID_DISPLAY', '古典的。設定項目が多く冗長', 'レガシー'],
              ['CL_GUI_ALV_GRID', 'コントロールベース', '細かい制御が可能。コード量が多い', '複雑な要件向け'],
              ['CL_SALV_TABLE', 'SALV（シンプルALV）', '簡潔に書ける。標準的な要件に十分', '推奨'],
            ],
          },
          { type: 'h', text: 'SALVによる最短実装' },
          {
            type: 'code',
            caption: 'SALVでALVを表示する',
            code: 'DATA lo_alv TYPE REF TO cl_salv_table.\n\nSELECT matnr, mtart, meins\n  FROM mara\n  INTO TABLE @DATA(lt_mara)\n  UP TO 100 ROWS.\n\nTRY.\n    cl_salv_table=>factory(\n      IMPORTING r_salv_table = lo_alv\n      CHANGING  t_table      = lt_mara ).\n\n    \" 標準ツールバーを表示\n    lo_alv->get_functions( )->set_all( abap_true ).\n\n    \" 列幅の自動調整\n    lo_alv->get_columns( )->set_optimize( abap_true ).\n\n    \" 縞模様表示\n    lo_alv->get_display_settings( )->set_striped_pattern( abap_true ).\n\n    lo_alv->display( ).\n\n  CATCH cx_salv_msg INTO DATA(lx_msg).\n    MESSAGE lx_msg->get_text( ) TYPE \'E\'.\nENDTRY.',
          },
          {
            type: 'p',
            text: 'これだけで、ソート・フィルタ・Excel出力・印刷に対応した表が表示されます。SALVは内部テーブルの構造から自動的にフィールドカタログを生成するため、列定義を手で書く必要がありません。',
          },
          { type: 'h', text: 'SALVでの表示カスタマイズ' },
          {
            type: 'code',
            caption: '列の設定変更',
            code: 'DATA(lo_columns) = lo_alv->get_columns( ).\n\n" 特定の列を取得して設定\nDATA(lo_column) = lo_columns->get_column( \'MTART\' ).\nlo_column->set_short_text( \'品目タイプ\' ).\nlo_column->set_medium_text( \'品目タイプ\' ).\nlo_column->set_long_text( \'品目タイプ\' ).\n\n" 列を非表示にする\nlo_columns->get_column( \'MANDT\' )->set_visible( abap_false ).\n\n" 合計を表示する\nDATA(lo_agg) = lo_alv->get_aggregations( ).\nlo_agg->add_aggregation( columnname = \'MENGE\'\n                         aggregation = if_salv_c_aggregation=>total ).\n\n" ソート順を指定\nDATA(lo_sorts) = lo_alv->get_sorts( ).\nlo_sorts->add_sort( columnname = \'MATNR\'\n                    sequence   = if_salv_c_sort=>sort_up ).',
          },
          { type: 'h', text: 'フィールドカタログ' },
          {
            type: 'p',
            text: 'CL_GUI_ALV_GRIDや関数モジュール方式では、フィールドカタログという構造で列の定義を明示的に作る必要があります。',
          },
          {
            type: 'table',
            caption: 'フィールドカタログの主な項目',
            headers: ['項目', '内容'],
            rows: [
              ['FIELDNAME', '内部テーブルの項目名'],
              ['SELTEXT_L / M / S', '列見出し（長・中・短）'],
              ['OUTPUTLEN', '表示幅'],
              ['NO_OUT', '初期表示しない（ユーザーが追加可能）'],
              ['DO_SUM', '合計を計算する'],
              ['HOTSPOT', 'クリック可能にする'],
              ['EDIT', '編集可能にする'],
              ['REF_TABLE / REF_FIELD', '参照するDDICの定義'],
            ],
          },
          {
            type: 'code',
            caption: 'フィールドカタログの生成',
            code: '" DDIC構造から自動生成する\nCALL FUNCTION \'LVC_FIELDCATALOG_MERGE\'\n  EXPORTING\n    i_structure_name = \'MARA\'\n  CHANGING\n    ct_fieldcat      = lt_fieldcat\n  EXCEPTIONS\n    OTHERS           = 1.\n\n" 個別に調整\nLOOP AT lt_fieldcat ASSIGNING FIELD-SYMBOL(<fs_fcat>).\n  CASE <fs_fcat>-fieldname.\n    WHEN \'MANDT\'.\n      <fs_fcat>-no_out = abap_true.\n    WHEN \'MENGE\'.\n      <fs_fcat>-do_sum = abap_true.\n  ENDCASE.\nENDLOOP.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'REF_TABLEを設定すると表示が整う',
            text: 'フィールドカタログでREF_TABLEとREF_FIELDにDDICの定義を指定すると、列見出し、桁数、小数点、変換ルーチン（前ゼロの除去など）が自動的に適用されます。品目コードが「0000012345」ではなく「12345」と表示されるのは、この変換ルーチンによるものです。手で見出しを書くより、DDICを参照するほうが保守も表示品質も向上します。',
          },
          { type: 'h', text: 'イベント処理' },
          {
            type: 'p',
            text: '行をダブルクリックしたときに詳細画面を開くといった処理は、イベントハンドラで実装します。',
          },
          {
            type: 'code',
            caption: 'SALVでのダブルクリック処理',
            code: 'CLASS lcl_handler DEFINITION.\n  PUBLIC SECTION.\n    METHODS on_double_click\n      FOR EVENT double_click OF cl_salv_events_table\n      IMPORTING row column.\nENDCLASS.\n\nCLASS lcl_handler IMPLEMENTATION.\n  METHOD on_double_click.\n    READ TABLE gt_data INTO DATA(ls_row) INDEX row.\n    IF sy-subrc = 0.\n      SET PARAMETER ID \'MAT\' FIELD ls_row-matnr.\n      CALL TRANSACTION \'MM03\' AND SKIP FIRST SCREEN.\n    ENDIF.\n  ENDMETHOD.\nENDCLASS.\n\n" ハンドラの登録\nDATA(lo_events) = lo_alv->get_event( ).\nDATA(lo_handler) = NEW lcl_handler( ).\nSET HANDLER lo_handler->on_double_click FOR lo_events.',
          },
        ],
      },

      'abap-data-dictionary': {
        summary:
          'データディクショナリの階層構造、テーブル定義とインデックス、外部キーとサーチヘルプ、そしてバッファリングを解説します。',
        keywords: ['データディクショナリ', 'SE11', 'ドメイン', 'データ要素', 'テーブル', 'インデックス', 'バッファリング'],
        body: [
          {
            type: 'p',
            text: 'データディクショナリ（DDIC）は、SAPシステム内のデータ定義を一元管理する仕組みです。テーブル、ビュー、データ型、検索ヘルプなどが、すべてここで定義されます。SE11でアクセスします。',
          },
          { type: 'h', text: '3階層のデータ型定義' },
          {
            type: 'p',
            text: 'DDICのデータ型は、3つの階層で構成されています。この分離が、SAPシステム全体の一貫性を支えています。',
          },
          {
            type: 'table',
            caption: 'ドメイン・データ要素・項目',
            headers: ['階層', '定義する内容', '例'],
            rows: [
              ['ドメイン', '技術的な属性：型、桁数、値範囲、変換ルーチン', 'MATNR18（CHAR 18、変換ルーチンMATN1）'],
              ['データ要素', '意味的な属性：項目ラベル、ドキュメント、検索ヘルプ', 'MATNR（ラベル「品目」）'],
              ['テーブル項目', '実際のテーブルの列', 'MARA-MATNR'],
            ],
          },
          {
            type: 'p',
            text: '同じドメインを複数のデータ要素が参照できます。たとえば「金額」というドメインを、「請求金額」「支払金額」といった異なる意味のデータ要素が共有します。技術的な仕様は同じでも、画面に表示されるラベルが異なる、という関係です。',
          },
          {
            type: 'note',
            variant: 'tip',
            title: '変換ルーチンの働き',
            text: 'ドメインに設定する変換ルーチンは、内部形式と外部形式の変換を行います。品目コードのMATN1は、内部では「000000000000012345」と18桁ゼロ埋めで保持しつつ、画面には「12345」と表示します。この仕組みがあるため、ユーザーは前ゼロを意識せずに入力できます。プログラムでテーブルを直接検索するとき、前ゼロを付けないと見つからないのは、内部形式で保存されているためです。',
          },
          { type: 'h', text: 'テーブルの定義' },
          {
            type: 'table',
            caption: 'テーブル定義の要素',
            headers: ['要素', '内容'],
            rows: [
              ['項目', '列の定義。データ要素を参照する'],
              ['主キー', 'レコードを一意に識別する項目の組み合わせ'],
              ['配送クラス', 'データの性質（マスタ、トランザクション、カスタマイジング）'],
              ['データブラウザ／テーブルビュー保守', '表示・保守の許可設定'],
              ['技術設定', 'データクラス、サイズカテゴリ、バッファリング'],
              ['インデックス', '検索を高速化するための索引'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'クライアント依存テーブルはMANDTを先頭に置く',
            text: 'クライアント（会社の論理的な区画）ごとにデータを分けるテーブルでは、主キーの先頭にMANDT項目を置きます。これによりOpen SQLがクライアント条件を自動的に付与します。カスタムテーブルを作る際、この規約を守らないと、他クライアントのデータが混ざるという深刻な問題が起きます。',
          },
          { type: 'h', text: 'インデックス' },
          {
            type: 'p',
            text: 'インデックスは、検索を高速化するための索引です。主キーには自動的に主インデックスが作られますが、主キー以外の項目で頻繁に検索する場合は、二次インデックスを作成します。',
          },
          {
            type: 'p',
            text: 'インデックスの効果は、WHERE句の項目がインデックスの先頭から連続して使われるかどうかで決まります。',
          },
          {
            type: 'code',
            caption: 'インデックスの効き方',
            code: '" インデックス: (WERKS, MATNR, LGORT)\n\n" 効く：先頭から使っている\nWHERE werks = \'1000\'\n\n" 効く：先頭から連続\nWHERE werks = \'1000\' AND matnr = \'MAT-001\'\n\n" 効きにくい：先頭が指定されていない\nWHERE matnr = \'MAT-001\'\n\n" 効きにくい：途中が飛んでいる\nWHERE werks = \'1000\' AND lgort = \'0001\'',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'インデックスは無条件に増やすものではない',
            text: 'インデックスは検索を速くする一方、レコードの挿入・更新・削除を遅くします。インデックス自体もディスクを消費します。頻繁に更新される大きなテーブルに多数のインデックスを作ると、全体の性能が悪化します。ST05（SQLトレース）で実際に遅いSQLを特定してから、必要最小限のインデックスを作るのが正しい順序です。',
          },
          { type: 'h', text: 'テーブルバッファリング' },
          {
            type: 'p',
            text: 'バッファリングは、テーブルの内容をアプリケーションサーバのメモリに保持し、データベースアクセスを減らす仕組みです。',
          },
          {
            type: 'table',
            caption: 'バッファリングの種類',
            headers: ['種類', '内容', '向いているテーブル'],
            rows: [
              ['完全バッファリング', 'テーブル全体をメモリに保持', '小さいカスタマイジングテーブル'],
              ['汎用領域バッファリング', '主キーの先頭N項目が一致する範囲を保持', 'クライアント別・プラント別の設定'],
              ['単一レコードバッファリング', 'アクセスしたレコードだけを保持', '大きいテーブルの一部を頻繁に読む場合'],
              ['バッファリングなし', 'DBに毎回アクセス', 'トランザクションデータ'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: '更新頻度の高いテーブルはバッファリングしない',
            text: 'バッファは、更新があると無効化され、再読み込みが発生します。頻繁に更新されるテーブルをバッファリングすると、無効化と再読み込みが繰り返され、かえって遅くなります。また、バッファは非同期で同期されるため、更新直後に読むと古いデータが返ることがあります。伝票データのようなトランザクションテーブルには使いません。',
          },
          { type: 'h', text: '外部キーとサーチヘルプ' },
          {
            type: 'p',
            text: '外部キーは、テーブル間の参照関係を定義します。入力値のチェックに使われ、存在しないコードの入力を防ぎます。',
          },
          {
            type: 'p',
            text: 'サーチヘルプ（検索ヘルプ）は、入力欄で候補一覧を表示する機能です。F4を押したときに現れる選択画面がこれにあたります。データ要素に割り当てるか、テーブル項目に個別に割り当てます。',
          },
          {
            type: 'table',
            caption: 'DDICの主なオブジェクト',
            headers: ['オブジェクト', '用途'],
            rows: [
              ['テーブル', 'データの格納'],
              ['ビュー', '複数テーブルの結合、または項目の絞り込み'],
              ['データ要素／ドメイン', '型の定義'],
              ['構造', 'テーブルではないレコード型の定義'],
              ['テーブル型', '内部テーブルの型定義'],
              ['サーチヘルプ', 'F4検索'],
              ['ロックオブジェクト', '排他制御。ENQUEUE／DEQUEUE関数が生成される'],
            ],
          },
        ],
      },

      'abap-debugging-error': {
        summary:
          'デバッガの使い方とブレークポイントの種類、ショートダンプの読み方、メッセージによるエラー通知の設計を解説します。',
        keywords: ['デバッグ', 'ブレークポイント', 'ウォッチポイント', 'ST22', 'ショートダンプ', 'MESSAGE', 'SLG1'],
        body: [
          {
            type: 'p',
            text: 'ABAP開発では、デバッガを使いこなせるかどうかで生産性が大きく変わります。標準プログラムのソースを読める環境では、SAPの内部処理を追いかけることもできます。',
          },
          { type: 'h', text: 'デバッガの起動方法' },
          {
            type: 'table',
            caption: 'デバッガを起動する',
            headers: ['方法', '操作'],
            rows: [
              ['ブレークポイント', 'ソースコードで停止位置を指定'],
              ['コマンド欄に /h', '次の処理からデバッガが起動する'],
              ['BREAK-POINT文', 'ソースに直接書く（本番へ移送しないこと）'],
              ['BREAK ユーザー名', '特定ユーザーのみ停止する'],
              ['SE38から実行', 'デバッグ実行を選択'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'BREAK-POINT文を移送しない',
            text: 'ソースコードに直接書いたBREAK-POINT文は、本番環境でも動作します。バッチ処理の途中で停止すると、ジョブが終わらずシステムに影響します。デバッグ用のコードは、移送前に必ず削除してください。BREAK ユーザー名 の形式なら他ユーザーには影響しませんが、それでも残すべきではありません。',
          },
          { type: 'h', text: 'ブレークポイントの種類' },
          {
            type: 'table',
            headers: ['種類', '内容'],
            rows: [
              ['セッションブレークポイント', 'ログオン中だけ有効。最も一般的'],
              ['外部ブレークポイント', 'RFCやWeb Dynproなど別プロセスの処理でも停止'],
              ['ステートメントブレークポイント', '特定のABAP命令（例：SELECT）で停止'],
              ['例外ブレークポイント', '特定の例外クラスが発生したときに停止'],
              ['サブルーチン／メソッドブレークポイント', '特定の処理単位の入口で停止'],
            ],
          },
          {
            type: 'p',
            text: 'ステートメントブレークポイントは、「どこかでMESSAGE文が発行されているが、場所が分からない」という調査に有効です。MESSAGE文で停止する設定にすれば、エラーメッセージの発生箇所を特定できます。',
          },
          { type: 'h', text: 'ウォッチポイント' },
          {
            type: 'p',
            text: 'ウォッチポイントは、変数の値が変わったときに停止する仕組みです。「この変数がいつの間にか変わっている」という調査に使います。',
          },
          {
            type: 'p',
            text: '条件を指定することもできます。「lv_countが100になったら停止」といった設定により、大量のループの中の特定の状況だけを捕まえられます。',
          },
          {
            type: 'note',
            variant: 'tip',
            title: '新デバッガの便利な機能',
            text: '新デバッガ（ABAP 7.0以降）では、複数のタブに変数、内部テーブル、コールスタックを同時表示できます。内部テーブルの内容をその場でフィルタしたり、Excelへ出力したりもできます。また、変数の値をデバッガ上で書き換えて処理を続行できるため、異常系のテストを実データなしで行えます。',
          },
          { type: 'h', text: 'ショートダンプの読み方' },
          {
            type: 'p',
            text: 'プログラムが異常終了すると、ショートダンプ（実行時エラー）が記録されます。ST22で確認します。',
          },
          {
            type: 'table',
            caption: 'ショートダンプで確認すべき項目',
            headers: ['項目', '内容'],
            rows: [
              ['実行時エラー名', 'エラーの種類。原因の分類'],
              ['エラー分析', '何が起きたかの説明'],
              ['ソースコード抜粋', 'エラーが発生した行とその周辺'],
              ['ユーザーと端末', '誰が実行したか'],
              ['アクティブ呼出', 'コールスタック。どこから呼ばれたか'],
              ['内部注記', 'システム内部の詳細情報'],
            ],
          },
          {
            type: 'table',
            caption: '頻出する実行時エラー',
            headers: ['エラー名', '原因'],
            rows: [
              ['CX_SY_CONVERSION_NO_NUMBER', '数値に変換できない文字列を計算に使った'],
              ['CX_SY_ZERODIVIDE', 'ゼロで除算した'],
              ['CX_SY_ITAB_LINE_NOT_FOUND', 'テーブル式で行が見つからなかった'],
              ['CX_SY_REF_IS_INITIAL', '初期値の参照変数でメソッドを呼んだ'],
              ['TIME_OUT', '実行時間が上限を超えた'],
              ['DBIF_RSQL_SQL_ERROR', 'SQLの実行に失敗した'],
              ['MESSAGE_TYPE_X', 'タイプXのメッセージが発行された'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'TIME_OUTはSQLを疑う',
            text: 'ダイアログ処理には実行時間の上限（既定600秒）があります。TIME_OUTが発生した場合、多くはループ内のSELECTや、インデックスの効かないSQLが原因です。ST05でSQLトレースを取得し、どのSQLに時間がかかっているかを特定します。長時間処理はバックグラウンドジョブに移すべきです。',
          },
          { type: 'h', text: 'メッセージによるエラー通知' },
          {
            type: 'p',
            text: 'MESSAGE文は、ユーザーにメッセージを表示する命令です。タイプによって挙動が大きく異なります。',
          },
          {
            type: 'table',
            caption: 'メッセージタイプ',
            headers: ['タイプ', '意味', '挙動'],
            rows: [
              ['S', '成功', 'ステータスバーに表示。処理は続行'],
              ['I', '情報', 'ダイアログ表示。OKで続行'],
              ['W', '警告', '入力画面へ戻る。修正すれば続行可'],
              ['E', 'エラー', '入力画面へ戻る。修正必須'],
              ['A', '中止', '処理を打ち切る'],
              ['X', '終了', 'ショートダンプを発生させる'],
            ],
          },
          {
            type: 'code',
            caption: 'メッセージの発行',
            code: '" メッセージクラスから発行\nMESSAGE e001(zmm) WITH lv_matnr.\n\n" 変数に受け取る（表示しない）\nMESSAGE e001(zmm) WITH lv_matnr INTO DATA(lv_msg).\n\n" 例外として送出\nMESSAGE e001(zmm) WITH lv_matnr\n  RAISING material_not_found.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'バックグラウンド処理でのメッセージに注意',
            text: 'タイプEやWのメッセージは、対話処理では画面に戻りますが、バックグラウンドジョブでは処理が異常終了します。バッチ処理を書くときは、sy-batchでバックグラウンド実行かを判定し、メッセージを表示する代わりにログへ記録する設計が必要です。アプリケーションログ（SLG1で参照）を使えば、実行結果を後から確認できます。',
          },
          { type: 'h', text: '性能分析のツール' },
          {
            type: 'table',
            headers: ['Tコード', '用途'],
            rows: [
              ['ST05', 'SQLトレース。実行されたSQLと所要時間を記録'],
              ['SAT（旧SE30）', 'ABAPランタイム分析。処理時間の内訳を可視化'],
              ['ST22', 'ショートダンプの一覧と詳細'],
              ['SM50 / SM66', 'プロセスの状態監視。長時間処理の特定'],
              ['SLG1', 'アプリケーションログの参照'],
              ['ST12', '統合トレース（SQLとABAPを同時に）'],
            ],
          },
        ],
      },
    },
  },

  en: {
    intro: [
      'ABAP (Advanced Business Application Programming) is the language SAP built to write business applications in. SAP standard functionality is itself written in ABAP, and custom development uses the same language.',
      'What characterises ABAP is that what business systems need is built into the language and runtime: database access through Open SQL, screen handling, printing, authorisation checks, translation, and transport of development objects — all without external libraries. That single-purpose design is what most distinguishes it from general-purpose languages.',
      'These eleven sections start with the development environment and data types, move through internal tables and Open SQL as the core of the language, then modularisation and object orientation, and finish with ALV reporting, the Data Dictionary and debugging.',
    ],
    sections: {
      'abap-overview': {
        summary:
          'What ABAP is for, its relationship to SAP standard code, how custom development is classified, and how the language has evolved.',
        keywords: ['ABAP', 'SAP development', 'add-on', 'enhancement', 'ABAP Cloud', 'clean core'],
        body: [
          {
            type: 'p',
            text: 'ABAP is the language SAP created to build its own business applications. It appeared in the 1980s and has been the implementation language of SAP systems ever since.',
          },
          {
            type: 'p',
            text: 'Notably, SAP standard functionality is written in it too, and the source is readable from SE38 or SE80. Being able to see what a transaction actually does internally is a considerable advantage when troubleshooting.',
          },
          { type: 'h', text: 'What being a business language means' },
          {
            type: 'table',
            caption: 'Business features built into the language',
            headers: ['Feature', 'What it provides'],
            rows: [
              ['Open SQL', 'Database access without regard to the database product'],
              ['Internal tables', 'In-memory tabular data as a basic language type'],
              ['Screens (Dynpro)', 'Screen definition and control as standard'],
              ['Authorisation checks', 'AUTHORITY-CHECK as a language statement'],
              ['Translation', 'Text elements managed per language'],
              ['Transport', 'Development objects recorded automatically for transport'],
              ['Locking', 'Lock objects for concurrency control'],
            ],
          },
          { type: 'h', text: 'Where custom development fits' },
          {
            type: 'table',
            caption: 'Classifying development (RICEFW)',
            headers: ['Letter', 'Meaning', 'Example'],
            rows: [
              ['R (Report)', 'Reports and lists', 'Custom analyses, statutory reports'],
              ['I (Interface)', 'Integration with other systems', 'Bank file import, EDI'],
              ['C (Conversion)', 'Data migration', 'Loading master data from a legacy system'],
              ['E (Enhancement)', 'Extending standard behaviour', 'Additional validation'],
              ['F (Form)', 'Printed forms', 'Invoice and purchase order layouts'],
              ['W (Workflow)', 'Approval flows', 'Purchase approval, expense claims'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Keep custom development to a minimum',
            text: 'Every add-on has to be retested and often adjusted at each upgrade. Establish that standard functionality genuinely cannot meet the requirement before writing code. The maxim about fitting the business to the standard exists because of that maintenance cost — and large add-on estates are among the commonest obstacles to an S/4HANA migration.',
          },
          { type: 'h', text: 'Extending without modifying' },
          {
            type: 'p',
            text: 'Modifying standard programs directly should be avoided: every patch and release risks overwriting or conflicting with the change. SAP therefore provides mechanisms for adding behaviour without touching the standard.',
          },
          {
            type: 'table',
            caption: 'Generations of enhancement technology',
            headers: ['Technique', 'Generation', 'Characteristic'],
            rows: [
              ['User exits', 'Old', 'Implement inside empty subroutines SAP provides'],
              ['Customer exits', 'Old', 'Activated in CMOD, per function group'],
              ['Classic BAdIs', 'Middle', 'Object oriented; multiple implementations possible'],
              ['Enhancement framework', 'Current', 'Hooks inserted at arbitrary points in source'],
              ['New BAdIs', 'Current', 'Integrated into enhancement spots'],
            ],
          },
          { type: 'h', text: 'How the language has changed' },
          {
            type: 'list',
            items: [
              'Procedural ABAP: the classic style of reports and subroutines',
              'ABAP Objects (from 1999): classes and interfaces',
              'ABAP 7.4 onwards: inline declarations, constructor expressions, table expressions',
              'ABAP Cloud: a restricted model using only released public APIs',
            ],
          },
          {
            type: 'note',
            variant: 'info',
            title: 'The clean core principle',
            text: 'S/4HANA emphasises keeping the core clean: extend only through released APIs and defined extension points, never by modifying standard code. That is what keeps upgrades manageable and makes moving to the cloud possible, and ABAP Cloud enforces it technically.',
          },
        ],
      },

      'abap-dev-environment': {
        summary:
          'SAP GUI and Eclipse-based development, packages and transports, and the naming rules that prevent collisions with SAP.',
        keywords: ['SE80', 'ADT', 'Eclipse', 'package', 'transport', 'namespace', 'SE38'],
        body: [
          {
            type: 'p',
            text: 'ABAP can be developed in the classic SAP GUI tools or in ADT, the Eclipse-based environment. Which you use depends on the system and on what you are building.',
          },
          { type: 'h', text: 'Two environments' },
          {
            type: 'table',
            caption: 'Comparison',
            headers: ['Aspect', 'SAP GUI (SE80)', 'ADT (Eclipse)'],
            rows: [
              ['Runs in', 'SAP GUI', 'An Eclipse plug-in'],
              ['Editor', 'The ABAP editor', 'A modern code editor'],
              ['Completion and refactoring', 'Limited', 'Extensive'],
              ['Dynpro screen development', 'Possible', 'Not possible'],
              ['CDS view development', 'Not possible', 'Required'],
              ['Working across systems', 'Awkward', 'Easy'],
              ['Targets', 'ECC, S/4HANA on premise', 'S/4HANA, BTP, Cloud'],
            ],
          },
          {
            type: 'p',
            text: 'Newer technologies — CDS views, RAP, ABAP Cloud — exist only in ADT, while classic Dynpro screens exist only in the GUI, so most teams use both.',
          },
          { type: 'h', text: 'Key transactions' },
          {
            type: 'table',
            headers: ['Code', 'Purpose'],
            rows: [
              ['SE38', 'ABAP editor'],
              ['SE80', 'Object navigator'],
              ['SE11', 'Data Dictionary'],
              ['SE37', 'Function builder'],
              ['SE24', 'Class builder'],
              ['SE41', 'Menu painter'],
              ['SE51', 'Screen painter'],
              ['SE93', 'Transaction code maintenance'],
              ['SE09 / SE10', 'Transport organiser'],
              ['SE16N', 'Table data display'],
            ],
          },
          { type: 'h', text: 'Packages' },
          {
            type: 'p',
            text: 'Every development object belongs to a package. A package is not merely a folder: it links to a transport layer, which determines where its objects are transported.',
          },
          {
            type: 'table',
            headers: ['Package', 'Meaning'],
            rows: [
              ['$TMP', 'Local object; never transported; for scratch work'],
              ['Z* / Y*', 'Customer packages; transportable'],
              ['Anything else', 'SAP standard packages'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Local objects cannot be transported',
            text: 'A program created in $TMP exists only in the development system. Moving it to production means reassigning the package first. Use $TMP for experiments, but create real development in the right package from the start.',
          },
          { type: 'h', text: 'Transports' },
          {
            type: 'table',
            caption: 'Kinds of transport request',
            headers: ['Kind', 'Content'],
            rows: [
              ['Workbench request', 'Programs, table definitions, development objects'],
              ['Customising request', 'IMG configuration; client dependent'],
            ],
          },
          {
            type: 'p',
            text: 'Requests contain tasks, one per developer. Each developer releases their task, and only when all tasks are released can the request be released.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Mind the dependencies',
            text: 'A program that uses a table definition fails if the table has not been transported first. When objects are split across requests, release and import order have to be managed. Keeping related objects in one request avoids most of this.',
          },
          { type: 'h', text: 'Namespaces' },
          {
            type: 'p',
            text: 'Customer objects begin with Z or Y. SAP never ships objects with those prefixes, so following the convention guarantees no collision at upgrade.',
          },
          {
            type: 'p',
            text: 'Larger organisations usually add a second level — ZFI_, ZMM_ by module, or ZR_ for reports and ZI_ for interfaces.',
          },
        ],
      },

      'abap-data-types': {
        summary:
          'Built-in types, declaring variables, structures and internal tables, and inline declarations in modern ABAP.',
        keywords: ['data types', 'DATA', 'TYPES', 'structure', 'packed number', 'inline declaration'],
        body: [
          {
            type: 'p',
            text: 'ABAP has the types a business system needs. That amounts and quantities have a type designed for exact decimal arithmetic says a lot about the language.',
          },
          { type: 'h', text: 'Built-in types' },
          {
            type: 'table',
            caption: 'The main built-in types',
            headers: ['Type', 'Content', 'Default length', 'Initial value'],
            rows: [
              ['C', 'Fixed-length text', '1', 'Space'],
              ['N', 'Numeric text, zero padded', '1', "'0'"],
              ['D', 'Date, YYYYMMDD', '8', "'00000000'"],
              ['T', 'Time, HHMMSS', '6', "'000000'"],
              ['I', 'Integer, 4 bytes', '—', '0'],
              ['INT8', 'Integer, 8 bytes', '—', '0'],
              ['P', 'Packed decimal', '8', '0'],
              ['F', 'Floating point', '8', '0'],
              ['STRING', 'Variable-length text', 'Variable', 'Empty'],
              ['XSTRING', 'Variable-length bytes', 'Variable', 'Empty'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Use P for money',
            text: 'Floating point introduces rounding error, so amounts and quantities use packed decimals, which represent decimal values exactly. Every currency field in the standard tables is defined that way.',
          },
          { type: 'h', text: 'N compared with C' },
          {
            type: 'code',
            caption: 'How they differ',
            code: 'DATA lv_num TYPE n LENGTH 5.\nDATA lv_chr TYPE c LENGTH 5.\n\nlv_num = 42.       " gives \'00042\' — zero padded\nlv_chr = 42.       " gives \'42   \' — space padded',
          },
          {
            type: 'p',
            text: 'Document numbers and material codes in SAP are usually N fields, which is why they display with leading zeros.',
          },
          { type: 'h', text: 'Declaring variables' },
          {
            type: 'code',
            caption: 'Declarations',
            code: '" Built-in type directly\nDATA lv_name TYPE c LENGTH 30.\nDATA lv_amount TYPE p LENGTH 8 DECIMALS 2.\n\n" Referencing a Data Dictionary type (preferred)\nDATA lv_matnr TYPE matnr.\n\n" Referencing a table field\nDATA lv_bukrs TYPE bkpf-bukrs.\n\n" With an initial value\nDATA lv_count TYPE i VALUE 10.\n\n" Constant\nCONSTANTS lc_status TYPE c LENGTH 1 VALUE \'A\'.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Reference data elements',
            text: 'Referring to a Data Dictionary data element rather than writing a built-in type keeps field lengths in step with SAP definitions and follows any change to them. Write TYPE matnr for a material and TYPE bukrs for a company code.',
          },
          { type: 'h', text: 'Structures' },
          {
            type: 'code',
            caption: 'Defining and using a structure',
            code: 'TYPES: BEGIN OF ty_item,\n         matnr TYPE matnr,\n         maktx TYPE maktx,\n         menge TYPE i,\n       END OF ty_item.\n\nDATA ls_item TYPE ty_item.\nls_item-matnr = \'MAT-001\'.\n\n" A Dictionary structure\nDATA ls_mara TYPE mara.',
          },
          { type: 'h', text: 'Internal table types' },
          {
            type: 'code',
            caption: 'Declaring internal tables',
            code: 'DATA lt_items TYPE STANDARD TABLE OF ty_item.\nDATA lt_mara  TYPE STANDARD TABLE OF mara.\n\nDATA lt_sorted TYPE SORTED TABLE OF ty_item\n               WITH UNIQUE KEY matnr.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Do not use WITH HEADER LINE',
            text: 'Header lines give the table and its work area the same name, which is confusing, and they are not allowed inside classes. Declare a work area explicitly, or use field symbols and inline declarations.',
          },
          { type: 'h', text: 'Inline declarations' },
          {
            type: 'code',
            caption: 'From ABAP 7.4',
            code: 'SELECT SINGLE * FROM mara INTO @DATA(ls_mara) WHERE matnr = @lv_matnr.\n\nLOOP AT lt_items INTO DATA(ls_item).\n  WRITE: / ls_item-matnr.\nENDLOOP.\n\nDATA(lt_numbers) = VALUE int_tab( ( 1 ) ( 2 ) ( 3 ) ).',
          },
          {
            type: 'p',
            text: 'Declaring at the point of use keeps declarations near the logic that needs them and narrows variable scope, which makes code easier to read.',
          },
        ],
      },

      'abap-control-flow': {
        summary:
          'Conditionals and loops, the CHECK statement and its context-dependent behaviour, and the system fields that go with them.',
        keywords: ['IF', 'CASE', 'DO', 'WHILE', 'LOOP', 'CHECK', 'sy-subrc'],
        body: [
          {
            type: 'p',
            text: 'ABAP control flow resembles other languages, with a few statements of its own — CHECK and EXIT in particular — whose behaviour is worth knowing precisely.',
          },
          { type: 'h', text: 'IF' },
          {
            type: 'code',
            caption: 'Conditionals',
            code: 'IF lv_amount > 10000.\n  lv_discount = 10.\nELSEIF lv_amount > 5000.\n  lv_discount = 5.\nELSE.\n  lv_discount = 0.\nENDIF.\n\nIF lv_matnr IS INITIAL.\n  " not set\nENDIF.\n\nIF lt_items IS NOT INITIAL.\n  " has rows\nENDIF.',
          },
          {
            type: 'table',
            caption: 'Comparison operators',
            headers: ['Operator', 'Alternative', 'Meaning'],
            rows: [
              ['=', 'EQ', 'Equal'],
              ['<>', 'NE', 'Not equal'],
              ['<', 'LT', 'Less than'],
              ['>', 'GT', 'Greater than'],
              ['BETWEEN a AND b', '—', 'Within a range'],
              ['IS INITIAL', '—', 'Equal to the type initial value'],
              ['IN', '—', 'Matches a ranges table'],
              ['CS', '—', 'Contains string'],
              ['CP', '—', 'Contains pattern'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'IS INITIAL is not IS NULL',
            text: 'ABAP variables have no null. IS INITIAL tests whether a value equals the type initial value — zero for numbers, blank for characters. Zero and "not set" are therefore indistinguishable, so where the difference matters, carry a separate flag.',
          },
          { type: 'h', text: 'CASE' },
          {
            type: 'code',
            caption: 'Branching on one value',
            code: 'CASE lv_status.\n  WHEN \'A\'.       lv_text = \'Received\'.\n  WHEN \'B\' OR \'C\'. lv_text = \'In progress\'.\n  WHEN \'Z\'.       lv_text = \'Complete\'.\n  WHEN OTHERS.    lv_text = \'Unknown\'.\nENDCASE.',
          },
          { type: 'h', text: 'DO and WHILE' },
          {
            type: 'code',
            caption: 'Counted and conditional loops',
            code: 'DO 10 TIMES.\n  WRITE: / sy-index.\nENDDO.\n\nDO.\n  IF lv_count > 100. EXIT. ENDIF.\n  lv_count = lv_count + 1.\nENDDO.\n\nWHILE lv_flag = abap_true.\n  " ...\nENDWHILE.',
          },
          { type: 'h', text: 'LOOP over internal tables' },
          {
            type: 'code',
            caption: 'Looping',
            code: 'LOOP AT lt_items INTO DATA(ls_item).\n  WRITE: / ls_item-matnr.\nENDLOOP.\n\nLOOP AT lt_items ASSIGNING FIELD-SYMBOL(<fs_item>).\n  <fs_item>-menge = <fs_item>-menge * 2.\nENDLOOP.\n\nLOOP AT lt_items INTO ls_item WHERE menge > 100.\nENDLOOP.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'ASSIGNING versus INTO',
            text: 'INTO copies the row into a work area. ASSIGNING points a field symbol at the row itself — no copy, so it is faster, and it lets you modify the table row in place. For large tables or in-place updates, use ASSIGNING.',
          },
          { type: 'h', text: 'Loop control' },
          {
            type: 'table',
            headers: ['Statement', 'Behaviour'],
            rows: [
              ['EXIT', 'Leave the loop entirely'],
              ['CONTINUE', 'Skip to the next iteration'],
              ['CHECK cond', 'If the condition is false, behave like CONTINUE'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'CHECK behaves differently outside a loop',
            text: 'Inside a loop CHECK acts like CONTINUE, but in a method or subroutine outside a loop it terminates that processing block, and in an event block it abandons the event. That context dependence hurts readability, so an explicit IF is often the safer choice.',
          },
          { type: 'h', text: 'System fields' },
          {
            type: 'table',
            headers: ['Field', 'Content'],
            rows: [
              ['sy-subrc', 'Return code of the preceding statement; 0 means success'],
              ['sy-index', 'Iteration counter in DO and WHILE'],
              ['sy-tabix', 'Row index in LOOP'],
              ['sy-datum / sy-uzeit', 'Current date and time'],
              ['sy-uname', 'Logged-on user'],
              ['sy-mandt', 'Client'],
              ['sy-langu', 'Logon language'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Test sy-subrc immediately',
            text: 'Most statements update sy-subrc, so anything between the statement and the test overwrites it. Always evaluate it on the very next line.',
          },
        ],
      },

      'abap-internal-tables': {
        summary:
          'The three internal table kinds and their keys, statements for reading and changing rows, and the performance implications.',
        keywords: ['internal table', 'STANDARD TABLE', 'SORTED TABLE', 'HASHED TABLE', 'READ TABLE', 'field symbol'],
        body: [
          {
            type: 'p',
            text: 'Internal tables are the central data structure in ABAP. Most of what an ABAP program does is manipulate them.',
          },
          { type: 'h', text: 'Three kinds' },
          {
            type: 'table',
            caption: 'Internal table kinds',
            headers: ['Kind', 'Key', 'Search', 'Duplicates', 'Use'],
            rows: [
              ['STANDARD', 'Non-unique', 'Linear', 'Allowed', 'Sequential processing, index access'],
              ['SORTED', 'Unique or non-unique', 'Binary', 'Configurable', 'Frequent key lookups, always sorted'],
              ['HASHED', 'Unique required', 'Hash', 'Not allowed', 'Fast lookup by full key'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Choosing a kind',
            text: 'For a few rows processed in order, standard is fine. For thousands of rows looked up repeatedly by key, use sorted or hashed. Hashed suits single-row access by full key; sorted suits partial keys and ranges. Repeated linear searching of a standard table is a classic performance problem.',
          },
          { type: 'h', text: 'Adding rows' },
          {
            type: 'code',
            caption: 'Insertion',
            code: 'APPEND ls_item TO lt_items.\nINSERT ls_item INTO TABLE lt_sorted.\nAPPEND LINES OF lt_source TO lt_target.\n\nDATA(lt_items) = VALUE ty_items(\n  ( matnr = \'MAT-001\' menge = 10 )\n  ( matnr = \'MAT-002\' menge = 20 ) ).',
          },
          {
            type: 'p',
            text: 'APPEND is not available on sorted or hashed tables, because position is determined by the key rather than by insertion order.',
          },
          { type: 'h', text: 'Reading rows' },
          {
            type: 'code',
            caption: 'Reading',
            code: 'READ TABLE lt_items INTO ls_item WITH KEY matnr = \'MAT-001\'.\nIF sy-subrc = 0.\nENDIF.\n\nREAD TABLE lt_items ASSIGNING FIELD-SYMBOL(<fs>) WITH KEY matnr = \'MAT-001\'.\n\nREAD TABLE lt_items TRANSPORTING NO FIELDS WITH KEY matnr = \'MAT-001\'.\n\nDATA(ls_found) = lt_items[ matnr = \'MAT-001\' ].',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'BINARY SEARCH requires a prior SORT',
            text: 'Adding BINARY SEARCH to a read on a standard table makes it a binary search — but only correct if the table was sorted by that key first. On a SORTED table it is unnecessary; key access is already binary.',
          },
          { type: 'h', text: 'Changing and deleting' },
          {
            type: 'code',
            caption: 'Modification',
            code: 'MODIFY lt_items FROM ls_item TRANSPORTING menge WHERE matnr = \'MAT-001\'.\n\nDELETE lt_items WHERE menge = 0.\n\nSORT lt_items BY matnr.\nDELETE ADJACENT DUPLICATES FROM lt_items COMPARING matnr.\n\nCLEAR lt_items.\nFREE  lt_items.',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'ADJACENT DUPLICATES only compares neighbours',
            text: 'It removes duplicates that are next to each other, so without sorting by the same key first, duplicates survive. Forgetting the SORT is the commonest bug around this statement.',
          },
          { type: 'h', text: 'Aggregating' },
          {
            type: 'code',
            caption: 'Control level processing',
            code: 'SORT lt_items BY matnr.\nLOOP AT lt_items INTO ls_item.\n  AT NEW matnr.\n    lv_subtotal = 0.\n  ENDAT.\n\n  lv_subtotal = lv_subtotal + ls_item-menge.\n\n  AT END OF matnr.\n    WRITE: / ls_item-matnr, lv_subtotal.\n  ENDAT.\nENDLOOP.\n\nDATA(lv_total) = REDUCE i( INIT s = 0\n                           FOR ls IN lt_items\n                           NEXT s = s + ls-menge ).',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Watch for nested loops',
            text: 'A READ TABLE inside a loop degrades sharply as volumes grow — ten thousand rows searched ten thousand times is a hundred million comparisons. Use a hashed table, or sort and use a binary search. Most ABAP performance problems have this shape.',
          },
        ],
      },

      'abap-open-sql': {
        summary:
          'How Open SQL abstracts the database, the rules that keep queries fast, FOR ALL ENTRIES pitfalls, and code pushdown with CDS views.',
        keywords: ['Open SQL', 'SELECT', 'FOR ALL ENTRIES', 'JOIN', 'CDS view', 'code pushdown'],
        body: [
          {
            type: 'p',
            text: 'Open SQL is how ABAP reaches the database. It hides differences between database products, so the same code runs on Oracle, SQL Server or HANA.',
          },
          { type: 'h', text: 'What it provides' },
          {
            type: 'list',
            items: [
              'Database independence, so SQL dialects do not matter',
              'Automatic client handling in the WHERE clause',
              'Automatic use of table buffers',
              'Table-level authorisation checks',
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'The client condition is added for you',
            text: 'Most SAP tables begin with MANDT. Open SQL adds the current client to the WHERE clause automatically, so data from other clients is never read by accident. CLIENT SPECIFIED overrides this when you genuinely need to.',
          },
          { type: 'h', text: 'SELECT' },
          {
            type: 'code',
            caption: 'Reading data',
            code: 'SELECT SINGLE matnr, mtart, meins\n  FROM mara INTO @DATA(ls_mara)\n  WHERE matnr = @lv_matnr.\n\nSELECT matnr, mtart, meins\n  FROM mara INTO TABLE @DATA(lt_mara)\n  WHERE mtart = \'FERT\'\n  ORDER BY matnr.',
          },
          { type: 'h', text: 'Five rules for performance' },
          {
            type: 'table',
            headers: ['Rule', 'Detail'],
            rows: [
              ['Select only the fields needed', 'Name fields rather than using SELECT *'],
              ['Select only the rows needed', 'Filter in the WHERE clause, not afterwards'],
              ['Never SELECT inside a loop', 'One database round trip per row'],
              ['Respect indexes', 'WHERE fields should match the index from its first field'],
              ['Aggregate in the database', 'Use SUM and GROUP BY rather than looping'],
            ],
          },
          {
            type: 'code',
            caption: 'The anti-pattern and its fix',
            code: '" Bad: a SELECT per row\nLOOP AT lt_items INTO ls_item.\n  SELECT SINGLE maktx FROM makt INTO ls_item-maktx\n    WHERE matnr = ls_item-matnr AND spras = sy-langu.\nENDLOOP.\n\n" Better: fetch once, then join in memory\nIF lt_items IS NOT INITIAL.\n  SELECT matnr, maktx FROM makt\n    INTO TABLE @DATA(lt_makt)\n    FOR ALL ENTRIES IN @lt_items\n    WHERE matnr = @lt_items-matnr AND spras = @sy-langu.\n\n  SORT lt_makt BY matnr.\n\n  LOOP AT lt_items ASSIGNING FIELD-SYMBOL(<fs>).\n    READ TABLE lt_makt INTO DATA(ls_makt)\n         WITH KEY matnr = <fs>-matnr BINARY SEARCH.\n    IF sy-subrc = 0.\n      <fs>-maktx = ls_makt-maktx.\n    ENDIF.\n  ENDLOOP.\nENDIF.',
          },
          { type: 'h', text: 'FOR ALL ENTRIES' },
          {
            type: 'table',
            caption: 'Things to know',
            headers: ['Behaviour', 'Detail'],
            rows: [
              ['An empty driver table selects everything', 'The WHERE condition disappears'],
              ['Duplicates are removed', 'Row counts may not match expectations'],
              ['It is split into several statements', 'Many round trips for large driver tables'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Always check the driver table is not empty',
            text: 'With an empty driver table the condition is dropped and the whole table is returned. Against a table with millions of rows that can bring a system down. Guard every FOR ALL ENTRIES with IF ... IS NOT INITIAL.',
          },
          { type: 'h', text: 'Joins' },
          {
            type: 'code',
            caption: 'An inner join',
            code: 'SELECT a~matnr, a~mtart, b~maktx\n  FROM mara AS a\n  INNER JOIN makt AS b ON a~matnr = b~matnr\n  INTO TABLE @DATA(lt_result)\n  WHERE a~mtart = \'FERT\' AND b~spras = @sy-langu.',
          },
          { type: 'h', text: 'Writing data' },
          {
            type: 'note',
            variant: 'warn',
            title: 'Never write directly to SAP standard tables',
            text: 'Standard processing updates several tables consistently; changing one directly produces inconsistent data. Use BAPIs or transactions instead. Direct writes are acceptable only to custom Z tables you own.',
          },
          { type: 'h', text: 'Code pushdown and CDS views' },
          {
            type: 'p',
            text: 'With HANA, pushing work into the database matters. Rather than pulling large volumes to the application server and processing there, joins and aggregations run in HANA and only the result is returned.',
          },
          {
            type: 'code',
            caption: 'A CDS view',
            code: '@AbapCatalog.sqlViewName: \'ZVMATSUM\'\n@AccessControl.authorizationCheck: #CHECK\ndefine view Z_Material_Summary as\n  select from mara as m\n    inner join makt as t on m.matnr = t.matnr\n{\n  key m.matnr as Material,\n      m.mtart as MaterialType,\n      t.maktx as Description\n}\nwhere t.spras = $session.system_language',
          },
        ],
      },

      'abap-modularization': {
        summary:
          'Subroutines, function modules and methods, how parameters are passed, and where BAPIs fit.',
        keywords: ['modularisation', 'FORM', 'function module', 'SE37', 'BAPI', 'RFC', 'method'],
        body: [
          {
            type: 'p',
            text: 'ABAP offers several ways to break processing into reusable units, reflecting its long history. They suit different purposes.',
          },
          { type: 'h', text: 'Three mechanisms' },
          {
            type: 'table',
            headers: ['Mechanism', 'Defined in', 'Reuse scope', 'Recommended?'],
            rows: [
              ['Subroutine (FORM)', 'A program', 'Within the program', 'No — legacy'],
              ['Function module', 'A function group', 'System-wide', 'Depends on purpose'],
              ['Method', 'A class', 'System-wide', 'Yes'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Do not write new FORMs',
            text: 'Subroutines type-check loosely, encourage reliance on global data, and cannot be called from object-oriented code. SAP has deprecated them. You will need to read them in existing programs, but write methods instead.',
          },
          { type: 'h', text: 'Function modules' },
          {
            type: 'table',
            caption: 'Parameter kinds',
            headers: ['Kind', 'Direction', 'Note'],
            rows: [
              ['IMPORT', 'In', 'Values the function receives'],
              ['EXPORT', 'Out', 'Values the function returns'],
              ['CHANGING', 'In and out', 'The caller variable is modified'],
              ['TABLES', 'In and out', 'Internal tables, an older style'],
              ['EXCEPTIONS', 'Error', 'Surfaced to the caller as sy-subrc'],
            ],
          },
          {
            type: 'code',
            caption: 'Calling a function module',
            code: 'CALL FUNCTION \'Z_CALCULATE_DISCOUNT\'\n  EXPORTING\n    iv_amount     = lv_amount\n  IMPORTING\n    ev_discount   = lv_discount\n  EXCEPTIONS\n    invalid_input = 1\n    OTHERS        = 2.\n\nIF sy-subrc <> 0.\nENDIF.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'The direction words reverse',
            text: 'At the call, EXPORTING sends values in and IMPORTING receives them back. From inside the function it is the opposite. Read them from the caller point of view and the confusion goes away.',
          },
          { type: 'h', text: 'RFC-enabled functions and BAPIs' },
          {
            type: 'table',
            caption: 'Common BAPIs',
            headers: ['BAPI', 'Purpose'],
            rows: [
              ['BAPI_MATERIAL_SAVEDATA', 'Create or change a material'],
              ['BAPI_SALESORDER_CREATEFROMDAT2', 'Create a sales order'],
              ['BAPI_PO_CREATE1', 'Create a purchase order'],
              ['BAPI_ACC_DOCUMENT_POST', 'Post an accounting document'],
              ['BAPI_GOODSMVT_CREATE', 'Post a goods movement'],
              ['BAPI_TRANSACTION_COMMIT', 'Commit; required after any BAPI'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'BAPIs need an explicit commit',
            text: 'A BAPI does not commit. Without BAPI_TRANSACTION_COMMIT nothing is saved; on error call BAPI_TRANSACTION_ROLLBACK. Always inspect the RETURN table too — entries of type E or A are errors.',
          },
          { type: 'h', text: 'Methods' },
          {
            type: 'code',
            caption: 'A method with RETURNING',
            code: 'CLASS lcl_calculator DEFINITION.\n  PUBLIC SECTION.\n    METHODS calculate_total\n      IMPORTING it_items        TYPE ty_items\n      RETURNING VALUE(rv_total) TYPE i.\nENDCLASS.\n\nDATA(lo_calc) = NEW lcl_calculator( ).\nDATA(lv_total) = lo_calc->calculate_total( lt_items ).',
          },
          {
            type: 'p',
            text: 'A method with a RETURNING parameter can be used inside an expression, which removes temporary variables. Only one is allowed, and that constraint encourages methods that do one thing.',
          },
        ],
      },

      'abap-oop': {
        summary:
          'Defining classes, instance versus static members, inheritance and interfaces, and exception classes.',
        keywords: ['ABAP Objects', 'CLASS', 'interface', 'inheritance', 'SE24', 'exception class', 'TRY CATCH'],
        body: [
          {
            type: 'p',
            text: 'ABAP Objects arrived in 1999 and is now the standard way to write ABAP.',
          },
          { type: 'h', text: 'Class structure' },
          {
            type: 'code',
            caption: 'Definition and implementation',
            code: 'CLASS lcl_order DEFINITION.\n  PUBLIC SECTION.\n    METHODS constructor IMPORTING iv_order_id TYPE vbeln.\n    METHODS get_total RETURNING VALUE(rv_total) TYPE p LENGTH 8 DECIMALS 2.\n    CLASS-METHODS create_from_db\n      IMPORTING iv_order_id     TYPE vbeln\n      RETURNING VALUE(ro_order) TYPE REF TO lcl_order.\n\n  PRIVATE SECTION.\n    DATA mv_order_id TYPE vbeln.\n    DATA mt_items    TYPE ty_items.\nENDCLASS.\n\nCLASS lcl_order IMPLEMENTATION.\n  METHOD constructor.\n    mv_order_id = iv_order_id.\n  ENDMETHOD.\nENDCLASS.',
          },
          {
            type: 'table',
            caption: 'Visibility',
            headers: ['Section', 'Accessible from'],
            rows: [
              ['PUBLIC', 'Anywhere'],
              ['PROTECTED', 'The class and its subclasses'],
              ['PRIVATE', 'The class only'],
            ],
          },
          { type: 'h', text: 'Instance and static' },
          {
            type: 'table',
            headers: ['Kind', 'Keyword', 'Access'],
            rows: [
              ['Instance attribute', 'DATA', 'obj->attr'],
              ['Static attribute', 'CLASS-DATA', 'class=>attr'],
              ['Instance method', 'METHODS', 'obj->method( )'],
              ['Static method', 'CLASS-METHODS', 'class=>method( )'],
            ],
          },
          {
            type: 'code',
            caption: 'Creating objects',
            code: 'DATA(lo_order) = NEW lcl_order( iv_order_id = \'0000012345\' ).\nDATA(lv_total) = lo_order->get_total( ).\nDATA(lo_new)   = lcl_order=>create_from_db( \'0000012345\' ).',
          },
          { type: 'h', text: 'Inheritance' },
          {
            type: 'code',
            caption: 'Redefining a method',
            code: 'CLASS lcl_rush_order DEFINITION INHERITING FROM lcl_order.\n  PUBLIC SECTION.\n    METHODS get_total REDEFINITION.\nENDCLASS.\n\nCLASS lcl_rush_order IMPLEMENTATION.\n  METHOD get_total.\n    rv_total = super->get_total( ) * \'1.2\'.\n  ENDMETHOD.\nENDCLASS.',
          },
          {
            type: 'p',
            text: 'ABAP supports single inheritance only. To combine behaviours, use interfaces.',
          },
          { type: 'h', text: 'Interfaces' },
          {
            type: 'code',
            caption: 'Defining and implementing',
            code: 'INTERFACE lif_printable.\n  METHODS print.\nENDINTERFACE.\n\nCLASS lcl_invoice DEFINITION.\n  PUBLIC SECTION.\n    INTERFACES lif_printable.\nENDCLASS.\n\nCLASS lcl_invoice IMPLEMENTATION.\n  METHOD lif_printable~print.\n    WRITE: / \'Printing the invoice\'.\n  ENDMETHOD.\nENDCLASS.\n\nDATA lo_printable TYPE REF TO lif_printable.\nlo_printable = NEW lcl_invoice( ).\nlo_printable->print( ).',
          },
          {
            type: 'p',
            text: 'Interfaces let unrelated classes be treated uniformly — invoices and delivery notes both handled as printable things. They also make substituting a mock object for testing straightforward.',
          },
          { type: 'h', text: 'Exception classes' },
          {
            type: 'code',
            caption: 'Raising and catching',
            code: 'IF sy-subrc <> 0.\n  RAISE EXCEPTION TYPE zcx_customer_not_found\n    EXPORTING customer_id = iv_kunnr.\nENDIF.\n\nTRY.\n    DATA(ls_customer) = lo_service->get_customer( \'0000001000\' ).\n\n  CATCH zcx_customer_not_found INTO DATA(lx_notfound).\n    MESSAGE lx_notfound->get_text( ) TYPE \'E\'.\n\n  CATCH cx_root INTO DATA(lx_root).\n    MESSAGE lx_root->get_text( ) TYPE \'E\'.\nENDTRY.',
          },
          {
            type: 'table',
            caption: 'Exception base classes',
            headers: ['Class', 'Behaviour'],
            rows: [
              ['CX_STATIC_CHECK', 'Must be declared and handled'],
              ['CX_DYNAMIC_CHECK', 'Checked at runtime; no declaration needed'],
              ['CX_NO_CHECK', 'Neither declared nor caught; for fatal errors'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Do not catch only cx_root',
            text: 'Catching everything at the root conflates expected errors with unexpected bugs. Catch specific exceptions first and use cx_root as a last resort — and never swallow an exception silently, which makes diagnosis impossible.',
          },
        ],
      },

      'abap-alv': {
        summary:
          'What ALV gives you for free, the three implementation styles, and how to build and adjust a field catalog.',
        keywords: ['ALV', 'SALV', 'CL_GUI_ALV_GRID', 'field catalog', 'report'],
        body: [
          {
            type: 'p',
            text: 'ALV (ABAP List Viewer) displays internal tables as tables. Any reporting in ABAP will use it.',
          },
          { type: 'h', text: 'What you get without writing it' },
          {
            type: 'list',
            items: [
              'Column sorting, filtering, rearranging and resizing',
              'Automatic subtotals and totals',
              'Export to Excel, CSV and PDF',
              'Saved display layouts (variants)',
              'Row selection and double-click navigation',
              'Print layout',
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Do not hand-build tables',
            text: 'Programs that assemble output with WRITE statements do more work for less. ALV takes a few dozen lines and gives users sorting and Excel export themselves, which also heads off the follow-up requests for "the same report but sorted differently".',
          },
          { type: 'h', text: 'Three implementations' },
          {
            type: 'table',
            headers: ['Approach', 'Entry point', 'Character', 'Recommended?'],
            rows: [
              ['Function module', 'REUSE_ALV_GRID_DISPLAY', 'Classic, verbose', 'Legacy'],
              ['CL_GUI_ALV_GRID', 'Control based', 'Fine control, more code', 'For complex needs'],
              ['CL_SALV_TABLE', 'SALV', 'Concise, covers most needs', 'Yes'],
            ],
          },
          { type: 'h', text: 'A minimal SALV report' },
          {
            type: 'code',
            caption: 'Displaying a table',
            code: 'DATA lo_alv TYPE REF TO cl_salv_table.\n\nSELECT matnr, mtart, meins FROM mara\n  INTO TABLE @DATA(lt_mara) UP TO 100 ROWS.\n\nTRY.\n    cl_salv_table=>factory(\n      IMPORTING r_salv_table = lo_alv\n      CHANGING  t_table      = lt_mara ).\n\n    lo_alv->get_functions( )->set_all( abap_true ).\n    lo_alv->get_columns( )->set_optimize( abap_true ).\n    lo_alv->display( ).\n\n  CATCH cx_salv_msg INTO DATA(lx_msg).\n    MESSAGE lx_msg->get_text( ) TYPE \'E\'.\nENDTRY.',
          },
          { type: 'h', text: 'Adjusting the display' },
          {
            type: 'code',
            caption: 'Columns, totals and sorting',
            code: 'DATA(lo_columns) = lo_alv->get_columns( ).\nlo_columns->get_column( \'MANDT\' )->set_visible( abap_false ).\n\nDATA(lo_agg) = lo_alv->get_aggregations( ).\nlo_agg->add_aggregation( columnname  = \'MENGE\'\n                         aggregation = if_salv_c_aggregation=>total ).\n\nDATA(lo_sorts) = lo_alv->get_sorts( ).\nlo_sorts->add_sort( columnname = \'MATNR\'\n                    sequence   = if_salv_c_sort=>sort_up ).',
          },
          { type: 'h', text: 'Field catalogs' },
          {
            type: 'table',
            caption: 'Key field catalog fields',
            headers: ['Field', 'Meaning'],
            rows: [
              ['FIELDNAME', 'The internal table field'],
              ['SELTEXT_L / M / S', 'Column headings'],
              ['OUTPUTLEN', 'Display width'],
              ['NO_OUT', 'Hidden initially but available to the user'],
              ['DO_SUM', 'Total this column'],
              ['HOTSPOT', 'Make it clickable'],
              ['REF_TABLE / REF_FIELD', 'The Dictionary definition to inherit from'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Set REF_TABLE and the display looks right',
            text: 'Pointing a field catalog entry at a Dictionary field inherits the heading, length, decimals and conversion routine. That is what turns 0000012345 into 12345 on screen. Referencing the Dictionary beats typing headings by hand, for both maintenance and appearance.',
          },
        ],
      },

      'abap-data-dictionary': {
        summary:
          'The three-level type hierarchy, table definitions and indexes, buffering, and foreign keys and search helps.',
        keywords: ['Data Dictionary', 'SE11', 'domain', 'data element', 'table', 'index', 'buffering'],
        body: [
          {
            type: 'p',
            text: 'The Data Dictionary holds every data definition in the system — tables, views, types and search helps — and is reached through SE11.',
          },
          { type: 'h', text: 'Three levels of type' },
          {
            type: 'table',
            caption: 'Domain, data element, field',
            headers: ['Level', 'Defines', 'Example'],
            rows: [
              ['Domain', 'Technical attributes: type, length, value range, conversion routine', 'MATNR18'],
              ['Data element', 'Semantic attributes: labels, documentation, search help', 'MATNR, labelled "Material"'],
              ['Table field', 'A column in a table', 'MARA-MATNR'],
            ],
          },
          {
            type: 'p',
            text: 'Several data elements can share a domain — an amount domain used by invoice amount and payment amount — identical technically, different in meaning and label.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'Conversion routines',
            text: 'A conversion routine on the domain converts between internal and external format. MATN1 stores a material as eighteen zero-padded characters internally while showing 12345 on screen. That is why searching a table directly without the leading zeros finds nothing.',
          },
          { type: 'h', text: 'Table definition' },
          {
            type: 'table',
            caption: 'Parts of a table definition',
            headers: ['Element', 'Content'],
            rows: [
              ['Fields', 'Columns, referencing data elements'],
              ['Primary key', 'The fields that uniquely identify a row'],
              ['Delivery class', 'Master, transaction or customising data'],
              ['Maintenance settings', 'Whether display and maintenance are permitted'],
              ['Technical settings', 'Data class, size category, buffering'],
              ['Indexes', 'Secondary indexes for faster access'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Client-dependent tables start with MANDT',
            text: 'A table whose data is separated per client puts MANDT first in the primary key, which is what lets Open SQL add the client condition automatically. A custom table that ignores this convention will mix data across clients.',
          },
          { type: 'h', text: 'Indexes' },
          {
            type: 'code',
            caption: 'When an index helps',
            code: '" Index on (WERKS, MATNR, LGORT)\n\nWHERE werks = \'1000\'                          " helps\nWHERE werks = \'1000\' AND matnr = \'MAT-001\'    " helps\nWHERE matnr = \'MAT-001\'                        " little help\nWHERE werks = \'1000\' AND lgort = \'0001\'       " little help',
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'More indexes is not better',
            text: 'Indexes speed reads but slow inserts, updates and deletes, and consume space. Many indexes on a frequently updated table make overall performance worse. Identify the slow statements with an SQL trace (ST05) first, then add the minimum necessary.',
          },
          { type: 'h', text: 'Buffering' },
          {
            type: 'table',
            caption: 'Buffering options',
            headers: ['Kind', 'Behaviour', 'Suited to'],
            rows: [
              ['Full', 'Whole table held in memory', 'Small customising tables'],
              ['Generic', 'Rows matching the first N key fields', 'Settings per client or plant'],
              ['Single record', 'Only accessed rows', 'Frequently read rows of a large table'],
              ['None', 'Always read the database', 'Transaction data'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Do not buffer frequently updated tables',
            text: 'Updates invalidate the buffer and force reloads, so buffering volatile tables makes things slower. Buffers also synchronise asynchronously, so a read immediately after an update can return stale data.',
          },
          { type: 'h', text: 'Other Dictionary objects' },
          {
            type: 'table',
            headers: ['Object', 'Purpose'],
            rows: [
              ['Table', 'Storing data'],
              ['View', 'Joining tables or restricting fields'],
              ['Data element / domain', 'Type definitions'],
              ['Structure', 'A record type that is not a table'],
              ['Table type', 'An internal table type'],
              ['Search help', 'F4 value help'],
              ['Lock object', 'Concurrency control; generates ENQUEUE and DEQUEUE functions'],
            ],
          },
        ],
      },

      'abap-debugging-error': {
        summary:
          'Starting the debugger and the kinds of breakpoint, reading short dumps, message types, and the performance tools.',
        keywords: ['debugging', 'breakpoint', 'watchpoint', 'ST22', 'short dump', 'MESSAGE', 'ST05'],
        body: [
          {
            type: 'p',
            text: 'How well you use the debugger largely determines how productive ABAP development is. Where standard source is readable, it also lets you follow what SAP itself is doing.',
          },
          { type: 'h', text: 'Starting the debugger' },
          {
            type: 'table',
            headers: ['Method', 'How'],
            rows: [
              ['Breakpoint', 'Set a stop position in the source'],
              ['/h in the command field', 'The debugger starts at the next statement'],
              ['BREAK-POINT statement', 'Written in the source; never transport it'],
              ['BREAK username', 'Stops only for that user'],
              ['Run from SE38', 'Choose debug execution'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Never transport a BREAK-POINT',
            text: 'A hard-coded breakpoint fires in production too. Stopping in the middle of a background job leaves it hanging. Remove debugging code before transport; BREAK username is safer but should still not survive.',
          },
          { type: 'h', text: 'Kinds of breakpoint' },
          {
            type: 'table',
            headers: ['Kind', 'Behaviour'],
            rows: [
              ['Session', 'Active for the logon session; the usual choice'],
              ['External', 'Also stops in RFC and web processing'],
              ['Statement', 'Stops on a specific ABAP statement, such as MESSAGE'],
              ['Exception', 'Stops when a given exception class is raised'],
              ['Method or subroutine', 'Stops on entry to a processing block'],
            ],
          },
          {
            type: 'p',
            text: 'A statement breakpoint on MESSAGE is the quickest way to find where an unexplained error message is being issued.',
          },
          { type: 'h', text: 'Watchpoints' },
          {
            type: 'p',
            text: 'A watchpoint halts when a variable changes, optionally only when it reaches a given value — the way to catch one specific iteration inside a large loop.',
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'The new debugger',
            text: 'From ABAP 7.0 the debugger shows variables, internal tables and the call stack in parallel tabs, filters table contents in place, exports to Excel, and lets you change values and continue — which makes testing error paths possible without contriving the data.',
          },
          { type: 'h', text: 'Short dumps' },
          {
            type: 'table',
            caption: 'What to read in ST22',
            headers: ['Section', 'Content'],
            rows: [
              ['Runtime error', 'The category of failure'],
              ['Error analysis', 'What went wrong'],
              ['Source code extract', 'The failing line and its surroundings'],
              ['User and terminal', 'Who ran it'],
              ['Active calls', 'The call stack'],
            ],
          },
          {
            type: 'table',
            caption: 'Frequent runtime errors',
            headers: ['Error', 'Cause'],
            rows: [
              ['CX_SY_CONVERSION_NO_NUMBER', 'Arithmetic on text that is not numeric'],
              ['CX_SY_ZERODIVIDE', 'Division by zero'],
              ['CX_SY_ITAB_LINE_NOT_FOUND', 'A table expression found no row'],
              ['CX_SY_REF_IS_INITIAL', 'Calling a method on an initial reference'],
              ['TIME_OUT', 'Runtime exceeded the dialog limit'],
              ['DBIF_RSQL_SQL_ERROR', 'The database rejected the statement'],
            ],
          },
          {
            type: 'note',
            variant: 'tip',
            title: 'TIME_OUT usually means SQL',
            text: 'Dialog processing has a runtime limit, commonly 600 seconds. A timeout almost always traces to a SELECT inside a loop or a statement that misses its index. Trace with ST05 to find it, and move genuinely long processing to a background job.',
          },
          { type: 'h', text: 'Messages' },
          {
            type: 'table',
            caption: 'Message types',
            headers: ['Type', 'Meaning', 'Behaviour'],
            rows: [
              ['S', 'Success', 'Status bar; processing continues'],
              ['I', 'Information', 'Dialog box; continue on OK'],
              ['W', 'Warning', 'Return to the screen; can proceed'],
              ['E', 'Error', 'Return to the screen; must be corrected'],
              ['A', 'Abend', 'Terminates processing'],
              ['X', 'Exit', 'Produces a short dump'],
            ],
          },
          {
            type: 'note',
            variant: 'warn',
            title: 'Messages behave differently in background',
            text: 'Types E and W return to the screen in dialog but terminate a background job. Batch programs should test sy-batch and write to the application log (viewable in SLG1) instead of issuing screen messages.',
          },
          { type: 'h', text: 'Performance tools' },
          {
            type: 'table',
            headers: ['Code', 'Purpose'],
            rows: [
              ['ST05', 'SQL trace — statements and their durations'],
              ['SAT (formerly SE30)', 'ABAP runtime analysis'],
              ['ST22', 'Short dump list and detail'],
              ['SM50 / SM66', 'Process monitoring; find long runners'],
              ['SLG1', 'Application log'],
              ['ST12', 'Combined SQL and ABAP trace'],
            ],
          },
        ],
      },
    },
  },
};
