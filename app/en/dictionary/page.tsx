import type { Metadata } from 'next';
import SiteHeader from '../../_components/SiteHeader';
import SiteFooter from '../../_components/SiteFooter';
import GlossaryPage from '../../_components/GlossaryPage';
import { glossaryTerms } from '../../_lib/glossary';
import { dictionaryPath, alternatesFor } from '../../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: `SAP Glossary (${glossaryTerms.length} terms) | SAP Study Portal` },
  description: `${glossaryTerms.length} core SAP terms across FI, CO, SD, MM and PP, each defined in English and Japanese. Searchable alphabetically and filterable by module.`,
  alternates: alternatesFor('en', dictionaryPath),
};

export default function PageEn() {
  return (
    <div lang="en" className="min-h-screen flex flex-col bg-gray-50">
      <SiteHeader lang="en" switchPath={dictionaryPath('ja')} />
      <main id="main" className="flex-1">
        <GlossaryPage lang="en" />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
