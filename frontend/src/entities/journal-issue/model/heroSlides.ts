import type { JournalIssueRecord } from "./types";
import { formatDate } from "./utils";

export const HERO_MAX_ISSUES = 5;

export type HeroIssueSlide = {
  id: string;
  issueNumber: string;
  title: string;
  description: string;
  publishedAt: string;
  publishedLabel: string;
  coverUrl: string;
  year: string;
  category: string;
  isLocked: boolean;
};

export type HeroSlide =
  | { kind: "intro"; id: "intro" }
  | ({ kind: "issue" } & HeroIssueSlide);

export function toHeroIssueSlide(record: JournalIssueRecord): HeroIssueSlide {
  const year = record.updatedAt
    ? new Date(record.updatedAt).getFullYear().toString()
    : new Date().getFullYear().toString();

  return {
    id: record.id,
    issueNumber: record.issueNumber,
    title: record.title,
    description: record.description,
    publishedAt: record.updatedAt,
    publishedLabel: formatDate(record.updatedAt),
    coverUrl: record.coverUrl,
    year,
    category: accessToCategory(record.accessType),
    isLocked: record.accessType !== "FREE",
  };
}

function accessToCategory(access: JournalIssueRecord["accessType"]): string {
  switch (access) {
    case "FREE":
      return "Открытый выпуск";
    case "PAID":
      return "По подписке";
    case "PRIVATE":
      return "Закрытый выпуск";
  }
}

/** Latest published issues for hero carousel (max 5). */
export function selectHeroIssues(records: JournalIssueRecord[]): HeroIssueSlide[] {
  return records
    .filter((r) => r.status === "PUBLISHED")
    .sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
    )
    .slice(0, HERO_MAX_ISSUES)
    .map(toHeroIssueSlide);
}

export function buildHeroSlides(issues: HeroIssueSlide[]): HeroSlide[] {
  return [{ kind: "intro", id: "intro" }, ...issues.map((issue) => ({ kind: "issue" as const, ...issue }))];
}
