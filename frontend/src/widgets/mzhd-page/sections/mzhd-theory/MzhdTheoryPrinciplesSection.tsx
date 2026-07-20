"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { mzhdTheoryPrinciples, sectionMotion } from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheoryPrinciplesSection() {
  return (
    <section id="principles" className="py-16 sm:py-20">
      <Container>
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Фундамент"
            title="Принципы теории AKYL"
            description="Четыре опоры, на которых строится профессиональное управление: от стратегии дома до ежедневной эксплуатации."
          />
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {mzhdTheoryPrinciples.map((principle, index) => {
            const Icon = principle.icon;
            return (
              <motion.article
                key={principle.title}
                className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:border-sky-200 hover:shadow-md"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 text-sky-700 transition group-hover:bg-sky-100">
                  <Icon size={22} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-slate-900">
                  {principle.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {principle.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
