"use client";

import { HouseRoleSection } from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";

export default function ManagerTechnicalPage() {
  return (
    <HouseRoleSection sectionId="technical">
      <PageHeader
        title="Техника"
        description="Инженерные системы и техническое состояние"
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        UI-заглушка технического раздела. Данные появятся после подключения API.
      </div>
    </HouseRoleSection>
  );
}
