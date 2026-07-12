"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

const problems = [
  "Данные разбросаны по файлам и чатам",
  "Бюджет сложно проверить",
  "Нет единого показателя эффективности",
  "Отчеты собираются вручную",
  "Решения принимаются без аналитики",
] as const;

export function ProblemsSolutions() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Почему без инструментов управление остается непрозрачным
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((item, index) => (
            <motion.article
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 shadow-sm"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <div className="text-sm font-medium leading-relaxed text-slate-700">
                {item}
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
