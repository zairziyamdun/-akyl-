"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

const steps = [
  "Собрать данные",
  "Проверить процессы",
  "Посчитать показатели",
  "Сформировать отчет",
  "Принять решение",
] as const;

export function ToolsWorkflow() {
  return (
    <section className="bg-slate-50 py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Один цикл профессионального управления
          </h2>
        </div>

        <ol className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-5">
          {steps.map((step, index) => (
            <motion.li
              key={step}
              className="rounded-2xl border border-slate-200 bg-white p-4 text-center shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">{index + 1}</p>
              <p className="mt-2 text-sm font-medium text-slate-800">{step}</p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
