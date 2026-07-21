"use client";

import { HouseRoleSection } from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";

export default function ManagerRequestsPage() {
  return (
    <HouseRoleSection sectionId="requests">
      <PageHeader
        title="Заявки"
        description="Обращения жителей и диспетчерский контур"
      />
      <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-12 text-center text-sm text-slate-500">
        UI-заглушка раздела заявок. Данные появятся после подключения API.
      </div>
    </HouseRoleSection>
  );
}
