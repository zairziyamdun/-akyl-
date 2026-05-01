"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, X } from "lucide-react";

import { Container } from "@/components/ui/Container";

import { implementationSectionMotion } from "./implementationMotion";

const beforeItems = [
  "хаотичные заявки",
  "слабый контроль бюджета",
  "нет KPI",
  "отчеты непонятны",
  "решения принимаются реактивно",
];

const afterItems = [
  "единая система процессов",
  "прозрачный бюджет",
  "KPI и индекс эффективности",
  "понятная отчетность",
  "управление по данным",
];

export function ImplementationBeforeAfter() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{ backgroundColor: "#f8f5ef" }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <h2 className="text-center font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            До внедрения и после
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-stone-600">
            Системное внедрение AKYL переводит дом из режима «тушения пожаров» в
            режим предсказуемого управления.
          </p>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="flex flex-col rounded-3xl border border-stone-200/90 bg-white/80 p-8 shadow-[0_16px_48px_rgba(41,37,36,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(41,37,36,0.08)]">
              <div className="flex items-center gap-2 text-stone-500">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-red-50 text-red-700 ring-1 ring-red-100">
                  <X className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">
                  До внедрения
                </span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {beforeItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-red-100/80 bg-red-50/40 px-4 py-3 text-sm text-stone-700"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-red-500 ring-1 ring-red-100">
                      <X className="h-3 w-3" />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </article>

            <article className="flex flex-col rounded-3xl border border-emerald-200/60 bg-gradient-to-br from-white to-emerald-50/40 p-8 shadow-[0_16px_48px_rgba(41,37,36,0.06)] transition-shadow duration-300 hover:shadow-[0_24px_64px_rgba(5,104,71,0.12)]">
              <div className="flex items-center gap-2 text-emerald-800">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 ring-1 ring-emerald-200">
                  <Check className="h-4 w-4" strokeWidth={2} />
                </span>
                <span className="text-sm font-semibold tracking-wide uppercase">
                  После внедрения
                </span>
              </div>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {afterItems.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-emerald-100/90 bg-white/80 px-4 py-3 text-sm text-stone-800 shadow-sm"
                  >
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check className="h-3 w-3" strokeWidth={2.5} />
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm font-medium text-emerald-800">
                <ArrowRight className="h-4 w-4" />
                Методология AKYL · измеримо и воспроизводимо
              </div>
            </article>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
