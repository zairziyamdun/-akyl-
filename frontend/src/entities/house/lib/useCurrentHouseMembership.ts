"use client";

import { useSyncExternalStore } from "react";

import {
  type CurrentHouseMembership,
  getCurrentHouseMembership,
  getCurrentHouseRole,
} from "../model/mockHouseMembership";
import type { HouseRole } from "../model/types";

/**
 * Subscribe to current ЖК membership for UI.
 * Mock is static; API later can notify via a real store without changing call sites.
 */
const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

export function useCurrentHouseMembership(): CurrentHouseMembership {
  return useSyncExternalStore(
    subscribe,
    getCurrentHouseMembership,
    getCurrentHouseMembership,
  );
}

export function useCurrentHouseRole(): HouseRole {
  return useSyncExternalStore(
    subscribe,
    getCurrentHouseRole,
    getCurrentHouseRole,
  );
}
