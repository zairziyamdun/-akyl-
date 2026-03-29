"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

type BookItem = {
  id: string;
  category: string;
  title: string;
  shortLabel: string;
  description: string;
  cover: string;
  coverAlt: string;
  href: string;
  takeaways: string[];
};

const books: BookItem[] = [
  {
    id: "book-1",
    category: "Методология",
    title: "Управление МЖД как система",
    shortLabel: "AKYL",
    description:
      "Не сборник советов, а структурированная модель профессионального управления многоквартирными домами — основа для обучения, внедрения и цифровых инструментов AKYL.",
    cover: "/books/book-1.png",
    coverAlt: "Обложка книги Управление МЖД как система",
    href: "/library",
    takeaways: [
      "Единая логика управления домом: от модели до операционных решений.",
      "Язык, на котором сходятся собственники, УК и подрядчики.",
      "Опора для внедрения KPI, регламентов и цифровых инструментов.",
      "Мост между нормативкой, практикой и управленческой культурой.",
    ],
  },
  {
    id: "book-2",
    category: "Практика",
    title: "Финансовая модель управления домом",
    shortLabel: "Финансы",
    description:
      "Практическое руководство по построению прозрачной финансовой системы: бюджетирование, контроль затрат, план-факт анализ и управленческая отчетность.",
    cover: "/books/book-2.png",
    coverAlt: "Обложка книги Финансовая модель управления домом",
    href: "/library",
    takeaways: [
      "Прозрачная логика движения денежных потоков.",
      "Подход к формированию бюджета и контролю исполнения.",
      "Инструменты для анализа отклонений и устойчивости модели.",
      "Основа для финансовой дисциплины и доверия участников.",
    ],
  },
  {
    id: "book-3",
    category: "Внедрение",
    title: "Архитектура и внедрение системы управления",
    shortLabel: "Внедрение",
    description:
      "Пошаговый подход к переходу от хаотичной модели управления к структурированной системе: роли, процессы, контроль и цифровая среда.",
    cover: "/books/book-3.png",
    coverAlt: "Обложка книги Архитектура и внедрение системы управления",
    href: "/library",
    takeaways: [
      "Понятная модель перехода от текущего состояния к целевой системе.",
      "Увязка ролей, процессов, KPI и цифровых инструментов.",
      "Снижение хаоса при запуске новой модели управления.",
      "База для обучения команды и сопровождения внедрения.",
    ],
  },
];

export function BookSection() {
  const [activeBookId, setActiveBookId] = useState<string>(books[0].id);

  const activeBook =
    books.find((book) => book.id === activeBookId) ?? books[0];

  return (
    <section
      className="border-t border-slate-200/80 bg-white py-20 md:py-28 lg:py-32"
      aria-labelledby="book-section-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5 xl:col-span-4">
            <div className="space-y-4">
              <div className="relative mx-auto aspect-[3/4] max-w-[280px] overflow-hidden rounded-lg border border-slate-200/90 bg-slate-100 shadow-[0_32px_64px_-24px_rgba(15,23,42,0.45)] sm:max-w-[300px] lg:mx-0">
                <Image
                  src={activeBook.cover}
                  alt={activeBook.coverAlt}
                  fill
                  sizes="(max-width: 1024px) 300px, 320px"
                  className="object-cover"
                  priority={false}
                />

                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                <div className="absolute left-0 top-0 h-full w-2 bg-[#c9a962]/90" />

                <div className="absolute bottom-0 left-0 right-0 p-6 pl-8 sm:p-8 sm:pl-10">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#c9a962]/90">
                    {activeBook.category}
                  </p>
                  <p className="mt-4 font-serif text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl">
                    {activeBook.title}
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/60">
                    {activeBook.shortLabel}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {books.map((book) => {
                  const isActive = book.id === activeBook.id;

                  return (
                    <button
                      key={book.id}
                      type="button"
                      onClick={() => setActiveBookId(book.id)}
                      className={[
                        "group relative overflow-hidden rounded-xl border text-left transition",
                        isActive
                          ? "border-[#c9a962]/70 ring-2 ring-[#c9a962]/20"
                          : "border-slate-200 hover:border-slate-300",
                      ].join(" ")}
                      aria-pressed={isActive}
                      aria-label={`Выбрать книгу ${book.title}`}
                    >
                      <div className="relative aspect-[3/4] bg-slate-100">
                        <Image
                          src={book.cover}
                          alt={book.coverAlt}
                          fill
                          sizes="120px"
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-900/10 to-transparent" />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 xl:col-span-8">
            <SectionHeading
              headingId="book-section-heading"
              eyebrow="Фундамент"
              title={activeBook.title}
              description={activeBook.description}
            />

            <ul className="mt-10 space-y-4 border-l border-slate-200 pl-6">
              {activeBook.takeaways.map((line) => (
                <li
                  key={line}
                  className="relative text-base leading-relaxed text-slate-600 before:absolute before:-left-6 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-[#c9a962]/80 before:content-['']"
                >
                  {line}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="primary">
                <Link href={activeBook.href}>Подробнее</Link>
              </Button>
              <Button asChild variant="secondary">
                <Link href={activeBook.href}>Читать</Link>
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}