import { BookOneSection } from "@/widgets/books-page";
import { BookThreeSection } from "@/widgets/books-page";
import { BookTwoSection } from "@/widgets/books-page";
import { BooksCtaSection } from "@/widgets/books-page";
import { BooksHeroSection } from "@/widgets/books-page";
import { BooksSystemSection } from "@/widgets/books-page";

export default function Page() {
  return (
    <div className="bg-background text-foreground">
      <BooksHeroSection />
      <BookOneSection />
      <BookTwoSection />
      <BookThreeSection />
      <BooksSystemSection />
      <BooksCtaSection />
    </div>
  );
}

