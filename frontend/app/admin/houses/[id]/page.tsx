import { HouseForm } from "@/components/houses/HouseForm";
import { HouseUsersManager } from "@/components/houses/HouseUsersManager";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function AdminEditHousePage({ params }: PageProps) {
  const { id } = await params;

  return (
    <>
      <HouseForm mode="edit" houseId={id} />
      <HouseUsersManager houseId={id} />
    </>
  );
}
