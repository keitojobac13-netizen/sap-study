'use client';

import { useForm, ValidationError } from '@formspree/react';
import { type Language } from '../_lib/i18n';
import Icon from './Icon';

const COPY = {
  ja: {
    title: '有料版のお知らせを受け取る',
    body: '広告なし・学習進捗の保存・確認問題の大幅な追加を含む有料版を準備しています。公開したときにメールでお知らせします。',
    email: 'メールアドレス',
    submit: '登録する',
    submitting: '送信中...',
    note: 'いただいたメールアドレスは、有料版公開のお知らせにのみ使用します。',
    sentTitle: '登録しました',
    sentBody: '有料版を公開したらお知らせします。',
  },
  en: {
    title: 'Hear when the paid version launches',
    body: 'A paid version is in preparation, with no ads, saved learning progress and many more practice questions. Leave your email and you will be told when it launches.',
    email: 'Email address',
    submit: 'Notify me',
    submitting: 'Sending…',
    note: 'Your email address is used only to announce the paid version.',
    sentTitle: 'You are on the list',
    sentBody: 'You will hear from us when the paid version launches.',
  },
} as const;

/**
 * Collects interest in the planned paid version. It shares the contact
 * form's Formspree endpoint; the subject and `type` field keep sign-ups
 * separable from enquiries, and `source` shows which module drew them.
 */
export default function WaitlistForm({ lang, source }: { lang: Language; source: string }) {
  const [state, handleSubmit] = useForm('xrevolqn');
  const c = COPY[lang];

  return (
    <section className="border border-rule rounded px-5 py-6 sm:px-6">
      {state.succeeded ? (
        <div className="flex items-start gap-3">
          <Icon name="mail" className="w-5 h-5 mt-0.5 flex-shrink-0 text-accent" />
          <div>
            <h2 className="text-[1rem] font-bold text-ink tracking-tight mb-1">{c.sentTitle}</h2>
            <p className="text-[0.85rem] text-ink-soft leading-[1.8]">{c.sentBody}</p>
          </div>
        </div>
      ) : (
        <>
          <h2 className="text-[1rem] font-bold text-ink tracking-tight mb-2">{c.title}</h2>
          <p className="text-[0.85rem] text-ink-soft leading-[1.9] mb-4">{c.body}</p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <input type="hidden" name="_subject" value={`有料版お知らせ登録 (${lang})`} />
            <input type="hidden" name="type" value="waitlist" />
            <input type="hidden" name="lang" value={lang} />
            <input type="hidden" name="source" value={source} />

            <label htmlFor="waitlist-email" className="sr-only">{c.email}</label>
            <input
              id="waitlist-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              placeholder="example@email.com"
              className="flex-1 min-w-0 px-3.5 h-11 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute"
            />
            <button
              type="submit"
              disabled={state.submitting}
              className="h-11 px-5 bg-ink hover:bg-ink-soft disabled:opacity-50 text-white font-semibold rounded transition-colors text-[0.85rem] whitespace-nowrap"
            >
              {state.submitting ? c.submitting : c.submit}
            </button>
          </form>

          <ValidationError field="email" prefix={c.email} errors={state.errors} className="mt-1.5 text-[0.78rem] text-red-600" />
          <ValidationError errors={state.errors} className="mt-1.5 text-[0.78rem] text-red-600" />
          <p className="mt-3 text-[0.75rem] text-ink-mute leading-[1.7]">{c.note}</p>
        </>
      )}
    </section>
  );
}
