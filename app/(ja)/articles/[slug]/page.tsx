import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import ColumnArticlePage from '@/app/_components/ColumnArticlePage';
import { getArticle, visibleArticles } from '@/app/_lib/articles';
import { BASE_URL, articlePath } from '@/app/_lib/routes';
import { OG_IMAGES } from '@/app/_lib/og-image';

export const dynamicParams = false;

export function generateStaticParams() {
  return visibleArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const title = `${article.title} | SAP学習ポータル`;
  return {
    title: { absolute: title },
    description: article.summary,
    keywords: article.keywords,
    // Japanese only: a canonical and no hreflang pair.
    alternates: { canonical: `${BASE_URL}${articlePath(slug)}` },
    ...(article.status === 'draft' ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      type: 'article',
      locale: 'ja_JP',
      siteName: 'SAP学習ポータル',
      title: article.title,
      description: article.summary,
      images: OG_IMAGES,
    },
    twitter: { card: 'summary_large_image', title: article.title, description: article.summary, images: OG_IMAGES },
  };
}

export default async function Page({ params }: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  return <ColumnArticlePage article={article} />;
}
