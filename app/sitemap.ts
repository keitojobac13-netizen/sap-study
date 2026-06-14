import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sap-study.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ['ja', 'en'] as const;
  const modules = ['fi', 'co', 'sd', 'mm', 'pp'] as const;
  const lastModified = new Date();

  const routes = [
    { path: '/',           priority: 1.0,  changeFrequency: 'weekly'  as const },
    { path: '/dictionary', priority: 0.9,  changeFrequency: 'weekly'  as const },
    { path: '/privacy',    priority: 0.3,  changeFrequency: 'yearly'  as const },
    ...modules.map((m) => ({ path: `/${m}`, priority: 0.8, changeFrequency: 'weekly' as const })),
  ];

  return routes.flatMap(({ path, priority, changeFrequency }) =>
    langs.map((lang) => ({
      url: `${BASE_URL}${path}?lang=${lang}`,
      lastModified,
      changeFrequency,
      priority,
    }))
  );
}
