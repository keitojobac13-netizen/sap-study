import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import GlossaryTermPage from '@/app/_components/GlossaryTermPage';
import { glossaryTerms } from '@/app/_lib/glossary';
import { getTermPage } from '@/app/_lib/glossary-pages';
import { sharingMetadata } from '@/app/_lib/page-metadata';
import { BASE_URL, termPath } from '@/app/_lib/routes';
import { TERM_PAGE_IDS } from '@/app/_lib/term-page-ids';

export const dynamicParams = false;

// Only terms with a longer explanation have a page. The other terms' old
// page URLs redirect to their entry on /dictionary (next.config.ts).
export function generateStaticParams() {
  return TERM_PAGE_IDS.map((id) => ({ id }));
}

function findTerm(id: string) {
  return glossaryTerms.find((t) => t.id === id);
}

export async function generateMetadata({ params }: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const term = findTerm(id);
  const page = getTermPage(id);
  if (!term || !page) return {};
  const title = `${page.title ?? `${term.ja.term}とは｜意味と関連するSAPの機能`} | SAP学習ポータル`;
  const def = page.description ?? term.ja.definition;
  const description = def.length > 155 ? `${def.slice(0, 154)}…` : def;
  const path = termPath('ja', id);
  return {
    title: { absolute: title },
    description,
    // Japanese only, so no hreflang pair: the English entry is a fragment of /en/dictionary.
    alternates: { canonical: `${BASE_URL}${path}` },
    ...sharingMetadata({ lang: 'ja', path, title, description, type: 'article' }),
  };
}

export default async function TermPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const term = findTerm(id);
  if (!term || !getTermPage(id)) notFound();
  return <GlossaryTermPage term={term} />;
}
