import type { GlossaryTerm } from './glossary';

/**
 * Glossary entries for the technical modules — ABAP, Basis and PS.
 * Kept separate from the functional terms in `glossary.ts` so the two
 * sets can be extended independently.
 */
export const techTerms: GlossaryTerm[] = [
  // ─── ABAP ────────────────────────────────────────────────────
  {
    id: 'abap',
    modules: ['ABAP'],
    ja: {
      term: 'ABAP',
      reading: 'えーびーえーぴー',
      definition: 'Advanced Business Application Programming。SAPが自社の業務アプリケーションを記述するために開発したプログラミング言語。SAP標準機能そのものがABAPで書かれており、追加開発も同じ言語で行う。データベースアクセス（Open SQL）、画面制御、権限チェック、多言語対応、開発物の移送といった業務システムに必要な機能が言語とランタイムに組み込まれている点が特徴。',
    },
    en: {
      term: 'ABAP',
      definition: 'Advanced Business Application Programming, the language SAP created to write its own business applications. Standard SAP functionality is itself written in ABAP, and custom development uses the same language. What distinguishes it is that database access (Open SQL), screen handling, authorisation checks, translation and transport of development objects are built into the language and runtime rather than supplied by libraries.',
    },
  },
  {
    id: 'abap-dictionary',
    modules: ['ABAP'],
    ja: {
      term: 'データディクショナリ（DDIC）',
      reading: 'でーたでぃくしょなり',
      definition: 'SAPシステム内のデータ定義を一元管理する仕組み。テーブル、ビュー、データ型、検索ヘルプ、ロックオブジェクトなどを定義する。トランザクションSE11でアクセスする。データ型はドメイン（技術的属性）、データ要素（意味的属性）、テーブル項目の3階層で構成され、この分離によりシステム全体の一貫性が保たれる。',
    },
    en: {
      term: 'ABAP Dictionary (DDIC)',
      definition: 'The central repository of data definitions in an SAP system — tables, views, data types, search helps and lock objects — accessed through transaction SE11. Types are defined in three layers: the domain holds technical attributes, the data element holds semantic ones such as labels, and the table field references the data element. That separation is what keeps definitions consistent system-wide.',
    },
  },
  {
    id: 'domain-ddic',
    modules: ['ABAP'],
    ja: {
      term: 'ドメイン',
      reading: 'どめいん',
      definition: 'データディクショナリにおける技術的属性の定義。データ型、桁数、値範囲、変換ルーチンを規定する。複数のデータ要素が同じドメインを参照でき、たとえば「金額」ドメインを請求金額と支払金額が共有する。変換ルーチンにより内部形式と外部形式の変換が行われ、品目コードが内部では18桁ゼロ埋めで保持されつつ画面には前ゼロなしで表示される。',
    },
    en: {
      term: 'Domain',
      definition: 'The technical layer of a Data Dictionary type: data type, length, permitted value range and conversion routine. Several data elements can share one domain — an amount domain used by both invoice amount and payment amount. The conversion routine translates between internal and external format, which is why a material number is stored as eighteen zero-padded characters but displayed without the leading zeros.',
    },
  },
  {
    id: 'data-element',
    modules: ['ABAP'],
    ja: {
      term: 'データ要素',
      reading: 'でーたようそ',
      definition: 'データディクショナリにおける意味的属性の定義。項目ラベル（短・中・長）、ドキュメント、検索ヘルプを保持し、技術的な仕様はドメインから継承する。ABAPで変数を宣言する際は、組み込み型を直接書くよりデータ要素を参照するほうが望ましい。桁数がSAPの定義と自動的に一致し、定義変更にも追随するため。',
    },
    en: {
      term: 'Data Element',
      definition: 'The semantic layer of a Data Dictionary type: field labels, documentation and search help, inheriting technical attributes from its domain. Declaring ABAP variables by reference to a data element is preferable to writing a built-in type, because lengths then match the SAP definition automatically and follow any change to it.',
    },
  },
  {
    id: 'internal-table',
    modules: ['ABAP'],
    ja: {
      term: '内部テーブル',
      reading: 'ないぶてーぶる',
      definition: 'ABAPのメモリ上に保持される表形式のデータ構造。データベースから取得した結果の加工や集計に使われ、ABAPプログラムの大半は内部テーブルの操作で成り立つ。標準テーブル（線形探索）、ソート済テーブル（二分探索）、ハッシュテーブル（完全キーで高速検索）の3種類があり、件数と検索方法に応じて使い分ける。',
    },
    en: {
      term: 'Internal Table',
      definition: 'An in-memory tabular data structure and the central data type in ABAP; most of what a program does is manipulate them. Three kinds exist — standard tables searched linearly, sorted tables searched by binary search, and hashed tables offering fast access by complete key — chosen according to volume and access pattern.',
    },
  },
  {
    id: 'field-symbol',
    modules: ['ABAP'],
    ja: {
      term: 'フィールドシンボル',
      reading: 'ふぃーるどしんぼる',
      definition: '他の変数やデータ領域を指し示すポインタに相当するABAPの機能。<fs>のように山括弧で表記する。内部テーブルのループでASSIGNINGとともに使うと、行を作業領域へコピーせず直接参照するため高速であり、行の値をその場で書き換えられる。大量データの処理や、ループ内で行を更新する場合に用いる。',
    },
    en: {
      term: 'Field Symbol',
      definition: 'An ABAP construct equivalent to a pointer, written in angle brackets as <fs>. Used with ASSIGNING in a loop over an internal table, it references the row directly instead of copying it into a work area, which is both faster and allows the row to be modified in place. It is the right choice for large volumes and for in-place updates.',
    },
  },
  {
    id: 'open-sql',
    modules: ['ABAP'],
    ja: {
      term: 'Open SQL',
      reading: 'おーぷんえすきゅーえる',
      definition: 'ABAPからデータベースにアクセスするための命令群。データベース製品の違いを吸収するため、同じコードがOracle、SQL Server、HANAのいずれでも動作する。WHERE句にクライアント条件が自動的に付与され、テーブルバッファも自動的に利用される。ループ内でのSELECTやインデックスの効かない検索は、性能問題の典型的な原因になる。',
    },
    en: {
      term: 'Open SQL',
      definition: 'The set of statements ABAP uses to reach the database. It abstracts away differences between database products, so the same code runs on Oracle, SQL Server or HANA. The client condition is added to the WHERE clause automatically and table buffers are used transparently. SELECTs inside loops and statements that miss their index are the classic causes of poor performance.',
    },
  },
  {
    id: 'for-all-entries',
    modules: ['ABAP'],
    ja: {
      term: 'FOR ALL ENTRIES',
      reading: 'ふぉーおーるえんとりーず',
      definition: '内部テーブルの各行の値を条件として、データベースから一括取得するOpen SQLの構文。ループ内でSELECTを繰り返す代わりに使う。ただし駆動表が空の場合はWHERE条件そのものが無視されテーブル全件が返るため、実行前の空チェックが必須。また結果から重複行が自動的に除去される点にも注意が必要。',
    },
    en: {
      term: 'FOR ALL ENTRIES',
      definition: 'An Open SQL construct that selects rows matching values held in an internal table, used instead of repeating a SELECT inside a loop. Two behaviours catch people out: if the driver table is empty the condition is dropped entirely and the whole table is returned, so an emptiness check is mandatory; and duplicate rows are removed from the result automatically.',
    },
  },
  {
    id: 'cds-view',
    modules: ['ABAP'],
    ja: {
      term: 'CDSビュー',
      reading: 'しーでぃーえすびゅー',
      definition: 'Core Data Services ビュー。複数テーブルの結合、集計、計算列、権限制御をデータベース側で定義する仕組み。HANAの性能を活かす「コードプッシュダウン」の中核であり、大量データをABAPサーバへ持ってきてから加工するのではなく、集計結果だけを受け取れる。開発はEclipseベースのADTで行い、SAP GUIでは作成できない。',
    },
    en: {
      term: 'CDS View',
      definition: 'A Core Data Services view, defining joins, aggregations, calculated columns and access control in the database layer. It is the main vehicle for code pushdown on HANA: rather than pulling large volumes to the application server and processing there, the calculation runs in the database and only the result is returned. CDS views are developed in ADT and cannot be created in the SAP GUI.',
    },
  },
  {
    id: 'alv',
    modules: ['ABAP'],
    ja: {
      term: 'ALV（ABAP List Viewer）',
      reading: 'えーえるぶい',
      definition: '内部テーブルの内容を表形式で表示する標準部品。ソート、フィルタ、列の並べ替え、小計・合計、Excel出力、表示レイアウトの保存といった機能が実装なしで得られる。実装方式は関数モジュール（REUSE_ALV_GRID_DISPLAY）、CL_GUI_ALV_GRID、CL_SALV_TABLE（SALV）の3種類があり、標準的な要件にはSALVが推奨される。',
    },
    en: {
      term: 'ALV (ABAP List Viewer)',
      definition: 'The standard component for displaying an internal table as a table. Sorting, filtering, column rearrangement, subtotals, Excel export and saved layouts all come for free. Three implementations exist — the classic function module, CL_GUI_ALV_GRID for fine control, and CL_SALV_TABLE, which is concise and covers most requirements.',
    },
  },
  {
    id: 'field-catalog',
    modules: ['ABAP'],
    ja: {
      term: 'フィールドカタログ',
      reading: 'ふぃーるどかたろぐ',
      definition: 'ALVで表示する列の定義を保持する構造。項目名、列見出し、表示幅、合計の要否、初期表示の有無などを指定する。REF_TABLEとREF_FIELDにデータディクショナリの定義を指定すると、見出し・桁数・変換ルーチンが自動的に適用され、表示品質が向上する。SALVを使う場合は内部テーブルの構造から自動生成されるため、手動で作る必要がない。',
    },
    en: {
      term: 'Field Catalog',
      definition: 'The structure describing the columns an ALV should display: field name, headings, width, whether to total, whether to show initially. Pointing REF_TABLE and REF_FIELD at a Dictionary definition inherits the heading, length and conversion routine, which noticeably improves the output. SALV derives the catalog from the internal table automatically, so it does not need building by hand.',
    },
  },
  {
    id: 'abap-objects',
    modules: ['ABAP'],
    ja: {
      term: 'ABAPオブジェクト',
      reading: 'えーびーえーぴーおぶじぇくと',
      definition: '1999年にABAPへ導入されたオブジェクト指向の機能。クラスは定義部（DEFINITION）と実装部（IMPLEMENTATION）に分かれ、PUBLIC・PROTECTED・PRIVATEの可視性セクションを持つ。継承は単一継承のみで、複数の振る舞いを組み合わせる場合はインタフェースを使う。現在のABAP開発ではこれが標準的な書き方であり、サブルーチン（FORM）は非推奨。',
    },
    en: {
      term: 'ABAP Objects',
      definition: 'The object-oriented extension added to ABAP in 1999. A class is split into a definition and an implementation and has public, protected and private sections. Only single inheritance is supported; interfaces are used to combine behaviours. This is now the standard way to write ABAP, with the older FORM subroutines deprecated.',
    },
  },
  {
    id: 'function-module',
    modules: ['ABAP'],
    ja: {
      term: '関数モジュール',
      reading: 'かんすうもじゅーる',
      definition: 'SE37で作成する再利用可能な処理単位。関数グループという入れ物に属し、同じグループ内の関数はグローバルデータを共有する。パラメータはIMPORT・EXPORT・CHANGING・TABLES・EXCEPTIONSに分かれる。呼び出し側のEXPORTINGは「関数へ渡す」、IMPORTINGは「関数から受け取る」を意味し、定義側から見ると向きが逆になる点が混乱しやすい。',
    },
    en: {
      term: 'Function Module',
      definition: 'A reusable processing unit created in SE37, belonging to a function group whose members share global data. Parameters are categorised as importing, exporting, changing, tables and exceptions. A common source of confusion is that EXPORTING at the call site means passing values in, while the same values are received as importing parameters inside the function.',
    },
  },
  {
    id: 'bapi',
    modules: ['ABAP', 'FI', 'SD', 'MM'],
    ja: {
      term: 'BAPI',
      reading: 'ばぴ',
      definition: 'Business Application Programming Interface。SAPが業務処理の標準APIとして提供するRFC対応の関数モジュール。BAPI_SALESORDER_CREATEFROMDAT2（受注作成）やBAPI_ACC_DOCUMENT_POST（会計伝票転記）などがある。内部でCOMMIT WORKを実行しないため、呼び出し後にBAPI_TRANSACTION_COMMITが必須。戻り値のRETURNテーブルでタイプEまたはAのメッセージを確認する必要がある。',
    },
    en: {
      term: 'BAPI',
      definition: 'A Business Application Programming Interface: an RFC-enabled function module published by SAP as a stable API for business processing, such as BAPI_SALESORDER_CREATEFROMDAT2 or BAPI_ACC_DOCUMENT_POST. A BAPI does not commit on its own, so BAPI_TRANSACTION_COMMIT must follow, and the RETURN table has to be inspected for messages of type E or A.',
    },
  },
  {
    id: 'rfc',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'RFC（リモート関数呼出）',
      reading: 'あーるえふしー',
      definition: 'Remote Function Call。SAPシステム間、あるいは外部システムとSAPの間で関数を呼び出す仕組み。接続先はSM59で定義する。RFC接続にユーザーIDとパスワードを保存すると、その接続を知る者は接続先システムへアクセスできるため、開発機から本番機への接続情報を保存するのは重大な脆弱性になる。接続の方向は高セキュリティから低セキュリティへとするのが原則。',
    },
    en: {
      term: 'RFC (Remote Function Call)',
      definition: 'The mechanism for calling functions between SAP systems or between SAP and external systems, with destinations defined in SM59. Storing credentials in a destination lets anyone who can use it reach the target system, so a destination from development into production is a serious vulnerability. Trust should flow from higher-security systems to lower, never the reverse.',
    },
  },
  {
    id: 'idoc',
    modules: ['ABAP', 'SD', 'MM'],
    ja: {
      term: 'IDoc',
      reading: 'あいどっく',
      definition: 'Intermediate Document。SAPと外部システムの間でデータを交換するための標準的なメッセージ形式。受発注や出荷通知といったEDI連携で広く使われる。制御レコード、データレコード、ステータスレコードの3部構成をとり、処理の成否がステータスとして記録される。WE02やWE05で送受信状況を確認し、エラーとなったIDocは原因を特定して再処理する。',
    },
    en: {
      term: 'IDoc',
      definition: 'An Intermediate Document, SAP\'s standard message format for exchanging data with external systems and the usual vehicle for EDI traffic such as orders and despatch advices. It has three parts — control, data and status records — with processing outcomes recorded as statuses. WE02 and WE05 display traffic, and failed IDocs are diagnosed and reprocessed.',
    },
  },
  {
    id: 'badi',
    modules: ['ABAP'],
    ja: {
      term: 'BAdI',
      reading: 'ばでぃ',
      definition: 'Business Add-In。SAP標準プログラムを変更せずに独自処理を追加するための拡張技術。オブジェクト指向にもとづき、1つのBAdIに対して複数の実装を持てる。標準を直接書き換えるモディフィケーションと違い、サポートパッケージ適用時に上書きや衝突が起きないため、追加開発ではこうした正規の拡張ポイントを使うことが原則とされる。',
    },
    en: {
      term: 'BAdI (Business Add-In)',
      definition: 'An enhancement technique for adding custom logic without modifying standard SAP programs. Being object-oriented, one BAdI can carry several implementations. Unlike a modification of standard source, a BAdI is not overwritten or thrown into conflict when a support package is applied, which is why released extension points are the sanctioned route for custom development.',
    },
  },
  {
    id: 'user-exit',
    modules: ['ABAP'],
    ja: {
      term: 'ユーザーイグジット／カスタマーイグジット',
      reading: 'ゆーざーいぐじっと',
      definition: 'SAP標準プログラム内にあらかじめ用意された、独自処理を組み込むための拡張点。ユーザーイグジットは空のサブルーチンに実装する古い方式で、カスタマーイグジットはCMODで有効化して機能グループ単位で実装する。いずれもBAdIやエンハンスメントフレームワークより前の世代の技術であり、既存システムの保守で目にすることが多い。',
    },
    en: {
      term: 'User Exit / Customer Exit',
      definition: 'Extension points built into standard SAP programs for inserting custom logic. User exits are implemented inside empty subroutines and are the older mechanism; customer exits are activated in CMOD and implemented per function group. Both predate BAdIs and the enhancement framework, and are mostly encountered when maintaining existing systems.',
    },
  },
  {
    id: 'enhancement-framework',
    modules: ['ABAP'],
    ja: {
      term: 'エンハンスメントフレームワーク',
      reading: 'えんはんすめんとふれーむわーく',
      definition: 'ABAPソースコードの任意の箇所にフックを挿入できる拡張の仕組み。エンハンスメントスポットとエンハンスメント実装で構成される。従来のイグジットがSAPの用意した箇所にしか実装できなかったのに対し、より柔軟な位置での拡張が可能になった。新しいBAdIもこのフレームワークに統合されている。',
    },
    en: {
      term: 'Enhancement Framework',
      definition: 'A mechanism for inserting hooks at arbitrary points in ABAP source, structured as enhancement spots and implementations. Where older exits could only be used where SAP had provided them, this allows extension at far more locations. New-style BAdIs are integrated into the same framework.',
    },
  },
  {
    id: 'exception-class',
    modules: ['ABAP'],
    ja: {
      term: '例外クラス',
      reading: 'れいがいくらす',
      definition: 'ABAPオブジェクトにおける例外処理の仕組み。RAISE EXCEPTION TYPE で送出し、TRY〜CATCH〜ENDTRYで捕捉する。基底クラスによりCX_STATIC_CHECK（宣言必須）、CX_DYNAMIC_CHECK（実行時チェック）、CX_NO_CHECK（致命的エラー向け）に分かれる。すべてをCX_ROOTで一括捕捉すると想定内のエラーと予期しないバグを区別できなくなるため避けるべき。',
    },
    en: {
      term: 'Exception Class',
      definition: 'The class-based exception mechanism in ABAP Objects, raised with RAISE EXCEPTION TYPE and caught in a TRY/CATCH block. Base classes distinguish CX_STATIC_CHECK, which must be declared and handled, CX_DYNAMIC_CHECK, checked at runtime, and CX_NO_CHECK for fatal errors. Catching everything at CX_ROOT is best avoided, since it conflates expected errors with genuine bugs.',
    },
  },
  {
    id: 'dynpro',
    modules: ['ABAP'],
    ja: {
      term: 'Dynpro（画面）',
      reading: 'だいなぷろ',
      definition: 'Dynamic Program。SAP GUI上で動作する対話型の入力画面。SE51のスクリーンペインタで作成し、画面レイアウトとフロー制御（PBO：出力前処理、PAI：入力後処理）を定義する。Eclipseベースの開発環境ADTでは作成できず、SAP GUIが必要。近年はFioriによるWebベースのUIへ置き換えが進んでいる。',
    },
    en: {
      term: 'Dynpro (Screen)',
      definition: 'A dynamic program — the interactive screen technology that runs inside the SAP GUI. Screens are built in the Screen Painter (SE51), which defines the layout and the flow logic split into process-before-output and process-after-input. Dynpros cannot be created in ADT and require the GUI; new development increasingly moves to Fiori instead.',
    },
  },
  {
    id: 'smartforms',
    modules: ['ABAP', 'SD'],
    ja: {
      term: 'SmartForms',
      reading: 'すまーとふぉーむず',
      definition: '請求書や発注書などの帳票レイアウトを定義するツール。旧来のSAPscriptの後継として登場し、グラフィカルな編集とテーブル出力の柔軟性が向上した。作成すると関数モジュールが自動生成され、ABAPプログラムから呼び出して印刷する。さらに新しい選択肢としてAdobe Formsがあり、PDF出力や入力フォームに強い。',
    },
    en: {
      term: 'SmartForms',
      definition: 'The tool for defining printed form layouts such as invoices and purchase orders. It succeeded SAPscript, adding graphical editing and more flexible table output. Building a form generates a function module that ABAP programs call to print. Adobe Forms is the newer alternative, stronger for PDF output and interactive forms.',
    },
  },
  {
    id: 'bdc',
    modules: ['ABAP'],
    ja: {
      term: 'BDC（バッチインプット）',
      reading: 'びーでぃーしー',
      definition: 'Batch Data Communication。既存のトランザクション画面を自動操作してデータを登録する仕組み。画面の入力項目と値の組み合わせをBDCテーブルに組み立て、CALL TRANSACTIONまたはバッチインプットセッションで実行する。BAPIが提供されていない処理のデータ移行や一括登録に使われるが、画面レイアウトの変更に弱いため、BAPIが使える場合はそちらが優先される。',
    },
    en: {
      term: 'BDC (Batch Data Communication)',
      definition: 'A technique that drives existing transaction screens programmatically to enter data. Screen fields and values are assembled into a BDC table and executed with CALL TRANSACTION or as a batch input session. It is used for migration and mass entry where no BAPI exists, but it is brittle against screen changes, so a BAPI is preferred wherever one is available.',
    },
  },
  {
    id: 'lsmw',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'LSMW',
      reading: 'えるえすえむだぶりゅー',
      definition: 'Legacy System Migration Workbench。旧システムからSAPへのデータ移行を支援するツール。ファイルの読込、項目のマッピング、変換ルールの定義、実行までを画面上で設定でき、ABAPを書かずに移行処理を組み立てられる。内部的にはBDC、BAPI、IDocのいずれかを使う。S/4HANAでは非推奨とされ、マイグレーションコックピットの利用が推奨されている。',
    },
    en: {
      term: 'LSMW',
      definition: 'The Legacy System Migration Workbench, a tool for loading data from legacy systems into SAP. Reading files, mapping fields, defining conversion rules and running the load are all configured on screen, so a migration can be built without writing ABAP. Internally it uses BDC, BAPIs or IDocs. It is deprecated in S/4HANA in favour of the Migration Cockpit.',
    },
  },
  {
    id: 'lock-object',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'ロックオブジェクト',
      reading: 'ろっくおぶじぇくと',
      definition: '複数ユーザーが同じデータを同時に更新することを防ぐための排他制御の定義。データディクショナリで作成すると、ENQUEUE_〜とDEQUEUE_〜という関数モジュールが自動生成される。取得したロックは処理終了とともに解放されるが、GUIの異常終了などで残ることがあり、SM12で確認・削除する。削除前に対象ユーザーがログオフしているかの検証が必要。',
    },
    en: {
      term: 'Lock Object',
      definition: 'A Dictionary definition providing exclusive access control so that two users cannot update the same data simultaneously. Creating one generates ENQUEUE and DEQUEUE function modules. Locks are normally released when processing ends, but an abnormal GUI termination can leave them behind; SM12 displays and deletes them, though the holding user should be confirmed logged off first.',
    },
  },
  {
    id: 'short-dump',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'ショートダンプ（実行時エラー）',
      reading: 'しょーとだんぷ',
      definition: 'ABAPプログラムが異常終了したときに記録される詳細なエラー情報。ST22で確認する。エラー名、エラー分析、ソースコードの該当箇所、コールスタック、実行ユーザーが記録される。TIME_OUT（実行時間超過）はループ内のSELECTやインデックスの効かないSQLが原因であることが多く、ST05のSQLトレースで特定する。',
    },
    en: {
      term: 'Short Dump (Runtime Error)',
      definition: 'The detailed error record written when an ABAP program terminates abnormally, viewed in ST22. It captures the error name, an analysis, the failing source with context, the call stack and the user. A TIME_OUT usually traces to a SELECT inside a loop or a statement missing its index, identified with an SQL trace in ST05.',
    },
  },
  {
    id: 'abap-cloud',
    modules: ['ABAP'],
    ja: {
      term: 'ABAP Cloud',
      reading: 'えーびーえーぴーくらうど',
      definition: 'SAPが公開したAPIとエクステンションポイントだけを使う、制限された開発モデル。標準のコアを変更しない「クリーンコア」の原則を技術的に強制する。これによりバージョンアップが容易になり、クラウドへの移行も可能になる。S/4HANA Cloudでの開発はこのモデルが前提であり、オンプレミス環境でも新規開発では推奨される。',
    },
    en: {
      term: 'ABAP Cloud',
      definition: 'A restricted development model that permits only released public APIs and defined extension points, enforcing the clean core principle technically rather than by convention. Keeping the core unmodified is what makes upgrades manageable and a move to the cloud feasible. It is mandatory in S/4HANA Cloud and recommended for new development on premise.',
    },
  },
  {
    id: 'clean-core',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'クリーンコア',
      reading: 'くりーんこあ',
      definition: 'SAP標準のコアを変更せず、公開されたAPIと拡張ポイントだけで機能を追加するという設計原則。標準プログラムを直接書き換えるモディフィケーションは、サポートパッケージや新バージョンの適用時に上書きや衝突を起こし、保守コストを押し上げる。大量のアドオンはS/4HANA移行の主要な障壁になるため、この原則の重要性が増している。',
    },
    en: {
      term: 'Clean Core',
      definition: 'The design principle of extending SAP only through released APIs and defined extension points, leaving the standard core unmodified. Direct modification of standard programs causes overwrites and conflicts whenever support packages or new releases arrive, driving up maintenance cost. Large add-on estates are among the main obstacles to an S/4HANA migration, which is why the principle has gained weight.',
    },
  },
  {
    id: 'adt-eclipse',
    modules: ['ABAP'],
    ja: {
      term: 'ADT（ABAP Development Tools）',
      reading: 'えーでぃーてぃー',
      definition: 'Eclipseベースの ABAP開発環境。コード補完やリファクタリングが充実し、複数システムの同時操作も容易。CDSビューやRAP、ABAP Cloudといった新しい技術はADTでしか開発できない。一方、Dynpro画面の作成はSAP GUIが必要なため、実務では両方を使い分けることになる。',
    },
    en: {
      term: 'ADT (ABAP Development Tools)',
      definition: 'The Eclipse-based ABAP development environment, offering proper code completion and refactoring and making work across several systems straightforward. Newer technologies — CDS views, RAP and ABAP Cloud — exist only here, while Dynpro screens still require the SAP GUI, so most teams use both.',
    },
  },
  {
    id: 'package-devclass',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'パッケージ（開発クラス）',
      reading: 'ぱっけーじ',
      definition: '開発オブジェクトをまとめる単位。単なるフォルダではなく、トランスポート層と紐づいており、そのパッケージに属するオブジェクトがどのシステムへ移送されるかを決める。$TMPはローカルオブジェクト用で移送されないため、正式な開発は最初から適切なパッケージに作る必要がある。顧客が作成するパッケージはZまたはYで始める。',
    },
    en: {
      term: 'Package (Development Class)',
      definition: 'The unit that groups development objects. It is not merely a folder: it links to a transport layer and therefore determines where its objects are transported. $TMP holds local objects that are never transported, so real development belongs in a proper package from the outset. Customer packages begin with Z or Y.',
    },
  },
  {
    id: 'namespace',
    modules: ['ABAP'],
    ja: {
      term: '名前空間（ZまたはY接頭辞）',
      reading: 'なまえくうかん',
      definition: '顧客が作成するオブジェクトの名前をZまたはYで始めるという規約。SAPが将来リリースするオブジェクトがこれらの文字で始まることはないため、規約を守っている限りバージョンアップで名前が衝突しない。大規模な組織では、ZFI_やZMM_のようにモジュールを示す接頭辞を追加する命名規約を設けることが多い。',
    },
    en: {
      term: 'Namespace (Z and Y prefixes)',
      definition: 'The convention that customer-created objects begin with Z or Y. SAP never ships objects with those prefixes, so following the convention guarantees no collision at upgrade. Larger organisations usually add a second level, such as ZFI_ or ZMM_ to indicate the module, or ZR_ for reports.',
    },
  },
  {
    id: 'odata',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'OData',
      reading: 'おーでーた',
      definition: 'Open Data Protocol。HTTPベースでデータを公開・取得するための標準プロトコル。SAP FioriアプリとバックエンドのSAPシステムをつなぐ主要なインタフェースとして使われる。ABAP側ではSEGWのゲートウェイサービスビルダ、あるいはCDSビューへのアノテーション付与によってサービスを公開する。',
    },
    en: {
      term: 'OData',
      definition: 'The Open Data Protocol, an HTTP-based standard for exposing and consuming data. It is the principal interface between SAP Fiori applications and the backend. On the ABAP side, services are published either through the Gateway Service Builder (SEGW) or by annotating a CDS view.',
    },
  },

  // ─── Basis ───────────────────────────────────────────────────
  {
    id: 'sap-basis',
    modules: ['BASIS'],
    ja: {
      term: 'SAP Basis',
      reading: 'えすえーぴーべーしす',
      definition: 'SAPシステムの技術基盤を担う領域。システムの構築と運用、ユーザーと権限の管理、トランスポート、ジョブ管理、監視、パッチ適用、性能管理、バックアップ、セキュリティまでを守備範囲とする。業務モジュールが「何をするか」を扱うのに対し、Basisは「それが動き続けるようにする」ことを扱う。近年はSAP NetWeaverやSAP Technologyとも呼ばれる。',
    },
    en: {
      term: 'SAP Basis',
      definition: 'The technical foundation layer of an SAP system, covering installation and operations, user and authorisation management, transports, job scheduling, monitoring, patching, performance, backup and security. Where functional modules concern what the system does, Basis concerns keeping it running. It is also referred to as SAP NetWeaver or SAP Technology.',
    },
  },
  {
    id: 'client-mandt',
    modules: ['BASIS'],
    ja: {
      term: 'クライアント（MANDT）',
      reading: 'くらいあんと',
      definition: '1つの物理的なSAPシステムの中に作られる、独立した論理的な区画。3桁の数字で表され、ログイン時に指定する。多くのテーブルが主キーの先頭にMANDT項目を持ち、SQLアクセス時に自動的にそのクライアントの条件が付加されるため、異なるクライアントのデータが混ざることはない。設定はSCC4で行う。',
    },
    en: {
      term: 'Client (MANDT)',
      definition: 'An independent logical partition within one physical SAP system, identified by a three-digit number chosen at logon. Most tables carry MANDT as the first key field and SQL access adds the client condition automatically, so data from one client never leaks into another. Client properties are maintained in SCC4.',
    },
  },
  {
    id: 'client-dependent',
    modules: ['BASIS'],
    ja: {
      term: 'クライアント依存／非依存',
      reading: 'くらいあんといぞん',
      definition: 'データや設定がクライアントごとに分かれるか、システム全体で共通かの区別。マスタデータ、伝票、ユーザー、ロール、多くのカスタマイジングはクライアント依存。ABAPプログラム、テーブル定義、通貨コード、単位、暦はクライアント非依存であり、変更するとそのシステム上のすべてのクライアントに影響する。',
    },
    en: {
      term: 'Client-Dependent / Client-Independent',
      definition: 'The distinction between data and settings held separately per client and those shared across the whole system. Master data, documents, users, roles and most configuration are client-dependent. ABAP programs, table definitions, currencies, units and calendars are client-independent, so changing one affects every client on that system.',
    },
  },
  {
    id: 'system-landscape',
    modules: ['BASIS'],
    ja: {
      term: 'システムランドスケープ',
      reading: 'しすてむらんどすけーぷ',
      definition: '開発（DEV）、品質保証（QAS）、本番（PRD）の3システムからなる標準的な構成。変更は必ず開発システムで行い、トランスポートによって順に移送される。本番システムで直接変更を行わないことが品質を担保する基本原則であり、そのため本番クライアントは変更不可に設定するのが通例。要件により本番前の検証環境やサンドボックスを追加することもある。',
    },
    en: {
      term: 'System Landscape',
      definition: 'The standard arrangement of development, quality assurance and production systems. Changes are always made in development and moved through by transport; not changing production directly is the principle that preserves quality, which is why the production client is normally set to reject configuration changes. Some landscapes add a pre-production stage or a sandbox.',
    },
  },
  {
    id: 'work-process',
    modules: ['BASIS'],
    ja: {
      term: 'ワークプロセス',
      reading: 'わーくぷろせす',
      definition: 'アプリケーションサーバで実際の処理を実行する単位。ディスパッチャがユーザーのリクエストを受け取り、空いているワークプロセスに割り当てる。ダイアログ（DIA）、更新（UPD）、バックグラウンド（BTC）、エンキュー（ENQ）、スプール（SPO）の種類がある。ダイアログには実行時間の上限（既定600秒）があり、長時間処理はバックグラウンドへ移すべき理由になっている。',
    },
    en: {
      term: 'Work Process',
      definition: 'The unit that performs actual processing on an application server. The dispatcher receives requests and hands them to a free work process. Types include dialog, update, background, enqueue and spool. Dialog processes are terminated at a time limit, 600 seconds by default, which is precisely why long-running work belongs in a background job.',
    },
  },
  {
    id: 'update-error',
    modules: ['BASIS', 'FI'],
    ja: {
      term: '更新エラー（SM13）',
      reading: 'こうしんえらー',
      definition: 'SAPでは伝票を保存したとき、実際のデータベース更新はダイアログプロセスではなく更新プロセスが非同期に行う。この更新が失敗すると、ユーザーは「保存できた」と思っているのに実際には保存されていない状態になる。SM13で失敗した更新を確認でき、データ不整合につながるため日次の監視項目に含めるべき対象。',
    },
    en: {
      term: 'Update Error (SM13)',
      definition: 'When a document is saved, the actual database update is performed asynchronously by an update process rather than the dialog process. If it fails, the user believes the document was saved when it was not. Failed updates are listed in SM13 and, because they produce inconsistent data, belong in the daily monitoring routine.',
    },
  },
  {
    id: 'transport-request',
    modules: ['BASIS'],
    ja: {
      term: 'トランスポート要求',
      reading: 'とらんすぽーとようきゅう',
      definition: '開発システムで行った変更を他システムへ運ぶための単位。要求（Request）とタスク（Task）の2階層で構成され、全員が自分のタスクをリリースしてはじめて要求をリリースできる。開発オブジェクトを扱うワークベンチ要求と、IMG設定を扱うカスタマイジング要求がある。SE09・SE10で管理する。',
    },
    en: {
      term: 'Transport Request',
      definition: 'The unit by which changes made in development are moved to other systems. It has two levels — the request and the tasks belonging to individual developers — and the request can only be released once every task has been. Workbench requests carry development objects; customising requests carry IMG configuration. Both are managed in SE09 and SE10.',
    },
  },
  {
    id: 'tms',
    modules: ['BASIS'],
    ja: {
      term: 'TMS（トランスポート管理システム）',
      reading: 'てぃーえむえす',
      definition: 'システム間の移送経路を定義し、インポートを実行する仕組み。STMSで操作する。ドメインコントローラ、トランスポートルート、トランスポート層、インポートキューから構成される。インポートはリリースされた順序で行うのが原則で、順序を入れ替えると依存関係が壊れることがある。結果はリターンコード（0が正常、4が警告、8以上はエラー）で示される。',
    },
    en: {
      term: 'TMS (Transport Management System)',
      definition: 'The mechanism that defines transport routes between systems and performs imports, operated through STMS. It comprises a domain controller, transport routes, transport layers and import queues. Imports should follow release order, since reordering can break dependencies. Results are reported as return codes, where 0 is success, 4 a warning and 8 or above an error.',
    },
  },
  {
    id: 'authorization-object',
    modules: ['BASIS'],
    ja: {
      term: '権限オブジェクト',
      reading: 'けんげんおぶじぇくと',
      definition: 'SAPの権限チェックが行われる単位。最大10個のフィールドを持ち、すべてのフィールドの条件を満たしていなければ権限エラーとなる。S_TCODE（トランザクション実行）、S_TABU_DIS（テーブル保守）、S_DEVELOP（開発オブジェクト）などがある。プログラム側ではAUTHORITY-CHECK文で検証する。不足している権限はSU53で確認できる。',
    },
    en: {
      term: 'Authorisation Object',
      definition: 'The unit against which SAP checks authorisation, carrying up to ten fields, all of which must be satisfied for the check to pass. Common objects include S_TCODE for running transactions, S_TABU_DIS for table maintenance and S_DEVELOP for development objects. Programs verify them with AUTHORITY-CHECK, and SU53 shows which check most recently failed.',
    },
  },
  {
    id: 'role-pfcg',
    modules: ['BASIS'],
    ja: {
      term: 'ロール（PFCG）',
      reading: 'ろーる',
      definition: '権限をまとめてユーザーに割り当てるための単位。PFCGで設計し、生成すると内部的に権限プロファイルが作られる。個々の権限を定義する単一ロール、それらを職務単位で束ねる複合ロール、親から権限を継承し組織レベルだけを変える派生ロールがある。派生ロールは、同じ業務を異なる拠点で行う場合の保守を大幅に軽減する。',
    },
    en: {
      term: 'Role (PFCG)',
      definition: 'The unit by which authorisations are assembled and assigned to users, designed in PFCG and generating an authorisation profile when created. Single roles define individual authorisations, composite roles bundle them by job function, and derived roles inherit from a parent while varying only organisational values — which greatly reduces maintenance where the same job is performed at several sites.',
    },
  },
  {
    id: 'segregation-of-duties',
    modules: ['BASIS', 'FI'],
    ja: {
      term: '職務分離（SoD）',
      reading: 'しょくむぶんり',
      definition: '1人の担当者が不正を完結できないよう、相反する権限を分離する内部統制の考え方。仕入先マスタ登録と支払実行、購買発注登録と入庫転記、クレジットメモ登録と請求ブロック解除、ユーザー作成とロール付与といった組み合わせが典型例。監査で必ず確認される項目であり、権限設計の段階で分離を織り込む必要がある。',
    },
    en: {
      term: 'Segregation of Duties (SoD)',
      definition: 'The control principle of separating conflicting authorisations so that no single person can complete a fraudulent transaction alone. Classic conflicts include creating vendors and running payments, raising purchase orders and posting receipts, raising credit memos and releasing billing blocks, and creating users and assigning roles. Auditors check for these, so separation belongs in the authorisation design.',
    },
  },
  {
    id: 'sap-all',
    modules: ['BASIS'],
    ja: {
      term: 'SAP_ALL',
      reading: 'えすえーぴーおーる',
      definition: 'システム上のすべての権限を含むプロファイル。緊急時の対応で一時的に必要になることはあるが、恒常的に付与すべきではない。監査では必ず「SAP_ALLを持つユーザーは誰か」が確認される。付与する場合は期限を設定し、作業ログを残す運用が必要。開発者に本番環境でSAP_ALLを渡す慣行は認められない。',
    },
    en: {
      term: 'SAP_ALL',
      definition: 'The profile containing every authorisation in the system. Emergencies occasionally require it, but permanent assignment is indefensible, and auditors invariably ask who holds it. Where it is granted, set an expiry and record what was done with it. Giving developers SAP_ALL in production is not acceptable practice.',
    },
  },
  {
    id: 'background-job',
    modules: ['BASIS'],
    ja: {
      term: 'バックグラウンドジョブ',
      reading: 'ばっくぐらうんどじょぶ',
      definition: '対話操作を伴わずに処理を実行する仕組み。SM36で定義し、SM37で監視する。ダイアログ処理の実行時間上限を回避でき、業務時間外に負荷を分散できる。ステータスが「完了」でも、プログラム内でエラーが発生している場合があるため、重要なジョブではジョブログやアプリケーションログまで確認する必要がある。',
    },
    en: {
      term: 'Background Job',
      definition: 'The mechanism for running processing without interactive input, defined in SM36 and monitored in SM37. It escapes the dialog runtime limit and lets heavy work run outside business hours. A status of finished only means the program did not terminate abnormally, so for important jobs the job log and application log need checking too.',
    },
  },
  {
    id: 'job-variant',
    modules: ['BASIS', 'ABAP'],
    ja: {
      term: 'バリアント',
      reading: 'ばりあんと',
      definition: 'プログラムの選択画面に入力する値を保存したもの。バックグラウンド実行では画面入力ができないため必須になる。固定の日付を入れると毎日実行するジョブでは翌日から正しく動かないが、選択変数の機能を使えば「実行日」「前月末」といった動的な値を設定できる。この機能を知らずに毎日手で修正している運用は珍しくない。',
    },
    en: {
      term: 'Variant',
      definition: 'A saved set of values for a program\'s selection screen, and a prerequisite for background execution since no one can type into the screen. A hard-coded date makes a daily job wrong from the second day, but selection variables allow dynamic values such as the run date or the previous month end. Manually editing variants each morning is a common and avoidable practice.',
    },
  },
  {
    id: 'spool-request',
    modules: ['BASIS'],
    ja: {
      term: 'スプール要求',
      reading: 'すぷーるようきゅう',
      definition: 'SAPの印刷は2段階で行われ、まず出力内容がスプール要求として保存され、次にそれが出力要求としてプリンタへ送られる。SP01で内容の表示とステータス確認ができる。印刷トラブルの調査は、スプールが作られているかを確認するところから始めると切り分けが速い。スプール番号には上限があるため、定期的な削除が必要。',
    },
    en: {
      term: 'Spool Request',
      definition: 'SAP printing happens in two stages: output is first stored as a spool request, then sent to a printer as an output request. SP01 displays the content and status. Starting a print investigation by checking whether a spool request exists narrows the problem quickly. Spool numbers have a ceiling, so periodic deletion is required.',
    },
  },
  {
    id: 'output-device',
    modules: ['BASIS'],
    ja: {
      term: '出力デバイス',
      reading: 'しゅつりょくでばいす',
      definition: 'SPADで登録するプリンタの定義。デバイスタイプ（機種に対応した制御データ）とアクセス方式（プリンタへの送信方法）を設定する。アクセス方式Fのフロントエンド印刷はSAP GUIが起動している必要があるため、バックグラウンドジョブからは使えない。夜間バッチで帳票を出力する場合はサーバ経由の方式を選ぶ必要がある。',
    },
    en: {
      term: 'Output Device',
      definition: 'A printer definition maintained in SPAD, combining a device type carrying the printer\'s control data with an access method describing how output reaches it. Front-end printing (access method F) requires a running SAP GUI and therefore cannot be used from a background job, so forms printed by overnight batches must use a server-based method.',
    },
  },
  {
    id: 'support-package',
    modules: ['BASIS'],
    ja: {
      term: 'サポートパッケージ',
      reading: 'さぽーとぱっけーじ',
      definition: '多数のSAP Noteによる修正をまとめたもの。SPAMトランザクションで適用する。適用の過程でモディフィケーション調整が必要になり、リポジトリオブジェクトはSPAU、ディクショナリオブジェクトはSPDDで対応する。SPDDは適用処理の途中で実行を求められ、誤るとテーブル定義が壊れてデータを失う可能性がある。',
    },
    en: {
      term: 'Support Package',
      definition: 'A collection of corrections bundled from many SAP Notes, applied through SPAM. Application requires modification adjustment: repository objects in SPAU and Dictionary objects in SPDD. SPDD is requested part-way through the import, and getting it wrong can damage table definitions and lose data.',
    },
  },
  {
    id: 'kernel',
    modules: ['BASIS'],
    ja: {
      term: 'カーネル',
      reading: 'かーねる',
      definition: 'SAPシステムの実行基盤となるプログラム群（実行ファイル）。ABAPコードではないため、SPAMではなくOSレベルでファイルを置き換えて更新する。データベースの内容を変更しないため、問題があれば旧バージョンに戻すだけで復旧できる。この特性から、サポートパッケージに比べて比較的リスクの低い作業とされる。',
    },
    en: {
      term: 'Kernel',
      definition: 'The executables that form the runtime foundation of an SAP system. Being outside ABAP, the kernel is updated by replacing files at the operating system level rather than through SPAM. Because it changes nothing in the database, backing out means restoring the previous version, which makes it lower risk than a support package — provided the old kernel was kept.',
    },
  },
  {
    id: 'sap-note',
    modules: ['BASIS'],
    ja: {
      term: 'SAP Note',
      reading: 'えすえーぴーのーと',
      definition: '個別の問題に対する情報と修正。SAPサポートポータルで番号により公開される。修正を含むNoteはSNOTEトランザクションで適用でき、前提となる他のNoteが必要な場合もある。適用するとSAP標準プログラムのソースが変更されるため「修正済み」として記録され、後のサポートパッケージ適用時にSPAUでの調整が必要になることがある。',
    },
    en: {
      term: 'SAP Note',
      definition: 'Information and corrections for a specific problem, published by number on the SAP support portal. Notes containing corrections are applied through SNOTE, sometimes requiring prerequisite Notes. Applying one modifies standard SAP source, so the objects are recorded as modified and may need adjusting in SPAU when a support package arrives later.',
    },
  },
  {
    id: 'profile-parameter',
    modules: ['BASIS'],
    ja: {
      term: 'プロファイルパラメータ',
      reading: 'ぷろふぁいるぱらめーた',
      definition: 'SAPシステムの動作を制御する設定値。RZ10で編集し、多くはシステム再起動で反映される。セキュリティに関わるものとして、login/min_password_lng（パスワード最小長）、login/fails_to_user_lock（ロックまでの失敗回数）、login/no_automatic_user_sapstar（SAP*の自動ログイン無効化）などがある。',
    },
    en: {
      term: 'Profile Parameter',
      definition: 'A configuration value governing system behaviour, edited in RZ10 and generally taking effect after a restart. Security-relevant examples include login/min_password_lng for minimum password length, login/fails_to_user_lock for the lockout threshold, and login/no_automatic_user_sapstar, which closes the SAP* emergency logon path.',
    },
  },
  {
    id: 'security-audit-log',
    modules: ['BASIS'],
    ja: {
      term: 'セキュリティ監査ログ',
      reading: 'せきゅりてぃかんさろぐ',
      definition: '重要な操作を記録する機能。SM19で記録対象を設定し、SM20で内容を確認する。ログオン失敗、特権ユーザーのログオン、ユーザーマスタの変更、RFC呼び出しなどを記録できる。既定では無効であり、パラメータ rsau/enable を有効にする必要がある。記録がなければ過去の事象を検証できないため、導入時に有効化しておくべき項目。',
    },
    en: {
      term: 'Security Audit Log',
      definition: 'The facility that records security-relevant events, configured in SM19 and read in SM20 — failed logons, privileged account use, user master changes and RFC calls among them. It is disabled by default and requires rsau/enable to be switched on. Without records nothing can be investigated after the fact, so it should be enabled at implementation.',
    },
  },
  {
    id: 'sap-star',
    modules: ['BASIS'],
    ja: {
      term: 'SAP*／DDIC（標準ユーザー）',
      reading: 'えすえーぴーすたー',
      definition: 'SAPインストール時に作成される既定パスワードを持つ標準ユーザー。SAP*は全権限を持つスーパーユーザー、DDICはディクショナリ管理とインストール・更新に使われる。SAP*を削除すると既定パスワードで自動ログインできてしまう緊急用の機能があるため、パラメータで無効化しないと削除がかえって脆弱性になる。',
    },
    en: {
      term: 'SAP* / DDIC (Standard Users)',
      definition: 'Default accounts created at installation with known passwords. SAP* is the superuser holding all authorisations; DDIC is used for Dictionary administration and for installation and upgrades. Deleting SAP* enables an emergency path allowing logon with the hard-coded default password, so unless that is disabled by parameter, deleting the account creates a vulnerability rather than closing one.',
    },
  },
  {
    id: 'sap-gateway-security',
    modules: ['BASIS'],
    ja: {
      term: 'SAPゲートウェイ（reginfo／secinfo）',
      reading: 'えすえーぴーげーとうぇい',
      definition: 'SAPゲートウェイは外部プログラムの登録を受け付ける仕組み。reginfoとsecinfoによるアクセス制限が設定されていないと、外部から任意のプログラムを登録されてシステムを操作される可能性がある。実際に攻撃事例が報告されている脆弱性であり、これらのファイルとパラメータの適切な設定は必須。',
    },
    en: {
      term: 'SAP Gateway (reginfo / secinfo)',
      definition: 'The SAP gateway accepts registration of external programs. Without the access restrictions defined in the reginfo and secinfo files, an attacker can register an arbitrary program and operate the system. This is a vulnerability with documented real-world exploitation, so configuring those files and the related parameters is not optional.',
    },
  },
  {
    id: 'snc',
    modules: ['BASIS'],
    ja: {
      term: 'SNC（Secure Network Communications）',
      reading: 'えすえぬしー',
      definition: 'SAP GUIとアプリケーションサーバの間の通信を暗号化する仕組み。既定の通信は暗号化されておらず、ネットワーク上でパスワードや業務データを傍受される可能性がある。シングルサインオンの実現にも使われる。ほかにSAP Routerによるアクセス制御、Web DispatcherによるSSL終端といった保護手段がある。',
    },
    en: {
      term: 'SNC (Secure Network Communications)',
      definition: 'The mechanism that encrypts traffic between the SAP GUI and the application server. Default communication is unencrypted, leaving passwords and business data readable on the network. SNC is also the basis for single sign-on. Related protections include access control through SAP Router and SSL termination at the Web Dispatcher.',
    },
  },
  {
    id: 'table-buffer',
    modules: ['BASIS', 'ABAP'],
    ja: {
      term: 'テーブルバッファリング',
      reading: 'てーぶるばっふぁりんぐ',
      definition: 'テーブルの内容をアプリケーションサーバのメモリに保持し、データベースアクセスを減らす仕組み。完全・汎用領域・単一レコードの3方式がある。更新頻度の高いテーブルをバッファリングすると、無効化と再読み込みが繰り返されてかえって遅くなるうえ、更新直後に古いデータが返ることがあるため、伝票データには使わない。ST02で使用状況を確認する。',
    },
    en: {
      term: 'Table Buffering',
      definition: 'Holding table contents in application server memory to reduce database access, available as full, generic-key or single-record buffering. Buffering a frequently updated table is counterproductive: invalidation and reload repeat continuously, and a read immediately after an update can return stale data, so transaction tables are left unbuffered. ST02 shows buffer usage.',
    },
  },
  {
    id: 'extended-memory',
    modules: ['BASIS'],
    ja: {
      term: '拡張メモリ／PRIVモード',
      reading: 'かくちょうめもり',
      definition: 'SAPのワークプロセスは、ロールエリア、拡張メモリ、ヒープメモリの順にメモリを使う。拡張メモリを使い切ってヒープメモリに移るとワークプロセスがPRIVモードとなり、特定のユーザーに占有されて他のユーザーが使えなくなる。PRIVプロセスが増えるとシステム全体のレスポンスが悪化するため、SM50で監視し原因プログラムを特定する。',
    },
    en: {
      term: 'Extended Memory / PRIV Mode',
      definition: 'An SAP work process consumes memory in order: roll area, extended memory, then heap. Exhausting extended memory and moving into heap puts the process into PRIV mode, where it is reserved for one user and unavailable to anyone else. Accumulating PRIV processes degrades response across the system, so SM50 is monitored and the offending program identified.',
    },
  },
  {
    id: 'sql-trace',
    modules: ['BASIS', 'ABAP'],
    ja: {
      term: 'SQLトレース（ST05）',
      reading: 'えすきゅーえるとれーす',
      definition: '実行されたSQLとその所要時間を記録する性能分析ツール。性能問題の大半はデータベースアクセスに起因するため、ST03で処理時間の内訳を見てDB時間の割合が高いトランザクションを特定し、ST05でどのSQLが遅いかを調べるのが定石。多くの場合、インデックスが効いていないSELECTかループ内のSELECTが原因となる。',
    },
    en: {
      term: 'SQL Trace (ST05)',
      definition: 'The performance tool that records executed SQL statements and their durations. Since most performance problems originate in the database, the usual approach is to find transactions with high database time in ST03 and then trace them in ST05. The culprit is normally a SELECT that misses its index or one placed inside a loop.',
    },
  },
  {
    id: 'sap-hana',
    modules: ['BASIS'],
    ja: {
      term: 'SAP HANA',
      reading: 'えすえーぴーはな',
      definition: 'SAPのインメモリデータベース。データをメモリ上に列指向で保持することで、集計処理を高速に実行できる。従来のように大量データをアプリケーションサーバへ持ってきてから加工するのではなく、処理をデータベース側で行う「コードプッシュダウン」の設計が推奨される。S/4HANAはHANAを前提とした業務スイート。',
    },
    en: {
      term: 'SAP HANA',
      definition: 'SAP\'s in-memory database, holding data in memory in column-oriented form so that aggregation runs quickly. It favours code pushdown — performing calculation in the database rather than pulling large volumes to the application server — as the preferred design. S/4HANA is the business suite built on it.',
    },
  },
  {
    id: 's4hana',
    modules: ['BASIS', 'FI', 'CO'],
    ja: {
      term: 'SAP S/4HANA',
      reading: 'えすふぉーはな',
      definition: 'SAP HANAを前提とした次世代の業務スイート。会計データがACDOCA（ユニバーサルジャーナル）に統合されFI/CO差異が構造的に解消された、仕入先と得意先のマスタがビジネスパートナに一本化された、在庫の集計テーブルが廃止され明細から都度集計される、といった変更がある。UIはFioriが標準となる。',
    },
    en: {
      term: 'SAP S/4HANA',
      definition: 'The business suite built on SAP HANA. Among its structural changes: accounting data is consolidated into ACDOCA, the Universal Journal, which eliminates FI/CO reconciliation differences; vendor and customer masters merge into the Business Partner; and aggregate inventory tables are removed in favour of deriving totals from line items. Fiori becomes the standard user interface.',
    },
  },
  {
    id: 'sap-fiori',
    modules: ['BASIS'],
    ja: {
      term: 'SAP Fiori',
      reading: 'えすえーぴーふぃおり',
      definition: 'SAPのWebベースのユーザーインタフェース。役割ごとにタイルを並べたランチパッドから、業務単位のアプリを起動する。従来のSAP GUIによるトランザクション画面と比べ、モバイル対応と操作性が改善されている。バックエンドとの通信にはODataを使い、S/4HANAでは標準のUIとして位置づけられている。',
    },
    en: {
      term: 'SAP Fiori',
      definition: 'SAP\'s web-based user interface, where role-based tiles on a launchpad open task-oriented applications. Compared with classic GUI transactions it improves usability and works on mobile devices. It communicates with the backend over OData and is the standard interface in S/4HANA.',
    },
  },
  {
    id: 'business-partner',
    modules: ['BASIS', 'FI', 'SD', 'MM'],
    ja: {
      term: 'ビジネスパートナ（BP）',
      reading: 'びじねすぱーとな',
      definition: 'S/4HANAで導入された、取引先マスタの統合された管理単位。従来は仕入先マスタ（XK01）と得意先マスタ（XD01）を別々に維持する必要があったが、BPでは1つのレコードに「仕入先」「得意先」といった役割を複数持たせられる。ECCからの移行では、既存マスタのBPへの変換作業が必要になる。',
    },
    en: {
      term: 'Business Partner (BP)',
      definition: 'The unified master record for trading partners introduced in S/4HANA. Where ECC required separate vendor and customer masters, one Business Partner record carries multiple roles, which simplifies handling of partners that both supply and buy. Migrating from ECC involves converting the existing masters into Business Partners.',
    },
  },
  {
    id: 'archiving',
    modules: ['BASIS'],
    ja: {
      term: 'データアーカイブ',
      reading: 'でーたあーかいぶ',
      definition: '古い伝票データをデータベースから外部ストレージへ退避する仕組み。テーブルが肥大化すると検索性能が低下し、バックアップやアップグレードの所要時間も増えるため、一定期間を過ぎたデータを対象に実行する。アーカイブしたデータは参照できるが更新はできない。法定保存期間との整合を確認したうえで計画する必要がある。',
    },
    en: {
      term: 'Data Archiving',
      definition: 'Moving older transactional data out of the database into external storage. Bloated tables degrade query performance and lengthen backups and upgrades, so data past a defined age is archived. Archived data remains readable but cannot be changed, and the retention plan has to be reconciled with statutory record-keeping requirements.',
    },
  },

  // ─── PS ──────────────────────────────────────────────────────
  {
    id: 'project-system',
    modules: ['PS'],
    ja: {
      term: 'PS（プロジェクト管理）',
      reading: 'ぴーえす',
      definition: 'Project System。始まりと終わりがある活動を、原価・日程・進捗の3軸で管理するモジュール。プラント建設、設備投資、研究開発、大規模修繕などを扱う。PS自体が何かを実行するというより、MM・CO・SD・FIなど各モジュールの活動をプロジェクトという軸で束ねる結節点として機能する。',
    },
    en: {
      term: 'PS (Project System)',
      definition: 'The module for managing activities with a defined beginning and end along three axes: cost, schedule and progress. It covers plant construction, capital investment, research and development and major maintenance. PS executes little itself; it acts as the junction that gathers activity from MM, CO, SD and FI under a single project.',
    },
  },
  {
    id: 'wbs',
    modules: ['PS'],
    ja: {
      term: 'WBS（作業分解構造）',
      reading: 'だぶりゅーびーえす',
      definition: 'Work Breakdown Structure。プロジェクトを階層的に分解した構造で、PSにおける原価管理の骨格。原価は下位のWBS要素に転記され、上位へ自動的に積み上がる。技術的には多階層にできるが、深くするほど登録と管理の手間が増えるため、実務では3〜4階層程度に収めるのが現実的とされる。',
    },
    en: {
      term: 'WBS (Work Breakdown Structure)',
      definition: 'The hierarchical decomposition of a project and the skeleton of cost management in PS. Cost posts to lower elements and rolls up automatically. Deep hierarchies are technically possible but multiply the effort of creating and maintaining them, so three or four levels is the practical limit.',
    },
  },
  {
    id: 'wbs-element',
    modules: ['PS'],
    ja: {
      term: 'WBS要素',
      reading: 'だぶりゅーびーえすようそ',
      definition: 'WBS階層を構成する個々の作業単位で、原価の受け皿となるオブジェクト。勘定設定要素（原価を直接受け止められる）、請求要素（収益を受け止められる）、計画要素（原価計画を入力できる）という3つの指標を持ち、設計上は階層のレベルごとに役割を分けるのが一般的。原価が転記されたWBS要素は削除できない。',
    },
    en: {
      term: 'WBS Element',
      definition: 'An individual node of the WBS hierarchy and the object that collects cost. Three operative indicators govern what it can do: account assignment element to receive cost directly, billing element to receive revenue, and planning element to hold planned cost. Designs typically assign these by level. An element with postings against it cannot be deleted.',
    },
  },
  {
    id: 'project-definition',
    modules: ['PS'],
    ja: {
      term: 'プロジェクト定義',
      reading: 'ぷろじぇくとていぎ',
      definition: 'プロジェクト全体を表す最上位のオブジェクト。責任者、期間、会社コード、管理領域、プロジェクトプロファイルなどを保持し、その内容が配下のWBS要素の初期値として引き継がれる。プロジェクト定義自体には原価は集計されず、原価を受け止めるのはWBS要素。CJ20N（プロジェクトビルダ）で作成・編集する。',
    },
    en: {
      term: 'Project Definition',
      definition: 'The top-level object representing a project as a whole, holding the person responsible, the period, the company code, the controlling area and the project profile, all of which default down to its WBS elements. It collects no cost itself — that is the role of WBS elements. It is created and maintained in the Project Builder (CJ20N).',
    },
  },
  {
    id: 'project-profile',
    modules: ['PS'],
    ja: {
      term: 'プロジェクトプロファイル',
      reading: 'ぷろじぇくとぷろふぁいる',
      definition: 'プロジェクトの振る舞いを決める設定の集合。計画プロファイル、予算プロファイル、決済プロファイル、ステータスプロファイル、組織単位の既定値などを規定する。プロジェクト作成後の変更は原則としてできないため、「設備投資用」「受注案件用」のように用途ごとに用意し、作成時に正しく選ぶ運用が必要。',
    },
    en: {
      term: 'Project Profile',
      definition: 'The bundle of settings governing how a project behaves, covering the planning, budget, settlement and status profiles along with organisational defaults. It generally cannot be changed once the project exists, so profiles are prepared per purpose — capital investment, customer contracts, internal work — and chosen correctly at creation.',
    },
  },
  {
    id: 'ps-network',
    modules: ['PS'],
    ja: {
      term: 'ネットワーク（PS）',
      reading: 'ねっとわーく',
      definition: 'プロジェクトの作業を「活動」という単位に分け、その順序関係を定義した構造。WBSが原価の器であるのに対し、ネットワークは日程と実行の器。活動には資材を割り当てられ、日程にもとづいてMRPの所要量となる。外部処理活動を作成すると購買依頼が自動生成され、日程計画と調達が連動する。',
    },
    en: {
      term: 'Network (PS)',
      definition: 'The structure that breaks project work into activities and defines the dependencies between them. Where the WBS is a container for cost, the network is a container for schedule and execution. Materials assigned to activities become MRP requirements dated from the schedule, and external processing activities generate purchase requisitions automatically.',
    },
  },
  {
    id: 'ps-activity',
    modules: ['PS'],
    ja: {
      term: '活動（Activity）',
      reading: 'かつどう',
      definition: 'ネットワーク内の作業単位。内部処理活動（自社の要員・設備で行う）、外部処理活動（外注する。購買依頼が自動生成される）、サービス活動、原価活動のカテゴリがある。活動どうしは関係（Relationship）で順序づけられ、終了・開始（FS）が最も多く使われる。',
    },
    en: {
      term: 'Activity',
      definition: 'A unit of work within a network. Categories include internal processing performed by own staff and equipment, external processing that generates a purchase requisition, service activities, and cost activities. Activities are sequenced by relationships, of which finish-to-start is by far the most common.',
    },
  },
  {
    id: 'critical-path',
    modules: ['PS'],
    ja: {
      term: 'クリティカルパス',
      reading: 'くりてぃかるぱす',
      definition: 'ネットワークのスケジューリングで算出されるフロート（余裕）がゼロの活動の連なり。この経路上の活動が1日遅れれば、プロジェクト全体が1日遅れる。日程管理ではこの経路を重点的に監視する。ただし各活動の所要期間の見積もりにもとづいて計算されるため、見積もりが実態と乖離していれば算出される経路も現実を反映しない。',
    },
    en: {
      term: 'Critical Path',
      definition: 'The chain of activities with zero float produced by network scheduling: a day lost on it is a day lost on the project, which makes it the focus of schedule management. It is computed from estimated durations, so estimates detached from reality produce a path detached from reality.',
    },
  },
  {
    id: 'milestone',
    modules: ['PS'],
    ja: {
      term: 'マイルストーン',
      reading: 'まいるすとーん',
      definition: 'プロジェクトの節目を表すオブジェクト。WBS要素にも活動にも設定できる。進捗の可視化、進捗率の算定基準、達成時に他の活動を自動的にリリースするトリガ機能に使われる。SDと連携したマイルストーン請求では、「設計完了時に30%、製作完了時に40%」といった請求条件を表現でき、達成すると請求ブロックが自動的に解除される。',
    },
    en: {
      term: 'Milestone',
      definition: 'An object marking a significant point in a project, attachable to WBS elements or activities. It makes progress visible, serves as a basis for percentage of completion, and can trigger the release of other activities. Integrated with SD, milestone billing expresses terms such as thirty per cent on design completion, releasing the billing block as each is achieved.',
    },
  },
  {
    id: 'project-stock',
    modules: ['PS', 'MM'],
    ja: {
      term: 'プロジェクト在庫',
      reading: 'ぷろじぇくとざいこ',
      definition: 'WBS要素に紐づいた特殊在庫。そのプロジェクトでのみ消費でき、他の用途には使えない。長期の工事案件で特殊な資材を早めに調達する場合、通常在庫にすると他のプロジェクトや生産に使われる可能性があるため、確保を保証する目的で用いる。在庫の評価もプロジェクト単位で行われる。',
    },
    en: {
      term: 'Project Stock',
      definition: 'Special stock tied to a WBS element, consumable only by that project. Where a long contract requires unusual materials to be ordered early, holding them as ordinary stock risks their being consumed elsewhere; project stock reserves them. Valuation is also performed per project.',
    },
  },
  {
    id: 'commitment',
    modules: ['PS', 'CO'],
    ja: {
      term: 'コミットメント',
      reading: 'こみっとめんと',
      definition: 'まだ費用にはなっていないが、支出が確定している金額。購買依頼を作った時点で発生し、入庫して実績原価になると同時に消滅する。予算との比較では実績原価だけを見ていると発注済みで未計上の金額が見えず、予算超過に気づくのが遅れるため、実績とコミットメントを合わせた「割当額」を予算と比較するのが基本。',
    },
    en: {
      term: 'Commitment',
      definition: 'An amount not yet expensed but already committed to be spent. It arises when a purchase requisition is created and clears when goods are received and actual cost is posted. Comparing only actual cost against budget hides ordered-but-unreceived amounts and discovers overruns late, so budget is compared against assigned value — actual plus commitment.',
    },
  },
  {
    id: 'availability-control',
    modules: ['PS', 'CO'],
    ja: {
      term: '可用性コントロール',
      reading: 'かようせいこんとろーる',
      definition: '予算の超過を検知して処理を止める仕組み。割当額（実績原価＋コミットメント）が予算に近づくと、許容度限界の設定に応じて警告やエラーを発生させる。使用率80%で警告、100%でエラーといった段階的な設定が現実的。予算を入力しただけでは働かず、予算プロファイルでの有効化とCJBVでの活性化が必要。',
    },
    en: {
      term: 'Availability Control',
      definition: 'The mechanism that detects budget overruns and blocks transactions. As assigned value — actual cost plus commitments — approaches the budget, configured tolerance limits raise warnings or errors, typically graduated such as a warning at eighty per cent and an error at a hundred. Entering a budget alone does not enable it; it must be switched on in the budget profile and activated with CJBV.',
    },
  },
  {
    id: 'settlement',
    modules: ['PS', 'CO'],
    ja: {
      term: '決済（Settlement）',
      reading: 'けっさい',
      definition: 'プロジェクトや内部指図に集まった原価を、最終的な帰属先へ振り替える処理。プロジェクトは原価を一時的に受け止める器であり、そこに置いたままにするのが目的ではない。決済先は固定資産、原価センタ、総勘定元帳勘定、収益性セグメント、販売伝票など。決済ルールが設定されていないオブジェクトは決済実行時にエラーとなる。',
    },
    en: {
      term: 'Settlement',
      definition: 'Moving cost collected on a project or internal order to where it finally belongs; the collector is a temporary container, not a resting place. Receivers include fixed assets, cost centres, G/L accounts, profitability segments and sales documents. An object without a settlement rule causes the settlement run to fail.',
    },
  },
  {
    id: 'settlement-rule',
    modules: ['PS', 'CO'],
    ja: {
      term: '決済ルール／決済プロファイル',
      reading: 'けっさいるーる',
      definition: '決済の設定は2階層で行われる。決済プロファイルはプロジェクトプロファイル経由で設定され、どの決済先が許可されるかという枠を定める。決済ルールは各WBS要素や指図に設定し、実際の振替先と配分比率を指定する。決済ルールの設定漏れは決算処理を止めるため、テンプレートからの継承やリリース時のチェックを仕組み化しておくと安定する。',
    },
    en: {
      term: 'Settlement Rule / Settlement Profile',
      definition: 'Settlement is configured in two layers. The settlement profile, reached through the project profile, defines which receivers are permitted. The settlement rule, held on each WBS element or order, names the actual receiver and the split. A missing rule stops the period-end run, so inheriting rules from templates or checking for them at release keeps closing predictable.',
    },
  },
  {
    id: 'auc',
    modules: ['PS', 'FI'],
    ja: {
      term: '建設仮勘定（AuC）',
      reading: 'けんせつかりかんじょう',
      definition: 'Assets under Construction。建設中の設備にかかった原価を計上する中間的な資産勘定。完成するまで減価償却の対象にならず、費用としても処理できないためこの勘定を用いる。設備投資プロジェクトでは、毎期末にAuCへ決済し、完成時に建物や機械装置といった本来の資産勘定へ振り替えて減価償却を開始する。',
    },
    en: {
      term: 'Assets under Construction (AuC)',
      definition: 'The interim asset account carrying cost incurred on equipment still being built. Such cost cannot be depreciated yet and is not an expense either, hence the intermediate account. Capital projects settle to AuC at each period end and transfer to the real asset account on completion, at which point depreciation begins.',
    },
  },
  {
    id: 'results-analysis',
    modules: ['PS', 'CO'],
    ja: {
      term: '結果分析',
      reading: 'けっかぶんせき',
      definition: '期をまたぐ長期プロジェクトで、収益と原価の対応を適正化するための計算。「原価は発生しているが未請求」の分を仕掛品として資産計上し、「請求済みだが原価未発生」の分を前受金として負債計上する。工事進行基準による収益認識ではこれが計算の基礎となる。計算方法は結果分析キーで制御し、会計方針に合わせて設定する。',
    },
    en: {
      term: 'Results Analysis',
      definition: 'The calculation that aligns revenue and cost on long projects spanning several periods. Cost incurred but not yet billed becomes work in process on the balance sheet; amounts billed ahead of cost become deferred revenue. It underpins percentage-of-completion revenue recognition, and the method is governed by the results analysis key, set to match the accounting policy.',
    },
  },
  {
    id: 'evm',
    modules: ['PS'],
    ja: {
      term: 'EVM（アーンドバリューマネジメント）',
      reading: 'いーぶいえむ',
      definition: '原価と進捗を統合して評価する手法。計画価値（PV）、出来高（EV）、実績原価（AC）を比較し、コスト差異（EV−AC）とスケジュール差異（EV−PV）、およびCPI（EV÷AC）とSPI（EV÷PV）を算出する。出来高は進捗率にもとづくため、進捗率が主観的な申告であればEVMの数値も主観的なものになる点に注意が必要。',
    },
    en: {
      term: 'Earned Value Management (EVM)',
      definition: 'A method that evaluates cost and progress together by comparing planned value, earned value and actual cost, producing cost and schedule variances and the CPI and SPI indices. Earned value derives from percentage complete, so where progress is a subjective claim the whole analysis inherits that subjectivity.',
    },
  },
  {
    id: 'cats',
    modules: ['PS', 'CO'],
    ja: {
      term: 'CATS（工数入力システム）',
      reading: 'きゃっつ',
      definition: 'Cross-Application Time Sheet。担当者が複数のプロジェクトや原価センタに対する工数を自分で入力する仕組み。承認ワークフローを経て、PS、CO、HRへ転記される。人件費の比重が大きいプロジェクトでは実績精度を大きく左右する。入力の手間を減らす工夫と、データを現場にフィードバックする運用が精度を保つ鍵になる。',
    },
    en: {
      term: 'CATS (Cross-Application Time Sheet)',
      definition: 'The facility through which staff record their own time against projects and cost centres, posting to PS, CO and HR after approval. On labour-intensive projects it largely determines how accurate actuals are. Keeping entry quick and feeding the resulting data back to the people who enter it is what sustains that accuracy.',
    },
  },
  {
    id: 'user-status',
    modules: ['PS', 'CO'],
    ja: {
      term: 'ユーザーステータス',
      reading: 'ゆーざーすてーたす',
      definition: 'SAP標準のシステムステータスとは別に、導入企業が独自に定義できるステータス。ステータスプロファイル（OK02）で定義し、各ステータスに対して許可・禁止する業務を指定できるため、単なるラベルではなく実際に業務を制御する仕組みとして機能する。最小・最大ステータス番号により遷移の順序を強制でき、承認プロセスを飛ばせないようにできる。',
    },
    en: {
      term: 'User Status',
      definition: 'A status defined by the implementing organisation alongside SAP\'s fixed system statuses. Defined in a status profile (OK02), each status can permit or forbid specific business transactions, which makes it a real control rather than a label. Lowest and highest status numbers enforce the order of transitions, so an approval step cannot be skipped.',
    },
  },
  {
    id: 'system-status',
    modules: ['PS', 'PP', 'CO'],
    ja: {
      term: 'システムステータス',
      reading: 'しすてむすてーたす',
      definition: 'SAPが標準で定義しているステータスで、挙動が固定されている。作成済（CRTD）では実績を転記できず、解放（REL）してはじめて実行が可能になる。技術的完了（TECO）では残りの所要量が消え、完了（CLSD）では一切の転記ができなくなる。RELは取り消せないため、本番環境での解放は範囲を確認してから行う必要がある。',
    },
    en: {
      term: 'System Status',
      definition: 'A status predefined by SAP with fixed behaviour. Nothing posts to an object still in created status; release makes execution possible. Technical completion removes outstanding requirements, and closing blocks all further postings. Release cannot be undone, so its scope should be confirmed before performing it in production.',
    },
  },
  {
    id: 'coding-mask',
    modules: ['PS'],
    ja: {
      term: 'コーディングマスク',
      reading: 'こーでぃんぐますく',
      definition: 'プロジェクト番号の書式を定義する仕組み（OPSJ）。区切り文字によって階層を番号自体に埋め込めるため、番号を見るだけでどのレベルの要素かが分かる。桁数が足りないとプロジェクトが増えたときに採番できなくなり、長すぎると入力が煩雑になる。稼働後の変更は既存プロジェクトに影響するため、導入時に慎重な設計が必要。',
    },
    en: {
      term: 'Coding Mask',
      definition: 'The definition of the format for project numbers (OPSJ). Separators embed the hierarchy in the number itself, so the level of an element is visible from its identifier. Too few digits exhausts the numbering as projects accumulate; too many makes entry tedious. Changing it after go-live affects every existing project, so it warrants care at design time.',
    },
  },
  {
    id: 'progress-analysis',
    modules: ['PS'],
    ja: {
      term: '進捗分析',
      reading: 'しんちょくぶんせき',
      definition: 'プロジェクトの進捗率を算定する機能。原価の消化率だけでは実際の進み具合が分からないため用いる。算定方法には原価比例法、マイルストーン法、0-100法、見積法、数量比例法がある。主観的な見積法では「90%完了」が長く続くいわゆる90%シンドロームが生じやすく、マイルストーン法や0-100法のほうが客観性が高い。',
    },
    en: {
      term: 'Progress Analysis',
      definition: 'The determination of percentage complete, needed because cost consumption alone says little about actual progress. Methods include cost proportional, milestone, 0-100, estimate and quantity proportional. Subjective estimation produces the familiar pattern of a task sitting at ninety per cent for weeks; milestone and 0-100 methods are more objective.',
    },
  },
  {
    id: 'standard-wbs',
    modules: ['PS'],
    ja: {
      term: '標準WBS／標準ネットワーク',
      reading: 'ひょうじゅんだぶりゅーびーえす',
      definition: '繰り返し実施するプロジェクトのためのテンプレート。これらから新しいプロジェクトを生成することで、構造の作成漏れを防ぎ、原価集計の粒度を組織全体で統一できる。工事案件や定期修繕のように同じパターンを繰り返す業務で特に有効であり、決済ルールなどの設定も継承させられる。',
    },
    en: {
      term: 'Standard WBS / Standard Network',
      definition: 'Templates for projects that recur. Generating a new project from one prevents parts of the structure being forgotten and keeps cost collection at a consistent granularity across the organisation. They are particularly valuable for construction contracts and scheduled maintenance, and settings such as settlement rules can be inherited with them.',
    },
  },
];
