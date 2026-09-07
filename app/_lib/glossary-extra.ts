import type { GlossaryTerm } from './glossary';

/**
 * Additional glossary entries for the functional modules, filling gaps
 * left by the original set — chiefly in FI and CO.
 */
export const extraTerms: GlossaryTerm[] = [
  // ─── FI ──────────────────────────────────────────────────────
  {
    id: 'posting-key',
    modules: ['FI'],
    ja: {
      term: '転記キー',
      reading: 'てんききー',
      definition: '会計伝票の各明細行が借方か貸方か、およびどの勘定タイプへの転記かを同時に決定する2桁の数字。40が総勘定元帳の借方、50が貸方、31が仕入先の貸方、01が得意先の借方、70が固定資産の借方といった具合。FB50などの新しい入力画面では直接入力しないが、FB03で転記済み伝票を照会すると各明細に表示されるため、伝票を読むうえで必須の知識。',
    },
    en: {
      term: 'Posting Key',
      definition: 'A two-digit code that determines, for one line item, both the debit or credit side and the account type posted to: 40 debits a G/L account, 50 credits one, 31 credits a vendor, 01 debits a customer, 70 debits an asset. Modern entry screens such as FB50 hide it, but it appears on every line when a posted document is displayed in FB03, so reading documents requires knowing it.',
    },
  },
  {
    id: 'baseline-date',
    modules: ['FI'],
    ja: {
      term: '支払基準日',
      reading: 'しはらいきじゅんび',
      definition: '支払条件が定める「何日以内」の起算日。伝票日付、転記日付、入力日付のいずれかを基準にでき、さらに固定日数を加算できる。この日付を取り違えると支払期日の計算がまるごとずれ、自動支払プログラムは期日にもとづいて対象を抽出するため、支払漏れや過早支払が発生する。導入時に自動設定の挙動を必ず確認すべき項目。',
    },
    en: {
      term: 'Baseline Date',
      definition: 'The date from which payment terms count. It can be derived from the document date, the posting date or the entry date, optionally plus a fixed number of days. Get it wrong and every due date shifts with it; since the payment program selects by due date, the result is missed or premature payment. Its default behaviour should be verified during implementation.',
    },
  },
  {
    id: 'cash-discount',
    modules: ['FI'],
    ja: {
      term: '現金割引',
      reading: 'げんきんわりびき',
      definition: '定められた期限内に支払った場合に適用される値引き。支払条件で2段階まで設定でき、「10日以内なら2%、30日以内に全額」のように表現する。記帳方法には、請求書の全額で計上して割引額を支払時に収益とする総額法と、割引後の金額で計上して取り逃した分を費用とする純額法がある。割引の獲得状況を管理したい場合は純額法が適する。',
    },
    en: {
      term: 'Cash Discount',
      definition: 'A reduction granted for paying within a set period, expressible in up to two tiers such as two per cent within ten days, net in thirty. Two accounting treatments exist: the gross procedure records the full invoice and books the discount as income at payment, while the net procedure records the discounted amount and expenses any discount missed — the better choice where capturing discounts is managed as a metric.',
    },
  },
  {
    id: 'special-gl',
    modules: ['FI'],
    ja: {
      term: '特殊仕訳（Special G/L）',
      reading: 'とくしゅしわけ',
      definition: '前渡金や支払手形など、通常の債権債務と区別して管理すべき取引を扱う仕組み。特殊仕訳表示を付けて転記すると、通常の照合勘定ではなく専用の代替照合勘定に金額が集計される。仕入先ごとの明細としては同じ場所で見えるのに、総勘定元帳では別の科目になるという効果があり、前渡金という資産を買掛金と相殺表示しないために必要。',
    },
    en: {
      term: 'Special G/L Transaction',
      definition: 'The mechanism for transactions that must be kept apart from ordinary receivables and payables, such as down payments and bills of exchange. Posting with a special G/L indicator routes the amount to an alternative reconciliation account rather than the normal one. The item still appears under the same partner but on a different G/L account — necessary so that a down payment, an asset, is not netted against payables.',
    },
  },
  {
    id: 'dunning',
    modules: ['FI', 'SD'],
    ja: {
      term: '督促処理（Dunning）',
      reading: 'とくそくしょり',
      definition: '支払期日を過ぎても入金のない得意先に督促状を送付する処理。F150で実行する。滞留日数に応じて督促レベルを段階的に上げる設計とし、レベルごとに文面のトーンや延滞利息の計算、取引停止といった追加処理を割り当てる。実行のたびに得意先マスタの督促レベルと最終督促日が更新され、次回は上のレベルが選ばれる。',
    },
    en: {
      term: 'Dunning',
      definition: 'The process of sending payment reminders to customers who have not paid by the due date, run through F150. Dunning levels escalate with the age of the debt, each carrying its own tone and any additional action such as calculating interest or suspending trading. Every run updates the dunning level and last dunned date on the customer master so the next reminder moves up the ladder.',
    },
  },
  {
    id: 'clearing',
    modules: ['FI'],
    ja: {
      term: '消込（Clearing）',
      reading: 'けしこみ',
      definition: '入金や支払を、対応する未決済明細と突き合わせてクローズする処理。消込を行うと明細に消込伝票番号と消込日付が記録され、未決済明細の一覧から外れる。金額が一致しない場合は、許容範囲内なら差額を自動的に損益へ振り替え、それを超える場合は部分消込か残額処理を選ぶ。誤って消込した場合はFBRAで解除する。',
    },
    en: {
      term: 'Clearing',
      definition: 'Matching a payment against the open items it settles and closing them. Cleared items are stamped with a clearing document and date and drop out of the open items list. Where amounts differ, a difference inside tolerance is written off automatically, and anything larger is handled as either partial clearing or a residual item. FBRA resets a clearing made in error.',
    },
  },
  {
    id: 'residual-item',
    modules: ['FI'],
    ja: {
      term: '部分消込／残額処理',
      reading: 'ぶぶんけしこみ',
      definition: '入金額が請求額に満たない場合の2つの処理方法。部分消込は入金額の分だけ消し込み、元の明細を残高を残したまま未決済として残す。残額処理は元の明細を全額クローズし、差額分だけを新しい未決済明細として作り直す。残額処理では支払基準日が入金日基準にリセットされることがあり、督促の起算日が変わるため、滞留債権を厳格に管理する場合は部分消込が向く。',
    },
    en: {
      term: 'Partial Clearing / Residual Item',
      definition: 'Two ways of handling an underpayment. Partial clearing applies only what was received and leaves the original item open for the remainder. A residual item closes the original in full and creates a new open item for the difference. Because a residual item can reset the baseline date to the payment date and restart the dunning clock, partial clearing suits strict management of overdue debt.',
    },
  },
  {
    id: 'fx-valuation',
    modules: ['FI'],
    ja: {
      term: '外貨評価',
      reading: 'がいかひょうか',
      definition: '決算時に外貨建の未決済残高を期末レートで評価し直す処理。FAGL_FCVで実行する。生じた評価差額は為替差損益としてP/Lに計上され、相手勘定として評価調整勘定が立つ。この差額は未実現であるため翌期首に戻し入れる（洗替）のが原則で、評価方法で洗替を有効にしていないと差額が積み上がり翌期の損益が二重に歪む。',
    },
    en: {
      term: 'Foreign Currency Valuation',
      definition: 'Revaluing open foreign currency balances at closing rates during the period-end close, run through FAGL_FCV. The difference posts to exchange gain or loss with a valuation adjustment account on the balance sheet side. Because it is unrealised it is normally reversed at the start of the next period; without reversal configured in the valuation method, adjustments accumulate and distort the following period twice over.',
    },
  },
  {
    id: 'exchange-rate-type',
    modules: ['FI'],
    ja: {
      term: '為替レートタイプ',
      reading: 'かわせれーとたいぷ',
      definition: '目的に応じて使い分ける為替レートの区分。M（標準換算レート、日常の転記に使う既定値）、B（銀行買レート）、G（銀行売レート）、P（計画レート）などがある。レートはOB08で、レートタイプ・通貨ペア・有効開始日の組み合わせで登録する。該当日付のレートが未登録だと外貨建伝票の転記がエラーで止まるため、月初の登録は定型作業として組み込む必要がある。',
    },
    en: {
      term: 'Exchange Rate Type',
      definition: 'The category distinguishing rates used for different purposes: M for standard translation and everyday posting, B for the bank buying rate, G for the selling rate, P for planning. Rates are maintained in OB08 by type, currency pair and validity date. A missing rate stops foreign currency postings outright, so loading rates at the start of each month has to be a fixed routine.',
    },
  },
  {
    id: 'financial-statement-version',
    modules: ['FI'],
    ja: {
      term: '財務諸表バージョン（FSV）',
      reading: 'ざいむしょひょうばーじょん',
      definition: '勘定科目をどう集計して表示するかを階層構造として定義したもの。どの科目を流動資産に含めるか、どの階層で小計を出すかを規定する。同じ会社コードに対して複数持つことができ、日本の会社法計算書類用、IFRS用、内部管理用といった目的別の表示形式を並行して用意するのが一般的。',
    },
    en: {
      term: 'Financial Statement Version (FSV)',
      definition: 'A hierarchy defining how G/L accounts are grouped and subtotalled for reporting — which accounts count as current assets, where subtotals appear. A company code can have several, and running one for local statutory format, one for IFRS and one for internal management reporting side by side is common practice.',
    },
  },
  {
    id: 'asset-class',
    modules: ['FI'],
    ja: {
      term: '資産クラス',
      reading: 'しさんくらす',
      definition: '固定資産を性質ごとに分類する最も重要な区分。勘定設定（取得原価・減価償却累計額・減価償却費の転記先勘定）、番号範囲、既定の減価償却キーと耐用年数、画面レイアウトを規定する。資産マスタを作成するとき最初に選び、そのクラスの設定が初期値として引き継がれる。建設仮勘定や低価値資産も専用の資産クラスとして設定する。',
    },
    en: {
      term: 'Asset Class',
      definition: 'The primary classification of fixed assets, determining account determination for acquisition cost, accumulated depreciation and depreciation expense, the number range, default depreciation key and useful life, and the screen layout. It is the first choice when creating an asset master, and its settings become the defaults. Assets under construction and low-value assets have their own classes.',
    },
  },
  {
    id: 'depreciation-area',
    modules: ['FI'],
    ja: {
      term: '評価領域',
      reading: 'ひょうかりょういき',
      definition: '同じ1つの資産について、目的の異なる複数の帳簿価額を並行して管理する仕組み。会計基準上は定額法で10年、税務上は定率法で8年といった状況を、評価領域01（帳簿）と15（税務）に分けて同時に計算する。すべての領域が総勘定元帳に転記されるわけではなく、税務用は計算だけ行い申告資料の作成に使う運用が一般的。',
    },
    en: {
      term: 'Depreciation Area',
      definition: 'The mechanism for maintaining several parallel valuations of the same asset for different purposes — straight line over ten years for accounting and declining balance over eight for tax, calculated simultaneously in areas 01 and 15. Not every area posts to the general ledger; a tax area commonly only calculates, feeding the figures used to prepare returns.',
    },
  },
  {
    id: 'depreciation-key',
    modules: ['FI'],
    ja: {
      term: '減価償却キー',
      reading: 'げんかしょうきゃくきー',
      definition: '減価償却額をどう計算するかを定義するマスタ。定額法か定率法か、償却の開始タイミング、残存価額の扱いといった要素を計算方法の組み合わせとして定義する。耐用年数との組み合わせで毎期の償却額が自動計算される。耐用年数は資産マスタの評価領域ごとに設定できるため、帳簿と税務で異なる年数を使うことも可能。',
    },
    en: {
      term: 'Depreciation Key',
      definition: 'The master record defining how depreciation is calculated — straight line or declining balance, when depreciation starts, how residual value is treated — assembled from underlying calculation methods. Combined with the useful life it produces the periodic charge. Useful life is held per depreciation area on the asset master, so book and tax lives can differ.',
    },
  },
  {
    id: 'balance-carryforward',
    modules: ['FI'],
    ja: {
      term: '残高繰越',
      reading: 'ざんだかくりこし',
      definition: '年度末に残高を翌年度へ繰り越す処理。貸借対照表科目は残高がそのまま翌年度の期首残高となり、損益計算書科目は残高がゼロにリセットされたうえで当期損益が利益剰余金勘定へ振り替えられる。総勘定元帳はFAGLGVTR、補助元帳はF.07、固定資産はAJRWで実行する。繰越後に前年度へ転記した場合、その差額は自動的に反映される。',
    },
    en: {
      term: 'Balance Carry-Forward',
      definition: 'Carrying balances into the next fiscal year at year end. Balance sheet accounts carry their balance forward as the opening balance, while P&L accounts reset to zero with the result transferred to retained earnings. It is run with FAGLGVTR for the general ledger, F.07 for sub-ledgers and AJRW for fixed assets. Postings made to the prior year afterwards update the carried balance automatically.',
    },
  },
  {
    id: 'field-status-group',
    modules: ['FI'],
    ja: {
      term: 'フィールドステータスグループ',
      reading: 'ふぃーるどすてーたすぐるーぷ',
      definition: '伝票入力時にどの項目を入力必須・任意・非表示とするかを制御する設定。勘定科目マスタに割り当てる。転記キー側にも同様の制御があり、両者を組み合わせて最終的な表示が決まる。より制限の強い設定が優先されるため、「原価センタを必須にしたいのに任意になっている」という相談はこの2つのどちらか、あるいは両方に原因がある。',
    },
    en: {
      term: 'Field Status Group',
      definition: 'The setting that controls which fields are required, optional or suppressed during document entry, assigned to the G/L account master. Posting keys carry equivalent control, and the two combine to determine what is finally displayed, with the more restrictive setting winning. A cost centre that is optional when it should be mandatory traces to one or both of them.',
    },
  },
  {
    id: 'parked-document',
    modules: ['FI'],
    ja: {
      term: '保留伝票／保持伝票',
      reading: 'ほりゅうでんぴょう',
      definition: '入力途中の伝票を一時保存する2つの方法。保留伝票は伝票番号が採番され、他のユーザーからも参照・編集できるため承認ワークフローに向く（FBV0で照会・転記）。保持伝票は伝票番号が採番されず他のユーザーからは見えない、入力者本人のためのメモに近い機能。入力担当者と承認担当者を分ける要件には保留伝票を使う。',
    },
    en: {
      term: 'Parked / Held Document',
      definition: 'Two ways of saving an unfinished document. A parked document receives a number and can be viewed and edited by others, which suits an approval workflow; it is displayed and posted with FBV0. A held document receives no number and is invisible to others, closer to a personal scratchpad. Separating the person who enters from the person who approves calls for parking.',
    },
  },
  {
    id: 'document-reversal',
    modules: ['FI'],
    ja: {
      term: '伝票取消（逆仕訳）',
      reading: 'でんぴょうとりけし',
      definition: '転記済みの会計伝票は金額や勘定科目を上書き修正できないため、誤りはFB08で取り消す。取消を行うと元伝票と逆の仕訳が新しい伝票として起票され、両者が相互に紐づけられる。消込済みの伝票はFBRAで消込を解除してからでないと取り消せず、クローズされた期間への取消もその期間を再オープンしない限りできない。',
    },
    en: {
      term: 'Document Reversal',
      definition: 'Because a posted accounting document cannot have its amounts or accounts overwritten, errors are corrected by reversing it with FB08, which posts the opposite entries as a new document and links the two. A cleared document must have its clearing reset with FBRA first, and reversal into a closed period is impossible unless the period is reopened.',
    },
  },
  {
    id: 'acdoca',
    modules: ['FI', 'CO'],
    ja: {
      term: 'ACDOCA（ユニバーサルジャーナル）',
      reading: 'えーしーどっくえー',
      definition: 'S/4HANAで導入された、会計明細を統合して保持する単一テーブル。ECCではFIの明細（BSEG）、COの明細（COEP）、新総勘定元帳の明細が別々のテーブルにあり、両者の数値が一致しない「FI/CO差異」の突合が経理の恒常的な負担だった。ACDOCAでは1行が勘定科目・原価センタ・利益センタ・セグメントをすべて属性として持つため、この差異の概念自体がなくなった。',
    },
    en: {
      term: 'ACDOCA (Universal Journal)',
      definition: 'The single table introduced in S/4HANA that consolidates accounting line items. In ECC, FI line items, CO line items and new general ledger items lived in separate tables, and reconciling them was a standing chore. In ACDOCA one row carries account, cost centre, profit centre and segment as attributes, which removes the concept of an FI/CO difference entirely.',
    },
  },

  // ─── CO ──────────────────────────────────────────────────────
  {
    id: 'secondary-cost-element',
    modules: ['CO'],
    ja: {
      term: '二次原価要素',
      reading: 'にじげんかようそ',
      definition: 'FIに対応する勘定を持たず、CO内部の配賦や振替にのみ使われる原価要素。総務部の費用を営業部へ配賦しても会社全体の費用は増えていないため、FIの勘定で処理すると二重計上になる。これを避けるための仕組み。S/4HANAでは二次原価要素も総勘定元帳勘定として登録されるが、財務諸表バージョンには含めないためB/SやP/Lには現れない。',
    },
    en: {
      term: 'Secondary Cost Element',
      definition: 'A cost element with no corresponding FI account, used only for internal allocation and settlement within CO. Allocating administration cost to sales adds nothing to total company expense, so running it through an FI account would double-count. S/4HANA registers secondary cost elements as G/L accounts but excludes them from the financial statement version, so they never appear in the balance sheet or P&L.',
    },
  },
  {
    id: 'statistical-key-figure',
    modules: ['CO'],
    ja: {
      term: '統計キー数値（SKF）',
      reading: 'とうけいきーすうち',
      definition: '面積、従業員数、電力使用量といった実数値を保持し、配賦の按分基準として使う仕組み。KB31Nで期間ごとに入力する。従業員数のように毎期あまり変わらない数値は固定値として登録し、自動的に繰り越すこともできる。固定比率による按分より実態に即した配分ができるため、共通費の配賦で広く使われる。',
    },
    en: {
      term: 'Statistical Key Figure (SKF)',
      definition: 'A real measure such as floor area, headcount or power consumption, held per period and used as the basis for apportioning allocations. Values are entered with KB31N, and figures that barely change, such as headcount, can be defined as fixed values that carry forward automatically. Because it tracks reality more closely than a fixed percentage, it is widely used for overhead allocation.',
    },
  },
  {
    id: 'activity-price',
    modules: ['CO', 'PP'],
    ja: {
      term: '活動単価',
      reading: 'かつどうたんか',
      definition: '原価センタの計画原価を計画活動量で割って求める、活動タイプごとの単価。「機械稼働1時間あたりいくら」を表し、作業手順の標準時間と掛け合わせて加工費が計算される。分母の計画活動量を理論上の最大稼働時間にするか現実的な稼働率を織り込むかで単価は大きく変わり、原価計算設計の重要な判断となる。経営判断で固定的な単価を設定する政治価格という方法もある。',
    },
    en: {
      term: 'Activity Price',
      definition: 'The rate per activity type, derived by dividing planned cost centre cost by planned activity quantity — what an hour of machine time costs. Multiplied by the standard times in a routing it produces conversion cost. Whether the denominator is theoretical capacity or a realistic utilisation changes the rate substantially, making it a significant costing design decision. A rate can also be fixed by management as a political price.',
    },
  },
  {
    id: 'overhead-calculation',
    modules: ['CO'],
    ja: {
      term: '間接費配賦',
      reading: 'かんせつひはいふ',
      definition: '製造指図や内部指図に集まった直接費に対して、一定率で間接費を上乗せする処理。期末処理の最初の段階で実行し、その後に仕掛品算定や差異計算を行う。順序が重要で、間接費を配賦する前に仕掛品を計算すると、仕掛品の金額が実態より小さくなる。原価計算シートで配賦率と対象を定義する。',
    },
    en: {
      term: 'Overhead Calculation',
      definition: 'Applying overhead as a percentage on top of the direct cost collected on a production or internal order. It runs at the start of period-end processing, before work in process and variance calculation. The order matters: calculating WIP before overhead has been applied understates it. Rates and scope are defined in a costing sheet.',
    },
  },
  {
    id: 'cost-component',
    modules: ['CO'],
    ja: {
      term: '原価コンポーネント',
      reading: 'げんかこんぽーねんと',
      definition: '積み上げた製品原価を、原材料費・直接労務費・機械費・製造間接費といった内訳を保った形で保持する枠組み。この内訳が保たれることの価値は多段階の製品で発揮され、完成品の原価のうち何割が原材料費で何割が加工費かを、中間製品を何段階経ていても分解して見られる。粗利がなぜ低いのかを原価の構成要素まで遡って分析できる。',
    },
    en: {
      term: 'Cost Component',
      definition: 'The framework that preserves the breakdown behind a rolled-up product cost — raw materials, direct labour, machine cost, production overhead. Its value shows in multi-level products: however many semi-finished stages lie between, the proportion of a finished item that is material rather than conversion remains visible, which lets a weak margin be traced to its components.',
    },
  },
  {
    id: 'costing-variant',
    modules: ['CO', 'PP'],
    ja: {
      term: '原価計算バリアント',
      reading: 'げんかけいさんばりあんと',
      definition: '原価計算の細かい挙動を制御する設定。どの価格を材料単価として使うか、どのBOMと作業手順を選ぶか、間接費をどう上乗せするかを規定し、評価バリアント・数量構造管理・日付管理から構成される。「同じ製品なのに計算結果が違う」という場合、多くは原価計算バリアントの違いが原因となる。',
    },
    en: {
      term: 'Costing Variant',
      definition: 'The setting that governs the detail of a cost estimate: which material price is used, which BOM and routing are selected, how overhead is applied. It is assembled from a valuation variant, quantity structure control and date control. When the same product costs differently in two runs, the costing variant is usually the reason.',
    },
  },
  {
    id: 'material-ledger',
    modules: ['CO', 'MM'],
    ja: {
      term: '品目元帳（Material Ledger）',
      reading: 'ひんもくもとちょう',
      definition: '在庫を複数通貨で評価したり、実際原価計算を行ったりするための機能。期中は標準価格で処理しつつ、期末に実際の購入価格や製造原価にもとづいて在庫と消費を再評価できる。標準価格の安定性と実際原価の正確性を両立させる仕組みであり、S/4HANAでは標準で有効化されている。',
    },
    en: {
      term: 'Material Ledger',
      definition: 'The function supporting inventory valuation in several currencies and actual costing. The period runs on standard prices and is revalued at period end from actual purchase and production costs, combining the stability of standard costing with the accuracy of actual. It is active by default in S/4HANA.',
    },
  },
  {
    id: 'idle-capacity-variance',
    modules: ['CO', 'PP'],
    ja: {
      term: '操業度差異',
      reading: 'そうぎょうどさい',
      definition: '固定費は生産量にかかわらず発生するため、計画より生産量が少ないと1個あたりが負担する固定費が増え、標準原価では回収しきれない。この未回収分が操業度差異。製造現場の努力では解消できない性質を持ち、設備をどれだけ効率よく動かしても受注が少なければ発生するため、生産計画や営業活動の問題として読むべき差異。',
    },
    en: {
      term: 'Idle Capacity Variance',
      definition: 'Fixed cost is incurred regardless of volume, so producing less than planned means each unit should absorb more fixed cost than the standard recovers; the shortfall is this variance. It cannot be fixed on the shop floor — however efficiently equipment runs, too few orders will produce it — so it should be read as a question about planning and sales.',
    },
  },
  {
    id: 'value-field',
    modules: ['CO'],
    ja: {
      term: '特性／数値項目（CO-PA）',
      reading: 'とくせい',
      definition: '収益性分析のデータ構造を構成する2つの要素。特性は分析の切り口（製品、得意先、販売組織、地域など）、数値項目は測定する金額や数量（売上高、値引、原材料費など）。特性の組み合わせ1つひとつを収益性セグメントと呼ぶ。特性を増やしすぎるとセグメント数が組み合わせで爆発するため、実際に意思決定に使う軸に絞る必要がある。',
    },
    en: {
      term: 'Characteristic / Value Field (CO-PA)',
      definition: 'The two elements of the profitability analysis data structure. Characteristics are the dimensions analysed along — product, customer, sales organisation, region — while value fields hold the amounts and quantities measured. Each combination of characteristics is a profitability segment. Adding characteristics multiplies segments combinatorially, so they should be limited to dimensions that genuinely drive decisions.',
    },
  },

  // ─── SD ──────────────────────────────────────────────────────
  {
    id: 'partner-function',
    modules: ['SD'],
    ja: {
      term: 'パートナ機能',
      reading: 'ぱーとなきのう',
      definition: '1件の取引に登場する得意先を役割ごとに分けて管理する仕組み。受注先（注文を出す主体）、出荷先（商品の届け先）、請求先（請求書の送付先）、支払人（代金を支払う主体）の4つが必須。価格は受注先、納期と出荷条件は出荷先、与信と支払条件は支払人の設定に従うため、どの機能がどこに効くかを押さえるとトラブル対応が速い。',
    },
    en: {
      term: 'Partner Function',
      definition: 'The mechanism that splits the customer in a transaction into roles: the sold-to party placing the order, the ship-to party receiving the goods, the bill-to party receiving the invoice and the payer settling it. All four are mandatory. Pricing follows the sold-to party, dates and shipping conditions the ship-to, credit and payment terms the payer — knowing which drives what shortens troubleshooting considerably.',
    },
  },
  {
    id: 'billing-plan',
    modules: ['SD', 'PS'],
    ja: {
      term: '請求計画',
      reading: 'せいきゅうけいかく',
      definition: '1件の受注に対して複数回の請求を計画する仕組み。日付ごとに請求金額や比率を定義する。期間請求（保守契約などで一定期間ごとに請求）と、マイルストーン請求（工事の節目ごとに請求）の2形式がある。マイルストーン請求ではPSのマイルストーンと連動し、達成すると請求ブロックが自動的に解除される。',
    },
    en: {
      term: 'Billing Plan',
      definition: 'A schedule of several billings against one sales order, defining amounts or percentages per date. Two forms exist: periodic billing, used for maintenance contracts and similar, and milestone billing tied to project milestones. In milestone billing the block is released automatically as each milestone is achieved in PS.',
    },
  },
  {
    id: 'incompletion-log',
    modules: ['SD'],
    ja: {
      term: '不完全ログ',
      reading: 'ふかんぜんろぐ',
      definition: '必須項目が入力されていない伝票を「不完全」として記録し、後続処理をブロックする仕組み。何を必須とするかは不完全性手順で定義し、受注伝票で購買発注番号を必須にする、出荷先の設定がなければ出荷させないといった制御ができる。V.02で不完全伝票の一覧を確認でき、月次で滞留していないかを点検する対象になる。',
    },
    en: {
      term: 'Incompletion Log',
      definition: 'The facility that flags documents missing required fields as incomplete and blocks follow-on processing. What counts as required is defined in an incompletion procedure — making a customer purchase order number mandatory, or preventing delivery without a ship-to party. V.02 lists incomplete documents, and clearing them belongs in the monthly routine.',
    },
  },
  {
    id: 'output-determination',
    modules: ['SD', 'MM'],
    ja: {
      term: '出力決定（メッセージ制御）',
      reading: 'しゅつりょくけってい',
      definition: '発注書や請求書などの帳票を、いつ・どの媒体で・誰に出力するかを制御する仕組み。印刷、FAX、メール、EDIといった媒体を、得意先や購買組織ごとに設定できる。価格設定と同じ条件テクニックにもとづいており、アクセスシーケンスと条件レコードを使って決定される。',
    },
    en: {
      term: 'Output Determination',
      definition: 'The mechanism controlling when, by what medium and to whom documents such as purchase orders and invoices are issued — print, fax, email or EDI — configurable per customer or purchasing organisation. It runs on the same condition technique as pricing, resolving through access sequences and condition records.',
    },
  },
  {
    id: 'rebate',
    modules: ['SD'],
    ja: {
      term: 'リベート',
      reading: 'りべーと',
      definition: '一定期間の取引量に応じて事後的に支払う割戻し。取引の都度ではなく期末にまとめて精算するため、期中は引当金を積み上げていく処理を行う。リベート契約に条件レコードを登録し、請求のたびに引当額が計算される。契約期間の終了時に精算し、クレジットメモを発行する。',
    },
    en: {
      term: 'Rebate',
      definition: 'A discount paid retrospectively based on volume over a period. Because it settles at the end rather than on each transaction, an accrual is built up during the period: a rebate agreement holds condition records and each billing document adds to the accrual. At the end of the agreement the rebate is settled and a credit memo issued.',
    },
  },

  // ─── MM ──────────────────────────────────────────────────────
  {
    id: 'account-assignment-category',
    modules: ['MM'],
    ja: {
      term: '勘定設定カテゴリ',
      reading: 'かんじょうせっていかてごり',
      definition: '購買発注で、購入したものの原価をどこが負担するかを決める項目。空欄なら在庫品目として在庫勘定に計上され、Kなら原価センタ、Fなら指図、Pならプロジェクト（WBS）、Aなら固定資産に計上される。空欄以外を指定すると入庫の時点で在庫を経由せず直接費用になるため、「買ったのに在庫が増えない」という疑問はこの設定で説明できる。',
    },
    en: {
      term: 'Account Assignment Category',
      definition: 'The purchase order field deciding who bears the cost of what is bought. Blank makes it a stock item posted to inventory; K charges a cost centre, F an order, P a WBS element and A a fixed asset. Anything other than blank expenses the item at goods receipt without passing through stock, which explains the familiar question of why a purchase did not increase inventory.',
    },
  },
  {
    id: 'source-list',
    modules: ['MM'],
    ja: {
      term: 'ソースリスト',
      reading: 'そーすりすと',
      definition: '「この品目はこのプラントで、この期間、この仕入先から調達する」という定義（ME01）。MRPが自動的に発注先を選ぶ際の根拠になり、枠契約を実際に使うにはソースリストでその契約を調達先として指定しておく必要がある。固定調達先として設定すれば、常にその仕入先または契約が使われる。',
    },
    en: {
      term: 'Source List',
      definition: 'The definition (ME01) of which supplier a material is procured from, at which plant and over which period. MRP uses it to select a source, and an outline agreement only comes into play if the source list names it. Marking an entry as fixed makes that supplier or agreement the only one used.',
    },
  },
  {
    id: 'quota-arrangement',
    modules: ['MM'],
    ja: {
      term: 'クォータ取決め',
      reading: 'くぉーたとりきめ',
      definition: '同じ品目を複数の仕入先から調達する場合に、その配分比率を定義する仕組み。「A社から60%、B社から40%」といった割り当てを設定しておくと、MRPが自動的にその比率で発注先を振り分ける。調達先を1社に依存するリスクを避けたい場合や、複数社との関係を維持したい場合に使われる。',
    },
    en: {
      term: 'Quota Arrangement',
      definition: 'The definition of how procurement is split when a material is bought from several suppliers — sixty per cent from one and forty from another — which MRP then applies automatically when selecting a source. It is used to avoid dependence on a single supplier and to keep several relationships alive.',
    },
  },
  {
    id: 'subcontracting',
    modules: ['MM', 'PP'],
    ja: {
      term: '外注加工',
      reading: 'がいちゅうかこう',
      definition: '部品を外部の業者に支給し、加工してもらって完成品を受け取る調達形態（品目カテゴリL）。支給した部品は業者の場所にあるが所有権は自社にあり、「仕入先在庫」として管理される。完成品の入庫と同時に部品表にもとづいて部品が自動的に消費され、支払うのは加工賃のみ。仕入先在庫の残高はME2Oで定期的に確認する必要がある。',
    },
    en: {
      term: 'Subcontracting',
      definition: 'Procurement in which components are supplied to an external processor who returns a finished item (item category L). The components sit at the vendor but remain your property, tracked as stock provided to vendor. Receiving the finished item automatically consumes the components per the BOM, and only the processing fee is payable. ME2O lists what remains at the processor.',
    },
  },
  {
    id: 'scheduling-agreement',
    modules: ['MM'],
    ja: {
      term: 'スケジュール契約',
      reading: 'すけじゅーるけいやく',
      definition: '契約と納入指示を1つの伝票で管理する枠契約の形式。契約本体に納入スケジュール行を追加していくため、毎回発注書を発行する必要がなく、納入計画を更新するだけで仕入先に指示が伝わる。中長期の見込みを示すフォーキャストと、直近の確定した指示であるJIT納入計画がある。自動車産業のような頻繁な納入に適する。',
    },
    en: {
      term: 'Scheduling Agreement',
      definition: 'An outline agreement combining the contract and the delivery instruction in one document: schedule lines are appended over time, so updating the schedule replaces issuing a purchase order for every delivery. Forecast schedules convey medium-term expectations while JIT schedules give firm near-term instructions. It suits frequent delivery patterns such as automotive supply.',
    },
  },
  {
    id: 'blocked-invoice',
    modules: ['MM'],
    ja: {
      term: '照合ブロック（請求書ブロック）',
      reading: 'しょうごうぶろっく',
      definition: '3点照合で数量や金額が許容範囲を超えてずれている場合に、請求書へ自動的に設定される支払保留。会計上は債務として計上されるが支払は行われない。MRBRで一覧を確認し、内容を精査して解除するか仕入先と交渉するかを判断する。放置すると支払遅延となり仕入先との関係を損なうため、ブロック理由別に担当を決めて処理する運用が必要。',
    },
    en: {
      term: 'Blocked Invoice',
      definition: 'The payment block applied automatically when three-way match finds a quantity or value difference beyond tolerance. The liability is recognised but payment is withheld. MRBR lists blocked invoices for investigation and release or renegotiation. Left alone they become late payments and strained supplier relationships, so ownership by block reason is worth establishing.',
    },
  },
  {
    id: 'reservation',
    modules: ['MM', 'PP'],
    ja: {
      term: '予約（Reservation）',
      reading: 'よやく',
      definition: '将来の出庫のために在庫を確保する仕組み。製造指図の部品所要量や、原価センタへの払出予定などから生成される。予約された数量は利用可能在庫から差し引かれ、MRPの所要量として扱われる。製造指図を技術的完了（TECO）にしないと未出庫分の予約が残り続け、MRPが不要な部品を手配し続ける原因になる。',
    },
    en: {
      term: 'Reservation',
      definition: 'The mechanism that earmarks stock for a future issue, generated from production order component requirements or planned issues to a cost centre. Reserved quantity is deducted from availability and treated as a requirement by MRP. Failing to set a production order to technically complete leaves unissued reservations standing, which is a common reason MRP keeps procuring components no longer needed.',
    },
  },
  {
    id: 'safety-stock',
    modules: ['MM', 'PP'],
    ja: {
      term: '安全在庫',
      reading: 'あんぜんざいこ',
      definition: '需要変動や納期遅延に備えて確保しておく最低在庫。品目マスタのMRPビューで設定する。MRPは安全在庫を下回らないよう手配を提案するため、実質的に使えない在庫として計算から除外される。設定を大きくすれば欠品リスクは下がるが、在庫金額と保管コストが増える。過去の需要変動と調達リードタイムから適正値を求めるのが本来の考え方。',
    },
    en: {
      term: 'Safety Stock',
      definition: 'The minimum stock held as a buffer against demand variation and late delivery, set on the material master MRP view. MRP proposes procurement so that stock does not fall below it, effectively excluding it from availability. Raising it reduces stockout risk but increases inventory value and holding cost; the proper level is derived from historical demand variation and lead time.',
    },
  },
  {
    id: 'incoterms',
    modules: ['MM', 'SD'],
    ja: {
      term: 'インコタームズ',
      reading: 'いんこたーむず',
      definition: '国際商取引における費用と危険負担の分岐点を定めた国際規則。EXW（工場渡し）、FOB（本船渡し）、CIF（運賃保険料込み）、DDP（関税込み持込渡し）などの条件がある。仕入先マスタや得意先マスタに登録し、発注書や受注伝票に引き継がれる。輸送費や保険料をどちらが負担するかが決まるため、原価計算にも影響する。',
    },
    en: {
      term: 'Incoterms',
      definition: 'The international rules defining where cost and risk pass between seller and buyer — EXW, FOB, CIF, DDP and the rest. They are held on vendor and customer masters and default onto purchase and sales documents. Because they determine who bears freight and insurance, they also affect costing.',
    },
  },

  // ─── PP ──────────────────────────────────────────────────────
  {
    id: 'backflush',
    modules: ['PP'],
    ja: {
      term: 'バックフラッシュ',
      reading: 'ばっくふらっしゅ',
      definition: '製造の確認入力時に、部品表から必要数を逆算して部品の出庫を自動的に行う仕組み。出庫作業の手間が消え入力漏れも起きないが、実際の使用量が部品表とずれていても記録に残らない。この差は棚卸まで表面化せず棚卸差異としてまとめて計上されるため、低価格で使用量が安定した部品に限って使うのが原則。',
    },
    en: {
      term: 'Backflush',
      definition: 'Issuing components automatically at confirmation, working back from the BOM rather than posting separate goods issues. It removes the issuing effort and nothing is forgotten, but consumption differing from the BOM leaves no trace until the next physical count, appearing there as an inventory difference — so it is reserved for low-value components with stable usage.',
    },
  },
  {
    id: 'low-level-code',
    modules: ['PP', 'CO'],
    ja: {
      term: '低位コード',
      reading: 'ていいこーど',
      definition: '部品表の階層構造における深さを表す値。製品Aが中間品Bを使い、Bが部品Cを使うという階層で、MRPも原価計算もこの低位コードの順に処理する。最も低い階層から順に計算することで、下位の結果を上位で使えるようにしている。部品表に循環参照（AがBを使い、BがAを使う）があると低位コードが決定できず、MRPも原価計算も止まる。',
    },
    en: {
      term: 'Low-Level Code',
      definition: 'The value recording how deep a material sits in the BOM hierarchy. Both MRP and costing process in low-level-code order, calculating from the bottom up so that lower results feed higher ones. A circular BOM, where A uses B and B uses A, makes the code indeterminable and stops both processes.',
    },
  },
  {
    id: 'lot-size-procedure',
    modules: ['PP', 'MM'],
    ja: {
      term: 'ロットサイズ',
      reading: 'ろっとさいず',
      definition: 'MRPが不足を検知したときに、何個まとめて手配するかを決める方式。正味所要量（不足分だけ）、固定ロット、最大在庫までの補充、期間まとめ（一定期間の所要量を合算）などがある。期間まとめを使えば手配回数と段取回数を減らせる。方式とは別に、丸め値・最小ロット・最大ロットを設定して実際の生産や納入の制約を反映させられる。',
    },
    en: {
      term: 'Lot-Sizing Procedure',
      definition: 'How MRP decides the quantity to procure when it finds a shortage: lot for lot covering exactly the shortfall, a fixed lot, replenishment to a maximum level, or grouping requirements over a period to reduce the number of orders and setups. Independently of the procedure, rounding values and minimum and maximum lots express real production and delivery constraints.',
    },
  },
  {
    id: 'planning-strategy',
    modules: ['PP'],
    ja: {
      term: '計画戦略',
      reading: 'けいかくせんりゃく',
      definition: '需要をどう扱うかを決める設定で、品目マスタのMRP 3ビューで戦略グループとして指定する。戦略10は見込生産（PIRだけで生産）、20は受注生産（受注だけで生産）、40は予測にもとづいて先行生産しつつ受注が予測を消費する方式で、実務で最もよく使われる。受注生産では作った在庫が受注在庫となり、他の受注には引き当てられない。',
    },
    en: {
      term: 'Planning Strategy',
      definition: 'The setting that determines how demand is handled, assigned as a strategy group on the material master MRP 3 view. Strategy 10 is make to stock driven by planned independent requirements, 20 is make to order driven by sales orders, and 40 — the most widely used — produces ahead on forecast with sales orders consuming it. Under make-to-order strategies the resulting stock is sales order stock and cannot be used for another order.',
    },
  },
  {
    id: 'requirements-consumption',
    modules: ['PP'],
    ja: {
      term: '需要の消費（Consumption）',
      reading: 'じゅようのしょうひ',
      definition: '受注が入ったときに計画独立所要量（PIR）を減額する仕組み。これがないと予測と受注が二重にカウントされ、過剰生産になる。どの期間のPIRを消費するかは消費モード（前方・後方）と消費期間で制御する。設定が短すぎると日付が少しずれただけで消費されず、MD04で受注とPIRが並んで残っている場合はこの設定を確認する。',
    },
    en: {
      term: 'Requirements Consumption',
      definition: 'The reduction of planned independent requirements as sales orders arrive. Without it, forecast and orders are both planned and production doubles. Consumption mode, forward or backward, and the consumption period control which requirements are consumed. Too short a period means a small date difference prevents consumption — visible in MD04 as sales orders and forecast sitting side by side.',
    },
  },
  {
    id: 'kanban',
    modules: ['PP', 'MM'],
    ja: {
      term: 'かんばん（KANBAN）',
      reading: 'かんばん',
      definition: '後工程が使った分だけ前工程が補充する、引き取り方式の生産管理手法をSAP上で実現する機能。かんばんカードの状態（空・充填済）の切り替えによって補充が指示され、MRPによる事前計画に依存しない。消費量が安定している品目に適し、在庫の削減とリードタイム短縮に寄与する。補充元は自社生産、外部購買、他の保管場所から選べる。',
    },
    en: {
      term: 'KANBAN',
      definition: 'SAP\'s implementation of pull-based replenishment, where a downstream stage triggers upstream supply by what it consumes. Switching a kanban between empty and full signals replenishment without relying on MRP planning ahead. It suits materials with stable consumption and reduces both inventory and lead time; the supply source can be in-house production, external procurement or another storage location.',
    },
  },
];
