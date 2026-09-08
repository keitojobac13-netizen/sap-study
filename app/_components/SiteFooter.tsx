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
    site: 'サイト情報',
    dictionary: 'SAP用語辞典',
    about: '運営者情報',
    contact: 'お問い合わせ',
    privacy: 'プライバシーポリシー',
  },
  en: {
    modules: 'Modules',
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
    <footer className="border-t border-rule mt-20">
      <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr] gap-10">
          <div>
            <p className="flex items-baseline gap-2 mb-3">
              <span className="font-bold text-ink text-[0.95rem] tracking-tight">SAP</span>
              <span className="text-ink-mute text-[0.8rem]">{t.siteName}</span>
            </p>
            <p className="text-[0.8rem] text-ink-mute leading-relaxed max-w-sm">
              {t.footer.description}
            </p>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold text-ink-mute uppercase tracking-[0.08em] mb-4">
              {l.modules}
            </h2>
            <ul className="space-y-2.5 text-[0.8rem]">
              {MODULE_KEYS.map((key) => (
                <li key={key}>
                  <Link
                    href={modulePath(lang, key)}
                    className="text-ink-soft hover:text-accent transition-colors"
                  >
                    <span className="font-medium">{key.toUpperCase()}</span>
                    <span className="text-ink-mute"> — {t.modules.items[key].fullName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[0.7rem] font-semibold text-ink-mute uppercase tracking-[0.08em] mb-4">
              {l.site}
            </h2>
            <ul className="space-y-2.5 text-[0.8rem]">
              {[
                { label: l.dictionary, href: dictionaryPath(lang) },
                { label: l.about, href: aboutPath(lang) },
                { label: l.contact, href: contactPath(lang) },
                { label: l.privacy, href: privacyPath(lang) },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link href={href} className="text-ink-soft hover:text-accent transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-rule-soft space-y-1.5">
          <p className="text-[0.7rem] text-ink-mute">{t.footer.copyright}</p>
          <p className="text-[0.7rem] text-ink-mute leading-relaxed">
            SAP is a registered trademark of SAP SE. This site is an independent
            learning resource and is not affiliated with SAP SE.
          </p>
        </div>
      </div>
    </footer>
  );
}
