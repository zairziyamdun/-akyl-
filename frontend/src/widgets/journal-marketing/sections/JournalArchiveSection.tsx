"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useJournalIssues } from "@/features/manage-journal-issue";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { journalReveal, journalStagger } from "@/widgets/journal-marketing";
import { JournalArchiveCard } from "./JournalArchiveCard";

function JournalArchiveSkeleton() {
  const placeholders = Array.from({ length: 8 }, (_, i) => `archive-skel-${i}`);

  return (
    <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4">
      {placeholders.map((id) => (
        <div key={id} className="animate-pulse">
          <div className="mx-auto aspect-[3/4] max-w-[220px] rounded-sm bg-slate-200 sm:max-w-none" />
          <div className="mx-auto mt-5 h-3 w-24 rounded bg-slate-200 sm:mx-0" />
          <div className="mx-auto mt-2 h-4 w-full max-w-[220px] rounded bg-slate-200 sm:mx-0 sm:max-w-none" />
          <div className="mx-auto mt-2 h-3 w-3/4 max-w-[220px] rounded bg-slate-100 sm:mx-0 sm:max-w-none" />
        </div>
      ))}
    </div>
  );
}

export function JournalArchiveSection() {
  const { getPublishedIssues, isLoading } = useJournalIssues();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const published = getPublishedIssues();

  return (
    <Section
      id="journal-all-issues"
      className="scroll-mt-20 border-t border-slate-200/80 bg-white sm:scroll-mt-24"
    >
      <Container className="px-4 sm:px-6">
        <motion.div {...journalReveal}>
          <div className="flex flex-col gap-6 border-b border-slate-200 pb-10 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
                Сборник
              </span>
              <h2 className="mt-3 font-[family-name:var(--font-sora)] text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                Архив выпусков
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                Коллекция PDF-изданий журнала AKYL — выбирайте номер и читайте
                материалы о профессиональном управлении МЖД.
              </p>
            </div>
            {mounted && !isLoading && published.length > 0 ? (
              <p className="shrink-0 text-sm font-medium tabular-nums text-slate-500">
                {published.length}{" "}
                {published.length === 1
                  ? "выпуск"
                  : published.length < 5
                    ? "выпуска"
                    : "выпусков"}
              </p>
            ) : null}
          </div>

          {!mounted || isLoading ? (
            <JournalArchiveSkeleton />
          ) : published.length === 0 ? (
            <div className="mt-14 border border-dashed border-slate-200 bg-slate-50/60 px-6 py-16 text-center">
              <p className="font-[family-name:var(--font-sora)] text-lg font-semibold text-slate-800">
                Выпуски скоро появятся
              </p>
              <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                Мы готовим первые номера сборника. Следите за обновлениями или
                оставьте заявку на консультацию.
              </p>
            </div>
          ) : (
            <motion.div
              className="mt-12 grid grid-cols-2 gap-x-5 gap-y-12 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-14 lg:grid-cols-4"
              variants={journalStagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.06 }}
            >
              {published.map((issue) => (
                <JournalArchiveCard key={issue.id} issue={issue} />
              ))}
            </motion.div>
          )}
        </motion.div>
      </Container>
    </Section>
  );
}
