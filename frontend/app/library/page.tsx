import { LibraryFeaturedBook } from "@/components/sections/library/LibraryFeaturedBook";
import { LibraryHero } from "@/components/sections/library/LibraryHero";
import { LibraryMain } from "@/components/sections/library/LibraryMain";


export default function LibraryPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="pt-[73px]">
        <LibraryHero />
        <LibraryFeaturedBook />
        <LibraryMain />
      </main>
    </div>
  );
}

