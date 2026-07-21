"use client";

import {
  getHouseRoleLabel,
  HouseRoleBadge,
  HouseRoleSection,
  useCurrentHouseMembership,
} from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";

export default function ManagerCabinetPage() {
  const membership = useCurrentHouseMembership();

  return (
    <HouseRoleSection sectionId="cabinet">
      <PageHeader
        title="Личный кабинет"
        description="Профиль участника ЖК и сведения о вашей роли"
      />
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <HouseRoleBadge role={membership.role} />
          <span className="text-sm text-slate-500">
            Статус membership: {membership.status}
          </span>
        </div>
        <dl className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Роль
            </dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {getHouseRoleLabel(membership.role)}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
              ЖК (mock id)
            </dt>
            <dd className="mt-1 text-sm font-medium text-slate-900">
              {membership.houseId}
            </dd>
          </div>
        </dl>
        <p className="mt-6 text-sm text-slate-500">
          Это UI-макет личного кабинета. После API сюда подставятся реальные
          данные membership.
        </p>
      </div>
    </HouseRoleSection>
  );
}
