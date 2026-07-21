"use client";

import { HouseRoleSection } from "@/entities/house";
import { PageHeader } from "@/widgets/dashboard-shell";
import { HousesList } from "@/widgets/houses-list";

export default function ManagerHousesPage() {
  return (
    <HouseRoleSection sectionId="houses">
      <PageHeader
        title="Мои ЖК"
        description="Список жилых комплексов, доступных вашей роли"
      />
      <HousesList
        basePath="/manager/houses"
        dashboardPath={(id) => `/manager/houses/${id}/dashboard`}
      />
    </HouseRoleSection>
  );
}
