"use client";

import type { ReactNode } from "react";

import { getHousePanel, type HousePanelId } from "../lib/housePanelConfig";
import { PageHeaderLike } from "./HousePanelPageHeader";
import { HouseRoleSection } from "./HouseRoleSection";

/**
 * Shared stub page for house-scoped ЖК cabinet panels.
 */
export function HousePanelStubPage({
  panelId,
  extra,
}: {
  panelId: HousePanelId;
  extra?: ReactNode;
}) {
  const panel = getHousePanel(panelId);

  return (
    <HouseRoleSection panelId={panelId}>
      <PageHeaderLike
        title={panel?.title ?? panelId}
        description={
          panel?.description ??
          "Раздел выбранного ЖК. Данные появятся после подключения API."
        }
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        UI-заглушка «{panel?.title ?? panelId}» для текущего ЖК. Доступ
        определяется ролью membership в этом доме.
      </div>
      {extra}
    </HouseRoleSection>
  );
}
