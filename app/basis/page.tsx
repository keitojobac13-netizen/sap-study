import LearningPage from '../_components/LearningPage';
import { basis } from '../_lib/modules/basis';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'Basis システム管理 | SAP学習ポータル',
  description: 'SAP Basis（システム管理）を10セクション・60問で学習。3層アーキテクチャ・ユーザー管理・トランスポート・バックグラウンドジョブ・監視を日英バイリンガルで解説。',
  openGraph: {
    title: 'Basis システム管理 | SAP Study Portal',
    description: 'SAP Basis（システム管理）を10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function BasisPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';

  return <LearningPage module={basis[lang]} lang={lang} moduleKey="basis" />;
}
