import type { ModuleContent } from '../learning-types';
import type { Language, ModuleKey } from '../i18n';
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

const REGISTRY: Record<ModuleKey, Record<Language, ModuleContent>> = {
  fi, co, sd, mm, pp, abap, basis, ps,
};

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
  const module = REGISTRY[key][lang];
  const index = module.sections.findIndex((s) => s.id === sectionId);
  if (index === -1) return null;
  return {
    module,
    section: module.sections[index],
    index,
    prev: index > 0 ? module.sections[index - 1] : null,
    next: index < module.sections.length - 1 ? module.sections[index + 1] : null,
  };
}

/** Every (module, section) pair, for sitemap and static params generation. */
export function allSectionPaths(): { module: ModuleKey; section: string }[] {
  return MODULE_KEYS.flatMap((module) =>
    getSectionIds(module).map((section) => ({ module, section }))
  );
}
