"use client";

import { HousePanelStubPage, useCurrentHouseRole } from "@/entities/house";

export default function HouseTechnicalPage() {
  const role = useCurrentHouseRole();
  return (
    <HousePanelStubPage
      panelId="technical"
      extra={
        role === "engineer" ? (
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            Осмотры · Акты (mock)
          </div>
        ) : null
      }
    />
  );
}
