import Link from 'next/link';
import Icon, { type IconName } from './Icon';
import Figure from './figures/FiFigures';
import Phrase from './Phrase';
import type { Block } from '../_lib/learning-types';

const NOTE_STYLES: Record<string, { rule: string; icon: IconName; tint: string }> = {
  tip:  { rule: 'border-l-accent',    icon: 'tip',  tint: 'text-accent' },
  warn: { rule: 'border-l-amber-500', icon: 'warn', tint: 'text-amber-700' },
  info: { rule: 'border-l-ink-mute',  icon: 'info', tint: 'text-ink-mute' },
};

/**
 * A short ASCII token like FI-GL, GR/IR or FB50. Latin text may break after a
 * hyphen or a slash, and a table column is never narrower than its widest
 * unbreakable piece — so on a phone the code column collapsed and set "FI-GL"
 * as "FI-" over "GL". The header row already sets `whitespace-nowrap` for the
 * same reason, and the wrapper's `overflow-x-auto` absorbs a table that then
 * runs wide.
 */
function isShortCode(cell: string): boolean {
  return cell.length <= 14 && /^[A-Za-z0-9/._()-]+$/.test(cell);
}

/**
 * Renders article content on the server so the full text ships in the
 * initial HTML. No client JS, no interaction gating — crawlers and
 * readers see exactly the same words.
 *
 * Everything is set on the page rather than inside cards. Structure comes
 * from rules and spacing, so the prose stays the loudest thing on screen.
 */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            return (
              <h2
                key={i}
                className="text-[1.15rem] sm:text-[1.3rem] font-bold text-ink leading-snug tracking-tight pt-8 mt-2 first:pt-0 first:mt-0 [word-break:auto-phrase]"
              >
                {block.text}
              </h2>
            );

          case 'p':
            return (
              <p key={i} className="text-[0.95rem] sm:text-base text-ink-soft leading-[2] text-pretty">
                {block.text}
              </p>
            );

          case 'list': {
            const cls =
              'space-y-2.5 text-[0.95rem] sm:text-base text-ink-soft leading-[1.9] pl-6 marker:text-ink-mute text-pretty';
            return block.ordered ? (
              <ol key={i} className={`list-decimal ${cls}`}>
                {block.items.map((item, j) => <li key={j} className="pl-1.5">{item}</li>)}
              </ol>
            ) : (
              <ul key={i} className={`list-disc ${cls}`}>
                {block.items.map((item, j) => <li key={j} className="pl-1.5">{item}</li>)}
              </ul>
            );
          }

          case 'table': {
            // On a phone a stacked table drops its header row and sets each
            // row as a card: the first cell as a title, the rest labelled.
            const st = block.stack;
            return (
              <figure key={i} className="space-y-2 py-2">
                {block.caption && (
                  <figcaption className="text-[0.72rem] font-semibold text-ink-mute uppercase tracking-[0.06em]">
                    {block.caption}
                  </figcaption>
                )}
                <div className={`border-y border-rule ${st ? 'sm:overflow-x-auto' : 'overflow-x-auto'}`}>
                  <table className={`w-full text-[0.9rem] border-collapse [word-break:auto-phrase]${st ? ' max-sm:block' : ''}`}>
                    <thead className={st ? 'max-sm:hidden' : undefined}>
                      <tr>
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="text-left font-semibold text-ink px-3 py-2.5 border-b border-rule whitespace-nowrap bg-ground"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className={st ? 'max-sm:block' : undefined}>
                      {block.rows.map((row, j) => (
                        <tr
                          key={j}
                          className={`border-b border-rule-soft last:border-0 align-top${st ? ' max-sm:block max-sm:py-2' : ''}`}
                        >
                          {row.map((cell, k) => (
                            <td
                              key={k}
                              data-label={st && k > 0 ? block.headers[k] : undefined}
                              className={`px-3 py-2.5 text-ink-soft leading-[1.8] text-pretty${
                                isShortCode(cell) ? ' whitespace-nowrap' : ''
                              }${
                                st
                                  ? k === 0
                                    ? ' max-sm:block max-sm:pb-1 max-sm:font-semibold max-sm:text-ink'
                                    : ' max-sm:block max-sm:py-1 max-sm:before:block max-sm:before:content-[attr(data-label)] max-sm:before:text-[0.72rem] max-sm:before:font-semibold max-sm:before:text-ink-mute'
                                  : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </figure>
            );
          }

          case 'note': {
            const style = NOTE_STYLES[block.variant] ?? NOTE_STYLES.info;
            return (
              <aside key={i} className={`border-l-2 ${style.rule} pl-4 py-1 my-2`}>
                <p className={`flex items-center gap-1.5 font-semibold text-[0.8rem] mb-1.5 ${style.tint}`}>
                  <Icon name={style.icon} className="w-3.5 h-3.5 flex-shrink-0" />
                  {block.title}
                </p>
                <p className="text-ink-soft text-[0.92rem] leading-[1.9] text-pretty">{block.text}</p>
              </aside>
            );
          }

          case 'code':
            return (
              <figure key={i} className="space-y-2 py-2">
                {block.caption && (
                  <figcaption className="text-[0.72rem] font-semibold text-ink-mute uppercase tracking-[0.06em]">
                    {block.caption}
                  </figcaption>
                )}
                <pre className="overflow-x-auto border border-rule bg-ground p-4 text-[0.78rem] sm:text-[0.82rem] leading-[1.75] font-mono text-ink">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );

          case 'figure':
            return (
              <figure key={i} id={block.name} className="py-2 scroll-mt-20">
                <figcaption className="text-[0.78rem] font-semibold text-ink tracking-[0.02em] mb-3">
                  <Phrase text={block.caption} />
                </figcaption>
                <div className="border border-rule bg-ground p-4 sm:p-6">
                  <Figure name={block.name} />
                </div>
                {block.note && (
                  <p className="text-[0.86rem] text-ink-soft leading-[1.85] mt-2.5 text-pretty">{block.note}</p>
                )}
              </figure>
            );

          case 'link':
            return (
              <p key={i} className="border-l-2 border-l-rule pl-4 py-1 my-2 text-[0.9rem] leading-[1.9]">
                <span className="block text-[0.72rem] font-semibold text-ink-mute tracking-[0.06em] mb-0.5">
                  {block.text ?? 'あわせて読みたい'}
                </span>
                <Link href={block.href} className="text-accent font-semibold underline underline-offset-4 decoration-accent/40 hover:decoration-accent">
                  {block.label}
                </Link>
              </p>
            );
        }
      })}
    </div>
  );
}
