"use client";

import { useEffect, useState } from "react";

import { PublicIssueCard } from "@/components/journal/PublicIssueCard";
import { JournalListSkeleton } from "@/components/journal/JournalSkeletons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";

export function PublicJournalIssuesGrid() {
  const { getPublishedIssues, isLoading } = useJournalIssues();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const published = getPublishedIssues();

  return (
    <Section id="journal-all-issues" className="scroll-mt-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Архив"
          title="Все выпуски"
          description="PDF-выпуски экспертного журнала AKYL — открытые, по подписке и закрытые издания."
        />

        {!mounted || isLoading ? (
          <div className="mt-10">
            <JournalListSkeleton />
          </div>
        ) : published.length === 0 ? (
          <p className="mt-10 text-center text-slate-500">
            Опубликованные выпуски появятся после модерации.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {published.map((issue) => (
              <PublicIssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        )}
      </Container>
    </Section>
  );
}
