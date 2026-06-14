import LearningPage from '../_components/LearningPage';
import { fi } from '../_lib/modules/fi';
import type { Language } from '../_lib/i18n';

export const metadata = {
  title: 'FI 財務会計 | SAP学習ポータル',
  description: 'SAP FI（財務会計）モジュールを10セクション・60問で学習。総勘定元帳・買掛金・売掛金・固定資産・決算処理を日英バイリンガルで解説。',
  openGraph: {
    title: 'FI 財務会計 | SAP Study Portal',
    description: 'SAP FI（財務会計）モジュールを10セクション・60問で学習。日英バイリンガル対応。',
  },
};

export default async function FIPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>;
}) {
  const { lang: rawLang } = await searchParams;
  const lang: Language = rawLang === 'en' ? 'en' : 'ja';

  return <LearningPage module={fi[lang]} lang={lang} moduleKey="fi" />;
}
