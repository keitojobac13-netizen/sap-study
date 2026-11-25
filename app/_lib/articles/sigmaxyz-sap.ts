import type { ColumnArticle } from './index';
import { companyArticleBody } from '../sap-companies';

export const sigmaxyzSap: ColumnArticle = {
  slug: 'sigmaxyz-sap',
  status: 'published',
  publishedAt: '2026-11-17',
  category: 'career',
  topic: 'companies',
  cardTitle: 'SAPの文脈で見るシグマクシス',
  title: 'SAPの文脈で見るシグマクシス｜2年連続の最優秀プロジェクトとPublic Editionでの会計刷新',
  summary:
    'シグマクシスのSAP事業を、実績が目立つSAP領域・担当する工程・顧客と案件・グローバル案件・人材育成・担当業務・待遇など8つの観点で整理しました。SAPジャパンの表彰（2025年・2026年）、有価証券報告書など、公開情報だけで書いています。',
  keywords: ['シグマクシス SAP', 'シグマクシス SAP 強み', '日本郵船', '商船三井', 'Public Edition', '財務会計', 'Fit to Standard', '転職'],
  hasAffiliateLinks: true,
  related: [
    { label: 'SAPの会社を8つの観点で比べる', href: '/articles/sap-company-axes' },
    { label: 'SAPパートナー表彰2026を読む', href: '/articles/sap-partner-excellence-2026' },
    { label: 'SAPの仕事は会社の種類で変わる', href: '/articles/sap-company-types' },
    { label: '伝票日付と転記日付の違い', href: '/articles/document-date-posting-date' },
  ],
  body: companyArticleBody(
    'sigmaxyz',
    [
      {
        type: 'p',
        text: 'シグマクシスは、大手ファームと比べると小さな規模ながら、SAPジャパンの表彰で2年続けて最優秀プロジェクトに選ばれている会社です。この記事では、SAPの仕事として見たときのシグマクシスを、8つの観点で整理します。',
      },
      { type: 'h', text: '一言でいうと、大企業の会計をPublic Editionで標準化する会社' },
      {
        type: 'p',
        text: '2025年は商船三井グループ、2026年は日本郵船と、海運大手の会計システムをPublic Editionで刷新したプロジェクトが、2年続けてProject of the Yearに選ばれました。日本郵船では、国内外の子会社を含む約350社の財務会計を標準化しています。',
      },
    ],
    [
      { type: 'h', text: 'FI（財務会計）の人から見ると' },
      {
        type: 'p',
        text: '表彰された2つの案件は、どちらも会計の刷新です。Public Editionでは、アドオンで業務に合わせるのではなく、標準の機能に業務を合わせていきます。グループ会社間の取引や資金管理まで標準機能で実装した日本郵船の案件は、FIの人にとって、標準機能の使い方と業務の変え方の両方を学べる種類の仕事だといえます。',
      },
    ],
  ),
};
