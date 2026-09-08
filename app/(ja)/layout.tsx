import type { Metadata } from 'next';
import '../globals.css';
import RootShell from '../_components/RootShell';
import { BASE_URL } from '../_lib/routes';
import { OG_IMAGES } from '../_lib/og-image';

const DESCRIPTION =
  'SAPコンサルタントのための無料学習サイト。FI・CO・SD・MM・PP・ABAP・Basis・PSの8モジュールを解説し、日英対訳のSAP用語辞典つき。Free SAP learning resource. Not affiliated with SAP SE.';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SAP学習ポータル | SAP Study Portal',
    template: '%s | SAP Study Portal',
  },
  description: DESCRIPTION,
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
    siteName: 'SAP Study Portal',
    title: 'SAP学習ポータル | SAP Study Portal',
    description: DESCRIPTION,
    images: OG_IMAGES,
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP学習ポータル | SAP Study Portal',
    description: DESCRIPTION,
    images: OG_IMAGES,
  },
  robots: { index: true, follow: true },
};

export default function JaRootLayout({ children }: { children: React.ReactNode }) {
  return <RootShell lang="ja">{children}</RootShell>;
}
