"use client";

import { HousesList } from "@/components/houses/HousesList";

export default function ManagerHousesPage() {
  return (
    <HousesList
      basePath="/manager/houses"
      dashboardPath={(id) => `/manager/houses/${id}/dashboard`}
    />
  );
}
