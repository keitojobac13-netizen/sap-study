import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import SectionArticle from '../../_components/SectionArticle';
import { allSectionPaths, isModuleKey, getSection } from '../../_lib/modules';
import { sectionPath, alternatesFor } from '../../_lib/routes';
import { buildSectionMetadata } from '../../_lib/page-metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return allSectionPaths();
}

export async function generateMetadata({ params }: {
  params: Promise<{ module: string; section: string }>;
}): Promise<Metadata> {
  const { module, section } = await params;
  if (!isModuleKey(module)) return {};
  const found = getSection(module, 'ja', section);
  if (!found) return {};
  return {
    ...buildSectionMetadata(found.module, found.section, 'ja'),
    alternates: alternatesFor('ja', (l) => sectionPath(l, module, section)),
  };
}

export default async function SectionPage({ params }: {
  params: Promise<{ module: string; section: string }>;
}) {
  const { module, section } = await params;
  if (!isModuleKey(module)) notFound();
  if (!getSection(module, 'ja', section)) notFound();
  return <SectionArticle moduleKey={module} sectionId={section} lang="ja" />;
}
