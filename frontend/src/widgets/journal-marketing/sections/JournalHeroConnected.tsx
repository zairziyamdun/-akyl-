"use client";

import { useMemo } from "react";

import { buildHeroSlides, selectHeroIssues } from "@/entities/journal-issue";
import { useJournalIssues } from "@/features/manage-journal-issue";

import { JournalHero } from "./JournalHero";

export function JournalHeroConnected() {
  const { getPublishedIssues, isLoading } = useJournalIssues();

  const slides = useMemo(() => {
    const issues = selectHeroIssues(getPublishedIssues());
    return buildHeroSlides(issues);
  }, [getPublishedIssues]);

  return <JournalHero slides={slides} isLoading={isLoading} />;
};
