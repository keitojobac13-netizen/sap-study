import Link from 'next/link';
import { translations, type Language } from '../_lib/i18n';
import { MODULE_KEYS } from '../_lib/modules';
import {
  modulePath,
  dictionaryPath,
  aboutPath,
  contactPath,
  privacyPath,
} from '../_lib/routes';

const LABELS = {
  ja: {
    modules: '学習モジュール',
    resources: 'コンテンツ',
    site: 'サイト情報',
    dictionary: 'SAP用語辞典',
    about: '運営者情報',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
  },
  en: {
    modules: 'Modules',
    resources: 'Resources',
    site: 'Site',
    dictionary: 'SAP Glossary',
    about: 'About',
    contact: 'Contact',
    privacy: 'Privacy Policy',
  },
} as const;

/**
 * Footer doubles as the site's internal link hub: every module is one hop
 * from every page, which is what lets crawlers reach the section articles.
 */
export default function SiteFooter({ lang }: { lang: Language }) {
  const t = translations[lang];
  const l = LABELS[lang];

  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
                <span className="text-white font-bold text-xs">S</span>
              </div>
              <span className="text-white font-semibold text-sm">{t.siteName}</span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">{t.footer.description}</p>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm mb-3">{l.modules}</h2>
            <ul className="space-y-2 text-sm">
              {MODULE_KEYS.map((key) => (
                <li key={key}>
                  <Link href={modulePath(lang, key)} className="hover:text-white transition-colors">
                    {key.toUpperCase()} — {t.modules.items[key].fullName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-white font-semibold text-sm mb-3">{l.site}</h2>
            <ul className="space-y-2 text-sm">
              <li><Link href={dictionaryPath(lang)} className="hover:text-white transition-colors">{l.dictionary}</Link></li>
              <li><Link href={aboutPath(lang)} className="hover:text-white transition-colors">{l.about}</Link></li>
              <li><Link href={contactPath(lang)} className="hover:text-white transition-colors">{l.contact}</Link></li>
              <li><Link href={privacyPath(lang)} className="hover:text-white transition-colors">{l.privacy}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-center space-y-1">
          <p>{t.footer.copyright}</p>
          <p className="text-gray-500 leading-relaxed">
            SAP is a registered trademark of SAP SE.<br />
            This site is an independent learning resource and is not affiliated with SAP SE.
          </p>
        </div>
      </div>
    </footer>
  );
}
