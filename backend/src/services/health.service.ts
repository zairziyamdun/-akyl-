import { supabase } from "../config/supabase.js";

export type HealthResponse = {
  status: "ok";
  service: "akyl-backend";
};

export type SupabaseHealthResponse = {
  status: "ok";
  supabase: "connected" | "client_created";
};

export function getHealth(): HealthResponse {
  return {
    status: "ok",
    service: "akyl-backend",
  };
}

export async function getSupabaseHealth(): Promise<SupabaseHealthResponse> {
  // Client is created lazily on first access — throws if env is missing.
  if (!supabase) {
    throw new Error("Supabase client was not created");
  }

  const { error } = await supabase
    .from("_akyl_health_check")
    .select("*", { head: true, count: "exact" });

  if (!error) {
    return {
      status: "ok",
      supabase: "connected",
    };
  }

  const message = error.message.toLowerCase();
  const code = error.code ?? "";

  if (
    code === "PGRST205" ||
    message.includes("does not exist") ||
    message.includes("could not find the table") ||
    message.includes("schema cache")
  ) {
    return {
      status: "ok",
      supabase: "connected",
    };
  }

  if (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("econnrefused") ||
    message.includes("enotfound") ||
    message.includes("invalid path")
  ) {
    throw new Error(`Supabase connection failed: ${error.message}`);
  }

  if (
    message.includes("invalid") ||
    message.includes("jwt") ||
    message.includes("apikey") ||
    message.includes("unauthorized") ||
    message.includes("permission denied")
  ) {
    throw new Error(`Supabase authentication failed: ${error.message}`);
  }

  return {
    status: "ok",
    supabase: "client_created",
  };
}
