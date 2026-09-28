import type { GlossaryTerm } from './glossary';

/**
 * Fourth expansion of the glossary: terms the columns explain in passing but
 * the dictionary did not yet have, so readers who search one land on it and
 * the column pages can link each term to its entry.
 */
export const columnTerms: GlossaryTerm[] = [
  // ─── FI ───
  {
    id: 'automatic-clearing',
    modules: ['FI'],
    ja: {
      term: '自動消込',
      reading: 'じどうけしこみ',
      definition: '得意先・仕入先・総勘定元帳の未決済明細を、決めた条件でグループに分け、グループの残高がゼロになったものをまとめて消し込む処理。トランザクションはF.13。グループ分けの追加条件はOB74で勘定ごとに最大5つ指定でき、ソートキーなどを使う。金額が同じでも条件の値が違うと別のグループになり、消し込まれない。',
    },
    en: {
      term: 'Automatic Clearing',
      definition: 'A run (transaction F.13) that sorts open items of customers, vendors or G/L accounts into groups by set criteria and clears every group whose balance is zero. Up to five extra grouping criteria per account range are defined in OB74, typically the assignment field. Items with the same amount stay open if a criterion differs.',
    },
  },
  {
    id: 'assignment-zuonr',
    modules: ['FI'],
    ja: {
      term: 'ソートキー（ZUONR）',
      reading: 'そーときー',
      definition: '会計伝票の明細ごとに持てる文字項目。英語の画面ではAssignmentと表示されるため「割当」とも呼ばれる。請求書番号など、明細を突き合わせるための値を入れることが多く、明細照会での並べ替えや自動消込の条件に使う。得意先・仕入先・勘定のマスタにある「ソートキー」の設定で、入れる値を自動で決められる。',
    },
    en: {
      term: 'Assignment (ZUONR)',
      definition: 'A free text field on each accounting line item, often holding an invoice number or other matching reference. It drives sorting in line item displays and is a common automatic clearing criterion. The sort key on the customer, vendor or G/L master decides what the system fills in automatically.',
    },
  },
  {
    id: 'tolerance',
    modules: ['FI'],
    ja: {
      term: '許容差異',
      reading: 'きょようさい',
      definition: '入金や支払の消込で、差額をどこまで自動で処理してよいかの上限。金額と割合で決め、担当者ごと（従業員の許容差異グループ）と、得意先・仕入先ごとに設定する。差額が範囲内なら損益などへ自動で転記して消し込み、範囲を超えると一部入金や残額処理として扱う。',
    },
    en: {
      term: 'Tolerance',
      definition: 'The limit, in amount and percentage, up to which a payment difference may be written off automatically when clearing. It is set per employee tolerance group and per customer or vendor. Differences inside the limit are posted to profit and loss; larger ones become partial payments or residual items.',
    },
  },
  {
    id: 'business-area',
    modules: ['FI'],
    ja: {
      term: '事業領域（GSBER）',
      reading: 'じぎょうりょういき',
      definition: '会社コードをまたいで、事業の単位で損益や残高を分けるための組織の項目。会計伝票の明細に持ち、事業領域別の財務諸表を作れる。S/4HANAでは、セグメントや利益センタで同じ目的を果たすことが多いが、既存の会社では引き続き使われている。自動消込の条件にも使える。',
    },
    en: {
      term: 'Business Area (GSBER)',
      definition: 'An organizational field on accounting line items that splits profit and balances by line of business, across company codes, so that business-area financial statements can be drawn up. In S/4HANA segments or profit centers often serve the same purpose, but many existing companies still use it.',
    },
  },
  {
    id: 'reference-key-awkey',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: '参照キー（AWKEY）',
      reading: 'さんしょうきー',
      definition: '会計伝票ヘッダ（BKPF）の項目で、その会計伝票を作った元の伝票の番号を持つ。元の伝票の種類は参照取引（AWTYP）に入り、請求ならVBRK、入出庫伝票ならMKPF、請求書照合ならRMRP。請求なら請求の番号、入出庫伝票なら番号と会計年度をつなげた値が入る。元の伝票から会計伝票を探すときに使う。',
    },
    en: {
      term: 'Reference Key (AWKEY)',
      definition: 'A field on the accounting document header (BKPF) holding the number of the document that created it. The reference transaction (AWTYP) names that document type: VBRK for billing, MKPF for material documents, RMRP for logistics invoices. It is how you find the accounting document for a billing or goods movement.',
    },
  },
  {
    id: 'extended-withholding-tax',
    modules: ['FI'],
    ja: {
      term: '拡張源泉徴収税',
      reading: 'かくちょうげんせんちょうしゅうぜい',
      definition: '源泉徴収税を、請求書の転記時または支払の転記時に自動で計算して転記するSAPの機能。計算のルールを決める源泉徴収税タイプと、税率を決める源泉徴収税コードに分かれ、1つの明細に複数のタイプを持てる。S/4HANAではこちらを使う。日本の報酬・料金の源泉徴収は、支払時に計算する方式で考えるのが一般的。',
    },
    en: {
      term: 'Extended Withholding Tax',
      definition: 'The SAP function that calculates and posts withholding tax automatically at invoice or at payment. Rules are set in withholding tax types and rates in withholding tax codes, and one line item can carry several types. S/4HANA uses this function. For Japanese fees, tax is normally calculated at payment.',
    },
  },
  {
    id: 'withholding-tax-type-code',
    modules: ['FI'],
    ja: {
      term: '源泉徴収税タイプ／源泉徴収税コード',
      reading: 'げんせんちょうしゅうぜいたいぷ',
      definition: '拡張源泉徴収税の2つの設定。源泉徴収税タイプは、いつ計算するか（請求書か支払か）、何を基準額にするか、端数をどう処理するかを決める。源泉徴収税コードは、タイプごとの税率を決め、金額の範囲で税率を変える計算式を使う指定もできる。仕入先（BP）の会社コードデータに、使うタイプとコードを登録する。',
    },
    en: {
      term: 'Withholding Tax Type / Withholding Tax Code',
      definition: 'The two settings of extended withholding tax. The type decides when tax is calculated (invoice or payment), what the base amount is and how amounts are rounded. The code sets the rate for a type and can switch to a formula whose rates vary by amount. Both are assigned on the vendor (BP) company code data.',
    },
  },
  {
    id: 'tax-classification',
    modules: ['SD', 'FI'],
    ja: {
      term: '税分類（得意先税分類・品目税分類）',
      reading: 'ぜいぶんるい',
      definition: '販売で税コードを自動で決めるために、マスタに持たせる税の区分。得意先税分類は課税か免税かなどをBPの販売エリアデータに、品目税分類は標準税率・軽減税率・非課税などを品目マスタの販売データに登録する。受注では2つの組み合わせで条件レコードを探し、税コードを決める。',
    },
    en: {
      term: 'Tax Classification (customer and material)',
      definition: 'Tax categories held on master data so that sales can determine the tax code. The customer tax classification (taxable, exempt and so on) sits on the BP sales area data; the material tax classification (standard, reduced, non-taxable) on the material sales data. The pair is looked up in condition records to find the tax code.',
    },
  },

  // ─── BP ───
  {
    id: 'bp-role',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: 'BPロール',
      reading: 'びーぴーろーる',
      definition: 'ビジネスパートナ（BP）を、どの業務で使うかを表す区分。得意先として会計で使うならFLCU00、販売で使うならFLCU01、仕入先として会計で使うならFLVN00、購買で使うならFLVN01のように付け、1つのBPに複数のロールを持てる。付けたロールによって、入力できる画面と項目が変わる。',
    },
    en: {
      term: 'BP Role',
      definition: 'Indicates which business processes a business partner is used in, for example FLCU00 (customer in accounting), FLCU01 (customer in sales), FLVN00 (vendor in accounting) and FLVN01 (vendor in purchasing). One BP can hold several roles, and the roles decide which screens and fields can be maintained.',
    },
  },
  {
    id: 'bp-grouping',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: 'BPグルーピング',
      reading: 'びーぴーぐるーぴんぐ',
      definition: 'BPの番号範囲を決める区分。BPを登録するときに選び、内部採番か外部採番か、どの範囲の番号を使うかが決まる。得意先・仕入先と同期させる（CVI）場合は、BPグルーピングと得意先・仕入先の勘定グループの対応を設定しておく必要があり、ここが漏れると登録時にエラーになる。',
    },
    en: {
      term: 'BP Grouping',
      definition: 'Chosen when a business partner is created, it decides the number range and whether numbers are internal or external. When BPs are synchronized with customers and vendors (CVI), each grouping must be mapped to a customer or vendor account group, or creation fails.',
    },
  },
  {
    id: 'bp-category',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: 'BPカテゴリ',
      reading: 'びーぴーかてごり',
      definition: 'BPが組織か、個人か、グループかの別。カテゴリによって名前や住所の入力項目が変わる。BPを登録するときに選び、登録後は変更できない。法人の取引先は組織、個人事業主への支払などでは個人を選ぶのが一般的。',
    },
    en: {
      term: 'BP Category',
      definition: 'Whether a business partner is an organization, a person or a group. It changes the name and address fields and cannot be changed after the BP is created. Companies are usually organizations; payees who are individuals are persons.',
    },
  },
  {
    id: 'cvi',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: 'CVI（得意先・仕入先統合）',
      reading: 'しーぶいあい',
      definition: 'Customer Vendor Integrationの略。S/4HANAで、ビジネスパートナ（BP）と得意先マスタ・仕入先マスタを同期させる仕組み。BPを登録すると、対応する得意先や仕入先が自動で作られる。BPグルーピングと勘定グループの対応、番号範囲などの設定がそろっていないと、BPの登録や移行でエラーになる。',
    },
    en: {
      term: 'CVI (Customer Vendor Integration)',
      definition: 'The mechanism in S/4HANA that keeps business partners synchronized with customer and vendor master records: creating a BP creates the matching customer or vendor. Missing mappings between BP groupings and account groups, or mismatched number ranges, cause errors when BPs are created or migrated.',
    },
  },
  {
    id: 'account-group',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: '勘定グループ',
      reading: 'かんじょうぐるーぷ',
      definition: '得意先・仕入先の種類分け。番号範囲と、画面項目の必須・任意・非表示を決める。一般の得意先、一時得意先、出荷先だけの得意先のように分けて使う。S/4HANAではBPグルーピングと対応づけて、BPから得意先・仕入先を作るときに使われる。総勘定元帳の勘定グループは別のもの。',
    },
    en: {
      term: 'Account Group',
      definition: 'Classifies customers and vendors and controls their number range and which screen fields are required, optional or hidden, for example ordinary customers, one-time customers or ship-to parties. In S/4HANA it is mapped to a BP grouping. The G/L account group is a separate setting.',
    },
  },

  // ─── CO・PS ───
  {
    id: 'real-statistical-order',
    modules: ['CO'],
    ja: {
      term: '実指図／統計指図',
      reading: 'じつさしず',
      definition: '内部指図の2つの種類。実指図は原価を実際に負担し、期末に決済で原価センタや資産などへ振り替える。統計指図は原価を情報として記録するだけで、原価は同時に指定した原価センタが負担するため、決済は要らない。部門別の管理を変えずに、活動別の合計も見たいときは統計指図が向いている。',
    },
    en: {
      term: 'Real Order / Statistical Order',
      definition: 'The two kinds of internal order. A real order carries the cost and is settled at period end to cost centers, assets or other receivers. A statistical order only records cost for information while a cost center carries it, so no settlement is needed; it suits cases where totals by activity are wanted without changing cost center accounting.',
    },
  },
  {
    id: 'allocation-structure',
    modules: ['CO', 'PS'],
    ja: {
      term: '配分構造',
      reading: 'はいぶんこうぞう',
      definition: '決済のときに、どの原価要素を、どの決済用の原価要素にまとめて振り替えるかを決める設定（OKO6）。決済プロファイルの中で指定する。WBS要素や内部指図に計上された原価要素が配分構造に割り当てられていないと、決済でエラーKD503になる。原価要素を追加したら、配分構造への追加もあわせて行う。',
    },
    en: {
      term: 'Allocation Structure',
      definition: 'The setting (OKO6), named in the settlement profile, that maps the cost elements on a sender to the settlement cost elements used to credit it. A cost element posted to a WBS element or order but missing from the structure stops settlement with message KD503, so new cost elements must be added here too.',
    },
  },
  {
    id: 'investment-management',
    modules: ['CO', 'PS', 'FI'],
    ja: {
      term: '投資管理（IM）',
      reading: 'とうしかんり',
      definition: '設備投資の計画と予算を管理するSAPの機能。投資プログラムで投資の全体枠を管理し、個々の投資は内部指図やWBS要素で表す。投資プロファイルを使うと、内部指図やWBS要素に建設仮勘定（AuC）を自動で作り、期末に決済で振り替えられる。設備投資だからといってWBSが必要になるわけではない。',
    },
    en: {
      term: 'Investment Management (IM)',
      definition: 'The SAP function for planning and budgeting capital spending. Investment programs hold the overall budget, and individual measures are internal orders or WBS elements. With an investment profile, an asset under construction is created for the order or WBS element and costs are settled to it at period end, so an investment does not by itself call for a WBS.',
    },
  },
  {
    id: 'co-period-lock',
    modules: ['CO'],
    ja: {
      term: 'CO期間ロック',
      reading: 'しーおーきかんろっく',
      definition: '管理領域・会計年度・期間ごとに、COの処理を止める設定（OKP1）。決済・配賦・活動配分など、業務取引の単位でロックできる。月次決算で処理を締めるために使い、ロック中の期間では該当する処理がエラーになる。FIの転記期間（OB52）とは別に管理する。',
    },
    en: {
      term: 'CO Period Lock',
      definition: 'The setting (OKP1) that blocks CO transactions per controlling area, fiscal year and period, one business transaction at a time, such as settlement, assessment or activity allocation. It is used to close periods, and it is managed separately from the FI posting periods in OB52.',
    },
  },
  {
    id: 'marking-allowance',
    modules: ['CO'],
    ja: {
      term: 'マーク許可',
      reading: 'まーくきょか',
      definition: '標準原価計算で、会社コードと期間に対して、どの原価計算バリアントと評価ビューの結果をマークしてよいかを決める手続き（CK24のマーク許可）。マークとリリースの前提になる。ユーザの権限とは別のもので、権限があってもマーク許可がないとマークできない。',
    },
    en: {
      term: 'Marking Allowance',
      definition: 'In standard costing, the step in CK24 that states, per company code and period, which costing variant and valuation view may be marked. Marking and release depend on it. It is not a user authorization: a user with full authority still cannot mark without the allowance.',
    },
  },

  // ─── SD・MM ───
  {
    id: 'condition-record',
    modules: ['SD', 'MM'],
    ja: {
      term: '条件レコード',
      reading: 'じょうけんれこーど',
      definition: '条件テクニックで、条件の組み合わせごとに値を登録したデータ。価格なら「得意先×品目ごとの単価」、税なら「得意先税分類×品目税分類ごとの税コード」のように登録する。価格設定では、アクセスシーケンスの順に条件テーブルを探し、最初に見つかった条件レコードの値を使う。VK11などで登録する。',
    },
    en: {
      term: 'Condition Record',
      definition: 'In the condition technique, the data that stores a value per combination of conditions, such as a price per customer and material or a tax code per customer and material tax classification. Pricing searches condition tables in access sequence order and uses the first record found. Records are maintained in transactions such as VK11.',
    },
  },
  {
    id: 'document-flow-vbfa',
    modules: ['SD'],
    ja: {
      term: '伝票フロー（VBFA）',
      reading: 'でんぴょうふろー',
      definition: '販売の伝票どうしの前後関係。見積・受注・出荷・出庫・請求がどうつながっているかを示し、照会画面の「伝票フロー」で見られる。テーブルではVBFAに、先行伝票（VBELV）と後続伝票（VBELN）の組み合わせで1行ずつ記録される。受注の番号から出荷や請求をたどるときに使う。',
    },
    en: {
      term: 'Document Flow (VBFA)',
      definition: 'The chain of sales documents, from quotation and order through delivery and goods issue to billing, shown by the Document Flow function in display transactions. Table VBFA stores one row per link between a preceding document (VBELV) and a subsequent one (VBELN), which is how deliveries and invoices are traced from an order.',
    },
  },
  {
    id: 'material-document',
    modules: ['MM'],
    ja: {
      term: '入出庫伝票（MATDOC）',
      reading: 'にゅうしゅっこでんぴょう',
      definition: '入庫・出庫・在庫移動など、在庫の動きを記録する伝票。移動タイプで動きの種類を表す。S/4HANAではMATDOCという1つのテーブルに、ヘッダと明細を合わせた形で記録され、在庫の数量もここから計算される。在庫の評価額が動く場合は、同時に会計伝票が作られ、参照取引はMKPFになる。',
    },
    en: {
      term: 'Material Document (MATDOC)',
      definition: 'The document recording a goods receipt, goods issue or stock transfer, with the movement type naming the kind of movement. In S/4HANA header and items are stored together in table MATDOC, from which stock quantities are also derived. When stock value changes an accounting document is posted too, with reference transaction MKPF.',
    },
  },
  {
    id: 'po-history',
    modules: ['MM'],
    ja: {
      term: '発注履歴（EKBE）',
      reading: 'はっちゅうりれき',
      definition: '発注の明細に対して行われた入庫と請求書照合の記録。発注の照会画面で見られ、テーブルではEKBEに入る。履歴の種類（VGABE）が1なら入庫、2なら請求書で、それぞれの入出庫伝票や請求書伝票の番号を持つ。入庫済み数量と請求済み数量の差から、3ウェイマッチングの状況が分かる。',
    },
    en: {
      term: 'Purchase Order History (EKBE)',
      definition: 'The record of goods receipts and invoice receipts against a purchase order item, shown in the PO display and stored in table EKBE. The history category (VGABE) is 1 for goods receipt and 2 for invoice, each with its material or invoice document number. Comparing received and invoiced quantities shows the state of the three-way match.',
    },
  },

  // ─── ABAP ───
  {
    id: 'parameter-transaction',
    modules: ['ABAP'],
    ja: {
      term: 'パラメータトランザクション',
      reading: 'ぱらめーたとらんざくしょん',
      definition: '別のトランザクションを呼び出し、画面項目に初期値を入れて起動するトランザクション。設定用の一覧（ビュー）を直接開くためや、同じプログラムを用途別に使い分けるために作られる。中身を調べるときは、SE93で呼び出し先のトランザクションと、設定されている初期値を確認する。',
    },
    en: {
      term: 'Parameter Transaction',
      definition: 'A transaction that calls another transaction and fills screen fields with preset values, used for example to open a maintenance view directly or to run one program in different modes. To see what it does, display it in SE93 and read the called transaction and the default values.',
    },
  },
];
