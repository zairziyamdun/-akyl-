"use client";

import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  FileText,
  Gauge,
  PieChart,
} from "lucide-react";
import Link from "next/link";

import { Container } from "@/shared/ui/Container";

import { implementationSectionMotion } from "../model/implementationMotion";

const tools = [
  {
    title: "Индекс эффективности",
    href: "/tools/index-efficiency",
    description: "Сводная оценка управления домом по ключевым контурам.",
    icon: Gauge,
  },
  {
    title: "Анализ бюджета",
    href: "/tools/budget-analysis",
    description: "Прозрачность доходов и расходов, риски и опорные точки.",
    icon: PieChart,
  },
  {
    title: "KPI шаблоны",
    href: "/tools/kpi-templates",
    description: "Готовые наборы показателей под процессы МЖД.",
    icon: BarChart3,
  },
  {
    title: "Управленческий отчет",
    href: "/tools/management-report",
    description:
      "Структурированная отчетность для собственников и регуляторов.",
    icon: FileText,
  },
];

export function ImplementationToolsConnection() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, #f7f3ea 0%, #f4f0e6 50%, #f8f5ef 100%)",
      }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Внедрение связано с инструментами AKYL
          </h2>
          <p className="mt-4 max-w-2xl text-stone-600">
            На этапе внедрения инструменты не «отдельные сервисы», а части одной
            системы: данные, KPI и отчетность складываются в единую картину
            управления.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group flex gap-4 rounded-3xl border border-stone-200/90 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:border-stone-300 hover:shadow-[0_20px_56px_rgba(41,37,36,0.08)]"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-900 ring-1 ring-amber-100 transition group-hover:bg-amber-100">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="text-lg font-semibold text-stone-900">
                        {tool.title}
                      </h3>
                      <ArrowUpRight className="h-5 w-5 shrink-0 text-stone-400 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-stone-700" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-stone-600">
                      {tool.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
