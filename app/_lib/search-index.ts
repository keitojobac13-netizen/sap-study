import type { Language } from './i18n';
import { MODULE_KEYS, getModule } from './modules';
import { glossaryTerms } from './glossary';
import { visibleArticles, cardTitle, CATEGORY_LABELS } from './articles';
import { sectionPath, articlePath, dictionaryPath } from './routes';

export type SearchKind = 'section' | 'article' | 'term';

/**
 * One searchable row. Field names are short because the whole index ships
 * inside the page's HTML: at ~400 rows per language, a longer shape costs
 * more than it reads.
 */
export type SearchEntry = {
  /** Title shown in the result list, and the main thing matched against. */
  t: string;
  /** Where it sits: the module, the column category, or the glossary. */
  g: string;
  /** One line under the title. Trimmed — this is a result, not the page. */
  s: string;
  /** Link target. */
  h: string;
  k: SearchKind;
  /** Extra text matched but not shown: readings, keywords, the other language. */
  q?: string;
};

const KIND_LABELS: Record<Language, Record<SearchKind, string>> = {
  ja: { section: 'セクション', article: 'コラム', term: '用語' },
  en: { section: 'Section', article: 'Column', term: 'Glossary' },
};

export function kindLabel(lang: Language, kind: SearchKind) {
  return KIND_LABELS[lang][kind];
}

/** First sentence, or a hard cut — result rows are one line each. */
function trim(text: string, max = 110): string {
  const flat = text.replace(/\s+/g, ' ').trim();
  return flat.length > max ? `${flat.slice(0, max - 1)}…` : flat;
}

/**
 * The index is built at render time on the server and passed to the client
 * component as a prop, so there is no extra request and no search service.
 * Section and column bodies are deliberately left out: including 150,000
 * characters of prose would dwarf the pages it is meant to help people find.
 */
export function buildSearchIndex(lang: Language): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const key of MODULE_KEYS) {
    const mod = getModule(key, lang);
    for (const section of mod.sections) {
      entries.push({
        t: section.title,
        g: `${key.toUpperCase()}｜${mod.title}`,
        s: trim(section.summary ?? section.content[0] ?? ''),
        h: sectionPath(lang, key, section.id),
        k: 'section',
        q: [mod.title, section.keywords?.join(' ')].filter(Boolean).join(' '),
      });
    }
  }

  // Columns are Japanese only.
  if (lang === 'ja') {
    for (const article of visibleArticles()) {
      entries.push({
        t: cardTitle(article),
        g: CATEGORY_LABELS[article.category],
        s: trim(article.summary),
        h: articlePath(article.slug),
        k: 'article',
        q: [article.title, article.keywords?.join(' ')].filter(Boolean).join(' '),
      });
    }
  }

  const dictionary = dictionaryPath(lang);
  for (const term of glossaryTerms) {
    const self = lang === 'ja' ? term.ja : term.en;
    const other = lang === 'ja' ? term.en : term.ja;
    entries.push({
      t: self.term,
      g: term.modules.join('・'),
      s: trim(self.definition),
      h: `${dictionary}#${term.id}`,
      k: 'term',
      // The other language and the reading are matched but not shown: someone
      // who only knows "payment terms" should still find 支払条件.
      q: `${other.term} ${term.ja.reading}`,
    });
  }

  return entries;
}

/**
 * Fold the differences that stop a reasonable query from matching: case,
 * full-width Latin and katakana forms, and the separators people leave out
 * (`FI-AP` typed as `fiap`, `ビジネス パートナ` as `ビジネスパートナ`).
 */
export function normalize(text: string): string {
  return text
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s・･‐‑‒–—―ー\-_/（）()［］\[\]｜|、。,.]/g, '');
}
