"use client";

import { motion } from "framer-motion";

import { Container } from "@/components/ui/Container";

const systemSteps = [
  { title: "Чек-листы", text: "Чек-листы собирают факты" },
  { title: "Анализ бюджета", text: "Бюджет показывает финансовые отклонения" },
  { title: "Индекс эффективности", text: "Индекс переводит состояние управления в оценку 0-100" },
  { title: "Управленческий отчет", text: "Отчет собирает выводы" },
  { title: "Решения", text: "Решения запускают улучшения" },
] as const;

export function FeaturedTool() {
  return (
    <section className="bg-sky-50/70 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Инструменты AKYL работают как единая система
          </h2>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-5">
          {systemSteps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative rounded-2xl border border-sky-100 bg-white p-4 shadow-sm"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <p className="text-sm font-semibold text-slate-900">{step.title}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">{step.text}</p>
              {index < systemSteps.length - 1 && (
                <span className="pointer-events-none absolute -right-2 top-1/2 hidden -translate-y-1/2 text-sky-400 md:block">
                  {"->"}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
