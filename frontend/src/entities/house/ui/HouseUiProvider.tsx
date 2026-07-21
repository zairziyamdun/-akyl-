"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { HouseMembership as SessionMembership } from "@/entities/session";
import { useAuth } from "@/features/auth";

import type { HouseMembershipStatus, HouseRole } from "../model/types";

// TEMPORARY: frontend-only per-house role override for UI testing.
// Remove after real house membership selection is the only source.

const STORAGE_HOUSE_KEY = "akyl.houseUi.selectedHouseId";
const STORAGE_OVERRIDES_KEY = "akyl.houseUi.roleOverridesByHouse";

const HOUSE_ROLES: readonly HouseRole[] = [
  "chairman",
  "manager",
  "accountant",
  "engineer",
  "dispatcher",
  "resident",
] as const;

/** UI membership for a selected house (never a global role). */
export type HouseCabinetMembership = {
  houseId: string;
  houseName?: string;
  houseRole: HouseRole;
  status: HouseMembershipStatus;
  id?: string;
  /** True when role comes from TEMPORARY override, not auth membership. */
  isTestOverride?: boolean;
};

export type HouseUiState = {
  selectedHouseId: string | null;
  /** Role in the selected house only — null if house not selected or no access. */
  selectedHouseRole: HouseRole | null;
  membership: HouseCabinetMembership | null;
};

type HouseUiContextValue = HouseUiState & {
  hydrated: boolean;
  houseNames: Record<string, string>;
  setHouseName: (houseId: string, name: string) => void;
  setSelectedHouseId: (houseId: string | null) => void;
  /**
   * TEMPORARY: override role for the currently selected house (dev testing).
   * Does not change profiles.role or other houses.
   */
  setTestHouseRole: (role: HouseRole) => void;
  clearTestHouseRole: () => void;
  resolveMembershipForHouse: (
    houseId: string | null,
  ) => HouseCabinetMembership | null;
  sessionMemberships: readonly SessionMembership[];
};

const HouseUiContext = createContext<HouseUiContextValue | null>(null);

function isHouseRole(value: string | null | undefined): value is HouseRole {
  return !!value && (HOUSE_ROLES as readonly string[]).includes(value);
}

function readStoredHouseId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(STORAGE_HOUSE_KEY);
}

function readRoleOverrides(): Record<string, HouseRole> {
  // TEMPORARY: frontend-only role switcher for UI testing.
  // Remove after real house membership selection is connected.
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_OVERRIDES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, string>;
    const result: Record<string, HouseRole> = {};
    for (const [houseId, role] of Object.entries(parsed)) {
      if (isHouseRole(role)) result[houseId] = role;
    }
    return result;
  } catch {
    return {};
  }
}

function mapSessionMembership(
  m: SessionMembership,
  houseName?: string,
): HouseCabinetMembership {
  return {
    id: m.id,
    houseId: m.houseId,
    houseName,
    houseRole: m.role,
    status: m.status,
  };
}

export function HouseUiProvider({ children }: { children: ReactNode }) {
  const { houseMemberships } = useAuth();
  const [selectedHouseId, setSelectedHouseIdState] = useState<string | null>(
    null,
  );
  const [roleOverrides, setRoleOverrides] = useState<Record<string, HouseRole>>(
    {},
  );
  const [houseNames, setHouseNames] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSelectedHouseIdState(readStoredHouseId());
    setRoleOverrides(readRoleOverrides());
    setHydrated(true);
  }, []);

  const setSelectedHouseId = useCallback((houseId: string | null) => {
    setSelectedHouseIdState(houseId);
    if (houseId) {
      window.localStorage.setItem(STORAGE_HOUSE_KEY, houseId);
    } else {
      window.localStorage.removeItem(STORAGE_HOUSE_KEY);
    }
  }, []);

  const setHouseName = useCallback((houseId: string, name: string) => {
    setHouseNames((prev) =>
      prev[houseId] === name ? prev : { ...prev, [houseId]: name },
    );
  }, []);

  const resolveMembershipForHouse = useCallback(
    (houseId: string | null): HouseCabinetMembership | null => {
      if (!houseId) return null;

      const houseName = houseNames[houseId];
      const session = houseMemberships.find(
        (m) => m.houseId === houseId && m.status === "active",
      );
      const override = roleOverrides[houseId];

      if (override) {
        return {
          houseId,
          houseName,
          houseRole: override,
          status: session?.status ?? "active",
          id: session?.id,
          isTestOverride: true,
        };
      }

      if (session) {
        return mapSessionMembership(session, houseName);
      }

      if (process.env.NODE_ENV === "development") {
        return {
          houseId,
          houseName,
          houseRole: "chairman",
          status: "active",
          isTestOverride: true,
        };
      }

      return null;
    },
    [houseMemberships, roleOverrides, houseNames],
  );

  const membership = useMemo(
    () => resolveMembershipForHouse(selectedHouseId),
    [resolveMembershipForHouse, selectedHouseId],
  );

  const setTestHouseRole = useCallback(
    (role: HouseRole) => {
      // TEMPORARY: frontend-only role switcher for UI testing.
      // Remove after real house membership selection is connected.
      if (!selectedHouseId) return;
      setRoleOverrides((prev) => {
        const next = { ...prev, [selectedHouseId]: role };
        window.localStorage.setItem(
          STORAGE_OVERRIDES_KEY,
          JSON.stringify(next),
        );
        return next;
      });
    },
    [selectedHouseId],
  );

  const clearTestHouseRole = useCallback(() => {
    if (!selectedHouseId) return;
    setRoleOverrides((prev) => {
      const next = { ...prev };
      delete next[selectedHouseId];
      window.localStorage.setItem(STORAGE_OVERRIDES_KEY, JSON.stringify(next));
      return next;
    });
  }, [selectedHouseId]);

  const value = useMemo<HouseUiContextValue>(
    () => ({
      selectedHouseId,
      selectedHouseRole: membership?.houseRole ?? null,
      membership,
      hydrated,
      houseNames,
      setHouseName,
      setSelectedHouseId,
      setTestHouseRole,
      clearTestHouseRole,
      resolveMembershipForHouse,
      sessionMemberships: houseMemberships,
    }),
    [
      selectedHouseId,
      membership,
      hydrated,
      houseNames,
      setHouseName,
      setSelectedHouseId,
      setTestHouseRole,
      clearTestHouseRole,
      resolveMembershipForHouse,
      houseMemberships,
    ],
  );

  return (
    <HouseUiContext.Provider value={value}>{children}</HouseUiContext.Provider>
  );
}

export function useHouseUi(): HouseUiContextValue {
  const ctx = useContext(HouseUiContext);
  if (!ctx) {
    throw new Error("useHouseUi must be used within HouseUiProvider");
  }
  return ctx;
}

/**
 * Role in the currently selected house.
 * Throws nothing — returns null when no house / no membership.
 */
export function useCurrentHouseRole(): HouseRole | null {
  return useHouseUi().selectedHouseRole;
}

export function useSelectedHouseId(): string | null {
  return useHouseUi().selectedHouseId;
}

export function useCurrentHouseMembership(): HouseCabinetMembership | null {
  return useHouseUi().membership;
}

export { HOUSE_ROLES as HOUSE_UI_TEST_ROLES };
