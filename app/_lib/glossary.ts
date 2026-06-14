export type GlossaryModule = 'FI' | 'CO' | 'SD' | 'MM' | 'PP';

export type GlossaryTerm = {
  id: string;
  modules: GlossaryModule[];
  ja: { term: string; reading: string; definition: string };
  en: { term: string; definition: string };
};

export const KANA_ROWS = ['あ', 'か', 'さ', 'た', 'な', 'は', 'ま', 'や', 'ら', 'わ'] as const;
export type KanaRow = (typeof KANA_ROWS)[number];

const KANA_MAP: Record<string, KanaRow> = {
  あ:'あ',い:'あ',う:'あ',え:'あ',お:'あ',
  か:'か',き:'か',く:'か',け:'か',こ:'か',が:'か',ぎ:'か',ぐ:'か',げ:'か',ご:'か',
  さ:'さ',し:'さ',す:'さ',せ:'さ',そ:'さ',ざ:'さ',じ:'さ',ず:'さ',ぜ:'さ',ぞ:'さ',
  た:'た',ち:'た',つ:'た',て:'た',と:'た',だ:'た',ぢ:'た',づ:'た',で:'た',ど:'た',
  な:'な',に:'な',ぬ:'な',ね:'な',の:'な',
  は:'は',ひ:'は',ふ:'は',へ:'は',ほ:'は',ば:'は',び:'は',ぶ:'は',べ:'は',ぼ:'は',ぱ:'は',ぴ:'は',ぷ:'は',ぺ:'は',ぽ:'は',
  ま:'ま',み:'ま',む:'ま',め:'ま',も:'ま',
  や:'や',ゆ:'や',よ:'や',
  ら:'ら',り:'ら',る:'ら',れ:'ら',ろ:'ら',
  わ:'わ',を:'わ',ん:'わ',
};

export function getKanaRow(reading: string): KanaRow {
  return KANA_MAP[reading[0]] ?? 'あ';
}

