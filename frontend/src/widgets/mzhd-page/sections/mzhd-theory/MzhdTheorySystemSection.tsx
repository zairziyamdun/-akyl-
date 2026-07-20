"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/shared/ui/Container";
import { mzhdTheorySystemSteps, sectionMotion } from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheorySystemSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 py-16 sm:py-20">
      <Container>
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Системный подход"
            title="МЖД как управляемая система"
            description="Дом — не набор разрозненных услуг, а цикл: ресурсы превращаются в качество среды проживания, а обратная связь корректирует управление."
          />
        </motion.div>

        <div className="mt-12 grid gap-4 lg:grid-cols-4">
          {mzhdTheorySystemSteps.map((item, index) => (
            <motion.div
              key={item.step}
              className="relative rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
            >
              {index < mzhdTheorySystemSteps.length - 1 ? (
                <ArrowRight
                  className="absolute top-1/2 -right-3 z-10 hidden h-5 w-5 -translate-y-1/2 text-slate-300 lg:block"
                  aria-hidden
                />
              ) : null}
              <span className="text-xs font-bold tracking-widest text-sky-700">
                {item.step}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
