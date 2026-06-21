"use client";

import { HousesList } from "@/components/houses/HousesList";

export default function AdminHousesPage() {
  return (
    <HousesList
      basePath="/admin/houses"
      dashboardPath={(id) => `/admin/houses/${id}`}
      showCreate
    />
  );
}
