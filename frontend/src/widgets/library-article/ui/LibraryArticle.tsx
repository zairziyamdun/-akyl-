import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import Link from "next/link";

import {
  type DocHeading,
  extractHeadings,
  formatMaterialDateLong,
  LIBRARY_TYPE_ICONS,
  LIBRARY_TYPE_LABELS,
  type LibraryMaterial,
  type LibraryMaterialSummary,
  MaterialContent,
  MaterialCover,
  parseRichContent,
} from "@/entities/library-material";

import { ArticleReadingProgress } from "./ArticleReadingProgress";
import { ArticleShare } from "./ArticleShare";

const BODY_ID = "article-body";

function TableOfContents({ headings }: { headings: DocHeading[] }) {
  return (
    <nav aria-label="Содержание" className="text-sm">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
        Содержание
      </p>
      <ol className="space-y-2 border-l border-slate-200">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-7" : "pl-4"}
          >
            <a
              href={`#${heading.id}`}
              className="-ml-px block border-l border-transparent leading-snug text-slate-500 transition hover:border-slate-900 hover:text-slate-900"
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function RelatedCard({ material }: { material: LibraryMaterialSummary }) {
  const Icon = LIBRARY_TYPE_ICONS[material.type];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="aspect-[16/9] overflow-hidden">
        <MaterialCover
          src={material.cover_url}
          type={material.type}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="flex items-center gap-1.5 text-xs font-medium text-sky-700">
          <Icon className="size-3.5" aria-hidden />
          {LIBRARY_TYPE_LABELS[material.type]}
        </p>
        <h3 className="line-clamp-3 font-semibold leading-snug text-slate-900">
          <Link
            href={`/library/${material.id}`}
            className="after:absolute after:inset-0"
          >
            {material.title}
          </Link>
        </h3>
        <p className="mt-auto pt-2 text-xs text-slate-500">
          {formatMaterialDateLong(material)}
          {material.read_time ? ` · ${material.read_time}` : ""}
        </p>
      </div>
    </article>
  );
}

export function LibraryArticle({
  material,
  related,
  url,
}: {
  material: LibraryMaterial;
  related: LibraryMaterialSummary[];
  url: string;
}) {
  const doc = parseRichContent(material.content);
  const headings = extractHeadings(doc);
  const TypeIcon = LIBRARY_TYPE_ICONS[material.type];

  return (
    <div className="bg-white [overflow-x:clip]">
      <ArticleReadingProgress targetId={BODY_ID} />

      <header className="border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="mx-auto max-w-3xl px-4 pb-10 pt-28 sm:px-6 md:pt-32">
          <nav
            aria-label="Навигация"
            className="flex items-center gap-2 text-sm"
          >
            <Link
              href="/library"
              className="inline-flex items-center gap-1.5 font-medium text-slate-500 transition hover:text-slate-900"
            >
              <ArrowLeft className="size-4" aria-hidden />
              База знаний
            </Link>
            <span className="text-slate-300">/</span>
            <span className="truncate text-slate-400">{material.topic}</span>
          </nav>

          <p className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
            <TypeIcon className="size-3.5" aria-hidden />
            {LIBRARY_TYPE_LABELS[material.type]}
          </p>

          <h1 className="mt-4 text-3xl font-semibold leading-[1.15] tracking-tight text-slate-900 sm:text-4xl md:text-[44px]">
            {material.title}
          </h1>

          {material.description ? (
            <p className="mt-5 text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
              {material.description}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="size-4" aria-hidden />
              {formatMaterialDateLong(material)}
            </span>
            {material.read_time ? (
              <span className="inline-flex items-center gap-1.5">
                <Clock className="size-4" aria-hidden />
                {material.read_time} чтения
              </span>
            ) : null}
            <span>{material.topic}</span>
          </div>
        </div>
      </header>

      {material.cover_url ? (
        <div className="mx-auto max-w-5xl px-4 pt-8 sm:px-6">
          <div className="aspect-[16/9] overflow-hidden rounded-3xl border border-slate-200">
            <MaterialCover
              src={material.cover_url}
              type={material.type}
              alt={material.title}
              priority
            />
          </div>
        </div>
      ) : null}

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-10 sm:px-6 xl:grid-cols-[minmax(0,1fr)_720px_minmax(0,1fr)]">
        <div className="hidden xl:block" />
        <article
          id={BODY_ID}
          className="mx-auto w-full min-w-0 max-w-3xl xl:max-w-none"
        >
          {headings.length >= 2 ? (
            <details className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 xl:hidden">
              <summary className="cursor-pointer text-sm font-semibold text-slate-700">
                Содержание · {headings.length}
              </summary>
              <div className="mt-4">
                <TableOfContents headings={headings} />
              </div>
            </details>
          ) : null}

          <MaterialContent doc={doc} />

          <div className="mt-12 border-t border-slate-200 pt-8">
            <ArticleShare url={url} title={material.title} />
          </div>
        </article>
        {headings.length >= 2 ? (
          <aside className="hidden xl:block">
            <div className="sticky top-28">
              <TableOfContents headings={headings} />
            </div>
          </aside>
        ) : (
          <div className="hidden xl:block" />
        )}
      </div>

      {related.length > 0 ? (
        <section className="border-t border-slate-100 bg-slate-50/70">
          <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
                Читайте также
              </h2>
              <Link
                href="/library"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Все материалы
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
                <RelatedCard key={item.id} material={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </div>
  );
}
