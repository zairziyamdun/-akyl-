"use client";

import { ArrowRight, BookOpen, Check, Clock, Search, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  fetchPublishedMaterials,
  formatMaterialDateLong,
  LIBRARY_TYPE_ICONS,
  LIBRARY_TYPE_LABELS,
  LIBRARY_TYPE_ORDER,
  LIBRARY_TYPE_PLURAL,
  type LibraryMaterialSummary,
  type LibraryMaterialType,
  MaterialCover,
} from "@/entities/library-material";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";

const chipBase =
  "inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200";
const chipActive = "bg-slate-900 text-white shadow-sm";
const chipInactive =
  "border border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900";

function MaterialMeta({ material }: { material: LibraryMaterialSummary }) {
  return (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
      <span>{formatMaterialDateLong(material)}</span>
      {material.read_time ? (
        <>
          <span aria-hidden>·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" aria-hidden />
            {material.read_time}
          </span>
        </>
      ) : null}
      {material.format ? (
        <>
          <span aria-hidden>·</span>
          <span>{material.format}</span>
        </>
      ) : null}
    </p>
  );
}

function TypeLabel({ material }: { material: LibraryMaterialSummary }) {
  const Icon = LIBRARY_TYPE_ICONS[material.type];
  return (
    <p className="flex items-center gap-1.5 text-xs font-medium text-accent">
      <Icon className="size-3.5 shrink-0" aria-hidden />
      <span>{LIBRARY_TYPE_LABELS[material.type]}</span>
      <span className="truncate text-muted-foreground">· {material.topic}</span>
    </p>
  );
}

