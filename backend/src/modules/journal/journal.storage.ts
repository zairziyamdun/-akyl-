import { randomUUID } from "node:crypto";

import { ValidationError } from "../../common/errors.js";
import { getSupabaseAdmin } from "../../config/supabase.js";
import {
  JOURNAL_PDF_BUCKET,
  JOURNAL_PDF_MAX_BYTES,
} from "./journal.upload.constants.js";

export const COVERS_BUCKET = "journal-covers";
export const PDFS_BUCKET = JOURNAL_PDF_BUCKET;

const COVER_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const PDF_MIME_TYPE = "application/pdf";

const COVER_MAX_BYTES = 10 * 1024 * 1024;
export const PDF_MAX_BYTES = JOURNAL_PDF_MAX_BYTES;

const SIGNED_URL_TTL_SECONDS = 60 * 10;

function sanitizeFilename(name: string): string {
  const base = name.replace(/[^a-zA-Z0-9._-]/g, "_");
  return base.length > 0 ? base : "file";
}

function storagePath(originalName: string): string {
  const year = new Date().getFullYear();
  return `${year}/${randomUUID()}-${sanitizeFilename(originalName)}`;
}

export function assertCoverFile(file: Express.Multer.File | undefined): Express.Multer.File {
  if (!file) {
    throw new ValidationError("Cover file is required");
  }
  if (!COVER_MIME_TYPES.has(file.mimetype)) {
    throw new ValidationError("Only JPEG, PNG and WebP images are allowed");
  }
  if (file.size > COVER_MAX_BYTES) {
    throw new ValidationError("Cover file must be at most 10 MB");
  }
  return file;
}

export function assertPdfFile(file: Express.Multer.File | undefined): Express.Multer.File {
  if (!file) {
    throw new ValidationError("PDF file is required");
  }
  if (file.mimetype !== PDF_MIME_TYPE) {
    throw new ValidationError("Only PDF files are allowed");
  }
  if (file.size > PDF_MAX_BYTES) {
    throw new ValidationError("PDF file must be at most 50 MB");
  }
  return file;
}

export async function uploadCoverToStorage(
  file: Express.Multer.File,
): Promise<{ url: string; path: string }> {
  const path = storagePath(file.originalname);
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage.from(COVERS_BUCKET).upload(path, file.buffer, {
    contentType: file.mimetype,
    upsert: false,
  });

  if (error) {
    throw new ValidationError(`Failed to upload cover: ${error.message}`);
  }

  const { data } = supabase.storage.from(COVERS_BUCKET).getPublicUrl(path);

  return { url: data.publicUrl, path };
}

export async function uploadPdfToStorage(
  file: Express.Multer.File,
): Promise<{ path: string; fileName: string; size: number }> {
  const path = storagePath(file.originalname);
  const supabase = getSupabaseAdmin();

  const { error } = await supabase.storage.from(PDFS_BUCKET).upload(path, file.buffer, {
    contentType: PDF_MIME_TYPE,
    upsert: false,
  });

  if (error) {
    throw new ValidationError(`Failed to upload PDF: ${error.message}`);
  }

  return {
    path,
    fileName: file.originalname,
    size: file.size,
  };
}

export type SignedPdfUpload = {
  path: string;
  fileName: string;
  signedUrl: string;
  token: string;
  bucket: string;
  maxBytes: number;
};

export async function createSignedPdfUploadUrl(
  originalName: string,
  fileSize: number,
): Promise<SignedPdfUpload> {
  if (fileSize > PDF_MAX_BYTES) {
    throw new ValidationError(
      `PDF file must be at most ${Math.floor(PDF_MAX_BYTES / (1024 * 1024))} MB`,
    );
  }

  const path = storagePath(originalName);
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(PDFS_BUCKET)
    .createSignedUploadUrl(path);

  if (error || !data?.signedUrl || !data.token) {
    throw new ValidationError(
      `Failed to create signed upload URL: ${error?.message ?? "unknown error"}`,
    );
  }

  return {
    path,
    fileName: originalName,
    signedUrl: data.signedUrl,
    token: data.token,
    bucket: PDFS_BUCKET,
    maxBytes: PDF_MAX_BYTES,
  };
}

export async function createSignedPdfUrl(storagePath: string): Promise<string> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage
    .from(PDFS_BUCKET)
    .createSignedUrl(storagePath, SIGNED_URL_TTL_SECONDS);

  if (error || !data?.signedUrl) {
    throw new ValidationError("Failed to create signed PDF URL");
  }

  return data.signedUrl;
}

export async function downloadPdfFromStorage(storagePath: string): Promise<Buffer> {
  const supabase = getSupabaseAdmin();

  const { data, error } = await supabase.storage.from(PDFS_BUCKET).download(storagePath);

  if (error || !data) {
    throw new ValidationError(`Failed to download PDF: ${error?.message ?? "unknown"}`);
  }

  return Buffer.from(await data.arrayBuffer());
}
