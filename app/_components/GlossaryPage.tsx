'use client';

import { useState, useRef, useCallback } from 'react';
import {
  glossaryTerms,
  getKanaRow,
  KANA_ROWS,
  type GlossaryModule,
  type KanaRow,
} from '../_lib/glossary';
import type { Language } from '../_lib/i18n';

const MODULE_COLORS: Record<GlossaryModule, string> = {
  FI: 'bg-blue-100 text-blue-700 border-blue-200',
  CO: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  SD: 'bg-orange-100 text-orange-700 border-orange-200',
  MM: 'bg-purple-100 text-purple-700 border-purple-200',
  PP: 'bg-cyan-100 text-cyan-700 border-cyan-200',
  ABAP: 'bg-red-100 text-red-700 border-red-200',
  BASIS: 'bg-amber-100 text-amber-700 border-amber-200',
  PS: 'bg-teal-100 text-teal-700 border-teal-200',
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
    <div className="bg-gray-50 font-sans">
      {/* Hero */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white py-10 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">📖</span>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.title}</h1>
          </div>
          <p className="text-gray-300 text-sm sm:text-base">{t.subtitle}</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search + Filter bar */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <div className="flex-1 relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-base">🔍</span>
            <input
              type="text"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setActiveLetter(null); }}
              placeholder={t.searchPlaceholder}
              className="w-full pl-9 pr-9 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-sm"
              >
                ✕
              </button>
            )}
          </div>
          {/* Module filter */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <button
              onClick={() => setActiveModule(null)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                activeModule === null
                  ? 'bg-gray-800 text-white border-gray-800'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              {t.allModules}
            </button>
            {ALL_MODULES.map((mod) => (
              <button
                key={mod}
                onClick={() => setActiveModule(activeModule === mod ? null : mod)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  activeModule === mod
                    ? MODULE_COLORS[mod] + ' border-current'
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
              >
                {mod}
              </button>
            ))}
          </div>
        </div>

        {/* Count */}
        <div className="text-xs text-gray-500 mb-4 px-1">
          {t.termCount(totalCount)}
        </div>

        {totalCount === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-medium text-gray-600">{t.noResults}</p>
            <p className="text-sm mt-1">{t.noResultsHint}</p>
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
                  className={`px-2 py-1 text-xs font-bold rounded transition-colors ${
                    activeLetter === letter
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'
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
                      className={`h-7 text-xs font-bold rounded-md transition-colors ${
                        activeLetter === letter
                          ? 'bg-blue-600 text-white'
                          : has
                          ? 'text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                          : 'text-gray-300 cursor-default'
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
                      <div className="w-9 h-9 bg-gray-800 text-white rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0">
                        {letter}
                      </div>
                      <div className="h-px flex-1 bg-gray-200" />
                      <span className="text-xs text-gray-400">{terms.length}</span>
                    </div>

                    <div className="space-y-2">
                      {terms.map((term) => {
                        return (
                          // <details> keeps every definition in the DOM even when
                          // collapsed, so search engines read the whole glossary.
                          <details
                            key={term.id}
                            id={term.id}
                            className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors scroll-mt-20"
                          >
                            <summary className="w-full text-left px-4 py-3.5 flex items-start gap-3 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start gap-2 flex-wrap">
                                  <span className="font-bold text-gray-900 text-sm sm:text-base leading-snug">
                                    {lang === 'ja' ? term.ja.term : term.en.term}
                                  </span>
                                  <span className="text-xs text-gray-400 leading-snug mt-0.5">
                                    {lang === 'ja' ? term.en.term : term.ja.term}
                                  </span>
                                </div>
                                {lang === 'ja' && (
                                  <div className="text-xs text-gray-400 mt-0.5">
                                    {t.reading}{term.ja.reading}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap justify-end">
                                {term.modules.map((mod) => (
                                  <span
                                    key={mod}
                                    className={`text-xs font-semibold px-2 py-0.5 rounded-md border ${MODULE_COLORS[mod]}`}
                                  >
                                    {mod}
                                  </span>
                                ))}
                                <span className="ml-1 text-gray-400 text-sm transition-transform duration-200 group-open:rotate-180">
                                  ▾
                                </span>
                              </div>
                            </summary>

                            {/* Definition — always present in the HTML */}
                            <div className="border-t border-gray-100 px-4 pb-4 pt-3 bg-gray-50">
                              <p className="text-sm text-gray-700 leading-relaxed">
                                {lang === 'ja' ? term.ja.definition : term.en.definition}
                              </p>
                              <p className="text-sm text-gray-500 leading-relaxed mt-3 pl-3 border-l-2 border-gray-200">
                                <span className="block text-xs font-semibold text-gray-400 mb-1">
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
