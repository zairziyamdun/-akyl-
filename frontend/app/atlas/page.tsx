import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { SectionShell } from "@/components/ui/SectionShell";

export const metadata: Metadata = {
  title: "Атлас управления МЖД | AKYL",
  description:
    "Карты процессов, архитектура и дашборды: визуальная модель системы управления.",
};

const blocks = [
  {
    title: "Карты процессов",
    description:
      "Пошаговые карты бизнес-процессов управления и типовые цепочки.",
    href: "/atlas/process-maps",
  },
  {
    title: "Архитектура",
    description: "Схема элементов и связей управленческой системы.",
    href: "/atlas/architecture",
  },
  {
    title: "Дашборды",
    description:
      "Обзорные панели и связка с инструментами аналитики платформы.",
    href: "/atlas/dashboards",
  },
] as const;

export default function AtlasPage() {
  return (
    <div className="w-full bg-white text-slate-900">
      <section className="border-b border-black/5 bg-slate-50 py-16 lg:py-20">
        <Container>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">
                Атлас AKYL
              </p>
              <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
                Визуальная карта системы
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Навигация по процессам, архитектуре и аналитическим срезам —
                в одной логике с методологией.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <SectionShell className="border-t border-black/5 bg-white">
        <div className="grid gap-8 lg:col-span-12 lg:grid-cols-12 lg:gap-10">
          {blocks.map((b) => (
            <div
              key={b.href}
              className="rounded-2xl border border-black/10 bg-slate-50/80 p-6 lg:col-span-4"
            >
              <h2 className="text-xl font-bold tracking-tight">{b.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {b.description}
              </p>
              <Link
                href={b.href}
                className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
              >
                Открыть →
              </Link>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell className="border-t border-black/5 bg-slate-50">
        <div className="lg:col-span-8">
          <h2 className="text-xl font-bold tracking-tight">
            Схемы взаимодействия
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Модели коммуникаций, ролей и принятия решений.
          </p>
          <Link
            href="/atlas/interactions"
            className="mt-4 inline-flex text-sm font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 hover:decoration-slate-500"
          >
            Перейти к разделу →
          </Link>
        </div>
      </SectionShell>
    </div>
  );
}
