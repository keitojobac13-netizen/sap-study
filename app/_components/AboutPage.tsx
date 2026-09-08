import Link from 'next/link';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import Breadcrumbs from './Breadcrumbs';
import type { Language } from '../_lib/i18n';
import { MODULE_KEYS } from '../_lib/modules';
import {
  BASE_URL,
  aboutPath,
  contactPath,
  privacyPath,
  dictionaryPath,
  OTHER_LANG,
} from '../_lib/routes';
import { SITE_OPERATOR } from '../_lib/site-info';

type Section = { heading: string; paragraphs?: string[]; list?: string[] };

const CONTENT: Record<Language, {
  title: string;
  lead: string;
  sections: Section[];
  contactLead: string;
  contactLink: string;
  privacyLink: string;
  glossaryLink: string;
  operatorLabels: { name: string; started: string; contact: string; location: string };
}> = {
  ja: {
    title: '運営者情報',
    lead:
      'SAP学習ポータル（sapstudy.jp）は、SAPをこれから学ぶ人と、実務で扱いながら知識を整理したい人のための無料の学習サイトです。このページでは、誰がどのような方針でサイトを運営しているかを説明します。',
    sections: [
      {
        heading: 'サイトを作った理由',
        paragraphs: [
          'SAPは導入企業が多い一方で、体系的に学べる日本語の入門資料が驚くほど少ない領域です。公式のドキュメントは正確ですが分量が多く、前提知識がないと読み進めるのが難しい。かといって断片的なブログ記事だけでは、モジュール間のつながりが見えてきません。',
          'このサイトは、その中間を埋めることを目的にしています。1セクションを5〜10分で読み切れる分量に区切り、読んだ直後に確認問題で定着させる。それを10セクション積み上げると、そのモジュールの全体像がひととおり掴めている——という構成にしました。',
          'また、SAPの現場では英語の資料や用語に触れる機会が多いため、すべてのページを日本語と英語の両方で用意しています。同じ内容を読み比べることで、英語の用語がそのまま業務で使える形で身につくようにしました。',
        ],
      },
      {
        heading: '対象としている読者',
        list: [
          'SAP導入プロジェクトに配属されたばかりで、担当モジュールの全体像を掴みたい方',
          '自分の担当外のモジュールについて、会話についていける程度の理解を得たい方',
          'SAP認定コンサルタント資格の学習に入る前に、土台を作りたい方',
          '英語のSAP用語を日本語と対応づけて覚えたい方',
        ],
      },
      {
        heading: 'コンテンツの作り方と編集方針',
        paragraphs: [
          '掲載している解説は、SAPの標準機能・標準的な業務プロセスにもとづいて執筆したオリジナルの文章です。他サイトの記事を転載・要約したものではありません。',
          '記述にあたっては次の方針をとっています。第一に、バージョンや導入形態によって挙動が変わる部分は、その旨を明記して断定を避けること。第二に、用語は原則としてSAPの公式な日本語表記に合わせること。第三に、確認問題にはすべて解説を付け、なぜその答えになるのかを説明すること。',
          'SAPは製品自体が継続的に更新されるため、記載内容が最新のリリースと一致しなくなる場合があります。誤りや古くなった記述にお気づきの際は、お問い合わせフォームからご指摘いただけると助かります。いただいた指摘は確認のうえ、記事に反映します。',
        ],
      },
      {
        heading: '運営費用と広告について',
        paragraphs: [
          'このサイトのコンテンツはすべて無料で、会員登録も必要ありません。サーバー費用とドメイン費用をまかなうため、将来的にページの一部へ広告を掲載する予定です。',
          '広告を掲載する場合も、解説本文の内容が広告主によって左右されることはありません。また、記事の途中に本文と紛らわしい形で広告を差し込むことはしません。',
        ],
      },
      {
        heading: '免責事項',
        paragraphs: [
          '当サイトは個人が運営する非公式の学習サイトです。SAP SEおよびその関連会社とは一切の資本関係・提携関係がなく、これらの企業から公認・後援を受けているものでもありません。SAPおよびSAP製品名は、SAP SEのドイツおよびその他の国における商標または登録商標です。',
          '掲載情報については正確性を期していますが、その内容を保証するものではありません。当サイトの情報を用いて行う一切の行為について、運営者は責任を負いかねます。実際の設定・運用にあたっては、必ず公式ドキュメントおよび自社の要件をご確認ください。',
        ],
      },
    ],
    contactLead: 'ご意見・誤りのご指摘・その他のお問い合わせは、お問い合わせフォームからお願いします。',
    contactLink: 'お問い合わせフォーム',
    privacyLink: 'プライバシーポリシー',
    glossaryLink: 'SAP用語辞典',
    operatorLabels: {
      name: '運営者',
      started: '開設',
      contact: '連絡先',
      location: '所在地',
    },
  },
  en: {
    title: 'About this site',
    lead:
      'SAP Study Portal (sapstudy.jp) is a free learning site for people starting out with SAP and for practitioners who want to consolidate what they already know. This page explains who runs it and on what principles.',
    sections: [
      {
        heading: 'Why this site exists',
        paragraphs: [
          'SAP is used by a very large number of companies, yet structured introductory material — particularly in Japanese — is surprisingly scarce. Official documentation is accurate but voluminous, and hard to work through without prior context. Scattered blog posts, on the other hand, rarely show how the modules connect.',
          'This site aims at the space in between. Each section is a five to ten minute read, followed immediately by practice questions that check what you retained. Ten sections in, you should have a working picture of the whole module.',
          'Because SAP work regularly crosses between English and Japanese material, every page exists in both languages. Reading the same explanation in both is a practical way to pick up the English terminology you will actually meet on a project.',
        ],
      },
      {
        heading: 'Who this is for',
        list: [
          'People newly assigned to an SAP implementation who need an overview of their module',
          'Practitioners who want enough grounding in adjacent modules to follow the conversation',
          'Anyone building a base before starting formal SAP certification study',
          'Readers who want SAP terminology mapped between English and Japanese',
        ],
      },
      {
        heading: 'How the content is written',
        paragraphs: [
          'All explanations are original text written for this site, based on standard SAP functionality and standard business processes. Nothing here is reproduced or summarised from other sites.',
          'Three principles guide the writing. Where behaviour depends on the release or deployment model, that is stated rather than glossed over. Terminology follows official SAP naming. Every practice question carries a written explanation of why the answer is what it is.',
          'SAP itself changes continuously, so some descriptions may drift out of step with the current release. If you spot an error or something out of date, please tell us through the contact form — corrections are checked and applied.',
        ],
      },
      {
        heading: 'Funding and advertising',
        paragraphs: [
          'All content is free and no account is required. To cover server and domain costs, advertising may appear on some pages in future.',
          'Where ads run, they do not influence the content of the explanations, and they are not placed inside articles in a way that could be mistaken for the text itself.',
        ],
      },
      {
        heading: 'Disclaimer',
        paragraphs: [
          'This is an independent, unofficial learning site run by a private individual. It has no ownership or partnership relationship with SAP SE or its affiliates, and is neither endorsed nor sponsored by them. SAP and SAP product names are trademarks or registered trademarks of SAP SE in Germany and other countries.',
          'While the information here is written carefully, no guarantee is given as to its accuracy, and the operator accepts no liability for actions taken on the basis of it. Always confirm against official documentation and your own requirements before configuring or operating a live system.',
        ],
      },
    ],
    contactLead: 'For feedback, corrections or any other enquiry, please use the contact form.',
    contactLink: 'Contact form',
    privacyLink: 'Privacy Policy',
    glossaryLink: 'SAP Glossary',
    operatorLabels: {
      name: 'Operator',
      started: 'Launched',
      contact: 'Contact',
      location: 'Location',
    },
  },
};

