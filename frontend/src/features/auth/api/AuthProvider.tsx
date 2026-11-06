"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type {
  AuthProfile,
  AuthUser,
  LoginPayload,
  PlatformRole,
  RegisterPayload,
  UpdateProfilePayload,
} from "@/entities/session";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "@/shared/auth";

import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
  updateProfileRequest,
} from "./api";
import { profileToAuthUser } from "./authUtils";

type SessionPayload = {
  user: { id: string; email: string };
  profile: AuthProfile;
  role: PlatformRole;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: PlatformRole | null;
  user: AuthUser | null;
  profile: AuthProfile | null;
  login: (payload: LoginPayload) => Promise<{ role: PlatformRole }>;
  register: (payload: RegisterPayload) => Promise<void>;
  updateProfile: (payload: UpdateProfilePayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const SESSION_CACHE_KEY = "akyl_session_cache";

/** The cache is bound to the current token so a new login never reuses it. */
function tokenFingerprint(token: string): string {
  return token.slice(-24);
}

function readSessionCache(): SessionPayload | null {
  try {
    const token = getAccessToken();
    const raw = localStorage.getItem(SESSION_CACHE_KEY);
    if (!token || !raw) return null;
    const parsed = JSON.parse(raw) as { fp: string; data: SessionPayload };
    return parsed.fp === tokenFingerprint(token) ? parsed.data : null;
  } catch {
    return null;
  }
}

function writeSessionCache(data: SessionPayload): void {
  try {
    const token = getAccessToken();
    if (!token) return;
    localStorage.setItem(
      SESSION_CACHE_KEY,
      JSON.stringify({ fp: tokenFingerprint(token), data }),
    );
  } catch {
    // storage unavailable — cache is optional
  }
}

function clearSessionCache(): void {
  try {
    localStorage.removeItem(SESSION_CACHE_KEY);
  } catch {
    // ignore
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [role, setRole] = useState<PlatformRole | null>(null);

  const applySession = useCallback((me: SessionPayload) => {
    setUser(profileToAuthUser(me.user, me.profile));
    setProfile(me.profile);
    setRole(me.role);
    writeSessionCache(me);
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setProfile(null);
    setRole(null);
    clearAccessToken();
    clearSessionCache();
  }, []);

  const refresh = useCallback(async () => {
    const token = getAccessToken();
    if (!token) {
      clearSession();
      return;
    }

    try {
      const me = await meRequest();
      applySession(me);
    } catch (error) {
      // Keep the cached session on network hiccups; drop it only when the
      // backend rejects the token or the account.
      const status =
        error instanceof Error && "status" in error
          ? Number((error as { status: unknown }).status)
          : 0;
      if (status === 401 || status === 403 || !readSessionCache()) {
        clearSession();
      }
    }
  }, [applySession, clearSession]);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
      // Render the cabinet immediately from the last known session and
      // re-validate it in the background instead of showing a spinner.
      const cached = readSessionCache();
      if (cached) {
        setUser(profileToAuthUser(cached.user, cached.profile));
        setProfile(cached.profile);
        setRole(cached.role);
        setIsLoading(false);
      }
    }
    void (async () => {
      await refresh();
      setIsLoading(false);
    })();
  }, [refresh]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await loginRequest(payload);
      applySession(session);
      return { role: session.role };
    },
    [applySession],
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    // Creates account only — no session / token. User must log in separately.
    clearAccessToken();
    await registerRequest(payload);
    clearAccessToken();
  }, []);

  const updateProfile = useCallback(
    async (payload: UpdateProfilePayload) => {
      const me = await updateProfileRequest(payload);
      applySession(me);
    },
    [applySession],
  );

  const logout = useCallback(async () => {
    await logoutRequest();
    clearSession();
    router.push("/login");
  }, [clearSession, router]);

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(user && role),
      isLoading,
      role,
      user,
      profile,
      login,
      register,
      updateProfile,
      logout,
      refresh,
    }),
    [
      user,
      role,
      profile,
      isLoading,
      login,
      register,
      updateProfile,
      logout,
      refresh,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}

export { getRoleDashboardPath } from "@/entities/session";
export { AuthApiError } from "./api";
