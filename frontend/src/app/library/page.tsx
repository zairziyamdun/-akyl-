import { LibraryFeaturedBook, LibraryMain } from "@/widgets/library-page";

export default function LibraryPage() {
  return (
    <div className="bg-white [overflow-x:clip]">
      <LibraryFeaturedBook />
      <LibraryMain />
    </div>
  );
}
