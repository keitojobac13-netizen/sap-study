import type { MetadataRoute } from 'next';
import { MODULE_KEYS, allSectionPaths, moduleUpdated, sectionUpdated } from './_lib/modules';
import { publishedArticles } from './_lib/articles';
import { PAGE_UPDATED } from './_lib/site-info';
import type { Language } from './_lib/i18n';
import {
  BASE_URL,
  homePath,
  modulePath,
  sectionPath,
  dictionaryPath,
  aboutPath,
  contactPath,
  privacyPath,
  articlesPath,
  articlePath,
} from './_lib/routes';

type PathFn = (lang: Language) => string;
type Entry = {
  path: PathFn;
  /** The day the page's content last changed, not the build time. */
  updated: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
};

const newest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));

/**
 * Each entry is emitted once per language with hreflang alternates pointing
 * at its counterpart, rather than as two unrelated URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = publishedArticles();
  const articleDates = articles.map((a) => a.updatedAt ?? a.publishedAt);
  // The home page lists the modules, the newest columns and the glossary size.
  const homeUpdated = newest([...MODULE_KEYS.map(moduleUpdated), ...articleDates, PAGE_UPDATED.dictionary]);

  const entries: Entry[] = [
    { path: homePath,       updated: homeUpdated,             priority: 1.0, changeFrequency: 'weekly' },
    { path: dictionaryPath, updated: PAGE_UPDATED.dictionary, priority: 0.9, changeFrequency: 'weekly' },
    ...MODULE_KEYS.map((m) => ({
      path: ((lang: Language) => modulePath(lang, m)) as PathFn,
      updated: moduleUpdated(m),
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    })),
    ...allSectionPaths().map(({ module, section }) => ({
      path: ((lang: Language) => sectionPath(lang, module, section)) as PathFn,
      updated: sectionUpdated(module, section),
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: aboutPath,   updated: PAGE_UPDATED.about,   priority: 0.5, changeFrequency: 'yearly' },
    { path: contactPath, updated: PAGE_UPDATED.contact, priority: 0.4, changeFrequency: 'yearly' },
    { path: privacyPath, updated: PAGE_UPDATED.privacy, priority: 0.3, changeFrequency: 'yearly' },
  ];

  // Columns exist in Japanese only, so they carry no hreflang pair.
  const columns: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}${articlePath(a.slug)}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  if (columns.length > 0) {
    columns.unshift({
      url: `${BASE_URL}${articlesPath()}`,
      lastModified: new Date(newest(articleDates)),
      changeFrequency: 'weekly',
      priority: 0.7,
    });
  }

  const localized = entries.flatMap(({ path, updated, priority, changeFrequency }) =>
    (['ja', 'en'] as const).map((lang) => ({
      url: `${BASE_URL}${path(lang)}`,
      lastModified: new Date(updated),
      changeFrequency,
      priority,
      alternates: {
        languages: {
          ja: `${BASE_URL}${path('ja')}`,
          en: `${BASE_URL}${path('en')}`,
          'x-default': `${BASE_URL}${path('ja')}`,
        },
      },
    }))
  );

  return [...localized, ...columns];
}
