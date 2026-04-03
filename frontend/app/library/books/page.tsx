import { BookOneSection } from "@/components/sections/books/BookOneSection";
import { BookThreeSection } from "@/components/sections/books/BookThreeSection";
import { BookTwoSection } from "@/components/sections/books/BookTwoSection";
import { BooksCtaSection } from "@/components/sections/books/BooksCtaSection";
import { BooksHeroSection } from "@/components/sections/books/BooksHeroSection";
import { BooksSystemSection } from "@/components/sections/books/BooksSystemSection";

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

