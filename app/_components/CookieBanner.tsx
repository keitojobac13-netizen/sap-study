'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'cookie_consent';

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Consent lives in localStorage, which is unavailable during SSR, so the
    // banner can only decide whether to show itself after hydration.
    if (!localStorage.getItem(STORAGE_KEY)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-gray-900 border-t border-gray-700 px-4 py-4 shadow-xl">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1 leading-relaxed">
          当サイトはGoogle アナリティクス・AdSenseのためにCookieを使用します。
          サイトを利用することで同意したものとみなします。
          詳しくは
          <Link href="/privacy" className="text-blue-400 hover:underline ml-1">
            プライバシーポリシー
          </Link>
          をご確認ください。
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          同意する
        </button>
      </div>
    </div>
  );
}
