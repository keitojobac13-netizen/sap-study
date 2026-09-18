import { Geist, Noto_Sans_JP } from 'next/font/google';

/**
 * Latin face. Japanese text never reaches it — Geist has no CJK glyphs —
 * so it sits first in the stack and hands everything else to the JP face.
 */
export const geistSans = Geist({
  variable: '--font-latin',
  subsets: ['latin'],
});

/**
 * Japanese face, carrying the bulk of the site's text.
 *
 * Noto Sans JP over a geometric face such as Zen Kaku Gothic New: the site is
 * long-form prose dense with kanji, and Noto's sturdier strokes and larger
 * character face hold up at body sizes where the geometric one reads thin.
 *
 * `preload` is off deliberately. Google serves CJK families as ~100
 * unicode-range chunks; preloading the set would push megabytes ahead of
 * the page. With swap plus a real system fallback, the first paint uses
 * the reader's own Japanese font and the chunks the page actually needs
 * arrive behind it.
 */
export const notoSansJp = Noto_Sans_JP({
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  preload: false,
  display: 'swap',
  fallback: [
    'Hiragino Sans',
    'Hiragino Kaku Gothic ProN',
    'Yu Gothic',
    'Meiryo',
    'sans-serif',
  ],
});
