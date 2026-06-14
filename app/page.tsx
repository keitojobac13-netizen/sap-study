import Link from 'next/link';
import { translations, type Language, type ModuleKey } from './_lib/i18n';

const MODULE_STYLES: Record<ModuleKey, { badge: string; text: string; bg: string; border: string }> = {
  fi: { badge: 'bg-blue-600',    text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200' },
  co: { badge: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200' },
  sd: { badge: 'bg-orange-500',  text: 'text-orange-700',  bg: 'bg-orange-50',  border: 'border-orange-200' },
  mm: { badge: 'bg-purple-600',  text: 'text-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-200' },
  pp: { badge: 'bg-cyan-600',    text: 'text-cyan-700',    bg: 'bg-cyan-50',    border: 'border-cyan-200' },
};

const MODULE_KEYS: ModuleKey[] = ['fi', 'co', 'sd', 'mm', 'pp'];

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  const t = translations[lang];
  const toggleHref = `/?lang=${lang === 'ja' ? 'en' : 'ja'}`;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* ─── Header ─── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href={`/?lang=${lang}`} className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs tracking-tight">SAP</span>
              </div>
              <span className="font-semibold text-gray-900 text-sm sm:text-base leading-tight">
                {t.siteName}
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-7">
              {[
                { label: t.nav.home,       href: `/?lang=${lang}` },
                { label: t.nav.modules,    href: `#modules` },
                { label: t.nav.dictionary, href: `/dictionary?lang=${lang}` },
              ].map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium"
                >
                  {label}
                </a>
              ))}
            </nav>

            <Link
              href={toggleHref}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              🌐 {t.langToggle}
            </Link>
          </div>
        </div>
      </header>

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
              <a
                href={`/dictionary?lang=${lang}`}
                className="inline-flex items-center justify-center px-8 py-3.5 bg-white/10 text-white font-semibold rounded-xl hover:bg-white/20 border border-white/30 transition-colors text-sm"
              >
                {t.hero.ctaSecondary}
              </a>
            </div>
          </div>
        </section>

        {/* ─── Ad banner (top) ─── */}
        <AdPlaceholder />

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
                const mod = t.modules.items[key];
                const style = MODULE_STYLES[key];
                return (
                  <div
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
                        {mod.fullName}
                      </h3>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {mod.description}
                    </p>

                    <ul className="space-y-1.5 mb-5">
                      {mod.topics.map((topic) => (
                        <li key={topic} className="text-sm text-gray-600 flex items-start gap-2">
                          <span className={`${style.text} mt-0.5 flex-shrink-0`}>▸</span>
                          {topic}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={`/${key}?lang=${lang}`}
                      className={`${style.text} text-sm font-semibold hover:underline`}
                    >
                      {t.modules.learnMore}
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ─── Features ─── */}
        <section className="bg-white py-16 px-4 border-y border-gray-100">
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
            <a
              href={`/dictionary?lang=${lang}`}
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg text-sm"
            >
              📖 {t.dictionary.button}
            </a>
          </div>
        </section>

        {/* ─── Ad banner (bottom) ─── */}
        <AdPlaceholder />
      </main>

      {/* ─── Footer ─── */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                  <span className="text-white font-bold text-xs">S</span>
                </div>
                <span className="text-white font-semibold text-sm">{t.siteName}</span>
              </div>
              <p className="text-sm leading-relaxed">{t.footer.description}</p>
            </div>
            <nav className="flex gap-6 text-sm flex-wrap">
              <a href={`#modules`}  className="hover:text-white transition-colors">{t.footer.links.modules}</a>
              <a href={`/dictionary?lang=${lang}`} className="hover:text-white transition-colors">{t.footer.links.dictionary}</a>
              <a href="/contact" className="hover:text-white transition-colors">{lang === 'ja' ? 'お問い合わせ' : 'Contact'}</a>
              <a href={`/?lang=${lang}`} className="hover:text-white transition-colors">{t.footer.links.about}</a>
            </nav>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-800 text-xs text-center space-y-1">
            <p>{t.footer.copyright}</p>
            <p className="text-gray-600 leading-relaxed">
              SAP is a registered trademark of SAP SE.<br />
              This site is an independent learning resource and is not affiliated with SAP SE.
            </p>
            <p>
              <a href="/privacy" className="text-gray-500 hover:text-gray-300 transition-colors">
                {lang === 'ja' ? 'プライバシーポリシー' : 'Privacy Policy'}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AdPlaceholder() {
  return (
    <div className="bg-gray-100 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="bg-white border border-dashed border-gray-300 rounded-lg h-[90px] flex items-center justify-center text-gray-400 text-xs">
          広告 / Advertisement
        </div>
      </div>
    </div>
  );
}
