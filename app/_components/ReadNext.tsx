import Link from 'next/link';
import Icon from './Icon';
import { cardTitle, getArticle, popularArticles, type ColumnArticle } from '../_lib/articles';
import { articlePath, articlesPath } from '../_lib/routes';

/** The career columns that lead to the rest. Listing all 20+ buried the box. */
const CAREER_ENTRY_SLUGS = [
  'sap-company-types',
  'sap-company-axes',
  'consultant-vs-inhouse-se',
  'sap-freelance-rates',
  'sap-certification-value',
];

/**
 * 「よく読まれている記事」 and 「キャリアを考えている人へ」 under a Japanese page.
 * The career box is the way from the technical pages to the columns that
 * carry affiliate links, so it is left out on a career column itself.
 */
export default function ReadNext({
  currentSlug,
  skipHrefs = [],
  showCareer = true,
}: {
  /** The column being read, if any, so it is not listed again. */
  currentSlug?: string;
  /** Pages already linked nearby, e.g. under 「あわせて読みたい」. */
  skipHrefs?: string[];
  showCareer?: boolean;
}) {
  const popular = popularArticles().filter(
    (a) => a.slug !== currentSlug && !skipHrefs.includes(articlePath(a.slug))
  );
  const career = showCareer
    ? CAREER_ENTRY_SLUGS.map((slug) => getArticle(slug)).filter(
        (a): a is ColumnArticle => a !== undefined && a.slug !== currentSlug
      )
    : [];

  return (
    <>
      {popular.length > 0 && (
        <nav aria-label="よく読まれている記事" className="mt-10 bg-ground border border-rule rounded-lg px-5 py-4 sm:px-6">
          <h2 className="text-[0.95rem] font-bold text-ink">よく読まれている記事</h2>
          <ol className="mt-1 divide-y divide-rule">
            {popular.map((a, i) => (
              <li key={a.slug}>
                <Link href={articlePath(a.slug)} className="group flex items-baseline gap-3 py-2.5">
                  <span className="w-4 shrink-0 text-right text-[0.95rem] font-bold text-accent tabular-nums">
                    {i + 1}
                  </span>
                  <span className="min-w-0 text-[0.9rem] font-semibold text-ink leading-snug [word-break:auto-phrase] group-hover:text-accent transition-colors">
                    {cardTitle(a)}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      )}

      {career.length > 0 && (
        <nav aria-label="キャリアを考えている人へ" className="mt-10 border border-rule bg-ground px-5 py-4">
          <h2 className="text-[0.85rem] font-semibold text-ink mb-1">キャリアを考えている人へ</h2>
          <p className="text-[0.8rem] text-ink-mute leading-relaxed mb-3">
            SAPの経験を活かした働き方を、コラムで整理しています。
          </p>
          <ul className="space-y-2">
            {career.map((a) => (
              <li key={a.slug}>
                <Link
                  href={articlePath(a.slug)}
                  className="flex items-center gap-2 text-[0.9rem] text-ink-soft hover:text-accent transition-colors"
                >
                  <Icon name="arrow-right" className="w-3.5 h-3.5 flex-shrink-0" />
                  {cardTitle(a)}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`${articlesPath()}#career`}
            className="mt-4 inline-flex items-center gap-1.5 text-[0.82rem] font-semibold text-accent hover:gap-2.5 transition-all"
          >
            キャリアの記事をすべて見る
            <Icon name="arrow-right" className="w-3.5 h-3.5" />
          </Link>
        </nav>
      )}
    </>
  );
}
