"use client";

import { useMemo } from "react";

import { toPublicJournalIssue } from "@/lib/journal/adapters";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import { journalIssues as fallbackIssues } from "@/data/journalData";

import { JournalHero } from "./JournalHero";

export function JournalHeroConnected() {
  const { getPublishedIssues } = useJournalIssues();

  const heroIssues = useMemo(() => {
    const published = getPublishedIssues();
    if (published.length === 0) return fallbackIssues;
    return published.map(toPublicJournalIssue);
  }, [getPublishedIssues]);

  return <JournalHero issues={heroIssues} />;
}
