import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { translations, type Language, type ModuleKey } from '../_lib/i18n';
import { MODULE_KEYS, getModule } from '../_lib/modules';
import { MODULE_STYLES } from '../_lib/module-style';
import {
  BASE_URL,
  homePath,
  modulePath,
  sectionPath,
  dictionaryPath,
  aboutPath,
  OTHER_LANG,
} from '../_lib/routes';

const COPY = {
  ja: {
    howTitle: 'このサイトの使い方',
    howLead:
      'SAPは領域が広く、どこから手をつけるべきか迷いやすい分野です。このサイトは「読む → すぐ確認する」を1セクション単位で繰り返せるように構成しています。',
    steps: [
      {
        title: '1. モジュールを選ぶ',
        text: '担当領域や興味のあるモジュールから始めてください。会計系ならFI・CO、業務系ならSD・MM・PP、技術系ならABAP・Basisが入口になります。',
      },
      {
        title: '2. セクションを順に読む',
        text: '各モジュールは10セクションに分かれています。1セクションは5〜10分程度で読み切れる分量です。前のセクションの知識を前提に積み上がる順序で並んでいます。',
      },
      {
        title: '3. 確認問題で定着させる',
        text: '各セクションの末尾に確認問題があります。〇×・4択・並べ替えの3形式で、すべての問題に解説がついています。回答状況はブラウザに保存されるため、途中で離脱しても続きから再開できます。',
      },
      {
        title: '4. 用語を調べる',
        text: '読んでいて引っかかった用語は、SAP用語辞典で日英どちらからでも引けます。モジュール別の絞り込みにも対応しています。',
      },
    ],
    statsTitle: '収録コンテンツ',
    stats: {
      modules: 'モジュール',
      sections: 'セクション',
      quizzes: '確認問題',
      terms: '用語',
    },
    sectionsPeek: '主なセクション',
    aboutCta: 'このサイトについて',
    bilingualTitle: '日本語と英語で読める',
    bilingualText:
      'すべてのページに英語版があります。SAPプロジェクトでは英語の資料や用語に触れる機会が多いため、同じ内容を日英で読み比べられるようにしました。ページ右上の言語切り替えボタンで、読んでいるページのまま切り替わります。',
  },
  en: {
    howTitle: 'How to use this site',
    howLead:
      'SAP is a wide field and it is rarely obvious where to start. This site is built around a short loop: read one section, then check what you retained.',
    steps: [
      {
        title: '1. Pick a module',
        text: 'Start with the area you work in. FI and CO cover accounting, SD, MM and PP cover core business processes, and ABAP and Basis cover the technical side.',
      },
      {
        title: '2. Read the sections in order',
        text: 'Each module has ten sections, each a five to ten minute read. They are ordered so that later sections build on earlier ones.',
      },
      {
        title: '3. Answer the quiz',
        text: 'Every section ends with practice questions — true/false, multiple choice and ordering — each with a written explanation. Your answers are saved in your browser, so you can stop and pick up where you left off.',
      },
      {
        title: '4. Look up terms',
        text: 'The glossary covers SAP terminology in both English and Japanese, filterable by module.',
      },
    ],
    statsTitle: 'What is covered',
    stats: {
      modules: 'modules',
      sections: 'sections',
      quizzes: 'practice questions',
      terms: 'glossary terms',
    },
    sectionsPeek: 'Selected sections',
    aboutCta: 'About this site',
    bilingualTitle: 'Written in English and Japanese',
    bilingualText:
      'Every page exists in both languages. SAP work regularly crosses between English and Japanese documentation, so the same explanation is available side by side. The toggle in the header keeps you on the page you are reading.',
  },
} as const;

