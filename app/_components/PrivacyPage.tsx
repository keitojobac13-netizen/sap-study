import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import type { Language } from '../_lib/i18n';
import { contactPath, privacyPath, OTHER_LANG } from '../_lib/routes';

export const PRIVACY_UPDATED = { ja: '2026年9月7日', en: '7 September 2026' } as const;

type Para = string | { link: 'contact' | 'google' | 'googleAds' | 'formspree'; before: string; label: string; after: string };
type Section = { heading: string; paragraphs: Para[]; list?: string[] };

const EXTERNAL: Record<'google' | 'googleAds' | 'formspree', string> = {
  google: 'https://policies.google.com/privacy',
  googleAds: 'https://adssettings.google.com/',
  formspree: 'https://formspree.io/legal/privacy-policy/',
};

const CONTENT: Record<Language, { title: string; updated: string; sections: Section[] }> = {
  ja: {
    title: 'プライバシーポリシー',
    updated: '最終更新日',
    sections: [
      {
        heading: '1. 基本方針',
        paragraphs: [
          'SAP学習ポータル（sapstudy.jp、以下「当サイト」）は、利用者のプライバシーを尊重し、個人情報の適切な保護に努めます。当サイトはSAP学習を目的とした無料の情報提供サービスであり、ユーザー登録やログイン機能は提供していません。',
        ],
      },
      {
        heading: '2. 収集する情報',
        paragraphs: ['当サイトでは、以下の方法により情報を収集することがあります。'],
        list: [
          'アクセスログ（IPアドレス、ブラウザ種別、参照元URL、アクセス日時）',
          'Googleアナリティクスによる匿名の利用状況データ',
          'Google AdSenseによる広告配信のためのCookieおよび識別子',
          'お問い合わせフォームにご入力いただいた内容（お名前・メールアドレス・本文）',
        ],
      },
      {
        heading: '3. Cookieの利用',
        paragraphs: [
          '当サイトは、アクセス解析および広告配信の目的でCookieを使用します。ブラウザの設定によりCookieを無効にすることができますが、一部の機能が制限される場合があります。',
          '初回アクセス時に表示されるCookie同意バナーでの選択内容は、お使いのブラウザ内に保存され、当サイトのサーバーには送信されません。',
        ],
      },
      {
        heading: '4. 学習進捗のブラウザ内保存',
        paragraphs: [
          '確認問題の回答状況は、お使いのブラウザのローカルストレージ（localStorage）に保存されます。これは、ページを離れても続きから学習を再開できるようにするためのものです。',
          'この情報はお使いの端末内にのみ保存され、当サイトのサーバーや第三者に送信されることは一切ありません。ブラウザの閲覧データを削除すると、保存された進捗も消去されます。',
        ],
      },
      {
        heading: '5. Googleアナリティクスについて',
        paragraphs: [
          '当サイトはアクセス解析のためにGoogleアナリティクスを利用しています。GoogleアナリティクスはCookieを使用してトラフィックデータを収集しますが、個人を特定する情報は含まれません。収集されたデータはGoogleのプライバシーポリシーに従って管理されます。',
          {
            link: 'google',
            before: '詳細については、',
            label: 'Googleのプライバシーポリシー',
            after: 'をご確認ください。',
          },
        ],
      },
      {
        heading: '6. Google AdSenseについて',
        paragraphs: [
          '当サイトは、運営費用をまかなうためにGoogle AdSenseによる広告配信を利用する場合があります。Google AdSenseは、利用者の興味に応じた広告を表示するためにCookieを使用することがあります。',
          {
            link: 'googleAds',
            before: '広告のパーソナライズは、',
            label: 'Googleの広告設定ページ',
            after: 'からいつでも無効にできます。',
          },
        ],
      },
      {
        heading: '7. お問い合わせフォームについて',
        paragraphs: [
          '当サイトのお問い合わせフォームは、外部サービスであるFormspreeを利用して送信内容を運営者に転送しています。入力された内容は同サービスのサーバーを経由します。',
          {
            link: 'formspree',
            before: '同サービスにおける情報の取り扱いについては、',
            label: 'Formspreeのプライバシーポリシー',
            after: 'をご確認ください。',
          },
          'いただいた内容は、お問い合わせへの対応およびサイト改善の目的にのみ利用します。',
        ],
      },
      {
        heading: '8. 第三者への提供',
        paragraphs: [
          '当サイトは、法令に基づく場合を除き、収集した情報を第三者に提供・開示することはありません。',
        ],
      },
      {
        heading: '9. 免責事項',
        paragraphs: [
          '当サイトに掲載する情報の正確性・完全性を保証するものではありません。当サイトの情報を用いて行う一切の行為について、運営者は責任を負いかねます。',
          '当サイトはSAP SEとは無関係の独立した学習リソースです。SAPおよびSAP製品名は、SAP SEのドイツおよびその他の国における商標または登録商標です。',
        ],
      },
      {
        heading: '10. プライバシーポリシーの変更',
        paragraphs: [
          '本ポリシーは予告なく変更することがあります。変更後は、このページに最新版と最終更新日を掲載します。',
        ],
      },
      {
        heading: '11. お問い合わせ',
        paragraphs: [
          {
            link: 'contact',
            before: '本ポリシーに関するお問い合わせは、',
            label: 'お問い合わせフォーム',
            after: 'よりご連絡ください。',
          },
        ],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Last updated',
    sections: [
      {
        heading: '1. Our approach',
        paragraphs: [
          'SAP Study Portal (sapstudy.jp, "this site") respects the privacy of its readers. This site is a free information resource for learning SAP. It has no user accounts and no login.',
        ],
      },
      {
        heading: '2. Information collected',
        paragraphs: ['Information may be collected in the following ways.'],
        list: [
          'Access logs (IP address, browser type, referring URL, timestamp)',
          'Anonymous usage data via Google Analytics',
          'Cookies and identifiers used by Google AdSense to serve advertising',
          'Whatever you enter in the contact form (name, email address, message)',
        ],
      },
      {
        heading: '3. Cookies',
        paragraphs: [
          'This site uses cookies for analytics and advertising. You can disable cookies in your browser settings, though some functionality may be limited as a result.',
          'Your choice in the cookie consent banner is stored inside your own browser and is not sent to this site’s servers.',
        ],
      },
      {
        heading: '4. Learning progress stored in your browser',
        paragraphs: [
          'Your answers to the practice questions are saved in your browser’s local storage so that you can leave a page and resume where you stopped.',
          'This data stays on your device. It is never transmitted to this site’s servers or to any third party. Clearing your browsing data also clears your saved progress.',
        ],
      },
      {
        heading: '5. Google Analytics',
        paragraphs: [
          'This site uses Google Analytics to understand how pages are used. Google Analytics sets cookies to collect traffic data; it does not collect personally identifying information. The data is handled according to Google’s privacy policy.',
          {
            link: 'google',
            before: 'For details, see ',
            label: 'Google’s Privacy Policy',
            after: '.',
          },
        ],
      },
      {
        heading: '6. Google AdSense',
        paragraphs: [
          'To cover running costs, this site may serve advertising through Google AdSense. AdSense may use cookies to show advertising relevant to your interests.',
          {
            link: 'googleAds',
            before: 'You can turn off personalised advertising at any time in ',
            label: 'Google Ad Settings',
            after: '.',
          },
        ],
      },
      {
        heading: '7. The contact form',
        paragraphs: [
          'The contact form uses Formspree, an external service, to forward your message to the site operator. What you submit passes through that service’s servers.',
          {
            link: 'formspree',
            before: 'For how they handle that data, see ',
            label: 'Formspree’s Privacy Policy',
            after: '.',
          },
          'Messages are used only to respond to your enquiry and to improve the site.',
        ],
      },
      {
        heading: '8. Disclosure to third parties',
        paragraphs: [
          'Collected information is not provided or disclosed to third parties except where required by law.',
        ],
      },
      {
        heading: '9. Disclaimer',
        paragraphs: [
          'No guarantee is given as to the accuracy or completeness of the information published here, and the operator accepts no liability for actions taken on the basis of it.',
          'This site is an independent learning resource with no connection to SAP SE. SAP and SAP product names are trademarks or registered trademarks of SAP SE in Germany and other countries.',
        ],
      },
      {
        heading: '10. Changes to this policy',
        paragraphs: [
          'This policy may change without prior notice. The current version and its date are always published on this page.',
        ],
      },
      {
        heading: '11. Contact',
        paragraphs: [
          {
            link: 'contact',
            before: 'For questions about this policy, please use the ',
            label: 'contact form',
            after: '.',
          },
        ],
      },
    ],
  },
};

function Paragraph({ para, lang }: { para: Para; lang: Language }) {
  if (typeof para === 'string') return <p>{para}</p>;

  const anchor =
    para.link === 'contact' ? (
      <Link href={contactPath(lang)} className="text-accent hover:underline underline-offset-2">
        {para.label}
      </Link>
    ) : (
      <a
        href={EXTERNAL[para.link]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline underline-offset-2"
      >
        {para.label}
      </a>
    );

  return <p>{para.before}{anchor}{para.after}</p>;
}

export default function PrivacyPage({ lang }: { lang: Language }) {
  const c = CONTENT[lang];

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang={lang} switchPath={privacyPath(OTHER_LANG[lang])} />

      <main id="main" className="flex-1">
        <div className="max-w-[44rem] mx-auto px-5 sm:px-8 py-12">
          <Breadcrumbs lang={lang} items={[{ label: c.title }]} />

          <h1 className="text-[1.9rem] sm:text-[2.3rem] font-bold text-ink tracking-tight leading-[1.3] mt-6 mb-3">{c.title}</h1>
          <p className="text-[0.82rem] text-ink-mute mb-10">
            {c.updated}：{PRIVACY_UPDATED[lang]}
          </p>

          <div className="space-y-10 text-[0.9rem] text-ink-soft leading-[1.95]">
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.05rem] font-bold text-ink tracking-tight mb-3 pt-2 border-t border-rule">{section.heading}</h2>
                <div className="space-y-2">
                  {section.paragraphs.map((para, i) => (
                    <Paragraph key={i} para={para} lang={lang} />
                  ))}
                  {section.list && (
                    <ul className="mt-3 space-y-2 list-disc pl-6 marker:text-ink-mute">
                      {section.list.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
    </div>
  );
}
