"use client";

import { useParams } from "next/navigation";

import { HouseRoleSection } from "@/entities/house";
import { HouseDashboardView } from "@/widgets/house-dashboard";

/** Optional detailed metrics dashboard for roles that have access via overview cards. */
export default function HouseMetricsDashboardPage() {
  const params = useParams();
  const houseId = String(params.houseId);

  return (
    <HouseRoleSection panelId="overview">
      <HouseDashboardView
        houseId={houseId}
        backHref={`/app/houses/${houseId}/overview`}
      />
    </HouseRoleSection>
  );
}
