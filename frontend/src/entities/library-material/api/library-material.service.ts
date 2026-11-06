import { API_URL, apiFetch } from "@/shared/api";

import type { LibraryMaterial, LibraryMaterialPayload } from "../model/types";

const BASE = "/api/library";

export function fetchPublishedMaterials(): Promise<LibraryMaterial[]> {
  return apiFetch<LibraryMaterial[]>(`${BASE}/materials`);
}

/** Admin only: includes drafts. */
export function fetchAllMaterials(): Promise<LibraryMaterial[]> {
  return apiFetch<LibraryMaterial[]>(`${BASE}/materials?all=1`);
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

/**
 * Server-side fetch for the public article page (no auth, ISR-friendly).
 * Returns null when the material does not exist or is not published.
 */
export async function fetchPublishedMaterialOnServer(
  id: string,
): Promise<LibraryMaterial | null> {
  try {
    const response = await fetch(
      `${API_URL}${BASE}/materials/${encodeURIComponent(id)}`,
      { next: { revalidate: 60 } },
    );
    if (!response.ok) return null;
    const body = (await response.json()) as {
      success: boolean;
      data?: LibraryMaterial;
    };
    return body.success && body.data ? body.data : null;
  } catch {
    return null;
  }
}
