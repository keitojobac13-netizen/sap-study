import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ArticleBody from './ArticleBody';
import Icon from './Icon';
import { translations } from '../_lib/i18n';
import type { GlossaryTerm } from '../_lib/glossary';
import { getTermPage } from '../_lib/glossary-pages';
import { pagesMentioning, relatedTerms } from '../_lib/glossary-usage';
import { GLOSSARY_MODULE_COLORS } from '../_lib/module-style';
import { BASE_URL, dictionaryPath, termPath } from '../_lib/routes';

/** How many pages to list before the rest would turn the page into an index. */
const USAGE_LIMIT = 12;

/**
 * "ACDOCA（ユニバーサルジャーナル）" at heading size breaks inside the long
 * katakana word on a phone, so the parenthesised part gets a smaller line.
 */
function splitHeading(term: string): { main: string; sub: string | null } {
  const m = term.match(/^(.+?)([（(].+[）)])$/);
  return m ? { main: m[1], sub: m[2] } : { main: term, sub: null };
}

export default function GlossaryTermPage({ term }: { term: GlossaryTerm }) {
  const t = translations.ja;
  const page = getTermPage(term.id);
  const usage = pagesMentioning(term.id);
  const related = relatedTerms(term);
  const heading = splitHeading(term.ja.term);
  const url = `${BASE_URL}${termPath('ja', term.id)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: term.ja.term,
    alternateName: term.en.term,
    description: term.ja.definition,
    url,
    inLanguage: 'ja-JP',
    inDefinedTermSet: {
      '@type': 'DefinedTermSet',
      name: 'SAP用語辞典',
      url: `${BASE_URL}${dictionaryPath('ja')}`,
    },
  };

  return (
    <div lang="ja" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="ja" switchPath={`${dictionaryPath('en')}#${term.id}`} />

      <main id="main" className="flex-1 px-5 sm:px-8 pt-10 pb-16">
        <div className="max-w-[42rem] mx-auto">
          <Breadcrumbs
            lang="ja"
            items={[{ label: t.nav.dictionary, href: dictionaryPath('ja') }, { label: term.ja.term }]}
          />

          <p className="mt-8 mb-2 text-[0.72rem] text-ink-mute tracking-[0.06em]">SAP用語辞典</p>
          <h1 className="text-[1.7rem] sm:text-[2.05rem] font-bold text-ink leading-[1.35] tracking-tight [word-break:auto-phrase]">
            {heading.main}
            {heading.sub && (
              <span className="block mt-1 text-[1.05rem] sm:text-[1.2rem] font-semibold text-ink-soft">
                {heading.sub}
              </span>
            )}
          </h1>
          <p className="mt-2 text-[0.85rem] text-ink-mute">
            <span lang="en" className="inline-block">{term.en.term}</span>
            <span aria-hidden className="mx-2 text-rule">/</span>
            <span className="inline-block">読み：{term.ja.reading}</span>
          </p>
          <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="関連モジュール">
            {term.modules.map((mod) => (
              <li
                key={mod}
                className={`text-[0.68rem] font-semibold px-1.5 py-0.5 rounded border ${GLOSSARY_MODULE_COLORS[mod]}`}
              >
                {mod}
              </li>
            ))}
          </ul>

          <p className="mt-8 text-ink leading-[2] text-[0.95rem] sm:text-base">
            {term.ja.definition}
          </p>

          {page && (
            <article className="mt-10">
              <ArticleBody blocks={page.body} />
            </article>
          )}

          <section className="mt-12 pl-4 border-l border-rule" lang="en">
            <h2 className="text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-mute">
              English
            </h2>
            <p className="mt-1.5 text-[0.9rem] font-semibold text-ink-soft">{term.en.term}</p>
            <p className="mt-1 text-[0.85rem] text-ink-mute leading-[1.9]">{term.en.definition}</p>
          </section>

          {usage.length > 0 && (
            <nav aria-label="この用語が出てくるページ" className="mt-14 pt-6 border-t border-rule">
              <h2 className="text-[0.95rem] font-bold text-ink">この用語が出てくるページ</h2>
              <ul className="mt-4 space-y-3">
                {usage.slice(0, USAGE_LIMIT).map((p) => (
                  <li key={p.href}>
                    <Link href={p.href} className="group flex items-start gap-2">
                      <Icon name="arrow-right" className="w-3.5 h-3.5 mt-1.5 flex-shrink-0 text-ink-mute" />
                      <span>
                        <span className="block text-[0.7rem] text-ink-mute">{p.group}</span>
                        <span className="text-[0.9rem] text-ink-soft group-hover:text-accent transition-colors [word-break:auto-phrase]">
                          {p.label}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              {usage.length > USAGE_LIMIT && (
                <p className="mt-3 text-[0.78rem] text-ink-mute">
                  ほか{usage.length - USAGE_LIMIT}ページ
                </p>
              )}
            </nav>
          )}

          {related.length > 0 && (
            <nav aria-label="関連する用語" className="mt-12 pt-6 border-t border-rule">
              <h2 className="text-[0.95rem] font-bold text-ink">関連する用語</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {related.map((r) => (
                  <li key={r.id}>
                    <Link
                      href={termPath('ja', r.id)}
                      className="inline-block text-[0.8rem] text-ink-soft border border-rule rounded px-2 py-1 hover:text-accent hover:border-accent transition-colors"
                    >
                      {r.ja.term}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <p className="mt-12 text-[0.85rem]">
            <Link
              href={dictionaryPath('ja')}
              className="inline-flex items-center gap-2 text-accent hover:underline underline-offset-2"
            >
              <Icon name="book" className="w-4 h-4" />
              SAP用語辞典の一覧へ
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter lang="ja" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
