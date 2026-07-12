"use client";

import { useEffect, useState } from "react";

import { PublicIssueCard } from ".";
import { JournalListSkeleton } from ".";
import { Container } from "@/shared/ui/Container";
import { Section } from "@/shared/ui/Section";
import { SectionHeading } from "@/shared/ui/SectionHeading";
import { useJournalIssues } from "../JournalIssuesProvider";

export function PublicJournalIssuesGrid() {
  const { getPublishedIssues, isLoading } = useJournalIssues();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const published = getPublishedIssues();

  return (
    <Section id="journal-all-issues" className="scroll-mt-20 bg-white sm:scroll-mt-24">
      <Container className="px-4 sm:px-6">
        <SectionHeading
          eyebrow="Архив"
          title="Все выпуски"
          description="PDF-выпуски экспертного журнала AKYL — открытые, по подписке и закрытые издания."
          className="max-w-2xl"
        />

        {!mounted || isLoading ? (
          <div className="mt-8 sm:mt-10">
            <JournalListSkeleton />
          </div>
        ) : published.length === 0 ? (
          <p className="mt-8 text-center text-slate-500 sm:mt-10">
            Выпуски скоро появятся
          </p>
        ) : (
          <div className="mt-8 grid grid-cols-1 gap-4 sm:mt-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
            {published.map((issue) => (
              <PublicIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
