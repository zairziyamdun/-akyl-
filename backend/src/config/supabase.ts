import dotenv from "dotenv";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

dotenv.config();

let supabaseClient: SupabaseClient | null = null;

function normalizeSupabaseUrl(url: string): string {
  let normalized = url.trim().replace(/\/+$/, "");

  // Some dashboards copy the REST endpoint instead of the project URL.
  normalized = normalized.replace(/\/rest\/v1\/?$/i, "");

  return normalized;
}

function getRequiredEnv(name: "SUPABASE_URL"): string {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(
      `Missing required environment variable: ${name}. Copy .env.example to .env and set Supabase credentials.`,
    );
  }

  return normalizeSupabaseUrl(value);
}

function getSupabaseSecretKey(): string {
  const secretKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY?.trim() ||
    process.env.SUPABASE_SECRET_KEY?.trim();

  if (!secretKey) {
    throw new Error(
      "Missing required environment variable: SUPABASE_SECRET_KEY. Copy .env.example to .env and set Supabase credentials.",
    );
  }

  return secretKey;
}

function createSupabaseClient(): SupabaseClient {
  const supabaseUrl = getRequiredEnv("SUPABASE_URL");
  const secretKey = getSupabaseSecretKey();

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient();
  }

  return supabaseClient;
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseClient();
    const value = Reflect.get(client, prop, client);

    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }

    return value;
  },
});
