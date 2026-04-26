"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { Bullets } from "@/components/shared/books/Bullets";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";
import { books } from "@/data/books";

export function BookTwoSection() {
  const book = books.book2;

  return (
    <section
      id={book.id}
      className="relative overflow-hidden border-b border-border bg-[#f6f3ee] text-[#161616]"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.025),transparent_26%),radial-gradient(circle_at_85%_18%,rgba(0,0,0,0.04),transparent_22%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-black/6" />
      </div>

      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <motion.div
            className="lg:col-span-5"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <div className="relative mx-auto max-w-[420px] lg:mx-0 lg:max-w-[460px]">
              <div className="absolute left-1/2 top-[58%] h-[220px] w-[72%] -translate-x-1/2 rounded-full bg-black/10 blur-3xl" />

              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative"
              >
                <BookCoverPlaceholder
                  book={book}
                  className="!max-w-none border-0 shadow-[0_28px_70px_rgba(0,0,0,0.20)]"
                />
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7"
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          >
            <SectionEyebrow className="text-[11px] uppercase tracking-[0.24em] text-black/45">
              {book.seriesLabel}
            </SectionEyebrow>

            <div className="mt-5 max-w-4xl">
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-[#161616] md:text-4xl lg:text-[50px] lg:leading-[1.02]">
                {book.title}
              </h2>

              <p className="mt-6 max-w-2xl text-[15px] leading-8 text-black/62 md:text-base">
                {book.description}
              </p>
            </div>

            <div className="mt-10 grid gap-10 border-t border-black/10 pt-8 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.12 }}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/42">
                  Ключевые темы
                </div>

                <div className="mt-5">
                  <Bullets items={book.topics} />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.65, ease: "easeOut", delay: 0.18 }}
              >
                <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/42">
                  Практическая ценность
                </div>

                <ul className="mt-5 space-y-3 text-[15px] text-black/62">
                  {book.value.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span
                        className="mt-[10px] h-1.5 w-1.5 shrink-0 rounded-full bg-black/70"
                        aria-hidden
                      />
                      <span className="leading-7">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: "easeOut", delay: 0.24 }}
              className="mt-10 border-t border-black/10 pt-8"
            >
              <div className="grid gap-8 lg:grid-cols-[1.2fr_auto] lg:items-end">
                <div className="max-w-2xl">
                  <div className="text-[11px] font-medium uppercase tracking-[0.22em] text-black/42">
                    Значение книги
                  </div>

                  <p className="mt-4 text-[15px] leading-8 text-black/62 md:text-base">
                    Вторая книга переводит модель в операционную работу: она
                    связывает процессы, эксплуатацию и аналитику в единый контур
                    управленческих решений.
                  </p>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    asChild
                    variant="secondary"
                    className="group h-12 rounded-full border border-black/12 bg-transparent px-6 text-[#161616] hover:bg-black/[0.04]"
                  >
                    <Link href={`#${book.id}`}>
                      Подробнее
                      <ArrowUpRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    className="group h-12 rounded-full bg-[#161616] px-6 text-white hover:bg-black/85"
                  >
                    <Link href={`#${book.id}`}>
                      Скачать фрагмент
                      <Download className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
