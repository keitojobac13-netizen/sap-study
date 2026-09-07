import type { Metadata } from 'next';
import AboutPage from '../_components/AboutPage';
import { aboutPath, alternatesFor } from '../_lib/routes';

export const metadata: Metadata = {
  title: '運営者情報 | SAP学習ポータル',
  description:
    'SAP学習ポータル（sapstudy.jp）の運営者・編集方針・免責事項について。SAPをこれから学ぶ人のための無料の学習サイトです。SAP SEとは関係のない独立したサイトです。',
  alternates: alternatesFor('ja', aboutPath),
};

export default function Page() {
  return <AboutPage lang="ja" />;
}
