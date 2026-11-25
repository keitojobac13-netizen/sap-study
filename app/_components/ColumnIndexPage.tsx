import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import {
  CATEGORY_LABELS,
  TOPICS,
  cardTitle,
  formatDate,
  popularArticles,
  visibleArticles,
  type ColumnArticle,
} from '../_lib/articles';
import { homePath, articlePath } from '../_lib/routes';

export default function ColumnIndexPage() {
  const articles = visibleArticles();
  const popular = popularArticles();
  // Newest first within each topic, because visibleArticles() is already sorted.
  const sections = TOPICS.map((t) => ({
    ...t,
    articles: articles.filter((a) => a.topic === t.id),
  })).filter((s) => s.articles.length > 0);

  return (
    <div lang="ja" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="ja" switchPath={homePath('en')} />

      <main id="main" className="flex-1 px-5 sm:px-8 pt-10 pb-4">
        <div className="max-w-[42rem] mx-auto">
          <Breadcrumbs lang="ja" items={[{ label: 'コラム' }]} />

          <h1 className="mt-8 text-[1.7rem] sm:text-[2.05rem] font-bold text-ink leading-[1.35] tracking-tight">
            コラム
          </h1>
          <p className="text-ink-soft leading-[1.9] mt-4 text-[0.95rem] sm:text-base">
            SAPの現場でよく調べられる用語や、混同しやすい2つの用語の違いを、1テーマ1記事で解説しています。モジュールごとの体系的な解説とあわせて読むと、理解が深まります。
          </p>

          {/* Jump links: 40+ articles is too long to scroll through blind. */}
          <nav aria-label="テーマ" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="inline-flex items-center gap-1.5 border border-rule rounded-full px-3 py-1.5 text-[0.82rem] text-ink-soft hover:border-ink-mute hover:text-ink transition-colors"
                  >
                    {s.label}
                    <span className="text-[0.72rem] text-ink-mute">{s.articles.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {popular.length > 0 && (
            <section aria-labelledby="popular" className="mt-10 bg-ground border border-rule rounded-lg p-5 sm:p-6">
              <h2 id="popular" className="text-[1.1rem] font-bold text-ink">
                よく読まれている記事
              </h2>
              <ol className="mt-3 divide-y divide-rule">
                {popular.map((a, i) => (
                  <li key={a.slug}>
                    <Link href={articlePath(a.slug)} className="group flex items-baseline gap-3.5 py-3">
                      <span className="w-5 shrink-0 text-right text-[1.05rem] font-bold text-accent tabular-nums">
                        {i + 1}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[0.98rem] font-bold text-ink leading-snug [word-break:auto-phrase] group-hover:text-accent transition-colors">
                          {cardTitle(a)}
                        </span>
                        <span className="block mt-1 text-[0.72rem] text-ink-mute">
                          {CATEGORY_LABELS[a.category]}
                        </span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {sections.map((s) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-h`} className="mt-12 scroll-mt-20">
              <div className="flex items-baseline justify-between gap-4 border-b border-rule pb-2">
                <h2 id={`${s.id}-h`} className="text-[1.2rem] sm:text-[1.3rem] font-bold text-ink">
                  {s.label}
                </h2>
                <span className="shrink-0 text-[0.75rem] text-ink-mute">{s.articles.length}本</span>
              </div>
              <p className="mt-2 text-[0.85rem] text-ink-mute leading-[1.8]">{s.lead}</p>
              <ul className="mt-4 grid grid-cols-1 gap-3">
                {s.articles.map((a) => (
                  <li key={a.slug} className="flex">
                    <ArticleCard article={a} />
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}

function ArticleCard({ article: a }: { article: ColumnArticle }) {
  return (
    <Link
      href={articlePath(a.slug)}
      className="group flex flex-col w-full bg-paper border border-rule rounded-lg px-5 py-4 hover:border-ink-mute hover:bg-ground transition-colors"
    >
      <p className="flex items-center gap-2.5">
        <span className="inline-flex items-center border border-rule rounded-full px-2.5 py-0.5 text-[0.68rem] text-ink-mute tracking-[0.04em]">
          {CATEGORY_LABELS[a.category]}
        </span>
        <span className="text-[0.72rem] text-ink-mute">
          {a.status === 'published' ? formatDate(a.publishedAt) : '下書き'}
        </span>
      </p>
      <h3 className="mt-2 text-[1.02rem] sm:text-[1.08rem] font-bold text-ink leading-snug [word-break:auto-phrase] group-hover:text-accent transition-colors">
        {cardTitle(a)}
      </h3>
      {/* Two lines is enough to tell articles apart; the full summary is on the article. */}
      <p className="mt-1.5 text-[0.86rem] text-ink-soft leading-[1.8] line-clamp-2">{a.summary}</p>
    </Link>
  );
}
