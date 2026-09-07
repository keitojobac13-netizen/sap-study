import type { Metadata } from 'next';
import HomePage from '../_components/HomePage';
import { glossaryTerms } from '../_lib/glossary';
import { homePath, alternatesFor } from '../_lib/routes';

export const metadata: Metadata = {
  title: 'SAP Study Portal | Free SAP learning resource',
  description:
    'A free, bilingual SAP learning site covering FI, CO, SD, MM, PP, ABAP, Basis and PS, with a Japanese-English glossary. Not affiliated with SAP SE.',
  alternates: alternatesFor('en', homePath),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SAP Study Portal',
    title: 'SAP Study Portal | Free SAP learning resource',
    description:
      'A free, bilingual SAP learning site covering FI, CO, SD, MM, PP, ABAP, Basis and PS.',
  },
};

export default function PageEn() {
  return <HomePage lang="en" termCount={glossaryTerms.length} />;
}
