import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  docPlainText,
  fetchPublishedMaterialOnServer,
  fetchPublishedMaterialsOnServer,
  type LibraryMaterialSummary,
  libraryTopicHref,
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

/** Cover photo, or the generated branded card when there is none. */
function shareImage(material: { id: string; cover_url: string | null }) {
  return material.cover_url ?? `${SITE_URL}/library/${material.id}/og-image`;
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
      images: [shareImage(material)],
    },
    twitter: {
      card: "summary_large_image",
      title: material.title,
      description,
      images: [shareImage(material)],
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
          image: [shareImage(material)],
          datePublished: material.published_at ?? material.created_at,
          dateModified: material.updated_at,
          mainEntityOfPage: url,
          publisher: { "@type": "Organization", name: "AKYL" },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { name: "Главная", item: SITE_URL },
            { name: "База знаний", item: `${SITE_URL}/library` },
            {
              name: material.topic,
              item: `${SITE_URL}${libraryTopicHref(material.topic)}`,
            },
            { name: material.title, item: url },
          ].map((crumb, index) => ({
            "@type": "ListItem",
            position: index + 1,
            ...crumb,
          })),
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
