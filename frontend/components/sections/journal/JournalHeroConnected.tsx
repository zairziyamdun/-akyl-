"use client";

import { useMemo } from "react";

import { toPublicJournalIssue } from "@/lib/journal/adapters";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";
import { journalIssues as fallbackIssues } from "@/data/journalData";

import { JournalHero } from "./JournalHero";

export function JournalHeroConnected() {
  const { getPublishedIssues, isLoading } = useJournalIssues();

  const heroIssues = useMemo(() => {
    const published = getPublishedIssues();
    if (published.length === 0) return isLoading ? fallbackIssues : [];
    return published.map(toPublicJournalIssue);
  }, [getPublishedIssues, isLoading]);

  if (!isLoading && heroIssues.length === 0) {
    return <JournalHero issues={fallbackIssues} />;
  }

  return <JournalHero issues={heroIssues.length > 0 ? heroIssues : fallbackIssues} />;
}
