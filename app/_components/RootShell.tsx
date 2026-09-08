import { GoogleAnalytics } from '@next/third-parties/google';
import { geistSans } from '../_lib/fonts';
import { type Language } from '../_lib/i18n';
import CookieBanner from './CookieBanner';

const ADSENSE_CLIENT = 'ca-pub-4188335642202901';
const GA_ID = 'G-9T111GXMXW';

const SKIP_LABEL = {
  ja: '本文へスキップ',
  en: 'Skip to main content',
} as const;

/**
 * The document shell shared by both root layouts. Japanese and English need
 * separate root layouts purely so `<html lang>` is right on each side; every
 * other part of the document is identical, and lives here.
 */
export default function RootShell({ lang, children }: {
  lang: Language;
  children: React.ReactNode;
}) {
  return (
    <html lang={lang} className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-blue-600 focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
        >
          {SKIP_LABEL[lang]}
        </a>
        {children}
        <CookieBanner lang={lang} />
        <GoogleAnalytics gaId={GA_ID} />
      </body>
    </html>
  );
}
