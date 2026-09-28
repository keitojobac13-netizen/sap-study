import { glossaryTerms, type GlossaryModule, type GlossaryTerm } from './glossary';
import type { Block } from './learning-types';
import type { Language } from './i18n';

const MODULE_CODES = new Set<string>(['FI', 'CO', 'SD', 'MM', 'PP', 'ABAP', 'BASIS', 'PS']);

/**
 * Headwords that are also everyday words in running text, so a match usually
 * means something else. `ownModule` still links them on pages of the term's
 * own module; without it they are never linked in that language.
 * 照会 is the SD inquiry, but even SD pages use it to mean "display".
 */
const EVERYDAY_WORDS: Record<string, { lang: Language | 'both'; ownModule: boolean }> = {
  inquiry: { lang: 'ja', ownModule: false },
  settlement: { lang: 'both', ownModule: true },
  'ps-activity': { lang: 'both', ownModule: true },
  budget: { lang: 'both', ownModule: true },
  // "account assignment", "role assignment": rarely the ZUONR field.
  'assignment-zuonr': { lang: 'en', ownModule: false },
  // MM invoice and PS budget pages use "tolerance" for other limits.
  tolerance: { lang: 'en', ownModule: true },
};

/** An abbreviation such as BOM, CO-PA or SoD, as opposed to a gloss like 画面. */
function isAbbreviation(s: string) {
  return /^[A-Za-z0-9\-\/]{2,10}$/.test(s) && (s.match(/[A-Z]/g)?.length ?? 0) >= 2;
}

/**
 * "決済ルール／決済プロファイル" names two things, and running text uses one
 * at a time. Parts shorter than three characters or purely Latin ("特性",
 * "DDIC") are too generic, or belong to another entry, so they are left out.
 */
function slashParts(name: string): string[] {
  if (!name.includes('／')) return [];
  return name
    .split('／')
    .map((p) => p.trim())
    .filter((p) => p.length >= 3 && !/^[\x20-\x7E]+$/.test(p));
}

/** Words a reader would find in running text: the headword, and for "A（B）", A and B if B is an abbreviation. */
function namesOf(term: string): { names: string[]; qualifier: GlossaryModule | null } {
  const { names, qualifier } = baseNamesOf(term);
  return { names: [...names, ...names.flatMap(slashParts)], qualifier };
}

function baseNamesOf(term: string): { names: string[]; qualifier: GlossaryModule | null } {
  const m = term.match(/^(.+?)\s*[（(](.+)[）)]$/);
  if (!m) return { names: [term], qualifier: null };
  const [, base, inner] = m;
  // "明細カテゴリ（SD）" says which module the word belongs to; "SD" is not a name for it.
  if (MODULE_CODES.has(inner.toUpperCase())) {
    return { names: [term, base], qualifier: inner.toUpperCase() as GlossaryModule };
  }
  const usable = isAbbreviation(inner) && !SHARED_ABBREVIATIONS.has(inner);
  return { names: usable ? [term, base, inner] : [term, base], qualifier: null };
}

/**
 * Abbreviations that more than one headword carries, like the CO-PA in both
 * 収益性分析（CO-PA） and 特性／数値項目（CO-PA）. A bare "CO-PA" in the text
 * cannot say which entry it means.
 */
const SHARED_ABBREVIATIONS = (() => {
  const count = new Map<string, number>();
  for (const t of glossaryTerms) {
    for (const term of [t.ja.term, t.en.term]) {
      const inner = term.match(/[（(]([^（）()]+)[）)]$/)?.[1];
      if (inner && isAbbreviation(inner)) count.set(inner, (count.get(inner) ?? 0) + 1);
    }
  }
  // Each term carries its abbreviation in both languages, hence "more than 2".
  return new Set([...count].filter(([, n]) => n > 2).map(([a]) => a));
})();

function escapeRegExp(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Latin names need word edges, or "ERS" would match inside "VERSION". Names
 * with lowercase letters ignore case, so "Posting Key" finds "posting key";
 * all-caps abbreviations do not, so "PS" skips "ps".
 */
function indexIn(text: string, name: string): number {
  if (/^[\x20-\x7E]+$/.test(name)) {
    const flags = /[a-z]/.test(name) ? 'i' : '';
    const re = new RegExp(`(?<![A-Za-z0-9])${escapeRegExp(name)}(?![A-Za-z0-9])`, flags);
    return text.search(re);
  }
  return text.indexOf(name);
}

function blockText(block: Block): string {
  switch (block.type) {
    case 'p':
    case 'h':
      return block.text;
    case 'code':
      return block.code;
    case 'list':
      return block.items.join('\n');
    case 'table':
      return [block.caption ?? '', ...block.headers, ...block.rows.flat()].join('\n');
    case 'note':
      return `${block.title}\n${block.text}`;
    case 'link':
      return `${block.label}\n${block.text ?? ''}`;
    case 'figure':
      return block.caption;
  }
}

/**
 * Glossary terms that appear in a page body, in the order a reader meets them.
 * `moduleKey` is the page's module; a term qualified with another module
 * ("明細カテゴリ（SD）" on an FI page) is left out, since the bare word there
 * usually means something else.
 */
export function termsInBlocks(
  blocks: Block[],
  lang: Language,
  moduleKey?: GlossaryModule,
  limit = 12,
): GlossaryTerm[] {
  const text = blocks.map(blockText).join('\n');
  const found: { term: GlossaryTerm; at: number }[] = [];
  for (const term of glossaryTerms) {
    const { names, qualifier } = namesOf(term[lang].term);
    if (qualifier && qualifier !== moduleKey) continue;
    const everyday = EVERYDAY_WORDS[term.id];
    if (everyday && (everyday.lang === lang || everyday.lang === 'both')) {
      const onOwnModule = !!moduleKey && term.modules.includes(moduleKey);
      if (!(everyday.ownModule && onOwnModule)) continue;
    }
    const hits = names.map((n) => indexIn(text, n)).filter((i) => i >= 0);
    if (hits.length > 0) found.push({ term, at: Math.min(...hits) });
  }
  return found
    .sort((a, b) => a.at - b.at)
    .slice(0, limit)
    .map((f) => f.term);
}
