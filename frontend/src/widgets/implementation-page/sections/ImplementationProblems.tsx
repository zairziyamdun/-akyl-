"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

import { Container } from "@/shared/ui/Container";

import { implementationSectionMotion } from "../model/implementationMotion";

const problems = [
  "управление держится на ручных решениях",
  "нет прозрачной финансовой картины",
  "заявки и аварии не связаны с KPI",
  "жители не видят понятной отчетности",
  "подрядчики работают без единой системы контроля",
];

export function ImplementationProblems() {
  return (
    <section
      className="border-b border-stone-200/80 py-16 sm:py-20"
      style={{ backgroundColor: "#f8f5ef" }}
    >
      <Container>
        <motion.div {...implementationSectionMotion}>
          <h2 className="max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl">
            Почему внедрение нужно делать системно
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {problems.map((text) => (
              <article
                key={text}
                className="group flex gap-3 rounded-3xl border border-stone-200/90 bg-white/90 p-5 shadow-sm transition-shadow duration-300 hover:shadow-[0_16px_48px_rgba(41,37,36,0.07)]"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-800 ring-1 ring-amber-100 transition group-hover:bg-amber-100/80">
                  <AlertCircle className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <p className="text-sm leading-6 text-stone-700">{text}</p>
              </article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
