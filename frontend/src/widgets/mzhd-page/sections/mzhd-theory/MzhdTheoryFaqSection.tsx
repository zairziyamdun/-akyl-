"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/shared/ui";
import { mzhdTheoryFaq, sectionMotion } from "@/widgets/mzhd-page";
import { MzhdTheorySectionHeader } from "./MzhdTheorySectionHeader";

export function MzhdTheoryFaqSection() {
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <motion.div {...sectionMotion}>
          <MzhdTheorySectionHeader
            eyebrow="Вопросы"
            title="Частые вопросы о теории"
            description="Короткие ответы для тех, кто связывает методологию с повседневным управлением домом."
          />
        </motion.div>

        <div className="mt-10 divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
          {mzhdTheoryFaq.map((item) => (
            <Collapsible key={item.question}>
              <CollapsibleTrigger className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 hover:bg-slate-50">
                {item.question}
                <span className="text-slate-400">+</span>
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
