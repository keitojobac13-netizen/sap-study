import Link from 'next/link';
import Icon from './Icon';
import type { Language } from '../_lib/i18n';
import type { Block } from '../_lib/learning-types';
import type { GlossaryModule } from '../_lib/glossary';
import { termsInBlocks } from '../_lib/glossary-links';
import { dictionaryPath } from '../_lib/routes';

const LABELS = {
  ja: {
    heading: 'このページに出てくる用語',
    all: 'SAP用語辞典で他の用語も調べる',
    fallback: 'わからない用語は SAP用語辞典 で調べられます。',
  },
  en: {
    heading: 'Terms on this page',
    all: 'Browse the full SAP glossary',
    fallback: 'Unfamiliar term? Look it up in the SAP glossary.',
  },
} as const;

/**
 * Links each glossary term the page mentions straight to its entry, so a
 * reader lands on the definition instead of the top of a 300-term list.
 */
export default function PageTerms({ blocks, lang, moduleKey }: {
  blocks: Block[];
  lang: Language;
  moduleKey?: GlossaryModule;
}) {
  const l = LABELS[lang];
  const dictionary = dictionaryPath(lang);
  const terms = termsInBlocks(blocks, lang, moduleKey);

  if (terms.length === 0) {
    return (
      <p className="mt-12 pt-5 border-t border-rule-soft text-[0.8rem] text-ink-mute flex items-start gap-2">
        <Icon name="book" className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <Link href={dictionary} className="text-accent hover:underline underline-offset-2">
          {l.fallback}
        </Link>
      </p>
    );
  }

  return (
    <nav aria-label={l.heading} className="mt-12 pt-5 border-t border-rule-soft">
      <h2 className="text-[0.8rem] font-semibold text-ink-soft flex items-center gap-2">
        <Icon name="book" className="w-4 h-4 flex-shrink-0" />
        {l.heading}
      </h2>
      <ul className="mt-3 flex flex-wrap gap-2">
        {terms.map((term) => (
          <li key={term.id}>
            <Link
              href={`${dictionary}#${term.id}`}
              className="inline-block text-[0.8rem] text-ink-soft border border-rule rounded px-2 py-1 hover:text-accent hover:border-accent transition-colors"
            >
              {term[lang].term}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-[0.8rem]">
        <Link href={dictionary} className="text-accent hover:underline underline-offset-2">
          {l.all}
        </Link>
      </p>
    </nav>
  );
}
