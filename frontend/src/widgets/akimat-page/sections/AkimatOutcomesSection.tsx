"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";
import { akimatOutcomes, akimatOutcomesSection } from "@/widgets/akimat-page";

import {
  akimatSectionMotion,
  akimatStagger,
  akimatStaggerItem,
} from "../model/akimatMotion";

export function AkimatOutcomesSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="akimat-outcomes-heading"
    >
      <Container>
        <motion.div {...akimatSectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            {akimatOutcomesSection.eyebrow}
          </p>
          <h2
            id="akimat-outcomes-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            {akimatOutcomesSection.title}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
            {akimatOutcomesSection.description}
          </p>

          <motion.div
            className="mt-12 grid gap-10 border-t border-slate-200 pt-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-slate-200"
            variants={akimatStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
          >
            {akimatOutcomes.map((item) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  variants={akimatStaggerItem}
                  className="md:px-8 md:first:pl-0 md:last:pr-0"
                >
                  <Icon
                    className="text-slate-900"
                    size={22}
                    strokeWidth={1.6}
                  />
                  <h3 className="mt-5 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {item.text}
                  </p>
                </motion.article>
              );
            })}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
