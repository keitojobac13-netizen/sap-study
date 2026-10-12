import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GlossaryTermPage from '@/app/_components/GlossaryTermPage';
import { glossaryTerms } from '@/app/_lib/glossary';
import { getTermPage } from '@/app/_lib/glossary-pages';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import { BASE_URL, termPath } from '@/app/_lib/routes';

export const dynamicParams = false;

export function generateStaticParams() {
  return glossaryTerms.map((t) => ({ id: t.id }));
}

function findTerm(id: string) {
  return glossaryTerms.find((t) => t.id === id);
}

export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const term = findTerm(id);
  if (!term) return {};
  const title = `${term.ja.term}とは｜意味と関連するSAPの機能 | SAP学習ポータル`;
  const def = term.ja.definition;
  const description = def.length > 155 ? `${def.slice(0, 154)}…` : def;
  const path = termPath('ja', id);
  return {
    title: { absolute: title },
    description,
    // Japanese only, so no hreflang pair: the English entry is a fragment of /en/dictionary.
    alternates: { canonical: `${BASE_URL}${path}` },
    // A page with only the one-paragraph definition is too thin for search;
    // it is indexed once glossary-pages.ts gives it a longer explanation.
    ...(getTermPage(id) ? {} : { robots: { index: false, follow: true } }),
    ...sharingMetadata({ lang: 'ja', path, title, description, type: 'article' }),
  };
}

export default async function TermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const term = findTerm(id);
  if (!term) notFound();
  return <GlossaryTermPage term={term} />;
}
