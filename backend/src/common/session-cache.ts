import type { AuthUserResponse, Profile } from "../modules/auth/auth.types.js";

/**
 * Short-lived in-memory cache of verified sessions (token → user + profile).
 * Every authenticated request used to call Supabase Auth and load the profile;
 * caching for a few seconds removes two network round-trips per request.
 * Entries for a user are dropped as soon as their role/status/profile changes.
 */
export type CachedSession = {
  user: AuthUserResponse;
  profile: Profile;
};

const TTL_MS = 30_000;
const MAX_ENTRIES = 500;

const cache = new Map<string, CachedSession & { expiresAt: number }>();

export function getCachedSession(token: string): CachedSession | null {
  const entry = cache.get(token);
  if (!entry) return null;
  if (entry.expiresAt <= Date.now()) {
    cache.delete(token);
    return null;
  }
  return { user: entry.user, profile: entry.profile };
}

export function setCachedSession(token: string, session: CachedSession): void {
  if (cache.size >= MAX_ENTRIES) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  cache.set(token, { ...session, expiresAt: Date.now() + TTL_MS });
}

export function invalidateUserSessions(userId: string): void {
  for (const [token, entry] of cache) {
    if (entry.user.id === userId) cache.delete(token);
  }
}

export function clearSessionCache(): void {
  cache.clear();
}
