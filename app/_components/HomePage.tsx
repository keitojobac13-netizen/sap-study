import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Icon from './Icon';
import { translations, type Language } from '../_lib/i18n';
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
        title: 'モジュールを選ぶ',
        text: '担当領域や興味のあるモジュールから始めてください。会計系ならFI・CO、業務系ならSD・MM・PP、技術系ならABAP・Basisが入口になります。',
      },
      {
        title: 'セクションを順に読む',
        text: '各モジュールは10セクションに分かれています。1セクションは5〜10分程度で読み切れる分量です。前のセクションの知識を前提に積み上がる順序で並んでいます。',
      },
      {
        title: '確認問題で定着させる',
        text: '各セクションの末尾に確認問題があります。〇×・4択・並べ替えの3形式で、すべての問題に解説がついています。回答状況はブラウザに保存されるため、途中で離脱しても続きから再開できます。',
      },
      {
        title: '用語を調べる',
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
        title: 'Pick a module',
        text: 'Start with the area you work in. FI and CO cover accounting, SD, MM and PP cover core business processes, and ABAP and Basis cover the technical side.',
      },
      {
        title: 'Read the sections in order',
        text: 'Each module has ten sections, each a five to ten minute read. They are ordered so that later sections build on earlier ones.',
      },
      {
        title: 'Answer the quiz',
        text: 'Every section ends with practice questions — true/false, multiple choice and ordering — each with a written explanation. Your answers are saved in your browser, so you can stop and pick up where you left off.',
      },
      {
        title: 'Look up terms',
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
    <div lang={lang} className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang={lang} switchPath={homePath(OTHER_LANG[lang])} />

      <main id="main" className="flex-1">
        {/* ─── Hero ─── */}
        <section className="max-w-[80rem] mx-auto px-5 sm:px-8 pt-20 pb-16">
          <div className="max-w-3xl">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-ink-mute mb-6">
              {t.hero.badge}
            </p>
            <h1 className="text-[2.1rem] sm:text-[3rem] font-bold text-ink leading-[1.25] tracking-tight text-balance">
              {t.hero.title}
            </h1>
            <p className="text-ink-soft leading-[1.9] mt-6 text-[0.98rem] sm:text-[1.05rem] max-w-2xl">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-3 mt-9">
              <a
                href="#modules"
                className="inline-flex items-center gap-2 px-5 h-11 bg-ink text-white text-[0.85rem] font-semibold rounded hover:bg-ink-soft transition-colors"
              >
                {t.hero.ctaPrimary}
                <Icon name="arrow-right" className="w-4 h-4" />
              </a>
              <Link
                href={dictionaryPath(lang)}
                className="inline-flex items-center gap-2 px-5 h-11 border border-rule text-ink-soft text-[0.85rem] font-semibold rounded hover:border-ink-mute hover:text-ink transition-colors"
              >
                <Icon name="book" className="w-4 h-4" />
                {t.hero.ctaSecondary}
              </Link>
            </div>
          </div>

          {/* ─── Stats ─── */}
          <h2 className="sr-only">{c.statsTitle}</h2>
          <dl className="grid grid-cols-2 sm:grid-cols-4 mt-16 border-t border-rule">
            {[
              { n: MODULE_KEYS.length, label: c.stats.modules },
              { n: totals.sections, label: c.stats.sections },
              { n: totals.quizzes, label: c.stats.quizzes },
              { n: termCount, label: c.stats.terms },
            ].map(({ n, label }) => (
              <div key={label} className="py-6 sm:border-r border-rule last:border-r-0 sm:pr-6">
                <dd className="text-[1.9rem] font-bold text-ink tabular-nums leading-none">{n}</dd>
                <dt className="text-[0.75rem] text-ink-mute mt-2">{label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {/* ─── Modules ─── */}
        <section id="modules" className="border-t border-rule bg-ground">
          <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-16">
            <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-ink tracking-tight">
              {t.modules.sectionTitle}
            </h2>
            <p className="text-ink-mute text-[0.88rem] mt-2">{t.modules.sectionSubtitle}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-rule mt-10 border border-rule">
              {MODULE_KEYS.map((key) => {
                const meta = t.modules.items[key];
                const mod = getModule(key, lang);
                const style = MODULE_STYLES[key];
                return (
                  <article key={key} className="bg-paper p-6 flex flex-col">
                    <p className="flex items-center gap-2.5 mb-3">
                      <span className={`${style.badge} w-2 h-2 rounded-full flex-shrink-0`} />
                      <span className="font-bold text-ink text-[0.95rem] tracking-tight">
                        {key.toUpperCase()}
                      </span>
                    </p>
                    <h3 className="font-semibold text-ink text-[0.95rem] leading-snug mb-2">
                      <Link href={modulePath(lang, key)} className="hover:text-accent transition-colors">
                        {meta.fullName}
                      </Link>
                    </h3>
                    <p className="text-ink-soft text-[0.82rem] leading-[1.85] mb-5">
                      {meta.description}
                    </p>

                    <p className="text-[0.68rem] font-semibold text-ink-mute uppercase tracking-[0.08em] mb-2.5">
                      {c.sectionsPeek}
                    </p>
                    <ul className="space-y-2 mb-6 flex-1">
                      {mod.sections.slice(0, 4).map((s) => (
                        <li key={s.id}>
                          <Link
                            href={sectionPath(lang, key, s.id)}
                            className="text-[0.8rem] text-ink-soft hover:text-accent transition-colors leading-snug"
                          >
                            {s.title}
                          </Link>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={modulePath(lang, key)}
                      className="inline-flex items-center gap-1.5 text-[0.8rem] font-semibold text-accent hover:gap-2.5 transition-all"
                    >
                      {t.modules.learnMore}
                      <Icon name="arrow-right" className="w-3.5 h-3.5" />
                    </Link>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── How to use ─── */}
        <section className="border-t border-rule">
          <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-3xl">
              <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-ink tracking-tight">
                {c.howTitle}
              </h2>
              <p className="text-ink-soft leading-[1.9] mt-4 text-[0.95rem]">{c.howLead}</p>
            </div>

            <ol className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10 mt-12 max-w-5xl">
              {c.steps.map((step, i) => (
                <li key={step.title}>
                  <p className="font-mono text-[0.7rem] tabular-nums text-ink-mute tracking-[0.1em] mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </p>
                  <h3 className="font-semibold text-ink text-[0.95rem] mb-2 pt-2 border-t border-rule">
                    {step.title}
                  </h3>
                  <p className="text-[0.85rem] text-ink-soft leading-[1.9]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="border-t border-rule bg-ground">
          <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-16">
            <h2 className="text-[1.5rem] sm:text-[1.8rem] font-bold text-ink tracking-tight">
              {t.features.sectionTitle}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-8 mt-10">
              {t.features.items.map((item) => (
                <div key={item.title} className="pt-4 border-t border-rule">
                  <h3 className="font-semibold text-ink mb-2 text-[0.9rem]">{item.title}</h3>
                  <p className="text-[0.82rem] text-ink-soft leading-[1.85]">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Bilingual ─── */}
        <section className="border-t border-rule">
          <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-2xl">
              <h2 className="text-[1.3rem] sm:text-[1.5rem] font-bold text-ink tracking-tight">
                {c.bilingualTitle}
              </h2>
              <p className="text-ink-soft leading-[1.9] mt-4 text-[0.9rem]">{c.bilingualText}</p>
            </div>
          </div>
        </section>

        {/* ─── Dictionary ─── */}
        <section id="dictionary" className="border-t border-rule bg-ink text-white">
          <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-16">
            <div className="max-w-2xl">
              <p className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/50 mb-5">
                {t.dictionary.badge}
              </p>
              <h2 className="text-[1.5rem] sm:text-[1.9rem] font-bold tracking-tight leading-tight">
                {t.dictionary.sectionTitle}
              </h2>
              <p className="text-white/70 mt-4 leading-[1.9] text-[0.9rem]">
                {t.dictionary.description}
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <Link
                  href={dictionaryPath(lang)}
                  className="inline-flex items-center gap-2 px-5 h-11 bg-white text-ink text-[0.85rem] font-semibold rounded hover:bg-white/90 transition-colors"
                >
                  <Icon name="book" className="w-4 h-4" />
                  {t.dictionary.button}
                </Link>
                <Link
                  href={aboutPath(lang)}
                  className="inline-flex items-center px-5 h-11 border border-white/25 text-white text-[0.85rem] font-semibold rounded hover:bg-white/10 transition-colors"
                >
                  {c.aboutCta}
                </Link>
              </div>
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
