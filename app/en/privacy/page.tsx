import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import PrivacyPage from '../../_components/PrivacyPage';
import { privacyPath, alternatesFor } from '../../_lib/routes';

const TITLE = 'Privacy Policy | SAP Study Portal';
const DESCRIPTION =
  'Privacy policy for SAP Study Portal: cookies, Google Analytics, Google AdSense, the contact form, and learning progress stored in your browser.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('en', privacyPath),
  ...sharingMetadata({ lang: 'en', path: privacyPath('en'), title: TITLE, description: DESCRIPTION }),
};

export default function PageEn() {
  return <PrivacyPage lang="en" />;
}
