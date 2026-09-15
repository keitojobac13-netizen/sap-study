import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColumnIndexPage from '@/app/_components/ColumnIndexPage';
import { visibleArticles } from '@/app/_lib/articles';
import { BASE_URL, articlesPath } from '@/app/_lib/routes';

export const metadata: Metadata = {
  title: { absolute: 'SAPコラム｜キャリア・フリーランス・S/4HANA・認定資格 | SAP学習ポータル' },
  description:
    'SAPコンサルタントのキャリア、フリーランスの働き方、S/4HANA移行の動向、SAP認定資格の勉強法など、モジュール解説とは別に知っておきたい話題をまとめたコラムです。',
  alternates: { canonical: `${BASE_URL}${articlesPath()}` },
};

export default function Page() {
  // An empty list page is thin content; it stays a 404 until something is published.
  if (visibleArticles().length === 0) notFound();
  return <ColumnIndexPage />;
}
