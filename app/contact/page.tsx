import Link from 'next/link';
import type { Metadata } from 'next';
import ContactForm from '../_components/ContactForm';

export const metadata: Metadata = {
  title: 'お問い合わせ | SAP学習ポータル',
  description: 'SAP学習ポータルへのお問い合わせはこちらから。コンテンツの誤りや機能要望などをお気軽にご連絡ください。',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-14">
            <Link
              href="/?lang=ja"
              className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
            >
              <span className="text-base">←</span>
              <span>ホームへ</span>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 sm:px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">お問い合わせ</h1>
          <p className="text-sm text-gray-500">
            コンテンツの誤りや機能のご要望など、お気軽にどうぞ。
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
          <ContactForm />
        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 py-6 px-4 text-center text-xs text-gray-400">
        <p>© 2026 SAP学習ポータル</p>
      </footer>
    </div>
  );
}
