"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { mzhdTheoryIntroStats, sectionMotion } from "@/widgets/mzhd-page";

export function MzhdTheoryIntroSection() {
  return (
    <section className="border-b border-slate-200 bg-slate-50 py-12 sm:py-14">
      <Container>
        <motion.div
          className="grid gap-6 sm:grid-cols-3"
          {...sectionMotion}
        >
          {mzhdTheoryIntroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white bg-white px-6 py-8 text-center shadow-sm"
            >
              <p className="font-[family-name:var(--font-sora)] text-4xl font-semibold text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm text-slate-600">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}
