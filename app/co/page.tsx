import LearningPage from '../_components/LearningPage';
import { co } from '../_lib/modules/co';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'CO 管理会計 | SAP学習ポータル',
  description: 'SAP CO（管理会計）モジュールを10セクション・60問で学習。原価センタ・利益センタ・内部指図・製品原価計算を日英バイリンガルで解説。',
  openGraph: {
    title: 'CO 管理会計 | SAP Study Portal',
    description: 'SAP CO（管理会計）モジュールを10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function COPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';
  return <LearningPage module={co[lang]} lang={lang} moduleKey="co" />;
}
