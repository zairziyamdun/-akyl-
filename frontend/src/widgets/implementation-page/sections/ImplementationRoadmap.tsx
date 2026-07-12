"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  LayoutDashboard,
  Puzzle,
  ScanSearch,
  SearchCheck,
  TrendingUp,
} from "lucide-react";

import { Container } from "@/shared/ui/Container";
import { cn } from "@/shared/lib";

import { implementationSectionMotion } from "../model/implementationMotion";

type StepStatus = "done" | "active" | "next";

type RoadmapStep = {
  number: string;
  title: string;
  description: string;
  result: string;
  status: StepStatus;
  icon: typeof ScanSearch;
};

const steps: RoadmapStep[] = [
  {
    number: "01",
    title: "Диагностика дома",
    description:
      "анализ технического состояния, финансов, заявок, документов и коммуникаций.",
    result: "Карта объекта и базовых контуров управления",
    status: "done",
    icon: ScanSearch,
  },
  {
    number: "02",
    title: "Аудит управления",
    description:
      "выявление слабых мест, рисков, потерь и разрывов в процессах.",
    result: "Реестр рисков и приоритетов улучшения",
    status: "done",
    icon: SearchCheck,
  },
  {
    number: "03",
    title: "Проектирование системы",
    description:
      "настройка ролей, процессов, регламентов, отчетности и KPI.",
    result: "Модель управления и набор показателей",
    status: "active",
    icon: LayoutDashboard,
  },
  {
    number: "04",
    title: "Внедрение инструментов",
    description:
      "запуск чек-листов, бюджетного анализа, управленческого отчета и индекса эффективности.",
    result: "Рабочий контур цифровых инструментов AKYL",
    status: "next",
    icon: Puzzle,
  },
  {
    number: "05",
    title: "Обучение участников",
    description:
      "подготовка УК, ОСИ, совета дома и ответственных специалистов.",
    result: "Единое понимание процессов и отчетности",
    status: "next",
    icon: GraduationCap,
  },
  {
    number: "06",
    title: "Контроль и развитие",
    description:
      "регулярный мониторинг, корректировка процессов и повышение индекса управления.",
    result: "Устойчивый цикл улучшений по данным",
    status: "next",
    icon: TrendingUp,
  },
];

function StatusPill({ status }: { status: StepStatus }) {
  const config = {
    done: {
      label: "Готово",
      className: "bg-emerald-100 text-emerald-800 ring-emerald-200/80",
    },
    active: {
      label: "В фокусе",
      className: "bg-amber-100 text-amber-900 ring-amber-200/80",
    },
    next: {
      label: "Далее",
      className: "bg-stone-100 text-stone-600 ring-stone-200/80",
    },
  }[status];

  return (
    <span
      className={cn(
        "inline-flex shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-semibold ring-1",
        config.className,
      )}
    >
      {config.label}
    </span>
  );
}

export function ImplementationRoadmap() {
  return (
    <section
      id="roadmap"
      className="scroll-mt-24 border-b border-stone-200/80 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, #f7f3ea 0%, #f8f5ef 50%, #f5f1e8 100%)",
      }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Дорожная карта внедрения
          </h2>
          <p className="mt-4 max-w-2xl text-stone-600">
            Шесть этапов от диагностики до устойчивого контроля: каждый этап дает
            измеримый результат и готовит площадку для следующего.
          </p>

          {/* Mobile / tablet: cards */}
          <div className="mt-12 lg:hidden">
            <div className="flex flex-col gap-4">
              {steps.map((step) => {
                const Icon = step.icon;
                return (
                  <article
                    key={step.number}
                    className="rounded-3xl border border-stone-200/90 bg-white/90 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="font-mono text-sm font-semibold tabular-nums text-stone-400">
                        {step.number}
                      </span>
                      <StatusPill status={step.status} />
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-md">
                        <Icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <h3 className="text-lg font-semibold text-stone-900">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {step.description}
                    </p>
                    <p className="mt-3 border-t border-stone-100 pt-3 text-sm font-medium text-stone-800">
                      Итог: {step.result}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* Desktop: vertical timeline */}
          <div className="mt-12 hidden lg:block">
            <div className="relative">
              <div className="absolute top-10 bottom-10 left-[1.875rem] w-px bg-gradient-to-b from-stone-200 via-stone-300 to-stone-200" />
              <ul className="relative space-y-6">
                {steps.map((step) => {
                  const Icon = step.icon;
                  return (
                    <li key={step.number} className="relative flex gap-8 pl-1">
                      <div className="relative z-10 flex shrink-0 flex-col items-center">
                        <div
                          className={cn(
                            "flex h-14 w-14 items-center justify-center rounded-2xl border shadow-md",
                            step.status === "active"
                              ? "border-amber-200 bg-amber-50 text-amber-900"
                              : step.status === "done"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                                : "border-stone-200 bg-white text-stone-700",
                          )}
                        >
                          <Icon className="h-6 w-6" strokeWidth={1.75} />
                        </div>
                        <span className="mt-2 font-mono text-xs font-medium text-stone-400">
                          {step.number}
                        </span>
                      </div>
                      <article className="min-w-0 flex-1 rounded-3xl border border-stone-200/90 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-[0_20px_56px_rgba(41,37,36,0.07)]">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-xl font-semibold text-stone-900">
                            {step.title}
                          </h3>
                          <StatusPill status={step.status} />
                        </div>
                        <p className="mt-2 text-sm leading-7 text-stone-600">
                          {step.description}
                        </p>
                        <p className="mt-4 rounded-2xl border border-stone-100 bg-stone-50/80 px-4 py-3 text-sm font-medium text-stone-800">
                          Результат этапа: {step.result}
                        </p>
                      </article>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
