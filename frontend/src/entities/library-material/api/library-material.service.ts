import { API_URL, apiFetch } from "@/shared/api";

import type {
  LibraryMaterial,
  LibraryMaterialPayload,
  LibraryMaterialSummary,
} from "../model/types";

const BASE = "/api/library";

export function fetchPublishedMaterials(): Promise<LibraryMaterialSummary[]> {
  return apiFetch<LibraryMaterialSummary[]>(`${BASE}/materials`);
}

/** Admin only: includes drafts. */
export function fetchAllMaterials(): Promise<LibraryMaterialSummary[]> {
  return apiFetch<LibraryMaterialSummary[]>(`${BASE}/materials?all=1`);
}

export function fetchMaterial(id: string): Promise<LibraryMaterial> {
  return apiFetch<LibraryMaterial>(
    `${BASE}/materials/${encodeURIComponent(id)}`,
  );
}

export function createMaterial(
  payload: LibraryMaterialPayload,
): Promise<LibraryMaterial> {
  return apiFetch<LibraryMaterial>(`${BASE}/materials`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateMaterial(
  id: string,
  payload: Partial<LibraryMaterialPayload>,
): Promise<LibraryMaterial> {
  return apiFetch<LibraryMaterial>(
    `${BASE}/materials/${encodeURIComponent(id)}`,
    { method: "PATCH", body: JSON.stringify(payload) },
  );
}

export async function deleteMaterial(id: string): Promise<void> {
  await apiFetch<void>(`${BASE}/materials/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}

export function uploadLibraryImage(
  file: File,
): Promise<{ url: string; path: string }> {
  const form = new FormData();
  form.append("image", file);
  return apiFetch<{ url: string; path: string }>(`${BASE}/upload-image`, {
    method: "POST",
    body: form,
    skipJsonContentType: true,
  });
}

async function serverGet<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${API_URL}${path}`, {
      next: { revalidate: 60 },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { success: boolean; data?: T };
    return body.success && body.data !== undefined ? body.data : null;
  } catch {
    return null;
  }
}

/**
 * Server-side fetch for the public article page.
 *
 * Never cached: Next.js keeps only 200 responses in its data cache, so once an
 * article was deleted or unpublished (API answers 404) a cached copy would keep
 * being served forever. Returns null only when the API says the material does
 * not exist or is not published; other failures throw, so an API outage shows
 * an error page instead of telling visitors and crawlers "not found".
 */
export async function fetchPublishedMaterialOnServer(
  id: string,
): Promise<LibraryMaterial | null> {
  const response = await fetch(
    `${API_URL}${BASE}/materials/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );
  if (response.status === 404) return null;
  if (!response.ok) {
    throw new Error(`Library API responded with ${response.status}`);
  }
  const body = (await response.json()) as {
    success: boolean;
    data?: LibraryMaterial;
  };
  return body.success && body.data ? body.data : null;
}

/** Server-side list for the public library (null when the API is down). */
export function fetchPublishedMaterialsOnServer(): Promise<
  LibraryMaterialSummary[] | null
> {
  return serverGet<LibraryMaterialSummary[]>(`${BASE}/materials`);
}
