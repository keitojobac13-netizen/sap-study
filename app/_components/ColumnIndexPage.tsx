import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import { CATEGORY_LABELS, formatDate, visibleArticles } from '../_lib/articles';
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
            SAPコンサルタントのキャリア、フリーランスとしての働き方、S/4HANA移行の動向、認定資格の勉強法など、モジュールの解説とは別に知っておきたい話題をまとめています。
          </p>

          <hr className="border-rule my-10" />

          <ul className="divide-y divide-rule-soft">
            {articles.map((a) => (
              <li key={a.slug} className="py-6 first:pt-0">
                <p className="text-[0.72rem] text-ink-mute tracking-[0.06em] mb-1.5">
                  {CATEGORY_LABELS[a.category]}
                  <span aria-hidden className="mx-2 text-rule">/</span>
                  {a.status === 'published' ? formatDate(a.publishedAt) : '下書き'}
                </p>
                <Link href={articlePath(a.slug)} className="group">
                  <h2 className="text-[1.05rem] sm:text-[1.15rem] font-bold text-ink leading-snug group-hover:text-accent transition-colors">
                    {a.title}
                  </h2>
                </Link>
                <p className="mt-2 text-[0.88rem] text-ink-soft leading-[1.85]">{a.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </main>

      <SiteFooter lang="ja" />
    </div>
  );
}
