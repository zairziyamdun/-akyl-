"use client";

import { HousesList } from "@/widgets/houses-list";

export default function AdminHousesPage() {
  return (
    <HousesList
      basePath="/admin/houses"
      dashboardPath={(id) => `/admin/houses/${id}`}
      showCreate
    />
  );
}
