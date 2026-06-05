import { getSupabaseClient } from "../config/supabase.js";

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
  const supabase = getSupabaseClient();

  const { error } = await supabase.auth.admin.listUsers({
    page: 1,
    perPage: 1,
  });

  if (!error) {
    return {
      status: "ok",
      supabase: "connected",
    };
  }

  const message = error.message.toLowerCase();

  if (
    message.includes("fetch failed") ||
    message.includes("network") ||
    message.includes("econnrefused") ||
    message.includes("enotfound")
  ) {
    throw new Error(`Supabase connection failed: ${error.message}`);
  }

  if (
    message.includes("invalid") ||
    message.includes("jwt") ||
    message.includes("apikey") ||
    message.includes("unauthorized")
  ) {
    throw new Error(`Supabase authentication failed: ${error.message}`);
  }

  return {
    status: "ok",
    supabase: "client_created",
  };
}
