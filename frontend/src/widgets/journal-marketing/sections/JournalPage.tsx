"use client";

import { motion } from "framer-motion";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { journalEditorialDirections } from "@/widgets/journal-marketing";
import {
  journalReveal,
  journalStagger,
  journalStaggerItem,
} from "../model/journalMotion";
import { JournalArchiveSection } from "./JournalArchiveSection";
import { JournalHeroConnected } from "./JournalHeroConnected";
import { JournalSubscriptionSection } from "./JournalSubscriptionSection";

function JournalEditorial() {
  return (
    <Section
      id="journal-editorial"
      className="scroll-mt-20 bg-slate-50/80 sm:scroll-mt-24"
    >
      <Container className="px-4 sm:px-6">
        <motion.div {...journalReveal}>
          <SectionHeading
            eyebrow="Редакция"
            title="Редакционные направления"
            description="Материалы журнала группируются по ключевым темам профессионального управления МЖД."
            className="max-w-2xl"
          />
          <motion.div
            className="mt-8 grid grid-cols-1 gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-5"
            variants={journalStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {journalEditorialDirections.map((dir) => (
              <motion.div
                key={dir.title}
                variants={journalStaggerItem}
                className="rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm transition hover:border-sky-200/80 hover:shadow-md sm:p-5"
              >
                <span className="text-[10px] font-semibold tracking-wider text-sky-600 uppercase sm:text-[11px]">
                  Направление
                </span>
                <h3 className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
                  {dir.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {dir.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}

export function JournalPage() {
  return (
    <div className="bg-white [overflow-x:clip]">
      <JournalHeroConnected />
      <JournalArchiveSection />
      <JournalEditorial />
      <JournalSubscriptionSection />
    </div>
  );
}
