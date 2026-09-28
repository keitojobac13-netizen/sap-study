import type { Metadata } from 'next';
import SiteHeader from '../../_components/SiteHeader';
import SiteFooter from '../../_components/SiteFooter';
import GlossaryPage from '../../_components/GlossaryPage';
import { glossaryTerms } from '../../_lib/glossary';
import { dictionaryPath, alternatesFor } from '../../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: `SAP Glossary (${glossaryTerms.length} terms): Meanings in English and Japanese | SAP Study Portal` },
  description: `What posting key, document type, cost center, MRP, PGI and ${glossaryTerms.length - 5} other SAP terms mean, defined in English and Japanese. Covers FI, CO, SD, MM, PP, ABAP, Basis and PS, A to Z or by module.`,
  alternates: alternatesFor('en', dictionaryPath),
};

export default function PageEn() {
  return (
    <div lang="en" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="en" switchPath={dictionaryPath('ja')} />
      <main id="main" className="flex-1">
        <GlossaryPage lang="en" />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
