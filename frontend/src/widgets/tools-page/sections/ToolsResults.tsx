"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

const audiences = [
  {
    title: "Акимат",
    text: "Мониторинг качества управления домами",
  },
  {
    title: "Управляющая компания",
    text: "Контроль KPI, бюджета и процессов",
  },
  {
    title: "ОСИ / Совет дома",
    text: "Прозрачность расходов и отчетности",
  },
  {
    title: "Эксперт / консультант",
    text: "Аудит и внедрение методологии",
  },
] as const;

export function ToolsResults() {
  return (
    <section className="bg-white py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">
            Для кого эти инструменты
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:grid-cols-2">
          {audiences.map((item, index) => (
            <motion.article
              key={item.title}
              className="rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-slate-50 p-6 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
