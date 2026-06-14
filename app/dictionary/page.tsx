import GlossaryPage from '../_components/GlossaryPage';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'SAP用語辞典 | SAP Study Portal',
  description: 'FI・CO・SD・MM・PPの主要SAP用語を日英対応で解説。あいうえお順・アルファベット順で検索できます。',
};

export default async function DictionaryPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  const toggleHref = `/dictionary?lang=${lang === 'ja' ? 'en' : 'ja'}`;

  return <GlossaryPage lang={lang} toggleHref={toggleHref} />;
}
