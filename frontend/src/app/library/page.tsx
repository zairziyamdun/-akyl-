import { LibraryFeaturedBook } from "@/widgets/library-page";
import { LibraryHero } from "@/widgets/library-page";
import { LibraryMain } from "@/widgets/library-page";


export default function LibraryPage() {
  return (
    <div>
        <LibraryHero />
        <LibraryFeaturedBook />
        <LibraryMain />
    </div>
  );
}

