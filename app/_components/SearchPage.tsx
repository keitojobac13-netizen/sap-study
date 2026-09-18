'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import type { Language } from '../_lib/i18n';
import { kindLabel, normalize, type SearchEntry, type SearchKind } from '../_lib/search-index';

const COPY = {
  ja: {
    title: 'サイト内検索',
    lead: 'セクション・コラム・用語辞典をまとめて検索します。',
    placeholder: '例：支払条件、BP、F110',
    label: '検索語',
    countFmt: '{n}件',
    empty: '一致するものがありませんでした。別の言い方や、短い語で試してください。',
    idle: 'キーワードを入力すると、ここに結果が出ます。',
    all: 'すべて',
    scale: '{n}件から検索できます',
  },
  en: {
    title: 'Search',
    lead: 'Searches sections and glossary terms across the site.',
    placeholder: 'e.g. payment terms, business partner',
    label: 'Search term',
    countFmt: '{n} results',
    empty: 'Nothing matched. Try a shorter or different term.',
    idle: 'Type a keyword to see results.',
    all: 'All',
    scale: 'Searching {n} entries',
  },
} as const;

const KINDS: SearchKind[] = ['section', 'article', 'term'];

/**
 * Client-side search over an index the server already put in the page. No
 * request, no service, and it works on the first keystroke; the trade-off is
 * that it matches titles, summaries and keywords rather than full prose.
 */
export default function SearchPage({ lang, index }: { lang: Language; index: SearchEntry[] }) {
  const c = COPY[lang];
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState<SearchKind | 'all'>('all');

  const kindsPresent = useMemo(
    () => KINDS.filter((k) => index.some((e) => e.k === k)),
    [index]
  );

  const results = useMemo(() => {
    const q = normalize(query);
    if (q.length === 0) return [];
    const pool = kind === 'all' ? index : index.filter((e) => e.k === kind);
    return pool
      .map((entry) => {
        const title = normalize(entry.t);
        // A title match beats a match buried in the summary, and a title that
        // starts with the query beats one that merely contains it.
        const score = title.startsWith(q)
          ? 0
          : title.includes(q)
            ? 1
            : normalize(entry.q ?? '').includes(q)
              ? 2
              : normalize(entry.s).includes(q)
                ? 3
                : -1;
        return { entry, score };
      })
      .filter(({ score }) => score >= 0)
      .sort((a, b) => a.score - b.score || a.entry.t.length - b.entry.t.length)
      .slice(0, 60);
  }, [index, kind, query]);

  return (
    <div className="px-5 sm:px-8 pt-10 pb-4">
      <div className="max-w-[42rem] mx-auto">
        <h1 className="text-[1.7rem] sm:text-[2.05rem] font-bold text-ink leading-[1.35] tracking-tight">
          {c.title}
        </h1>
        <p className="text-ink-soft leading-[1.9] mt-3 text-[0.95rem]">{c.lead}</p>

        <div className="mt-6 flex items-center gap-2 border border-rule rounded-lg bg-paper px-3 h-12 focus-within:border-ink-mute transition-colors">
          <Icon name="search" className="w-4 h-4 text-ink-mute flex-shrink-0" />
          <input
            type="search"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={c.placeholder}
            aria-label={c.label}
            className="w-full h-full bg-transparent text-[0.95rem] text-ink placeholder:text-ink-mute outline-none"
          />
        </div>

        {kindsPresent.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {(['all', ...kindsPresent] as const).map((k) => {
              const active = kind === k;
              return (
                <button
                  key={k}
                  type="button"
                  onClick={() => setKind(k)}
                  aria-pressed={active}
                  className={`px-3 py-1 rounded-full border text-[0.75rem] transition-colors ${
                    active
                      ? 'border-ink bg-ink text-white'
                      : 'border-rule text-ink-mute hover:border-ink-mute hover:text-ink'
                  }`}
                >
                  {k === 'all' ? c.all : kindLabel(lang, k)}
                </button>
              );
            })}
          </div>
        )}

        <p className="mt-4 text-[0.78rem] text-ink-mute" aria-live="polite">
          {query.trim().length === 0
            ? c.scale.replace('{n}', String(index.length))
            : c.countFmt.replace('{n}', String(results.length))}
        </p>

        {query.trim().length === 0 ? (
          <p className="mt-8 text-[0.9rem] text-ink-mute">{c.idle}</p>
        ) : results.length === 0 ? (
          <p className="mt-8 text-[0.9rem] text-ink-mute">{c.empty}</p>
        ) : (
          <ul className="mt-5 grid grid-cols-1 gap-3">
            {results.map(({ entry }) => (
              <li key={`${entry.k}-${entry.h}-${entry.t}`} className="flex">
                <Link
                  href={entry.h}
                  className="group flex flex-col w-full bg-paper border border-rule rounded-lg p-4 hover:border-ink-mute hover:bg-ground transition-colors"
                >
                  <p className="flex items-center gap-2.5">
                    <span className="inline-flex items-center border border-rule rounded-full px-2.5 py-0.5 text-[0.68rem] text-ink-mute tracking-[0.04em]">
                      {kindLabel(lang, entry.k)}
                    </span>
                    <span className="text-[0.72rem] text-ink-mute truncate">{entry.g}</span>
                  </p>
                  <h2 className="mt-2 font-bold text-ink text-[0.98rem] leading-snug group-hover:text-accent transition-colors">
                    {entry.t}
                  </h2>
                  <p className="mt-1.5 text-[0.85rem] text-ink-soft leading-[1.8] line-clamp-2">
                    {entry.s}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
