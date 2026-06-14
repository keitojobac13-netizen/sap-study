import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieBanner from './_components/CookieBanner';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sap-study.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'SAP学習ポータル | SAP Study Portal',
    template: '%s | SAP Study Portal',
  },
  description:
    'SAPコンサルタントのための無料学習サイト。FI・CO・SD・MM・PP対応。日英バイリンガル対応の用語辞典つき。Free SAP learning resource. Not affiliated with SAP SE.',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    alternateLocale: 'en_US',
    siteName: 'SAP Study Portal',
    title: 'SAP学習ポータル | SAP Study Portal',
    description:
      'SAPコンサルタントのための無料学習サイト。FI・CO・SD・MM・PP対応。日英バイリンガル対応の用語辞典つき。',
    url: BASE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAP学習ポータル | SAP Study Portal',
    description: 'SAPコンサルタントのための無料学習サイト。FI・CO・SD・MM・PP対応。',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9T111GXMXW" />
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-9T111GXMXW');
        `}} />
      </head>
      <body className="min-h-full">
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
