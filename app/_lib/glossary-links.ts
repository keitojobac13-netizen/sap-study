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
};

/** An abbreviation such as BOM, CO-PA or SoD, as opposed to a gloss like 画面. */
function isAbbreviation(s: string) {
  return /^[A-Za-z0-9\-\/]{2,10}$/.test(s) && (s.match(/[A-Z]/g)?.length ?? 0) >= 2;
}

/** Words a reader would find in running text: the headword, and for "A（B）", A and B if B is an abbreviation. */
function namesOf(term: string): { names: string[]; qualifier: GlossaryModule | null } {
  const m = term.match(/^(.+?)\s*[（(](.+)[）)]$/);
  if (!m) return { names: [term], qualifier: null };
  const [, base, inner] = m;
  // "明細カテゴリ（SD）" says which module the word belongs to; "SD" is not a name for it.
  if (MODULE_CODES.has(inner.toUpperCase())) {
    return { names: [term, base], qualifier: inner.toUpperCase() as GlossaryModule };
  }
  return { names: isAbbreviation(inner) ? [term, base, inner] : [term, base], qualifier: null };
}

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
