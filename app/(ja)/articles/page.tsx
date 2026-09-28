import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import ColumnIndexPage from '@/app/_components/ColumnIndexPage';
import { visibleArticles } from '@/app/_lib/articles';
import { BASE_URL, articlesPath } from '@/app/_lib/routes';

const TITLE = 'SAP用語の解説・違いの比較 | SAP学習ポータル';
const DESCRIPTION =
  'コンサインメント、転記日付と伝票日付の違い、クレジットメモとデビットメモなど、SAPの現場でよく調べられる用語を1テーマ1記事で解説します。';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: `${BASE_URL}${articlesPath()}` },
  ...sharingMetadata({ lang: 'ja', path: articlesPath(), title: TITLE, description: DESCRIPTION }),
};

export default function Page() {
  // An empty list page is thin content; it stays a 404 until something is published.
  if (visibleArticles().length === 0) notFound();
  return <ColumnIndexPage />;
}
