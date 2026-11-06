"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import {
  LIBRARY_TOPIC_PARAM,
  type LibraryMaterialSummary,
} from "@/entities/library-material";

import { LibraryMain } from "./LibraryMain";

/**
 * Library list whose topic filter lives in the URL (`/library?topic=…`), so a
 * filtered view can be shared and article pages can link to their topic.
 * Render inside <Suspense>: it reads search params.
 */
export function LibraryMainRouted({
  initialMaterials,
}: {
  initialMaterials?: LibraryMaterialSummary[] | null;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const topic = searchParams.get(LIBRARY_TOPIC_PARAM);

  const setTopic = useCallback(
    (next: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next) params.set(LIBRARY_TOPIC_PARAM, next);
      else params.delete(LIBRARY_TOPIC_PARAM);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [router, pathname, searchParams],
  );

  return (
    <LibraryMain
      initialMaterials={initialMaterials}
      topic={topic}
      onTopicChange={setTopic}
    />
  );
}
