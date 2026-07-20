"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { mzhdTheoryDataCycle, sectionMotion } from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheoryDataSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Данные"
            title="Управление через измеримые сигналы"
            description="Кибернетический принцип в действии: решения принимаются на основе KPI, заявок, финансов и аудитов — с замкнутым циклом обратной связи."
          />
        </motion.div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-sky-50/50 p-8 shadow-sm sm:p-10">
          <p className="text-sm font-medium text-slate-500">
            {mzhdTheoryDataCycle.label}
          </p>

          <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {mzhdTheoryDataCycle.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-3 lg:flex-col lg:gap-2">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
                  {index + 1}
                </div>
                <span className="text-sm font-semibold text-slate-800 lg:text-center">
                  {step}
                </span>
                {index < mzhdTheoryDataCycle.steps.length - 1 ? (
                  <ChevronRight
                    className="hidden h-5 w-5 text-slate-300 lg:block"
                    aria-hidden
                  />
                ) : null}
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-3xl text-sm leading-7 text-slate-600">
            {mzhdTheoryDataCycle.description}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/tools/index-efficiency"
              className="rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Индекс IEU
            </Link>
            <Link
              href="/tools/budget-analysis"
              className="rounded-full border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
            >
              Анализ бюджета
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
