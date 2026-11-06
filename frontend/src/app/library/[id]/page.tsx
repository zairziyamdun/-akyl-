import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  docPlainText,
  fetchPublishedMaterialOnServer,
  fetchPublishedMaterialsOnServer,
  type LibraryMaterialSummary,
  parseRichContent,
} from "@/entities/library-material";
import { SITE_URL } from "@/shared/config";
import { JsonLd } from "@/shared/seo";
import { LibraryArticle } from "@/widgets/library-article";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

const loadMaterial = cache(fetchPublishedMaterialOnServer);

function pickRelated(
  all: LibraryMaterialSummary[],
  current: { id: string; topic: string },
): LibraryMaterialSummary[] {
  const others = all.filter((item) => item.id !== current.id);
  const sameTopic = others.filter((item) => item.topic === current.topic);
  const rest = others.filter((item) => item.topic !== current.topic);
  return [...sameTopic, ...rest].slice(0, 3);
}

function describe(material: { description: string; content: string }) {
  if (material.description) return material.description;
  return docPlainText(parseRichContent(material.content))
    .replace(/\s+/g, " ")
    .slice(0, 180);
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const material = await loadMaterial(id);

  if (!material) {
    return { title: "Материал не найден | AKYL" };
  }

  const description = describe(material) || undefined;

  return {
    title: `${material.title} | База знаний AKYL`,
    description,
    alternates: { canonical: `/library/${material.id}` },
    openGraph: {
      title: material.title,
      description,
      type: "article",
      publishedTime: material.published_at ?? undefined,
      modifiedTime: material.updated_at,
      images: material.cover_url ? [material.cover_url] : undefined,
    },
  };
}

export default async function LibraryMaterialPage({ params }: PageProps) {
  const { id } = await params;
  const [material, all] = await Promise.all([
    loadMaterial(id),
    fetchPublishedMaterialsOnServer(),
  ]);

  if (!material) {
    notFound();
  }

  const url = `${SITE_URL}/library/${material.id}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: material.title,
          description: describe(material),
          image: material.cover_url ? [material.cover_url] : undefined,
          datePublished: material.published_at ?? material.created_at,
          dateModified: material.updated_at,
          mainEntityOfPage: url,
          publisher: { "@type": "Organization", name: "AKYL" },
        }}
      />
      <LibraryArticle
        material={material}
        related={pickRelated(all ?? [], material)}
        url={url}
      />
    </>
  );
}
