import { ExternalServiceError } from "../common/errors.js";
import { supabase } from "../config/supabase.js";

export type HealthData = {
  status: "ok";
  service: "akyl-backend";
};

export type SupabaseHealthData = {
  status: "ok";
  supabase: "connected" | "client_created";
};

export function getHealth(): HealthData {
  return {
    status: "ok",
    service: "akyl-backend",
  };
}

export async function getSupabaseHealth(): Promise<SupabaseHealthData> {
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
    throw new ExternalServiceError(
      "Supabase connection failed",
      error,
    );
  }

  if (
    message.includes("invalid") ||
    message.includes("jwt") ||
    message.includes("apikey") ||
    message.includes("unauthorized") ||
    message.includes("permission denied")
  ) {
    throw new ExternalServiceError(
      "Supabase authentication failed",
      error,
    );
  }

  return {
    status: "ok",
    supabase: "client_created",
  };
}
