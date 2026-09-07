import type { Metadata } from 'next';
import ContactPage from '../_components/ContactPage';
import { contactPath, alternatesFor } from '../_lib/routes';

export const metadata: Metadata = {
  title: { absolute: 'お問い合わせ | SAP学習ポータル' },
  description:
    'SAP学習ポータルへのお問い合わせ。解説の誤りのご指摘、取り上げてほしいテーマのご要望、サイトの不具合報告などをお寄せください。',
  alternates: alternatesFor('ja', contactPath),
};

export default function Page() {
  return <ContactPage lang="ja" />;
}
