import type { GlossaryTerm } from './glossary';

/**
 * Third expansion of the glossary: eight terms per module, chosen from what
 * learners meet in their first projects but the earlier sets left out.
 */
export const moreTerms: GlossaryTerm[] = [
  // ─── FI ──────────────────────────────────────────────────────
  {
    id: 'tax-code',
    modules: ['FI', 'SD', 'MM'],
    ja: {
      term: '税コード',
      reading: 'ぜいこーど',
      definition: '消費税などの税率と、税額を転記する勘定を決める2桁のコード。FTXPで国ごとの税計算手順にもとづいて定義し、伝票明細に指定することで税額が自動計算される。日本では標準税率10%と軽減税率8%、課税仕入と課税売上、対象外・非課税などを区別するため、複数の税コードを使い分ける。SDやMMでは税コードもコンディション技術で自動決定される。',
    },
    en: {
      term: 'Tax Code',
      definition: 'A two-character code that fixes the tax rate and the account to which tax is posted. Tax codes are defined in FTXP against a country’s tax calculation procedure, and entering one on a line item calculates the tax automatically. In Japan separate codes distinguish the 10% standard and 8% reduced rates, input and output tax, and exempt or out-of-scope items. In SD and MM the tax code is itself derived by condition technique.',
    },
  },
  {
    id: 'withholding-tax',
    modules: ['FI'],
    ja: {
      term: '源泉徴収税',
      reading: 'げんせんちょうしゅうぜい',
      definition: '支払の際に税額を差し引き、支払先に代わって税務当局へ納める仕組み。SAPでは拡張源泉徴収税が標準で、源泉徴収税タイプ（いつ計算するか）と源泉徴収税コード（税率など）を仕入先マスタに設定する。日本では個人への報酬や料金の支払が対象となる。計算のタイミングを請求書転記時と支払時のどちらにするかで、会計処理と帳票の作り方が変わる。',
    },
    en: {
      term: 'Withholding Tax',
      definition: 'Tax deducted at payment and remitted to the authorities on the payee’s behalf. Extended withholding tax is the standard in SAP: the withholding tax type determines when tax is calculated and the withholding tax code sets the rate, both maintained on the vendor master. In Japan it applies chiefly to fees paid to individuals. Whether tax is calculated at invoice or at payment changes both the postings and the reporting.',
    },
  },
  {
    id: 'house-bank',
    modules: ['FI'],
    ja: {
      term: '取引銀行（ハウスバンク）',
      reading: 'とりひきぎんこう',
      definition: '会社コードが実際に口座を持っている銀行を表すマスタ。最大5桁の取引銀行IDの下に、口座IDごとに銀行口座と対応するGL勘定を持つ。自動支払プログラムはどの取引銀行・口座から支払うかをこの設定から決定し、電子銀行取引明細の取込でも口座の特定に使う。S/4HANAでは銀行口座管理と連携して管理される。',
    },
    en: {
      term: 'House Bank',
      definition: 'Master data for a bank at which a company code actually holds accounts. Under a house bank ID of up to five characters, each account ID carries a bank account and its corresponding G/L account. The payment program uses this to choose which bank and account to pay from, and bank statement import uses it to identify the account. In S/4HANA it is maintained together with Bank Account Management.',
    },
  },
  {
    id: 'electronic-bank-statement',
    modules: ['FI'],
    ja: {
      term: '電子銀行取引明細',
      reading: 'でんしぎんこうとりひきめいさい',
      definition: '銀行から受け取った入出金明細のファイルを取り込み、仕訳と消込を自動で行う機能。MT940やCAMT.053、日本の全銀フォーマットなどに対応する。明細の取引コードを転記ルールに対応づけ、解釈アルゴリズムで参照番号から消込対象の未決済明細を探す。自動で消し込めなかった明細はFEBANで後処理する。入金消込の工数削減に直結する。',
    },
    en: {
      term: 'Electronic Bank Statement',
      definition: 'Import of the bank’s statement file with automatic posting and clearing. Formats such as MT940, CAMT.053 and Japan’s Zengin format are supported. Each transaction code on the statement maps to a posting rule, and interpretation algorithms search reference fields for the open items to clear. Items that cannot be cleared automatically are post-processed in FEBAN. It is one of the largest labour savings in cash application.',
    },
  },
  {
    id: 'fiscal-year-variant',
    modules: ['FI', 'CO'],
    ja: {
      term: '会計年度バリアント',
      reading: 'かいけいねんどばりあんと',
      definition: '会計年度の始まりと、通常期間・特別期間の数を定義する設定。暦年と一致するK4、4月始まり3月決算のV3がよく使われ、3月決算の多い日本ではV3系を採用する例が多い。特別期間は最大4つで、決算整理仕訳を通常の12期間と分けて転記するために使う。会社コードに割り当て、管理領域とも一致させる必要がある。',
    },
    en: {
      term: 'Fiscal Year Variant',
      definition: 'The setting that defines when the fiscal year starts and how many normal and special periods it has. K4 matches the calendar year and V3 runs April to March, which suits the many Japanese companies with a March year-end. Up to four special periods keep year-end adjustments separate from the twelve normal periods. The variant is assigned to the company code and must match the controlling area.',
    },
  },
  {
    id: 'document-splitting',
    modules: ['FI'],
    ja: {
      term: '伝票分割',
      reading: 'でんぴょうぶんかつ',
      definition: '新総勘定元帳の機能で、伝票の明細を利益センタやセグメントなどの特性ごとに分割し、特性単位でも貸借が一致するようにする仕組み。これにより利益センタ別・セグメント別の貸借対照表が作成できる。分割できない残差はゼロバランス勘定で調整される。稼働後に有効化するのは難しく、導入時に要否を判断すべき代表的な項目。',
    },
    en: {
      term: 'Document Splitting',
      definition: 'A New G/L function that splits line items by characteristics such as profit centre or segment so that each characteristic balances on its own. This is what makes a balance sheet by profit centre or segment possible. Where a split does not balance, zero-balance clearing lines are generated. Activating it after go-live is difficult, so whether it is needed is one of the decisions to make during implementation.',
    },
  },
  {
    id: 'recurring-entry',
    modules: ['FI'],
    ja: {
      term: '定期伝票',
      reading: 'ていきでんぴょう',
      definition: '家賃やリース料のように毎月同じ金額で発生する仕訳を、雛形として登録しておく機能。FBD1で登録した時点では転記されず、定期実行プログラムF.14を実行すると、実行日付に該当する伝票がバッチインプットセッションとして作成され、SM35で処理すると転記される。金額は固定なので、変動する取引には向かない。',
    },
    en: {
      term: 'Recurring Entry',
      definition: 'A template for postings that repeat with the same amount, such as rent or lease payments. Creating one in FBD1 posts nothing; running F.14 generates a batch input session for the entries due, and processing that session in SM35 posts them. Because the amount is fixed, recurring entries are unsuitable for transactions that vary from period to period.',
    },
  },
  {
    id: 'open-item-management',
    modules: ['FI'],
    ja: {
      term: '未決済明細管理',
      reading: 'みけっさいめいさいかんり',
      definition: 'GL勘定に設定するフラグで、転記された明細を「未決済」として残し、対応する明細と消し込むまで追跡できるようにする。入庫請求仮勘定や銀行の仮勘定など、発生と解消が対になる勘定に使う。残高だけでは中身がわからない勘定の内訳を明細単位で説明できる。転記済みの勘定に後から設定を変えるには専用の処理が必要になる。',
    },
    en: {
      term: 'Open Item Management',
      definition: 'A G/L account flag that keeps posted items open until they are cleared against matching items. It belongs on accounts where every entry should later be offset, such as GR/IR clearing or bank clearing accounts, so that the balance can be explained item by item rather than as a single number. Changing the flag on an account that already has postings requires a dedicated conversion step.',
    },
  },

  // ─── CO ──────────────────────────────────────────────────────
  {
    id: 'standard-hierarchy',
    modules: ['CO'],
    ja: {
      term: '標準階層',
      reading: 'ひょうじゅんかいそう',
      definition: '管理領域ごとに1つ定義する原価センタの階層構造。すべての原価センタはいずれかのノードに属さなければならず、組織全体の原価を漏れなく集計する土台になる。OKEONで保守する。事業部別や地域別など別の切り口で集計したい場合は、標準階層を変えるのではなく原価センタグループを別に作成する。利益センタにも同様の標準階層がある。',
    },
    en: {
      term: 'Standard Hierarchy',
      definition: 'The single cost centre hierarchy defined for each controlling area. Every cost centre must sit under one of its nodes, which guarantees that costs across the organisation roll up completely. It is maintained in OKEON. Alternative views, by division or region for example, are built as separate cost centre groups rather than by reshaping the standard hierarchy. Profit centres have an equivalent structure.',
    },
  },
  {
    id: 'plan-version',
    modules: ['CO'],
    ja: {
      term: '計画バージョン',
      reading: 'けいかくばーじょん',
      definition: '管理会計の計画データを並行して保持するための区分。バージョン0は実績と計画の両方を持つ基本バージョンで、管理領域の作成時に用意される。楽観・悲観シナリオや予算修正など、別の計画を持ちたい場合はバージョンを追加する。KP97などで計画を別バージョンへコピーでき、実績との比較レポートではどのバージョンと比べるかを指定する。',
    },
    en: {
      term: 'Plan Version',
      definition: 'A container that lets several sets of controlling plan data exist side by side. Version 0 holds both actual and plan data and is created with the controlling area. Further versions hold alternative plans such as optimistic and pessimistic scenarios or budget revisions. Plans can be copied between versions, for example with KP97, and plan/actual reports specify which version to compare against.',
    },
  },
  {
    id: 'product-cost-collector',
    modules: ['CO', 'PP'],
    ja: {
      term: '製品原価コレクタ',
      reading: 'せいひんげんかこれくた',
      definition: '製造指図ごとではなく、品目と製造バージョンの単位で期間ごとに原価を集計する原価集計対象。KKF6Nで作成する。繰返生産では標準的に使われ、製造指図を使う場合でも期間単位で管理したいときに選べる。月末に仕掛品と差異を計算し、期間ごとに決済するため、指図の完了を待たずに原価差異を把握できる。',
    },
    en: {
      term: 'Product Cost Collector',
      definition: 'A cost object that collects costs by period for a material and production version rather than by individual order. It is created in KKF6N. Repetitive manufacturing uses it as standard, and order-based production can adopt it where period-based control is preferred. Work in process and variances are calculated at month end and the collector is settled each period, so variances are visible without waiting for orders to finish.',
    },
  },
  {
    id: 'transfer-price',
    modules: ['CO', 'FI'],
    ja: {
      term: '振替価格',
      reading: 'ふりかえかかく',
      definition: '会社コード間や利益センタ間でモノやサービスを受け渡す際の社内価格。法定評価（会社単位）、グループ評価（連結から見た原価）、利益センタ評価の3つの視点で異なる価格を並行して持てる。これにより、各社の利益と、グループ内部利益を除いた連結ベースの原価を同時に把握できる。並行評価には品目元帳の設定が必要。',
    },
    en: {
      term: 'Transfer Price',
      definition: 'The internal price charged when goods or services pass between company codes or profit centres. Separate prices can be held in parallel for legal valuation, group valuation (cost as the consolidated group sees it) and profit centre valuation. That allows each entity’s profit and the group’s cost excluding intercompany margin to be reported at the same time. Parallel valuation requires the material ledger.',
    },
  },
  {
    id: 'universal-allocation',
    modules: ['CO'],
    ja: {
      term: 'ユニバーサル配分',
      reading: 'ゆにばーさるはいぶん',
      definition: 'S/4HANAで提供される、配賦・配分の新しい仕組み。原価センタ、利益センタ、収益性分析で別々のトランザクションに分かれていた配賦を、Fioriアプリ「配分の管理」で共通の操作に統一した。サイクルの実行結果を送信側・受信側の両方から追跡でき、テスト実行やシミュレーションもしやすい。従来のKSU5などのトランザクションも引き続き存在する。',
    },
    en: {
      term: 'Universal Allocation',
      definition: 'The S/4HANA approach to assessment and distribution. Allocations that once needed separate transactions for cost centres, profit centres and profitability analysis are unified in the Manage Allocations Fiori app. Results can be traced from both the sender and receiver side, and test runs and simulations are easier. Classic transactions such as KSU5 remain available.',
    },
  },
  {
    id: 'actual-costing',
    modules: ['CO', 'MM'],
    ja: {
      term: '実際原価計算',
      reading: 'じっさいげんかけいさん',
      definition: '品目元帳の機能で、期間中に発生した価格差異を在庫と売上原価に配分し、期末に実際原価ベースの期間単価を算出する。標準原価で転記した在庫を、月末に実際の原価で再評価できる。CKMLCPのコックピットで順番に処理する。S/4HANAでは品目元帳自体は必須だが、実際原価計算を有効化するかは任意で、処理負荷と得られる精度を比べて判断する。',
    },
    en: {
      term: 'Actual Costing',
      definition: 'A material ledger function that distributes the period’s price differences to inventory and cost of goods sold and calculates a periodic unit price at actual cost. Inventory posted at standard cost can thus be revalued to actual at month end, processed step by step in the CKMLCP cockpit. In S/4HANA the material ledger is mandatory but actual costing is optional, a trade-off between processing effort and accuracy.',
    },
  },
  {
    id: 'cost-estimate',
    modules: ['CO', 'PP'],
    ja: {
      term: '品目原価見積',
      reading: 'ひんもくげんかみつもり',
      definition: '部品表と作業手順から、製品1単位あたりの原価を積み上げ計算したもの。CK11Nで個別に、CK40Nで一括して作成する。材料費・加工費・間接費を原価要素ごとに算出し、CK24でマーク・リリースすると品目マスタの標準原価として有効になる。通常は期首に一度リリースし、期中の変更は差異として把握する。',
    },
    en: {
      term: 'Material Cost Estimate',
      definition: 'The unit cost of a product built up from its bill of materials and routing. It is created individually in CK11N or in bulk in CK40N, calculating material, production and overhead cost by cost component. Marking and releasing it in CK24 makes it the standard price on the material master. Release normally happens once at the start of a period, with later changes captured as variances.',
    },
  },
  {
    id: 'functional-area',
    modules: ['CO', 'FI'],
    ja: {
      term: '機能領域',
      reading: 'きのうりょういき',
      definition: '製造、販売、管理などの機能別に費用を分類する項目で、売上原価法による損益計算書を作成するために使う。原価センタのカテゴリやGL勘定から自動導出され、伝票の明細に保持される。日本の損益計算書は「売上原価」「販売費及び一般管理費」の区分が必要なため、機能領域の導出ルールを設計しておくとこの区分を仕訳から直接集計できる。',
    },
    en: {
      term: 'Functional Area',
      definition: 'A classification of expenses by function, such as production, sales or administration, used to produce a profit and loss statement under cost of sales accounting. It is derived automatically from the cost centre category or G/L account and stored on each line item. Japanese statements separate cost of sales from selling, general and administrative expenses, and well-designed derivation rules produce that split directly from postings.',
    },
  },

  // ─── SD ──────────────────────────────────────────────────────
  {
    id: 'schedule-line',
    modules: ['SD'],
    ja: {
      term: '納入日程行',
      reading: 'のうにゅうにっていぎょう',
      definition: '受注明細の下にある、「いつ・いくつ」納入するかを表す行。1つの明細に複数持つことができ、在庫が一部しか確保できない場合はATPチェックの結果として数量が日付ごとに分割される。納入日程行カテゴリがMRPへの所要量の引き渡しや出荷の対象かどうかを制御する。出荷伝票は明細ではなくこの行を単位に作成される。',
    },
    en: {
      term: 'Schedule Line',
      definition: 'A line beneath a sales order item stating how much is to be delivered and when. An item can have several; when only part of the quantity is available, the ATP check splits it across dates. The schedule line category controls whether requirements pass to MRP and whether the line is relevant for delivery. Deliveries are created from schedule lines rather than from the item as a whole.',
    },
  },
  {
    id: 'route-determination',
    modules: ['SD'],
    ja: {
      term: 'ルート決定',
      reading: 'るーとけってい',
      definition: '受注や出荷伝票に輸送ルートを自動設定する仕組み。出荷ポイントの出発国と地域、出荷先の地域、出荷条件、品目の輸送グループの組み合わせからルートを決める。ルートには輸送日数が定義されており、受注時の納期計算で「いつ出荷すれば間に合うか」を逆算するために使われる。ルートが決まらないと納期計算が狂う点に注意。',
    },
    en: {
      term: 'Route Determination',
      definition: 'The automatic assignment of a transport route to a sales order or delivery, derived from the departure country and zone of the shipping point, the ship-to party’s zone, the shipping condition and the material’s transportation group. Each route carries a transit time, which delivery scheduling uses to work back from the requested date to when goods must leave. A missing route throws that scheduling off.',
    },
  },
  {
    id: 'third-party-order',
    modules: ['SD', 'MM'],
    ja: {
      term: '第三者取引',
      reading: 'だいさんしゃとりひき',
      definition: '自社で在庫を持たず、仕入先から得意先へ直接納入させる販売形態。受注明細に明細カテゴリTASが設定されると購買依頼が自動作成され、購買発注として仕入先に送られる。自社の倉庫を経由しないため出荷伝票は作成されない。得意先への請求は、仕入先からの請求書の数量を基準にするか、統計的な入庫の数量を基準にするかを設定で選ぶ。',
    },
    en: {
      term: 'Third-Party Order',
      definition: 'A sale in which the vendor delivers straight to the customer and no stock passes through the company. Item category TAS on the sales order creates a purchase requisition automatically, which becomes a purchase order to the vendor. No outbound delivery is created because nothing leaves the company’s warehouse. Customer billing can be based on the quantity in the vendor invoice or on a statistical goods receipt.',
    },
  },
  {
    id: 'returns',
    modules: ['SD', 'MM'],
    ja: {
      term: '返品',
      reading: 'へんぴん',
      definition: '得意先から商品が戻る取引。返品受注（伝票タイプRE）を登録し、返品出荷伝票で入庫すると、移動タイプ651で返品用の保留在庫に計上される。検品のあと、再販可能なら非制限在庫へ、不良なら廃棄などへ振り替える。返品受注には請求ブロックが既定で付き、内容を確認してから解除してクレジットメモを発行する。S/4HANAでは高度返品管理も使える。',
    },
    en: {
      term: 'Returns',
      definition: 'Goods coming back from a customer. A returns order (order type RE) is created and the return delivery is received with movement type 651 into blocked returns stock. After inspection the goods move to unrestricted stock if resaleable, or to scrapping if not. A billing block is set on the returns order by default and released once checked, allowing a credit memo. S/4HANA also offers Advanced Returns Management.',
    },
  },
  {
    id: 'intercompany-sales',
    modules: ['SD', 'FI'],
    ja: {
      term: '会社間販売',
      reading: 'かいしゃかんはんばい',
      definition: '受注を受けた販売組織の会社コードと、出荷するプラントの会社コードが異なる取引。得意先には販売側の会社が請求し、出荷した会社は販売側の会社に対して会社間請求（請求タイプIV）を発行する。社内価格はPI01などの条件タイプで決まる。販売側の会社では仕入先請求書の登録が必要になり、IDocで自動化することも多い。',
    },
    en: {
      term: 'Intercompany Sales',
      definition: 'A sale where the sales organisation taking the order and the plant shipping the goods belong to different company codes. The selling company bills the customer, and the delivering company issues an intercompany invoice (billing type IV) to the selling company, with the internal price set by condition types such as PI01. The selling company must then post a vendor invoice, often automated through IDocs.',
    },
  },
  {
    id: 'free-goods',
    modules: ['SD'],
    ja: {
      term: '無償品',
      reading: 'むしょうひん',
      definition: '一定数量を購入した得意先に、商品を無償で提供する仕組み。注文数量の一部を無償とする「内数」と、注文数量に追加して無償で渡す「外数」がある。外数の場合は明細カテゴリTANNの無償明細が自動で追加される。条件はVBN1で登録し、コンディション技術で決定される。無償でも原価は発生するため、収益性分析での扱いを確認しておく必要がある。',
    },
    en: {
      term: 'Free Goods',
      definition: 'Goods supplied at no charge when a customer buys a set quantity. Inclusive free goods make part of the ordered quantity free; exclusive free goods add extra quantity on top, generated automatically as a free-of-charge item with item category TANN. Conditions are maintained in VBN1 and found by condition technique. The goods still carry a cost, so their treatment in profitability analysis needs checking.',
    },
  },
  {
    id: 'material-determination',
    modules: ['SD'],
    ja: {
      term: '品目決定',
      reading: 'ひんもくけってい',
      definition: '受注入力時に、入力された品目を別の品目に自動で置き換える機能。キャンペーン期間中だけ販促用パッケージの品目に差し替える、JANコードで入力された品目を社内の品目コードに変換する、といった用途がある。VB11で条件レコードを登録し、コンディション技術で決定する。置き換えを確認画面で選ばせるか自動で行うかも設定できる。',
    },
    en: {
      term: 'Material Determination',
      definition: 'Automatic substitution of the material entered on a sales order with another. Typical uses are swapping in a promotional pack during a campaign or converting a barcode number into the internal material number. Condition records are maintained in VB11 and found by condition technique, and the substitution can either happen automatically or be offered to the user for selection.',
    },
  },
  {
    id: 'delivery-billing-block',
    modules: ['SD'],
    ja: {
      term: '出荷ブロック／請求ブロック',
      reading: 'しゅっかぶろっく',
      definition: '受注の後続処理を止めるための保留設定。出荷ブロックが付いた受注からは出荷伝票を作成できず、請求ブロックが付いた伝票は請求処理の対象にならない。伝票タイプの既定値として付く場合（クレジットメモ依頼など）、得意先マスタから引き継がれる場合、手動で付ける場合がある。ブロックを解除する権限を分けることで、承認の統制として機能する。',
    },
    en: {
      term: 'Delivery Block / Billing Block',
      definition: 'Holds that stop subsequent processing of a sales document. No delivery can be created from an order with a delivery block, and a document with a billing block is excluded from billing. Blocks can come from the document type, as with credit memo requests, from the customer master, or be set by hand. Restricting who may remove them turns the block into an approval control.',
    },
  },

  // ─── MM ──────────────────────────────────────────────────────
  {
    id: 'stock-type',
    modules: ['MM'],
    ja: {
      term: '在庫タイプ',
      reading: 'ざいこたいぷ',
      definition: '在庫の使用可否による区分で、非制限使用在庫、品質検査中在庫、保留在庫の3つが基本。出庫や出荷に使えるのは非制限使用在庫だけで、検査中や不良の疑いがある在庫を誤って使わないようにする。在庫タイプ間の移動は振替転記で行う。MRPでは既定で品質検査中在庫も利用可能な在庫として扱われる点に注意。',
    },
    en: {
      term: 'Stock Type',
      definition: 'The classification of stock by whether it may be used: unrestricted-use, quality inspection and blocked are the basic three. Only unrestricted-use stock can be issued or delivered, which prevents stock under inspection or suspected defective from being consumed by mistake. Moves between types are transfer postings. Note that MRP treats quality inspection stock as available by default.',
    },
  },
  {
    id: 'special-stock',
    modules: ['MM', 'SD', 'PS'],
    ja: {
      term: '特殊在庫',
      reading: 'とくしゅざいこ',
      definition: '所有者や保管場所、引当先が通常と異なるため、区別して管理する在庫。特殊在庫区分で識別し、Kは仕入先からの委託在庫、Oは外注先に支給した在庫、Eは受注在庫、Qはプロジェクト在庫、Wは得意先の委託在庫を表す。自社が所有していても使える用途が限られていたり、自社所有でなく評価の対象外だったりするため、在庫照会では区分ごとに確認する。',
    },
    en: {
      term: 'Special Stock',
      definition: 'Stock managed separately because its owner, location or assignment differs from normal stock, identified by a special stock indicator: K for vendor consignment, O for material provided to a subcontractor, E for sales order stock, Q for project stock and W for consignment at the customer. Some is owned but restricted in use, and some is not owned and not valued, so stock reports should be read by indicator.',
    },
  },
  {
    id: 'split-valuation',
    modules: ['MM', 'CO'],
    ja: {
      term: '分割評価',
      reading: 'ぶんかつひょうか',
      definition: '同じ品目を、調達先や品質、自社製造か購買かといった区分ごとに別の価格で評価する仕組み。評価カテゴリで区分の考え方を、評価タイプで個々の区分（例：国内・海外）を定義する。品目マスタには全体をまとめる評価ヘッダと評価タイプごとの会計データを持ち、ヘッダは移動平均価格となる。ロット管理と組み合わせてロット単位で評価することもできる。',
    },
    en: {
      term: 'Split Valuation',
      definition: 'Valuing one material at different prices according to origin, quality, or whether it was produced in-house or bought. The valuation category defines the basis of the split and valuation types define the individual segments, such as domestic and imported. The material master holds a valuation header, at moving average price, plus accounting data for each type. It can be combined with batch management to value each batch separately.',
    },
  },
  {
    id: 'transfer-posting',
    modules: ['MM'],
    ja: {
      term: '振替転記',
      reading: 'ふりかえてんき',
      definition: '在庫の物理的な移動を伴わず、在庫の区分や識別だけを変更する在庫移動。品質検査中から非制限使用への変更（移動タイプ321）、品目コードの付け替え（309）、委託在庫を自社在庫に引き取る（411K）などがある。保管場所間で在庫を移す在庫転送とは区別される。区分によっては評価額が変わり、会計伝票が作成される。',
    },
    en: {
      term: 'Transfer Posting',
      definition: 'A goods movement that changes how stock is classified or identified without necessarily moving it physically. Examples are releasing stock from quality inspection to unrestricted use (movement type 321), changing one material number to another (309) and taking consignment stock into own stock (411 K). It is distinguished from stock transfers between storage locations. Where the change affects valuation, an accounting document results.',
    },
  },
  {
    id: 'rfq',
    modules: ['MM'],
    ja: {
      term: '見積依頼',
      reading: 'みつもりいらい',
      definition: '複数の仕入先に価格や納期の提示を求める購買伝票。ME41で作成し、仕入先ごとに回答を見積として登録する（ME47）。ME49の価格比較で見積を並べて比べ、選んだ見積から購買発注や購買情報レコードを作成できる。選ばれなかった仕入先には断りの通知を出力できる。S/4HANAではFioriアプリやSAP Aribaとの連携で行うことが増えている。',
    },
    en: {
      term: 'Request for Quotation (RFQ)',
      definition: 'A purchasing document asking several vendors for prices and delivery terms. RFQs are created in ME41 and each vendor’s reply is entered as a quotation in ME47. The price comparison in ME49 sets quotations side by side, and the chosen one can be turned into a purchase order or purchasing info record, with rejection letters output to the others. In S/4HANA the process increasingly runs through Fiori apps or SAP Ariba.',
    },
  },
  {
    id: 'ers',
    modules: ['MM', 'FI'],
    ja: {
      term: 'ERS（入庫/請求自動決済）',
      reading: 'いーあーるえす',
      definition: 'Evaluated Receipt Settlement。仕入先からの請求書を待たずに、入庫数量と購買発注の価格から請求書を自動作成する仕組み。MRRLで一括実行する。仕入先マスタと購買情報レコードで対象を指定し、事前に仕入先と合意しておく必要がある。価格の不一致による請求書保留がなくなり、照合作業を大幅に減らせる。価格が安定している継続取引に向く。',
    },
    en: {
      term: 'Evaluated Receipt Settlement (ERS)',
      definition: 'Creating the vendor invoice automatically from the goods receipt quantity and purchase order price instead of waiting for the vendor to send one. It runs in bulk in MRRL, is enabled on the vendor master and info record, and must be agreed with the vendor beforehand. Price mismatches and blocked invoices largely disappear, greatly reducing matching work. It suits ongoing supply at stable prices.',
    },
  },
  {
    id: 'vendor-evaluation',
    modules: ['MM'],
    ja: {
      term: '仕入先評価',
      reading: 'しいれさきひょうか',
      definition: '仕入先の実績を価格、品質、納期、サービスなどの主要基準で点数化する機能。点数は1〜100で、基準ごとの重み付けで総合点を算出する。納期遵守率は発注と入庫の日付、品質は品質管理の検査結果など、システム上の実績データから自動計算できる。ME61で照会・保守し、ME6Hで仕入先を順位付けする。仕入先の選定や改善要請の根拠になる。',
    },
    en: {
      term: 'Vendor Evaluation',
      definition: 'Scoring vendor performance against main criteria such as price, quality, delivery and service, each on a scale of 1 to 100 and weighted into an overall score. Much can be calculated from system data: on-time delivery from purchase order and receipt dates, quality from inspection results. Scores are maintained in ME61 and ranked in ME6H, giving objective grounds for sourcing decisions and improvement requests.',
    },
  },
  {
    id: 'goods-issue',
    modules: ['MM', 'PP', 'SD'],
    ja: {
      term: '出庫',
      reading: 'しゅっこ',
      definition: '在庫を減らし、消費や出荷として計上する在庫移動。原価センタへの出庫（移動タイプ201）、製造指図への出庫（261）、WBS要素への出庫（221）、出荷伝票による出庫（601）などがあり、移動タイプによって原価の計上先が決まる。予約を参照して出庫すると、計画した消費と実際の出庫を対応づけられる。取消は逆方向の移動タイプで行う。',
    },
    en: {
      term: 'Goods Issue',
      definition: 'A goods movement that reduces stock and records it as consumed or shipped: to a cost centre (movement type 201), to a production order (261), to a WBS element (221) or for a delivery (601). The movement type determines where the cost lands. Issuing with reference to a reservation links planned and actual consumption, and reversal uses the corresponding reverse movement type.',
    },
  },

  // ─── PP ──────────────────────────────────────────────────────
  {
    id: 'production-version',
    modules: ['PP', 'CO'],
    ja: {
      term: '製造バージョン',
      reading: 'せいぞうばーじょん',
      definition: '品目をどの部品表とどの作業手順で製造するかの組み合わせを、有効期間とロットサイズ範囲とともに定義するマスタ。1つの品目に複数のラインや製法がある場合に使い分けを明確にできる。繰返生産や製品原価コレクタでは必須で、S/4HANAではMRPや原価見積で部品表と作業手順を選ぶ手段として製造バージョンの利用が前提になっている。',
    },
    en: {
      term: 'Production Version',
      definition: 'Master data defining which bill of materials and which routing are used to make a material, with a validity period and lot size range. It makes the choice explicit where a material can be made on several lines or by several methods. Repetitive manufacturing and product cost collectors require it, and in S/4HANA it is the expected way for MRP and costing to select the BOM and routing.',
    },
  },
  {
    id: 'stock-requirements-list',
    modules: ['PP', 'MM'],
    ja: {
      term: '在庫／所要量一覧',
      reading: 'ざいこしょようりょういちらん',
      definition: 'MD04で表示する、品目の在庫・所要量・入庫予定を日付順に並べた一覧。受注、計画独立所要量、従属所要量、購買発注、製造指図などが時系列に並び、各時点の利用可能在庫が計算される。画面を開いた時点の最新状況を表示するのが特徴で、前回MRP実行時点の結果を表示するMRPリスト（MD05）とは異なる。MRP担当者が日常的に最もよく使う画面。',
    },
    en: {
      term: 'Stock/Requirements List',
      definition: 'The MD04 display listing a material’s stock, requirements and receipts in date order — sales orders, planned independent requirements, dependent requirements, purchase orders and production orders — with the available quantity at each point. It is always current as of the moment it is opened, unlike the MRP list (MD05), which shows the result of the last planning run. It is the screen planners use most.',
    },
  },
  {
    id: 'mrp-controller',
    modules: ['PP', 'MM'],
    ja: {
      term: 'MRP管理者',
      reading: 'えむあーるぴーかんりしゃ',
      definition: '品目の所要量計画に責任を持つ担当者またはグループを表す3桁のコード。品目マスタのMRP1ビューで設定する。MD06などでMRP管理者単位に品目を一覧でき、例外メッセージの確認や計画手配の変換を担当範囲ごとに進められる。組織上の担当と一致させておくことで、「誰がこの品目の欠品に対応するのか」が明確になる。',
    },
    en: {
      term: 'MRP Controller',
      definition: 'A three-character code for the person or group responsible for planning a material, set in the MRP 1 view of the material master. Transactions such as MD06 list materials by controller, so exception messages and planned order conversion can be worked through by area of responsibility. Aligning codes with actual responsibilities makes clear who must act on a shortage.',
    },
  },
  {
    id: 'control-key',
    modules: ['PP'],
    ja: {
      term: '管理キー',
      reading: 'かんりきー',
      definition: '作業手順の各作業に設定し、その作業をどう扱うかを制御するキー。日程計画の対象とするか、能力所要量を計算するか、実績確認が必須か任意か不要か、外注作業として扱うか、原価計算に含めるか、作業票を印刷するかなどを決める。標準ではPP01がよく使われる。確認漏れやバックフラッシュの挙動に影響するため、設計時に作業の性質ごとに使い分ける。',
    },
    en: {
      term: 'Control Key',
      definition: 'A key set on each routing operation that controls how the operation is treated: whether it is scheduled, whether capacity requirements are calculated, whether confirmation is required, optional or not allowed, whether it is processed externally, whether it is costed and whether shop papers are printed. PP01 is the common standard key. Because it affects confirmations and backflushing, keys should be designed per type of operation.',
    },
  },
  {
    id: 'process-order',
    modules: ['PP'],
    ja: {
      term: 'プロセス指図',
      reading: 'ぷろせすさしず',
      definition: '化学、食品、医薬品などプロセス産業向けのPP-PIで使う製造指図。作業手順の代わりにマスタレシピ、作業場所の代わりに資源を使い、作業を工程とフェーズで表す。COR1で作成する。原材料の配合比や、ロット管理、プロセス指示による製造設備との連携など、プロセス産業に特有の要件に対応している。',
    },
    en: {
      term: 'Process Order',
      definition: 'The production order used in PP-PI for process industries such as chemicals, food and pharmaceuticals. It uses a master recipe instead of a routing and resources instead of work centres, with work expressed as operations and phases. Orders are created in COR1. It addresses process industry needs such as ingredient proportions, batch management and process instructions for exchanging data with plant equipment.',
    },
  },
  {
    id: 'planned-independent-requirement',
    modules: ['PP', 'SD'],
    ja: {
      term: '計画独立所要量',
      reading: 'けいかくどくりつしょようりょう',
      definition: '受注が入る前の需要予測を、品目・数量・時期で登録したもの。MD61で登録する。所要量タイプは計画方針によって決まり、見込生産の方針10や、組立を受注後に行う方針40などで扱いが異なる。受注が入るとその分だけ消費され、予測と受注の二重計上を防ぐ。販売計画や需要予測の結果をMRPに引き渡す入り口となる。',
    },
    en: {
      term: 'Planned Independent Requirement',
      definition: 'A demand forecast entered by material, quantity and date before sales orders arrive, maintained in MD61. Its requirements type follows the planning strategy, so make-to-stock strategy 10 and strategy 40, planning with final assembly, treat it differently. Incoming sales orders consume it, avoiding forecast and orders being planned twice. It is how sales plans and forecasts enter MRP.',
    },
  },
  {
    id: 'exception-message',
    modules: ['PP', 'MM'],
    ja: {
      term: '例外メッセージ',
      reading: 'れいがいめっせーじ',
      definition: 'MRPの実行後に、計画担当者の判断が必要な状況を知らせるメッセージ。開始日が過去になった、入庫予定を前倒し・後ろ倒しすべき、不要になった入庫予定を取り消すべき、安全在庫を下回ったなどを示す。MD04やMD06で確認でき、グループ別に絞り込める。MRPは既存の発注や指図の日付を自動では動かさないため、例外メッセージへの対応が計画業務の中心になる。',
    },
    en: {
      term: 'Exception Message',
      definition: 'A message after an MRP run flagging situations that need a planner’s decision: a start date in the past, a receipt that should be brought forward or pushed back, a receipt no longer needed, stock below safety stock. They appear in MD04 and MD06 and can be filtered by group. Because MRP does not move existing purchase orders or production orders, working through exception messages is the core of the planner’s job.',
    },
  },
  {
    id: 'mrp-live',
    modules: ['PP', 'MM'],
    ja: {
      term: 'MRP Live',
      reading: 'えむあーるぴーらいぶ',
      definition: 'S/4HANAで提供される、HANAデータベース上で所要量計算を行うMRP実行方式。MD01Nで実行する。計算処理をデータベース側に寄せることで、従来のMD01より大幅に高速に動作し、プラントをまたいだ計画もまとめて処理できる。一部の機能は従来方式でのみ動作するため、使えない設定がある場合は自動的に従来のロジックで処理される。',
    },
    en: {
      term: 'MRP Live',
      definition: 'The S/4HANA planning run that performs MRP calculations inside the HANA database, started with MD01N. Pushing the logic down to the database makes it far faster than classic MD01, and materials across several plants can be planned together. Some features are supported only by the classic logic, and materials that need them are automatically planned the classic way.',
    },
  },

  // ─── ABAP ────────────────────────────────────────────────────
  {
    id: 'sap-luw',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: 'SAP LUW',
      reading: 'えすえーぴーるう',
      definition: '業務上ひとまとまりで確定または取消すべきデータ変更の単位。SAPでは画面遷移のたびにデータベースのLUWが暗黙的にコミットされるため、複数画面にまたがる変更を1つの単位として扱うにはSAP LUWの仕組みが必要になる。変更は更新タスクなどに登録しておき、COMMIT WORKでまとめて反映する。途中でエラーになればすべて取り消される。',
    },
    en: {
      term: 'SAP LUW',
      definition: 'A logical unit of work: data changes that must be committed or rolled back together from a business point of view. A database LUW is committed implicitly at every screen change, so changes spanning several screens need the SAP LUW to be treated as one unit. Changes are registered, for example in the update task, and applied together at COMMIT WORK; an error part-way undoes the lot.',
    },
  },
  {
    id: 'update-task',
    modules: ['ABAP', 'BASIS'],
    ja: {
      term: '更新タスク',
      reading: 'こうしんたすく',
      definition: 'CALL FUNCTION ... IN UPDATE TASKで呼び出した更新汎用モジュールを、COMMIT WORKの時点で更新ワークプロセスがまとめて実行する仕組み。ユーザの画面処理とデータベース更新を切り離すことで応答を速くし、SAP LUWの整合性を保つ。重要な更新はV1、統計などの二次的な更新はV2で処理される。更新が失敗した記録はSM13で確認する。',
    },
    en: {
      term: 'Update Task',
      definition: 'The mechanism by which update function modules called with CALL FUNCTION … IN UPDATE TASK are executed together by an update work process when COMMIT WORK is reached. Separating database updates from the user’s dialog keeps response times short and preserves the integrity of the SAP LUW. Critical updates run as V1 and secondary ones such as statistics as V2; failed updates are examined in SM13.',
    },
  },
  {
    id: 'rap',
    modules: ['ABAP'],
    ja: {
      term: 'RAP（ABAP RESTfulアプリケーションプログラミングモデル）',
      reading: 'らっぷ',
      definition: 'S/4HANAとSAP BTPのABAP環境で、Fioriアプリや業務APIを開発するための標準的な開発モデル。CDSビューでデータモデルを、ビヘイビア定義で作成・更新・削除やアクションなどの振る舞いを定義し、ビヘイビア実装クラスにロジックを書く。サービス定義とサービスバインディングでODataサービスとして公開する。ABAP Cloudでの開発の中心となる。',
    },
    en: {
      term: 'RAP (ABAP RESTful Application Programming Model)',
      definition: 'The standard model for building Fiori apps and business APIs in S/4HANA and the SAP BTP ABAP environment. CDS views define the data model, a behaviour definition declares create, update, delete and actions, and a behaviour implementation class holds the logic. A service definition and service binding expose it as an OData service. It is at the centre of development under ABAP Cloud.',
    },
  },
  {
    id: 'amdp',
    modules: ['ABAP'],
    ja: {
      term: 'AMDP（ABAPマネージドデータベースプロシージャ）',
      reading: 'えーえむでぃーぴー',
      definition: 'ABAPクラスのメソッドとしてSQLScriptを記述し、HANAデータベース上で直接実行する仕組み。インタフェースIF_AMDP_MARKER_HDBを実装したクラスで定義し、ABAPのトランスポートで他のオブジェクトと同様に管理できる。CDSビューでは表現しにくい複雑な処理をデータベース側で行うコードプッシュダウンに使い、CDSテーブル関数の実装にも使われる。',
    },
    en: {
      term: 'AMDP (ABAP Managed Database Procedure)',
      definition: 'SQLScript written as a method of an ABAP class and executed directly in the HANA database. The class implements the IF_AMDP_MARKER_HDB interface and is transported like any other ABAP object. AMDPs push down logic too complex to express in a CDS view, and they also implement CDS table functions.',
    },
  },
  {
    id: 'selection-screen',
    modules: ['ABAP'],
    ja: {
      term: '選択画面',
      reading: 'せんたくがめん',
      definition: 'レポートプログラムの実行前に表示され、抽出条件を入力させる画面。PARAMETERSで単一値の、SELECT-OPTIONSで範囲や複数値の入力項目を定義するだけで、画面を個別に作らなくても自動生成される。入力チェックはAT SELECTION-SCREENイベントで行う。入力した条件はバリアントとして保存でき、バックグラウンドジョブの実行にも使われる。',
    },
    en: {
      term: 'Selection Screen',
      definition: 'The screen shown before a report runs, where the user enters selection criteria. Declaring PARAMETERS for single values and SELECT-OPTIONS for ranges and multiple values is enough for the screen to be generated without designing it. Input is validated in the AT SELECTION-SCREEN event, and entries can be saved as a variant, which background jobs also use.',
    },
  },
  {
    id: 'abap-debugger',
    modules: ['ABAP'],
    ja: {
      term: 'ABAPデバッガ',
      reading: 'あばっぷでばっが',
      definition: 'プログラムを1行ずつ実行しながら変数の値や処理の流れを確認するツール。コマンド欄に/hを入力するか、ブレークポイントを設定して起動する。外部ブレークポイントを使えばFioriやRFCから呼ばれた処理も止められ、ウォッチポイントで特定の値に変わった時点で停止できる。本番環境で値を変更できるデバッグ権限は、権限チェックを回避できるため厳しく制限される。',
    },
    en: {
      term: 'ABAP Debugger',
      definition: 'The tool for stepping through a program line by line to inspect variables and control flow. It starts from /h in the command field or at a breakpoint. External breakpoints stop processing triggered from Fiori or RFC, and watchpoints halt when a variable reaches a given value. Debug authorisation that allows changing values in production is tightly restricted, because it can bypass authorisation checks.',
    },
  },
  {
    id: 'code-inspector',
    modules: ['ABAP'],
    ja: {
      term: 'コードインスペクタ／ABAPテストコックピット',
      reading: 'こーどいんすぺくた',
      definition: 'ABAPコードを静的に解析し、性能、セキュリティ、保守性などの問題を検出するツール。コードインスペクタ（SCI）を発展させたものがABAPテストコックピット（ATC）で、トランスポートのリリース時に自動でチェックを走らせることもできる。S/4HANAへの移行では、アドオンが変更された標準機能を使っていないかを調べるカスタムコードチェックにも使われる。',
    },
    en: {
      term: 'Code Inspector / ABAP Test Cockpit',
      definition: 'Tools that statically analyse ABAP code for performance, security and maintainability problems. The ABAP Test Cockpit (ATC) grew out of the Code Inspector (SCI) and can run checks automatically when a transport is released. In S/4HANA conversions it also performs the custom code checks that find add-ons relying on standard functionality that has changed.',
    },
  },
  {
    id: 'sapscript',
    modules: ['ABAP'],
    ja: {
      term: 'SAPscript',
      reading: 'えすえーぴーすくりぷと',
      definition: 'SAPで最も古くからある帳票の作成ツール。SE71でフォームを定義し、印刷プログラムからテキスト要素を呼び出して出力する。レイアウトの自由度が低く保守しにくいため、後継としてSmart Forms、さらにAdobe Formsが登場した。S/4HANAの出力管理ではAdobe Formsが標準だが、既存システムには今もSAPscriptの帳票が多く残っている。',
    },
    en: {
      term: 'SAPscript',
      definition: 'SAP’s oldest form tool. Forms are defined in SE71 and a print program calls their text elements to produce output. Limited layout flexibility and difficult maintenance led first to Smart Forms and then to Adobe Forms as successors. S/4HANA output management uses Adobe Forms as standard, yet many existing systems still carry SAPscript forms.',
    },
  },

  // ─── Basis ───────────────────────────────────────────────────
  {
    id: 'rfc-destination',
    modules: ['BASIS', 'ABAP'],
    ja: {
      term: 'RFC接続先',
      reading: 'あーるえふしーせつぞくさき',
      definition: '他のシステムを呼び出すための接続情報で、SM59で定義する。タイプ3はABAPシステムへの接続、TはTCP/IPで外部プログラムへ、GやHはHTTPでの接続を表す。接続先にユーザとパスワードを保存すると呼出し側の誰でもその権限で相手先を操作できてしまうため、権限の強いユーザを登録しないことや、信頼関係（トラステッドRFC）の利用を検討する。',
    },
    en: {
      term: 'RFC Destination',
      definition: 'Connection details for calling another system, defined in SM59. Type 3 connects to an ABAP system, type T to an external program over TCP/IP, and types G and H over HTTP. Storing a user and password in a destination lets anyone who can call it act in the target system with that user’s rights, so powerful users should never be stored there and trusted RFC should be considered instead.',
    },
  },
  {
    id: 'client-copy',
    modules: ['BASIS'],
    ja: {
      term: 'クライアントコピー',
      reading: 'くらいあんとこぴー',
      definition: 'あるクライアントのデータを別のクライアントへ複製する処理。同じシステム内のコピー（SCCL）、別システムからのリモートコピー（SCC9）、エクスポート／インポート（SCC8）がある。何をコピーするかはプロファイルで選び、カスタマイジングだけ、ユーザマスタだけ、全データなどを指定する。テスト用クライアントの作成や、本番に近いデータでの検証環境の準備に使う。',
    },
    en: {
      term: 'Client Copy',
      definition: 'Copying the data of one client into another: locally within a system (SCCL), remotely from another system (SCC9), or by export and import (SCC8). A profile selects what is copied, such as customising only, user master records only, or all data. Client copies create test clients and prepare verification environments with realistic data.',
    },
  },
  {
    id: 'system-copy',
    modules: ['BASIS'],
    ja: {
      term: 'システムコピー',
      reading: 'しすてむこぴー',
      definition: 'システム全体を別のシステムとして複製すること。本番システムをコピーして検証システムを最新化する用途が代表的。データベースのバックアップとリストアで行う同種コピーと、OSやデータベースを変更する異種コピーがある。コピー後は論理システム名の変換（BDLS）、RFC接続先やジョブの無効化など、コピー元の本番環境に誤って影響を与えないための後処理が欠かせない。',
    },
    en: {
      term: 'System Copy',
      definition: 'Duplicating an entire system as another, typically refreshing a quality system from production. Homogeneous copies use database backup and restore; heterogeneous copies change the operating system or database. Post-processing is essential: converting logical system names with BDLS and disabling RFC destinations and jobs so that the copy cannot accidentally touch the production landscape.',
    },
  },
  {
    id: 'lock-entry',
    modules: ['BASIS', 'ABAP'],
    ja: {
      term: 'ロックエントリ（SM12）',
      reading: 'ろっくえんとり',
      definition: '同じデータを複数のユーザが同時に更新しないよう、エンキューサーバがメモリ上のロックテーブルで保持するロック情報。SM12で一覧でき、どのユーザがどのデータをロックしているかを確認できる。通常は処理の終了とともに解放されるが、異常終了などでロックが残ることがある。更新処理が進行中の可能性があるため、手動削除は状況を確認してから行う。',
    },
    en: {
      term: 'Lock Entry (SM12)',
      definition: 'Lock information held by the enqueue server in an in-memory lock table so that several users cannot change the same data at once. SM12 lists entries, showing who is locking what. Locks are normally released when processing ends, but abnormal terminations can leave them behind. An update may still be in progress, so deleting a lock manually should only follow a check of what is happening.',
    },
  },
  {
    id: 'message-server',
    modules: ['BASIS'],
    ja: {
      term: 'メッセージサーバ',
      reading: 'めっせーじさーば',
      definition: 'ABAPシステムに1つだけ存在し、アプリケーションサーバ間の通信とログオン時の負荷分散を担うプロセス。ユーザはメッセージサーバを通じて、SMLGで定義したログオングループの中から負荷の少ないサーバに振り分けられる。エンキューサーバとともにASCS（ABAPセントラルサービス）インスタンスに含まれ、止まるとシステム全体に影響するため高可用性構成の対象になる。',
    },
    en: {
      term: 'Message Server',
      definition: 'The single process in an ABAP system that handles communication between application servers and load balancing at logon. Through it, users are directed to the least loaded server in a logon group defined in SMLG. It runs in the ASCS (ABAP Central Services) instance with the enqueue server, and because its failure affects the whole system it is a primary target of high-availability design.',
    },
  },
  {
    id: 'icm',
    modules: ['BASIS'],
    ja: {
      term: 'ICM（インターネットコミュニケーションマネージャ）',
      reading: 'あいしーえむ',
      definition: 'アプリケーションサーバでHTTP、HTTPS、SMTPなどの通信を受け付けるプロセス。FioriアプリやODataサービス、Webサービスへのアクセスはすべてここを通る。SMICMで稼働状況や接続数を確認できる。インターネットに直接公開せず、前段にSAP Web Dispatcherを置いて負荷分散やアクセス制御を行うのが一般的。',
    },
    en: {
      term: 'ICM (Internet Communication Manager)',
      definition: 'The application server process that accepts HTTP, HTTPS and SMTP traffic. Every request to Fiori apps, OData services and web services passes through it, and SMICM shows its status and connections. It is not normally exposed to the internet directly; SAP Web Dispatcher usually sits in front for load balancing and access control.',
    },
  },
  {
    id: 'saprouter',
    modules: ['BASIS'],
    ja: {
      term: 'SAProuter',
      reading: 'さっぷるーた',
      definition: 'SAPシステムへのネットワーク接続を中継するアプリケーションレベルのゲートウェイ。ルート許可テーブル（saprouttab）で、どこからどのシステムへの接続を許すかを定義する。代表的な用途は、SAPサポートがトラブル調査のために顧客システムへ接続する経路の確保で、ファイアウォールに開けるポートを最小限にしながら接続を管理できる。',
    },
    en: {
      term: 'SAProuter',
      definition: 'An application-level gateway that relays network connections to SAP systems. Its route permission table (saprouttab) defines which connections are allowed from where to which system. The classic use is providing the path by which SAP Support connects to a customer system to investigate problems, while keeping the ports opened in the firewall to a minimum.',
    },
  },
  {
    id: 'solution-manager',
    modules: ['BASIS'],
    ja: {
      term: 'SAP Solution Manager',
      reading: 'そりゅーしょんまねーじゃー',
      definition: 'SAPシステムのライフサイクル管理を担う基盤。システム監視、EarlyWatch Alertによる定期診断、変更管理（ChaRM）、テスト管理、業務プロセスの文書化などを提供する。Solution Manager 7.2の標準保守は2027年末に終了し、後継としてクラウドサービスのSAP Cloud ALMへの移行が進められている。',
    },
    en: {
      term: 'SAP Solution Manager',
      definition: 'The platform for application lifecycle management of SAP systems, covering system monitoring, periodic health checks through EarlyWatch Alert, change control (ChaRM), test management and process documentation. Mainstream maintenance for Solution Manager 7.2 ends at the close of 2027, and customers are moving to the cloud-based SAP Cloud ALM as its successor.',
    },
  },

  // ─── PS ──────────────────────────────────────────────────────
  {
    id: 'budget',
    modules: ['PS', 'CO'],
    ja: {
      term: '予算',
      reading: 'よさん',
      definition: 'プロジェクトで使ってよい金額の上限として承認された枠。計画値が見積りであるのに対し、予算は拘束力を持つ。CJ30で当初予算を登録し、追加はCJ37、返却はCJ38で行う。WBS要素に配分した予算を実際の発注や転記と比較するのが予算管理（アベイラビリティコントロール）で、超過時に警告やエラーを出す。予算の変更履歴は照会できるよう残る。',
    },
    en: {
      term: 'Budget',
      definition: 'The approved ceiling on what a project may spend. A plan is an estimate; a budget is binding. The original budget is entered in CJ30, supplements in CJ37 and returns in CJ38. Comparing budget distributed to WBS elements against commitments and actual postings is availability control, which issues warnings or errors when limits are exceeded. The history of budget changes remains available for review.',
    },
  },
  {
    id: 'investment-program',
    modules: ['PS', 'FI'],
    ja: {
      term: '投資プログラム',
      reading: 'とうしぷろぐらむ',
      definition: '投資管理（IM）で、年度の設備投資計画を階層構造で管理する仕組み。IM01で作成し、部門や投資区分ごとの階層に投資予算を配分する。個々の投資案件は投資申請として登録・承認し、承認後にWBS要素や内部指図に紐づけて予算を引き継ぐ。会社全体の投資枠から個々のプロジェクトまで、予算の配分と消化を一貫して追跡できる。',
    },
    en: {
      term: 'Investment Program',
      definition: 'The Investment Management structure for a year’s capital expenditure plan, created in IM01 as a hierarchy by department or investment category with budget distributed down it. Individual proposals are entered and approved as appropriation requests, then linked to WBS elements or internal orders that inherit the budget. Budget allocation and consumption can be traced from the company-wide envelope down to each project.',
    },
  },
  {
    id: 'project-builder',
    modules: ['PS'],
    ja: {
      term: 'プロジェクトビルダ',
      reading: 'ぷろじぇくとびるだ',
      definition: 'CJ20Nで起動する、プロジェクトの作成と保守をまとめて行う画面。左側のツリーでプロジェクト定義、WBS要素、ネットワーク、作業、構成品目、マイルストンを表示し、右側で詳細を編集する。ドラッグ操作で構造を組み替えられ、テンプレートからのコピーもここで行う。個別のトランザクションを使い分けなくてもプロジェクト全体を扱えるため、PSの日常操作の中心となる。',
    },
    en: {
      term: 'Project Builder',
      definition: 'The CJ20N screen for creating and maintaining a project in one place. A tree on the left shows the project definition, WBS elements, networks, activities, components and milestones, and details are edited on the right. The structure can be rearranged by drag and drop and copied from templates. Because it handles the whole project without separate transactions, it is the centre of day-to-day work in PS.',
    },
  },
  {
    id: 'resource-related-billing',
    modules: ['PS', 'SD'],
    ja: {
      term: '資源関連請求',
      reading: 'しげんかんれんせいきゅう',
      definition: 'プロジェクトやサービス指図で実際に発生した工数や材料費などをもとに、得意先への請求額を計算する請求方式。DP91で実行し、DIPプロファイルで原価のどの項目をどう請求明細にまとめるかを定義する。結果は請求依頼伝票として作成され、SDで請求書になる。精算型の契約や保守サービスなど、実費に応じて請求する取引に使う。',
    },
    en: {
      term: 'Resource-Related Billing',
      definition: 'Billing a customer on the basis of actual hours, materials and other costs incurred on a project or service order. It runs in DP91, with a DIP profile defining how cost items are grouped into billing lines. The result is a debit memo request that SD turns into an invoice. It is used for time-and-materials contracts and maintenance services charged at cost.',
    },
  },
  {
    id: 'easy-cost-planning',
    modules: ['PS', 'CO'],
    ja: {
      term: '簡易原価計画',
      reading: 'かんいげんかけいかく',
      definition: 'WBS要素などに、材料、作業、外注費などの計画明細を積み上げて原価を計画する機能。CKCMで作成する原価モデルを使うと、入力項目を画面で選ぶだけで計画を作成でき、見積や提案段階の概算に向く。計画した明細から、購買依頼や作業の登録を後続処理として実行することもできる。ネットワークを作らずに原価計画をしたい場合に便利。',
    },
    en: {
      term: 'Easy Cost Planning',
      definition: 'Planning cost on objects such as WBS elements by building up items for materials, internal activities and external services. Cost models created in CKCM let users produce a plan by choosing values on a form, which suits rough estimates at the quotation or proposal stage. Follow-on actions such as purchase requisitions can be triggered from the planned items. It is useful where cost planning is wanted without building networks.',
    },
  },
  {
    id: 'project-version',
    modules: ['PS'],
    ja: {
      term: 'プロジェクトバージョン',
      reading: 'ぷろじぇくとばーじょん',
      definition: 'ある時点のプロジェクトの構造、日程、原価、ステータスなどを記録したスナップショット。CN72で手動作成するほか、特定のステータスに達したときに自動作成することもできる。承認時点の計画と現在の状態を比較し、何がどれだけ変わったかを説明するために使う。変更を試すためのシミュレーションバージョンとは別のもの。',
    },
    en: {
      term: 'Project Version',
      definition: 'A snapshot of a project’s structure, dates, costs and statuses at a point in time. Versions can be created manually in CN72 or automatically when a given status is reached. They are used to compare the plan as approved with the project as it stands and to explain what changed and by how much. They are distinct from simulation versions, which are for trying changes out.',
    },
  },
  {
    id: 'network-component',
    modules: ['PS', 'MM'],
    ja: {
      term: '構成品目（ネットワーク）',
      reading: 'こうせいひんもく',
      definition: 'ネットワークの作業に割り当てる、プロジェクトで使用する品目。明細カテゴリLの在庫品目は予約が作成されて在庫から出庫し、Nの非在庫品目は購買依頼が自動作成されて直接調達される。作業の日程に合わせて所要日が決まり、MRPの対象にもなる。プロジェクト在庫を使えば、そのプロジェクト専用に確保した在庫として管理できる。',
    },
    en: {
      term: 'Network Component',
      definition: 'A material assigned to a network activity for use in the project. Stock items (item category L) create reservations and are issued from stock; non-stock items (N) create purchase requisitions and are procured directly. Requirement dates follow the activity schedule and are included in MRP. With project stock, the material can be held as stock reserved for that project alone.',
    },
  },
  {
    id: 'project-planning-board',
    modules: ['PS'],
    ja: {
      term: 'プロジェクト計画ボード',
      reading: 'ぷろじぇくとけいかくぼーど',
      definition: 'CJ2Bで起動する、プロジェクトの構造と日程をガントチャート形式で表示・編集する画面。WBS要素や作業の期間をバーで表示し、ドラッグで日程を変更したり、作業間の関連を引いたりできる。クリティカルパスや能力の負荷状況も同じ画面で確認できる。表形式のプロジェクトビルダに対し、日程の全体像をつかむのに向く。',
    },
    en: {
      term: 'Project Planning Board',
      definition: 'The CJ2B screen that displays and edits a project’s structure and schedule as a Gantt chart. WBS elements and activities appear as bars that can be dragged to change dates, and relationships between activities can be drawn. Critical path and capacity load are visible on the same screen. Where Project Builder is form-based, the planning board gives the overall picture of the schedule.',
    },
  },
];
