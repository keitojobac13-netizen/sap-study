import Link from 'next/link';
import type { Language } from '../_lib/i18n';
import { translations } from '../_lib/i18n';
import { BASE_URL, homePath } from '../_lib/routes';

export type Crumb = { label: string; href?: string };

/**
 * Visible breadcrumb trail plus matching BreadcrumbList structured data.
 * The home crumb is prepended automatically.
 */
export default function Breadcrumbs({ lang, items }: {
  lang: Language;
  items: Crumb[];
}) {
  const t = translations[lang];
  const trail: Crumb[] = [{ label: t.nav.home, href: homePath(lang) }, ...items];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.label,
      ...(crumb.href ? { item: `${BASE_URL}${crumb.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
      <ol className="flex flex-wrap items-center gap-1.5">
        {trail.map((crumb, i) => (
          <li key={i} className="flex items-center gap-1.5 min-w-0">
            {i > 0 && <span aria-hidden className="text-gray-300">/</span>}
            {crumb.href ? (
              <Link href={crumb.href} className="hover:text-blue-600 transition-colors">
                {crumb.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium truncate">{crumb.label}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </nav>
  );
}
