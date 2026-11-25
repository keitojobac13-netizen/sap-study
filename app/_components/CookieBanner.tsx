'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Language } from '../_lib/i18n';
import { privacyPath } from '../_lib/routes';

const STORAGE_KEY = 'cookie_consent';

const COPY = {
  ja: {
    label: 'Cookieの利用について',
    body: 'アクセス解析と広告のためCookieを使用します。利用を続けると同意したものとみなします（',
    link: 'プライバシーポリシー',
    tail: '）',
    accept: 'OK',
  },
  en: {
    label: 'Cookie notice',
    body: 'This site uses cookies for analytics and ads. By continuing, you agree to their use (',
    link: 'privacy policy',
    tail: ').',
    accept: 'Accept',
  },
} as const;

export default function CookieBanner({ lang }: { lang: Language }) {
  const [visible, setVisible] = useState(false);
  const c = COPY[lang];

  useEffect(() => {
    // Consent lives in localStorage, which is unavailable during SSR, so the
    // banner can only decide whether to show itself after hydration.
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE_KEY) !== null;
    } catch {
      // Storage blocked (private mode, site data off): show the notice.
    }
    if (!seen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setVisible(true);
    }
  }, []);

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, 'accepted');
    } catch {
      // Nothing to remember it in; the notice returns on the next visit.
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label={c.label}
      className="fixed bottom-0 left-0 right-0 z-[100] bg-paper border-t border-rule px-5 sm:px-8 py-2.5 shadow-[0_-8px_24px_-16px_rgba(28,25,23,0.3)]"
    >
      {/* One row on phones too: the stacked version covered a fifth of the screen. */}
      <div className="max-w-[80rem] mx-auto flex items-center gap-3 sm:gap-4">
        <p className="text-[0.72rem] sm:text-[0.8rem] text-ink-soft flex-1 leading-snug sm:leading-relaxed">
          {c.body}
          <Link href={privacyPath(lang)} className="text-accent underline underline-offset-2 mx-1">
            {c.link}
          </Link>
          {c.tail}
        </p>
        <button
          onClick={accept}
          className="flex-shrink-0 px-4 h-9 bg-ink hover:bg-ink-soft text-white text-[0.8rem] font-semibold rounded transition-colors"
        >
          {c.accept}
        </button>
      </div>
    </div>
  );
}
