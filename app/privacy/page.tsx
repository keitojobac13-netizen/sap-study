import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'プライバシーポリシー | SAP Study Portal',
  description: 'SAP学習ポータルのプライバシーポリシー。Googleアナリティクス・AdSenseの利用について説明します。',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">プライバシーポリシー</h1>
        <p className="text-sm text-gray-400 mb-10">最終更新日：2026年6月13日</p>

        <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-8 text-sm text-gray-700 leading-relaxed">

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">1. 基本方針</h2>
            <p>
              SAP学習ポータル（以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の適切な保護に努めます。
              当サイトはSAP学習を目的とした無料の情報提供サービスであり、ユーザー登録やログイン機能は提供していません。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">2. 収集する情報</h2>
            <p>当サイトでは、以下の方法により情報を収集することがあります。</p>
            <ul className="mt-2 space-y-1.5 list-disc pl-5">
              <li>アクセスログ（IPアドレス、ブラウザ種別、参照元URL、アクセス日時）</li>
              <li>Google アナリティクスによる匿名の利用状況データ</li>
              <li>Google AdSenseによる広告配信のためのCookieおよび識別子</li>
            </ul>
            <p className="mt-2">
              氏名・メールアドレス・住所などの個人を特定できる情報（個人情報）は収集していません。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">3. Cookie（クッキー）の利用</h2>
            <p>
              当サイトは、アクセス解析および広告配信の目的でCookieを使用します。
              ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">4. Google アナリティクスについて</h2>
            <p>
              当サイトはアクセス解析のためにGoogle アナリティクスを利用しています。
              Google アナリティクスはCookieを使用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。
              収集されたデータはGoogleのプライバシーポリシーに従って管理されます。
            </p>
            <p className="mt-2">
              Google アナリティクスの利用規約・プライバシーポリシーについては、
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Google のプライバシーポリシー
              </a>
              をご確認ください。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">5. Google AdSenseについて</h2>
            <p>
              当サイトは広告配信のためにGoogle AdSenseを利用しています。
              Google AdSenseは、ユーザーの興味に合った広告を表示するためにCookieを使用します。
              広告のパーソナライズはGoogleの広告設定ページから無効にすることができます。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">6. 第三者への提供</h2>
            <p>
              当サイトは、法令に基づく場合を除き、収集した情報を第三者に提供・開示することはありません。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">7. 免責事項</h2>
            <p>
              当サイトに掲載する情報は正確性・完全性を保証するものではありません。
              また、当サイトはSAP SEとは無関係の独立した学習リソースです。
              SAP®はSAP SEの登録商標です。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">8. プライバシーポリシーの変更</h2>
            <p>
              本ポリシーは予告なく変更することがあります。変更後はこのページに最新版を掲載します。
            </p>
          </section>

          <section>
            <h2 className="text-base font-bold text-gray-900 mb-3">9. お問い合わせ</h2>
            <p>
              本ポリシーに関するお問い合わせは
              <Link href="/contact" className="text-blue-600 hover:underline mx-1">
                お問い合わせフォーム
              </Link>
              よりご連絡ください。
            </p>
          </section>

        </div>
      </main>

      <footer className="mt-12 border-t border-gray-200 py-6 px-4 text-center text-xs text-gray-400">
        <p>© 2026 SAP学習ポータル</p>
        <p className="mt-1 text-gray-300">SAP is a registered trademark of SAP SE. This site is not affiliated with SAP SE.</p>
      </footer>
    </div>
  );
}
