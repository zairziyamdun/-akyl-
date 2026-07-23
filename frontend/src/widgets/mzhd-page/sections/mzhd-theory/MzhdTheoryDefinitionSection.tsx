"use client";

import { motion } from "framer-motion";

import { Container } from "@/shared/ui/Container";

import { mzhdTheoryDefinition } from "../../model/mzhd-theory.data";
import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdTheoryDefinitionSection() {
  return (
    <motion.section
      className="border-b border-slate-200 bg-white py-12 sm:py-14"
      {...sectionMotion}
      aria-labelledby="mzhd-theory-definition-heading"
    >
      <Container>
        <div className="mx-auto max-w-3xl">
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Определение
          </p>
          <h2
            id="mzhd-theory-definition-heading"
            className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl"
          >
            Что такое теория управления МЖД
          </h2>
          <p
            data-geo-definition
            className="mt-5 text-base leading-8 text-slate-700 sm:text-lg"
          >
            {mzhdTheoryDefinition}
          </p>
        </div>
      </Container>
    </motion.section>
  );
}
