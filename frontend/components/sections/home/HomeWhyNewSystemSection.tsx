"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  GitBranch,
  HelpCircle,
  ShieldOff,
  Wallet,
  Workflow,
} from "lucide-react";

import { Container } from "@/components/ui/Container";
import { homeTransition, homeViewport } from "@/lib/homePageMotion";

const items = [
  {
    title: "Непрозрачные финансы",
    text: "Платежи и факты расходятся, сметы не собираются в управляемую модель.",
    icon: Wallet,
  },
  {
    title: "Хаос в процессах",
    text: "Заявки, акты и решения живут в разных контурах без единой логики.",
    icon: Workflow,
  },
  {
    title: "Слабый контроль подрядчиков",
    text: "Объёмы, сроки и качество редко сверяются системно.",
    icon: ShieldOff,
  },
  {
    title: "Размытая ответственность",
    text: "Роли УК, жителей и подрядчиков плохо стыкуются с процессами.",
    icon: HelpCircle,
  },
  {
    title: "Отсутствие KPI",
    text: "Нет устойчивых показателей — улучшать управление объективно сложно.",
    icon: BarChart3,
  },
  {
    title: "Слабая аналитика",
    text: "Данные не складываются в картину для решений и контроля.",
    icon: GitBranch,
  },
];

export function HomeWhyNewSystemSection() {
  return (
    <section className="relative border-b border-slate-200/80 bg-slate-50">
      <Container className="py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={homeViewport}
          transition={homeTransition}
          className="max-w-2xl"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            Диагноз
          </span>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl lg:text-[42px] lg:leading-[1.1]">
            Почему нужна новая система управления
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
            Текущая модель часто не даёт предсказуемого результата: есть активность, но нет
            управляемой системы.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={homeViewport}
                transition={{ ...homeTransition, delay: i * 0.05 }}
                className="group rounded-2xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow duration-300 hover:border-slate-300 hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
