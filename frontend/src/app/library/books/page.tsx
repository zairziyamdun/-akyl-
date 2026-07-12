import {
  BookOneSection,
  BooksCtaSection,
  BooksHeroSection,
  BooksSystemSection,
  BookThreeSection,
  BookTwoSection,
} from "@/widgets/books-page";

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
