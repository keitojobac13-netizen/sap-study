'use client';

import { useState, useRef, useCallback } from 'react';
import {
  glossaryTerms,
  getKanaRow,
  KANA_ROWS,
  type GlossaryModule,
} from '../_lib/glossary';
import type { Language } from '../_lib/i18n';
import Icon from './Icon';

const MODULE_COLORS: Record<GlossaryModule, string> = {
  FI: 'text-blue-700 border-blue-200 bg-blue-50/60',
  CO: 'text-emerald-700 border-emerald-200 bg-emerald-50/60',
  SD: 'text-orange-700 border-orange-200 bg-orange-50/60',
  MM: 'text-purple-700 border-purple-200 bg-purple-50/60',
  PP: 'text-cyan-700 border-cyan-200 bg-cyan-50/60',
  ABAP: 'text-red-700 border-red-200 bg-red-50/60',
  BASIS: 'text-amber-700 border-amber-200 bg-amber-50/60',
  PS: 'text-teal-700 border-teal-200 bg-teal-50/60',
};

const ALL_MODULES: GlossaryModule[] = ['FI', 'CO', 'SD', 'MM', 'PP', 'ABAP', 'BASIS', 'PS'];

const EN_LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getEnLetter(term: string): string {
  return term[0]?.toUpperCase() ?? '#';
}

const UI = {
  ja: {
    title: 'SAP用語辞典',
    subtitle: '財務・物流・生産から技術領域まで、SAP主要用語を日英で解説',
    searchPlaceholder: '用語を検索...',
    allModules: 'すべて',
    noResults: '該当する用語が見つかりません',
    noResultsHint: '別のキーワードで検索するか、フィルターを解除してください',
    termCount: (n: number) => `${n}件`,
    reading: '読み：',
    relatedModules: '関連モジュール',
    langToggleLabel: 'EN',
    searchLabel: '用語を検索',
    clearSearch: '検索条件を消去',
    moduleFilterLabel: 'モジュールで絞り込む',
  },
  en: {
    title: 'SAP Terminology Dictionary',
    subtitle: 'Key SAP terms across finance, logistics, production and the technical stack — in English and Japanese',
    searchPlaceholder: 'Search terms...',
    allModules: 'All',
    noResults: 'No terms found',
    noResultsHint: 'Try a different keyword or clear the filters',
    termCount: (n: number) => `${n} term${n !== 1 ? 's' : ''}`,
    reading: 'Reading: ',
    relatedModules: 'Related modules',
    langToggleLabel: 'JP',
    searchLabel: 'Search terms',
    clearSearch: 'Clear search',
    moduleFilterLabel: 'Filter by module',
  },
} as const;

type Props = { lang: Language };

