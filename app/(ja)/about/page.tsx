import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import AboutPage from '@/app/_components/AboutPage';
import { aboutPath, alternatesFor } from '@/app/_lib/routes';

const TITLE = '運営者情報 | SAP学習ポータル';
const DESCRIPTION =
  'SAP学習ポータル（sapstudy.jp）の運営者・編集方針・免責事項について。SAPをこれから学ぶ人のための無料の学習サイトです。SAP SEとは関係のない独立したサイトです。';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: alternatesFor('ja', aboutPath),
  ...sharingMetadata({ lang: 'ja', path: aboutPath('ja'), title: TITLE, description: DESCRIPTION }),
};

export default function Page() {
  return <AboutPage lang="ja" />;
}
