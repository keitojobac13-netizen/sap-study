import type { Metadata } from 'next';
import PrivacyPage from '../../_components/PrivacyPage';
import { privacyPath, alternatesFor } from '../../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: 'Privacy Policy | SAP Study Portal' },
  description:
    'Privacy policy for SAP Study Portal: cookies, Google Analytics, Google AdSense, the contact form, and learning progress stored in your browser.',
  alternates: alternatesFor('en', privacyPath),
};

export default function PageEn() {
  return <PrivacyPage lang="en" />;
}
