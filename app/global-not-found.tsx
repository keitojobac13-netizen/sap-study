import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { geistSans, zenKaku } from './_lib/fonts';

export const metadata: Metadata = {
  title: 'ページが見つかりません | SAP Study Portal',
  description: 'お探しのページは存在しないか、移動した可能性があります。',
};

/**
 * The site has two root layouts (`(ja)` and `en`), so there is no single
 * layout a plain `not-found.tsx` could compose a 404 from. This renders the
 * whole document itself, which is what `global-not-found` is for.
 */
export default function GlobalNotFound() {
  return (
    <html lang="ja" className={`${geistSans.variable} ${zenKaku.variable} h-full antialiased`}>
      <body className="min-h-full">
        <main
          id="main"
          className="min-h-screen bg-paper flex flex-col items-center justify-center px-5"
        >
          <div className="text-center max-w-md">
            <p className="font-bold text-ink text-[0.95rem] tracking-tight mb-10">SAP</p>
            <p className="font-mono text-[0.75rem] tabular-nums tracking-[0.2em] text-ink-mute mb-4">404</p>
            <h1 className="text-[1.6rem] font-bold text-ink tracking-tight mb-3">
              ページが見つかりません
            </h1>
            <p className="text-[0.85rem] text-ink-mute mb-1">Page not found</p>
            <p className="text-[0.9rem] text-ink-soft leading-[1.9] mb-9">
              お探しのページは存在しないか、移動した可能性があります。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center px-5 h-11 bg-ink text-white font-semibold rounded hover:bg-ink-soft transition-colors text-[0.85rem]"
              >
                ホームへ戻る
              </Link>
              <Link
                href="/dictionary"
                className="inline-flex items-center justify-center px-5 h-11 border border-rule text-ink-soft font-semibold rounded hover:border-ink-mute hover:text-ink transition-colors text-[0.85rem]"
              >
                用語辞典を見る
              </Link>
            </div>
            <p className="mt-10 text-[0.85rem] text-ink-mute">
              <Link href="/en" className="text-accent hover:underline underline-offset-2">
                English version
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
