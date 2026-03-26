"use client";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { HOME_IMAGE_URL } from "@/lib/homeAssets";

const testimonials = [
  {
    quote:
      "После внедрения AKYL финансы стали прозрачными. Собственники наконец видят, куда идут их деньги.",
    name: "Иван Петров",
    role: "Управляющий, УК Москва",
    avatar: HOME_IMAGE_URL,
  },
  {
    quote: "Процессы упорядочились. Теперь всё идёт по плану, а не по настроению.",
    name: "Мария Сидорова",
    role: "Председатель, УК Санкт-Петербург",
    avatar: HOME_IMAGE_URL,
  },
  {
    quote:
      "Конфликты уменьшились вдвое. Люди понимают друг друга лучше, когда видят полную картину.",
    name: "Алексей Волков",
    role: "Собственник, УК Казань",
    avatar: HOME_IMAGE_URL,
  },
];

export function PracticeTestimonialsSection() {
  return (
    <section className="py-16 md:py-24 lg:py-28">
      <Container>
        <div className="mb-12 md:mb-16">
          <SectionHeading
            title="Практика внедрения"
            description="Как работает система на реальных домах"
          />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col justify-between rounded-3xl border border-black/10 bg-white p-6 md:p-8"
            >
              <div>
                <div className="mb-8">
                  <img
                    src={HOME_IMAGE_URL}
                    alt="Company logo"
                    className="h-10 w-auto opacity-70"
                  />
                </div>
                <blockquote className="text-base leading-7 text-slate-700 md:text-lg">
                  “{t.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-4">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="h-12 w-12 rounded-full object-cover ring-1 ring-black/10"
                  />
                  <div>
                    <p className="font-semibold text-slate-900">{t.name}</p>
                    <p className="text-sm text-slate-600">{t.role}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button variant="link" rightIcon={<span>›</span>}>
                  Смотреть кейс
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

