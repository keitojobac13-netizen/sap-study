import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ArticleBody from './ArticleBody';
import SectionQuizzes from './SectionQuizzes';
import { translations, type Language, type ModuleKey } from '../_lib/i18n';
import { getSection } from '../_lib/modules';
import { sectionBlocks, sectionSummary } from '../_lib/learning-types';
import { MODULE_STYLES } from '../_lib/module-style';
import { SITE_OPERATOR, ARTICLES_UPDATED } from '../_lib/site-info';
import {
  BASE_URL,
  homePath,
  modulePath,
  sectionPath,
  dictionaryPath,
  OTHER_LANG,
} from '../_lib/routes';

const LABELS = {
  ja: {
    toc: 'このモジュールの目次',
    sectionNav: 'セクション間の移動',
    tocMobile: '目次を開く',
    prev: '前のセクション',
    next: '次のセクション',
    backToModule: 'モジュールの目次へ戻る',
    position: 'セクション',
    of: '/',
    dictionary: 'わからない用語は SAP用語辞典 で調べられます。',
    freeNote: 'このページは無料で公開しています。',
  },
  en: {
    toc: 'Sections in this module',
    sectionNav: 'Section navigation',
    tocMobile: 'Open contents',
    prev: 'Previous',
    next: 'Next',
    backToModule: 'Back to module contents',
    position: 'Section',
    of: 'of',
    dictionary: 'Unfamiliar term? Look it up in the SAP glossary.',
    freeNote: 'This page is free to read.',
  },
} as const;

export default function SectionArticle({ moduleKey, sectionId, lang }: {
  moduleKey: ModuleKey;
  sectionId: string;
  lang: Language;
}) {
  const t = translations[lang];
  const l = LABELS[lang];
  const found = getSection(moduleKey, lang, sectionId);
  if (!found) return null;

  const { module: mod, section, index, prev, next } = found;
  const style = MODULE_STYLES[moduleKey];
  const blocks = sectionBlocks(section);
  const summary = sectionSummary(section);
  const url = `${BASE_URL}${sectionPath(lang, moduleKey, sectionId)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: section.title,
    description: summary,
    url,
    inLanguage: lang === 'ja' ? 'ja-JP' : 'en-US',
    isAccessibleForFree: true,
    articleSection: mod.title,
    datePublished: ARTICLES_UPDATED,
    dateModified: ARTICLES_UPDATED,
    author: { '@type': 'Person', name: SITE_OPERATOR[lang].name },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    publisher: {
      '@type': 'Organization',
      name: t.siteName,
      url: `${BASE_URL}${homePath('ja')}`,
    },
  };

  const toc = (
    <ol className="space-y-1">
      {mod.sections.map((s, i) => {
        const isCurrent = i === index;
        return (
          <li key={s.id}>
            <Link
              href={sectionPath(lang, moduleKey, s.id)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`flex items-start gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                isCurrent
                  ? `${style.bg} ${style.text} font-semibold border ${style.border}`
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs flex-shrink-0 mt-px ${
                isCurrent ? `${style.badge} border-transparent text-white` : 'border-gray-300 text-gray-500'
              }`}>
                {i + 1}
              </span>
              <span className="leading-snug">{s.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <SiteHeader lang={lang} switchPath={sectionPath(OTHER_LANG[lang], moduleKey, sectionId)} />

      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-6 sm:py-8 flex gap-8">
        {/* ─── Desktop table of contents ─── */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24">
            <h2 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 px-3">
              {l.toc}
            </h2>
            <nav aria-label={l.toc}>{toc}</nav>
          </div>
        </aside>

        <main id="main" className="flex-1 min-w-0 space-y-8">
          <div>
            <Breadcrumbs
              lang={lang}
              items={[
                { label: mod.title, href: modulePath(lang, moduleKey) },
                { label: section.title },
              ]}
            />

            <p className="text-xs text-gray-500 mt-4 mb-1">
              {l.position} {index + 1} {l.of} {mod.sections.length}
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
              {section.title}
            </h1>
            {summary && (
              <p className="text-gray-600 leading-relaxed mt-3 text-sm sm:text-base">
                {summary}
              </p>
            )}
          </div>

          {/* ─── Mobile table of contents (no JS needed) ─── */}
          <details className="lg:hidden bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <summary className="px-4 py-3 text-sm font-semibold text-gray-700 cursor-pointer select-none">
              {l.tocMobile}
            </summary>
            <nav aria-label={l.toc} className="px-2 pb-3">{toc}</nav>
          </details>

          {/* ─── Article ─── */}
          <article className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 shadow-sm">
            <ArticleBody blocks={blocks} />

            <p className="mt-8 pt-5 border-t border-gray-100 text-sm text-gray-500">
              📖{' '}
              <Link href={dictionaryPath(lang)} className="text-blue-700 hover:underline font-medium">
                {l.dictionary}
              </Link>
            </p>
          </article>

          {/* ─── Quizzes ─── */}
          <SectionQuizzes
            quizzes={section.quizzes}
            lang={lang}
            moduleKey={moduleKey}
            sectionId={sectionId}
          />

          {/* ─── Prev / next ─── */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2" aria-label={l.sectionNav}>
            {prev ? (
              <Link
                href={sectionPath(lang, moduleKey, prev.id)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all"
              >
                <span className="block text-xs text-gray-500 mb-1">← {l.prev}</span>
                <span className="block text-sm font-semibold text-gray-900">{prev.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={sectionPath(lang, moduleKey, next.id)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all sm:text-right"
              >
                <span className="block text-xs text-gray-500 mb-1">{l.next} →</span>
                <span className="block text-sm font-semibold text-gray-900">{next.title}</span>
              </Link>
            ) : (
              <Link
                href={modulePath(lang, moduleKey)}
                className="bg-white rounded-xl border border-gray-200 p-4 hover:border-gray-300 hover:shadow-sm transition-all sm:text-right"
              >
                <span className="block text-xs text-gray-500 mb-1">↑</span>
                <span className="block text-sm font-semibold text-gray-900">{l.backToModule}</span>
              </Link>
            )}
          </nav>
        </main>
      </div>

      <SiteFooter lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
