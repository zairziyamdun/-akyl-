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
 * Server-side fetch for the public article page (no auth, cached for 60s).
 * Returns null when the material does not exist or is not published.
 */
export function fetchPublishedMaterialOnServer(
  id: string,
): Promise<LibraryMaterial | null> {
  return serverGet<LibraryMaterial>(
    `${BASE}/materials/${encodeURIComponent(id)}`,
  );
}

/** Server-side list for the public library (null when the API is down). */
export function fetchPublishedMaterialsOnServer(): Promise<
  LibraryMaterialSummary[] | null
> {
  return serverGet<LibraryMaterialSummary[]>(`${BASE}/materials`);
}
