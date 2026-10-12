import type { ModuleKey } from './i18n';
import type { GlossaryModule } from './glossary';

export type ModuleStyle = {
  badge: string;
  text: string;
  bg: string;
  border: string;
  ring: string;
};

export const MODULE_STYLES: Record<ModuleKey, ModuleStyle> = {
  fi:    { badge: 'bg-blue-600',    text: 'text-blue-700',    bg: 'bg-blue-50',    border: 'border-blue-200',    ring: 'ring-blue-500' },
  co:    { badge: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-50', border: 'border-emerald-200', ring: 'ring-emerald-500' },
  sd:    { badge: 'bg-orange-500',  text: 'text-orange-700',  bg: 'bg-orange-50',  border: 'border-orange-200',  ring: 'ring-orange-500' },
  mm:    { badge: 'bg-purple-600',  text: 'text-purple-700',  bg: 'bg-purple-50',  border: 'border-purple-200',  ring: 'ring-purple-500' },
  pp:    { badge: 'bg-cyan-600',    text: 'text-cyan-700',    bg: 'bg-cyan-50',    border: 'border-cyan-200',    ring: 'ring-cyan-500' },
  abap:  { badge: 'bg-red-600',     text: 'text-red-700',     bg: 'bg-red-50',     border: 'border-red-200',     ring: 'ring-red-500' },
  basis: { badge: 'bg-amber-600',   text: 'text-amber-700',   bg: 'bg-amber-50',   border: 'border-amber-200',   ring: 'ring-amber-500' },
  ps:    { badge: 'bg-teal-600',    text: 'text-teal-700',    bg: 'bg-teal-50',    border: 'border-teal-200',    ring: 'ring-teal-500' },
};

/** Module tags on glossary entries, keyed by the glossary's upper-case module code. */
export const GLOSSARY_MODULE_COLORS: Record<GlossaryModule, string> = {
  FI: 'text-blue-700 border-blue-200 bg-blue-50/60',
  CO: 'text-emerald-700 border-emerald-200 bg-emerald-50/60',
  SD: 'text-orange-700 border-orange-200 bg-orange-50/60',
  MM: 'text-purple-700 border-purple-200 bg-purple-50/60',
  PP: 'text-cyan-700 border-cyan-200 bg-cyan-50/60',
  ABAP: 'text-red-700 border-red-200 bg-red-50/60',
  BASIS: 'text-amber-700 border-amber-200 bg-amber-50/60',
  PS: 'text-teal-700 border-teal-200 bg-teal-50/60',
};
