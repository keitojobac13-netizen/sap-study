'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Language } from '../_lib/i18n';
import { privacyPath } from '../_lib/routes';

const STORAGE_KEY = 'cookie_consent';

const COPY = {
  ja: {
    label: 'Cookieの利用について',
    body: '当サイトはGoogle アナリティクス・AdSenseのためにCookieを使用します。サイトを利用することで同意したものとみなします。詳しくは',
    link: 'プライバシーポリシー',
    tail: 'をご確認ください。',
    accept: '同意する',
  },
  en: {
    label: 'Cookie notice',
    body: 'This site uses cookies for Google Analytics and AdSense. By continuing to browse, you consent to their use. See our',
    link: 'privacy policy',
    tail: 'for details.',
    accept: 'Accept',
  },
} as const;

export default function CookieBanner({ lang }: { lang: Language }) {
  const [visible, setVisible] = useState(false);
  const c = COPY[lang];

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
    <div
      role="region"
      aria-label={c.label}
      className="fixed bottom-0 left-0 right-0 z-[100] bg-gray-900 border-t border-gray-700 px-4 py-4 shadow-xl"
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm text-gray-300 flex-1 leading-relaxed">
          {c.body}
          <Link href={privacyPath(lang)} className="text-blue-400 hover:underline mx-1">
            {c.link}
          </Link>
          {c.tail}
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
        >
          {c.accept}
        </button>
      </div>
    </div>
  );
}
