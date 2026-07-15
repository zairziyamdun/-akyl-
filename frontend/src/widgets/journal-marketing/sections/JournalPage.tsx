"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/shared/ui/Button";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import {
  JOURNAL_ACCESS_HREF,
  journalEditorialDirections,
} from "@/widgets/journal-marketing";
import {
  journalReveal,
  journalStagger,
  journalStaggerItem,
} from "../model/journalMotion";
import { JournalArchiveSection } from "./JournalArchiveSection";
import { JournalHeroConnected } from "./JournalHeroConnected";

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

function JournalAccessCta() {
  const reduced = useReducedMotion();

  return (
    <Section className="bg-white pb-16 sm:pb-20 md:pb-28">
      <Container className="px-4 sm:px-6">
        <motion.div
          {...journalReveal}
          className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 px-5 py-10 text-center shadow-xl sm:rounded-3xl sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl"
            aria-hidden
          />
          <Lock className="relative mx-auto h-9 w-9 text-sky-300/90 sm:h-10 sm:w-10" />
          <h2 className="relative mt-4 font-[family-name:var(--font-sora)] text-xl font-semibold text-white sm:text-2xl md:text-3xl">
            Хотите получить доступ к закрытым выпускам?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-sm text-white/70 sm:text-base">
            Оформите консультацию — расскажем о полном архиве журнала и
            методологии AKYL для вашей организации.
          </p>
          <motion.div
            className="relative mt-8"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <Button
              asChild
              className="bg-white text-slate-900 hover:bg-slate-100"
            >
              <Link href={JOURNAL_ACCESS_HREF}>Получить доступ</Link>
            </Button>
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
      <JournalAccessCta />
    </div>
  );
}
