"use client";

import type { ReactNode } from "react";

import {
  canAccessHouseUiSection,
  type HouseUiSectionId,
} from "../lib/houseRoleHelpers";
import { useCurrentHouseRole } from "../lib/useCurrentHouseMembership";
import { HouseRoleAccessStub } from "./HouseRoleAccessStub";

const SECTION_LABELS: Record<HouseUiSectionId, string> = {
  houses: "Мои ЖК",
  finance: "Финансы",
  technical: "Техника",
  requests: "Заявки",
  settings: "Настройки ЖК",
  cabinet: "Личный кабинет",
};

/**
 * Renders children if the current ЖК role may use the section; otherwise a UI stub.
 * No backend checks — swap role source via getCurrentHouseMembership later.
 */
export function HouseRoleSection({
  sectionId,
  children,
}: {
  sectionId: HouseUiSectionId;
  children: ReactNode;
}) {
  const role = useCurrentHouseRole();

  if (!canAccessHouseUiSection(role, sectionId)) {
    return (
      <HouseRoleAccessStub
        role={role}
        sectionLabel={SECTION_LABELS[sectionId]}
      />
    );
  }

  return children;
}
