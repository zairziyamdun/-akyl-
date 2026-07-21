import { ManagerHouseDashboardClient } from "./ManagerHouseDashboardClient";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ManagerHouseDashboardPage({ params }: PageProps) {
  const { id } = await params;
  return <ManagerHouseDashboardClient houseId={id} />;
}
