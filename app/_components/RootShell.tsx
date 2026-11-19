import { GoogleAnalytics } from '@next/third-parties/google';
import { geistSans, notoSansJp } from '../_lib/fonts';
import { type Language } from '../_lib/i18n';
import CookieBanner from './CookieBanner';

const ADSENSE_CLIENT = 'ca-pub-4188335642202901';
const GA_ID = 'G-53970RR8LZ';

/**
 * Keeps the owner's own visits out of Analytics without an IP filter, which
 * breaks whenever the home IP changes. Opening any page with `?ga_optout=1`
 * marks that browser, `?ga_optout=0` clears the mark, and a marked browser
 * sets Google's `ga-disable-<ID>` flag. It runs inline in <head> so the flag
 * is in place before the GA tag loads after hydration.
 */
const GA_OPTOUT_SCRIPT = `try{var k='ga_optout',q=new URLSearchParams(location.search).get(k);if(q==='1')localStorage.setItem(k,'1');else if(q==='0')localStorage.removeItem(k);if(localStorage.getItem(k)==='1')window['ga-disable-${GA_ID}']=true}catch(e){}`;

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
    <html lang={lang} className={`${geistSans.variable} ${notoSansJp.variable} h-full antialiased`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: GA_OPTOUT_SCRIPT }} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-accent focus:text-white focus:text-sm focus:font-semibold focus:shadow-lg"
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