export default function GlossaryPage({ lang }: Props) {
  const t = UI[lang];
  const [query, setQuery] = useState('');
  const [activeModule, setActiveModule] = useState<GlossaryModule | null>(null);
  const [activeLetter, setActiveLetter] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const filtered = glossaryTerms.filter((term) => {
    const q = query.toLowerCase();
    const matchesQuery =
      !q ||
      term.ja.term.toLowerCase().includes(q) ||
      term.ja.reading.includes(q) ||
      term.ja.definition.toLowerCase().includes(q) ||
      term.en.term.toLowerCase().includes(q) ||
      term.en.definition.toLowerCase().includes(q);
    const matchesModule = !activeModule || term.modules.includes(activeModule);
    return matchesQuery && matchesModule;
  });

  // Group by letter
  const grouped: Record<string, typeof filtered> = {};
  if (lang === 'ja') {
    for (const row of KANA_ROWS) grouped[row] = [];
    for (const term of filtered) {
      const row = getKanaRow(term.ja.reading);
      grouped[row].push(term);
    }
    // Sort within each group
    for (const row of KANA_ROWS) {
      grouped[row].sort((a, b) => a.ja.reading.localeCompare(b.ja.reading, 'ja'));
    }
  } else {
    for (const letter of EN_LETTERS) grouped[letter] = [];
    for (const term of filtered) {
      const letter = getEnLetter(term.en.term);
      if (grouped[letter]) grouped[letter].push(term);
      else grouped['#'] = [...(grouped['#'] ?? []), term];
    }
    for (const letter of EN_LETTERS) {
      grouped[letter].sort((a, b) => a.en.term.localeCompare(b.en.term));
    }
  }

  const letters = lang === 'ja' ? [...KANA_ROWS] : EN_LETTERS;
  const activeLetters = letters.filter((l) => (grouped[l]?.length ?? 0) > 0);

  const scrollToSection = useCallback((letter: string) => {
    setActiveLetter(letter);
    const el = sectionRefs.current[letter];
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const totalCount = filtered.length;

  return (
    <div className="bg-paper">
      {/* Hero */}
      <div className="border-b border-rule">
        <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-12">
          <h1 className="text-[1.9rem] sm:text-[2.3rem] font-bold text-ink tracking-tight leading-tight">
            {t.title}
          </h1>
          <p className="text-ink-soft text-[0.9rem] sm:text-[0.95rem] mt-3 max-w-2xl leading-[1.9]">
            {t.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-[80rem] mx-auto px-5 sm:px-8 py-8">
        {/* Search + Filter bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <label htmlFor="glossary-search" className="sr-only">{t.searchLabel}</label>
            <span aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">
              <Icon name="search" className="w-4 h-4" />
            </span>
            <input
              id="glossary-search"
              type="search"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveLetter(null); }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-9 h-11 text-[0.88rem] border border-rule rounded focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent bg-paper text-ink placeholder:text-ink-mute"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t.clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute hover:text-ink"
              >
                <Icon name="close" className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          {/* Module filter */}
          <div role="group" aria-label={t.moduleFilterLabel} className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveModule(null)}
              aria-pressed={activeModule === null}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeModule === null
                  ? 'bg-ink text-white border-ink'
                  : 'bg-paper text-ink-soft border-rule hover:border-ink-mute'
              }`}
            >
              {t.allModules}
            </button>
            {ALL_MODULES.map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(activeModule === mod ? null : mod)}
                aria-pressed={activeModule === mod}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  activeModule === mod
                    ? MODULE_COLORS[mod] + ' border-current'
                    : 'bg-paper text-ink-soft border-rule hover:border-ink-mute'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="font-mono text-[0.72rem] tabular-nums text-ink-mute mb-5">
          {t.termCount(totalCount)}
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-24 border-y border-rule">
            <p className="font-semibold text-ink text-[0.95rem]">{t.noResults}</p>
            <p className="text-[0.85rem] text-ink-mute mt-2">{t.noResultsHint}</p>
          </div>
        ) : (
          <>
          {/* Mobile letter nav */}
          <div className="lg:hidden mb-4">
            <div className="flex flex-wrap gap-1">
              {activeLetters.map((letter) => (
                <button
                  key={letter}
                  onClick={() => scrollToSection(letter)}
                  className={`px-2 py-1 text-[0.72rem] font-bold rounded transition-colors ${
                    activeLetter === letter
                      ? 'bg-ink text-white'
                      : 'bg-paper border border-rule text-ink-soft hover:border-ink-mute'
                  }`}
                >
                  {letter}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-6">
            {/* Sticky letter nav (desktop) */}
            <aside className="hidden lg:block w-16 flex-shrink-0">
              <div className="sticky top-20 flex flex-col gap-1">
                {letters.map((letter) => {
                  const has = (grouped[letter]?.length ?? 0) > 0;
                  return (
                    <button
                      key={letter}
                      disabled={!has}
                      onClick={() => has && scrollToSection(letter)}
                      className={`h-7 text-[0.72rem] font-bold rounded transition-colors ${
                        activeLetter === letter
                          ? 'bg-ink text-white'
                          : has
                          ? 'text-ink-soft hover:bg-ground hover:text-accent'
                          : 'text-rule cursor-default'
                      }`}
                    >
                      {letter}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Term list */}
            <div className="flex-1 min-w-0 space-y-8">
              {letters.map((letter) => {
                const terms = grouped[letter] ?? [];
                if (terms.length === 0) return null;
                return (
                  <section
                    key={letter}
                    ref={(el) => { sectionRefs.current[letter] = el; }}
                  >
                    {/* Section header */}
                    <div className="flex items-center gap-3 mb-3 scroll-mt-20">
                      <span className="font-bold text-ink text-[0.95rem] flex-shrink-0 w-6">{letter}</span>
                      <div className="h-px flex-1 bg-rule" />
                      <span className="font-mono text-[0.7rem] tabular-nums text-ink-mute">{terms.length}</span>
                    </div>

                    <div className="border-t border-rule">
                      {terms.map((term) => {
                        return (
                          // <details> keeps every definition in the DOM even when
                          // collapsed, so search engines read the whole glossary.
                          <details
                            key={term.id}
                            id={term.id}
                            className="group border-b border-rule scroll-mt-20"
                          >
                            <summary className="w-full text-left py-3.5 px-2 -mx-2 flex items-start gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden hover:bg-ground transition-colors">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 flex-wrap">
                                  <span className="font-semibold text-ink text-[0.92rem] leading-snug">
                                    {lang === 'ja' ? term.ja.term : term.en.term}
                                  </span>
                                  <span className="text-[0.78rem] text-ink-mute leading-snug mt-0.5">
                                    {lang === 'ja' ? term.en.term : term.ja.term}
                                  </span>
                                </div>
                                {lang === 'ja' && (
                                  <div className="text-[0.72rem] text-ink-mute mt-1">
                                    {t.reading}{term.ja.reading}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                                {term.modules.map((mod) => (
                                  <span
                                    key={mod}
                                    className={`text-[0.68rem] font-semibold px-1.5 py-0.5 rounded border ${MODULE_COLORS[mod]}`}
                                  >
                                    {mod}
                                  </span>
                                ))}
                                <span className="ml-1 text-ink-mute transition-transform duration-200 group-open:rotate-90">
                                  <Icon name="arrow-right" className="w-3.5 h-3.5" />
                                </span>
                              </div>
                            </summary>

                            {/* Definition — always present in the HTML */}
                            <div className="pb-5 pt-1 pr-2">
                              <p className="text-[0.88rem] text-ink-soft leading-[1.95]">
                                {lang === 'ja' ? term.ja.definition : term.en.definition}
                              </p>
                              <p className="text-[0.85rem] text-ink-mute leading-[1.9] mt-4 pl-4 border-l border-rule">
                                <span className="block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-ink-mute mb-1.5">
                                  {lang === 'ja' ? 'English' : '日本語'}
                                </span>
                                {lang === 'ja' ? term.en.definition : term.ja.definition}
                              </p>
                            </div>
                          </details>
                        );
                      })}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
          </>
        )}
      </div>

    </div>
  );
}
