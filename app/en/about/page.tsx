import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import AboutPage from '../../_components/AboutPage';
import { aboutPath, alternatesFor } from '../../_lib/routes';

const TITLE = 'About | SAP Study Portal';
const DESCRIPTION =
  'Who runs SAP Study Portal (sapstudy.jp), how the content is written, and the disclaimer. An independent free learning site, not affiliated with SAP SE.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('en', aboutPath),
  ...sharingMetadata({ lang: 'en', path: aboutPath('en'), title: TITLE, description: DESCRIPTION }),
};

export default function PageEn() {
  return <AboutPage lang="en" />;
}
