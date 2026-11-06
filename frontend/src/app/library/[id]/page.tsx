import { ArrowLeft, CalendarDays, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";

import {
  fetchPublishedMaterialOnServer,
  formatMaterialDate,
  LIBRARY_TYPE_LABELS,
  MaterialContent,
} from "@/entities/library-material";

export const revalidate = 60;

type PageProps = {
  params: Promise<{ id: string }>;
};

const loadMaterial = cache(fetchPublishedMaterialOnServer);

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const material = await loadMaterial(id);

  if (!material) {
    return { title: "Материал не найден | AKYL" };
  }

  return {
    title: `${material.title} | База знаний AKYL`,
    description: material.description || undefined,
    alternates: { canonical: `/library/${material.id}` },
    openGraph: {
      title: material.title,
      description: material.description || undefined,
      type: "article",
      images: material.cover_url ? [material.cover_url] : undefined,
    },
  };
}

export default async function LibraryMaterialPage({ params }: PageProps) {
  const { id } = await params;
  const material = await loadMaterial(id);

  if (!material) {
    notFound();
  }

  return (
    <div className="bg-white [overflow-x:clip]">
      <article className="mx-auto max-w-3xl px-6 pb-20 pt-32 lg:px-8">
        <Link
          href="/library"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="size-4" aria-hidden />
          База знаний
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <span className="rounded-full border border-slate-200 px-2.5 py-0.5 text-xs font-medium text-slate-700">
            {LIBRARY_TYPE_LABELS[material.type]}
          </span>
          <span>{material.topic}</span>
          <span aria-hidden>•</span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays className="size-4" aria-hidden />
            {formatMaterialDate(material)}
          </span>
          {material.read_time ? (
            <>
              <span aria-hidden>•</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-4" aria-hidden />
                {material.read_time}
              </span>
            </>
          ) : null}
        </div>

        <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-slate-900 md:text-4xl">
          {material.title}
        </h1>

        {material.description ? (
          <p className="mt-4 text-lg leading-8 text-slate-600">
            {material.description}
          </p>
        ) : null}

        {material.cover_url ? (
          <Image
            src={material.cover_url}
            alt={material.title}
            width={1200}
            height={675}
            unoptimized
            priority
            className="mt-8 aspect-[16/9] w-full rounded-3xl border border-slate-200 object-cover"
          />
        ) : null}

        {material.content.trim() ? (
          <MaterialContent content={material.content} className="mt-10" />
        ) : null}
      </article>
    </div>
  );
}
