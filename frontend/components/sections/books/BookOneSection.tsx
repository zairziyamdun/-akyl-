import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { Bullets } from "@/components/shared/books/Bullets";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";

import { books } from "@/data/books";

export function BookOneSection() {
  return (
    <section
      className="border-b border-border bg-background"
      id={books.book1.id}
    >
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <BookCoverPlaceholder book={books.book1} />
          </div>

          <div className="lg:col-span-7">
            <SectionEyebrow>{books.book1.seriesLabel}</SectionEyebrow>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              {books.book1.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              {books.book1.description}
            </p>

            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">
                Что раскрывает книга
              </div>
              <Bullets items={books.book1.whatReveals} />
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">
                Для кого
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {books.book1.audience.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="leading-6">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6"
              >
                <Link href="#book-1">Подробнее</Link>
              </Button>
              <Button asChild className="rounded-full px-6">
                <Link href="#book-1">Скачать фрагмент</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

