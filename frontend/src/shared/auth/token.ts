const TOKEN_KEY = "akyl_access_token";
const COOKIE_KEY = "akyl_access_token";
/** 7 days — synced cookie for Next.js middleware (not HttpOnly yet). */
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  if (typeof document !== "undefined") {
    // TODO: replace with HttpOnly cookie set by backend response
    document.cookie = `${COOKIE_KEY}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
  }
}

export function clearAccessToken(): void {
  localStorage.removeItem(TOKEN_KEY);
  if (typeof document !== "undefined") {
    document.cookie = `${COOKIE_KEY}=; path=/; max-age=0; SameSite=Lax`;
  }
}

export { COOKIE_KEY as AUTH_COOKIE_KEY };
