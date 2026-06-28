import LearningPage from '../_components/LearningPage';
import { abap } from '../_lib/modules/abap';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'ABAP開発 | SAP学習ポータル',
  description: 'SAP ABAP開発を10セクション・60問で学習。開発環境・データ型・内部テーブル・Open SQL・ALV・オブジェクト指向を日英バイリンガルで解説。',
  openGraph: {
    title: 'ABAP開発 | SAP Study Portal',
    description: 'SAP ABAP開発を10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function ABAPPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';

  return <LearningPage module={abap[lang]} lang={lang} moduleKey="abap" />;
}
