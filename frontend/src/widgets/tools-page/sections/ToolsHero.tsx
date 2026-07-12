"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";

type ToolItem = {
  id: string;
  name: string;
  route: string;
  headline: string;
  description: string;
  cta: string;
  score: number;
  progress: number[];
  status: "Стабильно" | "Зона риска" | "Рост";
  budgetRows: Array<{ name: string; plan: string; fact: string; delta: string }>;
};

const TOOLS: ToolItem[] = [
  {
    id: "index-efficiency",
    name: "Индекс эффективности",
    route: "/tools/index-efficiency",
    headline: "Оцените эффективность управления домом",
    description:
      "Комплексный индекс 0–100 на основе KPI управления, финансов, сервиса и эксплуатации.",
    cta: "Рассчитать индекс",
    score: 78,
    progress: [82, 74, 79],
    status: "Рост",
    budgetRows: [
      { name: "Эксплуатация", plan: "12.4", fact: "11.9", delta: "-4%" },
      { name: "Сервис", plan: "5.8", fact: "6.1", delta: "+5%" },
      { name: "Резерв", plan: "2.2", fact: "2.0", delta: "-9%" },
    ],
  },
  {
    id: "budget-analysis",
    name: "Анализ бюджета",
    route: "/tools/budget-analysis",
    headline: "Поймите, где теряются деньги",
    description:
      "План-факт анализ бюджета, отклонения, финансовые риски и зоны оптимизации.",
    cta: "Анализировать бюджет",
    score: 66,
    progress: [58, 64, 73],
    status: "Зона риска",
    budgetRows: [
      { name: "Подрядчики", plan: "8.1", fact: "9.4", delta: "+16%" },
      { name: "Аварийка", plan: "3.3", fact: "4.0", delta: "+21%" },
      { name: "Энерго", plan: "6.7", fact: "6.2", delta: "-7%" },
    ],
  },
  {
    id: "checklists",
    name: "Чек-листы",
    route: "/tools/checklists",
    headline: "Проверьте процессы управления",
    description:
      "Интерактивные чек-листы для аудита эксплуатации, сервиса, документов и контроля качества.",
    cta: "Открыть чек-листы",
    score: 84,
    progress: [91, 86, 80],
    status: "Стабильно",
    budgetRows: [
      { name: "Тех. блок", plan: "94%", fact: "89%", delta: "-5 п.п." },
      { name: "Сервис", plan: "90%", fact: "87%", delta: "-3 п.п." },
      { name: "Документы", plan: "95%", fact: "93%", delta: "-2 п.п." },
    ],
  },
  {
    id: "management-report",
    name: "Управленческий отчет",
    route: "/tools/management-report",
    headline: "Соберите прозрачный отчет по дому",
    description:
      "Единый управленческий отчет с выводами, показателями и рекомендациями для принятия решений.",
    cta: "Сформировать отчет",
    score: 81,
    progress: [77, 82, 85],
    status: "Рост",
    budgetRows: [
      { name: "KPI пакет", plan: "100%", fact: "100%", delta: "OK" },
      { name: "Финансы", plan: "100%", fact: "96%", delta: "-4%" },
      { name: "Риски", plan: "100%", fact: "93%", delta: "-7%" },
    ],
  },
];

const INTERVAL_MS = 4500;

export function ToolsHero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTool = TOOLS[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TOOLS.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, []);

  const statusClass = useMemo(() => {
    if (activeTool.status === "Стабильно") return "bg-emerald-100 text-emerald-700";
    if (activeTool.status === "Зона риска") return "bg-amber-100 text-amber-700";
    return "bg-sky-100 text-sky-700";
  }, [activeTool.status]);

  return (
    <section className="border-b border-slate-200/70 bg-gradient-to-b from-sky-50 via-white to-white">
      <Container className="py-12 md:py-16 lg:py-20">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTool.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-[0_12px_36px_-22px_rgba(14,116,144,0.35)] md:p-6"
            >
              <div className="grid gap-4 sm:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>KPI Dashboard</span>
                    <span className={`rounded-full px-2 py-0.5 font-medium ${statusClass}`}>
                      {activeTool.status}
                    </span>
                  </div>
                  <div className="mt-3 flex items-end gap-3">
                    <div>
                      <p className="text-3xl font-semibold tracking-tight text-slate-900">{activeTool.score}</p>
                      <p className="text-xs text-slate-500">Индекс / 100</p>
                    </div>
                    <div className="h-14 flex-1 rounded-xl bg-gradient-to-r from-cyan-400/25 via-sky-400/20 to-emerald-400/25 p-2">
                      <div className="flex h-full items-end gap-1">
                        {activeTool.progress.map((value) => (
                          <div
                            key={value}
                            className="w-1/3 rounded-t-md bg-gradient-to-t from-sky-500 to-cyan-400"
                            style={{ height: `${Math.max(20, value - 30)}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    {activeTool.progress.map((value, idx) => (
                      <div key={`${activeTool.id}-${idx}`}>
                        <div className="mb-1 flex justify-between text-xs text-slate-500">
                          <span>Блок {idx + 1}</span>
                          <span>{value}%</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-slate-200">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                            style={{ width: `${value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-100 bg-white p-4">
                  <p className="text-xs font-medium text-slate-500">План / Факт</p>
                  <div className="mt-2 space-y-2 text-xs">
                    {activeTool.budgetRows.map((row) => (
                      <div key={row.name} className="rounded-lg border border-slate-100 p-2">
                        <div className="font-medium text-slate-700">{row.name}</div>
                        <div className="mt-1 grid grid-cols-3 gap-2 text-slate-500">
                          <span>П {row.plan}</span>
                          <span>Ф {row.fact}</span>
                          <span className="text-right font-medium text-slate-700">{row.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-700">Digital toolkit</p>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl lg:text-5xl">
              Инструменты профессионального управления МЖД
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">
              Практические цифровые решения для оценки эффективности, анализа бюджета, контроля процессов и формирования управленческой отчетности.
            </p>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTool.id + "-content"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="mt-7 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h2 className="text-xl font-semibold tracking-tight text-slate-900">{activeTool.headline}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{activeTool.description}</p>
                <Link href={activeTool.route} className="mt-4 inline-flex">
                  <Button>{activeTool.cta}</Button>
                </Link>
              </motion.div>
            </AnimatePresence>

            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              {TOOLS.map((tool, index) => (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`rounded-xl border px-4 py-3 text-left transition ${
                    index === activeIndex
                      ? "border-sky-300 bg-sky-50 text-sky-800 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                  }`}
                >
                  <p className="text-sm font-semibold">{tool.name}</p>
                  <p className="mt-1 text-xs">{tool.cta}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
