"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

import { methodologyCards } from "../../model/mzhd.data";
import { mzhdDefinition } from "../../model/mzhd-faq.data";
import {
  mzhdStagger,
  mzhdStaggerItem,
  sectionMotion,
} from "../../model/mzhdMotion";

export function MzhdDefinitionSection() {
  return (
    <section
      className="border-b border-slate-200 bg-white py-16 sm:py-20"
      aria-labelledby="mzhd-definition-heading"
    >
      <Container>
        <motion.div
          className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16"
          {...sectionMotion}
        >
          <div>
            <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
              Определение
            </p>
            <h2
              id="mzhd-definition-heading"
              className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
            >
              Что такое управление МЖД по методологии AKYL
            </h2>
          </div>

          <div>
            <p
              data-geo-definition
              className="text-base leading-8 text-slate-600 sm:text-lg"
            >
              {mzhdDefinition}
            </p>
            <motion.ul
              className="mt-8 space-y-0 border-t border-slate-200"
              variants={mzhdStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
            >
              {methodologyCards.map((card) => (
                <motion.li
                  key={card.href}
                  variants={mzhdStaggerItem}
                  className="flex gap-4 border-b border-slate-200 py-3.5 text-sm leading-7 text-slate-700 sm:text-base"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"
                    aria-hidden
                  />
                  <span>
                    <span className="font-medium text-slate-900">
                      {card.title}.
                    </span>{" "}
                    {card.description}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
