"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { books } from "@/data/books";

const bookList = [books.book1, books.book2, books.book3] as const;

export function AuthorBooksSection() {
  return (
    <section className="border-b border-white/[0.06] bg-[#060a0f] py-16 md:py-20 lg:py-24">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
        >
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.26em] text-[#d4ba7a]/80">
              Публикации
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
              Книги автора
            </h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-white/55">
              Три тома серии: от фундамента модели до практики внедрения и стандартов подготовки команд.
            </p>
          </div>
          <Link
            href="/library/books"
            className="text-sm font-medium text-white/45 transition hover:text-white/80"
          >
            Все материалы →
          </Link>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3 md:gap-6 lg:gap-8">
          {bookList.map((book, i) => (
            <motion.article
              key={book.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{
                duration: 0.55,
                ease: [0.22, 1, 0.36, 1],
                delay: i * 0.07,
              }}
              className="group flex flex-col rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition duration-300 hover:border-white/[0.12] hover:bg-white/[0.035]"
            >
              <div className="overflow-hidden rounded-xl ring-1 ring-white/[0.08] transition group-hover:ring-white/[0.14]">
                <BookCoverPlaceholder
                  book={book}
                  className="!max-w-none border-0 shadow-none"
                />
              </div>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                {book.seriesLabel}
              </p>
              <h3 className="mt-2 text-base font-semibold leading-snug tracking-tight text-white">
                {book.title}
              </h3>
              <div className="mt-6">
                <Button
                  asChild
                  variant="secondary"
                  className="h-11 w-full rounded-xl border border-white/12 bg-transparent text-sm font-medium text-white hover:bg-white/[0.06] sm:w-auto"
                >
                  <Link href={`/library/books#${book.id}`} className="inline-flex items-center gap-2">
                    Подробнее
                    <ArrowUpRight className="h-4 w-4 opacity-70 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </Button>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
