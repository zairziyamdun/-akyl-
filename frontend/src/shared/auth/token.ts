const TOKEN_KEY = "akyl_access_token";
const COOKIE_KEY = "akyl_access_token";
/** 7 days — synced cookie for Next.js middleware (not HttpOnly yet). */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

/**
 * Sync client cookie so Next.js middleware can read auth on the next request.
 * Cookie Store API is async and not safe as a drop-in here.
 * TODO: replace with HttpOnly cookie set by backend response.
 */
function writeAuthCookie(value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  // biome-ignore lint/suspicious/noDocumentCookie: sync mirror for middleware; HttpOnly planned
  document.cookie = `${COOKIE_KEY}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  writeAuthCookie(token, COOKIE_MAX_AGE);
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  writeAuthCookie("", 0);
}

export { COOKIE_KEY as AUTH_COOKIE_KEY };
