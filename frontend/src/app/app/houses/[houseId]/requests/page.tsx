"use client";

import { HousePanelStubPage, useCurrentHouseRole } from "@/entities/house";

export default function HouseRequestsPage() {
  const role = useCurrentHouseRole();

  return (
    <HousePanelStubPage
      panelId="requests"
      extra={
        <div className="mt-4 space-y-3">
          {role === "dispatcher" ? (
            <div className="rounded-xl border border-violet-200 bg-violet-50/50 p-4 text-sm text-violet-900">
              Новые · Назначенные · Контроль · История (mock)
            </div>
          ) : null}
          {role === "engineer" ? (
            <div className="rounded-xl border border-orange-200 bg-orange-50/50 p-4 text-sm text-orange-900">
              Технические и аварийные заявки (mock)
            </div>
          ) : null}
          {role === "resident" ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-700">
              Мои заявки · Создать заявку (mock)
            </div>
          ) : null}
        </div>
      }
    />
  );
}
