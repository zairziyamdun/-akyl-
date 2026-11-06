import { randomUUID } from "node:crypto";

import {
  DatabaseError,
  NotFoundError,
  ValidationError,
} from "../../common/errors.js";
import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  type CreateLibraryMaterialInput,
  isUuid,
  type LibraryMaterial,
  type UpdateLibraryMaterialInput,
} from "./library.schema.js";
import {
  hasImageSignature,
  LIBRARY_IMAGE_MAX_BYTES,
  LIBRARY_IMAGE_MIME_TYPES,
  LIBRARY_IMAGES_BUCKET,
} from "./library.image.js";

const TABLE = "library_materials";
const TABLE_MISSING_MESSAGE =
  "Таблица library_materials не найдена. Примените SQL из backend/docs/library_materials.sql в Supabase SQL Editor";

type DbError = { code?: string; message?: string } | null;

function throwDbError(fallback: string, error: DbError): never {
  const message = (error?.message ?? "").toLowerCase();
  if (
    error?.code === "PGRST205" ||
    (message.includes("could not find the table") && message.includes(TABLE))
  ) {
    throw new DatabaseError(TABLE_MISSING_MESSAGE, error);
  }
  throw new DatabaseError(fallback, error);
}

function assertId(id: string): void {
  if (!isUuid(id)) {
    throw new NotFoundError("Material not found");
  }
}

/** List views never need the article body — skipping it keeps responses small. */
const SUMMARY_COLUMNS =
  "id, title, type, topic, description, cover_url, read_time, format, status, published_at, created_by, created_at, updated_at";

export type LibraryMaterialSummary = Omit<LibraryMaterial, "content">;

export async function listLibraryMaterials(options: {
  includeDrafts: boolean;
}): Promise<LibraryMaterialSummary[]> {
  const base = getSupabaseAdmin().from(TABLE).select(SUMMARY_COLUMNS);

  const query = options.includeDrafts
    ? base.order("updated_at", { ascending: false })
    : base
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .order("created_at", { ascending: false });

  const { data, error } = await query;

  if (error) {
    throwDbError("Failed to list library materials", error);
  }

  return (data ?? []) as unknown as LibraryMaterialSummary[];
}

export async function getLibraryMaterial(
  id: string,
  options: { includeDrafts: boolean },
): Promise<LibraryMaterial> {
  assertId(id);

  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throwDbError("Failed to load library material", error);
  }

  const material = data as LibraryMaterial | null;

  if (
    !material ||
    (material.status !== "published" && !options.includeDrafts)
  ) {
    throw new NotFoundError("Material not found");
  }

  return material;
}

export async function createLibraryMaterial(
  input: CreateLibraryMaterialInput,
  userId: string,
): Promise<LibraryMaterial> {
  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .insert({
      ...input,
      cover_url: input.cover_url ?? null,
      read_time: input.read_time ?? null,
      format: input.format ?? null,
      published_at:
        input.status === "published" ? new Date().toISOString() : null,
      created_by: userId,
    })
    .select("*")
    .single();

  if (error || !data) {
    throwDbError("Failed to create library material", error);
  }

  return data as LibraryMaterial;
}

export async function updateLibraryMaterial(
  id: string,
  input: UpdateLibraryMaterialInput,
): Promise<LibraryMaterial> {
  const existing = await getLibraryMaterial(id, { includeDrafts: true });

  const patch: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(input)) {
    if (value !== undefined) patch[key] = value;
  }

  if (input.status === "published" && existing.status !== "published") {
    patch.published_at = new Date().toISOString();
  }

  if (Object.keys(patch).length === 0) {
    return existing;
  }

  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .update(patch)
    .eq("id", id)
    .select("*")
    .single();

  if (error || !data) {
    throwDbError("Failed to update library material", error);
  }

  return data as LibraryMaterial;
}

export async function deleteLibraryMaterial(id: string): Promise<void> {
  assertId(id);

  const { data, error } = await getSupabaseAdmin()
    .from(TABLE)
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throwDbError("Failed to delete library material", error);
  }

  if (!data || data.length === 0) {
    throw new NotFoundError("Material not found");
  }
}

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(-80);
  return base.length > 0 ? base : "image";
}

export function assertLibraryImage(
  file: Express.Multer.File | undefined,
): Express.Multer.File {
  if (!file) {
    throw new ValidationError("Image file is required");
  }
  if (!LIBRARY_IMAGE_MIME_TYPES.has(file.mimetype)) {
    throw new ValidationError("Only JPEG, PNG, WebP and GIF images are allowed");
  }
  if (file.size > LIBRARY_IMAGE_MAX_BYTES) {
    throw new ValidationError("Image must be at most 10 MB");
  }
  if (!hasImageSignature(file.buffer, file.mimetype)) {
    throw new ValidationError("File content does not match an image format");
  }
  return file;
}

export async function uploadLibraryImage(
  file: Express.Multer.File,
): Promise<{ url: string; path: string }> {
  const path = `${new Date().getFullYear()}/${randomUUID()}-${sanitizeFilename(file.originalname)}`;
  const storage = getSupabaseAdmin().storage.from(LIBRARY_IMAGES_BUCKET);

  const { error } = await storage.upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) {
    throw new ValidationError(`Failed to upload image: ${error.message}`);
  }

  const { data } = storage.getPublicUrl(path);
  return { url: data.publicUrl, path };
}
