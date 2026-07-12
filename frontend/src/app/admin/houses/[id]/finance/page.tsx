import { HouseFinanceManager } from "@/features/manage-finance-records";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminHouseFinancePage({ params }: PageProps) {
  const { id } = await params;
  return <HouseFinanceManager houseId={id} />;
}
