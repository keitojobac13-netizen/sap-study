import Link from 'next/link';
import Icon from './Icon';
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
    <header className="bg-paper border-b border-rule sticky top-0 z-50">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between h-14 gap-4">
          <Link
            href={homePath(lang)}
            className="flex items-baseline gap-2 min-w-0 group"
          >
            <span className="font-bold text-ink text-[0.95rem] tracking-tight whitespace-nowrap group-hover:text-accent transition-colors">
              SAP
            </span>
            <span className="text-ink-mute text-[0.8rem] truncate">
              {t.siteName}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" aria-label={l.nav}>
            {links.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[0.8rem] text-ink-soft hover:text-accent transition-colors whitespace-nowrap"
              >
                {label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <Link
              href={toggleHref}
              hrefLang={other}
              className="flex items-center gap-1.5 px-2.5 h-8 text-[0.75rem] font-medium text-ink-soft border border-rule rounded hover:border-ink-mute hover:text-ink transition-colors"
            >
              <Icon name="globe" className="w-3.5 h-3.5" />
              {t.langToggle}
            </Link>

            {/* ─── Narrow-screen menu ─── */}
            <details className="md:hidden relative">
              <summary className="list-none flex items-center justify-center w-8 h-8 rounded border border-rule text-ink-soft cursor-pointer hover:border-ink-mute transition-colors">
                <span className="sr-only">{l.menu}</span>
                <Icon name="menu" className="w-4 h-4" />
              </summary>
              <nav
                aria-label={l.nav}
                className="absolute right-0 top-full mt-1.5 w-52 bg-paper border border-rule rounded shadow-[0_8px_24px_-12px_rgba(28,25,23,0.25)] py-1"
              >
                {links.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    className="block px-4 py-2.5 text-[0.85rem] text-ink-soft hover:bg-ground hover:text-ink transition-colors"
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
