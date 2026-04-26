"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { homeTransition, homeViewport } from "@/lib/homePageMotion";

const phases = [
  { step: "01", title: "Диагностика", text: "Сбор фактуры по процессам, ролям и данным." },
  { step: "02", title: "Проектирование", text: "Целевая модель управления и дорожная карта." },
  { step: "03", title: "Настройка процессов", text: "Регламенты, контуры ответственности, цифровые точки контроля." },
  { step: "04", title: "Обучение", text: "Вовлечение команд и закрепление практики." },
  { step: "05", title: "Контроль результата", text: "KPI, ревизии и корректировка на основе данных." },
];

export function HomeImplementationPracticeSection() {
  return (
    <section className="border-b border-slate-200/80 bg-white">
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={homeViewport}
            transition={homeTransition}
            className="max-w-xl"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
              Практика
            </span>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Внедрение как процесс
            </h2>
            <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
              AKYL — не только методология: это дорожка от текущего состояния к управляемой модели.
            </p>
          </motion.div>
          <Link
            href="/implementation"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
          >
            Подробнее о внедрении
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-14 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-0 gap-4 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible lg:gap-4">
            {phases.map((p, i) => (
              <motion.div
                key={p.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={homeViewport}
                transition={{ ...homeTransition, delay: i * 0.06 }}
                className="flex w-[min(280px,85vw)] shrink-0 flex-col rounded-2xl border border-slate-200 bg-slate-50 p-5 md:w-auto"
              >
                <span className="font-mono text-xs font-medium text-slate-400">{p.step}</span>
                <h3 className="mt-3 text-base font-semibold text-slate-900">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{p.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
