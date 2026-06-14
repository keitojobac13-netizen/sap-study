import LearningPage from '../_components/LearningPage';
import { mm } from '../_lib/modules/mm';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'MM 購買・在庫管理 | SAP学習ポータル',
  description: 'SAP MM（購買・在庫管理）モジュールを10セクション・60問で学習。購買発注・入庫・請求照合・棚卸・在庫評価を日英バイリンガルで解説。',
  openGraph: {
    title: 'MM 購買・在庫管理 | SAP Study Portal',
    description: 'SAP MM（購買・在庫管理）モジュールを10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function MMPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  return <LearningPage module={mm[lang]} lang={lang} moduleKey="mm" />;
}
