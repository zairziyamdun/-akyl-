"use client";

import { HouseRoleSection } from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";

export default function ManagerFinancePage() {
  return (
    <HouseRoleSection sectionId="finance">
      <PageHeader
        title="Финансы"
        description="Финансовый учёт и отчётность по ЖК"
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        UI-заглушка раздела финансов. Данные появятся после подключения API.
      </div>
    </HouseRoleSection>
  );
}
