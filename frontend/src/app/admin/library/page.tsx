"use client";

import {
  ExternalLink,
  FileText,
  Pencil,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";

import {
  fetchAllMaterials,
  formatMaterialDateLong,
  LIBRARY_TYPE_LABELS,
  type LibraryMaterialSummary,
  MaterialCover,
} from "@/entities/library-material";
import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui/Button";
import { EmptyState, PageHeader } from "@/widgets/dashboard-shell";

type StatusFilter = "all" | "published" | "draft";

const FILTERS: { id: StatusFilter; label: string }[] = [
  { id: "all", label: "Все" },
  { id: "published", label: "Опубликованные" },
  { id: "draft", label: "Черновики" },
];

function ListSkeleton() {
  return (
    <ul className="space-y-3" aria-busy="true" aria-label="Загрузка статей">
      {["a", "b", "c", "d"].map((id) => (
        <li
          key={id}
          className="flex animate-pulse gap-4 rounded-2xl border border-slate-200 bg-white p-3"
        >
          <div className="aspect-[16/10] w-28 shrink-0 rounded-xl bg-slate-100 sm:w-40" />
          <div className="flex-1 space-y-2 py-1">
            <div className="h-4 w-2/3 rounded bg-slate-100" />
            <div className="h-3 w-1/3 rounded bg-slate-100" />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function AdminLibraryPage() {
  const [materials, setMaterials] = useState<LibraryMaterialSummary[] | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [query, setQuery] = useState("");

  const load = useCallback(async () => {
    setError(null);
    try {
      setMaterials(await fetchAllMaterials());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить статьи");
      setMaterials((prev) => prev ?? []);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const counts = useMemo(() => {
    const list = materials ?? [];
    return {
      all: list.length,
      published: list.filter((m) => m.status === "published").length,
      draft: list.filter((m) => m.status === "draft").length,
    };
  }, [materials]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (materials ?? []).filter(
      (m) =>
        (filter === "all" || m.status === filter) &&
        (!q ||
          m.title.toLowerCase().includes(q) ||
          m.topic.toLowerCase().includes(q)),
    );
  }, [materials, filter, query]);

  return (
    <>
      <PageHeader
        title="Библиотека"
        description="Статьи и материалы базы знаний. Опубликованные сразу появляются на сайте."
        actions={
          <Button asChild>
            <Link href="/admin/library/new">
              <Plus className="size-4" aria-hidden />
              Новая статья
            </Link>
          </Button>
        }
      />

      {error ? (
        <div
          role="alert"
          className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{error}</span>
          <Button variant="secondary" size="sm" onClick={() => void load()}>
            <RefreshCw className="size-4" aria-hidden />
            Повторить
          </Button>
        </div>
      ) : null}

      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          role="tablist"
          aria-label="Статус"
          className="inline-flex w-full overflow-x-auto rounded-xl bg-slate-100 p-1 sm:w-auto"
        >
          {FILTERS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={filter === item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "flex-1 whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium transition sm:flex-none",
                filter === item.id
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-900",
              )}
            >
              {item.label}
              <span className="ml-1.5 text-xs text-slate-400">
                {counts[item.id]}
              </span>
            </button>
          ))}
        </div>
        <div className="relative sm:w-72">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Поиск по названию или теме"
            aria-label="Поиск статей"
            className="h-10 w-full rounded-xl bg-white pl-9 pr-3 text-sm ring-1 ring-slate-200 outline-none focus:ring-2 focus:ring-slate-400"
          />
        </div>
      </div>

      {materials === null ? (
        <ListSkeleton />
      ) : materials.length === 0 && !error ? (
        <EmptyState
          icon={<FileText className="size-6" />}
          title="Статей пока нет"
          description="Напишите первую статью — после публикации она появится в разделе «База знаний»."
          action={
            <Button asChild>
              <Link href="/admin/library/new">
                <Plus className="size-4" aria-hidden />
                Написать статью
              </Link>
            </Button>
          }
        />
      ) : visible.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-200 px-6 py-10 text-center text-sm text-slate-500">
          Ничего не найдено. Измените поиск или фильтр.
        </p>
      ) : (
        <ul className="space-y-3">
          {visible.map((m) => (
            <li
              key={m.id}
              className="group relative flex gap-3 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition hover:border-slate-300 hover:shadow sm:gap-4"
            >
              <div className="aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-xl sm:w-40">
                <MaterialCover
                  src={m.cover_url}
                  type={m.type}
                  iconClassName="size-6"
                />
              </div>
              <div className="flex min-w-0 flex-1 flex-col justify-between gap-2 py-0.5">
                <div className="min-w-0">
                  <Link
                    href={`/admin/library/${m.id}`}
                    className="line-clamp-2 font-semibold leading-snug text-slate-900 after:absolute after:inset-0 after:rounded-2xl"
                  >
                    {m.title}
                  </Link>
                  <p className="mt-1 truncate text-xs text-slate-500">
                    {LIBRARY_TYPE_LABELS[m.type]} · {m.topic} ·{" "}
                    {formatMaterialDateLong(m)}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
                      m.status === "published"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-600",
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        m.status === "published"
                          ? "bg-emerald-500"
                          : "bg-slate-400",
                      )}
                    />
                    {m.status === "published" ? "Опубликовано" : "Черновик"}
                  </span>
                  {m.read_time ? (
                    <span className="text-xs text-slate-400">
                      {m.read_time}
                    </span>
                  ) : null}
                </div>
              </div>
              <div className="relative z-10 hidden shrink-0 items-start gap-1 sm:flex">
                {m.status === "published" ? (
                  <Link
                    href={`/library/${m.id}`}
                    target="_blank"
                    aria-label="Открыть на сайте"
                    title="Открыть на сайте"
                    className="inline-flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                  >
                    <ExternalLink className="size-4" />
                  </Link>
                ) : null}
                <Link
                  href={`/admin/library/${m.id}`}
                  aria-label="Редактировать"
                  title="Редактировать"
                  className="inline-flex size-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
                >
                  <Pencil className="size-4" />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
