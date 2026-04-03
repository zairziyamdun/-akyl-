import Link from "next/link";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";

import { books } from "@/data/books";

export function BooksHeroSection() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-card">
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(56,189,248,0.12),transparent_55%),radial-gradient(circle_at_100%_30%,rgba(99,102,241,0.10),transparent_50%)]"
        aria-hidden
      />

      <Container className="py-14 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-6">
            <SectionEyebrow>Книги автора</SectionEyebrow>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
              Книги автора
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              Серия книг формирует системный подход к профессиональному управлению многоквартирными жилыми домами: от архитектуры теории — к процессам практики — к устойчивому обучению и внедрению.
            </p>

            <div className="mt-6 max-w-2xl text-sm leading-6 text-muted-foreground md:text-base md:leading-7">
              Если вы строите управленческую модель или переводите организацию на стандарты AKYL — начните с базовой книги и соберите систему в единую логику.
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button asChild className="rounded-full px-6">
                <Link href="#book-1">Скачать фрагмент</Link>
              </Button>
              <Button
                asChild
                variant="secondary"
                className="rounded-full px-6"
              >
                <Link href="/methodology">Перейти к методологии</Link>
              </Button>
            </div>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative mx-auto h-[420px] w-full max-w-[520px]">
              <div className="absolute left-1/2 top-10 w-[240px] -translate-x-1/2">
                <BookCoverPlaceholder book={books.book1} size="sm" />
              </div>
              <div className="absolute left-[8%] top-24 w-[200px] rotate-[-10deg] sm:rotate-[-8deg]">
                <BookCoverPlaceholder book={books.book2} size="sm" />
              </div>
              <div className="absolute right-[6%] top-44 w-[200px] rotate-[10deg] sm:rotate-[8deg]">
                <BookCoverPlaceholder book={books.book3} size="sm" />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

