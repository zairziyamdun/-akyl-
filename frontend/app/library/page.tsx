import { LibraryFeaturedBook } from "@/components/sections/library/LibraryFeaturedBook";
import { LibraryHero } from "@/components/sections/library/LibraryHero";
import { LibraryMain } from "@/components/sections/library/LibraryMain";


export default function LibraryPage() {
  return (
    <div>
        <LibraryHero />
        <LibraryFeaturedBook />
        <LibraryMain />
    </div>
  );
}

