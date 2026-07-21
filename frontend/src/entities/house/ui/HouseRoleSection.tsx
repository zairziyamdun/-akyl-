"use client";

import type { ReactNode } from "react";

import {
  canAccessHousePanel,
  getHousePanel,
  type HousePanelId,
} from "../lib/housePanelConfig";
import { HouseNoHouseAccess } from "./HouseNoHouseAccess";
import { HouseRoleAccessStub } from "./HouseRoleAccessStub";
import { useHouseUi } from "./HouseUiProvider";

export function HouseRoleSection({
  panelId,
  sectionId,
  children,
}: {
  panelId?: HousePanelId;
  sectionId?: HousePanelId;
  children: ReactNode;
}) {
  const { selectedHouseId, selectedHouseRole, membership } = useHouseUi();
  const id = panelId ?? sectionId;

  if (!id) return children;

  const panel = getHousePanel(id);

  if (!selectedHouseId) {
    return <HouseNoHouseAccess />;
  }

  if (!selectedHouseRole || !membership) {
    return (
      <HouseNoHouseAccess
        message="У вас нет доступа к кабинету данного ЖК"
        houseId={selectedHouseId}
      />
    );
  }

  if (!canAccessHousePanel(selectedHouseRole, id)) {
    return (
      <HouseRoleAccessStub
        role={selectedHouseRole}
        sectionLabel={panel?.title}
        houseId={selectedHouseId}
      />
    );
  }

  return children;
}
