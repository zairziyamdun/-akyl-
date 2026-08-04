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
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setProfile(null);
    setRole(null);
    clearAccessToken();
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
    } catch {
      clearSession();
    }
  }, [applySession, clearSession]);

  useEffect(() => {
    const token = getAccessToken();
    if (token) {
      setAccessToken(token);
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
