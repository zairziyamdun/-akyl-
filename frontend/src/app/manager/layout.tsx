"use client";

import {
  getHouseRoleLabel,
  getHouseRoleNavigation,
  HouseRoleBadge,
  useCurrentHouseRole,
} from "@/entities/house";
import { DashboardShell } from "@/widgets/dashboard-shell";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const houseRole = useCurrentHouseRole();
  const sections = getHouseRoleNavigation(houseRole);
  const title = `ЖК · ${getHouseRoleLabel(houseRole)}`;

  return (
    <DashboardShell sections={sections} title={title}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Роль в ЖК (mock)
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Переключение через{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
              MOCK_MEMBERSHIP.role
            </code>{" "}
            в{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800">
              entities/house/model/mockHouseMembership.ts
            </code>
          </p>
        </div>
        <HouseRoleBadge role={houseRole} />
      </div>
      {children}
    </DashboardShell>
  );
}
