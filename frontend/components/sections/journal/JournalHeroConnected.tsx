"use client";

import { useMemo } from "react";

import { buildHeroSlides, selectHeroIssues } from "@/lib/journal/heroSlides";
import { useJournalIssues } from "@/lib/journal/JournalIssuesProvider";

import { JournalHero } from "./JournalHero";

export function JournalHeroConnected() {
  const { getPublishedIssues, isLoading } = useJournalIssues();

  const slides = useMemo(() => {
    const issues = selectHeroIssues(getPublishedIssues());
    return buildHeroSlides(issues);
  }, [getPublishedIssues]);

  return <JournalHero slides={slides} isLoading={isLoading} />;
};
