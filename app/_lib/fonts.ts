import { Geist } from 'next/font/google';

/**
 * Shared by both root layouts. Declaring the font once keeps the two
 * documents on the same `--font-geist-sans` variable and the same preload.
 */
export const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});
