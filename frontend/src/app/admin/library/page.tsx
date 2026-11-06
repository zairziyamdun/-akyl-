"use client";

import { Plus } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

import {
  fetchAllMaterials,
  formatMaterialDate,
  LIBRARY_TYPE_LABELS,
  type LibraryMaterial,
} from "@/entities/library-material";
import { Button } from "@/shared/ui/Button";
import {
  DataTable,
  EmptyState,
  PageHeader,
  StatusBadge,
  TableSkeleton,
} from "@/widgets/dashboard-shell";

export default function AdminLibraryPage() {
  const [materials, setMaterials] = useState<LibraryMaterial[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setError(null);
    try {
      setMaterials(await fetchAllMaterials());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Не удалось загрузить статьи");
      setMaterials([]);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <>
      <PageHeader
        title="Библиотека"
        description="Статьи и материалы базы знаний: текст, фото, публикация"
        actions={
          <Button asChild size="sm">
            <Link href="/admin/library/new">
              <Plus className="size-4" aria-hidden />
              Добавить статью
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
            Повторить
          </Button>
        </div>
      ) : null}

      {materials === null ? (
        <TableSkeleton rows={4} cols={5} />
      ) : materials.length === 0 ? (
        error ? null : (
          <EmptyState
            title="Статей пока нет"
            description="Добавьте первую статью — она появится в разделе «База знаний» после публикации."
            action={
              <Button asChild>
                <Link href="/admin/library/new">Добавить статью</Link>
              </Button>
            }
          />
        )
      ) : (
        <DataTable
          data={materials}
          keyExtractor={(m) => m.id}
          columns={[
            {
              key: "title",
              header: "Название",
              render: (m) => (
                <Link
                  href={`/admin/library/${m.id}`}
                  className="font-medium text-slate-900 hover:underline"
                >
                  {m.title}
                </Link>
              ),
            },
            {
              key: "type",
              header: "Тип",
              render: (m) => (
                <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                  {LIBRARY_TYPE_LABELS[m.type] ?? m.type}
                </span>
              ),
            },
            { key: "topic", header: "Тема", render: (m) => m.topic },
            {
              key: "status",
              header: "Статус",
              render: (m) => <StatusBadge status={m.status} />,
            },
            {
              key: "date",
              header: "Дата",
              render: (m) => formatMaterialDate(m),
            },
            {
              key: "actions",
              header: "",
              className: "text-right",
              render: (m) => (
                <Button asChild variant="ghost" size="sm">
                  <Link href={`/admin/library/${m.id}`}>Редактировать</Link>
                </Button>
              ),
            },
          ]}
        />
      )}
    </>
  );
}
