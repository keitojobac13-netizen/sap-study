import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ModuleHub from '../_components/ModuleHub';
import { MODULE_KEYS, isModuleKey, getModule } from '../_lib/modules';
import { modulePath, alternatesFor } from '../_lib/routes';
import { buildModuleMetadata } from '../_lib/page-metadata';

export const dynamicParams = false;

export function generateStaticParams() {
  return MODULE_KEYS.map((module) => ({ module }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ module: string }>;
}): Promise<Metadata> {
  const { module } = await params;
  if (!isModuleKey(module)) return {};
  return {
    ...buildModuleMetadata(getModule(module, 'ja'), 'ja'),
    alternates: alternatesFor('ja', (l) => modulePath(l, module)),
  };
}

export default async function ModulePage({ params }: {
  params: Promise<{ module: string }>;
}) {
  const { module } = await params;
  if (!isModuleKey(module)) notFound();
  return <ModuleHub moduleKey={module} lang="ja" />;
}
