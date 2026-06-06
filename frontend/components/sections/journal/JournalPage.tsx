"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Lock } from "lucide-react";

import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/cn";
import { JOURNAL_ACCESS_HREF, journalEditorialDirections } from "@/data/journalData";
import { PublicJournalIssuesGrid } from "@/components/journal/PublicJournalIssuesGrid";
import { JournalHeroConnected } from "./JournalHeroConnected";
import { journalReveal, journalStagger, journalStaggerItem } from "./journalMotion";

function JournalAllIssues() {
  return <PublicJournalIssuesGrid />;
}

function JournalEditorial() {
  return (
    <Section className="bg-slate-50/80">
      <Container>
        <motion.div {...journalReveal}>
          <SectionHeading
            eyebrow="Редакция"
            title="Редакционные направления"
            description="Материалы журнала группируются по ключевым темам профессионального управления МЖД."
          />
          <motion.div
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
            variants={journalStagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.08 }}
          >
            {journalEditorialDirections.map((dir, i) => (
              <motion.div
                key={dir.title}
                variants={journalStaggerItem}
                className={cn(
                  "rounded-2xl border border-slate-200/90 bg-white p-5 shadow-sm transition hover:border-sky-200/80 hover:shadow-md",
                  i === 0 && "sm:col-span-2 lg:col-span-1",
                )}
              >
                <span className="text-[11px] font-semibold tracking-wider text-sky-600 uppercase">
                  Направление
                </span>
                <h3 className="mt-2 text-lg font-semibold text-slate-900">
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
    <Section className="bg-white pb-20 md:pb-28">
      <Container>
        <motion.div
          {...journalReveal}
          className="relative overflow-hidden rounded-3xl border border-slate-200/90 bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 px-6 py-12 text-center shadow-xl sm:px-12 sm:py-16"
        >
          <div
            className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-sky-500/20 blur-3xl"
            aria-hidden
          />
          <Lock className="relative mx-auto h-10 w-10 text-sky-300/90" />
          <h2 className="relative mt-4 font-[family-name:var(--font-sora)] text-2xl font-semibold text-white sm:text-3xl">
            Хотите получить доступ к закрытым выпускам?
          </h2>
          <p className="relative mx-auto mt-3 max-w-lg text-base text-white/70">
            Оформите консультацию — расскажем о полном архиве журнала и
            методологии AKYL для вашей организации.
          </p>
          <motion.div
            className="relative mt-8"
            whileHover={reduced ? undefined : { scale: 1.03 }}
            whileTap={reduced ? undefined : { scale: 0.98 }}
          >
            <Button asChild className="bg-white text-slate-900 hover:bg-slate-100">
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
      <JournalAllIssues />
      <JournalEditorial />
      <JournalAccessCta />
    </div>
  );
}
