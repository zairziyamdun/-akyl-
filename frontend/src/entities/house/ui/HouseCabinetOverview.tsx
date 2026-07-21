"use client";

import Link from "next/link";

import {
  buildHousePanelHref,
  getDashboardPanelsForRole,
  getQuickActionPanelsForRole,
  HOUSE_CABINET_BASE,
} from "../lib/housePanelConfig";
import { getHouseRoleLabel } from "../lib/houseRoleLabels";
import { useCurrentHouseRole, useHouseUi } from "./HouseUiProvider";

/** Compact overview for the selected house — name, role, address, then KPIs. */
export function HouseCabinetOverview() {
  const role = useCurrentHouseRole();
  const { selectedHouseId, membership, houseNames } = useHouseUi();

  if (!selectedHouseId || !role) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        <Link
          href={HOUSE_CABINET_BASE}
          className="text-sky-700 hover:underline"
        >
          Выберите ЖК
        </Link>
      </div>
    );
  }

  const houseName =
    membership?.houseName ?? houseNames[selectedHouseId] ?? "Жилой комплекс";
  const cards = getDashboardPanelsForRole(role).filter(
    (panel) => panel.id !== "overview",
  );
  const actions = getQuickActionPanelsForRole(role);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-slate-900">
          {houseName}
        </h1>
        <p className="mt-1 text-sm text-slate-600">
          {getHouseRoleLabel(role)}
          {/* Address placeholder until house detail is loaded into context */}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Собрано", value: "—" },
          { label: "Расходы", value: "—" },
          { label: "Заявки", value: "—" },
          { label: "IEU", value: "—" },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
          >
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              {kpi.label}
            </p>
            <p className="mt-1 text-xl font-semibold text-slate-900">
              {kpi.value}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-400">mock</p>
          </div>
        ))}
      </div>

      {role === "dispatcher" ? (
        <div className="rounded-xl border border-violet-200 bg-violet-50/50 px-4 py-3 text-sm text-violet-900">
          <p className="font-medium">Уведомления (mock)</p>
          <p className="mt-1 text-violet-800/80">
            3 новые заявки · 1 просрочена
          </p>
        </div>
      ) : null}

      {actions.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {actions.map((panel) => (
            <Link
              key={panel.id}
              href={buildHousePanelHref(selectedHouseId, panel.id)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50"
            >
              {panel.title}
            </Link>
          ))}
        </div>
      ) : null}

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map((panel) => (
          <Link
            key={panel.id}
            href={buildHousePanelHref(selectedHouseId, panel.id)}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm hover:border-sky-200"
          >
            <p className="text-sm font-semibold text-slate-900">
              {panel.title}
            </p>
            <p className="mt-1 text-xs text-slate-500">
              {panel.description ?? "Раздел этого ЖК"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
