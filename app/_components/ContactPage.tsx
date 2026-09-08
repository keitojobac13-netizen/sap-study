import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import ContactForm from './ContactForm';
import type { Language } from '../_lib/i18n';
import { contactPath, privacyPath, aboutPath, OTHER_LANG } from '../_lib/routes';

const COPY = {
  ja: {
    title: 'お問い合わせ',
    lead: 'コンテンツの誤りのご指摘、取り上げてほしいテーマのご要望、その他のご連絡はこちらからお願いします。',
    topicsTitle: 'こんなご連絡をお待ちしています',
    topics: [
      '解説の内容に誤りや古くなった記述がある',
      '確認問題の正解・解説が適切でない',
      '扱ってほしいモジュールやテーマがある',
      '用語辞典に追加してほしい用語がある',
      '表示崩れなど、サイトの不具合',
    ],
    noteTitle: '返信について',
    noteText:
      '個人で運営しているため、すべてのお問い合わせに返信できるとは限りません。ただし内容はすべて確認しており、誤りのご指摘は優先して記事に反映します。返信をご希望の場合は、メールアドレスのご記入をお願いします。',
    privacyNote: 'いただいた情報の取り扱いについては',
    privacyLink: 'プライバシーポリシー',
    privacyNoteAfter: 'をご覧ください。',
    aboutLink: '運営者情報',
  },
  en: {
    title: 'Contact',
    lead: 'Corrections, requests for topics to cover, and any other enquiries are welcome here.',
    topicsTitle: 'What to get in touch about',
    topics: [
      'An explanation that is wrong or out of date',
      'A practice question whose answer or explanation seems off',
      'A module or topic you would like covered',
      'A term missing from the glossary',
      'Display problems or other bugs on the site',
    ],
    noteTitle: 'About replies',
    noteText:
      'This site is run by one person, so not every message can be answered individually. Everything is read, though, and reported errors are prioritised for correction. Include an email address if you would like a reply.',
    privacyNote: 'For how your information is handled, see the ',
    privacyLink: 'Privacy Policy',
    privacyNoteAfter: '.',
    aboutLink: 'About this site',
  },
} as const;

export default function ContactPage({ lang }: { lang: Language }) {
  const c = COPY[lang];

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <SiteHeader lang={lang} switchPath={contactPath(OTHER_LANG[lang])} />

      <main id="main" className="flex-1">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
          <Breadcrumbs lang={lang} items={[{ label: c.title }]} />

          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-5 mb-3">{c.title}</h1>
          <p className="text-gray-700 leading-[1.9] text-sm sm:text-base">{c.lead}</p>

          <section className="mt-8">
            <h2 className="text-base font-bold text-gray-900 mb-3">{c.topicsTitle}</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-sm text-gray-700 leading-relaxed">
              {c.topics.map((topic) => <li key={topic} className="pl-1">{topic}</li>)}
            </ul>
          </section>

          <div className="mt-8 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <ContactForm lang={lang} />
          </div>

          <aside className="mt-6 rounded-xl border border-gray-200 bg-white p-5">
            <h2 className="font-semibold text-sm text-gray-900 mb-1.5">{c.noteTitle}</h2>
            <p className="text-sm text-gray-600 leading-relaxed">{c.noteText}</p>
          </aside>

          <p className="mt-6 text-sm text-gray-500">
            {c.privacyNote}
            <Link href={privacyPath(lang)} className="text-blue-700 hover:underline">
              {c.privacyLink}
            </Link>
            {c.privacyNoteAfter}
            {' '}
            <Link href={aboutPath(lang)} className="text-blue-700 hover:underline">
              {c.aboutLink}
            </Link>
          </p>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
