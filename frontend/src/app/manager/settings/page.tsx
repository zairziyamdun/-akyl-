"use client";

import { HouseRoleSection } from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";

export default function ManagerSettingsPage() {
  return (
    <HouseRoleSection sectionId="settings">
      <PageHeader
        title="Настройки ЖК"
        description="Параметры комплекса и управление составом"
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        UI-заглушка настроек ЖК. Данные появятся после подключения API.
      </div>
    </HouseRoleSection>
  );
}
