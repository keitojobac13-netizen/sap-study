import type { Metadata } from 'next';
import HomePage from '@/app/_components/HomePage';
import { glossaryTerms } from '@/app/_lib/glossary';
import { homePath, alternatesFor } from '@/app/_lib/routes';

export const metadata: Metadata = {
  alternates: alternatesFor('ja', homePath),
};

export default function Page() {
  return <HomePage lang="ja" termCount={glossaryTerms.length} />;
}
