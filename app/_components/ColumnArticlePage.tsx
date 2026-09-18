import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ArticleBody from './ArticleBody';
import Icon from './Icon';
import { translations } from '../_lib/i18n';
import { SITE_OPERATOR } from '../_lib/site-info';
import { CATEGORY_LABELS, cardTitle, formatDate, getArticle, type ColumnArticle } from '../_lib/articles';
import { BASE_URL, homePath, articlePath, articlesPath, dictionaryPath } from '../_lib/routes';

export default function ColumnArticlePage({ article }: { article: ColumnArticle }) {
  const t = translations.ja;
  const url = `${BASE_URL}${articlePath(article.slug)}`;
  const published = article.status === 'published' ? article : null;
  // A link to another column that is still a draft would 404 in production.
  const related = (article.related ?? []).filter(
    ({ href }) => !href.startsWith(`${articlesPath()}/`) || getArticle(href.split('/').pop() ?? '')
  );

  const jsonLd = published && {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    url,
    inLanguage: 'ja-JP',
    isAccessibleForFree: true,
    articleSection: CATEGORY_LABELS[article.category],
    datePublished: published.publishedAt,
    dateModified: published.updatedAt ?? published.publishedAt,
    author: { '@type': 'Person', name: SITE_OPERATOR.ja.name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: { '@type': 'Organization', name: t.siteName, url: `${BASE_URL}${homePath('ja')}` },
  };

  return (
    <div lang="ja" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="ja" switchPath={homePath('en')} />

      <main id="main" className="flex-1 px-5 sm:px-8 pt-10 pb-4">
        <div className="max-w-[42rem] mx-auto">
          <Breadcrumbs
            lang="ja"
            items={[{ label: 'コラム', href: articlesPath() }, { label: cardTitle(article) }]}
          />

          {article.status === 'draft' && (
            <p className="mt-6 border-l-2 border-l-amber-500 pl-3 text-[0.8rem] text-amber-700">
              下書きです。開発サーバーでだけ表示され、本番には出ません。
            </p>
          )}

          <p className="mt-8 mb-2 text-[0.72rem] text-ink-mute tracking-[0.06em]">
            {CATEGORY_LABELS[article.category]}
            {published && (
              <>
                <span aria-hidden className="mx-2 text-rule">/</span>
                <time dateTime={published.updatedAt ?? published.publishedAt}>
                  {published.updatedAt
                    ? `${formatDate(published.updatedAt)} 更新`
                    : formatDate(published.publishedAt)}
                </time>
              </>
            )}
          </p>
          <h1 className="text-[1.7rem] sm:text-[2.05rem] font-bold text-ink leading-[1.35] tracking-tight">
            {cardTitle(article)}
          </h1>
          <p className="text-ink-soft leading-[1.9] mt-4 text-[0.95rem] sm:text-base">
            {article.summary}
          </p>

          {article.hasAffiliateLinks && (
            <p className="mt-6 text-[0.75rem] text-ink-mute">
              PR：この記事には広告（アフィリエイトリンク）が含まれます。
            </p>
          )}

          <hr className="border-rule my-10" />

          <article>
            <ArticleBody blocks={article.body} />
          </article>

          {related.length > 0 && (
            <nav aria-label="あわせて読みたい" className="mt-14 pt-6 border-t border-rule">
              <h2 className="text-[0.7rem] font-semibold text-ink-mute uppercase tracking-[0.08em] mb-4">
                あわせて読みたい
              </h2>
              <ul className="space-y-2.5">
                {related.map(({ label, href }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="flex items-center gap-2 text-[0.9rem] text-ink-soft hover:text-accent transition-colors"
                    >
                      <Icon name="arrow-right" className="w-3.5 h-3.5 flex-shrink-0" />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <p className="mt-12 pt-5 border-t border-rule-soft text-[0.8rem] text-ink-mute flex items-start gap-2">
            <Icon name="book" className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <Link href={dictionaryPath('ja')} className="text-accent hover:underline underline-offset-2">
              わからない用語は SAP用語辞典 で調べられます。
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter lang="ja" />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </div>
  );
}
