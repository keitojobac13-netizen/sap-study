import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import { CATEGORY_LABELS, cardTitle, formatDate, visibleArticles } from '../_lib/articles';
import { homePath, articlePath } from '../_lib/routes';

export default function ColumnIndexPage() {
  const articles = visibleArticles();

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

          <hr className="border-rule my-10" />

          {/* Same card as the home page, so a reader arriving from either
              place sees one shape for "an article". */}
          <ul className="grid grid-cols-1 gap-4">
            {articles.map((a) => (
              <li key={a.slug} className="flex">
                <Link
                  href={articlePath(a.slug)}
                  className="group flex flex-col w-full bg-paper border border-rule rounded-lg p-5 hover:border-ink-mute hover:bg-ground transition-colors"
                >
                  <p className="flex items-center gap-2.5">
                    <span className="inline-flex items-center border border-rule rounded-full px-2.5 py-0.5 text-[0.68rem] text-ink-mute tracking-[0.04em]">
                      {CATEGORY_LABELS[a.category]}
                    </span>
                    <span className="text-[0.72rem] text-ink-mute">
                      {a.status === 'published' ? formatDate(a.publishedAt) : '下書き'}
                    </span>
                  </p>
                  <h2 className="mt-3 text-[1.05rem] sm:text-[1.15rem] font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                    {cardTitle(a)}
                  </h2>
                  <p className="mt-2 text-[0.9rem] text-ink-soft leading-[1.85]">{a.summary}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