function FeaturedCard({ material }: { material: LibraryMaterialSummary }) {
  return (
    <article className="group relative mb-8 grid overflow-hidden rounded-3xl border border-border bg-card transition hover:border-accent/40 lg:grid-cols-[1.35fr_1fr]">
      <div className="aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]">
        <MaterialCover
          src={material.cover_url}
          type={material.type}
          priority
          className="transition duration-500 group-hover:scale-[1.02]"
          iconClassName="size-14"
        />
      </div>
      <div className="flex flex-col justify-center gap-4 p-6 md:p-8">
        <span className="w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          Новое в библиотеке
        </span>
        <TypeLabel material={material} />
        <h2 className="text-2xl font-semibold leading-tight tracking-tight text-foreground md:text-3xl">
          <Link
            href={`/library/${material.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {material.title}
          </Link>
        </h2>
        {material.description ? (
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground md:text-base">
            {material.description}
          </p>
        ) : null}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <MaterialMeta material={material} />
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-foreground">
            Читать
            <ArrowRight
              className="size-4 transition group-hover:translate-x-1"
              aria-hidden
            />
          </span>
        </div>
      </div>
    </article>
  );
}

function MaterialCard({ material }: { material: LibraryMaterialSummary }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-slate-900/5">
      <div className="aspect-[16/9] overflow-hidden">
        <MaterialCover
          src={material.cover_url}
          type={material.type}
          className="transition duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <TypeLabel material={material} />
        <h3 className="line-clamp-3 text-lg font-semibold leading-snug text-foreground">
          <Link
            href={`/library/${material.id}`}
            className="after:absolute after:inset-0 focus-visible:outline-none"
          >
            {material.title}
          </Link>
        </h3>
        {material.description ? (
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {material.description}
          </p>
        ) : null}
        <div className="mt-auto pt-2">
          <MaterialMeta material={material} />
        </div>
      </div>
    </article>
  );
}

function GridSkeleton() {
  return (
    <div
      role="status"
      aria-label="Загрузка материалов"
      className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
    >
      {["s1", "s2", "s3"].map((id) => (
        <div
          key={id}
          className="h-[360px] animate-pulse rounded-2xl border border-border bg-muted/60"
        />
      ))}
    </div>
  );
}

export function LibraryMain({
  initialMaterials,
  topic,
  onTopicChange,
}: {
  /** Server-rendered list; null when the API was unreachable at render time. */
  initialMaterials?: LibraryMaterialSummary[] | null;
  /** Controlled topic filter (kept in the URL by `LibraryMainRouted`). */
  topic?: string | null;
  onTopicChange?: (topic: string | null) => void;
}) {
  const [materials, setMaterials] = useState<LibraryMaterialSummary[] | null>(
    initialMaterials ?? null,
  );
  const [loadFailed, setLoadFailed] = useState(false);
  const [activeType, setActiveType] = useState<LibraryMaterialType | "all">(
    "all",
  );
  const [localTopic, setLocalTopic] = useState<string | null>(null);
  const controlled = onTopicChange !== undefined;
  const activeTopic = controlled ? (topic ?? null) : localTopic;
  const setActiveTopic = controlled ? onTopicChange : setLocalTopic;
  const [searchQuery, setSearchQuery] = useState("");

  // Client fallback only when the server could not load the list.
  useEffect(() => {
    if (initialMaterials) return;
    let cancelled = false;
    fetchPublishedMaterials()
      .then((data) => {
        if (!cancelled) setMaterials(data);
      })
      .catch(() => {
        if (!cancelled) {
          setMaterials([]);
          setLoadFailed(true);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [initialMaterials]);

  const items = useMemo(() => materials ?? [], [materials]);

  const typeCounts = useMemo(() => {
    const counts = new Map<LibraryMaterialType, number>();
    for (const item of items) {
      counts.set(item.type, (counts.get(item.type) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  const topics = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      counts.set(item.topic, (counts.get(item.topic) ?? 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const filtersActive =
    activeType !== "all" || activeTopic !== null || searchQuery.trim() !== "";

  const filteredItems = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return items.filter(
      (item) =>
        (activeType === "all" || item.type === activeType) &&
        (!activeTopic || item.topic === activeTopic) &&
        (!query ||
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.topic.toLowerCase().includes(query)),
    );
  }, [items, activeType, activeTopic, searchQuery]);

  const showFeatured = !filtersActive && filteredItems.length >= 3;
  const featured = showFeatured ? filteredItems[0] : null;
  const gridItems = showFeatured ? filteredItems.slice(1) : filteredItems;

  const resetFilters = () => {
    setActiveType("all");
    setActiveTopic(null);
    setSearchQuery("");
  };

  return (
    <section className="bg-background" id="materials">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-flex items-center rounded-full border border-border bg-background/80 px-3 py-1 text-xs font-medium text-muted-foreground">
              Библиотека знаний AKYL
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Статьи, исследования и инструменты для управления МЖД
            </h1>
            <p className="mt-3 text-sm leading-6 text-muted-foreground md:text-base">
              Теория и практика, аналитика, нормативные материалы и шаблоны —
              всё, что помогает перейти от хаотичного управления к системной
              модели.
            </p>
          </div>
          {items.length > 0 ? (
            <dl className="flex gap-8 text-sm">
              <div>
                <dt className="text-muted-foreground">Материалов</dt>
                <dd className="text-2xl font-semibold text-foreground">
                  {items.length}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Тем</dt>
                <dd className="text-2xl font-semibold text-foreground">
                  {topics.length}
                </dd>
              </div>
            </dl>
          ) : null}
        </div>

        {items.length > 0 ? (
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                aria-hidden
              />
              <input
                type="search"
                placeholder="Поиск по статьям и темам…"
                aria-label="Поиск по библиотеке"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm outline-none transition focus:border-accent"
              />
            </div>

            <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
              <button
                type="button"
                aria-pressed={activeType === "all"}
                onClick={() => setActiveType("all")}
                className={cn(
                  chipBase,
                  "shrink-0",
                  activeType === "all" ? chipActive : chipInactive,
                )}
              >
                Все
                <span className="opacity-60">{items.length}</span>
              </button>
              {LIBRARY_TYPE_ORDER.filter((type) => typeCounts.has(type)).map(
                (type) => {
                  const Icon = LIBRARY_TYPE_ICONS[type];
                  const isActive = activeType === type;
                  return (
                    <button
                      key={type}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveType(isActive ? "all" : type)}
                      className={cn(
                        chipBase,
                        "shrink-0",
                        isActive ? chipActive : chipInactive,
                      )}
                    >
                      <Icon className="size-3.5" aria-hidden />
                      {LIBRARY_TYPE_PLURAL[type]}
                      <span className="opacity-60">{typeCounts.get(type)}</span>
                    </button>
                  );
                },
              )}
            </div>

            {topics.length > 1 ? (
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
                {topics.map(([topic, count]) => {
                  const isActive = activeTopic === topic;
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveTopic(isActive ? null : topic)}
                      className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition",
                        isActive
                          ? "bg-sky-700 text-white"
                          : "bg-slate-100 text-slate-600 hover:text-slate-900",
                      )}
                    >
                      {isActive ? (
                        <Check className="size-3" aria-hidden />
                      ) : null}
                      {topic}
                      <span className="opacity-60">{count}</span>
                    </button>
                  );
                })}
              </div>
            ) : null}

            {filtersActive ? (
              <div className="flex items-center justify-between gap-3 text-sm">
                <p className="text-muted-foreground">
                  Найдено:{" "}
                  <span className="font-medium text-foreground">
                    {filteredItems.length}
                  </span>
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 font-medium text-accent hover:underline"
                >
                  <X className="size-3.5" aria-hidden />
                  Сбросить фильтры
                </button>
              </div>
            ) : null}
          </div>
        ) : null}

        {materials === null ? (
          <GridSkeleton />
        ) : filteredItems.length > 0 ? (
          <>
            {featured ? <FeaturedCard material={featured} /> : null}
            {gridItems.length > 0 ? (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {gridItems.map((item) => (
                  <MaterialCard key={item.id} material={item} />
                ))}
              </div>
            ) : null}
          </>
        ) : (
          <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center">
            <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground" />
            <h3 className="text-lg font-semibold text-foreground">
              {loadFailed
                ? "Не удалось загрузить материалы"
                : items.length === 0
                  ? "Материалы скоро появятся"
                  : "Ничего не найдено"}
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              {loadFailed
                ? "Проверьте подключение и обновите страницу."
                : items.length === 0
                  ? "Мы готовим статьи, исследования и шаблоны для библиотеки AKYL."
                  : "Попробуйте изменить поисковый запрос или сбросить фильтры."}
            </p>
            {filtersActive && items.length > 0 ? (
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 text-sm font-medium text-accent hover:underline"
              >
                Сбросить фильтры
              </button>
            ) : null}
          </div>
        )}

        <div className="mt-12 rounded-3xl border border-border bg-muted/50 p-6 md:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr_340px] lg:items-center">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Получайте новые материалы первыми
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
                Подпишитесь на обновления библиотеки, чтобы следить за новыми
                исследованиями, методическими материалами и практическими
                инструментами по управлению МЖД.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4">
              <div className="space-y-3">
                <input
                  type="email"
                  placeholder="Ваш email"
                  aria-label="Email для подписки"
                  className="h-11 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-accent"
                />
                <Button className="h-11 w-full" size="sm">
                  Подписаться
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
