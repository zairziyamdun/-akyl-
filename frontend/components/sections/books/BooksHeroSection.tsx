"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BookCoverPlaceholder } from "@/components/shared/books/BookCoverPlaceholder";
import { SectionEyebrow } from "@/components/shared/books/SectionEyebrow";
import { books } from "@/data/books";

const bookItems = [books.book1, books.book2, books.book3] as const;

export function BooksHeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bookItems.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const activeBook = bookItems[activeIndex];
  const backBookOne = bookItems[(activeIndex + 1) % bookItems.length];
  const backBookTwo = bookItems[(activeIndex + 2) % bookItems.length];

  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#071019] text-white">
      <div className="absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-[#071019]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_28%,rgba(212,186,122,0.14),transparent_20%),radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.05),transparent_24%),linear-gradient(180deg,rgba(7,16,25,0.88)_0%,rgba(7,16,25,0.94)_52%,rgba(7,16,25,1)_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-white/10" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-white/10" />
      </div>

      <Container className="relative py-16 md:py-20 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-6 xl:gap-10">
          <motion.div
            className="lg:col-span-5 xl:col-span-5"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <SectionEyebrow className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-[11px] font-medium uppercase tracking-[0.24em] text-white/65 backdrop-blur-md">
              Книги автора
            </SectionEyebrow>

            <div className="mt-6">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl lg:text-[60px] lg:leading-[0.98]">
                Система управления МЖД
                <span className="mt-2 block text-white/48">
                  через книги, базу знаний и внедрение
                </span>
              </h1>

              <p className="mt-6 text-base leading-7 text-white/72 md:text-lg md:leading-8">
                Серия книг раскрывает целостную модель профессионального
                управления многоквартирными жилыми домами: от фундаментальной
                логики системы до практики внедрения.
              </p>

              <p className="mt-4 text-sm leading-7 text-white/48 md:text-[15px]">
                Теория, процессы, KPI, цифровые инструменты и управленческие
                решения собраны в единую архитектуру подхода AKYL.
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <Button
                asChild
                className="h-12 rounded-full bg-[#d4ba7a] px-6 text-sm font-medium text-[#0b1320] transition-colors hover:bg-[#dcc389]"
              >
                <Link href={`#${activeBook.id}`}>Открыть книгу</Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="h-12 rounded-full border border-white/12 bg-white/[0.04] px-6 text-sm font-medium text-white transition-colors hover:bg-white/[0.08]"
              >
                <Link href="/library">Все издания</Link>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-white/34">
              <span>Теория</span>
              <span className="h-1 w-1 rounded-full bg-white/18" />
              <span>Практика</span>
              <span className="h-1 w-1 rounded-full bg-white/18" />
              <span>Внедрение</span>
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 xl:col-span-7"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.08 }}
          >
            <div className="relative mx-auto h-[460px] w-full max-w-[520px] sm:h-[580px] sm:max-w-[680px] md:h-[660px] md:max-w-[760px] lg:h-[720px] lg:max-w-[880px] xl:h-[760px] xl:max-w-[920px]">
              <div className="absolute left-1/2 top-[54%] h-[220px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#d4ba7a]/10 blur-[120px]" />

              <motion.div
                className="absolute left-1/2 top-1/2 z-10 -translate-y-1/2"
                animate={{
                  x: "-90%",
                  rotate: -14,
                  scale: 0.76,
                  opacity: 0.2,
                }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="w-[160px] sm:w-[210px] md:w-[240px] lg:w-[270px] xl:w-[290px] blur-[1px] shadow-[0_30px_90px_rgba(0,0,0,0.38)]">
                  <BookCoverPlaceholder
                    book={backBookOne}
                    size="sm"
                    className="!max-w-none border-0"
                  />
                </div>
              </motion.div>

              <motion.div
                className="absolute left-1/2 top-1/2 z-20 -translate-y-1/2"
                animate={{
                  x: "-34%",
                  rotate: -7,
                  scale: 0.88,
                  opacity: 0.46,
                }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.04 }}
              >
                <div className="w-[180px] sm:w-[235px] md:w-[270px] lg:w-[310px] xl:w-[330px] blur-[0.4px] shadow-[0_35px_100px_rgba(0,0,0,0.42)]">
                  <BookCoverPlaceholder
                    book={backBookTwo}
                    size="sm"
                    className="!max-w-none border-0"
                  />
                </div>
              </motion.div>

              <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeBook.id}
                    initial={{ opacity: 0, y: 24, rotate: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, rotate: -4, scale: 0.96 }}
                    transition={{ duration: 0.65, ease: "easeOut" }}
                  >
                    <Link href={`#${activeBook.id}`} className="group block">
                      <motion.div
                        whileHover={{ y: -6, scale: 1.01 }}
                        transition={{ duration: 0.28, ease: "easeOut" }}
                        className="w-[250px] sm:w-[320px] md:w-[370px] lg:w-[420px] xl:w-[450px] shadow-[0_55px_140px_rgba(0,0,0,0.58)]"
                      >
                        <BookCoverPlaceholder
                          book={activeBook}
                          size="md"
                          className="!max-w-none border-0"
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                className="absolute bottom-[11%] left-1/2 h-16 w-[58%] -translate-x-1/2 rounded-full bg-black/50 blur-2xl sm:h-20"
                animate={{ scaleX: [1, 1.05, 1] }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              <div className="absolute bottom-5 left-1/2 z-40 flex -translate-x-1/2 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 backdrop-blur-md">
                {bookItems.map((book, index) => {
                  const isActive = index === activeIndex;

                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        isActive
                          ? "w-8 bg-[#d4ba7a]"
                          : "w-2.5 bg-white/20 hover:bg-white/35"
                      }`}
                      aria-label={`Показать книгу ${index + 1}`}
                    />
                  );
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}