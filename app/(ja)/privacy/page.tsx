import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import PrivacyPage from '@/app/_components/PrivacyPage';
import { privacyPath, alternatesFor } from '@/app/_lib/routes';

const TITLE = 'プライバシーポリシー | SAP学習ポータル';
const DESCRIPTION =
  'SAP学習ポータルのプライバシーポリシー。Cookie・Googleアナリティクス・Google AdSense・お問い合わせフォーム・学習進捗のブラウザ内保存について説明します。';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('ja', privacyPath),
  ...sharingMetadata({ lang: 'ja', path: privacyPath('ja'), title: TITLE, description: DESCRIPTION }),
};

export default function Page() {
  return <PrivacyPage lang="ja" />;
}