export const glossaryTerms: GlossaryTerm[] = [
  // ─── あ行 ───
  {
    id: 'atp',
    modules: ['SD', 'PP'],
    ja: {
      term: 'ATPチェック（アベイラビリティチェック）',
      reading: 'えーてぃーぴーちぇっく',
      definition: 'Available to Promise（引当可能量）チェック。受注登録時または製造指図作成時に、在庫・購買入庫予定・生産計画を考慮して確認納期を自動計算する機能。SAPでは「アベイラビリティチェック」とも呼ばれる。チェック結果に基づき受注明細に確認納期が設定される。',
    },
    en: {
      term: 'ATP Check (Availability to Promise)',
      definition: 'A check performed at sales order entry or production order creation that considers stock on hand, incoming purchase orders, and production plans to automatically determine a confirmed delivery date. Results are stored on the sales order line item as the confirmed delivery date.',
    },
  },
  {
    id: 'access-sequence',
    modules: ['SD'],
    ja: {
      term: 'アクセスシーケンス',
      reading: 'あくせすしーけんす',
      definition: '条件タイプに紐付けられた検索ルールの集合。価格決定時に条件テーブルを検索する順序を定義し、最初にヒットした条件レコードを使用する。一般に詳細な組み合わせ（得意先×品目）から汎用的な組み合わせ（品目グループ）の順で検索する。',
    },
    en: {
      term: 'Access Sequence',
      definition: 'A set of search rules linked to a condition type that defines the order in which condition tables are searched during pricing determination. The system uses the first matching condition record found. Typically searches from the most specific combination (customer × material) to the most general (material group).',
    },
  },
  {
    id: 'account-determination',
    modules: ['SD', 'MM'],
    ja: {
      term: '勘定決定',
      reading: 'かんじょうけってい',
      definition: 'SDの請求処理やMMの在庫移動時に、転記先のGL勘定を自動的に決定する仕組み。コンディション技術を使用し、売上組織・勘定設定グループ・勘定キー等の組み合わせで売上勘定・消費税勘定・在庫勘定などを自動決定する。SDではKOFI（売上勘定）などの条件タイプが使用される。',
    },
    en: {
      term: 'Account Determination',
      definition: 'The mechanism that automatically assigns GL accounts during SD billing or MM inventory movements. Uses condition technique to derive revenue, tax, inventory, and other accounts based on combinations of sales organization, account assignment groups, and account keys. In SD, condition type KOFI is used for revenue account determination.',
    },
  },
  {
    id: 'activity-type',
    modules: ['CO'],
    ja: {
      term: '活動タイプ',
      reading: 'かつどうたいぷ',
      definition: '原価センタが提供するサービス・作業の単位を定義するCO管理会計のマスタデータ。機械時間・人員時間・電力量など、作業量の測定単位を表す。製造原価計算では作業場所（Work Center）に活動タイプを割り当て、製造指図への原価配賦の基準とする。活動価格はKP26で計画し、KB21Nで実績を登録する。',
    },
    en: {
      term: 'Activity Type',
      definition: 'A master data object in CO Controlling that defines a unit of service or work provided by a cost center, such as machine hours, labor hours, or kilowatt-hours. In product costing, activity types are assigned to work centers and used as the basis for allocating manufacturing costs to production orders. Activity prices are planned in KP26 and actual quantities posted via KB21N.',
    },
  },
  // ─── か行 ───
  {
    id: 'company-code',
    modules: ['FI', 'CO', 'SD', 'MM'],
    ja: {
      term: '会社コード',
      reading: 'かいしゃこーど',
      definition: 'SAPにおける独立した会計単位。法的に完結した貸借対照表・損益計算書が作成できる最小組織単位であり、1つの法人（会社）に対応する。販売組織・購買組織・プラントなどの他の組織単位は会社コードに割り当てられる。財務会計（FI）の基本となる組織単位。',
    },
    en: {
      term: 'Company Code',
      definition: 'The smallest organizational unit in SAP for which a complete, self-contained set of accounts can be drawn up (balance sheet and income statement). Corresponds to a legal entity. Other organizational units such as Sales Organizations, Purchasing Organizations, and Plants are assigned to a Company Code. The fundamental organizational unit of Financial Accounting (FI).',
    },
  },
  {
    id: 'cost-center',
    modules: ['CO', 'FI'],
    ja: {
      term: '原価センタ',
      reading: 'げんかせんた',
      definition: '管理会計（CO）における原価の発生場所を表す組織単位。製造部門・営業部門・管理部門など、機能別・部門別に設定される。原価センタに計上されたコストは、配賦（Assessment/Distribution）により他の原価対象に転送できる。トランザクションKS01で作成し、KP06でコスト計画を登録する。',
    },
    en: {
      term: 'Cost Center',
      definition: 'An organizational unit in CO Controlling that represents where costs are incurred, such as manufacturing departments, sales departments, or administrative functions. Costs collected on cost centers can be allocated to other cost objects via Assessment (KSU5) or Distribution (KSV5). Created with KS01; cost plans are entered with KP06.',
    },
  },
  {
    id: 'cost-element',
    modules: ['CO'],
    ja: {
      term: '原価要素',
      reading: 'げんかようそ',
      definition: 'CO管理会計における原価・収益の分類単位。一次原価要素（Primary）はFIのGL勘定に対応し、材料費・人件費・減価償却費などを分類する。二次原価要素（Secondary）はCO内部の配賦・活動配賦・製造指図精算に使用される。S/4HANAではGL勘定と原価要素が統合されている。',
    },
    en: {
      term: 'Cost Element',
      definition: 'A classification unit for costs and revenues in CO Controlling. Primary cost elements correspond to FI GL accounts (material costs, labor, depreciation, etc.). Secondary cost elements are used only within CO for allocations, activity allocations, and order settlements. In S/4HANA, GL accounts and cost elements are unified.',
    },
  },
  {
    id: 'consignment',
    modules: ['MM'],
    ja: {
      term: 'コンサインメント',
      reading: 'こんさいんめんと',
      definition: '仕入先所有の在庫をプラントの保管場所に預かり管理する調達方式。在庫を使用（引き出し）した時点で仕入先への支払義務が発生するため、保管中はコストが発生しない。発注タイプNBに品目カテゴリK（コンサインメント）を使用し、使用時は移動タイプ411Kで自社在庫へ転換する。',
    },
    en: {
      term: 'Consignment',
      definition: 'A procurement arrangement where vendor-owned inventory is stored at the plant\'s premises. Payment obligation to the vendor arises only when the stock is consumed (withdrawn), not during storage. Ordered with document type NB and item category K. Movement type 411K converts consignment stock to own unrestricted stock at the time of consumption.',
    },
  },
  {
    id: 'condition-type',
    modules: ['SD'],
    ja: {
      term: '条件タイプ',
      reading: 'じょうけんたいぷ',
      definition: 'SAPのコンディション技術における価格・割引・割増・税金などの個別要素を定義するオブジェクト。PR00（標準価格）・K004（品目割引）・MWST（消費税）などが代表的。各条件タイプにはアクセスシーケンスが割り当てられ、条件レコードの検索方法を定義する。VK11で条件レコードを登録する。',
    },
    en: {
      term: 'Condition Type',
      definition: 'An object in SAP\'s condition technique that defines individual pricing elements such as prices, discounts, surcharges, and taxes. Key examples include PR00 (list price), K004 (material discount), and MWST (tax). Each condition type is assigned an access sequence that defines how condition records are searched. Records are maintained in VK11.',
    },
  },
  {
    id: 'copy-control',
    modules: ['SD'],
    ja: {
      term: 'コピー管理',
      reading: 'こぴーかんり',
      definition: '照会・見積・受注・出荷・請求の各SDプロセス伝票間でデータを引き継ぐためのカスタマイズ設定。VOVAで設定し、元伝票タイプ・後続伝票タイプの組み合わせごとに、どの項目をコピーするか・どのルーチンで変換するかを定義する。これにより再入力の手間を省き、データの整合性を保つ。',
    },
    en: {
      term: 'Copy Control',
      definition: 'Customizing settings that govern how data is transferred between SD process documents—inquiry, quotation, sales order, delivery, and billing. Configured in VOVA by defining which fields to copy and which routines to apply for each source-to-target document type combination. Eliminates re-entry and maintains data consistency across the OTC process.',
    },
  },
  {
    id: 'credit-management',
    modules: ['SD', 'FI'],
    ja: {
      term: '与信管理',
      reading: 'よしんかんり',
      definition: '得意先の信用リスクを管理し、与信限度額を超えた取引に対して受注・出荷をブロックする機能。FD32で与信エリア・与信限度額を設定する。リスクカテゴリと与信管理グループの組み合わせで与信チェックの動作を制御。ブロックされた受注はVKM1で与信担当者が手動解除する。',
    },
    en: {
      term: 'Credit Management',
      definition: 'A function that manages customer credit risk and blocks sales orders or deliveries when credit limits are exceeded. Credit limits and credit control areas are configured in FD32. The behavior of credit checks is controlled by the combination of Risk Category and Credit Management Group. Blocked orders are released manually by the credit manager in VKM1.',
    },
  },
  {
    id: 'credit-control-area',
    modules: ['SD', 'FI'],
    ja: {
      term: '与信エリア',
      reading: 'よしんえりあ',
      definition: '与信管理の組織単位。複数の会社コードにまたがった与信管理が可能で、得意先グループ全体の与信限度を一元管理できる。与信エリア内に複数の得意先を属させ、与信限度額の共有・管理を行う。FD32で得意先ごとに与信エリアと与信限度額を設定する。',
    },
    en: {
      term: 'Credit Control Area',
      definition: 'The organizational unit for credit management in SAP. A single credit control area can span multiple company codes, enabling centralized credit limit management across a group of customers. Credit limits per customer within a credit control area are configured in FD32.',
    },
  },
  {
    id: 'cycle-counting',
    modules: ['MM'],
    ja: {
      term: '循環棚卸',
      reading: 'じゅんかんたなおろし',
      definition: 'ABC分析に基づき品目の重要度・金額に応じて棚卸頻度を変える棚卸方式。A品目（高価値）は高頻度（例：月次）、B品目は中頻度、C品目（低価値）は低頻度（例：年次）で実施する。全品目を一度に停止することなく、継続的に精度の高い在庫管理を維持できる。',
    },
    en: {
      term: 'Cycle Counting',
      definition: 'A physical inventory method that varies the counting frequency by material based on ABC classification. A-class materials (high value) are counted most frequently (e.g., monthly), while C-class (low value) are counted least frequently (e.g., annually). Allows continuous, accurate inventory management without stopping all operations.',
    },
  },
  // ─── さ行 ───
  {
    id: 'sales-org',
    modules: ['SD'],
    ja: {
      term: '販売組織',
      reading: 'はんばいそしき',
      definition: '製品またはサービスの販売に対して責任を持つSAPの組織単位。必ず1つの会社コードに割り当てられ、複数の会社コードへの割当は不可。流通チャネル・製品部門と組み合わせて販売エリアを形成する。価格条件・得意先マスタの販売エリアデータは販売組織レベルで管理される。',
    },
    en: {
      term: 'Sales Organization',
      definition: 'An SAP organizational unit responsible for selling products or services. Assigned to exactly one company code; assignment to multiple company codes is not permitted. Combined with Distribution Channel and Division to form a Sales Area. Pricing conditions and customer master Sales Area data are managed at the Sales Organization level.',
    },
  },
  {
    id: 'sales-order',
    modules: ['SD'],
    ja: {
      term: '受注',
      reading: 'じゅちゅう',
      definition: '得意先からの購買意思を正式に記録したSD伝票。トランザクションVA01で作成し、受注タイプ（OR：標準、RE：返品、CR：クレジットメモ依頼等）により後続プロセスが決まる。作成時に得意先マスタ・品目マスタ・価格条件からデータが自動引継ぎされ、ATPチェックにより確認納期が設定される。',
    },
    en: {
      term: 'Sales Order',
      definition: 'An SD document that formally records a customer\'s intent to purchase. Created with VA01 with an order type (OR: standard, RE: returns, CR: credit memo request) that determines the downstream process flow. Customer master, material master, and pricing data are automatically copied at creation, and the ATP check sets the confirmed delivery date.',
    },
  },
  {
    id: 'sales-area',
    modules: ['SD'],
    ja: {
      term: '販売エリア',
      reading: 'はんばいえりあ',
      definition: '販売組織・流通チャネル・製品部門の3つの組織要素の組み合わせによって定義されるSDの販売単位。得意先マスタの販売エリアデータ・価格条件・出荷条件はこの単位で管理される。受注は必ず特定の販売エリアに属し、販売統計もこの単位で集計される。',
    },
    en: {
      term: 'Sales Area',
      definition: 'The combination of Sales Organization, Distribution Channel, and Division that defines the selling unit in SD. Customer master Sales Area data, pricing conditions, and shipping conditions are managed at this level. Every sales order belongs to a specific Sales Area, and sales statistics are aggregated accordingly.',
    },
  },
  {
    id: 'sto',
    modules: ['MM'],
    ja: {
      term: 'STO（プラント間在庫移送）',
      reading: 'えすてぃーおー',
      definition: 'Stock Transfer Order。プラント間の在庫移送を購買発注伝票で管理する特殊調達方式。発注タイプUBを使用し、送り元プラントでPGI（出荷確定）を実行して在庫を減少させ、受け入れプラントで入庫処理を行い在庫を増加させる。両プラントで在庫動作とGL転記が発生する。',
    },
    en: {
      term: 'STO (Stock Transfer Order)',
      definition: 'A special procurement method that manages plant-to-plant inventory transfers using purchase order documents with document type UB. The sending plant executes a PGI (Post Goods Issue) to reduce stock; the receiving plant performs a goods receipt to increase stock. Inventory movements and GL postings occur at both plants.',
    },
  },
  // ─── た行 ───
  {
    id: 'three-way-matching',
    modules: ['MM'],
    ja: {
      term: '3ウェイマッチング',
      reading: 'さんうぇいまっちんぐ',
      definition: '購買発注（PO）・入庫（GR）・仕入先請求書の3者を照合してから支払を承認するMM購買プロセスの内部統制手続き。MIROで請求照合を行う際にPO価格・数量との差異をチェックし、許容範囲超過時は請求書をブロックして手動承認を要求する。財務コンプライアンスの基本的な統制の一つ。',
    },
    en: {
      term: 'Three-Way Matching',
      definition: 'An internal control procedure in MM purchasing that verifies the Purchase Order, Goods Receipt, and vendor invoice before authorizing payment. During invoice verification (MIRO), price and quantity variances against the PO are checked; invoices exceeding tolerances are blocked and require manual release. A fundamental financial compliance control.',
    },
  },
  {
    id: 'delivery',
    modules: ['SD', 'MM'],
    ja: {
      term: '出荷',
      reading: 'しゅっか',
      definition: 'SDの出荷プロセスにおいて、受注に基づき出荷伝票（VL01N）を作成し、ピッキング・梱包・PGI（出荷確定）を行う一連の処理。PGI実行時に在庫が減少しMMと連携、売上原価がCOに計上される。出荷伝票は受注と請求書をつなぐ中間伝票として機能する。',
    },
    en: {
      term: 'Delivery',
      definition: 'The SD shipping process in which a delivery document is created (VL01N) based on a sales order, followed by picking, packing, and PGI (Post Goods Issue). PGI reduces MM inventory and posts cost of goods sold to CO. The delivery document serves as the intermediate document linking the sales order to the invoice.',
    },
  },
  {
    id: 'distribution-channel',
    modules: ['SD'],
    ja: {
      term: '流通チャネル',
      reading: 'りゅうつうちゃねる',
      definition: '製品やサービスが顧客に届くまでの販売経路を区別するSDの組織単位。直販・卸売・小売・インターネット販売など、複数の流通経路を区別できる。販売組織・製品部門と組み合わせて販売エリアを形成し、チャネルごとに異なる価格条件や得意先マスタを設定できる。',
    },
    en: {
      term: 'Distribution Channel',
      definition: 'An SD organizational unit that distinguishes the route through which products or services reach customers, such as direct sales, wholesale, retail, or online. Combined with Sales Organization and Division to form a Sales Area. Different pricing conditions and customer master data can be configured per distribution channel.',
    },
  },
  // ─── な行 ───
  {
    id: 'new-gl',
    modules: ['FI'],
    ja: {
      term: '新GL（New General Ledger）',
      reading: 'しんじーえる',
      definition: 'SAP ECC 6.0以降で導入された拡張総勘定元帳。伝票分割（Document Splitting）・リアルタイム統合・複数元帳（Parallel Accounting）・利益センタ別残高管理などの機能を提供する。S/4HANAでは「Universal Journal（ACDOCA）」として更に進化し、FI・CO・ML等の転記が単一テーブルに統合されている。',
    },
    en: {
      term: 'New General Ledger (New G/L)',
      definition: 'An enhanced general ledger introduced from SAP ECC 6.0 onward, providing features such as document splitting, real-time integration, parallel accounting (multiple ledgers), and profit center balance management. In S/4HANA, this has evolved into the Universal Journal (ACDOCA), where FI, CO, ML, and other postings are unified in a single table.',
    },
  },
  {
    id: 'movement-type',
    modules: ['MM', 'PP'],
    ja: {
      term: '移動タイプ',
      reading: 'いどうたいぷ',
      definition: '在庫移動の種類を定義するMMの設定値。在庫に対するGL転記ロジック・在庫区分・在庫更新方向（増減）を制御する。代表的な移動タイプ：101（PO入庫）・201（原価センタへの出庫）・261（製造指図への出庫）・311（プラント内転送）・411K（コンサインメント引き出し）。MIGOで移動タイプを指定して処理する。',
    },
    en: {
      term: 'Movement Type',
      definition: 'A configuration value in MM that defines the type of inventory movement, controlling GL posting logic, stock category, and the direction of stock changes. Key movement types: 101 (GR vs PO), 201 (GI to Cost Center), 261 (GI to Production Order), 311 (Transfer within Plant), 411K (Consignment withdrawal). Specified when posting in MIGO.',
    },
  },
  // ─── は行 ───
  {
    id: 'pgi',
    modules: ['SD', 'MM'],
    ja: {
      term: 'PGI（出荷確定）',
      reading: 'ぴーじーあい',
      definition: 'Post Goods Issue。SDの出荷処理において、出荷伝票に対して実際に商品が出荷されたことを確定する処理。PGI実行時に（1）MMの在庫が減少、（2）COに売上原価が計上、（3）出荷伝票のステータスが確定の3つのイベントが同時に発生する。PGI後に請求書（VF01）を作成できる。',
    },
    en: {
      term: 'PGI (Post Goods Issue)',
      definition: 'The confirmation step in SD outbound delivery processing that records the physical departure of goods. Three events occur simultaneously: (1) MM inventory is reduced, (2) cost of goods sold is posted to CO, (3) the delivery document status is finalized. Billing (VF01/VF04) can only be created after PGI.',
    },
  },
  {
    id: 'pir',
    modules: ['PP'],
    ja: {
      term: '計画独立所要量（PIR）',
      reading: 'けいかくどくりつしょようりょう',
      definition: 'Planned Independent Requirements。見込生産（MTS）におけるMRPへの需要入力。MD61で品目・プラント・計画数量・計画期間を登録する。受注確定前の需要予測・販売計画を基に作成され、MRP実行時に計画指図（製造計画）の生成トリガーとなる。個別生産（MTO）では受注そのものが需要源となるためPIRは使用しない。',
    },
    en: {
      term: 'PIR (Planned Independent Requirements)',
      definition: 'The demand input to MRP for Make-to-Stock (MTS) production. Entered in MD61 with material, plant, planned quantity, and planning period. Created from demand forecasts or sales plans before actual orders are received. Triggers the generation of planned orders when MRP is executed. MTO production uses actual sales orders as demand instead of PIRs.',
    },
  },
  {
    id: 'profit-center',
    modules: ['CO', 'FI'],
    ja: {
      term: '利益センタ',
      reading: 'りえきせんた',
      definition: 'CO管理会計における収益・費用を管理する組織単位。製品ライン・事業部・地域などの事業セグメントに対応し、セグメント別の損益を把握するために使用する。EC-PCA（利益センタ会計）または新GLの利益センタ機能として実装される。KE51で作成し、品目マスタ・原価センタ等に割り当てる。',
    },
    en: {
      term: 'Profit Center',
      definition: 'An organizational unit in CO Controlling used to manage revenues and costs for a specific business segment such as a product line, division, or region. Provides segment-level P&L visibility. Implemented as EC-PCA (Profit Center Accounting) or via New GL profit center functionality. Created with KE51 and assigned to material masters, cost centers, etc.',
    },
  },
  {
    id: 'purchase-order',
    modules: ['MM'],
    ja: {
      term: '購買発注',
      reading: 'こうばいはっちゅう',
      definition: '仕入先に対する正式な発注書を表すMM伝票。ME21Nで作成し、品目・数量・価格・納期・仕入先が記載される。発注タイプNB（標準）・UB（STO）・FO（枠契約参照）等がある。会社の購買ポリシーに応じてリリース戦略（承認フロー）が適用される。入庫（MIGO）・請求照合（MIRO）の元伝票となる。',
    },
    en: {
      term: 'Purchase Order (PO)',
      definition: 'An MM document representing a formal order to a vendor, created in ME21N with material, quantity, price, delivery date, and vendor. Document types include NB (standard), UB (STO), and FO (outline agreement reference). A Release Strategy (approval workflow) may apply based on company purchasing policy. The PO is the reference document for goods receipt (MIGO) and invoice verification (MIRO).',
    },
  },
  {
    id: 'purchase-requisition',
    modules: ['MM'],
    ja: {
      term: '購買依頼',
      reading: 'こうばいいらい',
      definition: '社内部門からの購買要求を表すMM内部伝票。ME51Nで手動作成するほか、MRP実行時にも自動生成される。購買依頼はME57（手動割付）またはME59N（自動変換）によって購買発注に変換される。購買依頼のリリース戦略を別途設定することで、発注前の承認プロセスを制御できる。',
    },
    en: {
      term: 'Purchase Requisition (PR)',
      definition: 'An MM internal document representing a purchase request from an internal department. Created manually in ME51N or automatically generated by MRP execution. Converted to a Purchase Order via ME57 (manual assignment) or ME59N (automatic conversion). A separate Release Strategy can be configured for PRs to control the approval process before ordering.',
    },
  },
  {
    id: 'pricing-procedure',
    modules: ['SD'],
    ja: {
      term: '価格設定手順',
      reading: 'かかくせっていてじゅん',
      definition: 'SDの受注・請求時に適用される価格計算のフレームワーク。各ステップに条件タイプ（PR00・K004・MWST等）を定義し、加算・減算・パーセント計算の順序と必須/オプションを指定する。販売組織・流通チャネル・得意先の価格設定手順指示子・伝票の価格設定手順指示子の組み合わせで使用する手順が決定される。',
    },
    en: {
      term: 'Pricing Procedure',
      definition: 'The framework applied during SD order entry and billing that defines the price calculation sequence. Each step specifies a condition type (PR00, K004, MWST, etc.) with addition/subtraction, percentage calculation, and mandatory/optional flags. The applicable procedure is determined by the combination of Sales Organization, Distribution Channel, and customer/document pricing procedure indicators.',
    },
  },
  {
    id: 'plant',
    modules: ['MM', 'PP', 'SD'],
    ja: {
      term: 'プラント',
      reading: 'ぷらんと',
      definition: 'SAPにおける製造・在庫管理の基本組織単位。製造工場・倉庫・物流センターに対応し、在庫はプラントレベルで管理される。1つのプラントは1つの会社コードに属し、購買組織・販売組織の両方に割り当て可能。品目マスタのMRPデータ・在庫管理データはプラントレベルで設定される。',
    },
    en: {
      term: 'Plant',
      definition: 'The fundamental organizational unit for manufacturing and inventory management in SAP, corresponding to a manufacturing facility, warehouse, or distribution center. Inventory is managed at plant level. A plant belongs to one company code and can be assigned to both Purchasing Organizations and Sales Organizations. Material master MRP and inventory management data are configured at plant level.',
    },
  },
  {
    id: 'physical-inventory',
    modules: ['MM'],
    ja: {
      term: '棚卸',
      reading: 'たなおろし',
      definition: '実際の在庫数量を数えて帳簿在庫と照合し、差異を修正する在庫確認プロセス。MI01で棚卸伝票作成→MI04で実際数量入力→MI07で差異転記の手順で実施する。差異転記（MI07）によって帳簿在庫が実際数量に修正される。在庫の正確性維持・資産計上の正確性確保のために定期的に実施する。',
    },
    en: {
      term: 'Physical Inventory',
      definition: 'The process of physically counting inventory, reconciling it with book quantities, and correcting any differences. The process flow is: MI01 (create inventory document) → MI04 (enter actual counts) → MI07 (post differences). The MI07 posting adjusts book inventory to match actual physical counts. Performed periodically to maintain inventory accuracy and ensure correct asset valuation.',
    },
  },
  {
    id: 'product-costing',
    modules: ['CO', 'PP'],
    ja: {
      term: '製品原価計算',
      reading: 'せいひんげんかけいさん',
      definition: 'COの製品原価計算（CO-PC）コンポーネント。製品の標準原価を計算し（CK11N）、原価見積をリリース（CK24）することで品目マスタの標準価格が更新される。製造指図の実績原価と標準原価の差異が差異分析（KKS2/KKAO）で計算され、CO88精算で製品在庫や原価センタに振り替えられる。',
    },
    en: {
      term: 'Product Costing',
      definition: 'The CO-PC (Product Cost Controlling) component. Standard costs are calculated (CK11N) and the cost estimate is released (CK24) to update the standard price in the material master. Variances between actual and standard costs on production orders are calculated in variance analysis (KKS2/KKAO) and settled to finished goods stock or cost centers via CO88.',
    },
  },
  {
    id: 'profitability-analysis',
    modules: ['CO'],
    ja: {
      term: '収益性分析（CO-PA）',
      reading: 'しゅうえきせいぶんせき',
      definition: 'Controlling Profitability Analysis。製品・得意先・地域・販売チャネルなどの軸で収益性を分析するCOコンポーネント。勘定ベース（Account-Based）と原価計算ベース（Costing-Based）の2種類がある。SDの請求からは売上高・値引き・売上原価が自動転送される。S/4HANAでは勘定ベースCO-PAが標準となっている。',
    },
    en: {
      term: 'Profitability Analysis (CO-PA)',
      definition: 'The CO-PA (Controlling Profitability Analysis) component for analyzing profitability by product, customer, region, or sales channel. Two types exist: Account-Based (using GL accounts) and Costing-Based (using value fields). Revenue, discounts, and COGS are automatically transferred from SD billing. Account-Based CO-PA is the standard approach in S/4HANA.',
    },
  },
  {
    id: 'production-order',
    modules: ['PP', 'CO'],
    ja: {
      term: '製造指図',
      reading: 'せいぞうさしず',
      definition: '製品を製造するための指示と実績収集の単位。CO01で作成またはCO41で計画指図から変換する。CRTD（作成済）→REL（リリース）→CNF（確認済）→TECO（技術的完了）→CLSD（クローズ）のステータスで進む。実績の材料出庫・活動数量・製造確認（CO11N）が集計され、CO88精算で実績原価が最終的に振り替えられる。',
    },
    en: {
      term: 'Production Order',
      definition: 'The unit of instruction and actual cost collection for manufacturing a product. Created in CO01 or converted from a planned order via CO41. Progresses through statuses: CRTD (Created) → REL (Released) → CNF (Confirmed) → TECO (Technically Complete) → CLSD (Closed). Actual material issues, activity quantities, and confirmations (CO11N) are collected; actual costs are finally settled via CO88.',
    },
  },
  {
    id: 'production-confirmation',
    modules: ['PP'],
    ja: {
      term: '製造確認',
      reading: 'せいぞうかくにん',
      definition: '製造指図に対して実際の作業実績を報告するPP処理。CO11Nで実施し、実際の作業時間・生産数量・仕損数量を入力する。確認データが製造指図に集計されることで実績原価が計算される。入庫同時計上オプションを使用すれば製品の在庫計上も同時に行える。確認後はMIGOで製品入庫を別途処理することも可能。',
    },
    en: {
      term: 'Production Confirmation',
      definition: 'The PP process of reporting actual work performed against a production order. Executed in CO11N by entering actual work time, produced quantity, and scrap. Confirmation data is collected on the production order and drives actual cost calculation. The simultaneous GR option allows finished goods to be received at the same time, or a separate MIGO goods receipt can be posted.',
    },
  },
  // ─── ま行 ───
  {
    id: 'material-master',
    modules: ['MM', 'PP', 'SD'],
    ja: {
      term: '品目マスタ',
      reading: 'ひんもくますた',
      definition: 'SAPで管理するすべての品目（材料・製品・半製品・サービス等）の基本情報を保持するマスタデータ。MM01で作成し、基本データ・購買データ・MRPデータ・在庫管理データ・評価データ・販売データ等の複数のビューで構成される。品目タイプ（ROH・FERT・HALB等）と評価クラスが在庫評価・勘定決定を決定する。',
    },
    en: {
      term: 'Material Master',
      definition: 'Master data that stores basic information for all materials managed in SAP (raw materials, finished products, semi-finished goods, services, etc.). Created in MM01 and organized into multiple views: Basic Data, Purchasing, MRP, Inventory Management, Accounting, Sales, etc. The Material Type (ROH, FERT, HALB, etc.) and Valuation Class determine inventory valuation and GL account assignment.',
    },
  },
  {
    id: 'master-data',
    modules: ['FI', 'CO', 'SD', 'MM', 'PP'],
    ja: {
      term: 'マスタデータ',
      reading: 'ますたでーた',
      definition: 'SAPシステムで比較的変化が少なく、伝票処理の基礎となるデータの総称。品目マスタ・得意先マスタ・仕入先マスタ・原価センタ・GL勘定などが代表例。トランザクションデータ（伝票）と対比して使われる。マスタデータの正確性は伝票処理の自動化・精度に直結するため、データガバナンスが重要。',
    },
    en: {
      term: 'Master Data',
      definition: 'Relatively static data that forms the foundation for transactional processing in SAP. Examples include the Material Master, Customer Master, Vendor Master, Cost Centers, and GL accounts. Contrasted with transactional data (documents). Data accuracy in master data directly impacts automation and correctness of document processing, making data governance critical.',
    },
  },
  {
    id: 'moving-avg-price',
    modules: ['MM'],
    ja: {
      term: '移動平均価格',
      reading: 'いどうへいきんかかく',
      definition: '品目マスタの価格管理コードVで設定される在庫評価方法。入庫のたびに（在庫総額＋入庫額）÷（在庫数量＋入庫数量）で単価を再計算する。実際の調達コスト変動を在庫評価に反映できる利点がある。原材料・商品などに適用されることが多い。標準価格（S）との対比で使用される。',
    },
    en: {
      term: 'Moving Average Price',
      definition: 'An inventory valuation method configured with price control code V in the Material Master. After each goods receipt, the unit price is recalculated as: (Total Stock Value + Receipt Value) ÷ (Total Stock Qty + Receipt Qty). Reflects actual procurement cost fluctuations in inventory valuation. Commonly used for raw materials and trading goods, contrasted with Standard Price (S).',
    },
  },
  {
    id: 'mrp',
    modules: ['PP', 'MM'],
    ja: {
      term: 'MRP（所要量計画）',
      reading: 'えむあーるぴー',
      definition: 'Material Requirements Planning。需要（受注・PIR）に対してBOM展開を行い、製造および調達の所要量を自動計算するPP/MMの計画機能。MD01（全品目バッチ実行）またはMD02（品目別単体実行）で実施。結果はMD04（在庫/所要量リスト）で確認でき、計画指図・購買依頼が自動生成される。',
    },
    en: {
      term: 'MRP (Material Requirements Planning)',
      definition: 'A PP/MM planning function that explodes BOMs against demand (sales orders, PIRs) to automatically calculate manufacturing and procurement requirements. Run using MD01 (all materials, batch) or MD02 (single material). Results are visible in MD04 (Stock/Requirements List), which shows automatically generated planned orders and purchase requisitions.',
    },
  },
  // ─── や行 ───
  {
    id: 'outline-agreement',
    modules: ['MM'],
    ja: {
      term: '枠契約',
      reading: 'わくけいやく',
      definition: '仕入先との長期購買合意を記録するMM伝票の総称。数量契約（Contract：ME31K）と期間発注契約（Scheduling Agreement：ME31L）の2種類がある。数量契約は特定数量・価格の購入合意、期間発注契約は詳細な納入スケジュールを管理する。枠契約参照の発注はFOタイプで作成され、合意条件が自動引継ぎされる。',
    },
    en: {
      term: 'Outline Agreement',
      definition: 'The collective term for MM documents that record long-term purchase agreements with vendors. Two types: Contract (quantity-based, created with ME31K) and Scheduling Agreement (time-based delivery schedule, created with ME31L). Contracts record agreed quantities and prices; Scheduling Agreements manage detailed delivery schedules. Purchase orders referencing outline agreements use document type FO.',
    },
  },
  // ─── ら行 ───
  {
    id: 'release-strategy',
    modules: ['MM'],
    ja: {
      term: 'リリース戦略',
      reading: 'りりーすせんりゃく',
      definition: '購買依頼・購買発注の承認ワークフローを定義するMMカスタマイズ機能。金額・品目グループ・購買組織・プラントなどの条件に基づき、承認者のリリースコード（承認段階）と順序を決定する。リリースが完了しなければ次のプロセス（PRから発注への変換、または発注の送信）に進めない。',
    },
    en: {
      term: 'Release Strategy',
      definition: 'An MM customizing function that defines approval workflows for purchase requisitions and purchase orders. Determines the sequence of approver release codes (approval stages) based on conditions such as amount, material group, purchasing organization, and plant. Downstream processing (e.g., converting a PR to a PO, or sending a PO to a vendor) cannot proceed until the required releases are granted.',
    },
  },
  {
    id: 'routing',
    modules: ['PP'],
    ja: {
      term: '作業手順',
      reading: 'さぎょうてじゅん',
      definition: 'PPの製造プロセスを定義するマスタデータ。CA01で作成し、製品製造に必要な工程（オペレーション）の順序・各工程を担当する作業場所・セットアップ時間・加工時間・リードタイムを定義する。MRP実行時のリードタイム計算と、製造指図の能力計画・実績原価計算の基礎となる。',
    },
    en: {
      term: 'Routing',
      definition: 'Master data in PP that defines the manufacturing process. Created with CA01, it specifies the sequence of operations required to produce a product, the work center responsible for each operation, and setup time, machine time, and lead time values. Used as the basis for MRP lead time calculation and for capacity planning and actual cost calculation on production orders.',
    },
  },
  {
    id: 'reconciliation-account',
    modules: ['FI'],
    ja: {
      term: '照合勘定',
      reading: 'しょうごうかんじょう',
      definition: '補助元帳（売掛金・買掛金・資産等）と総勘定元帳（GL）を連動させるためのGL勘定。得意先マスタでは売掛金照合勘定、仕入先マスタでは買掛金照合勘定として設定する。補助元帳への転記が発生すると、設定された照合勘定に自動的にGL転記が行われ、両元帳の合計が常に一致する。',
    },
    en: {
      term: 'Reconciliation Account',
      definition: 'A GL account that links a subledger (accounts receivable, accounts payable, fixed assets, etc.) to the general ledger. Set as the accounts receivable reconciliation account in the customer master, or as the accounts payable reconciliation account in the vendor master. When a subledger posting occurs, a corresponding GL posting is automatically made to the reconciliation account, keeping both ledgers in sync.',
    },
  },
  // ─── わ行 ───
  {
    id: 'wip',
    modules: ['PP', 'CO'],
    ja: {
      term: '仕掛品（WIP）',
      reading: 'しかかりひん',
      definition: 'Work in Process。月末時点で完了していない製造指図に投入済みのコスト。期末処理では完了していない製造指図の投入コストを仕掛品として資産計上する計算（WIP計算）を行う。TECOになった時点でWIPが解除され、標準原価との差異計算・CO88精算が実行される。',
    },
    en: {
      term: 'WIP (Work in Process)',
      definition: 'Costs that have been charged to production orders that are not yet complete at month-end. During period-end processing, costs on incomplete production orders are capitalized as WIP assets on the balance sheet. Once a production order reaches TECO status, WIP is reversed and variance analysis plus CO88 settlement are executed.',
    },
  },
  // ─── Additional terms (alphabetical mixed) ───
  {
    id: 'billing',
    modules: ['SD', 'FI'],
    ja: {
      term: '請求処理',
      reading: 'せいきゅうしょり',
      definition: 'SDの出荷確定（PGI）後に、得意先へ請求書を発行するプロセス。VF01で個別作成、VF04（Billing Due List）で一括作成できる。請求書タイプF1（標準請求）により、FIの売掛金勘定へ自動転記が行われる。VF11で請求書をキャンセルすると逆仕訳が自動実行される。勘定決定により売上・税金のGL勘定が自動決定される。',
    },
    en: {
      term: 'Billing',
      definition: 'The SD process of issuing invoices to customers after PGI (Post Goods Issue). Created individually in VF01 or in batch via VF04 (Billing Due List). Billing type F1 (standard invoice) triggers automatic posting to FI accounts receivable. VF11 cancels a billing document and automatically posts a reversal. GL accounts for revenue and tax are automatically determined via Account Determination.',
    },
  },
  {
    id: 'bom',
    modules: ['PP', 'MM'],
    ja: {
      term: '部品表（BOM）',
      reading: 'ぶひんひょう',
      definition: 'Bill of Materials。製品を構成する部品・半製品・原材料とその数量を定義するPPのマスタデータ。CS01で作成し、製造BOM・販売BOM・プロジェクトBOMなど複数のタイプがある。MRP実行時のBOM展開により必要部品の所要量が計算される。有効期限管理によりエンジニアリング変更を日付ベースで管理できる。',
    },
    en: {
      term: 'BOM (Bill of Materials)',
      definition: 'Master data in PP that defines the components, semi-finished goods, and raw materials that make up a product along with their quantities. Created in CS01. Types include Manufacturing BOM, Sales BOM, and Project BOM. MRP explodes the BOM to calculate component requirements. Validity date management handles engineering changes on a date-effective basis.',
    },
  },
  {
    id: 'customer-master',
    modules: ['SD', 'FI'],
    ja: {
      term: '得意先マスタ',
      reading: 'とくいさきますた',
      definition: '販売取引の相手先（得意先）情報を管理するマスタデータ。一般データ（名称・住所）・会社コードデータ（照合勘定・支払条件）・販売エリアデータ（出荷条件・価格グループ）の3階層で構成される。XD01（全データ）またはVD01（販売エリアのみ）で作成する。得意先グループは勘定決定・統計分析に使用される。',
    },
    en: {
      term: 'Customer Master',
      definition: 'Master data that manages information about customers (business partners for sales transactions). Organized in three levels: General Data (name, address), Company Code Data (reconciliation account, payment terms), and Sales Area Data (shipping conditions, pricing group). Created with XD01 (all data) or VD01 (Sales Area data only). Customer Group is used for account determination and reporting.',
    },
  },
  {
    id: 'valuation-class',
    modules: ['MM', 'FI'],
    ja: {
      term: '評価クラス',
      reading: 'ひょうかくらす',
      definition: '品目マスタに設定するコードで、在庫移動・入出庫時のGL勘定を自動決定する勘定決定（Automatic Account Determination）の基準となる。品目タイプに紐付いた評価クラスの設定により、原材料・製品・半製品等の在庫がそれぞれ異なるGL勘定に転記される。TXXXAで勘定決定をカスタマイズする。',
    },
    en: {
      term: 'Valuation Class',
      definition: 'A code in the Material Master that serves as the basis for Automatic Account Determination, which assigns GL accounts during inventory movements (goods receipts, issues, etc.). Different valuation classes for raw materials, finished goods, and semi-finished goods route inventory postings to different GL accounts. Account determination is customized in transaction OBYC.',
    },
  },
  {
    id: 'valuation-area',
    modules: ['MM', 'FI'],
    ja: {
      term: '評価エリア',
      reading: 'ひょうかえりあ',
      definition: '在庫の金額評価が行われるレベルを定義するMMの組織設定。SAPでは通常「プラントレベル」で在庫評価を行うよう設定される（会社コードレベルも選択可能だが推奨されない）。評価エリアの設定はシステム全体に影響するため、プロジェクト初期に決定する必要がある。',
    },
    en: {
      term: 'Valuation Area',
      definition: 'An MM organizational setting that defines the level at which inventory is valuated monetarily. SAP typically configures valuation at the Plant level (Company Code level is possible but not recommended). The valuation area setting affects the entire system and must be determined early in the implementation project.',
    },
  },
  {
    id: 'vendor-master',
    modules: ['MM', 'FI'],
    ja: {
      term: '仕入先マスタ',
      reading: 'しいれさきますた',
      definition: '購買取引の相手先（仕入先・サプライヤー）情報を管理するマスタデータ。一般データ（名称・住所）・会社コードデータ（照合勘定・支払条件）・購買組織データ（購買条件・発注通貨）の3階層で構成される。XK01（全データ）またはMK01（購買データのみ）で作成する。',
    },
    en: {
      term: 'Vendor Master',
      definition: 'Master data that manages information about vendors/suppliers for purchasing transactions. Organized in three levels: General Data (name, address), Company Code Data (reconciliation account, payment terms), and Purchasing Organization Data (purchasing conditions, order currency). Created with XK01 (all data) or MK01 (purchasing data only).',
    },
  },
  {
    id: 'variance-analysis',
    modules: ['CO', 'PP'],
    ja: {
      term: '差異分析',
      reading: 'さいぶんせき',
      definition: '製造指図の標準原価と実績原価の差異を計算・分析するCO機能。個別実行はKKS2、一括実行はKKAO（またはKKS1）を使用する。差異は価格差異（原価率の相違）・数量差異（実際投入量と標準投入量の相違）等に分類される。差異はCO88精算時にFIへ振り替えられる。',
    },
    en: {
      term: 'Variance Analysis',
      definition: 'A CO function that calculates and analyzes the difference between standard and actual costs on production orders. Individual execution uses KKS2; batch execution uses KKAO (or KKS1). Variances are classified into price variances (cost rate differences), quantity variances (actual vs. standard input quantity), etc. Variances are transferred to FI during CO88 settlement.',
    },
  },
  {
    id: 'internal-order',
    modules: ['CO'],
    ja: {
      term: '内部指図',
      reading: 'ないぶさしず',
      definition: 'CO管理会計における特定プロジェクト・イベント・設備の原価を収集・追跡するオブジェクト。KO01で作成し、予算管理（可用性管理）・承認フロー・精算先（原価センタ・利益センタ・GL勘定）の設定が可能。ステータス管理により「計画中（PLAN）→リリース（REL）→技術的完了（TECO）→クローズ（CLSD）」の段階で管理される。',
    },
    en: {
      term: 'Internal Order',
      definition: 'A CO object used to collect and track costs for specific projects, events, or equipment. Created in KO01 with optional budget management (availability control), approval workflow, and settlement receivers (cost centers, profit centers, GL accounts). Managed through status stages: PLAN → REL (Released) → TECO (Technically Complete) → CLSD (Closed).',
    },
  },
  {
    id: 'invoice-verification',
    modules: ['MM', 'FI'],
    ja: {
      term: '請求照合',
      reading: 'せいきゅうしょうごう',
      definition: '仕入先からの請求書を購買発注・入庫と照合してから買掛金として計上するMMプロセス。MIROで実施し、PO価格・数量との差異が許容範囲内であれば自動承認される。超過時は請求書ブロックが設定されMRBR等で手動解除する。GR/IR照合勘定の残高がゼロになることで3ウェイマッチングが完了する。',
    },
    en: {
      term: 'Invoice Verification',
      definition: 'The MM process of verifying vendor invoices against the Purchase Order and Goods Receipt before posting to accounts payable. Performed in MIRO; invoices within price and quantity tolerances are automatically approved. Invoices exceeding tolerances receive a billing block, which must be manually released (e.g., via MRBR). Three-way matching is complete when the GR/IR clearing account balance reaches zero.',
    },
  },
  {
    id: 'gr-ir',
    modules: ['MM', 'FI'],
    ja: {
      term: 'GR/IR照合勘定',
      reading: 'じーあーるあいあーるしょうごうかんじょう',
      definition: 'Goods Receipt/Invoice Receipt Clearing Account。入庫（GR）から請求照合（MIRO）完了までの間、未処理残高を一時的に保持するGL勘定。入庫時に貸方計上され、MIRO完了時に借方でクリアされる。月次処理ではMR11でGR/IR残高の整理を行う。GRのみ・MIROのみの場合は残高が残り、期末調整が必要となる。',
    },
    en: {
      term: 'GR/IR Clearing Account',
      definition: 'Goods Receipt/Invoice Receipt Clearing Account. A GL account that temporarily holds the uncleared balance between goods receipt posting and invoice verification completion. Credited at GR and debited when MIRO clears the balance. GR/IR balances are reconciled monthly using MR11. Unmatched entries (GR-only or invoice-only) leave residual balances requiring period-end adjustment.',
    },
  },
  {
    id: 'goods-receipt',
    modules: ['MM', 'PP'],
    ja: {
      term: '入庫',
      reading: 'にゅうこ',
      definition: '物品を在庫として受け入れるMMの処理。MIGOで実施し、移動タイプによって処理の種類（PO入庫101・返品入庫122・製造指図からの入庫101等）が決まる。入庫時に在庫が増加し、PO参照の場合はGR/IR照合勘定とのGL転記が自動実行される。PPでは製造指図完了後の製品入庫処理にも使用される。',
    },
    en: {
      term: 'Goods Receipt (GR)',
      definition: 'An MM process that accepts materials into inventory, executed in MIGO. The movement type determines the type of receipt (101 for PO GR, 122 for returns, 101 for production order GR, etc.). Stock increases at receipt; for PO references, automatic GL posting to the GR/IR clearing account occurs. In PP, also used to receive finished goods after production order completion.',
    },
  },
  {
    id: 'purchasing-info-record',
    modules: ['MM'],
    ja: {
      term: '購買情報レコード',
      reading: 'こうばいじょうほうれこーど',
      definition: '品目と仕入先の組み合わせごとの購買条件（価格・リードタイム・最小発注数量等）を保持するMMマスタデータ。ME11で作成し、発注（ME21N）時に条件が自動提案される。購買組織レベルまたはプラントレベルで保持でき、仕入先評価や調達統計にも活用される。枠契約の条件も購買情報レコードに連携される。',
    },
    en: {
      term: 'Purchasing Info Record (PIR)',
      definition: 'MM master data that stores purchasing conditions (price, lead time, minimum order quantity, etc.) for each material-vendor combination. Created in ME11 and automatically proposed during PO creation (ME21N). Can be maintained at purchasing organization or plant level. Also used for vendor evaluation and procurement statistics. Outline agreement conditions are linked to info records.',
    },
  },
  {
    id: 'fefo',
    modules: ['MM', 'PP'],
    ja: {
      term: 'FEFO（先期限切れ先出し）',
      reading: 'ふぇふぉ',
      definition: 'First Expiry First Out。バッチ管理品目の在庫引き当て戦略の一つ。有効期限（使用期限・消費期限）が最も早いバッチを優先的に出庫・引き当てる。食品・医薬品・化学品など有効期限管理が重要な業界で必須の機能。品目マスタでバッチ管理必須フラグとSLED（棚卸有効期限）を有効化し、バッチ検索戦略でFEFOを設定する。',
    },
    en: {
      term: 'FEFO (First Expiry First Out)',
      definition: 'A batch management search strategy that prioritizes batches with the earliest expiry/best-before date for goods issues and stock allocation. Essential for industries requiring expiry date control such as food, pharmaceuticals, and chemicals. Enabled by activating the Batch Management Required flag and SLED (Shelf Life Expiration Date) in the Material Master, and configuring FEFO in the batch search strategy.',
    },
  },
  {
    id: 'batch-management',
    modules: ['MM', 'PP'],
    ja: {
      term: 'バッチ管理',
      reading: 'ばっちかんり',
      definition: '同一品目の在庫をロット（製造バッチ）単位で品質・有効期限・製造日・トレーサビリティを管理する機能。MSC1Nでバッチマスタを作成し、バッチ固有の属性（製造日・有効期限・品質特性値）を管理する。医薬品GMP・食品衛生法等の規制対応や、リコール時のトレースバック・フォワードに不可欠な機能。',
    },
    en: {
      term: 'Batch Management',
      definition: 'A function that manages quality, expiry dates, manufacturing dates, and traceability at the batch (lot) level for the same material. Batch Master records are created in MSC1N to store batch-specific attributes (manufacturing date, expiry date, quality characteristics). Essential for regulatory compliance (pharmaceutical GMP, food safety laws) and for trace-back/forward analysis during product recalls.',
    },
  },
  {
    id: 'work-center',
    modules: ['PP', 'CO'],
    ja: {
      term: '作業場所',
      reading: 'さぎょうばしょ',
      definition: '製造設備・機械・ラインまたは人員グループを表すPPのマスタデータ。CR01で作成し、能力（稼働シフト×台数/人数）・活動タイプ・責任者・原価センタリンクを保持する。Routing（作業手順）の各工程に作業場所を割り当て、能力計画（CM01）の対象単位となる。原価センタリンクにより製造作業コストがCOに転記される。',
    },
    en: {
      term: 'Work Center',
      definition: 'PP master data representing a manufacturing machine, equipment, production line, or group of personnel. Created in CR01 with capacity (operating shifts × machine/person count), activity types, responsible person, and cost center link. Work centers are assigned to operations in Routings and are the unit of capacity planning in CM01. The cost center link routes manufacturing activity costs to CO.',
    },
  },
  {
    id: 'planned-order',
    modules: ['PP', 'MM'],
    ja: {
      term: '計画指図',
      reading: 'けいかくさしず',
      definition: 'MRP実行後に自動生成される製造・調達の計画単位。製造品目には製造計画指図、購買品目には購買依頼が生成される。MD04（在庫/所要量リスト）で確認でき、CO41で製造指図に変換するか、購買依頼の場合はME57/ME59Nで発注に変換する。まだ確定していない暫定計画のため、修正・削除が可能。',
    },
    en: {
      term: 'Planned Order',
      definition: 'A provisional manufacturing or procurement planning unit automatically generated by the MRP run. Manufacturing materials generate planned production orders; purchased materials generate purchase requisitions. Visible in MD04 (Stock/Requirements List). Converted to production orders via CO41, or purchase requisitions to POs via ME57/ME59N. Still provisional and can be modified or deleted.',
    },
  },
  {
    id: 'gl-account',
    modules: ['FI', 'CO'],
    ja: {
      term: 'GL勘定（総勘定元帳勘定）',
      reading: 'じーえるかんじょう',
      definition: 'General Ledger Account。財務会計（FI）のすべての取引が集計される会計上の分類コード。FSS0またはFS00で作成し、勘定タイプ（貸借対照表・損益計算書）・勘定グループ・転記管理コードを設定する。すべてのSAP転記（仕訳）はGL勘定を通じて記録され、財務諸表を構成する。CO原価要素とGL勘定はS/4HANAで統合されている。',
    },
    en: {
      term: 'GL Account (General Ledger Account)',
      definition: 'The classification code in Financial Accounting (FI) where all transactions are aggregated. Created in FS00 with account type (balance sheet or P&L), account group, and posting control settings. All SAP postings (journal entries) are recorded through GL accounts to form financial statements. In S/4HANA, CO cost elements and GL accounts are unified.',
    },
  },
  {
    id: 'journal-entry',
    modules: ['FI'],
    ja: {
      term: '仕訳伝票',
      reading: 'しわけでんぴょう',
      definition: 'SAPにおけるFI財務転記の基本単位。少なくとも1借方・1貸方の転記明細から構成され、借方合計と貸方合計は必ず一致する。F-02（手動仕訳）・FB50（GL転記）等で作成する。伝票タイプ（SA・KR・DR等）と会計期間が設定され、転記後は原則として取消（FB08）または逆仕訳（FB08）で修正する。',
    },
    en: {
      term: 'Journal Entry (FI Document)',
      definition: 'The fundamental unit of financial posting in SAP FI, consisting of at least one debit and one credit line item where total debits equal total credits. Created with F-02 (manual entry), FB50 (GL posting), etc. Each document has a document type (SA, KR, DR, etc.) and posting period. After posting, corrections are made by reversal (FB08) rather than direct modification.',
    },
  },
  {
    id: 'payment-run',
    modules: ['FI', 'MM'],
    ja: {
      term: '支払実行',
      reading: 'しはらいじっこう',
      definition: '買掛金の支払処理を自動化するFIのバッチプログラム。F110（自動支払プログラム）で実行し、支払条件に基づく支払期日・現金割引を考慮して仕入先への支払提案リストを生成する。担当者が確認・修正後に支払実行することで、支払伝票の作成とFI転記が自動的に行われる。',
    },
    en: {
      term: 'Payment Run',
      definition: 'An FI batch program that automates accounts payable payment processing. Executed in F110 (Automatic Payment Program), which generates a payment proposal based on due dates and cash discount terms. After review and any adjustments by the AP team, the payment run creates payment documents and FI postings automatically.',
    },
  },
  {
    id: 'accounts-receivable',
    modules: ['FI', 'SD'],
    ja: {
      term: '売掛金',
      reading: 'うりかけきん',
      definition: '得意先への未収債権を管理するFI補助元帳。SDの請求書作成時に売掛金照合勘定へ自動転記される。FD32で与信管理と連動し、入金（F-28）により消込処理を行う。売掛金元帳は得意先マスタの会社コードデータに設定された照合勘定と常に一致する。月次処理では未消込残高の確認・督促管理が重要。',
    },
    en: {
      term: 'Accounts Receivable (AR)',
      definition: 'The FI subledger that manages outstanding receivables from customers. Automatically posted to the AR reconciliation account when SD billing is created. Integrated with credit management (FD32); cleared by incoming payments (F-28). The AR subledger always reconciles to the reconciliation account set in the customer master Company Code Data. Monthly processing includes reviewing open items and managing dunning.',
    },
  },
  {
    id: 'accounts-payable',
    modules: ['FI', 'MM'],
    ja: {
      term: '買掛金',
      reading: 'かいかけきん',
      definition: '仕入先への未払債務を管理するFI補助元帳。MMの請求照合（MIRO）時に買掛金照合勘定へ自動転記される。F110（自動支払プログラム）で支払実行し消込を行う。買掛金元帳は仕入先マスタの会社コードデータに設定された照合勘定と常に一致する。月次処理では未払残高・期日超過の確認が重要。',
    },
    en: {
      term: 'Accounts Payable (AP)',
      definition: 'The FI subledger that manages outstanding payables to vendors. Automatically posted to the AP reconciliation account when MM invoice verification (MIRO) is completed. Cleared by payment execution (F110). The AP subledger always reconciles to the reconciliation account in the vendor master Company Code Data. Monthly processing includes reviewing open items and overdue balances.',
    },
  },
  {
    id: 'asset-accounting',
    modules: ['FI'],
    ja: {
      term: '資産会計',
      reading: 'しさんかいけい',
      definition: 'FIの固定資産管理サブモジュール（FI-AA）。固定資産の取得・減価償却・廃棄・売却を管理する。AS01で資産マスタを作成し、减価償却キー（Dep. Key）・耐用年数・簿価を設定する。AFAB（減価償却実行）で定期的に減価償却を計上し、FIのGL勘定に自動転記する。S/4HANAではAFABはバックグラウンドジョブとして実行される。',
    },
    en: {
      term: 'Asset Accounting (FI-AA)',
      definition: 'The FI sub-module for fixed asset management. Manages asset acquisition, depreciation, retirement, and disposal. Asset masters are created in AS01 with depreciation key, useful life, and book value settings. AFAB (Depreciation Posting Run) periodically calculates and posts depreciation to GL accounts. In S/4HANA, AFAB runs as a background job.',
    },
  },
  {
    id: 'otc',
    modules: ['SD'],
    ja: {
      term: 'OTC（受注から入金まで）',
      reading: 'おーてぃーしー',
      definition: 'Order to Cash。SDの販売プロセス全体を表す業務フローの総称。照会（VA11）→見積（VA21）→受注（VA01）→出荷（VL01N）→PGI→請求（VF01）→入金（F-28）の一連の流れ。各ステップはSAPの伝票フロー（Document Flow）で追跡可能。SAPコンサルタント・プロジェクト管理において標準的に使用される用語。',
    },
    en: {
      term: 'OTC (Order to Cash)',
      definition: 'The end-to-end SD sales process: Inquiry (VA11) → Quotation (VA21) → Sales Order (VA01) → Delivery (VL01N) → PGI → Billing (VF01) → Payment Receipt (F-28). Each step is traceable in the SAP Document Flow. A standard term used by SAP consultants and project managers to describe the complete sales cycle.',
    },
  },
  {
    id: 'ptp',
    modules: ['MM'],
    ja: {
      term: 'PTP（購買から支払まで）',
      reading: 'ぴーてぃーぴー',
      definition: 'Purchase to Pay。MMの調達プロセス全体を表す業務フローの総称。購買依頼（ME51N）→購買発注（ME21N）→入庫（MIGO）→請求照合（MIRO）→支払実行（F110）の一連の流れ。内部統制の観点では3ウェイマッチング（PO・GR・請求書の照合）が重要なコントロールポイントとなる。',
    },
    en: {
      term: 'PTP (Purchase to Pay)',
      definition: 'The end-to-end MM procurement process: Purchase Requisition (ME51N) → Purchase Order (ME21N) → Goods Receipt (MIGO) → Invoice Verification (MIRO) → Payment Run (F110). Three-way matching (PO, GR, and invoice reconciliation) is a critical internal control point from a compliance perspective.',
    },
  },
  {
    id: 'division',
    modules: ['SD'],
    ja: {
      term: '製品部門',
      reading: 'せいひんぶもん',
      definition: '製品ラインやサービスカテゴリを分類するSDの組織単位。販売組織・流通チャネルと組み合わせて販売エリアを形成する。製品部門ごとに異なる価格条件・得意先マスタデータを設定できる。品目マスタの基本データ（販売組織データ1）で各品目に製品部門を割り当てる。',
    },
    en: {
      term: 'Division',
      definition: 'An SD organizational unit that classifies product lines or service categories. Combined with Sales Organization and Distribution Channel to form a Sales Area. Different pricing conditions and customer master data can be configured per Division. Each material is assigned to a Division in the material master Sales Organization Data 1 view.',
    },
  },
  {
    id: 'standard-price',
    modules: ['CO', 'MM'],
    ja: {
      term: '標準価格',
      reading: 'ひょうじゅんかかく',
      definition: '品目マスタの価格管理コードSで設定される在庫評価方法。製品原価計算（CK11N→CK24）により年次または期初に設定された固定単価で在庫を評価する。実際の入庫価格と標準価格の差額は価格差異勘定に転記される。完成品・半製品に適用されることが多く、差異分析により実績原価の管理に活用される。',
    },
    en: {
      term: 'Standard Price',
      definition: 'An inventory valuation method configured with price control code S in the Material Master. Inventory is valued at a fixed unit cost set annually or at period start via product cost estimation (CK11N → CK24). Differences between actual receipt prices and the standard price are posted to a price difference account. Commonly used for finished goods and semi-finished goods; standard vs. actual variance analysis drives cost control.',
    },
  },
  {
    id: 'teco',
    modules: ['PP', 'CO'],
    ja: {
      term: 'TECO（技術的完了）',
      reading: 'てこ',
      definition: 'Technically Complete。製造指図・内部指図の製造作業が完了したことを示すステータス。TECOになると入庫・出庫等の在庫操作は行えなくなるが、原価精算（CO88）は実行可能。TECO後にCO88精算・差異分析を行い、その後CLSDステータスへ移行する。指図のライフサイクル管理における重要なマイルストーン。',
    },
    en: {
      term: 'TECO (Technically Complete)',
      definition: 'A status applied to production orders and internal orders indicating that the physical/technical work is finished. After TECO, inventory movements (goods issues and receipts) are blocked, but cost settlement (CO88) can still be executed. The normal flow after TECO is CO88 settlement followed by variance analysis, then transition to CLSD (Closed) status. A key milestone in the order lifecycle.',
    },
  },
  {
    id: 'allocation',
    modules: ['CO'],
    ja: {
      term: '配賦',
      reading: 'はいふ',
      definition: '原価センタに蓄積されたコストを他の原価対象（製品・プロジェクト・他の原価センタ等）に振り替えるCO処理。アセスメント（Assessment：KSU5）は二次原価要素を使って一括配賦、ディストリビューション（Distribution：KSV5）は一次原価要素のまま配賦する。期末処理の一環として実行され、間接費を製品原価に含める際に使用される。',
    },
    en: {
      term: 'Allocation (CO)',
      definition: 'A CO process that transfers costs accumulated on cost centers to other cost objects (products, projects, other cost centers). Assessment (KSU5) allocates using secondary cost elements in a lump sum; Distribution (KSV5) allocates using the original primary cost elements. Executed as part of period-end processing to include overhead costs in product costing.',
    },
  },
  // ─── 追加語彙 ───
  {
    id: 'general-ledger',
    modules: ['FI'],
    ja: {
      term: '総勘定元帳',
      reading: 'そうかんじょうもとちょう',
      definition: 'GL（General Ledger）とも呼ばれる、すべての財務取引を勘定科目別に集計する元帳。補助元帳（売掛金・買掛金・固定資産等）からの転記が照合勘定を通じて自動反映される。SAPでは会社コードレベルで管理され、S/4HANAではUniversal Journal（ACDOCA）に統合されている。財務諸表（貸借対照表・損益計算書）の作成基盤となる。',
    },
    en: {
      term: 'General Ledger (GL)',
      definition: 'The central repository that aggregates all financial transactions by account. Subledger postings (AR, AP, fixed assets, etc.) are automatically reflected through reconciliation accounts. Managed at company code level in SAP; unified into the Universal Journal (ACDOCA) in S/4HANA. Forms the basis for financial statements (balance sheet and income statement).',
    },
  },
  {
    id: 'subledger',
    modules: ['FI'],
    ja: {
      term: '補助元帳',
      reading: 'ほじょもとちょう',
      definition: '総勘定元帳の特定勘定科目を詳細管理するサブレジャー。売掛金元帳（得意先別残高）・買掛金元帳（仕入先別残高）・固定資産元帳等がある。補助元帳への転記は照合勘定を通じて総勘定元帳に自動転記され、常に一致する。SAPでは得意先・仕入先・資産マスタがそれぞれ補助元帳の実体となる。',
    },
    en: {
      term: 'Subledger',
      definition: 'A detailed sub-ledger that manages specific GL accounts at a more granular level, including accounts receivable (by customer), accounts payable (by vendor), and fixed assets. Postings to subledgers are automatically reflected in the GL through reconciliation accounts, ensuring they always reconcile. In SAP, customer, vendor, and asset masters serve as the underlying entities for their respective subledgers.',
    },
  },
  {
    id: 'chart-of-accounts',
    modules: ['FI', 'CO'],
    ja: {
      term: '勘定科目表',
      reading: 'かんじょうかもくひょう',
      definition: '会社で使用するすべてのGL勘定科目を定義したリスト。クライアントレベルで管理され、複数の会社コードで共有できる（運営勘定科目表）。個別の会社コードに対する代替勘定科目表（Country Chart of Accounts）を別途定義することも可能。勘定グループにより勘定科目の性質（貸借対照表・損益）と採番範囲を制御する。',
    },
    en: {
      term: 'Chart of Accounts',
      definition: 'A list of all GL accounts used by a company, managed at client level and shareable across multiple company codes (Operating Chart of Accounts). A Country-Specific Chart of Accounts can also be defined per company code. Account groups control the nature of accounts (balance sheet or P&L) and number ranges. The chart of accounts is the structural backbone of FI financial reporting.',
    },
  },
  {
    id: 'document-type',
    modules: ['FI'],
    ja: {
      term: '伝票タイプ',
      reading: 'でんぴょうたいぷ',
      definition: 'FI仕訳伝票の種類を分類するコード。転記可能な勘定タイプ・採番範囲・逆転記可否などを制御する。代表的な伝票タイプ：SA（GL仕訳）・KR（仕入先請求書）・KZ（仕入先支払）・DR（得意先請求書）・DZ（得意先入金）・AA（資産転記）。伝票タイプにより会計管理・レポーティング・ワークフローが制御される。',
    },
    en: {
      term: 'Document Type',
      definition: 'A code that classifies FI journal entry documents, controlling which account types can be posted, the number range assigned, and reversal behavior. Key document types: SA (GL journal entry), KR (vendor invoice), KZ (vendor payment), DR (customer invoice), DZ (customer payment), AA (asset posting). Controls accounting management, reporting, and workflow behavior.',
    },
  },
  {
    id: 'posting-period',
    modules: ['FI'],
    ja: {
      term: '転記期間',
      reading: 'てんききかん',
      definition: '財務転記を受け付ける会計期間。転記日付（Posting Date）から自動決定され、OB52で開閉管理を行う。通常、当期および前期の一部期間のみ開放される。会計期間（FiscalYear・Period）は会社コードの会計年度バリアントによって定義される。特別期間（13〜16期）は年次決算後の調整転記に使用される。',
    },
    en: {
      term: 'Posting Period',
      definition: 'The accounting period that accepts financial postings, automatically derived from the posting date. Open/close periods are managed in OB52; typically only the current and a portion of the prior period are open. Fiscal periods are defined by the Fiscal Year Variant assigned to the company code. Special periods (13–16) are used for year-end adjustment postings after the regular year closes.',
    },
  },
  {
    id: 'depreciation',
    modules: ['FI'],
    ja: {
      term: '減価償却',
      reading: 'げんかしょうきゃく',
      definition: '固定資産の取得原価を耐用年数にわたって費用配分する会計処理。SAPではAFABトランザクションで月次に実行する。減価償却方法（定額法・定率法等）と耐用年数は減価償却キー（Depreciation Key）で設定される。S/4HANAではAFABはバックグラウンドジョブとして定期実行される。計上されたは減価償却費はP&Lに計上され、資産の帳簿価額が減少する。',
    },
    en: {
      term: 'Depreciation',
      definition: 'The accounting process of allocating the cost of a fixed asset over its useful life as an expense. In SAP, executed monthly using AFAB. The depreciation method (straight-line, declining balance, etc.) and useful life are configured via the Depreciation Key. In S/4HANA, AFAB runs as a scheduled background job. Depreciation expense is posted to P&L and reduces the asset\'s book value.',
    },
  },
  {
    id: 'payment-terms',
    modules: ['FI', 'MM', 'SD'],
    ja: {
      term: '支払条件',
      reading: 'しはらいじょうけん',
      definition: '請求書の支払期限と早期支払割引（現金割引）を定義する設定。得意先マスタ（会社コードデータ・販売エリアデータ）および仕入先マスタ（会社コードデータ・購買組織データ）に設定される。例：「30日後払い、10日以内なら2%割引」など。受注・購買発注時に自動引継ぎされ、支払実行（F110）の起算点となる。',
    },
    en: {
      term: 'Payment Terms',
      definition: 'Configuration that defines invoice payment due dates and early payment discounts (cash discounts). Set in the customer master (Company Code and Sales Area data) and vendor master (Company Code and Purchasing Org data). Example: "Net 30, 2% discount if paid within 10 days." Automatically inherited on sales orders and purchase orders; serves as the basis for payment run (F110) date calculations.',
    },
  },
  {
    id: 'controlling-area',
    modules: ['CO'],
    ja: {
      term: '管理領域',
      reading: 'かんりりょういき',
      definition: 'Controlling Area。CO管理会計の最上位組織単位。1つ以上の会社コードを束ね、原価センタ・利益センタ・内部指図などのCOオブジェクトを管理する。管理領域内の全会社コードは同一の会計年度バリアントを使用する必要がある。管理領域は通常、企業グループ単位で設定され、グループ全体の管理会計情報を集約する。',
    },
    en: {
      term: 'Controlling Area',
      definition: 'The highest-level organizational unit in CO Controlling. Groups one or more company codes and manages CO objects such as cost centers, profit centers, and internal orders. All company codes within a controlling area must share the same fiscal year variant. Typically set at the corporate group level to consolidate management accounting information across the group.',
    },
  },
  {
    id: 'assessment',
    modules: ['CO'],
    ja: {
      term: 'アセスメント（間接費配賦）',
      reading: 'あせすめんと',
      definition: '原価センタに蓄積された間接費を二次原価要素を使って他の原価対象（別の原価センタ・製造指図等）に振り替えるCO配賦方法。KSU5（一括実行）またはKSU1（個別）で実施する。ディストリビューション（KSV5）と異なり、配賦後は二次原価要素として表示されるため、元の一次原価要素の内訳は受け取り側には見えない。',
    },
    en: {
      term: 'Assessment',
      definition: 'A CO allocation method that uses secondary cost elements to transfer overhead costs accumulated on a cost center to other cost objects (other cost centers, production orders, etc.). Executed with KSU5 (collective run) or KSU1 (individual). Unlike Distribution (KSV5), costs received via Assessment appear under secondary cost elements, hiding the original primary cost element breakdown on the receiving side.',
    },
  },
  {
    id: 'distribution-co',
    modules: ['CO'],
    ja: {
      term: 'ディストリビューション（一次配賦）',
      reading: 'でぃすとりびゅーしょん',
      definition: '原価センタの一次原価要素（直接費・間接費）をそのままの原価要素で他の原価センタへ振り替えるCO配賦方法。KSV5（一括）またはKSV1（個別）で実施する。受け取り側の原価センタには元の原価要素（人件費・電力費等）が詳細に見える点がアセスメントとの違い。管理上の透明性が高い配賦方法。',
    },
    en: {
      term: 'Distribution (CO)',
      definition: 'A CO allocation method that transfers primary cost element amounts from one cost center to others while preserving the original primary cost elements. Executed with KSV5 (collective) or KSV1 (individual). Unlike Assessment, the receiving cost center can see the original cost element breakdown (labor, energy, etc.), providing greater management transparency.',
    },
  },
  {
    id: 'inquiry',
    modules: ['SD'],
    ja: {
      term: '照会',
      reading: 'しょうかい',
      definition: 'SDプリセールスプロセスの伝票タイプIN。VA11で作成し、得意先からの情報収集・引き合い段階を記録する。在庫引き当て・ATPチェックへの影響はなく、請求・出荷の後続処理も発生しない。見積（Quotation）の前段階として位置付けられ、コピー管理を設定することで見積・受注にデータを引き継げる。',
    },
    en: {
      term: 'Inquiry',
      definition: 'An SD pre-sales document (type IN) created in VA11 to record initial customer inquiries and information requests. Does not trigger stock reservations, ATP checks, or downstream delivery/billing processing. Positioned as the step before a Quotation in the OTC flow; data can be copied to Quotations and Sales Orders via Copy Control configuration.',
    },
  },
  {
    id: 'quotation',
    modules: ['SD'],
    ja: {
      term: '見積',
      reading: 'みつもり',
      definition: 'SDプリセールスプロセスの伝票タイプQT。VA21で作成し、得意先に対して価格・数量・納期を確約する拘束力のある提案書。有効期限（Validity Period）を設定でき、期間内のみ提示条件が有効。見積から受注へのコピー管理設定により、データを受注に引き継げる。見積の受注変換率（コンバージョン率）は販売実績分析に使用される。',
    },
    en: {
      term: 'Quotation',
      definition: 'An SD pre-sales document (type QT) created in VA21 that constitutes a binding offer to a customer with committed price, quantity, and delivery date. A Validity Period can be set during which the quoted terms are valid. Copy Control transfers data to sales orders. The quotation-to-order conversion rate is used for sales performance analysis.',
    },
  },
  {
    id: 'order-type',
    modules: ['SD'],
    ja: {
      term: '受注タイプ',
      reading: 'じゅちゅうたいぷ',
      definition: 'SD販売伝票の種類を決定するコード。受注タイプにより出荷・請求・価格設定の動作が制御される。代表的な受注タイプ：OR（標準受注）・RE（返品）・CR（クレジットメモ依頼）・DR（デビットメモ依頼）・RO（修理依頼）。VOV8でカスタマイズされ、リリースブロック・請求ブロック・ATPチェック有否等を設定できる。',
    },
    en: {
      term: 'Order Type (SD)',
      definition: 'A code that determines the type of SD sales document, controlling shipping, billing, and pricing behavior. Key order types: OR (standard order), RE (returns), CR (credit memo request), DR (debit memo request), RO (repair order). Customized in VOV8, where settings such as billing block, release block, and ATP check requirements are configured.',
    },
  },
  {
    id: 'item-category-sd',
    modules: ['SD'],
    ja: {
      term: '明細カテゴリ（SD）',
      reading: 'めいさいかてごりー',
      definition: '受注明細の動作（出荷・請求・原価計算）を制御するSDの分類コード。受注タイプと品目カテゴリグループ（品目マスタで設定）の組み合わせで自動決定される。TAN（標準品目）・TANN（無償品目）・TAD（サービス）・TAB（個別受注品）などが代表例。明細カテゴリにより在庫引き当て・ATPチェック・原価計算の有無が決まる。',
    },
    en: {
      term: 'Item Category (SD)',
      definition: 'A classification code that controls how a sales order line item behaves for delivery, billing, and costing. Automatically determined from the combination of Order Type and Item Category Group (set in the material master). Key examples: TAN (standard item), TANN (free-of-charge item), TAD (service), TAB (make-to-order item). Determines whether ATP, stock reservation, and costing apply to the line.',
    },
  },
  {
    id: 'credit-memo',
    modules: ['SD', 'FI'],
    ja: {
      term: 'クレジットメモ',
      reading: 'くれじっとめも',
      definition: '得意先への金額調整（減額）を行う処理。SDではクレジットメモ依頼（CR：VA01）を作成し、承認後に請求書タイプG2のクレジットメモを発行する。在庫の物理的な返却は伴わない（返品入庫が必要な場合は返品受注REを使用）。FIでは売掛金の残高を減少させる逆方向の転記が自動実行される。',
    },
    en: {
      term: 'Credit Memo',
      definition: 'A document that reduces the amount owed by a customer. In SD, a Credit Memo Request (CR type, VA01) is created and, after approval, a credit memo billing document (type G2) is issued. No physical stock return is involved — use a Returns Order (RE) if stock must be returned. In FI, the credit memo automatically posts a reversal that reduces accounts receivable.',
    },
  },
  {
    id: 'shipping-conditions',
    modules: ['SD'],
    ja: {
      term: '出荷条件',
      reading: 'しゅっかじょうけん',
      definition: '製品の配送方法（輸送モード・梱包条件等）を定義するSDのコード。得意先マスタの販売エリアデータに設定され、受注時に自動引継ぎされる。出荷条件は出荷ポイント（Shipping Point）の決定ロジックに使用され、どの出荷場所から出庫するかを制御する。出荷ポイントは出荷条件・積み込み地域・出荷場所条件の組み合わせで決定される。',
    },
    en: {
      term: 'Shipping Conditions',
      definition: 'An SD code that defines the mode or method of delivery (transportation mode, packaging requirements, etc.). Set in the customer master Sales Area Data and automatically copied to sales orders. Used in Shipping Point determination logic to control which shipping location processes the outbound delivery. The shipping point is determined by the combination of Shipping Conditions, Loading Group, and Delivering Plant.',
    },
  },
  {
    id: 'purchasing-organization',
    modules: ['MM'],
    ja: {
      term: '購買組織',
      reading: 'こうばいそしき',
      definition: '仕入先との購買条件交渉・契約締結の責任を持つMMの組織単位。1つ以上のプラントに割り当てられ、購買情報レコード・枠契約の条件はこのレベルで管理される。購買組織は会社コードに帰属するか、グループ全体（クロス会社コード）で設定できる。発注（ME21N）時に購買組織を指定することで適切な仕入先条件が引き当てられる。',
    },
    en: {
      term: 'Purchasing Organization',
      definition: 'An MM organizational unit responsible for negotiating purchasing conditions and contracts with vendors. Assigned to one or more plants; purchasing info records and outline agreement conditions are maintained at this level. Can be assigned to a single company code or configured as a cross-company-code purchasing organization. The purchasing organization selected on a PO (ME21N) determines which vendor conditions apply.',
    },
  },
  {
    id: 'purchasing-group',
    modules: ['MM'],
    ja: {
      term: '購買グループ',
      reading: 'こうばいぐるーぷ',
      definition: '購買担当者または担当者グループを表すMMの分類コード。購買依頼・購買発注の担当責任者を識別し、レポーティング・ワークフロー・リリース戦略の条件として使用される。購買組織のサブ組織として機能するが、独立した組織階層ではなく、マスタデータ属性の一つ。担当者別の購買実績分析にも活用される。',
    },
    en: {
      term: 'Purchasing Group',
      definition: 'An MM classification code representing a buyer or group of buyers responsible for purchasing activities. Identifies the responsible person on purchase requisitions and purchase orders, and is used as a condition in reporting, workflow, and release strategies. Functions as a sub-unit of the purchasing organization but is a master data attribute rather than a separate organizational hierarchy level.',
    },
  },
  {
    id: 'storage-location',
    modules: ['MM', 'PP'],
    ja: {
      term: '保管場所',
      reading: 'ほかんばしょ',
      definition: 'プラント内の物理的な在庫保管場所を表すMMの組織単位。倉庫・棚・ゾーンなど実際の保管場所に対応する。在庫はプラント＋保管場所の組み合わせで管理され、MMBE（在庫状況照会）で確認できる。1つのプラントに複数の保管場所を設定でき、保管場所間の移動は移動タイプ311で処理する。',
    },
    en: {
      term: 'Storage Location',
      definition: 'An MM organizational unit that represents a physical storage area within a plant, such as a warehouse, shelf, or zone. Inventory is managed at the plant + storage location combination and can be viewed in MMBE (Stock Overview). Multiple storage locations can be defined per plant. Transfers between storage locations within the same plant use movement type 311.',
    },
  },
  {
    id: 'material-type',
    modules: ['MM'],
    ja: {
      term: '品目タイプ',
      reading: 'ひんもくたいぷ',
      definition: '品目マスタの基本分類コード。在庫管理の有無・評価方法・表示されるマスタデータビューを制御する。代表的な品目タイプ：ROH（原材料）・HALB（半製品）・FERT（完成品）・NLAG（非在庫品）・DIEN（サービス）。品目タイプは評価クラスと連動し、在庫のGL勘定決定にも影響する。',
    },
    en: {
      term: 'Material Type',
      definition: 'The fundamental classification code in the Material Master that controls whether inventory is managed, how it is valuated, and which master data views are displayed. Key material types: ROH (raw material), HALB (semi-finished), FERT (finished product), NLAG (non-stock item), DIEN (service). Material Type is linked to the Valuation Class and influences GL account determination for inventory.',
    },
  },
  {
    id: 'make-to-stock',
    modules: ['PP', 'SD'],
    ja: {
      term: '見込生産（MTS）',
      reading: 'みこみせいさん',
      definition: 'Make to Stock。受注前に需要予測（PIR）に基づいて製品を事前製造し在庫として確保する生産方式。完成品在庫から受注に対して出荷する。製造コストは製品在庫に集計され、受注明細との直接紐付けはない。食品・消耗品・標準品など安定した需要のある製品に適している。SAPではMRP方式PDと品目マスタのPIR消費設定で実装する。',
    },
    en: {
      term: 'Make to Stock (MTS)',
      definition: 'A production strategy where products are manufactured in advance based on demand forecasts (PIRs) and held in finished goods inventory before orders are received. Production costs are collected in finished goods stock with no direct link to individual sales orders. Suited for products with stable demand such as consumer goods and standard items. Implemented in SAP with MRP type PD and PIR consumption settings in the material master.',
    },
  },
  {
    id: 'make-to-order',
    modules: ['PP', 'SD'],
    ja: {
      term: '個別生産（MTO）',
      reading: 'こべつせいさん',
      definition: 'Make to Order。得意先受注を受けてから製造を開始し、特定の受注明細に紐付けて製造・出荷する生産方式。製造コストは特定受注に集計され、受注紐付きの特殊在庫として管理される。カスタマイズ品・高価格品・リードタイムが長い製品に適している。SAPでは品目マスタの個別仕入ポイントに特別調達キー（コード20等）を設定して実装する。',
    },
    en: {
      term: 'Make to Order (MTO)',
      definition: 'A production strategy where manufacturing starts only after a customer order is received, with the production order directly linked to a specific sales order line. Manufacturing costs are collected against the specific sales order; finished goods are managed as sales-order stock. Suited for customized products, high-value items, and long lead-time goods. Implemented in SAP via the Special Procurement Key (e.g., code 20) in the material master MRP views.',
    },
  },
  {
    id: 'mrp-type',
    modules: ['PP', 'MM'],
    ja: {
      term: 'MRP方式',
      reading: 'えむあーるぴーほうしき',
      definition: '品目マスタのMRPデータ画面で設定するMRP計画方法コード。PD（MRP：BOM展開・正味所要量計算の標準方式）・VB（再発注点：在庫が基準量を下回ったとき計画指図を自動生成）・ND（計画なし：MRPの対象外）が代表的。品目の調達特性・需要変動パターンに応じて適切なMRP方式を選択することが計画精度向上の鍵となる。',
    },
    en: {
      term: 'MRP Type',
      definition: 'A code set in the Material Master MRP data view that determines the planning method. Key types: PD (MRP — standard BOM explosion and net requirements calculation), VB (Reorder Point — automatically generates planned orders when stock falls below the reorder point), ND (No Planning — excluded from MRP). Selecting the appropriate MRP type based on procurement characteristics and demand patterns is key to planning accuracy.',
    },
  },
  {
    id: 'capacity-planning',
    modules: ['PP'],
    ja: {
      term: '能力計画',
      reading: 'のうりょくけいかく',
      definition: '作業場所（Work Center）の稼働能力に対して製造指図・計画指図の負荷（ロード）を管理するPP機能。CM01（能力評価）で作業場所ごとのキャパシティとロードを確認する。無限能力計画（能力制約なしのスケジューリング）と有限能力計画（能力制約を考慮したスケジューリング）の2モードがある。能力超過（オーバーロード）の発見と製造計画の調整が主な目的。',
    },
    en: {
      term: 'Capacity Planning',
      definition: 'A PP function that manages the load (demand) from production orders and planned orders against the available capacity of work centers. CM01 (Capacity Evaluation) displays capacity vs. load per work center. Two modes: Infinite Capacity Planning (scheduling without capacity constraints) and Finite Capacity Planning (scheduling respects capacity limits). Primary goal is identifying overloads and adjusting the production schedule accordingly.',
    },
  },
  {
    id: 'abc-analysis',
    modules: ['MM'],
    ja: {
      term: 'ABC分析',
      reading: 'えーびーしーぶんせき',
      definition: '在庫品目を消費金額・重要度に応じてA・B・C の3段階に分類する管理手法。A品目（高価値・高重要度）は全品目数の約20%だが在庫金額の約80%を占める（パレートの法則）。B品目は中間、C品目（低価値）は多数を占めるが金額は小さい。SAPの循環棚卸ではABC分類に基づき棚卸頻度を自動設定できる。MRPや発注方式の選択にも活用される。',
    },
    en: {
      term: 'ABC Analysis',
      definition: 'A management technique that classifies inventory materials into three tiers (A, B, C) based on consumption value or importance. A-items (high value/importance) typically represent ~20% of items but ~80% of inventory value (Pareto principle). B-items are intermediate; C-items are numerous but low in value. In SAP cycle counting, counting frequency is automatically set based on ABC class. Also used for selecting MRP types and reorder policies.',
    },
  },
  {
    id: 'customer-group',
    modules: ['SD'],
    ja: {
      term: '得意先グループ',
      reading: 'とくいさきぐるーぷ',
      definition: '得意先を分類するSDコード。得意先マスタ（一般データ）に設定し、勘定決定・価格設定・統計分析・与信管理の分類基準として使用される。例：得意先グループ01（大手小売）・02（卸売業者）など業態別に分類する。得意先グループは与信限度額の設定根拠にはならず（与信エリア・FD32で管理）、あくまで分類・分析目的で使用される。',
    },
    en: {
      term: 'Customer Group',
      definition: 'An SD code that classifies customers, set in the customer master General Data. Used as a classification basis for account determination, pricing, statistical analysis, and credit management grouping. Examples: Group 01 (large retailers), Group 02 (wholesalers), categorized by business type. Customer Group does not directly set credit limits (managed via Credit Control Area in FD32); it serves as a classification and analysis attribute.',
    },
  },
  {
    id: 'repetitive-manufacturing',
    modules: ['PP'],
    ja: {
      term: '繰り返し製造',
      reading: 'くりかえしせいぞう',
      definition: 'Repetitive Manufacturing。同一製品を連続的に大量生産する生産方式に対応するPP機能。製造指図単位ではなく生産ラインと期間ベースで生産を管理する。REM（Repetitive Manufacturing）では製造指図の代わりにREM生産計画明細（REM Reporting Backflush）を使用し、バックフラッシュ確認で実績を一括登録する。自動車・電子機器などライン生産に適している。',
    },
    en: {
      term: 'Repetitive Manufacturing',
      definition: 'A PP production mode designed for continuous, high-volume production of the same product on a production line. Manages production by line and time period rather than individual production orders. Uses REM production planning lines and backflush confirmations (REM Reporting Backflush) instead of discrete production orders, enabling bulk actual postings. Suited for automotive, electronics, and other line production environments.',
    },
  },
  {
    id: 'condition-technique',
    modules: ['SD', 'MM'],
    ja: {
      term: 'コンディション技術',
      reading: 'こんでぃしょんぎじゅつ',
      definition: 'SAPの汎用的な条件決定エンジン。価格決定・勘定決定・出力管理・税計算など多くのビジネスロジックに共通して使用される。「条件タイプ→アクセスシーケンス→条件テーブル→条件レコード」の階層で構成され、柔軟なビジネスルール設定を可能にする。SDの価格設定手順やMMのメッセージ管理など幅広く活用されている。',
    },
    en: {
      term: 'Condition Technique',
      definition: 'SAP\'s generic condition determination engine used across many business scenarios including pricing, account determination, output management, and tax calculation. Structured as a hierarchy: Condition Type → Access Sequence → Condition Table → Condition Record. Enables flexible business rule configuration. Widely used in SD pricing procedures and MM message control, among others.',
    },
  },
];
