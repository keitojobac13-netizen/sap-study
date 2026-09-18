import type { Metadata } from 'next';
import SiteHeader from '@/app/_components/SiteHeader';
import SiteFooter from '@/app/_components/SiteFooter';
import SearchPage from '@/app/_components/SearchPage';
import { buildSearchIndex } from '@/app/_lib/search-index';
import { searchPath } from '@/app/_lib/routes';

/**
 * Results are built in the browser, so there is nothing here for a crawler to
 * index — and an empty search page is exactly the thin content the site is
 * trying not to publish. Hence `noindex`, and no sitemap entry.
 */
export const metadata: Metadata = {
  title: { absolute: 'Search | SAP Study Portal' },
  description: 'Search the sections and glossary of SAP Study Portal.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <div lang="en" className="min-h-screen flex flex-col bg-paper">
      <SiteHeader lang="en" switchPath={searchPath('ja')} />
      <main id="main" className="flex-1">
        <SearchPage lang="en" index={buildSearchIndex('en')} />
      </main>
      <SiteFooter lang="en" />
    </div>
  );
}
