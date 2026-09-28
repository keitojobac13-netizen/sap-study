import type { ReactNode } from 'react';
import type { FigureName } from '../../_lib/learning-types';
import Phrase from '../Phrase';

/**
 * Hand-drawn figures for articles. Each one is shaped by the single idea it
 * has to get across, so they deliberately do not share a layout. They are
 * plain HTML rather than images: the words stay searchable and selectable,
 * and the colours follow the site tokens.
 *
 * Boxes are narrow, and Japanese may break between any two characters. Labels
 * are therefore written with `|` at the only acceptable break points, and each
 * piece is set as an unbreakable inline block (see `Phrase`).
 */

const box = 'border px-2 sm:px-3 py-2.5 text-center';
const title = 'block text-[0.8rem] sm:text-[0.85rem] font-semibold leading-snug';
const sub = 'block text-[0.72rem] text-ink-mute leading-snug mt-1';

function Arrow({ label }: { label?: string }) {
  return (
    <div aria-hidden className="flex flex-col items-center justify-center text-ink-mute py-1.5 sm:py-0 sm:px-2">
      {label && (
        <span className="text-[0.72rem] leading-snug text-center mb-0.5">
          <Phrase text={label} />
        </span>
      )}
      <span className="text-base leading-none sm:hidden">↓</span>
      <span className="text-base leading-none hidden sm:inline">→</span>
    </div>
  );
}

/** Each ledger holds the shared postings plus its own adjustments. */
function LedgerStack() {
  const ledgers = [
    { id: '0L', std: 'IFRS', adj: 'IFRSだけの|調整仕訳' },
    { id: '2L', std: '日本基準', adj: '日本基準だけの|調整仕訳' },
  ];
  return (
    <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3">
      {ledgers.map((l) => (
        <div key={l.id} className="text-center pb-2 border-b-2 border-ink">
          <span className={title}>元帳 {l.id}</span>
          <span className={sub}>{l.std}</span>
        </div>
      ))}

      <div className={`${box} col-span-2 mt-3 border-accent bg-accent-soft text-accent`}>
        <span className={title}><Phrase text="共通の仕訳|（売上・仕入など）" /></span>
        <span className="block text-[0.72rem] leading-snug mt-1">
          <Phrase text="1回の入力で、|両方の元帳に入る" />
        </span>
      </div>

      {ledgers.map((l) => (
        <div key={l.id} className={`${box} mt-2 border-rule bg-paper text-ink`}>
          <span className={title}><Phrase text={l.adj} /></span>
          <span className={sub}><Phrase text="元帳を指定して|入力" /></span>
        </div>
      ))}

      {ledgers.map((l) => (
        <p key={l.id} className="mt-3 pt-2 border-t border-rule text-center text-[0.8rem] font-semibold text-ink">
          <Phrase text={`＝ ${l.std}の|数字`} />
        </p>
      ))}
    </div>
  );
}

