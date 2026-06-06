"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import {
  loginRequest,
  logoutRequest,
  meRequest,
  registerRequest,
  AuthApiError,
} from "./api";
import { profileToAuthUser, getRoleDashboardPath } from "./authUtils";
import { clearAccessToken, getAccessToken } from "./token";
import type {
  AkylRole,
  AuthProfile,
  AuthUser,
  LoginPayload,
  RegisterPayload,
} from "./types";

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: AkylRole | null;
  user: AuthUser | null;
  profile: AuthProfile | null;
  login: (payload: LoginPayload) => Promise<AkylRole>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<AuthProfile | null>(null);
  const [role, setRole] = useState<AkylRole | null>(null);

  const applySession = useCallback(
    (me: { user: { id: string; email: string }; profile: AuthProfile; role: AkylRole }) => {
      setUser(profileToAuthUser(me.user, me.profile));
      setProfile(me.profile);
      setRole(me.role);
    },
    [],
  );

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
    void (async () => {
      await refresh();
      setIsLoading(false);
    })();
  }, [refresh]);

  const login = useCallback(
    async (payload: LoginPayload) => {
      const session = await loginRequest(payload);
      applySession(session);
      return session.role;
    },
    [applySession],
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    await registerRequest(payload);
  }, []);

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
      logout,
      refresh,
    }),
    [user, role, profile, isLoading, login, register, logout, refresh],
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

/** @deprecated Use useAuth — kept for existing imports */
export function useMockAuth() {
  const auth = useAuth();
  return {
    isAuthenticated: auth.isAuthenticated,
    role: auth.role ?? ("user" as AkylRole),
    user: auth.user ?? {
      id: "",
      name: "",
      email: "",
      organization: "",
      initials: "?",
    },
    isLoading: auth.isLoading,
    login: auth.login,
    register: auth.register,
    logout: auth.logout,
  };
}

export { getRoleDashboardPath, AuthApiError };
