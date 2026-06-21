import { HouseDashboardView } from "@/components/houses/HouseDashboardView";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function ManagerHouseDashboardPage({ params }: PageProps) {
  const { id } = await params;
  return <HouseDashboardView houseId={id} backHref="/manager/houses" />;
}
