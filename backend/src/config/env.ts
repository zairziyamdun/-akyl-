import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

function normalizeSupabaseUrl(url: string): string {
  let normalized = url.trim().replace(/\/+$/, "");
  normalized = normalized.replace(/\/rest\/v1\/?$/i, "");
  return normalized;
}

const envSchema = z
  .object({
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    PORT: z.coerce.number().int().positive().default(4000),
    SUPABASE_URL: z.string().min(1).transform(normalizeSupabaseUrl),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional(),
    SUPABASE_SECRET_KEY: z.string().min(1).optional(),
    FRONTEND_URL: z
      .string()
      .min(1)
      .default("http://localhost:3000")
      .refine(
        (value) =>
          value.split(",").every((part) => {
            try {
              new URL(part.trim());
              return true;
            } catch {
              return false;
            }
          }),
        { message: "FRONTEND_URL must be a valid URL or comma-separated URLs" },
      ),
    TELEGRAM_BOT_TOKEN: z.string().min(1).optional(),
    TELEGRAM_CHAT_ID: z.string().min(1).optional(),
  })
  .refine(
    (data) =>
      Boolean(data.SUPABASE_SERVICE_ROLE_KEY || data.SUPABASE_SECRET_KEY),
    {
      message:
        "Either SUPABASE_SERVICE_ROLE_KEY or SUPABASE_SECRET_KEY is required",
      path: ["SUPABASE_SECRET_KEY"],
    },
  );

type ParsedEnv = z.infer<typeof envSchema>;

export type Env = ParsedEnv & {
  supabaseKey: string;
};

function loadEnv(): Env {
  const parsed = envSchema.parse(process.env);

  return {
    ...parsed,
    supabaseKey:
      parsed.SUPABASE_SERVICE_ROLE_KEY ?? parsed.SUPABASE_SECRET_KEY!,
  };
}

/** Comma-separated FRONTEND_URL values → allowed browser origins. */
export function getAllowedOrigins(): string[] {
  const raw = process.env.FRONTEND_URL ?? "http://localhost:3000";
  return raw
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
}

export const env = loadEnv();
