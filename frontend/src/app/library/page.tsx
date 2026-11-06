import { fetchPublishedMaterialsOnServer } from "@/entities/library-material";
import { LibraryFeaturedBook, LibraryMain } from "@/widgets/library-page";

/** The list is rendered on the server and refreshed at most once a minute. */
export const revalidate = 60;

export default async function LibraryPage() {
  const materials = await fetchPublishedMaterialsOnServer();

  return (
    <div className="bg-white [overflow-x:clip]">
      <LibraryFeaturedBook />
      <LibraryMain initialMaterials={materials} />
    </div>
  );
}
