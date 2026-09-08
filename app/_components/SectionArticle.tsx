import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ArticleBody from './ArticleBody';
import SectionQuizzes from './SectionQuizzes';
import Icon from './Icon';
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
    tocMobile: '目次',
    sectionNav: 'セクション間の移動',
    prev: '前のセクション',
    next: '次のセクション',
    backToModule: 'モジュールの目次へ戻る',
    dictionary: 'わからない用語は SAP用語辞典 で調べられます。',
  },
  en: {
    toc: 'Sections in this module',
    tocMobile: 'Contents',
    sectionNav: 'Section navigation',
    prev: 'Previous',
    next: 'Next',
    backToModule: 'Back to module contents',
    dictionary: 'Unfamiliar term? Look it up in the SAP glossary.',
  },
} as const;

/** Two digits, so the sidebar numbers align into a column. */
function num(i: number) {
  return String(i + 1).padStart(2, '0');
}

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
    <ol className="space-y-0.5">
      {mod.sections.map((s, i) => {
        const isCurrent = i === index;
        return (
          <li key={s.id}>
            <Link
              href={sectionPath(lang, moduleKey, s.id)}
              aria-current={isCurrent ? 'page' : undefined}
              className={`flex gap-3 py-1.5 pl-3 -ml-px border-l text-[0.8rem] leading-snug transition-colors ${
                isCurrent
                  ? 'border-l-accent text-ink font-semibold'
                  : 'border-l-rule text-ink-mute hover:border-l-ink-mute hover:text-ink-soft'
              }`}
            >
              <span className="font-mono text-[0.7rem] pt-px tabular-nums flex-shrink-0 opacity-70">
                {num(i)}
              </span>
              <span>{s.title}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang={lang} switchPath={sectionPath(OTHER_LANG[lang], moduleKey, sectionId)} />

      <div className="max-w-[80rem] mx-auto w-full px-5 sm:px-8 flex gap-12 flex-1">
        {/* ─── Desktop table of contents ─── */}
        <aside className="hidden lg:block w-60 flex-shrink-0 pt-10">
          <div className="sticky top-24">
            <p className="flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-mute mb-4 pl-3">
              <span className={`w-1.5 h-1.5 rounded-full ${style.badge}`} />
              {mod.title}
            </p>
            <nav aria-label={l.toc}>{toc}</nav>
          </div>
        </aside>

        <main id="main" className="flex-1 min-w-0 pt-10 pb-4">
          <div className="max-w-[42rem] mx-auto">
            <Breadcrumbs
              lang={lang}
              items={[
                { label: mod.title, href: modulePath(lang, moduleKey) },
                { label: section.title },
              ]}
            />

            <div>
              <p className="font-mono text-[0.72rem] tabular-nums text-ink-mute mt-8 mb-2 tracking-[0.1em]">
                {num(index)} / {num(mod.sections.length - 1)}
              </p>
              <h1 className="text-[1.7rem] sm:text-[2.05rem] font-bold text-ink leading-[1.35] tracking-tight">
                {section.title}
              </h1>
              {summary && (
                <p className="text-ink-soft leading-[1.9] mt-4 text-[0.95rem] sm:text-base">
                  {summary}
                </p>
              )}

              {/* ─── Narrow-screen table of contents (no JS needed) ─── */}
              <details className="lg:hidden mt-8 border-y border-rule">
                <summary className="flex items-center justify-between px-1 py-3 text-[0.8rem] font-semibold text-ink-soft cursor-pointer select-none list-none">
                  {l.tocMobile}
                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                </summary>
                <nav aria-label={l.toc} className="pb-3">{toc}</nav>
              </details>

              <hr className="border-rule my-10" />

              <article>
                <ArticleBody blocks={blocks} />
              </article>

              <p className="mt-12 pt-5 border-t border-rule-soft text-[0.8rem] text-ink-mute flex items-start gap-2">
                <Icon name="book" className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <Link href={dictionaryPath(lang)} className="text-accent hover:underline underline-offset-2">
                  {l.dictionary}
                </Link>
              </p>
            </div>

            {/* ─── Quizzes ─── */}
            <div className="mt-14">
              <SectionQuizzes
                quizzes={section.quizzes}
                lang={lang}
                moduleKey={moduleKey}
                sectionId={sectionId}
              />
            </div>

            {/* ─── Prev / next ─── */}
            <nav
              className="mt-14 pt-6 border-t border-rule grid grid-cols-1 sm:grid-cols-2 gap-6"
              aria-label={l.sectionNav}
            >
              {prev ? (
                <Link href={sectionPath(lang, moduleKey, prev.id)} className="group">
                  <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-mute mb-1.5">
                    <Icon name="arrow-left" className="w-3.5 h-3.5" />
                    {l.prev}
                  </span>
                  <span className="block text-[0.9rem] font-medium text-ink-soft group-hover:text-accent transition-colors leading-snug">
                    {prev.title}
                  </span>
                </Link>
              ) : (
                <span />
              )}
              {next ? (
                <Link href={sectionPath(lang, moduleKey, next.id)} className="group sm:text-right">
                  <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-mute mb-1.5 sm:justify-end">
                    {l.next}
                    <Icon name="arrow-right" className="w-3.5 h-3.5" />
                  </span>
                  <span className="block text-[0.9rem] font-medium text-ink-soft group-hover:text-accent transition-colors leading-snug">
                    {next.title}
                  </span>
                </Link>
              ) : (
                <Link href={modulePath(lang, moduleKey)} className="group sm:text-right">
                  <span className="flex items-center gap-1.5 text-[0.72rem] text-ink-mute mb-1.5 sm:justify-end">
                    {l.backToModule}
                    <Icon name="arrow-up" className="w-3.5 h-3.5" />
                  </span>
                  <span className="block text-[0.9rem] font-medium text-ink-soft group-hover:text-accent transition-colors leading-snug">
                    {mod.title}
                  </span>
                </Link>
              )}
            </nav>
          </div>
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
