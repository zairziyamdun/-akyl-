"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Download, Library } from "lucide-react";

import { Button } from "@/components/ui/Button";

type Book = {
  id: number;
  image: string;
  tone: string;
  /** Короткий alt для доступности */
  alt: string;
};

const featuredBooks: Book[] = [
  {
    id: 1,
    image: "/books/book-1.png",
    tone: "from-slate-900 via-slate-800 to-slate-700",
    alt: "Обложка издания AKYL, основной том",
  },
  {
    id: 2,
    image: "/books/book-2.png",
    tone: "from-slate-800 to-slate-600",
    alt: "Обложка издания AKYL, том I",
  },
  {
    id: 3,
    image: "/books/book-3.png",
    tone: "from-stone-800 to-stone-600",
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
  return (
    <section
      id="featured-books"
      className="relative overflow-hidden border-t border-border bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_32%),linear-gradient(180deg,#0b1120_0%,#111827_48%,#0f172a_100%)]"
    >
      <div className="absolute inset-0 opacity-[0.06]">
        <div className="h-full w-full bg-[linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute right-0 top-1/3 h-72 w-72 rounded-full bg-slate-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
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
            initial={{ opacity: 0, y: 32, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative mx-auto min-h-[640px] max-w-[640px]">
              {/* левая книга */}
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-0 top-20 z-10 w-[210px] rotate-[-14deg]"
              >
                <BookCard book={featuredBooks[1]} />
              </motion.div>

              {/* правая книга */}
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-0 top-6 z-10 w-[210px] rotate-[12deg]"
              >
                <BookCard book={featuredBooks[2]} />
              </motion.div>

              {/* центральная книга */}
              <motion.div
                whileHover={{ y: -10, rotate: -1, scale: 1.03 }}
                transition={{ duration: 0.35 }}
                className="absolute left-1/2 top-1/2 z-20 w-[300px] -translate-x-1/2 -translate-y-1/2"
              >
                <BookCard book={featuredBooks[0]} featured />
              </motion.div>

              {/* тень */}
              <div className="absolute inset-x-12 bottom-0 h-24 rounded-full bg-black/50 blur-3xl" />
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
  return (
    <div
      className={[
        "group relative aspect-[3/4] w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.45)] sm:rounded-[26px]",
        featured ? "shadow-[0_30px_90px_rgba(0,0,0,0.55)]" : "",
      ].join(" ")}
    >
      <Image
        src={book.image}
        alt={book.alt}
        fill
        sizes={
          featured
            ? "(max-width: 1024px) 90vw, 300px"
            : "(max-width: 1024px) 42vw, 210px"
        }
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        priority={featured}
      />

      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${book.tone} opacity-30 mix-blend-overlay`}
        aria-hidden
      />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.06),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-px bg-white/10" />
    </div>
  );
}