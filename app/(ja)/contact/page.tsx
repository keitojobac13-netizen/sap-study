import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import ContactPage from '@/app/_components/ContactPage';
import { contactPath, alternatesFor } from '@/app/_lib/routes';

const TITLE = 'お問い合わせ | SAP学習ポータル';
const DESCRIPTION =
  'SAP学習ポータルへのお問い合わせ。解説の誤りのご指摘、取り上げてほしいテーマのご要望、サイトの不具合報告などをお寄せください。';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('ja', contactPath),
  ...sharingMetadata({ lang: 'ja', path: contactPath('ja'), title: TITLE, description: DESCRIPTION }),
};

export default function Page() {
  return <ContactPage lang="ja" />;
}
