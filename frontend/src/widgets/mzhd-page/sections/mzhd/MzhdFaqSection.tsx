"use client";

import { motion } from "framer-motion";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui";
import { Container } from "@/shared/ui/Container";

import { mzhdFaqItems } from "../../model/mzhd-faq.data";
import { sectionMotion } from "../../model/mzhdMotion";

export function MzhdFaqSection() {
  return (
    <section
      className="py-16 sm:py-20"
      aria-labelledby="mzhd-faq-heading"
      data-geo-faq
    >
      <Container>
        <motion.div {...sectionMotion}>
          <p className="text-xs font-medium tracking-[0.16em] text-slate-500 uppercase">
            Вопросы
          </p>
          <h2
            id="mzhd-faq-heading"
            className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            Частые вопросы об управлении МЖД
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Краткие ответы, которые помогают понять отличие системного управления
            домом от хаотичного администрирования.
          </p>
        </motion.div>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {mzhdFaqItems.map((item) => (
            <Collapsible key={item.question}>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 hover:bg-slate-50">
                {item.question}
                <span className="text-slate-400" aria-hidden>
                  +
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="px-6 pb-5 text-sm leading-7 text-slate-600">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </section>
  );
}
