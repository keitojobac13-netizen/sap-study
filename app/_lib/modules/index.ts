import type { ModuleContent, ModuleEnrichment, Quiz } from '../learning-types';
import { enrichModule } from '../learning-types';
import type { Language, ModuleKey } from '../i18n';
import { fiContent } from './fi-content';
import { coContent } from './co-content';
import { sdContent } from './sd-content';
import { mmContent } from './mm-content';
import { ppContent } from './pp-content';
import { abapContent } from './abap-content';
import { basisContent } from './basis-content';
import { psContent } from './ps-content';
import { fiQuizzes } from './fi-quizzes';
import { fi } from './fi';
import { co } from './co';
import { sd } from './sd';
import { mm } from './mm';
import { pp } from './pp';
import { abap } from './abap';
import { basis } from './basis';
import { ps } from './ps';

export const MODULE_KEYS: readonly ModuleKey[] = [
  'fi', 'co', 'sd', 'mm', 'pp', 'abap', 'basis', 'ps',
] as const;

const BASE: Record<ModuleKey, Record<Language, ModuleContent>> = {
  fi, co, sd, mm, pp, abap, basis, ps,
};

/**
 * Long-form article text lives in `<module>-content.ts` alongside the quiz
 * definitions. Modules not listed here still render their original
 * paragraphs, so content can be expanded one module at a time.
 */
const CONTENT: Partial<Record<ModuleKey, Record<Language, ModuleEnrichment>>> = {
  fi: fiContent,
  co: coContent,
  sd: sdContent,
  mm: mmContent,
  pp: ppContent,
  abap: abapContent,
  basis: basisContent,
  ps: psContent,
};

/**
 * Additional practice questions, kept in `<module>-quizzes.ts` keyed by
 * section id and appended after the originals. Appending (never inserting)
 * keeps readers' saved answers aligned with the questions they belong to.
 */
type ExtraQuizzes = Record<string, Quiz[]>;

const EXTRA_QUIZZES: Partial<Record<ModuleKey, Record<Language, ExtraQuizzes>>> = {
  fi: fiQuizzes,
};

function withExtraQuizzes(mod: ModuleContent, extra: ExtraQuizzes | undefined): ModuleContent {
  if (!extra) return mod;
  return {
    ...mod,
    sections: mod.sections.map((section) => {
      const added = extra[section.id];
      return added ? { ...section, quizzes: [...section.quizzes, ...added] } : section;
    }),
  };
}

const REGISTRY = Object.fromEntries(
  (Object.keys(BASE) as ModuleKey[]).map((key) => [
    key,
    {
      ja: withExtraQuizzes(enrichModule(BASE[key].ja, CONTENT[key]?.ja), EXTRA_QUIZZES[key]?.ja),
      en: withExtraQuizzes(enrichModule(BASE[key].en, CONTENT[key]?.en), EXTRA_QUIZZES[key]?.en),
    },
  ])
) as Record<ModuleKey, Record<Language, ModuleContent>>;

export function isModuleKey(value: string): value is ModuleKey {
  return (MODULE_KEYS as readonly string[]).includes(value);
}

export function getModule(key: ModuleKey, lang: Language): ModuleContent {
  return REGISTRY[key][lang];
}

/** Section ids are shared across languages; ja is the source of truth. */
export function getSectionIds(key: ModuleKey): string[] {
  return REGISTRY[key].ja.sections.map((s) => s.id);
}

export function getSection(key: ModuleKey, lang: Language, sectionId: string) {
  const mod = REGISTRY[key][lang];
  const index = mod.sections.findIndex((s) => s.id === sectionId);
  if (index === -1) return null;
  return {
    module: mod,
    section: mod.sections[index],
    index,
    prev: index > 0 ? mod.sections[index - 1] : null,
    next: index < mod.sections.length - 1 ? mod.sections[index + 1] : null,
  };
}

/** Every (module, section) pair, for sitemap and static params generation. */
export function allSectionPaths(): { module: ModuleKey; section: string }[] {
  return MODULE_KEYS.flatMap((key) =>
    getSectionIds(key).map((section) => ({ module: key, section }))
  );
}
