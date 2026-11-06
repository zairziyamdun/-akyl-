import type { LibraryMaterial } from "./types";

/**
 * Draft preview hand-off between the admin editor and `/library/preview`.
 * The editor stores a snapshot of the current (possibly unsaved) form in
 * localStorage and opens the preview tab, which renders it exactly like the
 * public article. Nothing is sent to the server.
 */

export const LIBRARY_PREVIEW_STORAGE_KEY = "akyl:library-preview";
export const LIBRARY_PREVIEW_PATH = "/library/preview";
/** Named window, so repeated clicks refresh one preview tab. */
export const LIBRARY_PREVIEW_WINDOW = "akyl-library-preview";

export function writeLibraryPreview(material: LibraryMaterial): boolean {
  try {
    window.localStorage.setItem(
      LIBRARY_PREVIEW_STORAGE_KEY,
      JSON.stringify(material),
    );
    return true;
  } catch {
    return false;
  }
}

export function readLibraryPreview(): LibraryMaterial | null {
  try {
    const raw = window.localStorage.getItem(LIBRARY_PREVIEW_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Partial<LibraryMaterial>;
    return typeof data?.title === "string" && typeof data?.content === "string"
      ? (data as LibraryMaterial)
      : null;
  } catch {
    return null;
  }
}
