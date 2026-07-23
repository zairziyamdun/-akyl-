"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

import { mzhdDefinition } from "../../model/mzhd-faq.data";
import { methodologyCards } from "../../model/mzhd.data";
import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdDefinitionSection() {
  return (
    <motion.section
      className="border-y border-slate-200 bg-white py-14 sm:py-16"
      {...sectionMotion}
      aria-labelledby="mzhd-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Определение
          </p>
          <h2
            id="mzhd-definition-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Что такое управление МЖД по методологии AKYL
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-slate-700 sm:text-lg"
          >
            {mzhdDefinition}
          </p>
          <ul className="mt-6 space-y-2 text-sm leading-7 text-slate-600 sm:text-base">
            {methodologyCards.slice(0, 4).map((card) => (
              <li key={card.href} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400" />
                <span>
                  <span className="font-medium text-slate-800">
                    {card.title}.
                  </span>{" "}
                  {card.description}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </motion.section>
  );
}
