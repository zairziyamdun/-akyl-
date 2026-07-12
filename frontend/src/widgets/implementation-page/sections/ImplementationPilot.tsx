"use client";

import { motion } from "framer-motion";
import { CalendarRange } from "lucide-react";

import { Container } from "@/shared/ui/Container";

import { implementationSectionMotion } from "../model/implementationMotion";

const phases = [
  {
    range: "0–30 дней",
    title: "Диагностика и сбор данных",
    body: "Инвентаризация процессов, заявок, финансов и документов; формирование базы для проектирования.",
  },
  {
    range: "30–60 дней",
    title: "Настройка процессов и KPI",
    body: "Регламенты, роли, показатели и связка заявок с контролем качества и бюджетом.",
  },
  {
    range: "60–90 дней",
    title: "Отчетность, контроль и корректировка",
    body: "Управленческие отчеты, индекс эффективности, корректировки и закрепление практики.",
  },
];

const ieuDims = [
  { label: "Финансы", before: 38, after: 82 },
  { label: "Эксплуатация", before: 44, after: 78 },
  { label: "Сервис", before: 52, after: 80 },
  { label: "Подрядчики", before: 48, after: 79 },
  { label: "Управление", before: 50, after: 86 },
];

export function ImplementationPilot() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(165deg, #f5f1e8 0%, #f8f5ef 40%, #f7f3ea 100%)",
      }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-start">
            <div>
              <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
                Пилотное внедрение на одном доме
              </h2>
              <p className="mt-4 max-w-2xl text-stone-600">
                Типовой пилот на одном объекте за 30–90 дней позволяет отладить
                модель управления и масштабировать её на портфель без хаоса.
                Индекс эффективности управления (IEU) отражает качество через
                финансы, эксплуатацию, сервис, подрядчиков и управление.
              </p>

              <div className="mt-10 space-y-4">
                {phases.map((phase) => (
                  <article
                    key={phase.range}
                    className="rounded-3xl border border-stone-200/90 bg-white/85 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-6"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold text-white">
                        <CalendarRange className="h-3.5 w-3.5" />
                        {phase.range}
                      </span>
                    </div>
                    <h3 className="mt-3 text-lg font-semibold text-stone-900">
                      {phase.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {phase.body}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <aside className="rounded-3xl border border-stone-200/90 bg-white/90 p-6 shadow-[0_20px_60px_rgba(41,37,36,0.08)] backdrop-blur-sm">
              <p className="text-xs font-medium tracking-wide text-stone-500 uppercase">
                Индекс эффективности (IEU)
              </p>
              <p className="mt-2 text-sm text-stone-600">
                Пример динамики пилота на одном доме
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-stone-100 bg-stone-50 p-4">
                  <p className="text-xs text-stone-500">IEU до</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-stone-800">
                    46%
                  </p>
                </div>
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                  <p className="text-xs text-emerald-800/80">IEU после</p>
                  <p className="mt-1 text-2xl font-semibold tabular-nums text-emerald-900">
                    81%
                  </p>
                </div>
              </div>

              <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-center">
                <p className="text-sm font-semibold text-amber-950">
                  Рост: +35 п.п.
                </p>
              </div>

              <p className="mt-6 text-xs font-medium tracking-wide text-stone-500 uppercase">
                Разрез по контурам
              </p>
              <div className="mt-3 space-y-3.5">
                {ieuDims.map((d) => (
                  <div key={d.label}>
                    <div className="mb-1.5 flex justify-between text-xs text-stone-600">
                      <span>{d.label}</span>
                      <span className="tabular-nums text-stone-800">
                        {d.before}% → {d.after}%
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-stone-400/90"
                          style={{ width: `${d.before}%` }}
                        />
                      </div>
                      <span className="shrink-0 text-[10px] text-stone-400" aria-hidden="true">
                        →
                      </span>
                      <div className="h-2 min-w-0 flex-1 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-stone-900"
                          style={{ width: `${d.after}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
