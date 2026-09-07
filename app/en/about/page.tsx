import type { Metadata } from 'next';
import AboutPage from '../../_components/AboutPage';
import { aboutPath, alternatesFor } from '../../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: 'About | SAP Study Portal' },
  description:
    'Who runs SAP Study Portal (sapstudy.jp), how the content is written, and the disclaimer. An independent free learning site, not affiliated with SAP SE.',
  alternates: alternatesFor('en', aboutPath),
};

export default function PageEn() {
  return <AboutPage lang="en" />;
}
