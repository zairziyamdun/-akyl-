"use client";

import { HOUSE_ROLE_LABELS } from "../lib/houseRoleLabels";
import type { HouseRole } from "../model/types";
import { HOUSE_UI_TEST_ROLES, useHouseUi } from "./HouseUiProvider";

/**
 * TEMPORARY: frontend-only role switcher for UI testing.
 * Only for the current house workspace. Not part of product UI.
 */
export function HouseRoleSwitcher({
  compact = false,
  houseId: houseIdProp,
}: {
  compact?: boolean;
  houseId?: string;
} = {}) {
  const {
    selectedHouseId,
    selectedHouseRole,
    membership,
    setTestHouseRole,
    clearTestHouseRole,
    hydrated,
  } = useHouseUi();

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  const houseId = houseIdProp ?? selectedHouseId;
  if (!houseId) return null;

  return (
    <div
      className={
        compact
          ? ""
          : "rounded-xl border border-amber-200 bg-amber-50 px-3 py-3"
      }
    >
      {!compact ? (
        <label
          htmlFor="house-ui-role-switcher"
          className="block text-[11px] font-semibold uppercase tracking-wider text-amber-900/80"
        >
          Тестовая роль ЖК
        </label>
      ) : (
        <label
          htmlFor="house-ui-role-switcher"
          className="block text-[10px] text-amber-900/70"
        >
          Role
        </label>
      )}
      <select
        id="house-ui-role-switcher"
        value={hydrated && selectedHouseRole ? selectedHouseRole : "chairman"}
        onChange={(event) => setTestHouseRole(event.target.value as HouseRole)}
        className="mt-1 w-full rounded-md border border-amber-300/80 bg-white px-2 py-1.5 text-xs text-slate-800"
      >
        {HOUSE_UI_TEST_ROLES.map((role) => (
          <option key={role} value={role}>
            {HOUSE_ROLE_LABELS[role]}
          </option>
        ))}
      </select>
      {membership?.isTestOverride && !compact ? (
        <button
          type="button"
          onClick={() => clearTestHouseRole()}
          className="mt-2 text-[11px] font-medium text-amber-800 underline-offset-2 hover:underline"
        >
          Сбросить к membership
        </button>
      ) : null}
    </div>
  );
}
