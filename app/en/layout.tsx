import type { Metadata } from 'next';
import '../globals.css';
import RootShell from '../_components/RootShell';
import { BASE_URL } from '../_lib/routes';
import { OG_IMAGES } from '../_lib/og-image';

const DESCRIPTION =
  'A free, bilingual SAP learning site covering FI, CO, SD, MM, PP, ABAP, Basis and PS, with a Japanese-English glossary. Not affiliated with SAP SE.';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SAP Study Portal',
    template: '%s | SAP Study Portal',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'ja_JP',
    siteName: 'SAP Study Portal',
    title: 'SAP Study Portal',
    description: DESCRIPTION,
    images: OG_IMAGES,
    url: `${BASE_URL}/en`,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP Study Portal',
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
  robots: { index: true, follow: true },
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="en">{children}</RootShell>;
}
