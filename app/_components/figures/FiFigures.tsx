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

const FIGURES: Record<FigureName, () => ReactNode> = {
  'ledger-stack': LedgerStack,
  'standard-hub': StandardHub,
  'control-account': ControlAccount,
  'auc-phases': AucPhases,
  'depreciation-lanes': DepreciationLanes,
};

export default function Figure({ name }: { name: FigureName }) {
  const Body = FIGURES[name];
  return <Body />;
}
