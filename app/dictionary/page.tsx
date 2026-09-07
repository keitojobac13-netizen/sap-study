import type { Metadata } from 'next';
import SiteHeader from '../_components/SiteHeader';
import SiteFooter from '../_components/SiteFooter';
import GlossaryPage from '../_components/GlossaryPage';
import { glossaryTerms } from '../_lib/glossary';
import { dictionaryPath, alternatesFor } from '../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: `SAP用語辞典（${glossaryTerms.length}語）| SAP学習ポータル` },
  description: `FI・CO・SD・MM・PPを中心としたSAPの主要用語${glossaryTerms.length}語を、日本語と英語の対訳つきで解説。あいうえお順・アルファベット順で引け、モジュール別の絞り込みにも対応しています。`,
  alternates: alternatesFor('ja', dictionaryPath),
};

export default function Page() {
  return (
    <div lang="ja" className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader lang="ja" switchPath={dictionaryPath('en')} />
      <main className="flex-1">
        <GlossaryPage lang="ja" />
      </main>
      <SiteFooter lang="ja" />
    </div>
  );
}
