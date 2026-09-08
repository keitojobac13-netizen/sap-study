import type { Metadata } from 'next';
import type { Language } from './i18n';
import type { ModuleContent, Section } from './learning-types';
import { sectionSummary } from './learning-types';
import { OG_IMAGES } from './og-image';

const SITE = { ja: 'SAP学習ポータル', en: 'SAP Study Portal' } as const;

function locale(lang: Language) {
  return lang === 'ja' ? 'ja_JP' : 'en_US';
}

/** Clamp to a length search engines actually display. */
function clamp(text: string, max = 155) {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

export function buildModuleMetadata(mod: ModuleContent, lang: Language): Metadata {
  const total = mod.sections.reduce((n, s) => n + s.quizzes.length, 0);
  const suffix =
    lang === 'ja'
      ? `全${mod.sections.length}セクション・${total}問の確認問題で体系的に学べます。`
      : `${mod.sections.length} sections and ${total} practice questions.`;
  const description = clamp(`${mod.description}${lang === 'ja' ? '' : ' '}${suffix}`);
  // Absolute, so the root layout template does not append the site name twice.
  const title = `${mod.title} | ${SITE[lang]}`;

  return {
    title: { absolute: title },
    description,
    openGraph: {
      type: 'website',
      locale: locale(lang),
      siteName: SITE[lang],
      title,
      description,
      images: OG_IMAGES,
    },
    twitter: { card: 'summary_large_image', title, description, images: OG_IMAGES },
  };
}

export function buildSectionMetadata(
  mod: ModuleContent,
  section: Section,
  lang: Language
): Metadata {
  const description = clamp(sectionSummary(section));
  const title = `${section.title} | ${mod.title} | ${SITE[lang]}`;

  return {
    title: { absolute: title },
    description,
    keywords: section.keywords,
    openGraph: {
      type: 'article',
      locale: locale(lang),
      siteName: SITE[lang],
      title: `${section.title} | ${mod.title}`,
      description,
      images: OG_IMAGES,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${section.title} | ${mod.title}`,
      description,
      images: OG_IMAGES,
    },
  };
}
