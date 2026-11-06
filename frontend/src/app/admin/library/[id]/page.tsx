"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

import {
  fetchMaterial,
  type LibraryMaterial,
} from "@/entities/library-material";
import { LibraryMaterialForm } from "@/features/manage-library-material";
import { Button } from "@/shared/ui/Button";
import { EmptyState } from "@/widgets/dashboard-shell";

function EditorSkeleton() {
  return (
    <div
      className="mx-auto grid max-w-6xl animate-pulse gap-8 lg:grid-cols-[minmax(0,1fr)_320px]"
      role="status"
      aria-busy="true"
      aria-label="Загрузка статьи"
    >
      <div className="space-y-4">
        <div className="aspect-[21/9] rounded-2xl bg-slate-200/70" />
        <div className="h-9 w-3/4 rounded-lg bg-slate-200/70" />
        <div className="h-5 w-1/2 rounded bg-slate-200/70" />
        <div className="h-80 rounded-2xl bg-slate-200/70" />
      </div>
      <div className="hidden space-y-4 lg:block">
        <div className="h-48 rounded-2xl bg-slate-200/70" />
        <div className="h-32 rounded-2xl bg-slate-200/70" />
      </div>
    </div>
  );
}

export default function AdminLibraryEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [material, setMaterial] = useState<LibraryMaterial | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setMaterial(null);
    setError(null);
    fetchMaterial(id)
      .then((data) => {
        if (!cancelled) setMaterial(data);
      })
      .catch((e: unknown) => {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Статья не найдена");
        }
      });
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (error) {
    return (
      <EmptyState
        title="Статья не найдена"
        description={error}
        action={
          <Button asChild>
            <Link href="/admin/library">К списку статей</Link>
          </Button>
        }
      />
    );
  }

  if (!material) {
    return <EditorSkeleton />;
  }

  return <LibraryMaterialForm key={material.id} material={material} />;
}
