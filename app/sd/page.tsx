import LearningPage from '../_components/LearningPage';
import { sd } from '../_lib/modules/sd';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'SD 販売管理 | SAP学習ポータル',
  description: 'SAP SD（販売管理）モジュールを10セクション・60問で学習。受注・出荷・請求・与信管理・返品処理を日英バイリンガルで解説。',
  openGraph: {
    title: 'SD 販売管理 | SAP Study Portal',
    description: 'SAP SD（販売管理）モジュールを10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function SDPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  return <LearningPage module={sd[lang]} lang={lang} moduleKey="sd" />;
}
