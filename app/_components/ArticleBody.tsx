import type { Block } from '../_lib/learning-types';

const NOTE_STYLES: Record<string, { box: string; title: string; icon: string }> = {
  tip:  { box: 'bg-blue-50 border-blue-200',     title: 'text-blue-800',   icon: '💡' },
  warn: { box: 'bg-amber-50 border-amber-200',   title: 'text-amber-800',  icon: '⚠️' },
  info: { box: 'bg-gray-50 border-gray-200',     title: 'text-gray-800',   icon: 'ℹ️' },
};

/**
 * Renders article content on the server so the full text ships in the
 * initial HTML. No client JS, no interaction gating — crawlers and
 * readers see exactly the same words.
 */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            return (
              <h2
                key={i}
                className="text-lg sm:text-xl font-bold text-gray-900 pt-3 border-t border-gray-100 first:border-0 first:pt-0"
              >
                {block.text}
              </h2>
            );

          case 'p':
            return (
              <p key={i} className="text-gray-700 leading-[1.9] text-sm sm:text-base">
                {block.text}
              </p>
            );

          case 'list': {
            const cls = 'space-y-2 text-gray-700 leading-relaxed text-sm sm:text-base pl-5';
            return block.ordered ? (
              <ol key={i} className={`list-decimal ${cls}`}>
                {block.items.map((item, j) => <li key={j} className="pl-1">{item}</li>)}
              </ol>
            ) : (
              <ul key={i} className={`list-disc ${cls}`}>
                {block.items.map((item, j) => <li key={j} className="pl-1">{item}</li>)}
              </ul>
            );
          }

          case 'table':
            return (
              <figure key={i} className="space-y-2">
                {block.caption && (
                  <figcaption className="text-xs font-semibold text-gray-500">
                    {block.caption}
                  </figcaption>
                )}
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-sm border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        {block.headers.map((h, j) => (
                          <th
                            key={j}
                            scope="col"
                            className="text-left font-semibold text-gray-700 px-4 py-2.5 border-b border-gray-200 whitespace-nowrap"
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, j) => (
                        <tr key={j} className="border-b border-gray-100 last:border-0 align-top">
                          {row.map((cell, k) => (
                            <td key={k} className="px-4 py-2.5 text-gray-700 leading-relaxed">
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

          case 'note': {
            const style = NOTE_STYLES[block.variant] ?? NOTE_STYLES.info;
            return (
              <aside key={i} className={`rounded-xl border p-4 ${style.box}`}>
                <p className={`font-semibold text-sm mb-1 ${style.title}`}>
                  {style.icon} {block.title}
                </p>
                <p className="text-gray-700 text-sm leading-relaxed">{block.text}</p>
              </aside>
            );
          }

          case 'code':
            return (
              <figure key={i} className="space-y-2">
                {block.caption && (
                  <figcaption className="text-xs font-semibold text-gray-500">
                    {block.caption}
                  </figcaption>
                )}
                <pre className="overflow-x-auto rounded-xl bg-gray-900 text-gray-100 p-4 text-xs sm:text-sm leading-relaxed">
                  <code>{block.code}</code>
                </pre>
              </figure>
            );
        }
      })}
    </div>
  );
}
