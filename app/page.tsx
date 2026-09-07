import type { Metadata } from 'next';
import HomePage from './_components/HomePage';
import { glossaryTerms } from './_lib/glossary';
import { homePath, alternatesFor } from './_lib/routes';

export const metadata: Metadata = {
  alternates: alternatesFor('ja', homePath),
};

export default function Page() {
  return <HomePage lang="ja" termCount={glossaryTerms.length} />;
}
