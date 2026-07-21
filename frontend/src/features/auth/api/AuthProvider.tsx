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
  HouseMembership,
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
  houseMemberships?: HouseMembership[];
  canAccessManagerCabinet?: boolean;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  isLoading: boolean;
  role: PlatformRole | null;
  user: AuthUser | null;
  profile: AuthProfile | null;
  houseMemberships: HouseMembership[];
  canAccessManagerCabinet: boolean;
  login: (payload: LoginPayload) => Promise<{
    role: PlatformRole;
    canAccessManagerCabinet: boolean;
  }>;
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
  const [houseMemberships, setHouseMemberships] = useState<HouseMembership[]>(
    [],
  );
  const [canAccessManagerCabinet, setCanAccessManagerCabinet] = useState(false);

  const applySession = useCallback((me: SessionPayload) => {
    setUser(profileToAuthUser(me.user, me.profile));
    setProfile(me.profile);
    setRole(me.role);
    setHouseMemberships(me.houseMemberships ?? []);
    setCanAccessManagerCabinet(Boolean(me.canAccessManagerCabinet));
  }, []);

  const clearSession = useCallback(() => {
    setUser(null);
    setProfile(null);
    setRole(null);
    setHouseMemberships([]);
    setCanAccessManagerCabinet(false);
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
      return {
        role: session.role,
        canAccessManagerCabinet: Boolean(session.canAccessManagerCabinet),
      };
    },
    [applySession],
  );

  const register = useCallback(async (payload: RegisterPayload) => {
    await registerRequest(payload);
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
      houseMemberships,
      canAccessManagerCabinet,
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
      houseMemberships,
      canAccessManagerCabinet,
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

/** @deprecated Use useAuth — kept for existing imports */
export function useMockAuth() {
  const auth = useAuth();
  return {
    isAuthenticated: auth.isAuthenticated,
    role: auth.role ?? ("user" as PlatformRole),
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

export { getRoleDashboardPath } from "@/entities/session";
export { AuthApiError } from "./api";
