import type { Metadata } from 'next';
import SiteHeader from '@/app/_components/SiteHeader';
import SiteFooter from '@/app/_components/SiteFooter';
import GlossaryPage from '@/app/_components/GlossaryPage';
import { glossaryTerms } from '@/app/_lib/glossary';
import { dictionaryPath, alternatesFor } from '@/app/_lib/routes';

export const metadata: Metadata = {
  title: { absolute: `SAP用語辞典（${glossaryTerms.length}語）｜意味を日本語と英語で解説 | SAP学習ポータル` },
  description: `転記キー、伝票タイプ、原価センタ、MRP、PGI（出荷確定）など、SAPの主要用語${glossaryTerms.length}語の意味を日本語と英語の対訳つきで解説。あいうえお順・モジュール別に引けます。`,
  alternates: alternatesFor('ja', dictionaryPath),
};

export default function Page() {
  return (
    <div lang="ja" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="ja" switchPath={dictionaryPath('en')} />
      <main id="main" className="flex-1">
        <GlossaryPage lang="ja" />
      </main>
      <SiteFooter lang="ja" />
    </div>
  );
}
