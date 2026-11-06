"use client";

import Link from "next/link";
import { use, useEffect, useState } from "react";

import {
  fetchMaterial,
  type LibraryMaterial,
} from "@/entities/library-material";
import { LibraryMaterialForm } from "@/features/manage-library-material";
import { Button } from "@/shared/ui/Button";
import { EmptyState, TableSkeleton } from "@/widgets/dashboard-shell";

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
            <Link href="/admin/library">К списку</Link>
          </Button>
        }
      />
    );
  }

  if (!material) {
    return <TableSkeleton rows={3} cols={2} />;
  }

  return <LibraryMaterialForm key={material.id} material={material} />;
}
