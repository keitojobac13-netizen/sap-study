import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import { translations, type Language, type ModuleKey } from '../_lib/i18n';
import { getModule } from '../_lib/modules';
import { sectionSummary } from '../_lib/learning-types';
import { MODULE_STYLES } from '../_lib/module-style';
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
    sections: 'セクション一覧',
    sectionsLead: '上から順に進めると、基礎から実務レベルまで無理なく理解できる構成になっています。',
    start: '最初のセクションを読む',
    quizCount: '問',
    sectionCount: 'セクション',
    totalQuiz: '確認問題',
    read: '読む',
    topics: '扱うテーマ',
    relatedTitle: '関連コンテンツ',
    dictionary: 'SAP用語辞典で用語を調べる',
    otherModules: '他のモジュール',
  },
  en: {
    sections: 'Sections',
    sectionsLead: 'Work through them in order — each section builds on the previous one.',
    start: 'Start with the first section',
    quizCount: 'questions',
    sectionCount: 'sections',
    totalQuiz: 'quiz questions',
    read: 'Read',
    topics: 'Topics covered',
    relatedTitle: 'Related',
    dictionary: 'Look up terms in the SAP glossary',
    otherModules: 'Other modules',
  },
} as const;

export default function ModuleHub({ moduleKey, lang }: {
  moduleKey: ModuleKey;
  lang: Language;
}) {
  const t = translations[lang];
  const l = LABELS[lang];
  const mod = getModule(moduleKey, lang);
  const style = MODULE_STYLES[moduleKey];
  const meta = t.modules.items[moduleKey];
  const totalQuizzes = mod.sections.reduce((n, s) => n + s.quizzes.length, 0);
  const intro = mod.intro ?? [mod.description];

  const otherModules = (Object.keys(t.modules.items) as ModuleKey[]).filter((k) => k !== moduleKey);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: mod.title,
    description: mod.description,
    url: `${BASE_URL}${modulePath(lang, moduleKey)}`,
    inLanguage: lang === 'ja' ? 'ja-JP' : 'en-US',
    isAccessibleForFree: true,
    provider: {
      '@type': 'Organization',
      name: t.siteName,
      url: `${BASE_URL}${homePath('ja')}`,
    },
    hasPart: mod.sections.map((s, i) => ({
      '@type': 'LearningResource',
      position: i + 1,
      name: s.title,
      description: sectionSummary(s),
      url: `${BASE_URL}${sectionPath(lang, moduleKey, s.id)}`,
    })),
  };

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <SiteHeader lang={lang} switchPath={modulePath(OTHER_LANG[lang], moduleKey)} />

      <main className="flex-1">
        {/* ─── Module header ─── */}
        <div className={`${style.bg} border-b ${style.border}`}>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <Breadcrumbs
              lang={lang}
              items={[{ label: mod.title }]}
            />

            <div className="flex items-center gap-4 mt-5 mb-5">
              <div className={`${style.badge} text-white font-bold w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm flex-shrink-0 text-lg`}>
                {moduleKey.toUpperCase()}
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {mod.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {mod.sections.length} {l.sectionCount} ・ {totalQuizzes} {l.totalQuiz}
                </p>
              </div>
            </div>

            <div className="space-y-4 max-w-3xl">
              {intro.map((para, i) => (
                <p key={i} className="text-gray-700 leading-[1.9] text-sm sm:text-base">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {meta.topics.map((topic) => (
                <span
                  key={topic}
                  className={`text-xs font-medium px-3 py-1.5 rounded-full bg-white/70 ${style.text} border ${style.border}`}
                >
                  {topic}
                </span>
              ))}
            </div>

            <Link
              href={sectionPath(lang, moduleKey, mod.sections[0].id)}
              className={`inline-flex items-center gap-2 mt-7 px-6 py-3 ${style.badge} text-white font-semibold rounded-xl hover:opacity-90 transition-opacity text-sm shadow-sm`}
            >
              {l.start} →
            </Link>
          </div>
        </div>

        {/* ─── Section list ─── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl font-bold text-gray-900 mb-2">{l.sections}</h2>
          <p className="text-sm text-gray-500 mb-6">{l.sectionsLead}</p>

          <ol className="space-y-3">
            {mod.sections.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={sectionPath(lang, moduleKey, s.id)}
                  className="group flex gap-4 bg-white rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all"
                >
                  <span className={`${style.bg} ${style.text} font-bold text-sm w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0`}>
                    {i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                      {s.title}
                    </span>
                    <span className="block text-sm text-gray-500 leading-relaxed mt-1">
                      {sectionSummary(s)}
                    </span>
                    <span className="block text-xs text-gray-400 mt-2">
                      {s.quizzes.length} {l.quizCount}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Related ─── */}
        <section className="border-t border-gray-200 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
            <h2 className="text-lg font-bold text-gray-900 mb-4">{l.relatedTitle}</h2>

            <Link
              href={dictionaryPath(lang)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:underline"
            >
              📖 {l.dictionary}
            </Link>

            <h3 className="text-sm font-semibold text-gray-500 mt-8 mb-3">{l.otherModules}</h3>
            <div className="flex flex-wrap gap-2">
              {otherModules.map((key) => {
                const s = MODULE_STYLES[key];
                return (
                  <Link
                    key={key}
                    href={modulePath(lang, key)}
                    className={`text-sm font-medium px-4 py-2 rounded-lg ${s.bg} ${s.text} border ${s.border} hover:shadow-sm transition-shadow`}
                  >
                    {key.toUpperCase()} — {t.modules.items[key].fullName}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
