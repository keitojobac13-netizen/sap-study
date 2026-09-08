'use client';

import { useForm, ValidationError } from '@formspree/react';
import { type Language } from '../_lib/i18n';

const COPY = {
  ja: {
    sentTitle: '送信しました',
    sentBody: 'お問い合わせありがとうございます。内容を確認の上、ご返信いたします。',
    name: 'お名前',
    namePlaceholder: '山田 太郎',
    email: 'メールアドレス',
    category: 'お問い合わせ種別',
    categoryEmpty: '選択してください',
    categoryContent: 'コンテンツの誤り・修正依頼',
    categoryFeature: '機能のご要望',
    categoryOther: 'その他',
    message: 'メッセージ',
    messagePlaceholder: 'お問い合わせ内容をご記入ください',
    submit: '送信する',
    submitting: '送信中...',
  },
  en: {
    sentTitle: 'Message sent',
    sentBody: 'Thanks for getting in touch. We will read your message and reply.',
    name: 'Name',
    namePlaceholder: 'Jane Doe',
    email: 'Email address',
    category: 'Topic',
    categoryEmpty: 'Please choose one',
    categoryContent: 'Correction or factual error',
    categoryFeature: 'Feature request',
    categoryOther: 'Something else',
    message: 'Message',
    messagePlaceholder: 'Tell us what you need',
    submit: 'Send',
    submitting: 'Sending…',
  },
} as const;

export default function ContactForm({ lang }: { lang: Language }) {
  const [state, handleSubmit] = useForm('xrevolqn');
  const c = COPY[lang];

  if (state.succeeded) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="text-[1.2rem] font-bold text-ink tracking-tight mb-2">{c.sentTitle}</h2>
        <p className="text-[0.88rem] text-ink-soft">{c.sentBody}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-[0.82rem] font-medium text-ink-soft mb-2">
          {c.name}
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder={c.namePlaceholder}
          className="w-full px-3.5 h-11 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute"
        />
        <ValidationError field="name" prefix={c.name} errors={state.errors} className="mt-1.5 text-[0.78rem] text-red-600" />
      </div>

      <div>
        <label htmlFor="email" className="block text-[0.82rem] font-medium text-ink-soft mb-2">
          {c.email}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="example@email.com"
          className="w-full px-3.5 h-11 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute"
        />
        <ValidationError field="email" prefix={c.email} errors={state.errors} className="mt-1.5 text-[0.78rem] text-red-600" />
      </div>

      <div>
        <label htmlFor="category" className="block text-[0.82rem] font-medium text-ink-soft mb-2">
          {c.category}
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full px-3.5 h-11 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute"
        >
          <option value="">{c.categoryEmpty}</option>
          <option value="content">{c.categoryContent}</option>
          <option value="feature">{c.categoryFeature}</option>
          <option value="other">{c.categoryOther}</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-[0.82rem] font-medium text-ink-soft mb-2">
          {c.message}
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder={c.messagePlaceholder}
          className="w-full px-3.5 py-3 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute resize-none"
        />
        <ValidationError field="message" prefix={c.message} errors={state.errors} className="mt-1.5 text-[0.78rem] text-red-600" />
      </div>

      <ValidationError errors={state.errors} className="text-sm text-red-600" />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full h-12 bg-ink hover:bg-ink-soft disabled:opacity-50 text-white font-semibold rounded transition-colors text-[0.85rem]"
      >
        {state.submitting ? c.submitting : c.submit}
      </button>
    </form>
  );
}
