import Link from 'next/link';
import { translations, type Language } from '../_lib/i18n';
import {
  homePath,
  dictionaryPath,
  aboutPath,
  OTHER_LANG,
} from '../_lib/routes';

/**
 * Site-wide header. `switchPath` is the current page's URL in the other
 * language, so the toggle keeps the reader on the same content instead of
 * bouncing them to the home page.
 */
export default function SiteHeader({ lang, switchPath }: {
  lang: Language;
  switchPath?: string;
}) {
  const t = translations[lang];
  const other = OTHER_LANG[lang];
  const toggleHref = switchPath ?? homePath(other);

  const links = [
    { label: t.nav.modules, href: `${homePath(lang)}#modules` },
    { label: t.nav.dictionary, href: dictionaryPath(lang) },
    { label: lang === 'ja' ? '運営者情報' : 'About', href: aboutPath(lang) },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href={homePath(lang)} className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs tracking-tight">SAP</span>
            </div>
            <span className="font-semibold text-gray-900 text-sm sm:text-base leading-tight truncate">
              {t.siteName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-7" aria-label={t.nav.modules}>
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors font-medium whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link
            href={toggleHref}
            hrefLang={other}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 flex-shrink-0"
          >
            🌐 {t.langToggle}
          </Link>
        </div>
      </div>
    </header>
  );
}
