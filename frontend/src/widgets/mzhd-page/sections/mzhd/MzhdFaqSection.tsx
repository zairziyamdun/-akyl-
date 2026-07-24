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
      className="border-b border-slate-200 bg-slate-50 py-16 sm:py-20"
      aria-labelledby="mzhd-faq-heading"
      data-geo-faq
    >
      <Container>
        <motion.div {...sectionMotion}>
          <p className="text-xs font-medium tracking-[0.18em] text-slate-500 uppercase">
            Вопросы
          </p>
          <h2
            id="mzhd-faq-heading"
            className="mt-3 max-w-3xl font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl"
          >
            Частые вопросы об управлении МЖД
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
            Краткие ответы, которые помогают понять отличие системного
            управления домом от хаотичного администрирования.
          </p>
        </motion.div>

        <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200 bg-white">
          {mzhdFaqItems.map((item) => (
            <Collapsible key={item.question} className="group">
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-base font-semibold text-slate-900 outline-none transition hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-2 sm:px-2">
                {item.question}
                <span
                  className="relative h-5 w-5 shrink-0 text-slate-400"
                  aria-hidden
                >
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-current" />
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-current transition-transform duration-200 group-data-[state=open]:rotate-90 group-data-[state=open]:opacity-0" />
                </span>
              </CollapsibleTrigger>
              <CollapsibleContent className="overflow-hidden px-1 pb-5 text-sm leading-7 text-slate-600 data-[state=closed]:animate-none sm:px-2">
                {item.answer}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </Container>
    </section>
  );
}
