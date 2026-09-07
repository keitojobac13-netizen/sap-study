import type { Metadata } from 'next';
import ContactPage from '../../_components/ContactPage';
import { contactPath, alternatesFor } from '../../_lib/routes';

export const metadata: Metadata = {
  title: 'Contact | SAP Study Portal',
  description:
    'Get in touch with SAP Study Portal — report an error in an explanation, request a topic, or tell us about a problem with the site.',
  alternates: alternatesFor('en', contactPath),
};

export default function PageEn() {
  return <ContactPage lang="en" />;
}
