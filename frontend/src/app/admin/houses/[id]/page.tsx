import { HouseForm } from "@/features/manage-house";
import { HouseUsersManager } from "@/features/assign-house-members";

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
