"use client";

import { HouseCabinetOverview, HouseRoleSection } from "@/entities/house";

export default function HouseOverviewPage() {
  return (
    <HouseRoleSection panelId="overview">
      <HouseCabinetOverview />
    </HouseRoleSection>
  );
}
