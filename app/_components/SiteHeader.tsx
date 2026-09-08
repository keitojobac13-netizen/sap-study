import Link from 'next/link';
import { translations, type Language } from '../_lib/i18n';
import {
  homePath,
  dictionaryPath,
  aboutPath,
  contactPath,
  OTHER_LANG,
} from '../_lib/routes';

const LABELS = {
  ja: { nav: 'サイト内ナビゲーション', menu: 'メニュー', about: '運営者情報', contact: 'お問い合わせ' },
  en: { nav: 'Site navigation', menu: 'Menu', about: 'About', contact: 'Contact' },
} as const;

/**
 * Site-wide header. `switchPath` is the current page's URL in the other
 * language, so the toggle keeps the reader on the same content instead of
 * bouncing them to the home page.
 *
 * The narrow-screen menu is a `<details>` disclosure rather than a stateful
 * dropdown: the header is a server component, and this keeps the links in the
 * initial HTML instead of hiding them behind hydration.
 */
export default function SiteHeader({ lang, switchPath }: {
  lang: Language;
  switchPath?: string;
}) {
  const t = translations[lang];
  const l = LABELS[lang];
  const other = OTHER_LANG[lang];
  const toggleHref = switchPath ?? homePath(other);

  const links = [
    { label: t.nav.modules, href: `${homePath(lang)}#modules` },
    { label: t.nav.dictionary, href: dictionaryPath(lang) },
    { label: l.about, href: aboutPath(lang) },
    { label: l.contact, href: contactPath(lang) },
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

          <nav className="hidden md:flex items-center gap-7" aria-label={l.nav}>
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

          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href={toggleHref}
              hrefLang={other}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-semibold border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700"
            >
              🌐 {t.langToggle}
            </Link>

            {/* ─── Narrow-screen menu ─── */}
            <details className="md:hidden relative group">
              <summary className="list-none flex items-center justify-center w-9 h-9 rounded-lg border border-gray-300 text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                <span className="sr-only">{l.menu}</span>
                <span aria-hidden="true" className="flex flex-col gap-[3px]">
                  <span className="block w-4 h-0.5 bg-current rounded-full" />
                  <span className="block w-4 h-0.5 bg-current rounded-full" />
                  <span className="block w-4 h-0.5 bg-current rounded-full" />
                </span>
              </summary>
              <nav
                aria-label={l.nav}
                className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg py-2"
              >
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block px-4 py-2.5 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
