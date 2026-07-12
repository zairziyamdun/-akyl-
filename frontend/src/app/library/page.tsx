import {
  LibraryFeaturedBook,
  LibraryHero,
  LibraryMain,
} from "@/widgets/library-page";

export default function LibraryPage() {
  return (
    <div>
      <LibraryHero />
      <LibraryFeaturedBook />
      <LibraryMain />
    </div>
  );
}
