import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { env } from "./env.js";

function createSupabaseClient(): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.supabaseKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

let adminClient: SupabaseClient | null = null;

/**
 * Service-role singleton for DB/admin operations.
 * Never call signInWithPassword on this client — it would switch the session
 * to the end-user JWT and profile queries would hit RLS instead of bypassing it.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (!adminClient) {
    adminClient = createSupabaseClient();
  }

  return adminClient;
}

/** Fresh client per login — safe to call signInWithPassword, then discard. */
export function createSupabaseAuthClient(): SupabaseClient {
  return createSupabaseClient();
}

/** @deprecated Prefer getSupabaseAdmin() */
export function getSupabaseClient(): SupabaseClient {
  return getSupabaseAdmin();
}

export const supabase: SupabaseClient = new Proxy({} as SupabaseClient, {
  get(_target, prop) {
    const client = getSupabaseAdmin();
    const value = Reflect.get(client, prop, client);

    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }

    return value;
  },
});
