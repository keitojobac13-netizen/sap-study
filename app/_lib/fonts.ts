import { Geist, Zen_Kaku_Gothic_New } from 'next/font/google';

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
 * `preload` is off deliberately. Google serves CJK families as ~100
 * unicode-range chunks; preloading the set would push megabytes ahead of
 * the page. With swap plus a real system fallback, the first paint uses
 * the reader's own Japanese font and the chunks the page actually needs
 * arrive behind it.
 */
export const zenKaku = Zen_Kaku_Gothic_New({
  weight: ['400', '700'],
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
