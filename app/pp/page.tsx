import LearningPage from '../_components/LearningPage';
import { pp } from '../_lib/modules/pp';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'PP 生産管理 | SAP学習ポータル',
  description: 'SAP PP（生産管理）モジュールを10セクション・60問で学習。BOM・MRP・製造指図・能力計画・バッチ管理を日英バイリンガルで解説。',
  openGraph: {
    title: 'PP 生産管理 | SAP Study Portal',
    description: 'SAP PP（生産管理）モジュールを10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function PPPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  return <LearningPage module={pp[lang]} lang={lang} moduleKey="pp" />;
}
