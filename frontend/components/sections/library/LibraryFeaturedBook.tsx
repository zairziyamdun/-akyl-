"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Download, Library } from "lucide-react";

import { Button } from "@/components/ui/Button";

const SECTION_BG_SRC =
  "/background/library-book-background.jpg";

type Book = {
  id: number;
  image: string;
  alt: string;
};

const featuredBooks: Book[] = [
  {
    id: 1,
    image: "/books/book-1.png",
    alt: "Обложка издания AKYL, основной том",
  },
  {
    id: 2,
    image: "/books/book-2.png",
    alt: "Обложка издания AKYL, том I",
  },
  {
    id: 3,
    image: "/books/book-3.png",
    alt: "Обложка издания AKYL, том II",
  },
];

const knowledgePills = [
  "Книги автора",
  "Методические материалы",
  "Исследования",
  "Шаблоны и документы",
];

const stats = [
  { value: "3+", label: "ключевых издания" },
  { value: "20+", label: "тем и моделей" },
  { value: "PDF / Print", label: "форматы доступа" },
];

export function LibraryFeaturedBook() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="featured-books"
      className="relative isolate overflow-hidden border-t border-white/[0.06] bg-neutral-950"
    >
      {/* Фон: фото */}
      <div className="absolute inset-0" aria-hidden>
        <Image
          src={SECTION_BG_SRC}
          alt=""
          fill
          className="object-cover object-center brightness-[0.42]"
          sizes="100vw"
          quality={88}
          priority={false}
          
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-transparent to-black/35" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-slate-300 backdrop-blur">
              <Library className="h-3.5 w-3.5" />
              Библиотека знаний
            </div>

            <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-white md:text-5xl">
              Не просто книги, а интеллектуальный фонд методологии управления
              МЖД
            </h2>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 md:text-lg">
              В библиотеке собраны ключевые издания, методические материалы,
              визуальные модели, шаблоны и практические наработки, которые
              формируют основу профессионального управления многоквартирными
              жилыми домами.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {knowledgePills.map((pill) => (
                <span
                  key={pill}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-200 backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm"
                >
                  <div className="text-xl font-semibold text-white">
                    {item.value}
                  </div>
                  <div className="mt-1 text-sm text-slate-300">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                className="group gap-2 rounded-full px-6"
              >
                <Link href="/library/books">
                  Открыть книги
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                asChild
                variant="secondary"
                className="gap-2 rounded-full border-white/15 bg-white/8 text-white hover:bg-white/12"
              >
                <Link href="/library/books/professional-management">
                  <Download className="h-4 w-4" />
                  Скачать фрагмент
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative mx-auto min-h-[640px] max-w-[640px]">
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -5, 0] }}
                transition={{
                  duration: 8,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="absolute left-0 top-20 z-10 w-[210px] rotate-[-14deg]"
              >
                <BookCard book={featuredBooks[1]} />
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [0, 5, 0] }}
                transition={{
                  duration: 9,
                  repeat: reduceMotion ? 0 : Infinity,
                  ease: "easeInOut",
                }}
                className="absolute right-0 top-6 z-10 w-[210px] rotate-[12deg]"
              >
                <BookCard book={featuredBooks[2]} />
              </motion.div>

              <motion.div
                whileHover={
                  reduceMotion ? undefined : { y: -4, rotate: -0.5, scale: 1.012 }
                }
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="absolute left-1/2 top-1/2 z-20 w-[300px] -translate-x-1/2 -translate-y-1/2"
              >
                <BookCard book={featuredBooks[0]} featured />
              </motion.div>

              <div
                className="pointer-events-none absolute inset-x-16 bottom-2 h-20 rounded-[100%] bg-black/45 blur-2xl"
                aria-hidden
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function BookCard({
  book,
  featured = false,
}: {
  book: Book;
  featured?: boolean;
}) {
  const shadow = featured
    ? "shadow-[0_32px_64px_-8px_rgba(0,0,0,0.58),0_12px_24px_-6px_rgba(0,0,0,0.35)]"
    : "shadow-[0_24px_48px_-10px_rgba(0,0,0,0.52),0_8px_16px_-4px_rgba(0,0,0,0.3)]";

  return (
    <div className={`group w-full ${shadow}`}>
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-none bg-neutral-950 ring-1 ring-black/25">
        <Image
          src={book.image}
          alt={book.alt}
          fill
          sizes={
            featured
              ? "(max-width: 1024px) 90vw, 300px"
              : "(max-width: 1024px) 42vw, 210px"
          }
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.008]"
          priority={featured}
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/[0.08] via-transparent to-black/[0.03]"
          aria-hidden
        />
      </div>
    </div>
  );
}
