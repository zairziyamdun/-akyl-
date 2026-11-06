import { z } from "zod";

export const libraryMaterialTypeSchema = z.enum([
  "article",
  "research",
  "regulation",
  "template",
  "video",
]);

export const libraryMaterialStatusSchema = z.enum(["draft", "published"]);

const optionalText = z
  .string()
  .trim()
  .max(100)
  .transform((value) => (value.length > 0 ? value : null))
  .nullable()
  .optional();

/** Only images uploaded to our Storage bucket (or empty) are accepted as cover. */
const coverUrlSchema = z
  .string()
  .trim()
  .max(2000)
  .refine((value) => value === "" || /^https:\/\//i.test(value), {
    message: "Cover URL must be an https URL",
  })
  .transform((value) => (value.length > 0 ? value : null))
  .nullable()
  .optional();

export const createLibraryMaterialSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300),
  type: libraryMaterialTypeSchema.default("article"),
  topic: z.string().trim().min(1, "Topic is required").max(120),
  description: z.string().trim().max(1000).default(""),
  content: z.string().max(200_000).default(""),
  cover_url: coverUrlSchema,
  read_time: optionalText,
  format: optionalText,
  status: libraryMaterialStatusSchema.default("draft"),
});

export const updateLibraryMaterialSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(300).optional(),
  type: libraryMaterialTypeSchema.optional(),
  topic: z.string().trim().min(1, "Topic is required").max(120).optional(),
  description: z.string().trim().max(1000).optional(),
  content: z.string().max(200_000).optional(),
  cover_url: coverUrlSchema,
  read_time: optionalText,
  format: optionalText,
  status: libraryMaterialStatusSchema.optional(),
});

export type LibraryMaterialType = z.infer<typeof libraryMaterialTypeSchema>;
export type LibraryMaterialStatus = z.infer<typeof libraryMaterialStatusSchema>;
export type CreateLibraryMaterialInput = z.infer<
  typeof createLibraryMaterialSchema
>;
export type UpdateLibraryMaterialInput = z.infer<
  typeof updateLibraryMaterialSchema
>;

export type LibraryMaterial = {
  id: string;
  title: string;
  type: LibraryMaterialType;
  topic: string;
  description: string;
  content: string;
  cover_url: string | null;
  read_time: string | null;
  format: string | null;
  status: LibraryMaterialStatus;
  published_at: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUuid(value: string): boolean {
  return UUID_RE.test(value);
}
