import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";

import { books } from "@/data/books";

export function BookTwoSection() {
  return (
    <section className="border-b border-border bg-card" id={books.book2.id}>
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-7 lg:order-1">
            <SectionEyebrow>{books.book2.seriesLabel}</SectionEyebrow>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              {books.book2.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              {books.book2.description}
            </p>

            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">
                Ключевые темы
              </div>
              <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                {books.book2.topics.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="leading-6">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">
                Практическая ценность
              </div>
              <ul className="mt-4 space-y-3">
                {books.book2.value.map((v) => (
                  <li
                    key={v}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="leading-6">{v}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="rounded-full px-6">
                <Link href="#book-2">Подробнее</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6"
              >
                <Link href="#book-2">Скачать фрагмент</Link>
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5 lg:order-2">
            <BookCoverPlaceholder book={books.book2} />
          </div>
        </div>
      </Container>
    </section>
  );
}

