"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
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
      className="scroll-mt-20 border-t border-slate-200/80 bg-slate-50 sm:scroll-mt-24"
    >
      <Container className="px-4 sm:px-6">
        <motion.div {...journalReveal} className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
            Редакция
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Редакционные направления
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-600">
            Материалы журнала группируются по ключевым темам профессионального
            управления МЖД.
          </p>
        </motion.div>

        <motion.ol
          className="mt-12 divide-y divide-slate-200 border-y border-slate-200"
          variants={journalStagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
        >
          {journalEditorialDirections.map((dir, index) => (
            <motion.li key={dir.title} variants={journalStaggerItem}>
              <Link
                href="#journal-all-issues"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-6 transition duration-300 hover:bg-white/70 sm:gap-8 sm:py-7"
              >
                <span className="font-[family-name:var(--font-sora)] text-sm font-semibold tabular-nums text-sky-700/80 transition duration-300 group-hover:text-sky-600">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className="font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-900 transition duration-300 group-hover:text-sky-950 sm:text-xl">
                    {dir.title}
                  </h3>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-slate-600 transition duration-300 group-hover:text-slate-700 sm:text-[15px]">
                    {dir.description}
                  </p>
                  <span className="mt-3 block h-px max-w-0 bg-sky-500 transition-all duration-500 group-hover:max-w-[7rem]" />
                </div>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-slate-300 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-sky-600" />
              </Link>
            </motion.li>
          ))}
        </motion.ol>
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
