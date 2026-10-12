import { glossaryTerms, type GlossaryModule, type GlossaryTerm } from './glossary';
import { termsInBlocks } from './glossary-links';
import { MODULE_KEYS, getModule } from './modules';
import { visibleArticles, cardTitle } from './articles';
import { sectionBlocks } from './learning-types';
import { getTermPage } from './glossary-pages';
import { sectionPath, articlePath } from './routes';

export type TermUsage = { label: string; group: string; href: string };

type PageEntry = TermUsage & { terms: Set<string> };

let cache: PageEntry[] | null = null;

/**
 * Every Japanese section and column with the glossary terms it mentions.
 * Built once per build; matching 319 terms against ~100 pages is cheap but
 * not free, and each term page needs the whole table.
 */
function pages(): PageEntry[] {
  if (cache) return cache;
  const sections = MODULE_KEYS.flatMap((key) => {
    const mod = getModule(key, 'ja');
    return mod.sections.map((s) => ({
      label: s.title,
      group: mod.title,
      href: sectionPath('ja', key, s.id),
      terms: new Set(
        termsInBlocks(sectionBlocks(s), 'ja', key.toUpperCase() as GlossaryModule, Infinity).map((t) => t.id)
      ),
    }));
  });
  const columns = visibleArticles().map((a) => ({
    label: cardTitle(a),
    group: 'コラム',
    href: articlePath(a.slug),
    terms: new Set(termsInBlocks(a.body, 'ja', undefined, Infinity).map((t) => t.id)),
  }));
  cache = [...columns, ...sections];
  return cache;
}

/** Columns first (they answer one question each), then sections in module order. */
export function pagesMentioning(id: string): TermUsage[] {
  return pages()
    .filter((p) => p.terms.has(id))
    .map(({ label, group, href }) => ({ label, group, href }));
}

/**
 * Terms to read next: the ones the definition or explanation itself names,
 * then the ones that most often appear on the same pages and share a module.
 */
export function relatedTerms(term: GlossaryTerm, limit = 8): GlossaryTerm[] {
  const own = [{ type: 'p' as const, text: term.ja.definition }, ...(getTermPage(term.id)?.body ?? [])];
  // Sharing a module keeps out words found inside longer ones, like the
  // Basis バリアント inside 会計年度バリアント.
  const near = (t: GlossaryTerm) => t.id !== term.id && t.modules.some((m) => term.modules.includes(m));
  const named = termsInBlocks(own, 'ja', undefined, Infinity).filter(near);

  const withTerm = pages().filter((p) => p.terms.has(term.id));
  const together = glossaryTerms
    .filter(near)
    .map((t) => ({ t, n: withTerm.filter((p) => p.terms.has(t.id)).length }))
    .filter(({ n }) => n >= 2)
    .sort((a, b) => b.n - a.n)
    .map(({ t }) => t);

  const seen = new Set<string>();
  return [...named, ...together]
    .filter((t) => !seen.has(t.id) && seen.add(t.id))
    .slice(0, limit);
}
