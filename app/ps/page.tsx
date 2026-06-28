import LearningPage from '../_components/LearningPage';
import { ps } from '../_lib/modules/ps';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'PS プロジェクト管理 | SAP学習ポータル',
  description: 'SAP PS（プロジェクト管理）を10セクション・60問で学習。WBS・ネットワーク・予算管理・決済・アーンドバリュー分析を日英バイリンガルで解説。',
  openGraph: {
    title: 'PS プロジェクト管理 | SAP Study Portal',
    description: 'SAP PS（プロジェクト管理）を10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function PSPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';

  return <LearningPage module={ps[lang]} lang={lang} moduleKey="ps" />;
}
