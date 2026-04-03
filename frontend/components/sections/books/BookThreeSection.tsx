import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";

import { books } from "@/data/books";

export function BookThreeSection() {
  return (
    <section
      className="border-b border-border bg-background"
      id={books.book3.id}
    >
      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          <div className="lg:col-span-5">
            <BookCoverPlaceholder book={books.book3} />
          </div>

          <div className="lg:col-span-7">
            <SectionEyebrow>{books.book3.seriesLabel}</SectionEyebrow>

            <h2 className="mt-4 text-2xl font-semibold tracking-tight md:text-3xl">
              {books.book3.title}
            </h2>

            <p className="mt-4 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
              {books.book3.description}
            </p>

            <div className="mt-8">
              <div className="text-sm font-semibold text-foreground">
                Что получает читатель
              </div>
              <ul className="mt-4 space-y-3">
                {books.book3.readerGets.map((t) => (
                  <li
                    key={t}
                    className="flex gap-3 text-sm text-muted-foreground"
                  >
                    <span
                      className="mt-2 h-1.5 w-1.5 rounded-full bg-accent"
                      aria-hidden
                    />
                    <span className="leading-6">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 rounded-2xl border border-border bg-card p-5">
              <div className="text-sm font-semibold text-foreground">
                Обучение и подготовка специалистов
              </div>
              <p className="mt-3 text-sm leading-7 text-muted-foreground md:text-base md:leading-8">
                {books.book3.educationText}
              </p>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6"
              >
                <Link href="#book-3">Подробнее</Link>
              </Button>
              <Button asChild className="rounded-full px-6">
                <Link href="/contacts">{books.book3.secondaryCta}</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