export default function HomePage({ lang, termCount }: {
  lang: Language;
  termCount: number;
}) {
  const t = translations[lang];
  const c = COPY[lang];

  const totals = MODULE_KEYS.reduce(
    (acc, key) => {
      const mod = getModule(key, lang);
      acc.sections += mod.sections.length;
      acc.quizzes += mod.sections.reduce((n, s) => n + s.quizzes.length, 0);
      return acc;
    },
    { sections: 0, quizzes: 0 }
  );

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: t.siteName,
    url: `${BASE_URL}${homePath(lang)}`,
    inLanguage: lang === 'ja' ? 'ja-JP' : 'en-US',
    description: t.hero.subtitle,
  };

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <SiteHeader lang={lang} switchPath={homePath(OTHER_LANG[lang])} />

      <main className="flex-1">
        {/* ─── Hero ─── */}
        <section className="bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-white/20 text-blue-50 text-xs font-semibold px-3 py-1 rounded-full mb-6 tracking-wide">
              {t.hero.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight mb-5 text-balance">
              {t.hero.title}
            </h1>
            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#modules"
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-colors shadow-lg text-sm"
              >
                {t.hero.ctaPrimary}
              </a>
              <Link
                href={dictionaryPath(lang)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-colors text-sm"
              >
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Stats ─── */}
        <section className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <h2 className="sr-only">{c.statsTitle}</h2>
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[
                { n: MODULE_KEYS.length, label: c.stats.modules },
                { n: totals.sections, label: c.stats.sections },
                { n: totals.quizzes, label: c.stats.quizzes },
                { n: termCount, label: c.stats.terms },
              ].map(({ n, label }) => (
                <div key={label}>
                  <dd className="text-3xl font-bold text-blue-700">{n}</dd>
                  <dt className="text-xs text-gray-500 mt-1">{label}</dt>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ─── Module cards ─── */}
        <section id="modules" className="py-16 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                {t.modules.sectionTitle}
              </h2>
              <p className="text-gray-500 text-sm sm:text-base">{t.modules.sectionSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {MODULE_KEYS.map((key) => {
                const meta = t.modules.items[key];
                const mod = getModule(key, lang);
                const style = MODULE_STYLES[key];
                return (
                  <article
                    key={key}
                    className={`${style.bg} ${style.border} border rounded-2xl p-6 hover:shadow-md transition-all duration-200 flex flex-col`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className={`${style.badge} text-white font-bold text-sm w-12 h-12 rounded-xl flex items-center justify-center shadow-sm flex-shrink-0`}
                      >
                        {key.toUpperCase()}
                      </div>
                      <h3 className={`${style.text} font-bold text-lg leading-tight`}>
                        <Link href={modulePath(lang, key)} className="hover:underline">
                          {meta.fullName}
                        </Link>
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {meta.description}
                    </p>

                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                      {c.sectionsPeek}
                    </p>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {mod.sections.slice(0, 4).map((s) => (
                        <li key={s.id} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className={`${style.text} mt-0.5 flex-shrink-0`}>▸</span>
                          <Link href={sectionPath(lang, key, s.id)} className="hover:underline leading-snug">
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={modulePath(lang, key)}
                      className={`${style.text} text-sm font-semibold hover:underline`}
                    >
                      {t.modules.learnMore}
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── How to use ─── */}
        <section className="bg-white py-16 px-4 border-y border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">{c.howTitle}</h2>
            <p className="text-gray-600 leading-[1.9] mb-10 text-sm sm:text-base">{c.howLead}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {c.steps.map((step) => (
                <div key={step.title}>
                  <h3 className="font-semibold text-gray-900 mb-2 text-base">{step.title}</h3>
                  <p className="text-sm text-gray-600 leading-[1.9]">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="py-16 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-12">
              {t.features.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {t.features.items.map((item) => (
                <div key={item.title} className="text-center">
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">{item.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bilingual ─── */}
        <section className="bg-white py-16 px-4 border-y border-gray-100">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{c.bilingualTitle}</h2>
            <p className="text-gray-600 leading-[1.9] text-sm sm:text-base">{c.bilingualText}</p>
          </div>
        </section>

        {/* ─── Dictionary CTA ─── */}
        <section id="dictionary" className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block bg-white/15 text-gray-200 text-xs font-semibold px-3 py-1 rounded-full mb-5 tracking-wide">
              {t.dictionary.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t.dictionary.sectionTitle}</h2>
            <p className="text-gray-300 mb-8 leading-relaxed text-sm sm:text-base">
              {t.dictionary.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href={dictionaryPath(lang)}
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
              >
                📖 {t.dictionary.button}
              </Link>
              <Link
                href={aboutPath(lang)}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-colors text-sm"
              >
                {c.aboutCta}
              </Link>
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
