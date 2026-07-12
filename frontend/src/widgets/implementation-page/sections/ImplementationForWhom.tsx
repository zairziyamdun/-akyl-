"use client";

import { motion } from "framer-motion";
import { Building2, HardHat, Landmark, Users, Wrench } from "lucide-react";

import { Container } from "@/shared/ui/Container";

import { implementationSectionMotion } from "../model/implementationMotion";

const cards = [
  {
    title: "Для управляющих компаний",
    description:
      "Стандартизация процессов, измеримое качество сервиса и инструменты для портфеля домов.",
    icon: Building2,
  },
  {
    title: "Для ОСИ и советов домов",
    description:
      "Прозрачность работы УК, понятные отчеты и контрольные точки без административного хаоса.",
    icon: Users,
  },
  {
    title: "Для акиматов",
    description:
      "Единая методическая рамка, KPI по жилищному фонду и основа для надзора и поддержки УК.",
    icon: Landmark,
  },
  {
    title: "Для девелоперов",
    description:
      "Передача дома новоселам с уже заложенной моделью управления и цифровым контуром.",
    icon: HardHat,
  },
  {
    title: "Для сервисных организаций",
    description:
      "Согласованные SLA, интеграция в процессы дома и измеримый вклад в индекс эффективности.",
    icon: Wrench,
  },
];

export function ImplementationForWhom() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{ backgroundColor: "#f8f5ef" }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <h2 className="font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Кому подходит внедрение
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article
                  key={card.title}
                  className="group rounded-3xl border border-stone-200/90 bg-white/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-[0_20px_56px_rgba(41,37,36,0.08)]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-900 text-white shadow-md transition group-hover:scale-[1.02]">
                    <Icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-stone-900">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">
                    {card.description}
                  </p>
                </article>
              );
            })}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
