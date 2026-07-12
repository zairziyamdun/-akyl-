"use client";

import { HousesList } from "@/widgets/houses-list";

export default function ManagerHousesPage() {
  return (
    <HousesList
      basePath="/manager/houses"
      dashboardPath={(id) => `/manager/houses/${id}/dashboard`}
    />
  );
}