export default function AboutPage({ lang }: { lang: Language }) {
  const c = CONTENT[lang];
  const op = SITE_OPERATOR[lang];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: c.title,
    url: `${BASE_URL}${aboutPath(lang)}`,
    inLanguage: lang === 'ja' ? 'ja-JP' : 'en-US',
    mainEntity: {
      '@type': 'Organization',
      name: op.siteName,
      url: BASE_URL,
      founder: op.name,
      foundingDate: SITE_OPERATOR.foundingDate,
      description: c.lead,
      knowsAbout: MODULE_KEYS.map((k) => `SAP ${k.toUpperCase()}`),
    },
  };

  return (
    <div lang={lang} className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang={lang} switchPath={aboutPath(OTHER_LANG[lang])} />

      <main id="main" className="flex-1">
        <div className="max-w-[44rem] mx-auto px-5 sm:px-8 py-12">
          <Breadcrumbs lang={lang} items={[{ label: c.title }]} />

          <h1 className="text-[1.9rem] sm:text-[2.3rem] font-bold text-ink tracking-tight leading-[1.3] mt-6 mb-5">{c.title}</h1>
          <p className="text-ink-soft leading-[2] text-[0.95rem]">{c.lead}</p>

          {/* ─── Operator table ─── */}
          <div className="mt-10">
            <dl className="border-t border-rule text-[0.88rem]">
              {[
                { label: c.operatorLabels.name, value: op.name },
                { label: c.operatorLabels.location, value: op.location },
                { label: c.operatorLabels.started, value: op.started },
              ].map(({ label, value }) => (
                <div key={label} className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3.5 border-b border-rule">
                  <dt className="sm:w-36 flex-shrink-0 text-ink-mute">{label}</dt>
                  <dd className="text-ink">{value}</dd>
                </div>
              ))}
              <div className="flex flex-col sm:flex-row gap-1 sm:gap-6 py-3.5 border-b border-rule">
                <dt className="sm:w-36 flex-shrink-0 text-ink-mute">
                  {c.operatorLabels.contact}
                </dt>
                <dd>
                  <Link href={contactPath(lang)} className="text-accent hover:underline underline-offset-2">
                    {c.contactLink}
                  </Link>
                </dd>
              </div>
            </dl>
          </div>

          {/* ─── Sections ─── */}
          <div className="mt-10 space-y-10">
            {c.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-[1.15rem] font-bold text-ink tracking-tight mb-4 pt-2">{section.heading}</h2>
                <div className="space-y-4">
                  {section.paragraphs?.map((p, i) => (
                    <p key={i} className="text-ink-soft leading-[2] text-[0.95rem]">{p}</p>
                  ))}
                  {section.list && (
                    <ul className="list-disc pl-6 space-y-2.5 text-ink-soft leading-[1.9] text-[0.92rem] marker:text-ink-mute">
                      {section.list.map((item, i) => <li key={i} className="pl-1">{item}</li>)}
                    </ul>
                  )}
                </div>
              </section>
            ))}
          </div>

          {/* ─── Links ─── */}
          <div className="mt-14 pt-8 border-t border-rule">
            <p className="text-ink-soft leading-[1.9] text-[0.92rem] mb-5">{c.contactLead}</p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={contactPath(lang)}
                className="inline-flex items-center px-5 h-11 bg-ink text-white font-semibold rounded hover:bg-ink-soft transition-colors text-[0.85rem]"
              >
                {c.contactLink}
              </Link>
              <Link
                href={privacyPath(lang)}
                className="inline-flex items-center px-5 h-11 border border-rule text-ink-soft font-semibold rounded hover:border-ink-mute hover:text-ink transition-colors text-[0.85rem]"
              >
                {c.privacyLink}
              </Link>
              <Link
                href={dictionaryPath(lang)}
                className="inline-flex items-center px-5 h-11 border border-rule text-ink-soft font-semibold rounded hover:border-ink-mute hover:text-ink transition-colors text-[0.85rem]"
              >
                {c.glossaryLink}
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
}
