"use client";

import { Eye, FileQuestion } from "lucide-react";
import { useEffect, useState } from "react";

import {
  LIBRARY_PREVIEW_STORAGE_KEY,
  type LibraryMaterial,
  readLibraryPreview,
} from "@/entities/library-material";
import { SITE_URL } from "@/shared/config";
import { Container } from "@/shared/ui/Container";

import { LibraryArticle } from "./LibraryArticle";

/**
 * Admin draft preview: renders the snapshot the editor left in localStorage
 * with the public article layout, and refreshes when the editor sends a new one.
 */
export function ArticlePreview() {
  const [material, setMaterial] = useState<LibraryMaterial | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setMaterial(readLibraryPreview());
    setReady(true);
    const onStorage = (event: StorageEvent) => {
      if (event.key === LIBRARY_PREVIEW_STORAGE_KEY) {
        setMaterial(readLibraryPreview());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  if (!ready) {
    return <div className="min-h-[60vh] bg-white" aria-busy="true" />;
  }

  if (!material) {
    return (
      <div className="bg-white">
        <Container className="flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
          <FileQuestion className="size-10 text-slate-300" aria-hidden />
          <h1 className="mt-4 text-xl font-semibold text-slate-900">
            Нечего показать
          </h1>
          <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
            Откройте статью в админке и нажмите «Предпросмотр» — здесь появится,
            как она будет выглядеть на сайте.
          </p>
        </Container>
      </div>
    );
  }

  const isDraft = material.status !== "published";

  return (
    <>
      <div className="border-b border-amber-200 bg-amber-50">
        <Container className="flex items-center gap-2 px-4 py-2.5 text-sm text-amber-900 sm:px-6">
          <Eye className="size-4 shrink-0" aria-hidden />
          <p className="min-w-0">
            <span className="font-semibold">Предпросмотр</span>
            {isDraft ? " · черновик" : ""} — так статья будет выглядеть на
            сайте. Несохранённые правки видны только вам.
          </p>
        </Container>
      </div>
      <LibraryArticle
        material={material}
        related={[]}
        url={`${SITE_URL}/library/${material.id}`}
      />
    </>
  );
}
