import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import ContactPage from '../../_components/ContactPage';
import { contactPath, alternatesFor } from '../../_lib/routes';

const TITLE = 'Contact | SAP Study Portal';
const DESCRIPTION =
  'Get in touch with SAP Study Portal — report an error in an explanation, request a topic, or tell us about a problem with the site.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('en', contactPath),
  ...sharingMetadata({ lang: 'en', path: contactPath('en'), title: TITLE, description: DESCRIPTION }),
};

export default function PageEn() {
  return <ContactPage lang="en" />;
}
