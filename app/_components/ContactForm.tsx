'use client';

import { useForm, ValidationError } from '@formspree/react';

export default function ContactForm() {
  const [state, handleSubmit] = useForm('xrevolqn');

  if (state.succeeded) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">✉️</div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">送信しました</h2>
        <p className="text-sm text-gray-500">お問い合わせありがとうございます。内容を確認の上、ご返信いたします。</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* お名前 */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
          お名前
        </label>
        <input
          id="name"
          type="text"
          name="name"
          required
          placeholder="山田 太郎"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        />
        <ValidationError field="name" prefix="お名前" errors={state.errors} className="mt-1 text-xs text-red-600" />
      </div>

      {/* メールアドレス */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
          メールアドレス
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          placeholder="example@email.com"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        />
        <ValidationError field="email" prefix="メールアドレス" errors={state.errors} className="mt-1 text-xs text-red-600" />
      </div>

      {/* お問い合わせ種別 */}
      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1.5">
          お問い合わせ種別
        </label>
        <select
          id="category"
          name="category"
          required
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
        >
          <option value="">選択してください</option>
          <option value="content">コンテンツの誤り・修正依頼</option>
          <option value="feature">機能のご要望</option>
          <option value="other">その他</option>
        </select>
      </div>

      {/* メッセージ */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1.5">
          メッセージ
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          placeholder="お問い合わせ内容をご記入ください"
          className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 resize-none"
        />
        <ValidationError field="message" prefix="メッセージ" errors={state.errors} className="mt-1 text-xs text-red-600" />
      </div>

      {/* フォームレベルエラー */}
      <ValidationError errors={state.errors} className="text-sm text-red-600" />

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold rounded-xl transition-colors text-sm"
      >
        {state.submitting ? '送信中...' : '送信する'}
      </button>
    </form>
  );
}
