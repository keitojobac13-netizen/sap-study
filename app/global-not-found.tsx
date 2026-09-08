import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';
import { geistSans } from './_lib/fonts';

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
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full">
        <main
          id="main"
          className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 font-sans"
        >
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white font-bold text-lg tracking-tight">SAP</span>
            </div>
            <p className="text-6xl font-bold text-gray-300 mb-2">404</p>
            <h1 className="text-xl font-semibold text-gray-800 mb-2">
              ページが見つかりません
            </h1>
            <p className="text-sm text-gray-600 mb-1">Page not found</p>
            <p className="text-sm text-gray-600 mb-8">
              お探しのページは存在しないか、移動した可能性があります。
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/"
                className="px-6 py-2.5 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors text-sm"
              >
                ホームへ戻る
              </Link>
              <Link
                href="/dictionary"
                className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                用語辞典を見る
              </Link>
            </div>
            <p className="mt-8 text-sm text-gray-600">
              <Link href="/en" className="text-blue-700 hover:underline">
                English version
              </Link>
            </p>
          </div>
        </main>
      </body>
    </html>
  );
}