/** The accounting principle is the hub that ties valuation settings to a ledger. */
function StandardHub() {
  const rows = [
    { std: 'IFRS', ledger: '0L' },
    { std: '日本基準', ledger: '2L' },
  ];
  // Stays horizontal on a phone: the point of the figure is the left-to-right
  // path through the middle column, which a vertical stack would lose.
  const grid =
    'grid grid-cols-[minmax(0,1.5fr)_1.25rem_minmax(0,1fr)_1.25rem_minmax(0,0.8fr)] sm:grid-cols-[minmax(0,2fr)_2rem_minmax(0,1fr)_2rem_minmax(0,0.8fr)] items-center';
  const arrow = <span aria-hidden className="text-center text-ink-mute">→</span>;
  return (
    <div className="space-y-3">
      <div className={`${grid} text-[0.7rem] sm:text-[0.72rem] font-semibold text-ink-mute text-center`}>
        <span>評価の設定</span>
        <span />
        <span>会計基準</span>
        <span />
        <span>転記先</span>
      </div>
      {rows.map((r) => (
        <div key={r.std} className={`${grid} border-t border-rule pt-3`}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2">
            <div className={`${box} border-rule bg-paper text-ink`}>
              <span className={title}><Phrase text="固定資産の|評価エリア" /></span>
            </div>
            <div className={`${box} border-rule bg-paper text-ink`}>
              <span className={title}><Phrase text="外貨評価の|評価エリア" /></span>
            </div>
          </div>
          {arrow}
          <div className={`${box} self-stretch flex flex-col justify-center border-accent bg-accent-soft text-accent`}>
            <span className={title}>{r.std}</span>
          </div>
          {arrow}
          <div className={`${box} self-stretch flex flex-col justify-center border-ink bg-paper text-ink`}>
            <span className={sub.replace(' mt-1', '')}>元帳</span>
            <span className={title}>{r.ledger}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

/** A reconciliation account balance is nothing but the sum of sub-ledger items. */
function ControlAccount() {
  const items = [
    ['得意先A', '100,000'],
    ['得意先B', '250,000'],
    ['得意先C', '50,000'],
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:items-center">
      <div className="border border-rule bg-paper">
        <p className="px-3 py-2 border-b border-rule text-[0.8rem] font-semibold text-ink text-center">
          <Phrase text="補助元帳|（得意先ごとの明細）" />
        </p>
        <ul className="px-3 py-1.5">
          {items.map(([name, amount]) => (
            <li key={name} className="flex justify-between py-1 text-[0.8rem] text-ink-soft tabular-nums">
              <span>{name}</span>
              <span>{amount}円</span>
            </li>
          ))}
        </ul>
      </div>
      <Arrow label="合計が|自動で反映" />
      <div className="border-2 border-accent bg-paper">
        <p className="px-3 py-2 border-b border-rule text-[0.8rem] font-semibold text-ink text-center">
          総勘定元帳
        </p>
        <div className="px-3 py-3 text-center">
          <span className="block text-[0.8rem] text-ink-soft">
            <Phrase text="売掛金|（統制勘定）" />
          </span>
          <span className="block text-[1.05rem] font-bold text-accent tabular-nums mt-1">400,000円</span>
        </div>
      </div>
    </div>
  );
}

/** Costs wait on a temporary asset, then move to the real one and start depreciating. */
function AucPhases() {
  const head = 'px-3 py-2 border-b border-rule text-[0.72rem] font-semibold text-ink-mute text-center';
  const tag = 'inline-block mt-3 px-2 py-0.5 text-[0.72rem] font-semibold';
  return (
    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] sm:items-stretch">
      <div className="border border-rule bg-paper flex flex-col">
        <p className={head}>建設中</p>
        <div className="px-3 py-3 text-center flex-1">
          <span className={`${title} text-ink`}>建設仮勘定の資産</span>
          <ul className="mt-2 space-y-1 text-[0.78rem] text-ink-soft">
            <li>設計費</li>
            <li>工事代金（中間払い）</li>
            <li>工事代金（最終払い）</li>
          </ul>
          <span className={`${tag} bg-ground text-ink-mute`}>減価償却しない</span>
        </div>
      </div>
      <Arrow label="完成したら|決済（AIAB）" />
      <div className="border border-accent bg-paper flex flex-col">
        <p className={head}>完成後</p>
        <div className="px-3 py-3 text-center flex-1 flex flex-col items-center justify-center">
          <span className={`${title} text-ink`}>建物</span>
          <span className="block mt-2 text-[0.78rem] text-ink-soft">
            <Phrase text="取得価額 ＝|建設中の支出の合計" />
          </span>
          <span className={`${tag} bg-accent-soft text-accent`}>減価償却を開始</span>
        </div>
      </div>
    </div>
  );
}

/** Depreciation is calculated when the asset is acquired, but reaches the ledger only when AFAB runs. */
function DepreciationLanes() {
  const months = ['4月末', '5月末', '6月末'];
  const cols =
    'grid grid-cols-[4rem_repeat(4,minmax(0,1fr))] sm:grid-cols-[7rem_repeat(4,minmax(0,1fr))] gap-x-1 sm:gap-x-1.5';
  const lane = 'text-[0.72rem] sm:text-[0.74rem] font-semibold text-ink leading-snug self-center';
  return (
    <div className="space-y-2">
      <div className={`${cols} text-[0.7rem] sm:text-[0.72rem] text-ink-mute text-center`}>
        <span />
        <span>4月1日</span>
        {months.map((m) => <span key={m}>{m}</span>)}
      </div>

      <div className={`${cols} border-t border-rule pt-2`}>
        <span className={lane}><Phrase text="固定資産の|計画値" /></span>
        <div className={`${box} col-span-4 border-accent bg-accent-soft text-accent`}>
          <span className={title}><Phrase text="取得した時点で、|年間の減価償却費を計算" /></span>
          <span className="block text-[0.72rem] leading-snug mt-1">
            <Phrase text="例：年間120万円|（月10万円）" />
          </span>
        </div>
      </div>

      <div className={`${cols} border-t border-rule pt-2`}>
        <span className={lane}><Phrase text="総勘定|元帳" /></span>
        <div className="flex items-center justify-center text-[0.7rem] text-ink-mute text-center leading-snug">
          <span><Phrase text="まだ|計上|されない" /></span>
        </div>
        {months.map((m) => (
          <div key={m} className="border border-ink bg-paper px-1 py-2 text-center">
            <span className="block text-[0.7rem] sm:text-[0.72rem] font-semibold text-ink">AFAB</span>
            <span className="block text-[0.7rem] sm:text-[0.72rem] text-ink-soft tabular-nums">10万円</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Automatic clearing sums each group of matching items; only a zero balance clears. */
function ClearingGroups() {
  const items = [
    { kind: '請求', key: 'INV-1001', amount: '100,000' },
    { kind: '入金', key: 'INV-1001', amount: '−100,000' },
    { kind: '請求', key: 'INV-1002', amount: '50,000' },
    { kind: '入金', key: '1002', amount: '−50,000', odd: true },
  ];
  const groups = [
    { key: 'INV-1001', rows: [['請求', '100,000'], ['入金', '−100,000']], balance: '0', cleared: true },
    { key: 'INV-1002', rows: [['請求', '50,000']], balance: '50,000', cleared: false },
    { key: '1002', rows: [['入金', '−50,000']], balance: '−50,000', cleared: false },
  ];
  const cell = 'py-1 text-[0.78rem] tabular-nums';
  return (
    <div>
      <div className="border border-rule bg-paper mx-auto max-w-sm">
        <p className="px-3 py-2 border-b border-rule text-[0.8rem] font-semibold text-ink text-center">
          <Phrase text="得意先Aの|未決済明細" />
        </p>
        <table className="w-full">
          <thead>
            <tr className="text-[0.7rem] text-ink-mute">
              <th className="pl-3 py-1 text-left font-normal">種類</th>
              <th className="py-1 text-left font-normal">ソートキー</th>
              <th className="pr-3 py-1 text-right font-normal">金額（円）</th>
            </tr>
          </thead>
          <tbody className="text-ink-soft">
            {items.map((it, i) => (
              <tr key={i}>
                <td className={`${cell} pl-3`}>{it.kind}</td>
                <td className={`${cell} ${it.odd ? 'font-semibold text-accent' : ''}`}>{it.key}</td>
                <td className={`${cell} pr-3 text-right`}>{it.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div aria-hidden className="flex flex-col items-center text-ink-mute py-2">
        <span className="text-[0.72rem] leading-snug text-center mb-0.5">
          <Phrase text="ソートキーごとに|グループに分ける" />
        </span>
        <span className="text-base leading-none">↓</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
        {groups.map((g) => (
          <div
            key={g.key}
            className={`border bg-paper flex flex-col ${g.cleared ? 'border-accent' : 'border-rule'}`}
          >
            <p className="px-3 py-2 border-b border-rule text-center">
              <span className="block text-[0.7rem] text-ink-mute">グループ</span>
              <span className="block text-[0.85rem] font-semibold text-ink">{g.key}</span>
            </p>
            <ul className="px-3 py-1.5 flex-1">
              {g.rows.map(([kind, amount]) => (
                <li key={kind} className="flex justify-between py-0.5 text-[0.78rem] text-ink-soft tabular-nums">
                  <span>{kind}</span>
                  <span>{amount}</span>
                </li>
              ))}
            </ul>
            <div className="px-3 py-2 border-t border-rule flex items-center justify-between gap-2">
              <span className="text-[0.78rem] text-ink tabular-nums">残高 {g.balance}</span>
              <span
                className={`inline-block px-2 py-0.5 text-[0.72rem] font-semibold ${
                  g.cleared ? 'bg-accent-soft text-accent' : 'bg-ground text-ink-mute'
                }`}
              >
                {g.cleared ? '消し込まれる' : '残る'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** An SD item gets its tax code by looking up the two master tax classes in the condition records. */
function TaxCodeLookup() {
  const step = 'flex items-baseline gap-2 text-[0.78rem] font-semibold text-ink mb-1.5';
  const num = 'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper text-[0.68rem]';
  const records = [
    { cust: '1 課税', mat: '1 標準税率', code: '売上10%' },
    { cust: '1 課税', mat: '2 軽減税率', code: '売上8%', hit: true },
    { cust: '1 課税', mat: '0 非課税', code: '非課税売上' },
    { cust: '0 免税', mat: '（どれでも）', code: '免税売上' },
  ];
  const down = (
    <div aria-hidden className="text-center text-ink-mute text-base leading-none py-1.5">↓</div>
  );
  return (
    <div className="mx-auto max-w-md">
      <p className={step}><span className={num}>1</span>受注の明細</p>
      <div className={`${box} border-rule bg-paper text-ink`}>
        <span className={title}><Phrase text="得意先：A商店|　品目：ペットボトルのお茶" /></span>
        <span className={sub}><Phrase text="税コードは|入力していない" /></span>
      </div>
      {down}

      <p className={step}><span className={num}>2</span><span><Phrase text="それぞれのマスタから|税分類を読む" /></span></p>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={sub.replace(' mt-1', '')}><Phrase text="A商店の|BP" /></span>
          <span className={sub}>得意先税分類</span>
          <span className={`${title} mt-0.5`}>1 課税</span>
        </div>
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={sub.replace(' mt-1', '')}><Phrase text="お茶の|品目マスタ" /></span>
          <span className={sub}>品目税分類</span>
          <span className={`${title} mt-0.5`}>2 軽減税率</span>
        </div>
      </div>
      {down}

      <p className={step}><span className={num}>3</span><span><Phrase text="条件レコードから、|同じ組み合わせの行を探す" /></span></p>
      <div className="border border-rule bg-paper">
        <table className="w-full text-[0.75rem] sm:text-[0.78rem]">
          <thead>
            <tr className="text-[0.68rem] sm:text-[0.7rem] text-ink-mute border-b border-rule">
              <th className="pl-2 sm:pl-3 py-1.5 text-left font-normal">得意先税分類</th>
              <th className="py-1.5 text-left font-normal">品目税分類</th>
              <th className="pr-2 sm:pr-3 py-1.5 text-right font-normal">税コード</th>
            </tr>
          </thead>
          <tbody>
            {records.map((r) => (
              <tr
                key={r.code}
                className={r.hit ? 'bg-accent-soft text-accent font-semibold' : 'text-ink-soft'}
              >
                <td className="pl-2 sm:pl-3 py-1.5">{r.cust}</td>
                <td className="py-1.5">{r.mat}</td>
                <td className="pr-2 sm:pr-3 py-1.5 text-right">{r.code}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {down}

      <p className={step}><span className={num}>4</span><span><Phrase text="見つかった税コードが|明細に入る" /></span></p>
      <div className={`${box} border-accent bg-accent-soft text-accent`}>
        <span className={title}><Phrase text="税コード：|売上8%" /></span>
      </div>
    </div>
  );
}

/**
 * One WBS element followed through CJ88. Each step is also a place where the
 * run can stop, tagged with the check in the article that covers it.
 */
function SettlementSteps() {
  const step = 'flex items-baseline gap-2 text-[0.78rem] font-semibold text-ink mb-1.5';
  const num = 'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper text-[0.68rem]';
  const stop = 'mt-1.5 text-[0.72rem] leading-snug text-ink-mute';
  const tag = 'inline-block font-semibold text-accent mr-1';
  const down = (
    <div aria-hidden className="text-center text-ink-mute text-base leading-none py-1.5">↓</div>
  );
  return (
    <div className="mx-auto max-w-md">
      <p className={step}><span className={num}>1</span><span><Phrase text="WBS要素に|実績原価がたまる" /></span></p>
      <div className={`${box} border-rule bg-paper text-ink`}>
        <span className={sub.replace(' mt-1', '')}>WBS要素 P-1001-01</span>
        <span className={`${title} mt-0.5`}>社内システム改修</span>
        <span className={sub}><Phrase text="外注費80万円＋|社内作業20万円＝|100万円" /></span>
      </div>
      <p className={stop}><span className={tag}>確認1</span><Phrase text="原価がない、|または決済済みだと|決済するものがない" /></p>
      {down}

      <p className={step}><span className={num}>2</span><span><Phrase text="決済ルールで|行き先を決める" /></span></p>
      <div className={`${box} border-rule bg-paper text-ink`}>
        <span className={title}><Phrase text="原価センタ 4100|（情報システム部）へ|100%" /></span>
      </div>
      <p className={stop}><span className={tag}>確認2</span><Phrase text="ルールがないと|ここで止まる" /></p>
      {down}

      <p className={step}><span className={num}>3</span><span><Phrase text="ステータスが|決済を許すか" /></span></p>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${box} border-accent bg-accent-soft text-accent`}>
          <span className={title}>決済できる</span>
          <span className="block text-[0.72rem] leading-snug mt-1"><Phrase text="REL（リリース）|TECO（技術的完了）" /></span>
        </div>
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={title}>決済できない</span>
          <span className={sub}><Phrase text="CRTD（作成済）|CLSD（クローズ）" /></span>
        </div>
      </div>
      <p className={stop}><span className={tag}>確認3</span><Phrase text="ユーザーステータスで|止めていることもある" /></p>
      {down}

      <p className={step}><span className={num}>4</span><span><Phrase text="配分構造で、|決済に使う原価要素を決める" /></span></p>
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-1.5">
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={sub.replace(' mt-1', '')}>外注費</span>
          <span className={sub}>社内作業費</span>
        </div>
        <span aria-hidden className="text-ink-mute text-base">→</span>
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={title}><Phrase text="決済用の|原価要素" /></span>
        </div>
      </div>
      <p className={stop}><span className={tag}>確認5</span><Phrase text="どこにも割り当てられて|いない原価要素があると|KD503で止まる" /></p>
      {down}

      <p className={step}><span className={num}>5</span><span><Phrase text="決済先へ転記する" /></span></p>
      <div className={`${box} border-accent bg-accent-soft text-accent`}>
        <span className={title}><Phrase text="WBS要素 −100万円|→ 原価センタ 4100 ＋100万円" /></span>
      </div>
      <p className={stop}><span className={tag}>確認4</span><Phrase text="決済先がロック中・|有効期間外だと|受け取れない" /></p>
    </div>
  );
}

/**
 * One fee invoice followed to payment: nothing is withheld at the invoice,
 * and at payment the net fee is taxed in two bands.
 */
function WithholdingPayment() {
  const step = 'flex items-baseline gap-2 text-[0.78rem] font-semibold text-ink mb-1.5';
  const num = 'inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink text-paper text-[0.68rem]';
  const row = 'flex justify-between gap-3 px-2 sm:px-3 py-1.5 text-[0.75rem] sm:text-[0.78rem]';
  const down = (
    <div aria-hidden className="text-center text-ink-mute text-base leading-none py-1.5">↓</div>
  );
  return (
    <div className="mx-auto max-w-md">
      <p className={step}><span className={num}>1</span><span><Phrase text="請求書を転記する|（源泉徴収税はまだ計算しない）" /></span></p>
      <div className="border border-rule bg-paper text-ink-soft">
        <div className={row}><span>報酬</span><span className="tabular-nums">1,200,000円</span></div>
        <div className={row}><span>消費税</span><span className="tabular-nums">120,000円</span></div>
        <div className={`${row} border-t border-rule text-ink font-semibold`}><span>仕入先への債務</span><span className="tabular-nums">1,320,000円</span></div>
      </div>
      {down}

      <p className={step}><span className={num}>2</span><span><Phrase text="支払のときに、|税抜の報酬を基準額にする" /></span></p>
      <div className={`${box} border-rule bg-paper text-ink`}>
        <span className={title}>基準額 1,200,000円</span>
        <span className={sub}><Phrase text="消費税が区分されているので、|報酬だけが対象" /></span>
      </div>
      {down}

      <p className={step}><span className={num}>3</span><span><Phrase text="100万円までと、|超える部分で税率を分ける" /></span></p>
      <div className="border border-rule bg-paper text-ink-soft">
        <div className={row}><span>1,000,000円 × 10.21%</span><span className="tabular-nums">102,100円</span></div>
        <div className={row}><span>200,000円 × 20.42%</span><span className="tabular-nums">40,840円</span></div>
        <div className={`${row} border-t border-rule text-ink font-semibold`}><span>源泉徴収税</span><span className="tabular-nums">142,940円</span></div>
      </div>
      {down}

      <p className={step}><span className={num}>4</span><span><Phrase text="支払を転記する" /></span></p>
      <div className="grid grid-cols-2 gap-2">
        <div className={`${box} border-accent bg-accent-soft text-accent`}>
          <span className="block text-[0.72rem] leading-snug">仕入先へ振込</span>
          <span className={`${title} mt-0.5 tabular-nums`}>1,177,060円</span>
        </div>
        <div className={`${box} border-rule bg-paper text-ink`}>
          <span className={sub.replace(' mt-1', '')}><Phrase text="源泉徴収税の|勘定（預り金）へ" /></span>
          <span className={`${title} mt-0.5 tabular-nums`}>142,940円</span>
        </div>
      </div>
    </div>
  );
}

const FIGURES: Record<FigureName, () => ReactNode> = {
  'ledger-stack': LedgerStack,
  'standard-hub': StandardHub,
  'control-account': ControlAccount,
  'auc-phases': AucPhases,
  'depreciation-lanes': DepreciationLanes,
  'clearing-groups': ClearingGroups,
  'tax-code-lookup': TaxCodeLookup,
  'settlement-steps': SettlementSteps,
  'withholding-payment': WithholdingPayment,
};

export default function Figure({ name }: { name: FigureName }) {
  const Body = FIGURES[name];
  return <Body />;
}
