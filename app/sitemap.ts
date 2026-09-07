import type { MetadataRoute } from 'next';
import { MODULE_KEYS, allSectionPaths } from './_lib/modules';
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
} from './_lib/routes';

type PathFn = (lang: Language) => string;

/**
 * Each entry is emitted once per language with hreflang alternates pointing
 * at its counterpart, rather than as two unrelated URLs.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: { path: PathFn; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: homePath,       priority: 1.0, changeFrequency: 'weekly' },
    { path: dictionaryPath, priority: 0.9, changeFrequency: 'weekly' },
    ...MODULE_KEYS.map((m) => ({
      path: ((lang: Language) => modulePath(lang, m)) as PathFn,
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    })),
    ...allSectionPaths().map(({ module, section }) => ({
      path: ((lang: Language) => sectionPath(lang, module, section)) as PathFn,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    { path: aboutPath,   priority: 0.5, changeFrequency: 'yearly' },
    { path: contactPath, priority: 0.4, changeFrequency: 'yearly' },
    { path: privacyPath, priority: 0.3, changeFrequency: 'yearly' },
  ];

  return entries.flatMap(({ path, priority, changeFrequency }) =>
    (['ja', 'en'] as const).map((lang) => ({
      url: `${BASE_URL}${path(lang)}`,
      lastModified,
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
}
