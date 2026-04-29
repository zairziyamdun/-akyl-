"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const tools = [
  {
    title: "Индекс эффективности",
    description:
      "Сводная оценка качества управления домом по ключевым контурам с динамикой изменений.",
    features: ["Индекс 0-100", "Оценка по блокам", "Сигналы зон риска"],
    audience: "Полезен: УК, ОСИ, совет дома",
    href: "/tools/index-efficiency",
    cta: "Рассчитать индекс",
  },
  {
    title: "Анализ бюджета",
    description:
      "Финансовая диагностика расходов и доходов: где отклонения и какие статьи требуют управленческого внимания.",
    features: ["План-факт", "Финансовые риски", "Зоны оптимизации"],
    audience: "Полезен: фин. блок УК, руководитель",
    href: "/tools/budget-analysis",
    cta: "Анализировать бюджет",
  },
  {
    title: "Чек-листы",
    description:
      "Пошаговый аудит операционных процессов для фиксации фактов и контроля качества исполнения.",
    features: ["Аудит процессов", "Контроль регламентов", "Единый формат проверки"],
    audience: "Полезен: операционный менеджер, инспектор",
    href: "/tools/checklists",
    cta: "Открыть чек-листы",
  },
  {
    title: "Управленческий отчет",
    description:
      "Формирует понятную картину по состоянию дома: показатели, выводы и приоритеты действий.",
    features: ["Сводный отчет", "Выводы и рекомендации", "Презентационный формат"],
    audience: "Полезен: руководство, собственники, акимат",
    href: "/tools/management-report",
    cta: "Сформировать отчет",
  },
] as const;

export function ToolsGrid() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="grid gap-5 md:grid-cols-2">
          {tools.map((tool, index) => (
            <motion.article
              key={tool.title}
              className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <h3 className="text-2xl font-semibold tracking-tight text-slate-950">{tool.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{tool.description}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {tool.features.map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs font-medium uppercase tracking-wide text-slate-500">{tool.audience}</p>
              <Link href={tool.href} className="mt-5 inline-flex">
                <Button variant="secondary">{tool.cta}</Button>
              </Link>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
