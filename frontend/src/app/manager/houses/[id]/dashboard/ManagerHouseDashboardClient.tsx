"use client";

import { HouseRoleSection } from "@/entities/house";
import { HouseDashboardView } from "@/widgets/house-dashboard";

export function ManagerHouseDashboardClient({ houseId }: { houseId: string }) {
  return (
    <HouseRoleSection sectionId="houses">
      <HouseDashboardView houseId={houseId} backHref="/manager/houses" />
    </HouseRoleSection>
  );
}
