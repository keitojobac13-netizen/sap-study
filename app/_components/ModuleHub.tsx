import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import Icon from './Icon';
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
    <div lang={lang} className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang={lang} switchPath={modulePath(OTHER_LANG[lang], moduleKey)} />

      <main id="main" className="flex-1">
        {/* ─── Module header ─── */}
        <div className="border-b border-rule">
          <div className="max-w-[52rem] mx-auto px-5 sm:px-8 py-12">
            <Breadcrumbs
              lang={lang}
              items={[{ label: mod.title }]}
            />

            <p className="flex items-center gap-2.5 mt-8 mb-3">
              <span className={`${style.badge} w-2 h-2 rounded-full flex-shrink-0`} />
              <span className="font-bold text-ink text-[0.85rem] tracking-[0.06em]">
                {moduleKey.toUpperCase()}
              </span>
            </p>
            <h1 className="text-[1.9rem] sm:text-[2.3rem] font-bold text-ink leading-[1.3] tracking-tight">
              {mod.title}
            </h1>
            <p className="font-mono text-[0.72rem] tabular-nums text-ink-mute mt-3">
              {mod.sections.length} {l.sectionCount} · {totalQuizzes} {l.totalQuiz}
            </p>

            <div className="space-y-5 max-w-2xl mt-7">
              {intro.map((para, i) => (
                <p key={i} className="text-ink-soft leading-[2] text-[0.95rem]">
                  {para}
                </p>
              ))}
            </div>

            <div className="flex flex-wrap gap-2 mt-6">
              {meta.topics.map((topic) => (
                <span
                  key={topic}
                  className="text-[0.75rem] text-ink-soft px-2.5 py-1 rounded border border-rule bg-ground"
                >
                  {topic}
                </span>
              ))}
            </div>

            <Link
              href={sectionPath(lang, moduleKey, mod.sections[0].id)}
              className="inline-flex items-center gap-2 mt-8 px-5 h-11 bg-ink text-white font-semibold rounded hover:bg-ink-soft transition-colors text-[0.85rem]"
            >
              {l.start}
              <Icon name="arrow-right" className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* ─── Section list ─── */}
        <section className="max-w-[52rem] mx-auto px-5 sm:px-8 py-14">
          <h2 className="text-[1.3rem] font-bold text-ink tracking-tight">{l.sections}</h2>
          <p className="text-[0.85rem] text-ink-mute mt-2 mb-8">{l.sectionsLead}</p>

          <ol className="border-t border-rule">
            {mod.sections.map((s, i) => (
              <li key={s.id}>
                <Link
                  href={sectionPath(lang, moduleKey, s.id)}
                  className="group flex gap-5 py-5 border-b border-rule hover:bg-ground transition-colors -mx-3 px-3"
                >
                  <span className="font-mono text-[0.72rem] tabular-nums text-ink-mute pt-1 flex-shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-semibold text-ink text-[0.95rem] group-hover:text-accent transition-colors">
                      {s.title}
                    </span>
                    <span className="block text-[0.85rem] text-ink-soft leading-[1.85] mt-1.5">
                      {sectionSummary(s)}
                    </span>
                    <span className="block font-mono text-[0.7rem] text-ink-mute mt-2.5">
                      {s.quizzes.length} {l.quizCount}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ─── Related ─── */}
        <section className="border-t border-rule bg-ground">
          <div className="max-w-[52rem] mx-auto px-5 sm:px-8 py-12">
            <h2 className="text-[1.1rem] font-bold text-ink tracking-tight mb-4">{l.relatedTitle}</h2>

            <Link
              href={dictionaryPath(lang)}
              className="inline-flex items-center gap-2 text-[0.85rem] font-semibold text-accent hover:underline underline-offset-2"
            >
              <Icon name="book" className="w-4 h-4" />
              {l.dictionary}
            </Link>

            <h3 className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-ink-mute mt-10 mb-3">{l.otherModules}</h3>
            <div className="flex flex-wrap gap-2">
              {otherModules.map((key) => {
                const s = MODULE_STYLES[key];
                return (
                  <Link
                    key={key}
                    href={modulePath(lang, key)}
                    className="inline-flex items-center gap-2 text-[0.8rem] px-3 py-2 rounded border border-rule bg-paper text-ink-soft hover:border-ink-mute hover:text-ink transition-colors"
                  >
                    <span className={`${s.badge} w-1.5 h-1.5 rounded-full flex-shrink-0`} />
                    <span className="font-semibold">{key.toUpperCase()}</span>
                    <span className="text-ink-mute">{t.modules.items[key].fullName}</span>
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
