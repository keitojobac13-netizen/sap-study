import type { Metadata } from 'next';
import PrivacyPage from '@/app/_components/PrivacyPage';
import { privacyPath, alternatesFor } from '@/app/_lib/routes';

export const metadata: Metadata = {
  title: { absolute: 'プライバシーポリシー | SAP学習ポータル' },
  description:
    'SAP学習ポータルのプライバシーポリシー。Cookie・Googleアナリティクス・Google AdSense・お問い合わせフォーム・学習進捗のブラウザ内保存について説明します。',
  alternates: alternatesFor('ja', privacyPath),
};

export default function Page() {
  return <PrivacyPage lang="ja" />;
}
