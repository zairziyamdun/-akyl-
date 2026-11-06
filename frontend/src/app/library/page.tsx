import { Suspense } from "react";

import { fetchPublishedMaterialsOnServer } from "@/entities/library-material";
import {
  LibraryFeaturedBook,
  LibraryMain,
  LibraryMainRouted,
} from "@/widgets/library-page";

/** The list is rendered on the server and refreshed at most once a minute. */
export const revalidate = 60;

export default async function LibraryPage() {
  const materials = await fetchPublishedMaterialsOnServer();

  return (
    <div className="bg-white [overflow-x:clip]">
      <LibraryFeaturedBook />
      {/* The static HTML shows the unfiltered list; the URL topic applies on the client. */}
      <Suspense fallback={<LibraryMain initialMaterials={materials} />}>
        <LibraryMainRouted initialMaterials={materials} />
      </Suspense>
    </div>
  );
}
