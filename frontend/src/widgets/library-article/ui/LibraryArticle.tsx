import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock,
  RefreshCw,
} from "lucide-react";
import Link from "next/link";

import {
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
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui/Container";

import { ArticleReadingProgress } from "./ArticleReadingProgress";
import { ArticleShare } from "./ArticleShare";
import { ArticleToc } from "./ArticleToc";

const BODY_ID = "article-body";

/** Same horizontal rhythm as the site header, so every edge lines up with it. */
const SHELL = "px-4 sm:px-6";

/**
 * One left edge for the whole article (= the header logo edge). On xl the
 * table of contents sits in a right column that ends at the header's right edge.
 */
const READING_GRID = "xl:grid xl:grid-cols-[minmax(0,1fr)_240px] xl:gap-x-16";

const TEXT_COLUMN = "w-full max-w-[760px]";

/** "Обновлено …" only when the article was edited on a later day. */
function updatedLabel(material: LibraryMaterial): string | null {
  const published = (material.published_at ?? material.created_at).slice(0, 10);
  if (material.updated_at.slice(0, 10) <= published) return null;
  return formatMaterialDateLong({
    ...material,
    published_at: material.updated_at,
  });
}

function RelatedCard({ material }: { material: LibraryMaterialSummary }) {
  const Icon = LIBRARY_TYPE_ICONS[material.type];
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-0.5 hover:border-sky-200 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="aspect-[16/9] overflow-hidden">
        <MaterialCover
          src={material.cover_url}
          type={material.type}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <p className="flex min-w-0 items-center gap-1.5 text-xs font-medium text-sky-700">
          <Icon className="size-3.5 shrink-0" aria-hidden />
          <span className="shrink-0">{LIBRARY_TYPE_LABELS[material.type]}</span>
          <span className="truncate text-slate-400">· {material.topic}</span>
        </p>
        <h3 className="line-clamp-3 text-[17px] font-semibold leading-snug text-slate-900">
          <Link
            href={`/library/${material.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
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
  const showToc = headings.length >= 2;
  const TypeIcon = LIBRARY_TYPE_ICONS[material.type];
  const hasCover = Boolean(material.cover_url);
  const updated = updatedLabel(material);

  return (
    <div className="bg-white [overflow-x:clip]">
      <ArticleReadingProgress targetId={BODY_ID} />

      <header>
        <Container className={cn(SHELL, "pt-8 sm:pt-10 lg:pt-12")}>
          <nav aria-label="Хлебные крошки">
            <ol className="flex min-w-0 items-center gap-1.5 text-sm text-slate-500">
              <li className="shrink-0">
                <Link
                  href="/library"
                  className="inline-flex items-center gap-1.5 font-medium transition hover:text-slate-900"
                >
                  <ArrowLeft className="size-4" aria-hidden />
                  База знаний
                </Link>
              </li>
              <li aria-hidden className="shrink-0 text-slate-300">
                <ChevronRight className="size-3.5" />
              </li>
              <li className="truncate text-slate-400">{material.topic}</li>
            </ol>
          </nav>

          <p className="mt-8 inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700 sm:mt-10">
            <TypeIcon className="size-3.5" aria-hidden />
            {LIBRARY_TYPE_LABELS[material.type]}
          </p>

          <h1 className="mt-4 max-w-[880px] text-balance text-[28px] font-semibold leading-[1.18] tracking-tight text-slate-900 sm:text-[40px] sm:leading-[1.1] lg:text-[46px]">
            {material.title}
          </h1>

          {material.description ? (
            <p className="mt-5 max-w-[760px] text-pretty text-lg leading-8 text-slate-600 sm:mt-6 sm:text-xl sm:leading-9">
              {material.description}
            </p>
          ) : null}

          <dl className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-500 sm:mt-8">
            <div className="flex items-center gap-2">
              <dt>
                <CalendarDays className="size-4 text-slate-400" />
                <span className="sr-only">Дата публикации</span>
              </dt>
              <dd>{formatMaterialDateLong(material)}</dd>
            </div>
            {material.read_time ? (
              <div className="flex items-center gap-2">
                <dt>
                  <Clock className="size-4 text-slate-400" />
                  <span className="sr-only">Время чтения</span>
                </dt>
                <dd>{material.read_time} чтения</dd>
              </div>
            ) : null}
            {updated ? (
              <div className="flex items-center gap-2">
                <dt>
                  <RefreshCw className="size-4 text-slate-400" />
                  <span className="sr-only">Обновлено</span>
                </dt>
                <dd>Обновлено {updated}</dd>
              </div>
            ) : null}
          </dl>
        </Container>
      </header>

      {material.cover_url ? (
        <Container className={cn(SHELL, "mt-8 sm:mt-10")}>
          <div className="aspect-[16/9] overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 sm:rounded-3xl lg:aspect-[2/1]">
            <MaterialCover
              src={material.cover_url}
              type={material.type}
              alt={material.title}
              priority
            />
          </div>
        </Container>
      ) : null}

      <Container
        className={cn(
          SHELL,
          READING_GRID,
          "pb-20 sm:pb-24",
          hasCover ? "pt-10 sm:pt-14" : "pt-8 sm:pt-10",
        )}
      >
        <article id={BODY_ID} className={cn(TEXT_COLUMN, "min-w-0")}>
          {showToc ? (
            <details className="group mb-10 rounded-2xl border border-slate-200 bg-slate-50/70 xl:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-semibold text-slate-800 [&::-webkit-details-marker]:hidden">
                <span>
                  Содержание
                  <span className="ml-2 font-normal text-slate-400">
                    {headings.length}
                  </span>
                </span>
                <ChevronDown
                  className="size-4 text-slate-400 transition-transform group-open:rotate-180"
                  aria-hidden
                />
              </summary>
              <div className="border-t border-slate-200 px-5 pb-4 pt-3">
                <ArticleToc headings={headings} />
              </div>
            </details>
          ) : null}

          <MaterialContent doc={doc} />

          <footer className="mt-14 flex flex-col gap-5 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <ArticleShare url={url} title={material.title} />
            <Link
              href="/library"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              <ArrowLeft className="size-4" aria-hidden />
              Назад в базу знаний
            </Link>
          </footer>
        </article>

        {showToc ? (
          <aside className="hidden xl:block">
            <div className="sidebar-scroll sticky top-[calc(var(--site-header-height)+2.5rem)] max-h-[calc(100svh-var(--site-header-height)-5rem)] overflow-y-auto">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                Содержание
              </p>
              <ArticleToc headings={headings} />
            </div>
          </aside>
        ) : (
          <div aria-hidden className="hidden xl:block" />
        )}
      </Container>

      {related.length > 0 ? (
        <section
          aria-labelledby="related-heading"
          className="border-t border-slate-200/70 bg-slate-50"
        >
          <Container className={cn(SHELL, "py-16 sm:py-20")}>
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
                  Библиотека знаний
                </p>
                <h2
                  id="related-heading"
                  className="mt-2 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
                >
                  Читайте также
                </h2>
              </div>
              <Link
                href="/library"
                className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                Все материалы
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            {/* Two roomy cards on tablets (the third would be cramped), three on desktop. */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 sm:max-lg:[&>*:nth-child(3)]:hidden">
              {related.map((item) => (
                <RelatedCard key={item.id} material={item} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </div>
  );
}
